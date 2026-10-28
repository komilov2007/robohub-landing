import type { CSSProperties } from "react";
import { INDUSTRIES } from "../../robosell.content";
import Count from "./count";

// 7-bo'lim. To'rtta bir xil foto-karta: foto (ustiga borganda sekin kattalashadi), biznes turi,
// qisqa izoh va 3 ta imkoniyat. Kartalar ekranga kirganda navbat bilan ko'tariladi. Pastda raqamlar sanaladi.
export default function Industries() {
  return (
    <section className="rs-ind" aria-labelledby="ind-title">
      <div className="rs-wrap">
        <header className="rs-head2">
          <h2 className="rs-title" id="ind-title" data-rv="">
            {INDUSTRIES.title}
          </h2>
          <p className="rs-sub" data-rv="">
            {INDUSTRIES.lead}
          </p>
        </header>

        <ul className="rs-ic">
          {INDUSTRIES.list.map((it, i) => (
            <li key={it.title} className="rs-ic__card" data-rv="" style={{ "--i": i } as CSSProperties}>
              <div className="rs-ic__photo">
                <img src={it.img} alt="" loading="lazy" />
                <span className="rs-ic__n" aria-hidden="true">
                  0{i + 1}
                </span>
              </div>
              <div className="rs-ic__body">
                <h3>{it.title}</h3>
                <p>{it.text}</p>
                <ul className="rs-ic__list">
                  {it.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <ul className="rs-ind__stats">
          {INDUSTRIES.stats.map((s, i) => (
            <li key={s.label} data-rv="" style={{ "--i": i } as CSSProperties}>
              <b>
                <Count to={s.n} />
                {s.suffix}
              </b>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
