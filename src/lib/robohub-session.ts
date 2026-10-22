"use client";

import { useSyncExternalStore } from "react";
import type { Locale } from "@/i18n/config";

// Robohub kabinetiga (rb-market) kirganmi — landing header'idagi tugma matni "Kirish" o'rniga "Kabinet" bo'lishi uchun (havola o'zgarmaydi).
// rb-market sessiyani shunday saqlaydi (src/lib/session-store.ts → readSession): avval `user` cookie
// (JSON, robohub.uz domenida, path=/), bo'lmasa localStorage `rb-session` ({ value, expiresAt }).
// Kabinet seller.robohub.uz'da — uning cookie'lari boshqa domendagi landingga ko'rinmaydi. Shuning uchun asosiy belgi —
// `rb_auth=1` (tokensiz, .robohub.uz domenida): uni rb-market login paytida yozishi va logout'da o'chirishi kerak.
// `user` cookie va `rb-session` — landing kabinet bilan bir domenda ochilgan holat uchun.
// Faqat "bor/yo'q" o'qiladi — tokenlar hech qayerga yuborilmaydi.

/** rb-market'dagi ai_landing_cabinet tarjimasi */
export const CABINET_LABEL: Record<Locale, string> = { uz: "Kabinet", ru: "Кабинет", en: "Dashboard" };

type Session = { tokens?: { access?: string } };

const hasAccess = (value: unknown) => !!(value as Session | null)?.tokens?.access;

const readCookie = (): unknown => {
  const raw = document.cookie
    .split("; ")
    .find((part) => part.startsWith("user="))
    ?.slice("user=".length);
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw));
  } catch {
    return null;
  }
};

const readLocal = (): unknown => {
  try {
    const raw = localStorage.getItem("rb-session");
    if (!raw) return null;
    const envelope = JSON.parse(raw) as { value?: unknown; expiresAt?: number };
    return envelope.expiresAt === undefined || envelope.expiresAt > Date.now() ? envelope.value : null;
  } catch {
    return null;
  }
};

/** rb-market login paytida .robohub.uz domeniga yozadigan tokensiz belgi */
const hasMarker = () => document.cookie.split("; ").includes("rb_auth=1");

const isAuthed = () => {
  try {
    return hasMarker() || hasAccess(readCookie()) || hasAccess(readLocal());
  } catch {
    return false;
  }
};

const noop = () => () => {};

/** Serverda va gidratsiyada — false ("Kirish"); brauzerda sessiya bo'lsa darhol true ("Kabinet"). */
export function useRobohubAuthed() {
  return useSyncExternalStore(noop, isAuthed, () => false);
}
