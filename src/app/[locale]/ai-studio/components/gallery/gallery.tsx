"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Icon from "../icon/svg-icon";
import { SIGNUP_HREF, fill, type Content } from "../../ai-studio.content";
import { useC } from "../../content-context";

type Item = Content["GALLERY"]["items"][number];

// "Keyin" tomoni: haqiqiy AI rasm bo'lsa — rasm + yozuvlar; bo'lmasa — fotodan quriladigan gorizontal infografika
function After({ it }: { it: Item }) {
  return (
    <div className={`as-gc__after as-gc--${it.tone}` + (it.after ? " has-photo" : "")}>
      {it.after ? (
        <img className="as-gc__full" src={it.after} alt="" loading="lazy" />
      ) : (
        <span className="as-gc__stage">
          <img src={it.before} alt="" loading="lazy" />
          <span className="as-gc__badge">
            <Icon name="fire" />
            HIT
          </span>
        </span>
      )}
      <div className="as-gc__copy">
        <span className="as-gc__kicker">{it.kicker}</span>
        <span className="as-gc__title">{it.name}</span>
        <ul className="as-gc__feats">
          {it.feats.map((f) => (
            <li key={f}>
              <Icon name="check" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// 04 — Oldin / keyin galereyasi: to'liq kenglikdagi zich grid.
//  • Har karta o'zi doim aylanib turadi: oddiy foto → mint skaner chizig'i o'tadi → AI infografika → yana foto.
//    Kartalarning fazasi siljitilgan, shuning uchun grid bo'ylab "to'lqin" bo'lib ketadi (sof CSS).
//  • Oxirgi qator xira tortiladi, ustida CTA.
export default function Gallery() {
  const { GALLERY } = useC();
  const [seen, setSeen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  const items = GALLERY.items;

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setSeen(true);
        io.disconnect();
      },
      { threshold: 0.15 },
    );
    if (rootRef.current) io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section className={"as-gal" + (seen ? " is-seen" : "")} id="examples" ref={rootRef} aria-labelledby="as-gal-title" data-pause>
      <div className="as-gal__head">
        <h2 className="as-gal__title" id="as-gal-title" data-rv>
          {GALLERY.title}
        </h2>

      </div>

      <div className={"as-gal__grid-wrap" + (items.length > 4 ? " has-fade" : "")}>
        <ul className="as-gcs">
          {items.map((it, i) => (
            <li className="as-gc" key={it.id} style={{ "--k": i } as CSSProperties}>
              <After it={it} />
              <div className="as-gc__before">
                <img src={it.before} alt={fill(GALLERY.photoAlt, { name: it.name })} loading="lazy" />
              </div>
              <span className="as-gc__scan" aria-hidden="true" />
              <span className="as-gc__tag" aria-hidden="true">
                <span className="as-gc__tag-before">{GALLERY.before}</span>
                <span className="as-gc__tag-after">
                  <Icon name="ai" />
                  {GALLERY.after}
                </span>
              </span>
              <span className="as-gc__meta">
                <b>{it.name}</b>
                {GALLERY.meta}
              </span>
            </li>
          ))}
        </ul>

        <div className="as-gal__cta">
          <a className="as-btn as-btn--mint as-btn--lg" href={SIGNUP_HREF}>
            {GALLERY.cta}
            <span className="as-btn__ico" aria-hidden="true">
              <Icon name="arrow" className="as-i--right" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
