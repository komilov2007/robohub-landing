"use client";

import { useEffect } from "react";
import type { ScriptMessages } from "./bepul-vositalar.i18n";

// Asl skript sahifada bir marta ishlashga mo'ljallangan: StrictMode (dev) effektni ikki marta
// chaqirganda hodisalar ikki marta ulanib qolmasligi uchun bayroq.
let started = false;

// t — joriy tildagi pul birligi va son formati (server komponentdan keladi)
export default function BepulVositalarScript({ t }: { t: ScriptMessages }) {
  useEffect(() => {
    if (started) return;
    started = true;
    // skript alohida chunk: birinchi ekran JS iga kirmaydi, gidratatsiyadan keyin yuklanadi
    import("./bepul-vositalar.script").then((m) => m.init(t));
  }, [t]);
  return null;
}
