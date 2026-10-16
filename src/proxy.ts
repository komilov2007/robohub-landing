import { NextResponse, type NextRequest } from "next/server";

// Bitta loyiha — ikki sayt. Domen qaysi saytni ko'rsatishni hal qiladi:
//   robosell bilan boshlanadigan domen (robosell.uz, robosell-uz.vercel.app, robosell.localhost) → app/robosell
//   qolgan hammasi (robohub.uz, robohub-uz.vercel.app, localhost, Vercel preview) → app/robohub
// Bu rewrite: brauzer manzili o'zgarmaydi, /robohub yoki /robosell foydalanuvchiga ko'rinmaydi.
type Site = "robohub" | "robosell";

function siteFromHost(host: string): Site {
  return host.toLowerCase().startsWith("robosell") ? "robosell" : "robohub";
}

export function proxy(request: NextRequest) {
  const site = siteFromHost(request.headers.get("host") ?? "");
  const url = request.nextUrl.clone();
  // Har doim prefiks qo'shiladi: robohub domenida /robosell ochilsa /robohub/robosell → 404,
  // ya'ni bir sayt ikkinchisini o'z domenida ko'rsatib qo'ymaydi.
  url.pathname = `/${site}${url.pathname === "/" ? "" : url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Next ichki fayllari, API va public/ dagi fayllar (nuqtali yo'llar: /ai/x.jpg, /favicon.ico) tegilmaydi
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
