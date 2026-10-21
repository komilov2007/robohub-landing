// Robohub Academy — barcha kontent (Robohub_academy.md, 4-bo'lim).
// O'zbekcha matn va matn bo'lmagan ma'lumotlar (slug, youtubeId, sana, davomiylik, ikonka) — shu faylda;
// ruscha va inglizcha matnlar — content/ papkasida (dars raqami va mavzu slug'i bo'yicha, turi qat'iy:
// biror dars yoki mavzu tarjimasi yetishmasa — tsc xato beradi).
// Yangi dars qo'shish = LESSONS_UZ ga bitta obyekt + content/ dagi ru/en matni. Hisoblagichlar (dars soni, davomiylik,
// "X / Y ko'rildi") pastdagi funksiyalar orqali avtomatik hisoblanadi — qo'lda yozilmaydi.
// Kontentni o'qish faqat tilga bog'langan funksiyalar orqali: getTopics(locale), getLesson(n, locale) va h.k.
import type { Locale } from "@/i18n/config";
import { CONTENT } from "./content";
import type { LessonText, TopicText } from "./content/types";

export type TopicSlug =
  | "analytics"
  | "order"
  | "product"
  | "warehouse"
  | "marketing"
  | "integration"
  | "communication"
  | "management";

export type Lesson = {
  n: number; // dars raqami (YouTube’dagi raqam)
  topic: TopicSlug;
  slug: string; // dars manzili: /academy/{mavzu}/{slug} (inglizcha, mavzu ichida yagona, hamma tilda bir xil)
  title: string; // savol yoki qisqa nom; "Dars N." va "| Robohub Academy" qismlarisiz
  youtubeId: string; // video o'zbekcha — hamma tilda bitta
  uploadDate?: string; // YouTube'ga yuklangan sana (ISO 8601) — JSON-LD VideoObject uchun (Google talab qiladi)
  durationSec: number;
  summary: string; // 1–2 jumla, video tavsifidan
  points: string[]; // "Ushbu darsda" bandlari, video tavsifidan
};

export type Topic = {
  slug: TopicSlug;
  name: string;
  short: string; // kartochka uchun 1 qator
  icon: string; // SVG path
  mainLesson: number; // hero’dagi asosiy video
  hero: {
    title: string;
    highlight: string;
    subtitle: string;
    bullets: string[];
  };
  problem: { title: string; text: string };
  solution: { title: string; text: string };
  flow: string[]; // "Qanday ishlaydi" — 3 qadam
  features: { title: string; text: string; lesson: number }[];
  steps: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  related: TopicSlug[];
};

// Dars raqamlari turi ro'yxatning o'zidan olinadi (LessonN = 1 | 2 | … ) — tarjimalar shu raqamlar bo'yicha tekshiriladi
function defineLessons<N extends number>(list: (Omit<Lesson, "n"> & { n: N })[]) {
  return list;
}

