import { defineMessages } from "@/i18n/config";

// Sotuvchilar sharhlari. Matnlar Robohub'ning avvalgi landingidan olingan.
// initial — avatar harfi; tavsifning birinchi harfi emas (ruschada hammasi "Продавец…" bilan boshlanadi), mahsulot turi bo'yicha
type Review = { num: string; label: string; title: string; text: string; who: string; initial: string; meta: string };

type SharhlarMessages = {
  eyebrow: string;
  // Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi
  titleStart: string;
  titleAccent: string;
  lead: string;
  tabsLabel: string;
  reviews: Review[];
};

export const messages = defineMessages<SharhlarMessages>({
  uz: {
    eyebrow: "Sharhlar",
    titleStart: "Bizga ishonmang — ",
    titleAccent: "sotuvchilarni tinglang",
    lead: "Sotuvchilar Robohubga oʻtgach nimalar oʻzgargani haqida: tezroq joʻnatish, kamroq bekor qilish va nihoyat koʻrinadigan foyda.",
    tabsLabel: "Sotuvchilar natijalari",
    reviews: [
      {
        num: "75%",
        label: "tezroq joʻnatish",
        title: "Toʻrt marketpleysni yarim kunda uladik — va nihoyat barcha buyurtmalarni bitta lentada koʻramiz.",
        text: "Ilgari toʻrtta kabinet bilan ovora boʻlib, doim ortiqcha sotardik. Endi buyurtmalar bitta lentaga keladi, etiketkalar toʻplab chop etiladi, joʻnatish esa ancha tezlashdi. Ulanish yarim kun oldi.",
        who: "Elektronika va gadjetlar sotuvchisi",
        initial: "E",
        meta: "4 ta marketpleys · 2023-yildan beri",
      },
      {
        num: "+32%",
        label: "sof marja",
        title: "Birinchi marta har bir mahsuldagi haqiqiy foydani koʻryapman — komissiya va logistikadan keyin.",
        text: "Moliyaviy tahlil komissiya, logistika va reklamani oʻzi hisobga oladi. Sezdirmay zarar keltirayotgan mahsulotlarni olib tashladim va sof marja oshdi. Birinchi haftadayoq oʻzini qopladi.",
        who: "Kosmetika va goʻzallik sotuvchisi",
        initial: "K",
        meta: "Uzum va Wildberries · 2022-yildan beri",
      },
      {
        num: "−90%",
        label: "bekor qilishlar",
        title: "Qoldiqlar barcha doʻkonlarda sinxron, shuning uchun bekor qilishlar deyarli nolga tushdi.",
        text: "Robohub Uzum, Yandex Market, Wildberries va Ozon’da qoldiqlarni bir vaqtda aniq saqlaydi. Yoʻq narsani sotishni toʻxtatdik va endi u butun bek-ofisimizni yuritadi.",
        who: "Uy-roʻzgʻor buyumlari sotuvchisi",
        initial: "U",
        meta: "3 ta marketpleys · 2021-yildan beri",
      },
      {
        num: "12 soat",
        label: "haftasiga tejaldi",
        title: "Narx va kartochkalarni barcha marketpleyslarda ommaviy tahrirlash jamoamga haftasiga bir kun tejaydi.",
        text: "Avval kabinetlar oʻrtasida soatlab nusxa koʻchirardik, endi bu bitta harakat. Narx, qoldiq va kartochkalar hamma joyda birdan yangilanadi — jamoaning katalogni oʻstirishga vaqti qoldi.",
        who: "Bolalar tovarlari sotuvchisi",
        initial: "B",
        meta: "4 ta marketpleys · 2023-yildan beri",
      },
      {
        num: "4 → 1",
        label: "marketpleys bitta oynada",
        title: "Buyurtma, yetkazib berish va moliya endi bitta oynada.",
        text: "Bitta marketpleysdan toʻrttagacha kengaydik, yangi xodim olmasdan. Dashboard nima sotilayotgani va nima qotib qolganini koʻrsatadi, shuning uchun xarid qarorlari aniq.",
        who: "Avto ehtiyot qismlar sotuvchisi",
        initial: "A",
        meta: "4 ta marketpleys · 2022-yildan beri",
      },
      {
        num: "×2",
        label: "takroriy buyurtmalar",
        title: "Sharhlarga darhol javob va oʻsha kuni joʻnatish kartochkalarimizni qidiruvda yuqoriga koʻtardi.",
        text: "Mijozlarga avtomatik javob beramiz, buyurtmalar oʻsha kuni joʻnaydi. Reytinglar oshdi, kartochkalar yuqoriroq chiqadi, takroriy buyurtmalar uch oyda ikki baravar oshdi. Qoʻllab-quvvatlash ham zoʻr.",
        who: "Oziq-ovqat va eko mahsulot sotuvchisi",
        initial: "O",
        meta: "Yandex Market va Uzum · 2024-yildan beri",
      },
    ],
  },
  ru: {
    eyebrow: "Отзывы",
    titleStart: "Не верьте нам — ",
    titleAccent: "послушайте продавцов",
    lead: "Продавцы рассказывают, что изменилось после перехода на Robohub: быстрее отгрузка, меньше отмен и наконец-то видимая прибыль.",
    tabsLabel: "Результаты продавцов",
    reviews: [
      {
        num: "75%",
        label: "быстрее отгрузка",
        title: "Подключили четыре маркетплейса за полдня — и наконец видим все заказы в одной ленте.",
        text: "Раньше мы метались между четырьмя кабинетами и постоянно продавали лишнее. Теперь заказы приходят в одну ленту, этикетки печатаются пачкой, а отгрузка заметно ускорилась. Подключение заняло полдня.",
        who: "Продавец электроники и гаджетов",
        initial: "Э",
        meta: "4 маркетплейса · с 2023 года",
      },
      {
        num: "+32%",
        label: "чистая маржа",
        title: "Впервые вижу реальную прибыль по каждому товару — после комиссий и логистики.",
        text: "Финансовая аналитика сама учитывает комиссии, логистику и рекламу. Убрали товары, которые незаметно приносили убыток, и чистая маржа выросла. Окупилось уже в первую неделю.",
        who: "Продавец косметики и товаров для красоты",
        initial: "К",
        meta: "Uzum и Wildberries · с 2022 года",
      },
      {
        num: "−90%",
        label: "меньше отмен",
        title: "Остатки синхронизированы во всех магазинах, поэтому отмены упали почти до нуля.",
        text: "Robohub одновременно и точно держит остатки на Uzum, Yandex Market, Wildberries и Ozon. Мы перестали продавать то, чего нет, и теперь он ведёт весь наш бэк-офис.",
        who: "Продавец товаров для дома",
        initial: "Д",
        meta: "3 маркетплейса · с 2021 года",
      },
      {
        num: "12 часов",
        label: "экономии в неделю",
        title: "Массовое редактирование цен и карточек на всех маркетплейсах экономит команде день в неделю.",
        text: "Раньше мы часами копировали данные между кабинетами, теперь это одно действие. Цены, остатки и карточки обновляются везде сразу — у команды появилось время растить каталог.",
        who: "Продавец детских товаров",
        initial: "Д",
        meta: "4 маркетплейса · с 2023 года",
      },
      {
        num: "4 → 1",
        label: "всё в одном окне",
        title: "Заказы, доставка и финансы теперь в одном окне.",
        text: "Выросли с одного маркетплейса до четырёх, не нанимая новых сотрудников. Дашборд показывает, что продаётся, а что залежалось, поэтому решения о закупках точные.",
        who: "Продавец автозапчастей",
        initial: "А",
        meta: "4 маркетплейса · с 2022 года",
      },
      {
        num: "×2",
        label: "повторных заказов",
        title: "Мгновенные ответы на отзывы и отгрузка в тот же день подняли наши карточки в поиске.",
        text: "Отвечаем покупателям автоматически, заказы уходят в тот же день. Рейтинги выросли, карточки выше в выдаче, повторные заказы за три месяца удвоились. И поддержка отличная.",
        who: "Продавец продуктов и экотоваров",
        initial: "П",
        meta: "Yandex Market и Uzum · с 2024 года",
      },
    ],
  },
  en: {
    eyebrow: "Reviews",
    titleStart: "Don’t take our word — ",
    titleAccent: "hear it from sellers",
    lead: "Sellers on what changed after switching to Robohub: faster shipping, fewer cancellations and, at last, profit they can actually see.",
    tabsLabel: "Seller results",
    reviews: [
      {
        num: "75%",
        label: "faster shipping",
        title: "We connected four marketplaces in half a day — and finally see every order in one feed.",
        text: "We used to juggle four dashboards and kept overselling. Now orders land in a single feed, labels print in batches and shipping got much faster. Setup took half a day.",
        who: "Electronics & gadgets seller",
        initial: "E",
        meta: "4 marketplaces · since 2023",
      },
      {
        num: "+32%",
        label: "net margin",
        title: "For the first time I see the real profit on every product — after fees and logistics.",
        text: "The financial analytics accounts for fees, logistics and ads on its own. I dropped products that were quietly losing money, and my net margin went up. It paid for itself in the first week.",
        who: "Beauty & cosmetics seller",
        initial: "B",
        meta: "Uzum & Wildberries · since 2022",
      },
      {
        num: "−90%",
        label: "cancellations",
        title: "Stock is synced across every store, so cancellations dropped almost to zero.",
        text: "Robohub keeps stock accurate on Uzum, Yandex Market, Wildberries and Ozon at the same time. We stopped selling what we don’t have, and now it runs our entire back office.",
        who: "Home goods seller",
        initial: "H",
        meta: "3 marketplaces · since 2021",
      },
      {
        num: "12 hrs",
        label: "saved every week",
        title: "Bulk-editing prices and product cards across all marketplaces saves my team a day every week.",
        text: "We used to spend hours copying between dashboards — now it’s a single action. Prices, stock and product cards update everywhere at once, so the team has time to grow the catalog.",
        who: "Kids’ products seller",
        initial: "K",
        meta: "4 marketplaces · since 2023",
      },
      {
        num: "4 → 1",
        label: "all in one window",
        title: "Orders, delivery and finances — now all in one window.",
        text: "We grew from one marketplace to four without hiring anyone new. The dashboard shows what’s selling and what’s stuck, so purchasing decisions are spot-on.",
        who: "Auto parts seller",
        initial: "A",
        meta: "4 marketplaces · since 2022",
      },
      {
        num: "×2",
        label: "repeat orders",
        title: "Instant replies to reviews and same-day shipping pushed our product cards up in search.",
        text: "We reply to customers automatically and orders ship the same day. Ratings went up, cards rank higher and repeat orders doubled in three months. The support is great too.",
        who: "Grocery & eco products seller",
        initial: "G",
        meta: "Yandex Market & Uzum · since 2024",
      },
    ],
  },
});
