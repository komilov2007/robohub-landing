"use client";

import Link from "next/link";
import { getLesson, getTopic, nextLesson, prevLesson, type Lesson } from "../../../lib/academy";
import { fmt, yt } from "../../../lib/youtube";
import { usePlayer } from "../../../components/player/player-context";
import VideoPlayer from "../../../components/video-player/video-player";
import Icon, { ICONS } from "../../../components/svg-icon/svg-icon";

// Hero'dagi pleyer qismlari. Tanlangan dars URL ?dars= da (player-context) — havola bilan ulashsa, shu dars ochiladi.

// Katta pleyer — oddiy shisha ramkada
export function HeroScreen() {
  const { selected, mainLesson, playing, play } = usePlayer();
  const lesson = getLesson(selected)!;
  return (
    <div className="acx-screen" id="ac-player">
      <VideoPlayer
        lesson={lesson}
        active={playing?.n === selected}
        eager
        onPlay={() => play(lesson.n, "section")}
        badge={lesson.n === mainLesson ? `Asosiy dars · ${lesson.n}` : `${lesson.n}-dars`}
      />
    </div>
  );
}

// Ixcham "tanlangan dars" kartochkasi: dars raqami va davomiyligi, nomi, qisqa tavsifi, oldingi/keyingi va YouTube
export function NowPlaying() {
  const { selected, playing } = usePlayer();
  const lesson = getLesson(selected)!;
  const active = playing?.n === selected;
  return (
    <div className="acx-now" key={lesson.n}>
      <p className="acx-now__meta">
        <span className={`acx-eq${active ? " is-on" : ""}`} aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        {active ? "Ijroda" : "Tanlangan dars"} · {lesson.n}-dars · {fmt(lesson.durationSec)}
      </p>
      <h2 className="acx-now__title">{lesson.title}</h2>
      <p className="acx-now__summary">{lesson.summary}</p>
      <div className="acx-now__ctrl">
        <StepButton dir="prev" current={lesson} />
        <StepButton dir="next" current={lesson} />
        <a href={yt.watch(lesson.youtubeId)} target="_blank" rel="noopener" className="acx-now__yt" data-magnet>
          YouTube ↗
        </a>
        <a href="#darslar" className="acx-now__all">
          Barcha darslar
          <Icon d="M6 9l6 6 6-6" size={16} />
        </a>
      </div>
    </div>
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
      <span className="acx-now__btn is-disabled" aria-hidden="true">
        {icon}
      </span>
    );
  const title =
    target.topic === current.topic ? `${label}: ${target.title}` : `Keyingi mavzu: ${getTopic(target.topic)?.name}`;
  if (target.topic === current.topic)
    return (
      <button type="button" className="acx-now__btn" aria-label={title} title={title} onClick={() => select(target.n)}>
        {icon}
      </button>
    );
  return (
    <Link href={`/${target.topic}?dars=${target.n}`} className="acx-now__btn" aria-label={title} title={title}>
      {icon}
    </Link>
  );
}
