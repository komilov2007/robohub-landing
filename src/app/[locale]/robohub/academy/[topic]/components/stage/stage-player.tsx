"use client";

import { useEffect, useRef, type CSSProperties, type MouseEvent } from "react";
import Link from "next/link";
import {
  getLesson,
  lessonsByTopic,
  nextTopic,
  type Topic,
  lessonNo,
} from "../../../lib/academy";
import { lessonHref, topicHref } from "../../../lib/links";
import { useWatched } from "../../../lib/progress";
import { fmt, yt } from "../../../lib/youtube";
import { usePlayer } from "../../../components/player/player-context";
import VideoPlayer from "../../../components/video-player/video-player";
import { PlayGlyph } from "../../../components/svg-icon/svg-icon";
import { common } from "../../../lib/common.i18n";
import { useAcademyLocale } from "../../../components/locale/locale";
import { messages } from "./stage.i18n";
import { imgAlt } from "@/lib/img-alt";

// Hero'dagi pleyer qismlari (YouTube kabi: pleyer va pleylist). Tanlangan dars — URL yo'lida (/academy/{mavzu}/{dars}, player-context).

// Katta pleyer — oddiy shisha ramkada
// "Kino" rejimi: video o'ynayotganda sahifaning qolgan qismi xiralashadi (pleyer va pleylist tiniq qoladi).
// Xiralashgan joyning istalgan yeriga bosilsa — xiralik yo'qoladi, video esa o'ynashda davom etadi.
function setCinema(on: boolean) {
  document.documentElement.classList.toggle("acx-cinema", on);
}

export function HeroScreen() {
  const locale = useAcademyLocale();
  const t = messages[locale];
  const { selected, mainLesson, playing, play } = usePlayer();
  const lesson = getLesson(selected, locale)!;

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
        badge={
          lesson.n === mainLesson
            ? t.mainBadge(lessonNo(lesson.n))
            : common[locale].lessonN(lessonNo(lesson.n))
        }
        // ijro paytida sahifaning qolgan qismi xiralashadi (topic.css → .acx-cinema)
        onPlayingChange={setCinema}
      />
    </div>
  );
}

// Pleylist — shu mavzuning barcha darslari (YouTube'dagi o'ng ustun kabi): raqam, muqova, nom, davomiylik.
// Tanlangani ajratilgan va ro'yxat ichida ko'rinib turadi; bosilsa — dars pleyerda ochiladi va ijro boshlanadi.
// Har qator — haqiqiy havola (dars sahifasiga): Google dars sahifalarini shu orqali topadi; oddiy bosishda sahifa
// qayta yuklanmaydi (select), Ctrl/Cmd+bosish — yangi oynada ochiladi.
// Pastda — doim ko'rinib turadigan "Keyingi mavzu" paneli (ro'yxat scroll bo'lsa ham joyida).
export function Playlist({ topic }: { topic: Topic }) {
  const locale = useAcademyLocale();
  const t = messages[locale];
  const c = common[locale];
  const { selected, mainLesson, playing, select } = usePlayer();
  const watched = useWatched();
  const lessons = lessonsByTopic(topic.slug, locale);
  const pos = lessons.findIndex((l) => l.n === selected) + 1;
  const done = lessons.filter((l) => watched.has(l.n)).length;
  const listRef = useRef<HTMLOListElement>(null);
  const upcoming = nextTopic(topic.slug, locale);
  const open = (e: MouseEvent<HTMLAnchorElement>, n: number) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
      return;
    e.preventDefault();
    select(n, { play: true, scroll: true });
  };

  // Tanlangan dars ro'yxat ichida ko'rinib tursin (faqat ro'yxat scroll'i — sahifa joyida qoladi)
  useEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>(".is-selected");
    if (!list || !el || list.scrollHeight <= list.clientHeight) return;
    list.scrollTo({
      top: el.offsetTop - list.offsetTop - 8,
      behavior: "smooth",
    });
  }, [selected]);

  return (
    <aside className="acx-pl" aria-label={t.playlistLabel(topic.name)}>
      <div className="acx-pl__head">
        <p className="acx-pl__name">{topic.name}</p>
        <p className="acx-pl__meta">
          {pos} / {lessons.length} · {t.watchedCount(done)}
        </p>
        <span className="acx-pl__bar" aria-hidden="true">
          <i
            style={
              {
                "--p": lessons.length ? done / lessons.length : 0,
              } as CSSProperties
            }
          />
        </span>
      </div>
      <ol className="acx-pl__list" ref={listRef}>
        {lessons.map((l, i) => {
          const isSel = l.n === selected;
          const isPlaying = playing?.n === l.n;
          return (
            <li key={l.n}>
              <a
                href={lessonHref(locale, topic.slug, l.n)}
                className={`acx-pl__item${isSel ? " is-selected" : ""}`}
                aria-current={isSel ? "true" : undefined}
                onClick={(e) => open(e, l.n)}
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
                  <img
                    src={yt.thumbMq(l.youtubeId)}
                    width={320}
                    height={180}
                    alt={imgAlt(locale, "lesson", l.title)}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="acx-pl__dur">{fmt(l.durationSec)}</span>
                </span>
                <span className="acx-pl__text">
                  <span className="acx-pl__title">{l.title}</span>
                  <span className="acx-pl__sub">
                    {c.lessonN(lessonNo(l.n))}
                    {watched.has(l.n) && <em className="is-done">{c.watched}</em>}
                    {!watched.has(l.n) && l.n === mainLesson && <em>{t.main}</em>}
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ol>
      {/* doim — keyingi mavzu */}
      {
        <Link href={topicHref(locale, upcoming.slug)} className="acx-pl__next">
          <span className="acx-pl__next-ico" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={upcoming.icon} />
            </svg>
          </span>
          <span className="acx-pl__next-text">
            <small>{t.nextTopic}</small>
            <b>
              {upcoming.name} · {c.lessons(lessonsByTopic(upcoming.slug, locale).length)}
            </b>
          </span>
          <span className="acx-pl__next-go" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </Link>
      }
    </aside>
  );
}
