"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "../icon/icon";
import { STUDIO_EMBED_URL, STUDIO_URL } from "../../ai-studio.content";
import { useC } from "../../content-context";

// AI infografika studiyasini landing ustida to'liq ekranli oynada (iframe) ochadi.
//  • Sahifadagi STUDIO_URL ga olib boradigan har qanday havola ("Sinab ko'rish", "Bepul sinab ko'rish",
//    "Tanlash", "Sotib olish"...) bosilganda ushlanadi — tugmalarning o'zini o'zgartirish shart emas.
//    JS ishlamasa havola oddiy sahifa bo'lib ochiladi.
//  • iframe birinchi ochilganda yuklanadi va yopilganda o'chirilmaydi: qayta ochilsa, studiya holati saqlanadi.
//  • Tepada landing paneli yo'q — studiya o'z sarlavhasi bilan butun ekranni egallaydi.
//    Yopish: studiyaning "←" tugmasi (ustida ko'rinmas yopish tugmasi turadi) yoki Esc.
// Studiya va API'lar haqida: rb-market "AI Infografika — landingga ulash" hujjati (B yo'li).
export default function StudioModal() {
  const { T } = useC();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // iframe bir marta yaratiladi
  const [loaded, setLoaded] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  // studiya havolalarini ushlash (event delegation)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!a || a.href !== STUDIO_URL || a.target === "_blank") return;
      e.preventDefault();
      opener.current = a;
      setMounted(true);
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // ochiq: fon aylanmaydi, Esc yopadi, fokus "yopish" tugmasida; yopilganda fokus tugmaga qaytadi
  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("as-lock");
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("as-lock");
      document.removeEventListener("keydown", onKey);
      opener.current?.focus();
    };
  }, [open]);

  if (!mounted) return null;

  return (
    <div className={"as-sm" + (open ? " is-open" : "")} role="dialog" aria-modal="true" aria-label={T.modal.label} hidden={!open}>
      <div className="as-sm__body">
        <iframe
          className={"as-sm__frame" + (loaded ? " is-ready" : "")}
          src={STUDIO_EMBED_URL}
          title={T.modal.label}
          allow="clipboard-read; clipboard-write; camera; fullscreen"
          onLoad={() => setLoaded(true)}
        />
        {!loaded && (
          <div className="as-sm__loading" aria-live="polite">
            <span className="as-sm__spin">
              <Icon name="ai" />
            </span>
            {T.modal.loading}
          </div>
        )}
        {/* Yuklanayotganda — ko'rinadigan ✕. Yuklangach — studiyaning "←" tugmasi ustidagi ko'rinmas
            tugma: "←" studiyani iframe ichida yopib, ostidagi rb-market landingini ko'rsatib qo'ymasin,
            balki butun oynani yopsin. */}
        <button
          ref={closeRef}
          type="button"
          className={"as-sm__close" + (loaded ? " is-ghost" : "")}
          aria-label={T.modal.close}
          onClick={() => setOpen(false)}
        >
          <i />
          <i />
        </button>
      </div>
    </div>
  );
}
