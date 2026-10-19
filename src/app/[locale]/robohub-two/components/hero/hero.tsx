import { Fragment, type CSSProperties } from "react";
import { getMessages } from "@/i18n/server";
import HeroVideo from "./hero-video";
import { messages } from "./hero.i18n";

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

export default async function Hero() {
  const t = await getMessages(messages);
  return (
    <>
      <section className="hero" id="hero" data-theme="light" aria-labelledby="hero-title">
        <div className="container hero__grid">
          {/* Birinchi ekran matni darhol koʻrinadi (LCP): .reveal va --d kechikishi yoʻq, kirish faqat siljish bilan */}
          <div className="hero__text">
            <p className="hero__pill hero__rise">{t.pill}</p>
            <h1 className="hero__title" id="hero-title">
              {t.title.map((w, i) => (
                <Fragment key={i}>
                  <span className="w">{w}</span>{" "}
                </Fragment>
              ))}
              <span className="accent">
                {t.accent.map((w, i) => (
                  <Fragment key={i}>
                    {i > 0 && " "}
                    <span className="w">{w}</span>
                  </Fragment>
                ))}
              </span>
            </h1>
            <p className="hero__lead hero__rise">
              {t.lead}
            </p>
            <ul className="hero__facts hero__rise">
              <li>
                <span className="hero__mps" aria-hidden="true">
                  <img className="mp-ico" src="/marketplaces/uzum.svg" alt="" width="22" height="22" style={{ "--d": "760ms" } as CSSProperties} />
                  <img className="mp-ico" src="/marketplaces/wildberries.svg" alt="" width="22" height="22" style={{ "--d": "820ms" } as CSSProperties} />
                  <img className="mp-ico" src="/marketplaces/ozon.svg" alt="" width="22" height="22" style={{ "--d": "880ms" } as CSSProperties} />
                  <img className="mp-ico" src="/marketplaces/yandex.svg" alt="" width="22" height="22" style={{ "--d": "940ms" } as CSSProperties} />
                </span>
                {t.facts.mps}
              </li>
              <li>{t.facts.integrations}</li>
              <li>{t.facts.ai}</li>
            </ul>
            <div className="hero__cta hero__rise">
              <a className="btn btn--lg btn--primary" href="#start">
                {`${t.start} `}
                <span className="arrow" aria-hidden="true">→</span>
              </a>
              {/* ikkinchi tugma — video: bosilganda oynada ochiladi */}
              <HeroVideo t={t.video} />
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
