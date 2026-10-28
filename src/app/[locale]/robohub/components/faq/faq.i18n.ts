import { defineMessages } from "@/i18n/config";

// Javob — boʻlaklar roʻyxati: oddiy matn yoki { b } (qalin ajratilgan qism).
export type Part = string | { b: string };
export type FaqItem = { q: string; a: Part[] };

// support — oʻngdagi panel pastidagi telefon kartasi yozuvi.
export const messages = defineMessages({
  uz: {
    // Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi
    title: "Savollaringizga ",
    titleAccent: "javoblar",
    support: "Savollar qoldimi? Biz bilan bogʻlaning — yordam beramiz.",
    items: [
      {
        q: "Hali marketpleyslarda savdo qilmasam ham boshlashim mumkinmi?",
        a: [{ b: "Ha." }, " Robohub orqali mavjud do‘konlarni ulashingiz yoki yangi platformalarda savdoni boshlashingiz mumkin. Jamoamiz ro‘yxatdan o‘tish, ulanish va mahsulotlarni joylashtirish jarayonida yordam beradi. Sotuvchi va hujjatlarga qo‘yiladigan talablar tanlangan marketpleysga bog‘liq."],
      },
      {
        q: "Robohub qaysi marketpleyslar bilan ishlaydi?",
        a: ["Hozir Uzum Market, Wildberries, Ozon va Yandex Market bilan ishlash mumkin. Kaspi, Teez, MMarket, Namba One, LakLak va Avval bilan ulanishlar tayyorlanmoqda. Mavjud funksiyalar platforma va mamlakatga qarab farqlanadi."],
      },
      {
        q: "Do‘konlarimni qanday ulayman?",
        a: ["Robohub’da ro‘yxatdan o‘ting va marketpleys kabinetlaringizdagi API kalitlarini qo‘shing. Ulangandan so‘ng ma’lumotlar yuklana boshlaydi. Yordam kerak bo‘lsa, jamoamiz sozlash jarayonida ko‘maklashadi."],
      },
      {
        q: "Obuna qancha turadi va nechta do‘kon ulash mumkin?",
        a: ["3 oy uchun to‘langanda narx oyiga 500 000 so‘m — jami 1 500 000 so‘m. Tarifga 12 tagacha do‘kon kiradi: Uzum Market, Wildberries, Ozon va Yandex Market’ning har birida 3 tadan. Har bir qo‘shimcha do‘kon oyiga 99 000 so‘m. 6 va 12 oylik to‘lov shartlari tariflar bo‘limida ko‘rsatilgan."],
      },
      {
        q: "Barcha mahsulotlarni qaytadan yuklash kerakmi?",
        a: [{ b: "Yo‘q." }, " Mahsulotlarni ulangan do‘konlardan yoki Excel orqali import qilishingiz mumkin. Kartochkalarni boshqa platformalarda joylashtirish uchun ularning talablariga mos ma’lumotlar bilan to‘ldirasiz. Nashr qilish tegishli marketpleys moderatsiyasidan o‘tadi."],
      },
      {
        q: "Robohub mening hisob tizimim bilan ishlaydimi?",
        a: ["BILLZ, МойСклад, ERA, Smartup, YesPOS, Bito, Sales Doctor, Apicore va Retail CRM bilan integratsiyalar ko‘zda tutilgan. Jamoamiz tizimingiz bilan ma’lumot almashish imkoniyatlarini aniqlab, ulanishni sozlashda yordam beradi."],
      },
      {
        q: "Mahsulotlar bo‘yicha foyda qanday hisoblanadi?",
        a: ["Robohub savdo, tannarx va xarajatlar — komissiya, logistika va reklama ma’lumotlaridan foydalanadi. Bu har bir mahsulotning unit-iqtisodiyotini baholash va do‘konlar natijalarini solishtirishga yordam beradi. Hisob-kitob aniqligi yuklangan ma’lumotlar va kiritilgan xarajatlarning to‘liqligiga bog‘liq."],
      },
      {
        q: "Robohub’ni o‘rganishda kim yordam beradi?",
        a: ["Jamoamiz do‘konlarni ulash, ishni sozlash va asosiy funksiyalarni o‘rganishda yordam beradi. Telefon yoki Telegram orqali murojaat qilishingiz, shuningdek qo‘llanmalar va videodarslardan foydalanishingiz mumkin."],
      },
    ],
  },
  ru: {
    title: "Ответы на ",
    titleAccent: "ваши вопросы",
    support: "Остались вопросы? Свяжитесь с нами — поможем разобраться.",
    items: [
      {
        q: "Можно начать, если я ещё не продаю на маркетплейсах?",
        a: [{ b: "Да." }, " Через Robohub можно подключить действующие магазины или начать работу на новых площадках. Наша команда поможет разобраться с регистрацией, подключением и размещением товаров. Требования к продавцу и документам зависят от выбранного маркетплейса."],
      },
      {
        q: "С какими маркетплейсами работает Robohub?",
        a: ["Сейчас доступны Uzum Market, Wildberries, Ozon и Яндекс Маркет. Готовятся подключения Kaspi, Teez, MMarket, Namba One, LakLak и Avval. Доступность функций зависит от площадки и страны."],
      },
      {
        q: "Как подключить мои магазины?",
        a: ["Зарегистрируйтесь в Robohub и добавьте API-ключи из кабинетов маркетплейсов. После подключения начнётся загрузка данных. Если понадобится помощь, команда проведёт вас через настройку."],
      },
      {
        q: "Сколько стоит подписка и сколько магазинов можно подключить?",
        a: ["Стоимость — 500 000 сум в месяц при оплате за 3 месяца: всего 1 500 000 сум. В тариф входят до 12 магазинов — по 3 на Uzum Market, Wildberries, Ozon и Яндекс Маркете. Каждый дополнительный магазин — 99 000 сум в месяц. Условия оплаты на 6 и 12 месяцев указаны в блоке тарифов."],
      },
      {
        q: "Нужно заново загружать все товары?",
        a: [{ b: "Нет." }, " Вы можете импортировать товары из подключённых магазинов или Excel. Карточки можно использовать для размещения на других площадках, дополнив данные под их требования. Публикация проходит модерацию соответствующего маркетплейса."],
      },
      {
        q: "Robohub работает с моей системой учёта?",
        a: ["Предусмотрены интеграции с BILLZ, МойСклад, ERA, Smartup, YesPOS, Bito, Sales Doctor, Apicore и Retail CRM. Команда поможет уточнить возможности обмена данными и настроить подключение для вашей системы."],
      },
      {
        q: "Как рассчитывается прибыль по товарам?",
        a: ["Robohub использует данные о продажах, себестоимости и расходах: комиссиях, логистике и рекламе. Это помогает оценивать юнит-экономику каждого товара и сравнивать результаты магазинов. Точность расчётов зависит от полноты загруженных данных и внесённых затрат."],
      },
      {
        q: "Кто поможет освоить Robohub?",
        a: ["Команда поможет подключить магазины, настроить работу и разобраться с основными функциями. Вы можете обратиться по телефону или в Telegram, а также воспользоваться инструкциями и видеоуроками."],
      },
    ],
  },
  en: {
    title: "Answers to ",
    titleAccent: "your questions",
    support: "Still have questions? Contact us — we’ll help you figure it out.",
    items: [
      {
        q: "Can I start if I don’t sell on marketplaces yet?",
        a: [{ b: "Yes." }, " With Robohub you can connect existing stores or start selling on new platforms. Our team will help with registration, connection and listing your products. Requirements for sellers and documents depend on the chosen marketplace."],
      },
      {
        q: "Which marketplaces does Robohub work with?",
        a: ["Uzum Market, Wildberries, Ozon and Yandex Market are available now. Connections to Kaspi, Teez, MMarket, Namba One, LakLak and Avval are in progress. Available features depend on the platform and country."],
      },
      {
        q: "How do I connect my stores?",
        a: ["Sign up for Robohub and add API keys from your marketplace dashboards. Once connected, your data starts loading. If you need help, our team will walk you through the setup."],
      },
      {
        q: "How much is the subscription and how many stores can I connect?",
        a: ["It’s 500,000 UZS per month when paid for 3 months: 1,500,000 UZS in total. The plan includes up to 12 stores — 3 each on Uzum Market, Wildberries, Ozon and Yandex Market. Each extra store is 99,000 UZS per month. Terms for 6 and 12 months are shown in the pricing section."],
      },
      {
        q: "Do I need to upload all my products again?",
        a: [{ b: "No." }, " You can import products from connected stores or from Excel. Product cards can be reused on other platforms once you add the data they require. Publishing goes through the moderation of the relevant marketplace."],
      },
      {
        q: "Does Robohub work with my accounting system?",
        a: ["Integrations are available with BILLZ, МойСклад, ERA, Smartup, YesPOS, Bito, Sales Doctor, Apicore and Retail CRM. Our team will help check the data exchange options and set up the connection for your system."],
      },
      {
        q: "How is product profit calculated?",
        a: ["Robohub uses data on sales, cost of goods and expenses: commissions, logistics and advertising. This helps you assess the unit economics of every product and compare store results. Accuracy depends on how complete your uploaded data and recorded costs are."],
      },
      {
        q: "Who will help me learn Robohub?",
        a: ["Our team will help you connect stores, set up your work and learn the main features. You can reach us by phone or Telegram, and use our guides and video lessons."],
      },
    ],
  },
  kk: {
    title: "Сұрақтарыңызға ",
    titleAccent: "жауаптар",
    support: "Сұрақтарыңыз қалды ма? Бізбен байланысыңыз — көмектесеміз.",
    items: [
      {
        q: "Маркетплейстерде әлі сауда жасамасам да бастай аламын ба?",
        a: [{ b: "Иә." }, " Robohub арқылы жұмыс істеп тұрған дүкендерді қосуға немесе жаңа алаңдарда сатуды бастауға болады. Біздің команда тіркелу, қосылу және тауарларды орналастыру кезінде көмектеседі. Сатушыға және құжаттарға қойылатын талаптар таңдалған маркетплейске байланысты."],
      },
      {
        q: "Robohub қандай маркетплейстермен жұмыс істейді?",
        a: ["Қазір Uzum Market, Wildberries, Ozon және Yandex Market қолжетімді. Kaspi, Teez, MMarket, Namba One, LakLak және Avval қосылымдары дайындалуда. Функциялардың қолжетімділігі алаң мен елге байланысты."],
      },
      {
        q: "Дүкендерімді қалай қосамын?",
        a: ["Robohub-та тіркеліп, маркетплейс кабинеттеріңіздегі API кілттерін қосыңыз. Қосылғаннан кейін деректер жүктеле бастайды. Көмек керек болса, команда баптаудың әр қадамында қасыңызда болады."],
      },
      {
        q: "Жазылым қанша тұрады және қанша дүкен қосуға болады?",
        a: ["3 айға төлегенде бағасы айына 500 000 сум — барлығы 1 500 000 сум. Тарифке 12 дүкенге дейін кіреді: Uzum Market, Wildberries, Ozon және Yandex Market-тің әрқайсысында 3 дүкеннен. Әр қосымша дүкен — айына 99 000 сум. 6 және 12 айлық төлем шарттары тарифтер бөлімінде көрсетілген."],
      },
      {
        q: "Барлық тауарларды қайта жүктеу керек пе?",
        a: [{ b: "Жоқ." }, " Тауарларды қосылған дүкендерден немесе Excel арқылы импорттай аласыз. Карточкаларды басқа алаңдарда орналастыру үшін оларды сол алаңдардың талаптарына сай деректермен толықтырасыз. Жариялау тиісті маркетплейстің модерациясынан өтеді."],
      },
      {
        q: "Robohub менің есеп жүйеммен жұмыс істей ме?",
        a: ["BILLZ, МойСклад, ERA, Smartup, YesPOS, Bito, Sales Doctor, Apicore және Retail CRM жүйелерімен интеграциялар қарастырылған. Команда сіздің жүйеңізбен деректер алмасу мүмкіндіктерін нақтылап, қосылымды баптауға көмектеседі."],
      },
      {
        q: "Тауарлар бойынша пайда қалай есептеледі?",
        a: ["Robohub сатылым, өзіндік құн және шығындар — комиссия, логистика мен жарнама деректерін пайдаланады. Бұл әр тауардың юнит-экономикасын бағалауға және дүкендердің нәтижелерін салыстыруға көмектеседі. Есептің дәлдігі жүктелген деректер мен енгізілген шығындардың толықтығына байланысты."],
      },
      {
        q: "Robohub-ты меңгеруге кім көмектеседі?",
        a: ["Команда дүкендерді қосуға, жұмысты баптауға және негізгі функцияларды меңгеруге көмектеседі. Телефон немесе Telegram арқылы хабарласуға, сондай-ақ нұсқаулықтар мен бейнесабақтарды пайдалануға болады."],
      },
    ],
  },
  ky: {
    title: "Сурооңуздарга ",
    titleAccent: "жооптор",
    support: "Суроолоруңуз калдыбы? Биз менен байланышыңыз — жардам беребиз.",
    items: [
      {
        q: "Маркетплейстерде азырынча соода кылбасам да баштай аламбы?",
        a: [{ b: "Ооба." }, " Robohub аркылуу иштеп жаткан дүкөндөрдү туташтырсаңыз же жаңы аянтчаларда сатууну баштасаңыз болот. Биздин команда каттоодо, туташтырууда жана товарларды жайгаштырууда жардам берет. Сатуучуга жана документтерге коюлган талаптар тандалган маркетплейске жараша болот."],
      },
      {
        q: "Robohub кайсы маркетплейстер менен иштейт?",
        a: ["Азыр Uzum Market, Wildberries, Ozon жана Yandex Market жеткиликтүү. Kaspi, Teez, MMarket, Namba One, LakLak жана Avval менен туташуулар даярдалып жатат. Функциялардын жеткиликтүүлүгү аянтчага жана өлкөгө жараша болот."],
      },
      {
        q: "Дүкөндөрүмдү кантип туташтырам?",
        a: ["Robohub-та катталып, маркетплейс кабинеттериңиздеги API ачкычтарын кошуңуз. Туташкандан кийин маалыматтар жүктөлө баштайт. Жардам керек болсо, команда жөндөөнүн ар бир кадамында жардам берет."],
      },
      {
        q: "Жазылуу канча турат жана канча дүкөн туташтырууга болот?",
        a: ["3 айга төлөгөндө баасы айына 500 000 сум — бардыгы 1 500 000 сум. Тарифке 12 дүкөнгө чейин кирет: Uzum Market, Wildberries, Ozon жана Yandex Market-тин ар биринде 3 дүкөндөн. Ар бир кошумча дүкөн — айына 99 000 сум. 6 жана 12 айлык төлөм шарттары тарифтер бөлүмүндө көрсөтүлгөн."],
      },
      {
        q: "Бардык товарларды кайрадан жүктөш керекпи?",
        a: [{ b: "Жок." }, " Товарларды туташтырылган дүкөндөрдөн же Excel аркылуу импорттой аласыз. Карточкаларды башка аянтчаларга жайгаштыруу үчүн аларды ошол аянтчалардын талаптарына ылайык маалыматтар менен толуктайсыз. Жарыялоо тиешелүү маркетплейстин модерациясынан өтөт."],
      },
      {
        q: "Robohub менин эсеп системам менен иштейби?",
        a: ["BILLZ, МойСклад, ERA, Smartup, YesPOS, Bito, Sales Doctor, Apicore жана Retail CRM менен интеграциялар каралган. Команда сиздин системаңыз менен маалымат алмашуу мүмкүнчүлүктөрүн тактап, туташууну жөндөөгө жардам берет."],
      },
      {
        q: "Товарлар боюнча пайда кантип эсептелет?",
        a: ["Robohub сатуулар, өздүк нарк жана чыгымдар — комиссия, логистика жана жарнама боюнча маалыматтарды колдонот. Бул ар бир товардын юнит-экономикасын баалоого жана дүкөндөрдүн натыйжаларын салыштырууга жардам берет. Эсептөөнүн тактыгы жүктөлгөн маалыматтардын жана киргизилген чыгымдардын толуктугуна жараша болот."],
      },
      {
        q: "Robohub-ту өздөштүрүүгө ким жардам берет?",
        a: ["Команда дүкөндөрдү туташтырууга, ишти жөндөөгө жана негизги функцияларды өздөштүрүүгө жардам берет. Телефон же Telegram аркылуу кайрылсаңыз болот, ошондой эле колдонмолорду жана видеосабактарды пайдалана аласыз."],
      },
    ],
  },
  kaa: {
    title: "Sorawlarıńızǵa ",
    titleAccent: "juwaplar",
    support: "Sorawlarıńız qaldı ma? Biz benen baylanısıń — járdem beremiz.",
    items: [
      {
        q: "Marketpleyslerde ele sawda qılmasam da baslay alaman ba?",
        a: [{ b: "Awa." }, " Robohub arqalı bar dúkanlardı baylanıstırıwıńız yamasa jańa platformalarda satıwdı baslawıńız múmkin. Komandamız dizimnen ótiw, baylanıstırıw hám ónimlerdi jaylastırıw procesinde járdem beredi. Satıwshı hám hújjetlerge qoyılatuǵın talaplar tańlanǵan marketpleyske baylanıslı."],
      },
      {
        q: "Robohub qaysı marketpleysler menen isleydi?",
        a: ["Házir Uzum Market, Wildberries, Ozon hám Yandex Market penen islewge boladı. Kaspi, Teez, MMarket, Namba One, LakLak hám Avval menen baylanıslar tayarlanbaqta. Funkciyalardıń bar-joqlıǵı platforma hám mámleketke baylanıslı."],
      },
      {
        q: "Dúkanlarımdı qalay baylanıstıraman?",
        a: ["Robohub’ta dizimnen ótiń hám marketpleys kabinetlerińizdegi API giltlerin qosıń. Baylanısqannan keyin maǵlıwmatlar júklene baslaydı. Járdem kerek bolsa, komandamız sazlaw procesinde kómeklesedi."],
      },
      {
        q: "Jazılıw qansha turadı hám neshe dúkan baylanıstırıwǵa boladı?",
        a: ["3 ay ushın tólengende bahası ayına 500 000 swm — jámi 1 500 000 swm. Tarifke 12 dúkanǵa shekem kiredi: Uzum Market, Wildberries, Ozon hám Yandex Market’tiń hár birinde 3 dúkannan. Hár bir qosımsha dúkan ayına 99 000 swm. 6 hám 12 aylıq tólew shártleri tarifler bóliminde kórsetilgen."],
      },
      {
        q: "Barlıq ónimlerdi qaytadan júklew kerek pe?",
        a: [{ b: "Yaq." }, " Ónimlerdi baylanıstırılǵan dúkanlardan yamasa Excel arqalı import etiwińiz múmkin. Kartochkalardı basqa platformalarda jaylastırıw ushın olardı sol platformalardıń talaplarına say maǵlıwmatlar menen toltırasız. Jarıyalaw tiyisli marketpleystiń moderaciyasınan ótedi."],
      },
      {
        q: "Robohub meniń esap sistemam menen isley me?",
        a: ["BILLZ, МойСклад, ERA, Smartup, YesPOS, Bito, Sales Doctor, Apicore hám Retail CRM menen integraciyalar qarastırılǵan. Komandamız sistemańız benen maǵlıwmat almasıw múmkinshiliklerin anıqlap, baylanıstı sazlawda járdem beredi."],
      },
      {
        q: "Ónimler boyınsha payda qalay esaplanadı?",
        a: ["Robohub satıw, ózindik baha hám qárejetler — komissiya, logistika hám reklama maǵlıwmatlarınan paydalanadı. Bul hár bir ónimniń unit-ekonomikasın bahalawǵa hám dúkanlardıń nátiyjelerin salıstırıwǵa járdem beredi. Esap-kitaptıń anıqlıǵı júklengen maǵlıwmatlar hám kiritilgen qárejetlerdiń tolıqlıǵına baylanıslı."],
      },
      {
        q: "Robohub’tı úyreniwde kim járdem beredi?",
        a: ["Komandamız dúkanlardı baylanıstırıw, jumıstı sazlaw hám tiykarǵı funkciyalardı úyreniwde járdem beredi. Telefon yamasa Telegram arqalı xabarlasıwıńız, sonday-aq qollanbalar hám video sabaqlardan paydalanıwıńız múmkin."],
      },
    ],
  },
  tg: {
    title: "Ҷавоб ба ",
    titleAccent: "саволҳои шумо",
    support: "Саволе боқӣ монд? Бо мо тамос гиред — кумак мекунем.",
    items: [
      {
        q: "Агар ҳоло дар маркетплейсҳо савдо накунам, метавонам оғоз кунам?",
        a: [{ b: "Бале." }, " Тавассути Robohub метавонед мағозаҳои амалкунандаро пайваст кунед ё дар платформаҳои нав фурӯшро оғоз намоед. Дастаи мо дар бақайдгирӣ, пайвастшавӣ ва ҷойгиркунии маҳсулот кумак мекунад. Талабот ба фурӯшанда ва ҳуҷҷатҳо аз маркетплейси интихобшуда вобаста аст."],
      },
      {
        q: "Robohub бо кадом маркетплейсҳо кор мекунад?",
        a: ["Ҳоло Uzum Market, Wildberries, Ozon ва Yandex Market дастрасанд. Пайвастшавӣ ба Kaspi, Teez, MMarket, Namba One, LakLak ва Avval омода карда мешавад. Дастрасии функсияҳо аз платформа ва кишвар вобаста аст."],
      },
      {
        q: "Мағозаҳоямро чӣ тавр пайваст кунам?",
        a: ["Дар Robohub сабти ном кунед ва калидҳои API-ро аз кабинетҳои маркетплейсҳоятон илова намоед. Пас аз пайвастшавӣ боргирии маълумот оғоз мешавад. Агар кумак лозим шавад, даста шуморо дар ҳар қадами танзим ҳамроҳӣ мекунад."],
      },
      {
        q: "Обуна чанд пул аст ва чанд мағозаро пайваст кардан мумкин?",
        a: ["Ҳангоми пардохт барои 3 моҳ нарх 500 000 сӯм дар як моҳ аст — ҳамагӣ 1 500 000 сӯм. Ба тариф то 12 мағоза дохил мешавад: аз 3 мағоза дар ҳар яке аз Uzum Market, Wildberries, Ozon ва Yandex Market. Ҳар мағозаи иловагӣ — 99 000 сӯм дар як моҳ. Шартҳои пардохт барои 6 ва 12 моҳ дар бахши тарифҳо нишон дода шудаанд."],
      },
      {
        q: "Оё ҳамаи маҳсулотро аз нав бор кардан лозим аст?",
        a: [{ b: "Не." }, " Шумо метавонед маҳсулотро аз мағозаҳои пайвастшуда ё тавассути Excel ворид кунед. Барои ҷойгир кардани кортҳо дар платформаҳои дигар онҳоро бо маълумоти мувофиқ ба талаботи ҳамон платформаҳо пур мекунед. Нашр аз модератсияи маркетплейси дахлдор мегузарад."],
      },
      {
        q: "Оё Robohub бо системаи баҳисобгирии ман кор мекунад?",
        a: ["Интегратсия бо BILLZ, МойСклад, ERA, Smartup, YesPOS, Bito, Sales Doctor, Apicore ва Retail CRM пешбинӣ шудааст. Даста имкониятҳои мубодилаи маълумотро бо системаи шумо муайян карда, дар танзими пайвастшавӣ кумак мекунад."],
      },
      {
        q: "Фоида аз рӯи маҳсулот чӣ тавр ҳисоб карда мешавад?",
        a: ["Robohub маълумоти фурӯш, арзиши аслӣ ва хароҷот — комиссия, логистика ва рекламаро истифода мебарад. Ин ба арзёбии юнит-иқтисоди ҳар маҳсулот ва муқоисаи натиҷаҳои мағозаҳо кумак мекунад. Дақиқии ҳисоб аз пурра будани маълумоти боршуда ва хароҷоти воридшуда вобаста аст."],
      },
      {
        q: "Дар омӯхтани Robohub кӣ кумак мекунад?",
        a: ["Дастаи мо дар пайваст кардани мағозаҳо, танзими кор ва омӯзиши функсияҳои асосӣ кумак мекунад. Шумо метавонед тавассути телефон ё Telegram муроҷиат кунед, инчунин аз дастурҳо ва видеодарсҳо истифода баред."],
      },
    ],
  },
});
