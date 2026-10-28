"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../logo/logo";
import TopicsMenu from "./topics-menu";
import RobohubMenu from "./robohub-menu";
import Icon from "../svg-icon/svg-icon";
import LangSelect from "@/components/lang-select/lang-select";
import { RobohubMenuMobile } from "@/components/robohub-menu/robohub-menu";
import { getTopics, lessonsByTopic } from "../../lib/academy";
import { robohubHome, YOUTUBE_CHANNEL, ACADEMY_BASE, academyHref, topicHref } from "../../lib/links";
import { useAcademyLocale } from "../locale/locale";
import { messages } from "./header.i18n";

// Academy header — Robohub landingi header'i uslubida: sticky, oq + blur, scroll'da soya.
// Menyu — Academy'ning o'z bo'limlari: bosh sahifa, Mavzular (8 mavzu ochiladigan panelda), Yordam, YouTube.
export default function Header() {
  const locale = useAcademyLocale();
  const t = messages[locale];
  const topics = getTopics(locale);
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
  const [corners, setCorners] = useState(false);
  const dropRef = useRef<HTMLLIElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Academy — /academy ostida (ru/en da /ru/academy …): "/academy" — bosh sahifa, "/academy/order" — mavzu.
  // path — tilsiz yo'l: til tanlash menyusi boshqa tilda ham shu sahifani ochadi.
  const at = pathname.indexOf(ACADEMY_BASE);
  const path = at >= 0 ? pathname.slice(at) : ACADEMY_BASE;
  const sub = path.slice(ACADEMY_BASE.length);
  const slug = sub.split("/")[1] ?? "";
  const isHome = sub === "" || sub === "/";
  const currentTopic = topics.find((x) => x.slug === slug)?.slug;

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setStuck(window.scrollY > 8);
        // Header'ning pastki cheti to'q yumaloq hero ustida bo'lsa — "teskari burchak"lar
        // yoqiladi: blok scroll qilinganda ham yuqori burchaklari yumaloq ko'rinadi.
        const edge = document.querySelector(".ac-header")?.getBoundingClientRect().bottom ?? 72;
        const over = [...document.querySelectorAll(".ac-stage")].some((el) => {
          const r = el.getBoundingClientRect();
          return r.top < edge - 1 && r.bottom > edge;
        });
        setCorners(over);
      });
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
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
      className={`ac-header${stuck ? " is-stuck" : ""}${corners ? " has-corners" : ""}${open ? " is-open" : ""}`}
      data-theme="light"
    >
      <div className="container ac-header__inner">
        <Logo href={academyHref(locale)} label={t.logoLabel} />
        <nav className="ac-nav" aria-label={t.navLabel}>
          <ul>
            {/* Robohub imkoniyatlari — landing header'idagi panel (robohub-menu.tsx), hamma band Robohub'ga olib boradi */}
            <RobohubMenu locale={locale} />
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
                {t.topics}
                <Icon d="M6 9l6 6 6-6" size={15} className="ac-nav__caret" />
              </button>
              <TopicsMenu open={drop} current={currentTopic} />
            </li>
            <li>
              <Link href={academyHref(locale, "#help")} className="ac-nav__link">
                {t.help}
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
          <LangSelect locale={locale} label={t.lang} path={path} />
          {/* yagona tugma — "Kirish": Robohub landingi yangi oynada */}
          <a href={robohubHome(locale)} target="_blank" rel="noopener" className="btn btn--accent">
            {t.login}
          </a>
        </div>
        <button
          type="button"
          className="ac-burger"
          aria-label={open ? t.menuClose : t.menuOpen}
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
          <Link href={academyHref(locale)} className="ac-mmenu__link" aria-current={isHome ? "page" : undefined}>
            {t.homeLink}
          </Link>
          <RobohubMenuMobile locale={locale} />
          <p className="ac-mmenu__label">{t.topics}</p>
          <ul className="ac-mmenu__topics">
            {topics.map((x) => (
              <li key={x.slug}>
                <Link href={topicHref(locale, x.slug)} aria-current={x.slug === currentTopic ? "page" : undefined}>
                  <Icon d={x.icon} size={16} />
                  {x.name}
                  <small>{lessonsByTopic(x.slug, locale).length}</small>
                </Link>
              </li>
            ))}
          </ul>
          <Link href={academyHref(locale, "#help")} className="ac-mmenu__link">
            {t.help}
          </Link>
          <a href={YOUTUBE_CHANNEL} target="_blank" rel="noopener" className="ac-mmenu__link">
            YouTube ↗
          </a>
          <div className="ac-mmenu__lang">
            <LangSelect locale={locale} label={t.lang} path={path} />
          </div>
          <div className="ac-mmenu__actions">
            <a href={robohubHome(locale)} target="_blank" rel="noopener" className="btn btn--lg btn--primary">
              {t.login}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
