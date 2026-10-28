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

// Berilgan tildagi manzil: localeHref("ru", "/") → "/ru", localeHref("uz", "/") → "/".
export function localeHref(locale: Locale, path = "/"): string {
  const rest = path === "/" ? "" : path;
  return locale === defaultLocale ? path : `/${locale}${rest}`;
}

// Komponent tarjimalari: uz — namuna, qolgan tillar aynan shu tuzilishda bo'lishi shart
// (NoInfer: tur faqat uz dan olinadi, boshqa tilda kalit yetishmasa yoki ortiqcha bo'lsa — xato).
export type Messages<T> = Record<Locale, T>;
export function defineMessages<T>(messages: { uz: T } & Record<Exclude<Locale, "uz">, NoInfer<T>>): Messages<T> {
  return messages;
}
