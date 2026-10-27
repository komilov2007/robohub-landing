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
});
