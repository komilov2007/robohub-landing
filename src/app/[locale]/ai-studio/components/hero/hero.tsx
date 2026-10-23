import { Fragment, type CSSProperties } from "react";
import Icon from "../icon/svg-icon";
import HeroStudio from "./hero-studio";
import { EXAMPLES_HREF, SIGNUP_HREF } from "../../ai-studio.content";
import { getC } from "../../content.server";

// Har fakt kartasining ostidagi kichik doimiy animatsiya: vaqt — to'lib boruvchi chiziq,
// token — uch tanga navbat bilan "urilib" turadi, uslublar — 5 nuqta ketma-ket yonadi.
function FactMotion({ i }: { i: number }) {
  if (i === 0) return <span className="as-fm as-fm--bar" aria-hidden="true"><i /></span>;
  if (i === 1)
    return (
      <span className="as-fm as-fm--coins" aria-hidden="true">
        <i><Icon name="ai" /></i>
        <i><Icon name="ai" /></i>
        <i><Icon name="ai" /></i>
      </span>
    );
  return (
    <span className="as-fm as-fm--dots" aria-hidden="true">
      {Array.from({ length: 5 }, (_, k) => (
        <i key={k} style={{ "--k": k } as CSSProperties} />
      ))}
    </span>
  );
}

// Hero: chapda matn (so'zlar navbat bilan "ko'tariladi", urg'u mint marker bilan chiziladi va yaltirab turadi),
// o'ngda — doim harakatdagi "oldin/keyin" studiyasi (hero-studio.tsx).
export default async function Hero() {
  const { HERO } = await getC();
  const words = HERO.title.split(" ");
  return (
    <section className="as-hero" id="hero" aria-labelledby="as-hero-title" data-pause>
      <div className="as-hero__bg" aria-hidden="true">
        <span className="as-hero__blob as-hero__blob--a" />
        <span className="as-hero__blob as-hero__blob--b" />
      </div>

      <div className="as-wrap as-hero__grid">
        <div className="as-hero__copy">
          <p className="as-chip as-in" style={{ "--d": "60ms" } as CSSProperties}>
            <span className="as-chip__dot" aria-hidden="true" />
            {HERO.badge}
            <span className="as-chip__ai">
              <Icon name="ai" />
              AI
            </span>
          </p>

          <h1 className="as-hero__title" id="as-hero-title">
            {words.map((w, i) => (
              <Fragment key={i}>
                <span className="as-word">
                  <span style={{ "--i": i } as CSSProperties}>{w}</span>
                </span>{" "}
              </Fragment>
            ))}
            <span className="as-word">
              <span className="as-mark" style={{ "--i": words.length } as CSSProperties}>
                {HERO.accent}
              </span>
            </span>
          </h1>

          <p className="as-hero__lead as-in" style={{ "--d": "520ms" } as CSSProperties}>
            {HERO.lead}
          </p>

          <div className="as-hero__cta as-in" style={{ "--d": "640ms" } as CSSProperties}>
            <a className="as-btn as-btn--primary as-btn--lg as-btn--glow" href={SIGNUP_HREF}>
              {HERO.primary}
              <span className="as-btn__ico" aria-hidden="true">
                <Icon name="arrow" className="as-i--right" />
              </span>
            </a>
            <a className="as-btn as-btn--ghost as-btn--lg" href={EXAMPLES_HREF}>
              <Icon name="image" className="as-btn__lead-ico" />
              {HERO.secondary}
            </a>
          </div>

          <ul className="as-hero__notes as-in" style={{ "--d": "740ms" } as CSSProperties}>
            {HERO.notes.map((n) => (
              <li key={n}>
                <Icon name="check" />
                {n}
              </li>
            ))}
          </ul>

          <ul className="as-facts">
            {HERO.facts.map((f, i) => (
              <li className="as-fact as-in" key={f.label} style={{ "--d": `${840 + i * 90}ms` } as CSSProperties}>
                <p className="as-fact__num">
                  {f.value}
                  <span>{f.unit}</span>
                </p>
                <p className="as-fact__label">{f.label}</p>
                <FactMotion i={i} />
              </li>
            ))}
          </ul>
        </div>

        <HeroStudio />
      </div>
    </section>
  );
}
