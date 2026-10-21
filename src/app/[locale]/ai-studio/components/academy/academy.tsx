import type { CSSProperties } from "react";
import Icon from "../icon/icon";
import { fill } from "../../ai-studio.content";
import { getC } from "../../content.server";

// 08 — Robohub Academy: mijoz uchun ixcham blok. Chapda savol + tugma, o'ngda 3 ta dars kartasi.
// Kartalar biroz qiyshiq "taxlam" bo'lib turadi va sekin suzadi; muqovada Ken Burns zoom, play tugmasi to'lqin chiqaradi.
export default async function Academy() {
  const { ACADEMY } = await getC();
  return (
    <section className="as-acad" aria-labelledby="as-acad-title" data-pause>
      <div className="as-wrap">
        <div className="as-acad__box" data-rv>
          <div className="as-acad__copy">
            <p className="as-acad__kicker">
              <span className="as-acad__play-ico">
                <Icon name="ai" />
              </span>
              {ACADEMY.kicker}
            </p>
            <h2 className="as-acad__title" id="as-acad-title">
              {ACADEMY.title}
            </h2>
            <p className="as-acad__lead">{ACADEMY.lead}</p>
            <a className="as-btn as-btn--primary as-btn--lg" href={ACADEMY.url} target="_blank" rel="noopener">
              {ACADEMY.cta}
              <span className="as-btn__ico" aria-hidden="true">
                <Icon name="arrow" className="as-i--right" />
              </span>
            </a>
          </div>

          <ul className="as-lessons">
            {ACADEMY.lessons.map((l, i) => (
              <li key={l.n} className="as-lesson" style={{ "--k": i } as CSSProperties}>
                <a href={ACADEMY.url} target="_blank" rel="noopener" className="as-lesson__link">
                  <span className="as-lesson__cover">
                    <img src={l.img} alt="" loading="lazy" />
                    <span className="as-lesson__play" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M8 5.2v13.6a1 1 0 0 0 1.5.86l10.6-6.8a1 1 0 0 0 0-1.72L9.5 4.34A1 1 0 0 0 8 5.2z" />
                      </svg>
                    </span>
                    <span className="as-lesson__free">{ACADEMY.free}</span>
                  </span>
                  <span className="as-lesson__meta">{fill(ACADEMY.lesson, { n: l.n })}</span>
                  <span className="as-lesson__title">{l.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
