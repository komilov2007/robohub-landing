import type { CompetitorMarketplace } from "./types";

// Raqobatchi havolalari — rb-market competitor-links.ts bilan bir xil qoidalar (server ham shularni qo'llaydi).

/** Serverning chegarasi: 6+ havola 400 qaytaradi. */
export const MAX_COMPETITOR_LINKS = 5;

export interface CompetitorLink {
  id: string;
  /** Uzum varianti (skuId) — havolaning bir qismi: bir mahsulotning ikki SKU'si — ikki narx. */
  skuId: string | null;
  /** Aynan qo'yilganidek — `unavailable_links` shu satr bilan solishtiriladi. */
  url: string;
}

interface LinkParser {
  host: RegExp;
  read: (url: URL) => Pick<CompetitorLink, "id" | "skuId"> | null;
  placeholder: string;
}

const PARSERS: Record<CompetitorMarketplace, LinkParser> = {
  uzum_market: {
    host: /(^|\.)uzum\.uz$/i,
    read: (url) => {
      const match = url.pathname.match(/\/product\/(?:[^/?#]*?-)?(\d+)(?:\/|$)/);
      return match ? { id: match[1], skuId: url.searchParams.get("skuId") } : null;
    },
    placeholder: "https://uzum.uz/uz/product/sport-shimlari-1813892",
  },
  yandex_market: {
    host: /^(?:[\w-]+\.)?market\.yandex\.(?:uz|ru|kz|by|com)$/i,
    read: (url) => {
      const card = url.pathname.match(/\/card\/[^/]+\/(\d+)(?:\/|$)/);
      if (card) return { id: card[1], skuId: null };
      const sku = url.searchParams.get("sku");
      return sku && /^\d+$/.test(sku) ? { id: sku, skuId: null } : null;
    },
    placeholder: "https://market.yandex.uz/card/bryuki/103272660875",
  },
  wb: {
    host: /^(?:[\w-]+\.)?(?:wildberries\.(?:ru|uz|kz|by|am|kg|ge)|wb\.ru)$/i,
    read: (url) => {
      const match = url.pathname.match(/\/catalog\/(\d+)(?:\/|$)/);
      return match ? { id: match[1], skuId: null } : null;
    },
    placeholder: "https://www.wildberries.ru/catalog/315007255/detail.aspx",
  },
};

export const competitorLinkKey = (link: Pick<CompetitorLink, "id" | "skuId">) => `${link.id}:${link.skuId ?? ""}`;

export const competitorLinkPlaceholder = (marketplace: CompetitorMarketplace) => PARSERS[marketplace].placeholder;

export const parseCompetitorLink = (marketplace: CompetitorMarketplace, raw: string): CompetitorLink | null => {
  const text = raw.trim();
  if (!text) return null;
  try {
    const url = new URL(/^https?:\/\//i.test(text) ? text : `https://${text}`);
    const parser = PARSERS[marketplace];
    if (!parser.host.test(url.hostname)) return null;
    const read = parser.read(url);
    return read ? { ...read, url: text } : null;
  } catch {
    return null;
  }
};

/** Bitta qo'yishda bir nechta havola — bo'sh joy, vergul, nuqtali vergul bilan ajratiladi. */
export const parseCompetitorLinks = (marketplace: CompetitorMarketplace, raw: string) => {
  const links: CompetitorLink[] = [];
  const invalid: string[] = [];
  raw
    .split(/[\s,;]+/)
    .filter(Boolean)
    .forEach((piece) => {
      const link = parseCompetitorLink(marketplace, piece);
      if (link) links.push(link);
      else invalid.push(piece);
    });
  return { links, invalid };
};

/** Mahsulot bo'yicha takrorlanmas qo'shish; nima tashlanganini aytadi. */
export const mergeCompetitorLinks = (current: CompetitorLink[], incoming: CompetitorLink[]) => {
  const links = [...current];
  const duplicates: string[] = [];
  let overflow = 0;
  incoming.forEach((link) => {
    if (links.some((existing) => competitorLinkKey(existing) === competitorLinkKey(link))) {
      duplicates.push(link.id);
      return;
    }
    if (links.length >= MAX_COMPETITOR_LINKS) {
      overflow += 1;
      return;
    }
    links.push(link);
  });
  return { links, duplicates, overflow };
};

/** Bozor o'rtasidan ±10% — "bozor narxi"; ikkala chet — ogohlantirish. */
export type CompetitorZone = "cheap" | "market" | "pricey";
export const competitorZone = (price: number, median: number): CompetitorZone => {
  const deviation = median > 0 ? price / median - 1 : 0;
  if (deviation < -0.1) return "cheap";
  if (deviation > 0.1) return "pricey";
  return "market";
};
