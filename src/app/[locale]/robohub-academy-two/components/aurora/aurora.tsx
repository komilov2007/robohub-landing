// To'q hero foni (bosh sahifa va mavzu sahifasi): harakatlanuvchi aurora nurlari, oqib keluvchi to'r,
// kursor yorug'ligi (--mx/--my — ota .acx-hero[data-glow]'ga Fx yozadi) va yengil "don". Uslublar — motion.css.
export default function Aurora() {
  return (
    <div className="acx-hero__bg" aria-hidden="true">
      <span className="acx-aurora acx-aurora--1" />
      <span className="acx-aurora acx-aurora--2" />
      <span className="acx-aurora acx-aurora--3" />
      <span className="acx-floor" />
      <span className="acx-spot" />
      <span className="acx-noise" />
    </div>
  );
}
