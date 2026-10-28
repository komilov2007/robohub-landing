import type { Metadata } from "next";
import { defaultLocale, localeHref, locales, type Locale } from "@/i18n/config";
import { EMAIL, INSTAGRAM_URL, PHONE_HREF, TELEGRAM_URL, YOUTUBE_URL } from "@/lib/contacts";

// SEO — har landing uchun bir xil to'liq teglar: canonical, hreflang (+ x-default), Open Graph va Twitter kartasi, ulashish rasmi.
// Manzillar doim asosiy domen bilan (metadataBase): sahifa vercel.app'da ochilsa ham Google asl manzilni ko'radi.
export const ROBOHUB_ORIGIN = "https://robohub.uz";
// Robosell o'z domeni ulanganda shu yerda almashtiriladi
export const ROBOSELL_ORIGIN = "https://robosell-landing.vercel.app";

export const OG_LOCALE: Record<Locale, string> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
  kk: "kk_KZ",
  ky: "ky_KG",
  kaa: "kaa_UZ",
  tg: "tg_TJ",
};

type PageSeo = {
  origin: string;
  locale: Locale;
  path: string; // tilsiz yo'l: "/", "/calculator"
  title: string;
  description: string;
  siteName: string;
  image: string; // public/og/... — 1200×630; tilga bog'liq bo'lsa {locale} o'rniga til qo'yiladi
  // Matni tarjima qilingan tillar. Tarjimasi yo'q tildagi sahifa (masalan Robosell /ru) — o'zbekcha nusxasiga canonical,
  // hreflang'da ko'rsatilmaydi.
  translated?: readonly Locale[];
};

export function pageMetadata({ origin, locale, path, title, description, siteName, image, translated = locales }: PageSeo): Metadata {
  const own = translated.includes(locale) ? locale : defaultLocale;
  const canonical = localeHref(own, path);
  const languages: Record<string, string> = {};
  for (const l of translated) languages[l] = localeHref(l, path);
  languages["x-default"] = localeHref(defaultLocale, path);
  const images = [{ url: image.replace("{locale}", own), width: 1200, height: 630, alt: title }];
  return {
    metadataBase: new URL(origin),
    title,
    description,
    alternates: { canonical, languages: translated.length > 1 ? languages : undefined },
    openGraph: {
      type: "website",
      siteName,
      url: canonical,
      title,
      description,
      locale: OG_LOCALE[own],
      alternateLocale: translated.filter((l) => l !== own).map((l) => OG_LOCALE[l]),
      images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

// <script type="application/ld+json"> uchun xavfsiz matn ("<" — JSON ichida HTML teg yopilib qolmasin)
export const jsonLd = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") });

// Robohub kompaniyasi — Organization (bosh sahifa) va boshqa sxemalarda "publisher"/"provider" sifatida
export const ROBOHUB_ORG = {
  "@type": "Organization",
  "@id": `${ROBOHUB_ORIGIN}/#organization`,
  name: "Robohub",
  url: ROBOHUB_ORIGIN,
  logo: `${ROBOHUB_ORIGIN}/logo/robohub.png`,
  email: EMAIL,
  telephone: PHONE_HREF.replace("tel:", ""),
  sameAs: [INSTAGRAM_URL.robohub, YOUTUBE_URL, TELEGRAM_URL],
} as const;
