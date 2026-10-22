"use client";

import { Fragment, useState, useSyncExternalStore } from "react";
import { defineMessages, type Locale } from "@/i18n/config";
import "./announce-bar.css";

// Header ustidagi reklama polosasi — rb-market'dagi AnnounceBar nusxasi (o'sha matn va xatti-harakat).
// Oddiy oqimda turadi: biroz skroll qilinsa yuqoriga chiqib ketadi, sticky header esa joyida qoladi.
// Butun polosa — bitta havola (robohub.uz/register); yopish tugmasi undan tashqarida, yopilgani brauzerda eslab qolinadi.
// Hozircha faqat AI Studio va Kalkulyator landinglarida.

const REGISTER_HREF = "https://robohub.uz/register";
const KEY = "rb-announce-signup";

// Matnlar — rb-market tarjimalaridan (announce_signup_calc, register)
const messages = defineMessages({
  uz: { text: "Robohub — <accent>4 ta marketpleys bitta kabinetda</accent>", cta: "Ro'yxatdan o'tish", close: "Yopish" },
  ru: { text: "Robohub — <accent>4 маркетплейса в одном кабинете</accent>", cta: "Зарегистрироваться", close: "Закрыть" },
  en: { text: "Robohub — <accent>4 marketplaces in one cabinet</accent>", cta: "Register", close: "Close" },
});

// Saqlash joyi bloklangan bo'lishi mumkin — eslab qola olmaydigan polosa ochilmaydigan sahifadan yaxshiroq
const wasDismissed = () => {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
};
const noop = () => () => {};

export default function AnnounceBar({ locale }: { locale: Locale }) {
  const t = messages[locale];
  // Serverda va gidratsiyada — ko'rinadi; brauzerda avval yopilgan bo'lsa, darhol yashiriladi
  const dismissed = useSyncExternalStore(noop, wasDismissed, () => false);
  const [closed, setClosed] = useState(false);
  if (dismissed || closed) return null;

  const close = () => {
    setClosed(true);
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* keyingi tashrifda yana chiqadi, xolos */
    }
  };

  return (
    <aside className="announce">
      <a className="announce__link" href={REGISTER_HREF}>
        <span className="announce__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="4" y="2.5" width="16" height="19" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
            <rect x="7.5" y="6" width="9" height="3.5" rx="1" stroke="currentColor" strokeWidth="1.8" />
            <path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </span>
        <span className="announce__text">
          {t.text.split(/<accent>(.*?)<\/accent>/g).map((part, i) =>
            i % 2 ? <b key={i}>{part}</b> : <Fragment key={i}>{part}</Fragment>,
          )}
        </span>
        <span className="announce__cta">
          {t.cta}
          <span className="announce__arrow" aria-hidden="true">
            →
          </span>
        </span>
      </a>
      <button type="button" className="announce__close" aria-label={t.close} onClick={close}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <span className="announce__sheen" aria-hidden="true" />
    </aside>
  );
}
