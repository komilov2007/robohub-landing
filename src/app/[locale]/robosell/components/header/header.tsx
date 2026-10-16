"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Logo from "../logo/logo";
import { LOGIN_HREF, NAV, PHONE_HREF, SIGNUP_HREF } from "../../robosell.content";

const LANGS = ["UZ", "RU", "EN"] as const;

// Til tugmalari — hozircha faqat interfeys (sahifa matni o'zbekcha). Tanlov holati aria-pressed bilan.
function LangSwitch({ className }: { className?: string }) {
  const [lang, setLang] = useState<(typeof LANGS)[number]>("UZ");
  return (
    <div className={`rs-lang${className ? " " + className : ""}`} role="group" aria-label="Til">
      {LANGS.map((l) => (
        <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>
          {l}
        </button>
      ))}
    </div>
  );
}

// Sticky navbar + to'liq ekranli mobil menyu + mobilda pastdagi yopishqoq "Bepul boshlash".
// Holatlar IntersectionObserver bilan: scroll'da layout o'qilmaydi.
export default function Header() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [dock, setDock] = useState(false);
  const probeRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // tepadan biroz tushilganda header soya oladi
  useEffect(() => {
    const probe = probeRef.current;
    if (!probe) return;
    const io = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting));
    io.observe(probe);
    return () => io.disconnect();
  }, []);

  // pastki tugma: hero ekrandan chiqqach ko'rinadi, yakuniy CTA ko'ringanda yashirinadi
  useEffect(() => {
    const hero = document.getElementById("hero");
    const final = document.getElementById("boshlash");
    if (!hero || !final) return;
    const seen = new Map<Element, boolean>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target, e.isIntersecting));
      setDock(!seen.get(hero) && !seen.get(final));
    });
    io.observe(hero);
    io.observe(final);
    return () => io.disconnect();
  }, []);

  // menyu ochiq: fon aylanmaydi, Esc yopadi, fokus "yopish" tugmasida
  useEffect(() => {
    if (!open) return;
    const burger = burgerRef.current;
    document.documentElement.classList.add("rs-lock");
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("rs-lock");
      document.removeEventListener("keydown", onKey);
      burger?.focus();
    };
  }, [open]);

  return (
    <>
      <div className="rs-probe" ref={probeRef} aria-hidden="true" />
      <header className={"rs-hd" + (stuck ? " is-stuck" : "")}>
        <div className="rs-wrap rs-hd__bar">
          <a className="rs-hd__logo" href="#top" aria-label="Robosell — sahifa boshi">
            <Logo />
          </a>
          <nav className="rs-hd__nav" aria-label="Asosiy menyu">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="rs-hd__end">
            <LangSwitch className="rs-hd__lang" />
            <a className="rs-hd__login" href={LOGIN_HREF}>
              Kirish
            </a>
            <a className="rs-btn rs-btn--yellow rs-btn--sm rs-hd__cta" href={SIGNUP_HREF}>
              Bepul boshlash
            </a>
            <button
              ref={burgerRef}
              className="rs-hd__burger"
              type="button"
              aria-expanded={open}
              aria-controls="rs-menu"
              aria-label="Menyuni ochish"
              onClick={() => setOpen(true)}
            >
              <i />
              <i />
            </button>
          </div>
        </div>
      </header>

      <div
        id="rs-menu"
        className={"rs-menu" + (open ? " is-open" : "")}
        role="dialog"
        aria-modal="true"
        aria-label="Menyu"
        hidden={!open}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setOpen(false);
        }}
      >
        <div className="rs-menu__top">
          <Logo />
          <button ref={closeRef} className="rs-menu__close" type="button" aria-label="Menyuni yopish" onClick={() => setOpen(false)}>
            <i />
            <i />
          </button>
        </div>
        <nav className="rs-menu__nav" aria-label="Mobil menyu">
          {NAV.map((n, i) => (
            <a key={n.href} href={n.href} style={{ "--i": i } as CSSProperties}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="rs-menu__foot">
          <LangSwitch />
          <a className="rs-btn rs-btn--line rs-btn--lg" href={LOGIN_HREF}>
            Kirish
          </a>
          <a className="rs-btn rs-btn--yellow rs-btn--lg" href={SIGNUP_HREF}>
            Bepul boshlash
          </a>
        </div>
      </div>

      <div className={"rs-dock" + (dock ? " is-on" : "")} aria-hidden={!dock}>
        <a className="rs-btn rs-btn--yellow rs-btn--lg" href={SIGNUP_HREF} tabIndex={dock ? 0 : -1}>
          Bepul boshlash
        </a>
        <a className="rs-dock__call" href={PHONE_HREF} aria-label="Qo‘ng‘iroq qilish" tabIndex={dock ? 0 : -1}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" fill="currentColor" />
          </svg>
        </a>
      </div>
    </>
  );
}
