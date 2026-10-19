"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { LESSONS_SORTED, TOTAL_LESSONS, getLesson, getTopic } from "../../lib/academy";
import { useLastLesson, useWatched } from "../../lib/progress";
import { fmt, yt } from "../../lib/youtube";
import { PlayGlyph } from "../svg-icon/svg-icon";

// "Davom ettirish" (localStorage'dan): oxirgi ko'rilgan dars va umumiy progress.
// Ma'lumot bo'lmasa — "Shu yerdan boshlang: 1-dars". Serverda boshlang'ich holat, keyin localStorage.
export default function Continue() {
  const last = useLastLesson();
  const watched = useWatched();
  const lastLesson = last ? getLesson(last.n) : undefined;
  const lesson = lastLesson ?? LESSONS_SORTED[0];
  const topic = getTopic(lesson.topic);
  const count = watched.size;

  return (
    <section className="ac-cont" aria-labelledby="ac-cont-title">
      <div className="ac-wrap ac-cont__inner">
        <h2 id="ac-cont-title" className="ac-cont__title">
          {lastLesson ? (
            <>
              Davom
              <br />
              ettiring
            </>
          ) : (
            <>
              Shu yerdan
              <br />
              boshlang
            </>
          )}
        </h2>
        <Link href={`/${lesson.topic}?dars=${lesson.n}`} className="ac-cont__card">
          <span className="ac-cont__thumb">
            <img src={yt.thumbMq(lesson.youtubeId)} width={320} height={180} alt="" loading="lazy" decoding="async" />
            <span className="ac-cont__play" aria-hidden="true">
              <PlayGlyph size={18} />
            </span>
          </span>
          <span className="ac-cont__body">
            <span className="ac-cont__kicker">
              {topic?.name} · {lesson.n}-dars · {fmt(lesson.durationSec)}
            </span>
            <span className="ac-cont__name">{lesson.title}</span>
            <span className="ac-cont__progress">
              <span className="ac-cont__bar" style={{ "--p": count / TOTAL_LESSONS } as CSSProperties}>
                <i />
              </span>
              <span>
                <b>{count}</b> / {TOTAL_LESSONS} ko‘rildi
              </span>
            </span>
          </span>
          <span className="ac-cont__go" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
