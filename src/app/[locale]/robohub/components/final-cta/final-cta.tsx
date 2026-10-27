import type { CSSProperties } from "react";
import { getMessages } from "@/i18n/server";
import { messages } from "./final-cta.i18n";
import ContactIcon, { type ContactIconName } from "@/components/contact-icon/contact-icon";
import { EMAIL, EMAIL_HREF, INSTAGRAM_URL, PHONE, PHONE_HREF, TELEGRAM_URL, YOUTUBE_URL } from "@/lib/contacts";

// Orbita: ichki halqada toʻrtta asosiy marketpleys, tashqi halqada qolgan marketpleyslar va hisob tizimlari
// (hero orbitasidagidek). Har belgi oʻz burchagida (--a), halqa aylanadi, belgi tik turadi.
const INNER = ["/marketplaces/uzum.svg", "/marketplaces/wildberries.svg", "/marketplaces/ozon.svg", "/marketplaces/yandex.svg"];
const OUTER = [
  "/robosell/icons/alif.svg",
  "/integrations/moysklad.svg",
  "/marketplaces/kaspi.svg",
  "/integrations/billz.svg",
  "/marketplaces/halyk.svg",
  "/integrations/1c.svg",
  "/robosell/icons/click-outline.svg",
  "/robosell/icons/zoomrad.svg",
];
const ring = (list: string[], start: number) =>
  list.map((src, i) => (
    <img key={src} src={src} alt="" width="54" height="54" style={{ "--a": `${start + (i * 360) / list.length}deg` } as CSSProperties} />
  ));

// Footer "Aloqa": ikon + oddiy matn (chegarasiz)
const CONTACTS: { icon: ContactIconName; label: string; href: string; external?: boolean }[] = [
  { icon: "phone", label: PHONE, href: PHONE_HREF },
  { icon: "email", label: EMAIL, href: EMAIL_HREF },
  { icon: "telegram", label: "Telegram", href: TELEGRAM_URL, external: true },
  { icon: "instagram", label: "Instagram", href: INSTAGRAM_URL.robohub, external: true },
  { icon: "youtube", label: "YouTube", href: YOUTUBE_URL, external: true },
];

export default async function FinalCta() {
  const t = await getMessages(messages);
  return (
    <section className="end" id="start" data-theme="dark" aria-labelledby="end-title">
      <div className="container">
        <div className="end__card" data-theme="brand" data-sr="">
          <div>
            {/* Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi */}{" "}
            <h2 className="end__title" id="end-title">
              <span>{t.title}</span>{" "}
              <span className="accent">{t.titleAccent}</span>
            </h2>{" "}
            <p className="end__lead">{t.lead}</p>{" "}
            <div className="end__btns">
              <a className="btn btn--lg btn--primary" href="#login">
                {t.start}
                <span className="arrow" aria-hidden="true">→</span>
              </a>{" "}
              <a className="btn btn--lg btn--outline" href="#pricing">{t.pricing}</a>
            </div>
          </div>{" "}
          <div className="end__orbit" aria-hidden="true">
            <span className="end__ring end__ring--in">{ring(INNER, -45)}</span>{" "}
            <span className="end__ring">{ring(OUTER, -90)}</span>{" "}
            <span className="end__mark">
              <svg viewBox="0 0 33.8675 15.06">
                <use href="#rh-mark" />
              </svg>
            </span>
          </div>
        </div>{" "}
        <footer className="foot">
          <div className="foot__grid">
            <div>
              <svg className="foot__logo" viewBox="0 0 127 31" role="img" aria-label="Robohub">
                <use href="#rh-logo" />
              </svg>{" "}
              <p className="foot__about">{t.about}</p>{" "}
              <p className="foot__mps" aria-hidden="true">
                <img src="/marketplaces/uzum.svg" alt="" width="30" height="30" />
                <img src="/marketplaces/yandex.svg" alt="" width="30" height="30" />
                <img src="/marketplaces/wildberries.svg" alt="" width="30" height="30" />
                <img src="/marketplaces/ozon.svg" alt="" width="30" height="30" />
              </p>
            </div>{" "}
            <nav aria-label={t.pageLabel}>
              <h3>{t.pageTitle}</h3>{" "}
              <ul>
                {t.page.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>{" "}
            <nav aria-label={t.tools}>
              <h3>{t.tools}</h3>{" "}
              <ul>
                <li>
                  <a href="/calculator/">{t.calculator}</a>
                </li>{" "}
                <li>
                  <a href="/ai-infografika/">{t.infographics}</a>
                </li>
              </ul>
            </nav>{" "}
            <div>
              <h3>{t.contact}</h3>{" "}
              <ul className="foot__contacts">
                {CONTACTS.map((c) => (
                  <li key={c.icon}>
                    <a href={c.href} {...(c.external ? { target: "_blank", rel: "noopener" } : {})}>
                      <ContactIcon name={c.icon} />
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>{" "}
          <div className="foot__bar">
            <p>© 2026 Robohub</p>{" "}
            <span>
              <a href="#privacy">{t.privacy}</a>
              <a href="#support">{t.help}</a>
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
}
