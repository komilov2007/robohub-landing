import type { Metadata } from "next";
import { getLocale } from "@/i18n/server";
import { messages } from "./ai-studio.i18n";
import "./ai-studio.css";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = messages[locale];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    openGraph: {
      type: "website",
      siteName: "RoboHub AI Studio",
      title: t.metaTitle,
      description: t.metaDescription,
      locale: { uz: "uz_UZ", ru: "ru_RU", en: "en_US" }[locale],
    },
    twitter: {
      card: "summary_large_image",
      title: t.metaTitle,
      description: t.metaDescription,
    },
  };
}

export default function AiStudioLayout({ children }: LayoutProps<"/[locale]/ai-studio">) {
  return children;
}
