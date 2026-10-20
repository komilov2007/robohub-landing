"use client";

import { useEffect, useState } from "react";

export default function ToTopClient({ label }: { label: string }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // bir ekrandan ko'proq pastga tushganda ko'rinadi
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      className={`totop${shown ? " is-on" : ""}`}
      onClick={toTop}
      aria-label={label}
      title={label}
      tabIndex={shown ? 0 : -1}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
