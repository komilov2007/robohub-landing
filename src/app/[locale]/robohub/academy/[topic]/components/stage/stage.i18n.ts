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
  kk: {
    mainBadge: (n: number) => `Негізгі сабақ · ${n}`,
    playlistLabel: (topic: string) => `${topic}: тақырып сабақтары`,
    watchedCount: (n: number) => `${n} көрілді`,
    main: "негізгі",
    nextTopic: "Келесі тақырып",
    loading: "Жүктелуде",
  },
  ky: {
    mainBadge: (n: number) => `Негизги сабак · ${n}`,
    playlistLabel: (topic: string) => `${topic}: теманын сабактары`,
    watchedCount: (n: number) => `${n} көрүлдү`,
    main: "негизги",
    nextTopic: "Кийинки тема",
    loading: "Жүктөлүүдө",
  },
  kaa: {
    mainBadge: (n: number) => `Tiykarǵı sabaq · ${n}`,
    playlistLabel: (topic: string) => `${topic}: tema sabaqları`,
    watchedCount: (n: number) => `${n} kórildi`,
    main: "tiykarǵı",
    nextTopic: "Keyingi tema",
    loading: "Júklenbekte",
  },
  tg: {
    mainBadge: (n: number) => `Дарси асосӣ · ${n}`,
    playlistLabel: (topic: string) => `${topic}: дарсҳои мавзӯъ`,
    watchedCount: (n: number) => `${n} тамошо шуд`,
    main: "асосӣ",
    nextTopic: "Мавзӯи навбатӣ",
    loading: "Боргирӣ",
  },
});
