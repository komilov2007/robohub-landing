"use client";

import type { CSSProperties } from "react";
import { OPEN_EVENT } from "../reels/reels-client";

// Videosharhlar: ekran kengligidagi lenta, o'zi sekin suriladi va cheksiz takrorlanadi (sichqoncha ustida to'xtaydi).
// Videolar kam bo'lsa ham ekran to'lishi uchun ro'yxat REPEAT marta ketma-ket chiziladi, so'ng butun bo'lak
// ikki nusxada — lenta yarmiga surilganda ikkinchi nusxa birinchisining o'rnida turadi (ulanish bilinmaydi).
// Karta bosilsa — burchakdagi reels pleyeri shu videodan to'liq ekranda ochiladi (OPEN_EVENT).
type Video = { id: string; name: string; lang: string; flag: string };
type T = { title: string; prev: string; next: string; watch: string };

const REPEAT = 2;
const poster = (id: string) => `https://i.ytimg.com/vi/${id}/oar2.jpg`;

export default function ReviewsVideos({ videos, t }: { videos: Video[]; t: T }) {
  const half = Array.from({ length: REPEAT }, () => videos).flat();
  const all = [...half, ...half];
  return (
    <div className="revs__videos" data-sr="" style={{ "--d": "200ms" } as CSSProperties}>
      <h3 className="revs__sub">{t.title}</h3>
      <div className="revs__vmarquee">
        <ul className="revs__track" style={{ "--dur": `${half.length * 6}s` } as CSSProperties}>
          {all.map((v, k) => {
            const i = k % videos.length;
            const copy = k >= videos.length; // birinchi nusxadan keyingilari — ekran o'quvchilar va Tab uchun yashirin
            return (
              <li key={k} aria-hidden={copy || undefined}>
                <button
                  type="button"
                  className="revs__video"
                  tabIndex={copy ? -1 : undefined}
                  onClick={() => window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: i }))}
                  aria-label={`${t.watch}: ${v.name}`}
                >
                  <img src={poster(v.id)} alt="" loading="lazy" draggable={false} />
                  <span className="revs__play" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M8 5.5v13l11-6.5z" />
                    </svg>
                  </span>
                  <span className="revs__cap">
                    <b>{v.name}</b>
                    <small>
                      <img src={`/flags/${v.flag}.svg`} alt="" width="14" height="14" />
                      {v.lang}
                    </small>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
