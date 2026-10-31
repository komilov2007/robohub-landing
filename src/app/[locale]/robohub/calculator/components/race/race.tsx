"use client";

import { useState, type CSSProperties } from "react";
import { CALCULATOR_MARKETPLACES, MARKETPLACE_META } from "../calculator/constants";
import type { Content } from "../../calculator.content";
import { imgAlt } from "@/lib/img-alt";
import type { Locale } from "@/i18n/config";

/** Namuna: bitta mahsulot to'rt joyda turlicha foyda qoldiradi — raqamsiz, faqat farqni ko'rsatish uchun. */
const SAMPLE = [88, 66, 49, 31];

// "To'rtta marketpleysni solishtiring" — poyga: logotiplar yo'laklarda "foyda" finishiga yuguradi, har biri
// o'z joyida to'xtaydi va o'rnini oladi. "Qayta ko'rish" poygani boshidan qo'yadi.
// Ostida "Kimlar uchun" — yirtma chipta kartalari.
export default function Race({
  compare,
  race,
  who,
  locale,
}: {
  locale: Locale;
  compare: Content["COMPARE"];
  race: Content["S"]["race"];
  who: Content["WHO"];
}) {
  const [run, setRun] = useState(0);
  // Matnning oxirgi gapi ("Bu farq kalkulyatorda darhol ko'rinadi.") alohida fonli belgi bilan ajratiladi — uch tilda ham
  const [, lead = "", last = compare.text] = compare.text.match(/^(.*[.!?])\s+([^.!?]+[.!?])$/) ?? [];

  return (
    <section className="cx-race" aria-labelledby="cx-race-title">
      <div className="as-wrap cx-race__grid">
        <header className="cx-head" data-io>
          <h2 id="cx-race-title">{compare.title}</h2>
          <p>
            {lead}
            {lead && " "}
            <mark className="cx-hl">{last}</mark>
          </p>
        </header>

        <div className="cx-track" data-io>
          <div className="cx-track__top">
            <span className="cx-track__sample">{race.sample}</span>
            <button type="button" className="cx-track__replay" onClick={() => setRun((n) => n + 1)}>
              ↻ {race.replay}
            </button>
          </div>
          <div className="cx-track__marks" aria-hidden="true">
            <span>{race.start}</span>
            <span>{race.finish}</span>
          </div>
          {/* Qayta ko'rish faqat yo'laklarni qayta yaratadi — trekning o'zi (data-in bilan) ko'rinib turaveradi, animatsiya boshidan boshlanadi */}
          <ol className="cx-lanes" key={run}>
            {CALCULATOR_MARKETPLACES.map((mp, i) => (
              <li
                key={mp}
                className="cx-lane"
                aria-label={imgAlt(locale, "marketplace", MARKETPLACE_META[mp].label)}
                style={{ "--to": `${SAMPLE[i]}%`, "--k": i, "--dur": `${1.6 + i * 0.25}s` } as CSSProperties}
              >
                <span className="cx-lane__trail" aria-hidden="true" />
                <span className="cx-lane__car">
                  <img loading="lazy" decoding="async" src={MARKETPLACE_META[mp].icon} alt={imgAlt(locale, "marketplace", MARKETPLACE_META[mp].label)} width={40} height={40} />
                  <span className="cx-lane__rank">{i + 1}</span>
                </span>
                <span className={SAMPLE[i] > 60 ? "cx-lane__name cx-lane__name--in" : "cx-lane__name"}>
                  {MARKETPLACE_META[mp].label}
                </span>
              </li>
            ))}
          </ol>
          <span className="cx-track__finish" aria-hidden="true" />
        </div>
      </div>

      <div className="as-wrap">
        <h3 className="cx-who__title" data-io>
          {who.title}
        </h3>
        <ul className="cx-tickets">
          {who.items.map((item, i) => (
            <li key={item} className="cx-ticket" data-io style={{ "--k": i } as CSSProperties}>
              <span className="cx-ticket__no">№ 0{i + 1}</span>
              <p>{item}</p>
              <span className="cx-ticket__stub" aria-hidden="true">
                ✓
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
