"use client";

import Link from "next/link";
import { getLesson, getTopic, lessonsByTopic, nextLesson, prevLesson, type Lesson, type Topic } from "../../../lib/academy";
import { fmt, yt } from "../../../lib/youtube";
import { useWatched } from "../../../lib/progress";
import { usePlayer } from "../../../components/player/player-context";
import VideoPlayer from "../../../components/video-player/video-player";
import Icon, { ICONS } from "../../../components/svg-icon/svg-icon";
import Marker from "../../../components/marker/marker";

// Video darslar — teal blok. Chapda pleyer, summary, "Ushbu darsda", oldingi/keyingi (butun Academy bo'yicha),
// YouTube havolasi; o'ngda mavzu darslari. Tanlangan dars URL ?dars=N da (player-context).
export default function VideoLessons({ topic }: { topic: Pick<Topic, "slug" | "name"> }) {
  const { selected, playing, play, select } = usePlayer();
  const watched = useWatched();
  const lessons = lessonsByTopic(topic.slug);
  const lesson = getLesson(selected)!;
  const done = lessons.filter((l) => watched.has(l.n)).length;

  return (
    <section id="videos" className="ac-vl" aria-labelledby="ac-vl-title">
      <div className="ac-wrap">
        <div className="ac-vl__head">
          <h2 id="ac-vl-title" className="ac-h2">
            {topic.name}: <Marker view>{`${lessons.length} ta dars`}</Marker>
          </h2>
          <p>
            <b>{done}</b> / {lessons.length} ko‘rildi
          </p>
        </div>

        <div className="ac-vl__grid">
          <div className="ac-vl__main">
            <div className="ac-vl__player" id="ac-player">
              <VideoPlayer
                lesson={lesson}
                active={playing?.slot === "section" && playing.n === selected}
                onPlay={() => play(lesson.n, "section")}
                badge={`${lesson.n}-dars`}
              />
            </div>
            <div className="ac-vl__info">
              <p className="ac-vl__kicker">
                {lesson.n}-dars · {fmt(lesson.durationSec)}
              </p>
              <h3 className="ac-vl__title">{lesson.title}</h3>
              <p className="ac-vl__summary">{lesson.summary}</p>
              {lesson.points.length > 0 && (
                <>
                  <p className="ac-vl__points-title">Ushbu darsda</p>
                  <ul className="ac-vl__points">
                    {lesson.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </>
              )}
              <div className="ac-vl__nav">
                <Step dir="prev" current={lesson} />
                <Step dir="next" current={lesson} />
              </div>
              <a href={yt.watch(lesson.youtubeId)} target="_blank" rel="noopener" className="ac-vl__yt">
                YouTube’da ochish ↗
              </a>
            </div>
          </div>

          <ul className="ac-vl__list" aria-label={`${topic.name} darslari`}>
            {lessons.map((l) => {
              const isSel = l.n === selected;
              const isPlaying = playing?.n === l.n;
              return (
                <li key={l.n}>
                  <button
                    type="button"
                    className={`ac-vl__item${isSel ? " is-selected" : ""}`}
                    aria-current={isSel ? "true" : undefined}
                    onClick={() => select(l.n, { play: true, scroll: window.matchMedia("(max-width: 1023px)").matches })}
                  >
                    <span className="ac-vl__thumb">
                      <img src={yt.thumbMq(l.youtubeId)} width={320} height={180} alt="" loading="lazy" decoding="async" />
                      <span>{isPlaying ? "Ijroda" : fmt(l.durationSec)}</span>
                    </span>
                    <span className="ac-vl__text">
                      <small>
                        {l.n}-dars
                        {watched.has(l.n) && <em>✓ ko‘rildi</em>}
                      </small>
                      <b>{l.title}</b>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

// Oldingi / keyingi dars. Shu mavzuda — pleyerda almashadi; boshqa mavzuda — o'sha sahifaga o'tadi.
function Step({ dir, current }: { dir: "prev" | "next"; current: Lesson }) {
  const { select } = usePlayer();
  const target = dir === "prev" ? prevLesson(current.n) : nextLesson(current.n);
  if (!target) return <span />;
  const same = target.topic === current.topic;
  const label = dir === "prev" ? "Oldingi dars" : same ? "Keyingi dars" : `Keyingi mavzu: ${getTopic(target.topic)?.name}`;
  const content =
    dir === "prev" ? (
      <>
        <Icon d={ICONS.chevronLeft} size={18} /> {label}
      </>
    ) : (
      <>
        {label} <Icon d={ICONS.chevronRight} size={18} />
      </>
    );
  const cls = `ac-btn ${dir === "next" ? "ac-btn--yellow" : "ac-btn--ghost-light"} ac-vl__step--${dir}`;
  if (same)
    return (
      <button type="button" className={cls} onClick={() => select(target.n)}>
        {content}
      </button>
    );
  return (
    <Link href={`/${target.topic}?dars=${target.n}`} className={cls}>
      {content}
    </Link>
  );
}
