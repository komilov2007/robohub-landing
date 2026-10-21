import { Fragment, type CSSProperties } from "react";
import { FINAL, PHONE, PHONE_HREF, SIGNUP_HREF } from "../../robosell.content";
import FinalChat from "./final-chat";

// 11-bo'lim. Katta yashil panel: fonda sekin suzuvchi yorug' dog'lar va nuqtali to'r; chapda sarlavha
// (so'zlar navbat bilan ko'tariladi), afzalliklar va tugmalar; o'ngda jonli chat oynasi (final-chat.tsx).
export default function FinalCta() {
  const lead = FINAL.title[0].split(" ").length;
  const words = FINAL.title.join(" ").split(" ");
  return (
    <section className="rs-fin" id="start" aria-labelledby="final-title">
      <div className="rs-wrap">
        <div className="rs-fin__panel" data-rv="">
          <span className="rs-fin__blob rs-fin__blob--a" aria-hidden="true" />
          <span className="rs-fin__blob rs-fin__blob--b" aria-hidden="true" />
          <span className="rs-fin__grid" aria-hidden="true" />
          <div className="rs-fin__text">
            <h2 className="rs-fin__title" id="final-title">
              {words.map((w, i) => (
                <Fragment key={i}>
                  <span className={i >= lead ? "is-accent" : undefined} style={{ "--i": i } as CSSProperties}>
                    {w}
                  </span>{" "}
                </Fragment>
              ))}
            </h2>
            <p className="rs-fin__lead">{FINAL.text}</p>
            <ul className="rs-fin__checks">
              {FINAL.checks.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <div className="rs-fin__cta">
              <a className="rs-fin__go" href={SIGNUP_HREF}>
                {FINAL.start}
                <span aria-hidden="true">→</span>
              </a>
              <a className="rs-fin__call" href={PHONE_HREF}>
                <span aria-hidden="true">☎</span>
                {PHONE}
              </a>
            </div>
          </div>
          <FinalChat />
        </div>
      </div>
    </section>
  );
}
