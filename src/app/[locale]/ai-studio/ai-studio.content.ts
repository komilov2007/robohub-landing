import { defineMessages, localeHref, type Locale } from "@/i18n/config";
import { aiImage, type AiProduct } from "@/lib/ai-images";

const AI_PRODUCTS = new Set<string>(["thermos", "bag", "earbuds", "glasses", "keyboard"]);
const isAiProduct = (p: string): p is AiProduct => AI_PRODUCTS.has(p);

// AI Studio landingining barcha matnlari va ma'lumotlari — bitta joyda, uch tilda (uz — namuna, ru/en — aynan shu tuzilishda).
//   • DATA — tilga bog'liq bo'lmagan narsalar: havolalar, rasmlar, raqamlar, narxlar.
//   • TEXT — tarjimalar. Tuzilish uz bo'yicha tekshiriladi: ru/en da kalit yetishmasa — tip xatosi.
//   • buildContent(locale) — ikkalasini birlashtirib, komponentlar ishlatadigan tayyor obyektni beradi.
//     Server komponentlar: `await getC()` (content.server.ts), client komponentlar: `useC()` (content-context.tsx).
// Imlo (uz): o‘/g‘ uchun ‘ (U+2018), tutuq belgisi uchun ’ (U+2019).
// NAMUNA — "NAMUNA" deb belgilangan narsalar (raqamlar, narxlar, javoblar) haqiqiy ma'lumot kelganda almashtiriladi.

// AI infografika studiyasi (rb-market). "Sinab ko'rish" kabi barcha CTA'lar shu manzilga olib boradi;
// JS ishlasa — studio-modal.tsx ularni ushlab, studiyani landing ustidagi oynada (iframe) ochadi.
export const STUDIO_URL = "https://robohub.uz/ai-infografika/";
export const SIGNUP_HREF = STUDIO_URL;
// iframe uchun: `?ai_topup=public-studio` — rb-market sahifa ochilishi bilan studiyani avtomatik ochadi
// (to‘lovdan qaytishda ishlatiladigan o‘sha parametr; boshqa ta’siri yo‘q, URL’dan o‘zi o‘chadi).
export const STUDIO_EMBED_URL = `${STUDIO_URL}?ai_topup=public-studio`;
// "Kirish" — Robohub sotuvchi kabineti
export const LOGIN_HREF = "https://seller.robohub.uz";
export const EXAMPLES_HREF = "#examples";
// oddiy krem fotosi — "Muammo" va "Qadamlar" bo'limlaridagi kichik vizuallar uchun (hero'da — iPhone, DATA.studio)
export const BEFORE_IMG = "/ai/base_cosmetics.webp";
export const TOKENS_PER_IMAGE = 3;
// Narx — bitta manba: 1 rasm narxi (so'm); 1 token narxi undan hisoblanadi. Matnlardagi {img} va {tok} shu bilan to'ldiriladi.
export const PRICE_PER_IMAGE = 1500;
export const TOKEN_PRICE = PRICE_PER_IMAGE / TOKENS_PER_IMAGE;
/** So'm summasi: "1 500" (guruhlash — bo'linmas bo'sh joy, uch tilda bir xil) */
export const money = (n: number) => Math.round(n).toLocaleString("ru-RU").replace(/\s/g, "\u00A0");

type GalleryProduct =
  | "thermos" | "bag" | "earbuds" | "glasses" | "mug" | "headset"
  | "mouse" | "keyboard" | "racket" | "backpack" | "pen" | "sneakers";
type GenMode = "photo" | "infographic" | "pack"; // DATA.modes dagi id'lar
/** Galereya rasmi: public/ai-studio/gallery/<name>.webp */
const gal = (name: string) => `/ai-studio/gallery/${name}.webp`;
/** Hero rasmi: public/ai-studio/hero/<name>.webp */
const heroImg = (name: string) => `/ai-studio/hero/${name}.webp`;

// ---------- tilga bog'liq bo'lmagan ma'lumotlar ----------
const DATA = {
  nav: ["#features", "#how", "#examples", "#faq"] as const,
  product: { icons: ["clock", "star", "shield"] as const },
  // Hero: haqiqiy AI Studio natijalari — qo'ldagi iPhone fotosi → 4 xil uslub (Robohub landingidagi o'sha rasmlar).
  // Nomlari — T.studio.variants (tartib bir xil). Birinchisi sahifa ochilganda ko'rinadi.
  studio: {
    before: heroImg("iphone-before"),
    styles: [
      { id: "infographic", img: heroImg("iphone-infographic") },
      { id: "desk", img: heroImg("iphone-desk") },
      { id: "lifestyle", img: heroImg("iphone-lifestyle") },
      { id: "cafe", img: heroImg("iphone-cafe") },
    ],
  },
  // krem infografikasi — "Rejimlar", "Muammo" va "Qadamlar" bo'limlaridagi kichik vizuallar uchun
  variants: [
    { id: "composition", img: "/ai/cosmetics_composition.webp" },
    { id: "interior", img: "/ai/cosmetics_everyday.webp" },
    { id: "lifestyle", img: "/ai/cosmetics_in_use.webp" },
  ],
  markets: [
    { name: "Uzum Market", icon: "/marketplaces/uzum.svg" },
    { name: "Wildberries", icon: "/marketplaces/wildberries.svg" },
    { name: "Ozon", icon: "/marketplaces/ozon.svg" },
    { name: "Yandex Market", icon: "/marketplaces/yandex.svg" },
  ],
  // NAMUNA raqamlar
  stats: [
    { prefix: "", value: 10000, suffix: "+" },
    { prefix: "", value: 500, suffix: "+" },
    { prefix: "~", value: 60, suffix: " s" },
  ],
  problem: [
    { id: "price", icon: "wallet", solIcon: "sell" },
    { id: "time", icon: "clock", solIcon: "send" },
    { id: "ctr", icon: "eyeOff", solIcon: "trend" },
  ] as const,
  // Haqiqiy natijalar: telefonda olingan oddiy foto (oldin) → AI Studio rasmi (keyin).
  //   mode — qaysi rejimda yaratilgan (kartadagi yozuv shundan: "Infografika · 3 token").
  //   Har mahsulot bir marta (sumka ham — bitta karta). Kompyuterda 6 ustunli grid 2 qator = 12 karta;
  //   12 tadan kam bo‘lsa kompyuterda faqat birinchi to‘liq qator ko‘rinadi (gallery.tsx, .is-short). wide — 2 ustun.
  // Tartib muhim: telefonda birinchi 4 tasi, planshetda 6 tasi, kompyuterda hammasi ko‘rinadi.
  //   Infografika va foto navbatma-navbat — grid shaxmat kabi aralash ko‘rinadi.
  gallery: [
    // 1-qator
    { product: "thermos", mode: "infographic", before: gal("thermos-before"), after: gal("thermos-after") },
    { product: "mug", mode: "photo", before: gal("mug-before"), after: gal("mug-after") },
    { product: "bag", mode: "infographic", before: gal("bag-before"), after: gal("bag-infographic") },
    { product: "headset", mode: "photo", before: gal("headset-before"), after: gal("headset-after") },
    { product: "earbuds", mode: "infographic", before: gal("earbuds-before"), after: gal("earbuds-after") },
    { product: "racket", mode: "photo", before: gal("racket-before"), after: gal("racket-after") },
    // 2-qator
    { product: "sneakers", mode: "photo", before: gal("sneakers-before"), after: gal("sneakers-after") },
    { product: "glasses", mode: "infographic", before: gal("glasses-before"), after: gal("glasses-after") },
    { product: "pen", mode: "photo", before: gal("pen-before"), after: gal("pen-after") },
    { product: "keyboard", mode: "infographic", before: gal("keyboard-before"), after: gal("keyboard-after") },
    { product: "backpack", mode: "photo", before: gal("backpack-before"), after: gal("backpack-after") },
    { product: "mouse", mode: "photo", before: gal("mouse-before"), after: gal("mouse-after") },
  ] as { product: GalleryProduct; mode: GenMode; before: string; after: string; wide?: boolean }[],
  steps: ["upload", "mode", "prompt", "generate"] as const,
  modes: [
    { id: "photo", tokens: 3, featured: false },
    { id: "infographic", tokens: 3, featured: true },
    { id: "pack", tokens: 15, featured: false },
  ] as const,
  pack: ["/ai/cosmetics_studio.webp", "/ai/cosmetics_everyday.webp", "/ai/cosmetics_composition.webp", "/ai/cosmetics_in_use.webp", "/ai/base_cosmetics.webp"],
  // Foto rejimining 4 uslubi — studiyadagi tartibda: ishlatilishda, muhitda, yaqin plan, katalog (nomlari — T.modes.styles)
  photoStyles: ["/ai/cosmetics_in_use.webp", "/ai/cosmetics_everyday.webp", "/ai/cosmetics_composition.webp", "/ai/cosmetics_studio.webp"],
  // Robohub Academy'dagi mos darslar (raqami — robohub/academy/lib/academy.ts dagi n): kartochka yaratish,
  // narxlarni yangilash, Uzum Market'ni ulash. Nomi, muqovasi va havolasi o'sha yerdan olinadi.
  calc: { min: 1, max: 500, initial: 40 },
  lessons: [16, 15, 22],
};

type Gallery = Record<GalleryProduct, string>;

