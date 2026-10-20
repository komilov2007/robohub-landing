import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Faqat dev: lokal saytni Wi-Fi yoki Radmin VPN orqali boshqalarga ko'rsatish.
  // Robohub (va /academy) — oddiy IP bilan: http://192.168.1.50:3000/academy (Wi-Fi IP o'zgarsa ham ishlaydi);
  // boshqa saytlar domendan tanlanadi (src/proxy.ts) — nip.io nomi bilan: http://robosell.<IP>.nip.io:3000
  allowedDevOrigins: ["**.nip.io", "192.168.*.*", "10.*.*.*", "26.*.*.*"],
};

export default nextConfig;
