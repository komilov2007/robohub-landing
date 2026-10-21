import { getLocale } from "@/i18n/server";
import { buildContent } from "./ai-studio.content";

// Server komponentlar uchun: joriy tildagi kontent — const { HERO } = await getC();
// path — studio-page.tsx dan (o'z domenida "/", Robohub domenida "/ai-studio")
export async function getC(path?: string) {
  return buildContent(await getLocale(), path);
}
