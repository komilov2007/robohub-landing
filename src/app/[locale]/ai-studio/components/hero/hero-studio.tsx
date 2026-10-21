"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Icon from "../icon/icon";
import { BEFORE_IMG, fill } from "../../ai-studio.content";
import { useC } from "../../content-context";

const AUTO_MS = 5200; // uslublar avtomatik almashish oralig'i (tab ostidagi chiziq shu vaqtda to'ladi)
const STEP_COUNT = 4; // AI holati bosqichlari (matnlari — T.studio.steps)

// Hero vizuali — "oldin → AI → keyin" kompozitsiyasi (wireframe'dagi ⟷ sxemasi):
//  • chapda pastda kichik, qiyshiq turgan oddiy foto (oldin);
//  • o'ngda katta, har doim to'liq tayyor infografika (keyin) — uslublar navbat bilan silliq almashadi,
//    har almashganda infografika elementlari qaytadan yig'iladi va ustidan yorug'lik o'tadi;
//  • ular tutashgan joyda AI tugun: aylanuvchi halqa va qisqa holat yozuvi (Tahlil… → Tayyor).
//  • sichqoncha bilan yengil parallaks: ikki karta qarama-qarshi tomonga siljiydi.
// Foydalanuvchi uslub tanlasa — avtomatik almashish to'xtaydi.
export default function HeroStudio() {
  const { PRODUCT, VARIANTS, T } = useC();
  const S = T.studio;
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [step, setStep] = useState(STEP_COUNT - 1);
  const rootRef = useRef<HTMLDivElement>(null);

  // har uslub almashganda AI holati qaytadan o'tadi
  useEffect(() => {
    const timers = Array.from({ length: STEP_COUNT }, (_, i) => window.setTimeout(() => setStep(i), i * 380));
    return () => timers.forEach(clearTimeout);
  }, [active]);

  // sichqoncha parallaksi (faqat sichqoncha bor qurilmalarda)
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: globalThis.PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      el.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    };
    const onLeave = () => {
      el.style.setProperty("--px", "0");
      el.style.setProperty("--py", "0");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const select = (i: number, byUser = false) => {
    if (byUser) setAuto(false);
    setActive(i);
  };

  const v = VARIANTS[active];
  const done = step === STEP_COUNT - 1;

  return (
    <div className="as-studio as-in" ref={rootRef} style={{ "--d": "260ms" } as CSSProperties} data-pause>
      <span className="as-studio__halo" aria-hidden="true" />

      <div className="as-duo">
        {/* keyin — katta tayyor infografika */}
        <div className="as-after">
          <div className="as-after__card">
            {VARIANTS.map((x, i) => (
              <img
                key={x.id}
                className={"as-after__img" + (i === active ? " is-active" : "")}
                src={x.img}
                alt={i === active ? fill(S.afterAlt, { name: x.name }) : ""}
                aria-hidden={i !== active}
                loading={i === 0 ? "eager" : "lazy"}
              />
            ))}
            <div className={`as-ig as-ig--${v.tone}`} key={`ig-${active}`} aria-hidden="true">
              <div className="as-ig__head">
                <span className="as-ig__kicker">{PRODUCT.kicker}</span>
                <span className="as-ig__title">{PRODUCT.name}</span>
              </div>
              <span className="as-ig__hit">
                <Icon name="fire" />
                HIT
              </span>
              <span
                className="as-ig__label"
                style={{ left: `${v.label.x}%`, top: `${v.label.y}%`, width: `${v.label.w}%`, height: `${v.label.h}%` } as CSSProperties}
              >
                <b>{PRODUCT.brand}</b>
                <i>{PRODUCT.sub}</i>
              </span>
              <ul className="as-ig__feats">
                {PRODUCT.features.map((f, i) => (
                  <li key={f.text} style={{ "--k": i } as CSSProperties}>
                    <span>
                      <Icon name={f.icon} />
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>
            <span className="as-after__shine" key={`sh-${active}`} aria-hidden="true" />
          </div>
          <span className="as-after__tag" aria-hidden="true">
            <Icon name="ai" />
            {S.afterTag}
          </span>
        </div>

        {/* oldin — kichik oddiy foto */}
        <figure className="as-before">
          <img src={BEFORE_IMG} alt={S.beforeAlt} />
          <figcaption>{S.beforeCap}</figcaption>
        </figure>

        {/* AI tugun */}
        <div className={"as-node" + (done ? " is-done" : "")} aria-live="polite">
          <span className="as-node__core">
            <span className="as-node__ring" aria-hidden="true" />
            {done ? <Icon name="check" /> : <Icon name="ai" />}
          </span>
          <span className="as-node__txt" key={step}>
            {done ? S.ready : `${S.steps[step]}…`}
          </span>
        </div>
      </div>

      <div className="as-vars" role="tablist" aria-label={S.tabs}>
        {VARIANTS.map((x, i) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={"as-vars__tab" + (i === active ? " is-active" : "")}
            onClick={() => select(i, true)}
          >
            <img src={x.img} alt="" width={28} height={37} loading="lazy" />
            {x.name}
            {auto && i === active && (
              <span
                className="as-vars__bar"
                style={{ "--auto": `${AUTO_MS}ms` } as CSSProperties}
                onAnimationEnd={() => select((active + 1) % VARIANTS.length)}
                aria-hidden="true"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
