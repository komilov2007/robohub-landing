"use client";

import { useMemo, useState } from "react";
import { useT } from "./i18n";
import { useDebounce, useQuery } from "./query";
import { isFilled, readNumber } from "./format";
import { NO_CALCULATOR_PARAMS, type CalculatorParams } from "./params";
import { useCalculatorCompetitors } from "./useCalculatorCompetitors";
import { API_ERROR_CODES, CALCULATOR_ERROR_NOTICE, DEFAULT_MODEL, MARKETPLACE_MODELS } from "./constants";
import {
  getApiErrorCode,
  getApiErrorDetails,
  getApiErrorField,
  getApiErrorMessage,
  getApiErrorStatus,
  getRetryAfterSeconds,
  postPublicCalculator,
  postPublicCategorySuggest,
} from "./api";
import type {
  CalculatorLinkResponse,
  CalculatorMarketplace,
  CalculatorRequest,
  CommissionModel,
  SelectedCategory,
} from "./types";

// rb-market useMarketplaceCalculator.ts ning mehmon (isGuest) varianti: o'sha holatlar, o'sha so'rov tanasi,
// o'sha xato va "keyingi qadam" mantiqi. Forma — React Hook Form o'rniga oddiy holat (maydon — satr),
// tekshiruv qoidalari yup sxemasidagidek.

/** Serverning chegarasi — har tugma bosishga bitta so'rov uni tez tugatadi. */
const CALCULATE_DEBOUNCE_MS = 400;

export const FIELDS = [
  "price",
  "old_price",
  "cost_price",
  "quantity",
  "length",
  "width",
  "height",
  "weight",
  "tax_percent",
  "expense_per_product",
  "own_delivery",
] as const;
export type FieldName = (typeof FIELDS)[number];
export type FormValues = Record<FieldName, string>;

const BLANK_VALUES = Object.fromEntries(FIELDS.map((name) => [name, ""])) as FormValues;

/** Do'kon valyutasidagi maydonlar — bir valyutadagi tablar orasida umumiy, valyutalar orasida alohida. */
const MONEY_FIELDS = ["price", "old_price", "cost_price", "own_delivery", "expense_per_product"] as const;
const PARCEL_FIELDS = ["length", "width", "height", "weight"] as const;

const DEFAULT_CURRENCY = "UZS";

interface TabSnapshot {
  category: SelectedCategory | null;
  model: CommissionModel;
  withUzumDiscount: boolean | null;
  offeredModels: CommissionModel[] | null;
}

export interface CalculatorNotice {
  tone: "step" | "warning" | "error";
  text: string;
  step?: number;
  onRetry?: () => void;
  retryLabel?: string;
  titleKey?: string;
}

const getAvailableModels = (error: unknown) =>
  getApiErrorDetails<{ available_models?: CommissionModel[] }>(error)?.available_models;

const countSides = (...sides: unknown[]) => sides.filter((side) => (readNumber(side) ?? 0) > 0).length;

const toString = (value: number | null | undefined) => (value === null || value === undefined ? "" : String(value));

