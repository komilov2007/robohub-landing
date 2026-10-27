// tariflar bo'limining brauzer mantig'i — HTML versiyasidagi <script> ning o'zi (o'zgarishsiz).
// pricing-script.tsx uni sahifa ochilganda bir marta ishga tushiradi.
// t — joriy tildagi matnlar: sep (minglik ajratgich), cur (valyuta qo'shimchasi), terms[i].text/save.
export function init(t) {
(function () {
  "use strict";

  var plan = document.getElementById("plan"), group = document.getElementById("terms");
  if (!plan || !group) return;

  var BASE = 500000;      // oylik narx, so'm
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function fmt(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, t.sep); }
  function byId(id) { return document.getElementById(id); }

  /* ---------- hisoblagich: har raqam uchun 0–9 ustuni ---------- */
  var odo = byId("plan-odo"), cols = [];
  (function buildOdo() {
    var text = fmt(BASE);
    odo.textContent = "";
    text.split("").forEach(function (ch) {
      if (!/\d/.test(ch)) { var gap = document.createElement("span"); gap.className = "odo__gap"; if (!/\s/.test(ch)) gap.textContent = ch; /* en: vergul koʻrinadi */ odo.appendChild(gap); return; }
      var d = document.createElement("span"), strip = document.createElement("i");
      d.className = "odo__d";
      for (var n = 0; n <= 9; n++) { var s = document.createElement("span"); s.textContent = n; strip.appendChild(s); }
      strip.style.setProperty("--v", ch);
      d.appendChild(strip);
      odo.appendChild(d);
      cols.push(strip);
    });
  })();
  function setOdo(value) {
    var digits = String(value).split("");                 // narx doim olti xonali
    cols.forEach(function (strip, i) { strip.style.setProperty("--v", digits[i] || 0); });
    odo.setAttribute("aria-label", fmt(value));
  }

  /* Sonni eski qiymatdan yangisiga sanab o'tkazish */
  var shown = {};
  function countTo(el, to, suffix) {
    var from = shown[el.id] || 0, start = performance.now();
    shown[el.id] = to;
    if (reduced || from === to) { el.textContent = fmt(to) + suffix; return; }
    (function frame() {
      if (shown[el.id] !== to) return;                    // yangi tanlov eskisini to'xtatadi
      var p = Math.min(1, (performance.now() - start) / 550);
      el.textContent = fmt(from + (to - from) * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    })();
  }

  /* ---------- muddat tanlash ---------- */
  var terms = Array.prototype.slice.call(group.querySelectorAll(".plan__term"));
  var ind = group.querySelector(".plan__ind");
  var was = byId("plan-was"), save = byId("plan-save"), saveBox = byId("plan-save-box"), total = byId("plan-total");

  function choose(i) {
    var btn = terms[i];
    var n = Number(btn.dataset.months), off = Number(btn.dataset.off);
    var monthly = BASE * (100 - off) / 100;

    terms.forEach(function (b, k) {
      b.setAttribute("aria-checked", String(k === i));
      b.tabIndex = k === i ? 0 : -1;
    });
    ind.style.setProperty("--at", i);
    setOdo(monthly);
    was.classList.toggle("is-off", off === 0);
    byId("plan-term-text").textContent = t.terms[i].text;
    byId("plan-save-text").textContent = t.terms[i].save;
    countTo(total, monthly * n, t.cur);

    var saved = (BASE - monthly) * n;
    byId("plan-sums").classList.toggle("is-none", !saved);
    if (saved) {
      countTo(save, saved, t.cur);
      if (!reduced) {
        saveBox.classList.remove("is-bump");
        void saveBox.offsetWidth;                         // animatsiyani qayta ishga tushirish
        saveBox.classList.add("is-bump");
      }
    } else {
      shown[save.id] = 0;
      save.textContent = "";
    }
  }

  terms.forEach(function (b, i) {
    b.addEventListener("click", function () { choose(i); });
    /* radio guruhidagidek: strelkalar bilan almashtirish */
    b.addEventListener("keydown", function (e) {
      var step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
      if (!step) return;
      e.preventDefault();
      var k = (i + step + terms.length) % terms.length;
      choose(k);
      terms[k].focus();
    });
  });

  shown[total.id] = BASE * 3;     // boshlang'ich qiymat sahifada yozilgan — noldan sanamaslik uchun
  choose(0);

  /* "Tarifga nimalar kiradi": guruh ochilganda ro'yxat o'sha guruhga aylanadi (sahifa emas, faqat ro'yxat) */
  var list = plan.querySelector(".plan__list");
  if (list) list.addEventListener("toggle", function (e) {
    var d = e.target;
    if (!d.open) return;
    var top = d.getBoundingClientRect().top - list.getBoundingClientRect().top + list.scrollTop - 4;
    list.scrollTo({ top: top, behavior: reduced ? "auto" : "smooth" });
  }, true);

  /* "Nimalar kiradi" bandlari karta ekranga kirganda navbat bilan belgilanadi */
  if (!("IntersectionObserver" in window)) { plan.classList.add("is-in"); return; }
  var io = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) return;
    io.disconnect();
    plan.classList.add("is-in");
  }, { threshold: 0.35 });
  io.observe(plan);
})();
}