// O‘zbekcha matn shu yerda (asosiy til). ru/en matnlari — content/ papkasida, dars raqami va mavzu slug’i bo‘yicha.
const LESSONS_UZ = defineLessons([
  // ───────── ANALITIKA ─────────
  {
    n: 1,
    topic: "analytics",
    slug: "dashboard",
    youtubeId: "geJGHvgNYSU",
    uploadDate: "2026-08-28T03:04:18-07:00",
    durationSec: 204,
    title: "Dashboard: savdo va analitikani qanday kuzatish mumkin?",
    summary:
      "Marketpleyslardagi savdoning asosiy ko‘rsatkichlarini bitta joyda kuzatish.",
    points: [
      "Umumiy savdo ko‘rsatkichlarini ko‘rish",
      "Marketpleyslar bo‘yicha natijalarni taqqoslash",
      "Buyurtmalar dinamikasini kuzatish",
      "Mahsulotlar bo‘yicha ko‘rsatkichlarni tahlil qilish",
      "Savdodagi o‘sish va pasayishlarni aniqlash",
      "Kerakli davr bo‘yicha ma’lumotlarni ko‘rish",
    ],
  },
  {
    n: 2,
    topic: "analytics",
    slug: "expenses",
    youtubeId: "yQntyQz0ae8",
    uploadDate: "2026-08-28T03:16:36-07:00",
    durationSec: 40,
    title: "Barcha xarajatlarni qanday kuzatish mumkin?",
    summary:
      "Qancha sotganingiz emas, qancha xarajat qilib, qancha daromad qolayotganini tushunish.",
    points: [
      "Operatsion xarajatlar",
      "Marketpleys komissiyalari",
      "Logistika",
      "Reklama",
      "Saqlash xarajatlari",
      "Jarima va boshqa xarajatlar",
      "Har bir xarajatning umumiy xarajatdagi ulushi",
    ],
  },
  {
    n: 3,
    topic: "analytics",
    slug: "top-products",
    youtubeId: "yFDhiVW2dTA",
    uploadDate: "2026-08-28T03:43:30-07:00",
    durationSec: 107,
    title: "TOP mahsulotlarni qanday aniqlash mumkin?",
    summary:
      "Qaysi mahsulot eng ko‘p sotilayotgani va daromad keltirayotganini aniqlash.",
    points: [
      "Eng ko‘p sotilayotgan mahsulotlarni aniqlash",
      "Mahsulotlar bo‘yicha sotuv natijalarini solishtirish",
      "Qaysi SKU ko‘proq buyurtma olib kelayotganini ko‘rish",
      "Kuchli va sust mahsulotlarni aniqlash",
      "Assortiment bo‘yicha qarorlarni ma’lumotga tayanib qabul qilish",
    ],
  },
  {
    n: 4,
    topic: "analytics",
    slug: "abc-analysis",
    youtubeId: "M5GKdIVX4Us",
    uploadDate: "2026-08-28T03:59:11-07:00",
    durationSec: 141,
    title: "ABC tahlili: qaysi mahsulotlar ko‘proq foyda keltiradi?",
    summary: "Mahsulotlarni natijasiga qarab A, B va C guruhlarga ajratish.",
    points: [
      "A — asosiy natijani keltirayotgan mahsulotlar",
      "B — o‘rtacha natija",
      "C — umumiy natijadagi ulushi kichik",
      "Har guruh bo‘yicha SKU soni, GMV, sotuv, marja, xarajat, qaytarish va bekor qilinganlar",
    ],
  },
  {
    n: 5,
    topic: "analytics",
    slug: "xyz-analysis",
    youtubeId: "hw371gPXUTo",
    uploadDate: "2026-08-28T04:02:12-07:00",
    durationSec: 122,
    title: "XYZ tahlili: mahsulotlarga talabni qanday aniqlash mumkin?",
    summary:
      "Mahsulotlarni sotuv barqarorligiga qarab X, Y va Z guruhlarga ajratish.",
    points: [
      "X — sotuvi barqaror",
      "Y — talabi o‘zgaruvchan",
      "Z — sotuvi beqaror, prognoz qilish qiyin",
      "Qoldiqlarni aniqroq rejalashtirish",
      "Ortiqcha zaxira va yetishmovchilik xavfini kamaytirish",
    ],
  },
  {
    n: 6,
    topic: "analytics",
    slug: "abc-xyz-analysis",
    youtubeId: "CWADO6bBMnU",
    uploadDate: "2026-08-28T04:08:54-07:00",
    durationSec: 131,
    title: "ABC × XYZ tahlili: mahsulotlarni qanday boshqarish kerak?",
    summary:
      "Mahsulotning biznesdagi ahamiyati va talab barqarorligini birga baholash: AX dan CZ gacha 9 guruh.",
    points: [
      "ABC — biznes natijasidagi ahamiyat",
      "XYZ — talab barqarorligi",
      "AX, AY, AZ, BX, BY, BZ, CX, CY, CZ guruhlari",
      "Guruh ichida GMV, sotuv, marja, xarajat, qaytarish va bekor qilinganlar",
    ],
  },
  {
    n: 7,
    topic: "analytics",
    slug: "operating-expenses",
    youtubeId: "z0EQOhbSbuU",
    uploadDate: "2026-08-28T04:13:20-07:00",
    durationSec: 99,
    title: "Operatsion xarajatlarni qanday kiritish mumkin?",
    summary:
      "Haqiqiy foydani ko‘rish uchun biznesning operatsion xarajatlarini kiritish va sozlash.",
    points: [
      "Soliq foizi",
      "Oylik qat’iy soliqlar",
      "Har bir mahsulotga to‘g‘ri keladigan o‘rtacha xarajat",
      "Xodimlar uchun oylik xarajatlar",
      "Marja va ROI aniqroq hisoblanadi",
    ],
  },
  {
    n: 8,
    topic: "analytics",
    slug: "cost-price",
    youtubeId: "-iB19I6UtwQ",
    uploadDate: "2026-09-15T05:10:16-07:00",
    durationSec: 70,
    title: "Mahsulot tannarxini qanday kiritish mumkin?",
    summary: "Tannarxni Robohub’ga yuklab, savdoning real natijasini ko‘rish.",
    points: [
      "Mahsulot tannarxini kiritish",
      "Tannarx ma’lumotlarini yuklash",
      "Tannarx nima uchun muhim",
      "Tushum va xarajatlarni to‘g‘ri tahlil qilish",
      "Mahsulotning real natijasini aniqlash",
    ],
  },

  // ───────── BUYURTMALAR ─────────
  {
    n: 9,
    topic: "order",
    slug: "order-dynamics",
    youtubeId: "vwJhmZPC4Wo",
    uploadDate: "2026-09-15T05:20:06-07:00",
    durationSec: 82,
    title: "Buyurtmalar dinamikasini qanday tahlil qilish mumkin?",
    summary:
      "Buyurtmalar ko‘payyaptimi yoki kamayyaptimi — davr bo‘yicha dinamikani kuzatish.",
    points: [
      "Buyurtmalar sonini kuzatish",
      "Tanlangan davr bo‘yicha dinamika",
      "Buyurtmalar qayerdan kelayotgani",
      "O‘sish va pasayishlarni aniqlash",
    ],
  },
  {
    n: 10,
    topic: "order",
    slug: "yandex-market-orders",
    youtubeId: "y0Xe8qDqHro",
    uploadDate: "2026-09-15T05:27:11-07:00",
    durationSec: 136,
    title: "Yandex Market buyurtmalarini qanday boshqarish mumkin?",
    summary:
      "Yandex Market’dan kelgan buyurtmani Robohub’da ochish, tekshirish va qayta ishlash.",
    points: [
      "Buyurtmalarni qayerdan ko‘rish",
      "Yangi buyurtmani ochish va tekshirish",
      "Buyurtma bilan ishlash",
      "Statuslarni kuzatish",
    ],
  },
  {
    n: 11,
    topic: "order",
    slug: "wildberries-orders",
    youtubeId: "ZRE4M_iS7H8",
    uploadDate: "2026-09-18T06:33:12-07:00",
    durationSec: 165,
    title: "Wildberries buyurtmalarini qanday qayta ishlash mumkin?",
    summary:
      "Wildberries’dan kelgan buyurtmalarni Robohub kabinetidan qayta ishlash.",
    points: [
      "Buyurtmalarni ko‘rish",
      "Yangi buyurtmani tekshirish",
      "Buyurtmani qayta ishlash",
      "Statusni kuzatish",
    ],
  },
  {
    n: 12,
    topic: "order",
    slug: "uzum-market-orders",
    youtubeId: "FtW23fKXnN4",
    uploadDate: "2026-09-18T06:37:48-07:00",
    durationSec: 84,
    title: "Uzum Market buyurtmalarini qanday qayta ishlash mumkin?",
    summary:
      "Uzum Market’dan kelgan buyurtmalarni Robohub kabinetidan qayta ishlash.",
    points: [
      "Buyurtmalarni ko‘rish",
      "Yangi buyurtmani tekshirish",
      "Buyurtmani qayta ishlash",
      "Statusni kuzatish",
    ],
  },
  {
    n: 13,
    topic: "order",
    slug: "fbo-supply",
    youtubeId: "W6QBxo4Jm-E",
    uploadDate: "2026-09-18T06:44:13-07:00",
    durationSec: 63,
    title: "FBO ta’minlashni qanday yaratish mumkin?",
    summary:
      "Marketpleys omboriga mahsulot yuborish uchun ta’minlash yaratish.",
    points: [
      "FBO ta’minlash bo‘limiga kirish",
      "Yangi ta’minlash yaratish",
      "Mahsulot va miqdorni tanlash",
      "Ma’lumotlarni tekshirish",
      "Tayyor ta’minlashni boshqarish",
    ],
  },
  {
    n: 14,
    topic: "order",
    slug: "uzum-market-order-status",
    youtubeId: "usn42-uteE0",
    uploadDate: "2026-10-07T11:59:20-07:00",
    durationSec: 84,
    title: "Uzum Market buyurtmalari: holatni boshqarish",
    summary:
      "Buyurtmalar bo‘limida Uzum Market buyurtmalarining holatini boshqarish.",
    points: [
      "Buyurtmalar bo‘limiga kirish",
      "Uzum Market buyurtmalarini ko‘rish",
      "Ma’lumotlarni tekshirish",
      "Buyurtma holatini boshqarish",
    ],
  },
  // TODO: 12 va 14 mazmunan juda yaqin — dublikat emasligini kontent jamoasidan tekshirish

  // ───────── MAHSULOTLAR ─────────
  {
    n: 15,
    topic: "product",
    slug: "price-update",
    youtubeId: "USw1TXNTxVU",
    uploadDate: "2026-10-07T12:04:09-07:00",
    durationSec: 52,
    title: "Narxlarni qanday yangilash mumkin?",
    summary:
      "Mahsulot narxini o‘zgartirib, yangi narxni marketpleysga yuborish.",
    points: [
      "Mahsulotlar bo‘limiga kirish",
      "Mahsulot narxini o‘zgartirish",
      "Yangi narxni kiritish",
      "Narxni marketpleysga yuborish",
    ],
  },
  {
    n: 16,
    topic: "product",
    slug: "product-card",
    youtubeId: "ouMMqJbYhGw",
    uploadDate: "2026-10-07T12:10:31-07:00",
    durationSec: 126,
    title: "Tovar kartochkasini qanday yaratish mumkin?",
    summary: "Marketpleys uchun yangi tovar kartochkasini yaratib, yuborish.",
    points: [
      "Yangi kartochka yaratish",
      "Mahsulot ma’lumotlarini kiritish",
      "Narx va boshqa maydonlarni to‘ldirish",
      "Saqlash va marketpleysga yuborish",
    ],
  },

  // ───────── OMBOR ─────────
  {
    n: 17,
    topic: "warehouse",
    slug: "warehouse-grouping-short",
    youtubeId: "xCjFvvMies4",
    uploadDate: "2026-10-07T12:13:24-07:00",
    durationSec: 11,
    title: "Omborni guruhlash (qisqa)",
    summary: "Omborlarni guruhlash bo‘yicha qisqa ko‘rinish.",
    points: [
      "Omborlar bo‘limiga kirish",
      "Mavjud omborlarni ko‘rish",
      "Omborlarni guruhlarga ajratish",
    ],
  },
  // TODO: 17-dars atigi 11 soniya va 18 bilan bir xil tavsifda — to‘liq versiyasi bormi, tekshirish
  {
    n: 18,
    topic: "warehouse",
    slug: "warehouse-grouping",
    youtubeId: "8_HqpQ2liF4",
    uploadDate: "2026-10-07T12:18:00-07:00",
    durationSec: 88,
    title: "Omborlarni qanday guruhlash mumkin?",
    summary:
      "Omborlarni guruhlarga ajratib, bitta kabinetdan tartibli boshqarish.",
    points: [
      "«Ombor» bo‘limiga kirish",
      "Mavjud omborlarni ko‘rish",
      "Omborlarni guruhlarga ajratish",
      "Ombor guruhlarini boshqarish",
      "Guruhlangan omborlar bilan ishlash",
    ],
  },
  {
    n: 19,
    topic: "warehouse",
    slug: "missing",
    youtubeId: "BYVgxVWHqbY",
    uploadDate: "2026-10-07T12:21:16-07:00",
    durationSec: 36,
    title: "Missing nima va u bilan qanday ishlash kerak?",
    summary:
      "Ombordagi Missing holatidagi mahsulotlarni ko‘rish va ular bilan ishlash.",
    points: [
      "«Ombor» bo‘limiga kirish",
      "Missing bo‘limini ko‘rish",
      "Missing holatidagi mahsulotlarni ko‘rish",
      "Mahsulot ma’lumotlarini tekshirish",
    ],
  },

  // ───────── MARKETING ─────────
  {
    n: 20,
    topic: "marketing",
    slug: "promo-codes",
    youtubeId: "acDq6mpcpOQ",
    uploadDate: "2026-10-07T12:25:08-07:00",
    durationSec: 26,
    title: "Promokodlar va aksiyalar taqvimini qanday boshqarish mumkin?",
    summary:
      "Marketpleysdagi promokodlar va aksiyalarni bitta kabinetdan kuzatish.",
    points: [
      "«Marketing» bo‘limiga kirish",
      "Promokodlarni ko‘rish va boshqarish",
      "Aksiyalar taqvimi",
      "Aksiya sanalari va shartlari",
    ],
  },
  {
    n: 21,
    topic: "marketing",
    slug: "boost-top",
    youtubeId: "88BmPwiPbQg",
    uploadDate: "2026-10-07T12:37:37-07:00",
    durationSec: 157,
    title: "Boost TOP bilan qanday ishlash mumkin?",
    summary: "Boost TOP funksiyasi orqali mahsulotlarni boshqarish.",
    points: [
      "«Marketing» bo‘limiga kirish",
      "Boost TOP’ni ochish",
      "Boost TOP ma’lumotlarini ko‘rish",
      "Mahsulotlarni Boost TOP orqali boshqarish",
    ],
  },

  // ───────── INTEGRATSIYA ─────────
  {
    n: 22,
    topic: "integration",
    slug: "connect-uzum-market",
    youtubeId: "BNVMZkfh1Kw",
    uploadDate: "2026-10-07T12:43:53-07:00",
    durationSec: 122,
    title: "Uzum Market’ni qanday ulash mumkin?",
    summary:
      "Uzum Market akkauntini Robohub’ga ulash va integratsiyani faollashtirish.",
    points: [
      "«Integratsiya» bo‘limiga kirish",
      "Uzum Market’ni tanlash",
      "Akkauntni ulash",
      "Integratsiya ma’lumotlarini kiritish",
      "Ulanishni tekshirish va faollashtirish",
    ],
  },
  {
    n: 23,
    topic: "integration",
    slug: "connect-wildberries",
    youtubeId: "7YS6oz2mfmg",
    uploadDate: "2026-10-07T12:46:21-07:00",
    durationSec: 41,
    title: "Wildberries’ni qanday ulash mumkin?",
    summary:
      "Wildberries akkauntini Robohub’ga ulash va integratsiyani faollashtirish.",
    points: [
      "«Integratsiya» bo‘limiga kirish",
      "Wildberries’ni tanlash",
      "Akkauntni ulash",
      "Integratsiya ma’lumotlarini kiritish",
      "Ulanishni tekshirish va faollashtirish",
    ],
  },
  {
    n: 24,
    topic: "integration",
    slug: "connect-yandex-market",
    youtubeId: "Sjm7IY0vEEw",
    uploadDate: "2026-10-07T12:49:40-07:00",
    durationSec: 33,
    title: "Yandex Market’ni qanday ulash mumkin?",
    summary:
      "Yandex Market akkauntini Robohub’ga ulash va integratsiyani faollashtirish.",
    points: [
      "«Integratsiya» bo‘limiga kirish",
      "Yandex Market’ni tanlash",
      "Akkauntni ulash",
      "Integratsiya ma’lumotlarini kiritish",
      "Ulanishni tekshirish va faollashtirish",
    ],
  },
  {
    n: 25,
    topic: "integration",
    slug: "connect-ozon",
    youtubeId: "kEdebBEmSE8",
    uploadDate: "2026-10-08T02:05:20-07:00",
    durationSec: 63,
    title: "Ozon’ni qanday ulash mumkin?",
    summary:
      "Ozon akkauntini Robohub’ga ulash va integratsiyani faollashtirish.",
    points: [
      "«Integratsiya» bo‘limiga kirish",
      "Ozon’ni tanlash",
      "Akkauntni ulash",
      "Integratsiya ma’lumotlarini kiritish",
      "Ulanishni tekshirish va faollashtirish",
    ],
  },

  // ───────── MULOQOT ─────────
  {
    n: 26,
    topic: "communication",
    slug: "chat",
    youtubeId: "A-zrwNSJ4CI",
    uploadDate: "2026-10-08T02:09:53-07:00",
    durationSec: 14,
    title: "Chat bo‘limi qanday ishlaydi?",
    summary:
      "Marketpleyslardagi mijozlar bilan yozishmalarni bitta kabinetdan boshqarish.",
    points: [
      "«Chat» bo‘limiga kirish",
      "Chatlar ro‘yxatini ko‘rish",
      "Mijozlar bilan yozishmalarni ko‘rish",
      "Xabarlarni boshqarish",
    ],
  },
  // TODO: 26-dars atigi 14 soniya — to‘liqligini tekshirish
  {
    n: 27,
    topic: "communication",
    slug: "review-auto-reply",
    youtubeId: "tVftiOSqyRU",
    uploadDate: "2026-10-08T02:13:28-07:00",
    durationSec: 63,
    title: "Sharhlarga avtomatik javob qanday ishlaydi?",
    summary:
      "Avtojavob funksiyasi orqali mijozlar sharhlariga avtomatik javob berish.",
    points: [
      "«Avtojavob» bo‘limiga kirish",
      "Mijozlar sharhlarini ko‘rish",
      "Sharhlarga avtomatik javob berish",
      "Avtojavob sozlamalari",
    ],
  },

  // ───────── BOSHQARUV ─────────
  {
    n: 28,
    topic: "management",
    slug: "documents",
    youtubeId: "vVKsmqrH5G8",
    uploadDate: "2026-10-08T02:17:07-07:00",
    durationSec: 41,
    title: "Hujjatlar bo‘limi qanday ishlaydi?",
    summary:
      "Marketpleyslar bilan ishlashdagi hujjatlarni bitta kabinetdan ko‘rish va boshqarish.",
    points: [
      "«Hujjatlar» bo‘limiga kirish",
      "Hujjatlar ro‘yxatini ko‘rish",
      "Hujjat ma’lumotlarini ko‘rish",
      "Hujjatlarni boshqarish",
    ],
  },
  {
    n: 29,
    topic: "management",
    slug: "employee-roles",
    youtubeId: "-ARIBJe5Yp0",
    uploadDate: "2026-10-08T02:22:57-07:00",
    durationSec: 108,
    title: "Xodimlar uchun rollarni qanday qo‘shish mumkin?",
    summary: "Xodimlarga rol va kirish huquqlarini berish.",
    points: [
      "«Xodimlar» bo‘limiga kirish",
      "Rollar bo‘limini ochish",
      "Yangi rol qo‘shish va nom berish",
      "Rolga huquqlarni belgilash",
      "Rollarni boshqarish",
    ],
  },
  {
    n: 30,
    topic: "management",
    slug: "infographics",
    youtubeId: "K8Umz2xReGs",
    uploadDate: "2026-10-08T02:45:16-07:00",
    durationSec: 176,
    title: "Infografika: savdo ma’lumotlarini qanday vizual ko‘rish mumkin?",
    summary:
      "O‘quv material bo‘limidagi Infografika funksiyasi bilan marketpleys ma’lumotlarini vizual ko‘rish.",
    points: [
      "O‘quv material bo‘limiga kirish",
      "Infografika bilan tanishish",
      "Marketpleys ma’lumotlarini vizual ko‘rish",
      "Savdo ko‘rsatkichlarini tushunish",
    ],
  },
]);

