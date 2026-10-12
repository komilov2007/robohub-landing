// header bo'limining brauzer mantig'i — HTML versiyasidagi <script> ning o'zi (o'zgarishsiz).
// header-script.tsx uni sahifa ochilganda bir marta ishga tushiradi.
export function init() {
(function () {
  "use strict";

  var header = document.getElementById("header");

  /* Header ostidagi section mavzusini oladi: <section data-theme="dark"> ustiga
     chiqqanda header ham yashilga o'tadi. Section mavzuni scroll davomida
     o'zgartirmoqchi bo'lsa, data-header-theme yozadi. */
  function syncTheme() {
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
    if (header.dataset.theme !== theme) header.dataset.theme = theme;
  }

  var ticking = false;
  function frame() {
    ticking = false;
    header.classList.toggle("is-stuck", window.scrollY > 8);
    syncTheme();
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  /* HTML versiyasida bu yerda DOMContentLoaded kutilardi. Next.js da skript sahifa to'liq
     chizilgandan keyin ishlaydi (hodisa allaqachon o'tgan), shuning uchun to'g'ridan-to'g'ri chaqiriladi. */
  frame();
  document.addEventListener("themechange", onScroll);     // section o'z mavzusini o'zgartirganda

  var burger = document.getElementById("burger");
  var menu = document.getElementById("mobile-menu");
  function setMenu(open) {
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Menyuni yopish" : "Menyuni ochish");
    menu.classList.toggle("is-open", open);
  }
  burger.addEventListener("click", function () { setMenu(burger.getAttribute("aria-expanded") !== "true"); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  var langBtns = document.querySelectorAll(".lang__btn");
  langBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      langBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
    });
  });
})();
}
