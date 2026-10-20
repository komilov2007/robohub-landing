import type { Metadata } from "next";
import type { ReactNode } from "react";
import { defineMessages } from "@/i18n/config";
import { getMessages } from "@/i18n/server";
import "../robohub.css";

const messages = defineMessages({
  uz: {
    title: "Robohub — 4 marketpleys. 1 kabinet.",
    description:
      "Uzum Market, Wildberries, Ozon va Yandex Market doʻkonlaringizni bitta kabinetdan boshqaring: buyurtmalar, kartochkalar, narxlar va analitika.",
  },
  ru: {
    title: "Robohub — 4 маркетплейса. 1 кабинет.",
    description:
      "Управляйте магазинами на Uzum Market, Wildberries, Ozon и Yandex Market из одного кабинета: заказы, карточки товаров, цены и аналитика.",
  },
  en: {
    title: "Robohub — 4 marketplaces. 1 dashboard.",
    description:
      "Run your Uzum Market, Wildberries, Ozon and Yandex Market stores from one dashboard: orders, product cards, prices and analytics.",
  },
});

export async function generateMetadata(): Promise<Metadata> {
  return getMessages(messages);
}

// Robohub landingi (bosh sahifa): uslublar va metadata faqat shu guruhga — /academy ularni olmaydi.
export default function LandingLayout({ children }: { children: ReactNode }) {
  return children;
}
