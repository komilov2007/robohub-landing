import type { Metadata } from "next";
import { getMessages } from "@/i18n/server";
import { messages } from "./robosell.i18n";
import "./robosell.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getMessages(messages);
  return { title: t.metaTitle, description: t.metaDescription };
}

export default function RobosellLayout({ children }: LayoutProps<"/[locale]/robosell">) {
  return children;
}
