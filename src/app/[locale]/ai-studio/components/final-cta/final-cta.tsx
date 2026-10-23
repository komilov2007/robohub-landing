import type { CSSProperties } from "react";
import Icon from "../icon/svg-icon";
import { SIGNUP_HREF } from "../../ai-studio.content";
import { getC } from "../../content.server";

// 10 — Yakuniy CTA: brend yashilidagi katta karta. O'ngda natija rasmlari ikki ustunda
// qarama-qarshi yo'nalishda cheksiz "oqadi" (vertikal lenta), chapda sarlavha va tugma.
export default async function FinalCta() {
  const { FINAL_CTA, GALLERY, HERO } = await getC();
  const pics = GALLERY.items.map((it) => it.after ?? it.before);
  const colA = pics.filter((_, i) => i % 2 === 0);
  const colB = pics.filter((_, i) => i % 2 === 1);
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

          <div className="as-final__wall" aria-hidden="true">
            {[colA, colB].map((col, c) => (
              <div className="as-final__col" key={c} style={{ "--dir": c ? "reverse" : "normal" } as CSSProperties}>
                <div className="as-final__track">
                  {[...col, ...col].map((src, i) => (
                    <img key={i} src={src} alt="" loading="lazy" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
