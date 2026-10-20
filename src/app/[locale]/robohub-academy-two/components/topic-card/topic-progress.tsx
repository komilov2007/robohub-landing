"use client";

import type { CSSProperties } from "react";
import { useWatched } from "../../lib/progress";

// Mavzu kartochkasidagi progress (localStorage'dan): "40% ko'rildi" yoki hali boshlanmagan bo'lsa — "Boshlash".
export default function TopicProgress({ lessons }: { lessons: number[] }) {
  const watched = useWatched();
  const done = lessons.filter((n) => watched.has(n)).length;
  const pct = lessons.length ? Math.round((done / lessons.length) * 100) : 0;
  return (
    <span className="acx-tcard__progress">
      <span className="acx-meter" style={{ "--p": pct / 100 } as CSSProperties}>
        <i />
      </span>
      <span className={`acx-tcard__pct${pct > 0 ? " is-started" : ""}`}>
        {pct === 100 ? "Tugatildi" : pct > 0 ? `${pct}% ko‘rildi` : "Boshlash"}
      </span>
    </span>
  );
}
