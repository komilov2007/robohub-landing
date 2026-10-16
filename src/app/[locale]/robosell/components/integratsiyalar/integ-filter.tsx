"use client";

import { useState, type CSSProperties } from "react";

type Cat = { id: string; label: string };
type Item = { name: string; cat: string };

function Plate({ it, labels, style }: { it: Item; labels: Record<string, string>; style?: CSSProperties }) {
  return (
    <li className="rs-plate" style={style}>
      <span className="rs-plate__mark" aria-hidden="true">
        {it.name[0]}
      </span>
      <span>
        <b>{it.name}</b>
        <small>{labels[it.cat]}</small>
      </span>
    </li>
  );
}

// Toifa filtrlari (aria-pressed tugmalar) + ko'rinish: lenta yoki to'r.
export default function IntegFilter({ cats, items }: { cats: Cat[]; items: Item[] }) {
  const [cat, setCat] = useState("all");
  const labels = Object.fromEntries(cats.map((c) => [c.id, c.label]));
  const rows = [items.filter((_, i) => i % 2 === 0), items.filter((_, i) => i % 2 === 1)];
  const list = items.filter((i) => i.cat === cat);

  return (
    <div className="rs-int">
      <div className="rs-wrap">
        <div className="rs-filters" role="group" aria-label="Integratsiya toifalari" data-rv="">
          {cats.map((c) => (
            <button key={c.id} type="button" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
              {c.label}
              {c.id !== "all" && <small>{items.filter((i) => i.cat === c.id).length}</small>}
            </button>
          ))}
        </div>
      </div>

      {cat === "all" ? (
        <div className="rs-marquee">
          {/* to'liq ro'yxat ekran o'quvchilar uchun bir marta; lentadagi nusxalar bezak */}
          <ul className="rs-sr">
            {items.map((it) => (
              <li key={it.name}>{it.name}</li>
            ))}
          </ul>
          {rows.map((row, r) => (
            <div className="rs-marquee__row" key={r} aria-hidden="true" style={{ "--dur": `${row.length * 3.2}s` } as CSSProperties}>
              <ul className={"rs-marquee__track" + (r ? " is-rev" : "")}>
                {[...row, ...row].map((it, i) => (
                  <Plate key={it.name + i} it={it} labels={labels} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="rs-wrap">
          <ul className="rs-plates" key={cat} aria-live="polite">
            {list.map((it, i) => (
              <Plate key={it.name} it={it} labels={labels} style={{ "--i": i } as CSSProperties} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
