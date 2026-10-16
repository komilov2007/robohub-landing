import { HERO, SIGNUP_HREF } from "../../robosell.content";
import HeroPhone from "./hero-phone";

// 1-bo'lim. Chapda va'da (matn darhol ko'rinadi — LCP uchun opacity animatsiyasi yo'q),
// o'ngda jonli Telegram WebApp do'kon: mahsulot savatga tushadi, buyurtma dashboard'ga keladi.
export default function Hero() {
  const [t1, accent, t2] = HERO.title;
  return (
    <section className="rs-hero" id="hero" aria-labelledby="hero-title">
      <div className="rs-wrap rs-hero__grid">
        <div className="rs-hero__text">
          <p className="rs-hero__badge">
            <span className="rs-hero__dot" aria-hidden="true" />
            {HERO.badge}
          </p>
          <h1 className="rs-hero__title" id="hero-title">
            {t1} <span className="rs-hero__tag">{accent}</span> {t2}
          </h1>
          <p className="rs-hero__lead">{HERO.lead}</p>
          <div className="rs-hero__cta">
            <a className="rs-btn rs-btn--yellow rs-btn--lg" href={SIGNUP_HREF}>
              {HERO.start}
              <span className="rs-btn__arrow" aria-hidden="true">→</span>
            </a>
            {/* NAMUNA: video demo hali yo'q — "Qanday ishlaydi" bo'limidagi video joyiga olib boradi */}
            <a className="rs-btn rs-btn--line rs-btn--lg" href="#qanday-ishlaydi">
              <span className="rs-play" aria-hidden="true" />
              {HERO.demo}
            </a>
          </div>
          <div className="rs-hero__trust">
            <span className="rs-faces" aria-hidden="true">
              <i>A</i>
              <i>M</i>
              <i>J</i>
              <i>+</i>
            </span>
            <b>{HERO.trust}</b>
            <ul className="rs-hero__partners" aria-label="Hamkorlar">
              {HERO.partners.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
        <HeroPhone />
      </div>
    </section>
  );
}
