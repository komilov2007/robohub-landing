import { defineMessages } from "@/i18n/config";
import type { CategoryId } from "./categories";
import type { CountryId } from "./globe";

type MarketMessages = {
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

export const messages = defineMessages<MarketMessages>({
  uz: {
    eyebrow: "Kimlar uchun",
    titleStart: "Robohub ",
    titleAccent: "har qanday biznesga",
    titleEnd: " mos keladi",
    lead: "Kichik butikdan yirik brendgacha — Uzum, Yandex Market, Wildberries yoki Ozonda nima sotsangiz ham, Robohub uni bitta kabinetdan yuritadi.",
    categories: {
      clothing: "Kiyim-kechak",
      shoes: "Poyabzal",
      electronics: "Elektronika",
      beauty: "Goʻzallik va kosmetika",
      home: "Uy va mebel",
      kids: "Bolalar tovarlari",
      accessories: "Aksessuarlar",
      sport: "Sport va hordiq",
      food: "Oziq-ovqat",
      auto: "Avto va ehtiyot qism",
      health: "Salomatlik va dorixona",
      books: "Kitob va media",
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
      clothing: "Одежда",
      shoes: "Обувь",
      electronics: "Электроника",
      beauty: "Красота и косметика",
      home: "Дом и мебель",
      kids: "Детские товары",
      accessories: "Аксессуары",
      sport: "Спорт и отдых",
      food: "Продукты питания",
      auto: "Авто и запчасти",
      health: "Здоровье и аптека",
      books: "Книги и медиа",
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
      clothing: "Clothing",
      shoes: "Footwear",
      electronics: "Electronics",
      beauty: "Beauty & cosmetics",
      home: "Home & furniture",
      kids: "Kids’ products",
      accessories: "Accessories",
      sport: "Sports & leisure",
      food: "Groceries",
      auto: "Auto & spare parts",
      health: "Health & pharmacy",
      books: "Books & media",
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
