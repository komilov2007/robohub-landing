"use client";

import { Fragment, useState, useSyncExternalStore } from "react";
import { defineMessages, localeHref, type Locale } from "@/i18n/config";
import { useRobohubOrigin } from "@/lib/robohub-origin";
import { sellerUrl } from "@/lib/sites";
import "./announce-bar.css";

// Header ustidagi reklama polosasi — rb-market'dagi AnnounceBar nusxasi (o'sha matn va xatti-harakat).
// Oddiy oqimda turadi: biroz skroll qilinsa yuqoriga chiqib ketadi, sticky header esa joyida qoladi.
// Butun polosa — bitta havola; yopish tugmasi undan tashqarida, yopilgani brauzerda eslab qolinadi (har holat alohida).
// Ikki holat (cta):
//   "more"     — AI Studio, Kalkulyator, Academy: "Batafsil" → Robohub landingi (joriy muhitda — src/lib/robohub-origin.ts);
//   "register" — Robohub landingining o'zi: "Ro'yxatdan o'tish" → sotuvchi kabinetida ro'yxatdan o'tish (joriy tilda).
type Cta = "more" | "register";
const KEYS: Record<Cta, string> = { more: "rb-announce-signup", register: "rb-announce-register" };

// Matnlar — rb-market tarjimalaridan (announce_signup_calc, register)
const messages = defineMessages({
  uz: {
    text: "Robohub — <accent>Barcha marketpleyslar bitta kabinetda</accent>",
    more: "Batafsil",
    cta: "Ro'yxatdan o'tish",
    close: "Yopish",
  },
  ru: {
    text: "Robohub — <accent>Все маркетплейсы в одном кабинете</accent>",
    more: "Подробнее",
    cta: "Зарегистрироваться",
    close: "Закрыть",
  },
  en: {
    text: "Robohub — <accent>All marketplaces in one dashboard</accent>",
    more: "Learn more",
    cta: "Register",
    close: "Close",
  },
  kk: {
    text: "Robohub — <accent>Барлық маркетплейстер бір кабинетте</accent>",
    more: "Толығырақ",
    cta: "Тіркелу",
    close: "Жабу",
  },
  ky: {
    text: "Robohub — <accent>Бардык маркетплейстер бир кабинетте</accent>",
    more: "Кененирээк",
    cta: "Катталуу",
    close: "Жабуу",
  },
  kaa: {
    text: "Robohub — <accent>Barlıq marketpleysler bir kabinette</accent>",
    more: "Tolıǵıraq",
    cta: "Dizimnen ótiw",
    close: "Jabıw",
  },
  tg: {
    text: "Robohub — <accent>Ҳамаи маркетплейсҳо дар як кабинет</accent>",
    more: "Муфассал",
    cta: "Бақайдгирӣ",
    close: "Пӯшидан",
  },
});

// Saqlash joyi bloklangan bo'lishi mumkin — eslab qola olmaydigan polosa ochilmaydigan sahifadan yaxshiroq
const wasDismissed = (key: string) => {
  try {
    return localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
};
const noop = () => () => {};

export default function AnnounceBar({ locale, cta = "more" }: { locale: Locale; cta?: Cta }) {
  const t = messages[locale];
  const origin = useRobohubOrigin();
  const href = cta === "register" ? sellerUrl(locale) : `${origin}${localeHref(locale, "/")}`;
  const KEY = KEYS[cta];
  // Serverda va gidratsiyada — ko'rinadi; brauzerda avval yopilgan bo'lsa, darhol yashiriladi
  const dismissed = useSyncExternalStore(noop, () => wasDismissed(KEY), () => false);
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
      <a className="announce__link" href={href} {...(cta === "register" ? { target: "_blank", rel: "noopener" } : {})}>
        <span className="announce__icon" aria-hidden="true">
          {/* Robohub belgisi (∞) — logotipning faqat ikonka qismi */}
          <svg viewBox="0 7.97 33.8675 15.06">
            <path
              fill="currentColor"
              d="M26.3414 7.97623H7.5261C3.37004 7.97623 0 11.3439 0 15.5C0 19.656 3.37004 23.0261 7.5261 23.0261H26.3414C30.4974 23.0261 33.8675 19.656 33.8675 15.5C33.8675 11.3439 30.4974 7.97388 26.3414 7.97388V7.97623ZM24.4587 20.2067C23.1031 20.2067 21.8841 19.6325 21.0251 18.7147C20.0131 17.6039 18.5564 16.9097 16.9349 16.9097C15.3134 16.9097 13.8543 17.6039 12.8424 18.717C11.9834 19.6325 10.7644 20.2067 9.4088 20.2067C6.81068 20.2067 4.7044 18.1005 4.7044 15.5023C4.7044 12.9042 6.81068 10.7979 9.4088 10.7979C10.7644 10.7979 11.9834 11.3722 12.8424 12.2876C13.8543 13.3984 15.3111 14.0927 16.9349 14.0927C18.5564 14.0927 20.0155 13.3984 21.0274 12.2853C21.8864 11.3698 23.1055 10.7956 24.461 10.7956C27.0591 10.7956 29.1654 12.9018 29.1654 15.5C29.1654 18.0981 27.0591 20.2044 24.461 20.2044L24.4587 20.2067Z"
            />
          </svg>
        </span>
        <span className="announce__text">
          {t.text
            .split(/<accent>(.*?)<\/accent>/g)
            .map((part, i) =>
              i % 2 ? (
                <b key={i}>{part}</b>
              ) : (
                <Fragment key={i}>{part}</Fragment>
              ),
            )}
        </span>
        <span className="announce__cta">
          {cta === "register" ? t.cta : t.more}
          <span className="announce__arrow" aria-hidden="true">
            →
          </span>
        </span>
      </a>
      <button
        type="button"
        className="announce__close"
        aria-label={t.close}
        onClick={close}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <span className="announce__sheen" aria-hidden="true" />
    </aside>
  );
}
