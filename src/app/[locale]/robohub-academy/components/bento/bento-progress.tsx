"use client";

import type { CSSProperties } from "react";
import { useWatched } from "../../lib/progress";

// Bento kartochkasidagi progress (localStorage'dan): "2 / 5 ko'rildi" + chiziq.
export default function BentoProgress({ lessons }: { lessons: number[] }) {
  const watched = useWatched();
  const done = lessons.filter((n) => watched.has(n)).length;
  return (
    <span className="ac-bento__progress">
      <span className="ac-bento__bar" style={{ "--p": lessons.length ? done / lessons.length : 0 } as CSSProperties}>
        <i />
      </span>
      <span>
        {done > 0 ? (
          <>
            <b>{done}</b> / {lessons.length} ko‘rildi
          </>
        ) : (
          `${lessons.length} dars`
        )}
      </span>
    </span>
  );
}
