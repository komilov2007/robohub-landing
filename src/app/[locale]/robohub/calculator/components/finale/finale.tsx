import { SIGNUP_HREF, type Content } from "../../calculator.content";
import { CALCULATOR_MARKETPLACES, MARKETPLACE_META } from "../calculator/constants";

// Yakuniy taklif — ixcham karta: chapda sarlavha, matn va tugmalar; o'ngda to'rt marketpleys "kabinet" ichida
// bitta-bitta ulanadi. Kartaning chetidan sekin aylanuvchi mint nur o'tadi.
export default function Finale({ final }: { final: Content["FINAL"] }) {
  return (
    <section className="cx-finale" id="start" aria-labelledby="cx-finale-title">
      <div className="as-wrap">
        <div className="cx-finale__card" data-io>
          <div className="cx-finale__copy">
            <h2 id="cx-finale-title">
              {final.title} <span>{final.accent}</span>
            </h2>
            <p>{final.lead}</p>
            <div className="cx-finale__cta">
              <a className="cx-btn cx-btn--mint" href={SIGNUP_HREF}>
                {final.cta} <span aria-hidden="true">→</span>
              </a>
              <a className="cx-btn cx-btn--ghost" href="#calculator">
                {final.back}
              </a>
            </div>
          </div>
          <ul className="cx-finale__mps" aria-hidden="true">
            {CALCULATOR_MARKETPLACES.map((mp, i) => (
              <li key={mp} style={{ animationDelay: `${0.3 + i * 0.15}s` }}>
                <img src={MARKETPLACE_META[mp].icon} alt="" width={36} height={36} />
                <span>{MARKETPLACE_META[mp].label}</span>
                <i>✓</i>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
