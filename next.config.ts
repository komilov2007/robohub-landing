import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Faqat dev: lokal saytni Wi-Fi yoki Radmin VPN orqali boshqalarga ko'rsatish.
  // Robohub (va /academy) — oddiy IP bilan: http://192.168.1.50:3000/academy (Wi-Fi IP o'zgarsa ham ishlaydi);
  // boshqa saytlar domendan tanlanadi (src/proxy.ts) — nip.io nomi bilan: http://robosell.<IP>.nip.io:3000
  allowedDevOrigins: ["**.nip.io", "192.168.*.*", "10.*.*.*", "26.*.*.*"],
  // Kalkulyatorning ochiq API'si (api.robohub.uz) CORS bo'yicha faqat robohub.uz domenlari va localhost'ga ruxsat beradi.
  // Boshqa domenda (robohub-landing.vercel.app va h.k.) brauzer so'rovlari shu yo'l orqali o'z serverimizdan o'tadi.
  // robohub.uz'da kalkulyator API'ga to'g'ridan-to'g'ri murojaat qiladi (components/calculator/api.ts).
  async rewrites() {
    // Next yo'l oxiridagi "/" ni olib tashlaydi, backend (Django) esa uni talab qiladi — shu yerda qaytariladi
    return [{ source: "/api/robohub/:path*", destination: "https://api.robohub.uz/api/:path*/" }];
  },
};

export default nextConfig;
