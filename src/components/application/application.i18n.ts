import { defineMessages } from "@/i18n/config";

// Ariza formasi matnlari — tuzilishi ikkala sayt uchun bir xil (FormMessages); Robosell'niki: robosell.i18n.ts.
// steps — qadam id'si bo'yicha; options — steps.ts dagi variantlar tartibida (CRM'ga esa o'zbekcha value ketadi).
export type StepCopy = {
  title: string;
  options?: readonly string[];
  otherPlaceholder?: string;
  placeholder?: string;
};

export type FormMessages = {
  metaTitle: string;
  metaDescription: string;
  hero: { title: string; text?: string }; // 1-qadam tepasidagi sarlavha
  steps: Record<string, StepCopy>;
  multiHint: string;
  radioHint: string;
  next: string;
  submit: string;
  back: string;
  home: string;
  lang: string;
  call: string;
  progress: string;
  errors: { name: string; phone: string; other: string };
  sendError: string;
  success: {
    title: string;
    text: string;
    listTitle: string;
    points: readonly string[];
    time: string;
    callHint: string;
    call: string;
    restart: string;
  };
};

// Robohub — marketpleys sellerlari formasi
export const messages = defineMessages<FormMessages>({
  uz: {
    metaTitle: "Ariza qoldiring",
    metaDescription:
      "Mahsulotlarni bir vaqtning o‘zida bir nechta marketplace’ga yuklang, buyurtmalarni boshqaring, qoldiqlarni sinxronlashtiring va biznesingizni tizimlashtiring.",
    hero: {
      title: "O‘zbekistonda marketplace sellerlari uchun yagona kabinet — Robohub.uz rasman ishga tushdi",
      text: "Mahsulotlarni bir vaqtning o‘zida bir nechta marketplace’ga yuklang, buyurtmalarni boshqaring, qoldiqlarni sinxronlashtiring va biznesingizni tizimlashtiring.",
    },
    steps: {
      whichMarketplaces: {
        title: "Qaysi marketpleyslarda sotuv qilasiz?",
        options: ["Uzum Market", "Wildberries", "Ozon", "Yandex Market", "Hali sotmayman", "Boshqa"],
        otherPlaceholder: "Marketpleys nomini yozing",
      },
      productCount: {
        title: "Assortimentingizda nechta tovar (SKU) bor?",
        options: ["1 – 100 ta tovar", "101 – 500 ta tovar", "501 – 1000 ta tovar", "1000+ ta tovar"],
      },
      salesModel: {
        title: "Marketpleysda qaysi savdo modeli orqali ishlaysiz?",
        options: ["FBO", "FBS", "DBS", "EBDS", "Bilmayman / aniqlashtirish qiyin"],
      },
      marketplaceProblems: {
        title: "Marketpleyslarda ishlashda qaysi muammoga duch kelasiz?",
        options: [
          "Buyurtmalarni boshqarish qiyin",
          "Ombor hisobini yuritish qiyin",
          "Narxlarni yangilash qiyin",
          "Bir nechta marketpleysni boshqarish qiyin",
          "Analitika yetishmaydi",
          "Boshqa",
        ],
        otherPlaceholder: "Muammoingizni yozing",
      },
      storeName: {
        title: "Ismingiz va do‘kon / brend / ilova nomini yozib qoldiring",
        placeholder: "Masalan: Ali Shop",
      },
      phone: {
        title: "Telefon raqamingizni qoldiring",
        placeholder: "90 123 45 67",
      },
    },
    multiHint: "Bir nechtasini tanlash mumkin",
    radioHint: "Bittasini tanlang",
    next: "Davom etish",
    submit: "Yuborish",
    back: "Orqaga",
    home: "Bosh sahifa",
    lang: "Til tanlash",
    call: "Qo‘ng‘iroq qilish",
    progress: "Qadam",
    errors: {
      name: "Kamida 2 ta belgi yozing",
      phone: "Telefon raqamini to‘liq kiriting",
      other: "Javobingizni yozing",
    },
    sendError: "Yuborilmadi. Qayta urinib ko‘ring yoki bizga qo‘ng‘iroq qiling.",
    success: {
      title: "Arizangiz qabul qilindi",
      text: "Rahmat! Marketplace’lardagi savdolaringizni boshqarish va rivojlantirish bo‘yicha so‘rovingiz qabul qilindi.",
      listTitle: "Robohub mutaxassisi siz bilan bog‘lanib:",
      points: [
        "biznesingizni qisqacha tahlil qiladi",
        "marketplace’lardagi jarayonlarni soddalashtirish yo‘llarini ko‘rsatadi",
        "tovarlar, zakazlar va qoldiqlarni bir joydan boshqarish imkoniyatlarini tushuntiradi",
        "Robohub orqali sotuvni masshtabga olib chiqish imkoniyatlarini ko‘rsatadi",
      ],
      time: "Odatda biz 10–15 daqiqa ichida siz bilan bog‘lanamiz.",
      callHint: "Agar hozir gaplashish qulay bo‘lsa, quyidagi tugma orqali bog‘lanishingiz mumkin.",
      call: "Bog‘lanish",
      restart: "Anketani qayta to‘ldirish",
    },
  },
  ru: {
    metaTitle: "Оставьте заявку",
    metaDescription:
      "Загружайте товары сразу на несколько маркетплейсов, управляйте заказами, синхронизируйте остатки и наведите порядок в бизнесе.",
    hero: {
      title: "Единый кабинет для селлеров маркетплейсов в Узбекистане — Robohub.uz официально запущен",
      text: "Загружайте товары сразу на несколько маркетплейсов, управляйте заказами, синхронизируйте остатки и наведите порядок в бизнесе.",
    },
    steps: {
      whichMarketplaces: {
        title: "На каких маркетплейсах вы продаёте?",
        options: ["Uzum Market", "Wildberries", "Ozon", "Яндекс Маркет", "Пока не продаю", "Другое"],
        otherPlaceholder: "Напишите название маркетплейса",
      },
      productCount: {
        title: "Сколько товаров (SKU) в вашем ассортименте?",
        options: ["1 – 100 товаров", "101 – 500 товаров", "501 – 1000 товаров", "1000+ товаров"],
      },
      salesModel: {
        title: "По какой модели вы работаете на маркетплейсе?",
        options: ["FBO", "FBS", "DBS", "EBDS", "Не знаю / сложно сказать"],
      },
      marketplaceProblems: {
        title: "С какими проблемами вы сталкиваетесь на маркетплейсах?",
        options: [
          "Сложно управлять заказами",
          "Сложно вести складской учёт",
          "Сложно обновлять цены",
          "Сложно управлять несколькими маркетплейсами",
          "Не хватает аналитики",
          "Другое",
        ],
        otherPlaceholder: "Опишите вашу проблему",
      },
      storeName: {
        title: "Напишите ваше имя и название магазина / бренда / приложения",
        placeholder: "Например: Ali Shop",
      },
      phone: {
        title: "Оставьте номер телефона",
        placeholder: "90 123 45 67",
      },
    },
    multiHint: "Можно выбрать несколько",
    radioHint: "Выберите один вариант",
    next: "Продолжить",
    submit: "Отправить",
    back: "Назад",
    home: "Главная",
    lang: "Выбор языка",
    call: "Позвонить",
    progress: "Шаг",
    errors: {
      name: "Введите не менее 2 символов",
      phone: "Введите номер полностью",
      other: "Напишите ваш ответ",
    },
    sendError: "Не удалось отправить. Попробуйте ещё раз или позвоните нам.",
    success: {
      title: "Ваша заявка принята",
      text: "Спасибо! Ваш запрос по управлению и развитию продаж на маркетплейсах принят.",
      listTitle: "Специалист Robohub свяжется с вами и:",
      points: [
        "кратко проанализирует ваш бизнес",
        "покажет, как упростить процессы на маркетплейсах",
        "расскажет, как управлять товарами, заказами и остатками из одного места",
        "покажет, как масштабировать продажи с Robohub",
      ],
      time: "Обычно мы связываемся в течение 10–15 минут.",
      callHint: "Если вам удобно поговорить сейчас, свяжитесь с нами по кнопке ниже.",
      call: "Связаться",
      restart: "Заполнить анкету заново",
    },
  },
  en: {
    metaTitle: "Leave a request",
    metaDescription:
      "List products on several marketplaces at once, manage orders, sync stock and bring order to your business.",
    hero: {
      title: "One dashboard for marketplace sellers in Uzbekistan — Robohub.uz has officially launched",
      text: "List products on several marketplaces at once, manage orders, sync stock and bring order to your business.",
    },
    steps: {
      whichMarketplaces: {
        title: "Which marketplaces do you sell on?",
        options: ["Uzum Market", "Wildberries", "Ozon", "Yandex Market", "Not selling yet", "Other"],
        otherPlaceholder: "Type the marketplace name",
      },
      productCount: {
        title: "How many products (SKUs) are in your range?",
        options: ["1 – 100 products", "101 – 500 products", "501 – 1000 products", "1000+ products"],
      },
      salesModel: {
        title: "Which fulfilment model do you use on the marketplace?",
        options: ["FBO", "FBS", "DBS", "EBDS", "Not sure / hard to say"],
      },
      marketplaceProblems: {
        title: "What problems do you face on marketplaces?",
        options: [
          "Hard to manage orders",
          "Hard to keep track of stock",
          "Hard to update prices",
          "Hard to manage several marketplaces",
          "Not enough analytics",
          "Other",
        ],
        otherPlaceholder: "Describe your problem",
      },
      storeName: {
        title: "Your name and the name of your store / brand / app",
        placeholder: "For example: Ali Shop",
      },
      phone: {
        title: "Leave your phone number",
        placeholder: "90 123 45 67",
      },
    },
    multiHint: "You can pick several",
    radioHint: "Pick one",
    next: "Continue",
    submit: "Submit",
    back: "Back",
    home: "Home",
    lang: "Choose language",
    call: "Call",
    progress: "Step",
    errors: {
      name: "Enter at least 2 characters",
      phone: "Enter the full phone number",
      other: "Type your answer",
    },
    sendError: "Couldn’t send. Please try again or give us a call.",
    success: {
      title: "Your request has been received",
      text: "Thank you! We’ve received your request about managing and growing your marketplace sales.",
      listTitle: "A Robohub specialist will contact you and:",
      points: [
        "briefly analyse your business",
        "show ways to simplify your marketplace processes",
        "explain how to manage products, orders and stock in one place",
        "show how to scale your sales with Robohub",
      ],
      time: "We usually get in touch within 10–15 minutes.",
      callHint: "If it’s convenient to talk now, reach us with the button below.",
      call: "Contact us",
      restart: "Fill in the form again",
    },
  },
  kk: {
    metaTitle: "Өтінім қалдырыңыз",
    metaDescription:
      "Тауарларды бірден бірнеше маркетплейске жүктеңіз, тапсырыстарды басқарыңыз, қалдықтарды синхрондаңыз және бизнесіңізді жүйеге келтіріңіз.",
    hero: {
      title: "Өзбекстандағы маркетплейс селлерлеріне арналған бірыңғай кабинет — Robohub.uz ресми түрде іске қосылды",
      text: "Тауарларды бірден бірнеше маркетплейске жүктеңіз, тапсырыстарды басқарыңыз, қалдықтарды синхрондаңыз және бизнесіңізді жүйеге келтіріңіз.",
    },
    steps: {
      whichMarketplaces: {
        title: "Қай маркетплейстерде сатасыз?",
        options: ["Uzum Market", "Wildberries", "Ozon", "Yandex Market", "Әзірге сатпаймын", "Басқа"],
        otherPlaceholder: "Маркетплейс атауын жазыңыз",
      },
      productCount: {
        title: "Ассортиментіңізде қанша тауар (SKU) бар?",
        options: ["1 – 100 тауар", "101 – 500 тауар", "501 – 1000 тауар", "1000+ тауар"],
      },
      salesModel: {
        title: "Маркетплейсте қай сауда моделімен жұмыс істейсіз?",
        options: ["FBO", "FBS", "DBS", "EBDS", "Білмеймін / айту қиын"],
      },
      marketplaceProblems: {
        title: "Маркетплейстерде қандай қиындықтарға тап боласыз?",
        options: [
          "Тапсырыстарды басқару қиын",
          "Қойма есебін жүргізу қиын",
          "Бағаларды жаңарту қиын",
          "Бірнеше маркетплейсті басқару қиын",
          "Аналитика жетіспейді",
          "Басқа",
        ],
        otherPlaceholder: "Қиындығыңызды жазыңыз",
      },
      storeName: {
        title: "Атыңызды және дүкен / бренд / қосымша атауын жазыңыз",
        placeholder: "Мысалы: Ali Shop",
      },
      phone: {
        title: "Телефон нөміріңізді қалдырыңыз",
        placeholder: "90 123 45 67",
      },
    },
    multiHint: "Бірнешеуін таңдауға болады",
    radioHint: "Біреуін таңдаңыз",
    next: "Жалғастыру",
    submit: "Жіберу",
    back: "Артқа",
    home: "Басты бет",
    lang: "Тілді таңдау",
    call: "Қоңырау шалу",
    progress: "Қадам",
    errors: {
      name: "Кемінде 2 таңба енгізіңіз",
      phone: "Телефон нөмірін толық енгізіңіз",
      other: "Жауабыңызды жазыңыз",
    },
    sendError: "Жіберілмеді. Қайталап көріңіз немесе бізге қоңырау шалыңыз.",
    success: {
      title: "Өтініміңіз қабылданды",
      text: "Рақмет! Маркетплейстердегі сатылымды басқару және дамыту бойынша сұрауыңыз қабылданды.",
      listTitle: "Robohub маманы сізбен хабарласып:",
      points: [
        "бизнесіңізге қысқаша талдау жасайды",
        "маркетплейстердегі процестерді жеңілдету жолдарын көрсетеді",
        "тауарларды, тапсырыстар мен қалдықтарды бір жерден басқару мүмкіндіктерін түсіндіреді",
        "Robohub арқылы сатылымды қалай ұлғайтуға болатынын көрсетеді",
      ],
      time: "Әдетте біз 10–15 минут ішінде хабарласамыз.",
      callHint: "Қазір сөйлесуге ыңғайлы болса, төмендегі батырма арқылы байланысыңыз.",
      call: "Байланысу",
      restart: "Сауалнаманы қайта толтыру",
    },
  },
  ky: {
    metaTitle: "Өтүнмө калтырыңыз",
    metaDescription:
      "Товарларды бир эле учурда бир нече маркетплейске жүктөңүз, буйрутмаларды башкарыңыз, калдыктарды синхрондоштуруңуз жана бизнесиңизди тартипке келтириңиз.",
    hero: {
      title: "Өзбекстандагы маркетплейс селлерлери үчүн бирдиктүү кабинет — Robohub.uz расмий түрдө ишке кирди",
      text: "Товарларды бир эле учурда бир нече маркетплейске жүктөңүз, буйрутмаларды башкарыңыз, калдыктарды синхрондоштуруңуз жана бизнесиңизди тартипке келтириңиз.",
    },
    steps: {
      whichMarketplaces: {
        title: "Кайсы маркетплейстерде сатасыз?",
        options: ["Uzum Market", "Wildberries", "Ozon", "Yandex Market", "Азырынча сатпайм", "Башка"],
        otherPlaceholder: "Маркетплейстин аталышын жазыңыз",
      },
      productCount: {
        title: "Ассортиментиңизде канча товар (SKU) бар?",
        options: ["1 – 100 товар", "101 – 500 товар", "501 – 1000 товар", "1000+ товар"],
      },
      salesModel: {
        title: "Маркетплейсте кайсы соода модели менен иштейсиз?",
        options: ["FBO", "FBS", "DBS", "EBDS", "Билбейм / айтуу кыйын"],
      },
      marketplaceProblems: {
        title: "Маркетплейстерде кандай кыйынчылыктарга туш болосуз?",
        options: [
          "Буйрутмаларды башкаруу кыйын",
          "Кампа эсебин жүргүзүү кыйын",
          "Бааларды жаңыртуу кыйын",
          "Бир нече маркетплейсти башкаруу кыйын",
          "Аналитика жетишпейт",
          "Башка",
        ],
        otherPlaceholder: "Көйгөйүңүздү жазыңыз",
      },
      storeName: {
        title: "Атыңызды жана дүкөн / бренд / тиркеме аталышын жазыңыз",
        placeholder: "Мисалы: Ali Shop",
      },
      phone: {
        title: "Телефон номериңизди калтырыңыз",
        placeholder: "90 123 45 67",
      },
    },
    multiHint: "Бир нечесин тандоого болот",
    radioHint: "Бирөөнү тандаңыз",
    next: "Улантуу",
    submit: "Жөнөтүү",
    back: "Артка",
    home: "Башкы бет",
    lang: "Тилди тандоо",
    call: "Чалуу",
    progress: "Кадам",
    errors: {
      name: "Кеминде 2 белги жазыңыз",
      phone: "Телефон номерин толук жазыңыз",
      other: "Жообуңузду жазыңыз",
    },
    sendError: "Жөнөтүлгөн жок. Кайра аракет кылыңыз же бизге чалыңыз.",
    success: {
      title: "Өтүнмөңүз кабыл алынды",
      text: "Рахмат! Маркетплейстердеги сатууларды башкаруу жана өнүктүрүү боюнча сурооңуз кабыл алынды.",
      listTitle: "Robohub адиси сиз менен байланышып:",
      points: [
        "бизнесиңизди кыскача талдап берет",
        "маркетплейстердеги процесстерди жеңилдетүү жолдорун көрсөтөт",
        "товарларды, буйрутмаларды жана калдыктарды бир жерден башкаруу мүмкүнчүлүктөрүн түшүндүрөт",
        "Robohub аркылуу сатууну кантип кеңейтүүгө болорун көрсөтөт",
      ],
      time: "Адатта биз 10–15 мүнөттүн ичинде байланышабыз.",
      callHint: "Азыр сүйлөшүүгө ыңгайлуу болсо, төмөнкү баскыч аркылуу байланышыңыз.",
      call: "Байланышуу",
      restart: "Анкетаны кайра толтуруу",
    },
  },
  kaa: {
    metaTitle: "Arza qaldırıń",
    metaDescription:
      "Ónimlerdi bir waqıttıń ózinde birneshe marketpleyske júkleń, buyırtpalardı basqarıń, qaldıqlardı sinxronlastırıń hám biznesińizdi tártipke salıń.",
    hero: {
      title: "Ózbekstandaǵı marketpleys satıwshıları ushın birden-bir kabinet — Robohub.uz rásmiy iske tústi",
      text: "Ónimlerdi bir waqıttıń ózinde birneshe marketpleyske júkleń, buyırtpalardı basqarıń, qaldıqlardı sinxronlastırıń hám biznesińizdi tártipke salıń.",
    },
    steps: {
      whichMarketplaces: {
        title: "Qaysı marketpleyslerde satasız?",
        options: ["Uzum Market", "Wildberries", "Ozon", "Yandex Market", "Házirshe satpayman", "Basqa"],
        otherPlaceholder: "Marketpleys atın jazıń",
      },
      productCount: {
        title: "Assortimentińizde neshe ónim (SKU) bar?",
        options: ["1 – 100 ónim", "101 – 500 ónim", "501 – 1000 ónim", "1000+ ónim"],
      },
      salesModel: {
        title: "Marketpleyste qaysı sawda modeli arqalı islaysız?",
        options: ["FBO", "FBS", "DBS", "EBDS", "Bilmeymen / aytıw qıyın"],
      },
      marketplaceProblems: {
        title: "Marketpleyslerde islewde qanday máselelerge dus kelesiz?",
        options: [
          "Buyırtpalardı basqarıw qıyın",
          "Sklad esabın júrgiziw qıyın",
          "Bahalardı jańalaw qıyın",
          "Birneshe marketpleysti basqarıw qıyın",
          "Analitika jetispeydi",
          "Basqa",
        ],
        otherPlaceholder: "Máselenizdi jazıń",
      },
      storeName: {
        title: "Atıńızdı hám dúkan / brend / qosımsha atın jazıp qaldırıń",
        placeholder: "Mısalı: Ali Shop",
      },
      phone: {
        title: "Telefon nomerińizdi qaldırıń",
        placeholder: "90 123 45 67",
      },
    },
    multiHint: "Birneshewin tańlawǵa boladı",
    radioHint: "Birewin tańlań",
    next: "Dawam etiw",
    submit: "Jiberiw",
    back: "Artqa",
    home: "Bas bet",
    lang: "Tildi tańlaw",
    call: "Qońıraw etiw",
    progress: "Qádem",
    errors: {
      name: "Keminde 2 belgi jazıń",
      phone: "Telefon nomerin tolıq kirgiziń",
      other: "Juwabıńızdı jazıń",
    },
    sendError: "Jiberilmedi. Qaytadan urınıp kóriń yamasa bizge qońıraw etiń.",
    success: {
      title: "Arzańız qabıl etildi",
      text: "Raxmet! Marketpleyslerdegi satıwlarıńızdı basqarıw hám rawajlandırıw boyınsha sorawıńız qabıl etildi.",
      listTitle: "Robohub qánigesi siz benen baylanısıp:",
      points: [
        "biznesińizdi qısqasha analiz etedi",
        "marketpleyslerdegi processlerdi ápiwayılastırıw jolların kórsetedi",
        "ónimler, buyırtpalar hám qaldıqlardı bir jerden basqarıw múmkinshiliklerin túsindiredi",
        "Robohub arqalı satıwdı qalay keńeytiw múmkinligin kórsetedi",
      ],
      time: "Ádette biz 10–15 minut ishinde siz benen baylanısamız.",
      callHint: "Eger házir sóylesiw qolaylı bolsa, tómendegi túyme arqalı baylanısıwıńızǵa boladı.",
      call: "Baylanısıw",
      restart: "Anketanı qaytadan toltırıw",
    },
  },
  tg: {
    metaTitle: "Дархост гузоред",
    metaDescription:
      "Молҳоро якбора ба якчанд маркетплейс бор кунед, фармоишҳоро идора намоед, бақияҳоро ҳамоҳанг созед ва тиҷорати худро ба тартиб дароред.",
    hero: {
      title: "Кабинети ягона барои фурӯшандагони маркетплейсҳо дар Ӯзбекистон — Robohub.uz расман ба кор оғоз кард",
      text: "Молҳоро якбора ба якчанд маркетплейс бор кунед, фармоишҳоро идора намоед, бақияҳоро ҳамоҳанг созед ва тиҷорати худро ба тартиб дароред.",
    },
    steps: {
      whichMarketplaces: {
        title: "Дар кадом маркетплейсҳо мефурӯшед?",
        options: ["Uzum Market", "Wildberries", "Ozon", "Yandex Market", "Ҳоло намефурӯшам", "Дигар"],
        otherPlaceholder: "Номи маркетплейсро нависед",
      },
      productCount: {
        title: "Дар ассортименти шумо чанд мол (SKU) ҳаст?",
        options: ["1 – 100 мол", "101 – 500 мол", "501 – 1000 мол", "1000+ мол"],
      },
      salesModel: {
        title: "Дар маркетплейс бо кадом модели савдо кор мекунед?",
        options: ["FBO", "FBS", "DBS", "EBDS", "Намедонам / гуфтан душвор аст"],
      },
      marketplaceProblems: {
        title: "Дар маркетплейсҳо бо кадом мушкилот рӯ ба рӯ мешавед?",
        options: [
          "Идораи фармоишҳо душвор аст",
          "Баҳисобгирии анбор душвор аст",
          "Навсозии нархҳо душвор аст",
          "Идораи якчанд маркетплейс душвор аст",
          "Таҳлил намерасад",
          "Дигар",
        ],
        otherPlaceholder: "Мушкилоти худро нависед",
      },
      storeName: {
        title: "Ном ва номи мағоза / бренд / барномаи худро нависед",
        placeholder: "Масалан: Ali Shop",
      },
      phone: {
        title: "Рақами телефони худро гузоред",
        placeholder: "90 123 45 67",
      },
    },
    multiHint: "Якчандторо интихоб кардан мумкин аст",
    radioHint: "Яктоашро интихоб кунед",
    next: "Идома додан",
    submit: "Фиристодан",
    back: "Бозгашт",
    home: "Саҳифаи асосӣ",
    lang: "Интихоби забон",
    call: "Занг задан",
    progress: "Қадам",
    errors: {
      name: "Ақаллан 2 аломат ворид кунед",
      phone: "Рақами телефонро пурра ворид кунед",
      other: "Ҷавоби худро нависед",
    },
    sendError: "Фиристода нашуд. Бори дигар кӯшиш кунед ё ба мо занг занед.",
    success: {
      title: "Дархости шумо қабул шуд",
      text: "Ташаккур! Дархости шумо оид ба идора ва рушди фурӯш дар маркетплейсҳо қабул шуд.",
      listTitle: "Мутахассиси Robohub бо шумо тамос гирифта:",
      points: [
        "тиҷорати шуморо мухтасар таҳлил мекунад",
        "роҳҳои соддагардонии равандҳоро дар маркетплейсҳо нишон медиҳад",
        "имкони идораи молҳо, фармоишҳо ва бақияҳоро аз як ҷо шарҳ медиҳад",
        "нишон медиҳад, ки чӣ тавр бо Robohub фурӯшро васеъ кардан мумкин аст",
      ],
      time: "Одатан мо дар давоми 10–15 дақиқа бо шумо тамос мегирем.",
      callHint: "Агар ҳозир гуфтугӯ кардан бароятон қулай бошад, тавассути тугмаи зер бо мо тамос гиред.",
      call: "Тамос гирифтан",
      restart: "Анкетаро аз нав пур кардан",
    },
  },
});

