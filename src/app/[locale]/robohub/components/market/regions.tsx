import type { CSSProperties } from "react";
import type { CountryId } from "./globe";
import RegionsAuto from "./regions-auto";

// "Mamlakatlar" bo'limining chap tomoni: har mamlakatda qaysi marketpleyslarda sotish mumkin (ulangan)
// va qaysilari tez orada qo'shiladi. Uslublar — robohub.css → "REGIONS".
// count — ulangan platformalar soni: [1 ta, 2–4 ta, 5+ ta] shakllari ({n} o'rniga son qo'yiladi)
export type RegionsText = {
  soon: string;
  cta: string;
  ctaShort: string; // telefonda tugmadagi qisqa matn
  yandex: string;
  count: [string, string, string];
};

const plural = (n: number, [one, few, many]: [string, string, string]) =>
  (n === 1 ? one : n >= 2 && n <= 4 ? few : many).replace("{n}", String(n));

type MpId =
  | "uzum"
  | "wildberries"
  | "ozon"
  | "yandex"
  | "kaspi"
  | "teez"
  | "mmarket"
  | "namba"
  | "laklak"
  | "avval";

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
    <span
      className={`reg__mp${soon ? " reg__mp--soon" : ""}${mp.wide ? " reg__mp--wide" : ""}`}
    >
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

// Telefon versiyasi: tepada mamlakat tablari (suriladi), ostida tanlangan mamlakat kartasi — marketpleyslar plitkalarda.
// JS'siz: yashirin radio tugmalar + label (robohub.css → "REGIONS — telefon"); klaviaturada ←/→ bilan almashadi.
// i — plitka tartibi: kartaga ketma-ket "uchib kiradi" (robohub.css → regm-tile, kechikish --i bo'yicha)
function Tile({ id, t, soon, i }: { id: MpId; t: RegionsText; soon?: boolean; i: number }) {
  const mp = MP[id];
  const name = id === "yandex" ? t.yandex : mp.name;
  return (
    <li
      className={`regm__tile${soon ? " is-soon" : ""}${mp.wide ? " is-wide" : ""}`}
      style={{ "--i": i } as CSSProperties}
    >
      {mp.wide ? (
        <img src={mp.logo} alt={name} height={16} loading="lazy" />
      ) : (
        <img src={mp.logo} alt="" width={28} height={28} loading="lazy" />
      )}
      {!mp.wide && <span>{name}</span>}
    </li>
  );
}

function RegionsMobile({
  t,
  names,
}: {
  t: RegionsText;
  names: Record<CountryId, string>;
}) {
  return (
    <div className="regm">
      {ROWS.map((r, i) => (
        <input
          key={r.id}
          className="regm__r"
          type="radio"
          name="regm"
          id={`regm-${r.id}`}
          defaultChecked={i === 0}
          aria-label={names[r.id]}
        />
      ))}
      <div className="regm__tabs" aria-hidden="true">
        {ROWS.map((r) => (
          <label key={r.id} htmlFor={`regm-${r.id}`} data-c={r.id}>
            <img
              src={`/flags/${r.id}.svg`}
              alt=""
              width={22}
              height={22}
              loading="lazy"
            />
            <span>{names[r.id]}</span>
          </label>
        ))}
      </div>
      <div className="regm__panels">
        {ROWS.map((r) => (
          <div key={r.id} className="regm__panel" data-c={r.id}>
            {/* keyingi mamlakatga qadar qolgan vaqt (avtomatik almashish; foydalanuvchi tanlasa — yo'qoladi) */}
            <span className="regm__bar" aria-hidden="true" />
            <p className="regm__head">
              <img
                src={`/flags/${r.id}.svg`}
                alt=""
                width={40}
                height={40}
                loading="lazy"
              />
              <span>
                <b>{names[r.id]}</b>
                <small>{plural(r.now.length, t.count)}</small>
              </span>
            </p>
            <ul className="regm__grid">
              {r.now.map((m, i) => (
                <Tile key={m} id={m} t={t} i={i} />
              ))}
            </ul>
            {r.soon.length > 0 && (
              <>
                <p className="regm__soon">{t.soon}</p>
                <ul className="regm__grid">
                  {r.soon.map((m, i) => (
                    <Tile key={m} id={m} t={t} soon i={r.now.length + i} />
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>
      <RegionsAuto ids={ROWS.map((r) => r.id)} />
    </div>
  );
}

export default function Regions({
  t,
  names,
}: {
  t: RegionsText;
  names: Record<CountryId, string>;
}) {
  return (
    <div className="reg">
      <RegionsMobile t={t} names={names} />
      <ul className="reg__list">
        {ROWS.map((r, i) => (
          <li
            key={r.id}
            className="reg__row"
            data-c={r.id}
            data-sr=""
            style={{ "--d": `${200 + i * 70}ms` } as CSSProperties}
          >
            <span className="reg__country">
              <img
                src={`/flags/${r.id}.svg`}
                alt=""
                width={28}
                height={28}
                loading="lazy"
              />
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
      <a
        className="btn btn--lg btn--primary reg__cta"
        href="#contact"
        data-open="contact-modal"
        data-sr=""
        style={{ "--d": "560ms" } as CSSProperties}
      >
        <span className="reg__cta-full">{t.cta}</span>
        <span className="reg__cta-short">{t.ctaShort}</span>
        <span className="arrow" aria-hidden="true">
          →
        </span>
      </a>
    </div>
  );
}
