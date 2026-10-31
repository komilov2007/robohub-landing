// Havolalar — bitta joyda.
import { locales, localeUrl, officialUrl, zoneHref, type Locale } from "@/i18n/config";
import { getLesson, getTopic } from "./academy";

// Academy — o'z subdomenida: academy.robohub.uz (/ru, /en …), academy.robohub.kz/kk, academy.robohub.kg/ky.
// Yo'llar ikki xil:
//   mantiqiy ("/academy/order") — hreflang, sitemap, til menyusi va boshqa saytlardan havola (localeUrl bilan);
//   subdomen ichidagi ("/ru/order") — Academy sahifalaridagi havolalar (academyHref, topicHref, lessonHref).
// Boshqa saytdan (Robohub, kalkulyator, AI Studio) Academy'ga — to'liq manzil: localeUrl(locale, lessonPath(...)).
export const ACADEMY_BASE = "/academy"; // mantiqiy yo'l
// Tilsiz mantiqiy yo'llar — til tanlash menyusi va hreflang uchun
export const topicPath = (topic: string) => `${ACADEMY_BASE}/${topic}`; // "/academy/order"
export const lessonPath = (topic: string, n: number) => {
  // Mavzuning asosiy darsi — mavzu sahifasining o'zi ("/academy/analytics"), bir xil sahifaga ikki manzil bo'lmasin.
  const lesson = getLesson(n, "uz");
  if (!lesson || lesson.topic !== topic || getTopic(topic, "uz")?.mainLesson === n) return topicPath(topic);
  return `${topicPath(topic)}/${lesson.slug}`; // "/academy/analytics/abc-analysis"
};

// Academy ichidagi havolalar (subdomen ichida): "/ru#help", "/ru/order", "/en/analytics/abc-analysis"
export const academyHref = (locale: Locale, hash = "") => `${zoneHref(locale, ACADEMY_BASE)}${hash}`;
export const topicHref = (locale: Locale, topic: string) => zoneHref(locale, topicPath(topic));
// Har bir darsning o'z sahifasi (SEO: Google'da alohida natija)
export const lessonHref = (locale: Locale, topic: string, n: number) => zoneHref(locale, lessonPath(topic, n));
// Boshqa saytlardan Academy'ga — to'liq manzil: "https://academy.robohub.uz/ru#help"
export const academyUrl = (locale: Locale, hash = "") => `${localeUrl(locale, ACADEMY_BASE)}${hash}`;
export const lessonUrl = (locale: Locale, topic: string, n: number) => localeUrl(locale, lessonPath(topic, n));

// <link rel="alternate" hreflang> uchun: tilsiz yo'l → har tildagi manzil (+ x-default — o'zbekcha)
export function languageAlternates(path: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of locales) map[l] = officialUrl(l, path); // to'liq manzil: qozoqcha — robohub.kz
  map["x-default"] = officialUrl("uz", path);
  return map;
}

// Eski havolalar (/academy/order?lesson=11) uchun — player-context ularni yangi manzilga almashtiradi
export const LESSON_PARAM = "lesson";

// Robohub landingi — boshqa domenda (robohub.uz, robohub.kz/kk …), joriy tilda — to'liq manzil
export const robohubHome = (locale: Locale) => localeUrl(locale, "/");
const withHash = (locale: Locale, hash: string) => `${localeUrl(locale, "/")}${hash}`;
export const robohubPricing = (locale: Locale) => withHash(locale, "#pricing"); // "https://robohub.uz/ru#pricing"
export const loginUrl = (locale: Locale) => withHash(locale, "#login");
// "Hoziroq boshlash" tugmalari (header, footer, bosh sahifa va mavzu CTA'lari) — sotuvchi kabineti
// (Hoziroq boshlash tugmalari endi Robohub landingiga olib boradi — robohubHome)
export const START_URL = "https://seller.robohub.uz";
export { YOUTUBE_URL as YOUTUBE_CHANNEL } from "@/lib/contacts";
export const PHONE = "+998 78 113 82 12";
export const PHONE_TEL = "tel:+998781138212";
// Email, Telegram, Instagram — umumiy: src/lib/contacts.ts
