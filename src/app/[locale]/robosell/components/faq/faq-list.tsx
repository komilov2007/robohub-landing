"use client";

import { useId, useState, type CSSProperties } from "react";

// Akkordeon: har savol — tugma (aria-expanded/aria-controls), javob — region. Bir vaqtda bittasi ochiq,
// birinchisi boshidan ochiq. Ochilish — grid-template-rows 0fr → 1fr (silliq balandlik).
export default function FaqList({ list }: { list: readonly { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();
  return (
    <ul className="rs-fq__list" data-rv="">
      {list.map((x, i) => {
        const on = open === i;
        return (
          <li key={x.q} className={"rs-fq__item" + (on ? " is-open" : "")} style={{ "--i": i } as CSSProperties}>
            <h3>
              <button type="button" id={`${uid}-q${i}`} aria-expanded={on} aria-controls={`${uid}-a${i}`} onClick={() => setOpen(on ? null : i)}>
                <span className="rs-fq__n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="rs-fq__q">{x.q}</span>
                <span className="rs-fq__x" aria-hidden="true" />
              </button>
            </h3>
            <div className="rs-fq__a" id={`${uid}-a${i}`} role="region" aria-labelledby={`${uid}-q${i}`}>
              <div>
                <p>{x.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
