import type { Locale } from "@/i18n/config";

// Rasmlar uchun alt-matnlar (TZ "SEO, GEO", 4.2): logotip yonida faqat "Nomi + Robohub" emas, shu brend Robohub'da
// qanday vazifa bajarishini tushuntiruvchi qisqa gap (5–12 so'z). Google/Yandex Rasmlar shu matn bo'yicha topadi,
// ekran o'quvchilar ham shuni o'qiydi. Barcha 7 tilda — sahifa matni bilan bir xil lug'at tamoyilida.
//
//   marketplace — marketpleys (Uzum Market, Wildberries, Kaspi …): Robohub kabinetida boshqariladi
//   stock       — ombor / hisob tizimi (МойСклад, BILLZ, Smartup …): qoldiq va buyurtmalar sinxronlanadi
//   crm         — CRM (Retail CRM): marketpleys buyurtmalari CRM'ga tushadi
//   client      — mijoz logotipi: Robohub orqali marketpleyslarda savdo qiladigan sotuvchi
//   soon        — tez orada ulanadigan marketpleys
//   lesson      — Akademiya video darsi muqovasi (nomi — dars sarlavhasi)
//   review      — mijozning video-sharhi muqovasi (nomi — mijoz)
export type AltKind = "marketplace" | "stock" | "crm" | "client" | "soon" | "lesson" | "review";

const T: Record<AltKind, Record<Locale, (n: string) => string>> = {
  marketplace: {
    uz: (n) => `${n} marketpleysi Robohub kabinetida: buyurtma, qoldiq va narxlar bir joyda`,
    ru: (n) => `Маркетплейс ${n} в кабинете Robohub: заказы, остатки и цены в одном месте`,
    en: (n) => `${n} marketplace in the Robohub dashboard: orders, stock and prices in one place`,
    kk: (n) => `${n} маркетплейсі Robohub кабинетінде: тапсырыс, қалдық және баға бір жерде`,
    ky: (n) => `${n} маркетплейси Robohub кабинетинде: буйрутма, калдык жана баа бир жерде`,
    kaa: (n) => `${n} marketpleysi Robohub kabinetinde: buyırtpa, qaldıq hám bahalar bir jerde`,
    tg: (n) => `Маркетплейси ${n} дар кабинети Robohub: фармоиш, бақия ва нарх дар як ҷо`,
  },
  stock: {
    uz: (n) => `${n} integratsiyasi: Robohub qoldiq va buyurtmalarni avtomatik sinxronlaydi`,
    ru: (n) => `Интеграция ${n} с Robohub: остатки и заказы синхронизируются автоматически`,
    en: (n) => `${n} integration: Robohub syncs stock and orders automatically`,
    kk: (n) => `${n} интеграциясы: Robohub қалдық пен тапсырыстарды автоматты синхрондайды`,
    ky: (n) => `${n} интеграциясы: Robohub калдык жана буйрутмаларды автоматтык шайкештирет`,
    kaa: (n) => `${n} integraciyası: Robohub qaldıq hám buyırtpalardı avtomat sinxronlaydı`,
    tg: (n) => `Интегратсияи ${n} бо Robohub: бақияҳо ва фармоишҳо худкор ҳамоҳанг мешаванд`,
  },
  crm: {
    uz: (n) => `${n} integratsiyasi: marketpleys buyurtmalari Robohub orqali CRM'ga tushadi`,
    ru: (n) => `Интеграция ${n} с Robohub: заказы с маркетплейсов сразу попадают в CRM`,
    en: (n) => `${n} integration: marketplace orders flow into your CRM via Robohub`,
    kk: (n) => `${n} интеграциясы: маркетплейс тапсырыстары Robohub арқылы CRM-ге түседі`,
    ky: (n) => `${n} интеграциясы: маркетплейс буйрутмалары Robohub аркылуу CRM'ге түшөт`,
    kaa: (n) => `${n} integraciyası: marketpleys buyırtpaları Robohub arqalı CRM'ge túsedi`,
    tg: (n) => `Интегратсияи ${n} бо Robohub: фармоишҳои маркетплейс ба CRM мегузаранд`,
  },
  client: {
    uz: (n) => `${n} — Robohub orqali Uzum, Wildberries va Ozon’da savdo qiladigan sotuvchi`,
    ru: (n) => `${n} — продавец на Uzum, Wildberries и Ozon, работает через Robohub`,
    en: (n) => `${n} — a seller on Uzum, Wildberries and Ozon working through Robohub`,
    kk: (n) => `${n} — Robohub арқылы Uzum, Wildberries және Ozon-да сататын сатушы`,
    ky: (n) => `${n} — Robohub аркылуу Uzum, Wildberries жана Ozon’до саткан сатуучу`,
    kaa: (n) => `${n} — Robohub arqalı Uzum, Wildberries hám Ozon’da satatuǵın satıwshı`,
    tg: (n) => `${n} — фурӯшанда дар Uzum, Wildberries ва Ozon, ки тавассути Robohub кор мекунад`,
  },
  review: {
    uz: (n) => `Video sharh: ${n} — marketpleyslarda Robohub bilan ishlash tajribasi`,
    ru: (n) => `Видеоотзыв: ${n} — опыт работы с Robohub на маркетплейсах`,
    en: (n) => `Video review: ${n} — selling on marketplaces with Robohub`,
    kk: (n) => `Бейнепікір: ${n} — маркетплейстерде Robohub-пен жұмыс тәжірибесі`,
    ky: (n) => `Видеопикир: ${n} — маркетплейстерде Robohub менен иштөө тажрыйбасы`,
    kaa: (n) => `Video pikir: ${n} — marketpleyslerde Robohub penen islew tájiriybesi`,
    tg: (n) => `Шарҳи видеоӣ: ${n} — таҷрибаи кор бо Robohub дар маркетплейсҳо`,
  },
  lesson: {
    uz: (n) => `Video dars: ${n} — Robohub Akademiyasi`,
    ru: (n) => `Видеоурок: ${n} — Robohub Academy`,
    en: (n) => `Video lesson: ${n} — Robohub Academy`,
    kk: (n) => `Бейнесабақ: ${n} — Robohub Academy`,
    ky: (n) => `Видеосабак: ${n} — Robohub Academy`,
    kaa: (n) => `Video sabaq: ${n} — Robohub Akademiyası`,
    tg: (n) => `Дарси видеоӣ: ${n} — Robohub Academy`,
  },
  soon: {
    uz: (n) => `${n} marketpleysi — tez orada Robohub kabinetiga ulanadi`,
    ru: (n) => `Маркетплейс ${n} — скоро подключится к кабинету Robohub`,
    en: (n) => `${n} marketplace — coming soon to the Robohub dashboard`,
    kk: (n) => `${n} маркетплейсі — жақында Robohub кабинетіне қосылады`,
    ky: (n) => `${n} маркетплейси — жакында Robohub кабинетине кошулат`,
    kaa: (n) => `${n} marketpleysi — jaqında Robohub kabinetine qosıladı`,
    tg: (n) => `Маркетплейси ${n} — ба наздикӣ ба кабинети Robohub пайваст мешавад`,
  },
};

