import type { NextConfig } from "next";

// "Bitta domen" rejimi (i18n/config.ts: SINGLE_DOMAIN): Vercel loyihasining asosiy manzili *.vercel.app bo'lsa
// (robohub-landing.vercel.app) — havolalar shu domenda: /academy, /ai-studio, /calculator. Vercel bu o'zgaruvchini
// build paytida o'zi beradi; robohub.uz build'ida (Docker / k8s) u yo'q — rejim o'chiq, subdomenlar avvalgidek.
// Qo'lda boshqarish: NEXT_PUBLIC_SINGLE_DOMAIN=1 yoki 0.
const SINGLE_DOMAIN =
  process.env.NEXT_PUBLIC_SINGLE_DOMAIN ?? (/\.vercel\.app$/i.test(process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "") ? "1" : "0");

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_SINGLE_DOMAIN: SINGLE_DOMAIN },
  // Docker (k8s) uchun: .next/standalone — faqat kerakli fayllar va minimal server.js (Dockerfile'ga qarang)
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  // 404 — app/global-not-found.tsx (Robohub va Robosell uchun alohida). Root layout [locale] ichida bo'lgani uchun
  // oddiy not-found.tsx mos kelmagan manzillarni ushlamaydi; segment notFound() esa HTML'siz "error shell" beradi.
  // agentUpgrade: "security" — Next faqat xavfsizlik yangilanishlarini taklif qiladi (next upgrade --agent=security)
  experimental: { globalNotFound: true, agentUpgrade: "security" },
  // Faqat dev: lokal saytni Wi-Fi yoki Radmin VPN orqali boshqalarga ko'rsatish.
  // Robohub (va /academy) — oddiy IP bilan: http://192.168.1.50:3000/academy (Wi-Fi IP o'zgarsa ham ishlaydi);
  // boshqa saytlar domendan tanlanadi (src/proxy.ts) — nip.io nomi bilan: http://robosell.<IP>.nip.io:3000
  allowedDevOrigins: ["**.nip.io", "192.168.*.*", "10.*.*.*", "26.*.*.*"],
  // Kalkulyatorning ochiq API'si (api.robohub.uz) CORS bo'yicha faqat robohub.uz domenlari va localhost'ga ruxsat beradi.
  // Boshqa domenda (robohub-landing.vercel.app va h.k.) brauzer so'rovlari shu yo'l orqali o'z serverimizdan o'tadi.
  // robohub.uz'da kalkulyator API'ga to'g'ridan-to'g'ri murojaat qiladi (components/calculator/api.ts).
  // "X-Powered-By: Next.js" sarlavhasi berilmaydi
  poweredByHeader: false,
  async headers() {
    return [
      {
        // Xavfsizlik sarlavhalari — hamma sahifa va fayllarga
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
        ],
      },
      {
        // Robohub'ning vercel.app manzillari (robohub-landing.vercel.app, preview'lar) ochilaveradi, lekin qidiruvga tushmaydi.
        // Robosell (robosell-landing.vercel.app) — hozircha uning yagona manzili, shuning uchun istisno.
        // robohub-landing.vercel.app (asosiy production manzili) ham istisno: aks holda Lighthouse/PageSpeed SEO'ni
        // 69 ga tushiradi ("is-crawlable"). Dublikat bo'lmaydi — har sahifa canonical'i robohub.uz'ga ko'rsatadi.
        // Preview'lar (robohub-landing-git-…, robohub-landing-<hash>-…) yopiqligicha qoladi.
        // robots.txt'da Disallow qilinmaydi — aks holda Google bu sarlavhani ko'rmay qoladi.
        source: "/:path*",
        has: [{ type: "host", value: "^(?!robosell)(?!robohub-landing\\.vercel\\.app$)[^.]+\\.vercel\\.app$" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  async rewrites() {
    // Next yo'l oxiridagi "/" ni olib tashlaydi, backend (Django) esa uni talab qiladi — shu yerda qaytariladi
    return [{ source: "/api/robohub/:path*", destination: "https://api.robohub.uz/api/:path*/" }];
  },
};

export default nextConfig;
