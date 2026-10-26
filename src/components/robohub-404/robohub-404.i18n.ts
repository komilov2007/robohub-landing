import { defineMessages } from "@/i18n/config";

// Robohub 404 sahifasi matnlari (Robohub, Academy, Kalkulyator, AI Studio — hammasi uchun bitta)
export const messages = defineMessages({
  uz: {
    title: "Sahifa topilmadi",
    badge: "Xato 404",
    heading: "Bu sahifa marketpleyslar orasida adashib qoldi",
    text: "Siz ochmoqchi bo‘lgan sahifa o‘chirilgan, nomi o‘zgargan yoki manzil xato yozilgan. Quyidagi bo‘limlardan birini tanlang — kerakli joyga tez yetib borasiz.",
    home: "Bosh sahifaga",
    back: "Orqaga qaytish",
    logo: "Robohub — bosh sahifa",
    linksTitle: "Balki shulardan birini qidirgandirsiz",
    links: {
      robohub: { name: "Robohub", text: "Uzum, Wildberries, Ozon va Yandex Market — bitta kabinetda" },
      academy: { name: "Academy", text: "Robohub bo‘yicha qisqa video darslar" },
      aiStudio: { name: "AI Studio", text: "Mahsulot rasmlari va videolarini AI bilan yarating" },
      calculator: { name: "Kalkulyator", text: "Marketpleysdagi foyda va komissiyani hisoblang" },
    },
    help: "Savolingiz bormi? Yordam xizmatiga yozing",
  },
  ru: {
    title: "Страница не найдена",
    badge: "Ошибка 404",
    heading: "Эта страница потерялась между маркетплейсами",
    text: "Страница, которую вы ищете, удалена, переименована или адрес набран с ошибкой. Выберите один из разделов ниже — так вы быстрее попадёте куда нужно.",
    home: "На главную",
    back: "Вернуться назад",
    logo: "Robohub — главная",
    linksTitle: "Возможно, вы искали один из этих разделов",
    links: {
      robohub: { name: "Robohub", text: "Uzum, Wildberries, Ozon и Яндекс Маркет — в одном кабинете" },
      academy: { name: "Academy", text: "Короткие видеоуроки по работе с Robohub" },
      aiStudio: { name: "AI Studio", text: "Фото и видео товаров с помощью AI" },
      calculator: { name: "Калькулятор", text: "Прибыль и комиссии на маркетплейсах" },
    },
    help: "Остались вопросы? Напишите в поддержку",
  },
  en: {
    title: "Page not found",
    badge: "Error 404",
    heading: "This page got lost between the marketplaces",
    text: "The page you are looking for was removed, renamed, or the address has a typo. Pick one of the sections below to get where you need to be.",
    home: "Back to home",
    back: "Go back",
    logo: "Robohub — home",
    linksTitle: "Maybe you were looking for one of these",
    links: {
      robohub: { name: "Robohub", text: "Uzum, Wildberries, Ozon and Yandex Market in one dashboard" },
      academy: { name: "Academy", text: "Short video lessons on using Robohub" },
      aiStudio: { name: "AI Studio", text: "Create product photos and videos with AI" },
      calculator: { name: "Calculator", text: "Work out marketplace profit and fees" },
    },
    help: "Have a question? Message our support team",
  },
});
