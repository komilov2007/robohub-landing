"use client";

import { useEffect, useRef } from "react";
import { money } from "../../robosell.content";

// Hisoblagich: ekranga kirganda `from` dan `to` gacha ~1.6 s da tushadi (bir marta).
// Serverda va JS siz — darhol yakuniy son; reduced-motion'da ham shunday.
export default function PriceCounter({ from, to }: { from: number; to: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.textContent = money(from);
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / 1600);
          // tez boshlanib, oxirida sekinlashadi — katta son "eriydi"
          const k = 1 - Math.pow(1 - p, 4);
          el.textContent = money(from + (to - from) * k);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [from, to]);

  return (
    <span ref={ref} className="rs-count">
      {money(to)}
    </span>
  );
}
