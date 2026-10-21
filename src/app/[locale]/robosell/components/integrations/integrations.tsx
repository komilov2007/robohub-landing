import { INTEGRATIONS } from "../../robosell.content";
import IntegCards from "./integ-cards";

// 6-bo'lim. Uchta toifa kartasi (to'lov, ombor/POS, yetkazish): har birida vazifasi, logolar va jonli misol
// (integ-cards.tsx). Pastda "va yana 20+" qatori.
export default function Integrations() {
  return (
    <section className="rs-int" id="integrations" aria-labelledby="int-title">
      <div className="rs-wrap">
        <header className="rs-head2">
          <p className="rs-kicker" data-rv="">
            <span>06</span>
            {INTEGRATIONS.eyebrow}
          </p>
          <h2 className="rs-title" id="int-title" data-rv="">
            {INTEGRATIONS.title}
          </h2>
          <p className="rs-sub" data-rv="">
            {INTEGRATIONS.lead}
          </p>
        </header>
        <IntegCards />
        <p className="rs-ig__more" data-rv="">
          <span aria-hidden="true">+</span>
          {INTEGRATIONS.more}
        </p>
      </div>
    </section>
  );
}
