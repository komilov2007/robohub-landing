import { getMessages } from "@/i18n/server";
import ReelsClient from "./reels-client";
import { messages } from "./reels.i18n";

// Mijozlar videosharhlari (YouTube Shorts) — o'ng pastki burchakda vertikal "reels" kartochka:
// ovozsiz o'zi o'ynaydi va almashib turadi, bosilganda to'liq ekranda ovoz bilan ochiladi.
// Video qo'shish — REELS ro'yxatiga (id — youtube.com/shorts/{id}, name — kartochkadagi imzo).
export const REELS = [
  { id: "a87WCM-pSaU", name: "Polaris" },
  { id: "Vw3OQCnua4g", name: "Qobiljon aka" },
  { id: "g0yyt84vmzI", name: "GENAU" },
];

export default async function Reels() {
  const t = await getMessages(messages);
  return <ReelsClient t={t} reels={REELS} />;
}
