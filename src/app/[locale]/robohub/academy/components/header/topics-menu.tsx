"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { TOPICS, TOTAL_LESSONS, lessonsByTopic, type TopicSlug } from "../../lib/academy";
import { useWatched } from "../../lib/progress";
import Icon, { ICONS } from "../svg-icon/svg-icon";
import { academyHref, topicHref } from "../../lib/links";

// Header'dagi "Mavzular" menyusi: 8 mavzu ikki ustunda — ikon, nom, dars soni, qisqa tavsif va ko'rish progressi.
// Ochilganda bandlar navbat bilan chiqadi (CSS, .ac-nav__drop.is-open). Uslublar — academy.css → "MEGA-MENYU".
export default function TopicsMenu({ open, current }: { open: boolean; current?: TopicSlug }) {
  const watched = useWatched();

  return (
    <div id="ac-topics-menu" className="ac-mega" inert={!open}>
      <p className="ac-mega__label">
        Mavzular <span>{TOPICS.length} ta · {TOTAL_LESSONS} dars</span>
      </p>
      <ul className="ac-mega__grid">
        {TOPICS.map((t, i) => {
          const lessons = lessonsByTopic(t.slug);
          const done = lessons.filter((l) => watched.has(l.n)).length;
          const isCur = t.slug === current;
          return (
            <li key={t.slug} style={{ "--i": i } as CSSProperties}>
              <Link href={topicHref(t.slug)} className={`ac-mega__item${isCur ? " is-current" : ""}`} aria-current={isCur ? "page" : undefined}>
                <span className="ac-mega__ico">
                  <Icon d={t.icon} size={19} />
                </span>
                <span className="ac-mega__text">
                  <strong>
                    {t.name}
                    <em>{lessons.length}</em>
                  </strong>
                  <small>{t.short}</small>
                  <span className="ac-mega__bar" aria-hidden="true">
                    <i style={{ "--p": lessons.length ? done / lessons.length : 0 } as CSSProperties} />
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link href={academyHref("#topics")} className="ac-mega__all">
        Barcha mavzular kartochkalarda
        <Icon d={ICONS.arrowRight} size={16} />
      </Link>
    </div>
  );
}