// ---------- tarjimalar ----------
const uz = {
  nav: ["Imkoniyatlar", "Qanday ishlaydi", "Namunalar", "FAQ"],
  ui: {
    home: "Robohub AI Studio — sahifa boshi",
    mainMenu: "Asosiy menyu",
    login: "Kirish",
    start: "Bepul boshlash",
    menuOpen: "Menyuni ochish",
    menuClose: "Menyuni yopish",
    lang: "Til tanlash",
  },
  // ko'plik shakllari: [1, 2–4, 5+] — rus tili uchun; boshqa tillarda kerakli shakl takrorlanadi
  forms: {
    token: ["token", "token", "token"],
    image: ["ta rasm", "ta rasm", "ta rasm"],
    imageShort: ["rasm", "rasm", "rasm"],
  },
  currency: "so‘m",
  hero: {
    // sarlavha so'zlari; ajratilgani — mint "marker" bilan chiziladi
    title: "Oddiy rasmdan sotadigan infografika:",
    accent: "1 daqiqada",
    lead: "Mahsulot rasmini yuklang, AI Uzum, Wildberries va Ozon uchun 750×1000 formatda tayyor kartochka rasmini yaratadi. Dizayner va kutish shart emas.",
    primary: "Bepul sinab ko‘rish",
    secondary: "Namunalarni ko‘rish",
    notes: ["Birinchi tokenlar bepul", "Karta kerak emas", "750×1000 format"],
    facts: [
      { value: "1", unit: "daqiqa", label: "1 rasm tayyorlanishi" },
      { value: "3", unit: "token", label: "1 rasm narxi · {img} so‘m" },
      { value: "5", unit: "ta", label: "tayyor dizayn uslubi" },
    ],
  },
  studio: {
    steps: ["Tahlil", "Fon", "Dizayn", "Tayyor"],
    ready: "Tayyor · 28 s",
    beforeAlt: "Oddiy mahsulot fotosi: qo‘ldagi iPhone",
    beforeCap: "Oldin · oddiy foto",
    afterTag: "Keyin · AI Studio",
    afterAlt: "AI Studio natijasi, “{name}” uslubi",
    tabs: "Rasm uslubi",
    variants: ["Infografika", "Kompozitsiya", "Hayotiy", "Kundalik"],
  },
  product: {
    features: ["48 soat namlik", "100% tabiiy tarkib", "Barcha teri turlari"],
  },
  trust: {
    eyebrow: "Quyidagi marketplace formatlariga mos",
    stats: ["rasm yaratildi", "sotuvchi ishlatadi", "o‘rtacha vaqt"],
  },
  problem: {
    eyebrow: "Muammo va yechim",
    title: "Kartochka rasmi nega sotuvni",
    accent: "to‘xtatadi?",
    lead: "Xaridor mahsulotni birinchi rasmga qarab tanlaydi",
    live: "jonli",
    problemTag: "Muammo",
    solutionTag: "Yechim · AI Studio",
    day: "{n}-kun",
    ctaText: "Farqni o‘zingiz ko‘ring —",
    ctaBold: "birinchi tokenlar bepul",
    cta: "Bepul sinab ko‘rish",
    cards: [
      {
        metric: "Narx",
        problem: { title: "Dizayner qimmat", text: "1 kartochka uchun 50 000+ so‘m" },
        solution: { title: "AI arzon", text: "1 rasm = 3 token = {img} so‘m" },
        old: { label: "Dizayner", value: "50 000+ so‘m" },
        now: { label: "AI Studio", value: "{img} so‘m" },
      },
      {
        metric: "Vaqt",
        problem: { title: "Uzoq kutish", text: "2–3 kun, tuzatishlar bilan haftalab" },
        solution: { title: "1 daqiqa", text: "Yuklang, tanlang, tayyor" },
        old: { label: "Dizayner", value: "2–3 kun" },
        now: { label: "AI Studio", value: "1 daqiqa" },
      },
      {
        metric: "Ko‘rinish",
        problem: { title: "Past CTR", text: "Oddiy foto qidiruvda ko‘rinmay qoladi" },
        solution: { title: "Sotadigan dizayn", text: "Afzalliklar rasmda yoziladi" },
        old: { label: "Oddiy foto", value: "" },
        now: { label: "Infografika", value: "" },
      },
    ],
  },
  gallery: {
    title: "Natijalarni ko‘ring",
    cta: "Shunaqasini yaratish",
    before: "Oldin",
    after: "Keyin",
    photoAlt: "{name} — oddiy foto",
    resultAlt: "{name} — AI Studio natijasi",
    items: {
      thermos: "Termos krujka",
      bag: "Krossbodi sumka",
      earbuds: "Simsiz quloqchin",
      glasses: "Kompyuter ko‘zoynagi",
      mug: "Keramik krujka",
      headset: "Geymer quloqchini",
      mouse: "Simsiz sichqoncha",
      keyboard: "Kompyuter klaviaturasi",
      racket: "Stol tennisi raketkasi",
      backpack: "Sport ryukzagi",
      pen: "Sharikli ruchka",
      sneakers: "Charm krossovka",
    } as Gallery,
  },
  steps: {
    eyebrow: "Qanday ishlaydi",
    title: "4 qadamda",
    accent: "tayyor",
    lead: "Robohub AI Studio ichida, hech qanday dastursiz",
    items: [
      { title: "Rasm yuklang", text: "4 tagacha, JPG/PNG/WEBP/HEIC, Ctrl+V" },
      { title: "Rejimni tanlang", text: "Foto, Infografika yoki 5 to‘plam" },
      { title: "Istak yozing", text: "Yoki AI g‘oya tugmasi o‘zi taklif qiladi" },
      { title: "Generatsiya", text: "Natijani yuklab oling yoki kartochkaga qo‘ying" },
    ],
    prompt: "Oq fonda, yozgi kayfiyatda, afzalliklari bilan",
    drop: "Rasmni shu yerga tashlang",
    idea: "AI g‘oya",
    generate: "Generatsiya",
  },
  modes: {
    eyebrow: "Generatsiya rejimlari",
    title: "Sizga qaysi rasm",
    accent: "kerak?",
    lead: "Bir mahsulotdan uch xil natija",
    items: [
      { name: "Foto", text: "Mahsulotning toza, matnsiz kadri. Asosiy rasm uchun." },
      { name: "Infografika", text: "Afzalliklar, o‘lchamlar va xususiyatlar rasmda." },
      { name: "5 to‘plam", text: "Kartochka uchun 5 ta turli rakursdagi rasm." },
    ],
    popular: "Eng ommabop",
    styles: ["Ishlatilishda","Muhitda","Yaqin plan","Katalog (studiya)"], // Foto rejimining 4 uslubi (studiyadagi kabi) — DATA.photoStyles tartibida
    choose: "Tanlash",
  },
  pricing: {
    eyebrow: "Hisoblagich",
    title: "Faqat ishlatganingizga",
    accent: "to‘lang",
    lead: "1 token = {tok} so‘m · 1 rasm = 3 token = {img} so‘m. Obuna majburiy emas — rasm sonini tanlang, token va narx darhol hisoblanadi.",
    calc: "Qancha rasm kerak?",
  },
  academy: {
    kicker: "Robohub Academy",
    title: "Hali ham o‘rgana olmadingizmi?",
    lead: "Robohub Academy kartochka yaratish, narxlarni yangilash va marketpleysni ulashni bepul o‘rgatadi — qisqa video darslarda.",
    cta: "Academy’ga o‘tish",
    free: "Bepul",
    lesson: "Dars {n}",
  },
  // NAMUNA: javoblar mahsulot jamoasi bilan tekshirilishi kerak
  faq: {
    eyebrow: "FAQ",
    title: "Ko‘p beriladigan",
    accent: "savollar",
    lead: "Javob topmadingizmi? Telegram’da yozing",
    tg: "Telegram’da yozish",
    items: [
      { q: "Qaysi marketplace’lar uchun mos?", a: "Uzum Market, Wildberries, Ozon va Yandex Market. Rasmlar 750×1000 formatda tayyorlanadi." },
      { q: "Token qancha vaqt amal qiladi?", a: "Sotib olingan tokenlar muddatsiz — ularni o‘zingizga qulay paytda ishlatasiz." },
      { q: "Qanday rasm yuklash kerak?", a: "Mahsulot aniq ko‘rinadigan oddiy foto yetarli. 4 tagacha rasm, JPG, PNG, WEBP yoki HEIC formatda." },
      { q: "Infografika matni qaysi tilda?", a: "O‘zbek va rus tillarida. Istak maydoniga kerakli matnni o‘zingiz ham yozishingiz mumkin." },
      { q: "Rasmlardan tijorat maqsadida foydalansa bo‘ladimi?", a: "Ha. Yaratilgan rasmlar sizniki — ularni kartochkada, reklamada va ijtimoiy tarmoqlarda ishlatishingiz mumkin." },
      { q: "Robohub’siz alohida ishlatsa bo‘ladimi?", a: "AI Studio Robohub kabineti ichida ishlaydi. Ro‘yxatdan o‘tish bepul va bir necha daqiqa oladi." },
    ],
  },
  final: {
    title: "Birinchi infografikangizni",
    accent: "hozir yarating",
    lead: "Bepul tokenlar bilan boshlang, natija 1 daqiqada",
    cta: "Bepul tokenni olish",
  },
  footer: {
    about: "Marketplace sotuvchilari uchun AI yordamchi: rasm, infografika va kartochka bir joyda.",
    product: "Mahsulot",
    company: "Kompaniya",
    examples: "Namunalar",
    contacts: "Aloqa",
    rights: "Barcha huquqlar himoyalangan.",
  },
  modal: {
    label: "AI infografika studiyasi",
    loading: "Studiya yuklanmoqda…",
    close: "Studiyani yopish",
  },
};

type Dict = typeof uz;

