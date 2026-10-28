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
  // qozoq, qirgʻiz, qoraqalpoq va tojik tillarida ot son bilan oʻzgarmaydi (5 сабақ, 5 sabaq, 5 дарс)
  kk: {
    lessonN: (n: number) => `${n}-сабақ`,
    lessons: (n: number) => `${n} сабақ`,
    topics: (n: number) => `${n} тақырып`,
    minutes: (n: number) => `${n} минут`,
    minShort: (n: number) => `${n} мин`,
    watchedOf: (done: number, total: number) => `${done} / ${total} көрілді`,
    watched: "көрілді",
    more: (n: number) => `+ тағы ${n} сабақ`,
    startHere: "Осы жерден бастаңыз",
    videoLang: "Бейне өзбек тілінде",
  },
  ky: {
    lessonN: (n: number) => `${n}-сабак`,
    lessons: (n: number) => `${n} сабак`,
    topics: (n: number) => `${n} тема`,
    minutes: (n: number) => `${n} мүнөт`,
    minShort: (n: number) => `${n} мүн`,
    watchedOf: (done: number, total: number) => `${done} / ${total} көрүлдү`,
    watched: "көрүлдү",
    more: (n: number) => `+ дагы ${n} сабак`,
    startHere: "Ушул жерден баштаңыз",
    videoLang: "Видео өзбек тилинде",
  },
  kaa: {
    lessonN: (n: number) => `${n}-sabaq`,
    lessons: (n: number) => `${n} sabaq`,
    topics: (n: number) => `${n} tema`,
    minutes: (n: number) => `${n} minut`,
    minShort: (n: number) => `${n} min`,
    watchedOf: (done: number, total: number) => `${done} / ${total} kórildi`,
    watched: "kórildi",
    more: (n: number) => `+ jáne ${n} sabaq`,
    startHere: "Usı jerden baslań",
    videoLang: "Video ózbek tilinde",
  },
  tg: {
    lessonN: (n: number) => `Дарси ${n}`,
    lessons: (n: number) => `${n} дарс`,
    topics: (n: number) => `${n} мавзӯъ`,
    minutes: (n: number) => `${n} дақиқа`,
    minShort: (n: number) => `${n} дақ`,
    watchedOf: (done: number, total: number) => `${done} / ${total} тамошо шуд`,
    watched: "тамошо шуд",
    more: (n: number) => `+ боз ${n} дарс`,
    startHere: "Аз ҳамин ҷо оғоз кунед",
    videoLang: "Видео бо забони ӯзбекӣ",
  },
});
