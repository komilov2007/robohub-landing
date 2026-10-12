// imkoniyatlar bo'limining brauzer mantig'i — HTML versiyasidagi <script> ning o'zi (o'zgarishsiz).
// imkoniyatlar-script.tsx uni sahifa ochilganda bir marta ishga tushiradi.
export function init() {
(function () {
  "use strict";

  var acc = document.getElementById("feat-acc");
  if (!acc) return;
  var cols = Array.prototype.slice.call(acc.querySelectorAll(".feat-col"));
  var core = acc.querySelector(".feat__core");
  var wires = acc.querySelector(".feat__wires");
  var wide = window.matchMedia("(min-width: 901px)");
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  var SVGNS = "http://www.w3.org/2000/svg";

  /* Avtomatik ko'rsatuv vaqtlari (ms). Karta ochiq turadigan vaqt CSS'da: feat-prog. */
  var FIRST_WAIT = 1500;   // kartalar joyiga o'tirgach, birinchi ochilishgacha
  var CUE_MS = 700;        // navbatdagi karta "men ochilaman" deb ajralib turadigan vaqt
  var GAP_MS = 450;        // karta yopilgach, umumiy ko'rinishda turadigan vaqt
  var IDLE_MS = 6000;      // foydalanuvchi o'zi yopsa, ko'rsatuv qancha kutib davom etadi
  var CLOSE_MS = 380;      // yopilish animatsiyasi (CSS feat-zoom-out bilan bir xil)

  /* Aksiyalar taqvimi: 28 kun, aksiya kunlari marketpleys rangida */
  var EVENTS = [
    { from: 3,  to: 6,  c: "var(--mp-uzum)" },
    { from: 11, to: 14, c: "var(--mp-wb)" },
    { from: 19, to: 23, c: "var(--mp-ozon)" }
  ];
  acc.querySelectorAll("[data-cal]").forEach(function (cal) {
    var n = 0;
    for (var d = 1; d <= 28; d++) {
      var cell = document.createElement("i");
      cell.textContent = d;
      for (var e = 0; e < EVENTS.length; e++) {
        if (d >= EVENTS[e].from && d <= EVENTS[e].to) {
          cell.style.setProperty("--c", EVENTS[e].c);
          cell.style.setProperty("--i", n++);
        }
      }
      cal.appendChild(cell);
    }
  });

  var cur = -2;            // -1: hech biri ochiq emas (kartalar sahnasi)
  var timer = 0, closeTimer = 0;
  var live = false;

  function auto() { return wide.matches && !reduced.matches; }

  /* Navbatdagi kartani ajratib ko'rsatish (-1 — hech birini) */
  function cue(g) {
    cols.forEach(function (c, i) { c.classList.toggle("is-cue", i === g); });
  }

  function setOpen(g) {
    cols.forEach(function (c, i) {
      var on = i === g;
      c.classList.remove("is-closing");
      c.classList.toggle("is-open", on);
      c.dataset.theme = on ? "dark" : "light";
      c.querySelector(".feat-col__tab").setAttribute("aria-expanded", String(on));
    });
    acc.classList.toggle("has-open", g >= 0);
  }

  /* g-kartani ochadi (-1 — yopadi). Ichi display:none → ko'rinadigan bo'lgani uchun
     plitkalardagi animatsiyalar va vaqt chizig'i har ochilganda boshidan o'ynaydi. */
  function open(g, fromCenter) {
    if (g === cur) return;
    clearTimeout(timer);
    clearTimeout(closeTimer);
    cue(-1);

    if (g >= 0 && wide.matches) {
      /* kattalashish nuqtasi: karta turgan joy (yoki "Keyingisi" bosilganda — markaz) */
      var col = cols[g];
      var ox = fromCenter ? 50 : (col.offsetLeft + col.offsetWidth / 2) / acc.clientWidth * 100;
      var oy = fromCenter ? 50 : (col.offsetTop + col.offsetHeight / 2) / acc.clientHeight * 100;
      col.style.setProperty("--ox", ox.toFixed(1) + "%");
      col.style.setProperty("--oy", oy.toFixed(1) + "%");
    }

    var prev = cur;
    cur = g;

    /* Desktopda yopilish: panel o'z kartasi turgan joyga kichrayib qaytadi,
       shu payt qolgan kartalar va markaz qayta ko'rinadi. */
    if (g === -1 && prev >= 0 && auto()) {
      var closing = cols[prev];
      closing.classList.add("is-closing");
      acc.classList.remove("has-open");
      closeTimer = setTimeout(function () { setOpen(-1); }, CLOSE_MS);
      return;
    }
    setOpen(g);
  }

  /* ----- avtomatik ko'rsatuv -----
     umumiy ko'rinish → navbatdagi karta ajraladi → ochiladi → vaqt chizig'i to'ladi
     → yopiladi → keyingisi … Sichqoncha qayerda turishidan qat'i nazar yuraveradi;
     faqat sahna ekrandan tashqarida bo'lsa qadam kutib turadi. */
  function later(fn, ms) {
    clearTimeout(timer);
    timer = setTimeout(function tick() {
      if (!auto()) return;
      if (!live) { timer = setTimeout(tick, 400); return; }
      fn();
    }, ms);
  }
  function tourTo(g, wait) {
    later(function () {
      if (cur >= 0) return;
      cue(g);
      later(function () { open(g); }, CUE_MS);
    }, wait);
  }

  cols.forEach(function (col, g) {
    var next = (g + 1) % cols.length;

    col.querySelector(".feat-col__tab").addEventListener("click", function () { open(g); });
    col.querySelector("[data-close]").addEventListener("click", function () {
      open(-1);
      col.querySelector(".feat-col__tab").focus({ preventScroll: true });
      tourTo(next, IDLE_MS);
    });
    col.querySelector("[data-next]").addEventListener("click", function () {
      open(next, true);
      cols[next].querySelector("[data-next]").focus({ preventScroll: true });
    });
    /* vaqt chizig'i to'ldi — yopiladi va navbat keyingi kartaga o'tadi */
    col.querySelector(".feat-col__prog").addEventListener("animationend", function () {
      if (!auto() || cur !== g) return;
      open(-1);
      tourTo(next, CLOSE_MS + GAP_MS);
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape" || !wide.matches || cur < 0) return;
    var g = cur;
    open(-1);
    tourTo((g + 1) % cols.length, IDLE_MS);
  });

  /* Markazdan har bir karta markaziga chiziq. offsetLeft/Top transform'ga bog'liq emas,
     shuning uchun kartalar tebranayotganda ham hisob to'g'ri chiqadi. */
  function draw() {
    wires.textContent = "";
    if (!wide.matches || cur >= 0) return;
    var cx = core.offsetLeft + core.offsetWidth / 2;
    var cy = core.offsetTop + core.offsetHeight / 2;
    cols.forEach(function (col) {
      var line = document.createElementNS(SVGNS, "line");
      line.setAttribute("x1", cx);
      line.setAttribute("y1", cy);
      line.setAttribute("x2", col.offsetLeft + col.offsetWidth / 2);
      line.setAttribute("y2", col.offsetTop + col.offsetHeight / 2);
      wires.appendChild(line);
    });
  }
  window.addEventListener("resize", draw);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);

  /* Desktopda dastlab hammasi yopiq (kartalar sahnasi), telefonda birinchi ustun ochiq */
  var entered = false;
  function setMode() {
    clearTimeout(timer);
    clearTimeout(closeTimer);
    cue(-1);
    cur = -2;
    setOpen(wide.matches ? -1 : 0);
    cur = wide.matches ? -1 : 0;
    acc.classList.toggle("is-auto", auto());
    draw();
    if (entered) tourTo(0, FIRST_WAIT);
  }
  wide.addEventListener("change", setMode);
  reduced.addEventListener("change", setMode);
  setMode();

  /* Sichqoncha ortidan siljish: -1 … 1 oralig'idagi ikki son, CSS chuqurlikka ko'paytiradi */
  acc.addEventListener("pointermove", function (e) {
    if (!fine.matches || reduced.matches || !wide.matches || cur >= 0) return;
    var r = acc.getBoundingClientRect();
    acc.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 2 - 1).toFixed(3));
    acc.style.setProperty("--my", ((e.clientY - r.top) / r.height * 2 - 1).toFixed(3));
  });
  acc.addEventListener("pointerleave", function () {
    acc.style.setProperty("--mx", "0");
    acc.style.setProperty("--my", "0");
  });

  /* Kirish: sahna ekranga kirganda kartalar markazdan uchib chiqadi (bir marta),
     keyin ko'rsatuv boshlanadi. is-live — sahna hozir ekrandami. */
  function enter() {
    entered = true;
    acc.classList.add("is-in");
    setTimeout(function () { acc.classList.add("is-ready"); }, 1800);   // navbat kechikishlari o'chadi
    tourTo(0, FIRST_WAIT);
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      live = entries[0].isIntersecting;
      acc.classList.toggle("is-live", live);
      if (live && !entered) enter();
    }, { threshold: 0.3 }).observe(acc);
  } else {
    live = true;
    acc.classList.add("is-live");
    enter();
  }
})();
}
