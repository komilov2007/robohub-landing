import type { Metadata } from "next";
import { getLocale } from "@/i18n/server";
import { messages } from "./robosell.i18n";
import "./robosell.css";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = messages[locale];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    openGraph: {
      type: "website",
      siteName: "Robosell",
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

export default function RobosellLayout({
  children,
}: LayoutProps<"/[locale]/robosell">) {
  return children;
}
