import Link from "next/link";
import { getTopic, lessonsByTopic, visibleFaqs, type Topic } from "../../../lib/academy";
import Icon, { ICONS } from "../../../components/svg-icon/svg-icon";
import Faq from "./faq";

// Savollar + bog'liq mavzular. [TODO] FAQ'lar visibleFaqs() bilan filtrlanadi.
export default function Questions({ topic }: { topic: Topic }) {
  const faqs = visibleFaqs(topic);
  const related = topic.related.map(getTopic).filter((t): t is Topic => Boolean(t));
  return (
    <section id="questions" className="ac-section" data-theme="light" aria-labelledby="ac-questions-title">
      <div className="container">
        <div className="ac-head" data-reveal>
          <p className="ac-eyebrow">Savollar</p>
          <h2 id="ac-questions-title" className="ac-h2">
            {faqs.length ? (
              <>
                Ko‘p beriladigan <span className="ac-accent">savollar</span>
              </>
            ) : (
              <>
                Bog‘liq <span className="ac-accent">mavzular</span>
              </>
            )}
          </h2>
        </div>
        <div className={`ac-qa${faqs.length ? "" : " ac-qa--single"}`}>
          {faqs.length > 0 && (
            <div data-reveal>
              <Faq items={faqs} />
            </div>
          )}
          <aside className="ac-related" data-reveal aria-label="Bog‘liq mavzular">
            {faqs.length > 0 && <p className="ac-related__title">Bog‘liq mavzular</p>}
            <ul>
              {related.map((t) => (
                <li key={t.slug}>
                  <Link href={`/${t.slug}`} className="ac-related__card">
                    <span className="ac-related__ico">
                      <Icon d={t.icon} size={22} />
                    </span>
                    <span className="ac-related__text">
                      <strong>{t.name}</strong>
                      <span>
                        {lessonsByTopic(t.slug).length} dars · {t.short}
                      </span>
                    </span>
                    <span className="ac-related__go" aria-hidden="true">
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
