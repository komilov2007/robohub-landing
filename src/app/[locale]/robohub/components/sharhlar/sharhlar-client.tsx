"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { messages } from "./sharhlar.i18n";

// Matnlar server ota komponentdan (sharhlar.tsx) `t` prop orqali keladi.
type T = (typeof messages)["uz"];

// Har sharh ekranda shuncha turadi, keyin navbatdagisiga oʻtadi.
const STEP = 6000;

export default function SharhlarClient({ t }: { t: T }) {
  const REVIEWS = t.reviews;
  const [at, setAt] = useState(0);
  // sichqoncha ustida yoki klaviatura fokusida turganda avtomatik almashish toʻxtaydi
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setAt((i) => (i + 1) % REVIEWS.length), STEP);
    return () => clearTimeout(id);
  }, [at, paused, REVIEWS.length]);

  const r = REVIEWS[at];

  return (
    <section className="revs" id="sharhlar" data-theme="brand" aria-labelledby="revs-title">
      <div className="container">
        <p className="revs__eyebrow" data-sr="">{t.eyebrow}</p>
        {/* Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi */}
        <h2 className="revs__title" id="revs-title" data-sr="" style={{ "--d": "80ms" } as CSSProperties}>
          {t.titleStart}<span className="accent">{t.titleAccent}</span>
        </h2>
        <p className="revs__lead" data-sr="" style={{ "--d": "140ms" } as CSSProperties}>
          {t.lead}
        </p>

        {/* Tabloga oʻxshash: tepada oltita natija raqami, pastda tanlangan raqam ortidagi sotuvchining gapi.
            Raqam bosilsa oʻsha sharh ochiladi; aks holda STEP oraligʻida oʻzi almashadi. */}
        <div
          className="revs__stage"
          data-sr=""
          style={{ "--d": "200ms", "--step": STEP + "ms" } as CSSProperties}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="revs__tabs" role="tablist" aria-label={t.tabsLabel}>
            {REVIEWS.map((x, i) => (
              <button
                className={"revs__tab" + (i === at ? " is-on" : "")}
                key={x.num}
                type="button"
                role="tab"
                id={"revs-tab-" + i}
                aria-selected={i === at}
                aria-controls="revs-panel"
                onClick={() => setAt(i)}
              >
                <b>{x.num}</b>
                <span>{x.label}</span>
                {/* vaqt chizigʻi: toʻlganda keyingi sharhga oʻtadi */}
                {i === at && !paused && <i aria-hidden="true" />}
              </button>
            ))}
          </div>
          <article className="revs__spot" id="revs-panel" role="tabpanel" aria-labelledby={"revs-tab-" + at} key={at}>
            <div>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </div>
            <div className="revs__who">
              <i aria-hidden="true">{r.initial}</i>
              <span>
                <b>{r.who}</b>
                <span>{r.meta}</span>
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
