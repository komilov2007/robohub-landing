import type { CSSProperties } from "react";
import type { Topic } from "../../../lib/academy";
import Aurora from "../../../components/aurora/aurora";
import { HeroScreen, Playlist } from "./stage-player";

// Mavzu hero'si — YouTube kabi: tepada faqat sarlavha; ostida chapda katta pleyer (ostida matn yo'q),
// o'ngda (telefonda — pastda) shu mavzuning barcha darslari pleylist bo'lib turadi — balandligi videoga teng.
export default function Stage({ topic }: { topic: Topic }) {
  return (
    <section id="videos" className="acx-hero acx-hero--topic" data-theme="dark" data-glow aria-labelledby="ac-stage-title">
      <Aurora />
      <div className="container">
        <h1 id="ac-stage-title" className="acx-title acx-title--topic">
          <span className="acx-word" style={{ "--d": "60ms" } as CSSProperties}>
            {topic.hero.title}
          </span>{" "}
          <span className="acx-word acx-word--grad" style={{ "--d": "200ms" } as CSSProperties}>
            {topic.hero.highlight}
          </span>
        </h1>
        <div className="acx-watch">
          {/* kirish animatsiyasi opacity'siz (topic.css) — pleyer muqovasi LCP, darhol chiziladi */}
          <div className="acx-watch__main">
            <HeroScreen />
          </div>
          <Playlist topic={topic} />
        </div>
      </div>
    </section>
  );
}
