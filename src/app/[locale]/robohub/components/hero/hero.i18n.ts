import { defineMessages } from "@/i18n/config";

// Sarlavha soʻzlari alohida — har biri ketma-ket paydo boʻladi (title — oddiy qism, accent — rangli qism, end — urgʻudan keyingi qism)
// "на маркетплейсах" ichida boʻshliq — uzilmas (NBSP): qisqa predlog qator oxirida osilib qolmasin
export const messages = defineMessages({
  uz: {
    title: ["Marketpleyslardagi", "savdoni"],
    accent: ["yagona", "kabinetdan"],
    end: ["boshqaring"],
    lead: "Mahsulotlarni marketpleyslarda joylashtiring, buyurtmalarni boshqaring, qoldiqlarni sinxronlang va foydangizni Robohub’da kuzating.",
    facts: { mps: "Marketpleyslar", integrations: "Hisob tizimlari", ai: "AI yordamchi" },
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
    accent: ["одного", "кабинета"],
    end: [],
    lead: "Размещайте товары на маркетплейсах, управляйте заказами, синхронизируйте остатки и отслеживайте прибыль через Robohub.",
    facts: { mps: "Маркетплейсы", integrations: "Учётные системы", ai: "AI-помощник" },
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
    lead: "List products on marketplaces, manage orders, sync stock and track your profit with Robohub.",
    facts: { mps: "Marketplaces", integrations: "Accounting systems", ai: "AI assistant" },
    start: "Get started",
    video: {
      button: "How it works",
      dialog: "How Robohub works — video",
      close: "Close",
      title: "How Robohub works",
    },
  },
});