const ru: Dict = {
  nav: ["Возможности", "Как это работает", "Примеры", "FAQ"],
  ui: {
    home: "Robohub AI Studio — в начало страницы",
    mainMenu: "Главное меню",
    login: "Войти",
    start: "Начать бесплатно",
    menuOpen: "Открыть меню",
    menuClose: "Закрыть меню",
    lang: "Выбор языка",
  },
  forms: {
    token: ["токен", "токена", "токенов"],
    image: ["изображение", "изображения", "изображений"],
    imageShort: ["фото", "фото", "фото"],
  },
  currency: "сум",
  hero: {
    title: "Продающая инфографика из обычного фото:",
    accent: "за 1 минуту",
    lead: "Загрузите фото товара — AI создаст готовое изображение карточки 750×1000 для Uzum, Wildberries и Ozon. Без дизайнера и ожидания.",
    primary: "Попробовать бесплатно",
    secondary: "Смотреть примеры",
    notes: ["Первые токены бесплатно", "Карта не нужна", "Формат 750×1000"],
    facts: [
      { value: "1", unit: "минута", label: "на одно изображение" },
      { value: "3", unit: "токена", label: "цена одного изображения · {img} сум" },
      { value: "5", unit: "стилей", label: "готового дизайна" },
    ],
  },
  studio: {
    steps: ["Анализ", "Фон", "Дизайн", "Готово"],
    ready: "Готово · 28 с",
    beforeAlt: "Обычное фото товара: iPhone в руке",
    beforeCap: "До · обычное фото",
    afterTag: "После · AI Studio",
    afterAlt: "Результат AI Studio, стиль «{name}»",
    tabs: "Стиль изображения",
    variants: ["Инфографика", "Композиция", "Лайфстайл", "Повседневный"],
  },
  product: {
    features: ["48 часов увлажнения", "100% натуральный состав", "Для всех типов кожи"],
  },
  trust: {
    eyebrow: "Подходит под форматы маркетплейсов",
    stats: ["изображений создано", "продавцов пользуются", "среднее время"],
  },
  problem: {
    eyebrow: "Проблема и решение",
    title: "Почему фото карточки",
    accent: "тормозит продажи?",
    lead: "Покупатель выбирает товар по первому фото",
    live: "live",
    problemTag: "Проблема",
    solutionTag: "Решение · AI Studio",
    day: "День {n}",
    ctaText: "Оцените разницу сами —",
    ctaBold: "первые токены бесплатно",
    cta: "Попробовать бесплатно",
    cards: [
      {
        metric: "Цена",
        problem: { title: "Дизайнер — дорого", text: "От 50 000 сум за одну карточку" },
        solution: { title: "AI — дёшево", text: "1 изображение = 3 токена = {img} сум" },
        old: { label: "Дизайнер", value: "50 000+ сум" },
        now: { label: "AI Studio", value: "{img} сум" },
      },
      {
        metric: "Время",
        problem: { title: "Долгое ожидание", text: "2–3 дня, с правками — недели" },
        solution: { title: "1 минута", text: "Загрузили, выбрали, готово" },
        old: { label: "Дизайнер", value: "2–3 дня" },
        now: { label: "AI Studio", value: "1 минута" },
      },
      {
        metric: "Заметность",
        problem: { title: "Низкий CTR", text: "Обычное фото теряется в поиске" },
        solution: { title: "Продающий дизайн", text: "Преимущества прямо на изображении" },
        old: { label: "Обычное фото", value: "" },
        now: { label: "Инфографика", value: "" },
      },
    ],
  },
  gallery: {
    title: "Посмотрите на результат",
    cta: "Создать такое же",
    before: "До",
    after: "После",
    photoAlt: "{name} — обычное фото",
    resultAlt: "{name} — результат AI Studio",
    items: {
      thermos: "Термокружка",
      bag: "Сумка кросс-боди",
      earbuds: "Беспроводные наушники",
      glasses: "Компьютерные очки",
      mug: "Керамическая кружка",
      headset: "Игровая гарнитура",
      mouse: "Беспроводная мышь",
      keyboard: "Компьютерная клавиатура",
      racket: "Ракетка для настольного тенниса",
      backpack: "Спортивный рюкзак",
      pen: "Шариковая ручка",
      sneakers: "Кожаные кроссовки",
    },
  },
  steps: {
    eyebrow: "Как это работает",
    title: "Готово за",
    accent: "4 шага",
    lead: "Прямо в Robohub AI Studio, без дополнительных программ",
    items: [
      { title: "Загрузите фото", text: "До 4 штук, JPG/PNG/WEBP/HEIC, Ctrl+V" },
      { title: "Выберите режим", text: "Фото, инфографика или набор из 5" },
      { title: "Опишите пожелание", text: "Или кнопка «AI-идея» предложит сама" },
      { title: "Генерация", text: "Скачайте результат или добавьте в карточку" },
    ],
    prompt: "На белом фоне, в летнем настроении, с преимуществами",
    drop: "Перетащите фото сюда",
    idea: "AI-идея",
    generate: "Сгенерировать",
  },
  modes: {
    eyebrow: "Режимы генерации",
    title: "Какое изображение",
    accent: "вам нужно?",
    lead: "Три разных результата из одного товара",
    items: [
      { name: "Фото", text: "Чистый кадр товара без текста. Для главного фото." },
      { name: "Инфографика", text: "Преимущества, размеры и характеристики на изображении." },
      { name: "Набор из 5", text: "5 изображений с разных ракурсов для карточки." },
    ],
    popular: "Самый популярный",
    styles: ["В использовании","В интерьере","Крупный план","Каталог (студия)"], // Foto rejimining 4 uslubi (studiyadagi kabi) — DATA.photoStyles tartibida
    choose: "Выбрать",
  },
  pricing: {
    eyebrow: "Калькулятор",
    title: "Платите только",
    accent: "за использование",
    lead: "1 токен = {tok} сум · 1 изображение = 3 токена = {img} сум. Подписка не обязательна — выберите количество, токены и цена посчитаются сразу.",
    calc: "Сколько изображений нужно?",
  },
  academy: {
    kicker: "Robohub Academy",
    title: "Всё ещё не разобрались?",
    lead: "Robohub Academy бесплатно учит создавать карточки, обновлять цены и подключать маркетплейсы — в коротких видеоуроках.",
    cta: "Перейти в Academy",
    free: "Бесплатно",
    lesson: "Урок {n}",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Частые",
    accent: "вопросы",
    lead: "Не нашли ответ? Напишите в Telegram",
    tg: "Написать в Telegram",
    items: [
      { q: "Для каких маркетплейсов подходит?", a: "Uzum Market, Wildberries, Ozon и Yandex Market. Изображения создаются в формате 750×1000." },
      { q: "Сколько действуют токены?", a: "Купленные токены бессрочные — используйте их, когда удобно." },
      { q: "Какое фото нужно загрузить?", a: "Достаточно обычного фото, где хорошо виден товар. До 4 изображений в формате JPG, PNG, WEBP или HEIC." },
      { q: "На каком языке текст инфографики?", a: "На узбекском и русском. Нужный текст можно написать и самостоятельно в поле пожеланий." },
      { q: "Можно ли использовать изображения в коммерческих целях?", a: "Да. Созданные изображения принадлежат вам — используйте их в карточках, рекламе и соцсетях." },
      { q: "Можно ли пользоваться без Robohub?", a: "AI Studio работает внутри кабинета Robohub. Регистрация бесплатная и занимает пару минут." },
    ],
  },
  final: {
    title: "Создайте первую инфографику",
    accent: "прямо сейчас",
    lead: "Начните с бесплатных токенов — результат за 1 минуту",
    cta: "Получить бесплатные токены",
  },
  footer: {
    about: "AI-помощник для продавцов маркетплейсов: фото, инфографика и карточка в одном месте.",
    product: "Продукт",
    company: "Компания",
    examples: "Примеры",
    contacts: "Контакты",
    rights: "Все права защищены.",
  },
  modal: {
    label: "Студия AI-инфографики",
    loading: "Загружаем студию…",
    close: "Закрыть студию",
  },
};

