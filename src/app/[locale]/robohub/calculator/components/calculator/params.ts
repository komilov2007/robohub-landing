import type { CalculatorMarketplace, CommissionModel } from "./types";

// Havola orqali ochish — rb-market params.ts bilan bir xil:
// /calculator?marketplace=wb&category_id=10033&price=350000&cost_price=200000&fulfillment_model=fbs&length=300&width=200&height=120
// Har bir qism ixtiyoriy va alohida tekshiriladi; havola faqat boshlang'ich holatni beradi.

/** Havoladagi nom (API nomi) → forma maydoni. Faqat `delivery_expense` farq qiladi. */
const NUMBER_PARAMS = {
  price: "price",
  old_price: "old_price",
  cost_price: "cost_price",
  quantity: "quantity",
  length: "length",
  width: "width",
  height: "height",
  weight: "weight",
  tax_percent: "tax_percent",
  expense_per_product: "expense_per_product",
  delivery_expense: "own_delivery",
} as const;

const MODELS: CommissionModel[] = ["fbo", "fbs", "dbs"];

export type CalculatorParamValues = Partial<Record<(typeof NUMBER_PARAMS)[keyof typeof NUMBER_PARAMS], number>>;

export interface CalculatorParams {
  marketplace: CalculatorMarketplace | null;
  model: CommissionModel | null;
  categoryId: number | null;
  values: CalculatorParamValues;
}

export const NO_CALCULATOR_PARAMS: CalculatorParams = { marketplace: null, model: null, categoryId: null, values: {} };

/** Chekli, manfiy bo'lmagan son — boshqasi tashlab yuboriladi (pul maydonidagi NaN buzilgandek o'qiladi). */
const readParam = (raw: string | null) => {
  if (raw === null || raw.trim() === "") return null;
  const value = Number(raw);
  return Number.isFinite(value) && value >= 0 ? value : null;
};

export const readCalculatorParams = (search: string, marketplaces: CalculatorMarketplace[]): CalculatorParams => {
  const params = new URLSearchParams(search);
  const marketplace = params.get("marketplace") as CalculatorMarketplace | null;
  const model = params.get("fulfillment_model") as CommissionModel | null;
  const categoryId = readParam(params.get("category_id"));

  const values: CalculatorParamValues = {};
  for (const [param, field] of Object.entries(NUMBER_PARAMS)) {
    const value = readParam(params.get(param));
    if (value !== null) values[field] = value;
  }

  return {
    marketplace: marketplace && marketplaces.includes(marketplace) ? marketplace : null,
    model: model && MODELS.includes(model) ? model : null,
    categoryId: categoryId && categoryId > 0 ? categoryId : null,
    values,
  };
};
