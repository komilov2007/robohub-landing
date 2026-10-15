import type { CSSProperties } from "react";
import HeroVideo from "./hero-video";

const MARKETPLACES = ["uzum", "wildberries", "ozon", "yandex"];

// Ombor va hisob tizimlari. Apicore logotipi yoʻq — oʻrniga harfli belgi chiqadi.
const SYSTEMS: { name: string; logo?: string }[] = [
  { name: "МойСклад", logo: "/integrations/moysklad.svg" },
  { name: "BILLZ", logo: "/integrations/billz.svg" },
  { name: "Smartup", logo: "/integrations/smartup.svg" },
  { name: "ERA", logo: "/integrations/era.svg" },
  { name: "YesPOS", logo: "/integrations/yespos.svg" },
  { name: "Bito", logo: "/integrations/bito.svg" },
  { name: "Sales Doctor", logo: "/integrations/sales-doctor.svg" },
  { name: "Retail CRM", logo: "/integrations/retail-crm.svg" },
  { name: "Apicore" },
];

export default function Hero() {
  return (
    <>
      <section className="hero" id="hero" data-theme="light" aria-labelledby="hero-title">
        <div className="container hero__grid">
          <div className="hero__text">
            <p className="hero__pill reveal">Marketpleys sotuvchilari uchun</p>
            <h1 className="hero__title" id="hero-title">
              <span className="w" style={{ "--d": "80ms" } as CSSProperties}>Uzum,</span>{" "}
              <span className="w" style={{ "--d": "140ms" } as CSSProperties}>Wildberries,</span>{" "}
              <span className="w" style={{ "--d": "200ms" } as CSSProperties}>Ozon</span>{" "}
              <span className="w" style={{ "--d": "260ms" } as CSSProperties}>va</span>{" "}
              <span className="w" style={{ "--d": "320ms" } as CSSProperties}>{"Yandex —"}</span>{" "}
              <span className="accent">
                <span className="w" style={{ "--d": "400ms" } as CSSProperties}>bitta</span>{" "}
                <span className="w" style={{ "--d": "460ms" } as CSSProperties}>kabinetda</span>
              </span>
            </h1>
            <p className="hero__lead reveal" style={{ "--d": "560ms" } as CSSProperties}>
              Buyurtma, qoldiq va foydani bir joydan boshqaring. Toʻrtta kabinetga alohida kirish shart emas.
            </p>
            <ul className="hero__facts reveal" style={{ "--d": "660ms" } as CSSProperties}>
              <li>
                <span className="hero__mps" aria-hidden="true">
                  <img className="mp-ico" src="/marketplaces/uzum.svg" alt="" width="22" height="22" style={{ "--d": "760ms" } as CSSProperties} />
                  <img className="mp-ico" src="/marketplaces/wildberries.svg" alt="" width="22" height="22" style={{ "--d": "820ms" } as CSSProperties} />
                  <img className="mp-ico" src="/marketplaces/ozon.svg" alt="" width="22" height="22" style={{ "--d": "880ms" } as CSSProperties} />
                  <img className="mp-ico" src="/marketplaces/yandex.svg" alt="" width="22" height="22" style={{ "--d": "940ms" } as CSSProperties} />
                </span>
                4 marketpleys
              </li>
              <li>10+ integratsiya</li>
              <li>AI yordamchi</li>
            </ul>
            <div className="hero__cta reveal" style={{ "--d": "760ms" } as CSSProperties}>
              <a className="btn btn--lg btn--primary" href="#boshlash">
                {"Hoziroq boshlash "}
                <span className="arrow" aria-hidden="true">→</span>
              </a>
              {/* ikkinchi tugma — video: bosilganda oynada ochiladi */}
              <HeroVideo />
            </div>
          </div>

          {/* Oʻngda orbita: markazda Robohub, ichki halqada toʻrtta marketpleys, tashqi halqada ombor va hisob tizimlari.
              Halqalar sekin aylanadi, belgilar tik turadi. Bezak — matn chapda bor. */}
          <div className="hero__visual" aria-hidden="true">
            <div className="orbit">
              <i className="orbit__line orbit__line--in" />
              <i className="orbit__line orbit__line--out" />
              <i className="orbit__dot orbit__dot--in" />
              <i className="orbit__dot orbit__dot--out" />
              <div className="orbit__ring orbit__ring--in">
                {MARKETPLACES.map((m, i) => (
                  <div className="orbit__item" key={m} style={{ "--a": `${45 + i * 90}deg` } as CSSProperties}>
                    <span className="orbit__up">
                      <span className="orbit__tile orbit__tile--mp">
                        <img src={`/marketplaces/${m}.svg`} alt="" />
                      </span>
                    </span>
                  </div>
                ))}
              </div>
              <div className="orbit__ring orbit__ring--out">
                {SYSTEMS.map((s, i) => (
                  <div className="orbit__item" key={s.name} style={{ "--a": `${-70 + i * 40}deg` } as CSSProperties}>
                    <span className="orbit__up">
                      <span className="orbit__tile">
                        {s.logo ? <img src={s.logo} alt="" /> : <b>{s.name[0]}</b>}
                        <em>{s.name}</em>
                      </span>
                    </span>
                  </div>
                ))}
              </div>
              <div className="orbit__core">
                <svg viewBox="0 0 33.8675 15.06">
                  <use href="#rh-mark" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
