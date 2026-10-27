import { defineMessages } from "@/i18n/config";

// before — Robohubsiz (video 0–8 s), after — Robohub bilan (8 s dan keyin). "Keyin esa" qatori ikkalasida bir xil.
// Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi: ʻ bu shriftda harf ustiga minib qoladi.
export const messages = defineMessages({
  uz: {
    eyebrow: "Taqqoslash",
    next: "Keyin esa —",
    own: "+ oʻz saytingiz va Telegram-bot",
    before: {
      label: "Robohubsiz",
      title: ["Robohubsiz", "bir xil vazifalar har bir marketpleysda takrorlanadi"],
      lead: "Har bir marketpleys — oʻz kabineti, oʻz qoidalari, oʻz hisobotlari va muddatlari. Tadbirkor bir xil vazifani har birida qaytadan bajaradi.",
      cost: "Har yangi marketpleys = +$300/oy",
    },
    after: {
      label: "Robohub bilan",
      title: ["Robohub bilan", "barcha marketpleyslarni bitta kabinetdan boshqarasiz"],
      lead: "Uzum Market, Wildberries, Ozon va Yandex Market uchun bitta oyna. Har bir vazifa bir marta bajariladi — va darhol barcha marketpleyslarga ketadi.",
      cost: "Har qanday yangi marketpleys = oʻsha kabinet",
    },
  },
  ru: {
    eyebrow: "Сравнение",
    next: "А дальше —",
    own: "+ свой сайт и Telegram-бот",
    before: {
      label: "Без Robohub",
      title: ["Без Robohub", "одни и те же задачи повторяются на каждой площадке"],
      lead: "Каждый маркетплейс — свой кабинет, свои правила, свои отчёты и свои сроки. Одни и те же задачи предприниматель решает заново на каждой площадке.",
      cost: "Каждая новая площадка = +$300/мес",
    },
    after: {
      label: "С Robohub",
      title: ["С Robohub", "вы управляете всеми площадками из одного кабинета"],
      lead: "Одно окно для Uzum Market, Wildberries, Ozon и Yandex Market. Каждая задача делается один раз — и сразу уходит на все площадки.",
      cost: "Любая новая площадка = тот же кабинет",
    },
  },
  en: {
    eyebrow: "Comparison",
    next: "Next up —",
    own: "+ your own website and Telegram bot",
    before: {
      label: "Without Robohub",
      title: ["Without Robohub,", "the same tasks repeat on every marketplace"],
      lead: "Every marketplace has its own dashboard, rules, reports and deadlines. The entrepreneur solves the same tasks all over again on each one.",
      cost: "Every new marketplace = +$300/mo",
    },
    after: {
      label: "With Robohub",
      title: ["With Robohub,", "you run every marketplace from one dashboard"],
      lead: "One window for Uzum Market, Wildberries, Ozon and Yandex Market. Every task is done once — and goes out to every marketplace at once.",
      cost: "Any new marketplace = the same dashboard",
    },
  },
});
