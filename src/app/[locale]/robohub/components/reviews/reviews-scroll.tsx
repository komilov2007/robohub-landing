"use client";

import { useEffect } from "react";

// Sharhlar lentalari (videosharhlar va Telegram fikrlari): o'zi sekin suriladi va cheksiz takrorlanadi, lekin endi
// foydalanuvchi ham yonga sura oladi — telefonda barmoq bilan, kompyuterda sichqoncha bilan tortib yoki trackpad bilan.
// Lenta — oddiy gorizontal scroll (scrollbar yashirin, robohub.css); ro'yxat ikki nusxada chizilgan, shuning uchun
// pozitsiya bir nusxa (half) oralig'ida ushlab turiladi — ulanish bilinmaydi.
// Avtomatik surish: sichqoncha ustida to'xtaydi; foydalanuvchi surgach IDLE ms kutib, keyin davom etadi.
const LANES: { sel: string; speed: number }[] = [
  { sel: ".revs__vmarquee", speed: 38 }, // px/s
  { sel: ".revs__marquee", speed: 32 },
];
const IDLE = 3000;

export default function ReviewsScroll() {
  useEffect(() => {
    const sec = document.getElementById("reviews");
    if (!sec) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];

    for (const { sel, speed } of LANES) {
      const el = sec.querySelector<HTMLElement>(sel);
      if (!el) continue;
      let pos = 0;
      let half = 0;
      let margin = 0;
      let userUntil = 0;
      let hover = false;
      let visible = false;
      let raf = 0;
      let last = 0;

      // pos har doim [margin, margin + half] oralig'ida: chap va o'ng tomonda doim surish uchun joy bor
      const measure = () => {
        half = el.scrollWidth / 2;
        margin = Math.max(0, (half - el.clientWidth) / 2);
      };
      const wrap = (p: number) => {
        if (half <= el.clientWidth) return Math.max(0, Math.min(p, el.scrollWidth - el.clientWidth));
        if (p > margin + half) return p - half;
        if (p < margin) return p + half;
        return p;
      };
      const frame = (now: number) => {
        raf = 0;
        const dt = last ? Math.min(64, now - last) : 0;
        last = now;
        if (now < userUntil || hover || reduce) {
          // foydalanuvchi surmoqda: joriy joyni olamiz, chetga yaqinlashsa — nusxaga sakrab o'tamiz (bilinmaydi)
          const w = wrap(el.scrollLeft);
          if (Math.abs(w - el.scrollLeft) > 1) el.scrollLeft = w;
          pos = w;
        } else {
          pos = wrap(pos + (speed * dt) / 1000);
          el.scrollLeft = pos;
        }
        if (visible) raf = requestAnimationFrame(frame);
      };
      const start = () => {
        if (!raf) {
          last = 0;
          raf = requestAnimationFrame(frame);
        }
      };
      const touched = () => {
        userUntil = performance.now() + IDLE;
      };

      // sichqoncha bilan tortib surish (telefonda brauzerning o'z surishi ishlaydi)
      let drag: { x: number; left: number; moved: boolean } | null = null;
      const onDown = (e: PointerEvent) => {
        if (e.pointerType !== "mouse" || e.button !== 0) return;
        drag = { x: e.clientX, left: el.scrollLeft, moved: false };
        touched();
      };
      const onMove = (e: PointerEvent) => {
        if (!drag) return;
        const dx = e.clientX - drag.x;
        if (Math.abs(dx) > 4) drag.moved = true;
        if (drag.moved) {
          el.scrollLeft = drag.left - dx;
          el.classList.add("is-drag");
          touched();
        }
      };
      const onUp = () => {
        if (!drag) return;
        const moved = drag.moved;
        drag = null;
        el.classList.remove("is-drag");
        // tortilgan bo'lsa, qo'yib yuborilgandagi "click" karta/tugmani ochmasin
        if (moved) el.addEventListener("click", (ev) => { ev.preventDefault(); ev.stopPropagation(); }, { capture: true, once: true });
      };
      const onEnter = () => { hover = true; };
      const onLeave = () => { hover = false; onUp(); };

      measure();
      pos = wrap(half); // boshlang'ich joy — ikkinchi nusxa boshi: chapga ham, o'ngga ham surish mumkin
      el.scrollLeft = pos;

      el.addEventListener("pointerdown", onDown);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      el.addEventListener("wheel", touched, { passive: true });
      el.addEventListener("touchstart", touched, { passive: true });
      el.addEventListener("touchmove", touched, { passive: true });
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      el.addEventListener("focusin", onEnter);
      el.addEventListener("focusout", onLeave);
      const ro = new ResizeObserver(() => { measure(); pos = wrap(el.scrollLeft); });
      ro.observe(el);
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible) start();
      });
      io.observe(el);

      cleanups.push(() => {
        visible = false;
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        el.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        el.removeEventListener("wheel", touched);
        el.removeEventListener("touchstart", touched);
        el.removeEventListener("touchmove", touched);
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.removeEventListener("focusin", onEnter);
        el.removeEventListener("focusout", onLeave);
      });
    }
    return () => cleanups.forEach((f) => f());
  }, []);
  return null;
}
