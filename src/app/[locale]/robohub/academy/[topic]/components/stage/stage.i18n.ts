import { defineMessages } from "@/i18n/config";

// Hero pleyeri, pleylist va yuklanish skeleti
export const messages = defineMessages({
  uz: {
    mainBadge: (n: number) => `Asosiy dars · ${n}`,
    playlistLabel: (topic: string) => `${topic}: mavzu darslari`,
    watchedCount: (n: number) => `${n} ta ko‘rildi`,
    main: "asosiy",
    nextTopic: "Keyingi mavzu",
    loading: "Yuklanmoqda",
  },
  ru: {
    mainBadge: (n: number) => `Основной урок · ${n}`,
    playlistLabel: (topic: string) => `${topic}: уроки темы`,
    watchedCount: (n: number) => `просмотрено: ${n}`,
    main: "основной",
    nextTopic: "Следующая тема",
    loading: "Загрузка",
  },
  en: {
    mainBadge: (n: number) => `Main lesson · ${n}`,
    playlistLabel: (topic: string) => `${topic}: lessons in this topic`,
    watchedCount: (n: number) => `${n} watched`,
    main: "main",
    nextTopic: "Next topic",
    loading: "Loading",
  },
});
