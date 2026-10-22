import { defineMessages, localeHref, type Locale } from "@/i18n/config";

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
export const BEFORE_IMG = "/ai/base_cosmetics.webp";
export const TOKENS_PER_IMAGE = 3;

export type GalleryCat = "electronics" | "fashion" | "accessories" | "beauty" | "home";
type GalleryId =
  | "headphones" | "sneakers" | "cream" | "watch" | "vitamins" | "palette"
  | "toybox" | "cream-interior" | "chair" | "cream-life" | "dumbbells" | "tire";

// ---------- tilga bog'liq bo'lmagan ma'lumotlar ----------
const DATA = {
  nav: ["#features", "#how", "#examples", "#faq"] as const,
  product: { brand: "AQUA", sub: "balance", volume: "250", icons: ["clock", "star", "shield"] as const },
  // label — idishdagi oq yorliqning rasm ichidagi o'rni (%, rasm 3:4 = 750×1000)
  variants: [
    { id: "composition", img: "/ai/cosmetics_composition.webp", tone: "primary", label: { x: 25, y: 46, w: 50.5, h: 25 } },
    { id: "interior", img: "/ai/cosmetics_everyday.webp", tone: "white", label: { x: 25, y: 46, w: 50.5, h: 25 } },
    { id: "lifestyle", img: "/ai/cosmetics_in_use.webp", tone: "mint", label: { x: 30.5, y: 61.6, w: 27.5, h: 13.8 } },
  ] as { id: string; img: string; tone: "primary" | "white" | "mint"; label: { x: number; y: number; w: number; h: number } }[],
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
  // NAMUNA: mahsulot fotolari loyihadagi umumiy rasmlardan, "keyin" tomoni — fotodan quriladigan kompozitsiya
  // (kosmetikada — haqiqiy AI natija)
  gallery: [
    { id: "headphones", cat: "electronics", before: "/categories/electronics.webp", tone: "primary" },
    { id: "sneakers", cat: "fashion", before: "/categories/shoes.webp", tone: "mint" },
    { id: "cream", cat: "beauty", before: "/ai/base_cosmetics.webp", after: "/ai/cosmetics_composition.webp", tone: "white" },
    { id: "watch", cat: "accessories", before: "/categories/accessories.webp", tone: "dark" },
    { id: "vitamins", cat: "beauty", before: "/categories/health.webp", tone: "white" },
    { id: "palette", cat: "beauty", before: "/categories/beauty.webp", tone: "mint" },
    { id: "toybox", cat: "home", before: "/categories/kids.webp", tone: "primary" },
    { id: "cream-interior", cat: "beauty", before: "/ai/base_cosmetics.webp", after: "/ai/cosmetics_everyday.webp", tone: "white" },
    { id: "chair", cat: "home", before: "/categories/home.webp", tone: "mint" },
    { id: "cream-life", cat: "beauty", before: "/ai/base_cosmetics.webp", after: "/ai/cosmetics_in_use.webp", tone: "white" },
    { id: "dumbbells", cat: "home", before: "/categories/sport.webp", tone: "dark" },
    { id: "tire", cat: "accessories", before: "/categories/auto.webp", tone: "dark" },
  ] as { id: GalleryId; cat: GalleryCat; before: string; after?: string; tone: "primary" | "mint" | "white" | "dark" }[],
  steps: ["upload", "mode", "prompt", "generate"] as const,
  modes: [
    { id: "photo", tokens: 3, featured: false },
    { id: "infographic", tokens: 3, featured: true },
    { id: "pack", tokens: 15, featured: false },
  ] as const,
  pack: ["/ai/cosmetics_studio.webp", "/ai/cosmetics_everyday.webp", "/ai/cosmetics_composition.webp", "/ai/cosmetics_in_use.webp", "/ai/base_cosmetics.webp"],
  // Robohub Academy'dagi mos darslar (raqami — robohub/academy/lib/academy.ts dagi n): kartochka yaratish,
  // narxlarni yangilash, Uzum Market'ni ulash. Nomi, muqovasi va havolasi o'sha yerdan olinadi.
  // 1 rasm narxi (so'm) — hisoblagich: rasm soni × shu narx
  pricePerImage: 1500,
  calc: { min: 1, max: 500, initial: 40 },
  lessons: [16, 15, 22],
};

