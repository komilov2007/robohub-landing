"use client";

import { useEffect } from "react";

// [data-rv] elementlari ekranga kirganda bir marta data-in atributini oladi (CSS'dagi chiqish animatsiyasi).
// Klass emas, atribut: React className'ni qayta yozganda (masalan FAQ ochilganda) u o'chib ketmaydi.
// [data-pause] bloklar ko'rinmay qolsa data-off oladi — ichidagi doimiy animatsiyalar pauzada turadi.
export default function Reveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.setAttribute("data-in", "");
          io.unobserve(e.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll(".as [data-rv]").forEach((el) => io.observe(el));

    const off = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.toggleAttribute("data-off", !e.isIntersecting)),
      { rootMargin: "120px 0px" },
    );
    document.querySelectorAll(".as [data-pause]").forEach((s) => off.observe(s));
    return () => {
      io.disconnect();
      off.disconnect();
    };
  }, []);
  return null;
}
