// muammo bo'limining brauzer mantig'i — HTML versiyasidagi <script> ning o'zi (o'zgarishsiz).
// muammo-script.tsx uni sahifa ochilganda bir marta ishga tushiradi.
export function init() {
(function () {
  "use strict";

  var sec = document.getElementById("muammo");
  var items = sec ? sec.querySelectorAll(".pain-item") : [];
  var arts = sec ? sec.querySelectorAll(".art") : [];
  if (!sec || !items.length) return;

  var wide = window.matchMedia("(min-width: 861px)");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  var pinned = false, active = -1, raf = 0;

  /* Scroll bo'ylab bosqichlar (section ichidagi yo'lning ulushi) */
  var STEP = 0.24;        // har bir muammoga ajratilgan yo'l
  var EXIT_FROM = 0.5;    // shu yo'lning qaysi qismidan boshlab karta uchib keta boshlaydi
  var FLOOD_FROM = 0.72, FLOOD_LEN = 0.2; // och yashil doira yoyilishi
  var MERGE_FROM = 0.82, MERGE_LEN = 0.14;

  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

  function setActive(idx) {
    if (idx === active) return;
    active = idx;
    items.forEach(function (li, i) {
      li.classList.toggle("is-active", i === idx);
      li.classList.toggle("is-past", i < idx);
    });
  }

  function update() {
    raf = 0;
    if (!pinned) return;
    var r = sec.getBoundingClientRect();
    var t = clamp(-r.top / (r.height - window.innerHeight));
    var flood = clamp((t - FLOOD_FROM) / FLOOD_LEN);

    /* pos — dastadagi joriy o'rin (0 … 2), kasr qismi keyingi kartaga o'tish jarayoni.
       Karta avval joyida turadi, yo'lning ikkinchi yarmida uchib ketadi. */
    var raw = Math.min(t / STEP, items.length - 1);
    var base = Math.floor(raw);
    var pos = base + ease(clamp((raw - base - EXIT_FROM) / (1 - EXIT_FROM)));

    setActive(Math.round(pos));
    arts.forEach(function (art, i) {
      var d = pos - i;
      if (d <= 0) {
        /* navbatdagi kartalar: ostida, kichikroq va xiraroq — chetlari ko'rinib turadi */
        var depth = -d;
        art.style.transform = "translate3d(0," + (depth * 30).toFixed(1) + "px,0) scale(" + (1 - depth * 0.07).toFixed(3) + ")";
        art.style.filter = "brightness(" + (1 - Math.min(depth, 2) * 0.24).toFixed(3) + ")";
        art.style.opacity = "1";
      } else {
        /* o'tgan karta: burilib yuqoriga chiqib ketadi */
        art.style.transform = "translate3d(0," + (-d * 125).toFixed(1) + "%,0) rotate(" + (-d * 10).toFixed(2) + "deg)";
        art.style.filter = "none";
        art.style.opacity = (1 - clamp((d - 0.7) / 0.3)).toFixed(3);   // ekrandan chiqqach butunlay yo'qoladi
      }
      art.style.zIndex = String(items.length - i);
    });
    sec.style.setProperty("--t-list", clamp(t / FLOOD_FROM).toFixed(3));
    sec.style.setProperty("--p-flood", ease(flood).toFixed(3));
    sec.style.setProperty("--p-merge", ease(clamp((t - MERGE_FROM) / MERGE_LEN)).toFixed(3));

    /* ekran och yashilga to'lganda header ham shu rangga o'tadi */
    var theme = flood > 0.5 ? "mint" : "";
    if ((sec.dataset.headerTheme || "") !== theme) {
      if (theme) sec.dataset.headerTheme = theme; else delete sec.dataset.headerTheme;
      document.dispatchEvent(new Event("themechange"));   // header darhol qayta o'qiydi
    }
  }
  function onScroll() { if (!raf) raf = requestAnimationFrame(update); }

  /* Sahna faqat keng ekranda va harakat yoqilgan bo'lsa ishlaydi */
  function setMode() {
    pinned = wide.matches && !reduced.matches;
    sec.classList.toggle("is-pinned", pinned);
    if (!pinned) {
      active = -1;
      items.forEach(function (li) { li.classList.remove("is-active", "is-past"); });
      arts.forEach(function (art) { art.style.transform = art.style.filter = art.style.opacity = art.style.zIndex = ""; });
      ["--t-list", "--p-flood", "--p-merge"].forEach(function (k) { sec.style.removeProperty(k); });
      delete sec.dataset.headerTheme;
      document.dispatchEvent(new Event("themechange"));
    }
    update();
  }

  wide.addEventListener("change", setMode);
  reduced.addEventListener("change", setMode);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  setMode();
})();
}
