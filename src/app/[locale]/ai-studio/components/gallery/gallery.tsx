"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Icon from "../icon/svg-icon";
import { SIGNUP_HREF, fill } from "../../ai-studio.content";
import { useC } from "../../content-context";

// 04 — Oldin / keyin galereyasi: haqiqiy natijalar — telefondagi oddiy foto → AI Studio rasmi.
//  • Har karta o'zi doim aylanib turadi: oddiy foto → mint skaner chizig'i o'tadi → AI natija → yana foto.
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

      <div className={"as-gal__grid-wrap" + (items.length > 4 ? " has-fade" : "") + (items.length < 12 ? " is-short" : "")}>
        <ul className="as-gcs">
          {items.map((it, i) => (
            <li className={"as-gc" + (it.wide ? " is-wide" : "")} key={it.after} style={{ "--k": i } as CSSProperties}>
              <div className="as-gc__after">
                <img src={it.after} alt={fill(GALLERY.resultAlt, { name: it.name })} loading="lazy" />
              </div>
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
                {it.meta}
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
