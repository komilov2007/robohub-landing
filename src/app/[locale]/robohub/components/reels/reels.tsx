import { getMessages } from "@/i18n/server";
import ReelsClient from "./reels-client";
import { messages } from "./reels.i18n";

// Mijozlar videosharhlari (YouTube Shorts) — o'ng pastki burchakda vertikal "reels" kartochka:
// ovozsiz o'zi o'ynaydi va almashib turadi, bosilganda to'liq ekranda ovoz bilan ochiladi.
// Video qo'shish — REELS ro'yxatiga (id — youtube.com/shorts/{id}, name — kartochkadagi imzo).
// name bo'lmasa (videoda brend nomi aytilmagan) — o'rniga tarjima qilingan "Robohub mijozi" yoziladi.
// lang — videoda qaysi tilda gapirilgani (YouTube avtomatik subtitrlari aniqlagan til), to'liq ekran ro'yxatida ko'rinadi.
// wide — oddiy (gorizontal) video, Shorts emas: tik muqovasi (oar2) yo'q — oddiy muqova (hqdefault) olinadi.
export const REELS: { id: string; name?: string; lang: "uz" | "ru"; wide?: boolean }[] = [
  { id: "a87WCM-pSaU", name: "Polaris", lang: "uz" },
  { id: "Vw3OQCnua4g", name: "Qobiljon aka", lang: "uz" },
  { id: "g0yyt84vmzI", name: "GENAU", lang: "ru" },
  { id: "0jaismC2h00", name: "E Shop", lang: "uz" },
  { id: "6A04obDzJgQ", lang: "uz" },
  { id: "karGIQC6NLQ", name: "Li Ning", lang: "ru" },
  { id: "Nhrmmg7EMhA", name: "KG Sellerlar Assotsiatsiyasi", lang: "ru" },
  { id: "iFYfpc_-dXo", name: "KZ Sellerlar Assotsiatsiyasi", lang: "ru" },
  { id: "bYS-qnN6c_E", name: "Cosmica", lang: "uz" },
  { id: "VShxQ675m84", name: "Mansura Ibragimova", lang: "uz", wide: true },
];

export default async function Reels() {
  const t = await getMessages(messages);
  return <ReelsClient t={t} reels={REELS} />;
}