const en: Dict = {
  nav: ["Features", "How it works", "Examples", "FAQ"],
  ui: {
    home: "Robohub AI Studio — back to top",
    mainMenu: "Main menu",
    login: "Log in",
    start: "Start free",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    lang: "Choose language",
  },
  forms: {
    token: ["token", "tokens", "tokens"],
    image: ["image", "images", "images"],
    imageShort: ["image", "images", "images"],
  },
  currency: "UZS",
  hero: {
    title: "Selling infographics from a plain photo:",
    accent: "in 1 minute",
    lead: "Upload a product photo and AI creates a ready 750×1000 card image for Uzum, Wildberries and Ozon. No designer, no waiting.",
    primary: "Try it free",
    secondary: "See examples",
    notes: ["First tokens are free", "No card required", "750×1000 format"],
    facts: [
      { value: "1", unit: "minute", label: "to make one image" },
      { value: "3", unit: "tokens", label: "price of one image · {img} UZS" },
      { value: "5", unit: "styles", label: "ready-made designs" },
    ],
  },
  studio: {
    steps: ["Analysis", "Background", "Design", "Done"],
    ready: "Done · 28 s",
    beforeAlt: "Plain product photo: an iPhone in hand",
    beforeCap: "Before · plain photo",
    afterTag: "After · AI Studio",
    afterAlt: "AI Studio result, “{name}” style",
    tabs: "Image style",
    variants: ["Infographic", "Composition", "Lifestyle", "Everyday"],
  },
  product: {
    features: ["48-hour hydration", "100% natural formula", "For all skin types"],
  },
  trust: {
    eyebrow: "Fits marketplace formats",
    stats: ["images created", "sellers use it", "average time"],
  },
  problem: {
    eyebrow: "Problem and solution",
    title: "Why does your card photo",
    accent: "kill sales?",
    lead: "Shoppers choose a product by its first photo",
    live: "live",
    problemTag: "Problem",
    solutionTag: "Solution · AI Studio",
    day: "Day {n}",
    ctaText: "See the difference yourself —",
    ctaBold: "first tokens are free",
    cta: "Try it free",
    cards: [
      {
        metric: "Price",
        problem: { title: "Designers are expensive", text: "50,000+ UZS for a single card" },
        solution: { title: "AI is cheap", text: "1 image = 3 tokens = {img} UZS" },
        old: { label: "Designer", value: "50,000+ UZS" },
        now: { label: "AI Studio", value: "{img} UZS" },
      },
      {
        metric: "Time",
        problem: { title: "Long waits", text: "2–3 days, weeks with revisions" },
        solution: { title: "1 minute", text: "Upload, choose, done" },
        old: { label: "Designer", value: "2–3 days" },
        now: { label: "AI Studio", value: "1 minute" },
      },
      {
        metric: "Visibility",
        problem: { title: "Low CTR", text: "A plain photo gets lost in search" },
        solution: { title: "Design that sells", text: "Benefits written right on the image" },
        old: { label: "Plain photo", value: "" },
        now: { label: "Infographic", value: "" },
      },
    ],
  },
  gallery: {
    title: "See the results",
    cta: "Create one like this",
    before: "Before",
    after: "After",
    photoAlt: "{name} — plain photo",
    resultAlt: "{name} — AI Studio result",
    items: {
      thermos: "Travel mug",
      bag: "Crossbody bag",
      earbuds: "Wireless earbuds",
      glasses: "Computer glasses",
      mug: "Ceramic mug",
      headset: "Gaming headset",
      mouse: "Wireless mouse",
      keyboard: "Computer keyboard",
      racket: "Table tennis racket",
      backpack: "Sports backpack",
      pen: "Ballpoint pen",
      sneakers: "Leather sneakers",
    },
  },
  steps: {
    eyebrow: "How it works",
    title: "Ready in",
    accent: "4 steps",
    lead: "Right inside Robohub AI Studio, no extra software",
    items: [
      { title: "Upload a photo", text: "Up to 4, JPG/PNG/WEBP/HEIC, Ctrl+V" },
      { title: "Choose a mode", text: "Photo, Infographic or 5-pack" },
      { title: "Describe your idea", text: "Or let the AI Idea button suggest one" },
      { title: "Generate", text: "Download the result or add it to your card" },
    ],
    prompt: "On a white background, summer mood, with key benefits",
    drop: "Drop your photo here",
    idea: "AI Idea",
    generate: "Generate",
  },
  modes: {
    eyebrow: "Generation modes",
    title: "Which image",
    accent: "do you need?",
    lead: "Three different results from one product",
    items: [
      { name: "Photo", text: "A clean product shot with no text. For the main image." },
      { name: "Infographic", text: "Benefits, dimensions and specs right on the image." },
      { name: "5-pack", text: "5 images from different angles for your card." },
    ],
    popular: "Most popular",
    styles: ["In use","In setting","Close-up","Catalog (studio)"], // Foto rejimining 4 uslubi (studiyadagi kabi) — DATA.photoStyles tartibida
    choose: "Choose",
  },
  pricing: {
    eyebrow: "Calculator",
    title: "Pay only for",
    accent: "what you use",
    lead: "1 token = {tok} UZS · 1 image = 3 tokens = {img} UZS. No subscription — pick the number of images and see the tokens and price instantly.",
    calc: "How many images do you need?",
  },
  academy: {
    kicker: "Robohub Academy",
    title: "Still figuring it out?",
    lead: "Robohub Academy teaches you to create product cards, update prices and connect marketplaces — free, in short video lessons.",
    cta: "Go to Academy",
    free: "Free",
    lesson: "Lesson {n}",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked",
    accent: "questions",
    lead: "Didn’t find an answer? Message us on Telegram",
    tg: "Message on Telegram",
    items: [
      { q: "Which marketplaces is it for?", a: "Uzum Market, Wildberries, Ozon and Yandex Market. Images are made in the 750×1000 format." },
      { q: "How long are tokens valid?", a: "Purchased tokens never expire — use them whenever it suits you." },
      { q: "What photo should I upload?", a: "A plain photo where the product is clearly visible is enough. Up to 4 images in JPG, PNG, WEBP or HEIC." },
      { q: "What language is the infographic text in?", a: "Uzbek and Russian. You can also type the exact text you need in the prompt field." },
      { q: "Can I use the images commercially?", a: "Yes. The images you create are yours — use them on product cards, in ads and on social media." },
      { q: "Can I use it without Robohub?", a: "AI Studio works inside your Robohub account. Sign-up is free and takes a couple of minutes." },
    ],
  },
  final: {
    title: "Create your first infographic",
    accent: "right now",
    lead: "Start with free tokens — results in 1 minute",
    cta: "Get free tokens",
  },
  footer: {
    about: "An AI assistant for marketplace sellers: photos, infographics and product cards in one place.",
    product: "Product",
    company: "Company",
    examples: "Examples",
    contacts: "Contacts",
    rights: "All rights reserved.",
  },
  modal: {
    label: "AI infographic studio",
    loading: "Loading the studio…",
    close: "Close the studio",
  },
};

const kk: Dict = {
  nav: ["Мүмкіндіктер", "Қалай жұмыс істейді", "Мысалдар", "FAQ"],
  ui: {
    home: "Robohub AI Studio — бет басына",
    mainMenu: "Басты мәзір",
    login: "Кіру",
    start: "Тегін бастау",
    menuOpen: "Мәзірді ашу",
    menuClose: "Мәзірді жабу",
    lang: "Тілді таңдау",
  },
  forms: {
    token: ["токен", "токен", "токен"],
    image: ["сурет", "сурет", "сурет"],
    imageShort: ["сурет", "сурет", "сурет"],
  },
  currency: "сум",
  hero: {
    title: "Қарапайым фотодан сататын инфографика:",
    accent: "1 минутта",
    lead: "Тауар фотосын жүктеңіз — AI Uzum, Wildberries және Ozon үшін 750×1000 форматындағы дайын карточка суретін жасайды. Дизайнер де, күту де қажет емес.",
    primary: "Тегін байқап көру",
    secondary: "Мысалдарды көру",
    notes: ["Алғашқы токендер тегін", "Карта қажет емес", "750×1000 форматы"],
    facts: [
      { value: "1", unit: "минут", label: "бір суретке" },
      { value: "3", unit: "токен", label: "бір сурет бағасы · {img} сум" },
      { value: "5", unit: "стиль", label: "дайын дизайн" },
    ],
  },
  studio: {
    steps: ["Талдау", "Фон", "Дизайн", "Дайын"],
    ready: "Дайын · 28 с",
    beforeAlt: "Тауардың қарапайым фотосы: қолдағы iPhone",
    beforeCap: "Дейін · қарапайым фото",
    afterTag: "Кейін · AI Studio",
    afterAlt: "AI Studio нәтижесі, «{name}» стилі",
    tabs: "Сурет стилі",
    variants: ["Инфографика", "Композиция", "Лайфстайл", "Күнделікті"],
  },
  product: {
    features: ["48 сағат ылғалдандыру", "100% табиғи құрам", "Терінің барлық түріне"],
  },
  trust: {
    eyebrow: "Маркетплейс форматтарына сай",
    stats: ["сурет жасалды", "сатушы пайдаланады", "орташа уақыт"],
  },
  problem: {
    eyebrow: "Мәселе және шешім",
    title: "Карточка суреті неге сатылымды",
    accent: "тежейді?",
    lead: "Сатып алушы тауарды алғашқы суретіне қарап таңдайды",
    live: "live",
    problemTag: "Мәселе",
    solutionTag: "Шешім · AI Studio",
    day: "{n}-күн",
    ctaText: "Айырмашылықты өзіңіз көріңіз —",
    ctaBold: "алғашқы токендер тегін",
    cta: "Тегін байқап көру",
    cards: [
      {
        metric: "Баға",
        problem: { title: "Дизайнер — қымбат", text: "Бір карточкаға 50 000+ сум" },
        solution: { title: "AI — арзан", text: "1 сурет = 3 токен = {img} сум" },
        old: { label: "Дизайнер", value: "50 000+ сум" },
        now: { label: "AI Studio", value: "{img} сум" },
      },
      {
        metric: "Уақыт",
        problem: { title: "Ұзақ күту", text: "2–3 күн, түзетулермен — апталап" },
        solution: { title: "1 минут", text: "Жүктедіңіз, таңдадыңыз — дайын" },
        old: { label: "Дизайнер", value: "2–3 күн" },
        now: { label: "AI Studio", value: "1 минут" },
      },
      {
        metric: "Көрінуі",
        problem: { title: "Төмен CTR", text: "Қарапайым фото іздеуде көрінбей қалады" },
        solution: { title: "Сататын дизайн", text: "Артықшылықтар суреттің өзінде" },
        old: { label: "Қарапайым фото", value: "" },
        now: { label: "Инфографика", value: "" },
      },
    ],
  },
  gallery: {
    title: "Нәтижелерді көріңіз",
    cta: "Осындай сурет жасау",
    before: "Дейін",
    after: "Кейін",
    photoAlt: "{name} — қарапайым фото",
    resultAlt: "{name} — AI Studio нәтижесі",
    items: {
      thermos: "Термокружка",
      bag: "Кросс-боди сөмке",
      earbuds: "Сымсыз құлаққап",
      glasses: "Компьютерлік көзілдірік",
      mug: "Керамика кружка",
      headset: "Ойын гарнитурасы",
      mouse: "Сымсыз тінтуір",
      keyboard: "Компьютер пернетақтасы",
      racket: "Үстел теннисі ракеткасы",
      backpack: "Спорт рюкзагы",
      pen: "Шарикті қалам",
      sneakers: "Былғары кроссовка",
    },
  },
  steps: {
    eyebrow: "Қалай жұмыс істейді",
    title: "4 қадамда",
    accent: "дайын",
    lead: "Robohub AI Studio ішінде, қосымша бағдарламасыз",
    items: [
      { title: "Фото жүктеңіз", text: "4-ке дейін, JPG/PNG/WEBP/HEIC, Ctrl+V" },
      { title: "Режимді таңдаңыз", text: "Фото, инфографика немесе 5 сурет жиынтығы" },
      { title: "Тілегіңізді жазыңыз", text: "Немесе «AI идея» батырмасы өзі ұсынады" },
      { title: "Генерация", text: "Нәтижені жүктеп алыңыз немесе карточкаға қосыңыз" },
    ],
    prompt: "Ақ фонда, жазғы көңіл-күймен, артықшылықтарымен",
    drop: "Фотоны осы жерге тастаңыз",
    idea: "AI идея",
    generate: "Генерациялау",
  },
  modes: {
    eyebrow: "Генерация режимдері",
    title: "Сізге қандай сурет",
    accent: "керек?",
    lead: "Бір тауардан үш түрлі нәтиже",
    items: [
      { name: "Фото", text: "Тауардың мәтінсіз таза кадры. Басты сурет үшін." },
      { name: "Инфографика", text: "Артықшылықтар, өлшемдер мен сипаттамалар суреттің өзінде." },
      { name: "5 сурет жиынтығы", text: "Карточкаға арналған әр қырынан түсірілген 5 сурет." },
    ],
    popular: "Ең танымал",
    styles: ["Қолданыста","Ортада","Жақын план","Каталог (студия)"], // Foto rejimining 4 uslubi (studiyadagi kabi) — DATA.photoStyles tartibida
    choose: "Таңдау",
  },
  pricing: {
    eyebrow: "Калькулятор",
    title: "Тек пайдаланғаныңыз үшін",
    accent: "төлеңіз",
    lead: "1 токен = {tok} сум · 1 сурет = 3 токен = {img} сум. Жазылым міндетті емес — сурет санын таңдаңыз, токендер мен баға бірден есептеледі.",
    calc: "Қанша сурет керек?",
  },
  academy: {
    kicker: "Robohub Academy",
    title: "Әлі толық түсінбедіңіз бе?",
    lead: "Robohub Academy карточка жасауды, бағаларды жаңартуды және маркетплейстерді қосуды қысқа бейнесабақтарда тегін үйретеді.",
    cta: "Academy-ге өту",
    free: "Тегін",
    lesson: "{n}-сабақ",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Жиі қойылатын",
    accent: "сұрақтар",
    lead: "Жауап таппадыңыз ба? Telegram-ға жазыңыз",
    tg: "Telegram-ға жазу",
    items: [
      { q: "Қандай маркетплейстерге сай келеді?", a: "Uzum Market, Wildberries, Ozon және Yandex Market. Суреттер 750×1000 форматында жасалады." },
      { q: "Токендер қанша уақыт жарамды?", a: "Сатып алынған токендердің мерзімі шектелмейді — оларды өзіңізге ыңғайлы кезде пайдаланасыз." },
      { q: "Қандай фото жүктеу керек?", a: "Тауар анық көрінетін қарапайым фото жеткілікті. JPG, PNG, WEBP немесе HEIC форматында 4 суретке дейін." },
      { q: "Инфографика мәтіні қай тілде?", a: "Өзбек және орыс тілдерінде. Қажетті мәтінді тілек өрісіне өзіңіз де жаза аласыз." },
      { q: "Суреттерді коммерциялық мақсатта пайдалануға бола ма?", a: "Иә. Жасалған суреттер сіздікі — оларды карточкаларда, жарнамада және әлеуметтік желілерде пайдалана аласыз." },
      { q: "Robohub-сыз бөлек пайдалануға бола ма?", a: "AI Studio Robohub кабинетінің ішінде жұмыс істейді. Тіркелу тегін және бірнеше минутты ғана алады." },
    ],
  },
  final: {
    title: "Алғашқы инфографикаңызды",
    accent: "дәл қазір жасаңыз",
    lead: "Тегін токендерден бастаңыз — нәтиже 1 минутта",
    cta: "Тегін токен алу",
  },
  footer: {
    about: "Маркетплейс сатушыларына арналған AI көмекші: фото, инфографика және карточка бір жерде.",
    product: "Өнім",
    company: "Компания",
    examples: "Мысалдар",
    contacts: "Байланыс",
    rights: "Барлық құқықтар қорғалған.",
  },
  modal: {
    label: "AI инфографика студиясы",
    loading: "Студия жүктелуде…",
    close: "Студияны жабу",
  },
};

