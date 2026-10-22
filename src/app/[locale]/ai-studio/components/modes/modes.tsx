import type { CSSProperties } from "react";
import Icon from "../icon/icon";
import { SIGNUP_HREF, plural, type Content, TOKEN_PRICE, money } from "../../ai-studio.content";
import { getC } from "../../content.server";

// Har rejimning o'z jonli vizuali:
//  Foto — kamera "vizori": burchak qavslari nafas oladi, ustidan yorug'lik o'tadi;
//  Infografika — afzalliklar chiziq bilan mahsulotga "ulanadi";
//  5 to'plam — 5 ta rasm yelpig'ich bo'lib ochilib-yopilib turadi.
function PhotoViz({ clean }: { clean: string }) {
  return (
    <div className="as-mv as-mv--photo">
      <img src="/ai/cosmetics_studio.webp" alt="" loading="lazy" />
      <span className="as-vf" aria-hidden="true">
        <i /><i /><i /><i />
      </span>
      <span className="as-mv__chip">
        <Icon name="check" />
        {clean}
      </span>
    </div>
  );
}

function InfoViz({ img, features }: { img: string; features: Content["PRODUCT"]["features"] }) {
  return (
    <div className="as-mv as-mv--info">
      <img src={img} alt="" loading="lazy" />
      <ul className="as-callouts" aria-hidden="true">
        {features.map((f, i) => (
          <li key={f.text} style={{ "--k": i } as CSSProperties}>
            <span className="as-callouts__dot" />
            <span className="as-callouts__line" />
            <span className="as-callouts__txt">
              <Icon name={f.icon} />
              {f.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PackViz({ pack }: { pack: string[] }) {
  return (
    <div className="as-mv as-mv--pack">
      {pack.map((src, i) => (
        <img key={src} src={src} alt="" loading="lazy" style={{ "--k": i - 2 } as CSSProperties} />
      ))}
      <span className="as-mv__count">×5</span>
    </div>
  );
}

// 06 — Generatsiya rejimlari — "bento": chapda katta Infografika (eng ommabop, brend rangida),
// o'ngda Foto va 5 to'plam gorizontal kartalar. Sarlavha ikki tomonga bo'lingan.
// Kirishda kartalar pastdan 3D "ko'tarilib" ochiladi.
export default async function Modes() {
  const { MODES, PRODUCT, VARIANTS, T } = await getC();
  return (
    <section className="as-modes" id="modes" aria-labelledby="as-modes-title" data-pause>
      <div className="as-wrap">
        <header className="as-modes__head">
          <div>
            <p className="as-eyebrow" data-rv>
              <span>06</span>
              {MODES.eyebrow}
            </p>
            <h2 className="as-h2" id="as-modes-title" data-rv style={{ "--d": "80ms" } as CSSProperties}>
              {MODES.title} <span className="as-h2__accent">{MODES.accent}</span>
            </h2>
          </div>
          <p className="as-modes__lead" data-rv style={{ "--d": "160ms" } as CSSProperties}>
            <span className="as-modes__lead-ico">
              <Icon name="ai" />
            </span>
            {MODES.lead}
          </p>
        </header>

        <ul className="as-mcs">
          {MODES.items.map((m, i) => (
            <li
              key={m.id}
              className={"as-mc" + (m.featured ? " is-featured" : "")}
              data-rv
              style={{ "--d": `${i * 140}ms` } as CSSProperties}
            >
              {m.featured && (
                <span className="as-mc__tag">
                  <Icon name="crown" />
                  {MODES.popular}
                </span>
              )}
              {m.id === "photo" && <PhotoViz clean={MODES.clean} />}
              {m.id === "infographic" && <InfoViz img={VARIANTS[0].img} features={PRODUCT.features} />}
              {m.id === "pack" && <PackViz pack={MODES.pack} />}

              <div className="as-mc__body">
                <h3 className="as-mc__name">{m.name}</h3>
                <p className="as-mc__text">{m.text}</p>
                <div className="as-mc__foot">
                  <span className="as-mc__price">
                    <span className="as-mc__coin">
                      <Icon name="ai" />
                    </span>
                    <b>{m.tokens}</b> {plural(m.tokens, T.forms.token)}
                    <i className="as-mc__som">· {money(m.tokens * TOKEN_PRICE)} {T.currency}</i>
                  </span>
                  <a className={"as-btn as-btn--sm " + (m.featured ? "as-btn--mint" : "as-btn--ghost")} href={SIGNUP_HREF}>
                    {MODES.choose}
                    <span className="as-btn__ico" aria-hidden="true">
                      <Icon name="arrow" className="as-i--right" />
                    </span>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
