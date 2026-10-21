import type { ContactIconName } from "@/components/contact-icon/contact-icon";
import { EMAIL, EMAIL_HREF, INSTAGRAM_URL, TELEGRAM_URL, YOUTUBE_URL } from "@/lib/contacts";

// Robosell landingining barcha matnlari va ma'lumotlari — bitta joyda.
// Hozircha faqat o'zbekcha (lotin): RU/EN tugmalari faqat interfeysda turadi.
// Imlo: o‘/g‘ uchun ‘ (U+2018), tutuq belgisi uchun ’ (U+2019) — ikkalasi ham Onest shriftida bor.
//
// PLACEHOLDER — "NAMUNA" deb belgilangan hamma narsa (raqamlar, mijoz fikrlari, tarif jadvali,
// havolalar) haqiqiy ma'lumot kelganda almashtiriladi.

// NAMUNA: ro'yxatdan o'tish va kirish sahifalari manzili hali yo'q
export const SIGNUP_HREF = "#pricing";
export const LOGIN_HREF = "#";
export const PHONE = "+998 78 113 82 12";
export const PHONE_HREF = "tel:+998781138212";

export const NAV = [
  { href: "#features", label: "Imkoniyatlar" },
  { href: "#how-it-works", label: "Qanday ishlaydi" },
  { href: "#integrations", label: "Integratsiyalar" },
  { href: "#pricing", label: "Narxlar" },
  { href: "#faq", label: "FAQ" },
];

export const HERO = {
  badge: "Telegram bot · Veb-sayt · Admin panel",
  // [oldin, ajratilgan, keyin] — o'rtadagisi yashil "marker" bilan chiziladi
  title: ["Onlayn buyurtmani", "1 kunda", "yo‘lga qo‘ying"],
  lead: "Telegram bot, veb-sayt va admin panel bitta tizimda. Mijozlar buyurtma beradi, siz hammasini bitta joydan boshqarasiz: buyurtma, to‘lov, yetkazish va statistika.",
  start: "Bepul demo olish",
  video: "Video qo‘llanma",
  // qo'llanma video (YouTube): hero tugmasi uni sahifa ustidagi oynada ochadi
  videoId: "XepgHqR7V5o",
  worksWith: "Click, Payme, iiko, Billz va boshqa tizimlar bilan ishlaydi",
};

// Robosell'dan foydalanadigan kompaniyalar (robo.uz saytidan)
// logo — public/robosell/clients (rb-landing'dagi brend logolari)
const C = (name: string, slug: string) => ({ name, logo: `/robosell/clients/${slug}.webp` });
export const CLIENTS = {
  title: "Robosell’dan foydalanadigan kompaniyalar",
  list: [
    C("Jumanji", "jumanji"),
    C("XonXonim", "xonxonim"),
    C("Sushi Bar", "sushi-bar"),
    C("Mona", "mona"),
    C("Bek Osiyo", "bek-osiyo"),
    C("Lago Park", "lago-park"),
    C("DI sport", "di-sport"),
    C("Zero", "zero"),
    C("Lyagan", "lyagan"),
    C("N’Medov", "nmedov"),
    C("Сыроварня", "syrovarnya"),
  ],
};

