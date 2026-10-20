"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { getLesson, lessonsByTopic, type Topic } from "../../../lib/academy";
import { useWatched } from "../../../lib/progress";
import { fmt, yt } from "../../../lib/youtube";
import { usePlayer } from "../../../components/player/player-context";
import VideoPlayer from "../../../components/video-player/video-player";
import { PlayGlyph } from "../../../components/svg-icon/svg-icon";

// Hero'dagi pleyer qismlari (YouTube kabi: pleyer va pleylist). Tanlangan dars URL ?lesson= da (player-context) — havola bilan ulashsa, shu dars ochiladi.

// Katta pleyer — oddiy shisha ramkada
// "Kino" rejimi: video o'ynayotganda sahifaning qolgan qismi xiralashadi (pleyer va pleylist tiniq qoladi).
// Xiralashgan joyning istalgan yeriga bosilsa — xiralik yo'qoladi, video esa o'ynashda davom etadi.
function setCinema(on: boolean) {
  document.documentElement.classList.toggle("acx-cinema", on);
}

export function HeroScreen() {
  const { selected, mainLesson, playing, play } = usePlayer();
  const lesson = getLesson(selected)!;

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (!document.documentElement.classList.contains("acx-cinema")) return;
      const t = e.target as Element | null;
      if (t?.closest("#ac-player, .acx-pl")) return; // pleyer va pleylist — xiralikka ta'sir qilmaydi
      setCinema(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      setCinema(false); // sahifadan chiqilganda xiralik qolib ketmasin
    };
  }, []);
  return (
    <div className="acx-screen" id="ac-player">
      <VideoPlayer
        lesson={lesson}
        active={playing?.n === selected}
        eager
        onPlay={() => play(lesson.n, "section")}
        badge={lesson.n === mainLesson ? `Asosiy dars · ${lesson.n}` : `${lesson.n}-dars`}
        // ijro paytida sahifaning qolgan qismi xiralashadi (topic.css → .acx-cinema)
        onPlayingChange={setCinema}
      />
    </div>
  );
}

// Pleylist — shu mavzuning barcha darslari (YouTube'dagi o'ng ustun kabi): raqam, muqova, nom, davomiylik.
// Tanlangani ajratilgan va ro'yxat ichida ko'rinib turadi; bosilsa — dars pleyerda ochiladi va ijro boshlanadi.
export function Playlist({ topic }: { topic: Topic }) {
  const { selected, mainLesson, playing, select } = usePlayer();
  const watched = useWatched();
  const lessons = lessonsByTopic(topic.slug);
  const pos = lessons.findIndex((l) => l.n === selected) + 1;
  const done = lessons.filter((l) => watched.has(l.n)).length;
  const listRef = useRef<HTMLOListElement>(null);

  // Tanlangan dars ro'yxat ichida ko'rinib tursin (faqat ro'yxat scroll'i — sahifa joyida qoladi)
  useEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>(".is-selected");
    if (!list || !el || list.scrollHeight <= list.clientHeight) return;
    list.scrollTo({ top: el.offsetTop - list.offsetTop - 8, behavior: "smooth" });
  }, [selected]);

  return (
    <aside className="acx-pl" aria-label={`${topic.name}: mavzu darslari`}>
      <div className="acx-pl__head">
        <p className="acx-pl__name">{topic.name}</p>
        <p className="acx-pl__meta">
          {pos} / {lessons.length} · {done} ta ko‘rildi
        </p>
        <span className="acx-pl__bar" aria-hidden="true">
          <i style={{ "--p": lessons.length ? done / lessons.length : 0 } as CSSProperties} />
        </span>
      </div>
      <ol className="acx-pl__list" ref={listRef}>
        {lessons.map((l, i) => {
          const isSel = l.n === selected;
          const isPlaying = playing?.n === l.n;
          return (
            <li key={l.n}>
              <button
                type="button"
                className={`acx-pl__item${isSel ? " is-selected" : ""}`}
                aria-current={isSel ? "true" : undefined}
                onClick={() => select(l.n, { play: true, scroll: true })}
              >
                <span className="acx-pl__n">
                  {isPlaying ? (
                    <span className="acx-eq is-on" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                  ) : isSel ? (
                    <PlayGlyph size={11} />
                  ) : (
                    i + 1
                  )}
                </span>
                <span className="acx-pl__thumb">
                  <img src={yt.thumbMq(l.youtubeId)} width={320} height={180} alt="" loading="lazy" decoding="async" />
                  <span className="acx-pl__dur">{fmt(l.durationSec)}</span>
                </span>
                <span className="acx-pl__text">
                  <span className="acx-pl__title">{l.title}</span>
                  <span className="acx-pl__sub">
                    {l.n}-dars
                    {watched.has(l.n) && <em className="is-done">ko‘rildi</em>}
                    {!watched.has(l.n) && l.n === mainLesson && <em>asosiy</em>}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
