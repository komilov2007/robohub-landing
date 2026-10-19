import { getMessages } from "@/i18n/server";
import { messages } from "./final-cta.i18n";

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
            <span className="end__ring end__ring--in" />{" "}
            <span className="end__ring">{" "}
              <img src="/marketplaces/uzum.svg" alt="" width="54" height="54" />{" "}
              <img src="/marketplaces/wildberries.svg" alt="" width="54" height="54" />{" "}
              <img src="/marketplaces/ozon.svg" alt="" width="54" height="54" />{" "}
              <img src="/marketplaces/yandex.svg" alt="" width="54" height="54" />{" "}
            </span>{" "}
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
              <a className="foot__call" href="tel:+998999857226">
                <i aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                  </svg>
                </i>{" "}
                <span>
                  <span>{t.support}</span>
                  <b>+998 (99) 985 72 26</b>
                </span>
              </a>
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
