import { defineMessages } from "@/i18n/config";

// Robosell 404 sahifasi matnlari. Landing matni hozircha o'zbekcha, lekin 404 — uch tilda (/ru, /en manzillar ham ochiladi).
// buttons — chatdagi bot tugmalari: href — bosh sahifadagi bo'lim (#pricing ...), bo'sh — bosh sahifaning o'zi.
export const messages = defineMessages({
  uz: {
    title: "Sahifa topilmadi — Robosell",
    badge: "Xato 404",
    heading: "Bunday sahifa do‘konda yo‘q",
    text: "Ehtimol, havola eskirgan yoki manzil xato yozilgan. Xavotir olmang — bosh sahifadan kerakli bo‘limni bir bosishda topasiz.",
    home: "Bosh sahifaga",
    write: "Telegram’da yozish",
    logo: "Robosell — bosh sahifa",
    chat: {
      name: "Robosell bot",
      status: "onlayn",
      me: "Shu sahifani ochib bering",
      bot: "Afsus, bunday sahifa topilmadi 😕",
      code: "Kod: 404 · sahifa mavjud emas",
      offer: "Quyidagilardan birini tanlang 👇",
    },
    buttons: [
      { label: "🏠 Bosh sahifa", href: "" },
      { label: "💳 Tariflar", href: "#pricing" },
      { label: "⚙️ Imkoniyatlar", href: "#features" },
      { label: "❓ Savollar", href: "#faq" },
    ],
  },
  ru: {
    title: "Страница не найдена — Robosell",
    badge: "Ошибка 404",
    heading: "Такой страницы в магазине нет",
    text: "Возможно, ссылка устарела или адрес набран с ошибкой. Не переживайте — нужный раздел легко найти с главной страницы.",
    home: "На главную",
    write: "Написать в Telegram",
    logo: "Robosell — главная",
    chat: {
      name: "Robosell bot",
      status: "онлайн",
      me: "Откройте эту страницу",
      bot: "Увы, такая страница не найдена 😕",
      code: "Код: 404 · страница не существует",
      offer: "Выберите один из вариантов 👇",
    },
    buttons: [
      { label: "🏠 Главная", href: "" },
      { label: "💳 Тарифы", href: "#pricing" },
      { label: "⚙️ Возможности", href: "#features" },
      { label: "❓ Вопросы", href: "#faq" },
    ],
  },
  en: {
    title: "Page not found — Robosell",
    badge: "Error 404",
    heading: "This page isn’t in the store",
    text: "The link may be outdated or the address has a typo. No worries — you can reach any section from the home page in one click.",
    home: "Back to home",
    write: "Message us on Telegram",
    logo: "Robosell — home",
    chat: {
      name: "Robosell bot",
      status: "online",
      me: "Please open this page",
      bot: "Sorry, this page was not found 😕",
      code: "Code: 404 · page does not exist",
      offer: "Pick one of the options below 👇",
    },
    buttons: [
      { label: "🏠 Home", href: "" },
      { label: "💳 Pricing", href: "#pricing" },
      { label: "⚙️ Features", href: "#features" },
      { label: "❓ FAQ", href: "#faq" },
    ],
  },
});