const TOPICS_UZ: Topic[] = [
  {
    slug: "analytics",
    name: "Analitika",
    short: "Savdo, xarajat, tannarx va ABC/XYZ tahlili",
    icon: "M4 20V10M10 20V4M16 20v-7M22 20H2",
    mainLesson: 1,
    hero: {
      title: "Savdo, xarajat va foyda —",
      highlight: "bitta dashboardda",
      subtitle:
        "Barcha marketpleyslardagi asosiy ko‘rsatkichlarni alohida kabinetlardan yig‘may, bitta joyda kuzating.",
      bullets: [
        "Savdo va buyurtmalar dinamikasi",
        "Xarajatlar va tannarx hisobga olingan real natija",
        "ABC, XYZ va ABC × XYZ tahlili",
      ],
    },
    problem: {
      title: "Qancha sotganingizni bilish yetarli emas",
      text: "Mahsulot 200 000 so‘mga sotildi — bu hali 200 000 so‘m foyda degani emas. Komissiya, logistika, reklama, tannarx va operatsion xarajatlar hisobga olinmasa, haqiqiy natija ko‘rinmaydi.",
    },
    solution: {
      title: "Robohub hammasini bir joyda hisoblaydi",
      text: "Savdo, xarajatlar, tannarx va operatsion xarajatlar bitta analitikada. Qaysi mahsulot foyda keltirayotgani va talab qanchalik barqarorligi ham ko‘rinadi.",
    },
    flow: [
      "Marketpleyslardan savdo ma’lumoti keladi",
      "Tannarx va operatsion xarajatlarni kiritasiz",
      "Dashboard real foyda va TOP mahsulotlarni ko‘rsatadi",
    ],
    features: [
      {
        title: "Dashboard",
        text: "Umumiy savdo, marketpleyslar taqqoslanishi va davr bo‘yicha dinamika.",
        lesson: 1,
      },
      {
        title: "Xarajatlar tarkibi",
        text: "Komissiya, logistika, reklama, saqlash va jarimalar ulushi.",
        lesson: 2,
      },
      {
        title: "TOP mahsulotlar",
        text: "Eng ko‘p sotilayotgan va eng sust SKU’lar.",
        lesson: 3,
      },
      {
        title: "ABC × XYZ",
        text: "Foyda va talab barqarorligi bo‘yicha 9 guruh.",
        lesson: 6,
      },
    ],
    steps: [
      {
        title: "Tannarxni kiriting",
        text: "Mahsulotlar bo‘yicha tannarxni yuklang (8-dars).",
      },
      {
        title: "Operatsion xarajatlarni kiriting",
        text: "Soliq, xodimlar va boshqa oylik xarajatlar (7-dars).",
      },
      {
        title: "Dashboardni oching",
        text: "Kerakli davrni tanlab, ko‘rsatkichlarni ko‘ring (1-dars).",
      },
      {
        title: "Mahsulotlarni tahlil qiling",
        text: "TOP, ABC va XYZ bo‘yicha qaror qabul qiling (3–6-darslar).",
      },
    ],
    faqs: [
      {
        q: "Tannarx va operatsion xarajatlarni qachon kiritish kerak?",
        a: "Analitikadan foydalanishni boshlashdan oldin — eng birinchi qadam sifatida. Robohub foydani hisoblash uchun savdo summasidan barcha xarajatlarni ayiradi: agar tannarx yoki operatsion xarajatlar kiritilmagan bo‘lsa, foyda, marja va ROI haqiqatdagidan ancha yuqori chiqadi.\n\nTartib oddiy: avval har bir mahsulotning tannarxini kiriting yoki ro‘yxat bilan yuklang (8-dars), so‘ng soliq foizi, oylik soliqlar va xodimlar maoshi kabi operatsion xarajatlarni sozlang (7-dars). Shundan keyin barcha hisobotlar real raqamlarni ko‘rsatadi.",
      },
      {
        q: "ABC va XYZ tahlilining farqi nimada?",
        a: "Ikkalasi mahsulotlarni guruhlaydi, lekin turli savolga javob beradi. ABC — «bu mahsulot biznesga qancha natija beryapti?»: A guruhi asosiy natijani beradi, B — o‘rtacha, C — ulushi kichik (4-dars). XYZ — «bu mahsulotga talab qanchalik barqaror?»: X barqaror sotiladi, Y o‘zgaruvchan, Z beqaror va prognoz qilish qiyin (5-dars).\n\nIkkalasini birga ko‘rsangiz, AX dan CZ gacha 9 ta guruh hosil bo‘ladi va har bir guruh uchun aniq qaror qabul qilish oson bo‘ladi: masalan, AX tovarini doim zaxirada saqlash kerak, CZ ga esa ortiqcha mablag‘ bog‘lamaslik kerak (6-dars).",
      },
      {
        q: "Qaysi xarajatlarni kuzatish mumkin?",
        a: "Robohub savdo bilan bog‘liq barcha asosiy xarajatlarni bitta joyda ko‘rsatadi: operatsion xarajatlar, marketpleys komissiyalari, logistika, reklama, saqlash, jarimalar va boshqa xarajatlar.\n\nHar bir xarajatning umumiy xarajatdagi ulushi ham ko‘rinadi — shuning uchun pul eng ko‘p qayerga ketayotganini darhol bilasiz va avval aynan o‘sha joyni qisqartirishdan boshlaysiz (2-dars).",
      },
      {
        q: "Savdoni marketpleyslar bo‘yicha solishtirsa bo‘ladimi?",
        a: "Ha. Dashboard’da umumiy savdo bilan birga har bir marketpleysning natijasi alohida ko‘rinadi, ularni yonma-yon taqqoslash mumkin.\n\nKerakli davrni tanlab, qaysi marketpleysda savdo o‘sayotganini va qaysi birida pasayayotganini kuzatasiz — bu reklama va qoldiqni qayerga ko‘proq yo‘naltirishni hal qilishga yordam beradi (1-dars).",
      },
      {
        q: "Qaysi mahsulot ko‘proq foyda keltirayotganini qanday bilaman?",
        a: "Buning uchun ikki vosita bor. TOP mahsulotlar bo‘limi eng ko‘p sotilayotgan va eng ko‘p buyurtma olib kelayotgan SKU’larni, shuningdek sust sotilayotganlarini ko‘rsatadi (3-dars).\n\nABC tahlili esa har bir mahsulotning umumiy natijadagi hissasini — GMV, marja va xarajatlar bilan birga — ko‘rsatadi (4-dars). Aniq foyda ko‘rinishi uchun tannarx kiritilgan bo‘lishi kerak (8-dars).",
      },
    ],
    related: ["order", "warehouse"],
  },
  {
    slug: "order",
    name: "Buyurtmalar",
    short: "Uzum, Wildberries va Yandex buyurtmalari, FBO",
    icon: "M6 6h15l-2 8H8zM6 6L5 3H2M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
    mainLesson: 11,
    hero: {
      title: "Barcha marketpleys buyurtmalari",
      highlight: "bitta kabinetda",
      subtitle:
        "Uzum Market, Wildberries va Yandex Market’dan kelgan buyurtmalarni bitta joyda ko‘ring, tekshiring va qayta ishlang.",
      bullets: [
        "Yangi buyurtmani ochish va tekshirish",
        "Statuslarni kuzatish",
        "FBO ta’minlashni yaratish",
      ],
    },
    problem: {
      title: "Har marketpleys — alohida kabinet",
      text: "Bir nechta marketpleysda savdo qilsangiz, buyurtmalar bilan ishlash tobora murakkablashadi: har biriga alohida kirish, alohida tekshirish kerak.",
    },
    solution: {
      title: "Buyurtma → qayta ishlash → nazorat",
      text: "Robohub barcha marketpleys buyurtmalarini bitta kabinetga yig‘adi. Kamroq kabinet — kamroq qo‘l mehnati — ko‘proq nazorat.",
    },
    flow: [
      "Marketpleysdan yangi buyurtma keladi",
      "Robohub’da buyurtmani ochib tekshirasiz",
      "Qayta ishlab, statusini kuzatasiz",
    ],
    features: [
      {
        title: "Uzum Market",
        text: "Uzum buyurtmalarini ko‘rish va qayta ishlash.",
        lesson: 12,
      },
      {
        title: "Wildberries",
        text: "WB buyurtmalarini Robohub kabinetidan boshqarish.",
        lesson: 11,
      },
      {
        title: "Yandex Market",
        text: "Yandex buyurtmalarini ochish va statuslarini kuzatish.",
        lesson: 10,
      },
      {
        title: "FBO ta’minlash",
        text: "Marketpleys omboriga yuborish uchun ta’minlash yaratish.",
        lesson: 13,
      },
    ],
    steps: [
      {
        title: "Buyurtmalar bo‘limini oching",
        text: "Barcha marketpleyslardan kelgan buyurtmalar shu yerda.",
      },
      {
        title: "Yangi buyurtmani oching",
        text: "Buyurtma ma’lumotlarini tekshiring.",
      },
      { title: "Qayta ishlang", text: "Buyurtma holatini boshqaring." },
      {
        title: "Statusni kuzating",
        text: "Buyurtma qaysi bosqichdaligini nazorat qiling.",
      },
    ],
    faqs: [
      {
        q: "Qaysi marketpleys buyurtmalari bilan ishlash mumkin?",
        a: "Darslarda Uzum Market, Wildberries va Yandex Market buyurtmalarini qayta ishlash ko‘rsatilgan — har biri uchun alohida dars bor (10–12-darslar).\n\nBarcha marketpleyslarning buyurtmalari Robohub’ning bitta kabinetiga keladi, shuning uchun har bir marketpleysning o‘z kabinetiga alohida kirish shart emas. Buning uchun avval marketpleys akkauntingiz ulangan bo‘lishi kerak (Integratsiya mavzusi).",
      },
      {
        q: "Buyurtma qanday bosqichlarda qayta ishlanadi?",
        a: "Jarayon to‘rt qadamdan iborat: 1) buyurtmalar ro‘yxatini ochasiz; 2) yangi buyurtmani ochib, tarkibini tekshirasiz; 3) buyurtmani qayta ishlaysiz; 4) keyin uning statusini kuzatib borasiz.\n\nBu tartib Uzum Market, Wildberries va Yandex Market uchun bir xil — farqi faqat har bir marketpleysning o‘z bosqich nomlarida. Har bir marketpleys darsida shu qadamlar ekranda ko‘rsatilgan (10–12-darslar).",
      },
      {
        q: "Buyurtma holatini qayerda boshqaraman?",
        a: "Buyurtmalar bo‘limida. Kerakli buyurtmani ochib, uning ma’lumotlarini tekshirasiz va holatini o‘zgartirasiz.\n\nHolatni o‘z vaqtida yangilab borish muhim: shunda har bir buyurtma qaysi bosqichda ekani doim aniq bo‘ladi, kechikish va bekor qilishlar kamayadi. Bu jarayon Uzum Market misolida 14-darsda ko‘rsatilgan.",
      },
      {
        q: "FBO ta’minlash nima uchun kerak?",
        a: "FBO modelida tovaringiz marketpleys omborida saqlanadi va buyurtmani marketpleysning o‘zi yetkazadi. Ta’minlash — marketpleys omboriga qaysi mahsulotdan qancha yuborilishini rasmiylashtiradigan ariza.\n\nRobohub’da yangi ta’minlash yaratib, mahsulot va miqdorni tanlaysiz, ma’lumotlarni tekshirasiz va tayyor ta’minlashlarni boshqarasiz. To‘g‘ri tuzilgan ta’minlash tovar omborga o‘z vaqtida yetishini va sotuv to‘xtab qolmasligini ta’minlaydi (13-dars).",
      },
      {
        q: "Buyurtmalar kamayganini qanday payqayman?",
        a: "Buyurtmalar dinamikasi bo‘limida. U tanlangan davr bo‘yicha buyurtmalar soni qanday o‘zgarganini va buyurtmalar qaysi marketpleyslardan kelayotganini ko‘rsatadi.\n\nGrafikda o‘sish va pasayish darhol ko‘rinadi. Pasayishni erta payqasangiz, sababini — narx, qoldiq yoki raqobatni — vaqtida topib, chora ko‘rishga ulgurasiz (9-dars).",
      },
    ],
    related: ["warehouse", "integration"],
  },
  {
    slug: "product",
    name: "Mahsulotlar",
    short: "Tovar kartochkasi va narxlarni yangilash",
    icon: "M20 12l-8 8-9-9V3h8zM7 7h.01",
    mainLesson: 16,
    hero: {
      title: "Kartochka va narxlar —",
      highlight: "bitta joydan",
      subtitle:
        "Tovar kartochkasini yarating va narxlarni yangilang — o‘zgarish marketpleysga Robohub orqali yuboriladi.",
      bullets: [
        "Yangi tovar kartochkasi yaratish",
        "Narxni o‘zgartirib, marketpleysga yuborish",
        "Mahsulotlarni bitta kabinetdan boshqarish",
      ],
    },
    problem: {
      title: "Har o‘zgarish uchun har kabinetga kirish",
      text: "Narxni yangilash yoki yangi tovar qo‘shish uchun har bir marketpleys kabinetiga alohida kirish kerak.",
    },
    solution: {
      title: "Mahsulot → o‘zgarish → marketpleys",
      text: "Robohub’da kartochka yaratasiz yoki narxni o‘zgartirasiz va uni marketpleysga yuborasiz.",
    },
    flow: [
      "Mahsulotlar bo‘limida tovarni tanlaysiz",
      "Ma’lumot yoki narxni o‘zgartirasiz",
      "Robohub marketpleysga yuboradi",
    ],
    features: [
      {
        title: "Tovar kartochkasi",
        text: "Ma’lumot, narx va boshqa maydonlarni to‘ldirib, saqlash va yuborish.",
        lesson: 16,
      },
      {
        title: "Narxlarni yangilash",
        text: "Yangi narxni kiritib, marketpleysga yuborish.",
        lesson: 15,
      },
    ],
    steps: [
      {
        title: "Mahsulotlar bo‘limiga kiring",
        text: "Barcha tovarlaringiz ro‘yxati.",
      },
      {
        title: "Kartochka yarating yoki tovarni tanlang",
        text: "Yangi tovar yoki mavjudini oching.",
      },
      {
        title: "Ma’lumot va narxni kiriting",
        text: "Kerakli maydonlarni to‘ldiring.",
      },
      {
        title: "Saqlang va yuboring",
        text: "O‘zgarish marketpleysga yuboriladi.",
      },
    ],
    faqs: [
      {
        q: "Narx o‘zgarishi marketpleysga qanday yetadi?",
        a: "Narxni har bir marketpleys kabinetida alohida o‘zgartirish shart emas. Robohub’ning Mahsulotlar bo‘limida kerakli mahsulotni ochib, yangi narxni kiritasiz va uni to‘g‘ridan-to‘g‘ri marketpleysga yuborasiz.\n\nShu tarzda aksiya, mavsum yoki raqobatga tez javob berasiz va bir nechta kabinetda qo‘lda o‘zgartirishdagi xatolardan qochasiz (15-dars).",
      },
      {
        q: "Tovar kartochkasini Robohub’da yaratsa bo‘ladimi?",
        a: "Ha. Yangi tovar kartochkasi Robohub’da yaratiladi, to‘ldiriladi va o‘sha yerdan marketpleysga yuboriladi — marketpleys kabinetiga alohida kirish shart emas (16-dars).",
      },
      {
        q: "Kartochkada qaysi ma’lumotlar to‘ldiriladi?",
        a: "Mahsulot ma’lumotlari, narx va kartochkaning boshqa maydonlari. Hammasi to‘ldirilgach, kartochka saqlanadi va marketpleysga yuboriladi.\n\nKartochka qanchalik to‘liq va aniq to‘ldirilsa, mahsulot qidiruvda shunchalik yaxshi ko‘rinadi va xaridorni tezroq ishontiradi. Butun jarayon 16-darsda qadam-baqadam ko‘rsatilgan.",
      },
      {
        q: "Narxni o‘zgartirishdan oldin nimani tekshirish kerak?",
        a: "Mahsulot tannarxi va operatsion xarajatlar Robohub’ga kiritilganini. Ular bo‘lmasa, yangi narxda sizga qancha marja qolishini bilib bo‘lmaydi — narx zararga tushib qolishi mumkin.\n\nTannarx va xarajatlarni kiritish Analitika mavzusidagi 7- va 8-darslarda ko‘rsatilgan.",
      },
    ],
    related: ["marketing", "warehouse"],
  },
  {
    slug: "warehouse",
    name: "Ombor",
    short: "Omborlarni guruhlash va Missing",
    icon: "M3 9l9-6 9 6v11H3zM9 20v-6h6v6",
    mainLesson: 18,
    hero: {
      title: "Omborlaringizni",
      highlight: "tartibli boshqaring",
      subtitle:
        "Omborlarni guruhlarga ajrating va Missing holatidagi mahsulotlarni bitta kabinetdan kuzating.",
      bullets: [
        "Omborlarni guruhlarga ajratish",
        "Ombor guruhlarini boshqarish",
        "Missing holatidagi mahsulotlarni ko‘rish",
      ],
    },
    problem: {
      title: "Omborlar ko‘p, tartib yo‘q",
      text: "Mahsulotlar turli omborlarda turadi va ularni birma-bir ko‘rib chiqish vaqt oladi. Qaysi mahsulot qayerda va qanday holatda ekanini bilish qiyinlashadi.",
    },
    solution: {
      title: "Ombor → guruhlash → boshqarish",
      text: "Robohub’da omborlarni guruhlarga ajratib, ular bilan bitta kabinetdan ishlaysiz. Missing bo‘limida esa muammoli holatdagi mahsulotlarni alohida ko‘rasiz.",
    },
    flow: [
      "Mavjud omborlarni ko‘rasiz",
      "Ularni guruhlarga ajratasiz",
      "Guruhlar va Missing mahsulotlarni boshqarasiz",
    ],
    features: [
      {
        title: "Omborlarni guruhlash",
        text: "Mavjud omborlarni o‘zingizga qulay guruhlarga ajrating.",
        lesson: 18,
      },
      {
        title: "Guruhlarni boshqarish",
        text: "Guruhlangan omborlar bilan bitta joyda ishlang.",
        lesson: 18,
      },
      {
        title: "Missing",
        text: "Missing holatidagi mahsulotlarni ko‘rib, ma’lumotlarini tekshiring.",
        lesson: 19,
      },
      {
        title: "FBO ta’minlash",
        text: "Marketpleys omboriga mahsulot yuborishni rejalang.",
        lesson: 13,
      },
    ],
    steps: [
      { title: "«Ombor» bo‘limiga kiring", text: "Chap menyudan Ombor." },
      { title: "Omborlarni ko‘ring", text: "Mavjud omborlar ro‘yxati." },
      {
        title: "Guruhlarga ajrating",
        text: "Omborlarni kerakli guruhlarga qo‘shing.",
      },
      {
        title: "Guruhlarni boshqaring",
        text: "Guruhlangan omborlar bilan ishlang.",
      },
    ],
    faqs: [
      {
        q: "Omborlarni nima uchun guruhlash kerak?",
        a: "Marketpleyslar va o‘z omborlaringiz ko‘payib borgani sari qoldiqni har bir ombor bo‘yicha alohida kuzatish qiyinlashadi. Guruhlash bir nechta omborni o‘zingizga qulay guruhga — masalan, bir shahar omborlarini bittaga — birlashtirish imkonini beradi.\n\nNatijada qoldiqni umumiy ko‘rish va ular bilan bitta kabinetdan tartibli ishlash osonlashadi (18-dars).",
      },
      {
        q: "Missing holatidagi mahsulotlarni qayerda ko‘raman?",
        a: "«Ombor» bo‘limidagi alohida Missing bo‘limida. U yerda Missing holatidagi mahsulotlar ro‘yxati ko‘rinadi va har birining ma’lumotlarini ochib tekshirish mumkin.\n\nBu bo‘limni muntazam ko‘rib turing: muammoli mahsulotni qancha erta payqasangiz, uni hal qilish shuncha oson bo‘ladi (19-dars).",
      },
      {
        q: "17- va 18-darslarning farqi nimada?",
        a: "Ikkalasi ham omborlarni guruhlash haqida. 17-dars — qisqa ko‘rinish: Omborlar bo‘limiga kirish, mavjud omborlarni ko‘rish va ularni guruhlarga ajratish.\n\n18-dars — to‘liq jarayon: yuqoridagilarga qo‘shimcha ravishda ombor guruhlarini boshqarish va guruhlangan omborlar bilan ishlash ko‘rsatilgan. Tez tanishish uchun 17-darsni, batafsil o‘rganish uchun 18-darsni ko‘ring.",
      },
      {
        q: "Marketpleys omboriga tovar qanday yuboriladi?",
        a: "FBO ta’minlash orqali. Robohub’da yangi ta’minlash yaratasiz, qaysi mahsulotdan qancha yuborilishini tanlaysiz, ma’lumotlarni tekshirasiz va ta’minlashni tayyorlaysiz.\n\nBu jarayon Buyurtmalar mavzusidagi 13-darsda batafsil ko‘rsatilgan.",
      },
    ],
    related: ["order", "analytics"],
  },
  {
    slug: "marketing",
    name: "Marketing",
    short: "Promokodlar, aksiyalar taqvimi, Boost TOP",
    icon: "M3 11l15-6v14L3 13zM7 13v5",
    mainLesson: 21,
    hero: {
      title: "Promokod, aksiya va Boost TOP —",
      highlight: "bitta kabinetda",
      subtitle:
        "Marketpleysdagi marketing vositalarini alohida kabinetlarsiz kuzating va boshqaring.",
      bullets: [
        "Promokodlarni boshqarish",
        "Aksiyalar taqvimi va shartlari",
        "Boost TOP bilan ishlash",
      ],
    },
    problem: {
      title: "Aksiyalarni kuzatib bo‘lmaydi",
      text: "Qaysi aksiya qachon boshlanishi, shartlari va promokodlarni har bir marketpleysda alohida kuzatish kerak.",
    },
    solution: {
      title: "Marketing → Promokodlar → Taqvim",
      text: "Robohub’ning Marketing bo‘limida promokodlar, aksiyalar taqvimi va Boost TOP bir joyda.",
    },
    flow: [
      "Marketing bo‘limini ochasiz",
      "Aksiyalar taqvimi va promokodlarni ko‘rasiz",
      "Boost TOP orqali mahsulotlarni boshqarasiz",
    ],
    features: [
      {
        title: "Promokodlar",
        text: "Promokodlarni ko‘rish va boshqarish.",
        lesson: 20,
      },
      {
        title: "Aksiyalar taqvimi",
        text: "Aksiya sanalari va shartlari bir joyda.",
        lesson: 20,
      },
      {
        title: "Boost TOP",
        text: "Boost TOP ma’lumotlarini ko‘rish va mahsulotlarni boshqarish.",
        lesson: 21,
      },
    ],
    steps: [
      {
        title: "«Marketing» bo‘limiga kiring",
        text: "Chap menyudan Marketing.",
      },
      { title: "Taqvimni ko‘ring", text: "Aksiyalar sanalari va shartlari." },
      {
        title: "Promokodlarni boshqaring",
        text: "Mavjud promokodlar ro‘yxati.",
      },
      {
        title: "Boost TOP’ni oching",
        text: "Mahsulotlarni Boost TOP orqali boshqaring.",
      },
    ],
    faqs: [
      {
        q: "Promokodlarni Robohub’dan boshqarsa bo‘ladimi?",
        a: "Ha. «Marketing» bo‘limida marketpleysdagi promokodlaringizni ko‘rish va boshqarish mumkin — har bir marketpleys kabinetiga alohida kirish shart emas (20-dars).",
      },
      {
        q: "Aksiyalar taqvimida nima ko‘rinadi?",
        a: "Marketpleysdagi aksiyalarning sanalari va shartlari — hammasi bitta taqvimda.\n\nQaysi aksiya qachon boshlanib, qachon tugashini oldindan bilsangiz, unga tayyorlanishga — qoldiqni to‘ldirish va narxni moslashga — vaqtingiz bo‘ladi (20-dars).",
      },
      {
        q: "Boost TOP’da nima qilish mumkin?",
        a: "Boost TOP mahsulotlarni marketpleys qidiruvida yuqoriroq ko‘tarishga yordam beradi. Robohub’ning «Marketing» bo‘limida Boost TOP’ni ochib, uning ma’lumotlarini ko‘rasiz va mahsulotlarni shu funksiya orqali boshqarasiz.\n\nNatijalarni kuzatib, qaysi mahsulotni ko‘tarish samaraliroq ekanini aniqlaysiz (21-dars).",
      },
      {
        q: "Aksiyaga qanday tayyorlanish kerak?",
        a: "Avval aksiyalar taqvimida sana va shartlarni ko‘rib chiqing (20-dars). Keyin aksiyada ishtirok etadigan mahsulotlarning narxini Mahsulotlar bo‘limidan yangilang (15-dars).\n\nNarxni o‘zgartirishdan oldin tannarx va xarajatlar kiritilganini tekshiring — shunda chegirma bilan ham foydada qolishingizni bilasiz (Analitika: 7–8-darslar).",
      },
    ],
    related: ["product", "analytics"],
  },
  {
    slug: "integration",
    name: "Integratsiya",
    short: "Uzum, Wildberries, Yandex va Ozon ulash",
    icon: "M9 7V3M15 7V3M7 7h10v5a5 5 0 0 1-10 0zM12 17v4",
    mainLesson: 22,
    hero: {
      title: "Marketpleys akkauntlarini",
      highlight: "bir necha daqiqada ulang",
      subtitle:
        "Uzum Market, Wildberries, Yandex Market va Ozon akkauntlaringizni Robohub’ga ulab, bitta kabinetdan boshqaring.",
      bullets: [
        "Integratsiya ma’lumotlarini kiritish",
        "Ulanishni tekshirish",
        "Integratsiyani faollashtirish",
      ],
    },
    problem: {
      title: "Boshlashning birinchi qadami",
      text: "Robohub ishlashi uchun marketpleys akkauntlari ulanishi kerak — busiz ma’lumotlar kelmaydi.",
    },
    solution: {
      title: "Integratsiya → marketpleys → ulash",
      text: "Har bir marketpleys bir xil tartibda ulanadi: tanlaysiz, ma’lumotni kiritasiz, tekshirib faollashtirasiz.",
    },
    flow: [
      "«Integratsiya» bo‘limida marketpleysni tanlaysiz",
      "Akkaunt ma’lumotlarini kiritasiz",
      "Ulanishni tekshirib, faollashtirasiz",
    ],
    features: [
      { title: "Uzum Market", text: "Uzum akkauntini ulash.", lesson: 22 },
      { title: "Wildberries", text: "WB akkauntini ulash.", lesson: 23 },
      { title: "Yandex Market", text: "Yandex akkauntini ulash.", lesson: 24 },
      { title: "Ozon", text: "Ozon akkauntini ulash.", lesson: 25 },
    ],
    steps: [
      {
        title: "«Integratsiya» bo‘limiga kiring",
        text: "Chap menyudan Integratsiya.",
      },
      {
        title: "Marketpleysni tanlang",
        text: "Uzum, Wildberries, Yandex yoki Ozon.",
      },
      {
        title: "Ma’lumotlarni kiriting",
        text: "Integratsiya uchun kerakli ma’lumotlar.",
      },
      {
        title: "Tekshiring va faollashtiring",
        text: "Ulanish ishlayotganiga ishonch hosil qiling.",
      },
    ],
    faqs: [
      {
        q: "Qaysi marketpleyslarni ulash mumkin?",
        a: "To‘rtta marketpleysni: Uzum Market, Wildberries, Yandex Market va Ozon. Har biri uchun ulash jarayoni alohida darsda ko‘rsatilgan (22–25-darslar).\n\nBir vaqtning o‘zida bir nechta yoki barchasini ulashingiz mumkin — ular bitta Robohub kabinetida birga ishlaydi.",
      },
      {
        q: "Robohub’ni qayerdan boshlash kerak?",
        a: "Integratsiyadan. Marketpleys akkauntingiz Robohub’ga ulanmaguncha buyurtmalar, mahsulotlar va analitika bo‘limlarida ma’lumot bo‘lmaydi — barcha ma’lumot aynan shu ulanish orqali keladi.\n\nAvval o‘zingiz sotayotgan marketpleysni ulang (masalan, Uzum Market — 22-dars), keyin qolganlarini qo‘shasiz.",
      },
      {
        q: "Ulash uchun nima qilish kerak?",
        a: "Jarayon besh qadamdan iborat: 1) «Integratsiya» bo‘limiga kirasiz; 2) kerakli marketpleysni tanlaysiz; 3) akkauntni ulaysiz; 4) integratsiya ma’lumotlarini kiritasiz; 5) ulanishni tekshirib, faollashtirasiz.\n\nHar bir marketpleys darsida shu qadamlar ekranda ko‘rsatilgan (22–25-darslar).",
      },
      {
        q: "Ulangandan keyin nimani tekshirish kerak?",
        a: "Ulanish tekshirilib, faollashtirilganini. Shu oxirgi qadamdan keyingina ma’lumotlar marketpleysdan Robohub’ga kela boshlaydi.\n\nAgar ulanish faollashtirilmasa, buyurtmalar va mahsulotlar kabinetda ko‘rinmaydi — shuning uchun har bir integratsiya darsining oxirida aynan shu tekshiruv ko‘rsatilgan.",
      },
    ],
    related: ["order", "analytics"],
  },
  {
    slug: "communication",
    name: "Muloqot",
    short: "Chat va sharhlarga avtojavob",
    icon: "M4 5h16v11H8l-4 4z",
    mainLesson: 27,
    hero: {
      title: "Mijozlar bilan muloqot",
      highlight: "bitta oynada",
      subtitle:
        "Marketpleyslardagi yozishmalar va sharhlarga javoblarni bitta kabinetdan boshqaring.",
      bullets: [
        "Chatlar ro‘yxati va yozishmalar",
        "Sharhlarga avtomatik javob",
        "Avtojavob sozlamalari",
      ],
    },
    problem: {
      title: "Xabar va sharhlar tarqoq",
      text: "Mijozlar yozishmalari va sharhlar har bir marketpleysda alohida — ularni o‘z vaqtida ko‘rish qiyin.",
    },
    solution: {
      title: "Chat → xabarlar → avtojavob",
      text: "Robohub’da yozishmalar bitta Chat bo‘limida, sharhlarga esa avtomatik javob berish mumkin.",
    },
    flow: [
      "Mijoz yozadi yoki sharh qoldiradi",
      "Robohub’da Chat yoki Avtojavob bo‘limida ko‘rasiz",
      "Javob berasiz yoki avtojavob ishlaydi",
    ],
    features: [
      {
        title: "Chat",
        text: "Mijozlar bilan yozishmalarni ko‘rish va boshqarish.",
        lesson: 26,
      },
      {
        title: "Avtojavob",
        text: "Sharhlarga avtomatik javob berish va sozlash.",
        lesson: 27,
      },
    ],
    steps: [
      { title: "«Chat» bo‘limini oching", text: "Chatlar ro‘yxati." },
      { title: "Yozishmalarni ko‘ring", text: "Mijoz xabarlari." },
      { title: "«Avtojavob»ga o‘ting", text: "Mijozlar sharhlari." },
      { title: "Sozlamalarni ko‘ring", text: "Avtomatik javob qoidalari." },
    ],
    faqs: [
      {
        q: "Turli marketpleyslardagi chatlar bitta joyda ko‘rinadimi?",
        a: "Ha. «Chat» bo‘limi marketpleyslardagi mijozlar bilan yozishmalarni bitta kabinetga jamlaydi — har bir marketpleysni alohida ochib, xabar qidirish shart emas.\n\nShu sababli birorta mijoz savoli javobsiz qolmaydi (26-dars).",
      },
      {
        q: "Chat bo‘limida nimalar qilish mumkin?",
        a: "Chatlar ro‘yxatini ko‘rish, kerakli mijoz bilan yozishmani ochish va xabarlarni boshqarish.\n\nMijoz savoliga tez javob berish sotuvga va do‘kon reytingiga bevosita ta’sir qiladi — bu bo‘lim shu jarayonni tezlashtiradi (26-dars).",
      },
      {
        q: "Sharhlarga javob berishni avtomatlashtirsa bo‘ladimi?",
        a: "Ha. «Avtojavob» bo‘limida mijozlar sharhlariga avtomatik javob berishni yoqasiz va uning sozlamalarini o‘zingizga moslab o‘zgartirasiz.\n\nShunda har bir sharhga qo‘lda javob yozishga vaqt ketmaydi, mijozlar esa javobsiz qolmaydi (27-dars).",
      },
      {
        q: "Mijozlar sharhlarini qayerda ko‘raman?",
        a: "«Avtojavob» bo‘limida — u yerda mijozlar sharhlari ro‘yxati ko‘rinadi va ularga berilgan javoblarni ham kuzatish mumkin (27-dars).",
      },
    ],
    related: ["marketing", "management"],
  },
  {
    slug: "management",
    name: "Boshqaruv",
    short: "Hujjatlar, xodimlar, rollar va infografika",
    icon: "M16 11a4 4 0 1 0-8 0M4 21a8 8 0 0 1 16 0",
    mainLesson: 29,
    hero: {
      title: "Jamoa va hujjatlar —",
      highlight: "nazorat ostida",
      subtitle:
        "Xodimlarga rol va huquq bering, hujjatlarni boshqaring, savdo ma’lumotlarini infografikada ko‘ring.",
      bullets: [
        "Xodimlar uchun rollar va huquqlar",
        "Hujjatlar ro‘yxati va boshqaruvi",
        "Infografika: ma’lumotlar vizual ko‘rinishda",
      ],
    },
    problem: {
      title: "Jamoada hamma hamma narsani ko‘radi",
      text: "Xodimlar ko‘paygani sari kim nimaga kira olishini va hujjatlar qayerdaligini nazorat qilish qiyinlashadi.",
    },
    solution: {
      title: "Xodimlar → Rollar → Huquqlar",
      text: "Robohub’da har xodimga rol beriladi va rolga kerakli huquqlar belgilanadi. Hujjatlar ham bitta bo‘limda.",
    },
    flow: [
      "Rol yaratasiz",
      "Rolga huquqlarni belgilaysiz",
      "Xodimlar shu huquq bilan ishlaydi",
    ],
    features: [
      {
        title: "Rollar",
        text: "Yangi rol qo‘shish va huquqlarni belgilash.",
        lesson: 29,
      },
      {
        title: "Hujjatlar",
        text: "Hujjatlar ro‘yxati va ularni boshqarish.",
        lesson: 28,
      },
      {
        title: "Infografika",
        text: "Marketpleys ma’lumotlarini vizual ko‘rish.",
        lesson: 30,
      },
    ],
    steps: [
      { title: "«Xodimlar» bo‘limiga kiring", text: "Chap menyudan Xodimlar." },
      { title: "Rollarni oching", text: "Mavjud rollar ro‘yxati." },
      { title: "Yangi rol qo‘shing", text: "Rolga nom bering." },
      {
        title: "Huquqlarni belgilang",
        text: "Rol nimalarga kira olishini tanlang.",
      },
    ],
    faqs: [
      {
        q: "Xodimlarga qanday qilib kirish huquqi beriladi?",
        a: "Rollar orqali. «Xodimlar» bo‘limida Rollar bo‘limini ochasiz, yangi rol qo‘shib, unga nom berasiz va bu rol qaysi bo‘limlarga kira olishini — ya’ni huquqlarini — belgilaysiz.\n\nShundan so‘ng xodim faqat o‘ziga ruxsat berilgan bo‘limlarni ko‘radi: ish tartibli bo‘ladi, muhim ma’lumotlar esa himoyalanadi. Yaratilgan rollarni keyin ham boshqarish mumkin (29-dars).",
      },
      {
        q: "Hujjatlar bo‘limida nima qilish mumkin?",
        a: "Hujjatlar ro‘yxatini ko‘rish, har bir hujjatni ochib uning ma’lumotlarini ko‘rish va hujjatlarni boshqarish (28-dars).",
      },
      {
        q: "Hujjatlarni har bir marketpleys kabinetidan qidirish shartmi?",
        a: "Yo‘q. Marketpleyslar bilan ishlashdagi hujjatlar Robohub’ning Hujjatlar bo‘limida bitta joyga jamlangan.\n\nKerakli hujjatni bir nechta kabinetdan qidirib o‘tirmaysiz — u tez topiladi va nazorat qilish oson bo‘ladi (28-dars).",
      },
      {
        q: "Infografika qayerda va u nima beradi?",
        a: "Infografika O‘quv material bo‘limida joylashgan. U marketpleys ma’lumotlari va savdo ko‘rsatkichlarini jadval o‘rniga vizual ko‘rinishda — grafik va rasmlarda — ko‘rsatadi.\n\nShu tufayli raqamlarni tezroq tushunasiz, tendensiya va o‘zgarishlar bir qarashda ko‘rinadi (30-dars).",
      },
    ],
    related: ["analytics", "communication"],
  },
];

