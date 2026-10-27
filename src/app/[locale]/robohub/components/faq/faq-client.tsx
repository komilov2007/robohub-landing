"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import type { messages, Part } from "./faq.i18n";

type T = (typeof messages)["uz"];

// Javob boʻlaklari: { b } — qalin ajratilgan qism
function Answer({ parts }: { parts: Part[] }) {
  return <>{parts.map((p, k) => (typeof p === "string" ? p : <b key={k}>{p.b}</b>))}</>;
}

export default function FaqClient({ t }: { t: T }) {
  const FAQ = t.items;
  // doim bitta savol tanlangan: kompyuterda javobi oʻngdagi panelda, telefonda savolning tagida chiqadi
  const [open, setOpen] = useState(0);

  return (
    <section className="faq" id="faq" data-theme="light" aria-labelledby="faq-title">
      <div className="container">
        {/* Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi */}
        <h2 className="faq__title" id="faq-title" data-sr="" style={{ "--d": "80ms" } as CSSProperties}>
          {t.title}<span className="accent">{t.titleAccent}</span>
        </h2>

        <div className="faq__grid" data-sr="" style={{ "--d": "140ms" } as CSSProperties}>
          <div className="faq__list">
            {FAQ.map((f, i) => {
              const isOpen = open === i;
              return (
                <article className={"faq-item" + (isOpen ? " is-open" : "")} key={f.q}>
                  <h3>
                    <button className="faq-item__q" type="button" aria-expanded={isOpen} aria-controls={"faq-a-" + i} onClick={() => setOpen(i)}>
                      <span className="faq-item__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                      {f.q}
                      <span className="faq-item__x" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path d="M9 6l6 6-6 6" />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  {/* telefonda koʻrinadi; kompyuterda javob oʻngdagi panelda */}
                  <div className="faq-item__a" id={"faq-a-" + i}>
                    <div>
                      <p><Answer parts={f.a} /></p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="faq__panel" data-theme="dark">
            {/* key — savol almashganda javob qaytadan paydo boʻlish animatsiyasi bilan chiqadi; panel ekran oʻquvchilar uchun takror */}
            <div className="faq__answer" key={open} aria-hidden="true">
              <p className="faq__num">{String(open + 1).padStart(2, "0")}</p>
              <h3>{FAQ[open].q}</h3>
              <p><Answer parts={FAQ[open].a} /></p>
            </div>
            <a className="faq__help" href="tel:+998781138212">
              <i aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                </svg>
              </i>
              <span>
                <span>{t.support}</span>
                <b>+998 78 113 82 12</b>
              </span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
