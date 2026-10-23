import type { Viewport } from "next";
import { locales } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { manrope, unbounded } from "../fonts";
import "../globals.css";

// Ikkala sayt uchun umumiy qobiq. Manzil proxy'da quriladi (src/proxy.ts):
//   til — yo'lning boshidan (/ru, /en; prefikssiz — uz), sayt — domendan.
//   robohub.uz/ru → /ru/robohub, robosell.uz → /uz/robosell. Metadata har saytning o'z layout'ida.
export const viewport: Viewport = {
  themeColor: "#00524F",
};

// Har til oldindan statik yig'iladi (cacheComponents bilan root parametr uchun majburiy).
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children }: LayoutProps<"/[locale]">) {
  const lang = await getLocale();
  return (
    // suppressHydrationWarning: pastdagi skript <html> ga "js" klassini React'dan oldin qo'shadi
    <html lang={lang} className={`${unbounded.variable} ${manrope.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* ".js" klassi: JS ishlayotganini bildiradi (globals.css dagi ".js ..." qoidalari shunga tayanadi).
            Birinchi chizishdan oldin qo'shilishi kerak, shuning uchun inline skript. */}
        <script
          dangerouslySetInnerHTML={{
            __html: 'document.documentElement.classList.add("js");',
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
