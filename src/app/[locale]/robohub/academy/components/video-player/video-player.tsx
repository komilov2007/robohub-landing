"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Lesson } from "../../lib/academy";
import { warmYoutube, yt } from "../../lib/youtube";
import { PlayGlyph } from "../svg-icon/svg-icon";

// Muqova: telefonda (≤767px) 480px hqdefault webp — LCP uchun yengil; kattada webp maxres → jpg maxres;
// xato bo'lsa — hqdefault. key={vid} — dars almashsa holat yangilanadi.
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
  onPlayingChange,
}: {
  lesson: Lesson;
  active: boolean; // true — iframe ko'rsatiladi
  onPlay: () => void;
  start?: number;
  eager?: boolean; // hero videosi: muqova darhol va yuqori ustuvorlikda yuklanadi
  badge?: ReactNode; // chap yuqoridagi yorliq
  id?: string;
  // iframe ichidagi video haqiqatan o'ynayaptimi (true) yoki pauza/tugadi (false) — YouTube postMessage orqali
  onPlayingChange?: (playing: boolean) => void;
}) {
  const { youtubeId: vid, title } = lesson;
  const frameRef = useRef<HTMLIFrameElement>(null);
  const cbRef = useRef(onPlayingChange);
  useEffect(() => {
    cbRef.current = onPlayingChange;
  });

  // YouTube embed (enablejsapi=1) holatini kuzatish: iframe'ga "listening" yuboriladi, u esa playerState'ni
  // xabar qilib turadi: 1 — ijroda, 3 — yuklanmoqda (ijro davom etadi), 2 — pauza, 0 — tugadi.
  useEffect(() => {
    const frame = frameRef.current;
    if (!active || !frame) return;
    const hello = () => frame.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: vid, channel: "widget" }), "*");
    frame.addEventListener("load", hello);
    const timer = setInterval(hello, 1000); // birinchi xabar kelguncha qayta yuboriladi
    let last: boolean | null = null;
    const onMessage = (e: MessageEvent) => {
      if (e.source !== frame.contentWindow || typeof e.data !== "string") return;
      let data: { event?: string; info?: unknown };
      try {
        data = JSON.parse(e.data);
      } catch {
        return;
      }
      const state =
        data.event === "onStateChange" ? data.info : data.event === "infoDelivery" ? (data.info as { playerState?: number } | null)?.playerState : undefined;
      if (typeof state !== "number") return;
      clearInterval(timer);
      const playing = state === 1 || state === 3 ? true : state === 2 || state === 0 ? false : last;
      if (playing !== null && playing !== last) {
        last = playing;
        cbRef.current?.(playing);
      }
    };
    window.addEventListener("message", onMessage);
    return () => {
      // sahifadan chiqilganda (yoki boshqa sahifa ochilib, bu sahifa Next.js tomonidan yashirin saqlansa)
      // video to'xtatiladi — aks holda u ko'rinmasdan o'ynashda davom etadi
      frame.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "pauseVideo", args: [] }), "*");
      frame.removeEventListener("load", hello);
      clearInterval(timer);
      window.removeEventListener("message", onMessage);
      if (last) cbRef.current?.(false);
    };
  }, [active, vid, start]);

  return (
    <div className="ac-video" id={id}>
      {active ? (
        <iframe
          ref={frameRef}
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