export const useMarketplaceCalculator = ({
  marketplaces,
  params = NO_CALCULATOR_PARAMS,
}: {
  marketplaces: CalculatorMarketplace[];
  params?: CalculatorParams;
}) => {
  const { t } = useT();
  const [marketplace, setMarketplace] = useState<CalculatorMarketplace>(params.marketplace ?? marketplaces[0]);
  /** Havoladagi kategoriya — faqat id; nomi va yo'li birinchi javob bilan keladi. */
  const [category, setCategory] = useState<SelectedCategory | null>(() =>
    params.categoryId ? { id: params.categoryId, full_path: "", path: [] } : null,
  );
  /** Faqat kategoriya tavsiyasi uchun, hisobga yuborilmaydi. */
  const [productName, setProductName] = useState("");
  const [finishedName, setFinishedName] = useState("");
  /** null — "hali so'ralmagan": birinchi so'rovda yuborilmaydi va server `choice_required` qaytaradi. */
  const [withUzumDiscount, setWithUzumDiscount] = useState<boolean | null>(null);
  const [model, setModel] = useState<CommissionModel>(params.model ?? DEFAULT_MODEL);
  const [offeredModels, setOfferedModels] = useState<CommissionModel[] | null>(null);
  const [snapshots, setSnapshots] = useState<Partial<Record<CalculatorMarketplace, TabSnapshot>>>({});
  const [currencyByMarketplace, setCurrencyByMarketplace] = useState<Partial<Record<CalculatorMarketplace, string>>>({});
  const [moneyByCurrency, setMoneyByCurrency] = useState<
    Partial<Record<string, Pick<FormValues, (typeof MONEY_FIELDS)[number]>>>
  >({});

  const [values, setValues] = useState<FormValues>(() => ({
    ...BLANK_VALUES,
    ...Object.fromEntries(Object.entries(params.values).map(([k, v]) => [k, toString(v)])),
  }));
  /** Server maydonga bog'lagan xatolar — o'sha maydon o'zgarganda o'chadi. */
  const [serverErrors, setServerErrors] = useState<Partial<Record<FieldName, string>>>({});

  /** Maydon qiymati — xom satr ("150000", "0.5" yoki ""). Narx o'zgarsa eski narxning server xatosi ham o'chadi. */
  const setField = (name: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setServerErrors((prev) =>
      prev[name] || (name === "price" && prev.old_price)
        ? { ...prev, [name]: undefined, ...(name === "price" && { old_price: undefined }) }
        : prev,
    );
  };

  const {
    price,
    old_price: oldPrice,
    cost_price: costPrice,
    quantity,
    length,
    width,
    height,
    weight,
    tax_percent: tax,
    expense_per_product: expense,
    own_delivery: ownDelivery,
  } = values;

  const priceValue = readNumber(price);
  const oldPriceValue = readNumber(oldPrice);
  const ownDeliveryValue = model === "dbs" ? (readNumber(ownDelivery) ?? 0) : 0;
  const hasPrice = priceValue !== null && priceValue > 0;
  const oldPriceBelow = oldPriceValue !== null && priceValue !== null && oldPriceValue < priceValue;
  const isYandex = marketplace === "yandex_market";
  /** DBS'da o'lcham kerak emas — Yandex'dan tashqari (uning tarif kalkulyatori har sxemada so'raydi). */
  const needsDimensions = model !== "dbs" || isYandex;
  /** Yandex og'irliksiz hisoblamaydi; WB qabul qiladi. Uzum va Ozon — faqat hajm bo'yicha. */
  const needsWeight = (isYandex || marketplace === "wb") && needsDimensions;
  const filledSides = needsDimensions ? countSides(length, width, height) : 0;
  const dimensionsIncomplete = filledSides > 0 && filledSides < 3;
  const weightValue = readNumber(weight);
  const yandexIncomplete = isYandex && (!hasPrice || filledSides < 3 || weightValue === null || weightValue <= 0);
  /** 400 qaytaradigan chala kiritish — oxirgi javob ushlab turiladi. */
  const held = dimensionsIncomplete || yandexIncomplete || oldPriceBelow;

  /** yup sxemasidagi qoidalar: min 0, soni ≥ 1, soliq ≤ 100, eski narx ≥ narx. */
  const errors: Partial<Record<FieldName, string>> = {
    ...serverErrors,
    ...(oldPriceBelow && { old_price: t("old_price_must_be_greater_than_base_price") }),
    ...(quantity !== "" && (readNumber(quantity) ?? 0) < 1 && { quantity: t("invalid_value") }),
    ...((readNumber(tax) ?? 0) > 100 && { tax_percent: t("invalid_value") }),
  };

  const payload = useMemo<CalculatorRequest | null>(() => {
    if (!category || held) return null;
    const costValue = readNumber(costPrice);
    const quantityValue = readNumber(quantity);
    const expenseValue = isFilled(expense) ? Number(expense) : null;
    const taxValue = readNumber(tax);
    return {
      category_id: category.id,
      // Bo'sh narx ham 0 bo'lib ketadi: komissiya va sxemalar narxga bog'liq emas — stavka darhol ko'rinadi.
      price: priceValue ?? 0,
      fulfillment_model: model,
      ...(oldPriceValue !== null && { old_price: oldPriceValue }),
      ...(costValue !== null && { cost_price: costValue }),
      ...(quantityValue !== null && quantityValue > 1 && { quantity: quantityValue }),
      ...(filledSides === 3 && { length: Number(length), width: Number(width), height: Number(height) }),
      ...(taxValue !== null && taxValue <= 100 && { tax_percent: taxValue }),
      ...(expenseValue !== null && { expense_per_product: expenseValue }),
      ...(model === "dbs" && ownDeliveryValue > 0 && { delivery_expense: ownDeliveryValue }),
      ...(marketplace === "uzum_market" && withUzumDiscount !== null && { with_uzum_discount: withUzumDiscount }),
      ...(needsWeight && weightValue !== null && { weight: weightValue }),
    };
  }, [
    held,
    category,
    model,
    needsWeight,
    marketplace,
    withUzumDiscount,
    priceValue,
    oldPriceValue,
    weightValue,
    filledSides,
    ownDeliveryValue,
    costPrice,
    quantity,
    length,
    width,
    height,
    tax,
    expense,
  ]);

  const debouncedPayload = useDebounce(payload, CALCULATE_DEBOUNCE_MS);
  /** Faqat yozish to'xtagan tana yuboriladi — 400ms oldingi tana eski xato bilan yaxshi javobni o'chirib yubormasin. */
  const settled = debouncedPayload === payload;

  const calculation = useQuery({
    enabled: !!payload && settled,
    key: ["calculator", marketplace, debouncedPayload],
    fn: () => postPublicCalculator(marketplace, debouncedPayload as CalculatorRequest),
    keepPrevious: true,
    onSuccess: (res) => {
      setServerErrors((prev) => (prev.old_price ? { ...prev, old_price: undefined } : prev));
      const answered = res.category.marketplace as CalculatorMarketplace;
      setCurrencyByMarketplace((prev) =>
        prev[answered] === res.currency ? prev : { ...prev, [answered]: res.currency },
      );
      setOfferedModels(res.available_models);
      // Havoladagi id nomi va yo'lini faqat javobdan oladi — bo'sh yo'l bo'lsa to'ldiriladi.
      setCategory((prev) =>
        prev && prev.id === res.category.id && !prev.path.length
          ? { id: res.category.id, full_path: res.category.full_path, path: res.category.path }
          : prev,
      );
    },
    onError: (error) => {
      const code = getApiErrorCode(error);
      if (code === API_ERROR_CODES.CALCULATOR_MODEL_NOT_AVAILABLE) {
        const available = getAvailableModels(error);
        if (available?.length) {
          setOfferedModels(available);
          // Sxema ro'yxatda bo'lsa — marketpleysning o'zi rad etgan (Yandex DBS): sababi notice'da ko'rinadi.
          if (!available.includes(model)) setModel(available[0]);
        }
        return;
      }
      if (code === API_ERROR_CODES.CALCULATOR_DELIVERY_EXPENSE_NOT_DBS) {
        setServerErrors((prev) => ({ ...prev, own_delivery: getApiErrorMessage(error) }));
        return;
      }
      if (code === API_ERROR_CODES.CALCULATOR_OLD_PRICE_BELOW_PRICE) {
        setServerErrors((prev) => ({ ...prev, old_price: t("old_price_must_be_greater_than_base_price") }));
        return;
      }
      // Oddiy maydon xatosi — server Accept-Language bo'yicha tarjima qilib yuboradi.
      const field = getApiErrorField(error);
      if (!code && field && field in BLANK_VALUES) {
        setServerErrors((prev) => ({ ...prev, [field]: getApiErrorMessage(error) }));
      }
    },
  });

  const resetSelection = () => {
    setWithUzumDiscount(null);
    setModel(DEFAULT_MODEL);
    setOfferedModels(null);
  };

  const handleMarketplace = (next: CalculatorMarketplace) => {
    if (next === marketplace) return;
    setSnapshots((prev) => ({ ...prev, [marketplace]: { category, model, withUzumDiscount, offeredModels } }));
    setMarketplace(next);

    // Kategoriya, sxema va chegirma javobi bitta marketpleys daraxtiga tegishli: ko'rilgan tabda — qaytadi, yangisida — bo'sh.
    const saved = snapshots[next];
    setCategory(saved?.category ?? null);
    setModel(saved?.model ?? DEFAULT_MODEL);
    setWithUzumDiscount(saved?.withUzumDiscount ?? null);
    setOfferedModels(saved?.offeredModels ?? null);

    // Son, o'lcham va soliq hamma joyda bir xil — qoladi. Pul bir valyutadagi tablar orasida qoladi,
    // boshqa valyutaga o'tilganda o'sha valyutada oxirgi yozilgani qaytadi.
    const from = currencyByMarketplace[marketplace] ?? DEFAULT_CURRENCY;
    const to = currencyByMarketplace[next] ?? DEFAULT_CURRENCY;
    if (from === to) return;
    setMoneyByCurrency((prev) => ({
      ...prev,
      [from]: Object.fromEntries(MONEY_FIELDS.map((name) => [name, values[name]])) as Pick<
        FormValues,
        (typeof MONEY_FIELDS)[number]
      >,
    }));
    const money = moneyByCurrency[to];
    setValues((prev) => ({ ...prev, ...Object.fromEntries(MONEY_FIELDS.map((name) => [name, money?.[name] ?? ""])) }));
  };

  const handleCategory = (next: SelectedCategory) => {
    setCategory(next);
    resetSelection();
  };

  // AI kategoriya tavsiyasi — nom tugallanganda (blur / Enter), barcha tablar uchun bitta so'rov.
  const isCyrillic = /[Ѐ-ӿ]/.test(finishedName);
  const committedName = finishedName.trim().replace(/\s+/g, " ");
  const sortedMarketplaces = useMemo(() => [...marketplaces].sort(), [marketplaces]);
  const suggest = useQuery({
    enabled: !!committedName,
    key: ["category-suggest", isCyrillic ? "ru" : "uz", committedName, sortedMarketplaces],
    fn: () =>
      postPublicCategorySuggest({
        ...(isCyrillic ? { name_ru: committedName } : { name_uz: committedName }),
        marketplaces: sortedMarketplaces,
        limit: 1,
      }),
  });
  const suggestions = suggest.data ?? {};
  const suggestionFor = (key: CalculatorMarketplace) => suggestions[key]?.[0] ?? null;

  const handleLinkFilled = (data: CalculatorLinkResponse) => {
    if (data.name) {
      setProductName(data.name);
      setFinishedName(data.name);
    }
    if (data.category) {
      handleCategory({ id: data.category.id, path: data.category.path, full_path: data.category.full_path });
    }
    // WB o'lchamlarni ham beradi — faqat kelganlari yoziladi.
    setValues((prev) => ({
      ...prev,
      price: toString(data.price),
      old_price: toString(data.old_price),
      ...Object.fromEntries(
        PARCEL_FIELDS.filter((name) => data[name] !== null && data[name] !== undefined).map((name) => [name, toString(data[name])]),
      ),
    }));
    setServerErrors({});
  };

  const error = calculation.isError ? calculation.error : null;
  const errorCode = error ? getApiErrorCode(error) : 0;

  // Kategoriya tekshiruvi oldingi tabning raqamlarini yangi tabga chiqarmaydi.
  const data = calculation.data ?? null;
  const result = (payload || held) && !error && data?.category.id === category?.id ? data : null;

  const models = MARKETPLACE_MODELS[marketplace].map((value) => ({
    value,
    available: !offeredModels || offeredModels.includes(value),
  }));

  const retry = () => calculation.refetch();

  /** Xato sotuvchining tilida. Xom server matni ko'rsatilmaydi — marketpleys sxemani rad etganidan tashqari. */
  const errorNotice = ((): CalculatorNotice | null => {
    if (
      !error ||
      errorCode === API_ERROR_CODES.CALCULATOR_OLD_PRICE_BELOW_PRICE ||
      errorCode === API_ERROR_CODES.CALCULATOR_DELIVERY_EXPENSE_NOT_DBS
    ) {
      return null;
    }
    if (errorCode === API_ERROR_CODES.CALCULATOR_MODEL_NOT_AVAILABLE) {
      if (getAvailableModels(error)?.includes(model)) return { tone: "error", text: getApiErrorMessage(error) };
      return offeredModels?.length ? null : { tone: "error", text: t("calculator_error_no_scheme") };
    }
    const key = CALCULATOR_ERROR_NOTICE[errorCode];
    if (key) {
      const outage = errorCode === API_ERROR_CODES.CALCULATOR_TARIFFS_UNAVAILABLE;
      return { tone: "error", text: t(key), onRetry: outage ? retry : undefined };
    }
    const field = getApiErrorField(error);
    if (!errorCode && field && field in BLANK_VALUES) return null;

    const status = getApiErrorStatus(error);
    if (status === 429) {
      return { tone: "warning", text: t("calculator_error_throttled", { seconds: getRetryAfterSeconds(error) ?? 60 }) };
    }
    if (status === 0 || status >= 500) return { tone: "error", text: t("calculator_error_server"), onRetry: retry };
    return { tone: "error", text: t("calculator_error_marketplace_rejected"), onRetry: retry };
  })();

  const hasCostPrice = (readNumber(costPrice) ?? 0) > 0;
  /** 200000 yozilayotganda 2, 20 … o'tadi — ogohlantirish yozish to'xtaganda chiqadi. */
  const oldPriceBelowSettled = useDebounce(oldPriceBelow, CALCULATE_DEBOUNCE_MS) && oldPriceBelow;

  /** Sotuvchi bilishi kerak bo'lgan bitta keyingi narsa — duch keladigan tartibda. */
  const notice = ((): CalculatorNotice | null => {
    const step = (number: number, key: string) => ({ tone: "step" as const, step: number, text: t(key) });
    if (!category) return step(1, "calculator_notice_step_product");
    if (dimensionsIncomplete) return step(3, "calculator_enter_all_dimensions");
    if (yandexIncomplete) {
      return hasPrice ? step(3, "calculator_notice_step_delivery_yandex") : step(2, "calculator_notice_step_prices");
    }
    if (oldPriceBelowSettled) return step(2, "old_price_must_be_greater_than_base_price");
    if (errorNotice) return errorNotice;
    if (!result) return null;
    if (result.uzum_discount?.choice_required && withUzumDiscount === null) return step(2, "uzum_discount_choose");
    if (result.commission === null) return { tone: "error", text: t("commission_rate_not_specified") };
    if (result.logistics?.fee === null) return step(3, "calculator_notice_step_delivery");
    if (!hasPrice || !hasCostPrice) return step(2, "calculator_notice_step_prices");
    if (result.logistics?.dimensions_missing && model !== "dbs" && marketplace === "uzum_market") {
      return { tone: "warning", text: t("calculator_uzum_no_dimensions_fee") };
    }
    return null;
  })();

  /**
   * Yandex quti to'lmaguncha hech narsa qaytarmaydi — tavsiyalar bitta "probe" so'rovi bilan olinadi
   * (tavsiya kategoriyadan chiqadi, qutidan emas). Uning raqamlari natijaga hech qachon tushmaydi.
   */
  const probeCost = debouncedPayload?.cost_price ?? null;
  const probe = useQuery({
    enabled: isYandex && !!category && !result?.suggestions?.dimensions,
    key: ["calculator-probe", marketplace, category?.id, probeCost],
    fn: () =>
      postPublicCalculator(marketplace, {
        category_id: category?.id as number,
        price: 1,
        fulfillment_model: DEFAULT_MODEL,
        ...(probeCost !== null && { cost_price: probeCost }),
        length: 100,
        width: 100,
        height: 100,
        weight: 0.5,
      }),
  });

  const suggestedPrice = result?.suggestions?.price?.value ?? probe.data?.suggestions.price?.value ?? null;
  const priceSuggestion = suggestedPrice !== null && suggestedPrice !== priceValue ? suggestedPrice : null;

  const suggestedBox = result?.suggestions?.dimensions ?? probe.data?.suggestions.dimensions ?? null;
  const parcelValues = { length, width, height, weight };
  const dimensionsSuggestion =
    suggestedBox &&
    PARCEL_FIELDS.some((name) => (name !== "weight" || needsWeight) && readNumber(parcelValues[name]) !== suggestedBox[name])
      ? suggestedBox
      : null;

  /** Narx avval, keyin eski narx — eski narx qoidasi narxni o'qiydi. */
  const applyPrice = (value: number, nextOldPrice?: number | null) => {
    setValues((prev) => ({
      ...prev,
      price: String(value),
      ...(nextOldPrice !== undefined && nextOldPrice !== null && { old_price: String(nextOldPrice) }),
    }));
  };

  const applyPriceSuggestion = () => {
    if (suggestedPrice !== null) applyPrice(suggestedPrice);
  };

  const applyDimensionsSuggestion = () => {
    if (!suggestedBox) return;
    setValues((prev) => ({
      ...prev,
      ...Object.fromEntries(
        PARCEL_FIELDS.filter((name) => name !== "weight" || needsWeight).map((name) => [name, String(suggestedBox[name])]),
      ),
    }));
  };

  const currency = result?.currency ?? currencyByMarketplace[marketplace] ?? DEFAULT_CURRENCY;

  const competitors = useCalculatorCompetitors({ payload, marketplace, productName, hasPrice, applyPrice });

  /** Varaqni tozalaydi — hamma maydon, kategoriya, sxema. */
  const clearAll = () => {
    setValues(BLANK_VALUES);
    setServerErrors({});
    setCategory(null);
    setProductName("");
    setFinishedName("");
    setSnapshots({});
    resetSelection();
    competitors.reset();
  };

  return {
    values,
    errors,
    setField,
    clearAll,
    result,
    notice,
    marketplace,
    handleMarketplace,
    category,
    handleCategory,
    handleLinkFilled,
    productName,
    setProductName,
    /** Nomni tugallangan deb belgilaydi — tavsiyani shu so'raydi. */
    finishProductName: () => setFinishedName(productName),
    /** Maydonda turgan kategoriya tavsiyada qaytarilmaydi. */
    suggestions: (suggestions[marketplace] ?? []).filter((s) => s.id !== category?.id),
    suggestLoading: suggest.isFetching && !suggest.data,
    model,
    setModel,
    models,
    withUzumDiscount,
    setWithUzumDiscount,
    dimensionsIncomplete,
    needsDimensions,
    needsWeight,
    priceSuggestion,
    dimensionsSuggestion,
    applyPriceSuggestion,
    applyDimensionsSuggestion,
    competitors,
    /** To'rtta marketpleysda yonma-yon: har biri o'z kategoriyasi (tanlangani yoki AI tavsiyasi) bilan. */
    comparePayloads: marketplaces
      .map((key) => {
        const picked = key === marketplace ? category : snapshots[key]?.category;
        const suggested = suggestionFor(key);
        const target =
          picked ?? (suggested ? { id: suggested.id, path: suggested.path, full_path: suggested.full_path } : null);
        if (!payload || !target) return null;
        return { marketplace: key, category: target, payload: { ...payload, category_id: target.id } };
      })
      .filter((entry) => entry !== null),
    noDimensionsPenalty: needsDimensions && filledSides === 0 && !!result?.logistics?.dimensions_missing,
    isHeld: held && !!result,
    // Nol narx faqat stavka uchun — uning arifmetikasi haqiqiy zarardek o'qiladi.
    economics: hasPrice || held ? (result?.economics ?? null) : null,
    batch: hasPrice || held ? (result?.batch ?? null) : null,
    currency,
    currencyLabel: t(`calculator_currency_${currency}`, { defaultValue: currency }),
    ownDelivery: result?.expenses?.own_delivery ?? 0,
    price: held && result ? result.price : priceValue,
    costPrice: held && result ? (result.cost_price ?? null) : readNumber(costPrice),
    hasPrice,
    isCalculating: calculation.isFetching,
  };
};

export type MarketplaceCalculatorState = ReturnType<typeof useMarketplaceCalculator>;
