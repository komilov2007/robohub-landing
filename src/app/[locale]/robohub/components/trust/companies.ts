// Ishonch boʻlimi ("1 000 dan ortiq sotuvchi...") uchun maʼlumot: logotiplar devori va ekran oʻquvchi roʻyxati.
// Logotip fayllari va LOGOS roʻyxati avtomatik yigʻiladi: node scripts/logos/build.mjs (manba — public/companies-new).
import { LOGOS, type Logo } from "./logos.data";

// Matnli karta uslubi — logosi hali yoʻq taniqli brendlar uchun (robohub.css, .trust__tile--word[data-w])
export type WordStyle = "sans" | "serif" | "dark" | "wide";
export type Company = { name: string; logo?: string; shape: Logo["shape"]; bg?: string; word?: WordStyle };

/* Taniqli brendlar — katta kartada, devorning oʻrtasidagi alohida qatorda, shu tartibda.
   Logosi yoʻqlari (public/companies-new da fayli yoʻq) hozircha brend nomi bilan matnli karta boʻlib chiqadi:
   fayl qoʻshilgach: scripts/logos/config.json → featured ga fayl nomini, names ga shu yerdagi nomni yozib,
   build.mjs ni ishga tushirish kifoya. */
const FEATURED: (string | { name: string; word: WordStyle })[] = [
  "Li-Ning",
  "Just 2010",
  { name: "Selfie", word: "sans" },
  "DI sport",
  "Kukmara",
  "Texnomart",
  "Time Teller",
  "General Sport",
  { name: "General Fitness", word: "wide" },
  "O.M.S.",
  "Vicalina",
  "Genau",
  { name: "The Blvck Forge", word: "dark" },
  "Piknic UZ",
  { name: "SOKOLOV", word: "serif" },
];

// logo nomi bo'yicha topiladi (config.json → names); topilmasa — matnli karta
const byName = new Map(LOGOS.filter((l) => l.shape === "featured").map((l) => [l.name, l]));
export const FEATURED_ROW: Company[] = FEATURED.map((f) => {
  const { name, word } = typeof f === "string" ? { name: f, word: "sans" as const } : f;
  return byName.get(name) ?? { name, shape: "featured", word };
});

/* Oddiy logolar — aralashtiriladi (bir xil turdagilar yonma-yon toʻplanib qolmasin; tartib har safar bir xil),
   keyin 6 qatorga boʻlinadi: har safar eng qisqa qatorga — qatorlar uzunligi deyarli teng boʻladi. */
const seeded = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const rand = seeded(2026);
const regular = LOGOS.filter((l) => l.shape !== "featured")
  .map((l) => ({ l, k: rand() }))
  .sort((a, b) => a.k - b.k)
  .map(({ l }) => l);

// Plitka eni oraliq bilan birga, oddiy plitka (72 + 14 px) birligida — robohub.css dagi o'lchamlarga mos:
// keng plitka = 2 plitka + oraliq → 2; katta karta = 1.5 × 1.9 plitka (205 px) + oraliq → 2.55
export const UNITS: Record<Logo["shape"], number> = { square: 1, wide: 2, featured: 2.55 };

export const WALL_ROWS = 6;
const rows: Company[][] = Array.from({ length: WALL_ROWS }, () => []);
const len = new Array<number>(WALL_ROWS).fill(0);
for (const l of regular) {
  const r = len.indexOf(Math.min(...len));
  rows[r].push(l);
  len[r] += UNITS[l.shape];
}

/* Devor qatorlari: oʻrtada (4-qator) — taniqli brendlar */
export const FEATURED_AT = 3;
export const ROWS: Company[][] = [...rows.slice(0, FEATURED_AT), FEATURED_ROW, ...rows.slice(FEATURED_AT)];
export const rowUnits = (row: Company[]) => row.reduce((s, c) => s + UNITS[c.shape], 0);

/* Ekran oʻquvchilar uchun roʻyxat: avval taniqli brendlar */
export const COMPANIES: Company[] = [...FEATURED_ROW, ...regular];
