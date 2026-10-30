import { defineMessages, type Locale } from "@/i18n/config";
import { getLesson } from "../../../academy/lib/academy";
import { academyUrl, lessonUrl } from "../../../academy/lib/links";

// "Robohub Academy'da batafsil" — kalkulyatordagi qatorlar (tannarx, xarajatlar, komissiya, foyda) bo'yicha darslarga havola.
// Kalkulyator ↔ Akademiya o'zaro bog'lanadi (TZ 8.9): darslardan bu yerga — academy/[topic]/components/cta.
// Darslar raqami — academy/lib/academy.ts: 8 tannarx, 2 xarajatlar, 7 operatsion xarajatlar, 4 ABC-tahlil.
const LESSONS = [8, 2, 7, 4];

const messages = defineMessages({
  uz: { title: "Robohub Academy’da batafsil", lead: "Hisob-kitobdagi har bir qator bo‘yicha qisqa video darslar.", all: "Barcha darslar" },
  ru: { title: "Подробнее в Robohub Academy", lead: "Короткие видеоуроки по каждой строке расчёта.", all: "Все уроки" },
  en: { title: "Learn more in Robohub Academy", lead: "Short video lessons on every line of the calculation.", all: "All lessons" },
  kk: { title: "Robohub Academy-де толығырақ", lead: "Есептің әр жолы бойынша қысқа видеосабақтар.", all: "Барлық сабақтар" },
  ky: { title: "Robohub Academy’де кененирээк", lead: "Эсептин ар бир сабы боюнча кыска видеосабактар.", all: "Бардык сабактар" },
  kaa: { title: "Robohub Academy’de tolıǵıraq", lead: "Esaptıń hár bir qatarı boyınsha qısqa video sabaqlar.", all: "Barlıq sabaqlar" },
  tg: { title: "Муфассал дар Robohub Academy", lead: "Дарсҳои кӯтоҳи видеоӣ оид ба ҳар сатри ҳисоб.", all: "Ҳамаи дарсҳо" },
});

export default function AcademyLinks({ locale }: { locale: Locale }) {
  const t = messages[locale];
  const lessons = LESSONS.map((n) => getLesson(n, locale)).filter((l) => l !== undefined);
  if (!lessons.length) return null;
  return (
    <section className="cx-learn" aria-labelledby="cx-learn-title">
      <div className="as-wrap">
        <div className="cx-learn__head">
          <h2 id="cx-learn-title">{t.title}</h2>
          <p>{t.lead}</p>
        </div>
        <ul className="cx-learn__list">
          {lessons.map((l) => (
            <li key={l.n}>
              <a href={lessonUrl(locale, l.topic, l.n)}>
                <span>{l.title}</span>
                <i aria-hidden="true">→</i>
              </a>
            </li>
          ))}
        </ul>
        <a className="cx-learn__all" href={academyUrl(locale)}>
          {t.all} <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
