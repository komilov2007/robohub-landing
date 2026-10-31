import type { Metadata } from "next";
import { defineMessages } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { OG_LOCALE } from "@/lib/seo";
import AnnounceBar from "@/components/announce-bar/announce-bar";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Fx from "./components/fx/fx";
import { AcademyLocale } from "./components/locale/locale";
import { grotesk, inter } from "../../../fonts";
import "./academy.css";
import "./motion.css";

// Robohub Academy — Robohub saytining /academy sahifasi (robohub.uz/academy, robohub-landing.vercel.app/academy).
// Kodi landing bilan aralashmaydi: hamma narsa shu papkada, uslublar .ac ildiziga bog'langan (landing uslublari — (landing) guruhida).
// Ko'rinish Robohub landingiga mos: umumiy tokenlar, shriftlar (Space Grotesk + Inter — Robohub landingi, AI Studio va Kalkulyator bilan bir xil; academy.css .ac) va .btn — globals.css dan.
// Yetti tilda: /academy (uz), /ru/academy, /en/academy, /kk, /ky, /kaa, /tg. Videolar o'zbekcha — hamma tilda bitta.
export const messages = defineMessages({
  uz: {
    title: "Marketpleys sotuvchilariga video darslar | Robohub Academy",
    description:
      "Uzum, Wildberries va Ozon sotuvchilari uchun bepul video darslar: analitika, buyurtmalar, ombor, marketing va integratsiya. 30 dars — matn, sxema va video.",
    skip: "Asosiy kontentga o‘tish",
  },
  ru: {
    title: "Видеоуроки для продавцов маркетплейсов | Robohub Academy",
    description:
      "Бесплатные видеоуроки для продавцов Uzum, Wildberries и Ozon: аналитика, заказы, склад, маркетинг и интеграции. 30 уроков — текст, схема и видео.",
    skip: "Перейти к основному содержанию",
  },
  en: {
    title: "Video lessons for marketplace sellers | Robohub Academy",
    description:
      "Free video lessons for Uzum, Wildberries and Ozon sellers: analytics, orders, warehouse, marketing and integrations. 30 lessons with text, diagrams and video.",
    skip: "Skip to main content",
  },
  kk: {
    title: "Маркетплейс сатушыларына бейнесабақтар | Robohub Academy",
    description:
      "Uzum, Wildberries және Ozon сатушыларына тегін бейнесабақтар: аналитика, тапсырыстар, қойма, маркетинг, интеграциялар. 30 сабақ — мәтін, сызба, бейне.",
    skip: "Негізгі мазмұнға өту",
  },
  ky: {
    title: "Маркетплейс сатуучулары үчүн видеосабактар | Robohub Academy",
    description:
      "Uzum, Wildberries жана Ozon сатуучулары үчүн акысыз видеосабактар: аналитика, буйрутмалар, кампа, маркетинг. 30 сабак — текст, схема жана видео.",
    skip: "Негизги мазмунга өтүү",
  },
  kaa: {
    title: "Marketpleys satıwshılarına video sabaqlar | Robohub Academy",
    description:
      "Uzum, Wildberries hám Ozon satıwshıları ushın biypul video sabaqlar: analitika, buyırtpalar, sklad, marketing. 30 sabaq — tekst, sxema hám video.",
    skip: "Tiykarǵı mazmunǵa ótiw",
  },
  tg: {
    title: "Видеодарс барои фурӯшандагони маркетплейс | Robohub Academy",
    description:
      "Дарсҳои видеоии ройгон барои фурӯшандагони Uzum, Wildberries ва Ozon: аналитика, фармоишҳо, анбор, маркетинг. 30 дарс — матн, нақша ва видео.",
    skip: "Гузариш ба мундариҷаи асосӣ",
  },
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = messages[locale];
  return {
    // canonical va og:image uchun to'liq manzil (robohub.uz/academy/...)
    metadataBase: new URL("https://robohub.uz"),
    title: { default: t.title, template: "%s | Robohub Academy" },
    description: t.description,
    openGraph: { type: "website", siteName: "Robohub Academy", locale: OG_LOCALE[locale] },
  };
}

export default async function AcademyLayout({ children }: LayoutProps<"/[locale]/robohub/academy">) {
  const locale = await getLocale();
  return (
    <div className={`ac ${inter.variable} ${grotesk.variable}`}>
      <AcademyLocale locale={locale}>
        <a className="ac-skip" href="#ac-main">
          {messages[locale].skip}
        </a>
        {/* tepadagi polosa — "Batafsil" (Robohub landingi) */}
        <AnnounceBar locale={locale} />
        <Header />
        <main id="ac-main">{children}</main>
        <Footer />
        <Fx />
      </AcademyLocale>
    </div>
  );
}
