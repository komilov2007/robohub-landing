import type { CSSProperties } from "react";
import { getMessages } from "@/i18n/server";
import { REELS } from "../reels/reels";
import { messages as reelsMessages } from "../reels/reels.i18n";
import { CHATS } from "./chats";
import ReviewsBulge from "./reviews-bulge";
import ReviewsChats from "./reviews-chats";
import ReviewsScroll from "./reviews-scroll";
import ReviewsVideos from "./reviews-client";
import { messages } from "./reviews.i18n";


// Sharhlar: tepada videosharhlar (suriladigan qator, bosilsa to'liq ekran pleyer), ostida Telegram'dagi fikrlar.
export default async function Reviews() {
  const t = await getMessages(messages);
  const rt = await getMessages(reelsMessages);
  const videos = REELS.map((r) => ({ id: r.id, name: r.name ?? rt.client, lang: rt.langs[r.lang], flag: r.lang, wide: r.wide }));
  return (
    <section className="revs" id="reviews" data-theme="dark" aria-labelledby="revs-title">
      <div className="container">
        <h2 className="revs__title" id="revs-title" data-sr="" style={{ "--d": "80ms" } as CSSProperties}>
          {t.titleStart}
          <span className="accent">{t.titleAccent}</span>
        </h2>
        <p className="revs__lead" data-sr="" style={{ "--d": "140ms" } as CSSProperties}>
          {t.lead}
        </p>

        <ReviewsVideos videos={videos} t={{ title: t.videos, prev: t.prev, next: t.next, watch: t.watch }} />

        <h3 className="revs__sub revs__sub--chats" data-sr="">
          {t.chats}
        </h3>
      </div>
      {/* Telegram'dagi fikrlar: bir xil kartalar bitta qatorda, o'zi sekin suriladi */}
      <ReviewsBulge />
      {/* ikkala lenta: o'zi suriladi + barmoq / sichqoncha bilan yonga surish */}
      <ReviewsScroll />
      <ReviewsChats chats={CHATS} t={{ anon: t.anon, group: "RoboHub Sellers", more: t.more, close: t.close }} />
    </section>
  );
}
