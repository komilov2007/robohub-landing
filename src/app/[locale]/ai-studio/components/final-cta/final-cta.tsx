import Icon from "../icon/svg-icon";
import { SIGNUP_HREF } from "../../ai-studio.content";
import { getC } from "../../content.server";
import HubOrbit from "@/components/hub-orbit/hub-orbit";

// 10 — Yakuniy CTA: brend yashilidagi katta karta. O'ngda Robohub orbitasi (umumiy komponent —
// Robohub yakuniy kartasidagi bilan bir xil), chapda sarlavha va tugma.
export default async function FinalCta() {
  const { FINAL_CTA, HERO } = await getC();
  return (
    <section className="as-final" id="start" aria-labelledby="as-final-title" data-pause>
      <div className="as-wrap">
        <div className="as-final__card" data-rv>
          <span className="as-final__glow" aria-hidden="true" />
          <div className="as-final__copy">
            <h2 className="as-final__title" id="as-final-title">
              {FINAL_CTA.title} <span>{FINAL_CTA.accent}</span>
            </h2>
            <p className="as-final__lead">{FINAL_CTA.lead}</p>
            <a className="as-btn as-btn--mint as-btn--lg as-btn--glow" href={SIGNUP_HREF}>
              {FINAL_CTA.cta}
              <span className="as-btn__ico" aria-hidden="true">
                <Icon name="arrow" className="as-i--right" />
              </span>
            </a>
            <ul className="as-final__notes">
              {HERO.notes.map((n) => (
                <li key={n}>
                  <Icon name="check" />
                  {n}
                </li>
              ))}
            </ul>
          </div>

          <HubOrbit className="as-final__hub" />
        </div>
      </div>
    </section>
  );
}
