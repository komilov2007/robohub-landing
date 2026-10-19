import Link from "next/link";
import { nextTopic, type Topic } from "../../../lib/academy";
import { START_URL } from "../../../lib/links";
import { RobohubMark } from "../../../components/logo/logo";

const MARKETPLACES = ["uzum", "wildberries", "yandex", "ozon"];

// CTA — Robohub'ning yakuniy kartochkasi kabi: brend fon, o'ngda marketpleyslar orbitasi
export default function Cta({ topic }: { topic: Topic }) {
  const next = nextTopic(topic.slug);
  return (
    <section className="ac-section ac-section--last" data-theme="light" aria-labelledby="ac-cta-title">
      <div className="container">
        <div className="ac-end" data-theme="brand" data-reveal>
          <div className="ac-end__text">
            <p className="ac-eyebrow ac-eyebrow--on-dark">Amalda sinab ko‘ring</p>
            <h2 id="ac-cta-title" className="ac-h2">
              {topic.name}ni bugun <span className="ac-accent">o‘z kabinetingizda</span> sinab ko‘ring
            </h2>
            <p>Darsdagi har bir qadamni o‘z kabinetingizda takrorlang.</p>
            <div className="ac-end__btns">
              <a href={START_URL} className="btn btn--lg btn--primary">
                Bepul boshlash <span className="arrow" aria-hidden="true">→</span>
              </a>
              <Link href={`/${next.slug}`} className="btn btn--lg btn--outline">
                Keyingi mavzu: {next.name}
              </Link>
            </div>
          </div>
          <div className="ac-end__orbit" aria-hidden="true">
            <span className="ac-end__ring ac-end__ring--in" />
            <span className="ac-end__ring">
              {MARKETPLACES.map((m) => (
                <img key={m} src={`/marketplaces/${m}.svg`} alt="" width={54} height={54} loading="lazy" />
              ))}
            </span>
            <span className="ac-end__mark">
              <RobohubMark />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
