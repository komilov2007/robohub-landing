import {
  FINAL,
  PHONE,
  PHONE_HREF,
  PINGS,
  SIGNUP_HREF,
} from "../../robosell.content";
import Section from "../section/section";

// 10-bo'lim. Yakuniy CTA: teal banner — chap tomonda taklif, o'ngda harakat; fon bezagi —
// bir-biriga javob berayotgan chat pufakchalari.
export default function FinalCta() {
  return (
    <Section
      id="start"
      side="in"
      tone="white"
      ping={PINGS.final}
      labelledBy="final-title"
    >
      <div className="rs-wrap">
        <div className="rs-final" data-rv="">
          <span className="rs-final__bubbles" aria-hidden="true">
            <i>Salom! Do‘kon ochmoqchiman</i>
            <i>Bugunoq ishga tushiramiz ✓✓</i>
          </span>
          <div className="rs-final__text">
            <h2 className="rs-h2" id="final-title">
              {FINAL.title}
            </h2>
            <p>{FINAL.text}</p>
          </div>
          <div className="rs-final__cta">
            <a className="rs-btn rs-btn--yellow rs-btn--lg" href={SIGNUP_HREF}>
              {FINAL.start}
            </a>
            <a className="rs-btn rs-btn--ghost rs-btn--lg" href={PHONE_HREF}>
              {PHONE}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
