import type { Locale } from "@/i18n/config";
import type {
  CalculatorLinkMarketplace,
  CalculatorLinkResponse,
  CalculatorMarketplace,
  CalculatorRequest,
  CalculatorResponse,
  CategorySuggestResponse,
  CompetitorsRequest,
  CompetitorsResponse,
  PublicCategory,
} from "./types";

// Ochiq kalkulyator API'si — rb-market src/apis/public/calculator.ts bilan bir xil so'rovlar.
// Token yo'q, hech narsa saqlanmaydi; har IP uchun so'rovlar soni cheklangan (429 + Retry-After).
// Manzil rb-market ishlatadigani (VITE_API_BASE_URL = https://api.robohub.uz/api).
// CORS faqat robohub.uz domenlari va localhost'ga ruxsat beradi — u yerda to'g'ridan-to'g'ri (har IP o'z cheklovi bilan);
// boshqa domenda (robohub-landing.vercel.app) — o'z serverimiz orqali: /api/robohub/* → api.robohub.uz/api/* (next.config.ts).
const DIRECT_URL = "https://api.robohub.uz/api/";
const PROXY_PATH = "/api/robohub/";
const DIRECT_HOSTS = /(^|\.)robohub\.uz$|^localhost$/;

const baseUrl = () =>
  typeof window === "undefined" || DIRECT_HOSTS.test(window.location.hostname)
    ? DIRECT_URL
    : new URL(PROXY_PATH, window.location.origin).toString();

const CALCULATOR_PATH: Record<CalculatorMarketplace, string> = {
  uzum_market: "uzum",
  wb: "wb",
  yandex_market: "yandex",
  ozon: "ozon",
};

/** Javob tanasi bilan rad etilgan so'rov — xato kodi, maydon va Retry-After shu yerdan o'qiladi. */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly body: unknown,
    readonly retryAfter: number | null,
  ) {
    super(`Request failed with status ${status}`);
  }
}

// Eski "envelope" ({error, code, message, data}) hozir o'chiq, lekin qaytsa ham ishlashi uchun — rb-market'dagi kabi shakl bo'yicha.
const unwrap = <T>(body: unknown): T => {
  if (body && typeof body === "object" && !Array.isArray(body)) {
    const b = body as Record<string, unknown>;
    if (typeof b.error === "boolean" && "code" in b && "message" in b && "data" in b && !b.error) return b.data as T;
  }
  return body as T;
};

/** Accept-Language — sahifa tili (root layout <html lang> ga qo'yadi); server xato matnlarini shu tilda qaytaradi. */
const pageLocale = (): Locale => {
  const lang = typeof document === "undefined" ? "" : document.documentElement.lang;
  return lang === "ru" || lang === "en" ? lang : "uz";
};

async function request<T>(path: string, init: { method: "GET" | "POST"; body?: unknown; params?: Record<string, string | undefined> }) {
  const base = baseUrl();
  // Proksi orqali — oxirgi "/" siz (Next uni yo'naltirib yuboradi); rewrite uni qaytarib qo'shadi
  const url = new URL(base === DIRECT_URL ? path : path.replace(/\/$/, ""), base);
  Object.entries(init.params ?? {}).forEach(([k, v]) => v !== undefined && url.searchParams.set(k, v));

  let res: Response;
  try {
    res = await fetch(url, {
      method: init.method,
      headers: {
        "Accept-Language": pageLocale(),
        "X-Page-Path": typeof window === "undefined" ? "/calculator" : window.location.pathname,
        ...(init.body ? { "Content-Type": "application/json" } : {}),
      },
      body: init.body ? JSON.stringify(init.body) : undefined,
    });
  } catch {
    // Tarmoq yo'q yoki CORS'siz shlyuz xatosi — status 0, "server javob bermadi" deb ko'rsatiladi
    throw new ApiError(0, null, null);
  }

  const text = await res.text();
  let body: unknown = text;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    /* matnli javob — o'zicha qoladi */
  }
  if (!res.ok) {
    const after = Number(res.headers.get("retry-after"));
    throw new ApiError(res.status, body, Number.isFinite(after) && after > 0 ? after : null);
  }
  return unwrap<T>(body);
}

