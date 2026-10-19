"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { getLesson, type TopicSlug } from "../../lib/academy";
import { markWatched } from "../../lib/progress";

// Mavzu sahifasining umumiy pleyer holati:
//   selected — hero pleyerida tanlangan dars; manbasi URL ?dars= (ulashish uchun)
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
const getSearch = () => window.location.search;
const getServerSearch = () => "";

// Pleyerga scroll (hero ichidagi katta pleyer). scroll-margin-top header ostida joy qoldiradi.
function scrollToPlayer() {
  const el = document.getElementById("ac-player");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

export function PlayerProvider({
  topic,
  mainLesson,
  children,
}: {
  topic: TopicSlug;
  mainLesson: number;
  children: ReactNode;
}) {
  const search = useSyncExternalStore(subscribeUrl, getSearch, getServerSearch);
  const [playing, setPlaying] = useState<PlayerCtx["playing"]>(null);

  // ?dars=N — faqat shu mavzuning darsi bo'lsa; aks holda asosiy dars
  const selected = useMemo(() => {
    const n = Number(new URLSearchParams(search).get("dars"));
    return getLesson(n)?.topic === topic ? n : mainLesson;
  }, [search, topic, mainLesson]);

  const play = useCallback((n: number, slot: Slot) => {
    markWatched(n);
    setPlaying({ n, slot });
  }, []);

  const select = useCallback(
    (n: number, opts: { play?: boolean; scroll?: boolean } = {}) => {
      const url = new URL(window.location.href);
      url.searchParams.set("dars", String(n));
      url.hash = "";
      window.history.replaceState(null, "", url);
      window.dispatchEvent(new Event(URL_EVENT));
      if (opts.play) play(n, "section");
      else setPlaying((p) => (p?.slot === "section" ? null : p));
      if (opts.scroll) scrollToPlayer();
    },
    [play],
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
