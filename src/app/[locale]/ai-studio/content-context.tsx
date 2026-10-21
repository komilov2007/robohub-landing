"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Content } from "./ai-studio.content";

// Client komponentlar uchun: page.tsx joriy tildagi kontentni shu yerga beradi — const { HERO } = useC();
// (client komponentlar getLocale() ni chaqira olmaydi, shuning uchun kontent kontekst orqali keladi)
const Ctx = createContext<Content | null>(null);

export function ContentProvider({ value, children }: { value: Content; children: ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useC(): Content {
  const c = useContext(Ctx);
  if (!c) throw new Error("useC() ContentProvider ichida ishlatilishi kerak");
  return c;
}
