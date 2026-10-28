import Link from "next/link";
import { nextTopic, type Topic } from "../../../lib/academy";
import { robohubHome, topicHref } from "../../../lib/links";
import HubOrbit from "@/components/hub-orbit/hub-orbit";
import { getLocale } from "@/i18n/server";
import { messages } from "./cta.i18n";

// CTA — bosh sahifadagi "Yordam" bloki uslubida: harakatlanuvchi gradient fon, o'ngda Robohub orbitasi
// (umumiy komponent — Robohub, AI Studio va Kalkulyator yakuniy kartalaridagi bilan bir xil, biroz kichikroq), magnit tugmalar.
export default async function Cta({ topic }: { topic: Topic }) {
  const locale = await getLocale();
  const t = messages[locale];
  const title = t.title(topic.name);
  const next = nextTopic(topic.slug, locale);
  return (
    <section className="acx-help" data-theme="light" aria-labelledby="ac-cta-title">
      <div className="container">
        <div className="acx-end" data-theme="brand" data-glow data-reveal>
          <div className="acx-end__mesh" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="acx-end__text">
            <h2 id="ac-cta-title" className="acx-h2">
              {title.before} <span className="acx-grad">{title.mark}</span>
              {title.after && ` ${title.after}`}
            </h2>
            <p>{t.text}</p>
            <div className="acx-end__btns">
              <a href={robohubHome(locale)} target="_blank" rel="noopener" className="acx-btn acx-btn--light" data-magnet>
                {t.start} <span aria-hidden="true">→</span>
              </a>
              <Link href={topicHref(locale, next.slug)} className="acx-btn acx-btn--ghost" data-magnet>
                {t.next(next.name)}
              </Link>
            </div>
          </div>
          <HubOrbit className="acx-end__hub acx-end__hub--sm" />
        </div>
      </div>
    </section>
  );
}
