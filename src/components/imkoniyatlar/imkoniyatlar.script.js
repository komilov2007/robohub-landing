// Imkoniyatlar bo'limining brauzer mantig'i: 18 ta vosita kartasi va matnini chizadi,
// skrollga qarab ularni yoy bo'ylab joylashtiradi. imkoniyatlar-script.tsx uni sahifa ochilganda bir marta ishga tushiradi.
// NAMUNA MA'LUMOT: kartalardagi son va nomlar shartli.
// Tozalash funksiyasini qaytaradi (hodisalarni uzadi, chizilgan karta va matnlarni olib tashlaydi).
export function init() {
return (function () {
  var MP = { u: "/marketplaces/uzum.svg", w: "/marketplaces/wildberries.svg", o: "/marketplaces/ozon.svg", y: "/marketplaces/yandex.svg" };
  var mp = function (k) { return '<img class="mp" src="' + MP[k] + '" alt="">'; };
  var SPARK = '<svg class="spark" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.9 5.6a3 3 0 0 0 1.9 1.9L21.4 11.4a.6.6 0 0 1 0 1.2l-5.6 1.9a3 3 0 0 0-1.9 1.9L12 22l-1.9-5.6a3 3 0 0 0-1.9-1.9L2.6 12.6a.6.6 0 0 1 0-1.2l5.6-1.9a3 3 0 0 0 1.9-1.9L12 2z"/></svg>';
  var row = function (inner, cls) { return '<div class="row' + (cls ? " " + cls : "") + '">' + inner + "</div>"; };
  var bar = function (w, warn) { return '<div class="bar"><i style="--w:' + w + "%" + (warn ? ";--c:#F2B33D" : "") + '"></i></div>'; };
  var cal = function () { var s = ""; for (var i = 1; i <= 28; i++) s += '<i class="' + (i >= 3 && i <= 6 ? "a" : i >= 11 && i <= 14 ? "b" : i >= 19 && i <= 23 ? "c" : "") + '"></i>'; return s; };
  var stars = function (n) { return '<b class="stars">' + "★★★★★".slice(0, n) + (n < 5 ? "<s>" + "★★★★★".slice(n) + "</s>" : "") + "</b>"; };

  var CATS = ["Hamma marketpleys bitta ekranda", "Foydangizni aniq biling", "Qoldiqni nazorat qiling", "Savdoni o‘stiring", "Mijozlar bilan ishlang"];

  // c — toifa (1..5), n — nom, t — bir qatorli izoh, m — karta sarlavhasidagi kichik yozuv, r — tanasi yonma-yon, v — karta ichi
  var TOOLS = [
    { c: 1, n: "Dashboard", t: "Tushum, foyda, marja va qaytarishlar — barcha do‘konlar bo‘yicha bitta ekranda.", m: "Bugun",
      v: '<div class="kpis"><div class="kpi"><span class="cap">Buyurtmalar</span><b data-n="128">128</b></div><div class="kpi"><span class="cap">Sof foyda</span><b>4,86 mln</b></div><div class="kpi"><span class="cap">Qoldiq</span><b data-n="2314">2 314</b></div></div><div class="bars"><i style="--h:38%"></i><i style="--h:52%"></i><i style="--h:46%"></i><i style="--h:66%"></i><i style="--h:60%"></i><i style="--h:84%"></i><i style="--h:100%"></i></div>' },
    { c: 1, n: "Buyurtmalar", t: "Yagona buyurtmalar lentasidan yig‘ing, belgilang va jo‘nating — holati barcha marketpleyslarda sinxron.", m: "4 marketpleys",
      v: row(mp("u") + '<span>#48213 · Simsiz quloqchin</span><b class="tag">Yangi</b>') + row(mp("w") + '<span>#48212 · Termos 500 ml</span><b class="tag tag--warn">Yig‘ilmoqda</b>') + row(mp("o") + '<span>#48211 · Telefon g‘ilofi</span><b class="tag tag--soft">Yo‘lda</b>') },
    { c: 1, n: "FBO ta’minlash", t: "Tovar qachon tugashini aytadi va omborga nechta jo‘natishni hisoblab beradi.", m: "Qoldiq necha kunga yetadi",
      v: row("<span>Termos 500 ml</span><em>4 kun</em>" + bar(18, 1) + '<b class="tag">+120 dona</b>') + row("<span>Simsiz quloqchin</span><em>9 kun</em>" + bar(40, 1) + '<b class="tag">+60 dona</b>') + row("<span>Sport sumka</span><em>21 kun</em>" + bar(78) + '<b class="tag tag--soft">yetarli</b>') },

    { c: 2, n: "Sof foyda va marja", t: "Tushum, foyda va marja — komissiya, logistika va reklama hisobga olingan holda.", m: "Marja 26%",
      v: '<div class="line"><span>Tushum</span>' + bar(100) + "<b>1 000 000</b></div>" + '<div class="line"><span>Tannarx</span>' + bar(40, 1) + "<b>−400 000</b></div>" + '<div class="line"><span>Komissiya</span>' + bar(18, 1) + "<b>−180 000</b></div>" + '<div class="line"><span>Logistika</span>' + bar(9, 1) + "<b>−90 000</b></div>" + '<div class="line"><span>Reklama</span>' + bar(7, 1) + "<b>−70 000</b></div>" + '<div class="line line--sum"><span>Sof foyda</span>' + bar(26) + "<b data-n='260000'>260 000</b></div>" },
    { c: 2, n: "ROI", t: "Reklamaga sarflagan pulingiz foyda keltirdimi yoki yo‘q — aniq ko‘rasiz.", m: "Reklama", r: 1,
      v: '<div class="ring"><b><em data-n="148" data-suf="%">148%</em></b></div><div class="col"><div class="line"><span>Sarflandi</span><b style="flex:1">500 000</b></div>' + bar(40, 1) + '<div class="line"><span>Qaytdi</span><b style="flex:1">1 240 000</b></div>' + bar(100) + "</div>" },
    { c: 2, n: "ABC/XYZ tahlil", t: "AI-tahlil xarajatlarni hisobga olib, eng foydali mahsulotlarni aniqlaydi.", m: "Tovarlar soni",
      v: '<div class="mx"><span></span><span>X</span><span>Y</span><span>Z</span><span>A</span><b class="is-top">24</b><b class="is-mid">11</b><b>6</b><span>B</span><b class="is-mid">18</b><b>15</b><b>9</b><span>C</span><b>12</b><b>20</b><b class="is-bad">31</b></div>' },
    { c: 2, n: "AI tavsiyalar", t: "Nimaga e’tibor berish kerakligini sun’iy intellekt o‘zi aytib turadi.", m: "3 ta tavsiya",
      v: row(SPARK + "<span>Termos 500 ml — qoldiq 3 kunda tugaydi</span>") + row(SPARK + "<span>Sport sumka — reklama o‘zini oqlamayapti</span>") + row(SPARK + "<span>Blender — talab oshdi, narxni ko‘ring</span>") },

    { c: 3, n: "Ombor sinxronizatsiyasi", t: "Qoldiqlar barcha marketpleyslarda sinxronlanadi — ortiqcha sotuvsiz.", m: "Sinxron", r: 1,
      v: '<div style="flex:none;text-align:center"><span class="cap">Omborda</span><b class="big" style="display:block;margin-top:.1em">24</b></div><div class="col">' + row(mp("u") + '<span>Uzum</span><b>24</b><b class="tag">✓</b>') + row(mp("w") + '<span>Wildberries</span><b>24</b><b class="tag">✓</b>') + row(mp("o") + '<span>Ozon</span><b>24</b><b class="tag">✓</b>') + row(mp("y") + '<span>Yandex Market</span><b>24</b><b class="tag">✓</b>') + "</div>" },
    { c: 3, n: "Tovarlarni guruhlash", t: "Bir xil tovarning turli marketpleysdagi kartochkalarini bittaga birlashtiradi.", m: "1 guruh · 4 kartochka",
      v: '<div class="grid2">' + row(mp("u") + "<span>Termos 500 ml</span>") + row(mp("w") + "<span>Термос 500 мл</span>") + row(mp("o") + "<span>Термос, 0.5 л</span>") + row(mp("y") + "<span>Termos 0,5 l</span>") + "</div>" + row('<span>Umumiy qoldiq</span><b>120 dona</b><b class="tag">bitta guruh</b>', "is-me") },
    { c: 3, n: "Excel import", t: "Tovarlarni bittalab kiritmaysiz — Excel faylni yuklaysiz, bo‘ldi.", m: "128 ta tovar ✓",
      v: row('<i class="file">XLS</i><span>tovarlar.xlsx</span>' + bar(100) + '<b class="tag">yuklandi</b>') + row("<span>Termos 500 ml</span><em>89 000 so‘m</em><b>120</b>") + row("<span>Simsiz quloqchin</span><em>164 000 so‘m</em><b>60</b>") },
    { c: 3, n: "Yo‘qotilgan mahsulotlar", t: "Marketpleys omborida yo‘qolgan tovaringizni topib ko‘rsatadi.", m: "Shu oy", r: 1,
      v: '<div style="flex:none;text-align:center"><b class="big" data-n="5">5</b><span class="cap" style="display:block;margin-top:.3em">dona topilmadi</span></div><div class="col">' + row(mp("w") + '<span>Termos 500 ml</span><b class="tag tag--warn">−2</b>') + row(mp("o") + '<span>Telefon g‘ilofi</span><b class="tag tag--warn">−1</b>') + row(mp("u") + '<span>Simsiz quloqchin</span><b class="tag tag--warn">−2</b>') + "</div>" },

    { c: 4, n: "Avtobidder", t: "Reklama narxini o‘zi boshqaradi — tovaringiz siz xohlagan o‘rinda turadi.", m: "Avto rejim",
      v: row('<span>Maqsad</span><b>3-o‘rin</b><b class="tag">Avto</b>') + '<div><span class="cap">Stavka o‘zi moslashadi</span><div class="slider"></div></div>' + row('<span>Hozirgi o‘rin</span><b class="tag">3</b>') },
    { c: 4, n: "Promokodlar", t: "Chegirma kodi yaratasiz va uni nechta odam ishlatganini ko‘rasiz.", m: "3 ta faol",
      v: '<div class="ticket"><code>YOZ10</code><span>42 marta ishlatildi</span><b>−10%</b></div><div class="ticket"><code>YANGI15</code><span>17 marta ishlatildi</span><b>−15%</b></div><div class="ticket"><code>DOIMIY5</code><span>96 marta ishlatildi</span><b>−5%</b></div>' },
    { c: 4, n: "Aksiyalar taqvimi", t: "Qaysi marketpleysda qachon aksiya bo‘lishini bitta taqvimda ko‘rasiz.", m: "Shu oy",
      v: '<div class="cal">' + cal() + "</div>" + row(mp("u") + '<span>Uzum · Katta chegirmalar</span><em>3–6</em>') + row(mp("w") + '<span>Wildberries · Mavsumiy</span><em>11–14</em>') + row(mp("o") + '<span>Ozon · Hafta aksiyasi</span><em>19–23</em>') },
    { c: 4, n: "Bust TOP", t: "Kartochkalarni yaxshilang — xaridorlar sizni qidiruvda yuqoriroq topadi.", m: "Qidiruvdagi o‘rin",
      v: row('<span>Sizning tovaringiz</span><b class="tag">↑ 1-o‘rin</b>', "is-me rank-me") + row("<span>Raqobatchi tovar</span>", "is-dim rank-o") + row("<span>Raqobatchi tovar</span>", "is-dim rank-o") },

    { c: 5, n: "Chat", t: "Hamma marketpleysdagi xaridorlarga bitta oynadan javob berasiz.", m: "2 ta yangi",
      v: '<div class="msg">' + mp("u") + 'Yetkazib berish qachon bo‘ladi?</div><div class="msg msg--me">Ertaga yetkaziladi</div><div class="msg">' + mp("w") + "Qora rangi bormi?</div>" },
    { c: 5, n: "Sharhlar", t: "Hamma sharhlar bir joyda — birortasi javobsiz qolmaydi.", m: "O‘rtacha 4,8",
      v: row(mp("u") + stars(5) + "<span>Sifati zo‘r, tez yetib keldi</span>") + row(mp("o") + stars(4) + "<span>Yaxshi, qadog‘i biroz ezilgan</span>") + row(mp("w") + stars(2) + "<span>Rangi rasmdagidan farq qiladi</span>") },
    { c: 5, n: "Yulduz bo‘yicha avtojavob", t: "Sharhlarga avto-javob — har bir bahoga mos javob qo‘lda ishsiz ketadi.", m: "Yoqilgan",
      v: row(stars(5) + '<span>Xaridingiz uchun rahmat!</span><i class="sw"></i>') + row(stars(3) + '<span>Nimani yaxshilashimiz mumkin?</span><i class="sw"></i>') + row(stars(1) + '<span>Uzr so‘raymiz, yordam beramiz</span><i class="sw"></i>') }
  ];
  // x — karta tanasiga qo'shimcha, f — karta pastidagi xulosa satri, b — o'ngdagi matn ostidagi 3 ta band
  var MORE = [
    { x: '<div class="legend"><span>' + mp("u") + "42%</span><span>" + mp("w") + "27%</span><span>" + mp("o") + "19%</span><span>" + mp("y") + "12%</span></div>", f: "Kechagidan +12% ko‘p · 4 ta do‘kon",
      b: ["Hamma do‘kon bitta ekranda", "Sotuv, foyda va qoldiq bir joyda", "Kunlik o‘zgarish darhol ko‘rinadi"] },
    { x: row(mp("y") + '<span>#48210 · Sport sumka</span><b class="tag tag--soft">Topshirildi</b>'), f: "Bugun 128 ta · 6 tasi yig‘ilishni kutmoqda",
      b: ["Barcha marketpleys buyurtma va statuslari bitta oynada", "Etiketkalarni to‘plab chop etasiz", "Yig‘ing, belgilang va jo‘nating — bitta lentadan"] },
    { x: row("<span>Blender</span><em>30 kun</em>" + bar(100) + '<b class="tag tag--soft">yetarli</b>'), f: "2 ta tovarni shu hafta jo‘natish kerak",
      b: ["Qoldiq necha kunga yetishini ko‘rasiz", "Nechta jo‘natishni o‘zi hisoblaydi", "Tovar tugab, sotuv to‘xtab qolmaydi"] },
    { f: "Har 1 000 so‘mdan 260 so‘m sizga qoladi",
      b: ["Komissiya, logistika va reklama hisobga olinadi", "Har bir buyurtma, mahsulot va do‘kon bo‘yicha", "Tushum, foyda, marja va qaytarishlar bir joyda"] },
    { f: "Har 1 so‘m reklama 2,48 so‘m bo‘lib qaytdi",
      b: ["Qancha sarflab, qancha qaytganini ko‘rasiz", "Foydasiz reklamani o‘chirasiz", "Pulni ishlayotgan joyga yo‘naltirasiz"] },
    { f: "24 ta tovar asosiy daromadni beryapti · 31 tasi sotilmayapti",
      b: ["A — eng ko‘p pul keltiradigan tovarlar", "C — deyarli sotilmayotganlari", "Komissiya, logistika va reklama xarajati hisobga olinadi"] },
    { x: row(SPARK + "<span>Quloqchin — 4 ta sharh javobsiz turibdi</span>"), f: "Tavsiyalar har kuni yangilanadi",
      b: ["Tugayotgan tovar haqida ogohlantiradi", "Zarar qilayotgan reklamani ko‘rsatadi", "Narxni qachon o‘zgartirishni aytadi"] },
    { f: "Bir joyda sotilsa — hamma joyda birga kamayadi",
      b: ["Barcha marketpleyslar bilan qoldiqni bir zumda almashadi", "FBS va DBS qoldiqlari sinxron", "Ortiqcha sotuv bo‘lmaydi"] },
    { f: "4 ta kartochka — bitta qoldiq, bitta hisobot",
      b: ["Bir tovar — bitta umumiy qoldiq", "Bir marta o‘zgartirasiz — hamma joyda yangilanadi", "Narx va qoldiqni ommaviy tahrirlaysiz"] },
    { x: row("<span>Sport sumka</span><em>347 000 so‘m</em><b>35</b>"), f: "128 ta tovar bitta fayl bilan qo‘shildi",
      b: ["Nom, narx va qoldiq birga yuklanadi", "Marketpleys kabinetidan ham to‘g‘ridan-to‘g‘ri import", "Bir necha bosishda moslab olasiz"] },
    { f: "Jami 5 dona · 3 ta tovar bo‘yicha",
      b: ["Qaysi tovardan nechta yo‘qolganini ko‘rasiz", "Qaysi marketpleysda ekani ko‘rinadi", "Pulingiz e’tiborsiz yo‘qolib ketmaydi"] },
    { x: row("<span>Kunlik byudjet</span><b>150 000 so‘m</b>"), f: "Kerakli o‘rin uchun yetarli stavka — ortig‘i emas",
      b: ["Kerakli o‘rinni o‘zingiz belgilaysiz", "Stavka kun bo‘yi o‘zi moslashadi", "Reklamaga ortiqcha pul ketmaydi"] },
    { f: "Jami 155 marta ishlatildi",
      b: ["Kodni tez yaratasiz", "Har bir kod natijasi alohida", "Qaysi chegirma ishlaganini bilasiz"] },
    { f: "Bu oyda 3 ta aksiya rejalashtirilgan",
      b: ["Hamma aksiya bitta taqvimda", "Oldindan tayyorlanishga vaqt qoladi", "Muhim aksiyani o‘tkazib yubormaysiz"] },
    { x: row("<span>Raqobatchi tovar</span>", "is-dim rank-o"), f: "Ko‘rishlar +38% · shu hafta",
      b: ["Xususiyatlarni to‘ldirib, kartochkani yaxshilaysiz", "Xaridorlar sizni qidiruvda yuqoriroq topadi", "Natija o‘rin bo‘yicha ko‘rinib turadi"] },
    { x: '<div class="msg msg--me">Ha, omborda bor</div>', f: "O‘rtacha javob vaqti — 2 daqiqa",
      b: ["Hamma yozishma bitta oynada", "Qaysi marketpleysdan ekani ko‘rinadi", "Tez javob — ko‘proq sotuv"] },
    { x: row(mp("y") + stars(5) + "<span>Tavsiya qilaman</span>"), f: "312 ta sharh · 4 tasi javob kutmoqda",
      b: ["Yangi sharh darhol ko‘rinadi", "Yomon bahoga tez javob berasiz", "Reyting tushib ketmaydi"] },
    { x: row(stars(4) + '<span>Fikringiz uchun rahmat!</span><i class="sw"></i>'), f: "Bu oy 86 ta javob avtomatik ketdi",
      b: ["Har bir yulduz uchun alohida javob", "Bir marta sozlaysiz — qo‘lda ish qolmaydi", "Xaridor javobsiz qolmaydi"] }
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
    card.innerHTML = '<div class="fd"><div class="fd__h"><span>' + t.n + "</span><em>" + t.m + '</em></div><div class="fd__b' + (t.r ? " fd__b--row" : "") + '">' + t.v + (MORE[i].x || "") + '</div><div class="fd__f">' + MORE[i].f + "</div></div>";
    var text = document.createElement("article");
    text.className = "feat-text";
    text.innerHTML = '<span class="feat-text__n">' + pad(i + 1) + "</span><h3>" + t.n + "</h3><p>" + t.t + "</p><ul>" + MORE[i].b.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>";
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
  function textMax(w) {
    var m = 0;
    items.forEach(function (it) { it.text.style.width = w + "px"; m = Math.max(m, it.text.offsetHeight); });
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
  var group = function (v) { return String(v).replace(/\B(?=(\d{3})+$)/g, " "); };
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
  var lastY = window.scrollY, dir = "down";
  function setDir(d) {
    if (d === dir || !skip) return;
    dir = d; skip.dataset.dir = d;
    skipText.textContent = d === "down" ? "O‘tkazib yuborish" : "Tepaga qaytish";
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
  function kick() { read(); if (!raf) raf = requestAnimationFrame(tick); }

  function onResize() { layout(); cur = -1; kick(); }

  layout(); kick();
  addEventListener("scroll", kick, { passive: true });
  addEventListener("resize", onResize);

  return function cleanup() {
    removeEventListener("scroll", kick);
    removeEventListener("resize", onResize);
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
