// Domendan qaysi sayt ekanini aniqlash — proxy.ts (rewrite) va sitemap/robots uchun umumiy.
//   robohub-landing-two / robohub-two… → robohub-two;  robohub-academy-two… → robohub (eski academy-two domeni);
//   robohub-academy… → robohub-academy;  robosell… → robosell;  ai-studio… → ai-studio (ai-studio.vercel.app; lokalda ai-studio.localhost;
//   Robohub domenida esa /ai-studio sahifasi — app/[locale]/robohub/ai-studio);
//   qolgan hammasi (robohub.uz, robohub-landing…, localhost) → robohub.
export type Site = "robohub" | "robohub-two" | "robosell" | "robohub-academy" | "ai-studio";

export function siteFromHost(host: string): Site {
  const h = host.toLowerCase();
  if (h.startsWith("ai-studio")) return "ai-studio";
  if (h.startsWith("robohub-landing-two") || h.startsWith("robohub-two")) return "robohub-two";
  if (h.startsWith("robohub-academy-two")) return "robohub";
  if (h.startsWith("robohub-academy")) return "robohub-academy";
  return h.startsWith("robosell") ? "robosell" : "robohub";
}

// So'rov kelgan domenning to'liq manzili (https://robohub.uz) — sitemap/robots uchun. Lokal tarmoqda — http.
export async function requestOrigin(): Promise<string> {
  const { headers } = await import("next/headers");
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "robohub.uz";
  const local = /^(localhost|127.|192.168.|10.|26.)/.test(host) || host.includes(".localhost");
  const proto = h.get("x-forwarded-proto") ?? (local ? "http" : "https");
  return `${proto}://${host}`;
}
