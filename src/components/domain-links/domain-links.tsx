"use client";

import { useEffect } from "react";
import { hasLocale, parseProdHost, prefixedHref, SECTIONS, type Tld } from "@/i18n/config";

// Saytlar orasidagi havolalar joriy mamlakat domenida qolsin. Sahifalar statik — HTML'da har tilning rasmiy domeni turadi
// (qozoqcha — academy.robohub.kz …). Foydalanuvchi esa istalgan domenda istalgan tilni ochishi mumkin (robohub.uz/kk),
// shuning uchun brauzerda havolalar shu domenga moslanadi:
//   robohub.uz/kk'da: https://academy.robohub.kz/kk → https://academy.robohub.uz/kk;
//   robohub.kz/uz'da: https://aistudio.robohub.uz → https://aistudio.robohub.kz/uz (.kz/.kg da o'zbekcha prefiks bilan).
// Til menyusi (hreflang'li havolalar) va sotuvchi platformasi sahifalari (robohub.uz/policy, /register …) tegilmaydi.
// Faqat rasmiy domenlarda ishlaydi; lokal va Vercel'da hech narsa qilmaydi.
const isLanding = (path: string) => {
  const [, a = ""] = path.split("/");
  return !a || hasLocale(a) || (SECTIONS as readonly string[]).includes(a);
};
// Yo'lda til yozilganmi: "/ru/order", "/calculator/kk" — ha; "/", "/order", "/calculator" — yo'q (o'zbekcha)
const hasLang = (path: string) => {
  const [, a = "", b = ""] = path.split("/");
  return hasLocale(a) || ((SECTIONS as readonly string[]).includes(a) && hasLocale(b));
};

function fix(root: ParentNode, tld: Tld) {
  root.querySelectorAll<HTMLAnchorElement>('a[href*="robohub."]:not([hreflang])').forEach((a) => {
    let url: URL;
    try {
      url = new URL(a.href);
    } catch {
      return;
    }
    const to = parseProdHost(url.host);
    if (!to || (to.zone === "main" && !isLanding(url.pathname))) return;
    const path = tld !== "uz" && !hasLang(url.pathname) ? prefixedHref("uz", url.pathname) : url.pathname;
    const host = `${to.zone === "main" ? "" : `${to.zone}.`}robohub.${tld}`;
    if (host === url.host && path === url.pathname) return;
    a.href = `https://${host}${path}${url.search}${url.hash}`;
  });
}

export default function DomainLinks() {
  useEffect(() => {
    const tld = parseProdHost(window.location.host)?.tld;
    if (!tld) return;
    fix(document, tld);
    // Keyin chiziladigan havolalar (menyular, sahifalar orasida o'tish) ham
    const observer = new MutationObserver((list) => {
      for (const m of list) m.addedNodes.forEach((n) => n instanceof Element && fix(n.parentNode ?? n, tld));
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  return null;
}
