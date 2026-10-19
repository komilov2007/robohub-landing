import { defineMessages } from "@/i18n/config";
import { ACADEMY_URL } from "@/lib/sites";

export const messages = defineMessages({
  uz: {
    home: "Robohub — bosh sahifa",
    navLabel: "Asosiy menyu",
    nav: [
      { href: "#features", label: "Imkoniyatlar" },
      { href: "#how-it-works", label: "Qanday ishlaydi" },
      { href: "#reviews", label: "Sharhlar" },
      { href: "#pricing", label: "Tariflar" },
      { href: "#faq", label: "Savollar" },
      { href: ACADEMY_URL, label: "Academy" },
    ],
    lang: "Til tanlash",
    login: "Kirish",
    start: "Hoziroq boshlash",
    menuOpen: "Menyuni ochish",
    menuClose: "Menyuni yopish",
  },
  ru: {
    home: "Robohub — главная",
    navLabel: "Главное меню",
    nav: [
      { href: "#features", label: "Возможности" },
      { href: "#how-it-works", label: "Как это работает" },
      { href: "#reviews", label: "Отзывы" },
      { href: "#pricing", label: "Тарифы" },
      { href: "#faq", label: "Вопросы" },
      { href: ACADEMY_URL, label: "Академия" },
    ],
    lang: "Выбор языка",
    login: "Войти",
    start: "Начать сейчас",
    menuOpen: "Открыть меню",
    menuClose: "Закрыть меню",
  },
  en: {
    home: "Robohub — home",
    navLabel: "Main menu",
    nav: [
      { href: "#features", label: "Features" },
      { href: "#how-it-works", label: "How it works" },
      { href: "#reviews", label: "Reviews" },
      { href: "#pricing", label: "Pricing" },
      { href: "#faq", label: "FAQ" },
      { href: ACADEMY_URL, label: "Academy" },
    ],
    lang: "Choose language",
    login: "Log in",
    start: "Get started",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
});
