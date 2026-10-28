"use client";

import { useEffect, useRef, useState } from "react";

// Footer guvohnomalari (a[data-cert]) bosilganda rasm sahifaning o'zida katta ochiladi (<dialog>):
// Esc, ✕ yoki orqa fonga bosish yopadi. JS ishlamasa havola rasmni yangi oynada ochadi.
export default function CertLightbox({ close }: { close: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [img, setImg] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest<HTMLAnchorElement>("a[data-cert]");
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || !ref.current?.showModal) return;
      e.preventDefault();
      setImg({ src: a.dataset.cert!, alt: a.dataset.certAlt ?? "" });
      ref.current.showModal();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <dialog
      ref={ref}
      className="certbox"
      aria-label={img?.alt}
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      onClose={() => setImg(null)}
    >
      <button type="button" className="certbox__close" onClick={() => ref.current?.close()} aria-label={close}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
      {img && <img src={img.src} alt={img.alt} />}
    </dialog>
  );
}
