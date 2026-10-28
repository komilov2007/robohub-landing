"use client";

import { useEffect } from "react";
import { idle } from "@/lib/idle";
import type { messages } from "./contact.i18n";

// Quiz savollari va xat (mailto) mavzusi joriy tilda — contact.tsx dan prop orqali keladi
type QuizText = (typeof messages)["uz"]["quiz"];

// Asl skript har forma uchun bir marta ishlashga mo'ljallangan: StrictMode (dev) effektni ikki marta
// chaqirganda hodisalar ikki marta ulanib qolmasligi uchun — ishga tushgan formalar (id) ro'yxati.
const started = new Set<string>();

// id — forma id'larining prefiksi: "contact" (bo'lim) yoki "cmodal" (header'dagi modal oyna)
export default function ContactScript({ t, id }: { t: QuizText; id: string }) {
  useEffect(() => {
    if (started.has(id)) return;
    started.add(id);
    // skript alohida chunk: birinchi ekran JS iga kirmaydi, brauzer bo'sh qolganda (LCP dan keyin) yuklanadi
    idle().then(() => import("./contact.script")).then((m) => m.init(t, id));
  }, [t, id]);
  return null;
}
