export default function Yakun() {
  return (
    <section className="end" id="boshlash" data-theme="dark" aria-labelledby="end-title">
      <div className="container">
        <div className="end__card" data-theme="brand" data-sr="">
          <div>
            {/* Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi */}{" "}
            <h2 className="end__title" id="end-title">
              <span>To‘rtta marketpleys.</span>{" "}
              <span className="accent">Bitta kabinet.</span>
            </h2>{" "}
            <p className="end__lead">Buyurtma, qoldiq va foydani bir joydan boshqarishni bugun boshlang.</p>{" "}
            <div className="end__btns">
              <a className="btn btn--lg btn--primary" href="#kirish">
                {"Hoziroq boshlash "}
                <span className="arrow" aria-hidden="true">→</span>
              </a>{" "}
              <a className="btn btn--lg btn--outline" href="#tariflar">Tariflarni koʻrish</a>
            </div>
          </div>{" "}
          <div className="end__orbit" aria-hidden="true">
            <span className="end__ring end__ring--in" />{" "}
            <span className="end__ring">{" "}
              <img src="/marketplaces/uzum.svg" alt="" width="54" height="54" />{" "}
              <img src="/marketplaces/wildberries.svg" alt="" width="54" height="54" />{" "}
              <img src="/marketplaces/ozon.svg" alt="" width="54" height="54" />{" "}
              <img src="/marketplaces/yandex.svg" alt="" width="54" height="54" />{" "}
            </span>{" "}
            <span className="end__mark">
              <svg viewBox="0 0 33.8675 15.06">
                <use href="#rh-mark" />
              </svg>
            </span>
          </div>
        </div>{" "}
        <footer className="foot">
          <div className="foot__grid">
            <div>
              <svg className="foot__logo" viewBox="0 0 127 31" role="img" aria-label="Robohub">
                <use href="#rh-logo" />
              </svg>{" "}
              <p className="foot__about">Marketpleys sotuvchilari uchun yagona kabinet.</p>{" "}
              <p className="foot__mps" aria-hidden="true">
                <img src="/marketplaces/uzum.svg" alt="" width="30" height="30" />
                <img src="/marketplaces/yandex.svg" alt="" width="30" height="30" />
                <img src="/marketplaces/wildberries.svg" alt="" width="30" height="30" />
                <img src="/marketplaces/ozon.svg" alt="" width="30" height="30" />
              </p>
            </div>{" "}
            <nav aria-label="Sahifa boʻlimlari">
              <h3>Sahifa</h3>{" "}
              <ul>
                <li>
                  <a href="#imkoniyatlar">Imkoniyatlar</a>
                </li>{" "}
                <li>
                  <a href="#qanday-ishlaydi">Qanday ishlaydi</a>
                </li>{" "}
                <li>
                  <a href="#integratsiyalar">Integratsiyalar</a>
                </li>{" "}
                <li>
                  <a href="#sharhlar">Sharhlar</a>
                </li>{" "}
                <li>
                  <a href="#tariflar">Tariflar</a>
                </li>{" "}
                <li>
                  <a href="#savollar">Savollar</a>
                </li>{" "}
                <li>
                  <a href="#aloqa">Aloqa</a>
                </li>
              </ul>
            </nav>{" "}
            <nav aria-label="Bepul vositalar">
              <h3>Bepul vositalar</h3>{" "}
              <ul>
                <li>
                  <a href="/calculator/">Marketpleys kalkulyatori</a>
                </li>{" "}
                <li>
                  <a href="/ai-infografika/">AI infografika</a>
                </li>
              </ul>
            </nav>{" "}
            <div>
              <h3>Aloqa</h3>{" "}
              <a className="foot__call" href="tel:+998999857226">
                <i aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                  </svg>
                </i>{" "}
                <span>
                  <span>Qoʻllab-quvvatlash xizmati</span>
                  <b>+998 (99) 985 72 26</b>
                </span>
              </a>
            </div>
          </div>{" "}
          <div className="foot__bar">
            <p>© 2026 Robohub</p>{" "}
            <span>
              <a href="#maxfiylik">Maxfiylik siyosati</a>
              <a href="#qollab-quvvatlash">Qoʻllab-quvvatlash</a>
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
}
