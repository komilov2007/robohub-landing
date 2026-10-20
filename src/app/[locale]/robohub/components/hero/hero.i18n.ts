import { defineMessages } from "@/i18n/config";

// Sarlavha soʻzlari alohida — har biri ketma-ket paydo boʻladi (title — oddiy qism, accent — rangli qism)
// "Yandex —" ichida boʻshliq — uzilmas (NBSP): tire qator boshiga tushib qolmasin
export const messages = defineMessages({
  uz: {
    pill: "Marketpleys sotuvchilari uchun",
    title: ["Uzum,", "Wildberries,", "Ozon", "va", "Yandex —"],
    accent: ["bitta", "kabinetda"],
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
    pill: "Для продавцов на маркетплейсах",
    title: ["Uzum,", "Wildberries,", "Ozon", "и", "Yandex —"],
    accent: ["в одном", "кабинете"],
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
    pill: "For marketplace sellers",
    title: ["Uzum,", "Wildberries,", "Ozon", "&", "Yandex —"],
    accent: ["one", "dashboard"],
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