// alt matni: imgAlt("ru", "stock", "Smartup") → "Интеграция Smartup с Robohub: остатки и заказы синхронизируются автоматически"
export const imgAlt = (locale: Locale, kind: AltKind, name: string) => T[kind][locale](name);

// Marketpleys logotipi fayli → nomi (logotip qatorlari, footer, kalkulyator, orbitalar uchun)
const LOGO_NAME: Record<string, string> = {
  uzum: "Uzum Market",
  wildberries: "Wildberries",
  ozon: "Ozon",
  yandex: "Yandex Market",
  alif: "alif shop",
  "click-outline": "Click",
  zoomrad: "Zoomrad",
  kaspi: "Kaspi.kz",
  halyk: "Halyk Market",
  teez: "Teez",
  mmarket: "MMarket",
  namba: "Namba",
  laklak: "Laklak",
  avval: "Avval",
};
// logoAlt("ru", "/marketplaces/uzum.svg") → "Маркетплейс Uzum Market в кабинете Robohub: …"; noma'lum fayl — ""
export function logoAlt(locale: Locale, src: string): string {
  const key = src.split("/").pop()?.replace(/\.(svg|webp|png)$/, "") ?? "";
  const name = LOGO_NAME[key];
  return name ? imgAlt(locale, "marketplace", name) : "";
}

