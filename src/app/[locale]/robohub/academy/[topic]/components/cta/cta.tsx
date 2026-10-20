import Link from "next/link";
import { nextTopic, type Topic } from "../../../lib/academy";
import { START_URL, topicHref } from "../../../lib/links";
import { RobohubMark } from "../../../components/logo/logo";

const MARKETPLACES = ["uzum", "wildberries", "yandex", "ozon"];

// CTA — bosh sahifadagi "Yordam" bloki uslubida: harakatlanuvchi gradient fon, aylanuvchi halqalar
// va marketpleyslar orbitasi, magnit tugmalar (data-magnet).
export default function Cta({ topic }: { topic: Topic }) {
  const next = nextTopic(topic.slug);
  return (
    <section className="acx-help" data-theme="light" aria-labelledby="ac-cta-title">
      <div className="container">
        <div className="acx-end" data-theme="brand" data-glow data-reveal>
          <div className="acx-end__mesh" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="acx-end__text">
            <p className="acx-kicker acx-kicker--dark">Amalda sinab ko‘ring</p>
            <h2 id="ac-cta-title" className="acx-h2">
              {topic.name}ni bugun <span className="acx-grad">o‘z kabinetingizda</span> sinab ko‘ring
            </h2>
            <p>Darsdagi har bir qadamni o‘z kabinetingizda takrorlang.</p>
            <div className="acx-end__btns">
              <a href={START_URL} target="_blank" rel="noopener" className="acx-btn acx-btn--light" data-magnet>
                Hoziroq boshlash <span aria-hidden="true">→</span>
              </a>
              <Link href={topicHref(next.slug)} className="acx-btn acx-btn--ghost" data-magnet>
                Keyingi mavzu: {next.name}
              </Link>
            </div>
          </div>
          <div className="acx-end__orbit" aria-hidden="true">
            <span className="acx-end__ring acx-end__ring--3" />
            <span className="acx-end__ring acx-end__ring--2" />
            <span className="acx-end__ring acx-end__ring--1">
              {MARKETPLACES.map((m) => (
                <img key={m} src={`/marketplaces/${m}.svg`} alt="" width={54} height={54} loading="lazy" />
              ))}
            </span>
            <span className="acx-end__mark">
              <RobohubMark />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