// Bosh sahifadagi "Boshlang'ich yo'l": yangi foydalanuvchi mavzularni shu tartibda ko'radi.
// Birinchi qadamning birinchi darsi — tarix bo'lmasa hero'dagi "Shu yerdan boshlang" darsi.
export const START_TOPICS = ["integration", "product", "order", "analytics"] as const satisfies readonly TopicSlug[];
export type StartTopic = (typeof START_TOPICS)[number];
const START_PATH_UZ: Record<StartTopic, string> = {
  integration: "Marketpleys do‘koningizni Robohub’ga ulang",
  product: "Tovar kartochkalari va narxlarni bir joydan yangilang",
  order: "Barcha marketpleys buyurtmalarini bitta oynada qayta ishlang",
  analytics: "Savdo, xarajat va foydani raqamlarda ko‘ring",
};

// O'zbekcha matnlar — tarjima fayllari bilan bir xil ko'rinishda (content/types.ts)
export type LessonN = (typeof LESSONS_UZ)[number]["n"];

// ───────── Tilga moslash ─────────
// uz — ma'lumot o'zi; ru/en — matn qismi content/ dan almashtiriladi, qolgani (slug, video, sana…) o'zgarmaydi.

function localizeLesson(l: (typeof LESSONS_UZ)[number], locale: Locale): Lesson {
  if (locale === "uz") return l;
  const text: LessonText = CONTENT[locale].lessons[l.n];
  return { ...l, ...text };
}

