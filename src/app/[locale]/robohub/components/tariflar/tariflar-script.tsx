"use client";

import { useEffect } from "react";
import { init } from "./tariflar.script";
import type { messages } from "./tariflar.i18n";

type M = (typeof messages)["uz"];
// Skriptga kerakli matnlar va son formati (joriy tilda) — tariflar.tsx dan prop orqali keladi
export type TariflarScriptText = M["script"] & { terms: M["terms"] };

// Asl skript sahifada bir marta ishlashga mo'ljallangan: StrictMode (dev) effektni ikki marta
// chaqirganda hodisalar ikki marta ulanib qolmasligi uchun bayroq.
let started = false;

export default function TariflarScript({ t }: { t: TariflarScriptText }) {
  useEffect(() => {
    if (started) return;
    started = true;
    init(t);
  }, [t]);
  return null;
}
