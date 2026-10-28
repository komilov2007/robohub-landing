// Raqamlar formati — rb-market src/lib/currency.ts va src/lib/commission.ts dagi qoidalar.

// Kirill tillari (ru, kk, ky, tg) — ruscha format: kasr vergul bilan; uz/en/kaa — nuqta bilan.
const CYRILLIC = new Set(["ru", "kk", "ky", "tg"]);
/** Kasrli son (foiz, litr) formati uchun Intl tili */
export const numberLocale = (lang: string) => (CYRILLIC.has(lang) ? "ru-RU" : "en-US");

/** Pul: `250 000` — kasr qismsiz, guruhlash bo'sh joy bilan (Chromium uz-UZ'da vergul qo'yadi — almashtiriladi). */
export const formatMoney = (value: number | string, lang: string) => {
  const amount = parseFloat(String(value));
  if (!Number.isFinite(amount)) return "0";
  return new Intl.NumberFormat(CYRILLIC.has(lang) ? "ru-RU" : "uz-UZ", { maximumFractionDigits: 0 })
    .format(amount)
    .replace(/,/g, " ");
};

/** Foiz: ortiqcha nolsiz; kirill tillarida vergul, uz/en/kaa da nuqta. */
export const formatPercentValue = (value: number, lang: string, maximumFractionDigits = 2) =>
  `${new Intl.NumberFormat(numberLocale(lang), { maximumFractionDigits }).format(value)}%`;

/** Bo'sh yoki chala qiymat — null; aks holda chekli son. */
export const readNumber = (value: unknown) => {
  if (value === "" || value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

/** `0` — haqiqiy javob (soliq, xarajat); faqat bo'sh maydon "yo'q" degani. */
export const isFilled = (value: unknown) => value !== "" && value !== null && value !== undefined;
