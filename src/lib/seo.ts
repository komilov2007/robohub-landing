import type { Metadata } from "next";
import { defaultLocale, localeHref, locales, officialUrl, ROBOHUB_UZ, type Locale } from "@/i18n/config";
import { EMAIL, INSTAGRAM_URL, OFFICE_ADDRESS, OFFICE_MAP_URL, PHONE_HREF, TELEGRAM_URL, YOUTUBE_URL } from "@/lib/contacts";

// SEO — har landing uchun bir xil to'liq teglar: canonical, hreflang (+ x-default), Open Graph va Twitter kartasi, ulashish rasmi.
// Manzillar doim asosiy domen bilan (metadataBase): sahifa vercel.app'da ochilsa ham Google asl manzilni ko'radi.
// Qozoqcha sahifalar — robohub.kz (i18n/config.ts: localeUrl); Organization, logo va h.k. — robohub.uz.
export const ROBOHUB_ORIGIN = ROBOHUB_UZ;
// Robosell o'z domeni ulanganda shu yerda almashtiriladi
export const ROBOSELL_ORIGIN = "https://robosell-landing.vercel.app";
// Brend yozilishi — title, OG, schema'da bir xil
export const BRAND = "Robohub";
// Robohub'ning bitta ta'rifi (inglizcha) — Organization schema va /llms.txt da bir xil
export const ROBOHUB_DESCRIPTION_EN =
  "Robohub is an Uzbek SaaS platform for marketplace sellers: manage Uzum Market, Wildberries, Ozon and Yandex Market stores — orders, product cards, prices, stock and analytics — from one dashboard.";

// og:locale. Qoraqalpoq (kaa) uchun standart locale yo'q — teg qo'yilmaydi.
export const OG_LOCALE: Record<Locale, string | undefined> = {
  uz: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
  kk: "kk_KZ",
  ky: "ky_KG",
  kaa: undefined,
  tg: "tg_TJ",
};

// VAQTINCHALIK: kk, ky, tg, kaa uchun alohida ulashish rasmi hali yo'q (public/og/*-{til}.jpg) —
// kirill tillari ruscha, qoraqalpoqcha o'zbekcha rasmni oladi. TODO: har til uchun 1200×630 rasm (seo-report/README.md).
const OG_IMAGE_LOCALE: Record<Locale, Locale> = { uz: "uz", ru: "ru", en: "en", kk: "ru", ky: "ru", tg: "ru", kaa: "uz" };

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
  // Robohub sahifalari — har til o'z domenida (kk → robohub.kz), shuning uchun to'liq manzil; Robosell — o'z domenida
  const href = (l: Locale) => (origin === ROBOHUB_ORIGIN ? officialUrl(l, path) : localeHref(l, path));
  const canonical = href(own);
  const languages: Record<string, string> = {};
  for (const l of translated) languages[l] = href(l);
  languages["x-default"] = href(defaultLocale);
  const images = [{ url: image.replace("{locale}", OG_IMAGE_LOCALE[own]), width: 1200, height: 630, alt: title }];
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
      alternateLocale: translated
        .filter((l) => l !== own)
        .map((l) => OG_LOCALE[l])
        .filter((x): x is string => !!x),
      images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

// <script type="application/ld+json"> uchun xavfsiz matn ("<" — JSON ichida HTML teg yopilib qolmasin)
export const jsonLd = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") });

// Ofis koordinatasi — Yandex xarita havolasidagi nuqta (contacts.ts: OFFICE_MAP_URL, "pt=uzunlik,kenglik")
const [lng, lat] = new URL(OFFICE_MAP_URL).searchParams.get("pt")!.split(",").map(Number);

// Robohub kompaniyasi — to'liq Organization faqat bosh sahifada; boshqa sahifalar unga @id orqali havola qiladi (ROBOHUB_ORG_REF)
export const ROBOHUB_ORG = {
  "@type": "Organization",
  "@id": `${ROBOHUB_ORIGIN}/#organization`,
  name: BRAND,
  // Yuridik nomi — davlat ro'yxatidan o'tganlik guvohnomasidagi kabi (footer, public/certificates)
  legalName: "“Robohub” MChJ",
  // Bitta tavsif — llms.txt va sahifalardagi matn bilan bir xil (AI yordamchilar bir xil ta'rifni takrorlashi uchun)
  description: ROBOHUB_DESCRIPTION_EN,
  url: ROBOHUB_ORIGIN,
  logo: { "@type": "ImageObject", url: `${ROBOHUB_ORIGIN}/logo/robohub.png`, width: 512, height: 512 },
  email: EMAIL,
  telephone: PHONE_HREF.replace("tel:", ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: OFFICE_ADDRESS.en.replace(/, Tashkent$/, ""),
    addressLocality: "Tashkent",
    addressCountry: "UZ",
  },
  location: { "@type": "Place", geo: { "@type": "GeoCoordinates", latitude: lat, longitude: lng } },
  contactPoint: [
    { "@type": "ContactPoint", contactType: "customer support", telephone: PHONE_HREF.replace("tel:", ""), email: EMAIL, url: TELEGRAM_URL },
  ],
  // Ishlaydigan mamlakatlar — marketpleyslar bo'limidagi ro'yxat (components/market/regions-data.ts)
  areaServed: ["UZ", "KZ", "KG", "RU", "TJ"].map((c) => ({ "@type": "Country", name: c })),
  award: "President Tech Award",
  // Rasmiy profillar. TODO: LinkedIn, Facebook, Telegram kanal, IT Park katalogi, Yandex Biznes va Google Business Profile
  // sahifalari ochilgach — shu yerga (TZ "SEO, GEO", 2.10). @robohubsupport — qo'llab-quvvatlash chati, profil emas.
  sameAs: [INSTAGRAM_URL.robohub, YOUTUBE_URL],
} as const;
export const ROBOHUB_ORG_REF = { "@id": ROBOHUB_ORG["@id"] } as const;
export const ROBOHUB_WEBSITE_REF = { "@id": `${ROBOHUB_ORIGIN}/#website` } as const;

// Landingning ulashish rasmi (to'liq manzil) — JSON-LD uchun: ogImageUrl("academy", "kk") → https://robohub.uz/og/academy-ru.jpg
export const ogImageUrl = (name: string, locale: Locale) => `${ROBOHUB_ORIGIN}/og/${name}-${OG_IMAGE_LOCALE[locale]}.jpg`;
