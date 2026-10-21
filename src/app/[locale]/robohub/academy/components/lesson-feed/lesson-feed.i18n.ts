import { defineMessages } from "@/i18n/config";
import { common } from "../../lib/common.i18n";

export const messages = defineMessages({
  uz: {
    filters: { all: "Barchasi", s: "1 daqiqagacha", m: "1–2 daqiqa", l: "2 daqiqadan ko‘p" },
    kicker: "Barcha darslar",
    title: (n: number) => `${n} ta dars —`,
    titleMark: "bitta lentada",
    lead: "Vaqtingizga qarab tanlang: har bir dars bitta vazifani ko‘rsatadi.",
    watched: "dars ko‘rildi",
    filtersLabel: "Davomiylik bo‘yicha",
    rowsLabel: "Darslar lentasi",
  },
  ru: {
    filters: { all: "Все", s: "До 1 минуты", m: "1–2 минуты", l: "Больше 2 минут" },
    kicker: "Все уроки",
    title: (n: number) => `${common.ru.lessons(n)} —`,
    titleMark: "в одной ленте",
    lead: "Выбирайте по свободному времени: каждый урок разбирает одну задачу.",
    watched: "уроков просмотрено",
    filtersLabel: "По длительности",
    rowsLabel: "Лента уроков",
  },
  en: {
    filters: { all: "All", s: "Under 1 minute", m: "1–2 minutes", l: "Over 2 minutes" },
    kicker: "All lessons",
    title: (n: number) => `${common.en.lessons(n)} —`,
    titleMark: "in one feed",
    lead: "Pick by the time you have: each lesson walks through a single task.",
    watched: "lessons watched",
    filtersLabel: "By duration",
    rowsLabel: "Lesson feed",
  },
});
