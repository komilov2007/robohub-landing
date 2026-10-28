"use client";

import { useEffect, useSyncExternalStore } from "react";
import { locales } from "@/i18n/config";

// Robohub landingi qaysi domenda — sahifa ochilgan domenga qarab (brauzerda). Statik sahifada so'rov sarlavhalari yo'q,
// shuning uchun HTML'da asosiy domen (robohub.uz) turadi, brauzer esa joriy muhitga moslaydi:
//   Robohub domenlari (robohub.uz, robohub-landing.vercel.app, localhost:3000, …) — o'sha domenning o'zi;
//   AI Studio o'z domenida: ai-studio.localhost:PORT → localhost:PORT, ai-studio….vercel.app → robohub-landing.vercel.app,
//   boshqasi (haqiqiy domen) → robohub.uz.
export const ROBOHUB_PROD = "https://robohub.uz";
const ROBOHUB_VERCEL = "https://robohub-landing.vercel.app";

export function robohubOrigin(loc: Location): string {
  const host = loc.host.toLowerCase();
  if (!host.startsWith("ai-studio")) return loc.origin;
  if (host.includes("localhost")) return `${loc.protocol}//${host.replace(/^ai-studio\./, "")}`;
  if (host.endsWith(".vercel.app")) return ROBOHUB_VERCEL;
  return ROBOHUB_PROD;
}

const noop = () => () => {};
/** Client komponentlar uchun: server render va birinchi chizishda — robohub.uz, keyin joriy muhitdagi manzil */
export function useRobohubOrigin(): string {
  return useSyncExternalStore(noop, () => robohubOrigin(window.location), () => ROBOHUB_PROD);
}

// Landing sahifalari: /, /ru, /academy/…, /kk/calculator, /ai-studio … (tilli yoki tilsiz). Boshqa robohub.uz manzillari
// (ai-infografika, register, policy — sotuvchi platformasi) tegilmaydi.
const LANDING_PATH = new RegExp(`^(/(${locales.join("|")}))?(/(academy|calculator|ai-studio)(/.*)?)?/?$`);

/** Server komponentlardagi robohub.uz havolalarini (footer, Academy kartalari …) joriy muhit domeniga almashtiradi */
export function useFixRobohubLinks() {
  useEffect(() => {
    const origin = robohubOrigin(window.location);
    if (origin === ROBOHUB_PROD) return;
    document.querySelectorAll<HTMLAnchorElement>(`a[href^="${ROBOHUB_PROD}/"]`).forEach((a) => {
      const url = new URL(a.href);
      if (LANDING_PATH.test(url.pathname)) a.href = origin + url.pathname + url.search + url.hash;
    });
  }, []);
}
