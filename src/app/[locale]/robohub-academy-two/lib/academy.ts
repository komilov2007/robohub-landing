// Robohub Academy — barcha kontent shu faylda (Robohub_academy.md, 4-bo'lim).
// Yangi dars qo'shish = LESSONS ga bitta obyekt. Hisoblagichlar (dars soni, davomiylik,
// "X / Y ko'rildi") pastdagi funksiyalar orqali avtomatik hisoblanadi — qo'lda yozilmaydi.

export type TopicSlug =
  | "analitika"
  | "buyurtmalar"
  | "mahsulotlar"
  | "ombor"
  | "marketing"
  | "integratsiya"
  | "muloqot"
  | "boshqaruv";

export type Lesson = {
  n: number; // dars raqami (YouTube’dagi raqam)
  topic: TopicSlug;
  title: string; // savol yoki qisqa nom; "Dars N." va "| Robohub Academy" qismlarisiz
  youtubeId: string;
  durationSec: number;
  summary: string; // 1–2 jumla, video tavsifidan
  points: string[]; // "Ushbu darsda" bandlari, video tavsifidan
  chapters?: { t: number; label: string }[]; // hozircha yo‘q — bo‘sh bo‘lsa UI’da yashiriladi
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

export const LESSONS: Lesson[] = [
  // ───────── ANALITIKA ─────────
  {
    n: 1,
    topic: "analitika",
    youtubeId: "geJGHvgNYSU",
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
    topic: "analitika",
    youtubeId: "yQntyQz0ae8",
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
    topic: "analitika",
    youtubeId: "yFDhiVW2dTA",
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
    topic: "analitika",
    youtubeId: "M5GKdIVX4Us",
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
    topic: "analitika",
    youtubeId: "hw371gPXUTo",
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
    topic: "analitika",
    youtubeId: "CWADO6bBMnU",
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
    topic: "analitika",
    youtubeId: "z0EQOhbSbuU",
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
    topic: "analitika",
    youtubeId: "-iB19I6UtwQ",
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
  {
    n: 9,
    topic: "analitika",
    youtubeId: "vwJhmZPC4Wo",
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

  // ───────── BUYURTMALAR ─────────
  {
    n: 10,
    topic: "buyurtmalar",
    youtubeId: "y0Xe8qDqHro",
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
    topic: "buyurtmalar",
    youtubeId: "ZRE4M_iS7H8",
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
    topic: "buyurtmalar",
    youtubeId: "FtW23fKXnN4",
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
    topic: "buyurtmalar",
    youtubeId: "W6QBxo4Jm-E",
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
    topic: "buyurtmalar",
    youtubeId: "usn42-uteE0",
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
    topic: "mahsulotlar",
    youtubeId: "USw1TXNTxVU",
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
    topic: "mahsulotlar",
    youtubeId: "ouMMqJbYhGw",
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
    topic: "ombor",
    youtubeId: "xCjFvvMies4",
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
    topic: "ombor",
    youtubeId: "8_HqpQ2liF4",
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
    topic: "ombor",
    youtubeId: "BYVgxVWHqbY",
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
    youtubeId: "acDq6mpcpOQ",
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
    youtubeId: "88BmPwiPbQg",
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
    topic: "integratsiya",
    youtubeId: "BNVMZkfh1Kw",
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
    topic: "integratsiya",
    youtubeId: "7YS6oz2mfmg",
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
    topic: "integratsiya",
    youtubeId: "Sjm7IY0vEEw",
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
    topic: "integratsiya",
    youtubeId: "kEdebBEmSE8",
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
    topic: "muloqot",
    youtubeId: "A-zrwNSJ4CI",
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
    topic: "muloqot",
    youtubeId: "tVftiOSqyRU",
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
    topic: "boshqaruv",
    youtubeId: "vVKsmqrH5G8",
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
    topic: "boshqaruv",
    youtubeId: "-ARIBJe5Yp0",
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
    topic: "boshqaruv",
    youtubeId: "K8Umz2xReGs",
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
];

export const TOPICS: Topic[] = [
  {
    slug: "analitika",
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
        q: "Nima uchun tannarxni kiritish kerak?",
        a: "Tannarxsiz savdo summasi foydani ko‘rsatmaydi. Tannarx, marketpleys xarajatlari va operatsion xarajatlar hisobga olingandagina real natija ko‘rinadi.",
      },
      {
        q: "ABC va XYZ tahlilining farqi nimada?",
        a: "ABC mahsulotning biznes natijasidagi ahamiyatini, XYZ esa unga bo‘lgan talab qanchalik barqarorligini ko‘rsatadi. Ikkalasini birga ishlatsa, 9 ta guruh hosil bo‘ladi.",
      },
      {
        q: "Qaysi xarajatlar ko‘rinadi?",
        a: "Operatsion xarajatlar, marketpleys komissiyalari, logistika, reklama, saqlash, jarima va boshqa xarajatlar.",
      },
    ],
    related: ["buyurtmalar", "ombor"],
  },
  {
    slug: "buyurtmalar",
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
        a: "Darslarda Uzum Market, Wildberries va Yandex Market buyurtmalarini qayta ishlash ko‘rsatilgan.",
      },
      {
        q: "FBO ta’minlash nima uchun kerak?",
        a: "Marketpleys omboriga mahsulot yuborish uchun. Unda mahsulotlar va ularning miqdori tanlanadi.",
      },
      { q: "[TODO: savol]", a: "[TODO: javob — mahsulot jamoasidan]" },
    ],
    related: ["ombor", "integratsiya"],
  },
  {
    slug: "mahsulotlar",
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
        a: "Narxni Robohub’da o‘zgartirib, marketpleysga yuborasiz — bu jarayon 15-darsda ko‘rsatilgan.",
      },
      { q: "[TODO: savol]", a: "[TODO: javob]" },
    ],
    related: ["marketing", "ombor"],
  },
  {
    slug: "ombor",
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
        q: "Missing nima?",
        a: "Ombor bo‘limidagi alohida bo‘lim: unda Missing holatidagi mahsulotlar va ular haqidagi ma’lumotlar ko‘rinadi (19-dars).",
      },
      {
        q: "Omborlarni nima uchun guruhlash kerak?",
        a: "Omborlar ko‘p bo‘lsa, guruhlash ular bilan bitta kabinetdan tartibli ishlashga yordam beradi (18-dars).",
      },
      { q: "[TODO: savol]", a: "[TODO: javob]" },
    ],
    related: ["buyurtmalar", "analitika"],
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
    faqs: [{ q: "[TODO: savol]", a: "[TODO: javob]" }],
    related: ["mahsulotlar", "analitika"],
  },
  {
    slug: "integratsiya",
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
        a: "Uzum Market, Wildberries, Yandex Market va Ozon — har biri uchun alohida dars bor.",
      },
      { q: "[TODO: savol]", a: "[TODO: javob]" },
    ],
    related: ["buyurtmalar", "analitika"],
  },
  {
    slug: "muloqot",
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
    faqs: [{ q: "[TODO: savol]", a: "[TODO: javob]" }],
    related: ["marketing", "boshqaruv"],
  },
  {
    slug: "boshqaruv",
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
    faqs: [{ q: "[TODO: savol]", a: "[TODO: javob]" }],
    related: ["analitika", "muloqot"],
  },
];

