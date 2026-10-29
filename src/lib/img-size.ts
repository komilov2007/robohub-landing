// Rasmlarning asl o'lchami (width/height atributlari uchun): brauzer joyni oldindan ajratadi — sahifa siljimaydi (CLS),
// Lighthouse "unsized-images" talabi. Atributlar faqat nisbatni beradi: ko'rinadigan o'lcham baribir CSS'dan
// (Playwright'da tekshirilgan — 33 ta rasmning hech birida o'lcham o'zgarmaydi).
const SIZES: Record<string, readonly [number, number]> = {
  "/marketplaces/uzum.svg": [20, 20],
  "/marketplaces/wildberries.svg": [20, 20],
  "/marketplaces/ozon.svg": [20, 20],
  "/marketplaces/yandex.svg": [20, 20],
  "/marketplaces/kaspi.svg": [18, 18],
  "/marketplaces/teez.webp": [800, 258],
  "/marketplaces/mmarket.svg": [175, 32],
  "/marketplaces/namba.svg": [127, 54],
  "/marketplaces/laklak.webp": [240, 44],
  "/marketplaces/avval.svg": [148, 56],
  "/robosell/icons/alif.svg": [30, 37],
  "/robosell/icons/click-outline.svg": [20, 20],
  "/robosell/icons/zoomrad.svg": [512, 512],
  "/integrations/moysklad.svg": [20, 20],
  "/integrations/billz.svg": [20, 20],
  "/integrations/smartup.svg": [20, 20],
  "/integrations/1c.svg": [150, 150],
  "/integrations/era.svg": [20, 20],
  "/integrations/yespos.svg": [20, 20],
  "/integrations/bito.svg": [20, 20],
  "/integrations/sales-doctor.svg": [44, 44],
  "/integrations/retail-crm.svg": [100, 100],
  "/integrations/apicore-logo.svg": [202, 202],
};

export function imgSize(src: string): { width?: number; height?: number } {
  const s = SIZES[src] ?? (src.includes("i.ytimg.com/") ? (src.endsWith("/oar2.jpg") ? [1080, 1920] : [480, 360]) : undefined);
  return s ? { width: s[0], height: s[1] } : {};
}
