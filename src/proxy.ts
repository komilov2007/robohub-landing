import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale } from "@/i18n/config";

// Bitta loyiha — bir necha sayt, uch til. Ichki manzil: /{til}/{sayt}{qolgan yo'l}.
//   Sayt domendan: robohub.uz va robohub-landing.vercel.app (lokalda localhost) → robohub;
//     Robohub Academy — shu saytning /academy sahifasi (robohub.uz/academy, faqat o'zbekcha).
//     Eski robohub-academy-two domenlari ham robohub'ga tushadi (quyidagidan OLDIN tekshiriladi — prefiks umumiy);
//   robohub-academy bilan boshlanadigan domen (robohub-academy.vercel.app;
//     lokalda robohub-academy.localhost) → robohub-academy (faqat o'zbekcha);
//   robosell bilan boshlanadigan domen (hozircha robosell-landing.vercel.app;
//     lokalda robosell.localhost) → robosell; qolgan hammasi (robohub-landing.vercel.app, localhost) → robohub.
//   robohub-landing-two (robohub-landing-two.vercel.app) yoki robohub-two (lokalda robohub-two.localhost)
//     bilan boshlanadigan domen → robohub-two (robohub nusxasi, TT Fors shriftida).
//   Til yo'lning boshidan: /ru, /en; prefiks bo'lmasa — o'zbekcha.
// Bu rewrite: brauzer manzili o'zgarmaydi, /uz/robohub kabi ichki yo'l foydalanuvchiga ko'rinmaydi.
type Site = "robohub" | "robohub-two" | "robosell" | "robohub-academy";

function siteFromHost(host: string): Site {
  const h = host.toLowerCase();
  if (h.startsWith("robohub-landing-two") || h.startsWith("robohub-two")) return "robohub-two";
  if (h.startsWith("robohub-academy-two")) return "robohub";
  if (h.startsWith("robohub-academy")) return "robohub-academy";
  return h.startsWith("robosell") ? "robosell" : "robohub";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  // O'zbekcha prefikssiz: /uz/... → /... (bitta sahifaga ikki manzil bo'lmasligi uchun)
  if (first === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  const locale = hasLocale(first) ? first : defaultLocale;
  const rest = hasLocale(first) ? pathname.slice(first.length + 1) : pathname;
  const site = siteFromHost(request.headers.get("host") ?? "");

  // Academy faqat o'zbekcha: /ru/academy, /en/academy → /academy
  if (site === "robohub" && locale !== defaultLocale && (rest === "/academy" || rest.startsWith("/academy/"))) {
    const url = request.nextUrl.clone();
    url.pathname = rest;
    return NextResponse.redirect(url, 308);
  }

  // Har doim til va sayt prefiksi qo'shiladi: robohub domenida /robosell ochilsa
  // /uz/robohub/robosell → 404, ya'ni bir sayt ikkinchisini o'z domenida ko'rsatib qo'ymaydi.
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}/${site}${rest === "/" ? "" : rest}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Next ichki fayllari, API va public/ dagi fayllar (nuqtali yo'llar: /ai/x.webp, /favicon.ico) tegilmaydi
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