// Kontent rasmlari (fayl manzili bo'yicha): AI Studio namunalari, kabinet skrinshoti.
// Fayl nomi o'zgarsa — shu yerda ham yangilang.
const SRC_ALT: Record<string, Record<Locale, string>> = {
  "/ai/krem-ishodnoe-foto.webp": {
    uz: "Mahsulotning oddiy fotosi: oq fonda krem bankasi — Robohub AI Studio’gacha",
    ru: "Исходное фото товара: баночка крема на белом фоне — до Robohub AI Studio",
    en: "Original product photo: cream jar on a white background — before Robohub AI Studio",
    kk: "Тауардың бастапқы фотосы: ақ фондағы крем банкасы — Robohub AI Studio-ға дейін",
    ky: "Товардын баштапкы сүрөтү: ак фондогу крем банкасы — Robohub AI Studio’го чейин",
    kaa: "Ónimniń dáslepki súwreti: aq fondaǵı krem bankası — Robohub AI Studio’ǵa shekem",
    tg: "Акси аслии мол: зарфи крем дар заминаи сафед — то Robohub AI Studio",
  },
  "/ai/krem-infografika-sostav.webp": {
    uz: "Tarkibi ko‘rsatilgan krem kartochkasi: avokado, bodom, lavanda — Robohub AI Studio’da yaratilgan",
    ru: "Карточка крема с ингредиентами: авокадо, миндаль, лаванда — создана в Robohub AI Studio",
    en: "Cream product card with ingredients: avocado, almond, lavender — made in Robohub AI Studio",
    kk: "Құрамы көрсетілген крем карточкасы: авокадо, бадам, лаванда — Robohub AI Studio-да жасалған",
    ky: "Курамы көрсөтүлгөн крем карточкасы: авокадо, бадам, лаванда — Robohub AI Studio’до түзүлгөн",
    kaa: "Quramı kórsetilgen krem kartochkası: avokado, bádam, lavanda — Robohub AI Studio’da jaratılǵan",
    tg: "Корти крем бо таркиб: авокадо, бодом, лаванда — дар Robohub AI Studio сохта шуд",
  },
  "/ai/krem-foto-interer.webp": {
    uz: "Krem hammom interyerida — marketpleys uchun foto, Robohub AI Studio",
    ru: "Крем в интерьере ванной — фото для маркетплейса, создано в Robohub AI Studio",
    en: "Cream in a bathroom interior — marketplace photo made in Robohub AI Studio",
    kk: "Крем жуынатын бөлме интерьерінде — маркетплейсқа фото, Robohub AI Studio",
    ky: "Крем ванна бөлмөсүнүн интерьеринде — маркетплейс үчүн сүрөт, Robohub AI Studio",
    kaa: "Krem vanna bólmesi interyerinde — marketpleys ushın foto, Robohub AI Studio",
    tg: "Крем дар интерьери ҳаммом — акс барои маркетплейс, Robohub AI Studio",
  },
  "/ai/krem-lifestyle-foto.webp": {
    uz: "Lifestyle foto: kremni qo‘lga surish — Robohub AI Studio",
    ru: "Лайфстайл-фото: крем наносят на руку — создано в Robohub AI Studio",
    en: "Lifestyle photo: cream being applied to the hand — made in Robohub AI Studio",
    kk: "Лайфстайл фото: кремді қолға жағу — Robohub AI Studio",
    ky: "Лайфстайл сүрөт: кремди колго сүйкөө — Robohub AI Studio",
    kaa: "Layfstayl foto: kremdi qolǵa jaǵıw — Robohub AI Studio",
    tg: "Акси лайфстайл: молидани крем ба даст — Robohub AI Studio",
  },
  "/ai/krem-studiynoe-foto.webp": {
    uz: "Oq fonda kremning studiya fotosi — marketpleys kartochkasi uchun, Robohub AI Studio",
    ru: "Студийное фото крема на белом фоне для карточки маркетплейса — Robohub AI Studio",
    en: "Studio photo of a cream jar on white for a marketplace card — Robohub AI Studio",
    kk: "Ақ фондағы кремнің студиялық фотосы, маркетплейс карточкасына — Robohub AI Studio",
    ky: "Ак фондогу кремдин студиялык сүрөтү, маркетплейс карточкасы үчүн — Robohub AI Studio",
    kaa: "Aq fonda kremniń studiya fotosı, marketpleys kartochkası ushın — Robohub AI Studio",
    tg: "Акси студиявии крем дар заминаи сафед барои корти маркетплейс — Robohub AI Studio",
  },
  "/ai-studio/hero/iphone-desk.webp": {
    uz: "Ish stolidagi iPhone — marketpleys uchun mahsulot fotosi, Robohub AI Studio",
    ru: "iPhone на рабочем столе — фото товара для маркетплейса, создано в Robohub AI Studio",
    en: "iPhone on a desk — marketplace product photo made in Robohub AI Studio",
    kk: "Жұмыс үстеліндегі iPhone — маркетплейсқа тауар фотосы, Robohub AI Studio",
    ky: "Иш столундагы iPhone — маркетплейс үчүн товар сүрөтү, Robohub AI Studio",
    kaa: "Jumıs stolındaǵı iPhone — marketpleys ushın ónim fotosı, Robohub AI Studio",
    tg: "iPhone дар мизи корӣ — акси мол барои маркетплейс, Robohub AI Studio",
  },
  "/ai-studio/hero/iphone-lifestyle.webp": {
    uz: "Lifestyle foto: iPhone ushlagan qiz — oddiy fotodan Robohub AI Studio’da yaratilgan",
    ru: "Лайфстайл-фото: девушка с iPhone — создано из обычного снимка в Robohub AI Studio",
    en: "Lifestyle photo: woman holding an iPhone — made from a plain shot in Robohub AI Studio",
    kk: "Лайфстайл фото: iPhone ұстаған қыз — қарапайым фотодан Robohub AI Studio-да",
    ky: "Лайфстайл сүрөт: iPhone кармаган кыз — жөнөкөй сүрөттөн Robohub AI Studio’до",
    kaa: "Layfstayl foto: iPhone uslaǵan qız — ápiwayı fotodan Robohub AI Studio’da",
    tg: "Акси лайфстайл: духтар бо iPhone — аз акси оддӣ дар Robohub AI Studio",
  },
  "/ai-studio/hero/iphone-cafe.webp": {
    uz: "Kafe stolidagi iPhone — atmosferali mahsulot fotosi, Robohub AI Studio",
    ru: "iPhone на столике в кафе — атмосферное фото товара, Robohub AI Studio",
    en: "iPhone on a café table — atmospheric product photo, Robohub AI Studio",
    kk: "Кафе үстеліндегі iPhone — атмосфералық тауар фотосы, Robohub AI Studio",
    ky: "Кафе столундагы iPhone — атмосфералуу товар сүрөтү, Robohub AI Studio",
    kaa: "Kafe stolındaǵı iPhone — atmosferalı ónim fotosı, Robohub AI Studio",
    tg: "iPhone дар мизи қаҳвахона — акси атмосферии мол, Robohub AI Studio",
  },
  "/ai-studio/hero/iphone-infographic.webp": {
    uz: "Marketpleys kartochkasi uchun iPhone infografikasi — Robohub AI Studio",
    ru: "Инфографика iPhone для карточки маркетплейса — Robohub AI Studio",
    en: "iPhone infographic for a marketplace card — Robohub AI Studio",
    kk: "Маркетплейс карточкасына iPhone инфографикасы — Robohub AI Studio",
    ky: "Маркетплейс карточкасы үчүн iPhone инфографикасы — Robohub AI Studio",
    kaa: "Marketpleys kartochkası ushın iPhone infografikası — Robohub AI Studio",
    tg: "Инфографикаи iPhone барои корти маркетплейс — Robohub AI Studio",
  },
  "/capabilities/ru/products.webp": {
    uz: "Robohub kabineti: barcha marketpleyslardagi mahsulotlar ro‘yxati — narx, qoldiq va holat",
    ru: "Кабинет Robohub: товары со всех маркетплейсов — цены, остатки и статусы",
    en: "Robohub dashboard: products from all marketplaces — prices, stock and statuses",
    kk: "Robohub кабинеті: барлық маркетплейстегі тауарлар — баға, қалдық, мәртебе",
    ky: "Robohub кабинети: бардык маркетплейстеги товарлар — баа, калдык, статус",
    kaa: "Robohub kabineti: barlıq marketpleystegi ónimler — baha, qaldıq, status",
    tg: "Кабинети Robohub: молҳо аз ҳамаи маркетплейсҳо — нарх, бақия ва ҳолат",
  },
};
// srcAlt("ru", "/ai/krem-lifestyle-foto.webp") → tavsif; marketpleys logotipi — logoAlt; boshqasi — "" (bezak)
// /ai/i18n/phone-{til}.webp — har tildagi iPhone infografikasi (AI Studio hero, rejimlar)
export const srcAlt = (locale: Locale, src: string): string =>
  SRC_ALT[/^\/ai\/i18n\/phone-/.test(src) ? "/ai-studio/hero/iphone-infographic.webp" : src]?.[locale] ?? logoAlt(locale, src);
