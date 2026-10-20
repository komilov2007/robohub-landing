import type { MetadataRoute } from "next";
import { requestOrigin } from "@/lib/site-host";

// /robots.txt — qidiruv robotlariga qoidalar: hamma sahifa ochiq, sitemap manzili — shu domendagi /sitemap.xml.
export default async function robots(): Promise<MetadataRoute.Robots> {
  const base = await requestOrigin();
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
