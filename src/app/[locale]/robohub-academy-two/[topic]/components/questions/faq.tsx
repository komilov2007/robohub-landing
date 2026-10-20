"use client";

import { useId, useState, type CSSProperties } from "react";

// Accordion: har savol alohida "suzuvchi" kartochka, raqamli; ochilganda kartochka yorishadi va
// "+" belgisi aylanib "×" bo'ladi. Bir vaqtda bittasi ochiq, birinchisi default ochiq.
export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  const base = useId();
  return (
    <div className="acx-faq">
      {items.map((f, i) => {
        const isOpen = open === i;
        const btnId = `${base}-q${i}`;
        const panelId = `${base}-a${i}`;
        return (
          <div key={f.q} className={`acx-faq__item${isOpen ? " is-open" : ""}`} data-glow style={{ "--i": i } as CSSProperties}>
            <h3>
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className="acx-faq__n">{String(i + 1).padStart(2, "0")}</span>
                <span>{f.q}</span>
                <span className="acx-faq__x" aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} className="acx-faq__panel" inert={!isOpen}>
              <div>
                <p>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
