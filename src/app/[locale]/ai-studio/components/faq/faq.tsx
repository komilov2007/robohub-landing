"use client";

import { useState, type CSSProperties } from "react";
import Icon from "../icon/icon";
import { useC } from "../../content-context";
import { TELEGRAM_URL } from "@/lib/contacts";

// 09 — FAQ. Chapda yopishqoq sarlavha va Telegram tugmasi, o'ngda akkordeon:
// javob balandligi silliq ochiladi (grid 0fr → 1fr), "+" belgisi "×" ga buriladi, ochiq savol chap tomonda yashil chiziq oladi.
export default function Faq() {
  const { FAQ } = useC();
  const [open, setOpen] = useState(0);
  return (
    <section className="as-faq" id="faq" aria-labelledby="as-faq-title">
      <div className="as-wrap as-faq__grid">
        <header className="as-faq__head">
          <p className="as-eyebrow" data-rv>
            <span>09</span>
            {FAQ.eyebrow}
          </p>
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
