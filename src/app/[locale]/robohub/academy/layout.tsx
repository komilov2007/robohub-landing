import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "@/i18n/server";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Fx from "./components/fx/fx";
import "./academy.css";
import "./motion.css";

// Robohub Academy — Robohub saytining /academy sahifasi (robohub.uz/academy, robohub-landing.vercel.app/academy).
// Kodi landing bilan aralashmaydi: hamma narsa shu papkada, uslublar .ac ildiziga bog'langan (landing uslublari — (landing) guruhida).
// Ko'rinish Robohub landingiga mos: umumiy tokenlar, shriftlar (Unbounded + Manrope) va .btn — globals.css dan.
// Kontent faqat o'zbekcha — /ru/academy va /en/academy proxy'da /academy ga yo'naltiriladi.
export const metadata: Metadata = {
  // canonical va og:image uchun to'liq manzil (robohub.uz/academy/...)
  metadataBase: new URL("https://robohub.uz"),
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

export default async function AcademyLayout({ children }: LayoutProps<"/[locale]/robohub/academy">) {
  if ((await getLocale()) !== "uz") notFound();
  return (
    <div className="ac">
      <a className="ac-skip" href="#ac-main">
        Asosiy kontentga o‘tish
      </a>
      <Header />
      <main id="ac-main">{children}</main>
      <Footer />
      <Fx />
    </div>
  );
}
