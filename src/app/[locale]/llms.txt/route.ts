import { siteFromHost } from "@/lib/site-host";
import { LLMS_LANGS, llmsShort, textResponse, type LlmsLang } from "@/lib/llms";

// /ru/llms.txt, /uz/llms.txt (/en/llms.txt — /llms.txt bilan bir xil) — llms.txt shu tilda. Matn — src/lib/llms.ts.
// Nuqtali yo'l bo'lgani uchun proxy (src/proxy.ts) bu so'rovga tegmaydi: /uz/llms.txt ham to'g'ridan-to'g'ri shu yerga keladi.
export async function GET(_req: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { headers } = await import("next/headers");
  const h = await headers();
  const robohub = siteFromHost(h.get("x-forwarded-host") ?? h.get("host") ?? "") === "robohub";
  if (!robohub || !(LLMS_LANGS as string[]).includes(locale)) return new Response("Not found", { status: 404 });
  return textResponse(llmsShort(locale as LlmsLang));
}
