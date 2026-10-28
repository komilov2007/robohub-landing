"use client";

import { useEffect, useState } from "react";

type T = { login: string; start: string };

// Telefonda pastga yopishgan panel: "Kirish" + "Ariza qoldirish" (modalni ochadi — header.script.js, data-open).
// Hero'dagi tugmalar ekrandan chiqqach paydo bo'ladi. "Aloqa" bo'limiga yetilgach — va undan pastda (yakuniy blok,
// footer) — hech qachon chiqmaydi: u yerda aloqa yo'li sahifaning o'zida bor. "Imkoniyatlar" sahnasida esa
// "O'tkazib yuborish" tugmasiga joy beradi (robohub.css). Kompyuterda ko'rinmaydi (.mcta).
export default function MobileCtaClient({ t }: { t: T }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".hero__cta, #hero");
    // birinchi "oxirgi" bo'lim: aloqa formasi; bo'lmasa — yakuniy blok (footer bilan)
    const end =
      document.getElementById("contact") ?? document.getElementById("start");
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const heroGone = !hero || hero.getBoundingClientRect().bottom < 0;
      const reachedEnd = !!end && end.getBoundingClientRect().top < vh;
      setOn(heroGone && !reachedEnd);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={`mcta${on ? " is-on" : ""}`} aria-hidden={!on}>
      <a className="mcta__login" href="#login" tabIndex={on ? 0 : -1}>
        {t.login}
      </a>
      <a
        className="mcta__start"
        href="#contact"
        data-open="contact-modal"
        tabIndex={on ? 0 : -1}
      >
        {t.start}
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
