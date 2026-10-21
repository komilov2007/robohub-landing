import { defineMessages } from "@/i18n/config";

export const messages = defineMessages({
  uz: {
    kicker: "Boshlang‘ich yo‘l",
    title: "Yangi boshlayapsizmi?",
    titleMark: "Shu tartibda ko‘ring",
    steps: (n: number) => `${n} qadam`,
    done: "Tugatildi",
    step: (n: number) => `${n}-qadam`,
  },
  ru: {
    kicker: "С чего начать",
    title: "Только начинаете?",
    titleMark: "Смотрите в этом порядке",
    steps: (n: number) => (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? `${n} шага` : n % 10 === 1 && n % 100 !== 11 ? `${n} шаг` : `${n} шагов`),
    done: "Пройдено",
    step: (n: number) => `Шаг ${n}`,
  },
  en: {
    kicker: "Getting started",
    title: "Just getting started?",
    titleMark: "Watch in this order",
    steps: (n: number) => `${n} steps`,
    done: "Completed",
    step: (n: number) => `Step ${n}`,
  },
});
