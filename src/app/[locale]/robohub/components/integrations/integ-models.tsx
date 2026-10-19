import type { CSSProperties } from "react";

import type { messages } from "./integrations.i18n";

type T = (typeof messages)["uz"]["models"];

// Ish modellari: FBS, FBO, DBS. Matnlar (sarlavha, bandlar) — integrations.i18n.ts da, shu tartibda.
// store / ship — kim saqlashi va kim yetkazishi (kartadagi sarlavhaning o'zidan): you — siz, mp — marketpleys.
type Who = "you" | "mp";
const MODELS: { code: string; store: Who; ship: Who }[] = [
  { code: "FBS", store: "you", ship: "mp" },
  { code: "FBO", store: "mp", ship: "mp" },
  { code: "DBS", store: "you", ship: "you" },
];

const ICON = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const BoxIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" {...ICON}>
    <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
    <path d="M4 7.5l8 4.5 8-4.5" />
    <path d="M12 12v9" />
  </svg>
);
const TruckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" {...ICON}>
    <path d="M3 7h11v9H3z" />
    <path d="M14 10h4l3 3v3h-7z" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </svg>
);

export default function IntegModels({ t }: { t: T }) {
  const who = (w: Who) => (w === "you" ? t.you : t.marketplace);
  return (
    <div className="integ__models">
      <h3 className="integ__models-t" data-sr="">{t.title}</h3>
      <div className="integ__models-grid">
        {MODELS.map((m, i) => (
          <article className="integ-model" key={m.code} data-sr="" style={{ "--d": i * 90 + 60 + "ms" } as CSSProperties}>
            <header className="integ-model__head">
              <div className="integ-model__top">
                <b className="integ-model__code">{m.code}</b>
                <span className="integ-model__n" aria-hidden="true">0{i + 1} / 03</span>
              </div>
              <h4>{t.items[i].title}</h4>
            </header>
            <div className="integ-model__body">
              {/* kim saqlaydi → kim yetkazadi */}
              <p className="integ-model__flow">
                <span className={m.store === "you" ? "is-you" : ""}>
                  <i><BoxIcon /></i>
                  <span>
                    <small>{t.storeLabel}</small>
                    {who(m.store)}
                  </span>
                </span>
                <em aria-hidden="true" />
                <span className={m.ship === "you" ? "is-you" : ""}>
                  <i><TruckIcon /></i>
                  <span>
                    <small>{t.shipLabel}</small>
                    {who(m.ship)}
                  </span>
                </span>
              </p>
              <ul>
                {t.items[i].points.map((p, k) => (
                  <li key={k}>{p}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
