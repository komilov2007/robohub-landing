import { defineMessages } from "@/i18n/config";
import type { CountryId } from "./globe";
import type { RegionsText } from "./regions";

type MarketMessages = {
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  lead: string;
  regions: RegionsText;
  mapLabel: string;
  mapTitle: string;
  mapText: string;
  countries: Record<CountryId, string>;
};

export const messages = defineMessages<MarketMessages>({
  uz: {
    titleStart: "Mahsulotlaringiz — ",
    titleAccent: "turli mamlakatlar marketpleyslarida",
    titleEnd: ".",
    lead: "Allaqachon savdo qilyapsizmi yoki endi boshlayapsizmi? Robohub bilan mahalliy va xalqaro platformalarda savdoni yoʻlga qoʻying. Mavjud doʻkonlaringizni ulang yoki yangilarini oching — ulanish va ilk qadamlarda yordam beramiz.",
    regions: { soon: "Tez kunda", cta: "Yangi platformalarda savdoni boshlash", ctaShort: "Savdoni boshlash", yandex: "Yandex Market", count: ["{n} ta platforma", "{n} ta platforma", "{n} ta platforma"] },
    mapLabel: "Yagona platforma — barcha bozorlar",
    mapTitle: "Butun mintaqa boʻylab soting",
    mapText: "Moskvadan Toshkentgacha — besh mamlakatdagi savdoni yagona Robohub kabinetidan yuriting.",
    countries: {
      uz: "Oʻzbekiston",
      ru: "Rossiya",
      kz: "Qozogʻiston",
      kg: "Qirgʻiziston",
      tj: "Tojikiston",
    },
  },
  ru: {
    titleStart: "Ваши товары — ",
    titleAccent: "на маркетплейсах разных стран",
    titleEnd: ".",
    lead: "Уже продаёте или только начинаете? С Robohub запускайте продажи на местных и международных площадках. Подключайте действующие магазины или открывайте новые — мы поможем с подключением и первыми шагами.",
    regions: { soon: "Скоро", cta: "Выйти на новые площадки", ctaShort: "Начать продажи", yandex: "Яндекс Маркет", count: ["{n} площадка", "{n} площадки", "{n} площадок"] },
    mapLabel: "Одна платформа — все рынки",
    mapTitle: "Продавайте по всему региону",
    mapText: "От Москвы до Ташкента — управляйте продажами в пяти странах из единого кабинета Robohub.",
    countries: {
      uz: "Узбекистан",
      ru: "Россия",
      kz: "Казахстан",
      kg: "Кыргызстан",
      tj: "Таджикистан",
    },
  },
  en: {
    titleStart: "Your products — ",
    titleAccent: "on marketplaces in different countries",
    titleEnd: ".",
    lead: "Already selling or just getting started? With Robohub, launch sales on local and international platforms. Connect your existing stores or open new ones — we’ll help with setup and the first steps.",
    regions: { soon: "Coming soon", cta: "Start selling on new platforms", ctaShort: "Start selling", yandex: "Yandex Market", count: ["{n} platform", "{n} platforms", "{n} platforms"] },
    mapLabel: "One platform — every market",
    mapTitle: "Sell across the whole region",
    mapText: "From Moscow to Tashkent — run sales in five countries from a single Robohub dashboard.",
    countries: {
      uz: "Uzbekistan",
      ru: "Russia",
      kz: "Kazakhstan",
      kg: "Kyrgyzstan",
      tj: "Tajikistan",
    },
  },
  kk: {
    titleStart: "Тауарларыңыз — ",
    titleAccent: "түрлі елдердің маркетплейстерінде",
    titleEnd: ".",
    lead: "Сауда жасап жүрсіз бе, әлде енді бастап жатырсыз ба? Robohub арқылы жергілікті және халықаралық алаңдарда сауданы жолға қойыңыз. Қолданыстағы дүкендеріңізді қосыңыз немесе жаңасын ашыңыз — қосылуға және алғашқы қадамдарға көмектесеміз.",
    regions: { soon: "Жақында", cta: "Жаңа алаңдарда сауданы бастау", ctaShort: "Сауданы бастау", yandex: "Яндекс Маркет", count: ["{n} алаң", "{n} алаң", "{n} алаң"] },
    mapLabel: "Бір платформа — барлық нарық",
    mapTitle: "Бүкіл аймақ бойынша сатыңыз",
    mapText: "Мәскеуден Ташкентке дейін — бес елдегі сауданы бірыңғай Robohub кабинетінен жүргізіңіз.",
    countries: {
      uz: "Өзбекстан",
      ru: "Ресей",
      kz: "Қазақстан",
      kg: "Қырғызстан",
      tj: "Тәжікстан",
    },
  },
  ky: {
    titleStart: "Товарларыңыз — ",
    titleAccent: "ар кайсы өлкөлөрдүн маркетплейстеринде",
    titleEnd: ".",
    lead: "Сатып жатасызбы же эми баштап жатасызбы? Robohub менен жергиликтүү жана эл аралык аянттарда сатууну жолго коюңуз. Учурдагы дүкөндөрүңүздү туташтырыңыз же жаңыларын ачыңыз — туташууда жана алгачкы кадамдарда жардам беребиз.",
    regions: { soon: "Жакында", cta: "Жаңы аянттарда сатууну баштоо", ctaShort: "Сатууну баштоо", yandex: "Яндекс Маркет", count: ["{n} аянт", "{n} аянт", "{n} аянт"] },
    mapLabel: "Бир платформа — бардык рыноктор",
    mapTitle: "Бүт аймак боюнча сатыңыз",
    mapText: "Москвадан Ташкентке чейин — беш өлкөдөгү сатууну бирдиктүү Robohub кабинетинен башкарыңыз.",
    countries: {
      uz: "Өзбекстан",
      ru: "Россия",
      kz: "Казакстан",
      kg: "Кыргызстан",
      tj: "Тажикстан",
    },
  },
  kaa: {
    titleStart: "Ónimlerińiz — ",
    titleAccent: "túrli mámleketlerdiń marketpleyslerinde",
    titleEnd: ".",
    lead: "Áwelden sawda qılıp atırsız ba yamasa endi baslap atırsız ba? Robohub penen jergilikli hám xalıqaralıq platformalarda sawdanı jolǵa qoyıń. Bar dúkanlarıńızdı jalǵań yamasa jańaların ashıń — jalǵaw hám dáslepki qádemlerde járdem beremiz.",
    regions: { soon: "Jaqın arada", cta: "Jańa platformalarda sawdanı baslaw", ctaShort: "Sawdanı baslaw", yandex: "Yandex Market", count: ["{n} platforma", "{n} platforma", "{n} platforma"] },
    mapLabel: "Bir platforma — barlıq bazarlar",
    mapTitle: "Pútkil aymaq boylap satıń",
    mapText: "Moskvadan Tashkentke shekem — bes mámlekettegi sawdanı bir Robohub kabinetinen alıp barıń.",
    countries: {
      uz: "Ózbekstan",
      ru: "Rossiya",
      kz: "Qazaqstan",
      kg: "Qırǵızstan",
      tj: "Tájikstan",
    },
  },
  tg: {
    titleStart: "Молҳои шумо — ",
    titleAccent: "дар маркетплейсҳои кишварҳои гуногун",
    titleEnd: ".",
    lead: "Аллакай савдо мекунед ё навакак оғоз карда истодаед? Бо Robohub савдоро дар платформаҳои маҳаллӣ ва байналмилалӣ ба роҳ монед. Мағозаҳои мавҷудаи худро пайваст кунед ё мағозаҳои нав кушоед — дар пайвастшавӣ ва қадамҳои аввал кумак мекунем.",
    regions: { soon: "Ба наздикӣ", cta: "Савдоро дар платформаҳои нав оғоз кунед", ctaShort: "Савдоро оғоз кунед", yandex: "Яндекс Маркет", count: ["{n} платформа", "{n} платформа", "{n} платформа"] },
    mapLabel: "Як платформа — ҳамаи бозорҳо",
    mapTitle: "Дар тамоми минтақа фурӯшед",
    mapText: "Аз Маскав то Тошкент — савдоро дар панҷ кишвар аз кабинети ягонаи Robohub идора кунед.",
    countries: {
      uz: "Ӯзбекистон",
      ru: "Русия",
      kz: "Қазоқистон",
      kg: "Қирғизистон",
      tj: "Тоҷикистон",
    },
  },
});
