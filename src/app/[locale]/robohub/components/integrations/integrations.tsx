import type { CSSProperties } from "react";
import IntegVideo from "./integ-video";
import IntegModels from "./integ-models";
import { getMessages } from "@/i18n/server";
import { messages } from "./integrations.i18n";

// logo: public/integrations/ dagi fayl; logotipi yo'q tizim bosh harfi bilan chiqadi
// plate — shaffof fonli logotip (to'q fonda xira ko'rinadi): oq plitka ustida chiqadi
type System = { name: string; logo?: string; plate?: boolean };
const STOCK: System[] = [
  { name: "МойСклад", logo: "/integrations/moysklad.svg" },
  { name: "BILLZ", logo: "/integrations/billz.svg" },
  { name: "ERA", logo: "/integrations/era.svg" },
  { name: "Smartup", logo: "/integrations/smartup.svg" },
  { name: "YesPOS", logo: "/integrations/yespos.svg" },
  { name: "Bito", logo: "/integrations/bito.svg" },
  { name: "Sales Doctor", logo: "/integrations/sales-doctor.svg" },
  { name: "Apicore", logo: "/integrations/apicore-logo.svg", plate: true },
];
const CRM: System[] = [{ name: "Retail CRM", logo: "/integrations/retail-crm.svg" }];

const Chip = ({ name, logo, plate }: System) => (
  <li className="integ-chip">
    {logo ? (
      <img src={logo} alt="" width="28" height="28" loading="lazy" className={plate ? "is-plate" : undefined} />
    ) : (
      <i aria-hidden="true">{name[0]}</i>
    )}
    {name}
  </li>
);

export default async function Integrations() {
  const t = await getMessages(messages);
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
                  {STOCK.map((s) => <Chip key={s.name} {...s} />)}
                </ul>
              </div>
              <div>
                <h3 className="integ__label">{t.crm}</h3>
                <ul className="integ__chips">
                  {CRM.map((s) => <Chip key={s.name} {...s} />)}
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
