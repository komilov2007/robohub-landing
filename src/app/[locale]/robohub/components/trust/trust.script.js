// Ishonch bo'limining brauzer mantig'i. trust-script.tsx uni sahifa ochilganda ishga tushiradi.
// Kartalardagi sonlar (1 000+, 100 000+, 700 000+) karta birinchi marta ekranga kirganda noldan "teriladi".
// Ming ajratuvchisi asl matndan olinadi (uz/ru — uzilmas bo'shliq, en — vergul), shuning uchun har tilda o'z ko'rinishi.
// JS ishlamasa yoki harakat kamaytirilgan bo'lsa — serverdagi yakuniy son o'zgarmay turadi.
// Logotiplar devoridagi xira parda teshigi kursorga ergashadi (veil).
// Tozalash funksiyasini qaytaradi.
export function init() {
  var stopCopies = copies();
  var stopVeil = veil();
  var stopCount = count();
  return function () { stopCopies(); stopVeil(); stopCount(); };
}

// Logotiplar lentasi: serverda har qator bitta nusxada keladi (trust.tsx). Devor ekranga kirganda qatorlar
// --n nusxagacha to'ldiriladi va shundan keyingina aylana boshlaydi (.trust__wall.is-full, robohub.css).
// Bitta nusxa har qanday ekrandan uzun — to'ldirilguncha ham bo'sh joy ko'rinmaydi.
function copies() {
  var wall = document.querySelector("#trust .trust__wall");
  if (!wall) return function () {};
  var added = [];
  function fill() {
    wall.querySelectorAll(".trust__row").forEach(function (row) {
      var track = row.querySelector(".trust__track");
      var n = Number(getComputedStyle(row).getPropertyValue("--n")) || 1;
      var items = Array.prototype.slice.call(track.children);
      var frag = document.createDocumentFragment();
      for (var k = 1; k < n; k++) {
        items.forEach(function (li) {
          var c = li.cloneNode(true);
          added.push(c);
          frag.appendChild(c);
        });
      }
      track.appendChild(frag);
    });
    start();
    wall.classList.add("is-full");
  }
  // Qator boshi (asosiy brendlar, companies.ts → TOP) birinchi ko'rinsin: animatsiya shunday fazadan boshlanadiki,
  // qator boshi matn ustunining o'ng chetida turadi (telefonda — devorning chap chetiga yaqin).
  function start() {
    var w = wall.getBoundingClientRect();
    var x = w.width * 0.1;
    if (getComputedStyle(wall).position === "absolute") {
      var right = 0;
      document.querySelectorAll("#trust .trust__head, #trust .trust__stats").forEach(function (el) {
        right = Math.max(right, el.getBoundingClientRect().right);
      });
      x = right - w.left + 48;
    }
    wall.querySelectorAll(".trust__row").forEach(function (row, i) {
      var track = row.querySelector(".trust__track");
      var n = Number(getComputedStyle(row).getPropertyValue("--n")) || 1;
      var dur = parseFloat(getComputedStyle(row).getPropertyValue("--dur")) || 60;
      var W = track.scrollWidth / n;
      if (!W) return;
      var p = (x % W) / W;
      // juft qatorlar (2, 4, 6) teskari yo'nalishda aylanadi
      track.style.animationDelay = -(i % 2 ? p : 1 - p) * dur + "s";
    });
  }
  var io = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) return;
    io.disconnect();
    fill();
  });
  io.observe(wall);
  return function () {
    io.disconnect();
    wall.classList.remove("is-full");
    wall.querySelectorAll(".trust__track").forEach(function (t) { t.style.animationDelay = ""; });
    added.forEach(function (c) { c.remove(); });
    added = [];
  };
}

// Parda teshigi kursorga ergashadi: --mx/--my devorga nisbatan (px). Faqat sichqonchali qurilmalarda.
function veil() {
  var section = document.getElementById("trust");
  var wall = section && section.querySelector(".trust__wall");
  var el = wall && wall.querySelector(".trust__veil");
  if (!el || !matchMedia("(hover: hover)").matches) return function () {};
  var x = 0, y = 0, raf = 0;
  function paint() {
    raf = 0;
    var r = wall.getBoundingClientRect();
    el.style.setProperty("--mx", x - r.left + "px");
    el.style.setProperty("--my", y - r.top + "px");
  }
  function move(e) {
    x = e.clientX; y = e.clientY;
    if (!raf) raf = requestAnimationFrame(paint);
  }
  function leave() {
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    el.style.removeProperty("--mx");
    el.style.removeProperty("--my");
  }
  section.addEventListener("pointermove", move);
  section.addEventListener("pointerleave", leave);
  return function () {
    section.removeEventListener("pointermove", move);
    section.removeEventListener("pointerleave", leave);
    leave();
  };
}

function count() {
  var els = document.querySelectorAll("#trust [data-count]");
  if (!els.length || !("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return function () {};
  }
  var DUR = 1600, STEP = 120;   // sanash davomiyligi va kartalar orasidagi kechikish, ms
  var raf = [], timers = [];

  function parse(el) {
    var text = el.textContent, sep = (text.match(/\D/) || [""])[0];
    return { to: Number(text.replace(/\D/g, "")), sep: sep, text: text };
  }
  function fmt(n, sep) {
    var s = String(n);
    return sep ? s.replace(/\B(?=(\d{3})+(?!\d))/g, sep) : s;
  }
  function run(el, k) {
    var d = el._count;
    timers.push(setTimeout(function () {
      var start = performance.now();
      (function frame(now) {
        var p = Math.min(1, (now - start) / DUR);
        el.textContent = p < 1 ? fmt(Math.round(d.to * (1 - Math.pow(1 - p, 4))), d.sep) : d.text;
        if (p < 1) raf[k] = requestAnimationFrame(frame);
      })(start);
    }, k * STEP));
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      run(e.target, Number(e.target.dataset.k));
    });
  }, { threshold: 0.6 });

  els.forEach(function (el, k) {
    el._count = parse(el);
    el.dataset.k = k;
    el.textContent = "0";
    io.observe(el);
  });

  return function cleanup() {
    io.disconnect();
    raf.forEach(cancelAnimationFrame);
    timers.forEach(clearTimeout);
    els.forEach(function (el) { if (el._count) el.textContent = el._count.text; });
  };
}
