import type { CSSProperties } from "react";
import type { Content } from "../../calculator.content";

// "Qanday ishlaydi" — ixcham: uch qadam bitta qatorda, orasida oqayotgan chiziq; har kartada kichik jonli vizual
// (nom yoziladi → AI kategoriya, narxlar, natija). Demo raqamlari — ochiq API'ning haqiqiy javobi (sections.content.ts).
export default function Journey({ steps, demo, cta }: { steps: Content["STEPS"]; demo: Content["S"]["journey"]; cta: string }) {
  const visuals = [
    <div key="0" className="cx-mini">
      <span className="cx-mini__input">
        <span className="cx-type">{demo.typed}</span>
      </span>
      <span className="cx-mini__chip">
        <img loading="lazy" decoding="async" src="/calculator/icons/ai.svg" alt="" width={12} height={12} />
        {demo.category}
      </span>
    </div>,
    <div key="1" className="cx-mini cx-mini--row">
      <span className="cx-mini__field">
        <small>{demo.cost}</small>80 000
      </span>
      <span className="cx-mini__field is-focus">
        <small>{demo.price}</small>150 000
      </span>
    </div>,
    <div key="2" className="cx-mini">
      <span className="cx-mini__profit">
        +26 750 <small>{demo.currency}</small>
      </span>
      <span className="cx-mini__bar">
        <i style={{ flexGrow: 43250 }} />
        <i style={{ flexGrow: 80000 }} />
        <i style={{ flexGrow: 26750 }} />
      </span>
    </div>,
  ];

  return (
    <section className="cx-journey" id="how" aria-labelledby="cx-journey-title">
      <div className="as-wrap">
        <div className="cx-journey__head" data-io>
          <div className="cx-head">
            <h2 id="cx-journey-title">{steps.title}</h2>
          </div>
          <p>{steps.text}</p>
        </div>

        <ol className="cx-steps" data-io>
          {steps.items.map((step, i) => (
            <li key={step.title} className="cx-step" style={{ "--k": i } as CSSProperties}>
              <span className="cx-step__num">{String(i + 1).padStart(2, "0")}</span>
              {visuals[i]}
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="cx-journey__cta" data-io>
          <a className="cx-btn cx-btn--ink" href="#calculator">
            {cta} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
