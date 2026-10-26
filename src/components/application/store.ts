"use client";

import { useSyncExternalStore } from "react";
import type { Answers, OtherAnswers } from "./steps";

// Ariza holati — sessionStorage'da: qadamlar alohida URL bo'lgani uchun sahifa yangilansa yoki
// orqaga/oldinga bosilsa ham javoblar yo'qolmaydi; /application/send yangilansa ham tasdiq ko'rinib turadi (sent).
// Brauzer yorlig'i yopilganda o'chadi. Saqlash bloklangan bo'lsa (private rejim va h.k.) forma xotirada ishlayveradi.
// Serverda va gidratsiyada — bo'sh holat.
export type ApplicationState = { answers: Answers; other: OtherAnswers; sent: boolean };

const KEY = "rb-application";
const EMPTY: ApplicationState = { answers: {}, other: {}, sent: false };

let state: ApplicationState | null = null;
const listeners = new Set<() => void>();

function read(): ApplicationState {
  if (state) return state;
  try {
    const raw = sessionStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as Partial<ApplicationState>) : null;
    state = { answers: parsed?.answers ?? {}, other: parsed?.other ?? {}, sent: parsed?.sent === true };
  } catch {
    state = EMPTY;
  }
  return state;
}

function write(next: ApplicationState) {
  state = next;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useApplicationState(): ApplicationState {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

// Yangi javob — yangi ariza: oldingi yuborilgan belgisi tushadi
export const setAnswer = (id: keyof Answers, value: string | string[]) => {
  const s = read();
  write({ ...s, sent: false, answers: { ...s.answers, [id]: value } });
};

export const setOther = (id: keyof OtherAnswers, value: string) => {
  const s = read();
  write({ ...s, sent: false, other: { ...s.other, [id]: value } });
};

/** Yuborildi: javoblar tozalanadi, tasdiq sahifasi yangilansa ham saqlanadi */
export const markSent = () => write({ ...EMPTY, sent: true });

/** "Anketani qayta to'ldirish" — hammasi boshidan */
export const resetApplication = () => write(EMPTY);

const noop = () => () => {};
/** Gidratsiyadan keyin true — sessionStorage'dagi holat shundan keyin o'qiladi. */
export const useHydrated = () => useSyncExternalStore(noop, () => true, () => false);
