"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

// rb-market kalkulyatori TanStack Query'ga tayanadi; landingda bitta sahifa uchun kutubxona qo'shmaslik uchun —
// undan kerakli qismi: so'rov kaliti bo'yicha kesh, bir xil so'rovlarni birlashtirish, keepPreviousData va refetch.
// Kalit — so'rov tanasining o'zi, shuning uchun eski javob yangisining ustiga yozilmaydi va qaytarilgan qiymat qayta so'ralmaydi.

type Entry = { status: "loading" | "success" | "error"; data?: unknown; error?: unknown; fetching: boolean };

const cache = new Map<string, Entry>();
const listeners = new Map<string, Set<() => void>>();
const inflight = new Map<string, Promise<Entry>>();

/** Obyekt kalitlari tartiblangan JSON — `{a,b}` va `{b,a}` bir xil so'rov. */
export const hashKey = (key: unknown) =>
  JSON.stringify(key, (_, v) =>
    v && typeof v === "object" && !Array.isArray(v)
      ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, (v as Record<string, unknown>)[k]]))
      : v,
  );

const emit = (hash: string) => listeners.get(hash)?.forEach((l) => l());

function run(hash: string, fn: () => Promise<unknown>): Promise<Entry> {
  const running = inflight.get(hash);
  if (running) return running;
  const prev = cache.get(hash);
  cache.set(hash, { status: prev?.status === "success" ? "success" : "loading", data: prev?.data, fetching: true });
  emit(hash);
  const p = fn()
    .then(
      (data): Entry => ({ status: "success", data, fetching: false }),
      (error): Entry => ({ status: "error", error, fetching: false }),
    )
    .then((entry) => {
      cache.set(hash, entry);
      inflight.delete(hash);
      emit(hash);
      return entry;
    });
  inflight.set(hash, p);
  return p;
}

/** Komponentdan tashqarida (masalan, kategoriya zanjirini yechishda) — o'sha kesh orqali. */
export async function fetchQuery<T>(key: unknown, fn: () => Promise<T>): Promise<T> {
  const hash = hashKey(key);
  const hit = cache.get(hash);
  if (hit?.status === "success" && !hit.fetching) return hit.data as T;
  const entry = await run(hash, fn);
  if (entry.status === "error") throw entry.error;
  return entry.data as T;
}

interface UseQueryProps<T> {
  key: unknown;
  fn: () => Promise<T>;
  enabled?: boolean;
  /** Yangi javob kelguncha oldingisi ko'rinib turadi — panel bo'shab, sahifa sakramaydi. */
  keepPrevious?: boolean;
  /** Shu komponent boshlagan so'rov tugaganda (keshdan o'qilganda chaqirilmaydi — React Query v4 kabi). */
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
}

const NOOP = () => () => {};

export function useQuery<T>({ key, fn, enabled = true, keepPrevious = false, onSuccess, onError }: UseQueryProps<T>) {
  const hash = enabled ? hashKey(key) : null;
  const latest = useRef({ fn, onSuccess, onError, hash });
  useEffect(() => {
    latest.current = { fn, onSuccess, onError, hash };
  });

  const subscribe = useCallback(
    (cb: () => void) => {
      if (!hash) return () => {};
      const set = listeners.get(hash) ?? new Set();
      set.add(cb);
      listeners.set(hash, set);
      return () => set.delete(cb);
    },
    [hash],
  );
  const entry = useSyncExternalStore(
    hash ? subscribe : NOOP,
    () => (hash ? cache.get(hash) : undefined),
    () => undefined,
  );

  const start = useCallback(() => {
    if (!hash) return;
    run(hash, () => latest.current.fn()).then((done) => {
      // Kalit almashgan bo'lsa — bu javob endi boshqa so'rovniki, callback chaqirilmaydi.
      if (latest.current.hash !== hash) return;
      if (done.status === "success") latest.current.onSuccess?.(done.data as T);
      else latest.current.onError?.(done.error);
    });
  }, [hash]);

  useEffect(() => {
    if (!hash) return;
    const hit = cache.get(hash);
    // Xato bilan tugagani kalitga qaytilganda qayta so'raladi; muvaffaqiyatlisi — keshdan.
    if (!hit || (hit.status === "error" && !hit.fetching)) start();
  }, [hash, start]);

  const data = entry?.status === "success" ? (entry.data as T) : undefined;
  // "Oldingi render ma'lumotini saqlash" — React hujjatidagi andoza (effektsiz)
  const [prev, setPrev] = useState<T | undefined>(undefined);
  if (keepPrevious && data !== undefined && data !== prev) setPrev(data);

  return {
    data: data ?? (keepPrevious ? prev : undefined),
    error: entry?.status === "error" ? entry.error : null,
    isError: entry?.status === "error",
    /** So'rov yo'lda (yoki effekt hozir boshlaydi). */
    isFetching: !!hash && (!entry || entry.fetching),
    refetch: start,
  };
}

/** Qiymat `ms` davomida o'zgarmay tursa qaytaradi. Havola bir xil qolsa — natija ham o'sha obyekt. */
export function useDebounce<T>(value: T, ms: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return debounced;
}
