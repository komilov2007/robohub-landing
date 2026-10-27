// Muammo bo'limining brauzer mantig'i. problem-script.tsx uni sahifa ochilganda ishga tushiradi.
// Keng ekranda (sahna sig'sa) bo'lim ekranga qotadi va bitta skroll harakati "Robohubsiz" sxemasini "Robohub bilan"ga
// almashtiradi: to'rt qator vazifa Robohub paneli tomon yig'iladi, paneldan och yashil doira yoyilib ikkinchi sxemani ochadi.
// Almashish skrollga bog'lanmagan — vaqt bo'yicha oxirigacha o'ynaydi, yarim holatda to'xtab qolmaydi.
// Sig'masa (telefon, past ekran) yoki harakat kamaytirilgan bo'lsa — sxemalar ketma-ket, oddiy skroll.
// Tozalash funksiyasini qaytaradi (hodisalarni uzadi, qo'yilgan klass va o'zgaruvchilarni olib tashlaydi).
export function init() {
  var sec = document.getElementById("problem");
  var stage = sec && sec.querySelector(".pain__stage");
  if (!stage) return function () {};

  var header = document.getElementById("header");
  var after = sec.querySelector(".pain__slide--after");
  var frames = sec.querySelectorAll(".pain__frame");
  var heads = sec.querySelectorAll(".pain__head");
  var rows = sec.querySelectorAll(".dg--before .dg__row");
  var dgAfter = sec.querySelector(".dg--after");
  var panel = sec.querySelector(".dg__panel");
  var tasks = panel.querySelector(".dg__tasks");
  var btns = sec.querySelectorAll(".pain__switch button");
  var wide = matchMedia("(min-width: 1024px)");
  var reduced = matchMedia("(prefers-reduced-motion: reduce)");

  /* Qotgan yo'l (0 — sahna qotdi, 1 — qo'yib yuboriladi): boshida "Robohubsiz", oxirida "Robohub bilan".
     Qadam shu ikki nuqta orasida sakraydi; skrollbar yoki tez skrollda SWITCH dan o'tganda almashadi. */
  var AT = { before: 0, after: 1 }, SWITCH = 0.45;
  var DUR = 1000;    // almashish animatsiyasi, ms
  var BOTTOM = 40;   // sahna pastini IMKONIYATLAR varag'i yopadi (robohub.css dagi .is-pinned .pain__slide bilan bir xil)

  var pinned = false, raf = 0, rq = 0, state = "", theme = "", alive = true;
  var p = 0, goal = 0, last = 0, anim = 0;   // p — almashish holati (0 → 1), vaqt bo'yicha goal ga yetadi
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

  /* ekran och yashilga to'lganda header ham shu rangga o'tadi (header.script.js data-header-theme ni o'qiydi) */
  function setTheme(v) {
    if (v === theme) return;
    theme = v;
    if (v) sec.dataset.headerTheme = v; else delete sec.dataset.headerTheme;
    document.dispatchEvent(new Event("themechange"));
  }
  // --m: qatorlar yig'iladi (birinchi yarmida), --f: doira yoyiladi (biroz keyin boshlanib, oxirigacha)
  function render() {
    var f = ease(clamp((p - 0.15) / 0.85));
    sec.style.setProperty("--m", ease(clamp(p / 0.55)).toFixed(4));
    sec.style.setProperty("--f", f.toFixed(4));
    setTheme(f > 0.5 ? "mint" : "");
  }
  function frame(now) {
    anim = 0;
    var dt = last ? Math.min(now - last, 50) : 16;
    last = now;
    p = goal > p ? Math.min(goal, p + dt / DUR) : Math.max(goal, p - dt / DUR);
    render();
    if (p !== goal) anim = requestAnimationFrame(frame); else last = 0;
  }
  // instant — o'lchovdan keyin (yuklanish, oyna o'lchami): animatsiyasiz darhol shu holatga
  function setState(s, instant) {
    if (s === state && !instant) return;
    state = s;
    sec.dataset.state = s;
    btns.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.to === s)); });
    goal = s === "after" ? 1 : 0;
    if (instant) { cancelAnimationFrame(anim); anim = 0; last = 0; p = goal; render(); }
    else if (!anim) anim = requestAnimationFrame(frame);
  }

  function unpin() {
    pinned = false;
    sec.classList.remove("is-pinned");
    heads.forEach(function (h) { h.style.minHeight = ""; });
    frames.forEach(function (f) { f.style.minHeight = ""; });
    ["--m", "--f", "--fx", "--fy", "--R"].forEach(function (k) { sec.style.removeProperty(k); });
    rows.forEach(function (r) { r.style.removeProperty("--dy"); });
    cancelAnimationFrame(anim);
    anim = 0; last = 0; p = goal = 0; state = "";
    delete sec.dataset.state;
  }

  /* O'lchov qotgan holatda olinadi: ikkala sxema sarlavhasi va balandligi bir xil (sxemalar ustma-ust tushadi),
     sahnaga sig'masa — qotmaydi. Joylar offset* bilan: transform (almashish holati, [data-sr]) ularga ta'sir qilmaydi. */
  function layout() {
    rq = 0;
    unpin();
    if (!wide.matches || reduced.matches) return update();
    sec.classList.add("is-pinned");
    var hh = Math.max(heads[0].offsetHeight, heads[1].offsetHeight);
    heads.forEach(function (h) { h.style.minHeight = hh + "px"; });
    var room = stage.clientHeight - header.offsetHeight - BOTTOM;
    var need = Math.max(frames[0].offsetHeight, frames[1].offsetHeight);
    if (need > room) { unpin(); return update(); }
    frames.forEach(function (f) { f.style.minHeight = need + "px"; });   // ikkala sxema bir xil balandlikda — bir joyda turadi
    pinned = true;

    // har qator markazidan panel ichidagi vazifalar markazigacha (ikkala sxema bir joyda turadi)
    var target = panel.offsetTop + tasks.offsetTop + tasks.offsetHeight / 2;
    rows.forEach(function (r) {
      r.style.setProperty("--dy", (target - r.offsetTop - r.offsetHeight / 2).toFixed(1) + "px");
    });
    // doira markazi — Robohub paneli; radiusi panel markazidan eng uzoq burchakkacha
    var fr = frames[1];
    var fx = fr.offsetLeft + dgAfter.offsetLeft + panel.offsetLeft + panel.offsetWidth / 2;
    var fy = fr.offsetTop + dgAfter.offsetTop + panel.offsetTop + panel.offsetHeight / 2;
    var R = Math.hypot(Math.max(fx, after.clientWidth - fx), Math.max(fy, after.clientHeight - fy));
    sec.style.setProperty("--fx", fx.toFixed(1) + "px");
    sec.style.setProperty("--fy", fy.toFixed(1) + "px");
    sec.style.setProperty("--R", Math.ceil(R + 2) + "px");
    setState(where(), true);
    update();
  }

  // skroll joyiga ko'ra qaysi sxema
  function where() {
    var r = sec.getBoundingClientRect(), room = r.height - stage.offsetHeight;
    return room > 0 && -r.top / room >= SWITCH ? "after" : "before";
  }
  function update() {
    raf = 0;
    if (pinned) return setState(where());
    // ketma-ket holatda: header ikkinchi (och yashil) sxema ustida bo'lsa
    var a = after.getBoundingClientRect(), probe = header.offsetHeight / 2;
    setTheme(a.top <= probe && a.bottom > probe ? "mint" : "");
  }

  /* Qadamli skroll (imkoniyatlar bo'limidagidek): sahna qotib turganda g'ildirak / klaviatura bir harakatda
     ikkinchi sxemaga (tepaga — birinchisiga) o'tkazadi. Sahifa darhol kerakli joyga sakraydi — sahna qotgani uchun
     ko'rinmaydi, ko'rinadigan almashishni frame() beradi. Animatsiya tugaguncha skroll qulflanadi. */
  var LOCK = DUR - 150, QUIET = 160, lockUntil = 0, lastWheel = 0;
  var BURST = 150, FAST = 400, SETTLE = 380, run = 0, free = false, settleT = 0;
  function isPinned(r) { return r.top <= 2 && r.bottom >= stage.offsetHeight - 2; }
  // dir (+1/−1) yo'nalishidagi qadam; sahna qotmagan yoki chetga yetgan bo'lsa null
  function next(dir) {
    var r = sec.getBoundingClientRect(), room = r.height - stage.offsetHeight;
    if (!pinned || room <= 0 || !isPinned(r)) return null;
    var t = -r.top / room;
    if (dir > 0) return t < SWITCH ? "after" : null;
    return t >= SWITCH ? "before" : null;
  }
  function goTo(s, smooth) {
    var top = sec.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.round(top + (sec.offsetHeight - stage.offsetHeight) * AT[s]), behavior: smooth ? "smooth" : "instant" });
    lockUntil = performance.now() + LOCK;
  }
  function locked(now) { return now < lockUntil || now - lastWheel < QUIET; }
  // tez skroll bloklanmaydi: uzluksiz harakat FAST px dan oshsa — brauzer o'zi aylantiradi,
  // to'xtagach sahna qotgan bo'lsa eng yaqin sxemaga o'rnashadi
  function settle() {
    free = false; run = 0;
    var r = sec.getBoundingClientRect(), room = r.height - stage.offsetHeight;
    if (!pinned || room <= 0 || !isPinned(r)) return;
    var t = -r.top / room;
    if (t > 0.01 && t < 0.99) goTo(t >= SWITCH ? "after" : "before");
  }
  function onWheel(e) {
    if (!pinned || e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX) || !e.deltaY) return;
    var now = performance.now(), busy = locked(now);
    var d = Math.abs(e.deltaY) * (e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? window.innerHeight : 1);   // qatorlar/sahifalar → px
    run = now - lastWheel < BURST ? run + d : d;
    if (run > FAST) free = true;
    lastWheel = now;
    if (free) { clearTimeout(settleT); settleT = setTimeout(settle, SETTLE); return; }
    if (busy) { if (isPinned(sec.getBoundingClientRect())) e.preventDefault(); return; }
    var s = next(e.deltaY > 0 ? 1 : -1);
    if (!s) return;
    e.preventDefault();
    goTo(s);
  }
  var KEYS = { ArrowDown: 1, PageDown: 1, " ": 1, ArrowUp: -1, PageUp: -1 };
  function onKey(e) {
    var d = KEYS[e.key];
    if (!d || !pinned || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.target.closest && e.target.closest("input,textarea,select,button,[contenteditable]")) return;
    if (e.key === " " && e.shiftKey) d = -1;
    if (locked(performance.now())) { if (isPinned(sec.getBoundingClientRect())) e.preventDefault(); return; }
    var s = next(d);
    if (!s) return;
    e.preventDefault();
    goTo(s);
  }
  // tugma: sahna qotgan bo'lsa darhol, aks holda sahnaga silliq skroll
  function go(e) {
    if (!pinned) return;
    goTo(e.currentTarget.dataset.to, !isPinned(sec.getBoundingClientRect()));
  }

  function onScroll() { if (!raf) raf = requestAnimationFrame(update); }
  function onResize() { if (!rq) rq = requestAnimationFrame(layout); }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("keydown", onKey);
  wide.addEventListener("change", onResize);
  reduced.addEventListener("change", onResize);
  btns.forEach(function (b) { b.addEventListener("click", go); });
  // sxemadagi oqim animatsiyalari bo'lim ekrandan chiqqanda to'xtaydi (robohub.css, .is-idle)
  var io = "IntersectionObserver" in window
    ? new IntersectionObserver(function (es) { sec.classList.toggle("is-idle", !es[es.length - 1].isIntersecting); })
    : null;
  if (io) io.observe(sec);
  layout();
  // shrift yuklangach sarlavha balandligi o'zgaradi — qayta o'lchanadi
  if (document.fonts) document.fonts.ready.then(function () { if (alive) onResize(); });

  return function cleanup() {
    alive = false;
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("keydown", onKey);
    wide.removeEventListener("change", onResize);
    reduced.removeEventListener("change", onResize);
    btns.forEach(function (b) { b.removeEventListener("click", go); });
    clearTimeout(settleT);
    if (io) io.disconnect();
    sec.classList.remove("is-idle");
    cancelAnimationFrame(raf);
    cancelAnimationFrame(rq);
    unpin();
    setTheme("");
  };
}
