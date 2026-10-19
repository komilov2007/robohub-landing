"use client";

import { useState } from "react";
import Link from "next/link";
import { LESSONS_SORTED, TOTAL_LESSONS, getTopic } from "../../lib/academy";
import { useWatched } from "../../lib/progress";
import { fmt, yt } from "../../lib/youtube";
import Swiper from "../swiper/swiper";

// Barcha darslar — bitta lentada (to'q blok, hero bilan bir uslubda). Davomiylik bo'yicha filtr:
// vaqtingizga qarab dars tanlash. Kartochka bosilsa — dars o'z mavzu sahifasida ochiladi (?dars=N).
const FILTERS = [
  { key: "all", label: "Barchasi", test: () => true },
  { key: "s", label: "1 daqiqagacha", test: (s: number) => s < 60 },
  { key: "m", label: "1–2 daqiqa", test: (s: number) => s >= 60 && s < 120 },
  { key: "l", label: "2 daqiqadan ko‘p", test: (s: number) => s >= 120 },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

export default function LessonFeed() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const watched = useWatched();
  const f = FILTERS.find((x) => x.key === filter)!;
  const list = LESSONS_SORTED.filter((l) => f.test(l.durationSec));
  const done = watched.size;

  return (
    <section className="ac-section ac-feed-sec" id="lessons" data-theme="light" aria-labelledby="ac-feed-title">
      <div className="container">
        <div className="ac-feed" data-theme="dark" data-reveal>
          <div className="ac-feed__head">
            <div>
              <p className="ac-eyebrow ac-eyebrow--on-dark">Barcha darslar</p>
              <h2 id="ac-feed-title" className="ac-h2">
                {TOTAL_LESSONS} ta dars — <span className="ac-feed__accent">bitta lentada</span>
              </h2>
              <p className="ac-feed__lead">Vaqtingizga qarab tanlang: har bir dars bitta vazifani ko‘rsatadi.</p>
            </div>
            <div className="ac-feed__stat">
              <b>
                {done}
                <small> / {TOTAL_LESSONS}</small>
              </b>
              <span>dars ko‘rildi</span>
              <span className="ac-feed__bar" aria-hidden="true">
                <i style={{ width: `${(done / TOTAL_LESSONS) * 100}%` }} />
              </span>
            </div>
          </div>

          <div className="ac-feed__filters" role="group" aria-label="Davomiylik bo‘yicha">
            {FILTERS.map((x) => (
              <button
                key={x.key}
                type="button"
                className="ac-feed__chip"
                aria-pressed={filter === x.key}
                onClick={() => setFilter(x.key)}
              >
                {x.label}
                <small>{LESSONS_SORTED.filter((l) => x.test(l.durationSec)).length}</small>
              </button>
            ))}
          </div>

          <Swiper key={filter} label="Darslar lentasi">
            {list.map((l) => (
              <li key={l.n}>
                <Link href={`/${l.topic}?dars=${l.n}`} className="ac-pl" draggable={false}>
                  <span className="ac-pl__thumb">
                    <img src={yt.thumbMq(l.youtubeId)} width={320} height={180} alt="" loading="lazy" decoding="async" draggable={false} />
                    <span className="ac-pl__dur">{fmt(l.durationSec)}</span>
                  </span>
                  <span className="ac-pl__meta">
                    {l.n}-dars · {getTopic(l.topic)?.name}
                    {watched.has(l.n) && <em className="is-done">ko‘rildi</em>}
                  </span>
                  <span className="ac-pl__title">{l.title}</span>
                </Link>
              </li>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
