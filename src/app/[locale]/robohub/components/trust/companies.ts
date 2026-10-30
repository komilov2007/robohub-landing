// Ishonch boʻlimi ("1 000 dan ortiq sotuvchi...") uchun maʼlumot: logotiplar devori va ekran oʻquvchi roʻyxati.
// Logotip fayllari va LOGOS roʻyxati avtomatik yigʻiladi: node scripts/logos/build.mjs (manba — public/companies-new).
import { LOGOS, type Logo } from "./logos.data";

// Matnli karta uslubi — logosi hali yoʻq taniqli brendlar uchun (robohub.css, .trust__tile--word[data-w])
export type WordStyle = "sans" | "serif" | "dark" | "wide";
export type Company = { name: string; logo?: string; shape: Logo["shape"]; bg?: string; word?: WordStyle };

/* Logosi hali yoʻq taniqli brendlar — brend nomi bilan matnli karta (keng plitka), boshqa logolar orasida aralash.
   Fayl qoʻshilgach (public/companies-new) bu yerdan olib tashlab, build.mjs ni ishga tushirish kifoya. */
const WORDS: { name: string; word: WordStyle }[] = [
  { name: "Selfie", word: "sans" },
  { name: "General Fitness", word: "wide" },
  { name: "The Blvck Forge", word: "dark" },
  { name: "SOKOLOV", word: "serif" },
];
const WORD_TILES: Company[] = WORDS.map((w) => ({ ...w, shape: "wide" }));

/* Oddiy logolar — aralashtiriladi (bir xil turdagilar yonma-yon toʻplanib qolmasin; tartib har safar bir xil),
   keyin 7 qatorga boʻlinadi: har safar eng qisqa qatorga — qatorlar uzunligi deyarli teng boʻladi. */
const seeded = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
/* Asosiy brendlar — har qator boshida turadi va lenta boshlanganda birinchi ko'rinadi (trust.script.js qator
   boshini matn ustunining o'ng chetiga suradi). Qatorlarga navbat bilan, ROW_ORDER tartibida tarqatiladi:
   telefonda faqat 2–5-qatorlar ko'rinadi, shuning uchun ro'yxat boshi o'sha qatorlarga tushadi. */
const TOP = [
  "Li-Ning", "Just 2010", "Selfie", "DI sport", "Kukmara", "Texnomart", "Time Teller", "General Sport",
  "General Fitness", "O.M.S.", "Vicalina", "Genau", "The Blvck Forge", "Piknic UZ", "SOKOLOV",
];
const ROW_ORDER = [1, 2, 3, 4, 0, 5, 6];

const rand = seeded(2026);
const all: Company[] = [...LOGOS, ...WORD_TILES];
const top = TOP.map((n) => all.find((c) => c.name === n)).filter((c): c is Company => !!c);
const regular: Company[] = all
  .filter((c) => !top.includes(c))
  .map((l) => ({ l, k: rand() }))
  .sort((a, b) => a.k - b.k)
  .map(({ l }) => l);

// Plitka eni oraliq bilan birga, oddiy plitka (72 + 14 px) birligida — robohub.css dagi o'lchamlarga mos:
// keng plitka = 2 plitka + oraliq → 2; katta karta = 1.5 × 1.9 plitka (205 px) + oraliq → 2.55
export const UNITS: Record<Logo["shape"], number> = { square: 1, wide: 2, featured: 2.55 };

export const WALL_ROWS = 7;
const rows: Company[][] = Array.from({ length: WALL_ROWS }, () => []);
const len = new Array<number>(WALL_ROWS).fill(0);
top.forEach((c, i) => {
  const r = ROW_ORDER[i % WALL_ROWS];
  rows[r].push(c);
  len[r] += UNITS[c.shape];
});
for (const l of regular) {
  const r = len.indexOf(Math.min(...len));
  rows[r].push(l);
  len[r] += UNITS[l.shape];
}

export const ROWS = rows;
export const rowUnits = (row: Company[]) => row.reduce((s, c) => s + UNITS[c.shape], 0);

/* Ekran oʻquvchilar uchun roʻyxat */
export const COMPANIES: Company[] = [...top, ...regular];
