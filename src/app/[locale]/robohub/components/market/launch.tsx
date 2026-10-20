import type { CSSProperties } from "react";

// "Kimlar uchun" bo'limining chap tomoni — bo'lim savoliga javob: "Bir nechta mamlakat va marketpleysda sotish
// qiyin emasmi — Robohub bilan nima o'zgaradi?". Ikki ustun: "Robohub'siz" (4 ta alohida kabinet, qo'l mehnati)
// va "Robohub bilan" (logolar bitta kabinetga yig'iladi). Faktlar sayt matnlaridagi bilan bir xil
// (4 marketpleys, qoldiq sinxroni, bitta hisobot). Uslublar — robohub.css → "LAUNCH".
type Side = { label: string; num: string; unit: string; items: [string, string, string, string] };
export type LaunchText = { without: Side; with: Side };

const MARKETPLACES = ["uzum", "wildberries", "yandex", "ozon"];

const Cross = () => (
  <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
    <path d="M7 7l10 10M17 7 7 17" />
  </svg>
);
const Check = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export default function Launch({ t }: { t: LaunchText }) {
  return (
    <div className="launch">
      {/* Robohub'siz — har marketpleys alohida oynada */}
      <div className="launch__col launch__col--off">
        <span className="launch__tag">{t.without.label}</span>
        <div className="launch__art" aria-hidden="true">
          {MARKETPLACES.map((m, i) => (
            <span key={m} className="launch__win" style={{ "--k": i } as CSSProperties}>
              <i />
              <img src={`/marketplaces/${m}.svg`} alt="" width={30} height={30} loading="lazy" />
            </span>
          ))}
        </div>
        <p className="launch__count">
          <b>{t.without.num}</b> {t.without.unit}
        </p>
        <ul className="launch__list">
          {t.without.items.map((s) => (
            <li key={s}>
              <i>
                <Cross />
              </i>
              {s}
            </li>
          ))}
        </ul>
      </div>

      <span className="launch__arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>

      {/* Robohub bilan — logolar bitta kabinetga yig'iladi */}
      <div className="launch__col launch__col--on">
        <span className="launch__tag">{t.with.label}</span>
        <div className="launch__art" aria-hidden="true">
          {MARKETPLACES.map((m, i) => (
            <img key={m} className="launch__fly" src={`/marketplaces/${m}.svg`} alt="" width={26} height={26} loading="lazy" style={{ "--k": i } as CSSProperties} />
          ))}
          <span className="launch__mark">
            <svg viewBox="0 0 33.8675 15.06">
              <use href="#rh-mark" />
            </svg>
          </span>
        </div>
        <p className="launch__count">
          <b>{t.with.num}</b> {t.with.unit}
        </p>
        <ul className="launch__list">
          {t.with.items.map((s) => (
            <li key={s}>
              <i>
                <Check />
              </i>
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
