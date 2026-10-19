"use client";

import { useEffect } from "react";
import { idle } from "@/lib/idle";
import type { messages } from "./features.i18n";

type T = (typeof messages)["uz"]["script"];

// Sahna mantig'ini komponent o'rnatilganda ishga tushiradi va olib tashlanganda tozalaydi.
// init() tozalash funksiyasini qaytaradi — shuning uchun StrictMode (dev) effektni ikki marta
// chaqirsa ham, fayl qayta yuklansa ham sahna bir nusxada, to'g'ri quriladi.
// t — joriy tildagi karta va tugma matnlari (server ota komponentdan keladi).
export default function FeaturesScript({ t }: { t: T }) {
  // Skript (~25 KB) alohida chunk: birinchi ekran JS iga kirmaydi, brauzer bo'sh qolganda (LCP dan keyin) yuklanadi.
  // Yuklanguncha effekt tozalansa, sahna umuman qurilmaydi.
  useEffect(() => {
    let alive = true;
    let cleanup: (() => void) | undefined;
    idle().then(() => import("./features.script")).then((m) => {
      if (alive) cleanup = m.init(t);
    });
    return () => {
      alive = false;
      cleanup?.();
    };
  }, [t]);
  return null;
}
