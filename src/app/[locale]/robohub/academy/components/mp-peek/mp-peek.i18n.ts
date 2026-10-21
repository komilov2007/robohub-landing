import { defineMessages } from "@/i18n/config";

export const messages = defineMessages({
  uz: {
    forSellers: "marketpleys sotuvchilari uchun",
    connectLabel: (name: string) => `${name}ni ulash darsi`,
    watch: "Videoni ko‘rish",
  },
  ru: {
    forSellers: "для продавцов на маркетплейсах",
    connectLabel: (name: string) => `Урок: подключение ${name}`,
    watch: "Смотреть видео",
  },
  en: {
    forSellers: "for marketplace sellers",
    connectLabel: (name: string) => `Lesson: connecting ${name}`,
    watch: "Watch the video",
  },
});
