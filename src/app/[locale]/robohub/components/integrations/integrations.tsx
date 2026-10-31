import type { CSSProperties } from "react";
import IntegVideo from "./integ-video";
import IntegModels from "./integ-models";
import { getLocale, getMessages } from "@/i18n/server";
import { imgAlt } from "@/lib/img-alt";
import { messages } from "./integrations.i18n";
import { CRM, STOCK, type System } from "./integrations.data";

const Chip = ({ name, logo, plate, alt }: System & { alt: string }) => (
  // nom — butun chip uchun (ekran o'quvchi va DevTools "Name"), title — sichqoncha bilan ustiga borganda
  <li className="integ-chip" aria-label={alt} title={alt}>
    {logo ? (
      <img src={logo} alt={alt} title={name} width="28" height="28" loading="lazy" className={plate ? "is-plate" : undefined} />
    ) : (
      <i aria-hidden="true">{name[0]}</i>
    )}
    {name}
  </li>
);

export default async function Integrations() {
  const t = await getMessages(messages);
  const locale = await getLocale();
  return (
    <section className="integ" id="integrations" data-theme="brand" aria-labelledby="integ-title">
      <div className="container">
        <div className="integ__top">
          <div>
            {/* Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi */}
            <h2 className="integ__title" id="integ-title" data-sr="" style={{ "--d": "80ms" } as CSSProperties}>
              <span>{t.title}</span> <span className="accent">{t.titleAccent}</span>
            </h2>
            <p className="integ__lead" data-sr="" style={{ "--d": "140ms" } as CSSProperties}>
              {t.lead}
            </p>

            <div className="integ__groups" data-sr="" style={{ "--d": "200ms" } as CSSProperties}>
              <div>
                <h3 className="integ__label">{t.stock}</h3>
                <ul className="integ__chips">
                  {STOCK.map((s) => <Chip key={s.name} {...s} alt={imgAlt(locale, "stock", s.name)} />)}
                </ul>
              </div>
              <div>
                <h3 className="integ__label">{t.crm}</h3>
                <ul className="integ__chips">
                  {CRM.map((s) => <Chip key={s.name} {...s} alt={imgAlt(locale, "crm", s.name)} />)}
                </ul>
              </div>
            </div>
            <p className="integ__note">{t.note}</p>
          </div>

          <div className="integ__media" data-sr="" style={{ "--d": "160ms" } as CSSProperties}>
            <IntegVideo t={t.video} />
          </div>
        </div>

        <IntegModels t={t.models} />
      </div>
    </section>
  );
}
