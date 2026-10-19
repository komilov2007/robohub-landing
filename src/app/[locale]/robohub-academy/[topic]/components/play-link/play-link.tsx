"use client";

import type { ReactNode } from "react";
import { usePlayer } from "../../../components/player/player-context";

// "Videoda · N-dars" havolasi: JS bo'lmasa oddiy ?dars=N#videos link,
// JS bilan — video bo'limiga scroll va shu dars darhol ijro bo'ladi.
export default function PlayLink({ n, className, children }: { n: number; className?: string; children: ReactNode }) {
  const { select } = usePlayer();
  return (
    <a
      href={`?dars=${n}#videos`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        select(n, { play: true, scroll: true });
      }}
    >
      {children}
    </a>
  );
}
