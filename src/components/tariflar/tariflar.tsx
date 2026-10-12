import type { CSSProperties } from "react";
import TariflarScript from "./tariflar-script";

export default function Tariflar() {
  return (
    <>
      <section className="price" id="tariflar" data-theme="light" aria-labelledby="price-title">
        <div className="container">
          <div className="price__in">
            <p className="price__eyebrow" data-sr="">Tariflar</p>{" "}
            {/* Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi */}{" "}
            <h2 className="price__title" id="price-title" data-sr="" style={{ "--d": "80ms" } as CSSProperties}>
              {"Bitta tarif. "}
              <span className="accent">12 ta do‘kongacha.</span>
            </h2>{" "}
            <div className="plan" id="plan" data-sr="" style={{ "--d": "140ms" } as CSSProperties}>
              <div className="plan__main">
                <h3 className="plan__name">
                  <i aria-hidden="true">
                    <svg viewBox="0 0 33.8675 15.06">
                      <use href="#rh-mark" />
                    </svg>
                  </i>
                  {" «Hammasi ichida» tarifi "}
                </h3>{" "}
                <p className="plan__sub">Marketpleyslaringizni yuritish uchun zarur barchasi</p>{" "}
                <div className="plan__terms" id="terms" role="radiogroup" aria-label="Muddat va chegirmalar">
                  <span className="plan__ind" aria-hidden="true" />{" "}
                  <button className="plan__term" type="button" role="radio" aria-checked="true" data-months="3" data-off="0">3 oy</button>{" "}
                  <button className="plan__term" type="button" role="radio" aria-checked="false" data-months="6" data-off="5">
                    6 oy
                    <small>−5%</small>
                  </button>{" "}
                  <button className="plan__term" type="button" role="radio" aria-checked="false" data-months="12" data-off="15">
                    12 oy
                    <small>−15%</small>
                  </button>
                </div>{" "}
                <p className="plan__was is-off" id="plan-was">
                  <s>500 000 soʻm</s>
                </p>{" "}
                <p className="plan__price" aria-live="polite">
                  <span className="odo" id="plan-odo" aria-label="500 000">500 000</span>{" "}
                  <span className="plan__unit">soʻm / oy</span>
                </p>{" "}
                <ul className="plan__sums is-none" id="plan-sums">
                  <li>
                    <span id="plan-term-text">3 oyda bir toʻlov · jami</span>
                    <b id="plan-total">1 500 000 soʻm</b>
                  </li>{" "}
                  <li className="is-save" id="plan-save-box">
                    <span id="plan-save-text">Tejaysiz</span>
                    <b id="plan-save" />
                  </li>
                </ul>{" "}
                <div className="plan__cta">
                  <a className="btn btn--lg btn--primary" href="#boshlash">
                    {"Hoziroq boshlash "}
                    <span className="arrow" aria-hidden="true">→</span>
                  </a>
                </div>{" "}
                <p className="plan__extra">
                  {"Koʻproq doʻkon kerakmi? Qoʻshimcha doʻkonni "}
                  <b>99 000 soʻm / oyga</b>
                  {" qoʻshing."}
                </p>
              </div>{" "}
              <div className="plan__in" data-theme="dark">
                <p className="plan__mps" aria-hidden="true">
                  <img src="/marketplaces/uzum.svg" alt="" width="38" height="38" />{" "}
                  <img src="/marketplaces/yandex.svg" alt="" width="38" height="38" />{" "}
                  <img src="/marketplaces/wildberries.svg" alt="" width="38" height="38" />{" "}
                  <img src="/marketplaces/ozon.svg" alt="" width="38" height="38" />
                </p>{" "}
                <p className="plan__label">Nimalar kiradi</p>{" "}
                <ul className="plan__list">
                  <li style={{ "--n": "0" } as CSSProperties}>
                    <i aria-hidden="true">✓</i>
                    Barcha marketpleyslar — Uzum, Yandex Market, Wildberries va Ozon
                  </li>{" "}
                  <li style={{ "--n": "1" } as CSSProperties}>
                    <i aria-hidden="true">✓</i>
                    Har marketpleysga 3 ta doʻkon
                  </li>{" "}
                  <li style={{ "--n": "2" } as CSSProperties}>
                    <i aria-hidden="true">✓</i>
                    Yagona dashboard va real vaqt tahlili
                  </li>{" "}
                  <li style={{ "--n": "3" } as CSSProperties}>
                    <i aria-hidden="true">✓</i>
                    Kartochka, sharh va maslahatlar uchun AI-yordamchi
                  </li>{" "}
                  <li style={{ "--n": "4" } as CSSProperties}>
                    <i aria-hidden="true">✓</i>
                    Buyurtma, mahsulot, yetkazib berish va moliya
                  </li>{" "}
                  <li style={{ "--n": "5" } as CSSProperties}>
                    <i aria-hidden="true">✓</i>
                    Ustuvor qoʻllab-quvvatlash
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TariflarScript />
    </>
  );
}
