import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, hostHref, hostZone, localeHref, LOCALE_HEADER, parseProdHost, SECTIONS, splitZone, TLD_LOCALE, toSingle, type Locale } from "@/i18n/config";
import { siteFromHost } from "@/lib/site-host";

// Bitta loyiha — bir necha sayt, yetti til. Ichki manzil: /{til}/{sayt}{qolgan yo'l}.
//   Sayt domendan: robohub.uz va robohub-landing.vercel.app (lokalda localhost) → robohub;
//     Robohub bo'limlari: /academy, /aistudio, /calculator — til bo'lim nomidan keyin keladi:
//     robohub.uz/academy/ru/order, robohub.uz/aistudio/kk, robohub.uz/calculator/en. Bosh sahifa: robohub.uz/ru.
//     Eski robohub-two / robohub-academy domenlari ham robohub'ga tushadi; robohub-academy… bosh sahifasi → /academy;
//   robosell bilan boshlanadigan domen (hozircha robosell-landing.vercel.app;
//     lokalda robosell.localhost) → robosell; qolgan hammasi (robohub-landing.vercel.app, localhost) → robohub.
//   ai-studio bilan boshlanadigan domen (lokalda ai-studio.localhost) → ai-studio (AI Studio landingi o'z domenida).
//   Til (bo'limlardan tashqari) yo'lning boshidan: /ru, /en; prefiks bo'lmasa — o'zbekcha.
// Bu rewrite: brauzer manzili o'zgarmaydi, /uz/robohub kabi ichki yo'l foydalanuvchiga ko'rinmaydi.
// Domen → sayt: src/lib/site-host.ts (sitemap/robots ham shuni ishlatadi)
// Rasmiy domenlar: robohub.{uz,kz,kg}, academy.robohub.{uz,kz,kg}, aistudio.robohub.{uz,kz,kg} — pastda, i18n/config.ts

const isSection = (s: string | undefined) => (SECTIONS as readonly string[]).includes(s ?? "");
// Eski bo'lim nomlari: /ai-studio → /aistudio
const OLD_SECTION: Record<string, string> = { "ai-studio": "aistudio" };

