import type { Metadata } from "next";
import type { ReactNode } from "react";
import { defineMessages } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { pageMetadata, ROBOHUB_ORIGIN } from "@/lib/seo";
import { fontClass } from "../fonts";
import "../robohub.css";

export const messages = defineMessages({
  uz: {
    title: "Robohub — Uzum, Wildberries, Ozon va Yandex Market bitta kabinetda",
    description:
      "Uzum Market, Wildberries, Ozon va Yandex Market doʻkonlaringizni bitta kabinetdan boshqaring: buyurtmalar, kartochkalar, narxlar va analitika.",
  },
  ru: {
    title: "Robohub — Uzum, Wildberries, Ozon и Яндекс Маркет в одном кабинете",
    description:
      "Управляйте магазинами на Uzum Market, Wildberries, Ozon и Yandex Market из одного кабинета: заказы, карточки товаров, цены и аналитика.",
  },
  en: {
    title: "Robohub — Uzum, Wildberries, Ozon and Yandex Market in one dashboard",
    description:
      "Run your Uzum Market, Wildberries, Ozon and Yandex Market stores from one dashboard: orders, product cards, prices and analytics.",
  },
  kk: {
    title: "Robohub — Uzum, Wildberries, Ozon және Yandex Market бір кабинетте",
    description:
      "Uzum Market, Wildberries, Ozon және Yandex Market дүкендеріңізді бір кабинеттен басқарыңыз: тапсырыстар, тауар карточкалары, бағалар және аналитика.",
  },
  ky: {
    title: "Robohub — Uzum, Wildberries, Ozon жана Yandex Market бир кабинетте",
    description:
      "Uzum Market, Wildberries, Ozon жана Yandex Market дүкөндөрүңүздү бир кабинеттен башкарыңыз: буйрутмалар, товар карточкалары, баалар жана аналитика.",
  },
  kaa: {
    title: "Robohub — Uzum, Wildberries, Ozon hám Yandex Market bir kabinette",
    description:
      "Uzum Market, Wildberries, Ozon hám Yandex Market dúkanlarıńızdı bir kabinetten basqarıń: buyırtpalar, ónim kartochkaları, bahalar hám analitika.",
  },
  tg: {
    title: "Robohub — Uzum, Wildberries, Ozon ва Yandex Market дар як кабинет",
    description:
      "Мағозаҳои худро дар Uzum Market, Wildberries, Ozon ва Yandex Market аз як кабинет идора кунед: фармоишҳо, кортҳои мол, нархҳо ва таҳлил.",
  },
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = messages[locale];
  return pageMetadata({ origin: ROBOHUB_ORIGIN, locale, path: "/", ...t, siteName: "Robohub", image: "/og/robohub-{locale}.jpg" });
}

// Robohub landingi (bosh sahifa): uslublar va metadata faqat shu guruhga — /academy ularni olmaydi.
// Shriftlar — AI Studio bilan bir xil (Space Grotesk + Inter, robohub/fonts.ts): root layout'ga emas, faqat shu o'ramga
// ulanadi, Academy esa Unbounded + Manrope'da qoladi. display:contents — joylashuvga ta'sir qilmaydi
// (o'zgaruvchilar va font-family baribir ichkariga meros bo'lib o'tadi).
export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className={fontClass} style={{ display: "contents" }}>
      {children}
    </div>
  );
}
