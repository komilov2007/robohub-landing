import { defineMessages } from "@/i18n/config";

export const messages = defineMessages({
  uz: {
    eyebrow: "Aloqa",
    // Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi
    title: "Robohub jamoasi bilan ",
    titleAccent: "bog‘laning",
    lead: "Savolingiz bormi yoki demo kerakmi? Raqamingizni qoldiring — tez javob beramiz.",
    phone: "Telefon raqamingiz",
    send: "Yuborish",
    note: "Yuborish bosilganda pochta dasturingizda tayyor xat ochiladi.",
    // aloqa.script.js tuzadigan xat (mailto) matni
    mail: { subject: "Robohub: sayt orqali murojaat", phone: "Telefon: " },
  },
  ru: {
    eyebrow: "Контакты",
    title: "Свяжитесь с командой ",
    titleAccent: "Robohub",
    lead: "Есть вопрос или нужна демонстрация? Оставьте номер — мы быстро ответим.",
    phone: "Ваш номер телефона",
    send: "Отправить",
    note: "После нажатия «Отправить» в почтовой программе откроется готовое письмо.",
    mail: { subject: "Robohub: заявка с сайта", phone: "Телефон: " },
  },
  en: {
    eyebrow: "Contact",
    title: "Get in touch with the ",
    titleAccent: "Robohub team",
    lead: "Have a question or want a demo? Leave your number — we’ll get back to you fast.",
    phone: "Your phone number",
    send: "Send",
    note: "Clicking Send opens a ready-made email in your mail app.",
    mail: { subject: "Robohub: website inquiry", phone: "Phone: " },
  },
});
