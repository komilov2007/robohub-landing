import type { CSSProperties } from "react";
import { PROBLEM } from "../../robosell.content";
import Icon from "../icon/svg-icon";
import { NewVisual, OldVisual } from "./problem-visuals";

// 2-bo'lim — "Robosell mashinasi". Och yashil fon. Har qator: chapda muammo (qog'oz karta) → o'rtadagi yashil
// Robosell o'qidan o'tadi → o'ngda yechim (panel karta). Qator ekranga kirganda (Reveal → .is-in) navbat bilan:
// muammo chiqadi, chiziq o'qqa yetadi, tugun yonadi, chiziq yechimga boradi, yechim chiqadi.
// O'q bo'ylab doimiy yorug' nuqtalar oqadi. Mobilda: muammo → ↓ tugun → yechim ustma-ust.
export default function Problem() {
  const [head, lost] = PROBLEM.title;
  return (
    <section className="rs-pb" id="problem" aria-labelledby="problem-title" data-pause="">
      <div className="rs-wrap">
        <header className="rs-pb__head">
          <p className="rs-kicker" data-rv="">
            <span>02</span>
            {PROBLEM.eyebrow}
          </p>
          <h2 className="rs-pb__title" id="problem-title" data-rv="">
            {head}{" "}
            <span className="rs-pb__lost">
              {lost}
              <svg viewBox="0 0 300 90" preserveAspectRatio="none" aria-hidden="true">
                <path d="M18 52 C 20 18, 150 6, 268 22 C 300 30, 296 70, 220 80 C 140 90, 30 84, 12 60 C 4 46, 40 26, 90 20" pathLength={1} />
              </svg>
            </span>
          </h2>
          <p className="rs-pb__lead" data-rv="">
            {PROBLEM.lead}
          </p>
        </header>

        <div className="rs-mx">
          {/* ustun sarlavhalari */}
          <div className="rs-mx__cols" aria-hidden="true">
            <span className="rs-mx__col rs-mx__col--old">✕ {PROBLEM.before}</span>
            <span className="rs-mx__brand">
              <Icon name="logo" w={104} h={16} />
            </span>
            <span className="rs-mx__col rs-mx__col--new">✓ {PROBLEM.after}</span>
          </div>

          <span className="rs-mx__spine" aria-hidden="true">
            <i />
          </span>

          <ol className="rs-mx__rows">
            {PROBLEM.pairs.map((p, i) => (
              <li key={p.vis} className="rs-mx__row" data-rv="" style={{ "--i": i } as CSSProperties}>
                <div className="rs-mx__card rs-mx__card--old">
                  <p className="rs-mx__txt">
                    <b>0{i + 1}</b>
                    <span>
                      <span className="rs-sr">{PROBLEM.before}: </span>
                      {p.pain}
                    </span>
                  </p>
                  <div className="rs-mx__vis" aria-hidden="true">
                    <OldVisual kind={p.vis} />
                  </div>
                </div>

                <div className="rs-mx__node" aria-hidden="true">
                  <span className="rs-mx__wire rs-mx__wire--in" />
                  <span className="rs-mx__dot">
                    <i>→</i>
                  </span>
                  <span className="rs-mx__wire rs-mx__wire--out" />
                </div>

                <div className="rs-mx__card rs-mx__card--new">
                  <p className="rs-mx__txt">
                    <b>✓</b>
                    <span>
                      <span className="rs-sr">{PROBLEM.after}: </span>
                      {p.fix}
                    </span>
                  </p>
                  <div className="rs-mx__vis" aria-hidden="true">
                    <NewVisual kind={p.vis} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
