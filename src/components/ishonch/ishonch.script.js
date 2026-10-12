// ishonch bo'limining brauzer mantig'i — HTML versiyasidagi <script> ning o'zi (o'zgarishsiz).
// ishonch-script.tsx uni sahifa ochilganda bir marta ishga tushiradi.
export function init() {
(function () {
  "use strict";

  /* Lenta (kompaniyalar ro'yxati) endi ishonch.tsx da JSX bilan chiziladi; ma'lumot companies.ts da. */

  /* ---------- natija raqamlari ekranga kirganda noldan sanab chiqadi ---------- */
  var stats = document.getElementById("trust-stats");
  if (!stats || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
  var nums = Array.prototype.slice.call(stats.querySelectorAll("b"));
  nums.forEach(function (b) { b.textContent = b.dataset.pre + "0" + b.dataset.suf; });
  var io = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) return;
    io.disconnect();
    var start = performance.now();
    (function frame() {
      var p = Math.min(1, (performance.now() - start) / 1300), e = 1 - Math.pow(1 - p, 3);
      nums.forEach(function (b) { b.textContent = b.dataset.pre + Math.round(b.dataset.to * e) + b.dataset.suf; });
      if (p < 1) requestAnimationFrame(frame);
    })();
  }, { threshold: 0.6 });
  io.observe(stats);
})();
}
