"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Hero'dagi "Video qo'llanma" tugmasi: bosilganda video sahifa ustidagi oynada (dialog) ochiladi.
// Oddiy YouTube havolasi — JS ishlamasa yangi oynada YouTube'da ochiladi.
// Pleyer (iframe) faqat oyna ochilganda yuklanadi; youtube-nocookie. Esc / fon / × — yopadi.
export default function VideoButton({ id, title, className, children }: { id: string; title: string; className: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <>
      <a
        className={className}
        href={`https://www.youtube.com/watch?v=${id}`}
        target="_blank"
        rel="noopener"
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        {children}
      </a>
      <dialog
        className="rs-vid"
        ref={ref}
        aria-label={title}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === e.currentTarget && setOpen(false)}
      >
        <div className="rs-vid__box">
          <button type="button" className="rs-vid__x" aria-label="Yopish" onClick={() => setOpen(false)}>
            ×
          </button>
          {open && (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          )}
        </div>
      </dialog>
    </>
  );
}
