import { imgSize } from "@/lib/img-size";
import type { CSSProperties } from "react";
import type { CountryId } from "./globe";
import { MP, ROWS, type MpId } from "./regions-data";
import { imgAlt } from "@/lib/img-alt";
import type { Locale } from "@/i18n/config";

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


function Chip({ id, t, soon, locale }: { id: MpId; t: RegionsText; soon?: boolean; locale: Locale }) {
  const mp = MP[id];
  const name = id === "yandex" ? t.yandex : mp.name;
  const alt = imgAlt(locale, soon ? "soon" : "marketplace", name);
  return (
    <span
      className={`reg__mp${soon ? " reg__mp--soon" : ""}${mp.wide ? " reg__mp--wide" : ""}`}
    >
      {mp.wide ? (
        <img src={mp.logo} alt={alt} title={name} {...imgSize(mp.logo ?? "")} loading="lazy" />
      ) : mp.logo ? (
        <img src={mp.logo} alt={alt} title={name} width={20} height={20} loading="lazy" />
      ) : (
        <b className="reg__mono" aria-hidden="true">
          {name[0]}
        </b>
      )}
      {!mp.wide && name}
    </span>
  );
}

export default function Regions({
  t,
  names,
  locale,
}: {
  t: RegionsText;
  names: Record<CountryId, string>;
  locale: Locale;
}) {
  return (
    <div className="reg">
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
                <Chip key={m} id={m} t={t} locale={locale} />
              ))}
              {r.soon.length > 0 && (
                <span className="reg__soon">
                  <em>{t.soon}</em>
                  {r.soon.map((m) => (
                    <Chip key={m} id={m} t={t} locale={locale} soon />
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
