"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { LESSONS_SORTED, TOPICS, getTopic, type TopicSlug } from "../../lib/academy";
import { fmt, yt } from "../../lib/youtube";
import { markWatched, useWatched } from "../../lib/progress";
import VideoPlayer from "../video-player/video-player";
import Icon, { ICONS } from "../svg-icon/svg-icon";
import Marker from "../marker/marker";

// Bosh sahifadagi "Videolar": mavzu filtrlari (chip), gorizontal scroll-snap lenta va shu joyning o'zida
// ochiladigan pleyer (facade — bosilmaguncha iframe yuklanmaydi). Bu sahifadagi yagona pleyer.
export default function VideoStrip() {
  const [filter, setFilter] = useState<TopicSlug | "all">("all");
  const [selected, setSelected] = useState(LESSONS_SORTED[0].n);
  const [playing, setPlaying] = useState<number | null>(null);
  const watched = useWatched();
  const trackRef = useRef<HTMLUListElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ prev: false, next: true });

  const list = useMemo(() => (filter === "all" ? LESSONS_SORTED : LESSONS_SORTED.filter((l) => l.topic === filter)), [filter]);
  const lesson = LESSONS_SORTED.find((l) => l.n === selected)!;
  const topic = getTopic(lesson.topic)!;

  // Strelkalar faqat o'sha tomonga surish mumkin bo'lsa faol
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      setEdges({ prev: track.scrollLeft > 4, next: track.scrollLeft < max - 4 });
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(track);
    return () => {
      track.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [list]);

  const step = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: "smooth" });
  };

  const choose = (n: number) => {
    setSelected(n);
    setPlaying(n);
    markWatched(n);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    playerRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
  };

  return (
    <section className="ac-vstrip" id="videos" aria-labelledby="ac-vstrip-title">
      <div className="ac-wrap">
        <div className="ac-vstrip__head">
          <h2 id="ac-vstrip-title" className="ac-h2">
            Barcha <Marker view>videolar</Marker>
          </h2>
          <div className="ac-filters" role="group" aria-label="Mavzu bo‘yicha saralash">
            {[{ slug: "all" as const, name: "Hammasi" }, ...TOPICS].map((t) => (
              <button
                key={t.slug}
                type="button"
                className="ac-filter"
                aria-pressed={filter === t.slug}
                onClick={() => {
                  setFilter(t.slug);
                  trackRef.current?.scrollTo({ left: 0 });
                }}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <div className="ac-vstrip__stage" ref={playerRef}>
          <div className="ac-vstrip__player">
            <VideoPlayer
              lesson={lesson}
              active={playing === lesson.n}
              onPlay={() => {
                setPlaying(lesson.n);
                markWatched(lesson.n);
              }}
              badge={`${lesson.n}-dars`}
            />
          </div>
          <div className="ac-vstrip__info">
            <p className="ac-vstrip__kicker">
              {topic.name} · {fmt(lesson.durationSec)}
            </p>
            <h3 className="ac-vstrip__title">{lesson.title}</h3>
            <p className="ac-vstrip__summary">{lesson.summary}</p>
            <Link href={`/${lesson.topic}?dars=${lesson.n}`} className="ac-link-arrow">
              {topic.name} mavzusida batafsil
              <Icon d={ICONS.arrowRight} size={18} />
            </Link>
          </div>
        </div>

        <div className="ac-strip">
          <ul className="ac-strip__track" ref={trackRef} aria-label="Darslar">
            {list.map((l) => (
              <li key={l.n}>
                <button
                  type="button"
                  className={`ac-scard${l.n === selected ? " is-selected" : ""}`}
                  aria-current={l.n === selected ? "true" : undefined}
                  onClick={() => choose(l.n)}
                >
                  <span className="ac-scard__thumb">
                    <img src={yt.thumbMq(l.youtubeId)} width={320} height={180} alt="" loading="lazy" decoding="async" />
                    <span className="ac-scard__dur">{playing === l.n ? "Ijroda" : fmt(l.durationSec)}</span>
                  </span>
                  <span className="ac-scard__meta">
                    {l.n}-dars · {getTopic(l.topic)?.name}
                    {watched.has(l.n) && <em>ko‘rildi</em>}
                  </span>
                  <span className="ac-scard__title">{l.title}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="ac-strip__nav">
            <button type="button" className="ac-round-btn" aria-label="Oldingi videolar" disabled={!edges.prev} onClick={() => step(-1)}>
              <Icon d={ICONS.chevronLeft} size={20} />
            </button>
            <button type="button" className="ac-round-btn" aria-label="Keyingi videolar" disabled={!edges.next} onClick={() => step(1)}>
              <Icon d={ICONS.chevronRight} size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
