"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { Locale } from "@/i18n/config";
import { CalcI18n, useT } from "./i18n";
import { CalculatorCompare } from "./compare";
import { CalculatorFields } from "./fields";
import { CalculatorResult } from "./result";
import { CIcon, Spinner } from "./ui";
import { formatMoney, formatPercentValue } from "./format";
import { readCalculatorParams, type CalculatorParams } from "./params";
import { useMarketplaceCalculator } from "./useMarketplaceCalculator";
import { CALCULATOR_MARKETPLACES, MARKETPLACE_META, REGISTER_HREF } from "./constants";
import type { CalcDict } from "./calculator.messages";
import type { CalculatorEconomics, CalculatorMarketplace } from "./types";

// Kalkulyatorning o'zi — rb-market MarketplaceCalculator (variant="inline", mehmon): tablar, ikki panel
// (forma | yopishqoq javob), 4 marketpleysda solishtirish, kabinet taklifi va telefonda pastki javob chizig'i.
// Barcha so'rovlar — api.robohub.uz/api/public/* (tokensiz, hech narsa saqlanmaydi).

/** Javob bitta qatorda: foyda yoki zarar + marja. */
function Summary({ economics, currency, className = "" }: { economics: CalculatorEconomics | null; currency: string; className?: string }) {
  const { t, lang } = useT();
  const profit = economics?.profit ?? null;
  if (!economics || profit === null) return null;
  const loss = profit < 0;
  return (
    <div className={`cc-summary ${loss ? "is-loss" : "is-profit"} ${className}`} role="status">
      <span>{t(loss ? "calculator_summary_loss" : "calculator_summary_profit")}</span>
      <b>
        {loss ? "−" : "+"}
        {formatMoney(Math.abs(profit), lang)} <small>{currency}</small>
      </b>
      <span>
        · {t("margin")} {formatPercentValue(economics.margin ?? 0, lang)}
      </span>
    </div>
  );
}

/** Marketpleys tablari — logotip bilan (nomi brend, tarjima qilinmaydi). */
function Marketplaces({ value, onChange }: { value: CalculatorMarketplace; onChange: (next: CalculatorMarketplace) => void }) {
  return (
    <div className="cc-tabs" role="tablist">
      {CALCULATOR_MARKETPLACES.map((option) => {
        const meta = MARKETPLACE_META[option];
        return (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={value === option}
            className={"cc-tabs__tab" + (value === option ? " is-active" : "")}
            onClick={() => onChange(option)}
          >
            <img src={meta.icon} alt="" width={22} height={22} />
            {meta.label}
          </button>
        );
      })}
    </div>
  );
}

function CalculatorBody({ params }: { params: CalculatorParams }) {
  const { t } = useT();
  const calculator = useMarketplaceCalculator({ marketplaces: CALCULATOR_MARKETPLACES, params });
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Telefondagi pastki chiziq faqat kalkulyator ekranda bo'lganda — sahifaning boshqa bo'limlarini to'smasin.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "0px 0px -30% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="cc-card" ref={rootRef}>
      <div className="cc-card__head">
        <div className="cc-card__title">
          <span className="cc-card__ico">
            <CIcon name="calculator" />
          </span>
          <h2>{t("calculator")}</h2>
          {calculator.isCalculating && <Spinner size={16} />}
        </div>
        <div className="cc-card__actions">
          <Summary economics={calculator.economics} currency={calculator.currencyLabel} className="cc-summary--head" />
          <button type="button" className="cc-btn cc-btn--ghost cc-btn--sm" onClick={calculator.clearAll}>
            {t("calculator_clear")}
          </button>
        </div>
      </div>

      <Marketplaces value={calculator.marketplace} onChange={calculator.handleMarketplace} />
      <p className="cc-note">{t("calculator_currency_note")}</p>

      <div className="cc-panes">
        <CalculatorFields calculator={calculator} />
        {/* Ikki quti: yopishqoq element o'z bloki ichida yuradi — katak to'liq balandlikda qolishi kerak */}
        <div className="cc-panes__aside">
          <div className="cc-panes__sticky">
            <CalculatorResult calculator={calculator} />
          </div>
        </div>
      </div>

      <CalculatorCompare calculator={calculator} />

      {/* Kabinet taklifi — faqat kalkulyator nimanidir isbotlagach (haqiqiy foyda ekranda) */}
      {calculator.economics?.profit !== null && calculator.economics?.profit !== undefined && (
        <div className="cc-cta">
          <div>
            <b>{t("calc_cta_title")}</b>
            <p>{t("calc_cta_text")}</p>
          </div>
          <a className="cc-btn cc-btn--primary" href={REGISTER_HREF}>
            {t("calc_cta_button")}
          </a>
        </div>
      )}

      <p className="cc-note">{t("calculator_nothing_is_saved")}</p>

      {inView && <Summary economics={calculator.economics} currency={calculator.currencyLabel} className="cc-summary--bar" />}
    </div>
  );
}

const subscribeNoop = () => () => {};

export default function MarketplaceCalculator({ dict, locale }: { dict: CalcDict; locale: Locale }) {
  // Havola (?marketplace=wb&price=…) faqat ochilishda o'qiladi. SSR va gidratsiyada — bo'sh;
  // gidratsiyadan keyin parametr bo'lsa kalkulyator shu parametrlar bilan qayta o'rnatiladi.
  const search = useSyncExternalStore(subscribeNoop, () => window.location.search, () => "");
  const params = useMemo(() => readCalculatorParams(search, CALCULATOR_MARKETPLACES), [search]);

  return (
    <CalcI18n dict={dict} locale={locale}>
      <CalculatorBody key={search ? "linked" : "blank"} params={params} />
    </CalcI18n>
  );
}
