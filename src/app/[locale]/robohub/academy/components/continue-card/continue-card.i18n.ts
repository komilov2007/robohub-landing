import { defineMessages } from "@/i18n/config";

export const messages = defineMessages({
  uz: {
    continue: "Davom ettiring",
    next: "Keyingi darslar",
    progress: (done: number, total: number) => `${done} / ${total} dars ko‘rildi`,
  },
  ru: {
    continue: "Продолжите",
    next: "Следующие уроки",
    progress: (done: number, total: number) => `Просмотрено уроков: ${done} / ${total}`,
  },
  en: {
    continue: "Continue watching",
    next: "Up next",
    progress: (done: number, total: number) => `${done} / ${total} lessons watched`,
  },
});
