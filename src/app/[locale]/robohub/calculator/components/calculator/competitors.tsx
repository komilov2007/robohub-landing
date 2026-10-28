"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { intlLocale } from "@/i18n/config";
import { useT } from "./i18n";
import { formatMoney } from "./format";
import { Callout, CIcon, Money, Spinner } from "./ui";
import { API_ERROR_CODES, MIN_ROI_PERCENT } from "./constants";
import { competitorZone, parseCompetitorLink } from "./competitor-links";
import type { CalculatorCompetitorsState } from "./useCalculatorCompetitors";
import type { MarketplaceCalculatorState } from "./useMarketplaceCalculator";
import type { CalculatorMarketplace, Competitor, CompetitorEconomics, Competitors as CompetitorsData } from "./types";

// Raqobatchilar — rb-market CalculatorCompetitors va bolalari: taklif → qidiruv → javob → rad etilgan.
// Raqamlar o'zgarsa javob qoladi, lekin "oldingi kiritilganlar uchun" deydi — har tugmada qayta qidirmaslik shart.

/** Bundan kam kartada foiz — soxta aniqlik; verdikt sonni aytadi. */
const PERCENT_FROM = 10;
const SHOWN_AT_FIRST = 5;
const SAME_PRICE_PERCENT = 1;
/** Bozor o'rtasidan ±50% — shkalaning to'liq uzunligi. */
const TRACK_REACH = 0.5;

/** Qidirish taklifi — tugma: javob vitrinani qidirishga tushadi, yozilayotganda emas, so'ralganda. */
function CompetitorsCta({ competitors }: { competitors: CalculatorCompetitorsState }) {
  const { t } = useT();
  const { blocked, compare, loading, links, mode } = competitors;
  const byLinks = mode === "links";
  return (
    <div className="cc-ccta">
      <p className="cc-panel__title">{t("calculator_competitors_cta_title")}</p>
      <p className="cc-text">{t(byLinks ? "calculator_competitors_cta_text_links" : "calculator_competitors_cta_text")}</p>
      <button type="button" className="cc-btn cc-btn--primary" onClick={compare} disabled={loading || !!blocked}>
        {loading ? <Spinner size={14} /> : <CIcon name="compare" />}
        {t(
          loading
            ? "calculator_competitors_comparing"
            : byLinks
              ? "calculator_competitors_compare_links"
              : "calculator_competitors_compare",
          { count: links.length },
        )}
      </button>
      {!!blocked && !loading && <p className="cc-note">{t(blocked)}</p>}
    </div>
  );
}

/** Narx yaxshimi — o'rtacha narxdan masofa bo'yicha (narx oralig'i bo'yicha emas: bitta qimmat karta shkalani buzadi). */
function Range({
  prices,
  price,
  currency,
  count,
  cheaperCount,
  pricierCount,
  byLinks,
}: {
  prices: NonNullable<CompetitorsData["prices"]>;
  price: number;
  currency: string;
  count: number;
  cheaperCount: number;
  pricierCount: number;
  byLinks: boolean;
}) {
  const { t, lang } = useT();
  const money = (value: number) => `${formatMoney(Math.round(value), lang)} ${currency}`;
  const deviation = prices.median > 0 ? price / prices.median - 1 : 0;
  const at = Math.min(100, Math.max(0, 50 + (deviation / TRACK_REACH) * 50));
  const zone = competitorZone(price, prices.median);
  const anchor = at < 15 ? "0%" : at > 85 ? "-100%" : "-50%";

  return (
    <div className="cc-range">
      <div
        className="cc-range__track"
        role="img"
        aria-label={`${t(`calculator_competitors_zone_${zone}`)}. ${t("calculator_competitors_you")} ${money(price)}. ${t("calculator_competitors_middle")} ${money(prices.median)}`}
        style={{ "--at": `${at}%`, "--anchor": anchor } as CSSProperties}
      >
        <span className={`cc-range__pill is-${zone}`}>
          {t("calculator_competitors_you")} {money(price)}
        </span>
        <span className="cc-range__stem" />
        <span className="cc-range__bar" />
        <span className={`cc-range__dot is-${zone}`} />
      </div>
      <div className="cc-range__bands">
        {(["cheap", "market", "pricey"] as const).map((band) => (
          <span key={band} className={"cc-range__band" + (band === zone ? ` is-on is-${zone}` : "")}>
            {t(`calculator_competitors_zone_${band}`)}
            {band === "market" && (
              <small>
                {t("calculator_competitors_middle")} {money(prices.median)}
              </small>
            )}
          </span>
        ))}
      </div>
      <p className="cc-note">
        {t(byLinks ? "calculator_competitors_summary_links" : "calculator_competitors_summary", {
          count,
          cheaper: cheaperCount,
          pricier: pricierCount,
        })}
      </p>
    </div>
  );
}

