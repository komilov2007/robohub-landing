import type { CSSProperties, ReactNode } from "react";
import { TOPICS, type TopicSlug } from "../../../lib/academy";
import Icon from "../../../components/svg-icon/svg-icon";

// "Kabinet ichidan sayohat" sahnalari — Robohub kabinetining HTML/CSS bilan qayta yasalgan bo'laklari.
// Har mavzuning o'z sahnasi. Holat ikki o'qda:
//   phase — flow qadami (0, 1, 2) yoki 3 (hammasi tayyor): elementlar bosqichma-bosqich paydo bo'ladi;
//   focus — features ko'rsatilayotganda: data-r={i} qism sariq halqa bilan ajratiladi, qolganlari xiralashadi.
// Atributlar (academy.css → "SAHNALAR"): data-p="1|2" — shu bosqichdan boshlab ko'rinadi,
// data-x="1|2" — shu bosqichdan boshlab yo'qoladi. Hammasi illyustratsiya: aria-hidden, raqamlar namunaviy.
const v = (o: Record<string, string | number>) => o as CSSProperties;
const Logo = ({ mp, size = 18 }: { mp: string; size?: number }) => (
  <img src={`/marketplaces/${mp}.svg`} alt="" width={size} height={size} loading="lazy" />
);

// Bir joyda ikki holat: "a" — boshida, "b" — `at` bosqichidan boshlab
function Swap({ a, b, at }: { a: ReactNode; b: ReactNode; at: 1 | 2 }) {
  return (
    <span className="ac-swap">
      <span data-x={at}>{a}</span>
      <span data-p={at}>{b}</span>
    </span>
  );
}

// Kabinet ramkasi: chapda bo'limlar menyusi (faol bo'lim sariq), tepada sarlavha va qidiruv
function Kab({ slug, title, children }: { slug: TopicSlug; title: string; children: ReactNode }) {
  return (
    <div className="ac-kab">
      <div className="ac-kab__side">
        <span className="ac-kab__logo" />
        {TOPICS.map((t) => (
          <span key={t.slug} className={t.slug === slug ? "is-active" : undefined}>
            <Icon d={t.icon} size={14} />
          </span>
        ))}
      </div>
      <div className="ac-kab__main">
        <div className="ac-kab__top">
          <b>{title}</b>
          <span className="ac-kab__search" />
          <span className="ac-kab__avatar" />
        </div>
        <div className="ac-kab__body">{children}</div>
      </div>
    </div>
  );
}

