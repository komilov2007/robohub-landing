// Ishonch bo'limining brauzer mantig'i. trust-script.tsx uni sahifa ochilganda ishga tushiradi.
// Kartalardagi sonlar (1 000+, 100 000+, 700 000+) karta birinchi marta ekranga kirganda noldan "teriladi".
// Ming ajratuvchisi asl matndan olinadi (uz/ru — uzilmas bo'shliq, en — vergul), shuning uchun har tilda o'z ko'rinishi.
// JS ishlamasa yoki harakat kamaytirilgan bo'lsa — serverdagi yakuniy son o'zgarmay turadi.
// Tozalash funksiyasini qaytaradi.
export function init() {
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
