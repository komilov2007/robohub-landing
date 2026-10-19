import type { CSSProperties } from "react";
import { FEATURES, PINGS } from "../../robosell.content";
import Section from "../section/section";

// 4-bo'lim. Bento grid: oltita blok har xil o'lchamda, har birida o'z mini-ko'rinishi
// (buyurtmalar oqimi, Excel import, to'lov usullari, kuryer yo'li, rollar, push-xabar).
// Mobilda — gorizontal surish (scroll-snap). Animatsiyalar faqat bo'lim ko'rinib turganda ishlaydi.
export default function Features() {
  const f = FEATURES;
  return (
    <Section id="features" side="in" tone="white" ping={PINGS.features} labelledBy="features-title">
      <div className="rs-wrap">
        <header className="rs-head rs-head--center">
          <p className="rs-eyebrow" data-rv="">{f.eyebrow}</p>
          <h2 className="rs-h2" id="features-title" data-rv="">
            {f.title}
          </h2>
        </header>

        <p className="rs-swipe-hint" aria-hidden="true">
          {f.hint} <span>→</span>
        </p>
        <ul className="rs-bento">
          <li className="rs-tile rs-tile--orders" data-rv="">
            <h3>{f.orders.title}</h3>
            <p>{f.orders.text}</p>
            <div className="rs-feed__stats" aria-hidden="true">
              {f.orders.stats.map((s) => (
                <span key={s.label}>
                  <b>{s.value}</b>
                  <small>{s.label}</small>
                </span>
              ))}
            </div>
            <div className="rs-feed" aria-hidden="true">
              {f.orders.feed.map((o, i) => (
                <div className="rs-feed__row" key={o.id} style={{ "--i": i } as CSSProperties}>
                  <b>{o.id}</b>
                  <span className="rs-feed__who">
                    {o.who}
                    <small>{o.src}</small>
                  </span>
                  <span className="rs-feed__sum">{o.sum}</span>
                  <span className="rs-feed__state">
                    {f.orders.states.map((s, j) => (
                      <em key={s} className={`s${j}`}>
                        {s}
                      </em>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </li>

          <li className="rs-tile rs-tile--products" data-rv="">
            <h3>{f.products.title}</h3>
            <p>{f.products.text}</p>
            <div className="rs-import" aria-hidden="true">
              <span className="rs-import__file">
                <i>XLS</i>
                {f.products.file}
              </span>
              <span className="rs-import__bar">
                <i />
              </span>
            </div>
            <ul className="rs-tags">
              {f.products.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </li>

          <li className="rs-tile rs-tile--pay" data-rv="">
            <h3>{f.pay.title}</h3>
            <ul className="rs-paylist">
              {f.pay.list.map((p, i) => (
                <li key={p} style={{ "--i": i } as CSSProperties}>
                  {p}
                </li>
              ))}
            </ul>
          </li>

          <li className="rs-tile rs-tile--delivery" data-rv="">
            <h3>{f.delivery.title}</h3>
            <div className="rs-route" aria-hidden="true">
              <i className="rs-route__a" />
              <span className="rs-route__go">
                <i />
              </span>
              <i className="rs-route__b" />
            </div>
            <ul className="rs-tags">
              {f.delivery.list.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </li>

          <li className="rs-tile rs-tile--team" data-rv="">
            <h3>{f.team.title}</h3>
            <p>{f.team.text}</p>
            <ul className="rs-roles">
              {f.team.roles.map((r) => (
                <li key={r.name}>
                  <i aria-hidden="true">{r.i}</i>
                  {r.name}
                </li>
              ))}
            </ul>
            <p className="rs-branches" aria-hidden="true">
              {f.team.branches.map((b) => (
                <span key={b}>{b}</span>
              ))}
            </p>
          </li>

          <li className="rs-tile rs-tile--mkt" data-rv="">
            <h3>{f.marketing.title}</h3>
            <p>{f.marketing.text}</p>
            <div className="rs-push" aria-hidden="true">
              <span className="rs-push__ico">R</span>
              <span>
                <b>Robosell Shop</b>
                {f.marketing.push}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </Section>
  );
}
