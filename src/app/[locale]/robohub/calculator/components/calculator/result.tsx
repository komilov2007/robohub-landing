"use client";

import type { ReactNode } from "react";
import { useT } from "./i18n";
import { Competitors } from "./competitors";
import { formatMoney, formatPercentValue } from "./format";
import { Callout, CIcon, Help, Money } from "./ui";
import type { CalculatorCharge, CalculatorEconomics } from "./types";
import type { MarketplaceCalculatorState } from "./useMarketplaceCalculator";

// Javob paneli — rb-market CalculatorResult: yuqoridan pastga hikoya: keyingi qadam → verdikt →
// pul qayerga ketadi → tekshirmoqchi bo'lganga aniq arifmetika.

const DASH = "—";

/** `kalit: qiymat` qatori. `strong` — ayirma emas, oraliq jami. */
function Line({ label, help, note, strong, children }: { label: string; help?: string; note?: ReactNode; strong?: boolean; children: ReactNode }) {
  const text = <span className={strong ? "cc-line__label is-strong" : "cc-line__label"}>{label}</span>;
  return (
    <div className={"cc-line" + (strong ? " cc-line--strong" : "")}>
      <div className="cc-line__left">
        {help ? <Help text={help}>{text}</Help> : text}
        {typeof note === "string" ? <span className="cc-note">{note}</span> : note}
      </div>
      <div className="cc-line__value">{children}</div>
    </div>
  );
}

/** Yandex jamisi nimadan iborat — kichik va surilgan: ayirma emas, tafsilot. */
function Charges({ charges, currency }: { charges: CalculatorCharge[] | undefined; currency: string }) {
  const { t } = useT();
  if (!charges?.length) return null;
  return (
    <div className="cc-charges">
      {charges.map((charge) => (
        <div key={charge.type} className="cc-charges__row">
          <span>{t(`yandex_charge_${charge.type}`, { defaultValue: charge.type })}</span>
          <Money value={charge.amount} currency={currency} />
        </div>
      ))}
    </div>
  );
}