const ky: Dict = {
  nav: ["Мүмкүнчүлүктөр", "Кантип иштейт", "Мисалдар", "FAQ"],
  ui: {
    home: "Robohub AI Studio — барактын башына",
    mainMenu: "Башкы меню",
    login: "Кирүү",
    start: "Акысыз баштоо",
    menuOpen: "Менюну ачуу",
    menuClose: "Менюну жабуу",
    lang: "Тил тандоо",
  },
  forms: {
    token: ["токен", "токен", "токен"],
    image: ["сүрөт", "сүрөт", "сүрөт"],
    imageShort: ["сүрөт", "сүрөт", "сүрөт"],
  },
  currency: "сум",
  hero: {
    title: "Жөнөкөй сүрөттөн сатууну арттырган инфографика:",
    accent: "1 мүнөттө",
    lead: "Товардын сүрөтүн жүктөңүз — AI Uzum, Wildberries жана Ozon үчүн 750×1000 форматындагы даяр карточка сүрөтүн түзөт. Дизайнер да, күтүү да керек эмес.",
    primary: "Акысыз сынап көрүү",
    secondary: "Мисалдарды көрүү",
    notes: ["Алгачкы токендер акысыз", "Карта керек эмес", "750×1000 формат"],
    facts: [
      { value: "1", unit: "мүнөт", label: "бир сүрөткө" },
      { value: "3", unit: "токен", label: "бир сүрөттүн баасы · {img} сум" },
      { value: "5", unit: "стиль", label: "даяр дизайн" },
    ],
  },
  studio: {
    steps: ["Талдоо", "Фон", "Дизайн", "Даяр"],
    ready: "Даяр · 28 с",
    beforeAlt: "Товардын жөнөкөй сүрөтү: колдогу iPhone",
    beforeCap: "Чейин · жөнөкөй сүрөт",
    afterTag: "Кийин · AI Studio",
    afterAlt: "AI Studio жыйынтыгы, «{name}» стили",
    tabs: "Сүрөттүн стили",
    variants: ["Инфографика", "Композиция", "Лайфстайл", "Күнүмдүк"],
  },
  product: {
    features: ["48 саат нымдоо", "100% табигый курам", "Теринин бардык түрлөрү үчүн"],
  },
  trust: {
    eyebrow: "Маркетплейстердин форматтарына ылайык",
    stats: ["сүрөт түзүлдү", "сатуучу колдонот", "орточо убакыт"],
  },
  problem: {
    eyebrow: "Көйгөй жана чечим",
    title: "Карточканын сүрөтү эмне үчүн сатууну",
    accent: "токтотот?",
    lead: "Сатып алуучу товарды биринчи сүрөтүнө карап тандайт",
    live: "live",
    problemTag: "Көйгөй",
    solutionTag: "Чечим · AI Studio",
    day: "{n}-күн",
    ctaText: "Айырманы өзүңүз көрүңүз —",
    ctaBold: "алгачкы токендер акысыз",
    cta: "Акысыз сынап көрүү",
    cards: [
      {
        metric: "Баа",
        problem: { title: "Дизайнер — кымбат", text: "Бир карточка үчүн 50 000+ сум" },
        solution: { title: "AI — арзан", text: "1 сүрөт = 3 токен = {img} сум" },
        old: { label: "Дизайнер", value: "50 000+ сум" },
        now: { label: "AI Studio", value: "{img} сум" },
      },
      {
        metric: "Убакыт",
        problem: { title: "Узак күтүү", text: "2–3 күн, оңдоолор менен — жумалап" },
        solution: { title: "1 мүнөт", text: "Жүктөдүңүз, тандадыңыз — даяр" },
        old: { label: "Дизайнер", value: "2–3 күн" },
        now: { label: "AI Studio", value: "1 мүнөт" },
      },
      {
        metric: "Көрүнүү",
        problem: { title: "Төмөн CTR", text: "Жөнөкөй сүрөт издөөдө көрүнбөй калат" },
        solution: { title: "Сата турган дизайн", text: "Артыкчылыктар сүрөттүн өзүндө" },
        old: { label: "Жөнөкөй сүрөт", value: "" },
        now: { label: "Инфографика", value: "" },
      },
    ],
  },
  gallery: {
    title: "Жыйынтыктарды көрүңүз",
    cta: "Ушундайды түзүү",
    before: "Чейин",
    after: "Кийин",
    photoAlt: "{name} — жөнөкөй сүрөт",
    resultAlt: "{name} — AI Studio жыйынтыгы",
    items: {
      thermos: "Термокружка",
      bag: "Кросс-боди сумка",
      earbuds: "Зымсыз кулакчын",
      glasses: "Компьютер көз айнеги",
      mug: "Керамика кружка",
      headset: "Оюн гарнитурасы",
      mouse: "Зымсыз чычкан",
      keyboard: "Компьютер клавиатурасы",
      racket: "Стол теннисинин ракеткасы",
      backpack: "Спорттук рюкзак",
      pen: "Шарик калем",
      sneakers: "Булгаары кроссовка",
    },
  },
  steps: {
    eyebrow: "Кантип иштейт",
    title: "4 кадамда",
    accent: "даяр",
    lead: "Robohub AI Studio ичинде, кошумча программасыз",
    items: [
      { title: "Сүрөт жүктөңүз", text: "4 сүрөткө чейин, JPG/PNG/WEBP/HEIC, Ctrl+V" },
      { title: "Режимди тандаңыз", text: "Фото, инфографика же 5 сүрөт топтому" },
      { title: "Каалооңузду жазыңыз", text: "Же «AI идея» баскычы өзү сунуштайт" },
      { title: "Генерация", text: "Жыйынтыкты жүктөп алыңыз же карточкага кошуңуз" },
    ],
    prompt: "Ак фондо, жайкы маанайда, артыкчылыктары менен",
    drop: "Сүрөттү бул жерге таштаңыз",
    idea: "AI идея",
    generate: "Генерациялоо",
  },
  modes: {
    eyebrow: "Генерация режимдери",
    title: "Сизге кандай сүрөт",
    accent: "керек?",
    lead: "Бир товардан үч түрдүү жыйынтык",
    items: [
      { name: "Фото", text: "Товардын тексти жок таза кадры. Негизги сүрөт үчүн." },
      { name: "Инфографика", text: "Артыкчылыктар, өлчөмдөр жана мүнөздөмөлөр сүрөттүн өзүндө." },
      { name: "5 сүрөт топтому", text: "Карточка үчүн ар кайсы бурчтан тартылган 5 сүрөт." },
    ],
    popular: "Эң популярдуу",
    styles: ["Колдонууда","Чөйрөдө","Жакын план","Каталог (студия)"], // Foto rejimining 4 uslubi (studiyadagi kabi) — DATA.photoStyles tartibida
    choose: "Тандоо",
  },
  pricing: {
    eyebrow: "Калькулятор",
    title: "Колдонгонуңуз үчүн гана",
    accent: "төлөңүз",
    lead: "1 токен = {tok} сум · 1 сүрөт = 3 токен = {img} сум. Жазылуу милдеттүү эмес — сүрөттүн санын тандаңыз, токендер жана баа дароо эсептелет.",
    calc: "Канча сүрөт керек?",
  },
  academy: {
    kicker: "Robohub Academy",
    title: "Дагы эле түшүнбөй жатасызбы?",
    lead: "Robohub Academy карточка түзүүнү, бааларды жаңыртууну жана маркетплейстерди туташтырууну кыска видеосабактарда акысыз үйрөтөт.",
    cta: "Academy'ге өтүү",
    free: "Акысыз",
    lesson: "{n}-сабак",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Көп берилүүчү",
    accent: "суроолор",
    lead: "Жооп таппадыңызбы? Telegram'га жазыңыз",
    tg: "Telegram'га жазуу",
    items: [
      { q: "Кайсы маркетплейстерге ылайыктуу?", a: "Uzum Market, Wildberries, Ozon жана Yandex Market. Сүрөттөр 750×1000 форматында даярдалат." },
      { q: "Токендер канча убакыт жарактуу?", a: "Сатылып алынган токендердин мөөнөтү чектелбейт — аларды өзүңүзгө ыңгайлуу убакта колдоносуз." },
      { q: "Кандай сүрөт жүктөө керек?", a: "Товар даана көрүнгөн жөнөкөй сүрөт жетиштүү. JPG, PNG, WEBP же HEIC форматында 4 сүрөткө чейин." },
      { q: "Инфографиканын тексти кайсы тилде?", a: "Өзбек жана орус тилдеринде. Керектүү текстти каалоолор талаасына өзүңүз да жаза аласыз." },
      { q: "Сүрөттөрдү коммерциялык максатта колдонсо болобу?", a: "Ооба. Түзүлгөн сүрөттөр сиздики — аларды карточкаларда, жарнамада жана социалдык тармактарда колдоно аласыз." },
      { q: "Robohub'сыз өзүнчө колдонсо болобу?", a: "AI Studio Robohub кабинетинин ичинде иштейт. Каттоо акысыз жана бир нече мүнөт гана убакыт алат." },
    ],
  },
  final: {
    title: "Биринчи инфографикаңызды",
    accent: "азыр эле түзүңүз",
    lead: "Акысыз токендерден баштаңыз — жыйынтык 1 мүнөттө",
    cta: "Акысыз токен алуу",
  },
  footer: {
    about: "Маркетплейс сатуучулары үчүн AI жардамчы: сүрөт, инфографика жана карточка бир жерде.",
    product: "Продукт",
    company: "Компания",
    examples: "Мисалдар",
    contacts: "Байланыш",
    rights: "Бардык укуктар корголгон.",
  },
  modal: {
    label: "AI инфографика студиясы",
    loading: "Студия жүктөлүүдө…",
    close: "Студияны жабуу",
  },
};

