"use client";

import { useEffect, useState } from "react";
import Logo from "../logo/logo";
import LangSelect from "@/components/lang-select/lang-select";
import { CABINET_LABEL, useRobohubAuthed } from "@/lib/robohub-session";
import { LOGIN_HREF } from "../../ai-studio.content";
import { useC } from "../../content-context";

// Header — Robohub Academy header'i bilan bir xil dizayn (robohub/academy header):
// sticky, qog'oz fon + blur, scroll'da chegara va soya; o'rtada menyu (faol/hover — sariq chiziq),
// o'ngda til tanlash (UZ/RU/EN), "Kirish" va "Bepul boshlash". Mobilda — header ostidan ochiladigan panel (Esc yopadi).
// Faol bo'lim — scroll bo'yicha aniqlanadi.
export default function Header() {
  const { NAV, T, locale, path } = useC();
  const U = T.ui;
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
        // ekran yuqori uchdan biridan o'tgan oxirgi bo'lim — faol
        let cur: string | null = null;
        for (const n of NAV) {
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
  }, [NAV]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`as-header${stuck ? " is-stuck" : ""}${open ? " is-open" : ""}`}>
      <div className="as-wrap as-header__inner">
        <a href="#top" className="as-header__logo" aria-label={U.home}>
          <Logo />
        </a>
        <nav className="as-nav" aria-label={U.mainMenu}>
          <ul>
            {NAV.map((n) => (
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
          <LangSelect locale={locale} label={U.lang} path={path} />
          <a href={LOGIN_HREF} className="as-hbtn as-hbtn--accent">
            {authed ? CABINET_LABEL[locale] : U.login}
          </a>
        </div>
        <button
          type="button"
          className="as-burger"
          aria-label={open ? U.menuClose : U.menuOpen}
          aria-expanded={open}
          aria-controls="as-mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="as-mobile-menu" className="as-mmenu" inert={!open} onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
        <div className="as-wrap">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="as-mmenu__link" aria-current={active === n.href ? "location" : undefined}>
              {n.label}
            </a>
          ))}
          <div className="as-mmenu__lang">
            <LangSelect locale={locale} label={U.lang} path={path} />
          </div>
          <div className="as-mmenu__actions">
            <a href={LOGIN_HREF} className="as-hbtn as-hbtn--lg as-hbtn--primary">
              {authed ? CABINET_LABEL[locale] : U.login}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