// ---------- Hamkorlar fikri (robo.uz saytidagi sharhlar) ----------
export const REVIEWS = {
  eyebrow: "Mijozlar fikri",
  title: "Hamkorlar biz haqimizda",
  lead: "Restoran, do‘kon va xizmat ko‘rsatuvchi bizneslar Robosell bilan qanday ishlayotgani haqida.",
  list: [
    { name: "Rustam", company: "Pishloq do‘koni", text: "Robosell onlayn savdolarimni butunlay o‘zgartirdi! Ushbu platforma tufayli men bir necha daqiqada do‘konim uchun qulay Telegram bot va veb-sayt yaratishga muvaffaq bo‘ldim." },
    { name: "Gulshana", company: "N’Medov", text: "Men uzoq vaqt davomida onlayn do‘kon yaratish uchun mos platformani qidirdim va uni topdim. Robosell foydalanish uchun qulay interfeysga ega va mening asosiy yordamchim!" },
    { name: "Murod", company: "Mobishop Online", text: "Ushbu platforma mijozlarimizga xizmat ko‘rsatish va ovqat yetkazib berish bo‘yicha buyurtmalar boshqaruvini yangi bosqichga olib chiqishimizga yordam berdi." },
    { name: "Anvar", company: "Planbaby", text: "Robosell bilan biz yanada moslashuvchan bo‘ldik va mijozlar so‘rovlariga tezroq javob bera boshladik. Telegram bot va buyurtma sayti mijoz bilan tezkor muloqot qilish imkonini yaratdi." },
    { name: "Artur", company: "Bebek Food", text: "Robosell bilan fastfud shoxobchamizni boshqarish juda oson! Biz shunchaki akkaunt yaratib, unga menyu qo‘shdik. Endi mijozlar osongina onlayn buyurtma berishlari mumkin." },
    { name: "Ivan", company: "Beefo", text: "Robosell nafaqat onlayn do‘kon yaratishni osonlashtiradi, balki buyurtmalarni boshqarish va mijozlarga xizmat ko‘rsatish uchun ko‘plab funksiyalarni ham taklif qiladi." },
    { name: "Umid", company: "IPrint Book", text: "Robosell’ning tezligi va sifati meni hayratda qoldirdi. Bir necha daqiqada do‘konim uchun Telegram bot yaratdim va buyurtmalarni qabul qila boshladim. Kichik biznes uchun haqiqiy topilma!" },
    { name: "Sarvar", company: "Московская пицца", text: "Biz uzoq vaqt davomida onlayn buyurtma berish uchun yechim izlagandik va Robosell biz kutgan natijani berdi." },
    { name: "Kamil", company: "Temir Darvozalar", text: "Platforma bizga qulay Telegram bot va buyurtmalar uchun veb-sayt yaratishda yordam berdi. Bu esa o‘z navbatida ko‘proq mijozlarni jalb qilib, daromadimizni oshirdi." },
    { name: "Artur", company: "Jumanji", text: "Restoran egasi sifatida men soddalik va funksionallikni qadrlayman. Bu platforma mijozlarimizga ovqat buyurtma qilish va yetkazib berish jarayonini tez va qulay qildi." },
  ],
};

export const PROBLEM = {
  eyebrow: "Muammo va yechim",
  // [boshi, "yo'qoladigan" so'z]
  title: ["Buyurtmalar chat va daftarda", "yo‘qolyaptimi?"],
  lead: "Ko‘p biznes buyurtmani qo‘lda qabul qiladi. Robosell bilan bu jarayon avtomatik bo‘ladi.",
  before: "Hozir (Robosell’siz)",
  after: "Robosell bilan",
  // har juftlik: muammo → yechim; vis — vizual turi (problem-visuals.tsx)
  pairs: [
    { vis: "chats", pain: "Buyurtmalar Telegram va telefonda tarqalib ketadi", fix: "Har bir buyurtma panelga avtomatik tushadi" },
    { vis: "catalog", pain: "Mahsulot va narxlar daftar yoki Excel’da", fix: "Katalog, narx va qoldiq bitta joyda" },
    { vis: "pay", pain: "To‘lovni qo‘lda tekshirasiz", fix: "Click, Payme, Robopay orqali onlayn to‘lov" },
    { vis: "stats", pain: "Kim qancha sotgani, qancha foyda qilgani noma’lum", fix: "Daromad, foyda va top mahsulotlar grafikda" },
  ],
} as const;

// ---------- 3. Qanday ishlaydi ----------
export const STEPS = {
  eyebrow: "Qanday ishlaydi",
  title: "3 qadamda ishga tushadi",
  lead: "Texnik bilim kerak emas — hammasini siz bilan birga 1 kunda sozlaymiz.",
  list: [
    { title: "Ariza qoldirasiz", text: "Telefon raqamingizni qoldirasiz, menejer 15 daqiqada bog‘lanadi.", time: "2 daqiqa" },
    { title: "Biz sozlaymiz", text: "Katalog, to‘lov va yetkazishni siz bilan birga ulab chiqamiz.", time: "1 kun" },
    { title: "Buyurtma qabul qilasiz", text: "Mijozlar bot, sayt va ilovadan buyurtma beradi — siz panelda ko‘rasiz.", time: "Darhol" },
  ],
  // 2-qadam animatsiyasidagi sozlamalar
  setup: ["Katalog", "To‘lov", "Yetkazish", "Telegram bot"],
  cta: "Ariza qoldirish",
  total: "Ariza qoldirgandan birinchi buyurtmagacha — taxminan 1 kun",
};

