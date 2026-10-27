import { defineMessages } from "@/i18n/config";

// Sarlavha soʻzlari alohida — har biri ketma-ket paydo boʻladi (title — oddiy qism, accent — rangli qism, end — urgʻudan keyingi qism)
// "на маркетплейсах" ichida boʻshliq — uzilmas (NBSP): qisqa predlog qator oxirida osilib qolmasin
export const messages = defineMessages({
  uz: {
    title: ["Marketpleyslardagi", "savdoni"],
    accent: ["yagona", "kabinetdan"],
    end: ["boshqaring"],
    lead: "Buyurtma, qoldiq va foydani bir joydan boshqaring. Toʻrtta kabinetga alohida kirish shart emas.",
    facts: { mps: "6+ marketpleys", integrations: "10+ integratsiya", ai: "AI assistent" },
    start: "Hoziroq boshlash",
    video: {
      button: "Qanday ishlaydi",
      dialog: "Robohub qanday ishlaydi — video",
      close: "Yopish",
      title: "Robohub qanday ishlaydi",
    },
  },
  ru: {
    title: ["Управляйте", "продажами", "на маркетплейсах", "из"],
    accent: ["единого", "кабинета"],
    end: [],
    lead: "Заказы, остатки и прибыль — в одном месте. Больше не нужно заходить в четыре кабинета по отдельности.",
    facts: { mps: "6+ маркетплейсов", integrations: "10+ интеграций", ai: "AI-ассистент" },
    start: "Начать сейчас",
    video: {
      button: "Как это работает",
      dialog: "Как работает Robohub — видео",
      close: "Закрыть",
      title: "Как работает Robohub",
    },
  },
  en: {
    title: ["Manage", "your", "marketplace", "sales", "from"],
    accent: ["one", "dashboard"],
    end: [],
    lead: "Manage orders, stock and profit from one place. No more logging in to four dashboards separately.",
    facts: { mps: "6+ marketplaces", integrations: "10+ integrations", ai: "AI assistant" },
    start: "Get started",
    video: {
      button: "How it works",
      dialog: "How Robohub works — video",
      close: "Close",
      title: "How Robohub works",
    },
  },
});