/** Bozorning o'z narxlarida shu sotuvchi qancha topardi. */
function Economics({ economics, prices, currency }: { economics: CompetitorEconomics | null; prices: CompetitorsData["prices"]; currency: string }) {
  const { t, lang } = useT();
  const money = (value: number) => `${formatMoney(Math.round(value), lang)} ${currency}`;
  const row = (label: string, result: { profit: number } | null) => (
    <div className="cc-line">
      <span className="cc-line__label">{label}</span>
      {result === null ? (
        <span>—</span>
      ) : (
        <b className={result.profit >= 0 ? "is-profit" : "is-loss"}>
          {t(result.profit >= 0 ? "calculator_competitors_economics_profit" : "calculator_competitors_economics_loss", {
            amount: money(Math.abs(result.profit)),
          })}
        </b>
      )}
    </div>
  );

  return (
    <div className="cc-panel">
      <p className="cc-panel__title">{t("calculator_competitors_economics_title")}</p>
      {economics === null || prices === null ? (
        <p className="cc-note">{t("calculator_competitors_economics_need_cost")}</p>
      ) : (
        <>
          <div className="cc-line">
            <span className="cc-line__label">{t("calculator_competitors_economics_break_even")}</span>
            <Money value={economics.break_even_price} currency={currency} className="is-strong" />
          </div>
          <p className="cc-note">{t("calculator_competitors_economics_break_even_hint")}</p>
          {row(t("calculator_competitors_economics_at_median", { price: money(prices.median) }), economics.at_median)}
          {row(t("calculator_competitors_economics_at_min", { price: money(prices.min) }), economics.at_min)}
        </>
      )}
    </div>
  );
}

type Sort = "relevance" | "price" | "reviews";
type Row =
  | { kind: "competitor"; key: string; product: Competitor }
  | { kind: "you"; key: "you"; price: number }
  | { kind: "unavailable"; key: string; url: string; nmId: string };

