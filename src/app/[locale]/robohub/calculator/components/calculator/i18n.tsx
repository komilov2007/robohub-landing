"use client";

import { createContext, Fragment, useCallback, useContext, useMemo, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import type { CalcDict } from "./calculator.messages";

// Kalkulyator ichidagi t() — rb-market'dagi i18next kalitlari bilan ishlaydi:
//   t("calculator_batch_title", { quantity: 3 }) → "3 dona sotsangiz";
//   { count } bo'lsa ru uchun kalit_few / kalit_many tanlanadi; { defaultValue } — kalit yo'q bo'lsa.
// Lug'at server'dan (page.tsx) faqat joriy til uchun keladi.
type Vars = Record<string, string | number | null | undefined> & { defaultValue?: string };

const Ctx = createContext<{ dict: CalcDict; locale: Locale } | null>(null);

export function CalcI18n({ dict, locale, children }: { dict: CalcDict; locale: Locale; children: ReactNode }) {
  const value = useMemo(() => ({ dict, locale }), [dict, locale]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useT() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useT() CalcI18n ichida ishlatilishi kerak");
  const { dict, locale } = ctx;

  const t = useCallback(
    (key: string, vars?: Vars) => {
      let text: string | undefined;
      if (typeof vars?.count === "number") {
        const form = new Intl.PluralRules(locale === "uz" || locale === "kaa" ? "en" : locale).select(vars.count);
        text = dict[`${key}_${form}`];
      }
      text ??= dict[key] ?? vars?.defaultValue ?? key;
      return vars ? text.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, name) => String(vars[name] ?? "")) : text;
    },
    [dict, locale],
  );

  return { t, lang: locale };
}

/** `<accent>…</accent>` belgilangan matn: belgilangan qismi `render` orqali chiziladi. */
export function rich(text: string, render: (part: string) => ReactNode) {
  return text.split(/<accent>(.*?)<\/accent>/g).map((part, i) => (
    <Fragment key={i}>{i % 2 ? render(part) : part}</Fragment>
  ));
}
