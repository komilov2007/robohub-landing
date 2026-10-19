import { PHONE, PHONE_TEL, START_URL } from "../../lib/links";
import Icon, { ICONS } from "../svg-icon/svg-icon";

// "Savol qoldimi?" — sariq blok. Sariq ustida faqat to'q matn (oq matn yo'q).
// TODO (14-bo'lim, 7-savol): Telegram yordam linki bo'lsa — shu yerga uchinchi tugma.
export default function Contact() {
  return (
    <section className="ac-contact" id="contact" aria-labelledby="ac-contact-title">
      <div className="ac-wrap ac-contact__inner">
        <h2 id="ac-contact-title" className="ac-contact__title">
          Savol
          <br />
          qoldimi?
        </h2>
        <div className="ac-contact__side">
          <p>Darsda javob topmadingizmi? Savolingizni yozing yoki qo‘ng‘iroq qiling.</p>
          <div className="ac-contact__btns">
            <a href={PHONE_TEL} className="ac-btn ac-btn--ink">
              <Icon d={ICONS.phone} size={18} />
              {PHONE}
            </a>
            <a href={START_URL} className="ac-btn ac-btn--line">
              Bepul boshlash
              <Icon d={ICONS.arrowRight} size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
