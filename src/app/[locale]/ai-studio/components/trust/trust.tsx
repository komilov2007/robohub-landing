import type { CSSProperties } from "react";
import CountUp from "../count-up/count-up";
import Icon from "../icon/icon";
import { getC } from "../../content.server";

// Ishonch bloki: to'q panel, marketplace nomlari cheksiz lenta bo'lib oqadi, ostida sanaladigan raqamlar.
export default async function Trust() {
  const { TRUST } = await getC();
  // lenta uzluksiz bo'lishi uchun ro'yxat ikki marta takrorlanadi (ikkinchisi ekran o'quvchidan yashirin)
  const loop = [...TRUST.markets, ...TRUST.markets];
  return (
    <section className="as-trust" aria-labelledby="as-trust-title" data-pause>
      <div className="as-trust__panel">
        <span className="as-trust__glow" aria-hidden="true" />
        <div className="as-wrap">
          <p className="as-eyebrow as-eyebrow--dark" id="as-trust-title" data-rv>
            <span>02</span>
            {TRUST.eyebrow}
          </p>
        </div>

        <div className="as-marquee" data-rv style={{ "--d": "100ms" } as CSSProperties}>
          <ul className="as-marquee__track">
            {[0, 1].map((half) => (
              <li className="as-marquee__set" key={half} aria-hidden={half === 1}>
                {loop.map((m, i) => (
                  <span className="as-mp" key={`${m.name}-${i}`}>
                    <img src={m.icon} alt="" width={40} height={40} loading="lazy" />
                    {m.name}
                    <Icon name="ai" className="as-mp__sep" />
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </div>

        <div className="as-wrap">
          <ul className="as-stats">
            {TRUST.stats.map((s, i) => (
              <li className="as-stat" key={s.label} data-rv style={{ "--d": `${120 + i * 110}ms` } as CSSProperties}>
                <p className="as-stat__num">
                  {s.prefix && <span className="as-stat__aff">{s.prefix}</span>}
                  <CountUp value={s.value} />
                  <span className="as-stat__aff">{s.suffix}</span>
                </p>
                <p className="as-stat__label">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
