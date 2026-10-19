"use client";

import { useState, type KeyboardEvent } from "react";
import { money, SIGNUP_HREF, type PRICING } from "../../robosell.content";

type P = typeof PRICING;

function Cell({ v }: { v: boolean | string }) {
  if (v === true) return <span className="rs-yes">Bor</span>;
  if (v === false) return <span className="rs-no">Yo‘q</span>;
  return <span>{v}</span>;
}

// Davr tanlovi (radiogroup, ←/→ bilan), narxlar, kartalar va taqqoslash jadvali (accordion).
export default function PricingClient({ p }: { p: P }) {
  const [pi, setPi] = useState(0);
  const [open, setOpen] = useState(false);
  const period = p.periods[pi];

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
      <div className="rs-period" role="radiogroup" aria-label="To‘lov davri" data-rv="">
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

      <ul className="rs-plans">
        {p.plans.map((plan) => {
          const monthly = plan.price * (1 - period.off);
          const pop = plan.id === "basic";
          return (
            <li key={plan.id} className={"rs-plan rs-plan--" + plan.id + (pop ? " is-pop" : "")} data-rv="">
              {pop && <span className="rs-plan__badge">{p.popular}</span>}
              <h3>{plan.name}</h3>
              <p className="rs-plan__note">{plan.note}</p>
              <p className="rs-plan__price" aria-live="polite">
                <b>{money(monthly)}</b> <span>{p.unit}</span>
              </p>
              <p className="rs-plan__total">
                {period.off > 0 && <s>{money(plan.price)}</s>} {period.months} oyga jami {money(monthly * period.months)} so‘m
              </p>
              <ul className="rs-plan__list">
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a className={"rs-btn rs-btn--lg rs-btn--block " + (pop ? "rs-btn--yellow" : plan.id === "pro" ? "rs-btn--teal" : "rs-btn--line")} href={SIGNUP_HREF}>
                {p.choose}
                <span className="rs-sr"> — {plan.name}</span>
              </a>
            </li>
          );
        })}
      </ul>

      <div className="rs-compare">
        <button
          className="rs-compare__btn"
          type="button"
          aria-expanded={open}
          aria-controls="rs-compare-table"
          onClick={() => setOpen((o) => !o)}
        >
          {p.compareBtn}
          <span className="rs-plus" aria-hidden="true" />
        </button>
        <div id="rs-compare-table" className="rs-compare__body" hidden={!open}>
          <table className="rs-table">
            <caption className="rs-sr">Tariflarni taqqoslash</caption>
            <thead>
              <tr>
                <th scope="col">Imkoniyat</th>
                {p.plans.map((pl) => (
                  <th scope="col" key={pl.id}>
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
                    <td key={i} data-plan={p.plans[i].name}>
                      <Cell v={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
