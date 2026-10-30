import { siteFromHost } from "@/lib/site-host";
import { llmsShort, textResponse } from "@/lib/llms";

// /llms.txt — AI yordamchilar uchun sayt haqida qisqa xarita (inglizcha; /ru/llms.txt va /uz/llms.txt — o'sha tillarda).
// Matn — src/lib/llms.ts. Faqat Robohub domenida; boshqa saytlarda — 404.
export async function GET() {
  const { headers } = await import("next/headers");
  const h = await headers();
  if (siteFromHost(h.get("x-forwarded-host") ?? h.get("host") ?? "") !== "robohub") return new Response("Not found", { status: 404 });
  return textResponse(llmsShort("en"));
}
