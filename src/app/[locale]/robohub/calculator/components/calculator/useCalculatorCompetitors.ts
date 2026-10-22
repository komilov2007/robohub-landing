"use client";

import { useMemo, useState } from "react";
import { hashKey, useQuery } from "./query";
import { MAX_COMPETITOR_LINKS, type CompetitorLink } from "./competitor-links";
import { getApiErrorCode, getApiErrorStatus, getRetryAfterSeconds, postPublicCalculatorCompare } from "./api";
import type {
  CalculatorMarketplace,
  CalculatorRequest,
  CompetitorMarketplace,
  CompetitorMode,
  CompetitorsRequest,
} from "./types";

// rb-market useCalculatorCompetitors.ts — raqobatchilar faqat tugma bosilganda so'raladi
// (marketpleys vitrinasi qidiriladi: 1–4 soniya va cheklangan). `committed` — har tabning oxirgi bosilgan tanasi,
// so'rov kaliti shu; jonli `request` faqat "bu javob oldingi raqamlar uchun" deyish uchun solishtiriladi.

/** Har tab nima taklif qila oladi, eng yaxshisi birinchi (u standart ham). */
const MODE_OPTIONS: Record<CompetitorMarketplace, CompetitorMode[]> = {
  uzum_market: ["search", "links"],
  yandex_market: ["search", "links"],
  wb: ["links"],
};

const NO_LINKS: CompetitorLink[] = [];

export const competitorModeOf = (request: CompetitorsRequest): CompetitorMode =>
  request.competitor_links ? "links" : "search";

export const canCompareCompetitors = (marketplace: CalculatorMarketplace): marketplace is CompetitorMarketplace =>
  marketplace !== "ozon";

export const useCalculatorCompetitors = ({
  payload,
  marketplace,
  productName,
  hasPrice,
  applyPrice,
}: {
  payload: CalculatorRequest | null;
  marketplace: CalculatorMarketplace;
  productName: string;
  hasPrice: boolean;
  applyPrice: (value: number, oldPrice?: number | null) => void;
}) => {
  const [modes, setModes] = useState<Partial<Record<CompetitorMarketplace, CompetitorMode>>>({});
  const [linksByMarketplace, setLinksByMarketplace] = useState<Partial<Record<CompetitorMarketplace, CompetitorLink[]>>>({});
  const [committed, setCommitted] = useState<Partial<Record<CalculatorMarketplace, CompetitorsRequest>>>({});

  const available = canCompareCompetitors(marketplace);
  const modeOptions = available ? MODE_OPTIONS[marketplace] : [];
  const mode: CompetitorMode = available ? (modes[marketplace] ?? MODE_OPTIONS[marketplace][0]) : "search";
  const links = (available ? linksByMarketplace[marketplace] : undefined) ?? NO_LINKS;

  const request = useMemo<CompetitorsRequest | null>(() => {
    if (!payload || !hasPrice || !canCompareCompetitors(marketplace)) return null;
    if (mode === "links" && !links.length) return null;
    const name = productName.trim();
    return {
      ...payload,
      marketplace,
      // Faqat tanlangan rejim ishlatadigan maydon yuboriladi.
      ...(mode === "search" && name ? { name } : {}),
      ...(mode === "links" ? { competitor_links: links.map((link) => link.url) } : {}),
    };
  }, [payload, hasPrice, marketplace, mode, productName, links]);

  const compared = committed[marketplace] ?? null;

  const query = useQuery({
    enabled: !!compared,
    key: ["calculator-competitors", marketplace, compared],
    fn: () => postPublicCalculatorCompare(compared as CompetitorsRequest),
  });

  const answer = query.data?.suggestions ?? null;
  const competitors = answer?.competitors ?? null;
  const status = query.isError ? getApiErrorStatus(query.error) : 0;

  /** Tugma nega bosilmaydi — duch keladigan tartibda; bosilsa null. */
  const blocked = ((): string | null => {
    if (!available) return "calculator_competitors_ozon";
    if (!hasPrice) return "calculator_competitors_need_price";
    if (!payload) return "calculator_notice_step_product";
    if (mode === "links" && !links.length) return "calculator_competitors_need_links";
    return null;
  })();

  const suggestedPrice = answer?.price ?? null;

  return {
    request,
    compared,
    blocked,
    compare: () => {
      if (request) setCommitted((prev) => ({ ...prev, [marketplace]: request }));
    },
    retry: () => query.refetch(),
    reset: () => {
      setModes({});
      setLinksByMarketplace({});
      setCommitted({});
    },
    loading: query.isFetching,
    /** 200 + `competitors: null` — marketpleys qidiruvni rad etgan; sotuvchi uchun bu ham "javob yo'q". */
    failed: query.isError || (!!query.data && competitors === null),
    throttled: status === 429 ? (getRetryAfterSeconds(query.error) ?? 60) : null,
    data: competitors,
    /** Hamma raqam so'rov ketgan narxdan o'lchanadi, maydondagidan emas. */
    comparedPrice: compared?.price ?? null,
    comparedName: compared?.name ?? "",
    suggestedPrice,
    applySuggestedPrice: () => {
      if (suggestedPrice) applyPrice(suggestedPrice.value, suggestedPrice.old_price);
    },
    stale: !!request && !!compared && hashKey([request]) !== hashKey([compared]),
    staleBlocked: !!compared && request === null,
    links,
    setLinks: (next: CompetitorLink[]) => {
      if (available) setLinksByMarketplace((prev) => ({ ...prev, [marketplace]: next }));
    },
    maxLinks: MAX_COMPETITOR_LINKS,
    available,
    marketplace: canCompareCompetitors(marketplace) ? marketplace : null,
    mode,
    setMode: (next: CompetitorMode) => {
      if (available) setModes((prev) => ({ ...prev, [marketplace]: next }));
    },
    modeOptions,
    comparedMode: compared ? competitorModeOf(compared) : null,
    errorCode: query.isError ? getApiErrorCode(query.error) : 0,
    unavailableLinks: competitors?.unavailable_links ?? [],
  };
};

export type CalculatorCompetitorsState = ReturnType<typeof useCalculatorCompetitors>;
