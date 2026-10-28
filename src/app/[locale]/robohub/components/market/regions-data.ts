import type { CountryId } from "./globe";

// Mamlakatlar va ularning marketpleyslari — chapdagi ro'yxat (regions.tsx) va telefondagi yer shari kartochkasi (globe.tsx) uchun umumiy.
export type MpId =
  | "uzum"
  | "wildberries"
  | "ozon"
  | "yandex"
  | "kaspi"
  | "teez"
  | "mmarket"
  | "namba"
  | "laklak"
  | "avval";

// logo bo'lmasa — nomning bosh harfi bilan belgi (rasmiy logotip fayli qo'shilganda shu yerga yoziladi)
// wide — logotip o'zi nomli yozuv (wordmark): nomsiz, to'liq kenglikda chiziladi
export const MP: Record<MpId, { name: string; logo?: string; wide?: boolean }> = {
  uzum: { name: "Uzum Market", logo: "/marketplaces/uzum.svg" },
  wildberries: { name: "Wildberries", logo: "/marketplaces/wildberries.svg" },
  ozon: { name: "Ozon", logo: "/marketplaces/ozon.svg" },
  yandex: { name: "Yandex Market", logo: "/marketplaces/yandex.svg" },
  kaspi: { name: "Kaspi", logo: "/marketplaces/kaspi.svg" },
  teez: { name: "Teez", logo: "/marketplaces/teez.webp", wide: true },
  mmarket: { name: "MMarket", logo: "/marketplaces/mmarket.svg", wide: true },
  namba: { name: "Namba One", logo: "/marketplaces/namba.svg", wide: true },
  laklak: { name: "LakLak", logo: "/marketplaces/laklak.webp", wide: true },
  avval: { name: "Avval", logo: "/marketplaces/avval.svg", wide: true },
};

// mamlakatlar tartibi va har biridagi marketpleyslar: now — ulangan, soon — tez kunda
export const ROWS: { id: CountryId; now: MpId[]; soon: MpId[] }[] = [
  { id: "uz", now: ["uzum", "wildberries", "ozon", "yandex"], soon: [] },
  { id: "kz", now: ["wildberries", "ozon"], soon: ["kaspi", "teez"] },
  { id: "kg", now: ["wildberries", "ozon"], soon: ["mmarket", "namba"] },
  { id: "ru", now: ["wildberries", "ozon", "yandex"], soon: [] },
  { id: "tj", now: ["wildberries"], soon: ["laklak", "avval"] },
];
