import { INTEGRATIONS, PINGS } from "../../robosell.content";
import Section from "../section/section";
import IntegFilter from "./integ-filter";

// 6-bo'lim. "Barchasi" — ikki qator cheksiz lenta (qarama-qarshi yo'nalishda),
// toifa tanlansa — shu toifadagi tizimlar to'r ko'rinishida. Logotip o'rniga neytral plashkalar.
export default function Integrations() {
  return (
    <Section id="integrations" side="in" tone="white" ping={PINGS.integrations} labelledBy="int-title">
      <div className="rs-wrap">
        <header className="rs-head rs-head--center">
          <p className="rs-eyebrow" data-rv="">{INTEGRATIONS.eyebrow}</p>
          <h2 className="rs-h2" id="int-title" data-rv="">
            {INTEGRATIONS.title}
          </h2>
        </header>
      </div>
      <IntegFilter cats={INTEGRATIONS.cats} items={INTEGRATIONS.items} />
      <div className="rs-wrap rs-int__more" data-rv="">
        {/* NAMUNA: Robo market sahifasi manzili hali yo'q */}
        <a className="rs-btn rs-btn--line rs-btn--lg" href="#">
          {INTEGRATIONS.all} <span aria-hidden="true">→</span>
        </a>
      </div>
    </Section>
  );
}
