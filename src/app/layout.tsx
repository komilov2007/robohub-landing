import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Robohub — 4 marketpleys. 1 kabinet.",
  description:
    "Uzum Market, Wildberries, Ozon va Yandex Market doʻkonlaringizni bitta kabinetdan boshqaring: buyurtmalar, kartochkalar, narxlar va analitika.",
};

export const viewport: Viewport = {
  themeColor: "#00524F",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: pastdagi skript <html> ga "js" klassini React'dan oldin qo'shadi
    <html lang="uz" suppressHydrationWarning>
      <head>
        {/* Shriftlar HTML versiyasidagidek Google Fonts'dan ulanadi (next/font emas — ko'rinish o'zgarmasligi uchun) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&family=Manrope:wght@400;500;600;700&family=Unbounded:wght@500;700&display=swap"
          rel="stylesheet"
        />
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
