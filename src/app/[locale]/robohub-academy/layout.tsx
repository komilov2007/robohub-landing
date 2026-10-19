import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { preconnect } from "react-dom";
import { getLocale } from "@/i18n/server";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { onest } from "./fonts";
import "./academy.css";

// Robohub Academy — alohida sayt (robohub-academy.vercel.app, proxy: src/proxy.ts).
// Kodi Robohub va Robosell bilan aralashmaydi: hamma narsa shu papkada, uslublar .ac ildiziga bog'langan.
// Dizayn konsepsiyasi — "Kabinet ichidan sayohat" (academy.css boshida). Brend: teal #00524F, sariq marker #FFD500,
// qog'oz fon #FFFDF4; sarlavhalar — Unbounded (umumiy), matn — Onest (fonts.ts).
// Kontent faqat o'zbekcha — /ru va /en 404.
export const metadata: Metadata = {
  title: {
    default: "Robohub Academy — marketpleys sotuvchilari uchun video darslar",
    template: "%s — Robohub Academy",
  },
  description:
    "Robohub’ni qisqa darslarda o‘rganing: analitika, buyurtmalar, mahsulotlar, ombor, marketing, integratsiya, muloqot va boshqaruv. Har mavzuda matn, sxema va video.",
  openGraph: {
    type: "website",
    siteName: "Robohub Academy",
    locale: "uz_UZ",
  },
};

export default async function AcademyLayout({ children }: LayoutProps<"/[locale]/robohub-academy">) {
  if ((await getLocale()) !== "uz") notFound();
  // Muqovalar (hero pleyeri — LCP, video devori) i.ytimg.com dan: ulanish oldindan ochiladi.
  // youtube-nocookie (iframe) uchun preconnect esa faqat birinchi hover/focus'da (lib/youtube.ts).
  preconnect("https://i.ytimg.com");
  return (
    <div className={`ac ${onest.variable}`}>
      <a className="ac-skip" href="#ac-main">
        Asosiy kontentga o‘tish
      </a>
      <Header />
      <main id="ac-main">{children}</main>
      <Footer />
    </div>
  );
}