const kaa: Dict = {
  nav: ["Múmkinshilikler", "Qalay isleydi", "Úlgiler", "FAQ"],
  ui: {
    home: "Robohub AI Studio — bet basına",
    mainMenu: "Tiykarǵı menyu",
    login: "Kiriw",
    start: "Biypul baslaw",
    menuOpen: "Menyunı ashıw",
    menuClose: "Menyunı jabıw",
    lang: "Tildi tańlaw",
  },
  forms: {
    token: ["token", "token", "token"],
    image: ["súwret", "súwret", "súwret"],
    imageShort: ["súwret", "súwret", "súwret"],
  },
  currency: "swm",
  hero: {
    title: "Ápiwayı súwretten satatuǵın infografika:",
    accent: "1 minutta",
    lead: "Ónim súwretin júkleń — AI Uzum, Wildberries hám Ozon ushın 750×1000 formatında tayar kartochka súwretin jaratadı. Dizayner de, kútiw de kerek emes.",
    primary: "Biypul sınap kóriw",
    secondary: "Úlgilerdi kóriw",
    notes: ["Dáslepki tokenler biypul", "Karta kerek emes", "750×1000 format"],
    facts: [
      { value: "1", unit: "minut", label: "bir súwret tayarlanıwı" },
      { value: "3", unit: "token", label: "bir súwret bahası · {img} swm" },
      { value: "5", unit: "stil", label: "tayar dizayn" },
    ],
  },
  studio: {
    steps: ["Analiz", "Fon", "Dizayn", "Tayar"],
    ready: "Tayar · 28 s",
    beforeAlt: "Ónimniń ápiwayı súwreti: qoldaǵı iPhone",
    beforeCap: "Aldın · ápiwayı súwret",
    afterTag: "Keyin · AI Studio",
    afterAlt: "AI Studio nátiyjesi, “{name}” stili",
    tabs: "Súwret stili",
    variants: ["Infografika", "Kompoziciya", "Turmıslıq", "Kúndelikli"],
  },
  product: {
    features: ["48 saat ıǵallandırıw", "100% tábiyiy quram", "Barlıq teri túrleri ushın"],
  },
  trust: {
    eyebrow: "Marketpleys formatlarına sáykes",
    stats: ["súwret jaratıldı", "satıwshı paydalanadı", "ortasha waqıt"],
  },
  problem: {
    eyebrow: "Mashqala hám sheshim",
    title: "Kartochka súwreti nege satıwdı",
    accent: "toqtatadı?",
    lead: "Satıp alıwshı ónimdi birinshi súwretine qarap tańlaydı",
    live: "live",
    problemTag: "Mashqala",
    solutionTag: "Sheshim · AI Studio",
    day: "{n}-kún",
    ctaText: "Parqın ózińiz kóriń —",
    ctaBold: "dáslepki tokenler biypul",
    cta: "Biypul sınap kóriw",
    cards: [
      {
        metric: "Baha",
        problem: { title: "Dizayner qımbat", text: "Bir kartochka ushın 50 000+ swm" },
        solution: { title: "AI arzan", text: "1 súwret = 3 token = {img} swm" },
        old: { label: "Dizayner", value: "50 000+ swm" },
        now: { label: "AI Studio", value: "{img} swm" },
      },
      {
        metric: "Waqıt",
        problem: { title: "Uzaq kútiw", text: "2–3 kún, dúzetiwler menen — háptelep" },
        solution: { title: "1 minut", text: "Júkleń, tańlań — tayar" },
        old: { label: "Dizayner", value: "2–3 kún" },
        now: { label: "AI Studio", value: "1 minut" },
      },
      {
        metric: "Kóriniw",
        problem: { title: "Tómen CTR", text: "Ápiwayı súwret izlewde kórinbey qaladı" },
        solution: { title: "Satatuǵın dizayn", text: "Artıqmashılıqlar súwrettiń ózinde jazıladı" },
        old: { label: "Ápiwayı súwret", value: "" },
        now: { label: "Infografika", value: "" },
      },
    ],
  },
  gallery: {
    title: "Nátiyjelerdi kóriń",
    cta: "Usınday súwret jaratıw",
    before: "Aldın",
    after: "Keyin",
    photoAlt: "{name} — ápiwayı súwret",
    resultAlt: "{name} — AI Studio nátiyjesi",
    items: {
      thermos: "Termos krujka",
      bag: "Krossbodi sumka",
      earbuds: "Simsiz qulaqshın",
      glasses: "Kompyuter kózáynegi",
      mug: "Keramika krujka",
      headset: "Geymer qulaqshını",
      mouse: "Simsiz tıshqansha",
      keyboard: "Kompyuter klaviaturası",
      racket: "Stol tennisi raketkası",
      backpack: "Sport ryukzagı",
      pen: "Sharikli ruchka",
      sneakers: "Kón krossovka",
    },
  },
  steps: {
    eyebrow: "Qalay isleydi",
    title: "4 qádemde",
    accent: "tayar",
    lead: "Robohub AI Studio ishinde, hesh qanday qosımsha baǵdarlamasız",
    items: [
      { title: "Súwret júkleń", text: "4 súwretke shekem, JPG/PNG/WEBP/HEIC, Ctrl+V" },
      { title: "Rejimdi tańlań", text: "Foto, Infografika yamasa 5 súwret toplamı" },
      { title: "Tilegińizdi jazıń", text: "Yamasa “AI ideya” túymesi ózi usınıs etedi" },
      { title: "Generaciya", text: "Nátiyjeni júklep alıń yamasa kartochkaǵa qosıń" },
    ],
    prompt: "Aq fonda, jazǵı kewil-kúyde, artıqmashılıqları menen",
    drop: "Súwretti usı jerge taslań",
    idea: "AI ideya",
    generate: "Generaciya",
  },
  modes: {
    eyebrow: "Generaciya rejimleri",
    title: "Sizge qaysı súwret",
    accent: "kerek?",
    lead: "Bir ónimnen úsh túrli nátiyje",
    items: [
      { name: "Foto", text: "Ónimniń tekstsiz, taza kadrı. Tiykarǵı súwret ushın." },
      { name: "Infografika", text: "Artıqmashılıqlar, ólshemler hám qásiyetler súwrettiń ózinde." },
      { name: "5 súwret toplamı", text: "Kartochka ushın hár qıylı rakursta túsirilgen 5 súwret." },
    ],
    popular: "Eń kóp tańlanatuǵın",
    styles: ["Qollanıwda","Ortalıqta","Jaqın plan","Katalog (studiya)"], // Foto rejimining 4 uslubi (studiyadagi kabi) — DATA.photoStyles tartibida
    choose: "Tańlaw",
  },
  pricing: {
    eyebrow: "Esaplaǵısh",
    title: "Tek paydalanǵanıńız ushın",
    accent: "tóleń",
    lead: "1 token = {tok} swm · 1 súwret = 3 token = {img} swm. Jazılıw mindetli emes — súwret sanın tańlań, token hám baha birden esaplanadı.",
    calc: "Neshe súwret kerek?",
  },
  academy: {
    kicker: "Robohub Academy",
    title: "Ele de tolıq túsinbedińiz be?",
    lead: "Robohub Academy kartochka jaratıwdı, bahalardı jańalawdı hám marketpleysti jalǵawdı qısqa video sabaqlarda biypul úyretedi.",
    cta: "Academy’ge ótiw",
    free: "Biypul",
    lesson: "{n}-sabaq",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Kóp beriletuǵın",
    accent: "sorawlar",
    lead: "Juwap tappadıńız ba? Telegram’ǵa jazıń",
    tg: "Telegram’ǵa jazıw",
    items: [
      { q: "Qaysı marketpleysler ushın sáykes?", a: "Uzum Market, Wildberries, Ozon hám Yandex Market. Súwretler 750×1000 formatında tayarlanadı." },
      { q: "Tokenler qansha waqıt ámel etedi?", a: "Satıp alınǵan tokenlerdiń múddeti sheklenbegen — olardı ózińizge qolaylı waqıtta paydalanasız." },
      { q: "Qanday súwret júklew kerek?", a: "Ónim anıq kórinetuǵın ápiwayı súwret jetkilikli. JPG, PNG, WEBP yamasa HEIC formatında 4 súwretke shekem." },
      { q: "Infografika teksti qaysı tilde?", a: "Ózbek hám orıs tillerinde. Kerekli tekstti tilek maydanına ózińiz de jaza alasız." },
      { q: "Súwretlerden kommerciyalıq maqsette paydalanıwǵa bola ma?", a: "Awa. Jaratılǵan súwretler sizdiki — olardı kartochkada, reklamada hám social tarmaqlarda paydalana alasız." },
      { q: "Robohub’sız bólek paydalanıwǵa bola ma?", a: "AI Studio Robohub kabineti ishinde isleydi. Dizimnen ótiw biypul hám bir neshe minut waqıt aladı." },
    ],
  },
  final: {
    title: "Birinshi infografikańızdı",
    accent: "házir jaratıń",
    lead: "Biypul tokenler menen baslań — nátiyje 1 minutta",
    cta: "Biypul token alıw",
  },
  footer: {
    about: "Marketpleys satıwshıları ushın AI járdemshi: súwret, infografika hám kartochka bir jerde.",
    product: "Ónim",
    company: "Kompaniya",
    examples: "Úlgiler",
    contacts: "Baylanıs",
    rights: "Barlıq huqıqlar qorǵalǵan.",
  },
  modal: {
    label: "AI infografika studiyası",
    loading: "Studiya júklenbekte…",
    close: "Studiyanı jabıw",
  },
};

