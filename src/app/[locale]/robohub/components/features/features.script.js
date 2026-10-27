// Imkoniyatlar bo'limining brauzer mantig'i: 6 ta yo'nalish kartasi va matnini chizadi,
// skrollga qarab ularni yoy bo'ylab joylashtiradi. features-script.tsx uni sahifa ochilganda bir marta ishga tushiradi.
// NAMUNA MA'LUMOT: kartalardagi son va nomlar shartli.
// msg — joriy tildagi matnlar (features.i18n.ts → script): nomlar, izohlar, karta yozuvlari, tugma matnlari.
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

  var CATS = msg.cats;   // har yo'nalishning qisqa nomi (hisoblagich ostida)

  // Kartalar tartibi: yuklash (guruhlash), qoldiq sinxroni, buyurtmalar, foyda tahlili, avtobidder, sharhlarga avtojavob.
  // c — karta rangi (1..5), r — tanasi yonma-yon, v(s) — karta ichi (s — shu vositaning msg.tools[i].v yozuvlari).
  // Nom, izoh, kichik yozuv, xulosa va bandlar — msg.tools[i] dan.
  var TOOLS = [
    { c: 3,
      v: function (s) { return '<div class="grid2">' + row(mp("u") + "<span>" + s[0] + "</span>") + row(mp("w") + "<span>" + s[1] + "</span>") + row(mp("o") + "<span>" + s[2] + "</span>") + row(mp("y") + "<span>" + s[3] + "</span>") + "</div>" + row("<span>" + s[4] + "</span><b>" + s[5] + '</b><b class="tag">' + s[6] + "</b>", "is-me"); } },
    // qoldiq: bitta joyda sotildi → to'rttala marketpleysda bir zumda 24 → 23
    { c: 3,
      v: function (s) { return row(mp("u") + "<span>" + s[1] + '</span><b class="tag tag--warn">−1</b>', "is-event") + '<div class="grid2">' + ["u", "w", "o", "y"].map(function (k, j) { return '<div class="stock">' + mp(k) + "<span>" + ["Uzum", "Wildberries", "Ozon", "Yandex"][j] + '</span><s>24</s><b>23</b><i class="ok">✓</i></div>'; }).join("") + "</div>" + row("<span>" + s[0] + '</span><b class="big-n">23</b><b class="tag">' + s[2] + "</b>", "is-me"); } },
    { c: 1,
      v: function (s) { return row(mp("u") + "<span>" + s[0] + '</span><b class="tag">' + s[1] + "</b>") + row(mp("w") + "<span>" + s[2] + '</span><b class="tag tag--warn">' + s[3] + "</b>") + row(mp("o") + "<span>" + s[4] + '</span><b class="tag tag--soft">' + s[5] + "</b>"); } },
    // tahlil: bitta sotuv narxi nimaga ketadi (unit-iqtisodiyot) + platformalar bo'yicha komissiya va marja + raqobatchilar narxi
    { c: 2,
      v: function (s) { return '<div class="ue"><span class="cap">' + s[0] + "</span><b>" + group(189000) + "</b></div>" + '<div class="stack"><i style="--w:50%;--c:#9DB4AF"></i><i style="--w:15%;--c:#FACF00"></i><i style="--w:6%;--c:#F59E0B"></i><i style="--w:6%;--c:#FF7A90"></i><i style="--w:23%;--c:#00524F"></i></div>' + '<div class="leg"><span style="--c:#9DB4AF">' + s[1] + " 50%</span><span style=\"--c:#FACF00\">" + s[2] + " 15%</span><span style=\"--c:#F59E0B\">" + s[3] + " 6%</span><span style=\"--c:#FF7A90\">" + s[4] + " 6%</span><span style=\"--c:#00524F\"><b>" + s[5] + " 23%</b></span></div>" + '<div class="tbl"><span></span><em>' + s[6] + "</em><em>" + s[7] + "</em>" + [["u", "Uzum", 15, 23], ["y", "Yandex", 17, 20], ["w", "Wildberries", 20, 17], ["o", "Ozon", 22, 14]].map(function (r) { return "<span>" + mp(r[0]) + r[1] + "</span><b>" + r[2] + "%</b><b>" + r[3] + "%</b>"; }).join("") + "</div>" + row("<span>" + s[8] + "</span><b>" + group(195000) + '</b><b class="tag">' + s[9] + "</b>", "is-me"); } },
    { c: 4,
      v: function (s) { return row("<span>" + s[0] + "</span><b>" + s[1] + '</b><b class="tag">' + s[2] + "</b>") + '<div><span class="cap">' + s[3] + '</span><div class="slider"></div></div>' + row("<span>" + s[4] + '</span><b class="tag">3</b>'); } },
    { c: 5,
      v: function (s) { return row(stars(5) + "<span>" + s[0] + '</span><i class="sw"></i>') + row(stars(3) + "<span>" + s[1] + '</span><i class="sw"></i>') + row(stars(1) + "<span>" + s[2] + '</span><i class="sw"></i>'); } }
  ];
  // x(s) — karta tanasiga qo'shimcha (s — o'sha vositaning yozuvlari, TOOLS dagi v(s) bilan bir xil)
  var MORE = [
    {},
    {},
    { x: function (s) { return row(mp("y") + "<span>" + s[6] + '</span><b class="tag tag--soft">' + s[7] + "</b>"); } },
    {},
    { x: function (s) { return row("<span>" + s[5] + "</span><b>" + s[6] + "</b>"); } },
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
    // 1-yo'nalish (bir marta yuklab, hamma marketpleysda sotish) — kartochka o'rnida animatsion video
    if (i === 0) card.innerHTML = '<video class="fd__video" src="/section-one-hub.mp4" muted loop playsinline preload="auto" aria-hidden="true"></video>';
    else card.innerHTML = '<div class="fd"><div class="fd__h"><span>' + CATS[i] + "</span><em>" + L.m + '</em></div><div class="fd__b' + (t.r ? " fd__b--row" : "") + '">' + t.v(s) + (MORE[i].x ? MORE[i].x(s) : "") + '</div><div class="fd__f">' + L.f + "</div></div>";
    var text = document.createElement("article");
    text.className = "feat-text";
    text.innerHTML = '<span class="feat-text__n">' + pad(i + 1) + "</span><h3>" + L.n + "</h3><p>" + L.t + "</p>" + (L.b ? "<ul>" + L.b.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>" : "") +
      // bilinar-bilinmas tugma: matn ustiga kelganda yaqqol ko'rinadi (robohub.css .feat-text__try)
      '<a class="feat-text__try" href="' + msg.tryHref + '" target="_blank" rel="noopener">' + msg.try + "<i>→</i></a>";
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
      CW = clamp(W * 0.27, 320, 430); CH = Math.round(CW * 0.84);
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
    it.act = on; it.card.classList.toggle("is-on", on); it.text.classList.toggle("is-on", on);
    if (on && !reduce) count(it.card);
    var v = it.card.querySelector("video");
    if (v) { if (on && !reduce) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } else v.pause(); }
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
        // g'ildirak bo'ylab oqadi: chetda biroz og'gan, kichikroq va xiraroq; markazda tik va to'liq o'lchamda
        it.card.style.transform = "translate(" + (dx - CW / 2).toFixed(1) + "px," + (y - CH / 2).toFixed(1) + "px) rotate(" + (a * 0.32).toFixed(4) + "rad) scale(" + (0.86 + 0.16 * k).toFixed(3) + ")";
        it.text.style.transform = "translate(" + (cxR - R * cos).toFixed(1) + "px," + y.toFixed(1) + "px) translateY(-50%)";
        it.card.style.opacity = show ? (0.45 + 0.55 * Math.min(1, k * 1.6)).toFixed(3) : 0;
      }
      it.text.style.opacity = show ? (0.3 + 0.7 * k).toFixed(3) : 0;
    }

    var idx = clamp(Math.round(t), 0, N - 1);
    if (idx !== lastIdx) {
      hudN.textContent = pad(idx + 1);
      hudCat.innerHTML = "<span>" + CATS[idx] + "</span>";
      for (var j = 0; j < hudDots.length; j++) hudDots[j].classList.toggle("is-on", j === idx);
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
  // 1-vositadan tepaga va oxirgisidan pastga oddiy skroll ishlaydi.
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
  // Header menyusidan (header.script.js, "feat:go"): sahifa silliq aylanib, i-karta markazda to'xtaydi.
  // Sahna qotmaydigan holatda (room <= 0) hodisa qabul qilinmaydi — havola oddiy #features ga o'tadi.
  function onGo(e) {
    var i = e.detail, room = sec.offsetHeight - H;
    if (!(i >= 0 && i <= N - 1) || room <= 0) return;
    e.preventDefault();
    var top = sec.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.round(top + ((i + lead) / span) * room), behavior: reduce ? "auto" : "smooth" });
    lockUntil = performance.now() + LOCK;
  }
  document.addEventListener("feat:go", onGo);
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
    document.removeEventListener("feat:go", onGo);
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
