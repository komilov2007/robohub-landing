import { Fragment, type CSSProperties } from "react";

// Sariq "marker" — muhim so'zlar qo'lda chizilgandek belgilanadi (konsepsiyaning asosiy urg'usi).
// Har so'z alohida inline-block: ko'p qatorli sarlavhada ham to'g'ri chiziladi. Chizish faqat transform (scaleX).
//   view=false — sahifa ochilganda (hero); view=true — sarlavha ekranga kirganda (CSS scroll-driven, JS'siz).
// Sariq ustidagi matn doim to'q (--ac-ink) — sariq fonda oq matn ishlatilmaydi.
export default function Marker({ children, view = false, delay = 0 }: { children: string; view?: boolean; delay?: number }) {
  const words = children.split(" ").filter(Boolean);
  return (
    <span className={`ac-mk${view ? " ac-mk--view" : ""}`}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="ac-mk__w" style={{ "--mk-d": `${delay + i * 140}ms` } as CSSProperties}>
            {w}
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
