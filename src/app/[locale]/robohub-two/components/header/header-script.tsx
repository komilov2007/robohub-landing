"use client";

import { useEffect } from "react";
import { init } from "./header.script";

// Asl skript sahifada bir marta ishlashga mo'ljallangan: StrictMode (dev) effektni ikki marta
// chaqirganda hodisalar ikki marta ulanib qolmasligi uchun bayroq.
let started = false;

export default function HeaderScript() {
  useEffect(() => {
    if (started) return;
    started = true;
    init();
  }, []);
  return null;
}
