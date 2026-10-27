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
});
