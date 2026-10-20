import { defineMessages } from "@/i18n/config";
import type { CountryId } from "./globe";
import type { LaunchText } from "./launch";

type MarketMessages = {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  lead: string;
  launch: LaunchText;
  mapLabel: string;
  mapTitle: string;
  mapText: string;
  countries: Record<CountryId, string>;
};

export const messages = defineMessages<MarketMessages>({
  uz: {
    eyebrow: "Mintaqaviy savdo",
    titleStart: "Bitta mahsulot — ",
    titleAccent: "besh mamlakatda",
    titleEnd: " savdo",
    lead: "Mahsulotni Robohub’da bir marta tayyorlang va Oʻzbekiston, Rossiya, Qozogʻiston, Qirgʻiziston hamda Tojikistondagi xaridorlarga chiqaring — narxlar, buyurtmalar va qoldiqlar bitta kabinetda.",
    launch: {
      without: {
        label: "Robohub’siz",
        num: "4",
        unit: "ta alohida kabinet",
        items: ["Har bir marketpleysga alohida kirish", "Narxni har birida qo‘lda o‘zgartirish", "Qoldiq mos kelmay, ortiqcha sotuv bo‘ladi", "Hisobotlarni Excel’da qo‘lda yig‘ish"],
      },
      with: {
        label: "Robohub bilan",
        num: "1",
        unit: "ta kabinet",
        items: ["Barcha marketpleyslar bitta oynada", "Narx bir joydan o‘zgartiriladi va yuboriladi", "Qoldiq avtomatik sinxron — ortiqcha sotuv yo‘q", "Besh mamlakat bo‘yicha bitta hisobot"],
      },
    },
    mapLabel: "Yagona platforma — barcha bozorlar",
    mapTitle: "Butun mintaqa boʻylab soting",
    mapText: "Moskvadan Toshkentgacha — besh mamlakatdagi savdoni yagona Robohub kabinetidan yuriting.",
    countries: {
      uz: "Oʻzbekiston",
      ru: "Rossiya",
      kz: "Qozogʻiston",
      kg: "Qirgʻiziston",
      tj: "Tojikiston",
    },
  },
  ru: {
    eyebrow: "Продажи по региону",
    titleStart: "Один товар — ",
    titleAccent: "продажи в пяти странах",
    titleEnd: "",
    lead: "Подготовьте товар в Robohub один раз и выведите его к покупателям в Узбекистане, России, Казахстане, Кыргызстане и Таджикистане — цены, заказы и остатки в одном кабинете.",
    launch: {
      without: {
        label: "Без Robohub",
        num: "4",
        unit: "отдельных кабинета",
        items: ["Отдельный вход в каждый маркетплейс", "Цены меняются вручную в каждом", "Остатки расходятся — продажи сверх наличия", "Отчёты собираются вручную в Excel"],
      },
      with: {
        label: "С Robohub",
        num: "1",
        unit: "кабинет",
        items: ["Все маркетплейсы в одном окне", "Цена меняется в одном месте и отправляется", "Остатки синхронизируются — без продаж сверх наличия", "Один отчёт по пяти странам"],
      },
    },
    mapLabel: "Одна платформа — все рынки",
    mapTitle: "Продавайте по всему региону",
    mapText: "От Москвы до Ташкента — управляйте продажами в пяти странах из единого кабинета Robohub.",
    countries: {
      uz: "Узбекистан",
      ru: "Россия",
      kz: "Казахстан",
      kg: "Кыргызстан",
      tj: "Таджикистан",
    },
  },
  en: {
    eyebrow: "Regional selling",
    titleStart: "One product — ",
    titleAccent: "sold in five countries",
    titleEnd: "",
    lead: "Prepare a product in Robohub once and bring it to buyers in Uzbekistan, Russia, Kazakhstan, Kyrgyzstan and Tajikistan — prices, orders and stock in one dashboard.",
    launch: {
      without: {
        label: "Without Robohub",
        num: "4",
        unit: "separate dashboards",
        items: ["A separate login for every marketplace", "Prices changed by hand in each one", "Stock drifts out of sync — overselling", "Reports pieced together in Excel"],
      },
      with: {
        label: "With Robohub",
        num: "1",
        unit: "dashboard",
        items: ["Every marketplace in one window", "Change a price in one place and send it out", "Stock syncs automatically — no overselling", "One report across five countries"],
      },
    },
    mapLabel: "One platform — every market",
    mapTitle: "Sell across the whole region",
    mapText: "From Moscow to Tashkent — run sales in five countries from a single Robohub dashboard.",
    countries: {
      uz: "Uzbekistan",
      ru: "Russia",
      kz: "Kazakhstan",
      kg: "Kyrgyzstan",
      tj: "Tajikistan",
    },
  },
});
