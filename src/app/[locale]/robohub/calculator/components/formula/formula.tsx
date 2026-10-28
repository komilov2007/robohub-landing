"use client";

import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";
import { EXAMPLE, type Content } from "../../calculator.content";

const fmt = (n: number) => n.toLocaleString("ru-RU").replace(/ | /g, " ");

/** Formula tugmalari va ular ostidagi namunaviy summa (hero'dagi o'sha haqiqiy misol). */
const KEYS = [
  { id: "price", amount: `${fmt(EXAMPLE.price)}` },
  { id: "commission", amount: `−${fmt(EXAMPLE.commission)}` },
  { id: "delivery", amount: `−${fmt(EXAMPLE.logistics)}` },
  { id: "tax", amount: "−0" },
  { id: "cost", amount: `−${fmt(EXAMPLE.cost)}` },
  { id: "profit", amount: `+${fmt(EXAMPLE.profit)}` },
] as const;
const BONUS = ["schemes", "competitors", "link", "ai"] as const;
const ORDER = [...KEYS.map((k) => k.id), ...BONUS];
const CYCLE_MS = 3600;

// "Imkoniyatlar" — kalkulyator tugmalaridan yig'ilgan formula: Narx − Komissiya − Yetkazish − Soliq − Tannarx = Foyda.
// Tugmalar ekranda bo'lganda navbat bilan o'zi "bosiladi"; LCD ekranda — o'sha narsa nima ekanligi.
// Bosilgan tugma avtomatik aylanishni to'xtatadi. Pastdagi kichik tugmalar — kalkulyatordagi qo'shimcha imkoniyatlar.
export default function Formula({ formula, features }: { formula: Content["S"]["formula"]; features: Content["FEATURES"] }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string>("price");
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !visible) return;
    const id = setTimeout(() => setActive((cur) => ORDER[(ORDER.indexOf(cur as (typeof ORDER)[number]) + 1) % ORDER.length]), CYCLE_MS);
    return () => clearTimeout(id);
  }, [auto, visible, active]);

  const item = (id: string) => features.items.find((it) => it.id === id);
  const entry =
    active === "price"
      ? { title: formula.keys.price, text: formula.priceText }
      : active === "cost"
        ? { title: formula.keys.cost, text: formula.costText }
        : (item(active) ?? { title: "", text: "" });

  const press = (id: string) => {
    setAuto(false);
    setActive(id);
  };

  return (
    <section className="cx-formula" id="features" ref={ref} aria-labelledby="cx-formula-title" data-spot>
      <span className="cx-formula__spot" aria-hidden="true" />
      <div className="as-wrap">
        <header className="cx-head cx-head--dark" data-io>
          <h2 id="cx-formula-title">{formula.title}</h2>
          <p>{formula.lead}</p>
        </header>

        <div className="cx-keys" role="group" aria-label={formula.title} data-io>
          {KEYS.map((k, i) => (
            <Fragment key={k.id}>
              {i > 0 && (
                <span className="cx-op" aria-hidden="true" style={{ "--k": i } as CSSProperties}>
                  {k.id === "profit" ? "=" : "−"}
                </span>
              )}
              <button
                type="button"
                className={`cx-key is-${k.id}${active === k.id ? " is-on" : ""}`}
                aria-pressed={active === k.id}
                onClick={() => press(k.id)}
                style={{ "--k": i } as CSSProperties}
              >
                <span className="cx-key__label">{formula.keys[k.id]}</span>
                <span className="cx-key__amount">{k.amount}</span>
              </button>
            </Fragment>
          ))}
        </div>

        <div className="cx-screen" data-io>
          <div className="cx-screen__bar">
            <span>{formula.screen}</span>
            <span className="cx-screen__dots" aria-hidden="true">
              {ORDER.map((id) => (
                <i key={id} className={id === active ? "is-on" : ""} />
              ))}
            </span>
          </div>
          <div className="cx-screen__body" key={active} aria-live="polite">
            <p className="cx-screen__title">
              <span aria-hidden="true">&gt;</span> {entry.title}
              <b className="cx-caret" aria-hidden="true" />
            </p>
            <p className="cx-screen__text">{entry.text}</p>
          </div>
          {auto && visible && <span className="cx-screen__timer" key={`t-${active}`} style={{ "--t": `${CYCLE_MS}ms` } as CSSProperties} />}
        </div>

        <div className="cx-bonus" data-io>
          <span className="cx-bonus__label">{formula.bonus}</span>
          {BONUS.map((id) => (
            <button
              key={id}
              type="button"
              className={"cx-chipkey" + (active === id ? " is-on" : "")}
              aria-pressed={active === id}
              onClick={() => press(id)}
            >
              {item(id)?.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
