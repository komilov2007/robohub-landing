import { PINGS, PROBLEM, SIGNUP_HREF } from "../../robosell.content";
import Section from "../section/section";
import PriceCounter from "./price-counter";

// 2-bo'lim. Chapda "eski usul" — uzun kassa cheki (qizil — faqat xarajat uchun),
// o'ngda Robosell kartasi: hisoblagich 50 mln dan 500 ming so'mgacha tushadi.
export default function Problem() {
  return (
    <Section id="problem" side="in" tone="white" ping={PINGS.problem} labelledBy="problem-title">
      <div className="rs-wrap">
        <header className="rs-head rs-head--center">
          <p className="rs-eyebrow" data-rv="">{PROBLEM.eyebrow}</p>
          <h2 className="rs-h2" id="problem-title" data-rv="">
            {PROBLEM.title}
          </h2>
        </header>

        <div className="rs-cost">
          <div className="rs-receipt" data-rv="">
            <div className="rs-receipt__head">
              <b>{PROBLEM.receiptHead}</b>
              <small>{PROBLEM.receiptSub}</small>
            </div>
            <ul className="rs-receipt__rows">
              {PROBLEM.rows.map((r) => (
                <li key={r.name}>
                  <span>{r.name}</span>
                  <i aria-hidden="true" />
                  <b>{r.price}</b>
                </li>
              ))}
            </ul>
            <p className="rs-receipt__total">
              <span>Jami</span>
              <b>{PROBLEM.total}</b>
            </p>
            <p className="rs-receipt__stamp" aria-hidden="true">
              Eski usul
            </p>
          </div>

          <div className="rs-deal" data-rv="">
            <p className="rs-deal__label">{PROBLEM.cardLabel}</p>
            <p className="rs-deal__price">
              <PriceCounter to={500000} from={50000000} />
            </p>
            <p className="rs-deal__unit">{PROBLEM.unit}</p>
            <ul className="rs-deal__perks">
              {PROBLEM.perks.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <a className="rs-btn rs-btn--yellow rs-btn--lg rs-btn--block" href={SIGNUP_HREF}>
              {PROBLEM.cta}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
