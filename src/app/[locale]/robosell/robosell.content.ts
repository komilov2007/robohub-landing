// Robosell landingining barcha matnlari va ma'lumotlari — bitta joyda.
// Hozircha faqat o'zbekcha (lotin): RU/EN tugmalari faqat interfeysda turadi.
// Imlo: o‘/g‘ uchun ‘ (U+2018), tutuq belgisi uchun ’ (U+2019) — ikkalasi ham Onest shriftida bor.
//
// PLACEHOLDER — "NAMUNA" deb belgilangan hamma narsa (raqamlar, mijoz fikrlari, tarif jadvali,
// havolalar) haqiqiy ma'lumot kelganda almashtiriladi.

// NAMUNA: ro'yxatdan o'tish va kirish sahifalari manzili hali yo'q
export const SIGNUP_HREF = "#tariflar";
export const LOGIN_HREF = "#";
export const PHONE = "+998 78 113 82 12";
export const PHONE_HREF = "tel:+998781138212";

export const NAV = [
  { href: "#imkoniyatlar", label: "Imkoniyatlar" },
  { href: "#kanallar", label: "Platformalar" },
  { href: "#integratsiyalar", label: "Integratsiyalar" },
  { href: "#tariflar", label: "Tariflar" },
  { href: "#faq", label: "FAQ" },
];

export const HERO = {
  badge: "Telegram bot + Veb-sayt + QR menyu, bitta paneldan",
  title: ["Onlayn do‘koningizni", "1 kunda", "ishga tushiring"],
  lead: "Dasturchisiz va 10 barobar arzon. Buyurtma, to‘lov, yetkazib berish, marketing va analitika — hammasi Robosell’da.",
  start: "Bepul boshlash",
  demo: "Video demo",
  // NAMUNA: haqiqiy mijozlar soni
  trust: "500+ biznes ishonadi",
  partners: ["Click", "Payme", "Uzum nasiya", "Fargo", "iiko"],
};

// Hero telefonidagi do'kon — NAMUNA mahsulotlar va narxlar
export const SHOP = {
  bot: "Robosell Shop",
  cats: ["Hammasi", "Lavash", "Burger", "Ichimlik"],
  items: [
    { name: "Lavash", price: 32000, tone: "a" },
    { name: "Burger", price: 38000, tone: "b" },
    { name: "Pitsa", price: 89000, tone: "c" },
    { name: "Kola", price: 12000, tone: "d" },
  ],
  // NAMUNA: dashboard raqamlari
  revenue: [48.2, 48.3],
  orders: [1284, 1285],
  clients: 932,
};

export const PROBLEM = {
  eyebrow: "Nega Robosell?",
  title: "Yetarli! Biznesni onlayn qilish uchun 10 barobar ko‘p pul sarflash shart emas",
  receiptHead: "Maxsus dasturlash",
  receiptSub: "Buyurtma asosida, bir martalik",
  // Narxlar mijozdan (tarif sahifasi). Diqqat: qatorlar yig'indisi 35–48 mln, "Jami" esa 50–62 mln —
  // farqni (xosting, yangilash, xizmat) aniqlashtirish kerak.
  rows: [
    { name: "Telegram bot", price: "5–7 mln" },
    { name: "Veb-sayt", price: "15–20 mln" },
    { name: "Administrator paneli", price: "5–7 mln" },
    { name: "Integratsiyalar (to‘lov, ombor)", price: "5–7 mln" },
    { name: "Ta’lim va qo‘llab-quvvatlash", price: "5–7 mln" },
  ],
  total: "50–62 mln so‘m",
  cardLabel: "Robosell bilan",
  unit: "so‘m / oy, hammasi obunada",
  perks: ["1 kunda ishga tushadi", "Dasturchi kerak emas", "Yangilanishlar bepul"],
  cta: "Tajribadan o‘tkazish",
};

export const CHANNELS = {
  eyebrow: "Platformalar",
  title: "Bir marta mahsulot qo‘shing, hamma joyda soting",
  lead: "Bitta katalog va bitta admin panel. Buyurtmalar barcha kanallardan bir joyga tushadi.",
  source: { name: "Admin panel", note: "1 katalog · 248 mahsulot" },
  // badge — NAMUNA: chat ro'yxatidagi "o'qilmagan buyurtmalar"
  list: [
    { id: "TG", name: "Telegram bot", text: "WebApp do‘kon, BotFather token bilan 5 daqiqada ulanadi", badge: 12, tone: "teal" },
    { id: "WEB", name: "Veb-sayt", text: "O‘z domeningiz, favicon, analitika va SEO", badge: 7, tone: "ink" },
    { id: "QR", name: "QR menyu", text: "Kafe va restoran stollari uchun katalog", badge: 4, tone: "green" },
    { id: "IG", name: "Instagram", text: "Profildan to‘g‘ridan-to‘g‘ri buyurtma", badge: 3, tone: "orange" },
    { id: "C", name: "Click SuperApp", text: "Millionlab Click foydalanuvchilariga soting", badge: 5, tone: "yellow" },
  ],
  marketsLabel: "Marketplace’lar:",
  markets: ["Yandex Eats", "Robohub", "Click SuperApp"],
  all: "Barcha buyurtmalar bitta panelda",
};

