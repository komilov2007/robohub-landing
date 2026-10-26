import { defineMessages } from "@/i18n/config";

// Ariza formasi matnlari — tuzilishi ikkala sayt uchun bir xil (FormMessages); Robosell'niki: robosell.i18n.ts.
// steps — qadam id'si bo'yicha; options — steps.ts dagi variantlar tartibida (CRM'ga esa o'zbekcha value ketadi).
export type StepCopy = {
  title: string;
  options?: readonly string[];
  otherPlaceholder?: string;
  placeholder?: string;
};

export type FormMessages = {
  metaTitle: string;
  metaDescription: string;
  hero: { title: string; text?: string }; // 1-qadam tepasidagi sarlavha
  steps: Record<string, StepCopy>;
  multiHint: string;
  radioHint: string;
  next: string;
  submit: string;
  back: string;
  home: string;
  lang: string;
  call: string;
  progress: string;
  errors: { name: string; phone: string; other: string };
  sendError: string;
  success: {
    title: string;
    text: string;
    listTitle: string;
    points: readonly string[];
    time: string;
    callHint: string;
    call: string;
    restart: string;
  };
};

// Robohub — marketpleys sellerlari formasi
export const messages = defineMessages<FormMessages>({
  uz: {
    metaTitle: "Ariza qoldiring",
    metaDescription:
      "Mahsulotlarni bir vaqtning o‘zida bir nechta marketplace’ga yuklang, buyurtmalarni boshqaring, qoldiqlarni sinxronlashtiring va biznesingizni tizimlashtiring.",
    hero: {
      title: "O‘zbekistonda marketplace sellerlari uchun yagona kabinet — Robohub.uz rasmiy ishga tushdi",
      text: "Mahsulotlarni bir vaqtning o‘zida bir nechta marketplace’ga yuklang, buyurtmalarni boshqaring, qoldiqlarni sinxronlashtiring va biznesingizni tizimlashtiring.",
    },
    steps: {
      whichMarketplaces: {
        title: "Qaysi marketpleyslarda sotuv qilasiz?",
        options: ["Uzum Market", "Wildberries", "Ozon", "Yandex Market", "Hali sotmayman", "Boshqa"],
        otherPlaceholder: "Marketpleys nomini yozing",
      },
      productCount: {
        title: "Assortimentingizda nechta tovar (SKU) bor?",
        options: ["1 – 100 ta tovar", "101 – 500 ta tovar", "501 – 1000 ta tovar", "1000+ ta tovar"],
      },
      salesModel: {
        title: "Marketpleysda qaysi savdo modeli orqali ishlaysiz?",
        options: ["FBO", "FBS", "DBS", "EBDS", "Bilmayman / aniqlashtirish qiyin"],
      },
      marketplaceProblems: {
        title: "Marketpleyslarda ishlashda qaysi muammoga duch kelasiz?",
        options: [
          "Buyurtmalarni boshqarish qiyin",
          "Ombor hisobini yuritish qiyin",
          "Narxlarni yangilash qiyin",
          "Bir nechta marketpleyni boshqarish qiyin",
          "Analitika yetishmaydi",
          "Boshqa",
        ],
        otherPlaceholder: "Muammoingizni yozing",
      },
      storeName: {
        title: "Ismingiz va do‘kon / brend / ilova nomini yozib qoldiring",
        placeholder: "Masalan: Ali Shop",
      },
      phone: {
        title: "Telefon raqamingizni qoldiring",
        placeholder: "90 123 45 67",
      },
    },
    multiHint: "Bir nechtasini tanlash mumkin",
    radioHint: "Bittasini tanlang",
    next: "Davom etish",
    submit: "Yuborish",
    back: "Orqaga",
    home: "Bosh sahifa",
    lang: "Til tanlash",
    call: "Qo‘ng‘iroq qilish",
    progress: "Qadam",
    errors: {
      name: "Kamida 2 ta belgi yozing",
      phone: "Telefon raqamini to‘liq kiriting",
      other: "Javobingizni yozing",
    },
    sendError: "Yuborilmadi. Qayta urinib ko‘ring yoki bizga qo‘ng‘iroq qiling.",
    success: {
      title: "Arizangiz qabul qilindi",
      text: "Rahmat! Marketplace’lardagi savdolaringizni boshqarish va rivojlantirish bo‘yicha so‘rovingiz qabul qilindi.",
      listTitle: "Robohub mutaxassisi siz bilan bog‘lanib:",
      points: [
        "biznesingizni qisqacha tahlil qiladi",
        "marketplace’lardagi jarayonlarni soddalashtirish yo‘llarini ko‘rsatadi",
        "tovarlar, zakazlar va qoldiqlarni bir joydan boshqarish imkoniyatlarini tushuntiradi",
        "Robohub orqali sotuvni masshtabga olib chiqish imkoniyatlarini ko‘rsatadi",
      ],
      time: "Odatda biz 10–15 daqiqa ichida siz bilan bog‘lanamiz.",
      callHint: "Agar hozir gaplashish qulay bo‘lsa, quyidagi tugma orqali bog‘lanishingiz mumkin.",
      call: "Bog‘lanish",
      restart: "Anketani qayta to‘ldirish",
    },
  },
  ru: {
    metaTitle: "Оставьте заявку",
    metaDescription:
      "Загружайте товары сразу на несколько маркетплейсов, управляйте заказами, синхронизируйте остатки и наведите порядок в бизнесе.",
    hero: {
      title: "Единый кабинет для селлеров маркетплейсов в Узбекистане — Robohub.uz официально запущен",
      text: "Загружайте товары сразу на несколько маркетплейсов, управляйте заказами, синхронизируйте остатки и наведите порядок в бизнесе.",
    },
    steps: {
      whichMarketplaces: {
        title: "На каких маркетплейсах вы продаёте?",
        options: ["Uzum Market", "Wildberries", "Ozon", "Яндекс Маркет", "Пока не продаю", "Другое"],
        otherPlaceholder: "Напишите название маркетплейса",
      },
      productCount: {
        title: "Сколько товаров (SKU) в вашем ассортименте?",
        options: ["1 – 100 товаров", "101 – 500 товаров", "501 – 1000 товаров", "1000+ товаров"],
      },
      salesModel: {
        title: "По какой модели вы работаете на маркетплейсе?",
        options: ["FBO", "FBS", "DBS", "EBDS", "Не знаю / сложно сказать"],
      },
      marketplaceProblems: {
        title: "С какими проблемами вы сталкиваетесь на маркетплейсах?",
        options: [
          "Сложно управлять заказами",
          "Сложно вести складской учёт",
          "Сложно обновлять цены",
          "Сложно управлять несколькими маркетплейсами",
          "Не хватает аналитики",
          "Другое",
        ],
        otherPlaceholder: "Опишите вашу проблему",
      },
      storeName: {
        title: "Напишите ваше имя и название магазина / бренда / приложения",
        placeholder: "Например: Ali Shop",
      },
      phone: {
        title: "Оставьте номер телефона",
        placeholder: "90 123 45 67",
      },
    },
    multiHint: "Можно выбрать несколько",
    radioHint: "Выберите один вариант",
    next: "Продолжить",
    submit: "Отправить",
    back: "Назад",
    home: "Главная",
    lang: "Выбор языка",
    call: "Позвонить",
    progress: "Шаг",
    errors: {
      name: "Введите не менее 2 символов",
      phone: "Введите номер полностью",
      other: "Напишите ваш ответ",
    },
    sendError: "Не удалось отправить. Попробуйте ещё раз или позвоните нам.",
    success: {
      title: "Ваша заявка принята",
      text: "Спасибо! Ваш запрос по управлению и развитию продаж на маркетплейсах принят.",
      listTitle: "Специалист Robohub свяжется с вами и:",
      points: [
        "кратко проанализирует ваш бизнес",
        "покажет, как упростить процессы на маркетплейсах",
        "расскажет, как управлять товарами, заказами и остатками из одного места",
        "покажет, как масштабировать продажи с Robohub",
      ],
      time: "Обычно мы связываемся в течение 10–15 минут.",
      callHint: "Если вам удобно поговорить сейчас, свяжитесь с нами по кнопке ниже.",
      call: "Связаться",
      restart: "Заполнить анкету заново",
    },
  },
  en: {
    metaTitle: "Leave a request",
    metaDescription:
      "List products on several marketplaces at once, manage orders, sync stock and bring order to your business.",
    hero: {
      title: "One dashboard for marketplace sellers in Uzbekistan — Robohub.uz has officially launched",
      text: "List products on several marketplaces at once, manage orders, sync stock and bring order to your business.",
    },
    steps: {
      whichMarketplaces: {
        title: "Which marketplaces do you sell on?",
        options: ["Uzum Market", "Wildberries", "Ozon", "Yandex Market", "Not selling yet", "Other"],
        otherPlaceholder: "Type the marketplace name",
      },
      productCount: {
        title: "How many products (SKUs) are in your range?",
        options: ["1 – 100 products", "101 – 500 products", "501 – 1000 products", "1000+ products"],
      },
      salesModel: {
        title: "Which fulfilment model do you use on the marketplace?",
        options: ["FBO", "FBS", "DBS", "EBDS", "Not sure / hard to say"],
      },
      marketplaceProblems: {
        title: "What problems do you face on marketplaces?",
        options: [
          "Hard to manage orders",
          "Hard to keep track of stock",
          "Hard to update prices",
          "Hard to manage several marketplaces",
          "Not enough analytics",
          "Other",
        ],
        otherPlaceholder: "Describe your problem",
      },
      storeName: {
        title: "Your name and the name of your store / brand / app",
        placeholder: "For example: Ali Shop",
      },
      phone: {
        title: "Leave your phone number",
        placeholder: "90 123 45 67",
      },
    },
    multiHint: "You can pick several",
    radioHint: "Pick one",
    next: "Continue",
    submit: "Submit",
    back: "Back",
    home: "Home",
    lang: "Choose language",
    call: "Call",
    progress: "Step",
    errors: {
      name: "Enter at least 2 characters",
      phone: "Enter the full phone number",
      other: "Type your answer",
    },
    sendError: "Couldn’t send. Please try again or give us a call.",
    success: {
      title: "Your request has been received",
      text: "Thank you! We’ve received your request about managing and growing your marketplace sales.",
      listTitle: "A Robohub specialist will contact you and:",
      points: [
        "briefly analyse your business",
        "show ways to simplify your marketplace processes",
        "explain how to manage products, orders and stock in one place",
        "show how to scale your sales with Robohub",
      ],
      time: "We usually get in touch within 10–15 minutes.",
      callHint: "If it’s convenient to talk now, reach us with the button below.",
      call: "Contact us",
      restart: "Fill in the form again",
    },
  },
});

