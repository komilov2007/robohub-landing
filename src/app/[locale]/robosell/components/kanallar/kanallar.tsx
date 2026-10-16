import { CHANNELS, PINGS } from "../../robosell.content";
import Section from "../section/section";

// 3-bo'lim. Kanallar — Telegram'dagi chatlar ro'yxati kabi: har kanal bitta "suhbat",
// o'qilmagan belgisi — shu kanaldan kelgan buyurtmalar. Desktop'da chapdagi admin paneldan
// har chatga chiziq tortiladi (bitta katalog → hamma joy).
export default function Kanallar() {
  const n = CHANNELS.list.length;
  return (
    <Section id="kanallar" side="out" tone="soft" ping={PINGS.channels} labelledBy="kanallar-title">
      <div className="rs-wrap">
        <header className="rs-head rs-head--split">
          <div>
            <p className="rs-eyebrow" data-rv="">{CHANNELS.eyebrow}</p>
            <h2 className="rs-h2" id="kanallar-title" data-rv="">
              {CHANNELS.title}
            </h2>
          </div>
          <p className="rs-lead" data-rv="">{CHANNELS.lead}</p>
        </header>

        <div className="rs-hub" data-rv="">
          <div className="rs-hub__src">
            <span className="rs-hub__srcico" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <b>{CHANNELS.source.name}</b>
            <small>{CHANNELS.source.note}</small>
          </div>

          <div className="rs-hub__wires" aria-hidden="true">
            <svg viewBox={`0 0 100 ${n * 100}`} preserveAspectRatio="none">
              {CHANNELS.list.map((c, i) => {
                const y = i * 100 + 50;
                const mid = (n * 100) / 2;
                return <path key={c.id} d={`M0 ${mid} C50 ${mid},50 ${y},100 ${y}`} style={{ animationDelay: `${i * 90}ms` }} />;
              })}
            </svg>
          </div>

          <ul className="rs-chats" aria-label="Savdo kanallari">
            {CHANNELS.list.map((c) => (
              <li key={c.id} className="rs-chat">
                <span className={`rs-chat__ava rs-chat__ava--${c.tone}`} aria-hidden="true">
                  {c.id}
                </span>
                <span className="rs-chat__body">
                  <b>{c.name}</b>
                  <span>{c.text}</span>
                </span>
                <span className="rs-chat__meta" aria-hidden="true">
                  <small>hozir</small>
                  <i>+{c.badge}</i>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rs-markets" data-rv="">
          <b>{CHANNELS.marketsLabel}</b>
          <ul>
            {CHANNELS.markets.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <a href="#imkoniyatlar">
            {CHANNELS.all} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </Section>
  );
}
