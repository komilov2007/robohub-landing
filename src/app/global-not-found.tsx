// globals.css — birinchi: sahifalarning o'z uslublari (.container ustidan yozadigan padding va h.k.) undan keyin yuklanishi kerak
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import Robohub404 from "@/components/robohub-404/robohub-404";
import { messages as robohubMessages } from "@/components/robohub-404/robohub-404.i18n";
import { defaultLocale, hasLocale, LOCALE_HEADER, type Locale } from "@/i18n/config";
import { siteFromHost, type Site } from "@/lib/site-host";
import { messages as robosellMessages } from "./[locale]/robosell/components/not-found/not-found.i18n";
import { manrope, unbounded } from "./fonts";

// 404 — hech bir sahifaga mos kelmagan har qanday manzil (robohub.uz/foo, /academy/a/b/c, /calculator/x, robosell…/x).
// Layout'siz, to'liq HTML hujjat bo'lib render qilinadi (next.config: experimental.globalNotFound), status — 404.
// Ikki xil sahifa: Robohub domeni (bosh sahifa, Academy, Kalkulyator, AI Studio) va AI Studio domeni — Robohub 404;
// Robosell domeni — o'z 404 sahifasi. Sayt — domendan, til — proxy qo'ygan sarlavhadan (src/proxy.ts).
async function context(): Promise<{ site: Site; locale: Locale }> {
  const h = await headers();
  const value = h.get(LOCALE_HEADER) ?? undefined;
  return { site: siteFromHost(h.get("host") ?? ""), locale: hasLocale(value) ? value : defaultLocale };
}

// Sahifa domen va tilga bog'liq (headers) — statik qobiq yo'q, har so'rovda to'liq render qilinadi
export const instant = false;

export const viewport: Viewport = {
  themeColor: "#00524F",
};

export async function generateMetadata(): Promise<Metadata> {
  const { site, locale } = await context();
  if (site === "robosell") return { title: robosellMessages[locale].title };
  return { title: `${robohubMessages[locale].title} — ${site === "ai-studio" ? "Robohub AI Studio" : "Robohub"}` };
}

export default async function GlobalNotFound() {
  const { site, locale } = await context();
  // Robosell 404 — dinamik import: statik import qilinsa, uning Onest shrifti (preload) va CSS'i
  // Robohub'ning barcha sahifalariga ham tushib qolardi
  const Robosell404 =
    site === "robosell" ? (await import("./[locale]/robosell/components/not-found/not-found")).default : null;
  return (
    <html lang={locale} className={`${unbounded.variable} ${manrope.variable}`}>
      <body>{site === "robosell" && Robosell404 ? <Robosell404 locale={locale} /> : site !== "robosell" && <Robohub404 site={site} locale={locale} />}</body>
    </html>
  );
}
