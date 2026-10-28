import type { Metadata } from "next";
import { defineMessages } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
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
    title: "Robohub Academy — marketpleys sotuvchilari uchun video darslar",
    description:
      "Robohub’ni qisqa darslarda o‘rganing: analitika, buyurtmalar, mahsulotlar, ombor, marketing va integratsiya. Har mavzuda matn, sxema va video.",
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
      "Learn Robohub in short lessons: analytics, orders, products, warehouse, marketing and integrations. Every topic has text, diagrams and video.",
    ogLocale: "en_US",
    skip: "Skip to main content",
  },
  kk: {
    title: "Robohub Academy — маркетплейс сатушыларына арналған бейнесабақтар",
    description:
      "Robohub-ты қысқа сабақтармен меңгеріңіз: аналитика, тапсырыстар, тауарлар, қойма, маркетинг және интеграциялар. Әр тақырыпта мәтін, сызба және бейне бар.",
    ogLocale: "kk_KZ",
    skip: "Негізгі мазмұнға өту",
  },
  ky: {
    title: "Robohub Academy — маркетплейс сатуучулары үчүн видеосабактар",
    description:
      "Robohub-ту кыска сабактар аркылуу өздөштүрүңүз: аналитика, буйрутмалар, товарлар, кампа, маркетинг жана интеграциялар. Ар бир темада текст, схема жана видео бар.",
    ogLocale: "ky_KG",
    skip: "Негизги мазмунга өтүү",
  },
  kaa: {
    title: "Robohub Academy — marketpleys satıwshıları ushın video sabaqlar",
    description:
      "Robohub’tı qısqa sabaqlarda úyreniń: analitika, buyırtpalar, ónimler, sklad, marketing hám integraciyalar. Hár bir temada tekst, sxema hám video bar.",
    ogLocale: "kaa_UZ",
    skip: "Tiykarǵı mazmunǵa ótiw",
  },
  tg: {
    title: "Robohub Academy — видеодарсҳо барои фурӯшандагони маркетплейсҳо",
    description:
      "Robohub-ро дар дарсҳои кӯтоҳ омӯзед: аналитика, фармоишҳо, маҳсулот, анбор, маркетинг ва интегратсияҳо. Дар ҳар мавзӯъ матн, нақша ва видео ҳаст.",
    ogLocale: "tg_TJ",
    skip: "Гузариш ба мундариҷаи асосӣ",
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
    <div className={`ac ${inter.variable} ${grotesk.variable}`}>
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
