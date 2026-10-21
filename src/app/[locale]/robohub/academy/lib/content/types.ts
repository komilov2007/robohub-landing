// Tarjima fayllari turi: ru va en matnlari o'zbekcha ma'lumot bilan aynan bir xil ko'rinishda.
// Kalitlar — dars raqami (LessonN) va mavzu slug'i (TopicSlug): biror yozuv yetishmasa yoki ortiqcha bo'lsa — tsc xato.
// Matn bo'lmagan maydonlar (slug, youtubeId, sana, ikonka, dars raqamlari) bu yerda yo'q — ular academy.ts da yagona.
import type { Lesson, LessonN, StartTopic, Topic, TopicSlug } from "../academy";
import type { LessonNote } from "../lesson-notes";

export type LessonText = Pick<Lesson, "title" | "summary" | "points">;

// features — uz dagi tartibda (dars raqami uz ma'lumotidan olinadi)
export type TopicText = Omit<Topic, "slug" | "icon" | "mainLesson" | "related" | "features"> & {
  features: { title: string; text: string }[];
};

export type AcademyContent = {
  lessons: Record<LessonN, LessonText>;
  notes: Record<LessonN, LessonNote>;
  topics: Record<TopicSlug, TopicText>;
  startPath: Record<StartTopic, string>;
};
