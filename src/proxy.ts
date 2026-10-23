import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale } from "@/i18n/config";
import { siteFromHost } from "@/lib/site-host";

// Bitta loyiha — bir necha sayt, uch til. Ichki manzil: /{til}/{sayt}{qolgan yo'l}.
//   Sayt domendan: robohub.uz va robohub-landing.vercel.app (lokalda localhost) → robohub;
//     Robohub Academy — shu saytning /academy sahifasi (robohub.uz/academy, /ru/academy, /en/academy — uch tilda).
//     Eski robohub-two / robohub-academy domenlari ham robohub'ga tushadi; robohub-academy… bosh sahifasi → /academy;
//   robosell bilan boshlanadigan domen (hozircha robosell-landing.vercel.app;
//     lokalda robosell.localhost) → robosell; qolgan hammasi (robohub-landing.vercel.app, localhost) → robohub.
//   ai-studio bilan boshlanadigan domen (ai-studio.vercel.app; lokalda ai-studio.localhost) → ai-studio (RoboHub AI Studio landingi);
//     shu landing Robohub domenida /ai-studio sahifasi sifatida ham ochiladi (robohub.uz/ai-studio, /ru/ai-studio, /en/ai-studio).
//   Til yo'lning boshidan: /ru, /en; prefiks bo'lmasa — o'zbekcha.
// Bu rewrite: brauzer manzili o'zgarmaydi, /uz/robohub kabi ichki yo'l foydalanuvchiga ko'rinmaydi.
// Domen → sayt: src/lib/site-host.ts (sitemap/robots ham shuni ishlatadi)

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
  const host = request.headers.get("host") ?? "";
  const site = siteFromHost(host);

  // Eski Academy domeni (robohub-academy…, robohub-academy-two…): bosh sahifa — yangi Academy
  if (host.toLowerCase().startsWith("robohub-academy") && (rest === "/" || rest === "")) {
    const url = request.nextUrl.clone();
    url.pathname = `${hasLocale(first) ? `/${first}` : ""}/academy`;
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
