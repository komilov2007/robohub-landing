import type { Metadata } from "next";
import type { ReactNode } from "react";
import { defineMessages } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { pageMetadata, ROBOHUB_ORIGIN } from "@/lib/seo";
import { fontClass } from "../fonts";
import "../robohub.css";

export const messages = defineMessages({
  uz: {
    title: "Uzum, Wildberries, Ozon bitta kabinetda boshqarish | Robohub",
    description:
      "Uzum Market, Wildberries, Ozon va Yandex Market doʻkonlaringizni bitta kabinetdan boshqaring: buyurtmalar, kartochkalar, narxlar va analitika.",
  },
  ru: {
    title: "Все маркетплейсы в одном кабинете: Uzum, WB, Ozon | Robohub",
    description:
      "Управляйте магазинами на Uzum Market, Wildberries, Ozon и Yandex Market из одного кабинета: заказы, карточки товаров, цены, остатки и аналитика.",
  },
  en: {
    title: "Manage Uzum, Wildberries and Ozon in one dashboard | Robohub",
    description:
      "Run your Uzum Market, Wildberries, Ozon and Yandex Market stores from one dashboard: orders, product cards, prices, stock and analytics in one place.",
  },
  kk: {
    title: "Uzum, Wildberries, Ozon бір кабинетте басқару | Robohub",
    description:
      "Uzum Market, Wildberries, Ozon және Yandex Market дүкендеріңізді бір кабинеттен басқарыңыз: тапсырыстар, тауар карточкалары, бағалар және аналитика.",
  },
  ky: {
    title: "Uzum, Wildberries, Ozon бир кабинеттен башкаруу | Robohub",
    description:
      "Uzum Market, Wildberries, Ozon жана Yandex Market дүкөндөрүңүздү бир кабинеттен башкарыңыз: буйрутмалар, товар карточкалары, баалар жана аналитика.",
  },
  kaa: {
    title: "Uzum, Wildberries, Ozon bir kabinetten basqarıw | Robohub",
    description:
      "Uzum Market, Wildberries, Ozon hám Yandex Market dúkanlarıńızdı bir kabinetten basqarıń: buyırtpalar, ónim kartochkaları, bahalar hám analitika.",
  },
  tg: {
    title: "Uzum, Wildberries, Ozon аз як кабинет идора кунед | Robohub",
    description:
      "Мағозаҳои худро дар Uzum Market, Wildberries, Ozon ва Yandex Market аз як кабинет идора кунед: фармоишҳо, кортҳои мол, нархҳо, бақияи мол ва таҳлил.",
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