function localizeTopic(t: Topic, locale: Locale): Topic {
  if (locale === "uz") return t;
  const text: TopicText = CONTENT[locale].topics[t.slug];
  return {
    ...t,
    ...text,
    // xususiyat kartochkalari tartib bo'yicha: dars raqami uz ma'lumotidan
    features: t.features.map((f, i) => ({ ...f, ...text.features[i] })),
  };
}

type LocaleData = { lessons: Lesson[]; sorted: Lesson[]; topics: Topic[] };
const cache = new Map<Locale, LocaleData>();

// Har til uchun bir marta quriladi
function data(locale: Locale): LocaleData {
  let d = cache.get(locale);
  if (!d) {
    const lessons = LESSONS_UZ.map((l) => localizeLesson(l, locale));
    d = {
      lessons,
      // Butun Academy bo'yicha n tartibida (Oldingi / Keyingi dars uchun)
      sorted: [...lessons].sort((a, b) => a.n - b.n),
      topics: TOPICS_UZ.map((t) => localizeTopic(t, locale)),
    };
    cache.set(locale, d);
  }
  return d;
}

// ───────── Hisoblanadigan qiymatlar ─────────

export const TOTAL_LESSONS = LESSONS_UZ.length;
export const TOTAL_TOPICS = TOPICS_UZ.length;

