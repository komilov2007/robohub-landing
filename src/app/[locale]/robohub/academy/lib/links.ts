// Havolalar — bitta joyda.
import { getLesson, getTopic } from "./academy";

// Academy — Robohub saytining /academy sahifasi (robohub.uz/academy, robohub-landing.vercel.app/academy).
// Academy ichidagi barcha havolalar shu yordamchilar orqali quriladi.
export const ACADEMY_BASE = "/academy";
export const academyHref = (hash = "") => `${ACADEMY_BASE}${hash}`; // "/academy", "/academy#help"
export const topicHref = (topic: string) => `${ACADEMY_BASE}/${topic}`; // "/academy/order"
// Har bir darsning o'z sahifasi (SEO: Google'da alohida natija): "/academy/analytics/abc-analysis".
// Mavzuning asosiy darsi — mavzu sahifasining o'zi ("/academy/analytics"), bir xil sahifaga ikki manzil bo'lmasin.
export const lessonHref = (topic: string, n: number) => {
  const lesson = getLesson(n);
  if (!lesson || lesson.topic !== topic || getTopic(topic)?.mainLesson === n) return topicHref(topic);
  return `${topicHref(topic)}/${lesson.slug}`;
};
// Eski havolalar (/academy/order?lesson=11) uchun — player-context ularni yangi manzilga almashtiradi
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
