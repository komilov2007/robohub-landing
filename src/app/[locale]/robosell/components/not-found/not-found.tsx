import type { CSSProperties } from "react";
import ContactIcon from "@/components/contact-icon/contact-icon";
import { localeHref, type Locale } from "@/i18n/config";
import { TELEGRAM_URL } from "@/lib/contacts";
import { onest } from "../../fonts";
import Logo from "../logo/logo";
import { messages } from "./not-found.i18n";
import "../../robosell.css";

// Robosell 404 sahifasi (app/global-not-found.tsx ko'rsatadi). Chapda — sarlavha va tugmalar, o'ngda — Telegram bot suhbati:
// mijoz sahifani so'raydi, bot "yozmoqda…" dan keyin 404 deb javob beradi va bosh sahifa bo'limlariga
// inline-tugmalar chiqaradi (bular haqiqiy havolalar). Animatsiya faqat CSS'da; reduced-motion'da — butun suhbat birdan.
// Uslublar: robosell.css → "404" bo'limi (.rs-nf-*).
export default function NotFound404({ locale }: { locale: Locale }) {
  const t = messages[locale];
  const home = localeHref(locale, "/");

  return (
    <div className={`rs rs-nf ${onest.variable}`}>
      <span className="rs-nf__blob rs-nf__blob--a" aria-hidden="true" />
      <span className="rs-nf__blob rs-nf__blob--b" aria-hidden="true" />

      <header className="rs-wrap rs-nf__top">
        <a className="rs-nf__logo" href={home} aria-label={t.logo}>
          <Logo />
        </a>
        <a className="rs-btn rs-btn--sm rs-btn--line" href={home}>
          {t.home}
        </a>
      </header>

      <main className="rs-wrap rs-nf__main">
        <div className="rs-nf__text">
          <p className="rs-nf__badge">{t.badge}</p>
          <p className="rs-nf__code" aria-hidden="true">
            4<span>0</span>4
          </p>
          <h1 className="rs-nf__title">{t.heading}</h1>
          <p className="rs-nf__lead">{t.text}</p>
          <div className="rs-nf__cta">
            <a className="rs-btn rs-btn--lg rs-btn--yellow" href={home}>
              {t.home}
              <span className="rs-btn__arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a className="rs-btn rs-btn--lg rs-btn--line" href={TELEGRAM_URL} target="_blank" rel="noopener">
              <ContactIcon name="telegram" size={18} />
              {t.write}
            </a>
          </div>
        </div>

        <div className="rs-nf__chat">
          <div className="rs-nf__chat-head" aria-hidden="true">
            <span className="rs-nf__chat-back">←</span>
            <span className="rs-nf__chat-ava">R</span>
            <span className="rs-nf__chat-who">
              <b>{t.chat.name}</b>
              <small>{t.chat.status}</small>
            </span>
          </div>
          <div className="rs-nf__msgs">
            <p className="rs-nf__msg is-me" style={{ "--d": "300ms" } as CSSProperties}>
              {t.chat.me}
              <small>✓✓</small>
            </p>
            <p className="rs-nf__typing" aria-hidden="true">
              <i />
              <i />
              <i />
            </p>
            <div className="rs-nf__msg" style={{ "--d": "1900ms" } as CSSProperties}>
              <p>{t.chat.bot}</p>
              <p className="rs-nf__msg-code">{t.chat.code}</p>
              <p>{t.chat.offer}</p>
            </div>
            <nav className="rs-nf__kb" aria-label={t.chat.offer}>
              {t.buttons.map((b, i) => (
                <a key={b.label} href={home + b.href} style={{ "--d": `${2300 + i * 120}ms` } as CSSProperties}>
                  {b.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </main>
    </div>
  );
}
