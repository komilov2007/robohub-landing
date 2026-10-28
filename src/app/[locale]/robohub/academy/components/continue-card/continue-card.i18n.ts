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
  kk: {
    continue: "Жалғастырыңыз",
    next: "Келесі сабақтар",
    progress: (done: number, total: number) => `${done} / ${total} сабақ көрілді`,
  },
  ky: {
    continue: "Улантыңыз",
    next: "Кийинки сабактар",
    progress: (done: number, total: number) => `${done} / ${total} сабак көрүлдү`,
  },
  kaa: {
    continue: "Dawam ettiriń",
    next: "Keyingi sabaqlar",
    progress: (done: number, total: number) => `${done} / ${total} sabaq kórildi`,
  },
  tg: {
    continue: "Идома диҳед",
    next: "Дарсҳои навбатӣ",
    progress: (done: number, total: number) => `${done} / ${total} дарс тамошо шуд`,
  },
});