// ---------- 4. Savdo kanallari ----------
export const CHANNELS = {
  eyebrow: "Savdo kanallari",
  title: "Mijoz qayerda bo‘lsa, buyurtma o‘sha yerdan",
  lead: "Bir marta mahsulot qo‘shasiz — u bot, sayt va ilovada bir vaqtda paydo bo‘ladi.",
  hub: "Bitta katalog",
  list: [
    { id: "tg", name: "Telegram bot", text: "Mijoz chatdan chiqmasdan menyuni ko‘radi va buyurtma beradi." },
    { id: "web", name: "Veb-sayt", text: "O‘z domeningizda tayyor internet-do‘kon: savat, to‘lov va SEO bilan." },
    { id: "click", name: "Click mini app", text: "Click ilovasining millionlab foydalanuvchilari sizdan to‘g‘ridan-to‘g‘ri xarid qiladi." },
  ],
};

// ---------- 5. Admin panel ----------
export const DASHBOARD = {
  eyebrow: "Admin panel",
  title: "Biznesingiz bir qarashda",
  lead: "Buyurtma, mahsulot, mijoz va pul harakati — bitta panelda, real vaqtda.",
  tabs: [
    { id: "orders", label: "Buyurtmalar", title: "Buyurtmalar holati", text: "Yangi, jarayonda, yo‘lda — har bir buyurtma qaysi bosqichda ekanini ko‘rasiz." },
    { id: "products", label: "Mahsulotlar", title: "Katalog va ombor", text: "Narx, qoldiq va chegirmalar bitta joyda. Excel’dan bir bosishda import." },
    { id: "clients", label: "Mijozlar", title: "Mijozlar bazasi", text: "Kim, qachon va qancha xarid qilgani avtomatik yig‘iladi." },
    { id: "payments", label: "To‘lovlar", title: "Onlayn to‘lovlar", text: "Click, Payme va Robopay to‘lovlari avtomatik tasdiqlanadi." },
    { id: "stats", label: "Statistika", title: "Daromad va foyda", text: "Kunlik savdo, o‘rtacha chek va top mahsulotlar grafikda." },
  ],
} as const;

// ---------- 6. Integratsiyalar ----------
// src — rb-frontend ikonkalari (public/robosell/icons) yoki loyihadagi logolar (public/integrations)
type Logo = { src: string; w: number; h: number; label?: string; alt: string };
const I = (n: string, w: number, h: number, alt: string, label?: string): Logo => ({ src: `/robosell/icons/${n}.svg`, w, h, alt, label });
const L = (n: string, w: number, h: number, alt: string, label?: string): Logo => ({ src: `/integrations/${n}.svg`, w, h, alt, label });
export const INTEGRATIONS = {
  eyebrow: "Integratsiyalar",
  title: "Hozirgi tizimlaringiz bilan ulanadi",
  lead: "Ishlayotgan dasturlaringizni almashtirish shart emas — Robosell ularga o‘zi ulanadi.",
  rows: [
    {
      label: "To‘lov",
      ico: "💳",
      text: "Mijoz to‘lagan zahoti buyurtma avtomatik tasdiqlanadi.",
      live: ["Click · 149 000 so‘m to‘landi", "Payme · 690 000 so‘m to‘landi", "Robopay · 420 000 so‘m to‘landi"],
      items: [
        I("click", 78, 31, "Click"),
        I("payme", 84, 24, "Payme"),
        I("robo-pay", 30, 30, "", "Robopay"),
        I("uzum-bank", 78, 32, "Uzum bank"),
        I("uzcard", 52, 30, "Uzcard"),
        I("humo", 52, 30, "Humo"),
        I("alif", 30, 30, "", "Alif"),
        I("stripe", 70, 30, "Stripe"),
      ],
    },
    {
      label: "Ombor va POS",
      ico: "📦",
      text: "Mahsulot, narx va qoldiq kassa dasturingiz bilan sinxron.",
      live: ["iiko · 248 mahsulot sinxronlandi", "Billz · qoldiq yangilandi", "MoySklad · narxlar yangilandi"],
      items: [
        I("iiko", 72, 29, "iiko"),
        I("billz", 30, 30, "", "Billz"),
        I("logo-bito", 104, 22, "Bito market"),
        I("logo-era", 76, 24, "ERA"),
        L("moysklad", 30, 30, "", "MoySklad"),
        L("smartup", 30, 30, "", "Smartup"),
        L("yespos", 30, 30, "", "YesPos"),
        L("retail-crm", 30, 30, "", "RetailCRM"),
      ],
    },
    {
      label: "Yetkazib berish",
      ico: "🚚",
      text: "Buyurtma kuryer xizmatiga o‘zi uzatiladi, holati kuzatiladi.",
      live: ["Fargo · kuryer yo‘lda, 25 daqiqa", "Yandex Delivery · yetkazildi", "Uzpost · jo‘natma qabul qilindi"],
      items: [
        I("fargo", 84, 30, "Fargo"),
        I("uzpost", 84, 26, "Uzpost"),
        I("bts", 64, 30, "BTS Express"),
        I("yandex", 30, 30, "", "Yandex Delivery"),
        I("wolt", 30, 30, "", "Wolt"),
      ],
    },
  ],
  more: "va yana 20+ integratsiya",
};

