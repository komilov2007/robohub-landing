"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// "Qanday ishlaydi" tugmasi: bosilganda YouTube videosi oynada ochiladi.
// iframe faqat oyna ochilganda yuklanadi — sahifa ochilishini sekinlashtirmaydi.
const VIDEO_SRC = "https://www.youtube.com/embed/9KU4G1TY5tE?si=Cu50nYmTy0KMdP-7&autoplay=1&rel=0";

export default function HeroVideo() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const opener = openerRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    // oyna ochiqligida orqadagi sahifa aylanmaydi
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
      opener?.focus();
    };
  }, [open]);

  return (
    <>
      <button className="btn btn--lg btn--outline hero__play" type="button" ref={openerRef} onClick={() => setOpen(true)} aria-haspopup="dialog">
        <span className="hero__play-ico" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
          </svg>
        </span>
        Qanday ishlaydi
      </button>
      {open &&
        createPortal(
          <div className="vmodal" role="dialog" aria-modal="true" aria-label="Robohub qanday ishlaydi — video" onClick={() => setOpen(false)}>
            <div className="vmodal__box" onClick={(e) => e.stopPropagation()}>
              <button className="vmodal__x" type="button" ref={closeRef} onClick={() => setOpen(false)} aria-label="Yopish">
                ✕
              </button>
              <iframe
                src={VIDEO_SRC}
                title="Robohub qanday ishlaydi"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
