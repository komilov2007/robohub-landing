"use client";

import { useEffect } from "react";

// Bosh sahifa effektlari — bitta yengil tinglovchi (event delegation). DOM'ga faqat CSS o'zgaruvchilar yoziladi:
//   [data-glow]   — kursor ortidan yuradigan yorug'lik: --mx, --my (px)
//   [data-tilt]   — 3D og'ish: --rx, --ry (deg)
//   [data-magnet] — tugma kursorga tortiladi: --tx, --ty (px)
// Faqat sichqoncha (pointer: fine) va harakat cheklanmagan bo'lsa ishlaydi; aks holda element joyida turadi.
const SELECTORS = ["[data-glow]", "[data-tilt]", "[data-magnet]"] as const;
const VARS = ["--rx", "--ry", "--tx", "--ty"];

export default function Fx() {
  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let ev: PointerEvent | null = null;
    let active: HTMLElement[] = [];

    const reset = (el: HTMLElement) => VARS.forEach((p) => el.style.removeProperty(p));

    const frame = () => {
      raf = 0;
      if (!ev) return;
      const target = ev.target instanceof Element ? ev.target : null;
      const els = SELECTORS.map((s) => target?.closest<HTMLElement>(s) ?? null);
      const next = els.filter((e): e is HTMLElement => e !== null);
      for (const el of active) if (!next.includes(el)) reset(el);
      active = next;
      // avval o'lchash, keyin yozish — majburiy reflow bo'lmasin
      const rects = els.map((el) => el?.getBoundingClientRect());
      const [glow, tilt, magnet] = els;
      const { clientX: x, clientY: y } = ev;
      if (glow && rects[0]) {
        glow.style.setProperty("--mx", `${(x - rects[0].left).toFixed(0)}px`);
        glow.style.setProperty("--my", `${(y - rects[0].top).toFixed(0)}px`);
      }
      if (tilt && rects[1]) {
        const r = rects[1];
        tilt.style.setProperty("--ry", `${(((x - r.left) / r.width - 0.5) * 12).toFixed(2)}deg`);
        tilt.style.setProperty("--rx", `${(((y - r.top) / r.height - 0.5) * -12).toFixed(2)}deg`);
      }
      if (magnet && rects[2]) {
        const r = rects[2];
        magnet.style.setProperty("--tx", `${((x - r.left - r.width / 2) * 0.22).toFixed(1)}px`);
        magnet.style.setProperty("--ty", `${((y - r.top - r.height / 2) * 0.3).toFixed(1)}px`);
      }
    };

    const onMove = (e: PointerEvent) => {
      ev = e;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onLeave = () => {
      active.forEach(reset);
      active = [];
      ev = null;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      onLeave();
    };
  }, []);
  return null;
}