// ───────── Hisoblanadigan qiymatlar ─────────

export const TOTAL_LESSONS = LESSONS.length;
export const TOTAL_TOPICS = TOPICS.length;

// Butun Academy bo'yicha n tartibida (Oldingi / Keyingi dars uchun)
export const LESSONS_SORTED: Lesson[] = [...LESSONS].sort((a, b) => a.n - b.n);

export function getTopic(slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug === slug);
}

export function getLesson(n: number): Lesson | undefined {
  return LESSONS.find((l) => l.n === n);
}

export function lessonsByTopic(slug: TopicSlug): Lesson[] {
  return LESSONS_SORTED.filter((l) => l.topic === slug);
}

// Mavzu darslari davomiyligi, soniyada
export function topicDuration(slug: TopicSlug): number {
  return lessonsByTopic(slug).reduce((sum, l) => sum + l.durationSec, 0);
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

export function prevLesson(n: number): Lesson | undefined {
  const i = LESSONS_SORTED.findIndex((l) => l.n === n);
  return i > 0 ? LESSONS_SORTED[i - 1] : undefined;
}

export function nextLesson(n: number): Lesson | undefined {
  const i = LESSONS_SORTED.findIndex((l) => l.n === n);
  return i >= 0 && i < LESSONS_SORTED.length - 1 ? LESSONS_SORTED[i + 1] : undefined;
}

// Ro'yxatda keyingi mavzu (oxirgisidan keyin — birinchisi)
export function nextTopic(slug: TopicSlug): Topic {
  const i = TOPICS.findIndex((t) => t.slug === slug);
  return TOPICS[(i + 1) % TOPICS.length];
}

// Qidiruv uchun: kichik harf, o‘/o'/oʻ va g‘/g'/gʻ, ’ farqi yo'q
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[‘’ʻʼ`´']/g, "")
    .replace(/[«»"“”()?!.,:;×—–-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