// Matnga bog'liq bo'lmagan ro'yxatlar (statik yo'llar, sitemap): slug va raqamlar hamma tilda bir xil
export const LESSON_ROUTES: Pick<Lesson, "n" | "topic" | "slug" | "uploadDate">[] = LESSONS_UZ;
export const TOPIC_ROUTES: Pick<Topic, "slug" | "mainLesson">[] = TOPICS_UZ;

export function getLessons(locale: Locale): Lesson[] {
  return data(locale).lessons;
}

// Butun Academy bo'yicha n tartibida
export function getLessonsSorted(locale: Locale): Lesson[] {
  return data(locale).sorted;
}

export function getTopics(locale: Locale): Topic[] {
  return data(locale).topics;
}

export function getStartPath(locale: Locale): { topic: StartTopic; step: string }[] {
  const steps = locale === "uz" ? START_PATH_UZ : CONTENT[locale].startPath;
  return START_TOPICS.map((topic) => ({ topic, step: steps[topic] }));
}

export function getTopic(slug: string, locale: Locale): Topic | undefined {
  return getTopics(locale).find((t) => t.slug === slug);
}

export function getLesson(n: number, locale: Locale): Lesson | undefined {
  return getLessons(locale).find((l) => l.n === n);
}

// Dars sahifasi manzilidan: /academy/{topic}/{slug}
export function getLessonBySlug(topic: string, slug: string, locale: Locale): Lesson | undefined {
  return getLessons(locale).find((l) => l.topic === topic && l.slug === slug);
}

