import type { CSSProperties } from "react";
import Icon from "../icon/svg-icon";
import { SIGNUP_HREF, plural, type Content, TOKEN_PRICE, money } from "../../ai-studio.content";
import { getC } from "../../content.server";
import { srcAlt } from "@/lib/img-alt";
import type { Locale } from "@/i18n/config";

// Har rejimning o'z jonli vizuali:
//  Foto — kamera "vizori": burchak qavslari nafas oladi, ustidan yorug'lik o'tadi;
//  Infografika — afzalliklar chiziq bilan mahsulotga "ulanadi";
//  5 to'plam — 5 ta rasm yelpig'ich bo'lib ochilib-yopilib turadi.
type PhotoStyles = Content["MODES"]["photoStyles"];

// Foto: 4 uslub (studiyadagi kabi) navbat bilan almashadi — rasm va uning nomi; faqat CSS animatsiya (--k — tartib raqami)
function PhotoViz({ styles, locale }: { styles: PhotoStyles; locale: Locale }) {
  return (
    <div className="as-mv as-mv--photo">
      {styles.map((s, i) => (
        <img key={s.img} className="as-ps" src={s.img} alt={srcAlt(locale, s.img)} loading="lazy" style={{ "--k": i } as CSSProperties} />
      ))}
      <span className="as-vf" aria-hidden="true">
        <i /><i /><i /><i />
      </span>
      {styles.map((s, i) => (
        <span key={s.name} className="as-mv__chip as-ps" style={{ "--k": i } as CSSProperties} aria-hidden="true">
          <Icon name="check" />
          {s.name}
        </span>
      ))}
    </div>
  );
}

// Foto kartasi matni ostida — 4 uslubning hammasi (kichik rasm + nom); hozir ko'rinayotgani ajralib turadi
function PhotoStyleList({ styles }: { styles: PhotoStyles }) {
  return (
    <ul className="as-pstyles">
      {styles.map((s, i) => (
        <li key={s.name} style={{ "--k": i } as CSSProperties}>
          <img src={s.img} alt="" loading="lazy" width={28} height={28} />
          {s.name}
        </li>
      ))}
    </ul>
  );
}

function InfoViz({ img, features, locale }: { img: string; features: Content["PRODUCT"]["features"]; locale: Locale }) {
  return (
    <div className="as-mv as-mv--info">
      <img src={img} alt={srcAlt(locale, img)} loading="lazy" />
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

function PackViz({ pack, locale }: { pack: string[]; locale: Locale }) {
  return (
    <div className="as-mv as-mv--pack">
      {pack.map((src, i) => (
        <img key={src} src={src} alt={srcAlt(locale, src)} loading="lazy" style={{ "--k": i - 2 } as CSSProperties} />
      ))}
      <span className="as-mv__count">×5</span>
    </div>
  );
}

// 06 — Generatsiya rejimlari — "bento": chapda katta Infografika (eng ommabop, brend rangida),
// o'ngda Foto va 5 to'plam gorizontal kartalar. Sarlavha ikki tomonga bo'lingan.
// Kirishda kartalar pastdan 3D "ko'tarilib" ochiladi.
export default async function Modes() {
  const { MODES, PRODUCT, VARIANTS, T, locale } = await getC();
  return (
    <section className="as-modes" id="modes" aria-labelledby="as-modes-title" data-pause>
      <div className="as-wrap">
        <header className="as-modes__head">
          <div>
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

        {/* telefon (≤767px) — alohida: avval katta "Eng ommabop" Infografika, ostida Foto va 5 to'plam ixcham qatorlar */}
        <ul className="as-mm as-only-m">
          {[...MODES.items].sort((a, b) => Number(b.featured) - Number(a.featured)).map((m, i) => (
            <li
              key={m.id}
              className={"as-mm__card" + (m.featured ? " is-featured" : "")}
              data-rv
              style={{ "--d": `${i * 100}ms` } as CSSProperties}
            >
              <div className="as-mm__viz">
                {m.id === "photo" && <PhotoViz locale={locale} styles={MODES.photoStyles} />}
                {m.id === "infographic" && <InfoViz locale={locale} img={VARIANTS[0].img} features={PRODUCT.features} />}
                {m.id === "pack" && <PackViz locale={locale} pack={MODES.pack} />}
              </div>
              <div className="as-mm__body">
                {m.featured && (
                  <span className="as-mm__tag">
                    <Icon name="crown" />
                    {MODES.popular}
                  </span>
                )}
                <h3 className="as-mm__name">{m.name}</h3>
                <p className="as-mm__text">{m.text}</p>
                <div className="as-mm__foot">
                  <span className="as-mm__price">
                    <b>{m.tokens}</b> {plural(m.tokens, T.forms.token)}
                    <i>{money(m.tokens * TOKEN_PRICE)} {T.currency}</i>
                  </span>
                  <a
                    className={"as-btn as-btn--sm " + (m.featured ? "as-btn--mint" : "as-btn--ghost as-mm__go")}
                    href={SIGNUP_HREF}
                    aria-label={m.featured ? undefined : `${MODES.choose}: ${m.name}`}
                  >
                    {m.featured && MODES.choose}
                    <span className="as-btn__ico" aria-hidden="true">
                      <Icon name="arrow" className="as-i--right" />
                    </span>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <ul className="as-mcs as-only-d">
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
              {m.id === "photo" && <PhotoViz locale={locale} styles={MODES.photoStyles} />}
              {m.id === "infographic" && <InfoViz locale={locale} img={VARIANTS[0].img} features={PRODUCT.features} />}
              {m.id === "pack" && <PackViz locale={locale} pack={MODES.pack} />}

              <div className="as-mc__body">
                <h3 className="as-mc__name">{m.name}</h3>
                <p className="as-mc__text">{m.text}</p>
                {m.id === "photo" && <PhotoStyleList styles={MODES.photoStyles} />}
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
