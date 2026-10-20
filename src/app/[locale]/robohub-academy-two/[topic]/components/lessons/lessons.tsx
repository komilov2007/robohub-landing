"use client";

import type { CSSProperties } from "react";
import { lessonsByTopic, type Topic } from "../../../lib/academy";
import { fmt, yt } from "../../../lib/youtube";
import { useWatched } from "../../../lib/progress";
import { usePlayer } from "../../../components/player/player-context";
import Icon, { ICONS, PlayGlyph } from "../../../components/svg-icon/svg-icon";

// "Mavzu darslari" — hero ostidagi bo'lim: mavzuning barcha darslari kartochkalarda (muqova, raqam, nom,
// tavsif, holat). Bosilsa — dars hero pleyerida ochiladi va sahifa pleyerga qaytadi (player-context select).
export default function Lessons({ topic }: { topic: Topic }) {
  const { selected, mainLesson, playing, select } = usePlayer();
  const watched = useWatched();
  const lessons = lessonsByTopic(topic.slug);
  const done = lessons.filter((l) => watched.has(l.n)).length;

  return (
    <section id="darslar" className="acx-lessons" data-theme="light" aria-labelledby="ac-lessons-title">
      <div className="container">
        <div className="acx-lessons__head" data-reveal>
          <div>
            <p className="acx-kicker">Mavzu darslari</p>
            <h2 id="ac-lessons-title" className="acx-h2">
              {topic.name}: <span className="acx-mark">{lessons.length} ta video dars</span>
            </h2>
          </div>
          <div className="acx-lessons__stat">
            <span
              className="acx-ring acx-ring--light"
              style={{ "--p": lessons.length ? done / lessons.length : 0 } as CSSProperties}
              role="progressbar"
              aria-label="Ko‘rilgan darslar"
              aria-valuemin={0}
              aria-valuemax={lessons.length}
              aria-valuenow={done}
            />
            <span>
              <b>
                {done} / {lessons.length}
              </b>
              ko‘rildi
            </span>
          </div>
        </div>

        <ol className="acx-lessons__grid">
          {lessons.map((l, i) => {
            const isSel = l.n === selected;
            const isPlaying = playing?.n === l.n;
            const isDone = watched.has(l.n);
            return (
              <li key={l.n} data-reveal style={{ "--ri": i % 3 } as CSSProperties}>
                <button
                  type="button"
                  className={`acx-lc2${isSel ? " is-selected" : ""}`}
                  aria-current={isSel ? "true" : undefined}
                  onClick={() => select(l.n, { play: true, scroll: true })}
                  data-glow
                >
                  <span className="acx-lc2__thumb">
                    <img src={yt.thumbMq(l.youtubeId)} width={320} height={180} alt="" loading="lazy" decoding="async" />
                    <span className="acx-lc2__play" aria-hidden="true">
                      <PlayGlyph size={16} />
                    </span>
                    <span className="acx-lc2__dur">{isPlaying ? "Ijroda" : fmt(l.durationSec)}</span>
                  </span>
                  <span className="acx-lc2__body">
                    <span className="acx-lc2__meta">
                      <b>{String(i + 1).padStart(2, "0")}</b>
                      {l.n}-dars
                      {isSel && <em className="is-sel">Tanlangan</em>}
                      {!isSel && l.n === mainLesson && <em>asosiy</em>}
                      {isDone && (
                        <em className="is-done">
                          <Icon d={ICONS.check} size={11} /> ko‘rildi
                        </em>
                      )}
                    </span>
                    <span className="acx-lc2__title">{l.title}</span>
                    <span className="acx-lc2__sum">{l.summary}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
