"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { LESSONS_SORTED, TOTAL_LESSONS, getTopic, type Lesson } from "../../lib/academy";
import { useWatched } from "../../lib/progress";
import { fmt, yt } from "../../lib/youtube";
import { PlayGlyph } from "../svg-icon/svg-icon";
import { lessonHref } from "../../lib/links";

// Barcha darslar — ikki qatorli "jonli" lenta: qatorlar qarama-qarshi tomonga sekin suriladi,
// sichqoncha ustiga kelsa yoki klaviatura fokusida to'xtaydi. Davomiylik bo'yicha filtr.
// Cheksiz aylanish uchun qator ikki marta chiziladi; nusxalar ekran o'quvchi va Tab'dan yashirin.
// prefers-reduced-motion — harakat o'chadi, qator oddiy gorizontal scroll bo'ladi (CSS).
const FILTERS = [
  { key: "all", label: "Barchasi", test: () => true },
  { key: "s", label: "1 daqiqagacha", test: (s: number) => s < 60 },
  { key: "m", label: "1–2 daqiqa", test: (s: number) => s >= 60 && s < 120 },
  { key: "l", label: "2 daqiqadan ko‘p", test: (s: number) => s >= 120 },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

// Qator ekrandan keng bo'lishi uchun kamida MIN kartochka (kam bo'lsa takrorlanadi)
const MIN = 7;

function Row({ lessons, reverse, watched }: { lessons: Lesson[]; reverse?: boolean; watched: Set<number> }) {
  if (!lessons.length) return null;
  const filled: Lesson[] = [];
  while (filled.length < MIN) filled.push(...lessons);
  const loop = [...filled, ...filled];
  return (
    <div className={`acx-marquee${reverse ? " is-reverse" : ""}`}>
      <ul className="acx-marquee__track" style={{ "--dur": `${filled.length * 6}s` } as CSSProperties}>
        {loop.map((l, i) => {
          const copy = i >= lessons.length; // birinchi nusxadan keyingilari — bezak
          return (
            <li key={i} aria-hidden={copy || undefined}>
              <Link href={lessonHref(l.topic, l.n)} className="acx-lc" tabIndex={copy ? -1 : undefined} draggable={false}>
                <span className="acx-lc__thumb">
                  <img src={yt.thumbMq(l.youtubeId)} width={320} height={180} alt="" loading="lazy" decoding="async" draggable={false} />
                  <span className="acx-lc__play" aria-hidden="true">
                    <PlayGlyph size={16} />
                  </span>
                  <span className="acx-lc__dur">{fmt(l.durationSec)}</span>
                </span>
                <span className="acx-lc__meta">
                  {l.n}-dars · {getTopic(l.topic)?.name}
                  {watched.has(l.n) && <em>ko‘rildi</em>}
                </span>
                <span className="acx-lc__title">{l.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function LessonFeed() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const watched = useWatched();
  const f = FILTERS.find((x) => x.key === filter)!;
  const list = LESSONS_SORTED.filter((l) => f.test(l.durationSec));
  const done = watched.size;

  return (
    <section className="acx-feed" id="lessons" data-theme="dark" aria-labelledby="ac-feed-title">
      <div className="acx-feed__bg" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="container">
        <div className="acx-feed__head" data-reveal>
          <div>
            <p className="acx-kicker">Barcha darslar</p>
            <h2 id="ac-feed-title" className="acx-h2">
              {TOTAL_LESSONS} ta dars — <span className="acx-grad">bitta lentada</span>
            </h2>
            <p className="acx-feed__lead">Vaqtingizga qarab tanlang: har bir dars bitta vazifani ko‘rsatadi.</p>
          </div>
          <div className="acx-feed__stat">
            <span className="acx-ring" style={{ "--p": done / TOTAL_LESSONS } as CSSProperties} aria-hidden="true" />
            <span className="acx-feed__stat-text">
              <b>
                {done}
                <small> / {TOTAL_LESSONS}</small>
              </b>
              <span>dars ko‘rildi</span>
            </span>
          </div>
        </div>

        <div className="acx-feed__filters" role="group" aria-label="Davomiylik bo‘yicha">
          {FILTERS.map((x) => (
            <button key={x.key} type="button" className="acx-pill" aria-pressed={filter === x.key} onClick={() => setFilter(x.key)}>
              {x.label}
              <small>{LESSONS_SORTED.filter((l) => x.test(l.durationSec)).length}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="acx-feed__rows" key={filter} aria-label="Darslar lentasi" role="region">
        <Row lessons={list.filter((_, i) => i % 2 === 0)} watched={watched} />
        <Row lessons={list.filter((_, i) => i % 2 === 1)} watched={watched} reverse />
      </div>
    </section>
  );
}
