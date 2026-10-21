import { defineMessages } from "@/i18n/config";

export const messages = defineMessages({
  uz: { play: (title: string) => `Videoni ijro etish: ${title}` },
  ru: { play: (title: string) => `Воспроизвести видео: ${title}` },
  en: { play: (title: string) => `Play video: ${title}` },
});
