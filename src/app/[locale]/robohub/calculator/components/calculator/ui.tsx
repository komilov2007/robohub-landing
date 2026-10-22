"use client";

import { useId, type CSSProperties, type ReactNode } from "react";
import { useT } from "./i18n";
import { formatMoney } from "./format";
import type { CalculatorNotice } from "./useMarketplaceCalculator";

// Kalkulyatorning kichik qurilish bloklari — rb-market'dagi MUI komponentlari o'rnida (Typography, TextField,
// Tooltip, Chip, ButtonBase …). Ko'rinishi calculator.css dagi .cc-* klasslarida, shrift va ranglar — AI Studio tokenlari.

// Ikonlar — rb-market'ning o'z SVG'lari (public/calculator/icons), CSS mask: rangi currentColor'dan.
const ICONS = {
  calculator: "pc-calculator",
  info: "info-circle",
  alert: "alert-triangle",
  bulb: "bulb",
  repeat: "ai-repeat",
  check: "check",
  close: "close",
  closeSimple: "close-simple",
  chevron: "chevron-down",
  sparkle: "ca-sparkle",
  compare: "ca-compare-arrows",
  up: "db-trend-up",
  down: "db-trend-down",
  star: "star-filled",
  plus: "bc-plus",
  ai: "ai",
  search: "search",
} as const;

export type CalcIconName = keyof typeof ICONS;

export function CIcon({ name, className }: { name: CalcIconName; className?: string }) {
  return (
    <span
      className={"cc-i" + (className ? " " + className : "")}
      style={{ "--src": `url(/calculator/icons/${ICONS[name]}.svg)` } as CSSProperties}
      aria-hidden="true"
    />
  );
}

export const Spinner = ({ size = 16 }: { size?: number }) => (
  <span className="cc-spin" style={{ width: size, height: size }} aria-hidden="true" />
);

/** ⓘ — izoh sichqoncha/fokus bilan ochiladi (rb-market HelpTooltip). `children` — izoh bog'langan yorliq. */
export function Help({ text, children }: { text: string; children?: ReactNode }) {
  const id = useId();
  return (
    <span className="cc-help">
      {children}
      <span className="cc-help__btn" tabIndex={0} role="button" aria-label={text} aria-describedby={id}>
        <CIcon name="info" />
      </span>
      <span className="cc-help__tip" role="tooltip" id={id}>
        {text}
      </span>
    </span>
  );
}

/** Pul katagi: bo'lmagan qiymat o'rnida — tire (null `NaN` bo'lib chiqmasin). */
export function Money({
  value,
  currency,
  prefix,
  className,
}: {
  value: number | null | undefined;
  currency: string;
  prefix?: string;
  className?: string;
}) {
  const { lang } = useT();
  if (value === null || value === undefined) return <span className={className}>—</span>;
  return (
    <span className={"cc-money" + (className ? " " + className : "")}>
      {prefix}
      {formatMoney(value, lang)} <small>{currency}</small>
    </span>
  );
}

/** Maydon yorlig'i + ⓘ izohi. */
export function FieldLabel({ label, help, htmlFor }: { label: string; help?: string; htmlFor?: string }) {
  return (
    <span className="cc-label">
      <label htmlFor={htmlFor}>{label}</label>
      {help && <Help text={help} />}
    </span>
  );
}

interface NumberFieldProps {
  id: string;
  label: ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Pul: butun son, guruhlab ko'rsatiladi. */
  money?: boolean;
  /** Kasr: vergul yoki nuqta. */
  decimal?: boolean;
  adornment?: string;
  error?: string;
  warn?: boolean;
  hints?: (string | undefined | null)[];
  className?: string;
}

/**
 * Raqam maydoni (rb-market InputPriceFormat / InputNumberFormat): qiymat — xom satr, ko'rinishi formatlangan.
 * Pul maydoni guruhlarni bo'sh joy bilan ajratadi, kasrli maydon vergulni nuqtaga aylantiradi.
 */
