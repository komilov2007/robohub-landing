// Havolalar — bitta joyda.
import { localeHref, locales, type Locale } from "@/i18n/config";
import { getLesson, getTopic } from "./academy";

// Academy — Robohub saytining /academy sahifasi (robohub.uz/academy, /ru/academy, /en/academy).
// Academy ichidagi barcha havolalar shu yordamchilar orqali quriladi — har biri joriy tilni oladi
// (uz — prefikssiz, ru/en — /ru, /en; src/i18n/config.ts localeHref).
export const ACADEMY_BASE = "/academy"; // tilsiz yo'l
// Tilsiz yo'llar — til tanlash menyusi va hreflang uchun (keyin localeHref bilan har tilga o'giriladi)
export const topicPath = (topic: string) => `${ACADEMY_BASE}/${topic}`; // "/academy/order"
export const lessonPath = (topic: string, n: number) => {
  // Mavzuning asosiy darsi — mavzu sahifasining o'zi ("/academy/analytics"), bir xil sahifaga ikki manzil bo'lmasin.
  const lesson = getLesson(n, "uz");
  if (!lesson || lesson.topic !== topic || getTopic(topic, "uz")?.mainLesson === n) return topicPath(topic);
  return `${topicPath(topic)}/${lesson.slug}`; // "/academy/analytics/abc-analysis"
};

export const academyHref = (locale: Locale, hash = "") => `${localeHref(locale, ACADEMY_BASE)}${hash}`; // "/ru/academy#help"
export const topicHref = (locale: Locale, topic: string) => localeHref(locale, topicPath(topic)); // "/ru/academy/order"
// Har bir darsning o'z sahifasi (SEO: Google'da alohida natija): "/en/academy/analytics/abc-analysis".
export const lessonHref = (locale: Locale, topic: string, n: number) => localeHref(locale, lessonPath(topic, n));

// <link rel="alternate" hreflang> uchun: tilsiz yo'l → har tildagi manzil (+ x-default — o'zbekcha)
export function languageAlternates(path: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of locales) map[l] = localeHref(l, path);
  map["x-default"] = localeHref("uz", path);
  return map;
}

// Eski havolalar (/academy/order?lesson=11) uchun — player-context ularni yangi manzilga almashtiradi
export const LESSON_PARAM = "lesson";

// Robohub landingi — shu saytning o'zi, joriy tilda
export const robohubHome = (locale: Locale) => localeHref(locale, "/");
const withHash = (locale: Locale, hash: string) => `${locale === "uz" ? "/" : localeHref(locale, "/")}${hash}`;
export const robohubPricing = (locale: Locale) => withHash(locale, "#pricing"); // "/#pricing", "/ru#pricing"
export const loginUrl = (locale: Locale) => withHash(locale, "#login");
// "Hoziroq boshlash" tugmalari (header, footer, bosh sahifa va mavzu CTA'lari) — sotuvchi kabineti
// (Hoziroq boshlash tugmalari endi Robohub landingiga olib boradi — robohubHome)
export const START_URL = "https://seller.robohub.uz";
export { YOUTUBE_URL as YOUTUBE_CHANNEL } from "@/lib/contacts";
export const PHONE = "+998 78 113 82 12";
export const PHONE_TEL = "tel:+998781138212";
// Email, Telegram, Instagram — umumiy: src/lib/contacts.ts
