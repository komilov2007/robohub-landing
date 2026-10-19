"use client";

import { useMemo, useSyncExternalStore } from "react";

// Ko'rilgan darslar va oxirgi dars — localStorage'da (Robohub_academy.md, 6-bo'lim, 8–9).
// localStorage bloklangan bo'lsa (private rejim va h.k.) sahifa sinmaydi: hammasi try/catch ichida.
const WATCHED_KEY = "rh-academy-watched";
const LAST_KEY = "rh-academy-last";
const EVENT = "rh-academy-progress";

export type LastLesson = { n: number; at: number };

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* bloklangan — e'tiborsiz */
  }
}

function subscribe(cb: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === WATCHED_KEY || e.key === LAST_KEY) cb();
  };
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", onStorage);
  };
}

// Snapshot — xom satr (barqaror qiymat, useSyncExternalStore uchun), parse — hook ichida
const watchedRaw = () => read(WATCHED_KEY) ?? "";
const lastRaw = () => read(LAST_KEY) ?? "";
const serverRaw = () => "";

function parseWatched(raw: string): number[] {
  if (!raw) return [];
  try {
    const v: unknown = JSON.parse(raw);
    return Array.isArray(v) ? v.filter((x): x is number => typeof x === "number") : [];
  } catch {
    return [];
  }
}

function parseLast(raw: string): LastLesson | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as Partial<LastLesson>;
    return typeof v.n === "number" ? { n: v.n, at: Number(v.at) || 0 } : null;
  } catch {
    return null;
  }
}

// Ko'rilgan dars raqamlari. Serverda va birinchi chizishda bo'sh — keyin localStorage'dan.
export function useWatched(): Set<number> {
  const raw = useSyncExternalStore(subscribe, watchedRaw, serverRaw);
  return useMemo(() => new Set(parseWatched(raw)), [raw]);
}

export function useLastLesson(): LastLesson | null {
  const raw = useSyncExternalStore(subscribe, lastRaw, serverRaw);
  return useMemo(() => parseLast(raw), [raw]);
}

// Play bosilganda chaqiriladi
export function markWatched(n: number) {
  const list = parseWatched(read(WATCHED_KEY) ?? "");
  if (!list.includes(n)) list.push(n);
  write(WATCHED_KEY, JSON.stringify(list));
  write(LAST_KEY, JSON.stringify({ n, at: Date.now() } satisfies LastLesson));
  window.dispatchEvent(new Event(EVENT));
}
