"use client";

import { useState } from "react";
import { useT } from "./i18n";
import { useQuery } from "./query";
import { Money, Spinner } from "./ui";
import { formatPercentValue } from "./format";
import { postPublicCalculator } from "./api";
import { CALCULATOR_MARKETPLACES, MARKETPLACE_META, REGISTER_HREF } from "./constants";
import type { CalculatorMarketplace } from "./types";
import type { MarketplaceCalculatorState } from "./useMarketplaceCalculator";

// Bitta mahsulot to'rttala marketpleysda yonma-yon — rb-market CalculatorCompare + useCalculatorCompare.
// So'ralganda ochiladi (yana to'rtta so'rov). Har qator o'z marketpleysining kategoriyasi bilan: tanlangani yoki AI tavsiyasi.
// Kalitlar kalkulyatorning o'zinikidek — ochiq tab keshdan keladi, ikkinchi so'rov ketmaydi.

type Entry = MarketplaceCalculatorState["comparePayloads"][number];

/** Hook soni o'zgarmasligi uchun — har marketpleysga bitta, kirish bo'lmasa o'chiq. */
function useRow(entry: Entry | undefined, enabled: boolean) {
  // Yandex og'irliksiz 400 qaytaradi — bunday so'rov umuman yuborilmaydi, qator nima kerakligini aytadi.
  const missing = entry?.marketplace === "yandex_market" && !entry.payload.weight ? "calculator_compare_needs_weight" : null;
  const query = useQuery({
    enabled: enabled && !!entry && !missing,
    key: ["calculator", entry?.marketplace, entry?.payload],
    fn: () => postPublicCalculator(entry!.marketplace, entry!.payload),
  });
  return entry
    ? {
        marketplace: entry.marketplace,
        category: entry.category,
        loading: query.isFetching,
        failed: query.isError,
        economics: query.data?.economics ?? null,
        commission: query.data?.commission ?? null,
        missing,
      }
    : null;
}

export function CalculatorCompare({ calculator }: { calculator: MarketplaceCalculatorState }) {
  const { t, lang } = useT();
  const [open, setOpen] = useState(false);
  const byMarketplace = (key: CalculatorMarketplace) => calculator.comparePayloads.find((e) => e.marketplace === key);
  const rows = [
    useRow(byMarketplace(CALCULATOR_MARKETPLACES[0]), open),
    useRow(byMarketplace(CALCULATOR_MARKETPLACES[1]), open),
    useRow(byMarketplace(CALCULATOR_MARKETPLACES[2]), open),
    useRow(byMarketplace(CALCULATOR_MARKETPLACES[3]), open),
  ]
    .filter((row) => row !== null)
    // Eng foydalisi tepada — "qayerda sotish arziydi" javobi birinchi qator
    .sort((a, b) => (b.economics?.profit ?? -Infinity) - (a.economics?.profit ?? -Infinity));

  // Foyda bo'lmaguncha solishtiradigan narsa yo'q: uni narx va tannarx beradi
  const ready = calculator.comparePayloads.length > 1 && calculator.costPrice !== null;
  if (!ready) return null;

  if (!open) {
    return (
      <button type="button" className="cc-btn cc-btn--ghost cc-compare-open" onClick={() => setOpen(true)}>
        {t("calculator_compare_open")}
      </button>
    );
  }

  return (
    <div className="cc-compare">
      <p className="cc-panel__title">{t("calculator_compare_title")}</p>
      {rows.map((row, i) => {
        const profit = row.economics?.profit ?? null;
        const loss = profit !== null && profit < 0;
        const meta = MARKETPLACE_META[row.marketplace];
        return (
          <div key={row.marketplace} className={"cc-compare__row" + (i === 0 && profit !== null && !loss ? " is-best" : "")}>
            <div className="cc-compare__mp">
              <img loading="lazy" decoding="async" src={meta.icon} alt="" width={28} height={28} />
              <div>
                <b>{meta.label}</b>
                <span className="cc-note">{row.category.path[row.category.path.length - 1]?.name}</span>
              </div>
            </div>
            <div className="cc-compare__profit">
              {row.loading ? (
                <Spinner size={14} />
              ) : profit === null ? (
                <span className="cc-note">
                  {t(row.missing ?? (row.failed ? "calculator_compare_failed" : "calculator_compare_needs_size"))}
                </span>
              ) : (
                <Money
                  value={Math.abs(profit)}
                  prefix={loss ? "−" : "+"}
                  currency={calculator.currencyLabel}
                  className={loss ? "is-loss is-strong" : "is-profit is-strong"}
                />
              )}
            </div>
            <div className="cc-compare__meta cc-note">
              {t("margin")}{" "}
              {row.economics?.margin === null || row.economics?.margin === undefined ? "—" : formatPercentValue(row.economics.margin, lang)}
              {row.commission === null ? "" : ` · ${t("commission")} ${formatPercentValue(row.commission, lang)}`}
            </div>
          </div>
        );
      })}
      <p className="cc-note">{t("calculator_compare_note")}</p>
      <div className="cc-compare__cta">
        <b>{t("calculator_compare_cta_text")}</b>
        <a className="cc-btn cc-btn--primary cc-btn--sm" href={REGISTER_HREF}>
          {t("calculator_compare_cta")}
        </a>
      </div>
    </div>
  );
}
