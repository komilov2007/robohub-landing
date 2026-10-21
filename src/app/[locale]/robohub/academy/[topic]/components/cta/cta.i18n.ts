import { defineMessages } from "@/i18n/config";

// Sarlavha uch bo'lakda: before + <gradient>mark</gradient> + after
export const messages = defineMessages({
  uz: {
    kicker: "Amalda sinab ko‘ring",
    title: (name: string) => ({ before: `${name}ni bugun`, mark: "o‘z kabinetingizda", after: "sinab ko‘ring" }),
    text: "Darsdagi har bir qadamni o‘z kabinetingizda takrorlang.",
    start: "Hoziroq boshlash",
    next: (name: string) => `Keyingi mavzu: ${name}`,
  },
  ru: {
    kicker: "Попробуйте на практике",
    title: (name: string) => ({ before: `Попробуйте «${name}» сегодня`, mark: "в своём кабинете", after: "" }),
    text: "Повторите каждый шаг из урока в своём кабинете.",
    start: "Начать сейчас",
    next: (name: string) => `Следующая тема: ${name}`,
  },
  en: {
    kicker: "Try it in practice",
    title: (name: string) => ({ before: `Try ${name} today`, mark: "in your own account", after: "" }),
    text: "Repeat every step from the lesson in your own account.",
    start: "Get started",
    next: (name: string) => `Next topic: ${name}`,
  },
});
