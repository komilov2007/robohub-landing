import type { Metadata } from "next";
import { defineMessages } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Fx from "./components/fx/fx";
import { AcademyLocale } from "./components/locale/locale";
import "./academy.css";
import "./motion.css";

// Robohub Academy — Robohub saytining /academy sahifasi (robohub.uz/academy, robohub-landing.vercel.app/academy).
// Kodi landing bilan aralashmaydi: hamma narsa shu papkada, uslublar .ac ildiziga bog'langan (landing uslublari — (landing) guruhida).
// Ko'rinish Robohub landingiga mos: umumiy tokenlar, shriftlar (Unbounded + Manrope) va .btn — globals.css dan.
// Uch tilda: /academy (uz), /ru/academy, /en/academy. Videolar o'zbekcha — hamma tilda bitta.
const messages = defineMessages({
  uz: {
    title: "Robohub Academy — marketpleys sotuvchilari uchun video darslar",
    description:
      "Robohub’ni qisqa darslarda o‘rganing: analitika, buyurtmalar, mahsulotlar, ombor, marketing, integratsiya, muloqot va boshqaruv. Har mavzuda matn, sxema va video.",
    ogLocale: "uz_UZ",
    skip: "Asosiy kontentga o‘tish",
  },
  ru: {
    title: "Robohub Academy — видеоуроки для продавцов на маркетплейсах",
    description:
      "Изучите Robohub в коротких уроках: аналитика, заказы, товары, склад, маркетинг, интеграции, коммуникации и управление. В каждой теме — текст, схема и видео.",
    ogLocale: "ru_RU",
    skip: "Перейти к основному содержанию",
  },
  en: {
    title: "Robohub Academy — video lessons for marketplace sellers",
    description:
      "Learn Robohub in short lessons: analytics, orders, products, warehouse, marketing, integrations, communication and management. Every topic comes with text, diagrams and video.",
    ogLocale: "en_US",
    skip: "Skip to main content",
  },
});

export async function generateMetadata(): Promise<Metadata> {
  const t = messages[await getLocale()];
  return {
    // canonical va og:image uchun to'liq manzil (robohub.uz/academy/...)
    metadataBase: new URL("https://robohub.uz"),
    title: { default: t.title, template: "%s — Robohub Academy" },
    description: t.description,
    openGraph: { type: "website", siteName: "Robohub Academy", locale: t.ogLocale },
  };
}

export default async function AcademyLayout({ children }: LayoutProps<"/[locale]/robohub/academy">) {
  const locale = await getLocale();
  return (
    <div className="ac">
      <AcademyLocale locale={locale}>
        <a className="ac-skip" href="#ac-main">
          {messages[locale].skip}
        </a>
        <Header />
        <main id="ac-main">{children}</main>
        <Footer />
        <Fx />
      </AcademyLocale>
    </div>
  );
}