export const FEATURES = {
  eyebrow: "Imkoniyatlar",
  title: "Savdo uchun kerakli hamma narsa bitta panelda",
  hint: "Surib ko‘ring",
  orders: {
    title: "Buyurtma va mijozlar",
    text: "Barcha kanallardan kelgan buyurtmalarni bitta ro‘yxatda boshqaring: holatlar, mijozlar bazasi va tarixi.",
    // NAMUNA buyurtmalar
    feed: [
      { id: "#1285", who: "Aziz R.", sum: "121 000", src: "Telegram" },
      { id: "#1284", who: "Malika T.", sum: "64 000", src: "Sayt" },
      { id: "#1283", who: "Javlon S.", sum: "38 000", src: "QR" },
    ],
    states: ["Yangi", "Tayyorlanmoqda", "Yo‘lda", "Yetkazildi"],
    // NAMUNA raqamlar
    stats: [
      { value: "24", label: "Bugungi buyurtma" },
      { value: "932", label: "Mijozlar bazasi" },
      { value: "41%", label: "Qayta xarid" },
    ],
  },
  products: {
    title: "Mahsulot va ombor",
    text: "Kategoriyalar, Excel import, IKPU, qoldiq va chegirmalar.",
    file: "mahsulotlar.xlsx",
    tags: ["Kategoriya", "IKPU", "Qoldiq: 24", "Chegirma −15%"],
  },
  pay: {
    title: "To‘lov (10 usul)",
    list: ["Naqd", "Karta", "Click", "Payme", "RoboPay", "Alif nasiya", "Uzum nasiya", "Muddatli to‘lov"],
  },
  delivery: {
    title: "Yetkazib berish",
    list: ["Olib ketish", "Kuryer", "Fargo", "Uzpost"],
  },
  team: {
    title: "Filial va xodimlar",
    text: "Har kimga o‘z roli: operator, oshpaz, kuryer. Filiallar alohida, hisobot umumiy.",
    roles: [
      { i: "A", name: "Admin" },
      { i: "O", name: "Operator" },
      { i: "Sh", name: "Oshpaz" },
      { i: "K", name: "Kuryer" },
    ],
    branches: ["Chilonzor", "Yunusobod", "Sergeli"],
  },
  marketing: {
    title: "Marketing",
    text: "Rassilka, SMS, promo-kod, bannerlar, sharhlar va kanalga avto-post.",
    push: "Bugun −20%! Promo-kod: LAVASH20",
    tags: ["Rassilka", "SMS", "Promo-kod", "Banner", "Sharhlar", "Avto-post"],
  },
};

export const ANALYTICS = {
  eyebrow: "Analitika",
  title: "Biznesingiz real vaqtda, bir ekranda",
  lead: "Daromad, foyda va mijozlarni kuzating. Qaysi reklama ishlayotganini biling.",
  bullets: ["Daromad, tannarx, foyda", "Trafik manbai va buyurtma xaritasi", "Eng ko‘p buyurtma soatlari", "Top-10 mahsulot va mijoz"],
  cta: "Demo’ni ko‘rish",
  // NAMUNA: dashboard raqamlari
  kpis: [
    { label: "Foyda", value: "12.4 mln", delta: "+18%" },
    { label: "O‘rtacha chek", value: "86 000", delta: "+6%" },
    { label: "Qaytgan mijoz", value: "41%", delta: "+4%" },
  ],
  hoursLabel: "Buyurtmalar soatlar bo‘yicha",
  hours: [18, 26, 34, 52, 78, 64, 40, 36, 58, 86, 100, 72],
  hoursFrom: 10,
  topLabel: "Top mahsulotlar",
  top: [
    { name: "Lavash", n: 312 },
    { name: "Burger", n: 268 },
    { name: "Pitsa", n: 201 },
    { name: "Kola", n: 187 },
    { name: "Fri", n: 150 },
  ],
};

