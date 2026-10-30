import { siteFromHost } from "@/lib/site-host";
import { llmsFull, textResponse } from "@/lib/llms";

// /llms-full.txt — AI yordamchilar uchun to'liq faktlar (inglizcha): tarif, mamlakatlar bo'yicha marketpleyslar,
// integratsiyalar, FAQ, Academy darslari. Matn — src/lib/llms.ts. Faqat Robohub domenida; boshqa saytlarda — 404.
export async function GET() {
  const { headers } = await import("next/headers");
  const h = await headers();
  if (siteFromHost(h.get("x-forwarded-host") ?? h.get("host") ?? "") !== "robohub") return new Response("Not found", { status: 404 });
  return textResponse(llmsFull());
}
