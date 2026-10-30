import { defineMessages, type Locale } from "@/i18n/config";
import { CALC_MESSAGES } from "./components/calculator/calculator.messages";
import { SECTIONS } from "./sections.content";

// Kalkulyator landingining matnlari — barcha tillarda (config.ts). Ikki manba:
//   • rb-market'ning o'z landing matnlari (calc_landing_*, calc_about_*, FAQ) — CALC_MESSAGES dan, o'zgarishsiz;
//   • yangi bo'limlar (hero vizuali, "komissiya — hammasi emas", imkoniyatlar, yakuniy CTA) — TEXT da.
// Faqat server komponentlarda (page.tsx) chaqiriladi: client'ga tayyor obyekt prop orqali boradi.
// Hero va "Muammo" bo'limidagi misol — api.robohub.uz/api/public/calculator/uzum/ ning haqiqiy javobi:
//   Uzum · "Foydali qo'shimchalar" · FBO · narx 150 000, tannarx 80 000, quti 200×150×100 mm →
//   komissiya 15% = 22 500, yetkazish 5 750, foyda 41 750, marja 27.83%, ROI 52.19%.

export const SIGNUP_HREF = "https://robohub.uz/register";   // (endi ishlatilmaydi: "boshlash" tugmalari Robohub landingiga — finale.tsx)
export const LOGIN_HREF = "https://seller.robohub.uz";

export const EXAMPLE = {
  price: 150000,
  commissionPercent: 15,
  commission: 22500,
  logistics: 5750,
  cost: 80000,
  profit: 41750,
  margin: "27.8",
  roi: "52.2",
  /** "faqat komissiyani hisoblagan" sotuvchi o'ylaydigan foyda: 150 000 − 15% */
  naive: 127500,
} as const;

const NAV = ["#why", "#calculator", "#how", "#faq"] as const;

