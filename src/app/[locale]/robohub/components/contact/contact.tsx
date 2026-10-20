import type { CSSProperties } from "react";
import { getMessages } from "@/i18n/server";
import ContactScript from "./contact-script";
import { messages } from "./contact.i18n";

export default async function Contact() {
  const t = await getMessages(messages);
  const first = t.quiz.steps[0];
  return (
    <>
      <section className="contact" id="contact" data-theme="light" aria-labelledby="contact-title">
        <div className="container">
          {/* Ixcham, oʻrtada: sarlavha, bitta maydonli forma (telefon) va pastida aloqa havolalari */}
          <div className="contact__in">
            <p className="contact__eyebrow" data-sr="">{t.eyebrow}</p>
            {/* Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi */}
            <h2 className="contact__title" id="contact-title" data-sr="" style={{ "--d": "80ms" } as CSSProperties}>
              {t.title}<span className="accent">{t.titleAccent}</span>
            </h2>
            <p className="contact__lead" data-sr="" style={{ "--d": "140ms" } as CSSProperties}>
              {t.lead}
            </p>

            {/* Quiz: bitta input, savollar ketma-ket almashadi (contact.script.js). Forma serverga yubormaydi —
                oxirgi savoldan keyin javoblardan tayyor xat (mailto) ochiladi. Boshida birinchi savol render qilinadi */}
            <form className="contact__form" id="contact-form" data-sr="" style={{ "--d": "200ms" } as CSSProperties}>
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
              </div>
            </form>
            <p className="contact__note" data-sr="" style={{ "--d": "240ms" } as CSSProperties}>
              {t.note}
            </p>

            <p className="contact__ways" data-sr="" style={{ "--d": "280ms" } as CSSProperties}>
              <a href="https://t.me/Robohubuz" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M21.5 4.3 18.4 19c-.2 1-.9 1.3-1.8.8l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.4-4.9 8.9-8c.4-.4-.1-.5-.6-.2L6.2 12.8 1.5 11.3c-1-.3-1-1 .2-1.5L20.200 2.7c.9-.3 1.600.2 1.300 1.600z" />
                </svg>
                @Robohubuz
              </a>
              <a href="tel:+998781138212">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                </svg>
                +998 78 113 82 12
              </a>
              <a href="mailto:hello@robohub.uz">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="M4 8l8 5 8-5" />
                </svg>
                hello@robohub.uz
              </a>
            </p>
          </div>
        </div>
      </section>
      <ContactScript t={t.quiz} />
    </>
  );
}