/** Kartalar va ular orasida sotuvchining o'z taklifi — har farq foizi undan o'lchanadi. */
function Table({
  competitors,
  price,
  currency,
  marketplace,
  byLinks,
}: {
  competitors: CompetitorsData;
  price: number;
  currency: string;
  marketplace: CalculatorMarketplace;
  byLinks: boolean;
}) {
  const { t, lang } = useT();
  const [sort, setSort] = useState<Sort>("relevance");
  const [expanded, setExpanded] = useState(false);
  const isWb = marketplace === "wb";
  const { products, unavailable_links: unavailableLinks = [] } = competitors;

  const rows = useMemo<Row[]>(() => {
    const cards: Row[] = products.map((product) => ({ kind: "competitor", key: String(product.id), product }));
    const you: Row = { kind: "you", key: "you", price };
    const missing: Row[] = unavailableLinks.map((url) => ({
      kind: "unavailable",
      key: url,
      url,
      nmId: (marketplace !== "ozon" && parseCompetitorLink(marketplace, url)?.id) || url,
    }));
    const priceOf = (row: Row) => (row.kind === "you" ? row.price : row.kind === "competitor" ? row.product.price : 0);
    if (sort === "price") return [...[...cards, you].sort((a, b) => priceOf(a) - priceOf(b)), ...missing];
    if (sort === "reviews") {
      const reviewed = [...cards].sort(
        (a, b) => ((b.kind === "competitor" ? b.product.reviews : 0) ?? 0) - ((a.kind === "competitor" ? a.product.reviews : 0) ?? 0),
      );
      return [you, ...reviewed, ...missing];
    }
    return [you, ...cards, ...missing];
  }, [products, unavailableLinks, price, sort, marketplace]);

  const visible = expanded ? rows : rows.slice(0, SHOWN_AT_FIRST);
  const hidden = Math.max(rows.length - SHOWN_AT_FIRST, 0);

  const sorts: { value: Sort; label: string }[] = [
    { value: "relevance", label: byLinks ? "calculator_competitors_sort_added" : "calculator_competitors_sort_relevance" },
    { value: "price", label: "calculator_competitors_sort_cheapest" },
    ...(isWb ? [] : [{ value: "reviews" as const, label: "calculator_competitors_sort_reviews" }]),
  ];

  const difference = (value: number) => {
    if (price <= 0) return null;
    const gap = value - price;
    const percent = Math.round((Math.abs(gap) / price) * 100);
    return percent < SAME_PRICE_PERCENT ? { percent, gap: 0, equal: true } : { percent, gap, equal: false };
  };

  const asOf = (date?: string) => {
    const week = date ? new Date(date) : null;
    return week && !Number.isNaN(week.getTime())
      ? new Intl.DateTimeFormat(intlLocale[lang], { day: "numeric", month: "short" }).format(week)
      : "";
  };

  return (
    <div className="cc-ctable">
      <div className="cc-row-between">
        <div className="cc-chips">
          {sorts.map((option) => (
            <button
              key={option.value}
              type="button"
              className={"cc-chip" + (sort === option.value ? " is-active" : "")}
              aria-pressed={sort === option.value}
              onClick={() => setSort(option.value)}
            >
              {t(option.label)}
            </button>
          ))}
        </div>
        <span className="cc-note">
          {t(byLinks ? "calculator_competitors_compared_count" : "calculator_competitors_found_count", { count: competitors.count })}
        </span>
      </div>

      <div className="cc-ctable__scroll">
        <table>
          <thead>
            <tr>
              <th>{t("calculator_competitors_col_product")}</th>
              <th>{t("calculator_competitors_col_price")}</th>
              <th>{t("calculator_competitors_col_diff")}</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => {
              if (row.kind === "you") {
                return (
                  <tr key={row.key} className="is-you">
                    <td>
                      <b>{t("calculator_competitors_your_price")}</b>
                    </td>
                    <td>
                      <Money value={row.price} currency={currency} className="is-strong" />
                    </td>
                    <td>—</td>
                  </tr>
                );
              }
              if (row.kind === "unavailable") {
                return (
                  <tr key={row.key} className="is-unavailable">
                    <td>
                      <a href={row.url} target="_blank" rel="noopener noreferrer">
                        #{row.nmId}
                      </a>
                      <p className="cc-note">{t("calculator_competitors_no_price")}</p>
                    </td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                );
              }
              const { product } = row;
              const gap = difference(product.price);
              const cheaper = !!gap && gap.gap < 0;
              const date = asOf(product.price_date);
              return (
                <tr key={row.key}>
                  <td>
                    <div className="cc-prod">
                      {product.photo ? (
                        <img src={product.photo} alt="" width={40} height={40} loading="lazy" />
                      ) : (
                        <span className="cc-prod__ph" />
                      )}
                      <div className="cc-prod__info">
                        <a href={product.url} target="_blank" rel="noopener noreferrer" className="cc-prod__title">
                          {product.title}
                        </a>
                        {isWb ? (
                          <span className="cc-note">
                            {date ? t("calculator_competitors_wb_asof", { date, id: product.id }) : `#${product.id}`}
                          </span>
                        ) : product.rating === null ? (
                          <span className="cc-note">{t("calculator_competitors_unrated")}</span>
                        ) : (
                          <span className="cc-note cc-prod__rating">
                            <CIcon name="star" />
                            {product.rating.toFixed(1)} · {t("calculator_competitors_reviews", { count: product.reviews ?? 0 })}
                          </span>
                        )}
                        {product.same_category === false && (
                          <span
                            className="cc-chip cc-chip--warn"
                            title={product.category?.full_path ?? ""}
                            aria-label={t("calculator_competitors_other_category_path", { path: product.category?.full_path ?? "" })}
                          >
                            {t("calculator_competitors_other_category")}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <Money value={product.price} currency={currency} prefix={isWb ? "≈" : undefined} className="is-strong" />
                    {product.old_price !== null && <Money value={product.old_price} currency={currency} className="cc-strike" />}
                  </td>
                  <td>
                    {!gap ? (
                      "—"
                    ) : gap.equal ? (
                      <span className="cc-note">{t("calculator_competitors_diff_equal")}</span>
                    ) : (
                      <>
                        <span className={"cc-diff " + (cheaper ? "is-warn" : "is-profit")}>
                          <CIcon name={cheaper ? "down" : "up"} />
                          {t(cheaper ? "calculator_competitors_diff_cheaper" : "calculator_competitors_diff_pricier", { percent: gap.percent })}
                        </span>
                        <Money value={Math.abs(gap.gap)} currency={currency} className="cc-note" />
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {hidden > 0 && (
        <button type="button" className="cc-btn cc-btn--text" onClick={() => setExpanded((v) => !v)}>
          {expanded ? t("calculator_competitors_show_less") : t("calculator_competitors_show_more", { count: hidden })}
        </button>
      )}
    </div>
  );
}

export function Competitors({ calculator }: { calculator: MarketplaceCalculatorState }) {
  const { t, lang } = useT();
  const { competitors, marketplace, currencyLabel, result } = calculator;
  const {
    data,
    loading,
    failed,
    stale,
    throttled,
    compared,
    comparedPrice,
    comparedName,
    suggestedPrice,
    applySuggestedPrice,
    compare,
    retry,
    comparedMode,
    errorCode,
    staleBlocked,
    blocked,
  } = competitors;
  const money = (value: number) => `${formatMoney(Math.round(value), lang)} ${currencyLabel}`;

  if (marketplace === "ozon") {
    return (
      <div className="cc-panel">
        <p className="cc-panel__title">{t("calculator_competitors_title")}</p>
        <p className="cc-text">{t("calculator_competitors_ozon")}</p>
      </div>
    );
  }

  // Kalkulyatorning o'z javobi bo'lmaguncha panel 1-qadamni ko'rsatib turadi — ikkinchi taklif unga xalaqit beradi.
  if (!result) return null;

  if (loading) {
    return (
      <div className="cc-stack">
        <CompetitorsCta competitors={competitors} />
        <div className="cc-skeleton">
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }

  if (failed) {
    const badLink = errorCode === API_ERROR_CODES.STEP1_LINK_INVALID;
    return (
      <Callout
        tone={throttled === null && !badLink ? "error" : "warning"}
        titleKey="calculator_competitors_title"
        text={
          badLink
            ? t("calculator_competitors_error_link_marketplace")
            : throttled === null
              ? t("calculator_competitors_error")
              : t("calculator_error_throttled", { seconds: throttled })
        }
        onRetry={badLink ? undefined : retry}
        retryLabel="calculator_competitors_retry"
      />
    );
  }

  if (!data || !compared || comparedPrice === null) return <CompetitorsCta competitors={competitors} />;

  const byLinks = comparedMode === "links";
  const unavailable = data.unavailable_links?.length ?? 0;
  const minRoi = suggestedPrice?.basis === "min_roi";
  const matchLabel =
    data.matched_by === "links"
      ? t("calculator_competitors_matched_links", { count: data.count + unavailable })
      : data.matched_by === "name" && comparedName
        ? t("calculator_competitors_matched_name", { name: comparedName })
        : t("calculator_competitors_matched_category");

  const cheaper = data.prices !== null && comparedPrice <= data.prices.median;
  const zone = competitorZone(comparedPrice, data.prices?.median ?? 0);
  const percentile = data.position?.percentile ?? 0;
  const asShare = data.count >= PERCENT_FROM;
  const beaten = cheaper ? (data.position?.pricier_count ?? 0) : (data.position?.cheaper_count ?? 0);

  return (
    <div className="cc-comp">
      <div className="cc-row-between">
        <div>
          <p className="cc-panel__title">{t("calculator_competitors_title")}</p>
          <p className="cc-note">{t(byLinks ? "calculator_competitors_subtitle_links" : "calculator_competitors_subtitle")}</p>
        </div>
        <span className={`cc-chip cc-chip--match is-${data.matched_by}`}>{matchLabel}</span>
      </div>

      {(stale || staleBlocked) && (
        <div className="cc-stale">
          <span>{t(staleBlocked && blocked ? blocked : "calculator_competitors_stale")}</span>
          {!staleBlocked && (
            <button type="button" className="cc-btn cc-btn--outline cc-btn--xs" onClick={compare}>
              {t("calculator_competitors_recompare")}
            </button>
          )}
        </div>
      )}

      {data.matched_by === "category" && !!comparedName && (
        <p className="cc-note">{t("calculator_competitors_note_category", { name: comparedName })}</p>
      )}

      {!data.products.length ? (
        <Callout tone="warning" titleKey="calculator_competitors_title" text={t("calculator_competitors_none")} />
      ) : (
        <>
          {data.prices !== null && (
            <>
              <p className="cc-comp__verdict">
                <b className={`is-${zone}`}>
                  {asShare
                    ? t(cheaper ? "calculator_competitors_verdict_cheaper_strong" : "calculator_competitors_verdict_pricier_strong", {
                        percent: cheaper ? 100 - percentile : percentile,
                      })
                    : t(cheaper ? "calculator_competitors_verdict_cheaper_n" : "calculator_competitors_verdict_pricier_n", {
                        count: beaten,
                      })}
                </b>{" "}
                {t(cheaper ? "calculator_competitors_verdict_cheaper" : "calculator_competitors_verdict_pricier", {
                  price: money(comparedPrice),
                  amount: money(Math.abs(data.prices.median - comparedPrice)),
                })}
              </p>
              <Range
                byLinks={byLinks}
                prices={data.prices}
                price={comparedPrice}
                count={data.count}
                currency={currencyLabel}
                cheaperCount={data.position?.cheaper_count ?? 0}
                pricierCount={data.position?.pricier_count ?? 0}
              />
            </>
          )}

          {suggestedPrice !== null && (
            <div className={"cc-offer" + (minRoi ? " is-floor" : "")}>
              <div>
                <span className="cc-offer__tag">
                  <CIcon name={minRoi ? "alert" : "sparkle"} />
                  {t(minRoi ? "calculator_competitors_suggested_min_roi" : "calculator_competitors_suggested")}
                </span>
                <p className="cc-offer__price">
                  <Money value={suggestedPrice.value} currency={currencyLabel} className="is-strong" />
                  {suggestedPrice.old_price !== null && (
                    <Money value={suggestedPrice.old_price} currency={currencyLabel} className="cc-strike" />
                  )}
                </p>
              </div>
              <button type="button" className="cc-btn cc-btn--outline cc-btn--xs" onClick={applySuggestedPrice}>
                {t("calculator_competitors_apply")}
              </button>
            </div>
          )}

          {minRoi && (
            <p className="cc-note cc-note--warn">
              {suggestedPrice?.market_median && data.your_economics
                ? t("calculator_competitors_suggested_min_roi_note", {
                    median: money(suggestedPrice.market_median),
                    breakEven: money(data.your_economics.break_even_price),
                    roi: MIN_ROI_PERCENT,
                  })
                : t("calculator_competitors_suggested_min_roi_note_short", { roi: MIN_ROI_PERCENT })}
            </p>
          )}

          <Economics prices={data.prices} currency={currencyLabel} economics={data.your_economics} />

          {byLinks && (data.other_category_count ?? 0) > 0 && (
            <p className="cc-note cc-note--warn">
              {t("calculator_competitors_note_other_category", { count: data.count, other: data.other_category_count })}
            </p>
          )}

          <Table byLinks={byLinks} competitors={data} price={comparedPrice} currency={currencyLabel} marketplace={marketplace} />
        </>
      )}

      {byLinks && unavailable > 0 && <p className="cc-note">{t("calculator_competitors_note_unavailable", { count: unavailable })}</p>}
    </div>
  );
}
