"use client";

import { useEffect } from "react";
import { init } from "./aloqa.script";
import type { messages } from "./aloqa.i18n";

// Xat (mailto) matni joriy tilda — aloqa.tsx dan prop orqali keladi
type MailText = (typeof messages)["uz"]["mail"];

// Asl skript sahifada bir marta ishlashga mo'ljallangan: StrictMode (dev) effektni ikki marta
// chaqirganda hodisalar ikki marta ulanib qolmasligi uchun bayroq.
let started = false;

export default function AloqaScript({ t }: { t: MailText }) {
  useEffect(() => {
    if (started) return;
    started = true;
    init(t);
  }, [t]);
  return null;
}
