import { defineMessages } from "@/i18n/config";

// Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi
export const messages = defineMessages({
  uz: {
    title: "Ulash uch qadam.",
    titleAccent: "Qolgani avtomatik.",
    steps: [
      { title: "Ro‘yxatdan o‘ting", meta: "Bir necha daqiqa" },
      { title: "API kalitini kiriting", meta: "Marketpleys kabinetidan" },
      { title: "Ma’lumotlar kabinetga keladi", meta: "Avtomatik" },
      { title: "Qiyin bo‘lsa jamoa yordam beradi", meta: "Kerak boʻlsa" },
    ],
    rows: { products: "Tovarlar", orders: "Buyurtmalar", stock: "Qoldiq" },
    online: "Onlayn",
    start: "Hoziroq boshlash",
    guide: "Qoʻllanma va video",
  },
  ru: {
    title: "Подключение — три шага.",
    titleAccent: "Остальное — автоматически.",
    steps: [
      { title: "Зарегистрируйтесь", meta: "Пара минут" },
      { title: "Введите API-ключ", meta: "Из кабинета маркетплейса" },
      { title: "Данные приходят в кабинет", meta: "Автоматически" },
      { title: "Если сложно — поможет команда", meta: "При необходимости" },
    ],
    rows: { products: "Товары", orders: "Заказы", stock: "Остатки" },
    online: "Онлайн",
    start: "Начать сейчас",
    guide: "Инструкция и видео",
  },
  en: {
    title: "Connect in three steps.",
    titleAccent: "The rest is automatic.",
    steps: [
      { title: "Sign up", meta: "A few minutes" },
      { title: "Enter your API key", meta: "Marketplace dashboard" },
      { title: "Data flows into your dashboard", meta: "Automatically" },
      { title: "Stuck? Our team will help", meta: "Whenever you need" },
    ],
    rows: { products: "Products", orders: "Orders", stock: "Stock" },
    online: "Online",
    start: "Get started",
    guide: "Guide and video",
  },
});
