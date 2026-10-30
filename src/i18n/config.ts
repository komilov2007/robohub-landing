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

// Rasmiy domenlar. Mamlakat domeni tilga qarab: qozoqcha — .kz, qirg'izcha — .kg, qolgan tillar — .uz.
// Har mamlakatda uchta sayt (zona): robohub.{uz,kz,kg} (bosh sahifa, kalkulyator, ariza …),
// academy.robohub.{uz,kz,kg} va aistudio.robohub.{uz,kz,kg}.
// Kodda sahifa "mantiqiy yo'l" bilan yoziladi — hammasi bitta domendagidek: "/", "/calculator", "/academy/order", "/aistudio".
// localeUrl uni rasmiy to'liq manzilga aylantiradi: localeUrl("kk", "/academy/order") → "https://academy.robohub.kz/kk/order".
// Domenlar orasidagi yo'naltirish — src/proxy.ts; canonical, hreflang va sitemap — localeUrl.
export type Tld = "uz" | "kz" | "kg";
export type Zone = "main" | "academy" | "aistudio";
export const localeTld = (locale: Locale): Tld => (locale === "kk" ? "kz" : locale === "ky" ? "kg" : "uz");
// Mamlakat domenining tilsiz manzili qaysi tilda: robohub.kz → kk, robohub.kg → ky, robohub.uz → uz
export const TLD_LOCALE: Record<Tld, Locale> = { uz: "uz", kz: "kk", kg: "ky" };
export const zoneOrigin = (zone: Zone, locale: Locale) =>
  `https://${zone === "main" ? "" : `${zone}.`}robohub.${localeTld(locale)}`;
export const ROBOHUB_UZ = "https://robohub.uz";
export const localeOrigin = (locale: Locale) => zoneOrigin("main", locale);

// Mantiqiy yo'l → zona va zona ichidagi yo'l: "/academy/order" → academy + "/order", "/calculator" → main + "/calculator"
export function splitZone(path: string): { zone: Zone; path: string } {
  const [, first = "", ...rest] = path.split("/");
  if (first === "academy" || first === "aistudio") return { zone: first, path: `/${rest.join("/")}` };
  return { zone: "main", path };
}
// Zona ichidagi yo'l joriy tilda: zoneHref("ru", "/academy/order") → "/ru/order" (academy subdomenidagi havola)
export const zoneHref = (locale: Locale, path: string) => localeHref(locale, splitZone(path).path);
// To'liq rasmiy manzil: localeUrl("uz", "/") → "https://robohub.uz", localeUrl("ru", "/aistudio") → "https://aistudio.robohub.uz/ru"
export function localeUrl(locale: Locale, path = "/"): string {
  const z = splitZone(path);
  return zoneOrigin(z.zone, locale) + (z.path === "/" && locale === defaultLocale ? "" : localeHref(locale, z.path));
}

// Domen tilni majburlamaydi: robohub.uz/kk ham, robohub.kz/ru ham ochiladi. Faqat tilsiz manzil — mamlakat tili
// (robohub.kz → /kk, robohub.kg → /ky). Shuning uchun .kz/.kg da o'zbekcha prefiks bilan yoziladi: /uz, /calculator/uz.
//   prefixedHref("uz", "/") → "/uz", prefixedHref("uz", "/calculator") → "/calculator/uz"; boshqa tillar — localeHref
export function prefixedHref(locale: Locale, path = "/"): string {
  if (locale !== defaultLocale) return localeHref(locale, path);
  const [, first = "", ...rest] = path.split("/");
  if ((SECTIONS as readonly string[]).includes(first)) return `/${first}/${locale}${rest.length ? `/${rest.join("/")}` : ""}`;
  return `/${locale}${path === "/" ? "" : path}`;
}
// Shu domendagi manzil: o'zbekcha .kz/.kg da — prefiks bilan, qolgan hamma holatda — localeHref
export const hostHref = (tld: Tld, locale: Locale, path = "/") =>
  tld !== "uz" && locale === defaultLocale ? prefixedHref(locale, path) : localeHref(locale, path);

// Robohub bosh saytidan (robohub.uz, kalkulyator …) havola: o'z zonasidagi sahifa — nisbiy yo'l,
// Academy va AI Studio — to'liq manzil: siteHref("ru", "/calculator") → "/calculator/ru", siteHref("ru", "/aistudio") → "https://aistudio.robohub.uz/ru"
export const siteHref = (locale: Locale, path: string) =>
  splitZone(path).zone === "main" ? localeHref(locale, path) : localeUrl(locale, path);

// Rasmiy domenmi (www bilan ham): robohub.kz, academy.robohub.uz, aistudio.robohub.kg → { zone, tld }.
// vercel.app, localhost va boshqalar — null. "ai-studio." va "iastudio." ham AI Studio deb olinadi.
export function parseProdHost(host: string): { zone: Zone; tld: Tld } | null {
  const m = /^(?:www\.)?(?:(academy|aistudio|ai-studio|iastudio)\.)?robohub\.(uz|kz|kg)$/i.exec(host.split(":")[0]);
  if (!m) return null;
  const sub = m[1]?.toLowerCase();
  return { zone: !sub ? "main" : sub === "academy" ? "academy" : "aistudio", tld: m[2].toLowerCase() as Tld };
}
// Har qanday domen qaysi zonada: rasmiy domenlar + lokal/preview (academy.localhost, ai-studio.localhost, ai-studio….vercel.app)
export function hostZone(host: string): Zone {
  const prod = parseProdHost(host);
  if (prod) return prod.zone;
  const h = host.toLowerCase();
  if (h.startsWith("academy.")) return "academy";
  if (/^(ai-?studio|iastudio)/.test(h)) return "aistudio";
  return "main";
}

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
