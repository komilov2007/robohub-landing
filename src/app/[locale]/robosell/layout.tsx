import type { Metadata } from "next";
import { getLocale } from "@/i18n/server";
import { pageMetadata, ROBOSELL_ORIGIN } from "@/lib/seo";
import { messages } from "./robosell.i18n";
import "./robosell.css";

// Sahifa matni hozircha faqat o'zbekcha (robosell.content.ts) — /ru va /en o'zbekcha nusxaga canonical bo'ladi
// va hreflang'da ko'rsatilmaydi. Tarjima qo'shilganda translated'ga "ru", "en" yoziladi.
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = messages[locale];
  return pageMetadata({
    origin: ROBOSELL_ORIGIN,
    locale,
    path: "/",
    title: t.metaTitle,
    description: t.metaDescription,
    siteName: "Robosell",
    image: "/og/robosell-uz.jpg",
    translated: ["uz"],
  });
}

export default function RobosellLayout({
  children,
}: LayoutProps<"/[locale]/robosell">) {
  return children;
}
