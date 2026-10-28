// Imkoniyatlar paneli ikonkalari — Robohub header'i va Academy header'idagi "Imkoniyatlar" menyusi uchun umumiy.
// Panel bandlari ikonkalari (24×24, chiziqli) — header.i18n dagi tartibda: avval imkoniyatlar, keyin vositalar.
export const FEAT_ICONS = [
  "M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8", // mahsulotlar
  "M3 21V9l9-6 9 6v12M7 21v-8h10v8M7 17h10", // qoldiqlar va omborlar
  "M9 4h6v3H9zM7 5.5H6a1 1 0 0 0-1 1V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6.5a1 1 0 0 0-1-1h-1M9 12h6M9 16h4", // buyurtmalar
  "M3 21h18M7 17v-5M12 17V7M17 17v-8", // ichki tahlil
  "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4M8 13l2-2 2 2 2.5-3", // tashqi tahlil
  "M3 10v4a1 1 0 0 0 1 1h3l5 4V5L7 9H4a1 1 0 0 0-1 1zM16 9a3 3 0 0 1 0 6M18.5 6.5a7 7 0 0 1 0 11", // reklama
  "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12zM8.5 11h7M8.5 14.5h4", // xabarlar va sharhlar
];
export const TOOL_ICONS = [
  "M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.5 7h7M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5V18M8.5 18h.01M12 18h.01", // kalkulyator
  "M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9zM18.5 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z", // AI studiya
  "M9 7V3M15 7V3M6 7h12v4a6 6 0 0 1-12 0zM12 17v4", // integratsiyalar
  "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18", // marketpleyslar va mamlakatlar
  "M9 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20a6.5 6.5 0 0 1 13 0M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2a6.5 6.5 0 0 1 3.5 5.8", // sotuvchilar forumi
];
export const AI_TOOL = 1; // AI studiya — alohida rangda (AI Studio brendi)
export const SOON_TOOL = 4; // Sotuvchilar forumi — hali ishga tushmagan, yonida "Tez kunda" belgisi

// Imkoniyatlar panelidagi har band → "Imkoniyatlar" bo'limidagi qaysi karta (0 dan, features.i18n tools tartibida).
// Ichki va tashqi tahlil — bitta karta. Landing ichida header.script.js sahifani shu kartaga aylantiradi ("feat:go");
// boshqa sahifalardan (Academy, Kalkulyator, AI Studio menyusi) — featHash(i) havolasi: landing ochilib, sahna o'sha kartada.
export const FEAT_STEP = [0, 1, 2, 3, 3, 4, 5];
export const featHash = (step: number) => `#features-${step}`;
