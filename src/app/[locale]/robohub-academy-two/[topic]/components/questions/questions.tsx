import type { CSSProperties } from "react";
import Link from "next/link";
import { getTopic, lessonsByTopic, visibleFaqs, type Topic } from "../../../lib/academy";
import Icon, { ICONS } from "../../../components/svg-icon/svg-icon";
import Faq from "./faq";

// Savollar + bog'liq mavzular. [TODO] FAQ'lar visibleFaqs() bilan filtrlanadi.
export default function Questions({ topic }: { topic: Topic }) {
  const faqs = visibleFaqs(topic);
  const related = topic.related.map(getTopic).filter((t): t is Topic => Boolean(t));
  return (
    <section id="questions" className="acx-qa-sec" data-theme="light" aria-labelledby="ac-questions-title">
      <div className="container">
        <div className="acx-head" data-reveal>
          <p className="acx-kicker">Savollar</p>
          <h2 id="ac-questions-title" className="acx-h2">
            {faqs.length ? (
              <>
                Ko‘p beriladigan <span className="acx-mark">savollar</span>
              </>
            ) : (
              <>
                Bog‘liq <span className="acx-mark">mavzular</span>
              </>
            )}
          </h2>
        </div>
        <div className={`acx-qa${faqs.length ? "" : " acx-qa--single"}`}>
          {faqs.length > 0 && (
            <div data-reveal>
              <Faq items={faqs} />
            </div>
          )}
          <aside className="acx-rel" data-reveal aria-label="Bog‘liq mavzular">
            {faqs.length > 0 && <p className="acx-rel__title">Bog‘liq mavzular</p>}
            <ul>
              {related.map((t, i) => (
                <li key={t.slug} style={{ "--i": i } as CSSProperties}>
                  <Link href={`/${t.slug}`} className="acx-rel__card" data-glow>
                    <span className="acx-rel__ico">
                      <Icon d={t.icon} size={22} />
                    </span>
                    <span className="acx-rel__text">
                      <strong>{t.name}</strong>
                      <span>
                        {lessonsByTopic(t.slug).length} dars · {t.short}
                      </span>
                    </span>
                    <span className="acx-rel__go" aria-hidden="true">
                      <Icon d={ICONS.arrowRight} size={18} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
