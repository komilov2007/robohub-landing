"use client";

import { useEffect } from "react";
import { idle } from "@/lib/idle";
import type { messages } from "./contact.i18n";

// Xat (mailto) matni joriy tilda — contact.tsx dan prop orqali keladi
type MailText = (typeof messages)["uz"]["mail"];

// Asl skript sahifada bir marta ishlashga mo'ljallangan: StrictMode (dev) effektni ikki marta
// chaqirganda hodisalar ikki marta ulanib qolmasligi uchun bayroq.
let started = false;

export default function ContactScript({ t }: { t: MailText }) {
  useEffect(() => {
    if (started) return;
    started = true;
    // skript alohida chunk: birinchi ekran JS iga kirmaydi, brauzer bo'sh qolganda (LCP dan keyin) yuklanadi
    idle().then(() => import("./contact.script")).then((m) => m.init(t));
  }, [t]);
  return null;
}
