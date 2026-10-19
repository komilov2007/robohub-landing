import type { CSSProperties } from "react";
import { getMessages } from "@/i18n/server";
import Globe from "./globe";
import { CATEGORIES } from "./categories";
import { messages } from "./market.i18n";

export default async function Market() {
  const t = await getMessages(messages);
  return (
    <section className="mkt" id="regions" data-theme="light" aria-labelledby="mkt-title">
      <div className="container mkt__grid">
        <div>
          <p className="mkt__eyebrow" data-sr="">{t.eyebrow}</p>{" "}
          <h2 className="mkt__title" id="mkt-title" data-sr="" style={{ "--d": "80ms" } as CSSProperties}>
            {t.titleStart}
            <span className="accent">{t.titleAccent}</span>
            {t.titleEnd}
          </h2>{" "}
          <p className="mkt__lead" data-sr="" style={{ "--d": "140ms" } as CSSProperties}>
            {t.lead}
          </p>{" "}
          {/* toifalar: haqiqiy rasmli plitkalar, navbat bilan bittasi ajralib turadi */}
          <ul className="mkt__cats" data-sr="" style={{ "--d": "200ms" } as CSSProperties}>
            {CATEGORIES.map((c, i) => (
              <li key={c.img} style={{ "--i": i } as CSSProperties}>
                <img src={`/categories/${c.img}.webp`} alt="" loading="lazy" />
                <span>{t.categories[c.img]}</span>
              </li>
            ))}
          </ul>
        </div>{" "}
        <div className="mkt__map" data-theme="dark" data-sr="" style={{ "--d": "160ms" } as CSSProperties}>
          <p className="mkt__map-label">{t.mapLabel}</p>{" "}
          <h3>{t.mapTitle}</h3>{" "}
          <p>{t.mapText}</p>{" "}
          {/* Yer shari: besh mamlakat belgilangan, navbat bilan yonadi */}{" "}
          <Globe names={t.countries} />
        </div>
      </div>
    </section>
  );
}
