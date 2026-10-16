"use client";

import { useEffect } from "react";
import { idle } from "@/lib/idle";
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
    // skript alohida chunk: birinchi ekran JS iga kirmaydi, brauzer bo'sh qolganda (LCP dan keyin) yuklanadi
    idle().then(() => import("./tariflar.script")).then((m) => m.init(t));
  }, [t]);
  return null;
}
