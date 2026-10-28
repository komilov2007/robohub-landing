"use client";

import { useEffect, useRef } from "react";

const HOLD = 3600; // har mamlakat qancha turadi (ms) — robohub.css dagi .regm__bar chizig'i shu vaqtda to'ladi

// Telefondagi mamlakat kartasi (regions.tsx → RegionsMobile) o'zi navbat bilan almashadi — yer sharidagi kabi.
// Faqat telefonda (≤600px) va bo'lim ekranda ko'rinib turganda; foydalanuvchi o'zi mamlakat tanlasa — to'xtaydi.
// Tanlov — yashirin radio tugmalar: bu yerda faqat keyingisi belgilanadi, ko'rinish CSS'da (:checked).
export default function RegionsAuto({ ids }: { ids: string[] }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current?.closest<HTMLElement>(".regm");
    if (!root) return;
    if (!matchMedia("(max-width:600px)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tabs = root.querySelector<HTMLElement>(".regm__tabs");
    const radios = ids.map((id) => document.getElementById(`regm-${id}`) as HTMLInputElement | null);
    root.style.setProperty("--hold", `${HOLD}ms`);
    let timer = 0;
    let manual = false;

    const next = () => {
      const at = radios.findIndex((r) => r?.checked);
      const n = radios[(at + 1) % radios.length];
      if (!n) return;
      n.checked = true;
      // faol tab ko'rinib tursin — faqat tablar qatori suriladi, sahifa emas
      const label = tabs?.querySelector<HTMLElement>(`[data-c="${ids[radios.indexOf(n)]}"]`);
      if (tabs && label) tabs.scrollTo({ left: label.offsetLeft - 16, behavior: "smooth" });
    };
    const run = (on: boolean) => {
      clearInterval(timer);
      root.classList.toggle("is-run", on && !manual);
      if (on && !manual) timer = window.setInterval(next, HOLD);
    };
    // foydalanuvchi tanladi — avtomatik almashish butunlay to'xtaydi
    const stop = () => {
      manual = true;
      root.classList.add("is-manual");
      run(false);
    };
    const onChange = (e: Event) => e.isTrusted && stop();
    root.addEventListener("change", onChange);
    tabs?.addEventListener("pointerdown", stop, { once: true });

    const io = new IntersectionObserver(([e]) => run(e.isIntersecting), { threshold: 0.4 });
    io.observe(root);
    return () => {
      io.disconnect();
      clearInterval(timer);
      root.removeEventListener("change", onChange);
      tabs?.removeEventListener("pointerdown", stop);
    };
  }, [ids]);

  return <span ref={ref} hidden />;
}