/** Daraxtning bir darajasi (`parent_id` — marketpleysning o'z category_id'si) yoki barglar bo'yicha qidiruv (≤30). */
export const getPublicCategories = (params: { marketplace: CalculatorMarketplace; parent_id?: string; search?: string }) =>
  request<PublicCategory[]>("public/categories/", { method: "GET", params });

/** Mahsulot nomidan kategoriya tavsiyasi (AI). `score` — tartib uchun, foiz emas. */
export const postPublicCategorySuggest = (data: {
  name_uz?: string;
  name_ru?: string;
  marketplaces: CalculatorMarketplace[];
  limit: number;
}) => request<CategorySuggestResponse>("public/categories/suggest/", { method: "POST", body: data });

/** Havoladan to'ldirish — faqat Uzum va WB. */
export const postPublicCalculatorLink = (data: { url: string; marketplace: CalculatorLinkMarketplace }) =>
  request<CalculatorLinkResponse>("public/calculator/link/", { method: "POST", body: data });

export const postPublicCalculator = (marketplace: CalculatorMarketplace, data: CalculatorRequest) =>
  request<CalculatorResponse>(`public/calculator/${CALCULATOR_PATH[marketplace]}/`, { method: "POST", body: data });

/** Raqobatchilar bilan solishtirish — daqiqasiga 20 ta so'rov / IP. */
export const postPublicCalculatorCompare = (data: CompetitorsRequest) =>
  request<CompetitorsResponse>("public/calculator/compare/", { method: "POST", body: data });

// ---------- xatoni o'qish (rb-market src/lib/api-envelope.ts dagi qoidalar) ----------
type ErrorBody = { code?: unknown; message?: unknown; detail?: unknown; field?: unknown; details?: unknown; [k: string]: unknown };

const errorBody = (error: unknown): ErrorBody | string | undefined => {
  if (!(error instanceof ApiError)) return undefined;
  if (typeof error.body === "string") return error.body;
  return error.body && typeof error.body === "object" ? (error.body as ErrorBody) : undefined;
};

const IGNORED = new Set(["code", "error", "field", "status", "timestamp", "data"]);
const firstFieldMessage = (value: unknown, depth = 0, inArray = false): string | undefined => {
  if (typeof value === "string") return inArray && value.trim() ? value : undefined;
  if (depth >= 4 || !value || typeof value !== "object") return undefined;
  const entries = Array.isArray(value)
    ? value
    : Object.entries(value).filter(([k]) => !IGNORED.has(k)).map(([, v]) => v);
  for (const entry of entries) {
    const found = firstFieldMessage(entry, depth + 1, Array.isArray(value));
    if (found) return found;
  }
  return undefined;
};

export const getApiErrorMessage = (error: unknown): string => {
  const body = errorBody(error);
  if (typeof body === "string" && body && body.length < 300) return body;
  if (body && typeof body === "object") {
    if (typeof body.message === "string" && body.message) return body.message;
    if (typeof body.detail === "string" && body.detail) return body.detail;
    const field = firstFieldMessage(body);
    if (field) return field;
  }
  return "";
};

/** Raqamli xato kodi (`"50004"` → 50004), bo'lmasa 0. */
export const getApiErrorCode = (error: unknown): number => {
  const body = errorBody(error);
  return body && typeof body === "object" ? Number(body.code) || 0 : 0;
};

export const getApiErrorField = (error: unknown): string | null => {
  const body = errorBody(error);
  return body && typeof body === "object" && typeof body.field === "string" && body.field ? body.field : null;
};

export const getApiErrorDetails = <T>(error: unknown): T | null => {
  const body = errorBody(error);
  if (!body || typeof body !== "object") return null;
  const d = body.details;
  return d && typeof d === "object" && !Array.isArray(d) ? (d as T) : null;
};

export const getApiErrorStatus = (error: unknown) => (error instanceof ApiError ? error.status : 0);
export const getRetryAfterSeconds = (error: unknown) => (error instanceof ApiError ? error.retryAfter : null);
