import type { CSSProperties } from "react";
import ContactIcon from "@/components/contact-icon/contact-icon";
import { localeHref, localeOrigin, type Locale } from "@/i18n/config";
import { PHONE, PHONE_HREF, TELEGRAM_HANDLE, TELEGRAM_URL } from "@/lib/contacts";
import type { Site } from "@/lib/site-host";
import BackLink from "./back-link";
import { RobohubLogo, RobohubMark } from "./logo";
import { messages } from "./robohub-404.i18n";
import "./robohub-404.css";

// Robohub 404 sahifasi — Robohub domenidagi hamma sahifalar (bosh sahifa, /academy, /calculator, /ai-studio)
// va AI Studio'ning o'z domeni (ai-studio.vercel.app) uchun bitta. Robosell'niki alohida: robosell/components/not-found.
// site — qaysi domendan ochilgan: AI Studio domenida Robohub bo'limlari to'liq manzil bilan (robohub.uz/...) beriladi,
// chunki u domenda /academy kabi yo'llar yo'q. Uslublar .nf ildiziga bog'langan (robohub-404.css).

// "0" atrofida aylanadigan marketpleyslar — public/marketplaces
const MARKETPLACES = ["uzum", "wildberries", "ozon", "yandex"] as const;

const ICONS = {
  academy: ["M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5z", "m10 9 5 3-5 3z"],
  aiStudio: ["M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.5l-1.9-5.7L4.5 10.9 10.1 9z", "M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"],
  calculator: ["M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z", "M8.5 7h7v3h-7z", "M9 14h.01M12 14h.01M15 14h.01M9 17.5h.01M12 17.5h.01M15 17.5h.01"],
};

function Icon({ paths }: { paths: string[] }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

export default function Robohub404({ site, locale }: { site: Exclude<Site, "robosell">; locale: Locale }) {
  const t = messages[locale];
  // Joriy saytning bosh sahifasi va Robohub bo'limlari manzili (AI Studio domenida — robohub.uz orqali)
  const home = localeHref(locale, "/");
  const robohub = (path: string) => (site === "robohub" ? "" : localeOrigin(locale)) + localeHref(locale, path);

  const links = [
    { key: "robohub", href: robohub("/"), icon: <RobohubMark />, ...t.links.robohub },
    { key: "academy", href: robohub("/academy"), icon: <Icon paths={ICONS.academy} />, ...t.links.academy },
    { key: "ai-studio", href: site === "ai-studio" ? home : robohub("/aistudio"), icon: <Icon paths={ICONS.aiStudio} />, ...t.links.aiStudio },
    { key: "calculator", href: robohub("/calculator"), icon: <Icon paths={ICONS.calculator} />, ...t.links.calculator },
  ];

  return (
    <div className="nf" data-theme="dark">
      <div className="nf__bg" aria-hidden="true">
        <span className="nf__glow nf__glow--a" />
        <span className="nf__glow nf__glow--b" />
      </div>

      <header className="container nf__top">
        <a className="nf__logo" href={home} aria-label={t.logo}>
          <RobohubLogo className="nf__logo-svg" />
          {site === "ai-studio" && <span className="nf__tag">AI Studio</span>}
        </a>
        <a className="nf__support" href={TELEGRAM_URL} target="_blank" rel="noopener">
          <ContactIcon name="telegram" size={16} />
          <span>{TELEGRAM_HANDLE}</span>
        </a>
      </header>

      <main className="container nf__main">
        <div className="nf__code" aria-hidden="true">
          <span className="nf__digit">4</span>
          <span className="nf__zero">
            <span className="nf__ring" />
            <span className="nf__orbit">
              {MARKETPLACES.map((m, i) => (
                <span key={m} className="nf__sat" style={{ "--a": `${i * 90 + 45}deg` } as CSSProperties}>
                  <img loading="lazy" decoding="async" src={`/marketplaces/${m}.svg`} alt="" width={28} height={28} />
                </span>
              ))}
            </span>
            <RobohubMark className="nf__mark" />
          </span>
          <span className="nf__digit">4</span>
        </div>

        <p className="nf__badge reveal" style={{ "--d": "80ms" } as CSSProperties}>
          {t.badge}
        </p>
        <h1 className="nf__title reveal" style={{ "--d": "140ms" } as CSSProperties}>
          {t.heading}
        </h1>
        <p className="nf__text reveal" style={{ "--d": "200ms" } as CSSProperties}>
          {t.text}
        </p>
        <div className="nf__actions reveal" style={{ "--d": "260ms" } as CSSProperties}>
          <a className="btn btn--lg btn--primary" href={home}>
            {t.home} <span className="arrow">→</span>
          </a>
          <BackLink className="btn btn--lg btn--outline" href={home}>
            <span aria-hidden="true">←</span> {t.back}
          </BackLink>
        </div>
      </main>

      <section className="container nf__links" aria-labelledby="nf-links-title">
        <h2 className="nf__links-title" id="nf-links-title">
          {t.linksTitle}
        </h2>
        <ul className="nf__grid">
          {links.map((l, i) => (
            <li key={l.key} className="reveal" style={{ "--d": `${340 + i * 70}ms` } as CSSProperties}>
              <a className="nf__card" href={l.href}>
                <span className={`nf__card-ico nf__card-ico--${l.key}`}>{l.icon}</span>
                <span className="nf__card-body">
                  <span className="nf__card-name">{l.name}</span>
                  <span className="nf__card-text">{l.text}</span>
                </span>
                <span className="nf__card-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className="container nf__foot">
        <p>{t.help}</p>
        <div className="nf__foot-links">
          <a href={TELEGRAM_URL} target="_blank" rel="noopener">
            <ContactIcon name="telegram" size={16} />
            {TELEGRAM_HANDLE}
          </a>
          <a href={PHONE_HREF}>
            <ContactIcon name="phone" size={16} />
            {PHONE}
          </a>
        </div>
      </footer>
    </div>
  );
}
