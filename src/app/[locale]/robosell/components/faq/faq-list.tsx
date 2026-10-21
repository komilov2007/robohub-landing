"use client";

import { useId, useState } from "react";

// Accordion: har savol — tugma (aria-expanded/aria-controls), javob — region. Bir vaqtda bittasi ochiq.
export default function FaqList({ list }: { list: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const uid = useId();
  return (
    <ul className="rs-qa">
      {list.map((x, i) => {
        const on = open === i;
        return (
          <li key={x.q} className={"rs-qa__item" + (on ? " is-open" : "")}>
            <h3>
              <button
                type="button"
                id={`${uid}-q${i}`}
                aria-expanded={on}
                aria-controls={`${uid}-a${i}`}
                onClick={() => setOpen(on ? null : i)}
              >
                {x.q}
                <span className="rs-plus" aria-hidden="true" />
              </button>
            </h3>
            <div className="rs-qa__a" id={`${uid}-a${i}`} role="region" aria-labelledby={`${uid}-q${i}`}>
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