// ---------- 7. Biznes turlari ----------
export const INDUSTRIES = {
  eyebrow: "Kimlar uchun",
  title: "Sizning biznesingizga ham mos",
  lead: "Restoran bo‘ladimi yoki butik — Robosell savdo turingizga moslashadi.",
  list: [
    { img: "/categories/food.webp", title: "Restoran va kafe", text: "Menyu, stol uchun QR, yetkazib berish va oshxonaga avtomatik buyurtma.", tags: ["QR menyu va bannerlar", "Promokod va aksiyalar", "Yetkazish, iiko"] },
    { img: "/categories/clothing.webp", title: "Kiyim va poyabzal", text: "O‘lcham va rang variantlari, qoldiq nazorati va kolleksiyalar.", tags: ["Rang va o‘lcham parametrlari", "Bir nechta rasm", "Qoldiq, Billz"] },
    { img: "/categories/beauty.webp", title: "Go‘zallik va kosmetika", text: "Mahsulot to‘plamlari, sharhlar va doimiy mijozlar uchun bonuslar.", tags: ["Bonuslar", "Sharhlar", "Rassilka"] },
    { img: "/categories/electronics.webp", title: "Elektronika va texnika", text: "Muddatli to‘lov, kafolat va nasiya bilan sotish.", tags: ["Nasiya", "Kafolat", "Fargo"] },
  ],
  // NAMUNA raqamlar
  stats: [
    { n: 500, suffix: "+", label: "faol biznes" },
    { n: 1, suffix: " mln+", label: "qabul qilingan buyurtma" },
    { n: 24, suffix: "/7", label: "qo‘llab-quvvatlash" },
  ],
};

