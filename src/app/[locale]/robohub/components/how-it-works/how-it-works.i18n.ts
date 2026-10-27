import { defineMessages } from "@/i18n/config";

// Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi.
// steps — kartalar tartibida: title — sarlavha, desc — bir qatorli izoh, meta — pastdagi kapsula.
// Toʻrtinchisi — "yordam" kartasi (yashil).
export const messages = defineMessages({
  uz: {
    title: "Uch qadam — va do‘konlaringiz",
    titleAccent: "bitta kabinetda",
    steps: [
      { title: "Ro‘yxatdan o‘ting", desc: "Telefon raqamingiz orqali hisob yarating.", meta: "Bir necha daqiqa" },
      { title: "Marketpleyslarni ulang", desc: "Doʻkonlaringiz kabinetidan API kalitlarini qoʻshing.", meta: "Dasturchisiz" },
      { title: "Boshqarishni boshlang", desc: "Mahsulotlar, buyurtmalar va qoldiqlar Robohub’ga avtomatik yuklanadi.", meta: "Barchasi bitta kabinetda" },
      { title: "Har bosqichda yordam beramiz", desc: "Robohub jamoasi doʻkonlarni ulash va platformadan foydalanishni oʻrganishda yordam beradi.", meta: "Yordam doim yoningizda" },
    ],
    rows: { products: "Tovarlar", orders: "Buyurtmalar", stock: "Qoldiq" },
    online: "Onlayn",
    start: "Hoziroq boshlash",
    guide: "Qoʻllanmalar va videolar",
  },
  ru: {
    title: "Три шага — и ваши магазины",
    titleAccent: "в одном кабинете",
    steps: [
      { title: "Зарегистрируйтесь", desc: "Создайте аккаунт по номеру телефона.", meta: "Несколько минут" },
      { title: "Подключите маркетплейсы", desc: "Добавьте API-ключи из кабинетов ваших магазинов.", meta: "Без программиста" },
      { title: "Начните управлять", desc: "Товары, заказы и остатки автоматически загрузятся в Robohub.", meta: "Всё в одном кабинете" },
      { title: "Поможем на каждом этапе", desc: "Команда Robohub поможет подключить магазины и освоить платформу.", meta: "Поддержка рядом" },
    ],
    rows: { products: "Товары", orders: "Заказы", stock: "Остатки" },
    online: "Онлайн",
    start: "Начать сейчас",
    guide: "Инструкции и видео",
  },
  en: {
    title: "Three steps — and your stores",
    titleAccent: "in one dashboard",
    steps: [
      { title: "Sign up", desc: "Create an account with your phone number.", meta: "A few minutes" },
      { title: "Connect your marketplaces", desc: "Add API keys from your store dashboards.", meta: "No developer needed" },
      { title: "Start managing", desc: "Products, orders and stock load into Robohub automatically.", meta: "All in one dashboard" },
      { title: "We help at every step", desc: "The Robohub team will help you connect your stores and learn the platform.", meta: "Support is always close" },
    ],
    rows: { products: "Products", orders: "Orders", stock: "Stock" },
    online: "Online",
    start: "Get started",
    guide: "Guides and videos",
  },
});
