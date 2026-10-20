import Link from "next/link";
import { RobohubLogo } from "../logo/logo";
import { TOPICS } from "../../lib/academy";
import { PHONE, PHONE_TEL, ROBOHUB_URL, START_URL, YOUTUBE_CHANNEL } from "../../lib/links";

// Joriy yil — keshlangan (cacheComponents: prerender'da new Date() to'g'ridan-to'g'ri ishlatilmaydi)
async function Year() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

const MARKETPLACES = ["uzum", "wildberries", "yandex", "ozon"];

// Footer — Robohub landingi footeri uslubida (to'q fon, logo, ustunlar)
export default function Footer() {
  return (
    <footer className="ac-footer" id="ac-footer" data-theme="dark">
      <div className="container">
        <div className="ac-footer__grid">
          <div className="ac-footer__about">
            <Link href="/" className="ac-footer__logo" aria-label="Robohub Academy">
              <RobohubLogo />
              <span>Academy</span>
            </Link>
            <p>Uzum, Wildberries, Yandex Market va Ozon sotuvchilari uchun Robohub bo‘yicha qisqa video darslar.</p>
            <p className="ac-footer__mps" aria-hidden="true">
              {MARKETPLACES.map((m) => (
                <img key={m} src={`/marketplaces/${m}.svg`} alt="" width={30} height={30} loading="lazy" />
              ))}
            </p>
          </div>
          <nav aria-label="Mavzular">
            <h3>Mavzular</h3>
            <ul className="ac-footer__cols">
              {TOPICS.map((t) => (
                <li key={t.slug}>
                  <Link href={`/${t.slug}`}>{t.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Robohub">
            <h3>Robohub</h3>
            <ul>
              <li>
                <a href={ROBOHUB_URL}>Bosh sahifa</a>
              </li>
              <li>
                <a href={`${ROBOHUB_URL}/#pricing`}>Tariflar</a>
              </li>
              <li>
                <a href={START_URL} target="_blank" rel="noopener">Hoziroq boshlash</a>
              </li>
            </ul>
          </nav>
          <div>
            <h3>Aloqa</h3>
            <ul>
              <li>
                <a href={PHONE_TEL}>{PHONE}</a>
              </li>
              <li>
                <a href={YOUTUBE_CHANNEL} target="_blank" rel="noopener">
                  YouTube: @robohub_ai
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="ac-footer__bar">
          <p>
            © <Year /> Robohub. Barcha huquqlar himoyalangan.
          </p>
          <p>Robohub Academy</p>
        </div>
      </div>
    </footer>
  );
}