export const PRICING = {
  eyebrow: "Narxlar",
  title: "Tarifni tanlang va samaradorlikni oshiring",
  lead: "Barcha tariflarda yangilanishlar bepul. Uzoq muddatga olsangiz — arzonroq.",
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

// "Robosell'siz xarajatlar" — robo.uz dagi taqqoslash jadvali (narxlar o'sha yerdan)
export const COST = {
  title: "Robosell’siz qancha sarflaysiz?",
  lead: "Biznesingizni onlayn qilish uchun 10 barobar ko‘p pul sarflashingiz shart emas.",
  colOld: "Maxsus dasturlash",
  colOldNote: "1 oydan boshlab",
  colNew: "Robosell bilan",
  rows: [
    { name: "Telegram bot", from: 5, to: 7 },
    { name: "Veb-sayt", from: 15, to: 20 },
    { name: "Administrator paneli", from: 5, to: 7 },
    { name: "Integratsiyalar (to‘lov, ombor)", from: 5, to: 7 },
    { name: "Ta’lim va qo‘llab-quvvatlash", from: 5, to: 7 },
  ],
  included: "Obunada",
  totalOld: "50–62 mln so‘m",
  totalNew: "500 000 so‘m / oy",
  totalLabel: "Jami xarajat",
};

export const FAQ = {
  eyebrow: "FAQ",
  title: "Ko‘p beriladigan savollar",
  lead: "Javobini topmadingizmi? Menejerimiz 15 daqiqada bog‘lanadi.",
  helpTitle: "Savolingiz qoldimi?",
  helpText: "Ism, kompaniya va telefon raqamingizni qoldiring — menejerimiz 15 daqiqada bog‘lanadi va bepul maslahat beradi.",
  list: [
    { q: "Platforma qaysi biznes turlari uchun mos?", a: "Restoran, kafe va fastfud, kiyim-kechak, kosmetika, elektronika va boshqa har qanday chakana savdo uchun. Restoran va onlayn do‘kon uchun alohida dizayn turlari bor." },
    { q: "Telegram botni qanday yaratish mumkin?", a: "BotFather’da bot oching va tokenini admin paneldagi “Platformalar → Telegram bot” bo‘limiga kiriting. Katalog, savat va to‘lov bot ichida avtomatik paydo bo‘ladi." },
    { q: "Veb-saytni qanday yaratish mumkin?", a: "“Platformalar → Veb-sayt” bo‘limida dizayn turini tanlaysiz — sayt Robosell subdomenida darhol ishga tushadi. Basic va Professional tariflarda o‘z domeningizni ulaysiz." },
    { q: "Dasturchi kerakmi?", a: "Yo‘q. Botni ulash, mahsulot qo‘shish va to‘lovlarni sozlash — hammasi admin panelda, kod yozmasdan. Kerak bo‘lsa, jamoamiz bepul yordam beradi." },
    { q: "Bot qancha vaqtda tayyor bo‘ladi?", a: "Odatda bir kun ichida: ro‘yxatdan o‘tasiz, BotFather tokenini kiritasiz va mahsulotlarni qo‘shasiz. Mahsulot ko‘p bo‘lsa, Excel orqali bir martada import qilasiz." },
    { q: "Qaysi to‘lov tizimlari ulanadi?", a: "Naqd, karta, Click, Payme, RoboPay, Alif va Uzum nasiya hamda muddatli to‘lov." },
    { q: "Domen o‘zimniki bo‘ladimi?", a: "Ha, Basic va Professional tariflarda saytni o‘z domeningizga ulaysiz. Start tarifida sayt Robosell subdomenida ishlaydi." },
    // NAMUNA: fiskal chek bo'yicha javobni aniqlashtirish kerak
    { q: "IKPU va fiskal chek bormi?", a: "Har bir mahsulotga IKPU kodini biriktirish mumkin. Fiskal chekni ulash tartibini menejerimiz biznesingizga qarab tushuntirib beradi." },
    // NAMUNA: sinov muddatini aniqlashtirish kerak
    { q: "Bepul versiya yoki sinov muddati bormi?", a: "Ha. Sinov davrida asosiy imkoniyatlarni bepul tekshirib ko‘rasiz, bank kartasi talab qilinmaydi." },
  ],
};

export const FINAL = {
  title: ["Onlayn biznesingizni", "bugun boshlang"],
  text: "Bepul sinov, karta talab qilinmaydi. Sozlashda yordam beramiz.",
  start: "Bepul boshlash",
  checks: ["1 kunda ishga tushadi", "Dasturchi kerak emas", "Bepul onboarding"],
  // chat oynasidagi suhbat (navbat bilan chiqadi)
  chat: [
    { me: true, text: "Salom! Onlayn do‘kon ochmoqchiman 🙌" },
    { me: false, text: "Assalomu alaykum! Bugunoq ishga tushiramiz." },
    { me: false, text: "Telegram bot va sayt tayyor ✅" },
    { me: true, text: "Birinchi buyurtma ham keldi! 🎉" },
  ],
};

// icon — footer "Aloqa" ustunida havola oldida ikon; external — yangi oynada ochiladi
export type FooterLink = { label: string; href: string; icon?: ContactIconName; external?: boolean };

export const FOOTER: { about: string; cols: { title: string; links: FooterLink[] }[]; legal: FooterLink[] } = {
  about: "Telegram bot, veb-sayt va QR menyu orqali onlayn savdo platformasi.",
  cols: [
    { title: "Mahsulot", links: [{ label: "Imkoniyatlar", href: "#features" }, { label: "Platformalar", href: "#channels" }, { label: "Integratsiyalar", href: "#integrations" }, { label: "Tariflar", href: "#pricing" }] },
    { title: "Yordam", links: [{ label: "Video qo‘llanma", href: `https://www.youtube.com/watch?v=${HERO.videoId}`, external: true }, { label: "FAQ", href: "#faq" }, { label: "Qo‘llab-quvvatlash", href: PHONE_HREF }] },
    {
      title: "Aloqa",
      links: [
        { label: PHONE, href: PHONE_HREF, icon: "phone" },
        { label: EMAIL, href: EMAIL_HREF, icon: "email" },
        { label: "Telegram", href: TELEGRAM_URL, icon: "telegram", external: true },
        { label: "Instagram", href: INSTAGRAM_URL.robosell, icon: "instagram", external: true },
        { label: "YouTube", href: YOUTUBE_URL, icon: "youtube", external: true },
      ],
    },
  ],
  legal: [{ label: "Oferta", href: "#" }, { label: "Maxfiylik siyosati", href: "#" }],
};

// Section'lar orasidagi "chat" xabarlari — har bo'lim tepasida pufakcha bo'lib chiqadi
// Narxni guruhlab yozish: 1500000 → "1 500 000" (bo'sh joy — bo'linmas). Server va brauzerda bir xil natija.
export function money(n: number): string {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
