import { defineMessages } from "@/i18n/config";

export const messages = defineMessages({
  uz: {
    // Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi
    title: "Robohub jamoasi bilan ",
    titleAccent: "bog‘laning",
    lead: "Savolingiz bormi yoki demo kerakmi? Raqamingizni qoldiring — tez javob beramiz.",
    send: "Yuborish",
    close: "Yopish",   // modal oynani yopish tugmasi (contact-modal.tsx)
    note: "Yuborish bosilganda pochta dasturingizda tayyor xat ochiladi.",
    // barcha savollardan keyin forma o'rnida chiqadigan tasdiq
    done: "Soʻrov yuborildi",
    doneSub: "Tez orada siz bilan bogʻlanamiz",
    // contact.script.js boshqaradi: savollar bitta inputda ketma-ket chiqadi,
    // oxirgisidan keyin javoblardan tayyor xat (mailto) tuziladi. label — xatdagi qator nomi.
    // options — 1-qadamdagi tayyor variantlar, other — "Boshqa" (nomini inputga yozadi);
    // methods — oxirgi qadamda telefon yoki email tanlovi
    quiz: {
      subject: "Robohub: sayt orqali murojaat",
      step: "Qadam",
      options: ["Uzum Market","Wildberries","Ozon","Yandex Market","Hali sotmayman"],
      other: "Boshqa",
      remove: "Olib tashlash",
      otherPlaceholder: "Marketpleys nomini yozing",
      pickError: "Variantni tanlang yoki nomini yozing",
      phoneError: "Raqamni toʻliq kiriting: +998 (XX) XXX-XX-XX",
      methods: { phone: "Telefon", email: "Email" },
      emailPlaceholder: "Email manzilingiz",
      emailLabel: "Email: ",
      emailError: "Email manzilini toʻliq kiriting, masalan: name@mail.uz",
      steps: [
        { name: "marketplace", type: "text", autoComplete: "off", placeholder: "Qaysi marketpleysda sotasiz?", label: "Marketpleys: " },
        { name: "name", type: "text", autoComplete: "name", placeholder: "Ismingiz", label: "Ism: " },
        { name: "phone", type: "tel", autoComplete: "tel", placeholder: "Telefon raqamingiz", label: "Telefon: " },
      ],
    },
  },
  ru: {
    title: "Свяжитесь с командой ",
    titleAccent: "Robohub",
    lead: "Есть вопрос или нужна демонстрация? Оставьте номер — мы быстро ответим.",
    send: "Отправить",
    close: "Закрыть",
    note: "После нажатия «Отправить» в почтовой программе откроется готовое письмо.",
    done: "Заявка отправлена",
    doneSub: "Скоро свяжемся с вами",
    quiz: {
      subject: "Robohub: заявка с сайта",
      step: "Шаг",
      options: ["Uzum Market","Wildberries","Ozon","Яндекс Маркет","Пока не продаю"],
      other: "Другое",
      remove: "Убрать",
      otherPlaceholder: "Напишите название площадки",
      pickError: "Выберите вариант или напишите название",
      phoneError: "Введите номер полностью: +998 (XX) XXX-XX-XX",
      methods: { phone: "Телефон", email: "Email" },
      emailPlaceholder: "Ваш email",
      emailLabel: "Email: ",
      emailError: "Введите email полностью, например: name@mail.uz",
      steps: [
        { name: "marketplace", type: "text", autoComplete: "off", placeholder: "На каком маркетплейсе продаёте?", label: "Маркетплейс: " },
        { name: "name", type: "text", autoComplete: "name", placeholder: "Ваше имя", label: "Имя: " },
        { name: "phone", type: "tel", autoComplete: "tel", placeholder: "Ваш номер телефона", label: "Телефон: " },
      ],
    },
  },
  en: {
    title: "Get in touch with the ",
    titleAccent: "Robohub team",
    lead: "Have a question or want a demo? Leave your number — we’ll get back to you fast.",
    send: "Send",
    close: "Close",
    note: "Clicking Send opens a ready-made email in your mail app.",
    done: "Request sent",
    doneSub: "We’ll get back to you soon",
    quiz: {
      subject: "Robohub: website inquiry",
      step: "Step",
      options: ["Uzum Market","Wildberries","Ozon","Yandex Market","Not selling yet"],
      other: "Other",
      remove: "Remove",
      otherPlaceholder: "Type the marketplace name",
      pickError: "Pick an option or type a name",
      phoneError: "Enter the full number: +998 (XX) XXX-XX-XX",
      methods: { phone: "Phone", email: "Email" },
      emailPlaceholder: "Your email",
      emailLabel: "Email: ",
      emailError: "Enter a full email address, e.g. name@mail.uz",
      steps: [
        { name: "marketplace", type: "text", autoComplete: "off", placeholder: "Which marketplace do you sell on?", label: "Marketplace: " },
        { name: "name", type: "text", autoComplete: "name", placeholder: "Your name", label: "Name: " },
        { name: "phone", type: "tel", autoComplete: "tel", placeholder: "Your phone number", label: "Phone: " },
      ],
    },
  },
});
