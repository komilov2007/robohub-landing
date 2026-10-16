import type { CSSProperties } from "react";
import { getMessages } from "@/i18n/server";
import TariflarScript from "./tariflar-script";
import { messages } from "./tariflar.i18n";

export default async function Tariflar() {
  const t = await getMessages(messages);
  return (
    <>
      <section className="price" id="tariflar" data-theme="light" aria-labelledby="price-title">
        <div className="container">
          <div className="price__in">
            <p className="price__eyebrow" data-sr="">{t.eyebrow}</p>{" "}
            {/* Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi */}{" "}
            <h2 className="price__title" id="price-title" data-sr="" style={{ "--d": "80ms" } as CSSProperties}>
              {t.title}
              <span className="accent">{t.titleAccent}</span>
            </h2>{" "}
            <div className="plan" id="plan" data-sr="" style={{ "--d": "140ms" } as CSSProperties}>
              <div className="plan__main">
                <h3 className="plan__name">
                  <i aria-hidden="true">
                    <svg viewBox="0 0 33.8675 15.06">
                      <use href="#rh-mark" />
                    </svg>
                  </i>
                  {t.planName}
                </h3>{" "}
                <p className="plan__sub">{t.planSub}</p>{" "}
                <div className="plan__terms" id="terms" role="radiogroup" aria-label={t.termsLabel}>
                  <span className="plan__ind" aria-hidden="true" />{" "}
                  <button className="plan__term" type="button" role="radio" aria-checked="true" data-months="3" data-off="0">{t.terms[0].label}</button>{" "}
                  <button className="plan__term" type="button" role="radio" aria-checked="false" data-months="6" data-off="5">
                    {t.terms[1].label}
                    <small>−5%</small>
                  </button>{" "}
                  <button className="plan__term" type="button" role="radio" aria-checked="false" data-months="12" data-off="15">
                    {t.terms[2].label}
                    <small>−15%</small>
                  </button>
                </div>{" "}
                <p className="plan__was is-off" id="plan-was">
                  <s>{t.was}</s>
                </p>{" "}
                <p className="plan__price" aria-live="polite">
                  <span className="odo" id="plan-odo" aria-label={t.price}>{t.price}</span>{" "}
                  <span className="plan__unit">{t.unit}</span>
                </p>{" "}
                <ul className="plan__sums is-none" id="plan-sums">
                  <li>
                    <span id="plan-term-text">{t.terms[0].text}</span>
                    <b id="plan-total">{t.total}</b>
                  </li>{" "}
                  <li className="is-save" id="plan-save-box">
                    <span id="plan-save-text">{t.terms[0].save}</span>
                    <b id="plan-save" />
                  </li>
                </ul>{" "}
                <div className="plan__cta">
                  <a className="btn btn--lg btn--primary" href="#boshlash">
                    {t.cta}
                    <span className="arrow" aria-hidden="true">→</span>
                  </a>
                </div>{" "}
                <p className="plan__extra">
                  {t.extraBefore}
                  <b>{t.extraPrice}</b>
                  {t.extraAfter}
                </p>
              </div>{" "}
              <div className="plan__in" data-theme="dark">
                <p className="plan__mps" aria-hidden="true">
                  <img src="/marketplaces/uzum.svg" alt="" width="38" height="38" />{" "}
                  <img src="/marketplaces/yandex.svg" alt="" width="38" height="38" />{" "}
                  <img src="/marketplaces/wildberries.svg" alt="" width="38" height="38" />{" "}
                  <img src="/marketplaces/ozon.svg" alt="" width="38" height="38" />
                </p>{" "}
                <p className="plan__label">{t.includesLabel}</p>{" "}
                <ul className="plan__list">
                  {t.includes.map((item, n) => (
                    <li key={n} style={{ "--n": String(n) } as CSSProperties}>
                      <i aria-hidden="true">✓</i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TariflarScript t={{ ...t.script, terms: t.terms }} />
    </>
  );
}
