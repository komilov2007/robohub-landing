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
    crumbs: "Sahifa yo‘li", // breadcrumb <nav> aria-label
  },
  ru: {
    mainBadge: (n: number) => `Основной урок · ${n}`,
    playlistLabel: (topic: string) => `${topic}: уроки темы`,
    watchedCount: (n: number) => `просмотрено: ${n}`,
    main: "основной",
    nextTopic: "Следующая тема",
    loading: "Загрузка",
    crumbs: "Навигационная цепочка", // breadcrumb <nav> aria-label
  },
  en: {
    mainBadge: (n: number) => `Main lesson · ${n}`,
    playlistLabel: (topic: string) => `${topic}: lessons in this topic`,
    watchedCount: (n: number) => `${n} watched`,
    main: "main",
    nextTopic: "Next topic",
    loading: "Loading",
    crumbs: "Breadcrumb", // breadcrumb <nav> aria-label
  },
  kk: {
    mainBadge: (n: number) => `Негізгі сабақ · ${n}`,
    playlistLabel: (topic: string) => `${topic}: тақырып сабақтары`,
    watchedCount: (n: number) => `${n} көрілді`,
    main: "негізгі",
    nextTopic: "Келесі тақырып",
    loading: "Жүктелуде",
    crumbs: "Навигация жолы", // breadcrumb <nav> aria-label
  },
  ky: {
    mainBadge: (n: number) => `Негизги сабак · ${n}`,
    playlistLabel: (topic: string) => `${topic}: теманын сабактары`,
    watchedCount: (n: number) => `${n} көрүлдү`,
    main: "негизги",
    nextTopic: "Кийинки тема",
    loading: "Жүктөлүүдө",
    crumbs: "Навигация жолу", // breadcrumb <nav> aria-label
  },
  kaa: {
    mainBadge: (n: number) => `Tiykarǵı sabaq · ${n}`,
    playlistLabel: (topic: string) => `${topic}: tema sabaqları`,
    watchedCount: (n: number) => `${n} kórildi`,
    main: "tiykarǵı",
    nextTopic: "Keyingi tema",
    loading: "Júklenbekte",
    crumbs: "Bet jolı", // breadcrumb <nav> aria-label
  },
  tg: {
    mainBadge: (n: number) => `Дарси асосӣ · ${n}`,
    playlistLabel: (topic: string) => `${topic}: дарсҳои мавзӯъ`,
    watchedCount: (n: number) => `${n} тамошо шуд`,
    main: "асосӣ",
    nextTopic: "Мавзӯи навбатӣ",
    loading: "Боргирӣ",
    crumbs: "Масири саҳифа", // breadcrumb <nav> aria-label
  },
});
