"use client";

import { useEffect, useState } from "react";
import Logo from "../logo/logo";
import LangSelect from "@/components/lang-select/lang-select";
import { CABINET_LABEL, useRobohubAuthed } from "@/lib/robohub-session";
import type { Locale } from "@/i18n/config";
import type { Content } from "../../calculator.content";
import { sellerUrl } from "@/lib/sites";   // kabinet — joriy tilda

// Header — AI Studio header'i bilan bir xil (as-header klasslari): sticky, blur, faol bo'lim ostida sariq chiziq,
// til tanlash (/calculator yo'lida qoladi), "Kirish" va "Bepul boshlash"; mobilda — pastga ochiladigan panel.
export default function Header({ nav, ui, locale }: { nav: Content["NAV"]; ui: Content["T"]["ui"]; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  // kabinetga kirgan sotuvchiga tugma matni "Kirish" o'rniga "Kabinet" (havola o'sha)
  const authed = useRobohubAuthed();

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setStuck(window.scrollY > 8);
        let cur: string | null = null;
        for (const n of nav) {
          const el = document.querySelector(n.href);
          if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) cur = n.href;
        }
        setActive(cur);
      });
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    return () => {
      window.removeEventListener("scroll", measure);
      cancelAnimationFrame(raf);
    };
  }, [nav]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`as-header${stuck ? " is-stuck" : ""}${open ? " is-open" : ""}`}>
      <div className="as-wrap as-header__inner">
        <a href="#top" className="as-header__logo" aria-label={ui.home}>
          <Logo tag={ui.tag} />
        </a>
        <nav className="as-nav" aria-label={ui.mainMenu}>
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className={`as-nav__link${active === n.href ? " is-active" : ""}`}
                  aria-current={active === n.href ? "location" : undefined}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="as-header__actions">
          <LangSelect locale={locale} label={ui.lang} path="/calculator" />
          <a href={sellerUrl(locale, "")} className="as-hbtn as-hbtn--accent">
            {authed ? CABINET_LABEL[locale] : ui.login}
          </a>
        </div>
        <button
          type="button"
          className="as-burger"
          aria-label={open ? ui.menuClose : ui.menuOpen}
          aria-expanded={open}
          aria-controls="cc-mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="cc-mobile-menu" className="as-mmenu" inert={!open} onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
        <div className="as-wrap">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="as-mmenu__link" aria-current={active === n.href ? "location" : undefined}>
              {n.label}
            </a>
          ))}
          <div className="as-mmenu__lang">
            <LangSelect locale={locale} label={ui.lang} path="/calculator" />
          </div>
          <div className="as-mmenu__actions">
            <a href={sellerUrl(locale, "")} className="as-hbtn as-hbtn--lg as-hbtn--primary">
              {authed ? CABINET_LABEL[locale] : ui.login}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
