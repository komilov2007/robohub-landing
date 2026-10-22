"use client";

import { useState, type ReactNode } from "react";
import { useT } from "./i18n";
import { CategoryField } from "./category-picker";
import { formatMoney, formatPercentValue } from "./format";
import { COMPETITORS_STEP, COMPETITOR_LINK_INPUT_ID } from "./constants";
import { getApiErrorMessage, postPublicCalculatorLink } from "./api";
import { ChoiceTile, CIcon, FieldLabel, NumberField, Segmented, Spinner, Suggestion } from "./ui";
import {
  competitorLinkKey,
  competitorLinkPlaceholder,
  mergeCompetitorLinks,
  parseCompetitorLinks,
  type CompetitorLink,
} from "./competitor-links";
import type { MarketplaceCalculatorState } from "./useMarketplaceCalculator";
import type { CalculatorCompetitorsState } from "./useCalculatorCompetitors";
import type { CalculatorLinkMarketplace, CalculatorLinkResponse, CompetitorMode, UzumDiscount } from "./types";

// Forma — to'rt (raqobatchilar bilan besh) raqamlangan qadam: rb-market CalculatorFields va uning bolalari.
// Har maydon yorlig'ida ⓘ — u nima ekanini aytadi, shuning uchun savdo atamalarini bilish shart emas.

/** Bitta raqamlangan qadam: raqam yo'l bo'lib, sotuvchi doim keyingisini va nega so'ralayotganini biladi. */
function Step({ number, title, description, children }: { number: number; title: string; description: string; children: ReactNode }) {
  return (
    <section className="cc-step">
      <header className="cc-step__head">
        <span className="cc-step__num" aria-hidden="true">
          {number}
        </span>
        <div>
          <h3 className="cc-step__title">{title}</h3>
          <p className="cc-step__desc">{description}</p>
        </div>
      </header>
      <div className="cc-step__body">{children}</div>
    </section>
  );
}

/** Ixtiyoriy maydonlar bitta tugma ostida; yopiqligida ham to'ldirilgani yonida yoziladi. */
function Extra({ summary, forceOpen, children }: { summary?: string; forceOpen: boolean; children: ReactNode }) {
  const { t } = useT();
  const [expanded, setExpanded] = useState(false);
  const open = expanded || forceOpen;
  return (
    <div className="cc-extra">
      <div className="cc-extra__row">
        <button type="button" className="cc-extra__toggle" aria-expanded={open} onClick={() => setExpanded((v) => !v)}>
          <b>{t("calculator_extra")}</b>
          <span>({t("calculator_extra_toggle")})</span>
          <CIcon name="chevron" className={"cc-extra__chev" + (open ? " is-open" : "")} />
        </button>
        {!open && !!summary && <span className="cc-note cc-extra__summary">{summary}</span>}
      </div>
      <div className={"cc-collapse" + (open ? " is-open" : "")}>
        <div>
          <div className="cc-extra__body">{children}</div>
        </div>
      </div>
    </div>
  );
}

const LINK_HINT: Record<CalculatorLinkMarketplace, { placeholder: string; help: string }> = {
  uzum_market: { placeholder: "https://uzum.uz/uz/product/…", help: "calculator_product_link_hint" },
  wb: { placeholder: "https://www.wildberries.ru/catalog/…/detail.aspx", help: "calculator_product_link_hint_wb" },
};

