"use client";

import { useEffect } from "react";

// [data-rv] elementlari ekranga kirganda bir marta .is-in oladi (chat xabaridek pastdan "suzib" chiqadi).
// Ko'rinmayotgan bo'limlarga data-off qo'yiladi — ichidagi doimiy CSS animatsiyalar pauzada turadi.
export default function Reveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rs [data-rv]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));

    const off = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.toggleAttribute("data-off", !e.isIntersecting)),
      { rootMargin: "150px 0px" },
    );
    document.querySelectorAll(".rs-sec").forEach((s) => off.observe(s));
    return () => {
      io.disconnect();
      off.disconnect();
    };
  }, []);
  return null;
}
