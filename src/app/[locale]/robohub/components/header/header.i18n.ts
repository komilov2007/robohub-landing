import { defineMessages, localeHref, type Locale } from "@/i18n/config";
import { ACADEMY_PATH } from "@/lib/sites";

// nav — asosiy menyu. menu: "features" — band ustiga sichqoncha kelganda tepadan katta panel tushadi
//   (imkoniyatlar + vositalar). href — bandning o'z havolasi (bosilganda / JS ishlamasa shu yerga o'tadi).
// features / tools — panel ichidagi bandlar: t — nom, d — qisqa izoh. Ikonkalar header.tsx da (shu tartibda).
const academy = (l: Locale, hash: string) => `${localeHref(l, ACADEMY_PATH)}${hash}`;
const page = (l: Locale, path: string) => localeHref(l, path);

export const messages = defineMessages({
  uz: {
    home: "Robohub — bosh sahifa",
    navLabel: "Asosiy menyu",
    nav: [
      { href: "#features", label: "Imkoniyatlar", menu: "features" },
      { href: "#how-it-works", label: "Qanday ishlaydi" },
      { href: "#reviews", label: "Mijozlar" },
      { href: "#pricing", label: "Tariflar" },
      { href: ACADEMY_PATH, label: "Academy" },
    ],
    features: {
      title: "Robohub imkoniyatlari",
      items: [
        { href: "#features", t: "Mahsulotlar va kartochkalar", d: "Bir marta yuklang — bir nechta marketpleysda soting." },
        { href: "#features", t: "Qoldiqlar va omborlar", d: "Platformalar o‘rtasida qoldiqlarni sinxronlash." },
        { href: "#features", t: "Buyurtmalar boshqaruvi", d: "Buyurtmalarni qayta ishlash, etiketkalar va holatlar." },
        { href: "#features", t: "Ichki tahlil", d: "Savdo, foyda va mahsulotlarning unit-iqtisodiyoti." },
        { href: "#features", t: "Tashqi tahlil", d: "Marketpleyslardagi talab, assortiment va raqobatchilar." },
        { href: "#features", t: "Reklama va aksiyalar", d: "Reklama stavkalari va aksiyalarni boshqarish." },
        { href: "#features", t: "Xabarlar va sharhlar", d: "Xaridorlar bilan muloqot va avtomatik javoblar." },
      ],
    },
    soon: "Tez kunda", // "Tez kunda" belgisi (SOON_TOOL)
    tools: {
      title: "Vositalar va integratsiyalar",
      items: [
        { href: page("uz", "/calculator"), t: "Marketpleys kalkulyatori", d: "Savdoni boshlashdan oldin xarajat va foydani hisoblang." },
        { href: page("uz", "/aistudio"), t: "AI studiya", d: "Mahsulot rasmlari va infografikasini yarating." },
        { href: "#integrations", t: "Hisob tizimlari bilan integratsiyalar", d: "Ombor hisobini marketpleyslar bilan bog‘lang." },
        { href: "#regions", t: "Marketpleyslar va mamlakatlar", d: "Savdo uchun yangi platformalar va bozorlarni tanlang." },
        { href: academy("uz", "#help"), t: "Sotuvchilar forumi", d: "Boshqa sotuvchilar bilan tajriba almashing." },
      ],
    },
    lang: "Til tanlash",
    login: "Kirish",
    start: "Ariza qoldirish",   // ochadi: aloqa formasi modalda (contact-modal.tsx)
    menuOpen: "Menyuni ochish",
    menuClose: "Menyuni yopish",
  },
  ru: {
    home: "Robohub — главная",
    navLabel: "Главное меню",
    nav: [
      { href: "#features", label: "Решения", menu: "features" },
      { href: "#how-it-works", label: "Как это работает" },
      { href: "#reviews", label: "Клиенты" },
      { href: "#pricing", label: "Тарифы" },
      { href: localeHref("ru", ACADEMY_PATH), label: "Academy" },
    ],
    features: {
      title: "Возможности Robohub",
      items: [
        { href: "#features", t: "Товары и карточки", d: "Одна загрузка — несколько маркетплейсов." },
        { href: "#features", t: "Остатки и склады", d: "Синхронизация остатков между площадками." },
        { href: "#features", t: "Управление заказами", d: "Обработка заказов, этикетки и статусы." },
        { href: "#features", t: "Внутренняя аналитика", d: "Продажи, прибыль и юнит-экономика товаров." },
        { href: "#features", t: "Внешняя аналитика", d: "Спрос, ассортимент и конкуренты на маркетплейсах." },
        { href: "#features", t: "Реклама и акции", d: "Управление ставками и продвижением." },
        { href: "#features", t: "Сообщения и отзывы", d: "Общение с покупателями и автоматические ответы." },
      ],
    },
    soon: "Скоро", // "Tez kunda" belgisi (SOON_TOOL)
    tools: {
      title: "Инструменты и интеграции",
      items: [
        { href: page("ru", "/calculator"), t: "Калькулятор маркетплейсов", d: "Рассчитайте расходы и прибыль до начала продаж." },
        { href: page("ru", "/aistudio"), t: "AI-студия", d: "Создавайте изображения и инфографику товаров." },
        { href: "#integrations", t: "Интеграции с системами учёта", d: "Свяжите складской учёт с маркетплейсами." },
        { href: "#regions", t: "Маркетплейсы и страны", d: "Выбирайте новые площадки и рынки для продаж." },
        { href: academy("ru", "#help"), t: "Форум продавцов", d: "Делитесь опытом с другими продавцами." },
      ],
    },
    lang: "Выбор языка",
    login: "Войти",
    start: "Оставить заявку",
    menuOpen: "Открыть меню",
    menuClose: "Закрыть меню",
  },
  en: {
    home: "Robohub — home",
    navLabel: "Main menu",
    nav: [
      { href: "#features", label: "Solutions", menu: "features" },
      { href: "#how-it-works", label: "How it works" },
      { href: "#reviews", label: "Customers" },
      { href: "#pricing", label: "Pricing" },
      { href: localeHref("en", ACADEMY_PATH), label: "Academy" },
    ],
    features: {
      title: "Robohub features",
      items: [
        { href: "#features", t: "Products and listings", d: "Upload once — sell on several marketplaces." },
        { href: "#features", t: "Stock and warehouses", d: "Stock levels synced across platforms." },
        { href: "#features", t: "Order management", d: "Order processing, labels and statuses." },
        { href: "#features", t: "Internal analytics", d: "Sales, profit and unit economics per product." },
        { href: "#features", t: "Market analytics", d: "Demand, assortment and competitors on marketplaces." },
        { href: "#features", t: "Ads and promotions", d: "Manage bids and promotions." },
        { href: "#features", t: "Messages and reviews", d: "Customer communication and automatic replies." },
      ],
    },
    soon: "Soon", // "Tez kunda" belgisi (SOON_TOOL)
    tools: {
      title: "Tools and integrations",
      items: [
        { href: page("en", "/calculator"), t: "Marketplace calculator", d: "Work out costs and profit before you start selling." },
        { href: page("en", "/aistudio"), t: "AI studio", d: "Create product images and infographics." },
        { href: "#integrations", t: "Accounting integrations", d: "Connect your inventory system to marketplaces." },
        { href: "#regions", t: "Marketplaces and countries", d: "Pick new platforms and markets to sell on." },
        { href: academy("en", "#help"), t: "Seller forum", d: "Share experience with other sellers." },
      ],
    },
    lang: "Choose language",
    login: "Log in",
    start: "Get in touch",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
  kk: {
    home: "Robohub — басты бет",
    navLabel: "Негізгі мәзір",
    nav: [
      { href: "#features", label: "Мүмкіндіктер", menu: "features" },
      { href: "#how-it-works", label: "Қалай жұмыс істейді" },
      { href: "#reviews", label: "Клиенттер" },
      { href: "#pricing", label: "Тарифтер" },
      { href: localeHref("kk", ACADEMY_PATH), label: "Academy" },
    ],
    features: {
      title: "Robohub мүмкіндіктері",
      items: [
        { href: "#features", t: "Тауарлар мен карточкалар", d: "Бір рет жүктеңіз — бірнеше маркетплейсте сатыңыз." },
        { href: "#features", t: "Қалдықтар мен қоймалар", d: "Алаңдар арасында қалдықтарды синхрондау." },
        { href: "#features", t: "Тапсырыстарды басқару", d: "Тапсырыстарды өңдеу, жапсырмалар мен мәртебелер." },
        { href: "#features", t: "Ішкі аналитика", d: "Сатылым, пайда және тауарлардың юнит-экономикасы." },
        { href: "#features", t: "Сыртқы аналитика", d: "Маркетплейстердегі сұраныс, ассортимент және бәсекелестер." },
        { href: "#features", t: "Жарнама және акциялар", d: "Жарнама ставкалары мен акцияларды басқару." },
        { href: "#features", t: "Хабарламалар мен пікірлер", d: "Сатып алушылармен байланыс және автоматты жауаптар." },
      ],
    },
    soon: "Жақында", // "Tez kunda" belgisi (SOON_TOOL)
    tools: {
      title: "Құралдар мен интеграциялар",
      items: [
        { href: page("kk", "/calculator"), t: "Маркетплейс калькуляторы", d: "Сатуды бастамас бұрын шығын мен пайданы есептеңіз." },
        { href: page("kk", "/aistudio"), t: "AI студия", d: "Тауар суреттері мен инфографикасын жасаңыз." },
        { href: "#integrations", t: "Есеп жүйелерімен интеграциялар", d: "Қойма есебін маркетплейстермен байланыстырыңыз." },
        { href: "#regions", t: "Маркетплейстер мен елдер", d: "Сауда үшін жаңа алаңдар мен нарықтарды таңдаңыз." },
        { href: academy("kk", "#help"), t: "Сатушылар форумы", d: "Басқа сатушылармен тәжірибе алмасыңыз." },
      ],
    },
    lang: "Тілді таңдау",
    login: "Кіру",
    start: "Өтінім қалдыру",
    menuOpen: "Мәзірді ашу",
    menuClose: "Мәзірді жабу",
  },
  ky: {
    home: "Robohub — башкы бет",
    navLabel: "Негизги меню",
    nav: [
      { href: "#features", label: "Мүмкүнчүлүктөр", menu: "features" },
      { href: "#how-it-works", label: "Кантип иштейт" },
      { href: "#reviews", label: "Кардарлар" },
      { href: "#pricing", label: "Тарифтер" },
      { href: localeHref("ky", ACADEMY_PATH), label: "Academy" },
    ],
    features: {
      title: "Robohub мүмкүнчүлүктөрү",
      items: [
        { href: "#features", t: "Товарлар жана карточкалар", d: "Бир жолу жүктөңүз — бир нече маркетплейсте сатыңыз." },
        { href: "#features", t: "Калдыктар жана кампалар", d: "Аянтчалар ортосунда калдыктарды синхрондоо." },
        { href: "#features", t: "Буйрутмаларды башкаруу", d: "Буйрутмаларды иштетүү, этикеткалар жана статустар." },
        { href: "#features", t: "Ички аналитика", d: "Сатуулар, пайда жана товарлардын юнит-экономикасы." },
        { href: "#features", t: "Тышкы аналитика", d: "Маркетплейстердеги суроо-талап, ассортимент жана атаандаштар." },
        { href: "#features", t: "Жарнама жана акциялар", d: "Жарнама ставкаларын жана акцияларды башкаруу." },
        { href: "#features", t: "Билдирүүлөр жана сын-пикирлер", d: "Сатып алуучулар менен баарлашуу жана автоматтык жооптор." },
      ],
    },
    soon: "Жакында", // "Tez kunda" belgisi (SOON_TOOL)
    tools: {
      title: "Куралдар жана интеграциялар",
      items: [
        { href: page("ky", "/calculator"), t: "Маркетплейс калькулятору", d: "Сатууну баштоодон мурун чыгым менен пайданы эсептеңиз." },
        { href: page("ky", "/aistudio"), t: "AI студия", d: "Товардын сүрөттөрүн жана инфографикасын түзүңүз." },
        { href: "#integrations", t: "Эсеп системалары менен интеграциялар", d: "Кампа эсебин маркетплейстер менен байланыштырыңыз." },
        { href: "#regions", t: "Маркетплейстер жана өлкөлөр", d: "Соода үчүн жаңы аянтчаларды жана рынокторду тандаңыз." },
        { href: academy("ky", "#help"), t: "Сатуучулар форуму", d: "Башка сатуучулар менен тажрыйба алмашыңыз." },
      ],
    },
    lang: "Тилди тандоо",
    login: "Кирүү",
    start: "Өтүнмө калтыруу",
    menuOpen: "Менюну ачуу",
    menuClose: "Менюну жабуу",
  },
  kaa: {
    home: "Robohub — bas bet",
    navLabel: "Tiykarǵı menyu",
    nav: [
      { href: "#features", label: "Múmkinshilikler", menu: "features" },
      { href: "#how-it-works", label: "Qalay isleydi" },
      { href: "#reviews", label: "Klientler" },
      { href: "#pricing", label: "Tarifler" },
      { href: localeHref("kaa", ACADEMY_PATH), label: "Academy" },
    ],
    features: {
      title: "Robohub múmkinshilikleri",
      items: [
        { href: "#features", t: "Ónimler hám kartochkalar", d: "Bir ret júkleń — bir neshe marketpleyste satıń." },
        { href: "#features", t: "Qaldıqlar hám skladlar", d: "Platformalar arasında qaldıqlardı sinxronlaw." },
        { href: "#features", t: "Buyırtpalardı basqarıw", d: "Buyırtpalardı qayta islew, etiketkalar hám statuslar." },
        { href: "#features", t: "Ishki analitika", d: "Satıw, payda hám ónimlerdiń unit-ekonomikası." },
        { href: "#features", t: "Sırtqı analitika", d: "Marketpleyslerdegi talap, assortiment hám básekilesler." },
        { href: "#features", t: "Reklama hám aksiyalar", d: "Reklama stavkaları hám aksiyalardı basqarıw." },
        { href: "#features", t: "Xabarlar hám pikirler", d: "Satıp alıwshılar menen sóylesiw hám avtomat juwaplar." },
      ],
    },
    soon: "Tez arada", // "Tez kunda" belgisi (SOON_TOOL)
    tools: {
      title: "Qurallar hám integraciyalar",
      items: [
        { href: page("kaa", "/calculator"), t: "Marketpleys kalkulyatorı", d: "Satıwdı baslawdan aldın qárejet hám paydanı esaplań." },
        { href: page("kaa", "/aistudio"), t: "AI studiya", d: "Ónim súwretleri hám infografikasın jaratıń." },
        { href: "#integrations", t: "Esap sistemaları menen integraciyalar", d: "Sklad esabın marketpleysler menen baylanıstırıń." },
        { href: "#regions", t: "Marketpleysler hám mámleketler", d: "Sawda ushın jańa platformalar hám bazarlardı tańlań." },
        { href: academy("kaa", "#help"), t: "Satıwshılar forumı", d: "Basqa satıwshılar menen tájiriybe almasıń." },
      ],
    },
    lang: "Til tańlaw",
    login: "Kiriw",
    start: "Arza qaldırıw",
    menuOpen: "Menyunı ashıw",
    menuClose: "Menyunı jabıw",
  },
  tg: {
    home: "Robohub — саҳифаи асосӣ",
    navLabel: "Менюи асосӣ",
    nav: [
      { href: "#features", label: "Имкониятҳо", menu: "features" },
      { href: "#how-it-works", label: "Чӣ тавр кор мекунад" },
      { href: "#reviews", label: "Мизоҷон" },
      { href: "#pricing", label: "Тарифҳо" },
      { href: localeHref("tg", ACADEMY_PATH), label: "Academy" },
    ],
    features: {
      title: "Имкониятҳои Robohub",
      items: [
        { href: "#features", t: "Маҳсулот ва кортҳо", d: "Як маротиба бор кунед — дар якчанд маркетплейс фурӯшед." },
        { href: "#features", t: "Боқимонда ва анборҳо", d: "Ҳамоҳангсозии боқимонда байни платформаҳо." },
        { href: "#features", t: "Идоракунии фармоишҳо", d: "Коркарди фармоишҳо, тамғаҳо ва ҳолатҳо." },
        { href: "#features", t: "Таҳлили дохилӣ", d: "Фурӯш, фоида ва юнит-иқтисоди маҳсулот." },
        { href: "#features", t: "Таҳлили берунӣ", d: "Талабот, ассортимент ва рақибон дар маркетплейсҳо." },
        { href: "#features", t: "Реклама ва аксияҳо", d: "Идоракунии ставкаҳои реклама ва аксияҳо." },
        { href: "#features", t: "Паёмҳо ва шарҳҳо", d: "Муошират бо харидорон ва ҷавобҳои худкор." },
      ],
    },
    soon: "Ба наздикӣ", // "Tez kunda" belgisi (SOON_TOOL)
    tools: {
      title: "Абзорҳо ва интегратсияҳо",
      items: [
        { href: page("tg", "/calculator"), t: "Ҳисобкунаки маркетплейс", d: "Пеш аз оғози фурӯш хароҷот ва фоидаро ҳисоб кунед." },
        { href: page("tg", "/aistudio"), t: "AI студия", d: "Тасвирҳо ва инфографикаи маҳсулот эҷод кунед." },
        { href: "#integrations", t: "Интегратсия бо системаҳои баҳисобгирӣ", d: "Баҳисобгирии анборро бо маркетплейсҳо пайваст кунед." },
        { href: "#regions", t: "Маркетплейсҳо ва кишварҳо", d: "Барои фурӯш платформаҳо ва бозорҳои нав интихоб кунед." },
        { href: academy("tg", "#help"), t: "Форуми фурӯшандагон", d: "Бо дигар фурӯшандагон таҷриба мубодила кунед." },
      ],
    },
    lang: "Интихоби забон",
    login: "Ворид шудан",
    start: "Дархост гузоштан",
    menuOpen: "Кушодани меню",
    menuClose: "Пӯшидани меню",
  },
});
