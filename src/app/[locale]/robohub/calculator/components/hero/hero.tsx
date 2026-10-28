import { Fragment, type CSSProperties } from "react";
import Icon from "../../../../ai-studio/components/icon/svg-icon";
import MarketplacePick from "./marketplace-pick";
import type { Content } from "../../calculator.content";

// Hero — to'q brend-yashil sahna, hammasi markazda: yorliq, sarlavha, matn, marketpleys tanlash (u CTA vazifasini bajaradi:
// bosilsa kalkulyatorda shu marketpleys ochiladi) va ostida qisqa izohlar.
// Vizual yo'q — kalkulyatorning o'zi va pastdagi bo'limlar ko'rsatadi.
// Fon: to'r, ikki yorug'lik va sekin o'tuvchi diagonal nur.
export default function Hero({ hero }: { hero: Content["HERO"] }) {
  const before = hero.titleBefore.split(" ");
  const after = hero.titleAfter.split(" ");
  return (
    <section className="cc-hero3" id="hero" aria-labelledby="cc-hero-title" data-pause>
      <div className="cc-hero3__bg" aria-hidden="true">
        <span className="cc-hero3__grid-bg" />
        <span className="cc-hero3__orb cc-hero3__orb--a" />
        <span className="cc-hero3__orb cc-hero3__orb--b" />
        <span className="cc-hero3__beam" />
      </div>
      <div className="as-wrap cc-hero3__inner">
        <h1 className="cc-hero3__title" id="cc-hero-title">
          {before.map((w, i) => (
            <Fragment key={i}>
              <span className="as-word">
                <span style={{ "--i": i } as CSSProperties}>{w}</span>
              </span>{" "}
            </Fragment>
          ))}
          <span className="as-word">
            <span className="as-mark" style={{ "--i": before.length } as CSSProperties}>
              {hero.titleMark}
            </span>
          </span>{" "}
          {after.map((w, i) => (
            <Fragment key={`a${i}`}>
              <span className="as-word">
                <span style={{ "--i": before.length + 1 + i } as CSSProperties}>{w}</span>
              </span>{" "}
            </Fragment>
          ))}
        </h1>

        <p className="cc-hero3__lead as-in" style={{ "--d": "480ms" } as CSSProperties}>
          {hero.lead}
        </p>

        <div className="cc-hero3__pick as-in" style={{ "--d": "600ms" } as CSSProperties}>
          <MarketplacePick label={hero.pick} />
        </div>

        <ul className="cc-hero3__notes as-in" style={{ "--d": "720ms" } as CSSProperties}>
          {hero.notes.map((n) => (
            <li key={n}>
              <Icon name="check" />
              {n}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
