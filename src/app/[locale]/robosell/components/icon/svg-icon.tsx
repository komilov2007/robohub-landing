// Ikonkalar — haqiqiy mahsulotdagilar:
//   admin — rb-frontend/src/assets/icons (public/robosell/icons; MUI rang o'zgaruvchilari yorug' mavzu ranglariga almashtirilgan),
//   shop  — rb-shop/src/icons (public/robosell/shop-icons; React komponentlardan .svg ga o'tkazilgan, asosiy rang #0094FF).
// Ikonkalar o'zi chizilmaydi — faqat shu fayllar ishlatiladi.
type Props = {
  name: string;
  set?: "admin" | "shop";
  size?: number;
  w?: number;
  h?: number;
  className?: string;
  alt?: string;
};

export default function Icon({ name, set = "admin", size = 24, w, h, className, alt = "" }: Props) {
  return (
    <img
      src={`/robosell/${set === "admin" ? "icons" : "shop-icons"}/${name}.svg`}
      width={w ?? size}
      height={h ?? size}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      className={className}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}
