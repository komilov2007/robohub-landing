// Mijozlar logotiplarini bir xil ko'rinishga keltiradi (Robohub landingi, "trust" bo'limi devori).
//
//   node scripts/logos/build.mjs
//
// Manba:  public/companies-new/*  (asl fayllar, har xil o'lcham va fonda)
// Natija: public/logos/<slug>.webp  — tayyor plitka rasmlari (fon + markazdagi logo, burchaklarni CSS yumaloqlaydi)
//         src/app/[locale]/robohub/components/trust/logos.data.ts — ro'yxat (nom, fayl, shakl, fon rangi)
//
// Har bir fayl uchun:
//   1) shaffof chetlar kesiladi;
//   2) fon aniqlanadi: chetlar bir xil rangda bo'lsa — "solid" (fon shu rang), shaffof bo'lsa — oq
//      (logoning o'zi oq bo'lsa — to'q yashil), fon bir xil emas (foto, gradient) — "photo": rasm butunligicha;
//   3) "solid"/shaffof: fon rangidagi bo'sh chetlar kesiladi va logo bir xil "optik" o'lchamga keltiriladi —
//      maydon bo'yicha (kvadrat va cho'ziq logolar bir xil og'irlikda ko'rinadi), eni va bo'yi chegaralangan;
//   4) shakl: kvadrat, cho'ziq logo (eni/bo'yi ≥ 2.6) — keng plitka, config.featured — katta karta.
// Sozlamalar — config.json: featured (katta ko'rsatiladigan taniqli brendlar), names (chiroyli nom),
// files (fayl bo'yicha: skip — chiqarilmaydi va sababi; mode/bg/trim/scale/wide/ink — qo'lda sozlash).
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const __dirname = import.meta.dirname;

const ROOT = path.join(__dirname, "../..");
const SRC = path.join(ROOT, "public/companies-new");
const OUT = path.join(ROOT, "public/logos");
const DATA = path.join(ROOT, "src/app/[locale]/robohub/components/trust/logos.data.ts");
const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, "config.json"), "utf8"));

const H = 144; // chiqish balandligi: 72px plitka × 2 (retina)
const SHAPES = { square: [H, H], wide: [Math.round(H * 2.19), H], featured: [Math.round(H * 1.9), H] };

const slug = (s) =>
  s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9а-яё]+/gi, "-").replace(/^-+|-+$/g, "") || "logo";
const hex = ({ r, g, b }) => "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
const fromHex = (h) => { const n = parseInt(h.slice(1), 16); return { r: n >> 16, g: (n >> 8) & 255, b: n & 255 }; };
const dist = (a, b) => Math.hypot(a.r - b.r, a.g - b.g, a.b - b.b);
const lum = ({ r, g, b }) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

async function raw(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const px = (x, y) => { const i = (y * info.width + x) * 4; return { r: data[i], g: data[i + 1], b: data[i + 2], a: data[i + 3] }; };
  return { data, w: info.width, h: info.height, px };
}
// chetlardan namuna: har chetning o'rtadagi 80% i (yumaloq burchaklar hisobga kirmaydi), 2px chuqurlikda
function edges(R) {
  const s = [];
  const step = Math.max(1, Math.floor(Math.min(R.w, R.h) / 80));
  for (let d = 0; d < 2; d++) {
    for (let x = Math.floor(R.w * 0.1); x < R.w * 0.9; x += step) s.push(R.px(x, d), R.px(x, R.h - 1 - d));
    for (let y = Math.floor(R.h * 0.1); y < R.h * 0.9; y += step) s.push(R.px(d, y), R.px(R.w - 1 - d, y));
  }
  return s;
}
function median(arr) {
  const m = (k) => arr.map((p) => p[k]).sort((a, b) => a - b)[arr.length >> 1];
  return { r: m("r"), g: m("g"), b: m("b") };
}
// shaffof bo'lmagan piksellarning o'rtacha yorqinligi — oq logo oq plitkada yo'qolib qolmasin
function inkLum(R) {
  let s = 0, n = 0;
  for (let i = 0; i < R.data.length; i += 12) if (R.data[i + 3] > 160) { s += lum({ r: R.data[i], g: R.data[i + 1], b: R.data[i + 2] }); n++; }
  return n ? s / n : 0;
}

