"use client";

import { getLesson } from "../../../lib/academy";
import { fmt, yt } from "../../../lib/youtube";
import { usePlayer } from "../../../components/player/player-context";
import VideoPlayer from "../../../components/video-player/video-player";

// Hero'dagi asosiy dars pleyeri. Video bo'limi bilan umumiy holat (player-context):
// sahifada bir vaqtda faqat bitta iframe.
export default function HeroPlayer() {
  const { mainLesson, playing, play } = usePlayer();
  const lesson = getLesson(mainLesson)!;
  return (
    <figure className="ac-th__player">
      <VideoPlayer
        lesson={lesson}
        active={playing?.slot === "hero"}
        eager
        onPlay={() => play(lesson.n, "hero")}
        badge={`Asosiy dars · ${lesson.n}`}
      />
      <figcaption>
        <span>
          <b>{lesson.title}</b>
          {lesson.n}-dars · {fmt(lesson.durationSec)}
        </span>
        <a href={yt.watch(lesson.youtubeId)} target="_blank" rel="noopener">
          YouTube’da ochish ↗
        </a>
      </figcaption>
    </figure>
  );
}