// ───────── Analitika: ma'lumot keladi → xarajatlar kiritiladi → real foyda va TOP ─────────
function Analitika() {
  return (
    <Kab slug="analitika" title="Dashboard">
      <div className="sg-an">
        <div className="sg-an__kpis" data-r="0">
          <div>
            <small>Savdo</small>
            <b>124,6 mln</b>
          </div>
          <div>
            <small>Real foyda</small>
            <b>
              <Swap a="—" b="31,2 mln" at={2} />
            </b>
          </div>
          <div className="sg-an__mps">
            {["uzum", "wildberries", "yandex", "ozon"].map((m, i) => (
              <span key={m} style={v({ "--i": i })}>
                <Logo mp={m} size={16} />
              </span>
            ))}
          </div>
        </div>
        <div className="sg-an__cost" data-r="1" data-p="1">
          <small>Xarajatlar tarkibi</small>
          <div className="sg-an__stack">
            <i style={v({ "--w": "34%" })} />
            <i style={v({ "--w": "22%" })} />
            <i style={v({ "--w": "18%" })} />
            <i style={v({ "--w": "14%" })} />
          </div>
          <p>
            <span>Komissiya</span>
            <span>Logistika</span>
            <span>Reklama</span>
            <span>Tannarx</span>
          </p>
        </div>
        <div className="sg-an__row">
          <ol className="sg-an__top" data-r="2" data-p="2">
            <li>
              <b>1</b>Krossovka Air<em>+18%</em>
            </li>
            <li>
              <b>2</b>Sport ryukzak<em>+9%</em>
            </li>
            <li>
              <b>3</b>Kepka basic<em>+4%</em>
            </li>
          </ol>
          <div className="sg-an__abc" data-r="3" data-p="2">
            {["AX", "AY", "AZ", "BX", "BY", "BZ", "CX", "CY", "CZ"].map((c, i) => (
              <span key={c} className={i === 0 ? "is-hot" : undefined}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Kab>
  );
}

// ───────── Buyurtmalar: yangi buyurtma → ochib tekshirish → status ─────────
function Buyurtmalar() {
  const rows: [string, string, string, ReactNode][] = [
    ["uzum", "#1042", "Uzum Market", <Swap key="s" a={<em className="is-new">Yangi</em>} b={<em className="is-done">Yig‘ildi ✓</em>} at={2} />],
    ["wildberries", "#5531", "Wildberries", <em key="s" className="is-mid">Yig‘ilmoqda</em>],
    ["yandex", "#778", "Yandex Market", <em key="s" className="is-done">Yetkazildi</em>],
  ];
  return (
    <Kab slug="buyurtmalar" title="Buyurtmalar">
      <div className="sg-or">
        <ul className="sg-or__list">
          {rows.map(([mp, id, name, st], i) => (
            <li key={id} data-r={i} className={i === 0 ? "is-first" : undefined}>
              <Logo mp={mp} />
              <b>{id}</b>
              <span>{name}</span>
              {st}
            </li>
          ))}
        </ul>
        <div className="sg-or__detail" data-p="1">
          <b>#1042 · tekshirildi ✓</b>
          <span>2 ta mahsulot · 438 000 so‘m · Toshkent</span>
        </div>
        <div className="sg-or__fbo" data-r="3">
          <span>FBO ta’minlash</span>
          <b>48 dona → Uzum ombori</b>
        </div>
      </div>
    </Kab>
  );
}

// ───────── Mahsulotlar: tovar tanlanadi → narx o'zgaradi → marketpleysga yuboriladi ─────────
function Mahsulotlar() {
  return (
    <Kab slug="mahsulotlar" title="Mahsulotlar">
      <div className="sg-pr">
        <div className="sg-pr__card" data-r="0">
          <span className="sg-pr__img">
            <Icon d="M20 12l-8 8-9-9V3h8zM7 7h.01" size={30} />
          </span>
          <b>Krossovka Air Run</b>
          <small>SKU 10482 · 42 o‘lcham · Sport</small>
        </div>
        <div className="sg-pr__price" data-r="1">
          <small>Narx, so‘m</small>
          <b>
            <Swap a="320 000" b={<span className="is-new">299 000</span>} at={1} />
          </b>
        </div>
        <ul className="sg-pr__sync" data-p="2">
          {["uzum", "wildberries", "yandex", "ozon"].map((m, i) => (
            <li key={m} style={v({ "--i": i })}>
              <Logo mp={m} size={16} />
              yuborildi ✓
            </li>
          ))}
        </ul>
      </div>
    </Kab>
  );
}

// ───────── Ombor: omborlar → guruhlar → boshqarish va Missing ─────────
function Ombor() {
  const items: [string, string][] = [
    ["Uzum FBO", "Toshkent"],
    ["WB Koledino", "Rossiya"],
    ["Yandex Sofino", "Rossiya"],
    ["O‘z omborim", "Toshkent"],
  ];
  return (
    <Kab slug="ombor" title="Ombor">
      <div className="sg-wh">
        <ul className="sg-wh__list" data-r="0">
          {items.map(([name, g], i) => (
            <li key={name} style={v({ "--i": i })}>
              <i />
              {name}
              <Swap a={<em className="is-none">guruhsiz</em>} b={<em className={g === "Toshkent" ? "is-a" : "is-b"}>{g}</em>} at={1} />
            </li>
          ))}
        </ul>
        <div className="sg-wh__groups" data-r="1" data-p="1">
          <div>
            <small>Guruh</small>
            <b>Toshkent</b>
            <span>
              <Swap a="2 ombor" b="2 ombor · 1 240 dona" at={2} />
            </span>
          </div>
          <div>
            <small>Guruh</small>
            <b>Rossiya</b>
            <span>
              <Swap a="2 ombor" b="2 ombor · 860 dona" at={2} />
            </span>
          </div>
        </div>
        <div className="sg-wh__missing" data-r="2" data-p="2">
          <i />
          Missing: 3 ta mahsulot
        </div>
        <div className="sg-wh__fbo" data-r="3">
          FBO ta’minlash rejasi
        </div>
      </div>
    </Kab>
  );
}

// ───────── Marketing: bo'lim → taqvim va promokodlar → Boost TOP ─────────
function Marketing() {
  const promo = [3, 4, 5, 10, 11];
  return (
    <Kab slug="marketing" title="Marketing">
      <div className="sg-mk">
        <ul className="sg-mk__codes" data-r="0" data-p="1">
          <li>
            <b>SALE10</b>−10% <em>faol</em>
          </li>
          <li>
            <b>KUZ25</b>−25 000 <em>rejada</em>
          </li>
        </ul>
        <div className="sg-mk__cal" data-r="1" data-p="1">
          {Array.from({ length: 14 }, (_, i) => (
            <span key={i} className={promo.includes(i) ? "is-on" : undefined} style={v({ "--i": i })}>
              {i + 1}
            </span>
          ))}
        </div>
        <div className="sg-mk__boost" data-r="2" data-p="2">
          <small>Boost TOP · qidiruvdagi o‘rin</small>
          <ol>
            <li>Sport poyabzal</li>
            <li>Yugurish krossovkasi</li>
            <li className="is-me">
              Sizning krossovkangiz <em>▲</em>
            </li>
          </ol>
        </div>
      </div>
    </Kab>
  );
}

// ───────── Integratsiya: marketpleys tanlanadi → maydon to'ladi → "Ulandi" ─────────
function Integratsiya() {
  const mps: [string, string][] = [
    ["uzum", "Uzum Market"],
    ["wildberries", "Wildberries"],
    ["yandex", "Yandex Market"],
    ["ozon", "Ozon"],
  ];
  return (
    <Kab slug="integratsiya" title="Integratsiya">
      <div className="sg-in">
        <ul className="sg-in__grid">
          {mps.map(([m, name], i) => (
            <li key={m} data-r={i} className={i === 0 ? "is-picked" : undefined}>
              <Logo mp={m} size={26} />
              <b>{name}</b>
              {i === 0 ? <Swap a={<em>tanlandi</em>} b={<em className="is-ok">Ulandi ✓</em>} at={2} /> : <em>ulanmagan</em>}
            </li>
          ))}
        </ul>
        <div className="sg-in__form" data-p="1">
          <label>
            API kalit
            <span className="sg-in__field">
              <Swap a={<i className="sg-in__caret" />} b="••••••••••••3f9a" at={2} />
            </span>
          </label>
          <label>
            Do‘kon ID
            <span className="sg-in__field">48211</span>
          </label>
        </div>
      </div>
    </Kab>
  );
}

// ───────── Muloqot: mijoz yozadi → Robohub'da ko'rinadi → javob / avtojavob ─────────
function Muloqot() {
  return (
    <Kab slug="muloqot" title="Chat · Avtojavob">
      <div className="sg-ch">
        <div className="sg-ch__chat" data-r="0">
          <p className="sg-ch__in">
            42 o‘lcham bormi?<small>Aziza · Uzum Market</small>
          </p>
          <p className="sg-ch__seen" data-p="1">
            Robohub’da ko‘rindi ✓
          </p>
          <p className="sg-ch__out" data-p="2">
            Ha, omborda bor — bugun jo‘natamiz!
          </p>
        </div>
        <div className="sg-ch__review" data-r="1">
          <span>★★★★★</span>
          <b>“Tez yetkazishdi, rahmat!”</b>
          <p data-p="2">
            <em>Avtojavob</em> Fikringiz uchun rahmat!
          </p>
        </div>
      </div>
    </Kab>
  );
}

// ───────── Boshqaruv: rol yaratiladi → huquqlar → xodim shu rol bilan ishlaydi ─────────
function Boshqaruv() {
  const cols = ["Buyurtma", "Narx", "Analitika"];
  return (
    <Kab slug="boshqaruv" title="Xodimlar · Rollar">
      <div className="sg-ro">
        <table className="sg-ro__table" data-r="0">
          <thead>
            <tr>
              <th>Rol</th>
              {cols.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Menejer</td>
              <td>✓</td>
              <td>✓</td>
              <td>✓</td>
            </tr>
            <tr className="is-new">
              <td>Omborchi</td>
              <td>
                <i data-p="1" />
              </td>
              <td>—</td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
        <div className="sg-ro__staff" data-p="2">
          <span className="sg-ro__ava">DS</span>
          <b>Dilshod S.</b>
          <em>Omborchi</em>
        </div>
        <div className="sg-ro__row">
          <ul className="sg-ro__docs" data-r="1">
            <li>Hisob-faktura №214</li>
            <li>Dalolatnoma №88</li>
          </ul>
          <div className="sg-ro__info" data-r="2">
            {[42, 64, 50, 78, 90].map((h, i) => (
              <i key={i} style={v({ "--h": `${h}%` })} />
            ))}
          </div>
        </div>
      </div>
    </Kab>
  );
}

const SCENES: Record<TopicSlug, () => ReactNode> = {
  analitika: Analitika,
  buyurtmalar: Buyurtmalar,
  mahsulotlar: Mahsulotlar,
  ombor: Ombor,
  marketing: Marketing,
  integratsiya: Integratsiya,
  muloqot: Muloqot,
  boshqaruv: Boshqaruv,
};

// Sahna: phase (0..3) va focus (feature indeksi yoki -1) — CSS shu atributlarga qarab holatni chizadi
export default function Stage({ slug, phase, focus }: { slug: TopicSlug; phase: number; focus: number }) {
  const Scene = SCENES[slug];
  const cls = ["ac-sg", `ac-sg--${slug}`, phase >= 1 && "p1", phase >= 2 && "p2", focus >= 0 && "has-focus"]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls} data-focus={focus} aria-hidden="true">
      <Scene />
    </div>
  );
}
