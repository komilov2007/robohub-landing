"use client";

import { useState, type ReactNode } from "react";
import type { Lesson } from "../../lib/academy";
import { warmYoutube, yt } from "../../lib/youtube";
import { PlayGlyph } from "../svg-icon/svg-icon";

// Muqova: webp maxres (mobilda — yengil hqdefault webp) → jpg maxres → (xato bo'lsa) hqdefault. key={vid} — dars almashsa holat yangilanadi.
function Cover({ vid, eager }: { vid: string; eager: boolean }) {
  const [failed, setFailed] = useState(false);
  const img = (
    <img
      src={failed ? yt.thumbHq(vid) : yt.thumb(vid)}
      width={1280}
      height={720}
      alt=""
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
  if (failed) return img;
  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={yt.thumbHqWebp(vid)} type="image/webp" />
      <source srcSet={yt.thumbWebp(vid)} type="image/webp" />
      {img}
    </picture>
  );
}

// YouTube pleyer — facade usuli (Robohub_academy.md, 6-bo'lim): boshida faqat muqova va play tugma,
// iframe faqat bosilganda qo'yiladi. Sahifa ochilganda birorta ham iframe yuklanmaydi.
export default function VideoPlayer({
  lesson,
  active,
  onPlay,
  start = 0,
  eager = false,
  badge,
  id,
}: {
  lesson: Lesson;
  active: boolean; // true — iframe ko'rsatiladi
  onPlay: () => void;
  start?: number;
  eager?: boolean; // hero videosi: muqova darhol va yuqori ustuvorlikda yuklanadi
  badge?: ReactNode; // chap yuqoridagi yorliq
  id?: string;
}) {
  const { youtubeId: vid, title } = lesson;
  return (
    <div className="ac-video" id={id}>
      {active ? (
        <iframe
          key={`${vid}-${start}`}
          src={yt.embed(vid, start)}
          title={`${title} — Robohub Academy`}
          width={1280}
          height={720}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="ac-video__facade"
          aria-label={`Videoni ijro etish: ${title}`}
          onClick={onPlay}
          onPointerEnter={warmYoutube}
          onFocus={warmYoutube}
        >
          <Cover key={vid} vid={vid} eager={eager} />
          <span className="ac-play" aria-hidden="true">
            <PlayGlyph size={30} />
          </span>
        </button>
      )}
      {badge && !active && <span className="ac-video__badge">{badge}</span>}
    </div>
  );
}
