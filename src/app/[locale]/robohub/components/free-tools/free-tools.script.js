// bepul-vositalar bo'limining brauzer mantig'i — HTML versiyasidagi <script> ning o'zi (o'zgarishsiz).
// free-tools-script.tsx uni sahifa ochilganda bir marta ishga tushiradi.
// t — joriy til: { currency, group, decimal } (free-tools.i18n.ts dagi script).
export function init(t) {
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canWatch = "IntersectionObserver" in window;
  function byId(id) { return document.getElementById(id); }
  function fmt(n) { return String(Math.round(Math.abs(n))).replace(/\B(?=(\d{3})+(?!\d))/g, t.group); }
  function pct(n) { return (n < 0 ? "−" : "") + (Math.round(Math.abs(n) * 10) / 10).toFixed(1).replace(".", t.decimal) + "%"; }
  function digits(s) { return Number(String(s).replace(/\D/g, "")) || 0; }
  function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

  /* Qiymatni vaqt bo'yicha o'zgartirish; qaytgan funksiya chaqirilsa to'xtaydi */
  function tween(from, to, ms, step, done) {
    var start = performance.now(), stopped = false;
    function frame() {
      if (stopped) return;
      var p = Math.min(1, (performance.now() - start) / ms);
      step(from + (to - from) * easeInOut(p));
      if (p < 1) requestAnimationFrame(frame); else if (done) done();
    }
    requestAnimationFrame(frame);
    return function () { stopped = true; };
  }
  /* Ekranga birinchi marta kirganda bir marta ishga tushirish */
  function onEnter(el, fn) {
    var io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      fn();
    }, { threshold: 0.3 });
    io.observe(el);
  }

  /* ============================================================
     1) KALKULYATOR
     ============================================================ */
  var COMMISSION = 0.15;    // NAMUNA: shartli komissiya, haqiqiy tarif emas
  var calc = byId("calc");
  var nameIn = byId("calc-name"), catBox = byId("calc-catbox");
  var costIn = byId("calc-cost"), priceIn = byId("calc-price");
  var costR = byId("calc-cost-r"), priceR = byId("calc-price-r");
  var FINAL = { name: nameIn.value, cost: digits(costIn.value), price: digits(priceIn.value) };

  function fill(input) {
    var p = (input.value - input.min) / (input.max - input.min) * 100;
    input.style.setProperty("--fill", Math.max(0, Math.min(100, p)).toFixed(1) + "%");
  }

  /* shown — katta sonda ko'rsatiladigan qiymat (sanab chiqish paytida haqiqiysidan farq qiladi) */
  function render(shown) {
    var p = digits(priceIn.value), c = digits(costIn.value);
    var fee = Math.round(p * COMMISSION), pay = p - fee, left = pay - c;
    var wait = calc.classList.contains("is-wait");
    if (shown === undefined) shown = left;

    byId("calc-left").textContent = wait ? "—" : (shown < 0 ? "−" : "") + fmt(shown);
    byId("calc-unit").hidden = wait;
    byId("calc-r-price").textContent = p ? fmt(p) + " " + t.currency : "—";
    byId("calc-r-fee").textContent = wait ? "—" : "− " + fmt(fee) + " " + t.currency;
    byId("calc-r-pay").textContent = wait ? "—" : fmt(pay) + " " + t.currency;
    byId("calc-r-cost").textContent = c ? "− " + fmt(c) + " " + t.currency : "—";
    byId("calc-margin").textContent = !wait && p ? pct(left / p * 100) : "—";
    byId("calc-roi").textContent = !wait && c ? pct(left / c * 100) : "—";
    calc.classList.toggle("is-loss", left < 0);
    calc.classList.toggle("is-long", String(Math.abs(left)).length > 7);

    /* chiziq: narxning qancha qismi komissiya, tannarx va foydaga ketadi */
    var bar = byId("calc-bar");
    bar.style.setProperty("--fee", fee);
    bar.style.setProperty("--cost", Math.max(Math.min(c, pay), 0));
    bar.style.setProperty("--left", Math.max(left, 0));

    costR.value = c; priceR.value = p;
    fill(costR); fill(priceR);
  }

  /* maydonga yozilganda: faqat raqamlar qoladi va mingliklarga ajratiladi */
  function bindMoney(input, range) {
    input.addEventListener("input", function () {
      var v = Math.min(digits(input.value), 9999999);
      input.value = v ? fmt(v) : "";
      render();
    });
    range.addEventListener("input", function () {
      input.value = fmt(range.value);
      render();
    });
  }
  bindMoney(costIn, costR);
  bindMoney(priceIn, priceR);
  render();

  /* ----- kirish namoyishi: forma o'zi to'ladi, keyin natija sanab chiqadi ----- */
  var demoTimers = [], demoOn = false, stopCount = null;

  function finishDemo() {
    if (!demoOn) return;
    demoOn = false;
    demoTimers.forEach(clearTimeout);
    if (stopCount) stopCount();
    /* namoyish yarim yo'lda to'xtasa ham forma to'liq holatga keladi */
    nameIn.value = FINAL.name;
    catBox.style.visibility = "";
    costIn.value = fmt(FINAL.cost);
    priceIn.value = fmt(FINAL.price);
    calc.classList.remove("is-wait");
    render();
  }

  function typeInto(input, text, at, every, after) {
    text.split("").forEach(function (ch, i) {
      demoTimers.push(setTimeout(function () {
        input.value += ch;
        if (after) after();
      }, at + i * every));
    });
    return at + text.length * every;
  }

  function runCalcDemo() {
    var t = 300;
    t = typeInto(nameIn, FINAL.name, t, 55);
    /* AI kategoriya tavsiya qiladi */
    demoTimers.push(setTimeout(function () { catBox.style.visibility = ""; }, t += 450));
    t = typeInto(costIn, fmt(FINAL.cost), t + 500, 70, render);
    t = typeInto(priceIn, fmt(FINAL.price), t + 300, 70, render);
    /* kategoriya va narxlar tayyor — natija ochiladi va sanab chiqadi */
    demoTimers.push(setTimeout(function () {
      calc.classList.remove("is-wait");
      calc.classList.add("is-fresh");
      var left = FINAL.price - Math.round(FINAL.price * COMMISSION) - FINAL.cost;
      stopCount = tween(0, left, 900, render, function () { demoOn = false; render(); });
    }, t + 350));
  }

  if (!reduced && canWatch) {
    /* boshlang'ich holat: bo'sh forma, natija o'rnida "—" va "Keyingi qadam" eslatmasi */
    demoOn = true;
    nameIn.value = ""; costIn.value = ""; priceIn.value = "";
    catBox.style.visibility = "hidden";
    calc.classList.add("is-wait");
    render();
    [nameIn, costIn, priceIn, costR, priceR].forEach(function (el) {
      el.addEventListener("pointerdown", finishDemo);
      el.addEventListener("focus", finishDemo);
    });
    onEnter(calc, runCalcDemo);
  }

  /* ============================================================
     2) AI INFOGRAFIKA
     ============================================================ */
  var cmp = byId("cmp"), range = byId("cmp-range"), result = byId("cmp-result"), count = byId("cmp-count");
  var ai = byId("ai"), timer = byId("cmp-timer");
  function setGen(on) { cmp.classList.toggle("is-gen", on); ai.classList.toggle("is-gen", on); }
  var styles = Array.prototype.slice.call(document.querySelectorAll(".ai__style"));
  var GEN_MS = 1500;       // "~30 soniya" shu vaqtda tez o'tkaziladi
  var CYCLE_MS = 5200;     // foydalanuvchi tegmaguncha uslublar o'zi almashadi
  var stopGen = null, stopWipe = null, genTimer = 0, cycleTimer = 0, touched = false, cur = 0;

  function setPos(v) { cmp.style.setProperty("--pos", v + "%"); range.value = v; }

  /* Uslubni "yaratish": sanoq → tayyor rasm chapdan o'ngga ochiladi */
  function generate(i, instant) {
    cur = i;
    styles.forEach(function (b, k) {
      b.classList.toggle("is-on", k === i);
      b.setAttribute("aria-pressed", String(k === i));
    });
    clearTimeout(genTimer);
    if (stopGen) stopGen();
    if (stopWipe) stopWipe();
    var src = styles[i].dataset.img;

    if (instant || reduced) {
      result.src = src;
      setGen(false);
      setPos(0);
      return;
    }
    setGen(true);
    setPos(100);                                   // natija yashirin, asl rasm ko'rinadi
    stopGen = tween(30, 0, GEN_MS, function (v) {
      count.textContent = Math.ceil(v);
      timer.style.setProperty("--g", (v / 30).toFixed(3));   // halqa: 1 → 0
    });
    genTimer = setTimeout(function () {
      result.src = src;
      setGen(false);
      stopWipe = tween(100, 0, 800, function (v) { setPos(v.toFixed(1)); });
    }, GEN_MS);
  }

  function schedule() {
    clearTimeout(cycleTimer);
    if (touched || reduced) return;
    cycleTimer = setTimeout(function () {
      generate((cur + 1) % styles.length);
      schedule();
    }, CYCLE_MS);
  }
  function touch() { touched = true; clearTimeout(cycleTimer); }

  styles.forEach(function (b, i) {
    new Image().src = b.dataset.img;               // oldindan yuklab qo'yish
    b.addEventListener("click", function () { touch(); generate(i); });
  });
  range.addEventListener("input", function () { cmp.style.setProperty("--pos", range.value + "%"); });
  range.addEventListener("pointerdown", function () { touch(); if (stopWipe) stopWipe(); });
  range.addEventListener("keydown", touch);

  setPos(0);
  if (!reduced && canWatch) {
    onEnter(cmp, function () {
      generate(0);
      schedule();
    });
  }
})();
}
