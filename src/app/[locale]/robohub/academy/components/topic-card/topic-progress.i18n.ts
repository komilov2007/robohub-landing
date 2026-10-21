import { defineMessages } from "@/i18n/config";

export const messages = defineMessages({
  uz: { done: "Tugatildi", pct: (p: number) => `${p}% ko‘rildi`, start: "Boshlash" },
  ru: { done: "Пройдено", pct: (p: number) => `Просмотрено ${p}%`, start: "Начать" },
  en: { done: "Completed", pct: (p: number) => `${p}% watched`, start: "Start" },
});
