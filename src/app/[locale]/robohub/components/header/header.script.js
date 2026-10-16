// header bo'limining brauzer mantig'i — HTML versiyasidagi <script> ning o'zi (o'zgarishsiz).
// header-script.tsx uni sahifa ochilganda bir marta ishga tushiradi.
export function init() {
(function () {
  "use strict";

  var header = document.getElementById("header");

  /* Header ostidagi section mavzusini oladi: <section data-theme="dark"> ustiga
     chiqqanda header ham yashilga o'tadi. Section mavzuni scroll davomida
     o'zgartirmoqchi bo'lsa, data-header-theme yozadi. */
  function readTheme() {
    var probe = header.offsetHeight / 2;
    var secs = document.querySelectorAll("main > [data-theme]");
    var theme = "light";
    for (var i = 0; i < secs.length; i++) {
      var r = secs[i].getBoundingClientRect();
      if (r.top <= probe && r.bottom > probe) {
        theme = secs[i].dataset.headerTheme || secs[i].dataset.theme;
        break;
      }
    }
    return theme;
  }

  var ticking = false;
  /* Avval hamma o'lchovlar o'qiladi, keyin yoziladi — yozuvdan keyin o'qish majburiy reflow beradi */
  function frame() {
    ticking = false;
    var stuck = window.scrollY > 8, theme = readTheme();
    header.classList.toggle("is-stuck", stuck);
    if (header.dataset.theme !== theme) header.dataset.theme = theme;
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  /* HTML versiyasida bu yerda DOMContentLoaded kutilardi. Next.js da skript sahifa to'liq
     chizilgandan keyin ishlaydi (hodisa allaqachon o'tgan); birinchi o'lchov keyingi kadrga (rAF) qoldiriladi —
     hydration effektlari ichida layout o'qilmaydi. */
  onScroll();
  document.addEventListener("themechange", onScroll);     // section o'z mavzusini o'zgartirganda

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
