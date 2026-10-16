import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // CSS <link> o'rniga <head> dagi <style>: render-blocking so'rovlar yo'q, birinchi chizish HTML bilan keladi.
    // Landing — asosan yangi tashrifchilar, CSS ~23 KB (gzip); critters/beasties (optimizeCss) qo'shimcha paket talab qiladi.
    inlineCss: true,
  },
};

export default nextConfig;
