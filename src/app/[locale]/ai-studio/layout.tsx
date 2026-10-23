import type { Metadata } from "next";
import { getLocale } from "@/i18n/server";
import { pageMetadata, ROBOHUB_ORIGIN } from "@/lib/seo";
import { messages } from "./ai-studio.i18n";
import "./ai-studio.css";

// Bir xil sahifa ikki manzilda: o'z domeni (ai-studio.vercel.app) va robohub.uz/ai-studio (robohub/ai-studio/layout.tsx
// shuni qayta eksport qiladi). Ikkalasida ham canonical — robohub.uz/ai-studio: Google uni dublikat deb ikkiga bo'lmaydi.
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = messages[locale];
  return pageMetadata({
    origin: ROBOHUB_ORIGIN,
    locale,
    path: "/ai-studio",
    title: t.metaTitle,
    description: t.metaDescription,
    siteName: "RoboHub AI Studio",
    image: "/og/ai-studio-{locale}.jpg",
  });
}

export default function AiStudioLayout({ children }: LayoutProps<"/[locale]/ai-studio">) {
  return children;
}
