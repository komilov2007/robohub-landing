// Domendan qaysi sayt ekanini aniqlash — proxy.ts (rewrite) va sitemap/robots uchun umumiy.
//   robosell… → robosell;  ai-studio… → ai-studio (ai-studio.vercel.app; lokalda ai-studio.localhost;
//   Robohub domenida esa /ai-studio sahifasi — app/[locale]/robohub/ai-studio);
//   qolgan hammasi (robohub.uz, robohub-landing…, localhost) → robohub. Eski robohub-two va robohub-academy
//   domenlari ham robohub'ga tushadi (robohub-academy… bosh sahifasi /academy ga yo'naltiriladi — proxy.ts).
export type Site = "robohub" | "robosell" | "ai-studio";

export function siteFromHost(host: string): Site {
  const h = host.toLowerCase();
  if (h.startsWith("ai-studio")) return "ai-studio";
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
