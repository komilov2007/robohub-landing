import type { CSSProperties } from "react";
import AloqaScript from "./aloqa-script";

export default function Aloqa() {
  return (
    <>
      <section className="contact" id="aloqa" data-theme="light" aria-labelledby="contact-title">
        <div className="container">
          <div className="contact__head">
            <div>
              <p className="contact__eyebrow" data-sr="">Aloqa</p>
              {/* Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi */}
              <h2 className="contact__title" id="contact-title" data-sr="" style={{ "--d": "80ms" } as CSSProperties}>
                Robohub jamoasi bilan <span className="accent">bog‘laning</span>
              </h2>
            </div>
            <p className="contact__lead" data-sr="" style={{ "--d": "140ms" } as CSSProperties}>
              Savolingiz bormi yoki demo kerakmi? Kontaktlaringizni qoldiring — tez javob beramiz.
            </p>
          </div>

          <div className="contact__ways" data-sr="" style={{ "--d": "180ms" } as CSSProperties}>
            <a className="contact__way" href="https://t.me/Robohubuz" target="_blank" rel="noopener">
              <i aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.5 4.3 18.4 19c-.2 1-.9 1.3-1.8.8l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.4-4.9 8.9-8c.4-.4-.1-.5-.6-.2L6.2 12.800 1.500 11.300c-1-.3-1-1 .2-1.500L20.200 2.700c.9-.3 1.600.2 1.300 1.600z" />
                </svg>
              </i>
              <span>Telegram</span>
              <b>@Robohubuz</b>
            </a>
            <a className="contact__way" href="mailto:hello@robohub.uz">
              <i aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="M4 8l8 5 8-5" />
                </svg>
              </i>
              <span>Email</span>
              <b>hello@robohub.uz</b>
            </a>
            <a className="contact__way" href="tel:+998999857226">
              <i aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                </svg>
              </i>
              <span>Qoʻllab-quvvatlash xizmati</span>
              <b>+998 (99) 985 72 26</b>
            </a>
            <div className="contact__way">
              <i aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s7-6.2 7-11.500A7 7 0 0 0 5 9.500C5 14.800 12 21 12 21z" />
                  <circle cx="12" cy="9.5" r="2.5" />
                </svg>
              </i>
              <span>Manzil</span>
              <b>Toshkent, Oʻzbekiston</b>
            </div>
          </div>

          {/* Forma serverga yubormaydi: aloqa.script.js kiritilgan ma'lumotdan tayyor xat (mailto) ochadi */}
          <form className="contact__form" id="contact-form" data-sr="" style={{ "--d": "240ms" } as CSSProperties}>
            <label>
              Ismingiz
              <input type="text" name="name" autoComplete="name" placeholder="Ismingiz" required />
            </label>
            <label>
              Telefon raqami
              <input type="tel" name="phone" autoComplete="tel" inputMode="tel" placeholder="+998 __ ___ __ __" required />
            </label>
            <label className="contact__msg">
              Xabar
              <textarea name="message" rows={1} placeholder="Savolingiz yoki qaysi marketpleyslarda sotishingiz" />
            </label>
            <button className="btn btn--lg btn--primary" type="submit">
              Yuborish <span className="arrow" aria-hidden="true">→</span>
            </button>
          </form>
          <p className="contact__note">“Yuborish” bosilganda pochta dasturingizda tayyor xat ochiladi.</p>
        </div>
      </section>
      <AloqaScript />
    </>
  );
}