async function processOne(file, opt, outFile) {
  const src = path.join(SRC, file);
  let buf = await sharp(src).ensureAlpha().png().toBuffer();
  // ink: "light" — to'q fondagi oq logo: yorqinlik shaffoflikka aylanadi (logo oq, fon — opt.bg)
  if (opt.ink === "light") {
    const R0 = await raw(buf);
    const out = Buffer.alloc(R0.data.length);
    for (let i = 0; i < R0.data.length; i += 4) {
      out[i] = out[i + 1] = out[i + 2] = 255;
      out[i + 3] = Math.round(lum({ r: R0.data[i], g: R0.data[i + 1], b: R0.data[i + 2] }) * R0.data[i + 3]);
    }
    buf = await sharp(out, { raw: { width: R0.w, height: R0.h, channels: 4 } }).png().toBuffer();
  }
  try { buf = await sharp(buf).trim({ threshold: 1 }).png().toBuffer(); } catch { /* kesadigan joy yo'q */ }
  const R = await raw(buf);
  const ed = edges(R);
  const opaque = ed.filter((p) => p.a >= 60);

  let kind = opt.mode, bg;
  if (!kind) {
    if (ed.length - opaque.length > ed.length * 0.55) kind = "transparent";
    else {
      bg = median(opaque);
      kind = opaque.filter((p) => dist(p, bg) < 30).length / opaque.length > 0.86 ? "solid" : "photo";
    }
  }
  if (kind === "transparent") bg = inkLum(R) > 0.82 ? { r: 12, g: 59, b: 54 } : { r: 255, g: 255, b: 255 };
  if (opt.bg) bg = fromHex(opt.bg);

  if (kind === "photo") {
    // fon bir xil emas — rasm plitkani to'liq qoplaydi (katta kartada — o'rtada, yonlari chetdagi rangda)
    const shape = opt.featured ? "featured" : "square";
    const [W, Hh] = SHAPES[shape];
    const edge = median(opaque.length ? opaque : ed);
    const inner = await sharp(src).flatten({ background: "#ffffff" }).resize(shape === "featured" ? Hh : W, Hh, { fit: "cover" }).png().toBuffer();
    await sharp({ create: { width: W, height: Hh, channels: 3, background: edge } })
      .composite([{ input: inner, gravity: "center" }]).webp({ quality: 84 }).toFile(outFile);
    return { kind, shape, bg: hex(edge) };
  }

  let flat = await sharp(buf).flatten({ background: bg }).png().toBuffer();
  try { flat = await sharp(flat).trim({ background: bg, threshold: opt.trim ?? 26 }).png().toBuffer(); } catch { /* bo'sh chet yo'q */ }
  const m = await sharp(flat).metadata();
  const r = m.width / m.height;
  const shape = opt.featured ? "featured" : (opt.wide ?? r >= 2.6) ? "wide" : "square";
  const [W, Hh] = SHAPES[shape];
  // maydon ulushi va chegaralar: katta kartada kvadratga yaqin logolar (r < 1.6) balandroq bo'lishi mumkin
  const tall = r < 1.6;
  const area = { square: 0.4, wide: 0.3, featured: tall ? 0.42 : 0.3 }[shape] * (opt.scale ?? 1);
  const maxW = { square: 0.8, wide: 0.82, featured: 0.74 }[shape];
  const maxH = { square: 0.74, wide: 0.62, featured: tall ? 0.82 : 0.6 }[shape];
  let k = Math.sqrt((area * W * Hh) / (m.width * m.height));
  k = Math.min(k, (maxW * W) / m.width, (maxH * Hh) / m.height);
  const w = Math.max(1, Math.round(m.width * k)), h = Math.max(1, Math.round(m.height * k));
  const inner = await sharp(flat).resize(w, h, { kernel: "lanczos3" }).png().toBuffer();
  await sharp({ create: { width: W, height: Hh, channels: 3, background: bg } })
    .composite([{ input: inner, left: Math.round((W - w) / 2), top: Math.round((Hh - h) / 2) }])
    .webp({ quality: 86 }).toFile(outFile);
  return { kind, shape, bg: hex(bg) };
}

(async () => {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  const files = fs.readdirSync(SRC).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)).sort((a, b) => a.localeCompare(b));
  const list = [], skipped = [], used = new Set();
  for (const file of files) {
    const o = cfg.files[file] || {};
    if (o.skip) { skipped.push(`${file} — ${o.skip}`); continue; }
    const name = cfg.names[file] || file.replace(/\.[^.]+$/, "").split(" - ").pop().trim();
    let s = slug(name);
    for (let i = 2; used.has(s); i++) s = `${slug(name)}-${i}`;
    used.add(s);
    const featured = cfg.featured.includes(file);
    const r = await processOne(file, { ...o, featured }, path.join(OUT, `${s}.webp`));
    list.push({ name, logo: `/logos/${s}.webp`, shape: r.shape, bg: r.bg });
  }
  const rows = list.map((x) => "  " + JSON.stringify(x)).join(",\n");
  fs.writeFileSync(
    DATA,
    `// AVTOMATIK yaratiladi: node scripts/logos/build.mjs — qo'lda o'zgartirmang (sozlamalar: scripts/logos/config.json).\n` +
      `// shape: square — oddiy plitka, wide — ikki plitka kengligida, featured — katta karta (taniqli brend).\n` +
      `// bg — plitka foni (rasm yuklanguncha shu rang turadi).\n\n` +
      `export type Logo = { name: string; logo: string; shape: "square" | "wide" | "featured"; bg: string };\n\n` +
      `export const LOGOS: Logo[] = [\n${rows},\n];\n`,
  );
  console.log(`tayyor: ${list.length} ta logo, chiqarilmadi: ${skipped.length}`);
  skipped.forEach((s) => console.log("  - " + s));
})();
