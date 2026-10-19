"use client";

import Link from "next/link";
import { LESSONS_SORTED, TOTAL_LESSONS, getLesson, getTopic } from "../../lib/academy";
import { useLastLesson, useWatched } from "../../lib/progress";
import { PlayGlyph } from "../svg-icon/svg-icon";

// Bosh sahifa hero'sidagi ixcham havola: oxirgi ko'rilgan dars ("Davom ettiring") yoki 1-dars.
// localStorage gidratatsiyadan keyin o'qiladi — server HTML'ida "Shu yerdan boshlang".
export default function ContinueChip() {
  const last = useLastLesson();
  const watched = useWatched();
  const lastLesson = last ? getLesson(last.n) : undefined;
  const lesson = lastLesson ?? LESSONS_SORTED[0];
  return (
    <Link href={`/${lesson.topic}?dars=${lesson.n}`} className="ac-continue-chip">
      <span className="ac-continue-chip__play" aria-hidden="true">
        <PlayGlyph size={12} />
      </span>
      <span className="ac-continue-chip__text">
        <small>
          {lastLesson ? `Davom ettiring · ${watched.size} / ${TOTAL_LESSONS} ko‘rildi` : "Shu yerdan boshlang"} ·{" "}
          {getTopic(lesson.topic)?.name}
        </small>
        <strong>{lesson.title}</strong>
      </span>
    </Link>
  );
}
