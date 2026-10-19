import Link from "next/link";
import { getTopic, lessonsByTopic, visibleFaqs, type Topic } from "../../../lib/academy";
import Icon, { ICONS } from "../../../components/svg-icon/svg-icon";
import Marker from "../../../components/marker/marker";
import Faq from "./faq";

// Savollar (accordion) + bog'liq mavzular. [TODO] bilan boshlangan FAQ'lar visibleFaqs() bilan filtrlanadi.
// Zich bo'lim: chapda sarlavha (sticky), o'ngda savollar; bog'liq mavzular — ostida ingichka qator.
export default function Questions({ topic }: { topic: Topic }) {
  const faqs = visibleFaqs(topic);
  const related = topic.related.map(getTopic).filter((t): t is Topic => Boolean(t));
  return (
    <section id="questions" className="ac-qa" aria-labelledby="ac-qa-title">
      <div className="ac-wrap">
        <div className={`ac-qa__grid${faqs.length ? "" : " is-single"}`}>
          <h2 id="ac-qa-title" className="ac-h2 ac-qa__title">
            {faqs.length ? (
              <>
                Ko‘p beriladigan <Marker view>savollar</Marker>
              </>
            ) : (
              <>
                Bog‘liq <Marker view>mavzular</Marker>
              </>
            )}
          </h2>
          {faqs.length > 0 && <Faq items={faqs} />}
        </div>
        <ul className="ac-related" aria-label="Bog‘liq mavzular">
          {related.map((t) => (
            <li key={t.slug}>
              <Link href={`/${t.slug}`} className="ac-related__card">
                <span className="ac-related__ico">
                  <Icon d={t.icon} size={20} />
                </span>
                <span className="ac-related__text">
                  <small>Bog‘liq mavzu · {lessonsByTopic(t.slug).length} dars</small>
                  <b>{t.name}</b>
                </span>
                <Icon d={ICONS.arrowRight} size={18} className="ac-related__go" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
