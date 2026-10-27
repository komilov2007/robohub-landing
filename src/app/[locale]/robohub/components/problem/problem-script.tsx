"use client";

import { useEffect } from "react";
import { init } from "./problem.script";

// Video va matn almashish mantig'ini komponent o'rnatilganda ishga tushiradi va olib tashlanganda tozalaydi.
export default function ProblemScript() {
  useEffect(() => init(), []);
  return null;
}
