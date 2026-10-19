import { PHONE, PHONE_HREF, PINGS, SIGNUP_HREF, STEPS } from "../../robosell.content";
import Section from "../section/section";
import StepsThread from "./steps-thread";

// 7-bo'lim. Chapda 5 qadam — chat thread: scroll'da qadamlar ketma-ket "o'qiladi" (✓✓ yashil bo'ladi),
// chiziq to'lib boradi. O'ngda (desktop'da yopishqoq) video joyi va yordam bloki.
export default function HowItWorks() {
  return (
    <Section id="how-it-works" side="out" tone="soft" ping={PINGS.steps} labelledBy="how-title">
      <div className="rs-wrap">
        <header className="rs-head rs-head--center">
          <p className="rs-eyebrow" data-rv="">{STEPS.eyebrow}</p>
          <h2 className="rs-h2" id="how-title" data-rv="">
            {STEPS.title}
          </h2>
        </header>

        <div className="rs-how">
          <StepsThread steps={STEPS.list} />

          <aside className="rs-how__side" data-rv="">
            {/* NAMUNA: video qo'llanma hali yo'q — joyi tayyor (16:9) */}
            <div className="rs-video" role="img" aria-label={`${STEPS.video} — tez orada`}>
              <span className="rs-video__play" aria-hidden="true" />
              <b>{STEPS.video}</b>
              <small>{STEPS.videoNote}</small>
            </div>
            <div className="rs-help">
              <b>{STEPS.helpTitle}</b>
              <p>
                {STEPS.helpText} <a href={PHONE_HREF}>{PHONE}</a>
              </p>
              <a className="rs-btn rs-btn--teal rs-btn--lg" href={SIGNUP_HREF}>
                {STEPS.cta}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </Section>
  );
}
