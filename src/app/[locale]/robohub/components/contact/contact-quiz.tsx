import type { CSSProperties } from "react";
import { TELEGRAM_HANDLE, TELEGRAM_URL } from "@/lib/contacts";
import type { messages } from "./contact.i18n";
import { PHONE_COUNTRIES } from "./phone-countries";

type T = (typeof messages)["uz"];

// Aloqa formasi (quiz) — "Aloqa" bo'limida va header'dagi "Ariza qoldirish" modalida bir xil.
// id — elementlar id'larining prefiksi (contact.script.js shu prefiks bilan topadi): "contact" — bo'lim, "cmodal" — modal.
// reveal — skroll bilan chiqish animatsiyasi (data-sr) faqat bo'limda; modalda hammasi darhol ko'rinadi.
export default function ContactQuiz({ t, id, reveal = false }: { t: T; id: string; reveal?: boolean }) {
  const q = t.quiz;
  const first = q.steps[0];
  const sr = (d: number) => (reveal ? { "data-sr": "", style: { "--d": `${d}ms` } as CSSProperties } : {});
  return (
    <>
      {/* Quiz: bitta input, savollar ketma-ket almashadi (contact.script.js). Forma serverga yubormaydi —
          oxirgi savoldan keyin javoblardan tayyor xat (mailto) ochiladi. Boshida birinchi savol render qilinadi */}
      {/* qaysi qadamda ekani: "Qadam 1/3" va uchta chiziq */}
      <p className="contact__steps" id={`${id}-steps`} data-step="0" {...sr(180)}>
        <span>
          {q.step} <b>1</b>/{q.steps.length}
        </span>
        <span className="contact__bars" aria-hidden="true">
          {q.steps.map((s) => (
            <i key={s.name} />
          ))}
        </span>
      </p>
      <form className="contact__form" id={`${id}-form`} {...sr(200)}>
        {/* 1-qadamda tanlangan variantlar shu yerda chip bo'lib turadi (contact.script.js) */}
        <span className="contact__chips" id={`${id}-chips`} />
        {/* oxirgi qadam (telefon): mamlakat kodi — inputdan alohida, o'chirib bo'lmaydi; bosilsa ro'yxat ochiladi (contact.script.js) */}
        <div className="contact__cc" id={`${id}-cc`} hidden>
          <button type="button" className="contact__cc-btn" aria-haspopup="listbox" aria-expanded="false" aria-label={q.country}>
            <img src={PHONE_COUNTRIES[0].flag} alt="" width={20} height={20} />
            <span>+{PHONE_COUNTRIES[0].code}</span>
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path d="M3 4.5 6 7.5 9 4.5" />
            </svg>
          </button>
          <ul className="contact__cc-menu" role="listbox" aria-label={q.country} hidden>
            {PHONE_COUNTRIES.map((c) => (
              <li key={c.id} role="none">
                <button type="button" role="option" aria-selected="false" data-cc={c.id} data-code={c.code} data-mask={c.mask} data-flag={c.flag}>
                  <img src={c.flag} alt="" width={20} height={20} loading="lazy" />
                  <b>{c.id.toUpperCase()}</b>
                  <span>+{c.code}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <input
          type={first.type}
          name={first.name}
          autoComplete={first.autoComplete}
          placeholder={first.placeholder}
          aria-label={first.placeholder}
          required
        />
        <button type="submit" aria-label={t.send}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 12h15M13 6l6 6-6 6" />
          </svg>
        </button>
        {/* Tasdiq: oxirgi javobdan keyin forma doiraga "yopilib", shu holatga ochiladi (.is-done) */}
        <div className="contact__done" role="status" aria-hidden="true">
          <span className="contact__done-ico">
            <svg viewBox="0 0 33.8675 15.06" aria-hidden="true">
              <use href="#rh-mark" />
            </svg>
            <i>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </i>
          </span>
          <span className="contact__done-text">
            <b>{t.done}</b>
            <small>{t.doneSub}</small>
          </span>
          {/* formani boshidan boshlash — yangi so'rov yuborish uchun */}
          <button type="button" className="contact__again" tabIndex={-1}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.6M20 4v4.6h-4.6M20 12a8 8 0 0 1-13.7 5.6L4 15.4M4 20v-4.6h4.6" />
            </svg>
            <span>{q.again}</span>
          </button>
        </div>
      </form>
      {/* 1-qadam: tayyor variantlar (bir nechtasini tanlash mumkin) va "Boshqa" */}
      <div className="contact__opts" id={`${id}-opts`} role="group" aria-label={first.placeholder} {...sr(220)}>
        {q.options.map((o) => (
          <button key={o} type="button" data-opt={o} aria-pressed="false">
            {o}
          </button>
        ))}
        <button type="button" data-opt="other" aria-pressed="false" className="is-other">
          {q.other}
        </button>
      </div>
      {/* oxirgi qadam: telefon yoki email */}
      <div className="contact__via" id={`${id}-via`} role="group" hidden>
        <button type="button" data-via="phone" aria-pressed="true">
          {q.methods.phone}
        </button>
        <button type="button" data-via="email" aria-pressed="false">
          {q.methods.email}
        </button>
      </div>
      <p className="contact__ways" {...sr(280)}>
        <a href={TELEGRAM_URL} target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M21.5 4.3 18.4 19c-.2 1-.9 1.3-1.8.8l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.4-4.9 8.9-8c.4-.4-.1-.5-.6-.2L6.2 12.8 1.5 11.3c-1-.3-1-1 .2-1.5L20.200 2.7c.9-.3 1.600.2 1.300 1.600z" />
          </svg>
          {TELEGRAM_HANDLE}
        </a>
        <a href="tel:+998781138212">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
          </svg>
          +998 78 113 82 12
        </a>
        <a href="mailto:info@robohub.uz">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="3" />
            <path d="M4 8l8 5 8-5" />
          </svg>
          info@robohub.uz
        </a>
      </p>
    </>
  );
}