// Toifalar — taxminiy guruhlash, kerak bo'lsa aniqlashtiriladi
export const INTEGRATIONS = {
  eyebrow: "Robo market",
  title: "30+ integratsiya: ishlatayotgan tizimingiz bilan ulanadi",
  cats: [
    { id: "all", label: "Barchasi" },
    { id: "pos", label: "POS" },
    { id: "erp", label: "Omborxona" },
    { id: "ship", label: "Yetkazib berish" },
    { id: "pay", label: "To‘lov" },
    { id: "crm", label: "CRM va telefoniya" },
    { id: "mkt", label: "Marketplace" },
  ],
  items: [
    { name: "iiko", cat: "pos" },
    { name: "R-Keeper", cat: "pos" },
    { name: "Poster", cat: "pos" },
    { name: "Clopos", cat: "pos" },
    { name: "Alipos", cat: "pos" },
    { name: "YesPos", cat: "pos" },
    { name: "Billz", cat: "erp" },
    { name: "Bito", cat: "erp" },
    { name: "ERA", cat: "erp" },
    { name: "Smartup", cat: "erp" },
    { name: "Regos", cat: "erp" },
    { name: "Uzpost", cat: "ship" },
    { name: "Fargo", cat: "ship" },
    { name: "BTS Express", cat: "ship" },
    { name: "Yandex Delivery", cat: "ship" },
    { name: "Noor Delivery", cat: "ship" },
    { name: "Robo Pochta", cat: "ship" },
    { name: "EMU Express", cat: "ship" },
    { name: "Payme", cat: "pay" },
    { name: "Click", cat: "pay" },
    { name: "RoboPay", cat: "pay" },
    { name: "AmoCRM", cat: "crm" },
    { name: "Online PBX", cat: "crm" },
    { name: "Yandex Eats", cat: "mkt" },
  ],
  all: "Barcha integratsiyalar",
};

export const STEPS = {
  eyebrow: "Qanday ishlaydi",
  title: "5 qadamda birinchi buyurtmagacha",
  list: [
    { title: "Ro‘yxatdan o‘ting", text: "Telefon raqam bilan 1 daqiqada", chip: "+998 •• ••• •• ••" },
    { title: "Botni ulang", text: "BotFather tokenini kiriting", chip: "7341…:AAH-token" },
    { title: "Sozlang", text: "Logo, til, valyuta, ish vaqti", chip: "UZ · so‘m · 09:00–23:00" },
    { title: "Mahsulot qo‘shing", text: "Qo‘lda yoki Excel import", chip: "mahsulotlar.xlsx · 248 ta" },
    { title: "Soting!", text: "To‘lov va yetkazishni yoqing", chip: "Birinchi buyurtma keldi ✓" },
  ],
  // NAMUNA: video hali yo'q
  video: "Video qo‘llanma",
  videoNote: "“Qanday qilib internet-magazin yaratish + telegram bot”",
  helpTitle: "Qiyin bo‘lsa, biz yordam beramiz",
  helpText: "Bepul onboarding va video darslar. Savollar uchun:",
  cta: "Hoziroq boshlash",
};

export const PRICING = {
  title: "Tarifni tanlang va samaradorlikni oshiring",
  periods: [
    { months: 3, label: "3 oylik", off: 0 },
    { months: 6, label: "6 oylik", off: 0.1 },
    { months: 12, label: "12 oylik", off: 0.2 },
  ],
  unit: "so‘m/oy",
  popular: "Mashhur",
  choose: "Tarifni tanlash",
  plans: [
    { id: "start", name: "Start", note: "Telegramda sotishni boshlash uchun", price: 300000, features: ["Telegram bot (WebApp)", "Veb-sayt (subdomen)"] },
    { id: "basic", name: "Basic", note: "O‘sib borayotgan biznes uchun", price: 500000, features: ["Telegram bot (WebApp)", "Veb-sayt (o‘z domeni)", "QR menyu / katalog", "Instagram"] },
    { id: "pro", name: "Professional", note: "Filiallari bor tarmoqlar uchun", price: 900000, features: ["Telegram bot (WebApp)", "Veb-sayt (o‘z domeni)", "QR menyu / katalog", "Instagram", "Click SuperApp"] },
  ],
  compareBtn: "Xususiyatlarning to‘liq ro‘yxati",
  // NAMUNA: to'liq taqqoslash jadvali — qiymatlar tasdiqlanishi kerak. true — bor, false — yo'q, matn — qiymat.
  compare: [
    { name: "Telegram bot (WebApp)", v: [true, true, true] },
    { name: "Veb-sayt", v: ["Subdomen", "O‘z domeni", "O‘z domeni"] },
    { name: "QR menyu / katalog", v: [false, true, true] },
    { name: "Instagram", v: [false, true, true] },
    { name: "Click SuperApp", v: [false, false, true] },
    { name: "Filiallar", v: ["1", "3", "Cheksiz"] },
    { name: "Xodimlar va rollar", v: ["2", "10", "Cheksiz"] },
    { name: "Analitika", v: ["Asosiy", "To‘liq", "To‘liq + eksport"] },
    { name: "Rassilka va promo-kod", v: [false, true, true] },
    { name: "Integratsiyalar (POS, ombor)", v: [false, true, true] },
    { name: "Shaxsiy menejer", v: [false, false, true] },
  ] as { name: string; v: (boolean | string)[] }[],
};