const TEXT = defineMessages({
  uz: {
    ui: {
      home: "Bosh sahifa",
      mainMenu: "Asosiy menyu",
      lang: "Til tanlash",
      login: "Kirish",
      start: "Bepul boshlash",
      menuOpen: "Menyuni ochish",
      menuClose: "Menyuni yopish",
      tag: "Kalkulyator",
    },
    nav: ["Nega kerak", "Kalkulyator", "Qanday ishlaydi", "Savollar"],
    hero: {
      // H1 boshi — kalit ibora (qidiruv uchun), savol ustida kichik qator bo'lib ko'rinadi (TZ 8.1)

      kicker: "Uzum, Wildberries, Ozon va Yandex Market uchun foyda kalkulyatori",

      titleBefore: "Sotuvdan sizga",
      titleMark: "qancha foyda",
      titleAfter: "qoladi?",
      howCta: "Qanday ishlaydi",
      notes: ["Bepul", "Ro‘yxatdan o‘tmasdan", "Hech narsa saqlanmaydi"],
      pick: "To‘rtta marketpleys uchun hisoblaymiz",
      receipt: {
        tag: "Haqiqiy tarif bo‘yicha",
        title: "Xaridor to‘lagan pul qayerga ketadi?",
        example: "Misol · Uzum Market · FBO",
        product: "Foydali qo‘shimchalar",
        price: "Xaridor to‘laydi",
        commission: "Komissiya",
        logistics: "Yetkazib berish",
        cost: "Tannarx",
        profit: "Sizga qoladi",
        margin: "Marja",
        roi: "ROI",
        currency: "so‘m",
      },
    },
    why: {
      eyebrow: "Muammo",
      title: "Komissiya —",
      accent: "hali hammasi emas",
      mythTag: "Ko‘pchilik shunday hisoblaydi",
      mythFormula: "150 000 − 15% komissiya",
      mythResult: "foyda",
      realTag: "Aslida",
      realResult: "foyda",
      gap: "3 baravar kam",
      cta: "O‘zingiznikini hisoblang",
    },
    calc: {
      eyebrow: "Kalkulyator",
      title: "Raqamlarni kiriting —",
      accent: "foyda darhol ko‘rinadi",
      lead: "Kategoriya, narx va o‘lcham yetarli — komissiya, yetkazish va to‘lovni har bir marketpleysning o‘z tariflari bo‘yicha hisoblaymiz.",
    },
    features: {
      eyebrow: "Imkoniyatlar",
      extra: [
        { title: "Raqobatchilar narxi", text: "O‘xshash mahsulotlarni topib, narxingiz bozorda qayerda turganini ko‘rsatamiz." },
        { title: "Havoladan to‘ldirish", text: "Uzum yoki Wildberries havolasini qo‘ying — nomi, narxi va kategoriyasi o‘zi yoziladi." },
        { title: "AI kategoriya", text: "Mahsulot nomini yozing — AI har bir marketpleys uchun mos kategoriyani taklif qiladi." },
      ],
    },
    compare: { sample: "Namuna", profit: "foyda" },
    final: {
      title: "Har bir mahsulot foydasi —",
      accent: "bitta kabinetda",
      cta: "Hoziroq boshlash",
      back: "Kalkulyatorga qaytish",
      notes: ["4 marketpleys", "Buyurtma va qoldiqlar", "Har bir mahsulot foydasi"],
    },
    faq: { tg: "Telegram’da so‘rang" },
    footer: {
      calc: "Kalkulyator",
      robohub: "Robohub",
      links: { home: "Bosh sahifa", studio: "AI Studio", academy: "Academy", cabinet: "Sotuvchi kabineti" },
      contacts: "Aloqa",
    },
  },
  ru: {
    ui: {
      home: "Главная",
      mainMenu: "Главное меню",
      lang: "Выбор языка",
      login: "Войти",
      start: "Начать бесплатно",
      menuOpen: "Открыть меню",
      menuClose: "Закрыть меню",
      tag: "Калькулятор",
    },
    nav: ["Зачем", "Калькулятор", "Как работает", "Вопросы"],
    hero: {
      // H1 boshi — kalit ibora (qidiruv uchun), savol ustida kichik qator bo'lib ko'rinadi (TZ 8.1)

      kicker: "Калькулятор прибыли для Uzum, Wildberries, Ozon и Яндекс Маркета",

      titleBefore: "Сколько",
      titleMark: "прибыли остаётся",
      titleAfter: "с продажи?",
      howCta: "Как это работает",
      notes: ["Бесплатно", "Без регистрации", "Ничего не сохраняется"],
      pick: "Считаем для четырёх маркетплейсов",
      receipt: {
        tag: "По реальному тарифу",
        title: "Куда уходят деньги покупателя?",
        example: "Пример · Uzum Market · FBO",
        product: "Полезные добавки",
        price: "Платит покупатель",
        commission: "Комиссия",
        logistics: "Доставка",
        cost: "Себестоимость",
        profit: "Остаётся вам",
        margin: "Маржа",
        roi: "ROI",
        currency: "сум",
      },
    },
    why: {
      eyebrow: "Проблема",
      title: "Комиссия —",
      accent: "это ещё не всё",
      mythTag: "Так считают многие",
      mythFormula: "150 000 − 15% комиссии",
      mythResult: "прибыли",
      realTag: "На самом деле",
      realResult: "прибыли",
      gap: "в 3 раза меньше",
      cta: "Посчитайте свой товар",
    },
    calc: {
      eyebrow: "Калькулятор",
      title: "Введите цифры —",
      accent: "прибыль видна сразу",
      lead: "Достаточно категории, цены и размеров — комиссию, доставку и оплату считаем по собственным тарифам каждого маркетплейса.",
    },
    features: {
      eyebrow: "Возможности",
      extra: [
        { title: "Цены конкурентов", text: "Найдём похожие товары и покажем, где ваша цена стоит на рынке." },
        { title: "Заполнение по ссылке", text: "Вставьте ссылку Uzum или Wildberries — название, цена и категория подставятся сами." },
        { title: "AI-категория", text: "Напишите название товара — AI предложит подходящую категорию на каждом маркетплейсе." },
      ],
    },
    compare: { sample: "Пример", profit: "прибыль" },
    final: {
      title: "Прибыль каждого товара —",
      accent: "в одном кабинете",
      cta: "Начать сейчас",
      back: "Вернуться к калькулятору",
      notes: ["4 маркетплейса", "Заказы и остатки", "Прибыль каждого товара"],
    },
    faq: { tg: "Спросить в Telegram" },
    footer: {
      calc: "Калькулятор",
      robohub: "Robohub",
      links: { home: "Главная", studio: "AI Studio", academy: "Academy", cabinet: "Кабинет продавца" },
      contacts: "Контакты",
    },
  },
  en: {
    ui: {
      home: "Home",
      mainMenu: "Main menu",
      lang: "Choose language",
      login: "Log in",
      start: "Start free",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      tag: "Calculator",
    },
    nav: ["Why", "Calculator", "How it works", "FAQ"],
    hero: {
      // H1 boshi — kalit ibora (qidiruv uchun), savol ustida kichik qator bo'lib ko'rinadi (TZ 8.1)

      kicker: "Profit calculator for Uzum, Wildberries, Ozon and Yandex Market",

      titleBefore: "How much",
      titleMark: "profit is left",
      titleAfter: "after a sale?",
      howCta: "How it works",
      notes: ["Free", "No sign-up", "Nothing is saved"],
      pick: "We price all four marketplaces",
      receipt: {
        tag: "Real tariffs",
        title: "Where does the buyer’s money go?",
        example: "Example · Uzum Market · FBO",
        product: "Dietary supplements",
        price: "Buyer pays",
        commission: "Commission",
        logistics: "Delivery",
        cost: "Cost price",
        profit: "You keep",
        margin: "Margin",
        roi: "ROI",
        currency: "sum",
      },
    },
    why: {
      eyebrow: "The problem",
      title: "Commission is",
      accent: "not the whole story",
      mythTag: "How most sellers count",
      mythFormula: "150,000 − 15% commission",
      mythResult: "profit",
      realTag: "In reality",
      realResult: "profit",
      gap: "3× less",
      cta: "Price your own product",
    },
    calc: {
      eyebrow: "Calculator",
      title: "Type in the numbers —",
      accent: "see the profit instantly",
      lead: "A category, a price and a size are enough — commission, delivery and payment are priced on each marketplace’s own tariffs.",
    },
    features: {
      eyebrow: "Features",
      extra: [
        { title: "Competitor prices", text: "We find similar products and show where your price sits in the market." },
        { title: "Fill from a link", text: "Paste an Uzum or Wildberries link — name, price and category fill themselves." },
        { title: "AI category", text: "Type the product name — AI suggests the right category on every marketplace." },
      ],
    },
    compare: { sample: "Sample", profit: "profit" },
    final: {
      title: "Every product’s profit —",
      accent: "in one cabinet",
      cta: "Get started",
      back: "Back to the calculator",
      notes: ["4 marketplaces", "Orders and stock", "Profit per product"],
    },
    faq: { tg: "Ask on Telegram" },
    footer: {
      calc: "Calculator",
      robohub: "Robohub",
      links: { home: "Home", studio: "AI Studio", academy: "Academy", cabinet: "Seller cabinet" },
      contacts: "Contacts",
    },
  },
  kk: {
    ui: {
      home: "Басты бет",
      mainMenu: "Негізгі мәзір",
      lang: "Тілді таңдау",
      login: "Кіру",
      start: "Тегін бастау",
      menuOpen: "Мәзірді ашу",
      menuClose: "Мәзірді жабу",
      tag: "Калькулятор",
    },
    nav: ["Не үшін керек", "Калькулятор", "Қалай жұмыс істейді", "Сұрақтар"],
    hero: {
      // H1 boshi — kalit ibora (qidiruv uchun), savol ustida kichik qator bo'lib ko'rinadi (TZ 8.1)

      kicker: "Uzum, Wildberries, Ozon және Yandex Market үшін пайда калькуляторы",

      titleBefore: "Сатылымнан сізге",
      titleMark: "қанша пайда",
      titleAfter: "қалады?",
      howCta: "Қалай жұмыс істейді",
      notes: ["Тегін", "Тіркелусіз", "Ештеңе сақталмайды"],
      pick: "Төрт маркетплейс үшін есептейміз",
      receipt: {
        tag: "Нақты тариф бойынша",
        title: "Сатып алушы төлеген ақша қайда кетеді?",
        example: "Мысал · Uzum Market · FBO",
        product: "Пайдалы қоспалар",
        price: "Сатып алушы төлейді",
        commission: "Комиссия",
        logistics: "Жеткізу",
        cost: "Өзіндік құн",
        profit: "Сізге қалады",
        margin: "Маржа",
        roi: "ROI",
        currency: "сум",
      },
    },
    why: {
      eyebrow: "Мәселе",
      title: "Комиссия —",
      accent: "әлі бәрі емес",
      mythTag: "Көпшілік осылай есептейді",
      mythFormula: "150 000 − 15% комиссия",
      mythResult: "пайда",
      realTag: "Шын мәнінде",
      realResult: "пайда",
      gap: "3 есе аз",
      cta: "Өз тауарыңызды есептеңіз",
    },
    calc: {
      eyebrow: "Калькулятор",
      title: "Сандарды енгізіңіз —",
      accent: "пайда бірден көрінеді",
      lead: "Санат, баға және өлшем жеткілікті — комиссияны, жеткізуді және төлемді әр маркетплейстің өз тарифтері бойынша есептейміз.",
    },
    features: {
      eyebrow: "Мүмкіндіктер",
      extra: [
        { title: "Бәсекелестер бағасы", text: "Ұқсас тауарларды тауып, бағаңыз нарықта қай деңгейде тұрғанын көрсетеміз." },
        { title: "Сілтеме арқылы толтыру", text: "Uzum немесе Wildberries сілтемесін қойыңыз — атауы, бағасы және санаты өзі толтырылады." },
        { title: "AI-санат", text: "Тауар атауын жазыңыз — AI әр маркетплейс үшін лайықты санатты ұсынады." },
      ],
    },
    compare: { sample: "Үлгі", profit: "пайда" },
    final: {
      title: "Әр тауардың пайдасы —",
      accent: "бір кабинетте",
      cta: "Қазір бастау",
      back: "Калькуляторға оралу",
      notes: ["4 маркетплейс", "Тапсырыстар мен қалдықтар", "Әр тауардың пайдасы"],
    },
    faq: { tg: "Telegram-да сұраңыз" },
    footer: {
      calc: "Калькулятор",
      robohub: "Robohub",
      links: { home: "Басты бет", studio: "AI Studio", academy: "Academy", cabinet: "Сатушы кабинеті" },
      contacts: "Байланыс",
    },
  },
  ky: {
    ui: {
      home: "Башкы бет",
      mainMenu: "Негизги меню",
      lang: "Тилди тандоо",
      login: "Кирүү",
      start: "Акысыз баштоо",
      menuOpen: "Менюну ачуу",
      menuClose: "Менюну жабуу",
      tag: "Калькулятор",
    },
    nav: ["Эмне үчүн керек", "Калькулятор", "Кантип иштейт", "Суроолор"],
    hero: {
      // H1 boshi — kalit ibora (qidiruv uchun), savol ustida kichik qator bo'lib ko'rinadi (TZ 8.1)

      kicker: "Uzum, Wildberries, Ozon жана Yandex Market үчүн киреше калькулятору",

      titleBefore: "Сатуудан сизге",
      titleMark: "канча киреше",
      titleAfter: "калат?",
      howCta: "Кантип иштейт",
      notes: ["Акысыз", "Катталбастан", "Эч нерсе сакталбайт"],
      pick: "Төрт маркетплейс үчүн эсептейбиз",
      receipt: {
        tag: "Чыныгы тариф боюнча",
        title: "Сатып алуучу төлөгөн акча кайда кетет?",
        example: "Мисал · Uzum Market · FBO",
        product: "Пайдалуу кошулмалар",
        price: "Сатып алуучу төлөйт",
        commission: "Комиссия",
        logistics: "Жеткирүү",
        cost: "Өздүк нарк",
        profit: "Сизге калат",
        margin: "Маржа",
        roi: "ROI",
        currency: "сум",
      },
    },
    why: {
      eyebrow: "Көйгөй",
      title: "Комиссия —",
      accent: "али баары эмес",
      mythTag: "Көпчүлүк ушинтип эсептейт",
      mythFormula: "150 000 − 15% комиссия",
      mythResult: "киреше",
      realTag: "Чындыгында",
      realResult: "киреше",
      gap: "3 эсе аз",
      cta: "Өз товарыңызды эсептеңиз",
    },
    calc: {
      eyebrow: "Калькулятор",
      title: "Сандарды киргизиңиз —",
      accent: "киреше дароо көрүнөт",
      lead: "Категория, баа жана өлчөм жетиштүү — комиссияны, жеткирүүнү жана төлөмдү ар бир маркетплейстин өз тарифтери боюнча эсептейбиз.",
    },
    features: {
      eyebrow: "Мүмкүнчүлүктөр",
      extra: [
        { title: "Атаандаштардын баасы", text: "Окшош товарларды таап, бааңыз рынокто кайсы деңгээлде турганын көрсөтөбүз." },
        { title: "Шилтеме аркылуу толтуруу", text: "Uzum же Wildberries шилтемесин коюңуз — аталышы, баасы жана категориясы өзү толтурулат." },
        { title: "AI-категория", text: "Товардын аталышын жазыңыз — AI ар бир маркетплейс үчүн ылайыктуу категорияны сунуштайт." },
      ],
    },
    compare: { sample: "Үлгү", profit: "киреше" },
    final: {
      title: "Ар бир товардын кирешеси —",
      accent: "бир кабинетте",
      cta: "Азыр баштоо",
      back: "Калькуляторго кайтуу",
      notes: ["4 маркетплейс", "Буйрутмалар жана калдыктар", "Ар бир товардын кирешеси"],
    },
    faq: { tg: "Telegram-да сураңыз" },
    footer: {
      calc: "Калькулятор",
      robohub: "Robohub",
      links: { home: "Башкы бет", studio: "AI Studio", academy: "Academy", cabinet: "Сатуучунун кабинети" },
      contacts: "Байланыш",
    },
  },
  kaa: {
    ui: {
      home: "Bas bet",
      mainMenu: "Tiykarǵı menyu",
      lang: "Tildi tańlaw",
      login: "Kiriw",
      start: "Biypul baslaw",
      menuOpen: "Menyudı ashıw",
      menuClose: "Menyudı jabıw",
      tag: "Kalkulyator",
    },
    nav: ["Ne ushın kerek", "Kalkulyator", "Qalay isleydi", "Sorawlar"],
    hero: {
      // H1 boshi — kalit ibora (qidiruv uchun), savol ustida kichik qator bo'lib ko'rinadi (TZ 8.1)

      kicker: "Uzum, Wildberries, Ozon hám Yandex Market ushın payda kalkulyatorı",

      titleBefore: "Satıwdan sizge",
      titleMark: "qansha payda",
      titleAfter: "qaladı?",
      howCta: "Qalay isleydi",
      notes: ["Biypul", "Dizimnen ótpey", "Hesh nárse saqlanbaydı"],
      pick: "Tórt marketpleys ushın esaplaymız",
      receipt: {
        tag: "Haqıyqıy tarif boyınsha",
        title: "Satıp alıwshı tólegen pul qayaqqa ketedi?",
        example: "Mısal · Uzum Market · FBO",
        product: "Paydalı qospalar",
        price: "Satıp alıwshı tóleydi",
        commission: "Komissiya",
        logistics: "Jetkerip beriw",
        cost: "Ózine túser baha",
        profit: "Sizge qaladı",
        margin: "Marja",
        roi: "ROI",
        currency: "swm",
      },
    },
    why: {
      eyebrow: "Mashqala",
      title: "Komissiya —",
      accent: "ele hámmesi emes",
      mythTag: "Kópshilik usılay esaplaydı",
      mythFormula: "150 000 − 15% komissiya",
      mythResult: "payda",
      realTag: "Shın mánisinde",
      realResult: "payda",
      gap: "3 ese az",
      cta: "Óz ónimińizdi esaplań",
    },
    calc: {
      eyebrow: "Kalkulyator",
      title: "Sanlardı kiritiń —",
      accent: "payda birden kórinedi",
      lead: "Kategoriya, baha hám ólshem jetkilikli — komissiyanı, jetkerip beriwdi hám tólemdi hár bir marketpleystiń óz tarifleri boyınsha esaplaymız.",
    },
    features: {
      eyebrow: "Imkaniyatlar",
      extra: [
        { title: "Básekilesler bahası", text: "Uqsas ónimlerdi tawıp, bahańız bazarda qay jerde turǵanın kórsetemiz." },
        { title: "Siltemeden toltırıw", text: "Uzum yamasa Wildberries siltemesin qoyıń — atı, bahası hám kategoriyası ózi jazıladı." },
        { title: "AI-kategoriya", text: "Ónim atın jazıń — AI hár bir marketpleys ushın sáykes kategoriyanı usınadı." },
      ],
    },
    compare: { sample: "Úlgi", profit: "payda" },
    final: {
      title: "Hár bir ónimniń paydası —",
      accent: "bir kabinette",
      cta: "Házir baslaw",
      back: "Kalkulyatorǵa qaytıw",
      notes: ["4 marketpleys", "Buyırtpalar hám qaldıqlar", "Hár bir ónimniń paydası"],
    },
    faq: { tg: "Telegram’da sorań" },
    footer: {
      calc: "Kalkulyator",
      robohub: "Robohub",
      links: { home: "Bas bet", studio: "AI Studio", academy: "Academy", cabinet: "Satıwshı kabineti" },
      contacts: "Baylanıs",
    },
  },
  tg: {
    ui: {
      home: "Саҳифаи асосӣ",
      mainMenu: "Менюи асосӣ",
      lang: "Интихоби забон",
      login: "Воридшавӣ",
      start: "Ройгон оғоз кунед",
      menuOpen: "Кушодани меню",
      menuClose: "Пӯшидани меню",
      tag: "Калкулятор",
    },
    nav: ["Барои чӣ", "Калкулятор", "Чӣ тавр кор мекунад", "Саволҳо"],
    hero: {
      // H1 boshi — kalit ibora (qidiruv uchun), savol ustida kichik qator bo'lib ko'rinadi (TZ 8.1)

      kicker: "Ҳисобкунаки фоида барои Uzum, Wildberries, Ozon ва Yandex Market",

      titleBefore: "Аз фурӯш ба шумо",
      titleMark: "чӣ қадар фоида",
      titleAfter: "мемонад?",
      howCta: "Чӣ тавр кор мекунад",
      notes: ["Ройгон", "Бе бақайдгирӣ", "Ҳеҷ чиз нигоҳ дошта намешавад"],
      pick: "Барои чор маркетплейс ҳисоб мекунем",
      receipt: {
        tag: "Аз рӯи тарифи воқеӣ",
        title: "Пули харидор ба куҷо меравад?",
        example: "Мисол · Uzum Market · FBO",
        product: "Иловаҳои муфид",
        price: "Харидор месупорад",
        commission: "Комиссия",
        logistics: "Расонидан",
        cost: "Арзиши аслӣ",
        profit: "Ба шумо мемонад",
        margin: "Маржа",
        roi: "ROI",
        currency: "сӯм",
      },
    },
    why: {
      eyebrow: "Мушкилот",
      title: "Комиссия —",
      accent: "ҳанӯз ҳама чиз нест",
      mythTag: "Бисёриҳо чунин ҳисоб мекунанд",
      mythFormula: "150 000 − 15% комиссия",
      mythResult: "фоида",
      realTag: "Дар асл",
      realResult: "фоида",
      gap: "3 маротиба камтар",
      cta: "Моли худро ҳисоб кунед",
    },
    calc: {
      eyebrow: "Калкулятор",
      title: "Рақамҳоро ворид кунед —",
      accent: "фоида дарҳол намоён мешавад",
      lead: "Категория, нарх ва андоза кифоя аст — комиссия, расонидан ва пардохтро аз рӯи тарифҳои худи ҳар маркетплейс ҳисоб мекунем.",
    },
    features: {
      eyebrow: "Имкониятҳо",
      extra: [
        { title: "Нархи рақибон", text: "Молҳои монандро ёфта, нишон медиҳем, ки нархи шумо дар бозор дар куҷо меистад." },
        { title: "Пур кардан аз пайванд", text: "Пайванди Uzum ё Wildberries-ро гузоред — ном, нарх ва категория худ ба худ пур мешаванд." },
        { title: "AI-категория", text: "Номи молро нависед — AI барои ҳар маркетплейс категорияи мувофиқро пешниҳод мекунад." },
      ],
    },
    compare: { sample: "Намуна", profit: "фоида" },
    final: {
      title: "Фоидаи ҳар мол —",
      accent: "дар як кабинет",
      cta: "Ҳозир оғоз кунед",
      back: "Бозгашт ба калкулятор",
      notes: ["4 маркетплейс", "Фармоишҳо ва бақияҳо", "Фоидаи ҳар мол"],
    },
    faq: { tg: "Дар Telegram пурсед" },
    footer: {
      calc: "Калкулятор",
      robohub: "Robohub",
      links: { home: "Саҳифаи асосӣ", studio: "AI Studio", academy: "Academy", cabinet: "Кабинети фурӯшанда" },
      contacts: "Тамос",
    },
  },
});

