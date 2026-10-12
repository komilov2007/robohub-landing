"use client";

import { useEffect } from "react";
import { init } from "./imkoniyatlar.script";

// Sahna mantig'ini komponent o'rnatilganda ishga tushiradi va olib tashlanganda tozalaydi.
// init() tozalash funksiyasini qaytaradi — shuning uchun StrictMode (dev) effektni ikki marta
// chaqirsa ham, fayl qayta yuklansa ham sahna bir nusxada, to'g'ri quriladi.
export default function ImkoniyatlarScript() {
  useEffect(() => init(), []);
  return null;
}