function redirectTo(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.redirect(url, 308);
}

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const site = siteFromHost(host);
  const prod = parseProdHost(host); // rasmiy domen (robohub.uz, academy.robohub.kz, aistudio.robohub.kg …) yoki null
  // Bitta domen — Vercel (robohub-landing.vercel.app): subdomenlar yo'q, bo'limlar yo'lda: /academy, /ai-studio, /calculator.
  // AI Studio bu yerda /ai-studio (ichkarida — /aistudio); eski /aistudio → /ai-studio. Faqat *.vercel.app — boshqa
  // domenlar (robohub.uz, localhost …) o'zgarmaydi. Havolalar ham shu sxemada (i18n/config.ts: SINGLE_DOMAIN).
  const single = site === "robohub" && !prod && hostZone(host) === "main" && /\.vercel\.app$/i.test(host.split(":")[0]);
  let { pathname } = request.nextUrl;
  if (single) {
    if (/^\/aistudio(\/|$)/.test(pathname)) return redirectTo(request, toSingle(pathname));
    pathname = pathname.replace(/^\/ai-studio(?=\/|$)/, "/aistudio");
  }
  // yo'naltirish: bitta domenda AI Studio manzili — /ai-studio
  const go = (path: string) => redirectTo(request, single ? toSingle(path) : path);
  // Domen tilni majburlamaydi — har domenda 7 til ham ochiladi. Faqat tilsiz manzil mamlakat tilida:
  // robohub.kz → /kk, robohub.kg → /ky. Shu sabab .kz/.kg da o'zbekcha prefiks bilan: /uz, /calculator/uz (i18n/config.ts).
  const tld = site === "robosell" ? "uz" : (prod?.tld ?? "uz");
  const uzPrefixed = tld !== "uz";
  const href = (l: Locale, path: string) => hostHref(tld, l, path);
  // Academy o'z subdomenida: academy.robohub.{uz,kz,kg}, lokalda academy.localhost
  const academy = site === "robohub" && hostZone(host) === "academy";
  const parts = pathname.split("/"); // ["", "academy", "ru", "order"]
  const first = parts[1];

  if (academy) {
    // Academy subdomenida eski (bitta domendagi) yo'l: /academy/ru/order, /ru/academy/order → /ru/order
    const at = first === "academy" ? 1 : hasLocale(first) && parts[2] === "academy" ? 2 : 0;
    if (at) {
      const kept = parts.filter((_, i) => i !== at).filter(Boolean);
      return go(`/${kept.join("/")}`);
    }
  } else if (site === "robohub") {
    // Eski manzillar → yangisi (bitta sahifaga bitta manzil, 308 — doimiy):
    //   /ru/academy/order → /academy/ru/order, /ai-studio → /aistudio, /ru/ai-studio → /aistudio/ru
    const lang = hasLocale(first) ? first : undefined;
    const at = lang ? 2 : 1;
    const sec = OLD_SECTION[parts[at]] ?? parts[at];
    if (isSection(sec) && (lang || sec !== parts[at])) {
      const tail = parts.slice(at + 1).filter(Boolean).join("/");
      return go(href(lang ?? defaultLocale, `/${sec}${tail ? `/${tail}` : ""}`));
    }
    // O'zbekcha prefikssiz: /academy/uz/order → /academy/order (.uz da; .kz/.kg da /academy/uz — o'zbekcha)
    if (!uzPrefixed && isSection(first) && parts[2] === defaultLocale) {
      const tail = parts.slice(3).filter(Boolean).join("/");
      return go(`/${first}${tail ? `/${tail}` : ""}`);
    }
  }

  // O'zbekcha prefikssiz: /uz/... → /... (bitta sahifaga ikki manzil bo'lmasligi uchun; .kz/.kg da /uz — o'zbekcha)
  if (!uzPrefixed && first === defaultLocale) return go(pathname.slice(defaultLocale.length + 1) || "/");

  let locale: Locale = defaultLocale;
  let rest = pathname;
  let explicit = true; // til manzilda yozilganmi
  if (hasLocale(first)) {
    locale = first;
    rest = pathname.slice(first.length + 1) || "/";
  } else if (site === "robohub" && !academy && isSection(first) && hasLocale(parts[2])) {
    // bo'limda til ikkinchi: /academy/ru/order → til ru, yo'l /academy/order
    locale = parts[2];
    rest = `/${[first, ...parts.slice(3)].join("/")}`;
  } else explicit = false;

  // .kz/.kg da tilsiz manzil: o'zbekcha tanlab kirgan bo'lsa (cookie) — o'zbekcha, aks holda mamlakat tili
  if (uzPrefixed && !explicit && site !== "robosell" && request.cookies.get(LANG_COOKIE)?.value !== defaultLocale) {
    return go(href(TLD_LOCALE[tld], rest));
  }

  // Bo'limlar o'z subdomenida (shu mamlakat domenida): robohub.uz/academy/ru/order → academy.robohub.uz/ru/order,
  // robohub.kz/aistudio/kk → aistudio.robohub.kz/kk
  if (prod && site === "robohub" && !academy) {
    const z = splitZone(rest);
    if (z.zone !== "main") {
      const target = new URL(`https://${z.zone}.robohub.${tld}${href(locale, z.path)}`);
      target.search = request.nextUrl.search;
      return NextResponse.redirect(target, 308);
    }
  }

  // Eski Academy domeni (robohub-academy…, robohub-academy-two…): bosh sahifa — yangi Academy
  if (host.toLowerCase().startsWith("robohub-academy") && (rest === "/" || rest === "")) {
    return go(localeHref(locale, "/academy"));
  }

  // Brauzer tili bo'yicha birinchi kirish (faqat .uz va lokal): tilsiz (o'zbekcha) manzil ochilsa va tanlov hali bo'lmasa —
  // brauzer tilidagi sahifaga (bizdagi 7 tildan biri; boshqa til bo'lsa — inglizcha). Batafsil: pickLocale.
  if (site === "robohub" && !uzPrefixed && locale === defaultLocale && !request.cookies.has(LANG_COOKIE) && isPageVisit(request)) {
    const want = pickLocale(request.headers.get("accept-language"));
    if (want && want !== defaultLocale) {
      const url = request.nextUrl.clone();
      url.pathname = single ? toSingle(localeHref(want, rest || "/")) : localeHref(want, rest || "/");
      const res = NextResponse.redirect(url, 307); // vaqtinchalik: Google tilsiz manzilni o'zbekcha sahifa sifatida saqlaydi
      res.headers.set("Cache-Control", "private, no-store");
      res.headers.set("Vary", "Accept-Language, Cookie");
      return res;
    }
  }

  // Har doim til va sayt prefiksi qo'shiladi: robohub domenida /robosell ochilsa
  // /uz/robohub/robosell → 404, ya'ni bir sayt ikkinchisini o'z domenida ko'rsatib qo'ymaydi.
  // Academy subdomeni: /ru/order → /ru/robohub/academy/order
  const url = request.nextUrl.clone();
  const inner = academy ? `/academy${rest === "/" ? "" : rest}` : rest === "/" ? "" : rest;
  url.pathname = `/${locale}/${site}${inner}`;
  // Til — 404 sahifasi uchun (app/global-not-found.tsx): u layout'siz render bo'ladi va root parametrni ko'rmaydi
  const headers = new Headers(request.headers);
  headers.set(LOCALE_HEADER, locale);
  const res = NextResponse.rewrite(url, { request: { headers } });
  // Ochilgan sahifa tili eslab qolinadi: keyin til menyusidan o'zbekcha (tilsiz manzil) tanlansa, qayta yo'naltirilmaydi
  if (site !== "robosell" && isPageVisit(request) && request.cookies.get(LANG_COOKIE)?.value !== locale) {
    res.cookies.set(LANG_COOKIE, locale, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  }
  return res;
}

