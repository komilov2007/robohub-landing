// [data-sr] elementlarini ekranga kirganda ko'rsatadigan skript — HTML versiyasidagining o'zi.
export function init() {
/* [data-sr] elementlari ekranga kirganda bir marta .is-in oladi (uslubi base.html da) */
(function () {
  "use strict";
  var els = document.querySelectorAll("[data-sr]");
  if (!("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("is-in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      io.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
  els.forEach(function (el) { io.observe(el); });
})();
}