export function NumberField({
  id,
  label,
  value,
  onChange,
  placeholder,
  money,
  decimal,
  adornment,
  error,
  warn,
  hints = [],
  className,
}: NumberFieldProps) {
  const { lang } = useT();
  const display = money && value !== "" ? formatMoney(value, lang) : value;

  const handle = (raw: string) => {
    if (decimal) {
      const cleaned = raw.replace(",", ".").replace(/[^\d.]/g, "");
      const [int, ...rest] = cleaned.split(".");
      onChange(rest.length ? `${int}.${rest.join("").slice(0, 3)}` : int);
      return;
    }
    onChange(raw.replace(/\D/g, "").replace(/^0+(?=\d)/, "").slice(0, 13));
  };

  return (
    <div className={"cc-field" + (className ? " " + className : "")}>
      {label}
      <div className={"cc-input" + (error ? " is-error" : "") + (warn ? " is-warn" : "")}>
        <input
          id={id}
          value={display}
          inputMode={decimal ? "decimal" : "numeric"}
          autoComplete="off"
          placeholder={placeholder}
          aria-invalid={!!error}
          onChange={(e) => handle(e.target.value)}
        />
        {adornment && <span className="cc-input__adorn">{adornment}</span>}
      </div>
      {error && <p className="cc-note cc-note--error">{error}</p>}
      {hints.filter(Boolean).map((hint) => (
        <p key={hint} className="cc-note">
          {hint}
        </p>
      ))}
    </div>
  );
}

const STEP_TITLES: Record<number, string> = {
  1: "calculator_step_product",
  2: "calculator_step_prices",
  3: "calculator_step_delivery",
  4: "calculator_step_expenses",
  5: "calculator_step_competitors",
};

const TONE_ICON = { step: "bulb", warning: "alert", error: "alert" } as const;
const TONE_TITLE = { step: "calculator_next_step", warning: "calculator_attention", error: "calculator_cannot_calculate" };

/** Keyingi qadam / diqqat / xato — rang, ikon va sarlavha birga (faqat rangga tayanmaydi). */
export function Callout({ tone, text, step, onRetry, retryLabel, titleKey }: CalculatorNotice) {
  const { t } = useT();
  return (
    <div className={`cc-callout cc-callout--${tone}`} role={tone === "error" ? "alert" : "status"}>
      <CIcon name={TONE_ICON[tone]} className="cc-callout__ico" />
      <div className="cc-callout__body">
        <p className="cc-callout__title">
          {step
            ? t("calculator_next_step_numbered", { step, title: t(STEP_TITLES[step] ?? "") })
            : t(titleKey ?? TONE_TITLE[tone])}
        </p>
        <p className="cc-callout__text">{text}</p>
        {onRetry && (
          <button type="button" className="cc-btn cc-btn--outline cc-btn--xs" onClick={onRetry}>
            <CIcon name="repeat" />
            {t(retryLabel ?? "retry")}
          </button>
        )}
      </div>
    </div>
  );
}

/** Bitta-tanlov kartasi: tepada qisqa nom, ostida — nimani anglatishi. */
export function ChoiceTile({
  title,
  caption,
  selected,
  disabled,
  onClick,
}: {
  title: string;
  caption: string;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={"cc-tile" + (selected ? " is-selected" : "")}
      disabled={disabled}
      aria-pressed={selected}
      onClick={onClick}
    >
      <span className="cc-tile__title">{title}</span>
      <span className="cc-tile__caption">{caption}</span>
    </button>
  );
}

/** Pill ko'rinishidagi almashtirgich (rb-market Segmented). */
export function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { value: T; label: ReactNode }[];
  onChange: (next: T) => void;
  label?: string;
}) {
  return (
    <div className="cc-seg" role="radiogroup" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          className={"cc-seg__opt" + (value === option.value ? " is-active" : "")}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

/** Taklif qatori: "ⓘ O'rtacha narx [185 000]" — bosilsa maydonga yoziladi, maydonda bo'lsa yo'qoladi. */
export function Suggestion({ label, value, onApply }: { label: string; value: string | null; onApply: () => void }) {
  const { t } = useT();
  if (!value) return null;
  return (
    <div className="cc-suggest">
      <span className="cc-suggest__label">
        <CIcon name="info" />
        {label}
      </span>
      <button
        type="button"
        className="cc-chip cc-chip--primary"
        onClick={onApply}
        title={`${label} — ${t("calculator_use_suggestion")}`}
        aria-label={`${label} ${value} — ${t("calculator_use_suggestion")}`}
      >
        {value}
      </button>
    </div>
  );
}