// Foydalanuvchi tanlagan (yoki birinchi kirishda ochilgan) til — shu cookie bor bo'lsa, brauzer tiliga qarab yo'naltirilmaydi
const LANG_COOKIE = "rh-lang";

// Qidiruv va ulashish botlari, Lighthouse/PageSpeed — yo'naltirilmaydi: har doim so'ragan sahifasini oladi (SEO)
const BOT = /bot|crawl|spider|slurp|lighthouse|pagespeed|google|yandex|bing|baidu|duckduck|facebookexternalhit|telegram|whatsapp|preview|headless/i;

// Faqat brauzerda sahifani ochish (Next ichki so'rovlari — RSC, prefetch — va botlar emas)
function isPageVisit(request: NextRequest): boolean {
  const h = request.headers;
  if (request.method !== "GET" || h.has("rsc") || h.has("next-router-prefetch") || h.get("purpose") === "prefetch") return false;
  if (BOT.test(h.get("user-agent") ?? "")) return false;
  return (h.get("sec-fetch-dest") ?? "document") === "document" && (h.get("accept") ?? "").includes("text/html");
}

// Accept-Language (Chrome sozlamalaridagi tillar, ustuvorlik tartibida) → saytdagi til:
//   birinchi mos kelgan til (uz, ru, en, kk, ky, kaa, tg); hech biri mos kelmasa — inglizcha.
//   Sarlavha umuman bo'lmasa — yo'naltirilmaydi (undefined).
function pickLocale(header: string | null): Locale | undefined {
  if (!header) return undefined;
  const tags = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = Number(params.find((p) => p.trim().startsWith("q="))?.split("=")[1] ?? 1);
      return { lang: tag.trim().toLowerCase().split("-")[0], q: Number.isNaN(q) ? 0 : q };
    })
    .filter((t) => t.lang && t.lang !== "*" && t.q > 0)
    .sort((a, b) => b.q - a.q);
  return (tags.find((t) => hasLocale(t.lang))?.lang as Locale | undefined) ?? "en";
}

export const config = {
  // Next ichki fayllari, API va public/ dagi fayllar (nuqtali yo'llar: /ai/x.webp, /favicon.ico) tegilmaydi
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
