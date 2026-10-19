import Link from "next/link";
import { lessonsByTopic, nextTopic, type Topic } from "../../../lib/academy";
import { START_URL } from "../../../lib/links";
import Icon, { ICONS } from "../../../components/svg-icon/svg-icon";

// CTA — "Keyingi mavzu: {name}". To'liq kenglikdagi katta havola: keyingi mavzu nomi gigant yozuvda,
// hover'da sariq strelka suriladi. Yonida ikkinchi darajali "Bepul boshlash".
export default function NextTopic({ topic }: { topic: Topic }) {
  const next = nextTopic(topic.slug);
  return (
    <section className="ac-next" aria-labelledby="ac-next-title">
      <div className="ac-wrap">
        <Link href={`/${next.slug}`} className="ac-next__link">
          <span className="ac-next__kicker" id="ac-next-title">
            Keyingi mavzu · {lessonsByTopic(next.slug).length} dars
          </span>
          <span className="ac-next__name">
            <span className="ac-next__ico" aria-hidden="true">
              <Icon d={next.icon} size={36} />
            </span>
            {next.name}
            <span className="ac-next__arrow" aria-hidden="true">
              <Icon d={ICONS.arrowRight} size={40} />
            </span>
          </span>
          <span className="ac-next__short">{next.short}</span>
        </Link>
        <p className="ac-next__aside">
          {topic.name}ni o‘z kabinetingizda sinab ko‘ring.{" "}
          <a href={START_URL} className="ac-next__start">
            Bepul boshlash
          </a>
        </p>
      </div>
    </section>
  );
}
