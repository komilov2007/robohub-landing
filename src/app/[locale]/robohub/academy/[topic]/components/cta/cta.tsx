import Link from "next/link";
import { nextTopic, type Topic } from "../../../lib/academy";
import { START_URL, topicHref } from "../../../lib/links";
import { RobohubMark } from "../../../components/logo/logo";
import { getLocale } from "@/i18n/server";
import { messages } from "./cta.i18n";

const MARKETPLACES = ["uzum", "wildberries", "yandex", "ozon"];

// CTA — bosh sahifadagi "Yordam" bloki uslubida: harakatlanuvchi gradient fon, aylanuvchi halqalar
// va marketpleyslar orbitasi, magnit tugmalar (data-magnet).
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
            <p className="acx-kicker acx-kicker--dark">{t.kicker}</p>
            <h2 id="ac-cta-title" className="acx-h2">
              {title.before} <span className="acx-grad">{title.mark}</span>
              {title.after && ` ${title.after}`}
            </h2>
            <p>{t.text}</p>
            <div className="acx-end__btns">
              <a href={START_URL} target="_blank" rel="noopener" className="acx-btn acx-btn--light" data-magnet>
                {t.start} <span aria-hidden="true">→</span>
              </a>
              <Link href={topicHref(locale, next.slug)} className="acx-btn acx-btn--ghost" data-magnet>
                {t.next(next.name)}
              </Link>
            </div>
          </div>
          <div className="acx-end__orbit" aria-hidden="true">
            <span className="acx-end__ring acx-end__ring--3" />
            <span className="acx-end__ring acx-end__ring--2" />
            <span className="acx-end__ring acx-end__ring--1">
              {MARKETPLACES.map((m) => (
                <img key={m} src={`/marketplaces/${m}.svg`} alt="" width={54} height={54} loading="lazy" />
              ))}
            </span>
            <span className="acx-end__mark">
              <RobohubMark />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
