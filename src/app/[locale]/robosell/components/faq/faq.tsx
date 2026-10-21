import { FAQ, PHONE, PHONE_HREF } from "../../robosell.content";
import { TELEGRAM_URL } from "@/lib/contacts";
import FaqList from "./faq-list";
import LeadForm from "./lead-form";

// 9-bo'lim. Chapda yopishqoq sarlavha va "Savolingiz qoldimi?" kartasi (bitta inputli ariza formasi → Telegram),
// o'ngda raqamli akkordeon.
export default function Faq() {
  return (
    <section className="rs-fq" id="faq" aria-labelledby="faq-title">
      <div className="rs-wrap rs-fq__in">
        <div className="rs-fq__side">
          <p className="rs-kicker" data-rv="">
            <span>09</span>
            {FAQ.eyebrow}
          </p>
          <h2 className="rs-title" id="faq-title" data-rv="">
            {FAQ.title}
          </h2>
          <p className="rs-sub" data-rv="">
            {FAQ.lead}
          </p>
          <div className="rs-fq__help" data-rv="">
            <span className="rs-fq__ava" aria-hidden="true">
              <i>👩‍💻</i>
              <em />
            </span>
            <b>{FAQ.helpTitle}</b>
            <p>{FAQ.helpText}</p>
            <LeadForm />
            <p className="rs-fq__alt">
              yoki <a href={TELEGRAM_URL} target="_blank" rel="noopener">Telegram’da yozing</a> ·{" "}
              <a href={PHONE_HREF}>{PHONE}</a>
            </p>
          </div>
        </div>
        <FaqList list={FAQ.list} />
      </div>
    </section>
  );
}
