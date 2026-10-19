import type { CSSProperties } from "react";
import { ANALYTICS, PINGS } from "../../robosell.content";
import Section from "../section/section";

// 5-bo'lim. To'q teal "kontrast" pufakcha: chapda va'da va bandlar, o'ngda dashboard
// (KPI, soatlar bo'yicha ustunlar — eng gavjum soatlar yashil, top mahsulotlar). Raqamlar — NAMUNA.
export default function Analytics() {
  const a = ANALYTICS;
  const max = Math.max(...a.hours);
  const peak = [...a.hours].sort((x, y) => y - x).slice(0, 3);
  const topMax = a.top[0].n;
  return (
    <Section id="analytics" side="out" tone="teal" ping={PINGS.analytics} labelledBy="an-title">
      <div className="rs-wrap rs-an">
        <div className="rs-an__text">
          <p className="rs-eyebrow rs-eyebrow--dark" data-rv="">{a.eyebrow}</p>
          <h2 className="rs-h2" id="an-title" data-rv="">
            {a.title}
          </h2>
          <p className="rs-lead" data-rv="">{a.lead}</p>
          <ul className="rs-checks" data-rv="">
            {a.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          {/* NAMUNA: demo havolasi hali yo'q */}
          <a className="rs-btn rs-btn--yellow rs-btn--lg" href="#how-it-works" data-rv="">
            {a.cta}
          </a>
        </div>

        <div className="rs-board" data-rv="" role="img" aria-label="Analitika paneli namunasi: foyda, o‘rtacha chek, qaytgan mijozlar, soatlar bo‘yicha buyurtmalar va top mahsulotlar">
          <div className="rs-board__kpis" aria-hidden="true">
            {a.kpis.map((k) => (
              <span key={k.label}>
                <small>{k.label}</small>
                <b>{k.value}</b>
                <i>{k.delta}</i>
              </span>
            ))}
          </div>
          <div className="rs-board__row" aria-hidden="true">
            <div className="rs-board__chart">
              <small>{a.hoursLabel}</small>
              <div className="rs-bars">
                {a.hours.map((h, i) => (
                  <span key={i} className={peak.includes(h) ? "is-peak" : undefined} style={{ "--h": h / max, "--i": i } as CSSProperties}>
                    <i />
                    <em>{a.hoursFrom + i}</em>
                  </span>
                ))}
              </div>
            </div>
            <div className="rs-board__top">
              <small>{a.topLabel}</small>
              <ol>
                {a.top.map((t, i) => (
                  <li key={t.name} style={{ "--w": t.n / topMax, "--i": i } as CSSProperties}>
                    <span>{t.name}</span>
                    <b>{t.n}</b>
                    <i />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
