"use client";

import { useEffect } from "react";

// Bosh sahifa effektlari — bitta yengil tinglovchi (event delegation). CSS o'zgaruvchilar elementning `style`iga
// EMAS, React boshqarmaydigan alohida jadvalga (adoptedStyleSheets) `:hover` qoidalari orqali yoziladi:
//   [data-glow]   — kursor ortidan yuradigan yorug'lik: --mx, --my (px)
//   [data-tilt]   — 3D og'ish: --rx, --ry (deg)
//   [data-magnet] — tugma kursorga tortiladi: --tx, --ty (px)
// Sabab: Fx layout'da turadi va sahifa hali gidratsiya bo'lmasdan ishga tushadi — inline style yozilsa, React server
// HTML bilan mos kelmaslik (hydration mismatch) xatosini beradi. Kursor chiqqach `:hover` o'chadi va qiymatlar
// o'z-o'zidan CSS'dagi standart holatga qaytadi.
// Faqat sichqoncha (pointer: fine) va harakat cheklanmagan bo'lsa ishlaydi; aks holda element joyida turadi.
const SELECTORS = ["[data-glow]", "[data-tilt]", "[data-magnet]"] as const;

export default function Fx() {
  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // har bir tur uchun bitta qoida: kursor ostidagi eng ichki element (ichida o'sha turdagi hover'li element yo'q)
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(SELECTORS.map((s) => `${s}:hover:not(:has(${s}:hover)){}`).join("\n"));
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
    const [glowRule, tiltRule, magnetRule] = Array.from(sheet.cssRules) as CSSStyleRule[];

    let raf = 0;
    let ev: PointerEvent | null = null;

    const frame = () => {
      raf = 0;
      if (!ev) return;
      const target = ev.target instanceof Element ? ev.target : null;
      const [glow, tilt, magnet] = SELECTORS.map((s) => target?.closest<HTMLElement>(s) ?? null);
      const { clientX: x, clientY: y } = ev;
      if (glow) {
        const r = glow.getBoundingClientRect();
        glowRule.style.setProperty("--mx", `${(x - r.left).toFixed(0)}px`);
        glowRule.style.setProperty("--my", `${(y - r.top).toFixed(0)}px`);
      }
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        tiltRule.style.setProperty("--ry", `${(((x - r.left) / r.width - 0.5) * 12).toFixed(2)}deg`);
        tiltRule.style.setProperty("--rx", `${(((y - r.top) / r.height - 0.5) * -12).toFixed(2)}deg`);
      }
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        magnetRule.style.setProperty("--tx", `${((x - r.left - r.width / 2) * 0.22).toFixed(1)}px`);
        magnetRule.style.setProperty("--ty", `${((y - r.top - r.height / 2) * 0.3).toFixed(1)}px`);
      }
    };

    const onMove = (e: PointerEvent) => {
      ev = e;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      document.adoptedStyleSheets = document.adoptedStyleSheets.filter((s) => s !== sheet);
    };
  }, []);
  return null;
}
