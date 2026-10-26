import type { Metadata } from "next";
import Application from "@/components/application/application";
import { messages } from "@/components/application/robosell.i18n";
import { getLocale } from "@/i18n/server";
import { pageMetadata, ROBOSELL_ORIGIN } from "@/lib/seo";
import Logo from "../components/logo/logo";
import { onest } from "../fonts";

// Ariza formasi: robosell domenida /application/step-{1…9} — o'z savollari (steps.ts → ROBOSELL_STEPS, robosell.i18n.ts),
// komponent va dizayn Robohub'niki bilan bitta (components/application); logo va shrift (Onest) Robosell'niki.
// Forma layout'da — qadamlar orasida holat saqlanadi.
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = messages[locale];
  return pageMetadata({
    origin: ROBOSELL_ORIGIN,
    locale,
    path: "/application/step-1",
    title: `${t.metaTitle} — Robosell`,
    description: t.metaDescription,
    siteName: "Robosell",
    image: "/og/robosell-uz.jpg",
  });
}

export default async function ApplicationLayout({ children }: LayoutProps<"/[locale]/robosell/application">) {
  const locale = await getLocale();
  return (
    <div className={onest.variable} style={{ display: "contents" }}>
      <Application site="robosell" locale={locale} t={messages[locale]} logo={<Logo />} />
      {children}
    </div>
  );
}
