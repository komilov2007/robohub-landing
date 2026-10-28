import { getMessages } from "@/i18n/server";
import ContactQuiz from "./contact-quiz";
import ContactScript from "./contact-script";
import { messages } from "./contact.i18n";

// Header'dagi "Ariza qoldirish" tugmasi ochadigan oyna — ekran o'rtasida, ichida "Aloqa" bo'limidagi forma (quiz).
// <dialog>: ochish/yopish header.script.js da (showModal — fokus oyna ichida, Esc yopadi, orqa fon bosilsa yopiladi).
// JS ishlamasa tugma oddiy havola — sahifadagi #contact bo'limiga o'tadi.
export default async function ContactModal() {
  const t = await getMessages(messages);
  return (
    <>
      <dialog className="cmodal" id="contact-modal" data-theme="light" aria-labelledby="cmodal-title">
        <div className="cmodal__box contact__in">
          <button type="button" className="cmodal__close" data-close="" aria-label={t.close}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
          <h2 className="contact__title" id="cmodal-title">
            {t.title}
            <span className="accent">{t.titleAccent}</span>
          </h2>
          <p className="contact__lead">{t.lead}</p>
          <ContactQuiz t={t} id="cmodal" />
        </div>
      </dialog>
      <ContactScript t={t.quiz} id="cmodal" />
    </>
  );
}
