"use client";

import { useEffect } from "react";
import { init } from "./trust.script";

// Sonlarni sanash mantig'ini komponent o'rnatilganda ishga tushiradi va olib tashlanganda tozalaydi.
// Bo'lim hero'dan keyin darhol keladi — idle kutilmaydi, aks holda son ko'rinib turib keyin noldan boshlanib qoladi.
export default function TrustScript() {
  useEffect(() => init(), []);
  return null;
}
