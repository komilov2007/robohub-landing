"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { getLesson, getTopic, lessonsByTopic, nextLesson, prevLesson, type Lesson, type TopicSlug } from "../../../lib/academy";
import { fmt, yt } from "../../../lib/youtube";
import { useWatched } from "../../../lib/progress";
import { usePlayer } from "../../../components/player/player-context";
import VideoPlayer from "../../../components/video-player/video-player";
import Icon, { ICONS } from "../../../components/svg-icon/svg-icon";
import Swiper from "../../../components/swiper/swiper";

// Hero'dagi asosiy pleyer: katta video, ostida "hozir ijroda" paneli va mavzuning barcha darslari.
// Tanlangan dars URL ?dars= da (player-context) — havola bilan ulashsa, shu dars ochiladi.
export default function StagePlayer({ topic }: { topic: TopicSlug }) {
  const { selected, mainLesson, playing, play, select } = usePlayer();
  const watched = useWatched();
  const lessons = lessonsByTopic(topic);
  const lesson = getLesson(selected)!;
  const active = playing?.n === selected;
  const watchedCount = lessons.filter((l) => watched.has(l.n)).length;

  return (
    <>
      <div className="ac-screen" id="ac-player">
        <VideoPlayer
          lesson={lesson}
          active={active}
          eager
          onPlay={() => play(lesson.n, "section")}
          badge={lesson.n === mainLesson ? `Asosiy dars · ${lesson.n}` : `${lesson.n}-dars`}
        />
        <div className="ac-now">
          <div className="ac-now__main">
            <p className="ac-now__meta">
              <span className={`ac-now__live${active ? " is-on" : ""}`} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              {active ? "Ijroda" : "Tanlangan dars"} · {lesson.n}-dars · {fmt(lesson.durationSec)}
            </p>
            <h2 className="ac-now__title">{lesson.title}</h2>
            <p className="ac-now__summary">{lesson.summary}</p>
          </div>
          <div className="ac-now__ctrl">
            <StepButton dir="prev" current={lesson} />
            <StepButton dir="next" current={lesson} />
            <a href={yt.watch(lesson.youtubeId)} target="_blank" rel="noopener" className="ac-now__yt">
              YouTube ↗
            </a>
          </div>
          {lesson.points.length > 0 && (
            <ul className="ac-now__points" aria-label="Ushbu darsda">
              {lesson.points.map((p) => (
                <li key={p}>
                  <Icon d={ICONS.check} size={13} />
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="ac-playlist">
        <div className="ac-playlist__head">
          <p>
            <strong>Mavzu darslari</strong> · {lessons.length} ta
          </p>
          <div className="ac-playlist__progress">
            <span>
              {watchedCount} / {lessons.length} ko‘rildi
            </span>
            <span
              className="ac-bar"
              style={{ "--p": lessons.length ? watchedCount / lessons.length : 0 } as CSSProperties}
              role="progressbar"
              aria-label="Ko‘rilgan darslar"
              aria-valuemin={0}
              aria-valuemax={lessons.length}
              aria-valuenow={watchedCount}
            >
              <i />
            </span>
          </div>
        </div>
        <Swiper label="Mavzu darslari" className="ac-playlist__track">
          {lessons.map((l) => {
            const isSel = l.n === selected;
            const isPlaying = playing?.n === l.n;
            return (
              <li key={l.n}>
                <button
                  type="button"
                  className={`ac-pl${isSel ? " is-selected" : ""}`}
                  aria-current={isSel ? "true" : undefined}
                  onClick={() => select(l.n, { play: true, scroll: true })}
                >
                  <span className="ac-pl__thumb">
                    <img src={yt.thumbMq(l.youtubeId)} width={320} height={180} alt="" loading="lazy" decoding="async" draggable={false} />
                    <span className={`ac-pl__dur${isPlaying ? " is-live" : ""}`}>{isPlaying ? "Ijroda" : fmt(l.durationSec)}</span>
                  </span>
                  <span className="ac-pl__meta">
                    {l.n}-dars
                    {watched.has(l.n) ? <em className="is-done">ko‘rildi</em> : l.n === mainLesson ? <em>asosiy</em> : null}
                  </span>
                  <span className="ac-pl__title">{l.title}</span>
                </button>
              </li>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}

// Oldingi / Keyingi dars (butun Academy bo'yicha). Shu mavzuda — pleyer almashadi, boshqa mavzuda — o'sha sahifa.
function StepButton({ dir, current }: { dir: "prev" | "next"; current: Lesson }) {
  const { select } = usePlayer();
  const target = dir === "prev" ? prevLesson(current.n) : nextLesson(current.n);
  const label = dir === "prev" ? "Oldingi dars" : "Keyingi dars";
  const icon = <Icon d={dir === "prev" ? ICONS.chevronLeft : ICONS.chevronRight} size={20} />;
  if (!target)
    return (
      <span className="ac-now__btn is-disabled" aria-hidden="true">
        {icon}
      </span>
    );
  const title =
    target.topic === current.topic ? `${label}: ${target.title}` : `Keyingi mavzu: ${getTopic(target.topic)?.name}`;
  if (target.topic === current.topic)
    return (
      <button type="button" className="ac-now__btn" aria-label={title} title={title} onClick={() => select(target.n)}>
        {icon}
      </button>
    );
  return (
    <Link href={`/${target.topic}?dars=${target.n}`} className="ac-now__btn" aria-label={title} title={title}>
      {icon}
    </Link>
  );
}
