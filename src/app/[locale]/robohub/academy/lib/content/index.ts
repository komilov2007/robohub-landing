// ru va en matnlari bitta joyda (uz — academy.ts va lesson-notes.ts da)
import type { Locale } from "@/i18n/config";
import type { AcademyContent } from "./types";
import { lessons as ruLessons, notes as ruNotes } from "./ru-lessons";
import { topics as ruTopics, startPath as ruStartPath } from "./ru-topics";
import { lessons as enLessons, notes as enNotes } from "./en-lessons";
import { topics as enTopics, startPath as enStartPath } from "./en-topics";

export const CONTENT: Record<Exclude<Locale, "uz">, AcademyContent> = {
  ru: { lessons: ruLessons, notes: ruNotes, topics: ruTopics, startPath: ruStartPath },
  en: { lessons: enLessons, notes: enNotes, topics: enTopics, startPath: enStartPath },
};
