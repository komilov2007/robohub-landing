import { defineMessages } from "@/i18n/config";

export const messages = defineMessages({
  uz: {
    // Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi
    title: "Robohub jamoasi bilan ",
    titleAccent: "bog‘laning",
    lead: "Savolingiz bormi yoki demo kerakmi? Raqamingizni qoldiring — tez javob beramiz.",
    send: "Yuborish",
    note: "Yuborish bosilganda pochta dasturingizda tayyor xat ochiladi.",
    // barcha savollardan keyin forma o'rnida chiqadigan tasdiq
    done: "Soʻrov yuborildi",
    doneSub: "Tez orada siz bilan bogʻlanamiz",
    // contact.script.js boshqaradi: savollar bitta inputda ketma-ket chiqadi,
    // oxirgisidan keyin javoblardan tayyor xat (mailto) tuziladi. label — xatdagi qator nomi
    quiz: {
      subject: "Robohub: sayt orqali murojaat",
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
    note: "После нажатия «Отправить» в почтовой программе откроется готовое письмо.",
    done: "Заявка отправлена",
    doneSub: "Скоро свяжемся с вами",
    quiz: {
      subject: "Robohub: заявка с сайта",
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
    note: "Clicking Send opens a ready-made email in your mail app.",
    done: "Request sent",
    doneSub: "We’ll get back to you soon",
    quiz: {
      subject: "Robohub: website inquiry",
      steps: [
        { name: "marketplace", type: "text", autoComplete: "off", placeholder: "Which marketplace do you sell on?", label: "Marketplace: " },
        { name: "name", type: "text", autoComplete: "name", placeholder: "Your name", label: "Name: " },
        { name: "phone", type: "tel", autoComplete: "tel", placeholder: "Your phone number", label: "Phone: " },
      ],
    },
  },
});
