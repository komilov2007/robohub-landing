"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { money, SIGNUP_HREF, type PRICING } from "../../robosell.content";
import Cost from "./cost";

type P = typeof PRICING;

function Cell({ v }: { v: boolean | string }) {
  if (v === true) return <span className="rs-yes">✓</span>;
  if (v === false) return <span className="rs-no">—</span>;
  return <span>{v}</span>;
}

// Narx davr almashganda eski qiymatdan yangisiga ~0.6 s da "sanaladi".
function Price({ value }: { value: number }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    // harakat kamaytirilganda — bir kadrda yakuniy qiymat
    const dur = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 600;
    const a = from.current;
    const t0 = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const v = a + (value - a) * (1 - Math.pow(1 - p, 3));
      setShown(v);
      if (p < 1) raf = requestAnimationFrame(step);
      else from.current = value;
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{money(Math.round(shown / 1000) * 1000)}</>;
}

// Kursor ortidan yengil 3D egilish (faqat sichqoncha bilan)
const tilt = (e: PointerEvent<HTMLLIElement>) => {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--rx", `${((e.clientY - r.top) / r.height - 0.5) * -6}deg`);
  el.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 8}deg`);
};
const untilt = (e: PointerEvent<HTMLLIElement>) => {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
};

// Davr tanlovi (radiogroup, ←/→), kartalar (har birida barcha imkoniyatlar: bor ✓ / yo'q —),
// taqqoslash jadvali (ochiladigan).
export default function PricingClient({ p }: { p: P }) {
  const [pi, setPi] = useState(0);
  const [open, setOpen] = useState(false);
  const period = p.periods[pi];
  const all = p.plans[p.plans.length - 1].features; // eng to'liq tarif ro'yxati

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (pi + d + p.periods.length) % p.periods.length;
    setPi(next);
    document.getElementById("rs-period-" + next)?.focus();
  };

  return (
    <>
      <div className="rs-per" role="radiogroup" aria-label="To‘lov davri" data-rv="" style={{ "--i": pi, "--n": p.periods.length } as CSSProperties}>
        <span className="rs-per__thumb" aria-hidden="true" />
        {p.periods.map((x, i) => (
          <button
            key={x.months}
            id={"rs-period-" + i}
            type="button"
            role="radio"
            aria-checked={i === pi}
            tabIndex={i === pi ? 0 : -1}
            onClick={() => setPi(i)}
            onKeyDown={onKey}
          >
            {x.label}
            {x.off > 0 && <em>−{Math.round(x.off * 100)}%</em>}
          </button>
        ))}
      </div>

      <ul className="rs-pl">
        {p.plans.map((plan, k) => {
          const monthly = plan.price * (1 - period.off);
          const pop = plan.id === "basic";
          return (
            <li
              key={plan.id}
              className={"rs-pl__card rs-pl__card--" + plan.id + (pop ? " is-pop" : "")}
              data-rv=""
              style={{ "--k": k } as CSSProperties}
              onPointerMove={tilt}
              onPointerLeave={untilt}
            >
              <div className="rs-pl__in">
                {pop && <span className="rs-pl__badge">★ {p.popular}</span>}
                <h3>{plan.name}</h3>
                <p className="rs-pl__note">{plan.note}</p>
                <p className="rs-pl__price" aria-live="polite">
                  <b>
                    <Price value={monthly} />
                  </b>
                  <span>{p.unit}</span>
                </p>
                <p className="rs-pl__total">
                  {period.off > 0 ? (
                    <>
                      <s>{money(plan.price)}</s>
                      <em key={pi}>−{Math.round(period.off * 100)}% tejaysiz</em>
                    </>
                  ) : (
                    <span>{period.months} oyga jami {money(monthly * period.months)} so‘m</span>
                  )}
                </p>
                <a className={"rs-pl__btn" + (pop ? " is-pop" : "")} href={SIGNUP_HREF}>
                  {p.choose}
                  <span aria-hidden="true">→</span>
                  <span className="rs-sr"> — {plan.name}</span>
                </a>
                <ul className="rs-pl__list">
                  {all.map((f, j) => {
                    const has = (plan.features as readonly string[]).includes(f);
                    return (
                      <li key={f} className={has ? undefined : "is-off"} style={{ "--j": j } as CSSProperties}>
                        <i aria-hidden="true">{has ? "✓" : "—"}</i>
                        <span className={has ? undefined : "rs-pl__off"}>
                          {!has && <span className="rs-sr">Yo‘q: </span>}
                          {f}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>

      <Cost />

      <div className="rs-cmp2">
        <button className="rs-cmp2__btn" type="button" aria-expanded={open} aria-controls="rs-compare-table" onClick={() => setOpen((o) => !o)}>
          {p.compareBtn}
          <span className="rs-cmp2__ico" aria-hidden="true" />
        </button>
        <div id="rs-compare-table" className="rs-cmp2__body" data-open={open || undefined}>
          <div>
            <table className="rs-table2">
              <caption className="rs-sr">Tariflarni taqqoslash</caption>
              <thead>
                <tr>
                  <th scope="col">Imkoniyat</th>
                  {p.plans.map((pl) => (
                    <th scope="col" key={pl.id} className={pl.id === "basic" ? "is-pop" : undefined}>
                      {pl.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {p.compare.map((row) => (
                  <tr key={row.name}>
                    <th scope="row">{row.name}</th>
                    {row.v.map((v, i) => (
                      <td key={i} data-plan={p.plans[i].name} className={p.plans[i].id === "basic" ? "is-pop" : undefined}>
                        <Cell v={v} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
