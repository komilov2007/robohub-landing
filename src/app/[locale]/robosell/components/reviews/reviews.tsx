import type { CSSProperties } from "react";
import { REVIEWS } from "../../robosell.content";

// Biznes turlaridan keyingi bo'lim: hamkorlar sharhlari ikki qatorda qarama-qarshi tomonga oqadi
// (har qator ikki nusxa, ikkinchisi ekran o'quvchidan yashirin; sichqoncha ustida — to'xtaydi).
const COLORS = ["#00524F", "#5DC983", "#F2AF4C", "#2AABEE", "#DD2A7B", "#7C5CFF", "#0A7A6F", "#EB5769"];
const half = Math.ceil(REVIEWS.list.length / 2);
const ROWS = [REVIEWS.list.slice(0, half), REVIEWS.list.slice(half)];

export default function Reviews() {
  return (
    <section className="rs-rev" aria-labelledby="rev-title">
      <div className="rs-wrap">
        <header className="rs-head2">
          <p className="rs-kicker" data-rv="">
            <span aria-hidden="true">“</span>
            {REVIEWS.eyebrow}
          </p>
          <h2 className="rs-title" id="rev-title" data-rv="">
            {REVIEWS.title}
          </h2>
          <p className="rs-sub" data-rv="">
            {REVIEWS.lead}
          </p>
        </header>
      </div>

      <div className="rs-rev__rows" data-rv="" data-pause="">
        {ROWS.map((row, r) => (
          <div key={r} className="rs-rev__lane">
            <ul className={`rs-rev__track${r === 1 ? " rs-rev__track--rev" : ""}`}>
              {[0, 1].map((copy) =>
                row.map((it, i) => (
                  <li
                    key={`${copy}-${it.company}`}
                    className="rs-rev__card"
                    aria-hidden={copy === 1 || undefined}
                    style={{ "--c": COLORS[(r * half + i) % COLORS.length] } as CSSProperties}
                  >
                    <blockquote>
                      <svg className="rs-rev__q" viewBox="0 0 32 24" aria-hidden="true">
                        <path d="M0 24V14.4C0 6.6 4.3 1.8 12.4 0l1.4 3.4C9.6 4.8 7.6 7.4 7.4 11H13v13H0Zm18.6 0V14.4C18.6 6.6 22.9 1.8 31 0l1 3.4c-4.2 1.4-6.2 4-6.4 7.6H32v13H18.6Z" />
                      </svg>
                      <p>{it.text}</p>
                    </blockquote>
                    <footer>
                      <i aria-hidden="true">{it.name[0]}</i>
                      <span>
                        <b>{it.name}</b>
                        {it.company}
                      </span>
                    </footer>
                  </li>
                )),
              )}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
