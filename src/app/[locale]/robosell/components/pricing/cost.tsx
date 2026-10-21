"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { COST } from "../../robosell.content";

// "Robosell'siz qancha sarflaysiz?" — chapda maxsus dasturlash xarajatlari (qizil chiziqlar narxga qarab to'ladi,
// pastda jami sanaladi), o'ngda Robosell ustuni: har qator "Obunada ✓", jami — oyiga 500 000 so'm.
// Ekranga kirganda qatorlar navbat bilan to'ladi. Serverda va reduced-motion'da — yakuniy holat.
const MAX = Math.max(...COST.rows.map((r) => r.to));

export default function Cost() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const [sum, setSum] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setOn(true);
        if (reduce) return;
        const t0 = performance.now() + 900;
        const tick = (now: number) => {
          const p = Math.max(0, Math.min(1, (now - t0) / 1300));
          setSum(1 - Math.pow(1 - p, 3));
          if (p < 1) raf = requestAnimationFrame(tick);
          else setSum(null);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="rs-cost" ref={ref} data-on={on || undefined}>
      <header className="rs-cost__head">
        <h3>{COST.title}</h3>
        <p>{COST.lead}</p>
      </header>
      <div className="rs-cost__table" role="table" aria-label={COST.title}>
        <div className="rs-cost__row rs-cost__row--th" role="row">
          <span role="columnheader" />
          <span role="columnheader" className="rs-cost__old">
            {COST.colOld}
            <small>{COST.colOldNote}</small>
          </span>
          <span role="columnheader" className="rs-cost__new">
            {COST.colNew}
          </span>
        </div>
        {COST.rows.map((r, i) => (
          <div key={r.name} className="rs-cost__row" role="row" style={{ "--i": i, "--w": `${(r.to / MAX) * 100}%` } as CSSProperties}>
            <span role="rowheader">{r.name}</span>
            <span role="cell" className="rs-cost__old">
              <i className="rs-cost__bar" aria-hidden="true" />
              <b>
                {r.from}–{r.to} mln so‘m
              </b>
            </span>
            <span role="cell" className="rs-cost__new">
              <em>✓ {COST.included}</em>
            </span>
          </div>
        ))}
        <div className="rs-cost__row rs-cost__row--total" role="row">
          <span role="rowheader">{COST.totalLabel}</span>
          <span role="cell" className="rs-cost__old">
            <s>{sum === null ? COST.totalOld : `${Math.round(50 * sum)}–${Math.round(62 * sum)} mln so‘m`}</s>
          </span>
          <span role="cell" className="rs-cost__new">
            <strong>{COST.totalNew}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
