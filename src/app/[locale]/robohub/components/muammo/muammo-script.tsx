"use client";

import { useEffect } from "react";

// Asl skript sahifada bir marta ishlashga mo'ljallangan: StrictMode (dev) effektni ikki marta
// chaqirganda hodisalar ikki marta ulanib qolmasligi uchun bayroq.
let started = false;

export default function MuammoScript() {
  useEffect(() => {
    if (started) return;
    started = true;
    // skript alohida chunk: birinchi ekran JS iga kirmaydi, gidratatsiyadan keyin yuklanadi
    import("./muammo.script").then((m) => m.init());
  }, []);
  return null;
}
