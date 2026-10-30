"use client";

import { useState, type CSSProperties } from "react";
import Icon from "../icon/svg-icon";
import { useC } from "../../content-context";
import { TELEGRAM_URL } from "@/lib/contacts";

// 09 — FAQ. Chapda yopishqoq sarlavha va Telegram tugmasi, o'ngda akkordeon:
// javob balandligi silliq ochiladi (grid 0fr → 1fr), "+" belgisi "×" ga buriladi, ochiq savol chap tomonda yashil chiziq oladi.
export default function Faq() {
  const { FAQ } = useC();
  const [open, setOpen] = useState(0);
  return (
    <section className="as-faq" id="faq" aria-labelledby="as-faq-title">
      {/* telefon (≤767px) — alohida: markazdagi sarlavha, ixcham akkordeon, Telegram kartasi pastda */}
      <div className="as-wrap as-fq as-only-m">
        <header className="as-fq__head">
          <p className="as-h2" role="heading" aria-level={2} data-rv style={{ "--d": "80ms" } as CSSProperties}>
            {FAQ.title} <span className="as-h2__accent">{FAQ.accent}</span>
          </p>
        </header>
        <ul className="as-fq__list" data-rv style={{ "--d": "160ms" } as CSSProperties}>
          {FAQ.items.map((it, i) => {
            const on = open === i;
            return (
              <li key={it.q} className={"as-fq__item" + (on ? " is-open" : "")}>
                <div role="heading" aria-level={3}>
                  <button
                    type="button"
                    className="as-fq__btn"
                    aria-expanded={on}
                    aria-controls={`as-qm-${i}`}
                    id={`as-qmb-${i}`}
                    onClick={() => setOpen(on ? -1 : i)}
                  >
                    {it.q}
                    <span className="as-q__plus" aria-hidden="true" />
                  </button>
                </div>
                <div className="as-q__panel" id={`as-qm-${i}`} role="region" aria-labelledby={`as-qmb-${i}`}>
                  <div>
                    <p>{it.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <a className="as-fq__tg" href={TELEGRAM_URL} target="_blank" rel="noopener" data-rv>
          <span className="as-fq__tg-ico">
            <Icon name="send" />
          </span>
          <span className="as-fq__tg-txt">
            <small>{FAQ.lead}</small>
            <b>{FAQ.tg}</b>
          </span>
          <Icon name="arrow" className="as-i--right as-fq__tg-arr" />
        </a>
      </div>

      <div className="as-wrap as-faq__grid as-only-d">
        <header className="as-faq__head">
          <h2 className="as-h2" id="as-faq-title" data-rv style={{ "--d": "80ms" } as CSSProperties}>
            {FAQ.title} <span className="as-h2__accent">{FAQ.accent}</span>
          </h2>
          <p className="as-sec-lead" data-rv style={{ "--d": "160ms" } as CSSProperties}>
            {FAQ.lead}
          </p>
          <a className="as-btn as-btn--ghost as-btn--lg as-faq__tg" href={TELEGRAM_URL} target="_blank" rel="noopener" data-rv>
            <Icon name="send" className="as-btn__lead-ico" />
            {FAQ.tg}
          </a>
        </header>

        <ul className="as-qs">
          {FAQ.items.map((it, i) => {
            const on = open === i;
            return (
              <li key={it.q} className={"as-q" + (on ? " is-open" : "")} data-rv style={{ "--d": `${i * 70}ms` } as CSSProperties}>
                <h3>
                  <button
                    type="button"
                    className="as-q__btn"
                    aria-expanded={on}
                    aria-controls={`as-q-${i}`}
                    id={`as-qb-${i}`}
                    onClick={() => setOpen(on ? -1 : i)}
                  >
                    <span className="as-q__n">0{i + 1}</span>
                    <span className="as-q__text">{it.q}</span>
                    <span className="as-q__plus" aria-hidden="true" />
                  </button>
                </h3>
                <div className="as-q__panel" id={`as-q-${i}`} role="region" aria-labelledby={`as-qb-${i}`}>
                  <div>
                    <p>{it.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