const FAQ_KEYS = [
  "commission",
  "schemes",
  "accuracy",
  "account",
  "saved",
  "uzum_commission",
  "wb_uzbekistan",
  "margin_roi",
  "which_marketplace",
] as const;

const FEATURE_KEYS = ["commission", "delivery", "schemes", "tax", "profit"] as const;

/** Komponentlar ishlatadigan tayyor kontent: tilga bog'liq matnlar + rb-market landing matnlari. */
export function buildContent(locale: Locale) {
  const T = TEXT[locale];
  const m = CALC_MESSAGES[locale];

  return {
    locale,
    T,
    NAV: NAV.map((href, i) => ({ href, label: T.nav[i] })),
    HERO: {
      ...T.hero,
      lead: m.calc_landing_hero_text,
      cta: m.calc_landing_hero_cta,
    },
    WHY: { ...T.why, p1: m.calc_about_p1, p2: m.calc_about_p2 },
    CALC: T.calc,
    FEATURES: {
      eyebrow: T.features.eyebrow,
      title: m.calc_about_what_title,
      items: [
        ...FEATURE_KEYS.map((k) => ({ id: k, title: m[`calc_about_what_${k}_title`], text: m[`calc_about_what_${k}_text`] })),
        ...T.features.extra.map((item, i) => ({ id: ["competitors", "link", "ai"][i], ...item })),
      ],
    },
    COMPARE: { title: m.calc_about_compare_title, text: m.calc_about_compare_text, ...T.compare },
    WHO: { title: m.calc_about_who_title, items: [1, 2, 3, 4].map((i) => m[`calc_about_who_${i}`]) },
    STEPS: {
      eyebrow: m.calc_landing_steps_eyebrow,
      title: m.calc_landing_steps_title,
      text: m.calc_landing_steps_text,
      items: [1, 2, 3].map((i) => ({ title: m[`calc_landing_step${i}_title`], text: m[`calc_landing_step${i}_text`] })),
    },
    FAQ: {
      eyebrow: m.calc_landing_faq_eyebrow,
      title: m.calc_landing_faq_title,
      tg: T.faq.tg,
      items: FAQ_KEYS.map((k) => ({ q: m[`calc_landing_faq_q_${k}`], a: m[`calc_landing_faq_a_${k}`] })),
    },
    FINAL: { lead: m.calc_landing_robohub_text, ...T.final },
    /** rights — "© {{year}} Robohub. …": yil footer'da qo'yiladi */
    FOOTER: { ...T.footer, about: m.calc_landing_footer_tagline, rights: m.calc_landing_footer_rights },
    /** Kalkulyatordan pastdagi bo'limlarning o'z matnlari (sections.content.ts) */
    S: SECTIONS[locale],
    /** Kalkulyatorning o'zi uchun lug'at (client'ga faqat joriy til). */
    dict: m,
  };
}

export type Content = ReturnType<typeof buildContent>;
