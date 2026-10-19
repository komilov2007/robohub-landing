"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../logo/logo";
import Icon, { ICONS } from "../svg-icon/svg-icon";
import { TOPICS, lessonsByTopic, topicMinutes } from "../../lib/academy";
import { LOGIN_URL, START_URL, YOUTUBE_CHANNEL } from "../../lib/links";

// Academy header — Robohub landingi header'i uslubida: sticky, oq + blur, scroll'da soya.
// Menyu — Academy'ning o'z bo'limlari: bosh sahifa, Mavzular (8 mavzu ochiladigan panelda), Yordam, YouTube.
// Yashirin panel va mobil menyudagi havolalar prefetch qilinmaydi (ko'rinmasa ham sahifa ochilishi bilan
// so'rov ketardi va LCP bilan tarmoq uchun raqobatlashardi). Navigatsiya o'zgarmaydi.
export default function Header() {
  const pathname = usePathname();
  // Menyular qaysi sahifada ochilganini eslaydi — boshqa sahifaga o'tilsa o'zi yopiq hisoblanadi
  const [openAt, setOpenAt] = useState<string | null>(null); // mobil menyu
  const [dropAt, setDropAt] = useState<string | null>(null); // "Mavzular" paneli (desktop)
  const open = openAt === pathname;
  const drop = dropAt === pathname;
  const setOpen = (v: boolean | ((p: boolean) => boolean)) =>
    setOpenAt((cur) => ((typeof v === "function" ? v(cur === pathname) : v) ? pathname : null));
  const setDrop = (v: boolean | ((p: boolean) => boolean)) =>
    setDropAt((cur) => ((typeof v === "function" ? v(cur === pathname) : v) ? pathname : null));
  const [stuck, setStuck] = useState(false);
  const dropRef = useRef<HTMLLIElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const slug = pathname.split("/")[1] ?? "";
  const isHome = pathname === "/";
  const currentTopic = TOPICS.find((t) => t.slug === slug)?.slug;

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setStuck(window.scrollY > 8));
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    return () => {
      window.removeEventListener("scroll", measure);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  // Esc va tashqariga bosish — menyu va panelni yopadi
  useEffect(() => {
    if (!open && !drop) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenAt(null);
        setDropAt(null);
      }
    };
    const onDown = (e: PointerEvent) => {
      if (drop && dropRef.current && !dropRef.current.contains(e.target as Node)) setDropAt(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open, drop]);

  // Sichqoncha bilan: ustiga kelganda ochiladi, chiqib ketganda biroz kutib yopiladi
  const hover = (on: boolean) => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setDrop(on), on ? 60 : 180);
  };

  return (
    <header
      className={`ac-header${stuck ? " is-stuck" : ""}${open ? " is-open" : ""}`}
      data-theme="light"
    >
      <div className="container ac-header__inner">
        <Logo />
        <nav className="ac-nav" aria-label="Asosiy menyu">
          <ul>
            <li>
              <Link href="/" className={`ac-nav__link${isHome ? " is-active" : ""}`} aria-current={isHome ? "page" : undefined}>
                Academy
              </Link>
            </li>
            <li
              ref={dropRef}
              className={`ac-nav__drop${drop ? " is-open" : ""}`}
              onPointerEnter={(e) => e.pointerType === "mouse" && hover(true)}
              onPointerLeave={(e) => e.pointerType === "mouse" && hover(false)}
            >
              <button
                type="button"
                className={`ac-nav__link${currentTopic ? " is-active" : ""}`}
                aria-expanded={drop}
                aria-controls="ac-topics-menu"
                onClick={() => setDrop((v) => !v)}
              >
                Mavzular
                <Icon d="M6 9l6 6 6-6" size={15} className="ac-nav__caret" />
              </button>
              <div id="ac-topics-menu" className="ac-drop" inert={!drop}>
                <ul className="ac-drop__grid">
                  {TOPICS.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/${t.slug}`}
                        prefetch={false}
                        className={`ac-drop__item${t.slug === currentTopic ? " is-current" : ""}`}
                        aria-current={t.slug === currentTopic ? "page" : undefined}
                      >
                        <span className="ac-drop__ico">
                          <Icon d={t.icon} size={18} />
                        </span>
                        <span className="ac-drop__text">
                          <strong>{t.name}</strong>
                          <small>
                            {lessonsByTopic(t.slug).length} dars · {topicMinutes(t.slug)} daq
                          </small>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/#topics" prefetch={false} className="ac-drop__all">
                  Barcha mavzular kartochkalarda
                  <Icon d={ICONS.arrowRight} size={16} />
                </Link>
              </div>
            </li>
            <li>
              <Link href="/#contact" className="ac-nav__link">
                Yordam
              </Link>
            </li>
            <li>
              <a href={YOUTUBE_CHANNEL} target="_blank" rel="noopener" className="ac-nav__link">
                YouTube <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="ac-header__actions">
          <a href={LOGIN_URL} className="btn btn--ghost">
            Kirish
          </a>
          <a href={START_URL} className="btn btn--accent">
            Bepul boshlash
          </a>
        </div>
        <button
          type="button"
          className="ac-burger"
          aria-label={open ? "Menyuni yopish" : "Menyuni ochish"}
          aria-expanded={open}
          aria-controls="ac-mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="ac-mobile-menu" className="ac-mmenu" inert={!open}>
        <div className="container">
          <Link href="/" prefetch={false} className="ac-mmenu__link" aria-current={isHome ? "page" : undefined}>
            Academy — bosh sahifa
          </Link>
          <p className="ac-mmenu__label">Mavzular</p>
          <ul className="ac-mmenu__topics">
            {TOPICS.map((t) => (
              <li key={t.slug}>
                <Link href={`/${t.slug}`} prefetch={false} aria-current={t.slug === currentTopic ? "page" : undefined}>
                  <Icon d={t.icon} size={16} />
                  {t.name}
                  <small>{lessonsByTopic(t.slug).length}</small>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/#contact" prefetch={false} className="ac-mmenu__link">
            Yordam
          </Link>
          <a href={YOUTUBE_CHANNEL} target="_blank" rel="noopener" className="ac-mmenu__link">
            YouTube ↗
          </a>
          <div className="ac-mmenu__actions">
            <a href={LOGIN_URL} className="btn btn--lg btn--outline">
              Kirish
            </a>
            <a href={START_URL} className="btn btn--lg btn--primary">
              Bepul boshlash
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