type Gallery = Record<GalleryId, { name: string; kicker: string; feats: string[] }>;

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
  // ko'plik shakllari: [1, 2–4, 5+] — rus tili uchun; uz/en da kerakli shakl takrorlanadi
  forms: {
    token: ["token", "token", "token"],
    image: ["ta rasm", "ta rasm", "ta rasm"],
    imageShort: ["rasm", "rasm", "rasm"],
  },
  currency: "so‘m",
  hero: {
    badge: "RoboHub AI Studio",
    // sarlavha so'zlari; ajratilgani — mint "marker" bilan chiziladi
    title: "Oddiy rasmdan sotadigan infografika:",
    accent: "1 daqiqada",
    lead: "Mahsulot rasmini yuklang, AI Uzum, Wildberries va Ozon uchun 750×1000 formatda tayyor kartochka rasmini yaratadi. Dizayner va kutish shart emas.",
    primary: "Bepul sinab ko‘rish",
    secondary: "Namunalarni ko‘rish",
    notes: ["Birinchi tokenlar bepul", "Karta kerak emas", "750×1000 format"],
    facts: [
      { value: "1", unit: "daqiqa", label: "1 rasm tayyorlanishi" },
      { value: "3", unit: "token", label: "1 rasm narxi" },
      { value: "5", unit: "ta", label: "tayyor dizayn uslubi" },
    ],
  },
  studio: {
    steps: ["Tahlil", "Fon", "Dizayn", "Tayyor"],
    ready: "Tayyor · 28 s",
    beforeAlt: "Oddiy mahsulot fotosi: oq fonda krem idishi",
    beforeCap: "Oldin · oddiy foto",
    afterTag: "Keyin · AI infografika",
    afterAlt: "AI infografika, “{name}” uslubi",
    tabs: "Infografika uslubi",
    variants: ["Kompozitsiya", "Interyer", "Hayotiy"],
  },
  product: {
    name: "Namlovchi krem",
    kicker: "Yuz va tana uchun",
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
        solution: { title: "AI arzon", text: "1 rasm = 3 token" },
        old: { label: "Dizayner", value: "50 000+ so‘m" },
        now: { label: "AI Studio", value: "3 token" },
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
    meta: "Infografika · 3 token",
    before: "Oldin",
    after: "Keyin",
    photoAlt: "{name} — oddiy foto",
    items: {
      headphones: { name: "Simsiz quloqchin", kicker: "Bluetooth 5.3", feats: ["40 soat ishlash", "Shovqin filtri", "Yengil korpus"] },
      sneakers: { name: "Krossovka", kicker: "Yangi kolleksiya", feats: ["Nafas oluvchi", "Yumshoq taglik", "36–45 o‘lcham"] },
      cream: { name: "Namlovchi krem", kicker: "Yuz va tana uchun", feats: ["48 soat namlik", "Tabiiy tarkib", "250 ml"] },
      watch: { name: "Mexanik soat", kicker: "Zanglamas po‘lat", feats: ["Suvga chidamli", "Safir oyna", "2 yil kafolat"] },
      vitamins: { name: "Vitamin kompleksi", kicker: "60 kapsula", feats: ["Immunitet uchun", "Kuniga 1 marta", "Sertifikatlangan"] },
      palette: { name: "Ko‘z soyalari palitrasi", kicker: "24 rang", feats: ["Uzoq turadi", "Mat va shimmer", "Gipoallergen"] },
      toybox: { name: "O‘yinchoq qutisi", kicker: "Bolalar xonasi uchun", feats: ["Yog‘och", "G‘ildirakli", "Xavfsiz bo‘yoq"] },
      "cream-interior": { name: "Tungi krem", kicker: "Interyer uslubi", feats: ["Tiklovchi", "Gialuron", "Tungi parvarish"] },
      chair: { name: "Yumshoq kreslo", kicker: "Skandinav uslubi", feats: ["Yog‘och oyoqlar", "Yuviladigan g‘ilof", "Yetkazib berish"] },
      "cream-life": { name: "Qo‘l kremi", kicker: "Hayotiy uslub", feats: ["Tez singadi", "Yopishmaydi", "Kundalik"] },
      dumbbells: { name: "Gantel to‘plami", kicker: "2–24 kg", feats: ["Rezina qoplama", "Sirpanmaydi", "Uy uchun"] },
      tire: { name: "Yozgi shina", kicker: "R16 · 205/55", feats: ["Ho‘l yo‘lda ushlaydi", "Kam shovqin", "Yoqilg‘i tejaydi"] },
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
    clean: "Matnsiz, toza fon",
    choose: "Tanlash",
  },
  pricing: {
    eyebrow: "Hisoblagich",
    title: "Faqat ishlatganingizga",
    accent: "to‘lang",
    lead: "1 rasm = 3 token = 1 500 so‘m. Obuna majburiy emas — rasm sonini tanlang, token va narx darhol hisoblanadi.",
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
    badge: "RoboHub AI Studio",
    title: "Продающая инфографика из обычного фото:",
    accent: "за 1 минуту",
    lead: "Загрузите фото товара — AI создаст готовое изображение карточки 750×1000 для Uzum, Wildberries и Ozon. Без дизайнера и ожидания.",
    primary: "Попробовать бесплатно",
    secondary: "Смотреть примеры",
    notes: ["Первые токены бесплатно", "Карта не нужна", "Формат 750×1000"],
    facts: [
      { value: "1", unit: "минута", label: "на одно изображение" },
      { value: "3", unit: "токена", label: "цена одного изображения" },
      { value: "5", unit: "стилей", label: "готового дизайна" },
    ],
  },
  studio: {
    steps: ["Анализ", "Фон", "Дизайн", "Готово"],
    ready: "Готово · 28 с",
    beforeAlt: "Обычное фото товара: баночка крема на белом фоне",
    beforeCap: "До · обычное фото",
    afterTag: "После · AI-инфографика",
    afterAlt: "AI-инфографика, стиль «{name}»",
    tabs: "Стиль инфографики",
    variants: ["Композиция", "Интерьер", "Лайфстайл"],
  },
  product: {
    name: "Увлажняющий крем",
    kicker: "Для лица и тела",
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
        problem: { title: "Дизайнер дорого", text: "От 50 000 сум за одну карточку" },
        solution: { title: "AI дёшево", text: "1 изображение = 3 токена" },
        old: { label: "Дизайнер", value: "50 000+ сум" },
        now: { label: "AI Studio", value: "3 токена" },
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
    meta: "Инфографика · 3 токена",
    before: "До",
    after: "После",
    photoAlt: "{name} — обычное фото",
    items: {
      headphones: { name: "Беспроводные наушники", kicker: "Bluetooth 5.3", feats: ["40 часов работы", "Шумоподавление", "Лёгкий корпус"] },
      sneakers: { name: "Кроссовки", kicker: "Новая коллекция", feats: ["Дышащие", "Мягкая подошва", "Размеры 36–45"] },
      cream: { name: "Увлажняющий крем", kicker: "Для лица и тела", feats: ["48 часов увлажнения", "Натуральный состав", "250 мл"] },
      watch: { name: "Механические часы", kicker: "Нержавеющая сталь", feats: ["Водонепроницаемые", "Сапфировое стекло", "Гарантия 2 года"] },
      vitamins: { name: "Витаминный комплекс", kicker: "60 капсул", feats: ["Для иммунитета", "1 раз в день", "Сертифицирован"] },
      palette: { name: "Палетка теней", kicker: "24 оттенка", feats: ["Стойкие", "Мат и шиммер", "Гипоаллергенно"] },
      toybox: { name: "Ящик для игрушек", kicker: "Для детской комнаты", feats: ["Дерево", "На колёсиках", "Безопасная краска"] },
      "cream-interior": { name: "Ночной крем", kicker: "Интерьерный стиль", feats: ["Восстанавливает", "Гиалурон", "Ночной уход"] },
      chair: { name: "Мягкое кресло", kicker: "Скандинавский стиль", feats: ["Деревянные ножки", "Съёмный чехол", "Доставка"] },
      "cream-life": { name: "Крем для рук", kicker: "Лайфстайл", feats: ["Быстро впитывается", "Не липкий", "На каждый день"] },
      dumbbells: { name: "Набор гантелей", kicker: "2–24 кг", feats: ["Резиновое покрытие", "Не скользят", "Для дома"] },
      tire: { name: "Летняя шина", kicker: "R16 · 205/55", feats: ["Сцепление на мокрой дороге", "Низкий шум", "Экономит топливо"] },
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
    clean: "Без текста, чистый фон",
    choose: "Выбрать",
  },
  pricing: {
    eyebrow: "Калькулятор",
    title: "Платите только",
    accent: "за использование",
    lead: "1 изображение = 3 токена = 1 500 сум. Подписка не обязательна — выберите количество, токены и цена посчитаются сразу.",
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
    badge: "RoboHub AI Studio",
    title: "Selling infographics from a plain photo:",
    accent: "in 1 minute",
    lead: "Upload a product photo and AI creates a ready 750×1000 card image for Uzum, Wildberries and Ozon. No designer, no waiting.",
    primary: "Try it free",
    secondary: "See examples",
    notes: ["First tokens are free", "No card required", "750×1000 format"],
    facts: [
      { value: "1", unit: "minute", label: "to make one image" },
      { value: "3", unit: "tokens", label: "price of one image" },
      { value: "5", unit: "styles", label: "ready-made designs" },
    ],
  },
  studio: {
    steps: ["Analysis", "Background", "Design", "Done"],
    ready: "Done · 28 s",
    beforeAlt: "Plain product photo: a cream jar on a white background",
    beforeCap: "Before · plain photo",
    afterTag: "After · AI infographic",
    afterAlt: "AI infographic, “{name}” style",
    tabs: "Infographic style",
    variants: ["Composition", "Interior", "Lifestyle"],
  },
  product: {
    name: "Moisturizing cream",
    kicker: "For face and body",
    features: ["48-hour hydration", "100% natural formula", "For all skin types"],
  },
  trust: {
    eyebrow: "Fits marketplace formats",
    stats: ["images created", "sellers use it", "average time"],
  },
  problem: {
    eyebrow: "Problem and solution",
    title: "Why your card photo",
    accent: "kills sales?",
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
        solution: { title: "AI is cheap", text: "1 image = 3 tokens" },
        old: { label: "Designer", value: "50,000+ UZS" },
        now: { label: "AI Studio", value: "3 tokens" },
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
    meta: "Infographic · 3 tokens",
    before: "Before",
    after: "After",
    photoAlt: "{name} — plain photo",
    items: {
      headphones: { name: "Wireless headphones", kicker: "Bluetooth 5.3", feats: ["40 hours of play", "Noise filter", "Lightweight body"] },
      sneakers: { name: "Sneakers", kicker: "New collection", feats: ["Breathable", "Soft sole", "Sizes 36–45"] },
      cream: { name: "Moisturizing cream", kicker: "For face and body", feats: ["48-hour hydration", "Natural formula", "250 ml"] },
      watch: { name: "Mechanical watch", kicker: "Stainless steel", feats: ["Water resistant", "Sapphire glass", "2-year warranty"] },
      vitamins: { name: "Vitamin complex", kicker: "60 capsules", feats: ["Immune support", "Once a day", "Certified"] },
      palette: { name: "Eyeshadow palette", kicker: "24 shades", feats: ["Long-lasting", "Matte & shimmer", "Hypoallergenic"] },
      toybox: { name: "Toy box", kicker: "For the kids’ room", feats: ["Solid wood", "On wheels", "Safe paint"] },
      "cream-interior": { name: "Night cream", kicker: "Interior style", feats: ["Restoring", "Hyaluronic", "Night care"] },
      chair: { name: "Upholstered armchair", kicker: "Scandinavian style", feats: ["Wooden legs", "Washable cover", "Delivery"] },
      "cream-life": { name: "Hand cream", kicker: "Lifestyle", feats: ["Absorbs fast", "Non-sticky", "Everyday use"] },
      dumbbells: { name: "Dumbbell set", kicker: "2–24 kg", feats: ["Rubber coating", "Non-slip", "For home"] },
      tire: { name: "Summer tire", kicker: "R16 · 205/55", feats: ["Wet-road grip", "Low noise", "Fuel saving"] },
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
    clean: "No text, clean background",
    choose: "Choose",
  },
  pricing: {
    eyebrow: "Calculator",
    title: "Pay only for",
    accent: "what you use",
    lead: "1 image = 3 tokens = 1,500 UZS. No subscription — pick how many images, and tokens and the price are worked out instantly.",
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

const TEXT = defineMessages({ uz, ru, en });

// {name}, {n} kabi joylarni to'ldiradi: fill("Dars {n}", { n: 2 }) → "Dars 2"
export const fill = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));

// Ko'plik shakli: forms = [1, 2–4, 5+] (rus qoidasi; uz/en da shakllar mos ravishda takrorlangan)
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
  const t = TEXT[locale];
  return {
    locale,
    path,
    T: t,
    NAV: DATA.nav.map((href, i) => ({ href, label: t.nav[i] })),
    HERO: t.hero,
    PRODUCT: {
      ...DATA.product,
      name: t.product.name,
      kicker: t.product.kicker,
      features: DATA.product.icons.map((icon, i) => ({ icon, text: t.product.features[i] })),
    },
    VARIANTS: DATA.variants.map((v, i) => ({ ...v, name: t.studio.variants[i] })),
    TRUST: {
      eyebrow: t.trust.eyebrow,
      markets: DATA.markets,
      stats: DATA.stats.map((s, i) => ({ ...s, label: t.trust.stats[i] })),
    },
    PROBLEM: { ...t.problem, cards: DATA.problem.map((p, i) => ({ ...p, ...t.problem.cards[i] })) },
    GALLERY: {
      ...t.gallery,
      items: DATA.gallery.map((g) => ({ ...g, ...t.gallery.items[g.id] })),
    },
    STEPS_SECTION: { ...t.steps, steps: DATA.steps.map((id, i) => ({ id, ...t.steps.items[i] })) },
    MODES: { ...t.modes, pack: DATA.pack, items: DATA.modes.map((m, i) => ({ ...m, ...t.modes.items[i] })) },
    PRICING: { ...t.pricing, calc: { ...DATA.calc, label: t.pricing.calc }, pricePerImage: DATA.pricePerImage },
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
