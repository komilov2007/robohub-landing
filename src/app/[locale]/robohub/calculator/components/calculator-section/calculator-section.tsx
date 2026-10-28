import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import MarketplaceCalculator from "../calculator/marketplace-calculator";
import { CALC_SECTION_ID } from "../calculator/constants";
import type { Content } from "../../calculator.content";

// Sahifaning markazi — kalkulyatorning o'zi, tugma ortida emas: tashrif buyuruvchi shu uchun kelgan,
// ochiq endpointlar hisob talab qilmaydi.
export default function CalculatorSection({ calc, dict, locale }: { calc: Content["CALC"]; dict: Content["dict"]; locale: Locale }) {
  return (
    <section className="cc-section" id={CALC_SECTION_ID} aria-labelledby="cc-calc-title">
      <div className="as-wrap">
        <header className="as-sec-head">
          <h2 className="as-h2" id="cc-calc-title" data-rv style={{ "--d": "80ms" } as CSSProperties}>
            {calc.title} <span className="as-h2__accent">{calc.accent}</span>
          </h2>
          <p className="as-sec-lead" data-rv style={{ "--d": "160ms" } as CSSProperties}>
            {calc.lead}
          </p>
        </header>
        {/* Telefonda kalkulyatorning yuqori qismi ko'rinadi, pasti soyaga singib ketadi; "Hisoblash" bosilsa to'liq ochiladi.
            JS'siz: yashirin checkbox + label (calculator.css → .cc-fold). Kompyuterda doim to'liq. */}
        <input type="checkbox" id="cc-fold" className="cc-fold__chk" aria-hidden="true" tabIndex={-1} />
        <div className="cc-section__tool cc-fold">
          <MarketplaceCalculator dict={dict} locale={locale} />
          <label htmlFor="cc-fold" className="cc-fold__btn">
            {dict.calculate ?? "Hisoblash"}
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </label>
        </div>
      </div>
    </section>
  );
}
