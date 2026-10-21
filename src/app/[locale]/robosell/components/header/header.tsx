import { getLocale } from "@/i18n/server";
import HeaderClient from "./header-client";

// Server qismi: joriy tilni oladi (til tanlagich uchun), qolgani — header-client.tsx.
export default async function Header() {
  const locale = await getLocale();
  return <HeaderClient locale={locale} />;
}
