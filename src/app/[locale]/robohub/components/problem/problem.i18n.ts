import { defineMessages } from "@/i18n/config";

// before — Robohubsiz (video 0–8 s), after — Robohub bilan (8 s dan keyin). "Keyin esa" qatori ikkalasida bir xil.
// Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi: ʻ bu shriftda harf ustiga minib qoladi.
export const messages = defineMessages({
  uz: {
    // video — sxema videosi uchun nom va tavsif (figcaption + VideoObject), switch — tugmalar guruhi nomi
    video: {
      name: "Robohubsiz va Robohub bilan — marketpleyslarda sotuvchi ish sxemasi",
      desc: "Robohubsiz tadbirkorga 4 ta menejer kerak (har biri ~$300/oy): ular har kuni 7 ta vazifani — kartochkalar, qoldiqlar, buyurtmalar, reklama, analitika, hujjatlar va yetkazib berish — Uzum Market, Wildberries, Ozon va Yandex Marketda alohida takrorlaydi. Robohub bilan barcha 7 vazifa bitta kabinetda bir marta bajariladi va darhol 4 marketpleysga ketadi.",
    },
    switchLabel: "Videoda: Robohubsiz va Robohub bilan ishlash sxemasi",
    eyebrow: "Taqqoslash",
    next: "Keyin esa —",
    own: "+ oʻz saytingiz va Telegram-bot",
    before: {
      label: "Robohubsiz",
      title: ["Robohubsiz", "bir xil vazifalar har bir marketpleysda takrorlanadi"],
      lead: "Har bir marketpleys — oʻz kabineti, oʻz qoidalari, oʻz hisobotlari va muddatlari. Tadbirkor bir xil vazifani har birida qaytadan bajaradi.",
      cost: "Har yangi marketpleys = +$300/oy",
    },
    after: {
      label: "Robohub bilan",
      title: ["Robohub bilan", "barcha marketpleyslarni bitta kabinetdan boshqarasiz"],
      lead: "Uzum Market, Wildberries, Ozon va Yandex Market uchun bitta oyna. Har bir vazifa bir marta bajariladi — va darhol barcha marketpleyslarga ketadi.",
      cost: "Har qanday yangi marketpleys = oʻsha kabinet",
    },
  },
  ru: {
    // video — sxema videosi uchun nom va tavsif (figcaption + VideoObject), switch — tugmalar guruhi nomi
    video: {
      name: "Без Robohub и с Robohub — схема работы продавца на маркетплейсах",
      desc: "Без Robohub предпринимателю нужны 4 менеджера (около $300/мес каждый), которые каждый день повторяют 7 задач — карточки, остатки, заказы, реклама, аналитика, документы и доставка — отдельно на Uzum Market, Wildberries, Ozon и Yandex Market. С Robohub все 7 задач выполняются один раз в одном кабинете и сразу уходят на все 4 маркетплейса.",
    },
    switchLabel: "Показать в видео: работа без Robohub и с Robohub",
    eyebrow: "Сравнение",
    next: "А дальше —",
    own: "+ свой сайт и Telegram-бот",
    before: {
      label: "Без Robohub",
      title: ["Без Robohub", "одни и те же задачи повторяются на каждой площадке"],
      lead: "Каждый маркетплейс — свой кабинет, свои правила, свои отчёты и свои сроки. Одни и те же задачи предприниматель решает заново на каждой площадке.",
      cost: "Каждая новая площадка = +$300/мес",
    },
    after: {
      label: "С Robohub",
      title: ["С Robohub", "вы управляете всеми площадками из одного кабинета"],
      lead: "Одно окно для Uzum Market, Wildberries, Ozon и Yandex Market. Каждая задача делается один раз — и сразу уходит на все площадки.",
      cost: "Любая новая площадка = тот же кабинет",
    },
  },
  en: {
    // video — sxema videosi uchun nom va tavsif (figcaption + VideoObject), switch — tugmalar guruhi nomi
    video: {
      name: "Without Robohub vs with Robohub — how a marketplace seller works",
      desc: "Without Robohub, an entrepreneur needs 4 managers (about $300/mo each) who repeat 7 daily tasks — product cards, stock, orders, ads, analytics, documents and delivery — separately on Uzum Market, Wildberries, Ozon and Yandex Market. With Robohub, all 7 tasks are done once in one dashboard and go out to all 4 marketplaces at once.",
    },
    switchLabel: "Show in the video: working without and with Robohub",
    eyebrow: "Comparison",
    next: "Next up —",
    own: "+ your own website and Telegram bot",
    before: {
      label: "Without Robohub",
      title: ["Without Robohub,", "the same tasks repeat on every marketplace"],
      lead: "Every marketplace has its own dashboard, rules, reports and deadlines. The entrepreneur solves the same tasks all over again on each one.",
      cost: "Every new marketplace = +$300/mo",
    },
    after: {
      label: "With Robohub",
      title: ["With Robohub,", "you run every marketplace from one dashboard"],
      lead: "One window for Uzum Market, Wildberries, Ozon and Yandex Market. Every task is done once — and goes out to every marketplace at once.",
      cost: "Any new marketplace = the same dashboard",
    },
  },
  kk: {
    // video — sxema videosi uchun nom va tavsif (figcaption + VideoObject), switch — tugmalar guruhi nomi
    video: {
      name: "Robohub-сыз және Robohub-пен — маркетплейстегі сатушының жұмыс схемасы",
      desc: "Robohub-сыз кәсіпкерге 4 менеджер керек (әрқайсысы ~$300/ай): олар күн сайын 7 міндетті — карточкалар, қалдықтар, тапсырыстар, жарнама, аналитика, құжаттар және жеткізу — Uzum Market, Wildberries, Ozon және Yandex Market-те бөлек қайталайды. Robohub-пен барлық 7 міндет бір кабинетте бір рет орындалып, бірден 4 маркетплейске жіберіледі.",
    },
    switchLabel: "Бейнеде көрсету: Robohub-сыз және Robohub-пен жұмыс",
    eyebrow: "Салыстыру",
    next: "Ал әрі қарай —",
    own: "+ өз сайтыңыз бен Telegram-бот",
    before: {
      label: "Robohub-сыз",
      title: ["Robohub-сыз", "бірдей міндеттер әр маркетплейсте қайталанады"],
      lead: "Әр маркетплейс — өз кабинеті, өз ережелері, өз есептері мен мерзімдері. Кәсіпкер бір міндетті әрқайсысында қайтадан орындайды.",
      cost: "Әр жаңа маркетплейс = +$300/ай",
    },
    after: {
      label: "Robohub-пен",
      title: ["Robohub-пен", "барлық маркетплейсті бір кабинеттен басқарасыз"],
      lead: "Uzum Market, Wildberries, Ozon және Yandex Market үшін бір терезе. Әр міндет бір рет орындалады — және бірден барлық маркетплейстерге жіберіледі.",
      cost: "Кез келген жаңа маркетплейс = сол кабинет",
    },
  },
  ky: {
    // video — sxema videosi uchun nom va tavsif (figcaption + VideoObject), switch — tugmalar guruhi nomi
    video: {
      name: "Robohub-сыз жана Robohub менен — маркетплейстеги сатуучунун иш схемасы",
      desc: "Robohub-сыз ишкерге 4 менеджер керек (ар бири ~$300/ай): алар күн сайын 7 милдетти — карточкалар, калдыктар, буйрутмалар, жарнама, аналитика, документтер жана жеткирүү — Uzum Market, Wildberries, Ozon жана Yandex Marketте өзүнчө кайталайт. Robohub менен бардык 7 милдет бир кабинетте бир жолу аткарылып, дароо 4 маркетплейске жөнөтүлөт.",
    },
    switchLabel: "Видеодо көрсөтүү: Robohub-сыз жана Robohub менен иш",
    eyebrow: "Салыштыруу",
    next: "Андан ары —",
    own: "+ өз сайтыңыз жана Telegram-бот",
    before: {
      label: "Robohub-сыз",
      title: ["Robohub-сыз", "бирдей милдеттер ар бир маркетплейсте кайталанат"],
      lead: "Ар бир маркетплейс — өз кабинети, өз эрежелери, өз отчеттору жана мөөнөттөрү. Ишкер бир эле милдетти ар биринде кайрадан аткарат.",
      cost: "Ар бир жаңы маркетплейс = +$300/ай",
    },
    after: {
      label: "Robohub менен",
      title: ["Robohub менен", "бардык маркетплейстерди бир кабинеттен башкарасыз"],
      lead: "Uzum Market, Wildberries, Ozon жана Yandex Market үчүн бир терезе. Ар бир милдет бир жолу аткарылат — жана дароо бардык маркетплейстерге жөнөтүлөт.",
      cost: "Каалаган жаңы маркетплейс = ошол эле кабинет",
    },
  },
  kaa: {
    // video — sxema videosi uchun nom va tavsif (figcaption + VideoObject), switch — tugmalar guruhi nomi
    video: {
      name: "Robohub’sız hám Robohub penen — marketpleystegi satıwshınıń jumıs sxeması",
      desc: "Robohub’sız isbilermenge 4 menejer kerek (hár biri ~$300/ay): olar hár kúni 7 wazıypanı — kartochkalar, qaldıqlar, buyırtpalar, reklama, analitika, hújjetler hám jetkerip beriw — Uzum Market, Wildberries, Ozon hám Yandex Marketta bólek qaytalaydı. Robohub penen barlıq 7 wazıypa bir kabinette bir ret orınlanıp, dárhal 4 marketpleyske jiberiledi.",
    },
    switchLabel: "Videoda kórsetiw: Robohub’sız hám Robohub penen jumıs",
    eyebrow: "Salıstırıw",
    next: "Al keyin —",
    own: "+ óz saytıńız hám Telegram-bot",
    before: {
      label: "Robohub’sız",
      title: ["Robohub’sız", "birdey wazıypalar hár bir marketpleyste qaytalanadı"],
      lead: "Hár bir marketpleys — óz kabineti, óz qaǵıydaları, óz esabatları hám múddetleri. Isbilermen birdey wazıypanı hár birinde qaytadan orınlaydı.",
      cost: "Hár jańa marketpleys = +$300/ay",
    },
    after: {
      label: "Robohub penen",
      title: ["Robohub penen", "barlıq marketpleyslerdi bir kabinetten basqarasız"],
      lead: "Uzum Market, Wildberries, Ozon hám Yandex Market ushın bir ayna. Hár bir wazıypa bir ret orınlanadı — hám dárhal barlıq marketpleyslerge jiberiledi.",
      cost: "Qálegen jańa marketpleys = sol kabinet",
    },
  },
  tg: {
    // video — sxema videosi uchun nom va tavsif (figcaption + VideoObject), switch — tugmalar guruhi nomi
    video: {
      name: "Бе Robohub ва бо Robohub — нақшаи кори фурӯшанда дар маркетплейсҳо",
      desc: "Бе Robohub соҳибкор 4 менеҷер лозим дорад (ҳар кадом ~$300/моҳ), ки ҳар рӯз 7 вазифаро — кортҳо, бақияҳо, фармоишҳо, реклама, таҳлил, ҳуҷҷатҳо ва расондан — дар Uzum Market, Wildberries, Ozon ва Yandex Market алоҳида такрор мекунанд. Бо Robohub ҳамаи 7 вазифа дар як кабинет як бор иҷро шуда, фавран ба 4 маркетплейс меравад.",
    },
    switchLabel: "Дар видео нишон додан: кор бе Robohub ва бо Robohub",
    eyebrow: "Муқоиса",
    next: "Ва баъд —",
    own: "+ сайти худатон ва Telegram-бот",
    before: {
      label: "Бе Robohub",
      title: ["Бе Robohub", "вазифаҳои якхела дар ҳар маркетплейс такрор мешаванд"],
      lead: "Ҳар маркетплейс — кабинети худ, қоидаҳои худ, ҳисоботу мӯҳлатҳои худ. Соҳибкор як вазифаро дар ҳар яке аз нав иҷро мекунад.",
      cost: "Ҳар маркетплейси нав = +$300/моҳ",
    },
    after: {
      label: "Бо Robohub",
      title: ["Бо Robohub", "ҳамаи маркетплейсҳоро аз як кабинет идора мекунед"],
      lead: "Як равзана барои Uzum Market, Wildberries, Ozon ва Yandex Market. Ҳар вазифа як бор иҷро мешавад — ва фавран ба ҳамаи маркетплейсҳо меравад.",
      cost: "Ҳар маркетплейси нав = ҳамон кабинет",
    },
  },
});

// Sxema videosidagi yozuvlar tili: o'zbekcha va ruscha sahifada — o'z tilida, qolgan tillarda — inglizcha.
// Fayllar: public/robohub-13s-{til}.mp4 (kompyuter, 1920×600, 13 s), public/robohub-mobile-{til}.mp4 (telefon, 1080×1350, 8.7 s),
// posterlar (birinchi kadr): public/video/robohub-13s-{til}.webp, public/video/robohub-mobile-{til}.webp
export type VideoLang = "uz" | "ru" | "en";
export const videoLang = (locale: string): VideoLang => (locale === "uz" || locale === "ru" ? locale : "en");
