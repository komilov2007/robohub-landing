import { getLocale, getMessages } from "@/i18n/server";
import { sellerUrl } from "@/lib/sites";
import { messages } from "../header/header.i18n";
import MobileCtaClient from "./mobile-cta-client";

// Telefondagi pastki panel — matnlari header'dagi tugmalar bilan bir xil ("Kirish", "Ariza qoldirish")
export default async function MobileCta() {
  const t = await getMessages(messages);
  // "Kirish" — sotuvchi kabineti (joriy tilda)
  return <MobileCtaClient t={{ login: t.login, start: t.start }} loginHref={sellerUrl(await getLocale(), "")} />;
}
