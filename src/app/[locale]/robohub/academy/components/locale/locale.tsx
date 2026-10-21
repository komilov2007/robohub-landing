"use client";

import { createContext, useContext, type ReactNode } from "react";
import { defaultLocale, type Locale } from "@/i18n/config";

// Academy joriy tili — client komponentlar uchun (ular getLocale() ni chaqira olmaydi).
// layout.tsx serverda tilni aniqlab, shu provider orqali uzatadi; client komponentlar
// o'z *.i18n.ts tarjimalaridan va academy.ts dan shu til bo'yicha o'qiydi.
const LocaleContext = createContext<Locale>(defaultLocale);

export function AcademyLocale({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useAcademyLocale(): Locale {
  return useContext(LocaleContext);
}
