import { defineMessages } from "@/i18n/config";

// Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi
// models — integ-models.tsx dagi MODELS tartibida (FBS, FBO, DBS); matnlar Robohub'ning avvalgi landingidan.
export const messages = defineMessages({
  uz: {
    title: "Marketpleysdan omborgacha —",
    titleAccent: "hammasi ulangan.",
    lead: "Robohub siz bilan Uzum, Yandex Market, Wildberries va Ozon oʻrtasida turadi — barcha buyurtmalarni oʻzi qabul qiladi va qoldiqlarni qaytarib yuboradi, shunda hammasini bitta oynadan, ortiqcha sotuvsiz boshqarasiz.",
    stock: "Ombor va hisob",
    crm: "CRM",
    note: "Baʼzilari menejer bilan sozlanadi.",
    video: {
      label: "Mahsulot kartochkasi Robohub orqali barcha marketpleyslarga tarqaladi",
    },
    models: {
      title: "FBS, FBO va DBS uchun mos",
      storeLabel: "Saqlash",
      shipLabel: "Yetkazish",
      you: "Siz",
      marketplace: "Marketpleys",
      items: [
        {
          title: "Sizning omboringizda, marketpleys yetkazadi",
          points: [
            "Barcha marketpleyslar bilan qoldiqlarni bir zumda almashish",
            "Buyurtmalarni tez yigʻish uchun aqlli etiketkalar lentasi",
            "Har bir buyurtma xarajatini hisobga olish — logistika va komissiyalar",
          ],
        },
        {
          title: "Marketpleys omborida, u yetkazadi",
          points: [
            "Marketpleyslardan tovarlarni Robohub’ga import qilish",
            "Sotuv va rentabellik tahlili bitta oynada",
            "Barcha marketpleyslardan buyurtma va statuslar bitta oynada sinxron",
          ],
        },
        {
          title: "Siz saqlaysiz va yetkazasiz",
          points: [
            "Turli marketpleys omborlari bilan qulay ishlash va qoldiqlarni nazorat qilish",
            "Har bir buyurtma xarajatini hisobga olish — logistika va komissiyalar",
            "Barcha marketpleyslardan buyurtma va statuslar bitta oynada sinxron",
          ],
        },
      ],
    },
  },
  ru: {
    title: "От маркетплейса до склада —",
    titleAccent: "всё связано.",
    lead: "Robohub стоит между вами и Uzum, Yandex Market, Wildberries и Ozon — сам принимает все заказы и обновляет остатки на площадках, так что вы управляете всем из одного окна, без продаж сверх наличия.",
    stock: "Склад и учёт",
    crm: "CRM",
    note: "Некоторые настраиваются с менеджером.",
    video: {
      label: "Карточка товара через Robohub попадает на все маркетплейсы",
    },
    models: {
      title: "Подходит для FBS, FBO и DBS",
      storeLabel: "Хранение",
      shipLabel: "Доставка",
      you: "Вы",
      marketplace: "Площадка",
      items: [
        {
          title: "На вашем складе, доставляет маркетплейс",
          points: [
            "Мгновенный обмен остатками со всеми маркетплейсами",
            "Лента умных этикеток для быстрой сборки заказов",
            "Учёт расходов по каждому заказу — логистика и комиссии",
          ],
        },
        {
          title: "На складе маркетплейса, он и доставляет",
          points: [
            "Импорт товаров с маркетплейсов в Robohub",
            "Аналитика продаж и рентабельности в одном окне",
            "Заказы и статусы со всех маркетплейсов синхронно в одном окне",
          ],
        },
        {
          title: "Вы храните и доставляете сами",
          points: [
            "Удобная работа с разными складами маркетплейсов и контроль остатков",
            "Учёт расходов по каждому заказу — логистика и комиссии",
            "Заказы и статусы со всех маркетплейсов синхронно в одном окне",
          ],
        },
      ],
    },
  },
  en: {
    title: "Marketplace to warehouse —",
    titleAccent: "everything connected.",
    lead: "Robohub sits between you and Uzum, Yandex Market, Wildberries and Ozon — it takes in every order and syncs stock back, so you run everything from one window with no overselling.",
    stock: "Warehouse and accounting",
    crm: "CRM",
    note: "Some are set up with a manager.",
    video: {
      label: "A product card spreads to every marketplace through Robohub",
    },
    models: {
      title: "Works for FBS, FBO and DBS",
      storeLabel: "Storage",
      shipLabel: "Delivery",
      you: "You",
      marketplace: "Marketplace",
      items: [
        {
          title: "In your warehouse, the marketplace delivers",
          points: [
            "Instant stock sync with every marketplace",
            "Smart label feed for fast order picking",
            "Cost tracking for every order — logistics and fees",
          ],
        },
        {
          title: "In the marketplace warehouse, it delivers",
          points: [
            "Import products from marketplaces into Robohub",
            "Sales and profitability analytics in one window",
            "Orders and statuses from every marketplace synced in one window",
          ],
        },
        {
          title: "You store and deliver yourself",
          points: [
            "Easy work with different marketplace warehouses and stock control",
            "Cost tracking for every order — logistics and fees",
            "Orders and statuses from every marketplace synced in one window",
          ],
        },
      ],
    },
  },
  kk: {
    title: "Маркетплейстен қоймаға дейін —",
    titleAccent: "бәрі байланысқан.",
    lead: "Robohub сіз бен Uzum, Yandex Market, Wildberries және Ozon арасында тұрады — барлық тапсырысты өзі қабылдап, қалдықтарды кері жібереді. Сөйтіп бәрін бір терезеден, артық сатусыз басқарасыз.",
    stock: "Қойма және есеп",
    crm: "CRM",
    note: "Кейбіреулері менеджермен бірге бапталады.",
    video: {
      label: "Тауар карточкасы Robohub арқылы барлық маркетплейстерге тарайды",
    },
    models: {
      title: "FBS, FBO және DBS үшін қолайлы",
      storeLabel: "Сақтау",
      shipLabel: "Жеткізу",
      you: "Сіз",
      marketplace: "Маркетплейс",
      items: [
        {
          title: "Сіздің қоймаңызда, маркетплейс жеткізеді",
          points: [
            "Барлық маркетплейспен қалдықтарды лезде алмасу",
            "Тапсырыстарды жылдам жинауға арналған ақылды жапсырмалар лентасы",
            "Әр тапсырыстың шығынын есепке алу — логистика мен комиссиялар",
          ],
        },
        {
          title: "Маркетплейс қоймасында, өзі жеткізеді",
          points: [
            "Маркетплейстерден тауарларды Robohub-қа импорттау",
            "Сатылым мен рентабельділік талдауы бір терезеде",
            "Барлық маркетплейстің тапсырыстары мен мәртебелері бір терезеде синхронды",
          ],
        },
        {
          title: "Сіз сақтайсыз әрі жеткізесіз",
          points: [
            "Түрлі маркетплейс қоймаларымен ыңғайлы жұмыс және қалдықтарды бақылау",
            "Әр тапсырыстың шығынын есепке алу — логистика мен комиссиялар",
            "Барлық маркетплейстің тапсырыстары мен мәртебелері бір терезеде синхронды",
          ],
        },
      ],
    },
  },
  ky: {
    title: "Маркетплейстен кампага чейин —",
    titleAccent: "баары туташкан.",
    lead: "Robohub сиз менен Uzum, Yandex Market, Wildberries жана Ozon ортосунда турат — бардык буйрутмаларды өзү кабыл алып, калдыктарды кайра жөнөтөт. Ошентип баарын бир терезеден, ашыкча сатуусуз башкарасыз.",
    stock: "Кампа жана эсеп",
    crm: "CRM",
    note: "Айрымдары менеджер менен бирге жөндөлөт.",
    video: {
      label: "Товар карточкасы Robohub аркылуу бардык маркетплейстерге таралат",
    },
    models: {
      title: "FBS, FBO жана DBS үчүн ылайыктуу",
      storeLabel: "Сактоо",
      shipLabel: "Жеткирүү",
      you: "Сиз",
      marketplace: "Маркетплейс",
      items: [
        {
          title: "Сиздин кампаңызда, маркетплейс жеткирет",
          points: [
            "Бардык маркетплейстер менен калдыктарды заматта алмашуу",
            "Буйрутмаларды тез чогултуу үчүн акылдуу этикеткалар лентасы",
            "Ар бир буйрутманын чыгымын эсепке алуу — логистика жана комиссиялар",
          ],
        },
        {
          title: "Маркетплейстин кампасында, өзү жеткирет",
          points: [
            "Маркетплейстерден товарларды Robohub-ка импорттоо",
            "Сатуу жана рентабелдүүлүк аналитикасы бир терезеде",
            "Бардык маркетплейстердин буйрутмалары жана статустары бир терезеде синхрондуу",
          ],
        },
        {
          title: "Сиз сактайсыз жана жеткиресиз",
          points: [
            "Ар кандай маркетплейс кампалары менен ыңгайлуу иштөө жана калдыктарды көзөмөлдөө",
            "Ар бир буйрутманын чыгымын эсепке алуу — логистика жана комиссиялар",
            "Бардык маркетплейстердин буйрутмалары жана статустары бир терезеде синхрондуу",
          ],
        },
      ],
    },
  },
  kaa: {
    title: "Marketpleysten skladqa shekem —",
    titleAccent: "barlıǵı baylanısqan.",
    lead: "Robohub siz benen Uzum, Yandex Market, Wildberries hám Ozon arasında turadı — barlıq buyırtpalardı ózi qabıl etedi hám qaldıqlardı qayta jiberedi, solay etip hámmesin bir aynadan, artıqsha satıwsız basqarasız.",
    stock: "Sklad hám esap",
    crm: "CRM",
    note: "Ayırımları menejer menen sazlanadı.",
    video: {
      label: "Ónim kartochkası Robohub arqalı barlıq marketpleyslerge taraladı",
    },
    models: {
      title: "FBS, FBO hám DBS ushın qolaylı",
      storeLabel: "Saqlaw",
      shipLabel: "Jetkeriw",
      you: "Siz",
      marketplace: "Marketpleys",
      items: [
        {
          title: "Siziń skladıńızda, marketpleys jetkeredi",
          points: [
            "Barlıq marketpleysler menen qaldıqlardı bir zamatta almasıw",
            "Buyırtpalardı tez jıynaw ushın aqıllı etiketkalar lentası",
            "Hár bir buyırtpanıń qárejetin esapqa alıw — logistika hám komissiyalar",
          ],
        },
        {
          title: "Marketpleys skladında, ózi jetkeredi",
          points: [
            "Marketpleyslerden ónimlerdi Robohub’qa import etiw",
            "Satıw hám rentabellik analizi bir aynada",
            "Barlıq marketpleyslerdegi buyırtpalar hám statuslar bir aynada sinxron",
          ],
        },
        {
          title: "Siz saqlaysız hám jetkeresiz",
          points: [
            "Túrli marketpleys skladları menen qolaylı islew hám qaldıqlardı qadaǵalaw",
            "Hár bir buyırtpanıń qárejetin esapqa alıw — logistika hám komissiyalar",
            "Barlıq marketpleyslerdegi buyırtpalar hám statuslar bir aynada sinxron",
          ],
        },
      ],
    },
  },
  tg: {
    title: "Аз маркетплейс то анбор —",
    titleAccent: "ҳама пайваст аст.",
    lead: "Robohub байни шумо ва Uzum, Yandex Market, Wildberries ва Ozon меистад — ҳамаи фармоишҳоро худаш қабул мекунад ва боқимондаро бармегардонад, то шумо ҳама чизро аз як равзана, бе фурӯши зиёдатӣ идора кунед.",
    stock: "Анбор ва баҳисобгирӣ",
    crm: "CRM",
    note: "Баъзеашон бо менеҷер танзим мешаванд.",
    video: {
      label: "Корти маҳсулот тавассути Robohub ба ҳамаи маркетплейсҳо паҳн мешавад",
    },
    models: {
      title: "Барои FBS, FBO ва DBS мувофиқ",
      storeLabel: "Нигоҳдорӣ",
      shipLabel: "Расонидан",
      you: "Шумо",
      marketplace: "Маркетплейс",
      items: [
        {
          title: "Дар анбори шумо, маркетплейс мерасонад",
          points: [
            "Мубодилаи фаврии боқимонда бо ҳамаи маркетплейсҳо",
            "Навори тамғаҳои ҳушманд барои ҷамъоварии зуди фармоишҳо",
            "Баҳисобгирии хароҷоти ҳар фармоиш — логистика ва комиссияҳо",
          ],
        },
        {
          title: "Дар анбори маркетплейс, худаш мерасонад",
          points: [
            "Воридоти маҳсулот аз маркетплейсҳо ба Robohub",
            "Таҳлили фурӯш ва даромаднокӣ дар як равзана",
            "Фармоишҳо ва ҳолатҳо аз ҳамаи маркетплейсҳо дар як равзана ҳамоҳанг",
          ],
        },
        {
          title: "Шумо нигоҳ медоред ва мерасонед",
          points: [
            "Кори қулай бо анборҳои гуногуни маркетплейсҳо ва назорати боқимонда",
            "Баҳисобгирии хароҷоти ҳар фармоиш — логистика ва комиссияҳо",
            "Фармоишҳо ва ҳолатҳо аз ҳамаи маркетплейсҳо дар як равзана ҳамоҳанг",
          ],
        },
      ],
    },
  },
});
