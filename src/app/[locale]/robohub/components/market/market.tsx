import type { CSSProperties } from "react";
import { getMessages } from "@/i18n/server";
import Globe from "./globe";
import Regions from "./regions";
import { MP, ROWS, type MpId } from "./regions-data";
import type { GlobeMps } from "./globe";
import { messages } from "./market.i18n";

export default async function Market() {
  const t = await getMessages(messages);
  // telefonda yer sharidagi faol mamlakat kartochkasi: ulangan va "tez kunda" marketpleyslar (logo + nom)
  const mp = (id: MpId) => ({ name: id === "yandex" ? t.regions.yandex : MP[id].name, logo: MP[id].logo ?? "", wide: !!MP[id].wide });
  const mps = Object.fromEntries(ROWS.map((r) => [r.id, { now: r.now.map(mp), soon: r.soon.map(mp) }])) as GlobeMps;
  return (
    <section className="mkt" id="regions" data-theme="light" aria-labelledby="mkt-title">
      <div className="container mkt__grid">
        <div>
          <h2 className="mkt__title" id="mkt-title" data-sr="" style={{ "--d": "80ms" } as CSSProperties}>
            {t.titleStart}
            <span className="accent">{t.titleAccent}</span>
            {t.titleEnd}
          </h2>{" "}
          <p className="mkt__lead" data-sr="" style={{ "--d": "140ms" } as CSSProperties}>
            {t.lead}
          </p>{" "}
          {/* har mamlakatdagi marketpleyslar: ulanganlari va tez kunda qo'shiladiganlari */}
          <Regions t={t.regions} names={t.countries} />
        </div>{" "}
        <div className="mkt__map" data-theme="dark" data-sr="" style={{ "--d": "160ms" } as CSSProperties}>
          <p className="mkt__map-label">{t.mapLabel}</p>{" "}
          <h3>{t.mapTitle}</h3>{" "}
          <p>{t.mapText}</p>{" "}
          {/* Yer shari: besh mamlakat belgilangan, navbat bilan yonadi */}{" "}
          <Globe names={t.countries} mps={mps} soon={t.regions.soon} />
        </div>
      </div>
    </section>
  );
}
