// header bo'limining brauzer mantig'i — HTML versiyasidagi <script> ning o'zi (o'zgarishsiz).
// header-script.tsx uni sahifa ochilganda bir marta ishga tushiradi.
export function init() {
(function () {
  "use strict";

  var header = document.getElementById("header");

  /* Header ostidagi section mavzusini oladi: <section data-theme="dark"> ustiga
     chiqqanda header ham yashilga o'tadi. Section mavzuni scroll davomida
     o'zgartirmoqchi bo'lsa, data-header-theme yozadi. */
  var cur = null;                       // header ostidagi section (oxirgi o'lchovdan)
  function findSection() {
    var probe = header.offsetHeight / 2;
    var secs = document.querySelectorAll("main > [data-theme]");
    for (var i = 0; i < secs.length; i++) {
      var r = secs[i].getBoundingClientRect();
      if (r.top <= probe && r.bottom > probe) return secs[i];
    }
    return null;
  }
  function themeOf(sec) { return sec ? sec.dataset.headerTheme || sec.dataset.theme : "light"; }

  /* O'qish va yozish ajratilgan: o'lchov layout toza paytda olinadi (scroll hodisasi, ResizeObserver),
     klass/atribut esa keyingi kadrda (rAF) yoziladi — yozuvdan keyin o'qish majburiy reflow bermaydi. */
  var stuck = false, ticking = false;
  function frame() {
    ticking = false;
    header.classList.toggle("is-stuck", stuck);
    var theme = themeOf(cur);
    if (header.dataset.theme !== theme) header.dataset.theme = theme;
  }
  function apply() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  function measure() {
    stuck = window.scrollY > 8;
    cur = findSection();
    apply();
  }
  window.addEventListener("scroll", measure, { passive: true });
  /* HTML versiyasida bu yerda DOMContentLoaded kutilardi. Next.js da skript gidratatsiyadan keyin ishlaydi:
     birinchi o'lchov ResizeObserver'da (observe'dan keyin, layout tayyor bo'lganda) olinadi; u oyna kengligi
     o'zgarganda ham chaqiriladi. Faqat balandlik o'zgarsa — resize hodisasidan keyingi kadrda o'lchanadi. */
  var ro = new ResizeObserver(measure);
  ro.observe(header);
  window.addEventListener("resize", function () { requestAnimationFrame(measure); });
  // section o'z mavzusini o'zgartirganda (muammo) — section o'sha, faqat datasetini qayta o'qish yetarli
  document.addEventListener("themechange", apply);

  var burger = document.getElementById("burger");
  var menu = document.getElementById("mobile-menu");
  function setMenu(open) {
    burger.setAttribute("aria-expanded", String(open));
    // yozuvlar joriy tilda — header.tsx data-label-* atributlarida
    burger.setAttribute("aria-label", open ? burger.dataset.labelClose : burger.dataset.labelOpen);
    menu.classList.toggle("is-open", open);
  }
  burger.addEventListener("click", function () { setMenu(burger.getAttribute("aria-expanded") !== "true"); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

})();
}
