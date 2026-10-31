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
      "Uzum Market, Wildberries, Ozon va Yandex Marketni bitta kabinetdan boshqaring: buyurtma, kartochka, narx va qoldiqlar. 1 000+ sotuvchi tanladi — bugun boshlang.",
  },
  ru: {
    title: "Все маркетплейсы в одном кабинете: Uzum, WB, Ozon | Robohub",
    description:
      "Управляйте Uzum Market, Wildberries, Ozon и Yandex Market из одного кабинета: заказы, карточки, цены и остатки. Нас выбрали 1 000+ продавцов — начните сегодня.",
  },
  en: {
    title: "Manage Uzum, Wildberries and Ozon in one dashboard | Robohub",
    description:
      "Run Uzum Market, Wildberries, Ozon and Yandex Market from one dashboard: orders, product cards, prices and stock. Trusted by 1,000+ sellers — start today.",
  },
  kk: {
    title: "Uzum, Wildberries, Ozon бір кабинетте басқару | Robohub",
    description:
      "Uzum Market, Wildberries, Ozon және Yandex Market-ті бір кабинеттен басқарыңыз: тапсырыс, карточка, баға және қалдық. 1 000+ сатушы таңдады — бүгін бастаңыз.",
  },
  ky: {
    title: "Uzum, Wildberries, Ozon бир кабинеттен башкаруу | Robohub",
    description:
      "Uzum Market, Wildberries, Ozon жана Yandex Marketти бир кабинеттен башкарыңыз: буйрутма, карточка, баа жана калдык. 1 000+ сатуучу тандады — бүгүн баштаңыз.",
  },
  kaa: {
    title: "Uzum, Wildberries, Ozon bir kabinetten basqarıw | Robohub",
    description:
      "Uzum Market, Wildberries, Ozon hám Yandex Marketti bir kabinetten basqarıń: buyırtpa, kartochka, baha hám qaldıqlar. 1 000+ satıwshı tańladı — búgin baslań.",
  },
  tg: {
    title: "Uzum, Wildberries, Ozon аз як кабинет идора кунед | Robohub",
    description:
      "Uzum Market, Wildberries, Ozon ва Yandex Market-ро аз як кабинет идора кунед: фармоиш, корт, нарх ва бақия. 1 000+ фурӯшанда интихоб кард — имрӯз оғоз кунед.",
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
