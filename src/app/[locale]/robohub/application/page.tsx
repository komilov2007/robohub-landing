import { redirect } from "next/navigation";
import { localeHref } from "@/i18n/config";
import { getLocale } from "@/i18n/server";

// /application → birinchi qadam
export default async function ApplicationIndex() {
  redirect(localeHref(await getLocale(), "/application/step-1"));
}
