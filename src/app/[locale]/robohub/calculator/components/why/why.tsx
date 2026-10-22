import type { CSSProperties } from "react";
import Icon from "../../../../ai-studio/components/icon/icon";
import { EXAMPLE, type Content } from "../../calculator.content";

const fmt = (n: number) => n.toLocaleString("ru-RU").replace(/ | /g, " ");

// "Komissiya — hali hammasi emas": ko'pchilik narxdan faqat komissiyani ayiradi va foydani 3 baravar ortiq ko'radi.
// Chapda rb-market'ning o'z matni (calc_about_p1/p2), o'ngda ikki karta: "shunday hisoblashadi" (ustidan chiziladi)
// va "aslida" — o'sha mahsulotning API bo'yicha haqiqiy hisobi.
export default function Why({ why, receipt }: { why: Content["WHY"]; receipt: Content["HERO"]["receipt"] }) {
  const parts = why.p2.split(/<accent>(.*?)<\/accent>/g);
  const rows = [
    { label: `${receipt.commission} ${EXAMPLE.commissionPercent}%`, value: EXAMPLE.commission, key: "commission" },
    { label: receipt.logistics, value: EXAMPLE.logistics, key: "logistics" },
    { label: receipt.cost, value: EXAMPLE.cost, key: "cost" },
  ];
  return (
    <section className="as-prob cc-why" id="why" aria-labelledby="cc-why-title">
      <div className="as-prob__bg" aria-hidden="true" />
      <div className="as-wrap cc-why__grid">
        <header className="cc-why__copy">
          <p className="as-eyebrow" data-rv>
            <span>01</span>
            {why.eyebrow}
          </p>
          <h2 className="as-h2" id="cc-why-title" data-rv style={{ "--d": "80ms" } as CSSProperties}>
            {why.title} <span className="as-h2__accent">{why.accent}</span>
          </h2>
          <p className="as-sec-lead" data-rv style={{ "--d": "160ms" } as CSSProperties}>
            {why.p1}
          </p>
          <p className="as-sec-lead" data-rv style={{ "--d": "220ms" } as CSSProperties}>
            {parts.map((part, i) => (i % 2 ? <b key={i} className="cc-accent">{part}</b> : part))}
          </p>
          <a className="as-btn as-btn--primary as-btn--lg cc-why__cta" href="#calculator" data-rv>
            {why.cta}
            <span className="as-btn__ico" aria-hidden="true">
              <Icon name="arrow" className="as-i--right" />
            </span>
          </a>
        </header>

        <div className="cc-why__cards">
          <div className="cc-myth" data-rv>
            <span className="cc-myth__tag">{why.mythTag}</span>
            <p className="cc-myth__formula">{why.mythFormula}</p>
            <p className="cc-myth__result">
              <s>
                ≈ {fmt(EXAMPLE.naive)} {receipt.currency}
              </s>{" "}
              <span>{why.mythResult}</span>
            </p>
          </div>

          <div className="cc-real" data-rv style={{ "--d": "140ms" } as CSSProperties}>
            <span className="cc-real__tag">
              <Icon name="check" />
              {why.realTag}
            </span>
            <p className="cc-real__price">
              {receipt.price} <b>{fmt(EXAMPLE.price)}</b>
            </p>
            <ul className="cc-real__rows">
              {rows.map((r, i) => (
                <li key={r.key} style={{ "--k": i, "--w": `${(r.value / EXAMPLE.price) * 100}%` } as CSSProperties}>
                  <span className="cc-real__label">{r.label}</span>
                  <span className={`cc-real__track is-${r.key}`}>
                    <i />
                  </span>
                  <b>− {fmt(r.value)}</b>
                </li>
              ))}
            </ul>
            <div className="cc-real__total">
              <p>
                +{fmt(EXAMPLE.profit)} <small>{receipt.currency}</small> <span>{why.realResult}</span>
              </p>
              <span className="cc-real__gap">{why.gap}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
