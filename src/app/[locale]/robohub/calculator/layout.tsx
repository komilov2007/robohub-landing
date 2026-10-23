import type { Metadata } from "next";
import { getLocale } from "@/i18n/server";
import { pageMetadata, ROBOHUB_ORIGIN } from "@/lib/seo";
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
    ...pageMetadata({
      origin: ROBOHUB_ORIGIN,
      locale,
      path: "/calculator",
      title: t.metaTitle,
      description: t.metaDescription,
      siteName: "RoboHub",
      image: "/og/calculator-{locale}.jpg",
    }),
    keywords: t.keywords,
  };
}

export default function CalculatorLayout({ children }: LayoutProps<"/[locale]/robohub/calculator">) {
  return children;
}
