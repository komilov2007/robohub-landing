import { defineMessages } from "@/i18n/config";

// Javob — boʻlaklar roʻyxati: oddiy matn yoki { b } (qalin ajratilgan qism).
export type Part = string | { b: string };
export type FaqItem = { q: string; a: Part[] };

// Javoblar sahifaning o'zidagi va Robohub vositalari sahifalaridagi ma'lumotga tayanadi.
// Tasdiqlanmagan mavzular (bepul sinov, bekor qilish) ataylab kiritilmagan.
export const messages = defineMessages({
  uz: {
    eyebrow: "Savollar",
    // Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi
    title: "Ko‘p so‘raladigan ",
    titleAccent: "savollar",
    support: "Qoʻllab-quvvatlash xizmati",
    items: [
      {
        q: "Robohub qaysi marketpleyslar bilan ishlaydi?",
        a: [{ b: "Uzum Market, Yandex Market, Wildberries va Ozon." }, " Toʻrttalasidagi buyurtma, tovar, qoldiq va analitika bitta kabinetda turadi."],
      },
      {
        q: "Ulash qancha vaqt oladi?",
        a: [{ b: "Bir necha daqiqa." }, " Roʻyxatdan oʻtasiz, marketpleys kabinetidan olingan API kalitini kiritasiz — maʼlumotlar kabinetga avtomatik keladi. Qiyin boʻlsa, jamoamiz yordam beradi."],
      },
      {
        q: "Narxi qancha?",
        a: [{ b: "Oyiga 500 000 soʻm." }, " 6 oyga toʻlasangiz 5%, 12 oyga toʻlasangiz 15% chegirma. Tarifga 4 ta marketpleys va har biriga 3 tadan doʻkon kiradi."],
      },
      {
        q: "Nechta doʻkon ulash mumkin?",
        a: [{ b: "Tarif ichida 12 tagacha:" }, " har marketpleysga 3 tadan. Koʻproq kerak boʻlsa, har bir qoʻshimcha doʻkon oyiga 99 000 soʻm."],
      },
      {
        q: "Ombor va hisob tizimim bilan ishlaydimi?",
        a: [{ b: "Ha." }, " МойСклад, BILLZ, ERA, Smartup, YesPOS, Bito, Sales Doctor, Apicore va Retail CRM bilan integratsiya bor. Baʼzilari menejer bilan birga sozlanadi."],
      },
      {
        q: "Foydamni qanday koʻraman?",
        a: ["Dashboardda ", { b: "sof foyda, marja va ROI" }, " koʻrinadi; ABC/XYZ tahlil va AI tavsiyalar qaysi tovar foyda keltirayotganini koʻrsatadi."],
      },
      {
        q: "Kalkulyator va AI infografika pullikmi?",
        a: [{ b: "Marketpleys kalkulyatori bepul" }, " va roʻyxatdan oʻtmasdan ishlaydi. AI infografikada dastlabki 3 ta rasm bepul, keyingilari — bittasi 1 500 soʻm."],
      },
      {
        q: "Qanday qoʻllab-quvvatlash bor?",
        a: [{ b: "Oʻzbek, rus va ingliz tillarida" }, " telefon va Telegram orqali jonli yordam beramiz."],
      },
    ] as FaqItem[],
  },
  ru: {
    eyebrow: "Вопросы",
    title: "Частые ",
    titleAccent: "вопросы",
    support: "Служба поддержки",
    items: [
      {
        q: "С какими маркетплейсами работает Robohub?",
        a: [{ b: "Uzum Market, Yandex Market, Wildberries и Ozon." }, " Заказы, товары, остатки и аналитика со всех четырёх — в одном кабинете."],
      },
      {
        q: "Сколько времени занимает подключение?",
        a: [{ b: "Несколько минут." }, " Регистрируетесь, вводите API-ключ из кабинета маркетплейса — данные подтягиваются автоматически. Если возникнут трудности, наша команда поможет."],
      },
      {
        q: "Сколько это стоит?",
        a: [{ b: "500 000 сум в месяц." }, " При оплате за 6 месяцев — скидка 5%, за 12 месяцев — 15%. В тариф входят 4 маркетплейса и по 3 магазина на каждый."],
      },
      {
        q: "Сколько магазинов можно подключить?",
        a: [{ b: "До 12 в рамках тарифа:" }, " по 3 на каждый маркетплейс. Если нужно больше, каждый дополнительный магазин — 99 000 сум в месяц."],
      },
      {
        q: "Работает ли с моей складской и учётной системой?",
        a: [{ b: "Да." }, " Есть интеграции с МойСклад, BILLZ, ERA, Smartup, YesPOS, Bito, Sales Doctor, Apicore и Retail CRM. Некоторые настраиваются вместе с менеджером."],
      },
      {
        q: "Как увидеть свою прибыль?",
        a: ["В дашборде видны ", { b: "чистая прибыль, маржа и ROI" }, "; ABC/XYZ-анализ и AI-рекомендации показывают, какой товар приносит прибыль."],
      },
      {
        q: "Калькулятор и AI-инфографика платные?",
        a: [{ b: "Калькулятор маркетплейсов бесплатный" }, " и работает без регистрации. В AI-инфографике первые 3 изображения бесплатно, дальше — 1 500 сум за каждое."],
      },
      {
        q: "Какая есть поддержка?",
        a: [{ b: "На узбекском, русском и английском:" }, " живая помощь по телефону и в Telegram."],
      },
    ],
  },
  en: {
    eyebrow: "FAQ",
    title: "Frequently asked ",
    titleAccent: "questions",
    support: "Support service",
    items: [
      {
        q: "Which marketplaces does Robohub work with?",
        a: [{ b: "Uzum Market, Yandex Market, Wildberries and Ozon." }, " Orders, products, stock and analytics from all four live in one dashboard."],
      },
      {
        q: "How long does it take to connect?",
        a: [{ b: "A few minutes." }, " Sign up and enter the API key from your marketplace account — your data flows into the dashboard automatically. If you get stuck, our team will help."],
      },
      {
        q: "How much does it cost?",
        a: [{ b: "500,000 UZS per month." }, " Pay for 6 months and get 5% off, or 12 months for 15% off. The plan includes 4 marketplaces with 3 stores each."],
      },
      {
        q: "How many stores can I connect?",
        a: [{ b: "Up to 12 on the plan:" }, " 3 per marketplace. Need more? Each extra store is 99,000 UZS per month."],
      },
      {
        q: "Does it work with my inventory and accounting system?",
        a: [{ b: "Yes." }, " We integrate with МойСклад (MoySklad), BILLZ, ERA, Smartup, YesPOS, Bito, Sales Doctor, Apicore and Retail CRM. Some are set up together with a manager."],
      },
      {
        q: "How do I see my profit?",
        a: ["The dashboard shows ", { b: "net profit, margin and ROI" }, "; ABC/XYZ analysis and AI recommendations show which products actually make money."],
      },
      {
        q: "Are the calculator and AI infographics paid?",
        a: [{ b: "The marketplace calculator is free" }, " and works without signing up. With AI infographics, your first 3 images are free, then 1,500 UZS each."],
      },
      {
        q: "What support do you offer?",
        a: [{ b: "In Uzbek, Russian and English:" }, " live help by phone and on Telegram."],
      },
    ],
  },
});
