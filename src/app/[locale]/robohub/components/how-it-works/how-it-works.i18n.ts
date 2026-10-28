import { defineMessages } from "@/i18n/config";

// Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi.
// steps — kartalar tartibida: title — sarlavha, desc — bir qatorli izoh, meta — pastdagi kapsula.
// Toʻrtinchisi — "yordam" kartasi (yashil).
export const messages = defineMessages({
  uz: {
    title: "Uch qadam — va do‘konlaringiz",
    titleAccent: "bitta kabinetda",
    steps: [
      { title: "Ro‘yxatdan o‘ting", desc: "Telefon raqamingiz orqali hisob yarating.", meta: "Bir necha daqiqa" },
      { title: "Marketpleyslarni ulang", desc: "Doʻkonlaringiz kabinetidan API kalitlarini qoʻshing.", meta: "Dasturchisiz" },
      { title: "Boshqarishni boshlang", desc: "Mahsulotlar, buyurtmalar va qoldiqlar Robohub’ga avtomatik yuklanadi.", meta: "Barchasi bitta kabinetda" },
      { title: "Har bosqichda yordam beramiz", desc: "Robohub jamoasi doʻkonlarni ulash va platformadan foydalanishni oʻrganishda yordam beradi.", meta: "Yordam doim yoningizda" },
    ],
    rows: { products: "Tovarlar", orders: "Buyurtmalar", stock: "Qoldiq" },
    online: "Onlayn",
    start: "Hoziroq boshlash",
    guide: "Qoʻllanmalar va videolar",
  },
  ru: {
    title: "Три шага — и ваши магазины",
    titleAccent: "в одном кабинете",
    steps: [
      { title: "Зарегистрируйтесь", desc: "Создайте аккаунт по номеру телефона.", meta: "Несколько минут" },
      { title: "Подключите маркетплейсы", desc: "Добавьте API-ключи из кабинетов ваших магазинов.", meta: "Без программиста" },
      { title: "Начните управлять", desc: "Товары, заказы и остатки автоматически загрузятся в Robohub.", meta: "Всё в одном кабинете" },
      { title: "Поможем на каждом этапе", desc: "Команда Robohub поможет подключить магазины и освоить платформу.", meta: "Поддержка рядом" },
    ],
    rows: { products: "Товары", orders: "Заказы", stock: "Остатки" },
    online: "Онлайн",
    start: "Начать сейчас",
    guide: "Инструкции и видео",
  },
  en: {
    title: "Three steps — and your stores",
    titleAccent: "in one dashboard",
    steps: [
      { title: "Sign up", desc: "Create an account with your phone number.", meta: "A few minutes" },
      { title: "Connect your marketplaces", desc: "Add API keys from your store dashboards.", meta: "No developer needed" },
      { title: "Start managing", desc: "Products, orders and stock load into Robohub automatically.", meta: "All in one dashboard" },
      { title: "We help at every step", desc: "The Robohub team will help you connect your stores and learn the platform.", meta: "Support is always close" },
    ],
    rows: { products: "Products", orders: "Orders", stock: "Stock" },
    online: "Online",
    start: "Get started",
    guide: "Guides and videos",
  },
  kk: {
    title: "Үш қадам — және дүкендеріңіз",
    titleAccent: "бір кабинетте",
    steps: [
      { title: "Тіркеліңіз", desc: "Телефон нөміріңіз арқылы аккаунт ашыңыз.", meta: "Бірнеше минут" },
      { title: "Маркетплейстерді қосыңыз", desc: "Дүкендеріңіздің кабинетінен API кілттерін қосыңыз.", meta: "Бағдарламашысыз" },
      { title: "Басқаруды бастаңыз", desc: "Тауарлар, тапсырыстар мен қалдықтар Robohub-қа автоматты түрде жүктеледі.", meta: "Бәрі бір кабинетте" },
      { title: "Әр кезеңде көмектесеміз", desc: "Robohub командасы дүкендерді қосуға және платформаны меңгеруге көмектеседі.", meta: "Қолдау әрқашан қасыңызда" },
    ],
    rows: { products: "Тауарлар", orders: "Тапсырыстар", stock: "Қалдық" },
    online: "Онлайн",
    start: "Қазір бастау",
    guide: "Нұсқаулықтар мен бейнелер",
  },
  ky: {
    title: "Үч кадам — жана дүкөндөрүңүз",
    titleAccent: "бир кабинетте",
    steps: [
      { title: "Катталыңыз", desc: "Телефон номериңиз аркылуу аккаунт түзүңүз.", meta: "Бир нече мүнөт" },
      { title: "Маркетплейстерди туташтырыңыз", desc: "Дүкөндөрүңүздүн кабинетинен API ачкычтарын кошуңуз.", meta: "Программистсиз" },
      { title: "Башкарууну баштаңыз", desc: "Товарлар, буйрутмалар жана калдыктар Robohub-ка автоматтык түрдө жүктөлөт.", meta: "Баары бир кабинетте" },
      { title: "Ар бир этапта жардам беребиз", desc: "Robohub командасы дүкөндөрдү туташтырууга жана платформаны өздөштүрүүгө жардам берет.", meta: "Колдоо дайыма жаныңызда" },
    ],
    rows: { products: "Товарлар", orders: "Буйрутмалар", stock: "Калдык" },
    online: "Онлайн",
    start: "Азыр баштоо",
    guide: "Колдонмолор жана видеолор",
  },
  kaa: {
    title: "Úsh qádem — hám dúkanlarıńız",
    titleAccent: "bir kabinette",
    steps: [
      { title: "Dizimnen ótiń", desc: "Telefon nomerińiz arqalı akkaunt jaratıń.", meta: "Bir neshe minut" },
      { title: "Marketpleyslerdi jalǵań", desc: "Dúkanlarıńızdıń kabinetinen API giltlerin qosıń.", meta: "Programmistsiz" },
      { title: "Basqarıwdı baslań", desc: "Ónimler, buyırtpalar hám qaldıqlar Robohub-qa avtomat túrde júklenedi.", meta: "Hámmesi bir kabinette" },
      { title: "Hár basqıshta járdem beremiz", desc: "Robohub komandası dúkanlardı jalǵawda hám platformanı úyreniwde járdem beredi.", meta: "Járdem hámme waqıt qasıńızda" },
    ],
    rows: { products: "Ónimler", orders: "Buyırtpalar", stock: "Qaldıq" },
    online: "Onlayn",
    start: "Házir baslaw",
    guide: "Qollanbalar hám videolar",
  },
  tg: {
    title: "Се қадам — ва мағозаҳои шумо",
    titleAccent: "дар як кабинет",
    steps: [
      { title: "Сабти ном кунед", desc: "Бо рақами телефони худ ҳисоб кушоед.", meta: "Чанд дақиқа" },
      { title: "Маркетплейсҳоро пайваст кунед", desc: "Калидҳои API-ро аз кабинети мағозаҳоятон илова кунед.", meta: "Бе барномасоз" },
      { title: "Идоракуниро оғоз кунед", desc: "Молҳо, фармоишҳо ва бақияҳо ба Robohub худкор бор мешаванд.", meta: "Ҳама дар як кабинет" },
      { title: "Дар ҳар марҳила кумак мекунем", desc: "Дастаи Robohub дар пайваст кардани мағозаҳо ва аз худ кардани платформа кумак мекунад.", meta: "Дастгирӣ ҳамеша дар паҳлӯи шумо" },
    ],
    rows: { products: "Молҳо", orders: "Фармоишҳо", stock: "Бақия" },
    online: "Онлайн",
    start: "Ҳозир оғоз кунед",
    guide: "Дастурҳо ва видеоҳо",
  },
});
