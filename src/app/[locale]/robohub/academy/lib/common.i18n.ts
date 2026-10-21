import { defineMessages } from "@/i18n/config";

// Academy bo'ylab takrorlanadigan qisqa matnlar ("5-dars", "3 dars", "12 daqiqa"…) — bir nechta komponent ishlatadi.
// Ruscha son bilan kelishuv: 1 урок, 2 урока, 5 уроков.
export function ruWord(n: number, one: string, few: string, many: string): string {
  const d = n % 10;
  const h = n % 100;
  if (d === 1 && h !== 11) return one;
  if (d >= 2 && d <= 4 && (h < 12 || h > 14)) return few;
  return many;
}
const ru = (n: number, one: string, few: string, many: string) => `${n} ${ruWord(n, one, few, many)}`;
const en = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export const common = defineMessages({
  uz: {
    lessonN: (n: number) => `${n}-dars`,
    lessons: (n: number) => `${n} dars`,
    topics: (n: number) => `${n} mavzu`,
    minutes: (n: number) => `${n} daqiqa`,
    minShort: (n: number) => `${n} daq`,
    watchedOf: (done: number, total: number) => `${done} / ${total} ko‘rildi`,
    watched: "ko‘rildi",
    more: (n: number) => `+ yana ${n} ta dars`,
    startHere: "Shu yerdan boshlang",
    // Videolar o'zbek tilida — ru/en da player yonida eslatma; uz da kerak emas
    videoLang: "",
  },
  ru: {
    lessonN: (n: number) => `Урок ${n}`,
    lessons: (n: number) => ru(n, "урок", "урока", "уроков"),
    topics: (n: number) => ru(n, "тема", "темы", "тем"),
    minutes: (n: number) => ru(n, "минута", "минуты", "минут"),
    minShort: (n: number) => `${n} мин`,
    watchedOf: (done: number, total: number) => `${done} / ${total} просмотрено`,
    watched: "просмотрено",
    more: (n: number) => `+ ещё ${ru(n, "урок", "урока", "уроков")}`,
    startHere: "Начните отсюда",
    videoLang: "Видео на узбекском языке",
  },
  en: {
    lessonN: (n: number) => `Lesson ${n}`,
    lessons: (n: number) => en(n, "lesson", "lessons"),
    topics: (n: number) => en(n, "topic", "topics"),
    minutes: (n: number) => en(n, "minute", "minutes"),
    minShort: (n: number) => `${n} min`,
    watchedOf: (done: number, total: number) => `${done} / ${total} watched`,
    watched: "watched",
    more: (n: number) => `+ ${n} more ${n === 1 ? "lesson" : "lessons"}`,
    startHere: "Start here",
    videoLang: "Video in Uzbek",
  },
});