const tg: Dict = {
  nav: ["Имкониятҳо", "Чӣ тавр кор мекунад", "Намунаҳо", "FAQ"],
  ui: {
    home: "Robohub AI Studio — ба аввали саҳифа",
    mainMenu: "Менюи асосӣ",
    login: "Ворид шудан",
    start: "Ройгон оғоз кунед",
    menuOpen: "Кушодани меню",
    menuClose: "Пӯшидани меню",
    lang: "Интихоби забон",
  },
  forms: {
    token: ["токен", "токен", "токен"],
    image: ["тасвир", "тасвир", "тасвир"],
    imageShort: ["акс", "акс", "акс"],
  },
  currency: "сӯм",
  hero: {
    title: "Аз акси оддӣ — инфографикае, ки мефурӯшад:",
    accent: "дар 1 дақиқа",
    lead: "Акси молро бор кунед — AI барои Uzum, Wildberries ва Ozon тасвири тайёри карточкаро дар формати 750×1000 месозад. Бе дизайнер ва бе интизорӣ.",
    primary: "Ройгон санҷед",
    secondary: "Дидани намунаҳо",
    notes: ["Токенҳои аввал ройгон", "Корти бонкӣ лозим нест", "Формати 750×1000"],
    facts: [
      { value: "1", unit: "дақиқа", label: "барои як тасвир" },
      { value: "3", unit: "токен", label: "нархи як тасвир · {img} сӯм" },
      { value: "5", unit: "услуб", label: "дизайни тайёр" },
    ],
  },
  studio: {
    steps: ["Таҳлил", "Замина", "Дизайн", "Тайёр"],
    ready: "Тайёр · 28 с",
    beforeAlt: "Акси оддии мол: iPhone дар даст",
    beforeCap: "Пеш · акси оддӣ",
    afterTag: "Баъд · AI Studio",
    afterAlt: "Натиҷаи AI Studio, услуби «{name}»",
    tabs: "Услуби тасвир",
    variants: ["Инфографика", "Композитсия", "Лайфстайл", "Ҳаррӯза"],
  },
  product: {
    features: ["48 соат намнокӣ", "Таркиби 100% табиӣ", "Барои ҳама намуди пӯст"],
  },
  trust: {
    eyebrow: "Ба форматҳои маркетплейсҳо мувофиқ",
    stats: ["тасвир сохта шуд", "фурӯшанда истифода мебарад", "вақти миёна"],
  },
  problem: {
    eyebrow: "Мушкилот ва ҳалли он",
    title: "Чаро акси карточка фурӯшро",
    accent: "суст мекунад?",
    lead: "Харидор молро аз рӯи акси аввалин интихоб мекунад",
    live: "live",
    problemTag: "Мушкилот",
    solutionTag: "Ҳал · AI Studio",
    day: "Рӯзи {n}",
    ctaText: "Фарқро худатон бинед —",
    ctaBold: "токенҳои аввал ройгон",
    cta: "Ройгон санҷед",
    cards: [
      {
        metric: "Нарх",
        problem: { title: "Дизайнер гарон аст", text: "Барои як карточка 50 000+ сӯм" },
        solution: { title: "AI арзон аст", text: "1 тасвир = 3 токен = {img} сӯм" },
        old: { label: "Дизайнер", value: "50 000+ сӯм" },
        now: { label: "AI Studio", value: "{img} сӯм" },
      },
      {
        metric: "Вақт",
        problem: { title: "Интизории дароз", text: "2–3 рӯз, бо ислоҳҳо — ҳафтаҳо" },
        solution: { title: "1 дақиқа", text: "Бор кардед, интихоб кардед — тайёр" },
        old: { label: "Дизайнер", value: "2–3 рӯз" },
        now: { label: "AI Studio", value: "1 дақиқа" },
      },
      {
        metric: "Намоёнӣ",
        problem: { title: "CTR-и паст", text: "Акси оддӣ дар ҷустуҷӯ гум мешавад" },
        solution: { title: "Дизайни фурӯшанда", text: "Бартариҳо бевосита дар тасвир" },
        old: { label: "Акси оддӣ", value: "" },
        now: { label: "Инфографика", value: "" },
      },
    ],
  },
  gallery: {
    title: "Натиҷаҳоро бинед",
    cta: "Монанди инро созед",
    before: "Пеш",
    after: "Баъд",
    photoAlt: "{name} — акси оддӣ",
    resultAlt: "{name} — натиҷаи AI Studio",
    items: {
      thermos: "Кружкаи термосӣ",
      bag: "Сумкаи кросс-боди",
      earbuds: "Гӯшмонаки бесим",
      glasses: "Айнаки компютерӣ",
      mug: "Кружкаи сафолӣ",
      headset: "Гарнитураи бозӣ",
      mouse: "Мушаки бесим",
      keyboard: "Клавиатураи компютерӣ",
      racket: "Ракеткаи тенниси рӯи миз",
      backpack: "Рюкзаки варзишӣ",
      pen: "Ручкаи шарикӣ",
      sneakers: "Кроссовкаи чармӣ",
    },
  },
  steps: {
    eyebrow: "Чӣ тавр кор мекунад",
    title: "Дар 4 қадам",
    accent: "тайёр",
    lead: "Бевосита дар Robohub AI Studio, бе барномаҳои иловагӣ",
    items: [
      { title: "Акс бор кунед", text: "То 4 адад, JPG/PNG/WEBP/HEIC, Ctrl+V" },
      { title: "Реҷаро интихоб кунед", text: "Акс, инфографика ё маҷмӯаи 5 акс" },
      { title: "Хоҳишатонро нависед", text: "Ё тугмаи «AI-идея» худаш пешниҳод мекунад" },
      { title: "Генератсия", text: "Натиҷаро зеркашӣ кунед ё ба карточка илова намоед" },
    ],
    prompt: "Дар заминаи сафед, бо кайфияти тобистона, бо бартариҳо",
    drop: "Аксро ба ин ҷо кашед",
    idea: "AI-идея",
    generate: "Сохтан",
  },
  modes: {
    eyebrow: "Реҷаҳои генератсия",
    title: "Ба шумо кадом тасвир",
    accent: "лозим аст?",
    lead: "Аз як мол се натиҷаи гуногун",
    items: [
      { name: "Акс", text: "Кадри тозаи мол бе матн. Барои акси асосӣ." },
      { name: "Инфографика", text: "Бартариҳо, андозаҳо ва хусусиятҳо бевосита дар тасвир." },
      { name: "Маҷмӯаи 5 акс", text: "5 тасвир аз ракурсҳои гуногун барои карточка." },
    ],
    popular: "Аз ҳама маъмул",
    styles: ["Дар истифода","Дар муҳит","Намои наздик","Каталог (студия)"], // Foto rejimining 4 uslubi (studiyadagi kabi) — DATA.photoStyles tartibida
    choose: "Интихоб кардан",
  },
  pricing: {
    eyebrow: "Ҳисобкунак",
    title: "Танҳо барои истифода",
    accent: "пардохт кунед",
    lead: "1 токен = {tok} сӯм · 1 тасвир = 3 токен = {img} сӯм. Обуна ҳатмӣ нест — шумораи тасвирҳоро интихоб кунед, токенҳо ва нарх фавран ҳисоб мешаванд.",
    calc: "Чанд тасвир лозим аст?",
  },
  academy: {
    kicker: "Robohub Academy",
    title: "Ҳанӯз пурра нафаҳмидед?",
    lead: "Robohub Academy сохтани карточкаҳо, навсозии нархҳо ва пайваст кардани маркетплейсҳоро дар видеодарсҳои кӯтоҳ ройгон меомӯзонад.",
    cta: "Ба Academy гузаштан",
    free: "Ройгон",
    lesson: "Дарси {n}",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Саволҳои",
    accent: "маъмул",
    lead: "Ҷавоб наёфтед? Ба Telegram нависед",
    tg: "Ба Telegram навиштан",
    items: [
      { q: "Барои кадом маркетплейсҳо мувофиқ аст?", a: "Uzum Market, Wildberries, Ozon ва Yandex Market. Тасвирҳо дар формати 750×1000 сохта мешаванд." },
      { q: "Токенҳо то кай эътибор доранд?", a: "Токенҳои харидашуда мӯҳлат надоранд — онҳоро ҳар вақте ки барои шумо қулай аст, истифода баред." },
      { q: "Кадом аксро бор кардан лозим аст?", a: "Акси оддӣ, ки мол дар он равшан намоён аст, кифоя мекунад. То 4 тасвир дар формати JPG, PNG, WEBP ё HEIC." },
      { q: "Матни инфографика бо кадом забон аст?", a: "Бо забонҳои ӯзбекӣ ва русӣ. Матни лозимиро худатон низ дар майдони хоҳишҳо навишта метавонед." },
      { q: "Оё тасвирҳоро бо мақсади тиҷоратӣ истифода бурдан мумкин аст?", a: "Ҳа. Тасвирҳои сохташуда аз они шумоянд — онҳоро дар карточкаҳо, реклама ва шабакаҳои иҷтимоӣ истифода баред." },
      { q: "Оё бе Robohub истифода бурдан мумкин аст?", a: "AI Studio дар дохили кабинети Robohub кор мекунад. Бақайдгирӣ ройгон аст ва ҳамагӣ чанд дақиқа вақт мегирад." },
    ],
  },
  final: {
    title: "Аввалин инфографикаи худро",
    accent: "ҳозир созед",
    lead: "Бо токенҳои ройгон оғоз кунед — натиҷа дар 1 дақиқа",
    cta: "Гирифтани токенҳои ройгон",
  },
  footer: {
    about: "Ёрдамчии AI барои фурӯшандагони маркетплейсҳо: акс, инфографика ва карточка дар як ҷо.",
    product: "Маҳсулот",
    company: "Ширкат",
    examples: "Намунаҳо",
    contacts: "Тамос",
    rights: "Ҳамаи ҳуқуқҳо ҳифз шудаанд.",
  },
  modal: {
    label: "Студияи AI-инфографика",
    loading: "Студия бор мешавад…",
    close: "Пӯшидани студия",
  },
};