export function lessonsByTopic(slug: TopicSlug, locale: Locale): Lesson[] {
  return getLessonsSorted(locale).filter((l) => l.topic === slug);
}

// Mavzu darslari davomiyligi, soniyada (tilga bog'liq emas)
export function topicDuration(slug: TopicSlug): number {
  return LESSONS_UZ.filter((l) => l.topic === slug).reduce((sum, l) => sum + l.durationSec, 0);
}

// "16 daqiqa" — kamida 1 daqiqa
export function topicMinutes(slug: TopicSlug): number {
  return Math.max(1, Math.round(topicDuration(slug) / 60));
}

// Matn so'zlari / 200 → o'qish vaqti (daqiqa)
export function readingTime(topic: Topic): number {
  const parts = [
    topic.hero.title,
    topic.hero.highlight,
    topic.hero.subtitle,
    ...topic.hero.bullets,
    topic.problem.title,
    topic.problem.text,
    topic.solution.title,
    topic.solution.text,
    ...topic.flow,
    ...topic.features.flatMap((f) => [f.title, f.text]),
    ...topic.steps.flatMap((s) => [s.title, s.text]),
    ...visibleFaqs(topic).flatMap((f) => [f.q, f.a]),
  ];
  const words = parts.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// [TODO] bilan boshlangan FAQ'lar ko'rsatilmaydi, lekin ma'lumotda qoladi
export function visibleFaqs(topic: Topic): Topic["faqs"] {
  return topic.faqs.filter((f) => !f.q.startsWith("[TODO") && !f.a.startsWith("[TODO"));
}

export function prevLesson(n: number, locale: Locale): Lesson | undefined {
  const sorted = getLessonsSorted(locale);
  const i = sorted.findIndex((l) => l.n === n);
  return i > 0 ? sorted[i - 1] : undefined;
}

export function nextLesson(n: number, locale: Locale): Lesson | undefined {
  const sorted = getLessonsSorted(locale);
  const i = sorted.findIndex((l) => l.n === n);
  return i >= 0 && i < sorted.length - 1 ? sorted[i + 1] : undefined;
}

// Ro'yxatda keyingi mavzu (oxirgisidan keyin — birinchisi)
export function nextTopic(slug: TopicSlug, locale: Locale): Topic {
  const topics = getTopics(locale);
  const i = topics.findIndex((t) => t.slug === slug);
  return topics[(i + 1) % topics.length];
}

// Qidiruv uchun: kichik harf, o‘/o'/oʻ va g‘/g'/gʻ, ’ farqi yo'q; ruschada ё = е
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[‘’ʻʼ`´']/g, "")
    .replace(/[«»"“”()?!.,:;×—–-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
