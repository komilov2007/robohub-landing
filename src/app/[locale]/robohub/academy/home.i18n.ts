import { defineMessages } from "@/i18n/config";
import { ruWord } from "./lib/common.i18n";

// o'zbekchada so'z son bilan o'zgarmaydi
type Stat = (n: number) => string;
const same = (word: string): Stat => () => word;

// Academy bosh sahifasi (page.tsx) matnlari
export const messages = defineMessages({
  uz: {
    // sarlavha uch bo'lakda chiqadi (har biri o'z kechikishi bilan), o'rtadagisi — gradient
    title: ["Robohub’ni", "qisqa darslarda", "o‘rganing"],
    lead: "Har bir dars — bitta vazifa va bir necha daqiqa. Savolingizni yozing yoki boshlang‘ich yo‘ldan boring.",
    // statistika: son odometrda alohida, bu — uning ostidagi so'z (ruschada son bilan kelishadi)
    stats: { lessons: same("video dars"), topics: same("mavzu"), minutes: same("daqiqa jami") },
    topicsKicker: "Mavzular",
    topicsTitle: "Nimani",
    topicsMark: "o‘rganmoqchisiz?",
    helpKicker: "Yordam",
    helpTitle: "Javob",
    helpMark: "topilmadimi?",
    helpText: "Savolingizni yozing yoki qo‘ng‘iroq qiling — jamoamiz yordam beradi.",
    start: "Hoziroq boshlash",
  },
  ru: {
    title: ["Изучите", "Robohub", "в коротких уроках"],
    lead: "Каждый урок — одна задача и несколько минут. Задайте вопрос или пройдите путь для начинающих.",
    stats: {
      lessons: (n: number) => ruWord(n, "видеоурок", "видеоурока", "видеоуроков"),
      topics: (n: number) => ruWord(n, "тема", "темы", "тем"),
      minutes: (n: number) => `${ruWord(n, "минута", "минуты", "минут")} всего`,
    },
    topicsKicker: "Темы",
    topicsTitle: "Что вы хотите",
    topicsMark: "изучить?",
    helpKicker: "Помощь",
    helpTitle: "Не нашли",
    helpMark: "ответ?",
    helpText: "Напишите свой вопрос или позвоните — наша команда поможет.",
    start: "Начать сейчас",
  },
  en: {
    title: ["Learn", "Robohub", "in short lessons"],
    lead: "Every lesson is one task and a few minutes. Type your question or follow the getting-started path.",
    stats: {
      lessons: (n: number) => (n === 1 ? "video lesson" : "video lessons"),
      topics: (n: number) => (n === 1 ? "topic" : "topics"),
      minutes: (n: number) => (n === 1 ? "minute in total" : "minutes in total"),
    },
    topicsKicker: "Topics",
    topicsTitle: "What do you want",
    topicsMark: "to learn?",
    helpKicker: "Help",
    helpTitle: "Didn’t find",
    helpMark: "an answer?",
    helpText: "Send us your question or give us a call — our team will help.",
    start: "Get started",
  },
});
