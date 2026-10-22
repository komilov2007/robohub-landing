import type { Metadata } from "next";
import { getLocale } from "@/i18n/server";
import { messages } from "./calculator.i18n";
// Shrift, rang, tugma, header/footer, FAQ va kirish animatsiyalari — AI Studio dizayn tizimidan (.as);
// kalkulyatorning o'z bo'limlari va vositaning o'zi — calculator.css (.cc-*).
import "../../ai-studio/ai-studio.css";
import "./calculator.css";
import "./sections.css";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = messages[locale];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    keywords: t.keywords,
    alternates: {
      canonical: locale === "uz" ? "/calculator" : `/${locale}/calculator`,
      languages: { uz: "/calculator", ru: "/ru/calculator", en: "/en/calculator" },
    },
    openGraph: {
      type: "website",
      siteName: "RoboHub",
      title: t.metaTitle,
      description: t.metaDescription,
      locale: { uz: "uz_UZ", ru: "ru_RU", en: "en_US" }[locale],
    },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDescription },
  };
}

export default function CalculatorLayout({ children }: LayoutProps<"/[locale]/robohub/calculator">) {
  return children;
}
