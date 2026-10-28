// Boshqa tillardagi matnlar bitta joyda (uz — academy.ts va lesson-notes.ts da)
import type { Locale } from "@/i18n/config";
import type { AcademyContent } from "./types";
import { lessons as ruLessons, notes as ruNotes } from "./ru-lessons";
import { topics as ruTopics, startPath as ruStartPath } from "./ru-topics";
import { lessons as enLessons, notes as enNotes } from "./en-lessons";
import { topics as enTopics, startPath as enStartPath } from "./en-topics";
import { lessons as kkLessons, notes as kkNotes } from "./kk-lessons";
import { topics as kkTopics, startPath as kkStartPath } from "./kk-topics";
import { lessons as kyLessons, notes as kyNotes } from "./ky-lessons";
import { topics as kyTopics, startPath as kyStartPath } from "./ky-topics";
import { lessons as kaaLessons, notes as kaaNotes } from "./kaa-lessons";
import { topics as kaaTopics, startPath as kaaStartPath } from "./kaa-topics";
import { lessons as tgLessons, notes as tgNotes } from "./tg-lessons";
import { topics as tgTopics, startPath as tgStartPath } from "./tg-topics";

export const CONTENT: Record<Exclude<Locale, "uz">, AcademyContent> = {
  ru: { lessons: ruLessons, notes: ruNotes, topics: ruTopics, startPath: ruStartPath },
  en: { lessons: enLessons, notes: enNotes, topics: enTopics, startPath: enStartPath },
  kk: { lessons: kkLessons, notes: kkNotes, topics: kkTopics, startPath: kkStartPath },
  ky: { lessons: kyLessons, notes: kyNotes, topics: kyTopics, startPath: kyStartPath },
  kaa: { lessons: kaaLessons, notes: kaaNotes, topics: kaaTopics, startPath: kaaStartPath },
  tg: { lessons: tgLessons, notes: tgNotes, topics: tgTopics, startPath: tgStartPath },
};
