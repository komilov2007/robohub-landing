import { CHANNELS } from "../../robosell.content";
import ChannelsDemo from "./channels-demo";

// 4-bo'lim. To'q yashil fon. Tepada admin kartasi, undan uchta nur — Telegram bot, veb-sayt va Click ilovasiga;
// bir marta qo'shilgan mahsulot uchala katalogda bir vaqtda paydo bo'ladi (channels-demo.tsx).
export default function Channels() {
  return (
    <section className="rs-ch" id="channels" aria-labelledby="ch-title" data-pause="">
      <div className="rs-ch__bg" aria-hidden="true" />
      <div className="rs-wrap">
        <header className="rs-head2">
          <p className="rs-kicker rs-kicker--dark" data-rv="">
            <span>04</span>
            {CHANNELS.eyebrow}
          </p>
          <h2 className="rs-title rs-title--light" id="ch-title" data-rv="">
            {CHANNELS.title}
          </h2>
          <p className="rs-sub rs-sub--light" data-rv="">
            {CHANNELS.lead}
          </p>
        </header>
        <ChannelsDemo />
      </div>
    </section>
  );
}
