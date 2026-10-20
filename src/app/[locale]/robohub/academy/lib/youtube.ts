// YouTube muqova, embed va havolalar. Tashqi kutubxona ishlatilmaydi (Robohub_academy.md, 4.2).
export const yt = {
  thumb: (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`, // 1280×720
  thumbWebp: (id: string) => `https://i.ytimg.com/vi_webp/${id}/maxresdefault.webp`,
  thumbHq: (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, // 480×360 — zaxira
  // mobil muqova: 480×360 webp (4:3, qora chiziqlar 16:9 qutida object-fit: cover bilan kesiladi) — LCP uchun yengil
  thumbHqWebp: (id: string) => `https://i.ytimg.com/vi_webp/${id}/hqdefault.webp`,
  thumbMq: (id: string) => `https://i.ytimg.com/vi/${id}/mqdefault.jpg`, // 320×180 — ro'yxat
  embed: (id: string, start = 0) =>
    `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1${start ? `&start=${start}` : ""}`,
  watch: (id: string, start = 0) => `https://www.youtube.com/watch?v=${id}${start ? `&t=${start}s` : ""}`,
};

export const fmt = (sec: number) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;

// JSON-LD uchun ISO 8601 davomiylik: PT3M24S
export const isoDuration = (sec: number) => `PT${Math.floor(sec / 60)}M${sec % 60}S`;

// youtube-nocookie va i.ytimg uchun preconnect — faqat birinchi hover/focus'da qo'shiladi
let warmed = false;
export function warmYoutube() {
  if (warmed || typeof document === "undefined") return;
  warmed = true;
  for (const href of ["https://www.youtube-nocookie.com", "https://i.ytimg.com", "https://www.google.com"]) {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = href;
    link.crossOrigin = "";
    document.head.appendChild(link);
  }
}
