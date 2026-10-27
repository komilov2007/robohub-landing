import type { CSSProperties } from "react";
import type { CountryId } from "./globe";

// "Mamlakatlar" bo'limining chap tomoni: har mamlakatda qaysi marketpleyslarda sotish mumkin (ulangan)
// va qaysilari tez orada qo'shiladi. Uslublar — robohub.css → "REGIONS".
// count — ulangan platformalar soni: [1 ta, 2–4 ta, 5+ ta] shakllari ({n} o'rniga son qo'yiladi)
export type RegionsText = { soon: string; cta: string; yandex: string; count: [string, string, string] };

const plural = (n: number, [one, few, many]: [string, string, string]) =>
  (n === 1 ? one : n >= 2 && n <= 4 ? few : many).replace("{n}", String(n));

type MpId = "uzum" | "wildberries" | "ozon" | "yandex" | "kaspi" | "teez" | "mmarket" | "namba" | "laklak" | "avval";

// logo bo'lmasa — nomning bosh harfi bilan belgi (rasmiy logotip fayli qo'shilganda shu yerga yoziladi)
// wide — logotip o'zi nomli yozuv (wordmark): nomsiz, to'liq kenglikda chiziladi
const MP: Record<MpId, { name: string; logo?: string; wide?: boolean }> = {
  uzum: { name: "Uzum Market", logo: "/marketplaces/uzum.svg" },
  wildberries: { name: "Wildberries", logo: "/marketplaces/wildberries.svg" },
  ozon: { name: "Ozon", logo: "/marketplaces/ozon.svg" },
  yandex: { name: "Yandex Market", logo: "/marketplaces/yandex.svg" },
  kaspi: { name: "Kaspi", logo: "/marketplaces/kaspi.svg" },
  teez: { name: "Teez", logo: "/marketplaces/teez.webp", wide: true },
  mmarket: { name: "MMarket", logo: "/marketplaces/mmarket.svg", wide: true },
  namba: { name: "Namba One", logo: "/marketplaces/namba.svg", wide: true },
  laklak: { name: "LakLak", logo: "/marketplaces/laklak.webp", wide: true },
  avval: { name: "Avval", logo: "/marketplaces/avval.svg", wide: true },
};

// mamlakatlar tartibi va har biridagi marketpleyslar: now — ulangan, soon — tez kunda
const ROWS: { id: CountryId; now: MpId[]; soon: MpId[] }[] = [
  { id: "uz", now: ["uzum", "wildberries", "ozon", "yandex"], soon: [] },
  { id: "kz", now: ["wildberries", "ozon"], soon: ["kaspi", "teez"] },
  { id: "kg", now: ["wildberries", "ozon"], soon: ["mmarket", "namba"] },
  { id: "ru", now: ["wildberries", "ozon", "yandex"], soon: [] },
  { id: "tj", now: ["wildberries"], soon: ["laklak", "avval"] },
];

function Chip({ id, t, soon }: { id: MpId; t: RegionsText; soon?: boolean }) {
  const mp = MP[id];
  const name = id === "yandex" ? t.yandex : mp.name;
  return (
    <span className={`reg__mp${soon ? " reg__mp--soon" : ""}${mp.wide ? " reg__mp--wide" : ""}`}>
      {mp.wide ? (
        <img src={mp.logo} alt={name} height={18} loading="lazy" />
      ) : mp.logo ? (
        <img src={mp.logo} alt="" width={20} height={20} loading="lazy" />
      ) : (
        <b className="reg__mono" aria-hidden="true">
          {name[0]}
        </b>
      )}
      {!mp.wide && name}
    </span>
  );
}

export default function Regions({ t, names }: { t: RegionsText; names: Record<CountryId, string> }) {
  return (
    <div className="reg">
      <ul className="reg__list">
        {ROWS.map((r, i) => (
          <li key={r.id} className="reg__row" data-c={r.id} data-sr="" style={{ "--d": `${200 + i * 70}ms` } as CSSProperties}>
            <span className="reg__country">
              <img src={`/flags/${r.id}.svg`} alt="" width={28} height={28} loading="lazy" />
              <span>
                <b>{names[r.id]}</b>
                <small>{plural(r.now.length, t.count)}</small>
              </span>
            </span>
            <span className="reg__mps">
              {r.now.map((m) => (
                <Chip key={m} id={m} t={t} />
              ))}
              {r.soon.length > 0 && (
                <span className="reg__soon">
                  <em>{t.soon}</em>
                  {r.soon.map((m) => (
                    <Chip key={m} id={m} t={t} soon />
                  ))}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
      <a className="btn btn--lg btn--primary reg__cta" href="#start" data-sr="" style={{ "--d": "560ms" } as CSSProperties}>
        {t.cta}
        <span className="arrow" aria-hidden="true">
          →
        </span>
      </a>
    </div>
  );
}
