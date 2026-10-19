import { getMessages } from "@/i18n/server";
import FeaturesScript from "./features-script";
import { messages } from "./features.i18n";

// Skroll sahnasi: bo'lim ekranga qotadi, 18 ta vosita yoy bo'ylab o'tadi.
// Kartalar va matnlar brauzerda chiziladi (features.script.js) — bu yerda faqat sahna asosi.
export default async function Features() {
  const t = await getMessages(messages);
  return (
    <>
      <section className="feat" id="features" data-theme="light" aria-labelledby="feat-title">
        <div className="feat__stage">
          <div className="feat__rim" aria-hidden="true" />

          <div className="feat__intro">
            <p className="feat__eyebrow">{t.eyebrow}</p>
            {/* Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi */}
            <h2 className="feat__title" id="feat-title">
              <span>{t.title[0]}</span>
              <span className="accent">{t.title[1]}</span>
            </h2>
            <p className="feat__lead">{t.lead}</p>
            <p className="feat__hint">
              <i aria-hidden="true" />
              {t.hint}
            </p>
          </div>

          <div className="feat__hud is-off" aria-hidden="true">
            <div className="feat-hud__mark">
              <svg className="feat-hud__ring" viewBox="0 0 102 102">
                <circle className="t" cx="51" cy="51" r="48" />
                <circle className="p" cx="51" cy="51" r="48" />
              </svg>
              <svg className="m" viewBox="0 0 33.8675 15.06">
                <use href="#rh-mark" />
              </svg>
            </div>
            <p className="feat-hud__count">
              <b>01</b> / 18
            </p>
            <p className="feat-hud__cat" />
            <div className="feat-hud__dots">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          {/* kartalar va matnlar JS bilan shu yerga chiziladi */}
        </div>
        {/* Sahnani o'tkazib yuborish: pastga ketayotganda keyingi bo'limga, tepaga chiqayotganda oldingisiga olib o'tadi.
            Faqat sahna ekranga qotib turganda ko'rinadi (holatini features.script.js boshqaradi). */}
        <button className="feat__skip" type="button" data-dir="down">
          <span>{t.script.skipDown}</span>
          <i aria-hidden="true">↓</i>
        </button>
      </section>
      <FeaturesScript t={t.script} />
    </>
  );
}
