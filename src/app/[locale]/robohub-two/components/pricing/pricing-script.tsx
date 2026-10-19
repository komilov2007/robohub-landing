"use client";

import { useEffect } from "react";
import { idle } from "@/lib/idle";
import type { messages } from "./pricing.i18n";

type M = (typeof messages)["uz"];
// Skriptga kerakli matnlar va son formati (joriy tilda) — pricing.tsx dan prop orqali keladi
export type PricingScriptText = M["script"] & { terms: M["terms"] };

// Asl skript sahifada bir marta ishlashga mo'ljallangan: StrictMode (dev) effektni ikki marta
// chaqirganda hodisalar ikki marta ulanib qolmasligi uchun bayroq.
let started = false;

export default function PricingScript({ t }: { t: PricingScriptText }) {
  useEffect(() => {
    if (started) return;
    started = true;
    // skript alohida chunk: birinchi ekran JS iga kirmaydi, brauzer bo'sh qolganda (LCP dan keyin) yuklanadi
    idle().then(() => import("./pricing.script")).then((m) => m.init(t));
  }, [t]);
  return null;
}
