import type { Metadata } from "next";
import "./robohub.css";

export const metadata: Metadata = {
  title: "Robohub — 4 marketpleys. 1 kabinet.",
  description:
    "Uzum Market, Wildberries, Ozon va Yandex Market doʻkonlaringizni bitta kabinetdan boshqaring: buyurtmalar, kartochkalar, narxlar va analitika.",
};

export default function RobohubLayout({ children }: LayoutProps<"/robohub">) {
  return children;
}
