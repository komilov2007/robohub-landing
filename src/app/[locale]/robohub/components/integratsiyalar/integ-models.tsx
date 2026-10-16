import type { CSSProperties } from "react";

// Ish modellari: FBS, FBO, DBS. Matnlar Robohub'ning avvalgi landingidan olingan.
// store / ship — kim saqlashi va kim yetkazishi (kartadagi sarlavhaning o'zidan).
const MODELS = [
  {
    code: "FBS",
    title: "Sizning omboringizda, marketpleys yetkazadi",
    store: "Siz",
    ship: "Marketpleys",
    points: [
      "Barcha marketpleyslar bilan qoldiqlarni bir zumda almashish",
      "Buyurtmalarni tez yigʻish uchun aqlli etiketkalar lentasi",
      "Har bir buyurtma xarajatini hisobga olish — logistika va komissiyalar",
    ],
  },
  {
    code: "FBO",
    title: "Marketpleys omborida, u yetkazadi",
    store: "Marketpleys",
    ship: "Marketpleys",
    points: [
      "Marketpleyslardan tovarlarni Robohub’ga import qilish",
      "Sotuv va rentabellik tahlili bitta oynada",
      "Barcha marketpleyslardan buyurtma va statuslar bitta oynada sinxron",
    ],
  },
  {
    code: "DBS",
    title: "Siz saqlaysiz va yetkazasiz",
    store: "Siz",
    ship: "Siz",
    points: [
      "Turli marketpleys omborlari bilan qulay ishlash va qoldiqlarni nazorat qilish",
      "Har bir buyurtma xarajatini hisobga olish — logistika va komissiyalar",
      "Barcha marketpleyslardan buyurtma va statuslar bitta oynada sinxron",
    ],
  },
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

export default function IntegModels() {
  return (
    <div className="integ__models">
      <h3 className="integ__models-t" data-sr="">FBS, FBO va DBS uchun mos</h3>
      <div className="integ__models-grid">
        {MODELS.map((m, i) => (
          <article className="integ-model" key={m.code} data-sr="" style={{ "--d": i * 90 + 60 + "ms" } as CSSProperties}>
            <header className="integ-model__head">
              <div className="integ-model__top">
                <b className="integ-model__code">{m.code}</b>
                <span className="integ-model__n" aria-hidden="true">0{i + 1} / 03</span>
              </div>
              <h4>{m.title}</h4>
            </header>
            <div className="integ-model__body">
              {/* kim saqlaydi → kim yetkazadi */}
              <p className="integ-model__flow">
                <span className={m.store === "Siz" ? "is-you" : ""}>
                  <i><BoxIcon /></i>
                  <span>
                    <small>Saqlash</small>
                    {m.store}
                  </span>
                </span>
                <em aria-hidden="true" />
                <span className={m.ship === "Siz" ? "is-you" : ""}>
                  <i><TruckIcon /></i>
                  <span>
                    <small>Yetkazish</small>
                    {m.ship}
                  </span>
                </span>
              </p>
              <ul>
                {m.points.map((p, k) => (
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