const TEXT = defineMessages({ uz, ru, en, kk, ky, kaa, tg });

// {name}, {n} kabi joylarni to'ldiradi: fill("Dars {n}", { n: 2 }) → "Dars 2"
export const fill = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));

// Ko'plik shakli: forms = [1, 2–4, 5+] (rus qoidasi; boshqa tillarda shakllar mos ravishda takrorlangan)
export function plural(n: number, forms: readonly string[]) {
  const a = Math.abs(n) % 100;
  const b = a % 10;
  if (a > 10 && a < 20) return forms[2];
  if (b === 1) return forms[0];
  if (b >= 2 && b <= 4) return forms[1];
  return forms[2];
}

// Komponentlar ishlatadigan tayyor kontent (faqat oddiy ma'lumot — server'dan client'ga uzatsa bo'ladi)
// path — sahifaning tilsiz yo'li: o'z domenida "/", Robohub domenida "/ai-studio" (til tanlash shu yo'lga olib boradi)
export function buildContent(locale: Locale, path = "/") {
  // {img} — 1 rasm narxi, {tok} — 1 token narxi; boshqa {…} belgilariga tegilmaydi
  const t = JSON.parse(
    JSON.stringify(TEXT[locale]).replaceAll("{img}", money(PRICE_PER_IMAGE)).replaceAll("{tok}", money(TOKEN_PRICE)),
  ) as (typeof TEXT)[Locale];
  return {
    locale,
    path,
    T: t,
    NAV: DATA.nav.map((href, i) => ({ href, label: t.nav[i] })),
    HERO: t.hero,
    PRODUCT: {
      features: DATA.product.icons.map((icon, i) => ({ icon, text: t.product.features[i] })),
    },
    VARIANTS: DATA.variants,
    // hero: oddiy foto + uslublar (nomi bilan)
    STUDIO: {
      before: DATA.studio.before,
      // infografika — joriy tildagi yozuvlar bilan (src/lib/ai-images.ts)
      styles: DATA.studio.styles.map((s, i) => ({
        ...s,
        img: s.id === "infographic" ? aiImage("phone", locale) : s.img,
        name: t.studio.variants[i],
      })),
    },
    TRUST: {
      eyebrow: t.trust.eyebrow,
      markets: DATA.markets,
      stats: DATA.stats.map((s, i) => ({ ...s, label: t.trust.stats[i] })),
    },
    PROBLEM: { ...t.problem, cards: DATA.problem.map((p, i) => ({ ...p, ...t.problem.cards[i] })) },
    GALLERY: {
      ...t.gallery,
      items: DATA.gallery.map((g) => {
        // kartadagi yozuv rejimlar bo‘limidan olinadi: "Infografika · 3 token", "5 to‘plam · 15 token"
        const m = DATA.modes.findIndex((x) => x.id === g.mode);
        const tokens = DATA.modes[m].tokens;
        return {
          ...g,
          // infografikalar — joriy tildagi yozuvlar bilan (src/lib/ai-images.ts)
          after: g.mode === "infographic" && isAiProduct(g.product) ? aiImage(g.product, locale) : g.after,
          name: t.gallery.items[g.product],
          meta: `${t.modes.items[m].name} · ${tokens} ${plural(tokens, t.forms.token)}`,
        };
      }),
    },
    STEPS_SECTION: { ...t.steps, steps: DATA.steps.map((id, i) => ({ id, ...t.steps.items[i] })) },
    MODES: {
      ...t.modes,
      pack: DATA.pack,
      photoStyles: DATA.photoStyles.map((img, i) => ({ img, name: t.modes.styles[i] })),
      items: DATA.modes.map((m, i) => ({ ...m, ...t.modes.items[i] })) },
    PRICING: { ...t.pricing, calc: { ...DATA.calc, label: t.pricing.calc } },
    ACADEMY: {
      ...t.academy,
      url: `https://robohub.uz${localeHref(locale, "/academy")}`,
      // dars raqamlari — nomi, muqovasi va havolasi components/academy da (server) Academy ma'lumotidan olinadi
      lessons: DATA.lessons,
    },
    FAQ: t.faq,
    FINAL_CTA: t.final,
    FOOTER: {
      ...t.footer,
      cols: [
        {
          title: t.footer.product,
          links: [
            { label: "AI Studio", href: "#top" },
            { label: t.footer.examples, href: "#examples" },
            { label: "Robohub", href: `https://robohub.uz${localeHref(locale, "/")}` },
          ],
        },
        {
          title: t.footer.company,
          links: [
            { label: "Robohub Academy", href: `https://robohub.uz${localeHref(locale, "/academy")}` },
            // robosell.uz domeni ulanganda almashtiriladi
            { label: "Robosell", href: `https://robosell-landing.vercel.app${localeHref(locale, "/")}` },
            { label: "FAQ", href: "#faq" },
          ],
        },
      ],
    },
  };
}

export type Content = ReturnType<typeof buildContent>;
