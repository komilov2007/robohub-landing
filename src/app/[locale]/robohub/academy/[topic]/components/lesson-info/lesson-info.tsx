"use client";

import type { CSSProperties } from "react";
import { getLesson, lessonsByTopic, type Topic } from "../../../lib/academy";
import { fmt } from "../../../lib/youtube";
import { useWatched } from "../../../lib/progress";
import { LESSON_NOTES } from "../../../lib/lesson-notes";
import { usePlayer } from "../../../components/player/player-context";
import Icon, { ICONS } from "../../../components/svg-icon/svg-icon";

// "Dars haqida" — hero'dagi videoning tushuntirishi (savollardan oldin), yuqoridan pastga (mavzular — keyingi alohida bo'lim, topics-rail.tsx):
//   1) tepada — oddiy sarlavha (dars nomi va qisqa ma'lumot, tugmasiz);
//   2) o'rtada — "Nazariy qism": maqola — xulosa, "Bu nima?", "Nega kerak?" (lib/lesson-notes.ts), videoda ko'rsatiladiganlar, maslahat;
// Pleylistda tanlangan darsga qarab almashadi. Ma'lumot — lib/academy.ts (summary, points).
// SEO: har darsning o'z sahifasi bor (/academy/{mavzu}/{dars}) — server shu dars matnini HTML'da beradi (player-context → initialLesson).
export default function LessonInfo({ topic }: { topic: Topic }) {
  const { selected, mainLesson } = usePlayer();
  const watched = useWatched();
  const lessons = lessonsByTopic(topic.slug);
  const lesson = getLesson(selected)!;
  const note = LESSON_NOTES[lesson.n];
  const idx = lessons.findIndex((l) => l.n === lesson.n);

  return (
    <section
      id="about"
      className="acx-about"
      data-theme="light"
      aria-labelledby="ac-about-title"
    >
      <div className="container acx-about__wrap">
        {/* key — dars almashganda kirish animatsiyasi qayta o'ynaydi */}
        <div key={lesson.n} className="acx-about__lesson">
          {/* 1. Sarlavha — oddiy, tugmasiz */}
          <header className="acx-about__head">
            <p className="acx-kicker">Amaliy video · {lesson.n}-dars</p>
            <h2 id="ac-about-title" className="acx-about__title">
              {lesson.title}
            </h2>
            <p className="acx-about__meta">
              {topic.name} · {idx + 1} / {lessons.length} dars ·{" "}
              {fmt(lesson.durationSec)}
              {lesson.n === mainLesson && (
                <span className="is-main">Asosiy dars</span>
              )}
              {watched.has(lesson.n) && (
                <span className="is-done">
                  <Icon d={ICONS.check} size={13} />
                  Ko‘rildi
                </span>
              )}
            </p>
          </header>

          {/* 2. Nazariy qism — maqola: qisqa xulosa, "Bu nima?", "Nega kerak?", videoda ko'rsatiladiganlar, maslahat */}
          <article className="acx-read" aria-label="Nazariy qism">
            <p className="acx-read__lead">{lesson.summary}</p>
            {note && (
              <>
                <section className="acx-read__row">
                  <h3>Bu nima?</h3>
                  <p>{note.concept}</p>
                </section>
                <section className="acx-read__row">
                  <h3>Nega kerak?</h3>
                  <p>{note.why}</p>
                </section>
              </>
            )}
            {lesson.points.length > 0 && (
              <section className="acx-read__row">
                <h3>Videoda</h3>
                <ul className="acx-read__list">
                  {lesson.points.map((p, i) => (
                    <li key={p} style={{ "--i": i } as CSSProperties}>
                      <Icon d={ICONS.check} size={15} />
                      {p}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {note?.tip && (
              <aside className="acx-read__tip">
                <span aria-hidden="true">
                  <Icon
                    d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3z"
                    size={18}
                  />
                </span>
                <p>
                  <b>Maslahat.</b> {note.tip}
                </p>
              </aside>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
