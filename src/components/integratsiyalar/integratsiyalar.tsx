import type { CSSProperties } from "react";
import IntegVideo from "./integ-video";
import IntegModels from "./integ-models";

// logo: public/integrations/ dagi fayl; logotipi yo'q tizim bosh harfi bilan chiqadi
type System = { name: string; logo?: string };
const STOCK: System[] = [
  { name: "МойСклад", logo: "/integrations/moysklad.svg" },
  { name: "BILLZ", logo: "/integrations/billz.svg" },
  { name: "ERA", logo: "/integrations/era.svg" },
  { name: "Smartup", logo: "/integrations/smartup.svg" },
  { name: "YesPOS", logo: "/integrations/yespos.svg" },
  { name: "Bito", logo: "/integrations/bito.svg" },
  { name: "Sales Doctor", logo: "/integrations/sales-doctor.svg" },
  { name: "Apicore" },
];
const CRM: System[] = [{ name: "Retail CRM", logo: "/integrations/retail-crm.svg" }];

const Chip = ({ name, logo }: System) => (
  <li className="integ-chip">
    {logo ? <img src={logo} alt="" width="28" height="28" loading="lazy" /> : <i aria-hidden="true">{name[0]}</i>}
    {name}
  </li>
);

export default function Integratsiyalar() {
  return (
    <section className="integ" id="integratsiyalar" data-theme="brand" aria-labelledby="integ-title">
      <div className="container">
        <div className="integ__top">
          <div>
            <p className="integ__eyebrow" data-sr="">Integratsiyalar</p>
            {/* Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi */}
            <h2 className="integ__title" id="integ-title" data-sr="" style={{ "--d": "80ms" } as CSSProperties}>
              <span>Marketpleysdan omborgacha —</span> <span className="accent">hammasi ulangan.</span>
            </h2>
            <p className="integ__lead" data-sr="" style={{ "--d": "140ms" } as CSSProperties}>
              Robohub siz bilan Uzum, Yandex Market, Wildberries va Ozon oʻrtasida turadi — barcha buyurtmalarni oʻzi qabul qiladi va
              qoldiqlarni qaytarib yuboradi, shunda hammasini bitta oynadan, ortiqcha sotuvsiz boshqarasiz.
            </p>

            <div className="integ__groups" data-sr="" style={{ "--d": "200ms" } as CSSProperties}>
              <div>
                <h3 className="integ__label">Ombor va hisob</h3>
                <ul className="integ__chips">
                  {STOCK.map((s) => <Chip key={s.name} {...s} />)}
                </ul>
              </div>
              <div>
                <h3 className="integ__label">CRM</h3>
                <ul className="integ__chips">
                  {CRM.map((s) => <Chip key={s.name} {...s} />)}
                </ul>
              </div>
            </div>
            <p className="integ__note">Baʼzilari menejer bilan sozlanadi.</p>
          </div>

          <div className="integ__media" data-sr="" style={{ "--d": "160ms" } as CSSProperties}>
            <IntegVideo />
          </div>
        </div>

        <IntegModels />
      </div>
    </section>
  );
}
