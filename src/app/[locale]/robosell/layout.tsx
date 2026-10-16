import type { Metadata } from "next";
import "./robosell.css";

export const metadata: Metadata = {
  title: "Robosell — tez orada",
  description: "Robosell — tez orada.",
};

export default function RobosellLayout({ children }: LayoutProps<"/robosell">) {
  return children;
}
