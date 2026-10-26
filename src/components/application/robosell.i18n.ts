import { defineMessages } from "@/i18n/config";
import { messages as common, type FormMessages } from "./application.i18n";

// Robosell ariza formasi (robosell domenida /application/step-1 … step-9) — savollar robo.uz/application formasidan.
// Tugma, xato va boshqa umumiy matnlar Robohub formasi bilan bir xil (application.i18n.ts), shu yerda faqat
// sarlavha, savollar va tasdiq sahifasi. options — steps.ts dagi ROBOSELL_STEPS tartibida.
export const messages = defineMessages<FormMessages>({
  uz: {
    ...common.uz,
    metaTitle: "Bepul konsultatsiya",
    metaDescription: "Onlayn savdoni rivojlantirish bo‘yicha bepul konsultatsiya oling — Robosell mutaxassisi siz bilan bog‘lanadi.",
    hero: { title: "Onlayn savdoni rivojlantirish bo‘yicha bepul konsultatsiya oling" },
    steps: {
      businessType: {
        title: "Biznesingiz turi?",
        options: [
          "Restoran / Kafe",
          "Kiyim do'koni",
          "Electronika do'koni",
          "Oziq-ovqat do'koni",
          "Dorixona",
          "Gul do'koni",
          "Kosmetika do'koni",
          "Aksessuar do'koni",
          "Qo'llanilgan mahsulot do'koni",
          "Boshqa",
        ],
        otherPlaceholder: "Biznesingiz turini kiriting",
      },
      ordersPerDay: {
        title: "Hozir kuniga nechta buyurtma olasiz?",
        options: ["Hali onlayn buyurtmalar yo'q", "1 — 10 tagacha", "10 — 30", "30 — 100", "100 dan ortiq"],
      },
      beginnerReason: {
        title: "Nega hali onlayn savdoni boshlamadingiz?",
        options: [
          "Qanday boshlashni bilmayman",
          "Juda qimmat deb o'ylayman",
          "Texnik jihatdan qiyin",
          "Hozir kuniga vaqt yo'q",
          "Hozicha ehtiyoj sezmayman",
          "Boshqa",
        ],
        otherPlaceholder: "Sababingizni qisqacha yozing",
      },
      beginnerPlatform: {
        title: "Onlayn savdoni qaysi platformada boshlamoqchisiz?",
        options: ["Telegram", "Instagram", "Marketpleylar (Uzum, Wildberries va boshqalar)", "O'z saytim orqali", "Hali qaror qilmaganman"],
      },
      storeName: { title: "Do'kon yoki restoran nomi", placeholder: "Nomini kiriting" },
      userName: { title: "Ismingiz", placeholder: "Ismingizni kiriting" },
      position: {
        title: "Lavozimingiz",
        options: ["Biznes egasi", "Boshqaruvchi", "Marketing mutaxassisi", "Administrator", "Boshqa"],
        otherPlaceholder: "Lavozimingizni kiriting",
      },
      city: {
        title: "Shahar",
        options: ["Toshkent", "Nukus", "Andijon", "Buxoro", "Fargʻona", "Guliston", "Jizzax", "Qarshi", "Navoi", "Namangan", "Samarqand", "Termiz", "Urganch", "Boshqa"],
        otherPlaceholder: "Shahar nomini kiriting",
      },
      phone: { title: "Telefon raqamingiz", placeholder: "90 123 45 67" },
    },
    success: {
      title: "Arizangiz qabul qilindi",
      text: "Rahmat! Biznesingizni onlayn rivojlantirish bo‘yicha so‘rovingiz qabul qilindi.",
      listTitle: "Robosell mutaxassisi siz bilan bog‘lanib:",
      points: [
        "biznesingizni qisqacha tahlil qiladi",
        "onlayn savdoni qanday tizimlashtirish mumkinligini ko‘rsatadi",
        "Robosell orqali savdoni qanday oshirish mumkinligini tushuntiradi",
      ],
      time: "Odatda biz 15 daqiqa ichida siz bilan bog‘lanamiz.",
      callHint: "Agar hozir gaplashish qulay bo‘lsa, quyidagi tugma orqali darhol bog‘lanishingiz mumkin.",
      call: "Bog‘lanish",
      restart: "Anketani qayta to‘ldirish",
    },
  },
  ru: {
    ...common.ru,
    metaTitle: "Бесплатная консультация",
    metaDescription: "Получите бесплатную консультацию по развитию онлайн-продаж — специалист Robosell свяжется с вами.",
    hero: { title: "Получите бесплатную консультацию по развитию онлайн-продаж" },
    steps: {
      businessType: {
        title: "Тип вашего бизнеса?",
        options: [
          "Ресторан / Кафе",
          "Магазин одежды",
          "Магазин электроники",
          "Продуктовый магазин",
          "Аптека",
          "Цветочный магазин",
          "Магазин косметики",
          "Магазин аксессуаров",
          "Магазин б/у товаров",
          "Другое",
        ],
        otherPlaceholder: "Введите тип вашего бизнеса",
      },
      ordersPerDay: {
        title: "Сколько заказов в день вы получаете?",
        options: ["Онлайн-заказов пока нет", "1 — 10", "10 — 30", "30 — 100", "Более 100"],
      },
      beginnerReason: {
        title: "Почему ещё не начали онлайн-продажи?",
        options: ["Не знаю, с чего начать", "Думаю, что это дорого", "Технически сложно", "Нет времени", "Пока не чувствую необходимости", "Другое"],
        otherPlaceholder: "Кратко опишите причину",
      },
      beginnerPlatform: {
        title: "На какой платформе хотите начать онлайн-продажи?",
        options: ["Telegram", "Instagram", "Маркетплейсы (Uzum, Wildberries и др.)", "Свой сайт", "Ещё не решил(а)"],
      },
      storeName: { title: "Название магазина или ресторана", placeholder: "Введите название" },
      userName: { title: "Ваше имя", placeholder: "Введите ваше имя" },
      position: {
        title: "Ваша должность",
        options: ["Владелец бизнеса", "Управляющий", "Маркетолог", "Администратор", "Другое"],
        otherPlaceholder: "Введите вашу должность",
      },
      city: {
        title: "Город",
        options: ["Ташкент", "Нукус", "Андижан", "Бухара", "Фергана", "Гулистан", "Джизак", "Карши", "Навои", "Наманган", "Самарканд", "Термез", "Ургенч", "Другое"],
        otherPlaceholder: "Введите название города",
      },
      phone: { title: "Ваш номер телефона", placeholder: "90 123 45 67" },
    },
    success: {
      title: "Ваша заявка принята",
      text: "Спасибо! Ваш запрос на развитие онлайн-бизнеса принят.",
      listTitle: "Специалист Robosell свяжется с вами и:",
      points: ["кратко проанализирует ваш бизнес", "покажет, как систематизировать онлайн-продажи", "объяснит, как увеличить продажи с Robosell"],
      time: "Обычно мы связываемся в течение 15 минут.",
      callHint: "Если вам удобно поговорить сейчас, свяжитесь с нами по кнопке ниже.",
      call: "Связаться",
      restart: "Заполнить анкету заново",
    },
  },
  en: {
    ...common.en,
    metaTitle: "Free consultation",
    metaDescription: "Get a free consultation on developing your online sales — a Robosell specialist will contact you.",
    hero: { title: "Get a free consultation on developing online sales" },
    steps: {
      businessType: {
        title: "What type of business do you have?",
        options: [
          "Restaurant / Cafe",
          "Clothing store",
          "Electronics store",
          "Grocery store",
          "Pharmacy",
          "Flower shop",
          "Cosmetics store",
          "Accessories store",
          "Used goods store",
          "Other",
        ],
        otherPlaceholder: "Enter your business type",
      },
      ordersPerDay: {
        title: "How many orders do you receive per day?",
        options: ["No online orders yet", "1 — 10", "10 — 30", "30 — 100", "More than 100"],
      },
      beginnerReason: {
        title: "Why haven't you started online sales yet?",
        options: ["Don't know how to start", "I think it's too expensive", "Technically difficult", "No time right now", "Don't feel the need yet", "Other"],
        otherPlaceholder: "Briefly describe your reason",
      },
      beginnerPlatform: {
        title: "Which platform do you want to start selling on?",
        options: ["Telegram", "Instagram", "Marketplaces (Uzum, Wildberries, etc.)", "My own website", "Haven't decided yet"],
      },
      storeName: { title: "Store or restaurant name", placeholder: "Enter the name" },
      userName: { title: "Your name", placeholder: "Enter your name" },
      position: {
        title: "Your position",
        options: ["Business owner", "Manager", "Marketing specialist", "Administrator", "Other"],
        otherPlaceholder: "Enter your position",
      },
      city: {
        title: "City",
        options: ["Tashkent", "Nukus", "Andijan", "Bukhara", "Fergana", "Gulistan", "Jizzakh", "Karshi", "Navoi", "Namangan", "Samarkand", "Termez", "Urgench", "Other"],
        otherPlaceholder: "Enter city name",
      },
      phone: { title: "Your phone number", placeholder: "90 123 45 67" },
    },
    success: {
      title: "Your request has been received",
      text: "Thank you! Your request for developing your online business has been received.",
      listTitle: "A Robosell specialist will contact you and:",
      points: ["briefly analyse your business", "show how to systematise your online sales", "explain how to increase sales with Robosell"],
      time: "We usually get back to you within 15 minutes.",
      callHint: "If it’s convenient to talk now, reach us with the button below.",
      call: "Contact us",
      restart: "Fill in the form again",
    },
  },
});
