import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale } from "@/i18n/config";

// Bitta loyiha — ikki sayt, uch til. Ichki manzil: /{til}/{sayt}{qolgan yo'l}.
//   Sayt domendan: robosell bilan boshlanadigan domen (robosell.uz, robosell-uz.vercel.app,
//     robosell.localhost) → robosell; qolgan hammasi (robohub.uz, localhost, Vercel preview) → robohub.
//   Til yo'lning boshidan: /ru, /en; prefiks bo'lmasa — o'zbekcha.
// Bu rewrite: brauzer manzili o'zgarmaydi, /uz/robohub kabi ichki yo'l foydalanuvchiga ko'rinmaydi.
type Site = "robohub" | "robosell";

function siteFromHost(host: string): Site {
  return host.toLowerCase().startsWith("robosell") ? "robosell" : "robohub";
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
