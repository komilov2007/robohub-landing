import { visibleFaqs, type Topic } from "../../../lib/academy";
import Faq from "./faq";
import { getMessages } from "@/i18n/server";
import { messages } from "./questions.i18n";

// Savollar — mavzuning ko'p beriladigan savollari, to'liq kenglikda. [TODO] FAQ'lar visibleFaqs() bilan filtrlanadi.
// Boshqa mavzularga o'tish — yuqoridagi "Mavzular" bo'limida (topics-rail.tsx).
export default async function Questions({ topic }: { topic: Topic }) {
  const faqs = visibleFaqs(topic);
  if (!faqs.length) return null;
  const t = await getMessages(messages);
  return (
    <section id="questions" className="acx-qa-sec" data-theme="light" aria-labelledby="ac-questions-title">
      <div className="container">
        <div className="acx-head" data-reveal>
          <p className="acx-kicker">{t.kicker}</p>
          <h2 id="ac-questions-title" className="acx-h2">
            {t.title} <span className="acx-mark">{t.mark}</span>
          </h2>
        </div>
        <div className="acx-qa" data-reveal>
          <Faq items={faqs} />
        </div>
      </div>
    </section>
  );
}
