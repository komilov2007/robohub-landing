import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Faqat dev: lokal saytni Wi-Fi yoki Radmin VPN orqali boshqalarga ko'rsatish. Sayt domendan tanlanadi
  // (src/proxy.ts), shuning uchun IP emas, nip.io nomi: http://robohub-academy-two.<IP>.nip.io:3000
  allowedDevOrigins: ["**.nip.io"],
};

export default nextConfig;
