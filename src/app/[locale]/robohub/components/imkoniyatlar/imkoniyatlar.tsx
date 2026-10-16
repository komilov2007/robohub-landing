import ImkoniyatlarScript from "./imkoniyatlar-script";

// Skroll sahnasi: bo'lim ekranga qotadi, 18 ta vosita yoy bo'ylab o'tadi.
// Kartalar va matnlar brauzerda chiziladi (imkoniyatlar.script.js) — bu yerda faqat sahna asosi.
export default function Imkoniyatlar() {
  return (
    <>
      <section className="feat" id="imkoniyatlar" data-theme="light" aria-labelledby="feat-title">
        <div className="feat__stage">
          <div className="feat__rim" aria-hidden="true" />

          <div className="feat__intro">
            <p className="feat__eyebrow">Imkoniyatlar</p>
            {/* Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi */}
            <h2 className="feat__title" id="feat-title">
              <span>Sotuvchiga kerak hamma narsa —</span>
              <span className="accent">bitta kabinetda.</span>
            </h2>
            <p className="feat__lead">Buyurtmadan sof foydagacha: Robohub ichida 18 ta tayyor vosita bor. Pastga suring — har biri nima qilishini ko‘rsatamiz.</p>
            <p className="feat__hint">
              <i aria-hidden="true" />
              Skroll qiling
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
            Faqat sahna ekranga qotib turganda ko'rinadi (holatini imkoniyatlar.script.js boshqaradi). */}
        <button className="feat__skip" type="button" data-dir="down">
          <span>O‘tkazib yuborish</span>
          <i aria-hidden="true">↓</i>
        </button>
      </section>
      <ImkoniyatlarScript />
    </>
  );
}
