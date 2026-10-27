import { defineMessages } from "@/i18n/config";
import type { CountryId } from "./globe";
import type { RegionsText } from "./regions";

type MarketMessages = {
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  lead: string;
  regions: RegionsText;
  mapLabel: string;
  mapTitle: string;
  mapText: string;
  countries: Record<CountryId, string>;
};

export const messages = defineMessages<MarketMessages>({
  uz: {
    titleStart: "Mahsulotlaringiz — ",
    titleAccent: "turli mamlakatlar marketpleyslarida",
    titleEnd: ".",
    lead: "Allaqachon savdo qilyapsizmi yoki endi boshlayapsizmi? Robohub bilan mahalliy va xalqaro platformalarda savdoni yoʻlga qoʻying. Mavjud doʻkonlaringizni ulang yoki yangilarini oching — ulanish va ilk qadamlarda yordam beramiz.",
    regions: { soon: "Tez kunda", cta: "Yangi platformalarda savdoni boshlash", yandex: "Yandex Market", count: ["{n} ta platforma", "{n} ta platforma", "{n} ta platforma"] },
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
    titleStart: "Ваши товары — ",
    titleAccent: "на маркетплейсах разных стран",
    titleEnd: ".",
    lead: "Уже продаёте или только начинаете? С Robohub запускайте продажи на местных и международных площадках. Подключайте действующие магазины или открывайте новые — мы поможем с подключением и первыми шагами.",
    regions: { soon: "Скоро", cta: "Выйти на новые площадки", yandex: "Яндекс Маркет", count: ["{n} площадка", "{n} площадки", "{n} площадок"] },
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
    titleStart: "Your products — ",
    titleAccent: "on marketplaces in different countries",
    titleEnd: ".",
    lead: "Already selling or just getting started? With Robohub, launch sales on local and international platforms. Connect your existing stores or open new ones — we’ll help with setup and the first steps.",
    regions: { soon: "Coming soon", cta: "Start selling on new platforms", yandex: "Yandex Market", count: ["{n} platform", "{n} platforms", "{n} platforms"] },
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
