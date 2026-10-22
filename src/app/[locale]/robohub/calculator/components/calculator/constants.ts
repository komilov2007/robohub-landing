import type { CalculatorMarketplace, CommissionModel } from "./types";

// rb-market src/components/marketplace-calculator/constants.ts va src/constants/api-error-codes.ts dan.

/** Tablar tartibi — butun ilovadagi marketpleys tartibi. */
export const CALCULATOR_MARKETPLACES: CalculatorMarketplace[] = ["uzum_market", "yandex_market", "wb", "ozon"];

export const MARKETPLACE_META: Record<CalculatorMarketplace, { label: string; icon: string }> = {
  uzum_market: { label: "Uzum Market", icon: "/marketplaces/uzum.svg" },
  yandex_market: { label: "Yandex Market", icon: "/marketplaces/yandex.svg" },
  wb: { label: "Wildberries", icon: "/marketplaces/wildberries.svg" },
  ozon: { label: "Ozon", icon: "/marketplaces/ozon.svg" },
};

/** O'zbekiston sotuvchilari uchun har bir marketpleysdagi sxemalar. */
export const MARKETPLACE_MODELS: Record<CalculatorMarketplace, CommissionModel[]> = {
  uzum_market: ["fbo", "fbs", "dbs"],
  wb: ["fbo", "fbs", "dbs"],
  yandex_market: ["fbo", "fbs", "dbs"],
  ozon: ["fbo", "fbs", "dbs"],
};

/** Birinchi so'rov shu sxema bilan; `50004` javobi mavjudlarini aytadi. */
export const DEFAULT_MODEL: CommissionModel = "fbo";

/** Raqobatchilar qadami — kalkulyatorning to'rt qadamidan keyin. */
export const COMPETITORS_STEP = 5;
export const COMPETITOR_LINK_INPUT_ID = "calculator-competitor-link";

/** Server bozor narxidan pastga tushganda ushlab turadigan eng kam ROI — faqat ekranda nomlash uchun. */
export const MIN_ROI_PERCENT = 15;

/** Bo'lim yakorlari. */
export const CALC_SECTION_ID = "calculator";

export const API_ERROR_CODES = {
  STEP1_LINK_INVALID: 10011,
  CALCULATOR_CATEGORY_NOT_FOUND: 50001,
  CALCULATOR_OLD_PRICE_BELOW_PRICE: 50002,
  CALCULATOR_DIMENSIONS_INCOMPLETE: 50003,
  CALCULATOR_MODEL_NOT_AVAILABLE: 50004,
  CALCULATOR_TARIFFS_UNAVAILABLE: 50006,
  CALCULATOR_NO_CURRENCY_RATE: 50007,
  CALCULATOR_YANDEX_NO_SHOP: 50008,
  CALCULATOR_YANDEX_CATEGORY_NOT_SOLD: 50009,
  CALCULATOR_OZON_NOT_UZS: 50010,
  CALCULATOR_DELIVERY_EXPENSE_NOT_DBS: 50011,
} as const;

/** Maydonga emas, vaziyatga tegishli xatolar — raqamlar o'rnida ko'rsatiladi. */
export const CALCULATOR_ERROR_NOTICE: Partial<Record<number, string>> = {
  [API_ERROR_CODES.CALCULATOR_CATEGORY_NOT_FOUND]: "calculator_error_category_not_found",
  [API_ERROR_CODES.CALCULATOR_DIMENSIONS_INCOMPLETE]: "calculator_enter_all_dimensions",
  [API_ERROR_CODES.CALCULATOR_TARIFFS_UNAVAILABLE]: "calculator_error_tariffs_unavailable",
  [API_ERROR_CODES.CALCULATOR_NO_CURRENCY_RATE]: "calculator_error_no_currency_rate",
  [API_ERROR_CODES.CALCULATOR_YANDEX_NO_SHOP]: "calculator_error_yandex_no_shop",
  [API_ERROR_CODES.CALCULATOR_YANDEX_CATEGORY_NOT_SOLD]: "calculator_error_yandex_category_not_sold",
  [API_ERROR_CODES.CALCULATOR_OZON_NOT_UZS]: "calculator_error_ozon_not_uzs",
};

/** Kabinetga olib boradigan havolalar (rb-market — robohub.uz). */
export const REGISTER_HREF = "https://robohub.uz/register";
