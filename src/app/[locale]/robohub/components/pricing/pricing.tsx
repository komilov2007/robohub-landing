import type { CSSProperties } from "react";
import { getMessages } from "@/i18n/server";
import PricingScript from "./pricing-script";
import { messages } from "./pricing.i18n";

// Oʻng panel tepasi: ulangan toʻrtta marketpleys, ostida — tez kunda qoʻshiladiganlar (xiraroq).
// Rasmiy logotipi hali yoʻqlari nom bilan chiqadi — fayl qoʻshilganda logo yoziladi.
const MPS = ["uzum", "yandex", "wildberries", "ozon"];
const SOON: { name: string; logo?: string; wide?: boolean }[] = [
  { name: "Kaspi", logo: "/marketplaces/kaspi.svg" },
  { name: "Teez", logo: "/marketplaces/teez.webp", wide: true },
  { name: "MMarket", logo: "/marketplaces/mmarket.svg", wide: true },
  { name: "Namba One", logo: "/marketplaces/namba.svg", wide: true },
  { name: "LakLak", logo: "/marketplaces/laklak.webp", wide: true },
  { name: "Avval", logo: "/marketplaces/avval.svg", wide: true },
];

export default async function Pricing() {
  const t = await getMessages(messages);
  return (
    <>
      <section className="price" id="pricing" data-theme="light" aria-labelledby="price-title">
        <div className="container">
          <div className="price__in">
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
                  <a className="btn btn--lg btn--primary" href="#start">
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
                  {MPS.map((m) => (
                    <img key={m} src={`/marketplaces/${m}.svg`} alt="" width="38" height="38" />
                  ))}
                </p>{" "}
                <p className="plan__soon">
                  <em>{t.soon}</em>
                  {SOON.map((m) => (
                    <span key={m.name} className={m.wide ? "is-wide" : undefined}>
                      {m.wide ? <img src={m.logo} alt={m.name} height="14" /> : m.logo && <img src={m.logo} alt="" width="16" height="16" />}
                      {!m.wide && m.name}
                    </span>
                  ))}
                </p>{" "}
                <p className="plan__label">{t.includesLabel}</p>{" "}
                {/* guruh bosilsa bandlari tagida ochiladi (bir vaqtda bittasi). Ro'yxat panelning qolgan balandligida
                    o'zi aylanadi — panel cho'zilmaydi; skroll chizig'i matn ustiga tushmaydi (o'z yo'lagi bor) */}
                <div className="plan__list">
                  {t.groups.map((g, n) => (
                    <details key={g.title} name="plan-groups" style={{ "--n": String(n) } as CSSProperties}>
                      <summary>
                        <i aria-hidden="true">✓</i>
                        <span>{g.title}</span>
                        <small>{g.items.length}</small>
                        <svg className="plan__chev" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </summary>
                      <ul>
                        {g.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PricingScript t={{ ...t.script, terms: t.terms }} />
    </>
  );
}
