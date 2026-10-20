import type { CSSProperties, ReactNode } from "react";
import type { TopicSlug } from "../../../lib/academy";

// Har bir mavzuning o'ziga xos animatsiyali vizuali — video mavzusini bir qarashda ko'rsatadi.
// Hammasi illyustratsiya (aria-hidden): raqam va nomlar namunaviy, ostida "namuna" yozuvi.
// Animatsiyalar faqat CSS (transform/opacity), academy.css → "VIZUALLAR".
export const v = (vars: Record<string, string | number>) => vars as CSSProperties;
export const MP = { uzum: "Uzum Market", wildberries: "Wildberries", yandex: "Yandex Market", ozon: "Ozon" } as const;
export type Mp = keyof typeof MP;
export const Logo = ({ mp, size = 20 }: { mp: Mp; size?: number }) => (
  <img src={`/marketplaces/${mp}.svg`} alt="" width={size} height={size} loading="lazy" />
);

// Oyna ramkasi: yuqorida 3 nuqta va sarlavha
export function Win({ title, dark, children, className }: { title: string; dark?: boolean; children: ReactNode; className?: string }) {
  return (
    <div className={`ac-win${dark ? " ac-win--dark" : ""}${className ? ` ${className}` : ""}`}>
      <div className="ac-win__bar">
        <i />
        <i />
        <i />
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}

// ───────── Analitika: KPI, o'suvchi grafik, ABC × XYZ matritsa ─────────
export function Analitika() {
  const bars = [38, 52, 44, 66, 58, 74, 62, 81, 70, 88, 79, 94];
  const cells = ["AX", "AY", "AZ", "BX", "BY", "BZ", "CX", "CY", "CZ"];
  return (
    <div className="ac-v ac-v--dash">
      <Win title="Dashboard" dark>
        <div className="ac-v-kpis">
          {[
            ["Savdo", "124,6 mln", "+12%"],
            ["Foyda", "31,2 mln", "+8%"],
            ["Xarajat", "93,4 mln", "−3%"],
          ].map(([k, val, d], i) => (
            <div key={k} style={v({ "--i": i })}>
              <span>{k}</span>
              <strong>{val}</strong>
              <em className={d.startsWith("−") ? "is-down" : undefined}>{d}</em>
            </div>
          ))}
        </div>
        <div className="ac-v-chart">
          {bars.map((h, i) => (
            <i key={i} style={v({ "--h": `${h}%`, "--i": i })} />
          ))}
        </div>
      </Win>
      <div className="ac-v-abc">
        <p>ABC × XYZ</p>
        <div>
          {cells.map((c, i) => (
            <span key={c} style={v({ "--i": i })}>
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ───────── Buyurtmalar: kanban, bitta buyurtma ustunlar bo'ylab yuradi ─────────
export function Buyurtmalar() {
  const cols: { t: string; cards: [Mp, string][] }[] = [
    { t: "Yangi", cards: [["wildberries", "#5531"], ["yandex", "#778"]] },
    { t: "Yig‘ilmoqda", cards: [["uzum", "#1038"]] },
    { t: "Yetkazildi", cards: [["ozon", "#2210"], ["uzum", "#1019"]] },
  ];
  return (
    <div className="ac-v ac-v--kanban">
      <div className="ac-v-board">
        {cols.map((c) => (
          <div key={c.t} className="ac-v-col">
            <p>
              {c.t}
              <b>{c.cards.length + (c.t === "Yangi" ? 1 : 0)}</b>
            </p>
            {c.t === "Yangi" && <div className="ac-v-order is-ghost" />}
            {c.cards.map(([mp, id]) => (
              <div key={id} className="ac-v-order">
                <Logo mp={mp} size={18} />
                <span>
                  <strong>{id}</strong>
                  <small>{MP[mp]}</small>
                </span>
              </div>
            ))}
          </div>
        ))}
        <div className="ac-v-order ac-v-order--move">
          <Logo mp="uzum" size={18} />
          <span>
            <strong>#1042</strong>
            <small>Uzum Market</small>
          </span>
        </div>
      </div>
    </div>
  );
}

// ───────── Mahsulotlar: narx o'zgaradi va marketpleyslarga yuboriladi ─────────
export function Mahsulotlar() {
  const mps: Mp[] = ["uzum", "wildberries", "yandex", "ozon"];
  return (
    <div className="ac-v ac-v--product">
      <div className="ac-v-pcard">
        <div className="ac-v-pcard__img">
          <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 12l-8 8-9-9V3h8zM7 7h.01" />
          </svg>
        </div>
        <strong>Krossovka Air Run</strong>
        <small>SKU 10482 · 42 o‘lcham</small>
        <div className="ac-v-price">
          <s>320 000</s>
          <b>
            <span className="ac-v-price__old">320 000 so‘m</span>
            <span className="ac-v-price__new">299 000 so‘m</span>
          </b>
        </div>
        <span className="ac-v-send">Marketpleysga yuborish</span>
      </div>
      <ul className="ac-v-sync">
        {mps.map((mp, i) => (
          <li key={mp} style={v({ "--i": i })}>
            <Logo mp={mp} size={22} />
            {MP[mp]}
            <em>
              <span className="is-wait">kutilmoqda</span>
              <span className="is-ok">✓ yangilandi</span>
            </em>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ───────── Ombor: omborlar guruhlarga yig'iladi, Missing ogohlantirishi ─────────
export function Ombor() {
  const items: [string, number][] = [
    ["Uzum FBO", 0],
    ["WB Koledino", 1],
    ["Yandex", 0],
    ["O‘z omborim", 0],
  ];
  return (
    <div className="ac-v ac-v--warehouse">
      <div className="ac-v-wh">
        {items.map(([name, g], i) => (
          <span key={name} className="ac-v-wh__item" style={v({ "--i": i, "--g": g })}>
            <i />
            {name}
          </span>
        ))}
      </div>
      <div className="ac-v-groups">
        <div className="ac-v-group">
          <p>Guruh</p>
          <strong>Toshkent</strong>
          <span>3 ombor · 1 240 dona</span>
        </div>
        <div className="ac-v-group ac-v-group--b">
          <p>Guruh</p>
          <strong>Rossiya</strong>
          <span>1 ombor · 860 dona</span>
        </div>
      </div>
      <div className="ac-v-missing">
        <i />
        Missing: 3 ta mahsulot
      </div>
    </div>
  );
}

// ───────── Marketing: aksiyalar taqvimi + Boost TOP reytingi ─────────
function Marketing() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const promo = new Map<number, string>([
    [4, "a"], [5, "a"], [6, "a"], [11, "b"], [12, "b"], [18, "c"], [19, "c"], [20, "c"], [21, "c"], [26, "a"],
  ]);
  return (
    <div className="ac-v ac-v--marketing">
      <Win title="Aksiyalar taqvimi · Noyabr" className="ac-v-cal">
        <div className="ac-v-cal__grid">
          {["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"].map((d) => (
            <b key={d}>{d}</b>
          ))}
          {days.map((d) => (
            <span key={d} className={promo.has(d) ? `is-${promo.get(d)}` : undefined} style={v({ "--i": d })}>
              {d}
            </span>
          ))}
        </div>
        <div className="ac-v-cal__legend">
          <span className="is-a">Promokod</span>
          <span className="is-b">Chegirma</span>
          <span className="is-c">Mavsumiy aksiya</span>
        </div>
      </Win>
      <div className="ac-v-boost">
        <p>Boost TOP · qidiruv</p>
        {/* o'rinlar raqami statik; "sizning mahsulot" 4-o'rindan 1-ga ko'tariladi, qolganlar bir pog'ona tushadi */}
        <div className="ac-v-boost__list">
          <span className="ac-v-boost__ranks">
            <b>1</b>
            <b>2</b>
            <b>3</b>
            <b>4</b>
          </span>
          <ol>
            <li>Sport poyabzal</li>
            <li>Yugurish krossovkasi</li>
            <li>Kedi klassik</li>
            <li className="is-me">
              Sizning krossovkangiz<em>▲ 3</em>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

// ───────── Integratsiya: marketpleyslar navbatma-navbat ulanadi ─────────
function Integratsiya() {
  const mps: Mp[] = ["uzum", "wildberries", "yandex", "ozon"];
  return (
    <div className="ac-v ac-v--connect">
      <div className="ac-v-hub">
        {mps.map((mp, i) => (
          <div key={mp} className="ac-v-conn" style={v({ "--i": i })}>
            <Logo mp={mp} size={30} />
            <span>
              <strong>{MP[mp]}</strong>
              <small>
                <span className="is-off">Ulanmagan</span>
                <span className="is-on">Ulangan · sinxron</span>
              </small>
            </span>
            <i className="ac-v-switch" />
          </div>
        ))}
      </div>
      <div className="ac-v-hub__core">
        <svg viewBox="0 7.97 33.8675 15.06" width="44" aria-hidden="true">
          <path
            fill="currentColor"
            d="M26.3414 7.97623H7.5261C3.37004 7.97623 0 11.3439 0 15.5C0 19.656 3.37004 23.0261 7.5261 23.0261H26.3414C30.4974 23.0261 33.8675 19.656 33.8675 15.5C33.8675 11.3439 30.4974 7.97388 26.3414 7.97388V7.97623ZM24.4587 20.2067C23.1031 20.2067 21.8841 19.6325 21.0251 18.7147C20.0131 17.6039 18.5564 16.9097 16.9349 16.9097C15.3134 16.9097 13.8543 17.6039 12.8424 18.717C11.9834 19.6325 10.7644 20.2067 9.4088 20.2067C6.81068 20.2067 4.7044 18.1005 4.7044 15.5023C4.7044 12.9042 6.81068 10.7979 9.4088 10.7979C10.7644 10.7979 11.9834 11.3722 12.8424 12.2876C13.8543 13.3984 15.3111 14.0927 16.9349 14.0927C18.5564 14.0927 20.0155 13.3984 21.0274 12.2853C21.8864 11.3698 23.1055 10.7956 24.461 10.7956C27.0591 10.7956 29.1654 12.9018 29.1654 15.5C29.1654 18.0981 27.0591 20.2044 24.461 20.2044L24.4587 20.2067Z"
          />
        </svg>
        <span>4 / 4 ulandi</span>
      </div>
    </div>
  );
}

// ───────── Muloqot: chat, yozilmoqda..., avtojavob, sharh ─────────
function Muloqot() {
  return (
    <div className="ac-v ac-v--chat">
      <Win title="Chat · Uzum Market">
        <div className="ac-v-chat">
          <div className="ac-v-msg ac-v-msg--in">
            Assalomu alaykum! 42 o‘lcham bormi?
            <small>Aziza · 10:24</small>
          </div>
          <div className="ac-v-typing">
            <i />
            <i />
            <i />
          </div>
          <div className="ac-v-msg ac-v-msg--out">
            Va alaykum assalom! Ha, 42 o‘lcham omborda bor, bugun jo‘natamiz.
            <small>Avtojavob · 10:24</small>
          </div>
        </div>
      </Win>
      <div className="ac-v-review">
        <span className="ac-v-review__stars">★★★★★</span>
        <p>“Tez yetkazishdi, rahmat!”</p>
        <small>
          <b>Avtojavob</b> · Fikringiz uchun rahmat!
        </small>
      </div>
    </div>
  );
}

// ───────── Boshqaruv: rollar va huquqlar jadvali ─────────
export function Boshqaruv() {
  const cols = ["Buyurtma", "Narx", "Analitika", "Hujjat"];
  const rows: [string, number[]][] = [
    ["Menejer", [1, 1, 1, 1]],
    ["Omborchi", [1, 0, 0, 1]],
    ["Operator", [1, 0, 0, 0]],
  ];
  return (
    <div className="ac-v ac-v--roles">
      <Win title="Xodimlar · Rollar" dark>
        <table className="ac-v-roles">
          <thead>
            <tr>
              <th>Rol</th>
              {cols.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([r, perms], ri) => (
              <tr key={r}>
                <td>{r}</td>
                {perms.map((p, ci) => (
                  <td key={ci}>
                    <i className={p ? "is-on" : "is-off"} style={v({ "--i": ri * 4 + ci })} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Win>
      <div className="ac-v-docs">
        {["Hisob-faktura №214", "Yetkazish dalolatnomasi", "Infografika · Oktabr"].map((d, i) => (
          <span key={d} style={v({ "--i": i })}>
            <i />
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

export const VISUALS: Record<TopicSlug, () => ReactNode> = {
  analitika: Analitika,
  buyurtmalar: Buyurtmalar,
  mahsulotlar: Mahsulotlar,
  ombor: Ombor,
  marketing: Marketing,
  integratsiya: Integratsiya,
  muloqot: Muloqot,
  boshqaruv: Boshqaruv,
};
