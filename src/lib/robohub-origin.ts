"use client";

import { useEffect, useSyncExternalStore } from "react";
import { hostZone, locales, parseProdHost, SECTIONS, TLD_LOCALE, zoneOrigin } from "@/i18n/config";

// Robohub bosh sayti qaysi domenda — sahifa ochilgan domenga qarab (brauzerda). Statik sahifada so'rov sarlavhalari yo'q,
// shuning uchun HTML'da rasmiy domenlar (robohub.uz, academy.robohub.uz …) turadi, brauzer esa joriy muhitga moslaydi:
//   rasmiy domen (robohub.kz, academy.robohub.uz, aistudio.robohub.kg …) — o'sha mamlakatning robohub.{uz,kz,kg};
//   lokal subdomen: ai-studio.localhost:PORT, academy.localhost:PORT → localhost:PORT;
//   ai-studio….vercel.app → robohub-landing.vercel.app; qolgan hammasi (robohub-landing.vercel.app, localhost) — o'zi.
export const ROBOHUB_PROD = "https://robohub.uz";
const ROBOHUB_VERCEL = "https://robohub-landing.vercel.app";

export function robohubOrigin(loc: Location): string {
  const host = loc.host.toLowerCase();
  const prod = parseProdHost(host);
  if (prod) return zoneOrigin("main", TLD_LOCALE[prod.tld]);
  if (hostZone(host) === "main") return loc.origin;
  if (host.includes("localhost")) return `${loc.protocol}//${host.replace(/^[^.]+\./, "")}`;
  if (host.endsWith(".vercel.app")) return ROBOHUB_VERCEL;
  return ROBOHUB_PROD;
}

const noop = () => () => {};
/** Client komponentlar uchun: server render va birinchi chizishda — robohub.uz, keyin joriy muhitdagi manzil */
export function useRobohubOrigin(): string {
  return useSyncExternalStore(noop, () => robohubOrigin(window.location), () => ROBOHUB_PROD);
}

// Bosh saytdagi landing sahifalari: /, /ru, /calculator/kk … (tilli yoki tilsiz). Boshqa robohub.uz manzillari
// (ai-infografika, register, policy — sotuvchi platformasi) tegilmaydi.
const LANG = `(/(${locales.join("|")}))?`;
const LANDING_PATH = new RegExp(`^(${LANG}/?|/(${SECTIONS.join("|")})${LANG}(/.*)?/?)$`);

/**
 * Rasmiy domenlarga havolalarni (robohub.uz, academy.robohub.kz, aistudio.robohub.uz …) lokal/preview muhitdagi
 * nusxasiga almashtiradi: localhost'da — localhost, academy.localhost, ai-studio.localhost; Vercel'da — bosh sayt.
 */
export function useFixRobohubLinks() {
  useEffect(() => {
    if (parseProdHost(window.location.host)) return;
    const main = robohubOrigin(window.location);
    const local = window.location.hostname.endsWith("localhost") ? new URL(main) : null;
    document.querySelectorAll<HTMLAnchorElement>('a[href*="robohub."]').forEach((a) => {
      const url = new URL(a.href);
      const prod = parseProdHost(url.host);
      if (!prod) return;
      let origin: string | null = null;
      if (prod.zone === "main") origin = LANDING_PATH.test(url.pathname) ? main : null;
      else if (local) origin = `${local.protocol}//${prod.zone === "academy" ? "academy" : "ai-studio"}.${local.host}`;
      if (origin) a.href = origin + url.pathname + url.search + url.hash;
    });
  }, []);
}
