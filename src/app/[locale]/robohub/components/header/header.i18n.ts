import { defineMessages, localeHref, type Locale } from "@/i18n/config";
import { ACADEMY_PATH } from "@/lib/sites";

// nav — asosiy menyu. menu: "features" — band ustiga sichqoncha kelganda tepadan katta panel tushadi
//   (imkoniyatlar + vositalar). href — bandning o'z havolasi (bosilganda / JS ishlamasa shu yerga o'tadi).
// features / tools — panel ichidagi bandlar: t — nom, d — qisqa izoh. Ikonkalar header.tsx da (shu tartibda).
const academy = (l: Locale, hash: string) => `${localeHref(l, ACADEMY_PATH)}${hash}`;
const page = (l: Locale, path: string) => localeHref(l, path);

export const messages = defineMessages({
  uz: {
    home: "Robohub — bosh sahifa",
    navLabel: "Asosiy menyu",
    nav: [
      { href: "#features", label: "Imkoniyatlar", menu: "features" },
      { href: "#how-it-works", label: "Qanday ishlaydi" },
      { href: "#reviews", label: "Mijozlar" },
      { href: "#pricing", label: "Tariflar" },
      { href: ACADEMY_PATH, label: "Akademiya" },
    ],
    features: {
      title: "Robohub imkoniyatlari",
      items: [
        { href: "#features", t: "Mahsulotlar va kartochkalar", d: "Bir marta yuklang — bir nechta marketpleysda soting." },
        { href: "#features", t: "Qoldiqlar va omborlar", d: "Platformalar o‘rtasida qoldiqlarni sinxronlash." },
        { href: "#features", t: "Buyurtmalar boshqaruvi", d: "Buyurtmalarni qayta ishlash, etiketkalar va holatlar." },
        { href: "#features", t: "Ichki tahlil", d: "Savdo, foyda va mahsulotlarning unit-iqtisodiyoti." },
        { href: "#features", t: "Tashqi tahlil", d: "Marketpleyslardagi talab, assortiment va raqobatchilar." },
        { href: "#features", t: "Reklama va aksiyalar", d: "Reklama stavkalari va aksiyalarni boshqarish." },
        { href: "#features", t: "Xabarlar va sharhlar", d: "Xaridorlar bilan muloqot va avtomatik javoblar." },
      ],
    },
    tools: {
      title: "Vositalar va integratsiyalar",
      items: [
        { href: page("uz", "/calculator"), t: "Marketpleys kalkulyatori", d: "Savdoni boshlashdan oldin xarajat va foydani hisoblang." },
        { href: page("uz", "/ai-studio"), t: "AI studiya", d: "Mahsulot rasmlari va infografikasini yarating." },
        { href: "#integrations", t: "Hisob tizimlari bilan integratsiyalar", d: "Ombor hisobini marketpleyslar bilan bog‘lang." },
        { href: "#regions", t: "Marketpleyslar va mamlakatlar", d: "Savdo uchun yangi platformalar va bozorlarni tanlang." },
        { href: academy("uz", "#help"), t: "Sotuvchilar forumi", d: "Boshqa sotuvchilar bilan tajriba almashing." },
      ],
    },
    lang: "Til tanlash",
    login: "Kirish",
    start: "Ariza qoldirish",   // ochadi: aloqa formasi modalda (contact-modal.tsx)
    menuOpen: "Menyuni ochish",
    menuClose: "Menyuni yopish",
  },
  ru: {
    home: "Robohub — главная",
    navLabel: "Главное меню",
    nav: [
      { href: "#features", label: "Решения", menu: "features" },
      { href: "#how-it-works", label: "Как это работает" },
      { href: "#reviews", label: "Клиенты" },
      { href: "#pricing", label: "Тарифы" },
      { href: localeHref("ru", ACADEMY_PATH), label: "Академия" },
    ],
    features: {
      title: "Возможности Robohub",
      items: [
        { href: "#features", t: "Товары и карточки", d: "Одна загрузка — несколько маркетплейсов." },
        { href: "#features", t: "Остатки и склады", d: "Синхронизация остатков между площадками." },
        { href: "#features", t: "Управление заказами", d: "Обработка заказов, этикетки и статусы." },
        { href: "#features", t: "Внутренняя аналитика", d: "Продажи, прибыль и юнит-экономика товаров." },
        { href: "#features", t: "Внешняя аналитика", d: "Спрос, ассортимент и конкуренты на маркетплейсах." },
        { href: "#features", t: "Реклама и акции", d: "Управление ставками и продвижением." },
        { href: "#features", t: "Сообщения и отзывы", d: "Общение с покупателями и автоматические ответы." },
      ],
    },
    tools: {
      title: "Инструменты и интеграции",
      items: [
        { href: page("ru", "/calculator"), t: "Калькулятор маркетплейсов", d: "Рассчитайте расходы и прибыль до начала продаж." },
        { href: page("ru", "/ai-studio"), t: "AI-студия", d: "Создавайте изображения и инфографику товаров." },
        { href: "#integrations", t: "Интеграции с системами учёта", d: "Свяжите складской учёт с маркетплейсами." },
        { href: "#regions", t: "Маркетплейсы и страны", d: "Выбирайте новые площадки и рынки для продаж." },
        { href: academy("ru", "#help"), t: "Форум продавцов", d: "Делитесь опытом с другими продавцами." },
      ],
    },
    lang: "Выбор языка",
    login: "Войти",
    start: "Оставить заявку",
    menuOpen: "Открыть меню",
    menuClose: "Закрыть меню",
  },
  en: {
    home: "Robohub — home",
    navLabel: "Main menu",
    nav: [
      { href: "#features", label: "Solutions", menu: "features" },
      { href: "#how-it-works", label: "How it works" },
      { href: "#reviews", label: "Customers" },
      { href: "#pricing", label: "Pricing" },
      { href: localeHref("en", ACADEMY_PATH), label: "Academy" },
    ],
    features: {
      title: "Robohub features",
      items: [
        { href: "#features", t: "Products and listings", d: "Upload once — sell on several marketplaces." },
        { href: "#features", t: "Stock and warehouses", d: "Stock levels synced across platforms." },
        { href: "#features", t: "Order management", d: "Order processing, labels and statuses." },
        { href: "#features", t: "Internal analytics", d: "Sales, profit and unit economics per product." },
        { href: "#features", t: "Market analytics", d: "Demand, assortment and competitors on marketplaces." },
        { href: "#features", t: "Ads and promotions", d: "Manage bids and promotions." },
        { href: "#features", t: "Messages and reviews", d: "Customer communication and automatic replies." },
      ],
    },
    tools: {
      title: "Tools and integrations",
      items: [
        { href: page("en", "/calculator"), t: "Marketplace calculator", d: "Work out costs and profit before you start selling." },
        { href: page("en", "/ai-studio"), t: "AI studio", d: "Create product images and infographics." },
        { href: "#integrations", t: "Accounting integrations", d: "Connect your inventory system to marketplaces." },
        { href: "#regions", t: "Marketplaces and countries", d: "Pick new platforms and markets to sell on." },
        { href: academy("en", "#help"), t: "Seller forum", d: "Share experience with other sellers." },
      ],
    },
    lang: "Choose language",
    login: "Log in",
    start: "Get in touch",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
});
