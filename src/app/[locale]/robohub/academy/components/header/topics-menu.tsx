"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { getTopics, TOTAL_LESSONS, lessonsByTopic, type TopicSlug } from "../../lib/academy";
import { useWatched } from "../../lib/progress";
import Icon, { ICONS } from "../svg-icon/svg-icon";
import { academyHref, topicHref } from "../../lib/links";
import { useAcademyLocale } from "../locale/locale";
import { messages } from "./header.i18n";

// Header'dagi "Mavzular" menyusi: 8 mavzu ikki ustunda — ikon, nom, dars soni, qisqa tavsif va ko'rish progressi.
// Ochilganda bandlar navbat bilan chiqadi (CSS, .ac-nav__drop.is-open). Uslublar — academy.css → "MEGA-MENYU".
export default function TopicsMenu({ open, current }: { open: boolean; current?: TopicSlug }) {
  const watched = useWatched();
  const locale = useAcademyLocale();
  const t = messages[locale];
  const topics = getTopics(locale);

  return (
    <div id="ac-topics-menu" className="ac-mega" inert={!open}>
      <p className="ac-mega__label">
        {t.topics} <span>{t.megaCount(topics.length, TOTAL_LESSONS)}</span>
      </p>
      <ul className="ac-mega__grid">
        {topics.map((x, i) => {
          const lessons = lessonsByTopic(x.slug, locale);
          const done = lessons.filter((l) => watched.has(l.n)).length;
          const isCur = x.slug === current;
          return (
            <li key={x.slug} style={{ "--i": i } as CSSProperties}>
              <Link href={topicHref(locale, x.slug)} className={`ac-mega__item${isCur ? " is-current" : ""}`} aria-current={isCur ? "page" : undefined}>
                <span className="ac-mega__ico">
                  <Icon d={x.icon} size={19} />
                </span>
                <span className="ac-mega__text">
                  <strong>
                    {x.name}
                    <em>{lessons.length}</em>
                  </strong>
                  <small>{x.short}</small>
                  <span className="ac-mega__bar" aria-hidden="true">
                    <i style={{ "--p": lessons.length ? done / lessons.length : 0 } as CSSProperties} />
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link href={academyHref(locale, "#topics")} className="ac-mega__all">
        {t.megaAll}
        <Icon d={ICONS.arrowRight} size={16} />
      </Link>
    </div>
  );
}
