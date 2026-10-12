"use client";

import { useEffect } from "react";
import { init } from "./scroll-reveal.script";

let started = false;

export default function ScrollReveal() {
  useEffect(() => {
    if (started) return;
    started = true;
    init();
  }, []);
  return null;
}
