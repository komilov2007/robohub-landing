"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { START_PATH, TOTAL_LESSONS, getLesson, getTopic, lessonsByTopic, nextLesson, type Lesson } from "../../lib/academy";
import { useLastLesson, useWatched } from "../../lib/progress";
import { fmt, yt } from "../../lib/youtube";
import Icon, { ICONS, PlayGlyph } from "../svg-icon/svg-icon";

// Bosh sahifa hero'sidagi kartochka: oxirgi ko'rilgan dars ("Davom ettiring") yoki Boshlang'ich yo'lning
// birinchi darsi ("Shu yerdan boshlang"), ostida keyingi 3 dars va umumiy progress.
// localStorage gidratatsiyadan keyin o'qiladi — server HTML'ida boshlang'ich dars.
// Ko'rinish: 3D'da og'gan, suzib turadigan kartochka (data-tilt — kursorga qarab og'adi), orqasida ikki "soya" varaq.
const FIRST = lessonsByTopic(START_PATH[0].topic)[0];

function upNext(n: number, count: number): Lesson[] {
  const out: Lesson[] = [];
  for (let l = nextLesson(n); l && out.length < count; l = nextLesson(l.n)) out.push(l);
  return out;
}

const href = (l: Lesson) => `/${l.topic}?dars=${l.n}`;

export default function ContinueCard() {
  const last = useLastLesson();
  const watched = useWatched();
  const lastLesson = last ? getLesson(last.n) : undefined;
  const lesson = lastLesson ?? FIRST;
  const next = upNext(lesson.n, 3);

  return (
    <div className="acx-cc" data-tilt>
      <div className="acx-cc__float">
        <span className="acx-cc__sheet acx-cc__sheet--2" aria-hidden="true" />
        <span className="acx-cc__sheet acx-cc__sheet--1" aria-hidden="true" />
        <div className="acx-cc__card" data-glow>
          <Link href={href(lesson)} className="acx-cc__main">
            <span className="acx-cc__thumb">
              <picture>
                <source srcSet={yt.thumbHqWebp(lesson.youtubeId)} type="image/webp" />
                <img src={yt.thumbHq(lesson.youtubeId)} width={480} height={360} alt="" fetchPriority="high" decoding="async" />
              </picture>
              <span className="acx-cc__scan" aria-hidden="true" />
              <span className="acx-cc__badge">
                <i aria-hidden="true" />
                {lastLesson ? "Davom ettiring" : "Shu yerdan boshlang"}
              </span>
              <span className="acx-cc__dur">{fmt(lesson.durationSec)}</span>
              <span className="acx-cc__play" aria-hidden="true">
                <i />
                <i />
                <PlayGlyph size={24} />
              </span>
            </span>
            <span className="acx-cc__info">
              <small>
                {getTopic(lesson.topic)?.name} · {lesson.n}-dars
              </small>
              <strong>{lesson.title}</strong>
            </span>
          </Link>

          {next.length > 0 && (
            <div className="acx-cc__next">
              <p>Keyingi darslar</p>
              <ol>
                {next.map((l, i) => (
                  <li key={l.n} style={{ "--i": i } as CSSProperties}>
                    <Link href={href(l)}>
                      <span className={`acx-cc__n${watched.has(l.n) ? " is-done" : ""}`}>
                        {watched.has(l.n) ? <Icon d={ICONS.check} size={14} /> : l.n}
                      </span>
                      <span className="acx-cc__title">{l.title}</span>
                      <em>{fmt(l.durationSec)}</em>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="acx-cc__foot">
            <span className="acx-meter" style={{ "--p": watched.size / TOTAL_LESSONS } as CSSProperties}>
              <i />
            </span>
            <span>
              {watched.size} / {TOTAL_LESSONS} dars ko‘rildi
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
