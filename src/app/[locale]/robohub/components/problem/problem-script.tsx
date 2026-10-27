"use client";

import { useEffect } from "react";
import { init } from "./problem.script";

// Sahna mantig'ini komponent o'rnatilganda ishga tushiradi va olib tashlanganda tozalaydi.
// init() tozalash funksiyasini qaytaradi — StrictMode (dev) effektni ikki marta chaqirsa ham sahna bir nusxada.
// Skript kichik va bo'lim hero'dan keyin darhol keladi — idle kutilmaydi, aks holda tez skrollda sahna kech qotadi.
export default function ProblemScript() {
  useEffect(() => init(), []);
  return null;
}
