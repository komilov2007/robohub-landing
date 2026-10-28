import { type Content } from "../../calculator.content";
import HubOrbit from "@/components/hub-orbit/hub-orbit";

// Yakuniy taklif — ixcham karta: chapda sarlavha, matn va tugmalar; o'ngda Robohub orbitasi (umumiy
// komponent — Robohub yakuniy kartasidagi bilan bir xil). Kartaning chetidan sekin aylanuvchi mint nur o'tadi.
// home — Robohub landingi joriy tilda: "Hoziroq boshlash" shu yerga olib boradi (yangi oynada)
export default function Finale({ final, home }: { final: Content["FINAL"]; home: string }) {
  return (
    <section className="cx-finale" id="start" aria-labelledby="cx-finale-title">
      <div className="as-wrap">
        <div className="cx-finale__card" data-io>
          <div className="cx-finale__copy">
            <h2 id="cx-finale-title">
              {final.title} <span>{final.accent}</span>
            </h2>
            <p>{final.lead}</p>
            <div className="cx-finale__cta">
              <a className="cx-btn cx-btn--mint" href={home} target="_blank" rel="noopener">
                {final.cta} <span aria-hidden="true">→</span>
              </a>
              <a className="cx-btn cx-btn--ghost" href="#calculator">
                {final.back}
              </a>
            </div>
          </div>
          <HubOrbit className="cx-finale__hub" />
        </div>
      </div>
    </section>
  );
}
