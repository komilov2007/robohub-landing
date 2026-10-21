"use client";

import type { CSSProperties } from "react";
import { useWatched } from "../../lib/progress";
import { useAcademyLocale } from "../locale/locale";
import { messages } from "./topic-progress.i18n";

// Mavzu kartochkasidagi progress (localStorage'dan): "40% ko'rildi" yoki hali boshlanmagan bo'lsa — "Boshlash".
export default function TopicProgress({ lessons }: { lessons: number[] }) {
  const t = messages[useAcademyLocale()];
  const watched = useWatched();
  const done = lessons.filter((n) => watched.has(n)).length;
  const pct = lessons.length ? Math.round((done / lessons.length) * 100) : 0;
  return (
    <span className="acx-tcard__progress">
      <span className="acx-meter" style={{ "--p": pct / 100 } as CSSProperties}>
        <i />
      </span>
      <span className={`acx-tcard__pct${pct > 0 ? " is-started" : ""}`}>
        {pct === 100 ? t.done : pct > 0 ? t.pct(pct) : t.start}
      </span>
    </span>
  );
}
