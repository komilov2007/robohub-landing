"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { INTEGRATIONS } from "../../robosell.content";

// Uchta toifa kartasi: belgi, nomi, nima qilishi, logolar to'ri va pastda jonli misol.
// Ko'rinib turganda har kartada navbat bilan bitta logo "yonadi" va pastdagi misol shu tizimga almashadi.
// Serverda va reduced-motion'da — birinchi misol turadi, logolar oddiy holatda.
export default function IntegCards() {
  const [tick, setTick] = useState(0);
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t = 0;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(t);
      if (e.isIntersecting) t = window.setInterval(() => setTick((x) => x + 1), 2200);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(t);
    };
  }, []);

  return (
    <ul className="rs-ig" ref={ref}>
      {INTEGRATIONS.rows.map((row, r) => {
        const lit = (tick + r) % row.items.length;
        const live = row.live[(tick + r) % row.live.length];
        return (
          <li key={row.label} className="rs-ig__card" data-rv="" style={{ "--i": r } as CSSProperties}>
            <div className="rs-ig__head">
              <span className="rs-ig__ico" aria-hidden="true">
                {row.ico}
              </span>
              <span className="rs-ig__count">{row.items.length} ta tizim</span>
            </div>
            <h3>{row.label}</h3>
            <p>{row.text}</p>
            <ul className="rs-ig__logos">
              {row.items.map((it, i) => (
                <li key={it.src} className={i === lit && tick > 0 ? "is-lit" : undefined}>
                  <img src={it.src} width={it.w} height={it.h} alt={it.alt || it.label || ""} loading="lazy" />
                  {it.label && <span>{it.label}</span>}
                </li>
              ))}
            </ul>
            <p className="rs-ig__live" aria-hidden="true">
              <i />
              <span key={live}>{live}</span>
            </p>
          </li>
        );
      })}
    </ul>
  );
}
