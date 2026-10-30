// Tillar ro'yxati — barcha saytlar (robohub, robosell, ai-studio) va proxy uchun yagona manba.
// O'zbekcha — asosiy til, manzilda prefikssiz (/). Qolganlari: /ru, /en, /kk, /ky, /kaa, /tg.
// kk — qozoqcha, ky — qirg'izcha, tg — tojikcha (kirill); kaa — qoraqalpoqcha (lotin, 2016-yilgi alifbo).
export const locales = ["uz", "ru", "en", "kk", "ky", "kaa", "tg"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uz";

// Proxy joriy tilni shu so'rov sarlavhasida uzatadi — root parametr yo'q joyda (global-not-found) o'qish uchun
export const LOCALE_HEADER = "x-locale";

export function hasLocale(value: string | undefined): value is Locale {
  return (locales as readonly string[]).includes(value ?? "");
}

// Til tanlash menyusi uchun: o'z tilidagi nomi, qisqa kodi va bayrog'i (public/flags).
export const localeMeta: Record<Locale, { label: string; short: string; flag: string }> = {
  uz: { label: "Oʻzbekcha", short: "UZ", flag: "/flags/uz.svg" },
  ru: { label: "Русский", short: "RU", flag: "/flags/ru.svg" },
  en: { label: "English", short: "EN", flag: "/flags/gb.svg" },
  kk: { label: "Қазақша", short: "KK", flag: "/flags/kz.svg" },
  ky: { label: "Кыргызча", short: "KY", flag: "/flags/kg.svg" },
  kaa: { label: "Qaraqalpaqsha", short: "QQ", flag: "/flags/kaa.svg" },
  tg: { label: "Тоҷикӣ", short: "TG", flag: "/flags/tj.svg" },
};

// Intl (son, sana, ko'plik shakllari) uchun til teglari.
// Brauzerlarda qoraqalpoqcha ma'lumotlar yo'q — o'zbekcha (lotin) qoidalar ishlatiladi.
export const intlLocale: Record<Locale, string> = {
  uz: "uz-Latn-UZ",
  ru: "ru-RU",
  en: "en-GB",
  kk: "kk-KZ",
  ky: "ky-KG",
  kaa: "uz-Latn-UZ",
  tg: "tg-TJ",
};

// Kirill yozuvidagi tillar (ru, kk, ky, tg) — ba'zi joylarda (masalan, kalkulyator AI qidiruvi) shunga qarab tanlanadi
export const isCyrillicLocale = (locale: Locale) => locale === "ru" || locale === "kk" || locale === "ky" || locale === "tg";

// Robohub domenidagi bo'lim-landinglar: til kodi bo'lim nomidan KEYIN keladi (robohub.uz/academy/ru/order).
// Bosh sahifa va boshqa sahifalarda til — boshida (robohub.uz/ru, /ru/application/…).
export const SECTIONS = ["academy", "aistudio", "calculator"] as const;

// Berilgan tildagi manzil (path — tilsiz yo'l):
//   localeHref("ru", "/") → "/ru", localeHref("uz", "/") → "/",
//   localeHref("ru", "/academy/order") → "/academy/ru/order", localeHref("uz", "/academy") → "/academy".
export function localeHref(locale: Locale, path = "/"): string {
  if (locale === defaultLocale) return path;
  const [, first = "", ...rest] = path.split("/");
  if ((SECTIONS as readonly string[]).includes(first)) return `/${first}/${locale}${rest.length ? `/${rest.join("/")}` : ""}`;
  return `/${locale}${path === "/" ? "" : path}`;
}

// Rasmiy domenlar: qozoqcha — robohub.kz (robohub.kz/kk, robohub.kz/academy/kk/…), qolgan tillar — robohub.uz.
// Domenlar orasidagi yo'naltirish — src/proxy.ts; canonical, hreflang va sitemap — localeUrl.
export const ROBOHUB_UZ = "https://robohub.uz";
export const ROBOHUB_KZ = "https://robohub.kz";
export const localeOrigin = (locale: Locale) => (locale === "kk" ? ROBOHUB_KZ : ROBOHUB_UZ);
// To'liq rasmiy manzil: localeUrl("kk", "/academy") → "https://robohub.kz/academy/kk", localeUrl("uz", "/") → "https://robohub.uz"
export const localeUrl = (locale: Locale, path = "/") =>
  localeOrigin(locale) + (path === "/" && locale === defaultLocale ? "" : localeHref(locale, path));
// Ishlab turgan rasmiy domenlar (www bilan ham) — vercel.app va localhost bundan mustasno
export const isUzHost = (host: string) => /^(www\.)?robohub\.uz$/i.test(host);
export const isKzHost = (host: string) => /^(www\.)?robohub\.kz$/i.test(host);

// Brauzer manzilidan tilsiz yo'l: "/academy/ru/order" → "/academy/order", "/ru" → "/", "/academy" → "/academy".
export function stripLocale(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (hasLocale(parts[0])) parts.shift();
  else if ((SECTIONS as readonly string[]).includes(parts[0]) && hasLocale(parts[1])) parts.splice(1, 1);
  return `/${parts.join("/")}`;
}

// Komponent tarjimalari: uz — namuna, qolgan tillar aynan shu tuzilishda bo'lishi shart
// (NoInfer: tur faqat uz dan olinadi, boshqa tilda kalit yetishmasa yoki ortiqcha bo'lsa — xato).
export type Messages<T> = Record<Locale, T>;
export function defineMessages<T>(messages: { uz: T } & Record<Exclude<Locale, "uz">, NoInfer<T>>): Messages<T> {
  return messages;
}
