import { defineMessages } from "@/i18n/config";

// before — Robohubsiz (video 0–8 s), after — Robohub bilan (8 s dan keyin). "Keyin esa" qatori ikkalasida bir xil.
// Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi: ʻ bu shriftda harf ustiga minib qoladi.
export const messages = defineMessages({
  uz: {
    eyebrow: "Taqqoslash",
    next: "Keyin esa —",
    own: "+ oʻz saytingiz va Telegram-bot",
    // telefondagi sxema sahnasi (problem.tsx → .pain__stage) yozuvlari
    stage: {"beforeTop":["×4 menejer · ×7 vazifa","har bir marketpleysda, har kuni"],"afterTop":["×7 vazifa — barcha","marketpleyslar uchun bir marta"],"boss":"Tadbirkor","bossSub":"tovar ishlab chiqaradi va sotmoqchi","manager":"Menejer","salary":"oylik ~$300","mps":"4 marketpleys","hubSub":"Bitta kabinet — barcha vazifalar bir marta yopiladi","tasks":["Kartochkalar","Qoldiqlar","Buyurtmalar","Reklama","Analitika","Hujjatlar","Yetkazish"]},
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
    eyebrow: "Сравнение",
    next: "А дальше —",
    own: "+ свой сайт и Telegram-бот",
    // telefondagi sxema sahnasi (problem.tsx → .pain__stage) yozuvlari
    stage: {"beforeTop":["×4 менеджера · ×7 задач","на каждом маркетплейсе, каждый день"],"afterTop":["×7 задач — один раз","для всех маркетплейсов"],"boss":"Предприниматель","bossSub":"производит товар и хочет продавать","manager":"Менеджер","salary":"~$300 в месяц","mps":"4 маркетплейса","hubSub":"Один кабинет — все задачи закрываются один раз","tasks":["Карточки","Остатки","Заказы","Реклама","Аналитика","Документы","Доставка"]},
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
    eyebrow: "Comparison",
    next: "Next up —",
    own: "+ your own website and Telegram bot",
    // telefondagi sxema sahnasi (problem.tsx → .pain__stage) yozuvlari
    stage: {"beforeTop":["×4 managers · ×7 tasks","on every marketplace, every day"],"afterTop":["×7 tasks — done once","for all marketplaces"],"boss":"Entrepreneur","bossSub":"makes products and wants to sell","manager":"Manager","salary":"~$300 / month","mps":"4 marketplaces","hubSub":"One dashboard — every task done once","tasks":["Listings","Stock","Orders","Ads","Analytics","Documents","Delivery"]},
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
    eyebrow: "Салыстыру",
    next: "Ал әрі қарай —",
    own: "+ өз сайтыңыз бен Telegram-бот",
    // telefondagi sxema sahnasi (problem.tsx → .pain__stage) yozuvlari
    stage: {"beforeTop":["×4 менеджер · ×7 тапсырма","әр маркетплейсте, күн сайын"],"afterTop":["×7 тапсырма — барлық","маркетплейстер үшін бір рет"],"boss":"Кәсіпкер","bossSub":"тауар шығарады және сатқысы келеді","manager":"Менеджер","salary":"айына ~$300","mps":"4 маркетплейс","hubSub":"Бір кабинет — барлық тапсырма бір рет жабылады","tasks":["Карточкалар","Қалдықтар","Тапсырыстар","Жарнама","Аналитика","Құжаттар","Жеткізу"]},
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
    eyebrow: "Салыштыруу",
    next: "Андан ары —",
    own: "+ өз сайтыңыз жана Telegram-бот",
    // telefondagi sxema sahnasi (problem.tsx → .pain__stage) yozuvlari
    stage: {"beforeTop":["×4 менеджер · ×7 тапшырма","ар бир маркетплейсте, күн сайын"],"afterTop":["×7 тапшырма — бардык","маркетплейстер үчүн бир жолу"],"boss":"Ишкер","bossSub":"товар өндүрөт жана саткысы келет","manager":"Менеджер","salary":"айына ~$300","mps":"4 маркетплейс","hubSub":"Бир кабинет — бардык тапшырмалар бир жолу жабылат","tasks":["Карточкалар","Калдыктар","Буйрутмалар","Жарнама","Аналитика","Документтер","Жеткирүү"]},
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
    eyebrow: "Salıstırıw",
    next: "Al keyin —",
    own: "+ óz saytıńız hám Telegram-bot",
    // telefondagi sxema sahnasi (problem.tsx → .pain__stage) yozuvlari
    stage: {"beforeTop":["×4 menejer · ×7 wazıypa","hár bir marketpleyste, hár kúni"],"afterTop":["×7 wazıypa — barlıq","marketpleysler ushın bir márte"],"boss":"Isbilermen","bossSub":"ónim islep shıǵaradı hám satpaqshı","manager":"Menejer","salary":"aylıǵı ~$300","mps":"4 marketpleys","hubSub":"Bir kabinet — barlıq wazıypalar bir márte orınlanadı","tasks":["Kartochkalar","Qaldıqlar","Buyırtpalar","Reklama","Analitika","Hújjetler","Jetkeriw"]},
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
    eyebrow: "Муқоиса",
    next: "Ва баъд —",
    own: "+ сайти худатон ва Telegram-бот",
    // telefondagi sxema sahnasi (problem.tsx → .pain__stage) yozuvlari
    stage: {"beforeTop":["×4 менеҷер · ×7 вазифа","дар ҳар маркетплейс, ҳар рӯз"],"afterTop":["×7 вазифа — барои ҳамаи","маркетплейсҳо як бор"],"boss":"Соҳибкор","bossSub":"мол истеҳсол мекунад ва фурӯхтан мехоҳад","manager":"Менеҷер","salary":"~$300 дар як моҳ","mps":"4 маркетплейс","hubSub":"Як кабинет — ҳамаи вазифаҳо як бор иҷро мешаванд","tasks":["Кортҳо","Бақия","Фармоишҳо","Реклама","Аналитика","Ҳуҷҷатҳо","Расонидан"]},
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
