import type { CSSProperties } from "react";

// Sotuvchilar sharhlari. Matnlar Robohub'ning avvalgi landingidan olingan.
const REVIEWS = [
  {
    tag: "joʻnatish 75% tezroq",
    title: "Toʻrt marketpleysni yarim kunda uladik — va nihoyat barcha buyurtmalarni bitta lentada koʻramiz.",
    text: "Ilgari toʻrtta kabinet bilan ovora boʻlib, doim ortiqcha sotardik. Endi buyurtmalar bitta lentaga keladi, etiketkalar toʻplab chop etiladi, joʻnatish esa ancha tezlashdi. Ulanish yarim kun oldi.",
    who: "Elektronika va gadjetlar sotuvchisi",
    meta: "4 ta marketpleys · 2023-yildan beri",
  },
  {
    tag: "marja +32%",
    title: "Birinchi marta har bir mahsuldagi haqiqiy foydani koʻryapman — komissiya va logistikadan keyin.",
    text: "Moliyaviy tahlil komissiya, logistika va reklamani oʻzi hisobga oladi. Sezdirmay zarar keltirayotgan mahsulotlarni olib tashladim va sof marja oshdi. Birinchi haftadayoq oʻzini qopladi.",
    who: "Kosmetika va goʻzallik sotuvchisi",
    meta: "Uzum va Wildberries · 2022-yildan beri",
  },
  {
    tag: "bekor qilishlar −90%",
    title: "Qoldiqlar barcha doʻkonlarda sinxron, shuning uchun bekor qilishlar deyarli nolga tushdi.",
    text: "Robohub Uzum, Yandex Market, Wildberries va Ozon’da qoldiqlarni bir vaqtda aniq saqlaydi. Yoʻq narsani sotishni toʻxtatdik va endi u butun bek-ofisimizni yuritadi.",
    who: "Uy-roʻzgʻor buyumlari sotuvchisi",
    meta: "3 ta marketpleys · 2021-yildan beri",
  },
  {
    tag: "haftasiga 12 soat tejaldi",
    title: "Narx va kartochkalarni barcha marketpleyslarda ommaviy tahrirlash jamoamga haftasiga bir kun tejaydi.",
    text: "Avval kabinetlar oʻrtasida soatlab nusxa koʻchirardik, endi bu bitta harakat. Narx, qoldiq va kartochkalar hamma joyda birdan yangilanadi — jamoaning katalogni oʻstirishga vaqti qoldi.",
    who: "Bolalar tovarlari sotuvchisi",
    meta: "4 ta marketpleys · 2023-yildan beri",
  },
  {
    tag: "4 marketpleys, 1 oyna",
    title: "Buyurtma, yetkazib berish va moliya endi bitta oynada.",
    text: "Bitta marketpleysdan toʻrttagacha kengaydik, yangi xodim olmasdan. Dashboard nima sotilayotgani va nima qotib qolganini koʻrsatadi, shuning uchun xarid qarorlari aniq.",
    who: "Avto ehtiyot qismlar sotuvchisi",
    meta: "4 ta marketpleys · 2022-yildan beri",
  },
  {
    tag: "takroriy buyurtmalar ×2",
    title: "Sharhlarga darhol javob va oʻsha kuni joʻnatish kartochkalarimizni qidiruvda yuqoriga koʻtardi.",
    text: "Mijozlarga avtomatik javob beramiz, buyurtmalar oʻsha kuni joʻnaydi. Reytinglar oshdi, kartochkalar yuqoriroq chiqadi, takroriy buyurtmalar uch oyda ikki baravar oshdi. Qoʻllab-quvvatlash ham zoʻr.",
    who: "Oziq-ovqat va eko mahsulot sotuvchisi",
    meta: "Yandex Market va Uzum · 2024-yildan beri",
  },
];

// Lenta uzluksiz aylanishi uchun ro'yxat to'rt marta chiziladi va chorak (-25%) ga suriladi.
const COPIES = 4;

export default function Sharhlar() {
  return (
    <section className="revs" id="sharhlar" data-theme="dark" aria-labelledby="revs-title">
      <div className="container">
        <p className="revs__eyebrow" data-sr="">Sharhlar</p>
        {/* Sarlavhalarda (Unbounded) oʻ/gʻ uchun ‘ belgisi ishlatiladi */}
        <h2 className="revs__title" id="revs-title" data-sr="" style={{ "--d": "80ms" } as CSSProperties}>
          Bizga ishonmang — <span className="accent">sotuvchilarni tinglang</span>
        </h2>
        <p className="revs__lead" data-sr="" style={{ "--d": "140ms" } as CSSProperties}>
          Sotuvchilar Robohubga oʻtgach nimalar oʻzgargani haqida: tezroq joʻnatish, kamroq bekor qilish va nihoyat koʻrinadigan foyda.
        </p>
      </div>

      <div className="revs__row">
        <div className="revs__track">
          {Array.from({ length: COPIES }, (_, copy) =>
            REVIEWS.map((r, i) => (
              // birinchi nusxadan keyingilari takror — ekran o'quvchilardan yashiriladi
              <div className="revs__cell" key={copy + "-" + i} aria-hidden={copy > 0 ? true : undefined}>
                <article className="rev">
                  <span className="rev__tag">{r.tag}</span>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                  <div className="rev__who">
                    <i aria-hidden="true">{r.who[0]}</i>
                    <span>
                      <b>{r.who}</b>
                      <span>{r.meta}</span>
                    </span>
                  </div>
                </article>
              </div>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
