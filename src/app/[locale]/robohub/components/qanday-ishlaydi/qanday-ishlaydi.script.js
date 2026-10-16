// qanday-ishlaydi bo'limining brauzer mantig'i — HTML versiyasidagi <script> ning o'zi (o'zgarishsiz).
// qanday-ishlaydi-script.tsx uni sahifa ochilganda bir marta ishga tushiradi.
export function init() {
(function () {
  "use strict";

  var sec = document.getElementById("qanday-ishlaydi");
  var wave = document.getElementById("how-wave");
  if (!sec || !wave) return;

  var track = document.getElementById("how-track");
  var mainPath = document.getElementById("how-main"), optPath = document.getElementById("how-opt");
  var done = document.getElementById("how-done"), dot = document.getElementById("how-dot");
  var nodes = Array.prototype.slice.call(wave.querySelectorAll(".how__node"));
  var cards = Array.prototype.slice.call(sec.querySelectorAll(".how-card"));
  var wide = window.matchMedia("(min-width: 901px)");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canWatch = "IntersectionObserver" in window;

  var H = 150, Y_HI = 46, Y_LO = 104;   // to'lqin balandligi va bekatlarning ikki sathi
  var MOVE_MS = 850, STAY_MS = 950;     // bekatlar orasidagi yo'l va har bekatdagi to'xtash
  var len = 0, stops = [], pos = 0, stopMove = null, timer = 0, played = false;

  function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

  /* Karta ichidagi sonlar noldan sanab chiqadi (karta yonganda) */
  function countUp(card) {
    card.querySelectorAll("[data-count]").forEach(function (el) {
      var to = Number(el.dataset.count), start = performance.now();
      (function frame() {
        var p = Math.min(1, (performance.now() - start) / 1300);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(frame);
      })();
    });
  }
  function setOn(i, on) {
    if (cards[i].classList.contains("is-on") === on) return;
    cards[i].classList.toggle("is-on", on);
    nodes[i].classList.toggle("is-on", on);
    if (on && !reduced) countUp(cards[i]);
  }

  /* Egri chiziq haqiqiy kenglikdan hisoblanadi: har bekat o'z kartasi ustida turadi.
     Yo'l chap chetdan boshlanib 04-bekatda tugaydi. */
  function seg(a, b) {
    var mid = (a[0] + b[0]) / 2;
    return " C" + mid + " " + a[1] + "," + mid + " " + b[1] + "," + b[0] + " " + b[1];
  }
  function build() {
    var w = wave.clientWidth;
    wave.querySelectorAll("svg").forEach(function (s) { if (s.parentNode === wave) s.setAttribute("viewBox", "0 0 " + w + " " + H); });
    var pts = [[0, Y_LO]];
    cards.forEach(function (c, i) {
      pts.push([c.offsetLeft - cards[0].offsetLeft + c.offsetWidth / 2, i % 2 ? Y_LO : Y_HI]);
    });
    var M = function (p) { return "M" + p[0] + " " + p[1]; };
    var dMain = M(pts[0]) + seg(pts[0], pts[1]) + seg(pts[1], pts[2]) + seg(pts[2], pts[3]);
    var dOpt = M(pts[3]) + seg(pts[3], pts[4]);
    track.setAttribute("d", dMain + seg(pts[3], pts[4]));
    mainPath.setAttribute("d", dMain);
    optPath.setAttribute("d", dOpt);
    len = track.getTotalLength();

    /* har bekat yo'lning qaysi uzunligida turishini topish (x bo'yicha ikkiga bo'lib izlash) */
    stops = nodes.map(function (n, i) {
      var p = pts[i + 1], lo = 0, hi = len;
      for (var k = 0; k < 24; k++) {
        var m = (lo + hi) / 2;
        if (track.getPointAtLength(m).x < p[0]) lo = m; else hi = m;
      }
      n.style.transform = "translate(" + p[0] + "px," + p[1] + "px)";
      n.style.setProperty("--drop", (H - p[1] - 20 + 2) + "px");
      return i === nodes.length - 1 ? len : lo;
    });
  }

  /* Belgini yo'lning l uzunligidagi nuqtaga qo'yish; bosib o'tilgan qism shu yergacha ko'rinadi */
  function place(l) {
    pos = l;
    var at = track.getPointAtLength(l);
    dot.style.transform = "translate(" + at.x.toFixed(1) + "px," + at.y.toFixed(1) + "px)";
    done.style.setProperty("--bx", at.x.toFixed(1) + "px");
  }
  function moveTo(l, ms, then) {
    if (stopMove) stopMove();
    var from = pos, start = performance.now(), stopped = false;
    stopMove = function () { stopped = true; };
    (function frame() {
      if (stopped) return;
      var p = Math.min(1, (performance.now() - start) / ms);
      place(from + (l - from) * easeInOut(p));
      if (p < 1) requestAnimationFrame(frame); else if (then) then();
    })();
  }

  /* Ko'rsatuv: bekatma-bekat yuradi, har birida to'xtab kartani yoqadi */
  function play(i) {
    if (i >= stops.length) { played = true; sec.classList.add("is-done"); return; }
    moveTo(stops[i], i === 0 ? MOVE_MS * 0.8 : MOVE_MS, function () {
      setOn(i, true);
      timer = setTimeout(function () { play(i + 1); }, STAY_MS);
    });
  }

  function showAll() {
    cards.forEach(function (c, i) { setOn(i, true); });
    sec.classList.add("is-done");
    if (wide.matches) place(len);
  }

  // kartalar o'lchovi keyingi kadrda: hydration effekti ichida offsetLeft/clientWidth o'qish majburiy reflow beradi
  requestAnimationFrame(function () {
    if (wide.matches) { build(); place(0); }
    if (reduced || !canWatch) showAll();
  });

  if (reduced || !canWatch) return;   // tayyor holat: yo'l to'liq, hammasi yoniq

  sec.classList.add("is-live");

  /* Desktop: to'lqin ekranga kirganda bir marta o'ynaydi */
  var ioWave = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting || !wide.matches) return;
    ioWave.disconnect();
    timer = setTimeout(function () { play(0); }, 350);
  }, { threshold: 0.6 });
  ioWave.observe(wave);

  /* Telefon: to'lqin yo'q, har karta ekranga kirganda yonadi */
  var ioCards = new IntersectionObserver(function (entries) {
    if (wide.matches) return;
    entries.forEach(function (e) {
      if (e.isIntersecting) setOn(cards.indexOf(e.target), true);
    });
  }, { threshold: 0.55 });
  cards.forEach(function (c, i) {
    ioCards.observe(c);
    /* ko'rsatuv tugagach: kartaga borilsa belgi o'sha bekatga qaytadi */
    c.addEventListener("pointerenter", function () {
      if (played && wide.matches) moveTo(stops[i], 450);
    });
  });

  function relayout() {
    if (!wide.matches) return;
    var frac = len ? pos / len : 0;
    build();
    place(played ? Math.min(pos, len) : frac * len);
  }
  window.addEventListener("resize", relayout);
  wide.addEventListener("change", function () {
    /* kenglik rejimi almashsa: ko'rsatuv to'xtaydi va hammasi tayyor holatga o'tadi */
    clearTimeout(timer);
    if (stopMove) stopMove();
    played = true;
    if (wide.matches) build();
    showAll();
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
})();
}
