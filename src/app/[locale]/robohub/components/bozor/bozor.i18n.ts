import { defineMessages } from "@/i18n/config";
import type { CategoryId } from "./categories";
import type { CountryId } from "./globe";

type BozorMessages = {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  lead: string;
  categories: Record<CategoryId, string>;
  mapLabel: string;
  mapTitle: string;
  mapText: string;
  countries: Record<CountryId, string>;
};

export const messages = defineMessages<BozorMessages>({
  uz: {
    eyebrow: "Kimlar uchun",
    titleStart: "Robohub ",
    titleAccent: "har qanday biznesga",
    titleEnd: " mos keladi",
    lead: "Kichik butikdan yirik brendgacha — Uzum, Yandex Market, Wildberries yoki Ozonda nima sotsangiz ham, Robohub uni bitta kabinetdan yuritadi.",
    categories: {
      kiyim: "Kiyim-kechak",
      poyabzal: "Poyabzal",
      elektronika: "Elektronika",
      gozallik: "Goʻzallik va kosmetika",
      uy: "Uy va mebel",
      bolalar: "Bolalar tovarlari",
      aksessuar: "Aksessuarlar",
      sport: "Sport va hordiq",
      oziq: "Oziq-ovqat",
      avto: "Avto va ehtiyot qism",
      salomatlik: "Salomatlik va dorixona",
      kitob: "Kitob va media",
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
    eyebrow: "Для кого",
    titleStart: "Robohub ",
    titleAccent: "подходит любому бизнесу",
    titleEnd: "",
    lead: "От небольшого бутика до крупного бренда — что бы вы ни продавали на Uzum, Yandex Market, Wildberries или Ozon, Robohub ведёт всё из одного кабинета.",
    categories: {
      kiyim: "Одежда",
      poyabzal: "Обувь",
      elektronika: "Электроника",
      gozallik: "Красота и косметика",
      uy: "Дом и мебель",
      bolalar: "Детские товары",
      aksessuar: "Аксессуары",
      sport: "Спорт и отдых",
      oziq: "Продукты питания",
      avto: "Авто и запчасти",
      salomatlik: "Здоровье и аптека",
      kitob: "Книги и медиа",
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
    eyebrow: "Who it’s for",
    titleStart: "Robohub ",
    titleAccent: "fits any business",
    titleEnd: "",
    lead: "From a small boutique to a major brand — whatever you sell on Uzum, Yandex Market, Wildberries or Ozon, Robohub runs it all from one dashboard.",
    categories: {
      kiyim: "Clothing",
      poyabzal: "Footwear",
      elektronika: "Electronics",
      gozallik: "Beauty & cosmetics",
      uy: "Home & furniture",
      bolalar: "Kids’ products",
      aksessuar: "Accessories",
      sport: "Sports & leisure",
      oziq: "Groceries",
      avto: "Auto & spare parts",
      salomatlik: "Health & pharmacy",
      kitob: "Books & media",
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
