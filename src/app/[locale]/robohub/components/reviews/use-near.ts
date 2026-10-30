"use client";

import { useEffect, useState } from "react";

// Bo'lim ekranga yaqinlashdimi (margin ichida). Lentalarning ikkinchi nusxasi shundan keyin chiziladi:
// sahifa ochilishida HTML, gidratatsiya va birinchi layout ishi kamayadi. Yaqinlashgach — doim true.
export function useNear(id: string, margin = "1200px 0px") {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setNear(true);
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [id, margin]);
  return near;
}
