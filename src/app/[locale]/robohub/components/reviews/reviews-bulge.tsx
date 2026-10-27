"use client";

import { useEffect } from "react";

// "O'rtasi shishib turgan" lenta: har kadrda kartaning ekran markazidan uzoqligiga qarab o'lchami va shaffofligi
// beriladi — markazdagisi to'liq o'lchamda, chetga borgan sari kichrayib xiralashadi (lenta CSS animatsiyasi bilan
// suriladi, bu faqat kartalarning o'zini o'zgartiradi). Bo'lim ekranda bo'lgandagina ishlaydi.
const SHRINK = 0.2; // chetdagi karta shuncha kichrayadi (0.2 → 80%)
const FADE = 0.45; // chetdagi karta shuncha xiralashadi

export default function ReviewsBulge() {
  useEffect(() => {
    const sec = document.getElementById("reviews");
    if (!sec || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = Array.from(sec.querySelectorAll<HTMLElement>(".revs__track > li, .revs__chats > li"));
    let raf = 0;
    let on = false;

    const frame = () => {
      const half = window.innerWidth / 2;
      const soft = window.innerWidth < 700 ? 0.5 : 1; // telefonda effekt yengilroq — 1–2 karta ko'rinadi
      for (const el of items) {
        const r = el.getBoundingClientRect();
        if (r.right < -200 || r.left > window.innerWidth + 200) continue;
        const d = Math.min(1, Math.abs(r.left + r.width / 2 - half) / half); // 0 markaz · 1 ekran cheti
        const k = d * d; // markaz atrofida keng "tekis" joy, chetda tez kichrayadi
        el.style.transform = `scale(${(1 - SHRINK * soft * k).toFixed(3)})`;
        el.style.opacity = (1 - FADE * soft * k).toFixed(3);
      }
      raf = on ? requestAnimationFrame(frame) : 0;
    };
    const io = new IntersectionObserver(([e]) => {
      on = e.isIntersecting;
      if (on && !raf) raf = requestAnimationFrame(frame);
    });
    io.observe(sec);
    return () => {
      on = false;
      io.disconnect();
      cancelAnimationFrame(raf);
      items.forEach((el) => {
        el.style.transform = "";
        el.style.opacity = "";
      });
    };
  }, []);
  return null;
}
