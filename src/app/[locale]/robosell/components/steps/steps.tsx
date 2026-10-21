"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { SIGNUP_HREF, STEPS } from "../../robosell.content";

// 3-bo'lim. Uch qadam bitta yo'l bo'ylab: ekranga kirganda qadamlar navbat bilan "yonadi",
// ular orasidagi chiziq yashil bilan to'ladi. Har qadamda kichik jonli ekran:
//   1) ariza formasi — raqam yoziladi, "Yuborish" bosiladi;
//   2) sozlash — kalitlar birma-bir yoqiladi, foiz halqasi to'ladi;
//   3) buyurtmalar — bildirishnomalar ketma-ket tushadi, hisoblagich o'sadi.
// JS siz va reduced-motion'da hammasi yakuniy holatda ko'rinadi.
const PHONE = "+998 90 123 45 67";
const ORDERS = [
  { id: 29180, who: "Aziza K.", sum: "149,000", src: "Telegram" },
  { id: 29181, who: "Jasur T.", sum: "690,000", src: "Sayt" },
  { id: 29182, who: "Malika R.", sum: "420,000", src: "Click" },
];

export default function Steps() {
  const ref = useRef<HTMLDivElement>(null);
  // phase: -1 — hali boshlanmagan (SSR'da "tugagan" ko'rinish uchun 3), 0..2 — faol qadam, 3 — hammasi tayyor
  const [phase, setPhase] = useState(3);
  const [typed, setTyped] = useState(PHONE.length);
  const [sent, setSent] = useState(true);
  const [on, setOn] = useState(STEPS.setup.length);
  const [got, setGot] = useState(ORDERS.length);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timers: number[] = [];
    const later = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    // boshlang'ich holat — birinchi kadrdan keyin (hydration mos kelishi uchun)
    later(0, () => {
      setPhase(-1);
      setTyped(0);
      setSent(false);
      setOn(0);
      setGot(0);
    });
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        // 1-qadam: yozish
        later(200, () => setPhase(0));
        for (let i = 1; i <= PHONE.length; i++) later(500 + i * 70, () => setTyped(i));
        later(500 + PHONE.length * 70 + 300, () => setSent(true));
        // 2-qadam: kalitlar
        later(2900, () => setPhase(1));
        STEPS.setup.forEach((_, i) => later(3400 + i * 450, () => setOn(i + 1)));
        // 3-qadam: buyurtmalar
        later(5600, () => setPhase(2));
        ORDERS.forEach((_, i) => later(6000 + i * 650, () => setGot(i + 1)));
        later(8200, () => setPhase(3));
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const pct = Math.round((on / STEPS.setup.length) * 100);
  const state = (i: number) => (phase > i ? "done" : phase === i ? "on" : "off");

  return (
    <section className="rs-steps" id="how-it-works" aria-labelledby="steps-title">
      <div className="rs-wrap">
        <header className="rs-head2">
          <p className="rs-kicker" data-rv="">
            <span>03</span>
            {STEPS.eyebrow}
          </p>
          <h2 className="rs-title" id="steps-title" data-rv="">
            {STEPS.title}
          </h2>
          <p className="rs-sub" data-rv="">
            {STEPS.lead}
          </p>
        </header>

        <div className="rs-steps__track" ref={ref} style={{ "--fill": phase < 0 ? 0 : Math.min(phase, 2) / 2 } as CSSProperties}>
          <span className="rs-steps__rail" aria-hidden="true">
            <i />
          </span>
          <ol className="rs-steps__list">
            {STEPS.list.map((s, i) => (
              <li key={s.title} className="rs-step" data-state={state(i)}>
                <span className="rs-step__dot" aria-hidden="true">
                  <b>{i + 1}</b>
                  <i>✓</i>
                </span>
                <div className="rs-step__card">
                  <span className="rs-step__big" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span className="rs-step__time">⏱ {s.time}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>

                  <div className="rs-step__screen" aria-hidden="true">
                    {i === 0 && (
                      <div className="rs-mini-form">
                        <small>Telefon raqamingiz</small>
                        <span className="rs-mini-form__input">
                          {PHONE.slice(0, typed)}
                          <i className={typed < PHONE.length ? "is-blink" : undefined} />
                        </span>
                        <span className={"rs-mini-form__btn" + (sent ? " is-sent" : "")}>{sent ? "✓ Ariza qabul qilindi" : "Yuborish"}</span>
                      </div>
                    )}
                    {i === 1 && (
                      <div className="rs-mini-setup">
                        <span className="rs-mini-setup__ring" style={{ "--p": pct } as CSSProperties}>
                          <b>{pct}%</b>
                        </span>
                        <ul>
                          {STEPS.setup.map((t, j) => (
                            <li key={t} className={j < on ? "is-on" : undefined}>
                              {t}
                              <i />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {i === 2 && (
                      <div className="rs-mini-orders">
                        <span className="rs-mini-orders__head">
                          Bugun: <b key={got}>{12 + got}</b> buyurtma
                        </span>
                        {ORDERS.slice(0, got)
                          .reverse()
                          .map((o) => (
                            <span key={o.id} className="rs-mini-orders__row">
                              <i>🛍</i>
                              <span>
                                <b>#{o.id}</b> · {o.who}
                                <small>{o.src}</small>
                              </span>
                              <em>{o.sum}</em>
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="rs-steps__foot" data-rv="">
          <p>{STEPS.total}</p>
          <a className="rs-btn rs-btn--teal rs-btn--lg rs-hero__go" href={SIGNUP_HREF}>
            {STEPS.cta}
            <span className="rs-btn__arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
