import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, localeHref, LOCALE_HEADER, SECTIONS, type Locale } from "@/i18n/config";
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

const isSection = (s: string | undefined) => (SECTIONS as readonly string[]).includes(s ?? "");
// Eski bo'lim nomlari: /ai-studio → /aistudio
const OLD_SECTION: Record<string, string> = { "ai-studio": "aistudio" };

function redirectTo(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.redirect(url, 308);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") ?? "";
  const site = siteFromHost(host);
  const parts = pathname.split("/"); // ["", "academy", "ru", "order"]
  const first = parts[1];

  if (site === "robohub") {
    // Eski manzillar → yangisi (bitta sahifaga bitta manzil, 308 — doimiy):
    //   /ru/academy/order → /academy/ru/order, /ai-studio → /aistudio, /ru/ai-studio → /aistudio/ru
    const lang = hasLocale(first) ? first : undefined;
    const at = lang ? 2 : 1;
    const sec = OLD_SECTION[parts[at]] ?? parts[at];
    if (isSection(sec) && (lang || sec !== parts[at])) {
      const tail = parts.slice(at + 1).filter(Boolean).join("/");
      return redirectTo(request, localeHref(lang ?? defaultLocale, `/${sec}${tail ? `/${tail}` : ""}`));
    }
    // O'zbekcha prefikssiz: /academy/uz/order → /academy/order
    if (isSection(first) && parts[2] === defaultLocale) {
      const tail = parts.slice(3).filter(Boolean).join("/");
      return redirectTo(request, `/${first}${tail ? `/${tail}` : ""}`);
    }
  }

  // O'zbekcha prefikssiz: /uz/... → /... (bitta sahifaga ikki manzil bo'lmasligi uchun)
  if (first === defaultLocale) return redirectTo(request, pathname.slice(defaultLocale.length + 1) || "/");

  let locale: Locale = defaultLocale;
  let rest = pathname;
  if (hasLocale(first)) {
    locale = first;
    rest = pathname.slice(first.length + 1);
  } else if (site === "robohub" && isSection(first) && hasLocale(parts[2])) {
    // bo'limda til ikkinchi: /academy/ru/order → til ru, yo'l /academy/order
    locale = parts[2];
    rest = `/${[first, ...parts.slice(3)].join("/")}`;
  }

  // Eski Academy domeni (robohub-academy…, robohub-academy-two…): bosh sahifa — yangi Academy
  if (host.toLowerCase().startsWith("robohub-academy") && (rest === "/" || rest === "")) {
    return redirectTo(request, localeHref(locale, "/academy"));
  }

  // Har doim til va sayt prefiksi qo'shiladi: robohub domenida /robosell ochilsa
  // /uz/robohub/robosell → 404, ya'ni bir sayt ikkinchisini o'z domenida ko'rsatib qo'ymaydi.
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}/${site}${rest === "/" ? "" : rest}`;
  // Til — 404 sahifasi uchun (app/global-not-found.tsx): u layout'siz render bo'ladi va root parametrni ko'rmaydi
  const headers = new Headers(request.headers);
  headers.set(LOCALE_HEADER, locale);
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  // Next ichki fayllari, API va public/ dagi fayllar (nuqtali yo'llar: /ai/x.webp, /favicon.ico) tegilmaydi
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
