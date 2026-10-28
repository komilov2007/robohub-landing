import { defineMessages } from "@/i18n/config";

export const messages = defineMessages({
  uz: { done: "Tugatildi", pct: (p: number) => `${p}% ko‘rildi`, start: "Boshlash" },
  ru: { done: "Пройдено", pct: (p: number) => `Просмотрено ${p}%`, start: "Начать" },
  en: { done: "Completed", pct: (p: number) => `${p}% watched`, start: "Start" },
  kk: { done: "Аяқталды", pct: (p: number) => `${p}% көрілді`, start: "Бастау" },
  ky: { done: "Аякталды", pct: (p: number) => `${p}% көрүлдү`, start: "Баштоо" },
  kaa: { done: "Tamamlandı", pct: (p: number) => `${p}% kórildi`, start: "Baslaw" },
  tg: { done: "Анҷом ёфт", pct: (p: number) => `${p}% тамошо шуд`, start: "Оғоз" },
});
