"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { localeHref, localeMeta, locales, type Locale } from "@/i18n/config";
import "./lang-select.css";

type Props = {
  locale: Locale;
  label: string; // "Til tanlash" — joriy tilda, ekran o'quvchilar uchun
  path?: string; // tilsiz yo'l ("/academy/order") — boshqa tilda ham shu sahifa ochiladi; standart — bosh sahifa
};

// Til tanlash: bayroq + qisqa kod tugmasi, bosilganda uchta til ro'yxati ochiladi.
// Har til — oddiy havola (/, /ru, /en; path berilsa — /academy, /ru/academy …), shuning uchun JS ishlamasa ham ishlaydi.
// Klaviatura: ↑/↓ — tanlash, Home/End — chetlar, Esc — yopish (fokus tugmaga qaytadi).
// Til almashganda sahifa qayta yuklanadi — foydalanuvchi turgan joy eslab qolinib, yangi tilda o'sha joyga qaytariladi.
// Matn uzunligi tillarda har xil, shuning uchun piksel emas, "qaysi bo'lim va uning qaysi qismi" saqlanadi.
const SCROLL_KEY = "lang-scroll";
type Saved = { path: string; i: number; frac: number; y: number; atBottom: boolean };
const blocks = () => Array.from(document.querySelectorAll<HTMLElement>("main section, footer"));
const docTop = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY;

function saveScroll(href: string) {
  const y = window.scrollY;
  const anchor = y + window.innerHeight / 3; // ekranning yuqori uchdan biri — ko'z turgan joy
  const list = blocks();
  let i = -1;
  list.forEach((el, k) => { if (docTop(el) <= anchor) i = k; });
  const el = list[i];
  const saved: Saved = {
    path: new URL(href, location.href).pathname,
    i,
    frac: el ? (anchor - docTop(el)) / Math.max(1, el.offsetHeight) : 0,
    y,
    atBottom: y + window.innerHeight >= document.documentElement.scrollHeight - 4,
  };
  try { sessionStorage.setItem(SCROLL_KEY, JSON.stringify(saved)); } catch {}
}

function restoreScroll() {
  let s: Saved;
  try {
    const raw = sessionStorage.getItem(SCROLL_KEY);
    if (!raw) return;
    sessionStorage.removeItem(SCROLL_KEY); // sahifada bir nechta LangSelect bo'lsa — faqat biri tiklaydi
    s = JSON.parse(raw);
  } catch { return; }
  if (s.path !== location.pathname || location.hash) return;
  const go = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const el = blocks()[s.i];
    let top = s.y;
    if (s.atBottom) top = max;
    else if (el) top = docTop(el) + s.frac * el.offsetHeight - window.innerHeight / 3;
    window.scrollTo({ top: Math.max(0, Math.min(max, top)), behavior: "instant" });
  };
  go();
  // shrift/rasmlar yuklanib balandlik o'zgarsa — foydalanuvchi o'zi aylantirmagan bo'lsa yana to'g'rilanadi
  if (document.readyState !== "complete") {
    let moved = false;
    const stop = () => { moved = true; };
    window.addEventListener("wheel", stop, { once: true, passive: true });
    window.addEventListener("touchstart", stop, { once: true, passive: true });
    window.addEventListener("load", () => { if (!moved) go(); }, { once: true });
  }
}

export default function LangSelect({ locale, label, path = "/" }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const menuId = useId();
  const current = localeMeta[locale];

  useEffect(restoreScroll, []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    // ochilganda fokus joriy tilga o'tadi
    itemRefs.current[locales.indexOf(locale)]?.focus();
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open, locale]);

  const close = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onButtonKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const onMenuKey = (e: KeyboardEvent) => {
    const items = itemRefs.current;
    const i = items.indexOf(document.activeElement as HTMLAnchorElement);
    const go = (n: number) => items[(n + items.length) % items.length]?.focus();
    if (e.key === "ArrowDown") { e.preventDefault(); go(i + 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); go(i - 1); }
    else if (e.key === "Home") { e.preventDefault(); go(0); }
    else if (e.key === "End") { e.preventDefault(); go(items.length - 1); }
    else if (e.key === "Escape") { e.preventDefault(); close(); }
    else if (e.key === "Tab") setOpen(false);
  };

  return (
    <div className="lang-select" ref={rootRef} data-open={open || undefined}>
      <button
        ref={buttonRef}
        className="lang-select__btn"
        type="button"
        aria-label={`${label}: ${current.label}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onButtonKey}
      >
        <img className="lang-select__flag" src={current.flag} alt="" width={20} height={20} />
        <span className="lang-select__code">{current.short}</span>
        <svg className="lang-select__chev" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <ul className="lang-select__menu" id={menuId} role="menu" aria-label={label} onKeyDown={onMenuKey}>
        {locales.map((l, i) => {
          const meta = localeMeta[l];
          const active = l === locale;
          return (
            <li key={l} role="none">
              <a
                ref={(el) => { itemRefs.current[i] = el; }}
                className="lang-select__item"
                role="menuitemradio"
                aria-checked={active}
                href={localeHref(l, path)}
                hrefLang={l}
                lang={l}
                tabIndex={open ? 0 : -1}
                onClick={active ? (e) => { e.preventDefault(); close(); } : (e) => { if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) saveScroll(e.currentTarget.href); }}
              >
                <img className="lang-select__flag" src={meta.flag} alt="" width={22} height={22} fetchPriority="low" />
                <span className="lang-select__label">{meta.label}</span>
                <svg className="lang-select__check" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
