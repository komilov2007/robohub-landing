import type { CSSProperties } from "react";
import { getMessages } from "@/i18n/server";
import ContactQuiz from "./contact-quiz";
import ContactScript from "./contact-script";
import { messages } from "./contact.i18n";

export default async function Contact() {
  const t = await getMessages(messages);
  return (
    <>
      <section className="contact" id="contact" data-theme="light" aria-labelledby="contact-title">
        <div className="container">
          {/* Ixcham, oʻrtada: sarlavha, bitta maydonli forma (telefon) va pastida aloqa havolalari */}
          <div className="contact__in">
            {/* Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi */}
            <h2 className="contact__title" id="contact-title" data-sr="" style={{ "--d": "80ms" } as CSSProperties}>
              {t.title}<span className="accent">{t.titleAccent}</span>
            </h2>
            <p className="contact__lead" data-sr="" style={{ "--d": "140ms" } as CSSProperties}>
              {t.lead}
            </p>
            <ContactQuiz t={t} id="contact" reveal />
          </div>
        </div>
      </section>
      <ContactScript t={t.quiz} id="contact" />
    </>
  );
}
