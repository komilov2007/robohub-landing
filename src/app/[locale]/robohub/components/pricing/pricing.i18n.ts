import { defineMessages } from "@/i18n/config";

// Narxlar shu yerda tayyor yozilgan (sahifa birinchi ochilganda); tanlov almashganda
// pricing.script.js ularni `sep` va `cur` orqali joriy til formatida qayta yozadi
// (skriptdagi minglik ajratgich asl versiyadagidek — boʻlinmas boʻshliq).
// groups — "Tarifga nimalar kiradi": guruh nomi va bandlari. Oʻng panelda guruh bosilsa bandlari tagida ochiladi. soon — "tez kunda" marketpleyslar yozuvi (logotiplar pricing.tsx da).
export const messages = defineMessages({
  uz: {
    // Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi
    title: "Bitta tarif — ",
    titleAccent: "savdoni boshqarish uchun barcha imkoniyatlar",
    planName: " «Hammasi ichida» tarifi ",
    planSub: "Mahsulotlar, buyurtmalar, qoldiqlar, tahlil va reklama — barcha doʻkonlaringiz uchun.",
    termsLabel: "Muddat va chegirmalar",
    terms: [
      { label: "3 oy", text: "3 oy uchun toʻlov —", save: "Tejaysiz" },
      { label: "6 oy", text: "6 oy uchun toʻlov —", save: "6 oyda tejaysiz" },
      { label: "12 oy", text: "12 oy uchun toʻlov —", save: "12 oyda tejaysiz" },
    ],
    script: { sep: " ", cur: " soʻm" },
    price: "500 000",
    was: "500 000 soʻm",
    unit: "soʻm / oy",
    total: "1 500 000 soʻm",
    cta: "Robohub’ga ulanish ",
    extraBefore: "12 tagacha doʻkon — toʻrtta marketpleysning har birida 3 tadan. Qoʻshimcha doʻkon — ",
    extraPrice: "99 000 soʻm / oy",
    extraAfter: ".",
    soon: "Tez kunda",
    includesLabel: "Tarifga nimalar kiradi",
    groups: [
      {
        title: "Marketpleyslar va doʻkonlar",
        items: [
          "Uzum Market, Wildberries, Ozon va Yandex Market",
          "Har bir marketpleysda 3 tagacha doʻkon",
        ],
      },
      {
        title: "Mahsulotlar va qoldiqlar",
        items: [
          "Kartochkalarni yaratish va marketpleyslar oʻrtasida koʻchirish",
          "Excel va ulangan doʻkonlardan mahsulotlarni import qilish",
          "Turli platformalardagi bir xil mahsulotlarni birlashtirish",
          "Narx va qoldiqlarni ommaviy oʻzgartirish",
          "Qoldiqlarni avtomatik sinxronlash",
          "FBO omborlariga mahsulot yetkazishni rejalashtirish",
          "Marketpleys omborlarida yoʻqolgan mahsulotlarni nazorat qilish",
        ],
      },
      {
        title: "Buyurtmalar",
        items: [
          "Barcha buyurtma va holatlar yagona roʻyxatda",
          "Buyurtmalarni yigʻish va etiketkalarni guruhlab chop etish",
          "FBS, FBO va DBS modellari bilan ishlash",
        ],
      },
      {
        title: "Tahlil va moliya",
        items: [
          "Barcha doʻkonlar boʻyicha umumiy boshqaruv paneli",
          "Savdo, xarajat, foyda va qaytarishlar",
          "Har bir mahsulot boʻyicha unit-iqtisodiyot",
          "Tannarx, komissiya, logistika va reklama xarajatlari hisobi",
          "Reklama samaradorligi tahlili",
          "Assortimentning ABC/XYZ tahlili",
          "Marketpleyslar va raqobatchilarning tashqi tahlili",
        ],
      },
      {
        title: "Reklama va aksiyalar",
        items: [
          "Reklama stavkalarini boshqaruvchi avtobidder",
          "Promokodlarni boshqarish",
          "Marketpleys aksiyalari taqvimi",
          "Mahsulot kartochkalarini yaxshilash vositalari",
        ],
      },
      {
        title: "Xaridorlar",
        items: [
          "Ulangan platformalardagi xaridorlar xabarlari",
          "Sharhlar va baholar bilan ishlash",
          "Yulduzlar soniga qarab sharhlarga avtomatik javoblar",
        ],
      },
      {
        title: "AI yordamchi",
        items: [
          "Mahsulot nomi va tavsifini tayyorlashda yordam",
          "Sharhlarga javoblar tayyorlash",
          "Mahsulotlar, qoldiqlar va reklama boʻyicha tavsiyalar",
        ],
      },
      {
        title: "Qoʻllab-quvvatlash",
        items: [
          "Doʻkonlarni ulash va sozlashda yordam",
          "Qoʻllanmalar va videodarslar",
          "Telefon va Telegram orqali yordam",
        ],
      },
    ],
  },
  ru: {
    title: "Один тариф — ",
    titleAccent: "всё для управления продажами",
    planName: " Тариф «Всё включено» ",
    planSub: "Товары, заказы, остатки, аналитика и продвижение — для всех ваших магазинов.",
    termsLabel: "Срок и скидки",
    terms: [
      { label: "3 месяца", text: "При оплате за 3 месяца —", save: "Экономия" },
      { label: "6 месяцев", text: "При оплате за 6 месяцев —", save: "Экономия за 6 месяцев" },
      { label: "12 месяцев", text: "При оплате за 12 месяцев —", save: "Экономия за 12 месяцев" },
    ],
    script: { sep: " ", cur: " сум" },
    price: "500 000",
    was: "500 000 сум",
    unit: "сум / месяц",
    total: "1 500 000 сум",
    cta: "Подключить Robohub ",
    extraBefore: "До 12 магазинов — по 3 на каждом из четырёх маркетплейсов. Дополнительный магазин — ",
    extraPrice: "99 000 сум / месяц",
    extraAfter: ".",
    soon: "Скоро",
    includesLabel: "Что входит в тариф",
    groups: [
      {
        title: "Маркетплейсы и магазины",
        items: [
          "Uzum Market, Wildberries, Ozon и Яндекс Маркет",
          "До 3 магазинов на каждом маркетплейсе",
        ],
      },
      {
        title: "Товары и остатки",
        items: [
          "Создание карточек и перенос между маркетплейсами",
          "Импорт товаров из Excel и подключённых магазинов",
          "Объединение одинаковых товаров с разных площадок",
          "Массовое изменение цен и остатков",
          "Автоматическая синхронизация остатков",
          "Планирование поставок на склады FBO",
          "Контроль потерянных товаров на складах маркетплейсов",
        ],
      },
      {
        title: "Заказы",
        items: [
          "Все заказы и статусы в одной ленте",
          "Сборка заказов и пакетная печать этикеток",
          "Работа с моделями FBS, FBO и DBS",
        ],
      },
      {
        title: "Аналитика и финансы",
        items: [
          "Общий дашборд по всем магазинам",
          "Продажи, расходы, прибыль и возвраты",
          "Юнит-экономика каждого товара",
          "Учёт себестоимости, комиссий, логистики и рекламы",
          "Анализ эффективности рекламы",
          "ABC/XYZ-анализ ассортимента",
          "Внешняя аналитика маркетплейсов и конкурентов",
        ],
      },
      {
        title: "Продвижение",
        items: [
          "Автобиддер для управления рекламными ставками",
          "Управление промокодами",
          "Календарь акций маркетплейсов",
          "Инструменты улучшения товарных карточек",
        ],
      },
      {
        title: "Покупатели",
        items: [
          "Сообщения покупателей с подключённых площадок",
          "Работа с отзывами и оценками",
          "Автоматические ответы на отзывы по количеству звёзд",
        ],
      },
      {
        title: "AI-помощник",
        items: [
          "Помощь с названиями и описаниями товаров",
          "Подготовка ответов на отзывы",
          "Рекомендации по товарам, остаткам и продвижению",
        ],
      },
      {
        title: "Поддержка",
        items: [
          "Помощь с подключением магазинов и настройкой",
          "Инструкции и видеоуроки",
          "Поддержка по телефону и в Telegram",
        ],
      },
    ],
  },
  en: {
    title: "One plan — ",
    titleAccent: "everything you need to manage sales",
    planName: " “All-in-one” plan ",
    planSub: "Products, orders, stock, analytics and promotion — for all your stores.",
    termsLabel: "Term and discounts",
    terms: [
      { label: "3 months", text: "Paid for 3 months —", save: "You save" },
      { label: "6 months", text: "Paid for 6 months —", save: "You save over 6 months" },
      { label: "12 months", text: "Paid for 12 months —", save: "You save over 12 months" },
    ],
    script: { sep: ",", cur: " UZS" },
    price: "500,000",
    was: "500,000 UZS",
    unit: "UZS / month",
    total: "1,500,000 UZS",
    cta: "Connect Robohub ",
    extraBefore: "Up to 12 stores — 3 on each of the four marketplaces. Extra store — ",
    extraPrice: "99,000 UZS / month",
    extraAfter: ".",
    soon: "Coming soon",
    includesLabel: "What’s included",
    groups: [
      {
        title: "Marketplaces and stores",
        items: [
          "Uzum Market, Wildberries, Ozon and Yandex Market",
          "Up to 3 stores on each marketplace",
        ],
      },
      {
        title: "Products and stock",
        items: [
          "Create product cards and move them between marketplaces",
          "Import products from Excel and connected stores",
          "Merge identical products from different platforms",
          "Bulk price and stock updates",
          "Automatic stock sync",
          "Plan shipments to FBO warehouses",
          "Track lost products in marketplace warehouses",
        ],
      },
      {
        title: "Orders",
        items: [
          "All orders and statuses in one feed",
          "Order picking and batch label printing",
          "Work with FBS, FBO and DBS models",
        ],
      },
      {
        title: "Analytics and finance",
        items: [
          "One dashboard for all stores",
          "Sales, expenses, profit and returns",
          "Unit economics for every product",
          "Cost, commission, logistics and ad spend accounting",
          "Ad performance analysis",
          "ABC/XYZ assortment analysis",
          "External analytics of marketplaces and competitors",
        ],
      },
      {
        title: "Promotion",
        items: [
          "Autobidder to manage ad bids",
          "Promo code management",
          "Marketplace promotions calendar",
          "Tools to improve product cards",
        ],
      },
      {
        title: "Customers",
        items: [
          "Customer messages from connected platforms",
          "Work with reviews and ratings",
          "Automatic replies to reviews by star rating",
        ],
      },
      {
        title: "AI assistant",
        items: [
          "Help with product titles and descriptions",
          "Drafting replies to reviews",
          "Recommendations on products, stock and promotion",
        ],
      },
      {
        title: "Support",
        items: [
          "Help with connecting stores and setup",
          "Guides and video lessons",
          "Support by phone and Telegram",
        ],
      },
    ],
  },
  kk: {
    title: "Бір тариф — ",
    titleAccent: "сауданы басқаруға арналған барлық мүмкіндік",
    planName: " «Бәрі ішінде» тарифі ",
    planSub: "Тауарлар, тапсырыстар, қалдықтар, талдау және жарнама — барлық дүкендеріңіз үшін.",
    termsLabel: "Мерзім және жеңілдіктер",
    terms: [
      { label: "3 ай", text: "3 айға төлегенде —", save: "Үнемдейсіз" },
      { label: "6 ай", text: "6 айға төлегенде —", save: "6 айда үнемдейсіз" },
      { label: "12 ай", text: "12 айға төлегенде —", save: "12 айда үнемдейсіз" },
    ],
    script: { sep: " ", cur: " сум" },
    price: "500 000",
    was: "500 000 сум",
    unit: "сум / ай",
    total: "1 500 000 сум",
    cta: "Robohub-қа қосылу ",
    extraBefore: "12 дүкенге дейін — төрт маркетплейстің әрқайсысында 3-тен. Қосымша дүкен — ",
    extraPrice: "99 000 сум / ай",
    extraAfter: ".",
    soon: "Жақында",
    includesLabel: "Тарифке не кіреді",
    groups: [
      {
        title: "Маркетплейстер мен дүкендер",
        items: [
          "Uzum Market, Wildberries, Ozon және Яндекс Маркет",
          "Әр маркетплейсте 3 дүкенге дейін",
        ],
      },
      {
        title: "Тауарлар мен қалдықтар",
        items: [
          "Карточкалар жасау және оларды маркетплейстер арасында көшіру",
          "Excel-ден және қосылған дүкендерден тауарларды импорттау",
          "Әртүрлі алаңдардағы бірдей тауарларды біріктіру",
          "Бағалар мен қалдықтарды жаппай өзгерту",
          "Қалдықтарды автоматты синхрондау",
          "FBO қоймаларына жеткізілімдерді жоспарлау",
          "Маркетплейс қоймаларында жоғалған тауарларды бақылау",
        ],
      },
      {
        title: "Тапсырыстар",
        items: [
          "Барлық тапсырыс пен мәртебе бір тізімде",
          "Тапсырыстарды жинау және этикеткаларды топтап басып шығару",
          "FBS, FBO және DBS модельдерімен жұмыс",
        ],
      },
      {
        title: "Талдау және қаржы",
        items: [
          "Барлық дүкен бойынша ортақ басқару панелі",
          "Сатылымдар, шығындар, пайда және қайтарулар",
          "Әр тауар бойынша юнит-экономика",
          "Өзіндік құн, комиссия, логистика және жарнама шығындарын есепке алу",
          "Жарнама тиімділігін талдау",
          "Ассортиментті ABC/XYZ талдау",
          "Маркетплейстер мен бәсекелестерді сыртқы талдау",
        ],
      },
      {
        title: "Жарнама және акциялар",
        items: [
          "Жарнама ставкаларын басқаратын автобиддер",
          "Промокодтарды басқару",
          "Маркетплейс акцияларының күнтізбесі",
          "Тауар карточкаларын жақсарту құралдары",
        ],
      },
      {
        title: "Сатып алушылар",
        items: [
          "Қосылған алаңдардағы сатып алушылардың хабарламалары",
          "Пікірлер мен бағалармен жұмыс",
          "Жұлдыз санына қарай пікірлерге автоматты жауаптар",
        ],
      },
      {
        title: "AI көмекші",
        items: [
          "Тауар атауы мен сипаттамасын дайындауға көмек",
          "Пікірлерге жауап дайындау",
          "Тауарлар, қалдықтар және жарнама бойынша ұсыныстар",
        ],
      },
      {
        title: "Қолдау",
        items: [
          "Дүкендерді қосуға және баптауға көмек",
          "Нұсқаулықтар мен бейнесабақтар",
          "Телефон және Telegram арқылы қолдау",
        ],
      },
    ],
  },
  ky: {
    title: "Бир тариф — ",
    titleAccent: "сатууну башкаруу үчүн бардык мүмкүнчүлүктөр",
    planName: " «Баары ичинде» тарифи ",
    planSub: "Товарлар, буйрутмалар, калдыктар, талдоо жана жарнама — бардык дүкөндөрүңүз үчүн.",
    termsLabel: "Мөөнөт жана арзандатуулар",
    terms: [
      { label: "3 ай", text: "3 айга төлөгөндө —", save: "Үнөмдөйсүз" },
      { label: "6 ай", text: "6 айга төлөгөндө —", save: "6 айда үнөмдөйсүз" },
      { label: "12 ай", text: "12 айга төлөгөндө —", save: "12 айда үнөмдөйсүз" },
    ],
    script: { sep: " ", cur: " сум" },
    price: "500 000",
    was: "500 000 сум",
    unit: "сум / ай",
    total: "1 500 000 сум",
    cta: "Robohub-ка туташуу ",
    extraBefore: "12 дүкөнгө чейин — төрт маркетплейстин ар биринде 3төн. Кошумча дүкөн — ",
    extraPrice: "99 000 сум / ай",
    extraAfter: ".",
    soon: "Жакында",
    includesLabel: "Тарифке эмнелер кирет",
    groups: [
      {
        title: "Маркетплейстер жана дүкөндөр",
        items: [
          "Uzum Market, Wildberries, Ozon жана Яндекс Маркет",
          "Ар бир маркетплейсте 3 дүкөнгө чейин",
        ],
      },
      {
        title: "Товарлар жана калдыктар",
        items: [
          "Карточкаларды түзүү жана маркетплейстердин ортосунда көчүрүү",
          "Excel-ден жана туташкан дүкөндөрдөн товарларды импорттоо",
          "Ар кайсы аянттардагы бирдей товарларды бириктирүү",
          "Бааларды жана калдыктарды жапырт өзгөртүү",
          "Калдыктарды автоматтык синхрондоо",
          "FBO кампаларына жеткирүүлөрдү пландаштыруу",
          "Маркетплейс кампаларында жоголгон товарларды көзөмөлдөө",
        ],
      },
      {
        title: "Буйрутмалар",
        items: [
          "Бардык буйрутмалар жана статустар бир тизмеде",
          "Буйрутмаларды жыйноо жана этикеткаларды топтоп басып чыгаруу",
          "FBS, FBO жана DBS моделдери менен иштөө",
        ],
      },
      {
        title: "Талдоо жана каржы",
        items: [
          "Бардык дүкөндөр боюнча жалпы башкаруу панели",
          "Сатуулар, чыгымдар, киреше жана кайтаруулар",
          "Ар бир товар боюнча юнит-экономика",
          "Өздүк нарк, комиссия, логистика жана жарнама чыгымдарын эсепке алуу",
          "Жарнаманын натыйжалуулугун талдоо",
          "Ассортиментти ABC/XYZ талдоо",
          "Маркетплейстерди жана атаандаштарды тышкы талдоо",
        ],
      },
      {
        title: "Жарнама жана акциялар",
        items: [
          "Жарнама ставкаларын башкарган автобиддер",
          "Промокоддорду башкаруу",
          "Маркетплейс акцияларынын календары",
          "Товар карточкаларын жакшыртуу куралдары",
        ],
      },
      {
        title: "Сатып алуучулар",
        items: [
          "Туташкан аянттардагы сатып алуучулардын билдирүүлөрү",
          "Пикирлер жана баалар менен иштөө",
          "Жылдыздардын санына жараша пикирлерге автоматтык жооптор",
        ],
      },
      {
        title: "AI жардамчы",
        items: [
          "Товардын аталышын жана сүрөттөмөсүн даярдоого жардам",
          "Пикирлерге жооп даярдоо",
          "Товарлар, калдыктар жана жарнама боюнча сунуштар",
        ],
      },
      {
        title: "Колдоо",
        items: [
          "Дүкөндөрдү туташтырууга жана жөндөөгө жардам",
          "Колдонмолор жана видеосабактар",
          "Телефон жана Telegram аркылуу колдоо",
        ],
      },
    ],
  },
  kaa: {
    title: "Bir tarif — ",
    titleAccent: "sawdanı basqarıw ushın barlıq múmkinshilikler",
    planName: " “Hámmesi ishinde” tarifi ",
    planSub: "Ónimler, buyırtpalar, qaldıqlar, analiz hám reklama — barlıq dúkanlarıńız ushın.",
    termsLabel: "Múddet hám shegirmeler",
    terms: [
      { label: "3 ay", text: "3 ay ushın tólem —", save: "Únemleysiz" },
      { label: "6 ay", text: "6 ay ushın tólem —", save: "6 ayda únemleysiz" },
      { label: "12 ay", text: "12 ay ushın tólem —", save: "12 ayda únemleysiz" },
    ],
    script: { sep: " ", cur: " swm" },
    price: "500 000",
    was: "500 000 swm",
    unit: "swm / ay",
    total: "1 500 000 swm",
    cta: "Robohub-qa jalǵanıw ",
    extraBefore: "12 dúkanǵa shekem — tórt marketpleystiń hár birinde 3 danadan. Qosımsha dúkan — ",
    extraPrice: "99 000 swm / ay",
    extraAfter: ".",
    soon: "Jaqın arada",
    includesLabel: "Tarifke neler kiredi",
    groups: [
      {
        title: "Marketpleysler hám dúkanlar",
        items: [
          "Uzum Market, Wildberries, Ozon hám Yandex Market",
          "Hár bir marketpleyste 3 dúkanǵa shekem",
        ],
      },
      {
        title: "Ónimler hám qaldıqlar",
        items: [
          "Kartochkalardı jaratıw hám marketpleysler arasında kóshiriw",
          "Excel hám jalǵanǵan dúkanlardan ónimlerdi import etiw",
          "Túrli platformalardaǵı birdey ónimlerdi birlestiriw",
          "Baha hám qaldıqlardı kóplep ózgertiw",
          "Qaldıqlardı avtomat sinxronlaw",
          "FBO qoymalarına ónim jetkeriwdi rejelestiriw",
          "Marketpleys qoymalarında joǵalǵan ónimlerdi qadaǵalaw",
        ],
      },
      {
        title: "Buyırtpalar",
        items: [
          "Barlıq buyırtpa hám jaǵdaylar bir dizimde",
          "Buyırtpalardı jıynaw hám etiketkalardı toplap basıp shıǵarıw",
          "FBS, FBO hám DBS modelleri menen islew",
        ],
      },
      {
        title: "Analiz hám qarjı",
        items: [
          "Barlıq dúkanlar boyınsha ulıwma basqarıw paneli",
          "Sawda, shıǵın, payda hám qaytarıwlar",
          "Hár bir ónim boyınsha unit-ekonomika",
          "Ózine túser baha, komissiya, logistika hám reklama shıǵınların esapqa alıw",
          "Reklama nátiyjeliliginiń analizi",
          "Assortimenttiń ABC/XYZ analizi",
          "Marketpleysler hám básekileslerdiń sırtqı analizi",
        ],
      },
      {
        title: "Reklama hám aksiyalar",
        items: [
          "Reklama stavkaların basqaratuǵın avtobidder",
          "Promokodlardı basqarıw",
          "Marketpleys aksiyalarınıń kalendarı",
          "Ónim kartochkaların jaqsılaw quralları",
        ],
      },
      {
        title: "Xarıdarlar",
        items: [
          "Jalǵanǵan platformalardaǵı xarıdarlar xabarları",
          "Pikirler hám bahalar menen islew",
          "Juldızlar sanına qarap pikirlerge avtomat juwaplar",
        ],
      },
      {
        title: "AI járdemshi",
        items: [
          "Ónim atı hám táriypin tayarlawda járdem",
          "Pikirlerge juwap tayarlaw",
          "Ónimler, qaldıqlar hám reklama boyınsha usınıslar",
        ],
      },
      {
        title: "Qollap-quwatlaw",
        items: [
          "Dúkanlardı jalǵaw hám sazlawda járdem",
          "Qollanbalar hám video sabaqlar",
          "Telefon hám Telegram arqalı járdem",
        ],
      },
    ],
  },
  tg: {
    title: "Як тариф — ",
    titleAccent: "ҳамаи имкониятҳо барои идораи савдо",
    planName: " Тарифи «Ҳама дохил» ",
    planSub: "Молҳо, фармоишҳо, бақияҳо, таҳлил ва реклама — барои ҳамаи мағозаҳои шумо.",
    termsLabel: "Мӯҳлат ва тахфифҳо",
    terms: [
      { label: "3 моҳ", text: "Ҳангоми пардохт барои 3 моҳ —", save: "Сарфа" },
      { label: "6 моҳ", text: "Ҳангоми пардохт барои 6 моҳ —", save: "Сарфа дар 6 моҳ" },
      { label: "12 моҳ", text: "Ҳангоми пардохт барои 12 моҳ —", save: "Сарфа дар 12 моҳ" },
    ],
    script: { sep: " ", cur: " сӯм" },
    price: "500 000",
    was: "500 000 сӯм",
    unit: "сӯм / моҳ",
    total: "1 500 000 сӯм",
    cta: "Ба Robohub пайваст шавед ",
    extraBefore: "То 12 мағоза — дар ҳар яке аз чор маркетплейс то 3 мағоза. Мағозаи иловагӣ — ",
    extraPrice: "99 000 сӯм / моҳ",
    extraAfter: ".",
    soon: "Ба наздикӣ",
    includesLabel: "Ба тариф чӣ дохил мешавад",
    groups: [
      {
        title: "Маркетплейсҳо ва мағозаҳо",
        items: [
          "Uzum Market, Wildberries, Ozon ва Яндекс Маркет",
          "То 3 мағоза дар ҳар маркетплейс",
        ],
      },
      {
        title: "Молҳо ва бақияҳо",
        items: [
          "Сохтани карточкаҳо ва интиқоли онҳо байни маркетплейсҳо",
          "Воридоти мол аз Excel ва мағозаҳои пайвастшуда",
          "Муттаҳид кардани молҳои якхела аз платформаҳои гуногун",
          "Тағйири оммавии нархҳо ва бақияҳо",
          "Ҳамоҳангсозии худкори бақияҳо",
          "Банақшагирии таҳвил ба анборҳои FBO",
          "Назорати молҳои гумшуда дар анборҳои маркетплейсҳо",
        ],
      },
      {
        title: "Фармоишҳо",
        items: [
          "Ҳамаи фармоишҳо ва ҳолатҳо дар як рӯйхат",
          "Ҷамъоварии фармоишҳо ва чопи гурӯҳии тамғаҳо",
          "Кор бо моделҳои FBS, FBO ва DBS",
        ],
      },
      {
        title: "Таҳлил ва молия",
        items: [
          "Панели умумии идора барои ҳамаи мағозаҳо",
          "Фурӯш, хароҷот, фоида ва баргардониҳо",
          "Юнит-иқтисодиёти ҳар як мол",
          "Ба ҳисобгирии арзиши аслӣ, комиссия, логистика ва хароҷоти реклама",
          "Таҳлили самаранокии реклама",
          "Таҳлили ABC/XYZ-и ассортимент",
          "Таҳлили берунии маркетплейсҳо ва рақибон",
        ],
      },
      {
        title: "Реклама ва аксияҳо",
        items: [
          "Автобиддер барои идораи ставкаҳои реклама",
          "Идораи промокодҳо",
          "Тақвими аксияҳои маркетплейсҳо",
          "Абзорҳои беҳтар кардани карточкаҳои мол",
        ],
      },
      {
        title: "Харидорон",
        items: [
          "Паёмҳои харидорон аз платформаҳои пайвастшуда",
          "Кор бо шарҳҳо ва баҳоҳо",
          "Ҷавобҳои худкор ба шарҳҳо аз рӯи шумораи ситораҳо",
        ],
      },
      {
        title: "Ёрдамчии AI",
        items: [
          "Кумак дар омода кардани ном ва тавсифи мол",
          "Омода кардани ҷавоб ба шарҳҳо",
          "Тавсияҳо оид ба молҳо, бақияҳо ва реклама",
        ],
      },
      {
        title: "Дастгирӣ",
        items: [
          "Кумак дар пайваст ва танзими мағозаҳо",
          "Дастурҳо ва дарсҳои видеоӣ",
          "Дастгирӣ тавассути телефон ва Telegram",
        ],
      },
    ],
  },
});
