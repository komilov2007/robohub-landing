"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { getLesson, getLessonBySlug, type TopicSlug } from "../../lib/academy";
import { markWatched } from "../../lib/progress";
import { LESSON_PARAM, lessonHref, topicHref } from "../../lib/links";

// Mavzu sahifasining umumiy pleyer holati:
//   selected — hero pleyerida tanlangan dars; manbasi URL yo'li: /academy/{mavzu}/{dars-slug} (har darsning o'z sahifasi).
//              Serverda (va gidratsiyada) — sahifa bergan initialLesson, shuning uchun HTML'da to'g'ri dars matni bo'ladi.
//              Pleylistda boshqa dars tanlansa, sahifa qayta yuklanmaydi — manzil history.replaceState bilan almashadi.
//   playing  — hozir iframe ochiq bo'lgan dars. Sahifada bitta pleyer — bir vaqtda faqat bitta iframe.
export type Slot = "hero" | "section";

type PlayerCtx = {
  topic: TopicSlug;
  mainLesson: number;
  selected: number;
  playing: { n: number; slot: Slot } | null;
  play: (n: number, slot: Slot) => void;
  // Video bo'limida darsni tanlash; play — darhol ijro, scroll — video bo'limiga o'tish
  select: (n: number, opts?: { play?: boolean; scroll?: boolean }) => void;
};

const Ctx = createContext<PlayerCtx | null>(null);

const URL_EVENT = "rh-academy2-url";

function subscribeUrl(cb: () => void) {
  window.addEventListener("popstate", cb);
  window.addEventListener(URL_EVENT, cb);
  return () => {
    window.removeEventListener("popstate", cb);
    window.removeEventListener(URL_EVENT, cb);
  };
}
const getUrl = () => window.location.pathname + window.location.search;
const getServerUrl = () => null;

// URL'dan shu mavzuning darsi: /academy/{topic}/{slug}; eski havola /academy/{topic}?lesson=N ham tushuniladi.
// Boshqa mavzu manzili (masalan, Next.js yashirin saqlagan oldingi sahifa) — null.
function lessonFromUrl(url: string, topic: TopicSlug, mainLesson: number): number | null {
  const u = new URL(url, "http://x");
  const base = topicHref(topic);
  if (u.pathname === base || u.pathname === `${base}/`) {
    const n = Number(u.searchParams.get(LESSON_PARAM));
    return getLesson(n)?.topic === topic ? n : mainLesson;
  }
  if (u.pathname.startsWith(`${base}/`)) return getLessonBySlug(topic, u.pathname.slice(base.length + 1).replace(/\/$/, ""))?.n ?? null;
  return null;
}

// Pleyerga scroll (hero ichidagi katta pleyer). scroll-margin-top header ostida joy qoldiradi.
function scrollToPlayer() {
  const el = document.getElementById("ac-player");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

export function PlayerProvider({
  topic,
  mainLesson,
  initialLesson = mainLesson,
  children,
}: {
  topic: TopicSlug;
  mainLesson: number;
  // dars sahifasida (/academy/{mavzu}/{slug}) — o'sha dars; mavzu sahifasida — asosiy dars
  initialLesson?: number;
  children: ReactNode;
}) {
  const url = useSyncExternalStore(subscribeUrl, getUrl, getServerUrl);
  const [playing, setPlaying] = useState<PlayerCtx["playing"]>(null);

  // Sahifadan chiqilganda ijro holati tozalanadi. cacheComponents tufayli Next.js oldingi sahifani yashirin
  // saqlaydi va orqa fonda qayta chizishi mumkin — holat qolsa, iframe qayta yaratilib video boshidan o'ynab ketadi.
  useEffect(() => () => setPlaying(null), []);

  const selected = useMemo(
    () => (url === null ? initialLesson : (lessonFromUrl(url, topic, mainLesson) ?? initialLesson)),
    [url, topic, mainLesson, initialLesson],
  );

  // Eski havola (?lesson=N) — manzil darsning yangi sahifasiga almashtiriladi
  useEffect(() => {
    if (window.location.pathname !== topicHref(topic) || !new URLSearchParams(window.location.search).has(LESSON_PARAM)) return;
    // gidratsiya paytidagi `selected` emas, URL'ning o'zi: birinchi chizishda selected hali server qiymatida (asosiy dars)
    const n = lessonFromUrl(getUrl(), topic, mainLesson) ?? mainLesson;
    window.history.replaceState(null, "", lessonHref(topic, n) + window.location.hash);
    window.dispatchEvent(new Event(URL_EVENT));
  }, [topic, mainLesson]);

  const play = useCallback((n: number, slot: Slot) => {
    markWatched(n);
    setPlaying({ n, slot });
  }, []);

  const select = useCallback(
    (n: number, opts: { play?: boolean; scroll?: boolean } = {}) => {
      window.history.replaceState(null, "", lessonHref(topic, n));
      window.dispatchEvent(new Event(URL_EVENT));
      if (opts.play) play(n, "section");
      else setPlaying((p) => (p?.slot === "section" ? null : p));
      if (opts.scroll) scrollToPlayer();
    },
    [play, topic],
  );

  const value = useMemo(
    () => ({ topic, mainLesson, selected, playing, play, select }),
    [topic, mainLesson, selected, playing, play, select],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePlayer(): PlayerCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePlayer — PlayerProvider ichida ishlatilishi kerak");
  return ctx;
}
