import { grotesk, inter } from "../../fonts";

// Robohub bosh sahifasi shriftlari — AI Studio (AI infografika) bilan bir xil:
//   Space Grotesk — sarlavhalar va raqamlar (kirill harflari Inter'dan), Inter — asosiy matn.
// Academy ham shu shriftlarda (academy/layout.tsx); ariza formasi va 404 sahifasi globals.css dagi Unbounded + Manrope'da qoladi.
// fontClass = shrift o'zgaruvchilari + .rh-font (robohub.css: --font-head/--font-body ni almashtiradi).
// (landing)/layout.tsx o'ramiga va body'ga portal qilinadigan oynalarga (hero videosi, reels) qo'yiladi —
// portallar o'ramdan tashqarida, o'zgaruvchilarni undan meros ololmaydi.
export const fontClass = `${inter.variable} ${grotesk.variable} rh-font`;
