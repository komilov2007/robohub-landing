// Tillar ro'yxati — ikkala sayt (robohub, robosell) va proxy uchun yagona manba.
// O'zbekcha — asosiy til, manzilda prefikssiz (/). Qolganlari: /ru, /en.
export const locales = ["uz", "ru", "en"] as const;
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
};

// Berilgan tildagi manzil: localeHref("ru", "/") → "/ru", localeHref("uz", "/") → "/".
export function localeHref(locale: Locale, path = "/"): string {
  const rest = path === "/" ? "" : path;
  return locale === defaultLocale ? path : `/${locale}${rest}`;
}

// Komponent tarjimalari: uz — namuna, ru va en aynan shu tuzilishda bo'lishi shart
// (NoInfer: tur faqat uz dan olinadi, ru/en da kalit yetishmasa yoki ortiqcha bo'lsa — xato).
export type Messages<T> = Record<Locale, T>;
export function defineMessages<T>(messages: { uz: T; ru: NoInfer<T>; en: NoInfer<T> }): Messages<T> {
  return messages;
}
