"use client";

import { useEffect, useRef, useState } from "react";

type T = { login: string; start: string };

// Telefonda pastga yopishgan panel: "Kirish" + "Ariza qoldirish" (modalni ochadi — header.script.js, data-open).
// Hero'dagi tugmalar ekrandan chiqqach paydo bo'ladi; "Aloqa" formasi yoki footer ko'ringanda yashirinadi
// (ular o'zi aloqa yo'lini beradi — ikki marta takrorlanmasin). Kompyuterda ko'rinmaydi (robohub.css, .mcta).
export default function MobileCtaClient({ t }: { t: T }) {
  const [on, setOn] = useState(false);
  const seen = useRef({ hero: true, end: false });

  useEffect(() => {
    const hero = document.querySelector(".hero__cta, #hero");
    const ends = [document.getElementById("contact"), document.getElementById("start")].filter(Boolean) as Element[];
    const update = () => setOn(!seen.current.hero && !seen.current.end);
    const vis = new Map<Element, boolean>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) vis.set(e.target, e.isIntersecting);
      seen.current.hero = hero ? vis.get(hero) ?? seen.current.hero : false;
      seen.current.end = ends.some((el) => vis.get(el));
      update();
    });
    if (hero) io.observe(hero);
    ends.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className={`mcta${on ? " is-on" : ""}`} aria-hidden={!on}>
      <a className="mcta__login" href="#login" tabIndex={on ? 0 : -1}>
        {t.login}
      </a>
      <a className="mcta__start" href="#contact" data-open="contact-modal" tabIndex={on ? 0 : -1}>
        {t.start}
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
