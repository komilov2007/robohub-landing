import type { CSSProperties } from "react";
import { HERO, SIGNUP_HREF } from "../../robosell.content";
import Icon from "../icon/svg-icon";
import HeroDemo from "./hero-demo";
import Clients from "./clients";
import VideoButton from "./video-button";

// Integratsiya logolari — rb-frontend/src/assets/icons dan (public/robosell/icons)
const LOGOS: { icon: string; w: number; h: number; label?: string; alt?: string }[] = [
  { icon: "click", w: 70, h: 28, alt: "Click" },
  { icon: "payme", w: 76, h: 22, alt: "Payme" },
  { icon: "iiko", w: 62, h: 25, alt: "iiko" },
  { icon: "billz", w: 26, h: 26, label: "Billz" },
  { icon: "robo-pay", w: 26, h: 26, label: "Robopay" },
];

// 1-bo'lim. Tepada va'da (matn darhol ko'rinadi — LCP uchun opacity animatsiyasi yo'q),
// ostida jonli sahna: telefondagi do'kondan buyurtma → noutbukdagi admin panelga tushadi.
export default function Hero() {
  const [t1, accent, t2] = HERO.title;
  return (
    <section className="rs-hero" id="hero" aria-labelledby="hero-title">
      <div className="rs-hero__bg" aria-hidden="true">
        <span className="rs-hero__glow" />
        <span className="rs-hero__glow rs-hero__glow--b" />
        <span className="rs-hero__grid-lines" />
      </div>

      <div className="rs-wrap rs-hero__in">
        <div className="rs-hero__text">
          <p className="rs-hero__badge">
            <span className="rs-hero__pulse" aria-hidden="true" />
            {HERO.badge}
          </p>

          <h1 className="rs-hero__title" id="hero-title">
            {t1}{" "}
            <span className="rs-hero__mark">
              {accent}
              <svg className="rs-hero__swoosh" viewBox="0 0 220 24" preserveAspectRatio="none" aria-hidden="true">
                <path d="M4 17 C 50 6, 120 4, 216 12" pathLength={1} />
              </svg>
            </span>{" "}
            {t2}
          </h1>

          <p className="rs-hero__lead">{HERO.lead}</p>

          <div className="rs-hero__cta">
            <a className="rs-btn rs-btn--teal rs-btn--lg rs-hero__go" href={SIGNUP_HREF}>
              {HERO.start}
              <span className="rs-btn__arrow" aria-hidden="true">→</span>
            </a>
            <VideoButton id={HERO.videoId} title={HERO.video} className="rs-btn rs-btn--line rs-btn--lg rs-hero__vid">
              <span className="rs-hero__play" aria-hidden="true" />
              {HERO.video}
            </VideoButton>
          </div>

          <div className="rs-hero__works">
            <p>{HERO.worksWith}</p>
            <ul className="rs-hero__logos">
              {LOGOS.map((l, i) => (
                <li key={l.icon} style={{ "--i": i } as CSSProperties}>
                  <Icon name={l.icon} w={l.w} h={l.h} alt={l.alt ?? ""} />
                  {l.label && <span>{l.label}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <HeroDemo />
      </div>
      <div className="rs-wrap">
        <Clients />
      </div>
    </section>
  );
}
