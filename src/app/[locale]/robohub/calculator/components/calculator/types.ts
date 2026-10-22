// Kalkulyatorning ochiq API turlari — rb-market src/types/calculator.ts dan (faqat mehmon uchun keraklilari).
// Javob shakllari api.robohub.uz/api/public/* ning haqiqiy javoblari bilan tekshirilgan.

export type CalculatorMarketplace = "uzum_market" | "yandex_market" | "wb" | "ozon";
export type CommissionModel = "fbo" | "fbs" | "dbs";
export type CommissionByModel = Partial<Record<CommissionModel, number>>;

export interface CategoryPath {
  category_id: string;
  name: string;
}

/** Tanlangan kategoriya: `id` — daraxt qatori id'si (kalkulyator shuni oladi). */
export interface SelectedCategory {
  id: number;
  full_path: string;
  path: CategoryPath[];
}

/** Bitta so'rov bitta sxemani hisoblaydi. */
export interface CalculatorRequest {
  category_id: number;
  price: number;
  fulfillment_model: CommissionModel;
  old_price?: number;
  cost_price?: number;
  quantity?: number;
  /** Millimetr. Uchalasi yoki hech biri — ikkitasi `50003` qaytaradi. */
  length?: number;
  width?: number;
  height?: number;
  tax_percent?: number;
  expense_per_product?: number;
  /** Faqat DBS. */
  delivery_expense?: number;
  /** Faqat Uzum; sotuvchi tanlamaguncha yuborilmaydi. */
  with_uzum_discount?: boolean;
  /** Faqat Yandex (majburiy) va WB, kilogramm. */
  weight?: number;
}

export interface CalculatorCategory {
  id: number;
  marketplace: string;
  full_path: string;
  path: CategoryPath[];
}

export interface UzumDiscount {
  tiered: boolean;
  choice_required: boolean;
  applied: boolean | null;
  required_percent: number | null;
  base_commission: number | null;
  discounted_commission: number | null;
  buyer_price: number;
}

export interface CalculatorCharge {
  type: string;
  amount: number;
}

export interface CalculatorLogistics {
  fee: number | null;
  volume_litres?: number | null;
  dimensions_missing?: boolean;
  warehouse?: string | null;
  payment_fee?: number | null;
  weight?: number | null;
  charges?: { logistics: CalculatorCharge[]; payment: CalculatorCharge[] } | null;
  default_tariff_used?: boolean;
}

export interface CalculatorExpenses {
  tax_percent: number;
  per_product: number;
  own_delivery: number;
  amount: number;
  dashboard: { tax_percent: number; per_product: number } | null;
}

export interface CalculatorEconomics {
  commission_amount: number;
  logistics_fee: number;
  payment_fee: number;
  expenses: number;
  payout: number;
  profit: number | null;
  margin: number | null;
  roi: number | null;
  break_even_price: number | null;
  max_discount_percent?: number | null;
  /** Faqat Uzum chegirma dasturida — `in` bilan tekshiriladi. */
  discount_amount?: number;
}

export interface CalculatorBatch {
  quantity: number;
  investment: number | null;
  revenue: number;
  profit: number | null;
}

export interface CalculatorSuggestions {
  price: { value: number } | null;
  dimensions: { length: number; width: number; height: number; weight: number } | null;
}

export interface CalculatorResponse {
  price: number;
  cost_price?: number | null;
  category: CalculatorCategory;
  currency: string;
  discount_percent: number | null;
  available_models: CommissionModel[];
  commission: number | null;
  logistics: CalculatorLogistics | null;
  uzum_discount?: UzumDiscount | null;
  expenses: CalculatorExpenses | null;
  economics: CalculatorEconomics | null;
  batch: CalculatorBatch | null;
  suggestions: CalculatorSuggestions;
}

/** `/public/categories/` qatori: daraxt darajasi yoki qidiruv natijasi. */
export interface PublicCategory {
  id: number;
  category_id: string;
  name: string;
  has_children: boolean;
  commission: number | null;
  commission_by_model: CommissionByModel | null;
  path?: string[];
}

export interface CategorySuggestion extends SelectedCategory {
  marketplace: string;
  score: number;
  commission?: number | null;
}

export type CategorySuggestResponse = Partial<Record<CalculatorMarketplace, CategorySuggestion[]>>;

/** Mahsulot sahifasini faqat Uzum va WB o'qishga beradi. */
export type CalculatorLinkMarketplace = Extract<CalculatorMarketplace, "uzum_market" | "wb">;

export interface CalculatorLinkResponse {
  name: string;
  product_id: number;
  sku_id?: number | null;
  price: number | null;
  old_price: number | null;
  category_id: number | null;
  category: CalculatorCategory | null;
  length?: number | null;
  width?: number | null;
  height?: number | null;
  weight?: number | null;
}

/** Ozon'da raqobatchilarni o'qib bo'lmaydi. */
export type CompetitorMarketplace = Exclude<CalculatorMarketplace, "ozon">;
export type CompetitorMode = "search" | "links";
export type CompetitorPriceBasis = "market" | "min_roi";

export interface CompetitorsRequest extends CalculatorRequest {
  marketplace: CompetitorMarketplace;
  name?: string;
  competitor_links?: string[];
}

export interface CompetitorEconomics {
  break_even_price: number;
  below_break_even_count: number;
  at_median: { profit: number; margin: number } | null;
  at_min: { profit: number; margin: number } | null;
}

export interface Competitor {
  id: number | string;
  title: string;
  price: number;
  old_price: number | null;
  rating: number | null;
  reviews: number | null;
  photo: string | null;
  url: string;
  price_date?: string;
  category: { id: number; full_path: string } | null;
  same_category: boolean;
}

export interface Competitors {
  matched_by: "name" | "category" | "links";
  count: number;
  prices: { min: number; median: number; max: number } | null;
  position: { cheaper_count: number; pricier_count: number; percentile: number } | null;
  products: Competitor[];
  unavailable_links?: string[];
  other_category_count?: number;
  your_economics: CompetitorEconomics | null;
}

export interface CompetitorsResponse extends Omit<CalculatorResponse, "suggestions"> {
  suggestions: Omit<CalculatorSuggestions, "price"> & {
    price: {
      value: number;
      old_price: number | null;
      basis?: CompetitorPriceBasis;
      market_median?: number;
    } | null;
    competitors: Competitors | null;
  };
}
