import { CLIENTS } from "../../robosell.content";

// Hero ostidagi ishonch qatori: Robosell'dan foydalanadigan kompaniyalar cheksiz lentada oqadi
// (ikki nusxa, ikkinchisi ekran o'quvchidan yashirin; sichqoncha ustida — to'xtaydi).
export default function Clients() {
  return (
    <div className="rs-cl" data-rv="">
      <p className="rs-cl__title">{CLIENTS.title}</p>
      <div className="rs-cl__lane">
        <ul className="rs-cl__track">
          {[0, 1].map((copy) =>
            CLIENTS.list.map((c) => (
              <li key={`${copy}-${c.name}`} aria-hidden={copy === 1 || undefined}>
                <img src={c.logo} alt="" width={38} height={38} loading="lazy" />
                {c.name}
              </li>
            )),
          )}
        </ul>
      </div>
    </div>
  );
}
