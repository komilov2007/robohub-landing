import { FAQ, PINGS, REVIEWS } from "../../robosell.content";
import Section from "../section/section";
import FaqList from "./faq-list";

// 9-bo'lim. Mijozlar fikri — kiruvchi chat xabarlari (mobilda surib ko'riladi),
// pastda FAQ: ikki ustunli accordion (mobilda bitta ustun).
export default function Sharhlar() {
  return (
    <Section id="sharhlar" side="out" tone="soft" ping={PINGS.reviews} labelledBy="rev-title">
      <div className="rs-wrap">
        <header className="rs-head">
          <h2 className="rs-h2" id="rev-title" data-rv="">
            {REVIEWS.title}
          </h2>
        </header>
        {/* NAMUNA: mijoz ismlari va fikrlari haqiqiylari bilan almashtiriladi */}
        <ul className="rs-revs">
          {REVIEWS.list.map((r, i) => (
            <li key={i} className="rs-rev" data-rv="">
              <figure>
                <span className="rs-rev__stars" role="img" aria-label="5 yulduzdan 5">
                  ★★★★★
                </span>
                <blockquote>“{r.text}”</blockquote>
                <figcaption>
                  <i aria-hidden="true">{r.who[0]}</i>
                  <span>
                    <b>{r.who}</b>
                    <small>{r.role}</small>
                  </span>
                  <time aria-hidden="true">{r.time} ✓✓</time>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="rs-faq" id="faq">
          <h2 className="rs-h2 rs-h2--sm" data-rv="">
            {FAQ.title}
          </h2>
          <FaqList list={FAQ.list} />
        </div>
      </div>
    </Section>
  );
}
