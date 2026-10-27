import { defineMessages } from "@/i18n/config";

// Narxlar shu yerda tayyor yozilgan (sahifa birinchi ochilganda); tanlov almashganda
// pricing.script.js ularni `sep` va `cur` orqali joriy til formatida qayta yozadi
// (skriptdagi minglik ajratgich asl versiyadagidek — boʻlinmas boʻshliq).
// groups — "Tarifga nimalar kiradi": guruh nomi va bandlari. Oʻng panelda guruh bosilsa bandlari tagida ochiladi. soon — "tez kunda" marketpleyslar yozuvi (logotiplar pricing.tsx da).
export const messages = defineMessages({
  uz: {
    // Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi
    title: "Bitta tarif — ",
    titleAccent: "savdoni boshqarish uchun barcha imkoniyatlar",
    planName: " «Hammasi ichida» tarifi ",
    planSub: "Mahsulotlar, buyurtmalar, qoldiqlar, tahlil va reklama — barcha doʻkonlaringiz uchun.",
    termsLabel: "Muddat va chegirmalar",
    terms: [
      { label: "3 oy", text: "3 oy uchun toʻlov —", save: "Tejaysiz" },
      { label: "6 oy", text: "6 oy uchun toʻlov —", save: "6 oyda tejaysiz" },
      { label: "12 oy", text: "12 oy uchun toʻlov —", save: "12 oyda tejaysiz" },
    ],
    script: { sep: " ", cur: " soʻm" },
    price: "500 000",
    was: "500 000 soʻm",
    unit: "soʻm / oy",
    total: "1 500 000 soʻm",
    cta: "Robohub’ga ulanish ",
    extraBefore: "12 tagacha doʻkon — toʻrtta marketpleysning har birida 3 tadan. Qoʻshimcha doʻkon — ",
    extraPrice: "99 000 soʻm / oy",
    extraAfter: ".",
    soon: "Tez kunda",
    includesLabel: "Tarifga nimalar kiradi",
    groups: [
      {
        title: "Marketpleyslar va doʻkonlar",
        items: [
          "Uzum Market, Wildberries, Ozon va Yandex Market",
          "Har bir marketpleysda 3 tagacha doʻkon",
        ],
      },
      {
        title: "Mahsulotlar va qoldiqlar",
        items: [
          "Kartochkalarni yaratish va marketpleyslar oʻrtasida koʻchirish",
          "Excel va ulangan doʻkonlardan mahsulotlarni import qilish",
          "Turli platformalardagi bir xil mahsulotlarni birlashtirish",
          "Narx va qoldiqlarni ommaviy oʻzgartirish",
          "Qoldiqlarni avtomatik sinxronlash",
          "FBO omborlariga mahsulot yetkazishni rejalashtirish",
          "Marketpleys omborlarida yoʻqolgan mahsulotlarni nazorat qilish",
        ],
      },
      {
        title: "Buyurtmalar",
        items: [
          "Barcha buyurtma va holatlar yagona roʻyxatda",
          "Buyurtmalarni yigʻish va etiketkalarni guruhlab chop etish",
          "FBS, FBO va DBS modellari bilan ishlash",
        ],
      },
      {
        title: "Tahlil va moliya",
        items: [
          "Barcha doʻkonlar boʻyicha umumiy boshqaruv paneli",
          "Savdo, xarajat, foyda va qaytarishlar",
          "Har bir mahsulot boʻyicha unit-iqtisodiyot",
          "Tannarx, komissiya, logistika va reklama xarajatlari hisobi",
          "Reklama samaradorligi tahlili",
          "Assortimentning ABC/XYZ tahlili",
          "Marketpleyslar va raqobatchilarning tashqi tahlili",
        ],
      },
      {
        title: "Reklama va aksiyalar",
        items: [
          "Reklama stavkalarini boshqaruvchi avtobidder",
          "Promokodlarni boshqarish",
          "Marketpleys aksiyalari taqvimi",
          "Mahsulot kartochkalarini yaxshilash vositalari",
        ],
      },
      {
        title: "Xaridorlar",
        items: [
          "Ulangan platformalardagi xaridorlar xabarlari",
          "Sharhlar va baholar bilan ishlash",
          "Yulduzlar soniga qarab sharhlarga avtomatik javoblar",
        ],
      },
      {
        title: "AI yordamchi",
        items: [
          "Mahsulot nomi va tavsifini tayyorlashda yordam",
          "Sharhlarga javoblar tayyorlash",
          "Mahsulotlar, qoldiqlar va reklama boʻyicha tavsiyalar",
        ],
      },
      {
        title: "Qoʻllab-quvvatlash",
        items: [
          "Doʻkonlarni ulash va sozlashda yordam",
          "Qoʻllanmalar va videodarslar",
          "Telefon va Telegram orqali yordam",
        ],
      },
    ],
  },
  ru: {
    title: "Один тариф — ",
    titleAccent: "всё для управления продажами",
    planName: " Тариф «Всё включено» ",
    planSub: "Товары, заказы, остатки, аналитика и продвижение — для всех ваших магазинов.",
    termsLabel: "Срок и скидки",
    terms: [
      { label: "3 месяца", text: "При оплате за 3 месяца —", save: "Экономия" },
      { label: "6 месяцев", text: "При оплате за 6 месяцев —", save: "Экономия за 6 месяцев" },
      { label: "12 месяцев", text: "При оплате за 12 месяцев —", save: "Экономия за 12 месяцев" },
    ],
    script: { sep: " ", cur: " сум" },
    price: "500 000",
    was: "500 000 сум",
    unit: "сум / месяц",
    total: "1 500 000 сум",
    cta: "Подключить Robohub ",
    extraBefore: "До 12 магазинов — по 3 на каждом из четырёх маркетплейсов. Дополнительный магазин — ",
    extraPrice: "99 000 сум / месяц",
    extraAfter: ".",
    soon: "Скоро",
    includesLabel: "Что входит в тариф",
    groups: [
      {
        title: "Маркетплейсы и магазины",
        items: [
          "Uzum Market, Wildberries, Ozon и Яндекс Маркет",
          "До 3 магазинов на каждом маркетплейсе",
        ],
      },
      {
        title: "Товары и остатки",
        items: [
          "Создание карточек и перенос между маркетплейсами",
          "Импорт товаров из Excel и подключённых магазинов",
          "Объединение одинаковых товаров с разных площадок",
          "Массовое изменение цен и остатков",
          "Автоматическая синхронизация остатков",
          "Планирование поставок на склады FBO",
          "Контроль потерянных товаров на складах маркетплейсов",
        ],
      },
      {
        title: "Заказы",
        items: [
          "Все заказы и статусы в одной ленте",
          "Сборка заказов и пакетная печать этикеток",
          "Работа с моделями FBS, FBO и DBS",
        ],
      },
      {
        title: "Аналитика и финансы",
        items: [
          "Общий дашборд по всем магазинам",
          "Продажи, расходы, прибыль и возвраты",
          "Юнит-экономика каждого товара",
          "Учёт себестоимости, комиссий, логистики и рекламы",
          "Анализ эффективности рекламы",
          "ABC/XYZ-анализ ассортимента",
          "Внешняя аналитика маркетплейсов и конкурентов",
        ],
      },
      {
        title: "Продвижение",
        items: [
          "Автобиддер для управления рекламными ставками",
          "Управление промокодами",
          "Календарь акций маркетплейсов",
          "Инструменты улучшения товарных карточек",
        ],
      },
      {
        title: "Покупатели",
        items: [
          "Сообщения покупателей с подключённых площадок",
          "Работа с отзывами и оценками",
          "Автоматические ответы на отзывы по количеству звёзд",
        ],
      },
      {
        title: "AI-помощник",
        items: [
          "Помощь с названиями и описаниями товаров",
          "Подготовка ответов на отзывы",
          "Рекомендации по товарам, остаткам и продвижению",
        ],
      },
      {
        title: "Поддержка",
        items: [
          "Помощь с подключением магазинов и настройкой",
          "Инструкции и видеоуроки",
          "Поддержка по телефону и в Telegram",
        ],
      },
    ],
  },
  en: {
    title: "One plan — ",
    titleAccent: "everything you need to manage sales",
    planName: " “All-in-one” plan ",
    planSub: "Products, orders, stock, analytics and promotion — for all your stores.",
    termsLabel: "Term and discounts",
    terms: [
      { label: "3 months", text: "Paid for 3 months —", save: "You save" },
      { label: "6 months", text: "Paid for 6 months —", save: "You save over 6 months" },
      { label: "12 months", text: "Paid for 12 months —", save: "You save over 12 months" },
    ],
    script: { sep: ",", cur: " UZS" },
    price: "500,000",
    was: "500,000 UZS",
    unit: "UZS / month",
    total: "1,500,000 UZS",
    cta: "Connect Robohub ",
    extraBefore: "Up to 12 stores — 3 on each of the four marketplaces. Extra store — ",
    extraPrice: "99,000 UZS / month",
    extraAfter: ".",
    soon: "Coming soon",
    includesLabel: "What’s included",
    groups: [
      {
        title: "Marketplaces and stores",
        items: [
          "Uzum Market, Wildberries, Ozon and Yandex Market",
          "Up to 3 stores on each marketplace",
        ],
      },
      {
        title: "Products and stock",
        items: [
          "Create product cards and move them between marketplaces",
          "Import products from Excel and connected stores",
          "Merge identical products from different platforms",
          "Bulk price and stock updates",
          "Automatic stock sync",
          "Plan shipments to FBO warehouses",
          "Track lost products in marketplace warehouses",
        ],
      },
      {
        title: "Orders",
        items: [
          "All orders and statuses in one feed",
          "Order picking and batch label printing",
          "Work with FBS, FBO and DBS models",
        ],
      },
      {
        title: "Analytics and finance",
        items: [
          "One dashboard for all stores",
          "Sales, expenses, profit and returns",
          "Unit economics for every product",
          "Cost, commission, logistics and ad spend accounting",
          "Ad performance analysis",
          "ABC/XYZ assortment analysis",
          "External analytics of marketplaces and competitors",
        ],
      },
      {
        title: "Promotion",
        items: [
          "Autobidder to manage ad bids",
          "Promo code management",
          "Marketplace promotions calendar",
          "Tools to improve product cards",
        ],
      },
      {
        title: "Customers",
        items: [
          "Customer messages from connected platforms",
          "Work with reviews and ratings",
          "Automatic replies to reviews by star rating",
        ],
      },
      {
        title: "AI assistant",
        items: [
          "Help with product titles and descriptions",
          "Drafting replies to reviews",
          "Recommendations on products, stock and promotion",
        ],
      },
      {
        title: "Support",
        items: [
          "Help with connecting stores and setup",
          "Guides and video lessons",
          "Support by phone and Telegram",
        ],
      },
    ],
  },
});
