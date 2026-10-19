import type { CSSProperties } from "react";
import Link from "next/link";
import { LESSONS_SORTED, TOTAL_LESSONS, TOTAL_TOPICS, getTopic } from "../../lib/academy";
import { fmt, yt } from "../../lib/youtube";
import Marker from "../marker/marker";
import AcademySearch from "../academy-search/academy-search";
import WallMotion from "./wall-motion";

// Bosh sahifa hero'si — teal fon, assimetrik: chapda katta H1 va qidiruv, o'ngda "video devori".
// Devor: barcha darslar muqovasidan qiya (−6°) mozaika; qatorlar qarama-qarshi tomonga sekin suriladi.
// Muqova — havola: hover/focus'da kattalashadi va dars nomini ko'rsatadi, bosilsa o'sha dars ochiladi.
// Har qator ikki marta chiziladi (uzluksiz aylanish uchun); ikkinchi nusxa aria-hidden va tab'dan tashqarida.
const ROWS = 4;

export default function HomeHero() {
  const rows = Array.from({ length: ROWS }, (_, r) => LESSONS_SORTED.filter((_, i) => i % ROWS === r));
  return (
    <section className="ac-hh" aria-labelledby="ac-hh-title">
      <div className="ac-hh__inner">
        <div className="ac-hh__text">
          <p className="ac-hh__pill ac-rise">
            <b>{TOTAL_LESSONS}</b> dars · <b>{TOTAL_TOPICS}</b> mavzu
          </p>
          <h1 id="ac-hh-title" className="ac-hh__title">
            <span className="ac-w">Robohub’ni</span>{" "}
            <Marker delay={650}>qisqa darslarda</Marker>{" "}
            <span className="ac-w" style={{ "--d": "120ms" } as CSSProperties}>
              o‘rganing
            </span>
          </h1>
          <p className="ac-hh__lead ac-rise" style={{ "--d": "160ms" } as CSSProperties}>
            Har dars — bitta savolga qisqa video javob. Savolingizni yozing yoki devordan darsni tanlang.
          </p>
          <div className="ac-hh__search ac-rise" style={{ "--d": "240ms" } as CSSProperties}>
            <AcademySearch />
          </div>
        </div>

        <div className="ac-hh__wall">
          <WallMotion>
            {rows.map((row, r) => (
              <div key={r} className={`ac-wall__row${r % 2 ? " is-rev" : ""}`} style={{ "--dur": `${46 + r * 7}s` } as CSSProperties}>
                {[0, 1].map((copy) => (
                  <ul key={copy} className="ac-wall__set" aria-hidden={copy === 1 ? true : undefined}>
                    {row.map((l) => (
                      <li key={l.n}>
                        <Link
                          href={`/${l.topic}?dars=${l.n}`}
                          className="ac-tile"
                          tabIndex={copy === 1 ? -1 : undefined}
                          aria-label={copy === 1 ? undefined : `${l.n}-dars: ${l.title}`}
                        >
                          <img
                            src={yt.thumbMq(l.youtubeId)}
                            width={320}
                            height={180}
                            alt=""
                            decoding="async"
                            loading={r < 2 ? "eager" : "lazy"}
                            fetchPriority="low"
                          />
                          <span className="ac-tile__meta" aria-hidden="true">
                            <b>{l.n}</b>
                            {fmt(l.durationSec)}
                          </span>
                          <span className="ac-tile__title" aria-hidden="true">
                            <small>{getTopic(l.topic)?.name}</small>
                            {l.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            ))}
          </WallMotion>
        </div>
      </div>
    </section>
  );
}
