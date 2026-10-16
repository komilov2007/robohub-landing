"use client";

import { useEffect } from "react";
import { init } from "./imkoniyatlar.script";
import type { messages } from "./imkoniyatlar.i18n";

type T = (typeof messages)["uz"]["script"];

// Sahna mantig'ini komponent o'rnatilganda ishga tushiradi va olib tashlanganda tozalaydi.
// init() tozalash funksiyasini qaytaradi — shuning uchun StrictMode (dev) effektni ikki marta
// chaqirsa ham, fayl qayta yuklansa ham sahna bir nusxada, to'g'ri quriladi.
// t — joriy tildagi karta va tugma matnlari (server ota komponentdan keladi).
export default function ImkoniyatlarScript({ t }: { t: T }) {
  useEffect(() => init(t), [t]);
  return null;
}
