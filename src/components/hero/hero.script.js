// hero bo'limining brauzer mantig'i — HTML versiyasidagi <script> ning o'zi (o'zgarishsiz).
// hero-script.tsx uni sahifa ochilganda bir marta ishga tushiradi.
export function init() {
(function () {
  "use strict";

  var dash = document.getElementById("dash");
  if (!dash) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // statik maket qoladi

  function fmt(n, dec) {
    var p = n.toFixed(dec).split(".");
    return p[0].replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0") + (p[1] ? "," + p[1] : "");
  }
  var vals = Array.prototype.slice.call(dash.querySelectorAll(".kpi-c__v")).map(function (el) {
    var n = Number(el.dataset.n);
    return { el: el, n: n, suf: el.dataset.suf, dec: el.textContent.indexOf(",") > -1 ? 1 : 0, key: el.dataset.key };
  });
  function show(v, n) { v.el.textContent = fmt(n, v.dec) + v.suf; }

  /* ----- kirish: sonlar noldan sanab chiqadi ----- */
  var START = 1000, DUR = 1300, t0 = performance.now(), counting = true;
  vals.forEach(function (v) { show(v, 0); });
  (function frame() {
    var p = Math.min(1, Math.max(0, (performance.now() - t0 - START) / DUR));
    var e = 1 - Math.pow(1 - p, 3);
    vals.forEach(function (v) { show(v, v.n * e); });
    if (p < 1) requestAnimationFrame(frame); else counting = false;
  })();

  /* ----- jonli oqim: yangi buyurtma keladi — Yalpi GMV va buyurtmalar soni oshadi ----- */
  /* NAMUNA: shartli buyurtmalar (marketpleys va summa) */
  var ORDERS = [
    { mp: "Uzum", sum: 164000 }, { mp: "Wildberries", sum: 89000 }, { mp: "Ozon", sum: 347000 },
    { mp: "Yandex", sum: 189000 }, { mp: "Uzum", sum: 212000 }
  ];
  var syncIcons = Array.prototype.slice.call(document.querySelectorAll("#hero-sync i"));
  var gmv = vals.filter(function (v) { return v.key === "gmv"; })[0];
  var orders = vals.filter(function (v) { return v.key === "orders"; })[0];
  var step = 0, timer = 0, running = false, inView = false;

  function bump(v, add) {
    v.n += add;
    show(v, v.n);
    var card = v.el.parentNode;
    card.classList.remove("is-bump");
    void card.offsetWidth;            // animatsiyani qayta ishga tushirish
    card.classList.add("is-bump");
    setTimeout(function () { card.classList.remove("is-bump"); }, 900);
  }
  function tick() {
    if (!counting) {
      var o = ORDERS[step++ % ORDERS.length];
      bump(gmv, o.sum); bump(orders, 1);
      /* ramka tashqarisidagi kartada shu buyurtma kelgan marketpleys belgisi ajraladi */
      syncIcons.forEach(function (ic) {
        ic.classList.remove("is-hit");
        if (ic.dataset.mp === o.mp) { void ic.offsetWidth; ic.classList.add("is-hit"); }
      });
    }
    timer = setTimeout(tick, 2800);
  }
  function start() { if (!running) { running = true; timer = setTimeout(tick, 3400); } }
  function stop() { running = false; clearTimeout(timer); }

  /* Oqim faqat maket ekranda va tab ochiq bo'lganda ishlaydi */
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      if (inView && !document.hidden) start(); else stop();
    }, { threshold: 0.2 }).observe(dash);
  } else { inView = true; start(); }
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else if (inView) start();
  });
})();
}
