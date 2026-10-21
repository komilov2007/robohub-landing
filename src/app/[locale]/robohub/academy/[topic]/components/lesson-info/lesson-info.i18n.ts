import { defineMessages } from "@/i18n/config";

export const messages = defineMessages({
  uz: {
    kicker: (lesson: string) => `Amaliy video · ${lesson}`,
    position: (pos: number, total: number) => `${pos} / ${total} dars`,
    main: "Asosiy dars",
    watched: "Ko‘rildi",
    theory: "Nazariy qism",
    what: "Bu nima?",
    why: "Nega kerak?",
    inVideo: "Videoda",
    tip: "Maslahat.",
  },
  ru: {
    kicker: (lesson: string) => `Практическое видео · ${lesson}`,
    position: (pos: number, total: number) => `урок ${pos} из ${total}`,
    main: "Основной урок",
    watched: "Просмотрено",
    theory: "Теория",
    what: "Что это?",
    why: "Зачем это нужно?",
    inVideo: "В видео",
    tip: "Совет.",
  },
  en: {
    kicker: (lesson: string) => `Hands-on video · ${lesson}`,
    position: (pos: number, total: number) => `lesson ${pos} of ${total}`,
    main: "Main lesson",
    watched: "Watched",
    theory: "Theory",
    what: "What is it?",
    why: "Why does it matter?",
    inVideo: "In the video",
    tip: "Tip.",
  },
});
