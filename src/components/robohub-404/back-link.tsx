"use client";

import type { MouseEvent, ReactNode } from "react";

// "Orqaga" — oldingi sahifa shu saytdan bo'lsa brauzer tarixida bir qadam orqaga qaytadi,
// aks holda (havola tashqaridan yoki to'g'ridan-to'g'ri ochilgan) oddiy havola: bosh sahifaga. JS ishlamasa ham ishlaydi.
export default function BackLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    let sameSite = false;
    try {
      sameSite = new URL(document.referrer).origin === location.origin;
    } catch {}
    if (sameSite && history.length > 1) {
      e.preventDefault();
      history.back();
    }
  };
  return (
    <a className={className} href={href} onClick={onClick}>
      {children}
    </a>
  );
}