/** Asosiy javob: bitta sotuv pul keltiradimi va qancha. */
function Verdict({ economics, currency }: { economics: CalculatorEconomics | null; currency: string }) {
  const { t, lang } = useT();
  const profit = economics?.profit ?? null;
  const state = profit === null ? "waiting" : profit < 0 ? "loss" : "profit";

  return (
    <div className={`cc-verdict is-${state}`}>
      <p className="cc-verdict__title">
        {state !== "waiting" && <CIcon name={state === "profit" ? "check" : "alert"} />}
        {t(`calculator_verdict_${state}`)}
      </p>
      <p className="cc-verdict__num" aria-live="polite">
        {profit === null ? (
          DASH
        ) : (
          <>
            {profit < 0 ? "−" : "+"}
            {formatMoney(Math.abs(profit), lang)} <small>{currency}</small>
          </>
        )}
      </p>
      {economics && profit !== null && (
        <>
          {state === "loss" && <p className="cc-verdict__hint">{t("calculator_loss_hint")}</p>}
          <div className="cc-verdict__kpis">
            <Help text={t("calculator_help_margin")}>
              <span>
                {t("margin")}: <b>{formatPercentValue(economics.margin ?? 0, lang)}</b>
              </span>
            </Help>
            <Help text={t("calculator_help_roi")}>
              <span>
                {t("roi")}: <b>{formatPercentValue(economics.roi ?? 0, lang)}</b>
              </span>
            </Help>
            {economics.break_even_price !== null && (
              <span>
                {t("calculator_competitors_economics_break_even")}: <b>{formatMoney(economics.break_even_price, lang)}</b>
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}

type SegmentKey = "marketplace" | "expenses" | "cost" | "profit";

/**
 * Xaridor puli qayerga ketadi — to'rt bo'lakli bitta chiziq. Marketpleys olgani bitta bo'lak: sotuvchi uchun u bitta qaror.
 * Zararda bo'laklar narxdan oshadi: chiziq xarajatlar uzunligida, belgi pul tugagan joyni ko'rsatadi.
 */
function PriceSplit({ price, costPrice, economics, currency }: { price: number; costPrice: number; economics: CalculatorEconomics; currency: string }) {
  const { t, lang } = useT();
  const profit = economics.profit ?? 0;
  const pieces = (
    [
      {
        key: "marketplace",
        value: economics.commission_amount + economics.logistics_fee + economics.payment_fee + (economics.discount_amount ?? 0),
      },
      { key: "expenses", value: economics.expenses },
      { key: "cost", value: costPrice },
      { key: "profit", value: Math.max(profit, 0) },
    ] as { key: SegmentKey; value: number }[]
  ).filter((piece) => piece.value > 0);

  const total = pieces.reduce((sum, piece) => sum + piece.value, 0);
  if (total <= 0 || price <= 0) return null;

  const loss = Math.max(total - price, 0);
  const share = (value: number) => formatPercentValue((value / price) * 100, lang, 0);
  const label = (key: SegmentKey) => t(`calculator_split_${key}`);

  return (
    <div className="cc-panel">
      <p className="cc-panel__title">{t("calculator_split_title")}</p>
      <div className={"cc-split" + (loss ? " has-loss" : "")}>
        <div
          className="cc-split__bar"
          role="img"
          aria-label={pieces.map((piece) => `${label(piece.key)} ${share(piece.value)}`).join(", ")}
        >
          {pieces.map((piece) => (
            <span
              key={piece.key}
              className={`cc-split__seg is-${piece.key}`}
              style={{ flexGrow: piece.value }}
              title={`${label(piece.key)}: ${formatMoney(Math.round(piece.value), lang)} ${currency} (${share(piece.value)})`}
            />
          ))}
        </div>
        {loss > 0 && (
          <span className="cc-split__edge" style={{ left: `${(price / total) * 100}%` }} title={t("calculator_split_price_edge")} />
        )}
      </div>
      <ul className="cc-legend">
        {pieces.map((piece) => (
          <li key={piece.key}>
            <span className={`cc-legend__dot is-${piece.key}`} aria-hidden="true" />
            <span className="cc-legend__label">{label(piece.key)}</span>
            <span className="cc-note">{share(piece.value)}</span>
            <Money value={Math.round(piece.value)} currency={currency} className="cc-legend__value" />
          </li>
        ))}
        {loss > 0 && (
          <li className="is-loss">
            <CIcon name="alert" className="cc-legend__alert" />
            <span className="cc-legend__label">{t("calculator_split_loss")}</span>
            <span className="cc-note">{share(loss)}</span>
            <Money value={Math.round(loss)} prefix="−" currency={currency} className="cc-legend__value" />
          </li>
        )}
      </ul>
      {loss > 0 && (
        <p className="cc-note">
          {t("calculator_split_over", { amount: `${formatMoney(Math.round(loss), lang)} ${currency}` })}
        </p>
      )}
    </div>
  );
}

export function CalculatorResult({ calculator }: { calculator: MarketplaceCalculatorState }) {
  const { t, lang } = useT();
  const { result, economics, batch, currencyLabel, price, costPrice, notice, model, isHeld, ownDelivery, dimensionsIncomplete } =
    calculator;

  const percent = (value: number | null | undefined) =>
    value === null || value === undefined ? DASH : formatPercentValue(value, lang);

  const commission = result?.commission ?? null;
  const logistics = result?.logistics ?? null;
  const expenses = result?.expenses ?? null;
  const scheme = t(`scheme_${model}`);
  const discountAmount = economics && "discount_amount" in economics ? (economics.discount_amount ?? null) : null;
  const isDbs = model === "dbs";
  /** DBS'da marketpleys yetkazmaydi va hech narsa ushlamaydi — "0" qatori faqat chalg'itadi. */
  const showLogistics = !!logistics && (!isDbs || !!economics?.logistics_fee);

  const logisticsNote = (() => {
    if (!logistics) return undefined;
    if (dimensionsIncomplete) return t("calculator_dimensions_needed");
    const parts = [logistics.dimensions_missing ? t("calculator_no_dimensions") : null, logistics.warehouse ?? null].filter(Boolean);
    return parts.length ? parts.join(" · ") : undefined;
  })();

  const batchProfit = batch?.profit ?? null;

  return (
    <div className="cc-result">
      <p className="cc-result__title">{t("calculation")}</p>

      {notice && <Callout {...notice} />}

      {/* Ushlab turilgan raqamlar oldingi kiritishniki — o'chirilmaydi (panel sakramasin), xira ko'rsatiladi */}
      <div className={"cc-result__body" + (isHeld ? " is-held" : "")} aria-busy={isHeld}>
        <Verdict economics={economics} currency={currencyLabel} />

        {!!economics && economics.profit !== null && price !== null && costPrice !== null && (
          <PriceSplit price={price} costPrice={costPrice} economics={economics} currency={currencyLabel} />
        )}

        <div className="cc-panel">
          <p className="cc-panel__title">{t("calculator_details_title")}</p>

          <Line label={t("calculator_line_price")}>
            <Money value={price} currency={currencyLabel} />
          </Line>

          {discountAmount !== null && (
            <Line label={t("calculator_line_uzum_discount")} note={percent(result?.uzum_discount?.required_percent)}>
              <Money prefix="−" currency={currencyLabel} value={discountAmount} />
            </Line>
          )}

          {/* Stavka kategoriya tanlangan zahoti keladi — narxdan oldin */}
          <Line
            label={t("calculator_line_commission")}
            help={t("calculator_help_commission")}
            note={
              commission === null ? undefined : (
                <span className="cc-line__chips">
                  <span className="cc-rate">{percent(commission)}</span>
                  <span className="cc-note">{scheme}</span>
                </span>
              )
            }
          >
            <Money prefix="−" currency={currencyLabel} value={economics?.commission_amount} />
          </Line>

          {showLogistics && (
            <>
              <Line label={t("calculator_logistics_fee")} help={t("calculator_help_logistics")} note={logisticsNote}>
                {economics ? (
                  <Money currency={currencyLabel} value={economics.logistics_fee} prefix={economics.logistics_fee ? "−" : undefined} />
                ) : (
                  DASH
                )}
              </Line>
              {!!economics && <Charges charges={logistics?.charges?.logistics} currency={currencyLabel} />}
            </>
          )}

          {!!economics?.payment_fee && (
            <>
              <Line label={t("calculator_payment_services")} help={t("calculator_help_payment")}>
                <Money prefix="−" currency={currencyLabel} value={economics.payment_fee} />
              </Line>
              <Charges charges={logistics?.charges?.payment} currency={currencyLabel} />
            </>
          )}

          <hr className="cc-hr" />

          {/* payout — hisobga tushadigani; undan keyin ayriladiganlar foydagacha o'qiladi */}
          <Line strong label={t("calculator_line_payout")} help={t("calculator_help_payout")}>
            <Money currency={currencyLabel} value={economics?.payout} />
          </Line>

          {!!economics && isDbs && (
            <Line label={t("calculator_own_delivery_line")} note={scheme}>
              <Money currency={currencyLabel} value={ownDelivery} prefix={ownDelivery ? "−" : undefined} />
            </Line>
          )}

          {!!economics && economics.expenses - ownDelivery > 0 && (
            <Line
              label={t("calculator_line_expenses")}
              note={
                expenses
                  ? t("calculator_expenses_note", {
                      tax: percent(expenses.tax_percent),
                      amount: formatMoney(expenses.per_product, lang),
                    })
                  : undefined
              }
            >
              <Money prefix="−" currency={currencyLabel} value={economics.expenses - ownDelivery} />
            </Line>
          )}

          <Line label={t("calculator_line_cost")}>
            {costPrice === null ? t("not_specified") : <Money prefix="−" currency={currencyLabel} value={costPrice} />}
          </Line>
        </div>

        {!!batch && batch.quantity > 1 && (
          <div className="cc-panel">
            <p className="cc-panel__title">{t("calculator_batch_title", { quantity: batch.quantity })}</p>
            <Line label={t("calculator_batch_investment")}>
              <Money value={batch.investment} currency={currencyLabel} />
            </Line>
            <Line label={t("calculator_batch_revenue")}>
              <Money value={batch.revenue} currency={currencyLabel} />
            </Line>
            <Line strong label={t("calculator_batch_profit")}>
              <Money
                currency={currencyLabel}
                value={batchProfit === null ? null : Math.abs(batchProfit)}
                prefix={batchProfit !== null && batchProfit < 0 ? "−" : "+"}
                className={batchProfit !== null && batchProfit < 0 ? "is-loss" : "is-profit"}
              />
            </Line>
          </div>
        )}
      </div>

      {/* Xira o'ramdan tashqarida: solishtirishning eskirganlik belgisi o'zi alohida */}
      <Competitors calculator={calculator} />

      <p className="cc-note">{t("calculator_excludes_note")}</p>
    </div>
  );
}
