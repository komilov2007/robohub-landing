"use client";

import { useEffect } from "react";

// Pastki bo'limlarning harakati (AI Studio'ning Reveal'idan alohida, o'z tilida):
//   [data-io]   — ekranga kirganda bir marta data-in oladi (CSS'dagi kirish animatsiyalari shunga tayanadi);
//   [data-spot] — sichqoncha ustida --mx/--my o'zgaruvchilarini oladi (ergashuvchi yorug'lik).
export default function Motion() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.setAttribute("data-in", "");
          io.unobserve(e.target);
        }),
      { threshold: 0.2, rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll(".cc [data-io]").forEach((el) => io.observe(el));

    const spots = [...document.querySelectorAll<HTMLElement>(".cc [data-spot]")];
    const onMove = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    spots.forEach((el) => el.addEventListener("pointermove", onMove));
    return () => {
      io.disconnect();
      spots.forEach((el) => el.removeEventListener("pointermove", onMove));
    };
  }, []);
  return null;
}
