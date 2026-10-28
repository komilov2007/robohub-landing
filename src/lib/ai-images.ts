import type { Locale } from "@/i18n/config";

// Infografika rasmlari har tilda (yozuvlari shu tilda): public/ai/i18n/<mahsulot>-<til>.webp, 750×1000.
// Manba — public/ai/<mahsulot>_<til>.jpg (termos_rus.jpg …), WebP'ga o'girilgan.
// Qoraqalpoqcha klaviatura va telefon rasmi hozircha yo'q — ularning o'rnida o'zbekchasi nusxalangan.
// Yangi til yoki mahsulot qo'shilsa — 7 tilning hammasiga fayl qo'yilishi shart.
export type AiProduct = "phone" | "thermos" | "bag" | "earbuds" | "glasses" | "keyboard";

export const aiImage = (product: AiProduct, locale: Locale) => `/ai/i18n/${product}-${locale}.webp`;
