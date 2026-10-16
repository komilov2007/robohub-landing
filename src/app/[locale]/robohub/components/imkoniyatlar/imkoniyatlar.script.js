// Imkoniyatlar bo'limining brauzer mantig'i: 18 ta vosita kartasi va matnini chizadi,
// skrollga qarab ularni yoy bo'ylab joylashtiradi. imkoniyatlar-script.tsx uni sahifa ochilganda bir marta ishga tushiradi.
// NAMUNA MA'LUMOT: kartalardagi son va nomlar shartli.
// msg — joriy tildagi matnlar (imkoniyatlar.i18n.ts → script): nomlar, izohlar, karta yozuvlari, tugma matnlari.
// Tozalash funksiyasini qaytaradi (hodisalarni uzadi, chizilgan karta va matnlarni olib tashlaydi).
export function init(msg) {
return (function () {
  var MP = { u: "/marketplaces/uzum.svg", w: "/marketplaces/wildberries.svg", o: "/marketplaces/ozon.svg", y: "/marketplaces/yandex.svg" };
  var mp = function (k) { return '<img class="mp" src="' + MP[k] + '" alt="">'; };
  var SPARK = '<svg class="spark" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.9 5.6a3 3 0 0 0 1.9 1.9L21.4 11.4a.6.6 0 0 1 0 1.2l-5.6 1.9a3 3 0 0 0-1.9 1.9L12 22l-1.9-5.6a3 3 0 0 0-1.9-1.9L2.6 12.6a.6.6 0 0 1 0-1.2l5.6-1.9a3 3 0 0 0 1.9-1.9L12 2z"/></svg>';
  var row = function (inner, cls) { return '<div class="row' + (cls ? " " + cls : "") + '">' + inner + "</div>"; };
  var bar = function (w, warn) { return '<div class="bar"><i style="--w:' + w + "%" + (warn ? ";--c:#FACF00" : "") + '"></i></div>'; };
  var cal = function () { var s = ""; for (var i = 1; i <= 28; i++) s += '<i class="' + (i >= 3 && i <= 6 ? "a" : i >= 11 && i <= 14 ? "b" : i >= 19 && i <= 23 ? "c" : "") + '"></i>'; return s; };
  var stars = function (n) { return '<b class="stars">' + "★★★★★".slice(0, n) + (n < 5 ? "<s>" + "★★★★★".slice(n) + "</s>" : "") + "</b>"; };
  // sonni joriy til ajratuvchisi bilan guruhlaydi: 1000000 → "1 000 000" (uz/ru) · "1,000,000" (en)
  var group = function (v) { return String(v).replace(/\B(?=(\d{3})+$)/g, msg.sep); };

  var CATS = msg.cats;

  // c — toifa (1..5), r — tanasi yonma-yon, v(s) — karta ichi (s — shu vositaning msg.tools[i].v yozuvlari).
  // Nom, izoh, kichik yozuv, xulosa va bandlar — msg.tools[i] dan.
  var TOOLS = [
    { c: 1,
      v: function (s) { return '<div class="kpis"><div class="kpi"><span class="cap">' + s[0] + '</span><b data-n="128">128</b></div><div class="kpi"><span class="cap">' + s[1] + "</span><b>" + s[2] + '</b></div><div class="kpi"><span class="cap">' + s[3] + '</span><b data-n="2314">' + group(2314) + '</b></div></div><div class="bars"><i style="--h:38%"></i><i style="--h:52%"></i><i style="--h:46%"></i><i style="--h:66%"></i><i style="--h:60%"></i><i style="--h:84%"></i><i style="--h:100%"></i></div>'; } },
    { c: 1,
      v: function (s) { return row(mp("u") + "<span>" + s[0] + '</span><b class="tag">' + s[1] + "</b>") + row(mp("w") + "<span>" + s[2] + '</span><b class="tag tag--warn">' + s[3] + "</b>") + row(mp("o") + "<span>" + s[4] + '</span><b class="tag tag--soft">' + s[5] + "</b>"); } },
    { c: 1,
      v: function (s) { return row("<span>" + s[0] + "</span><em>" + s[1] + "</em>" + bar(18, 1) + '<b class="tag">' + s[2] + "</b>") + row("<span>" + s[3] + "</span><em>" + s[4] + "</em>" + bar(40, 1) + '<b class="tag">' + s[5] + "</b>") + row("<span>" + s[6] + "</span><em>" + s[7] + "</em>" + bar(78) + '<b class="tag tag--soft">' + s[8] + "</b>"); } },

    { c: 2,
      v: function (s) { return '<div class="line"><span>' + s[0] + "</span>" + bar(100) + "<b>" + group(1000000) + "</b></div>" + '<div class="line"><span>' + s[1] + "</span>" + bar(40, 1) + "<b>−" + group(400000) + "</b></div>" + '<div class="line"><span>' + s[2] + "</span>" + bar(18, 1) + "<b>−" + group(180000) + "</b></div>" + '<div class="line"><span>' + s[3] + "</span>" + bar(9, 1) + "<b>−" + group(90000) + "</b></div>" + '<div class="line"><span>' + s[4] + "</span>" + bar(7, 1) + "<b>−" + group(70000) + "</b></div>" + '<div class="line line--sum"><span>' + s[5] + "</span>" + bar(26) + "<b data-n='260000'>" + group(260000) + "</b></div>"; } },
    { c: 2, r: 1,
      v: function (s) { return '<div class="ring"><b><em data-n="148" data-suf="%">148%</em></b></div><div class="col"><div class="line"><span>' + s[0] + '</span><b style="flex:1">' + group(500000) + "</b></div>" + bar(40, 1) + '<div class="line"><span>' + s[1] + '</span><b style="flex:1">' + group(1240000) + "</b></div>" + bar(100) + "</div>"; } },
    { c: 2,
      v: function () { return '<div class="mx"><span></span><span>X</span><span>Y</span><span>Z</span><span>A</span><b class="is-top">24</b><b class="is-mid">11</b><b>6</b><span>B</span><b class="is-mid">18</b><b>15</b><b>9</b><span>C</span><b>12</b><b>20</b><b class="is-bad">31</b></div>'; } },
    { c: 2,
      v: function (s) { return row(SPARK + "<span>" + s[0] + "</span>") + row(SPARK + "<span>" + s[1] + "</span>") + row(SPARK + "<span>" + s[2] + "</span>"); } },

    { c: 3, r: 1,
      v: function (s) { return '<div style="flex:none;text-align:center"><span class="cap">' + s[0] + '</span><b class="big" style="display:block;margin-top:.1em">24</b></div><div class="col">' + row(mp("u") + '<span>Uzum</span><b>24</b><b class="tag">✓</b>') + row(mp("w") + '<span>Wildberries</span><b>24</b><b class="tag">✓</b>') + row(mp("o") + '<span>Ozon</span><b>24</b><b class="tag">✓</b>') + row(mp("y") + '<span>Yandex Market</span><b>24</b><b class="tag">✓</b>') + "</div>"; } },
    { c: 3,
      v: function (s) { return '<div class="grid2">' + row(mp("u") + "<span>" + s[0] + "</span>") + row(mp("w") + "<span>" + s[1] + "</span>") + row(mp("o") + "<span>" + s[2] + "</span>") + row(mp("y") + "<span>" + s[3] + "</span>") + "</div>" + row("<span>" + s[4] + "</span><b>" + s[5] + '</b><b class="tag">' + s[6] + "</b>", "is-me"); } },
    { c: 3,
      v: function (s) { return row('<i class="file">XLS</i><span>' + s[0] + "</span>" + bar(100) + '<b class="tag">' + s[1] + "</b>") + row("<span>" + s[2] + "</span><em>" + s[3] + "</em><b>120</b>") + row("<span>" + s[4] + "</span><em>" + s[5] + "</em><b>60</b>"); } },
    { c: 3, r: 1,
      v: function (s) { return '<div style="flex:none;text-align:center"><b class="big" data-n="5">5</b><span class="cap" style="display:block;margin-top:.3em">' + s[0] + '</span></div><div class="col">' + row(mp("w") + "<span>" + s[1] + '</span><b class="tag tag--warn">−2</b>') + row(mp("o") + "<span>" + s[2] + '</span><b class="tag tag--warn">−1</b>') + row(mp("u") + "<span>" + s[3] + '</span><b class="tag tag--warn">−2</b>') + "</div>"; } },

    { c: 4,
      v: function (s) { return row("<span>" + s[0] + "</span><b>" + s[1] + '</b><b class="tag">' + s[2] + "</b>") + '<div><span class="cap">' + s[3] + '</span><div class="slider"></div></div>' + row("<span>" + s[4] + '</span><b class="tag">3</b>'); } },
    { c: 4,
      v: function (s) { return '<div class="ticket"><code>' + s[0] + "</code><span>" + s[1] + '</span><b>−10%</b></div><div class="ticket"><code>' + s[2] + "</code><span>" + s[3] + '</span><b>−15%</b></div><div class="ticket"><code>' + s[4] + "</code><span>" + s[5] + "</span><b>−5%</b></div>"; } },
    { c: 4,
      v: function (s) { return '<div class="cal">' + cal() + "</div>" + row(mp("u") + "<span>" + s[0] + "</span><em>3–6</em>") + row(mp("w") + "<span>" + s[1] + "</span><em>11–14</em>") + row(mp("o") + "<span>" + s[2] + "</span><em>19–23</em>"); } },
    { c: 4,
      v: function (s) { return row("<span>" + s[0] + '</span><b class="tag">' + s[1] + "</b>", "is-me rank-me") + row("<span>" + s[2] + "</span>", "is-dim rank-o") + row("<span>" + s[2] + "</span>", "is-dim rank-o"); } },

    { c: 5,
      v: function (s) { return '<div class="msg">' + mp("u") + s[0] + '</div><div class="msg msg--me">' + s[1] + '</div><div class="msg">' + mp("w") + s[2] + "</div>"; } },
    { c: 5,
      v: function (s) { return row(mp("u") + stars(5) + "<span>" + s[0] + "</span>") + row(mp("o") + stars(4) + "<span>" + s[1] + "</span>") + row(mp("w") + stars(2) + "<span>" + s[2] + "</span>"); } },
    { c: 5,
      v: function (s) { return row(stars(5) + "<span>" + s[0] + '</span><i class="sw"></i>') + row(stars(3) + "<span>" + s[1] + '</span><i class="sw"></i>') + row(stars(1) + "<span>" + s[2] + '</span><i class="sw"></i>'); } }
  ];
  // x(s) — karta tanasiga qo'shimcha (s — o'sha vositaning yozuvlari, TOOLS dagi v(s) bilan bir xil)
  var MORE = [
    { x: function () { return '<div class="legend"><span>' + mp("u") + "42%</span><span>" + mp("w") + "27%</span><span>" + mp("o") + "19%</span><span>" + mp("y") + "12%</span></div>"; } },
    { x: function (s) { return row(mp("y") + "<span>" + s[6] + '</span><b class="tag tag--soft">' + s[7] + "</b>"); } },
    { x: function (s) { return row("<span>" + s[9] + "</span><em>" + s[10] + "</em>" + bar(100) + '<b class="tag tag--soft">' + s[11] + "</b>"); } },
    {},
    {},
    {},
    { x: function (s) { return row(SPARK + "<span>" + s[3] + "</span>"); } },
    {},
    {},
    { x: function (s) { return row("<span>" + s[6] + "</span><em>" + s[7] + "</em><b>35</b>"); } },
    {},
    { x: function (s) { return row("<span>" + s[5] + "</span><b>" + s[6] + "</b>"); } },
    {},
    {},
    { x: function (s) { return row("<span>" + s[2] + "</span>", "is-dim rank-o"); } },
    { x: function (s) { return '<div class="msg msg--me">' + s[3] + "</div>"; } },
    { x: function (s) { return row(mp("y") + stars(5) + "<span>" + s[3] + "</span>"); } },
    { x: function (s) { return row(stars(4) + "<span>" + s[3] + '</span><i class="sw"></i>'); } }
  ];
  var N = TOOLS.length;
  var CARD_BG = { 1: "#07605A", 2: "#F5F1E7", 3: "#063B38", 4: "#E3ECE7", 5: "#12665A" };

  if (!document.querySelector(".feat .feat__stage")) return function () {};
  var sec = document.querySelector(".feat"), stage = sec.querySelector(".feat__stage");
  var intro = sec.querySelector(".feat__intro"), rim = sec.querySelector(".feat__rim");
  var hud = sec.querySelector(".feat__hud"), hudN = hud.querySelector(".feat-hud__count b"), hudCat = hud.querySelector(".feat-hud__cat");
  var hudRing = hud.querySelector(".feat-hud__ring .p"), hudDots = hud.querySelectorAll(".feat-hud__dots i");
  var pad = function (n) { return (n < 10 ? "0" : "") + n; };

  var items = TOOLS.map(function (t, i) {
    var card = document.createElement("div");
    card.className = "feat-card"; card.dataset.c = t.c; card.setAttribute("aria-hidden", "true");
    card.style.setProperty("--card", CARD_BG[t.c]);
    var L = msg.tools[i], s = L.v;   // shu vositaning joriy tildagi matnlari
    card.innerHTML = '<div class="fd"><div class="fd__h"><span>' + L.n + "</span><em>" + L.m + '</em></div><div class="fd__b' + (t.r ? " fd__b--row" : "") + '">' + t.v(s) + (MORE[i].x ? MORE[i].x(s) : "") + '</div><div class="fd__f">' + L.f + "</div></div>";
    var text = document.createElement("article");
    text.className = "feat-text";
    text.innerHTML = '<span class="feat-text__n">' + pad(i + 1) + "</span><h3>" + L.n + "</h3><p>" + L.t + "</p><ul>" + L.b.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>";
    // ketma-ket chiqadigan mayda elementlar uchun tartib raqami
    [".mx b", ".cal i", ".bars i"].forEach(function (q) { [].forEach.call(card.querySelectorAll(q), function (el, j) { el.style.setProperty("--j", j); }); });
    stage.appendChild(card); stage.appendChild(text);
    return { card: card, text: text, on: false, act: false };
  });

  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  // geometriya (layout() hisoblaydi): CW×CH — karta o'lchami
  var W, H, mobile, CW, CH, R, cxL, cxR, cy, step, lead, tail = 0.55, per, span;
  // mobil: TH — matn blokining eng katta balandligi (karta ostida), topLim — hisoblagich (HUD) osti
  var TH = 210, topLim = 0, GAP = 16;

  // mobil: hamma matnlarni berilgan kenglikda o'lchab, eng balandini qaytaradi
  // avval hamma kengliklar yoziladi, keyin balandliklar o'qiladi — har element uchun alohida reflow bo'lmaydi
  function textMax(w) {
    var m = 0;
    items.forEach(function (it) { it.text.style.width = w + "px"; });
    items.forEach(function (it) { m = Math.max(m, it.text.offsetHeight); });
    return m;
  }

  function layout() {
    W = stage.clientWidth; H = stage.clientHeight; mobile = W < 820; cy = H / 2;
    if (mobile) {
      // karta + matn bloki HUD osti va "o'tkazib yuborish" tugmasi orasiga sig'ishi kerak:
      // past ekranlarda karta kichrayadi (ichidagilar cqw bilan birga kichrayadi)
      topLim = hud.offsetTop + hud.offsetHeight + 14;
      var botLim = H - 78, room = botLim - topLim;
      CW = Math.min(W - 48, 330);
      for (var k = 0; k < 2; k++) {
        TH = textMax(CW);
        if (Math.round(CW * 0.84) + GAP + TH <= room) break;
        CW = Math.max(250, Math.floor((room - GAP - TH) / 0.84));
      }
      TH = textMax(CW); CH = Math.round(CW * 0.84);
      R = H * 2.4; cxL = W / 2 + 6 - R; cxR = 0;
      cy = topLim + room / 2;               // to'xtagan blok bo'sh joy o'rtasida turadi
      step = (CH + GAP + TH + 40) / R;      // karta + ostidagi matn bloki + oraliq
      per = H * 0.52;
    } else {
      CW = clamp(W * 0.235, 290, 370); CH = Math.round(CW * 0.84);
      R = clamp(Math.max(W * 0.34, H * 0.52), 380, 720);
      cxL = W * 0.475 - CW / 2 - R;         // kartaning o'ng cheti ekranning ~47% ida
      cxR = W * 0.535 + R;                  // matnlar yoyi ~53% ida
      step = (CH * 1.1) / R;                // kartalar orasida kichik oraliq
      per = H * 0.42;
      rim.style.width = rim.style.height = 2 * R + "px";
      rim.style.transform = "translate(" + (cxL - R) + "px," + (cy - R) + "px)";
    }
    // birinchi karta ekran pastidan tashqarida boshlanadi
    lead = Math.min(2.6, Math.asin(Math.min(1, (H - cy + CH) / R)) / step);
    span = lead + (N - 1) + tail;
    sec.style.height = Math.round(H + span * per) + "px";
    items.forEach(function (it) {
      it.card.style.width = CW + "px"; it.card.style.height = CH + "px";
      if (!mobile) it.text.style.width = "";
    });
  }

  // karta faollashganda sonlar 0 dan sanab chiqadi
  function count(card) {
    [].forEach.call(card.querySelectorAll("[data-n]"), function (el) {
      var to = +el.dataset.n, suf = el.dataset.suf || "", t0 = performance.now(), dur = 1100;
      el._run = t0;
      (function step(now) {
        if (el._run !== t0) return;
        var q = clamp((now - t0 - 150) / dur, 0, 1), e = 1 - Math.pow(1 - q, 3);
        el.textContent = group(Math.round(to * e)) + suf;
        if (q < 1) requestAnimationFrame(step);
      })(t0);
    });
  }
  function setActive(it, on) {
    if (on === it.act) return;
    it.act = on; it.card.classList.toggle("is-on", on);
    if (on && !reduce) count(it.card);
  }

  var cur = -1, target = 0, lastIdx = -1, raf = 0;

  function render(p) {
    var t = -lead + p * span;               // "hozirgi" element indeksi (kasr)
    // kirish sarlavhasi: birinchi karta yaqinlashganda erib, tepaga ketadi
    // 1-vosita markazga kelguncha to'liq yo'qoladi (orqasida xira qolib ketmaydi)
    var io = clamp(Math.min(1 - (t + lead - 0.2) / 1.1, -t / 0.6), 0, 1);
    intro.style.opacity = io; intro.style.transform = "translateY(" + (io - 1) * 60 + "px)";
    intro.style.visibility = io ? "visible" : "hidden";
    hud.classList.toggle("is-off", t < -1.3);

    for (var i = 0; i < N; i++) {
      var it = items[i], a = (i - t) * step;
      var vis = Math.abs(a) < 1.75;
      if (vis !== it.on) { it.on = vis; it.card.style.visibility = it.text.style.visibility = vis ? "visible" : "hidden"; }
      if (!vis) { setActive(it, false); continue; }
      var k = clamp(1 - Math.abs(i - t), 0, 1);              // 1 = aynan markazda
      if (k > 0.55) setActive(it, true); else if (k < 0.12) setActive(it, false);
      var y = cy + R * Math.sin(a), cos = Math.cos(a);
      var edge = Math.abs(y - H / 2) / (H / 2);              // 0 markaz · 1 ekran cheti
      var blur = clamp((edge - 0.72) * 20, 0, 8);
      var f = blur > 0.2 ? "blur(" + blur.toFixed(1) + "px)" : "none";
      var dx = cxL + R * cos, show = cos > 0;                // g'ildirakning orqa tomoni ko'rinmaydi
      it.card.style.filter = it.text.style.filter = f;
      it.card.style.zIndex = Math.round(20 - edge * 10);       // markazga yaqin karta ustda turadi
      if (mobile) {
        var top = y - (CH + GAP + TH) / 2;
        it.card.style.transform = "translate(" + (dx - CW / 2).toFixed(1) + "px," + top.toFixed(1) + "px)";
        it.text.style.transform = "translate(" + (dx - CW / 2 + 4).toFixed(1) + "px," + (top + CH + GAP).toFixed(1) + "px)";
        // tepada (hisoblagich ostida) karta va matn erib ketadi
        var fade = clamp((top + CH * 0.6 - topLim) / (H * 0.13), 0, 1);
        it.card.style.opacity = show ? ((0.55 + 0.45 * k) * fade).toFixed(3) : 0;
        it.text.style.opacity = show ? ((0.3 + 0.7 * k) * fade).toFixed(3) : 0;
        continue;
      } else {
        it.card.style.transform = "translate(" + (dx - CW / 2).toFixed(1) + "px," + (y - CH / 2).toFixed(1) + "px) scale(" + (0.9 + 0.12 * k).toFixed(3) + ")";
        it.text.style.transform = "translate(" + (cxR - R * cos).toFixed(1) + "px," + y.toFixed(1) + "px) translateY(-50%)";
        it.card.style.opacity = show ? 1 : 0;
      }
      it.text.style.opacity = show ? (0.3 + 0.7 * k).toFixed(3) : 0;
    }

    var idx = clamp(Math.round(t), 0, N - 1);
    if (idx !== lastIdx) {
      var c = TOOLS[idx].c;
      hudN.textContent = pad(idx + 1);
      if (lastIdx < 0 || TOOLS[lastIdx].c !== c) hudCat.innerHTML = "<span>" + pad(c) + " · " + CATS[c - 1] + "</span>";
      for (var j = 0; j < hudDots.length; j++) hudDots[j].classList.toggle("is-on", j === c - 1);
      lastIdx = idx;
    }
    hudRing.style.strokeDashoffset = 301.6 * (1 - clamp(t / (N - 1), 0, 1));
  }

  // "o'tkazib yuborish" tugmasi: sahna qotib turganda ko'rinadi, yo'nalishi oxirgi skrollga qarab o'zgaradi
  var skip = sec.querySelector(".feat__skip"), skipText = skip ? skip.querySelector("span") : null, skipArrow = skip ? skip.querySelector("i") : null;
  var lastY = 0, dir = "down";             // lastY birinchi o'lchovda (ResizeObserver) o'qiladi
  function setDir(d) {
    if (d === dir || !skip) return;
    dir = d; skip.dataset.dir = d;
    skipText.textContent = d === "down" ? msg.skipDown : msg.skipUp;
    skipArrow.textContent = d === "down" ? "↓" : "↑";
  }
  function onSkip() {
    var top = sec.getBoundingClientRect().top + window.scrollY;
    // pastga: keyingi bo'lim boshiga · tepaga: bu sahna boshlanishidan bir ekran oldinga
    var to = dir === "down" ? top + sec.offsetHeight - 40 : top - window.innerHeight;
    window.scrollTo({ top: Math.max(0, to), behavior: reduce ? "auto" : "smooth" });
  }
  if (skip) skip.addEventListener("click", onSkip);

  // Qadamli skroll: sahna qotib turganda g'ildirak / klaviatura / svayp bir harakatda faqat bitta vositaga o'tkazadi.
  // Sahifa darhol kerakli joyga sakraydi, ko'rinadigan silliq harakatni tick() dagi yumshoq ergashish beradi.
  // 1-vositadan tepaga va 18-vositadan pastga oddiy skroll ishlaydi.
  var LOCK = 650, QUIET = 160, lockUntil = 0, lastWheel = 0;
  function pinned(r) { return r.top <= 2 && r.bottom >= H - 2; }
  // dir (+1/−1) yo'nalishidagi keyingi vosita indeksi; sahna qotmagan yoki chetga yetgan bo'lsa null
  function nextIdx(dir) {
    var r = sec.getBoundingClientRect(), room = r.height - H;
    if (room <= 0 || !pinned(r)) return null;
    var t = -lead + clamp(-r.top / room, 0, 1) * span;
    var i = dir > 0 ? Math.max(0, Math.ceil(t + 0.05)) : Math.floor(t - 0.05);
    return i < 0 || i > N - 1 ? null : i;
  }
  function goTo(i) {
    var room = sec.offsetHeight - H, top = sec.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.round(top + ((i + lead) / span) * room), behavior: "instant" });
    lockUntil = performance.now() + LOCK;
  }
  // qulf: animatsiya tugaguncha va g'ildirak (tachpad inersiyasi ham) to'xtaguncha yangi qadam yo'q
  function locked(now) { return now < lockUntil || now - lastWheel < QUIET; }

  // Tez skroll bloklanmaydi: uzluksiz bitta harakat (hodisalar orasi BURST ms dan kam) yo'li FAST px dan oshsa —
  // "erkin" rejim, brauzer oddiy skroll qiladi; g'ildirak SETTLE ms to'xtagach sahna eng yaqin vositaga ohista o'rnashadi.
  // 2–3 "chiq" tez aylantirilsa ham bitta qadam bo'lib qoladi, undan ko'pi — erkin.
  var BURST = 150, FAST = 400, SETTLE = 380, run = 0, free = false, settleT = 0;
  function speed(now, d) {
    run = now - lastWheel < BURST ? run + d : d;
    return run;
  }
  function settle() {
    free = false; run = 0;
    var r = sec.getBoundingClientRect(), room = r.height - H;
    if (room <= 0 || !pinned(r)) return;
    var t = -lead + clamp(-r.top / room, 0, 1) * span, i = Math.round(t);
    if (i >= 0 && i <= N - 1 && Math.abs(t - i) > 0.02) goTo(i);
  }
  function armSettle() { clearTimeout(settleT); settleT = setTimeout(settle, SETTLE); }

  function onWheel(e) {
    if (e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX) || !e.deltaY) return;
    var now = performance.now(), busy = locked(now);
    var d = Math.abs(e.deltaY) * (e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? H : 1);   // qatorlar/sahifalar → px
    if (speed(now, d) > FAST) free = true;
    lastWheel = now;
    if (free) { armSettle(); return; }                    // tez skroll — brauzerning o'zi aylantiradi
    if (busy) { if (pinned(sec.getBoundingClientRect())) e.preventDefault(); return; }
    var i = nextIdx(e.deltaY > 0 ? 1 : -1);
    if (i === null) return;
    e.preventDefault(); goTo(i);
  }
  var KEYS = { ArrowDown: 1, PageDown: 1, " ": 1, ArrowUp: -1, PageUp: -1 };
  function onKey(e) {
    var d = KEYS[e.key];
    if (!d || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.target.closest && e.target.closest("input,textarea,select,button,[contenteditable]")) return;
    if (e.key === " " && e.shiftKey) d = -1;
    var r = sec.getBoundingClientRect();
    if (locked(performance.now())) { if (pinned(r)) e.preventDefault(); return; }
    var i = nextIdx(d);
    if (i === null) return;
    e.preventDefault(); goTo(i);
  }
  // svayp: barmoq 8px siljigach qaror qilinadi — sahnada bo'lsa brauzer skrolli to'xtatiladi,
  // barmoq 30px dan ko'p surilgan bo'lsa qo'yib yuborilganda bitta vositaga o'tiladi;
  // tez svayp (FLICK px/ms dan tez) esa tezligiga qarab bir nechta vositadan sakrab o'tadi
  var ty = 0, tdy = 0, tMode = "", tT0 = 0, FLICK = 0.9;   // "" — hali noma'lum · "free" — oddiy skroll · "hold" — qulf · "step" — qadam
  var tIdx = -1;
  function onTouchStart(e) { ty = e.touches[0].clientY; tdy = 0; tMode = ""; tT0 = performance.now(); }
  function onTouchMove(e) {
    tdy = ty - e.touches[0].clientY;
    if (!tMode && Math.abs(tdy) > 8) {
      if (locked(performance.now()) && pinned(sec.getBoundingClientRect())) tMode = "hold";
      else { tIdx = nextIdx(tdy > 0 ? 1 : -1); tMode = tIdx === null ? "free" : "step"; }
    }
    if (tMode === "hold" || tMode === "step") e.preventDefault();
  }
  function onTouchEnd() {
    if (tMode === "step" && Math.abs(tdy) > 30) {
      var v = Math.abs(tdy) / Math.max(1, performance.now() - tT0), dir = tdy > 0 ? 1 : -1;
      var extra = v > FLICK ? Math.round((v - FLICK) * 4) : 0;
      goTo(clamp(tIdx + dir * extra, 0, N - 1));
    }
    tMode = "";
  }
  addEventListener("wheel", onWheel, { passive: false });
  addEventListener("keydown", onKey);
  addEventListener("touchstart", onTouchStart, { passive: true });
  addEventListener("touchmove", onTouchMove, { passive: false });
  addEventListener("touchend", onTouchEnd);

  function read() {
    var r = sec.getBoundingClientRect(), room = r.height - H;
    target = room > 0 ? clamp(-r.top / room, 0, 1) : 0;
    if (skip) {
      var y = window.scrollY;
      if (Math.abs(y - lastY) > 4) { setDir(y > lastY ? "down" : "up"); lastY = y; }
      // sahna to'liq ekranni egallab turgandagina ko'rinadi
      skip.classList.toggle("is-on", r.top < 1 && r.bottom > window.innerHeight + 60);
    }
  }
  function tick() {
    raf = 0;
    cur = cur < 0 || reduce ? target : cur + (target - cur) * 0.14;   // yumshoq ergashish
    if (Math.abs(target - cur) < 0.00008) cur = target;
    render(cur);
    if (cur !== target) raf = requestAnimationFrame(tick);
  }
  function kick() { if (boot) return; read(); if (!raf) raf = requestAnimationFrame(tick); }

  // O'lchash ResizeObserver'da: u layout tayyor bo'lganda chaqiriladi (birinchi marta — observe'dan keyin),
  // shuning uchun o'qish majburiy reflow bermaydi. layout() o'lchamlarni yozadi — sahnani o'qish (read)
  // keyingi kadrga qoldiriladi. Sahna (sticky, 100svh) o'lchami oyna o'lchami bilan birga o'zgaradi.
  var boot = true, kickRaf = 0;
  var ro = new ResizeObserver(function () {
    if (boot) { boot = false; lastY = window.scrollY; }
    layout(); cur = -1;
    cancelAnimationFrame(kickRaf);
    kickRaf = requestAnimationFrame(kick);
  });
  ro.observe(stage);
  addEventListener("scroll", kick, { passive: true });

  return function cleanup() {
    removeEventListener("scroll", kick);
    ro.disconnect();
    cancelAnimationFrame(kickRaf);
    removeEventListener("wheel", onWheel);
    clearTimeout(settleT);
    removeEventListener("keydown", onKey);
    removeEventListener("touchstart", onTouchStart);
    removeEventListener("touchmove", onTouchMove);
    removeEventListener("touchend", onTouchEnd);
    if (raf) cancelAnimationFrame(raf);
    if (skip) { skip.removeEventListener("click", onSkip); skip.classList.remove("is-on"); }
    items.forEach(function (it) { it.card.remove(); it.text.remove(); });
    sec.style.height = "";
  };
})();
}
