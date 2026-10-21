"use client";

import { useEffect, useState } from "react";
import LangSelect from "@/components/lang-select/lang-select";
import type { Locale } from "@/i18n/config";
import Logo from "../logo/logo";
import { LOGIN_HREF, NAV, PHONE_HREF, SIGNUP_HREF } from "../../robosell.content";

// Header — Robohub Academy va AI Studio header'lari bilan bir xil dizayn: sticky, qog'oz fon + blur,
// scroll'da chegara va soya; o'rtada menyu (faol/hover — sariq chiziq); o'ngda til tanlagich
// (Robohub landingidagi umumiy LangSelect), "Kirish" va "Bepul boshlash". Mobilda — header ostidan ochiladigan panel.
// Mobilda pastda yopishqoq "Bepul boshlash" + qo'ng'iroq tugmasi (hero va yakuniy CTA ko'rinmaganda).
export default function HeaderClient({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [dock, setDock] = useState(false);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setStuck(window.scrollY > 8);
        let cur: string | null = null;
        for (const n of NAV) {
          const el = n.href.startsWith("#") ? document.querySelector(n.href) : null;
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
  }, []);

  // pastki tugma: hero ekrandan chiqqach ko'rinadi, yakuniy CTA ko'ringanda yashirinadi
  useEffect(() => {
    const hero = document.getElementById("hero");
    const final = document.getElementById("start");
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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={`rs-header${stuck ? " is-stuck" : ""}${open ? " is-open" : ""}`} data-theme="light">
        <div className="rs-wrap rs-header__inner">
          <a href="#top" className="rs-header__logo" aria-label="Robosell — sahifa boshi">
            <Logo />
          </a>
          <nav className="rs-nav" aria-label="Asosiy menyu">
            <ul>
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className={`rs-nav__link${active === n.href ? " is-active" : ""}`}
                    aria-current={active === n.href ? "location" : undefined}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="rs-header__actions">
            <LangSelect locale={locale} label="Til tanlash" />
            <a href={LOGIN_HREF} className="rs-hbtn rs-hbtn--ghost">
              Kirish
            </a>
            <a href={SIGNUP_HREF} className="rs-hbtn rs-hbtn--accent">
              Bepul boshlash
            </a>
          </div>
          <div className="rs-header__mlang">
            <LangSelect locale={locale} label="Til tanlash" />
          </div>
          <button
            type="button"
            className="rs-burger"
            aria-label={open ? "Menyuni yopish" : "Menyuni ochish"}
            aria-expanded={open}
            aria-controls="rs-mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div id="rs-mobile-menu" className="rs-mmenu" inert={!open} onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
          <div className="rs-wrap">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="rs-mmenu__link" aria-current={active === n.href ? "location" : undefined}>
                {n.label}
              </a>
            ))}
            <div className="rs-mmenu__actions">
              <a href={LOGIN_HREF} className="rs-hbtn rs-hbtn--lg rs-hbtn--outline">
                Kirish
              </a>
              <a href={SIGNUP_HREF} className="rs-hbtn rs-hbtn--lg rs-hbtn--accent">
                Bepul boshlash
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className={"rs-dock" + (dock ? " is-on" : "")} aria-hidden={!dock}>
        <a className="rs-btn rs-btn--teal rs-btn--lg" href={SIGNUP_HREF} tabIndex={dock ? 0 : -1}>
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
