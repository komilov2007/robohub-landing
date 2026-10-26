import type { Metadata } from "next";
import Application from "@/components/application/application";
import { messages } from "@/components/application/application.i18n";
import { RobohubLogo } from "@/components/robohub-404/logo";
import { getLocale } from "@/i18n/server";
import { pageMetadata, ROBOHUB_ORIGIN } from "@/lib/seo";

// Ariza formasi: robohub.uz/application/step-{1…6} (ru/en: /ru/application/…). Forma layout'da — qadamlar
// ([step]/page.tsx) orasida o'tganda javoblar va holat saqlanadi. Robosell'da xuddi shu forma: robosell/application.
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = messages[locale];
  return pageMetadata({
    origin: ROBOHUB_ORIGIN,
    locale,
    path: "/application/step-1",
    title: `${t.metaTitle} — Robohub`,
    description: t.metaDescription,
    siteName: "Robohub",
    image: "/og/robohub-{locale}.jpg",
  });
}

export default async function ApplicationLayout({ children }: LayoutProps<"/[locale]/robohub/application">) {
  const locale = await getLocale();
  return (
    <>
      <Application site="robohub" locale={locale} t={messages[locale]} logo={<RobohubLogo />} />
      {children}
    </>
  );
}
