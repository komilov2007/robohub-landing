import type { CSSProperties } from "react";
import Globe from "./globe";
import { CATEGORIES } from "./categories";

export default function Bozor() {
  return (
    <section className="mkt" id="hududlar" data-theme="light" aria-labelledby="mkt-title">
      <div className="container mkt__grid">
        <div>
          <p className="mkt__eyebrow" data-sr="">Kimlar uchun</p>{" "}
          <h2 className="mkt__title" id="mkt-title" data-sr="" style={{ "--d": "80ms" } as CSSProperties}>
            {"Robohub "}
            <span className="accent">har qanday biznesga</span>
            {" mos keladi"}
          </h2>{" "}
          <p className="mkt__lead" data-sr="" style={{ "--d": "140ms" } as CSSProperties}>
            Kichik butikdan yirik brendgacha — Uzum, Yandex Market, Wildberries yoki Ozonda nima sotsangiz ham, Robohub uni bitta kabinetdan yuritadi.
          </p>{" "}
          {/* toifalar: haqiqiy rasmli plitkalar, navbat bilan bittasi ajralib turadi */}
          <ul className="mkt__cats" data-sr="" style={{ "--d": "200ms" } as CSSProperties}>
            {CATEGORIES.map((c, i) => (
              <li key={c.img} style={{ "--i": i } as CSSProperties}>
                <img src={`/categories/${c.img}.jpg`} alt="" loading="lazy" />
                <span>{c.name}</span>
              </li>
            ))}
          </ul>
        </div>{" "}
        <div className="mkt__map" data-theme="dark" data-sr="" style={{ "--d": "160ms" } as CSSProperties}>
          <p className="mkt__map-label">Yagona platforma — barcha bozorlar</p>{" "}
          <h3>Butun mintaqa boʻylab soting</h3>{" "}
          <p>Moskvadan Toshkentgacha — besh mamlakatdagi savdoni yagona Robohub kabinetidan yuriting.</p>{" "}
          {/* Yer shari: besh mamlakat belgilangan, navbat bilan yonadi */}{" "}
          <Globe />
        </div>
      </div>
    </section>
  );
}