/** Ochiq mahsulot havolasidan to'ldirish — nom, narxlar, kategoriya (WB'da o'lcham ham). Xato maydon ostida. */
function ProductLink({
  marketplace,
  onFilled,
}: {
  marketplace: CalculatorLinkMarketplace;
  onFilled: (data: CalculatorLinkResponse) => void;
}) {
  const { t } = useT();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fill = async () => {
    if (!url.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      onFilled(await postPublicCalculatorLink({ url: url.trim(), marketplace }));
    } catch (e) {
      setError(getApiErrorMessage(e) || t("calculator_error_server"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cc-field">
      <FieldLabel htmlFor="calculator-product-link" label={t("calculator_product_link")} help={t(LINK_HINT[marketplace].help)} />
      <div className="cc-inline">
        <div className={"cc-input" + (error ? " is-error" : "")}>
          <input
            id="calculator-product-link"
            value={url}
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            placeholder={LINK_HINT[marketplace].placeholder}
            onChange={(e) => {
              setUrl(e.target.value);
              setError(null);
            }}
            onKeyDown={(e) => e.key === "Enter" && void fill()}
          />
        </div>
        <button type="button" className="cc-btn cc-btn--primary" disabled={!url.trim() || loading} onClick={() => void fill()}>
          {loading && <Spinner size={14} />}
          {t(loading ? "loading" : "calculator_fill_from_link")}
        </button>
      </div>
      {error && <p className="cc-note cc-note--error">{error}</p>}
    </div>
  );
}

/** AI tavsiya qilgan kategoriyalar — hech qachon o'zi qo'yilmaydi, bir bosishda tanlanadi. */
function CategorySuggestions({ calculator }: { calculator: MarketplaceCalculatorState }) {
  const { t } = useT();
  const { suggestLoading, suggestions, handleCategory } = calculator;
  if (!suggestLoading && !suggestions.length) return null;
  return (
    <div className="cc-ai">
      <img src="/calculator/icons/ai.svg" alt="" width={16} height={16} />
      <span className="cc-note">{t(suggestLoading ? "ai_category_suggesting" : "ai_category_suggestion")}</span>
      {!suggestLoading &&
        suggestions.map((s) => (
          <button
            key={s.id}
            type="button"
            className="cc-chip cc-chip--primary cc-chip--wide"
            title={s.full_path}
            onClick={() => handleCategory({ id: s.id, path: s.path, full_path: s.full_path })}
          >
            {s.full_path}
          </button>
        ))}
    </div>
  );
}

/** Uzum chegirma dasturi: ikkita stavka — qatnashish narxdan chegirma evaziga past komissiya. */
function Discount({
  discount,
  value,
  onChange,
}: {
  discount: UzumDiscount | null;
  value: boolean | null;
  onChange: (next: boolean) => void;
}) {
  const { t, lang } = useT();
  if (!discount?.tiered) return null;
  const percent = (rate: number | null) => (rate === null ? "—" : formatPercentValue(rate, lang));
  const base = discount.base_commission;
  const discounted = discount.discounted_commission;
  const required = discount.required_percent;
  const hint =
    value === null
      ? t("uzum_discount_choose")
      : value
        ? t("uzum_discount_join_hint", { required: percent(required), base: percent(base), discounted: percent(discounted) })
        : t("uzum_discount_decline_hint", { base: percent(base) });

  return (
    <div className="cc-field">
      <span className="cc-label">
        <span>{t("uzum_discount_programme")}</span>
      </span>
      <div className="cc-grid2">
        <ChoiceTile
          selected={value === true}
          onClick={() => onChange(true)}
          title={`${t("uzum_discount_join")} · ${percent(discounted)}`}
          caption={required ? t("uzum_discount_join_caption", { percent: percent(required) }) : t("uzum_discount_with_programme")}
        />
        <ChoiceTile
          selected={value === false}
          onClick={() => onChange(false)}
          title={`${t("uzum_discount_decline")} · ${percent(base)}`}
          caption={t("uzum_discount_base_caption")}
        />
      </div>
      <p className="cc-note">{hint}</p>
    </div>
  );
}

/** Sxema: kim saqlaydi va kim yetkazadi. Sotilmaydiganlari joyida qoladi — o'chiq va nega ekanini aytib. */
function Models({ calculator }: { calculator: MarketplaceCalculatorState }) {
  const { t } = useT();
  const { model, setModel, models } = calculator;
  return (
    <div className="cc-field">
      <span className="cc-label">
        <span>{t("calculator_scheme")}</span>
      </span>
      <div className="cc-grid3">
        {models.map(({ value, available }) => (
          <ChoiceTile
            key={value}
            disabled={!available}
            selected={model === value}
            onClick={() => setModel(value)}
            title={t(`scheme_${value}`)}
            caption={
              available
                ? t(`calculator_scheme_${value}_desc`)
                : t("calculator_scheme_not_sold", { scheme: t(`scheme_${value}`) })
            }
          />
        ))}
      </div>
    </div>
  );
}

/** Quti: uch tomon (mm) va kerak bo'lsa og'irlik; DBS'da — o'z yetkazish xarajati. */
function Dimensions({ calculator }: { calculator: MarketplaceCalculatorState }) {
  const { t, lang } = useT();
  const {
    values,
    errors,
    setField,
    model,
    marketplace,
    dimensionsIncomplete,
    needsDimensions,
    needsWeight,
    currencyLabel,
    noDimensionsPenalty,
    dimensionsSuggestion,
    applyDimensionsSuggestion,
  } = calculator;

  const ownDelivery =
    model === "dbs" ? (
      <NumberField
        id="cc-own-delivery"
        money
        value={values.own_delivery}
        onChange={(v) => setField("own_delivery", v)}
        placeholder={t("calculator_own_delivery")}
        adornment={currencyLabel}
        error={errors.own_delivery}
        label={<FieldLabel htmlFor="cc-own-delivery" label={t("calculator_own_delivery")} help={t("calculator_own_delivery_hint")} />}
      />
    ) : null;

  if (!needsDimensions) return ownDelivery;

  const [l, w, h] = [Number(values.length), Number(values.width), Number(values.height)];
  const litres = l > 0 && w > 0 && h > 0 ? (l * w * h) / 1_000_000 : null;

  return (
    <div className="cc-field">
      <FieldLabel
        label={t("calculator_dimensions")}
        help={t(marketplace === "yandex_market" ? "calculator_dimensions_note_yandex" : "calculator_dimensions_note")}
      />
      <div className="cc-grid3 cc-grid3--tight">
        {(["length", "width", "height"] as const).map((name) => (
          <NumberField
            key={name}
            id={`cc-${name}`}
            value={values[name]}
            onChange={(v) => setField(name, v)}
            placeholder="0"
            warn={noDimensionsPenalty}
            label={
              <span className="cc-label cc-label--sm">
                <label htmlFor={`cc-${name}`}>{t(`${name}_mm`)}</label>
              </span>
            }
          />
        ))}
      </div>

      {/* Uzum'ning o'lchamsiz stavkasi eng arzonidan ~10 baravar qimmat — bu izoh emas, ogohlantirish */}
      {noDimensionsPenalty && <p className="cc-note cc-note--warn">{t("calculator_dimensions_penalty")}</p>}

      {dimensionsIncomplete ? (
        <p className="cc-note cc-note--error">{t("calculator_enter_all_dimensions")}</p>
      ) : litres !== null ? (
        <p className="cc-note">
          {t("calculator_volume_hint", {
            value: new Intl.NumberFormat(lang === "ru" ? "ru-RU" : "en-US", { maximumFractionDigits: 3 }).format(litres),
          })}
        </p>
      ) : null}

      <Suggestion
        onApply={applyDimensionsSuggestion}
        label={t("calculator_dimensions_suggested")}
        value={
          dimensionsSuggestion === null
            ? null
            : t(needsWeight ? "calculator_dimensions_value_weight" : "calculator_dimensions_value", {
                weight: dimensionsSuggestion.weight,
                size: `${dimensionsSuggestion.length}×${dimensionsSuggestion.width}×${dimensionsSuggestion.height}`,
              })
        }
      />

      {needsWeight && (
        <NumberField
          id="cc-weight"
          decimal
          className="cc-mt"
          value={values.weight}
          onChange={(v) => setField("weight", v)}
          placeholder={t("weight_kg")}
          label={
            <FieldLabel
              htmlFor="cc-weight"
              label={t("weight_kg")}
              help={t(marketplace === "yandex_market" ? "calculator_weight_hint" : "calculator_weight_hint_optional")}
            />
          }
        />
      )}

      {ownDelivery && <div className="cc-mt">{ownDelivery}</div>}
    </div>
  );
}

/** Raqobatchilarni qanday topish: vitrinani qidirish yoki o'zingiz nomlash. WB'da tanlov yo'q — sababi aytiladi. */
function CompetitorsMode({ competitors }: { competitors: CalculatorCompetitorsState }) {
  const { t } = useT();
  const { mode, setMode, modeOptions, maxLinks } = competitors;

  const handleMode = (next: CompetitorMode) => {
    setMode(next);
    if (next !== "links") return;
    // Qo'yish qutisi shu renderdan keyin paydo bo'ladi — bir kadr kutiladi
    requestAnimationFrame(() =>
      document.getElementById(COMPETITOR_LINK_INPUT_ID)?.scrollIntoView({ behavior: "smooth", block: "center" }),
    );
  };

  if (modeOptions.length < 2) return <p className="cc-text">{t("calculator_competitors_mode_links_only")}</p>;

  return (
    <div className="cc-field">
      <Segmented
        value={mode}
        onChange={handleMode}
        label={t("calculator_step_competitors")}
        options={modeOptions.map((value) => ({ value, label: t(`calculator_competitors_mode_${value}`) }))}
      />
      <p className="cc-note">{t(`calculator_competitors_mode_hint_${mode}`, { count: maxLinks })}</p>
    </div>
  );
}

type LinkStatus = "compared" | "no_price" | "new";

/** Raqobatchi havolalari: bir nechtasini birdan qo'yish mumkin, har biri javobda nima bo'lganini ko'rsatadi. */
function CompetitorLinks({ competitors }: { competitors: CalculatorCompetitorsState }) {
  const { t } = useT();
  const [draft, setDraft] = useState("");
  const [problems, setProblems] = useState<string[]>([]);
  const { links, setLinks, maxLinks, unavailableLinks, data, compared, comparedMode, marketplace } = competitors;
  const full = links.length >= maxLinks;

  const add = (text: string) => {
    if (!marketplace) return;
    const { links: parsed, invalid } = parseCompetitorLinks(marketplace, text);
    if (!parsed.length && !invalid.length) return;
    const { links: next, duplicates, overflow } = mergeCompetitorLinks(links, parsed);
    setProblems([
      ...(invalid.length ? [`calculator_competitors_links_invalid_${marketplace}`] : []),
      ...(duplicates.length ? ["calculator_competitors_links_duplicate"] : []),
      ...(overflow ? ["calculator_competitors_links_max"] : []),
    ]);
    setLinks(next);
    if (next.length > links.length) setDraft("");
  };

  const remove = (key: string) => {
    setLinks(links.filter((link) => competitorLinkKey(link) !== key));
    setProblems([]);
  };

  /** Javob narxsiz havolalarni aynan qo'yilganidek qaytaradi — satr tengligi bilan solishtiriladi. */
  const statusOf = (link: CompetitorLink): LinkStatus => {
    if (!compared || comparedMode !== "links") return "new";
    if (unavailableLinks.includes(link.url)) return "no_price";
    if (data?.products.some((product) => String(product.id) === link.id)) return "compared";
    return "new";
  };

  return (
    <div className="cc-field">
      <FieldLabel
        htmlFor={COMPETITOR_LINK_INPUT_ID}
        label={t("calculator_competitors_links_label")}
        help={t("calculator_competitors_links_hint", { count: maxLinks })}
      />
      <div className="cc-inline">
        <div className={"cc-input" + (problems.length ? " is-error" : "")}>
          <input
            id={COMPETITOR_LINK_INPUT_ID}
            value={draft}
            disabled={full}
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            placeholder={marketplace ? competitorLinkPlaceholder(marketplace) : ""}
            onChange={(e) => {
              setDraft(e.target.value);
              if (problems.length) setProblems([]);
            }}
            onKeyDown={(e) => e.key === "Enter" && draft.trim() && add(draft)}
          />
        </div>
        <button type="button" className="cc-btn cc-btn--primary" disabled={full || !draft.trim()} onClick={() => add(draft)}>
          <CIcon name="plus" />
          {t("calculator_competitors_links_add")}
        </button>
      </div>
      <div className="cc-row-between">
        <span className="cc-note">{t("calculator_competitors_links_multiple")}</span>
        <span className="cc-note">
          {links.length}/{maxLinks}
        </span>
      </div>
      {problems.map((problem) => (
        <p key={problem} className="cc-note cc-note--error">
          {t(problem, { count: maxLinks })}
        </p>
      ))}
      {links.length ? (
        <ul className="cc-links">
          {links.map((link) => {
            const status = statusOf(link);
            const key = competitorLinkKey(link);
            return (
              <li key={key} className={"cc-links__item" + (status === "no_price" ? " is-bad" : "")}>
                <b>#{link.id}</b>
                {link.skuId !== null && <span className="cc-note">{t("calculator_competitors_link_sku", { sku: link.skuId })}</span>}
                <span className="cc-links__url" title={link.url}>
                  {link.url.replace(/^https?:\/\//, "")}
                </span>
                <span className={`cc-links__status is-${status}`}>
                  {status === "compared" && <CIcon name="check" />}
                  {t(`calculator_competitors_link_${status}`)}
                </span>
                <button type="button" className="cc-iconbtn cc-iconbtn--sm" aria-label={t("delete")} onClick={() => remove(key)}>
                  <CIcon name="closeSimple" />
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="cc-links__empty">{t("calculator_competitors_links_empty")}</p>
      )}
    </div>
  );
}

export function CalculatorFields({ calculator }: { calculator: MarketplaceCalculatorState }) {
  const { t, lang } = useT();
  const {
    values,
    errors,
    setField,
    result,
    category,
    marketplace,
    handleCategory,
    handleLinkFilled,
    productName,
    setProductName,
    finishProductName,
    currencyLabel,
    withUzumDiscount,
    setWithUzumDiscount,
    priceSuggestion,
    applyPriceSuggestion,
    competitors,
  } = calculator;

  /** Ikkala narx ekranda bo'lgan zahoti — server javobini kutmasdan. */
  const discountPercent = (() => {
    const current = Number(values.price);
    const old = Number(values.old_price);
    if (!(current > 0) || !(old > current)) return null;
    return ((old - current) / old) * 100;
  })();

  const extraSummary = [
    Number(values.old_price) > 0 ? `${t("old_price")} ${formatMoney(values.old_price, lang)}` : null,
    Number(values.quantity) > 0 ? `${values.quantity} ${t("pcs")}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="cc-steps">
      <Step number={1} title={t("calculator_step_product")} description={t("calculator_step_product_desc")}>
        {/* Faqat shu ikkitasi mahsulot sahifasini o'qishga beradi; tab bo'yicha key — chala havola boshqasiga o'tmaydi */}
        {(marketplace === "uzum_market" || marketplace === "wb") && (
          <ProductLink key={marketplace} marketplace={marketplace} onFilled={handleLinkFilled} />
        )}

        <div className="cc-field">
          <span className="cc-label">
            <label htmlFor="cc-product-name">{t("product_name")}</label>
          </span>
          <div className="cc-input">
            <input
              id="cc-product-name"
              autoComplete="off"
              value={productName}
              placeholder={t("enter_product_name")}
              onChange={(e) => setProductName(e.target.value)}
              // Tavsiya nom tugallanganda so'raladi, yozilayotganda emas
              onBlur={finishProductName}
              onKeyDown={(e) => e.key === "Enter" && finishProductName()}
            />
          </div>
        </div>

        <div className="cc-field">
          <CategoryField key={marketplace} marketplace={marketplace} value={category} onChange={handleCategory} />
          <CategorySuggestions calculator={calculator} />
        </div>
      </Step>

      <Step number={2} title={t("calculator_step_prices")} description={t("calculator_step_prices_desc")}>
        {/* Tannarx birinchi: narx tavsiyasi undan hisoblanadi */}
        <div className="cc-grid2">
          <NumberField
            id="cc-cost"
            money
            value={values.cost_price}
            onChange={(v) => setField("cost_price", v)}
            placeholder={t("body_price")}
            adornment={currencyLabel}
            error={errors.cost_price}
            label={<FieldLabel htmlFor="cc-cost" label={t("body_price")} help={t("calculator_hint_cost")} />}
          />
          <div className="cc-field">
            <NumberField
              id="cc-price"
              money
              value={values.price}
              onChange={(v) => setField("price", v)}
              placeholder={t("price")}
              adornment={currencyLabel}
              error={errors.price}
              label={<FieldLabel htmlFor="cc-price" label={t("price")} help={t("calculator_hint_price")} />}
            />
            <Suggestion
              onApply={applyPriceSuggestion}
              label={t("calculator_price_suggested")}
              value={priceSuggestion === null ? null : formatMoney(priceSuggestion, lang)}
            />
          </div>
        </div>

        <Extra summary={extraSummary} forceOpen={!!errors.old_price || !!errors.quantity}>
          <div className="cc-grid2">
            <NumberField
              id="cc-old-price"
              money
              value={values.old_price}
              onChange={(v) => setField("old_price", v)}
              placeholder={t("old_price")}
              adornment={currencyLabel}
              error={errors.old_price}
              hints={[discountPercent === null ? null : `${t("discount")} ${formatPercentValue(discountPercent, lang)}`]}
              label={<FieldLabel htmlFor="cc-old-price" label={t("old_price")} help={t("calculator_hint_old_price")} />}
            />
            <NumberField
              id="cc-quantity"
              value={values.quantity}
              onChange={(v) => setField("quantity", v)}
              placeholder={t("quantity")}
              error={errors.quantity}
              label={<FieldLabel htmlFor="cc-quantity" label={t("quantity")} help={t("calculator_hint_quantity")} />}
            />
          </div>
        </Extra>

        {marketplace === "uzum_market" && (
          <Discount value={withUzumDiscount} onChange={setWithUzumDiscount} discount={result?.uzum_discount ?? null} />
        )}
      </Step>

      <Step number={3} title={t("calculator_step_delivery")} description={t("calculator_step_delivery_desc")}>
        <Models calculator={calculator} />
        <Dimensions calculator={calculator} />
      </Step>

      <Step number={4} title={t("calculator_step_expenses")} description={t("calculator_step_expenses_desc_guest")}>
        <div className="cc-grid2">
          <NumberField
            id="cc-tax"
            decimal
            value={values.tax_percent}
            onChange={(v) => setField("tax_percent", v)}
            placeholder={t("tax_percent")}
            error={errors.tax_percent}
            label={<FieldLabel htmlFor="cc-tax" label={t("tax_percent")} help={t("calculator_hint_tax_guest")} />}
          />
          <NumberField
            id="cc-expense"
            money
            value={values.expense_per_product}
            onChange={(v) => setField("expense_per_product", v)}
            placeholder={t("calculator_avg_expense")}
            adornment={currencyLabel}
            error={errors.expense_per_product}
            label={<FieldLabel htmlFor="cc-expense" label={t("calculator_avg_expense")} help={t("calculator_hint_expense")} />}
          />
        </div>
      </Step>

      {/* Ozon na qidiruvni, na mahsulot sahifasini beradi — beshinchi qadam umuman yo'q */}
      {competitors.available && (
        <Step number={COMPETITORS_STEP} title={t("calculator_step_competitors")} description={t("calculator_step_competitors_desc")}>
          <CompetitorsMode competitors={competitors} />
          {competitors.mode === "links" && <CompetitorLinks key={marketplace} competitors={competitors} />}
        </Step>
      )}
    </div>
  );
}
