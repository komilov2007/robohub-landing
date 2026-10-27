import type { CSSProperties } from "react";
import { getMessages } from "@/i18n/server";
import HowItWorksScript from "./how-it-works-script";
import { messages } from "./how-it-works.i18n";

export default async function HowItWorks() {
  const t = await getMessages(messages);
  return (
    <>
      <section className="how" id="how-it-works" data-theme="light" aria-labelledby="how-title">
        <div className="container">
          <h2 className="how__title" id="how-title" data-sr="" style={{ "--d": "80ms" } as CSSProperties}>
            <span>{t.title}</span>{" "}
            <span className="accent">{t.titleAccent}</span>
          </h2>{" "}
          {/* To'lqin: chiziq, bekatlar va yuruvchi belgi. Joylashuvni JS hisoblaydi. */}{" "}
          <div className="how__wave" id="how-wave" aria-hidden="true">
            <svg>
              <path className="how__track" id="how-track" />
            </svg>{" "}
            <svg className="how__done" id="how-done">
              <path id="how-main" />
              <path className="is-opt" id="how-opt" />
            </svg>{" "}
            <span className="how__node">01</span>{" "}
            <span className="how__node">02</span>{" "}
            <span className="how__node">03</span>{" "}
            <span className="how__node how__node--opt">04</span>{" "}
            <span className="how__dot" id="how-dot">
              <svg viewBox="0 0 33.8675 15.06">
                <use href="#rh-mark" />
              </svg>
            </span>
          </div>{" "}
          {/* NAMUNA: kartalar ichidagi telefon raqam, kalit va sonlar shartli */}{" "}
          <ol className="how__grid" id="how-grid">
            <li className="how-card">
              <div className="mini" aria-hidden="true">
                <span className="mini__fld">
                  <i>+998</i>
                  <span className="mini__type" style={{ "--w": "11ch", "--n": "11" } as CSSProperties}>90 123 45 67</span>
                  <b className="mini__ok">✓</b>
                </span>{" "}
                <span className="mini__btn">→</span>
              </div>{" "}
              <div className="how-card__row">
                <span className="how-card__num" aria-hidden="true">01</span>
                <span className="how-card__ok" aria-hidden="true">✓</span>
              </div>{" "}
              <h3>{t.steps[0].title}</h3>{" "}
              <p className="how-card__desc">{t.steps[0].desc}</p>{" "}
              <p className="how-card__meta">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                {` ${t.steps[0].meta} `}
              </p>
            </li>{" "}
            <li className="how-card">
              <div className="mini" aria-hidden="true">
                <span className="mini__fld">{" "}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00524F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="8" cy="15" r="4" />
                    <path d="M11 12l9-9" />
                    <path d="M16 7l3 3" />
                  </svg>{" "}
                  <span className="mini__type" style={{ "--w": "12ch", "--n": "12" } as CSSProperties}>••••••••••••</span>{" "}
                </span>{" "}
                <span className="mini__mps">{" "}
                  <span style={{ "--i": "0" } as CSSProperties}>
                    <img src="/marketplaces/uzum.svg" alt="" width="28" height="28" />
                    <b>✓</b>
                  </span>{" "}
                  <span style={{ "--i": "1" } as CSSProperties}>
                    <img src="/marketplaces/wildberries.svg" alt="" width="28" height="28" />
                    <b>✓</b>
                  </span>{" "}
                  <span style={{ "--i": "2" } as CSSProperties}>
                    <img src="/marketplaces/ozon.svg" alt="" width="28" height="28" />
                    <b>✓</b>
                  </span>{" "}
                  <span style={{ "--i": "3" } as CSSProperties}>
                    <img src="/marketplaces/yandex.svg" alt="" width="28" height="28" />
                    <b>✓</b>
                  </span>{" "}
                </span>
              </div>{" "}
              <div className="how-card__row">
                <span className="how-card__num" aria-hidden="true">02</span>
                <span className="how-card__ok" aria-hidden="true">✓</span>
              </div>{" "}
              <h3>{t.steps[1].title}</h3>{" "}
              <p className="how-card__desc">{t.steps[1].desc}</p>{" "}
              <p className="how-card__meta">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="16" rx="3" />
                  <path d="M3 9h18" />
                </svg>
                {` ${t.steps[1].meta} `}
              </p>
            </li>{" "}
            <li className="how-card">
              <div className="mini" aria-hidden="true">
                <span className="mini__row" style={{ "--i": "0" } as CSSProperties}>
                  <span>{t.rows.products}</span>
                  <span className="mini__bar">
                    <i />
                  </span>
                  <b data-count="128">128</b>
                </span>{" "}
                <span className="mini__row" style={{ "--i": "1" } as CSSProperties}>
                  <span>{t.rows.orders}</span>
                  <span className="mini__bar">
                    <i />
                  </span>
                  <b data-count="342">342</b>
                </span>{" "}
                <span className="mini__row" style={{ "--i": "2" } as CSSProperties}>
                  <span>{t.rows.stock}</span>
                  <span className="mini__bar">
                    <i />
                  </span>
                  <b data-count="96">96</b>
                </span>
              </div>{" "}
              <div className="how-card__row">
                <span className="how-card__num" aria-hidden="true">03</span>
                <span className="how-card__ok" aria-hidden="true">✓</span>
              </div>{" "}
              <h3>{t.steps[2].title}</h3>{" "}
              <p className="how-card__desc">{t.steps[2].desc}</p>{" "}
              <p className="how-card__meta">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 11a8 8 0 0 0-14.5-4.5L4 8" />
                  <path d="M4 4v4h4" />
                  <path d="M4 13a8 8 0 0 0 14.5 4.5L20 16" />
                  <path d="M20 20v-4h-4" />
                </svg>
                {` ${t.steps[2].meta} `}
              </p>
            </li>{" "}
            <li className="how-card how-card--help">
              <div className="mini" aria-hidden="true">
                <span className="mini__team">{" "}
                  <span className="mini__faces">
                    <i style={{ "--i": "0" } as CSSProperties}>R</i>
                    <i style={{ "--i": "1" } as CSSProperties}>H</i>
                    <i style={{ "--i": "2" } as CSSProperties}>+</i>
                  </span>{" "}
                  <span className="mini__live">{t.online}</span>{" "}
                </span>{" "}
                <span className="mini__bubble">
                  <i style={{ "--i": "0" } as CSSProperties} />
                  <i style={{ "--i": "1" } as CSSProperties} />
                  <i style={{ "--i": "2" } as CSSProperties} />
                </span>
              </div>{" "}
              <div className="how-card__row">
                <span className="how-card__num" aria-hidden="true">04</span>
                <span className="how-card__ok" aria-hidden="true">✓</span>
              </div>{" "}
              <h3>{t.steps[3].title}</h3>{" "}
              <p className="how-card__desc">{t.steps[3].desc}</p>{" "}
              <p className="how-card__meta">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
                </svg>
                {` ${t.steps[3].meta} `}
              </p>
            </li>
          </ol>{" "}
          <div className="how__cta" data-sr="">
            <a className="btn btn--lg btn--primary" href="#start">
              {`${t.start} `}
              <span className="arrow" aria-hidden="true">→</span>
            </a>{" "}
            <a className="btn btn--lg btn--outline" href="#guide">{t.guide}</a>
          </div>
        </div>
      </section>
      <HowItWorksScript />
    </>
  );
}
