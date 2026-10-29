import type { Metadata } from "next";

// Robohub sayti (robohub.uz): bosh sahifa — (landing) guruhida, Academy — /academy, AI Studio — /aistudio,
// Kalkulyator — /calculator (har biri o'z header, footer va uslublari bilan). Har biri o'z uslub va metadata'sini o'zi yuklaydi.
// Bu yerda — 4 landing uchun umumiy head teglari: robots, ikonlar, manifest va webmaster tasdiqlash kodlari.

// Google Search Console va Yandex Webmaster tasdiqlash kodlari — Vercel'da env o'zgaruvchisi sifatida qo'yiladi
// (Settings → Environment Variables). TODO: kodlarni olish — seo-report/README.md, "Deploy'dan keyin".
const GOOGLE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION;
const YANDEX_VERIFICATION = process.env.YANDEX_VERIFICATION;

export const metadata: Metadata = {
  // vercel.app manzillari baribir X-Robots-Tag: noindex oladi (next.config.ts) — HTTP sarlavha meta tegdan ustun turadi
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  icons: { apple: { url: "/apple-touch-icon.png", sizes: "180x180" } },
  manifest: "/site.webmanifest",
  verification: {
    ...(GOOGLE_VERIFICATION && { google: GOOGLE_VERIFICATION }),
    ...(YANDEX_VERIFICATION && { yandex: YANDEX_VERIFICATION }),
  },
};

export default function RobohubLayout({ children }: LayoutProps<"/[locale]/robohub">) {
  return children;
}
