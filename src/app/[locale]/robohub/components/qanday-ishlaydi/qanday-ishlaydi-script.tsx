"use client";

import { useEffect } from "react";
import { init } from "./qanday-ishlaydi.script";

// Asl skript sahifada bir marta ishlashga mo'ljallangan: StrictMode (dev) effektni ikki marta
// chaqirganda hodisalar ikki marta ulanib qolmasligi uchun bayroq.
let started = false;

export default function QandayIshlaydiScript() {
  useEffect(() => {
    if (started) return;
    started = true;
    init();
  }, []);
  return null;
}
