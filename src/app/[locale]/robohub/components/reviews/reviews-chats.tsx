"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Chat } from "./chats";
import { useNear } from "./use-near";

// Telegram'dagi fikrlar: bir xil o'lchamdagi kartalar bitta qatorda, o'zi sekin suriladi (sichqoncha ustida to'xtaydi).
// Uzun xabar kartada qisqartiriladi — "To'liq o'qish" bosilsa to'liq matn oynada ochiladi.
// Ro'yxat ikki marta chiziladi: lenta yarmiga surilganda ikkinchi nusxa birinchisining o'rnida turadi (ulanish bilinmaydi).
type T = { anon: string; group: string; more: string; close: string };

// to'qroq tuslar: oq harf bilan kontrast >= 4.5:1 (WCAG AA)
const COLORS = ["#7062E0", "#B65669", "#2B7AA8", "#A26826", "#2E835D", "#895FC7", "#C05243", "#1F8177"];
const initials = (name: string) =>
  name
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const TgIcon = () => (
  <svg className="chat__tg" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21.5 4.3 18.4 19c-.2 1-.9 1.3-1.8.8l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.4-4.9 8.9-8c.4-.4-.1-.5-.6-.2L6.2 12.8 1.5 11.3c-1-.3-1-1 .2-1.5L20.2 2.7c.9-.3 1.6.2 1.3 1.6z" />
  </svg>
);

function Card({ c, i, t, onMore, hidden }: { c: Chat; i: number; t: T; onMore: () => void; hidden?: boolean }) {
  const name = c.name ?? t.anon;
  const long = c.text.length > 230 || c.text.split("\n").length > 4;
  return (
    <li className="chat" aria-hidden={hidden || undefined}>
      <div className="chat__head">
        <span className="chat__ava" style={{ background: COLORS[i % COLORS.length] }} aria-hidden="true">
          {initials(name) || "R"}
        </span>
        <span className="chat__who">
          <b>{name}</b>
          <small>{t.group}</small>
        </span>
        <TgIcon />
      </div>
      <p className="chat__text">{c.text}</p>
      <div className="chat__foot">
        {long ? (
          <button type="button" className="chat__more" onClick={onMore} tabIndex={hidden ? -1 : undefined}>
            {t.more}
          </button>
        ) : (
          <span />
        )}
      </div>
    </li>
  );
}

export default function ReviewsChats({ chats, t }: { chats: Chat[]; t: T }) {
  const [open, setOpen] = useState<number | null>(null);
  // ikkinchi nusxa — bo'lim ekranga yaqinlashganda (sahifa ochilishida ortiqcha element chizilmaydi)
  const copies = useNear("reviews") ? [0, 1] : [0];
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open === null) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const cur = open === null ? null : chats[open];
  return (
    <>
      <div className="revs__marquee">
        <ul className="revs__chats">
          {copies.map((copy) =>
            chats.map((c, i) => <Card key={`${copy}-${i}`} c={c} i={i} t={t} hidden={copy === 1} onMore={() => setOpen(i)} />),
          )}
        </ul>
      </div>
      {cur &&
        createPortal(
          <div className="chat-modal" role="dialog" aria-modal="true" aria-label={cur.name ?? t.anon} onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
            <div className="chat chat--full">
              <div className="chat__head">
                <span className="chat__ava" style={{ background: COLORS[open! % COLORS.length] }} aria-hidden="true">
                  {initials(cur.name ?? t.anon) || "R"}
                </span>
                <span className="chat__who">
                  <b>{cur.name ?? t.anon}</b>
                  <small>{t.group}</small>
                </span>
                <button ref={closeRef} type="button" className="chat__close" onClick={() => setOpen(null)} aria-label={t.close}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 7l10 10M17 7L7 17" />
                  </svg>
                </button>
              </div>
              <p className="chat__text">{cur.text}</p>
              <div className="chat__foot">
                <span />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
