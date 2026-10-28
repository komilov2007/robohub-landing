import type { CSSProperties } from "react";
import Icon, { type IconName } from "../icon/svg-icon";
import { BEFORE_IMG, SIGNUP_HREF, fill, type Content } from "../../ai-studio.content";
import { getC } from "../../content.server";

type Card = Content["PROBLEM"]["cards"][number];

// Narx: ikki chiziq — dizayner narxi sekin to'lib boradi, AI narxi bir zumda "tushadi"
function PriceViz({ c }: { c: Card }) {
  return (
    <div className="as-viz as-viz--price">
      <div className="as-bar as-bar--old">
        <span className="as-bar__label">{c.old.label}</span>
        <span className="as-bar__track"><i /></span>
        <span className="as-bar__val">{c.old.value}</span>
      </div>
      <div className="as-bar as-bar--new">
        <span className="as-bar__label">{c.now.label}</span>
        <span className="as-bar__track"><i /></span>
        <span className="as-bar__val">{c.now.value}</span>
      </div>
    </div>
  );
}

// Vaqt: chapda dizayner kunlari birin-ketin "yonadi", o'ngda AI halqasi bir daqiqada to'ladi
function TimeViz({ c, day }: { c: Card; day: string }) {
  return (
    <div className="as-viz as-viz--time">
      <div className="as-days">
        <span className="as-viz__cap">
          <Icon name="calendar" />
          {c.old.label}
        </span>
        <ol>
          {[1, 2, 3].map((d) => (
            <li key={d} style={{ "--k": d - 1 } as CSSProperties}>
              {fill(day, { n: d })}
            </li>
          ))}
        </ol>
        <span className="as-days__val">{c.old.value}</span>
      </div>
      <div className="as-ringbox">
        <span className="as-ring">
          <svg viewBox="0 0 44 44" aria-hidden="true">
            <circle cx="22" cy="22" r="19" />
            <circle className="as-ring__fill" cx="22" cy="22" r="19" pathLength="100" />
          </svg>
          <span className="as-ring__ok">
            <Icon name="check" />
          </span>
        </span>
        <span className="as-ringbox__val">{c.now.value}</span>
        <span className="as-viz__cap as-viz__cap--mint">{c.now.label}</span>
      </div>
    </div>
  );
}

// Ko'rinish: qidiruv natijalari — kursor oddiy fotolarni o'tib, infografikali kartochkani bosadi
function CtrViz({ img }: { img: string }) {
  return (
    <div className="as-viz as-viz--ctr">
      <div className="as-serp">
        {[0, 1, 2].map((k) => (
          <span key={k} className={"as-serp__item" + (k === 1 ? " is-hero" : "")}>
            <img src={k === 1 ? img : BEFORE_IMG} alt="" loading="lazy" />
            {k === 1 && (
              <>
                <span className="as-serp__band" />
                <span className="as-serp__hit" />
              </>
            )}
            <span className="as-serp__line" />
            <span className="as-serp__line as-serp__line--short" />
          </span>
        ))}
        <span className="as-cursor">
          <Icon name="cursor" />
          <span className="as-cursor__ripple" />
        </span>
        <span className="as-ctr-chip">
          <Icon name="trend" />
          CTR
        </span>
      </div>
    </div>
  );
}

// Muammo → yechim: uchta "jonli" karta. Har birida — o'lchov, doimiy mini-animatsiya,
// pastda muammo (ustidan chiziq tortiladi) va undan "o'sib chiqadigan" yechim.
export default async function Problem() {
  const { PROBLEM, VARIANTS } = await getC();
  return (
    <section className="as-prob" id="features" aria-labelledby="as-prob-title" data-pause>
      <span className="as-prob__bg" aria-hidden="true" />
      <div className="as-wrap">
        <header className="as-prob__head">
          <h2 className="as-h2" id="as-prob-title" data-rv style={{ "--d": "80ms" } as CSSProperties}>
            {PROBLEM.title} <span className="as-h2__accent">{PROBLEM.accent}</span>
          </h2>
          <p className="as-prob__lead" data-rv style={{ "--d": "160ms" } as CSSProperties}>
            {PROBLEM.lead}
          </p>
        </header>

        <ol className="as-pcs">
          {PROBLEM.cards.map((c, i) => (
            <li className={`as-pc as-pc--${c.id}`} key={c.id} data-rv style={{ "--d": `${i * 120}ms` } as CSSProperties}>
              <div className="as-pc__top">
                <span className="as-pc__metric">
                  <b>0{i + 1}</b>
                  {c.metric}
                </span>
                <span className="as-pc__live">
                  <i />
                  {PROBLEM.live}
                </span>
              </div>

              {c.id === "price" && <PriceViz c={c} />}
              {c.id === "time" && <TimeViz c={c} day={PROBLEM.day} />}
              {c.id === "ctr" && <CtrViz img={VARIANTS[0].img} />}

              <div className="as-pc__story">
                <div className="as-pc__prob">
                  <span className="as-pc__pico">
                    <Icon name={c.icon as IconName} />
                  </span>
                  <div>
                    <p className="as-pc__tag">{PROBLEM.problemTag}</p>
                    <h3 className="as-pc__ptitle">
                      <span className="as-strike">{c.problem.title}</span>
                    </h3>
                    <p className="as-pc__ptext">{c.problem.text}</p>
                  </div>
                </div>

                <div className="as-pc__sol">
                  <span className="as-pc__arrow" aria-hidden="true">
                    <Icon name="arrow" />
                  </span>
                  <span className="as-pc__sico">
                    <Icon name={c.solIcon as IconName} />
                  </span>
                  <div>
                    <p className="as-pc__tag as-pc__tag--mint">
                      <Icon name="ai" />
                      {PROBLEM.solutionTag}
                    </p>
                    <h3 className="as-pc__stitle">{c.solution.title}</h3>
                    <p className="as-pc__stext">{c.solution.text}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="as-prob__cta" data-rv>
          <p>
            <Icon name="ai" />
            {PROBLEM.ctaText} <b>{PROBLEM.ctaBold}</b>
          </p>
          <a className="as-btn as-btn--mint as-btn--lg" href={SIGNUP_HREF}>
            {PROBLEM.cta}
            <span className="as-btn__ico" aria-hidden="true">
              <Icon name="arrow" className="as-i--right" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
