// Havolalar — bitta joyda.

// Academy — Robohub saytining /academy sahifasi (robohub.uz/academy, robohub-landing.vercel.app/academy).
// Academy ichidagi barcha havolalar shu yordamchilar orqali quriladi.
export const ACADEMY_BASE = "/academy";
export const academyHref = (hash = "") => `${ACADEMY_BASE}${hash}`; // "/academy", "/academy#help"
export const topicHref = (topic: string) => `${ACADEMY_BASE}/${topic}`; // "/academy/order"
export const lessonHref = (topic: string, n: number) => `${ACADEMY_BASE}/${topic}?lesson=${n}`; // "/academy/order?lesson=11"
// URL'dagi tanlangan dars parametri: /academy/order?lesson=11 (player-context)
export const LESSON_PARAM = "lesson";

// Robohub landingi — shu saytning o'zi
export const ROBOHUB_HOME = "/";
export const ROBOHUB_PRICING = "/#pricing";
export const LOGIN_URL = "/#login";
// "Hoziroq boshlash" tugmalari (header, footer, bosh sahifa va mavzu CTA'lari) — sotuvchi kabineti
export const START_URL = "https://seller.robohub.uz";
export { YOUTUBE_URL as YOUTUBE_CHANNEL } from "@/lib/contacts";
export const PHONE = "+998 78 113 82 12";
export const PHONE_TEL = "tel:+998781138212";
// Email, Telegram, Instagram — umumiy: src/lib/contacts.ts
