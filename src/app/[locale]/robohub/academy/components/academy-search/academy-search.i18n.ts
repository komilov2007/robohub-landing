import { defineMessages } from "@/i18n/config";

// Qidiruv: matnlar, mashhur so'rovlar va savol so'zlari (stop) — har tilda o'zi
export const messages = defineMessages({
  uz: {
    label: "Savolingizni yozing",
    placeholder: "Masalan: omborlarni qanday guruhlayman?",
    clear: "Qidiruvni tozalash",
    submit: "Qidirish",
    found: (n: number) => `${n} ta dars topildi`,
    listLabel: "Topilgan darslar",
    empty: "Topilmadi.",
    seeAll: "Barcha mavzularni ko‘ring ↓",
    popularLabel: "Ko‘p qidiriladi:",
    popular: ["Xarajatlar", "Uzum ulash", "ABC tahlil", "Missing"],
    stop: ["qanday", "qanaqa", "nima", "nimaga", "qayerda", "mumkin", "kerak", "qilish", "qilib", "va", "bilan", "uchun", "men", "u", "bu"],
  },
  ru: {
    label: "Напишите свой вопрос",
    placeholder: "Например: как сгруппировать склады?",
    clear: "Очистить поиск",
    submit: "Найти",
    found: (n: number) => `Найдено уроков: ${n}`,
    listLabel: "Найденные уроки",
    empty: "Ничего не найдено.",
    seeAll: "Посмотрите все темы ↓",
    popularLabel: "Часто ищут:",
    popular: ["Расходы", "Подключить Uzum", "ABC-анализ", "Missing"],
    stop: ["как", "что", "где", "зачем", "почему", "можно", "нужно", "надо", "и", "в", "на", "с", "по", "для", "я", "мне", "это", "ли"],
  },
  en: {
    label: "Type your question",
    placeholder: "For example: how do I group warehouses?",
    clear: "Clear search",
    submit: "Search",
    found: (n: number) => `${n} ${n === 1 ? "lesson" : "lessons"} found`,
    listLabel: "Lessons found",
    empty: "Nothing found.",
    seeAll: "Browse all topics ↓",
    popularLabel: "Popular searches:",
    popular: ["Expenses", "Connect Uzum", "ABC analysis", "Missing"],
    stop: ["how", "what", "where", "why", "can", "do", "does", "i", "my", "to", "the", "a", "an", "and", "in", "of", "for", "with", "is", "it"],
  },
});