export const REVIEWS = {
  title: "Bizga ishonishadi",
  // NAMUNA: haqiqiy mijoz fikrlari bilan almashtiriladi
  list: [
    { text: "Telegram bot orqali buyurtmalar 2 barobar oshdi", who: "Mijoz ismi", role: "Restoran", time: "09:41" },
    { text: "Instagram va saytdagi buyurtmalar endi bitta joyda", who: "Mijoz ismi", role: "Kiyim do‘koni", time: "12:08" },
    { text: "5 filialni bitta paneldan boshqaramiz", who: "Mijoz ismi", role: "Filiallar tarmog‘i", time: "18:30" },
  ],
};

export const FAQ = {
  title: "Ko‘p beriladigan savollar",
  list: [
    { q: "Dasturchi kerakmi?", a: "Yo‘q. Botni ulash, mahsulot qo‘shish va to‘lovlarni sozlash — hammasi admin panelda, kod yozmasdan. Kerak bo‘lsa, jamoamiz bepul yordam beradi." },
    { q: "Bot qancha vaqtda tayyor bo‘ladi?", a: "Odatda bir kun ichida: ro‘yxatdan o‘tasiz, BotFather tokenini kiritasiz va mahsulotlarni qo‘shasiz. Mahsulot ko‘p bo‘lsa, Excel orqali bir martada import qilasiz." },
    { q: "Qaysi to‘lov tizimlari ulanadi?", a: "Naqd, karta, Click, Payme, RoboPay, Alif va Uzum nasiya hamda muddatli to‘lov." },
    { q: "Domen o‘zimniki bo‘ladimi?", a: "Ha, Basic va Professional tariflarda saytni o‘z domeningizga ulaysiz. Start tarifida sayt Robosell subdomenida ishlaydi." },
    // NAMUNA: fiskal chek bo'yicha javobni aniqlashtirish kerak
    { q: "IKPU va fiskal chek bormi?", a: "Har bir mahsulotga IKPU kodini biriktirish mumkin. Fiskal chekni ulash tartibini menejerimiz biznesingizga qarab tushuntirib beradi." },
    // NAMUNA: sinov muddatini aniqlashtirish kerak
    { q: "Bepul sinov muddati bormi?", a: "Ha. Sinov davrida asosiy imkoniyatlarni bepul tekshirib ko‘rasiz, bank kartasi talab qilinmaydi." },
  ],
};

export const FINAL = {
  title: "Onlayn biznesingizni bugun boshlang",
  text: "Bepul sinov, karta talab qilinmaydi. Sozlashda yordam beramiz.",
  start: "Bepul boshlash",
};

export const FOOTER = {
  about: "Telegram bot, veb-sayt va QR menyu orqali onlayn savdo platformasi.",
  cols: [
    { title: "Mahsulot", links: [{ label: "Imkoniyatlar", href: "#imkoniyatlar" }, { label: "Platformalar", href: "#kanallar" }, { label: "Integratsiyalar", href: "#integratsiyalar" }, { label: "Tariflar", href: "#tariflar" }] },
    // NAMUNA: video darslar va ijtimoiy tarmoqlar manzillari hali yo'q
    { title: "Yordam", links: [{ label: "Video darslar", href: "#qanday-ishlaydi" }, { label: "FAQ", href: "#faq" }, { label: "Qo‘llab-quvvatlash", href: PHONE_HREF }] },
    { title: "Aloqa", links: [{ label: PHONE, href: PHONE_HREF }, { label: "Telegram", href: "#" }, { label: "Instagram", href: "#" }, { label: "YouTube", href: "#" }] },
  ],
  legal: [{ label: "Oferta", href: "#" }, { label: "Maxfiylik siyosati", href: "#" }],
};

// Section'lar orasidagi "chat" xabarlari — har bo'lim tepasida pufakcha bo'lib chiqadi
export const PINGS = {
  problem: "Hisob-kitob tayyor ✓",
  channels: "Yangi kanal ulandi ✓",
  features: "Buyurtma qabul qilindi ✓",
  analytics: "Hisobot yangilandi ✓",
  integrations: "Ombor sinxronlandi ✓",
  steps: "Do‘kon ishga tushdi ✓",
  pricing: "Tarif tanlandi ✓",
  reviews: "Yangi sharh ★★★★★",
  final: "Siz navbatdasiz ✓",
};

// Narxni guruhlab yozish: 1500000 → "1 500 000" (bo'sh joy — bo'linmas). Server va brauzerda bir xil natija.
export function money(n: number): string {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
