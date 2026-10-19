"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Video devori faqat ekranda ko'rinib turganda harakatlanadi (IntersectionObserver → React holati,
// DOM'ga qo'lda yozilmaydi — gidratatsiya bilan to'qnashmaydi). Hover/focus'da CSS o'zi to'xtatadi.
export default function WallMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`ac-wall${visible ? "" : " is-paused"}`}>
      {children}
    </div>
  );
}
