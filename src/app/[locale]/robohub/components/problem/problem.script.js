// Muammo bo'limining brauzer mantig'i. problem-script.tsx uni sahifa ochilganda ishga tushiradi.
// Sxema videosi 0–8 s "Robohubsiz", 8 s dan keyin "Robohub bilan" — videoning vaqtiga qarab data-state almashadi,
// head va foot matnlari unga ergashadi, "Robohub bilan" qismida fon mint rangga o'tadi.
// Tepa o'ngdagi "Robohubsiz | Robohub bilan" tugmalari videoni shu qismga o'tkazadi. Bo'lim ekrandan chiqqanda video to'xtaydi.
// Tozalash funksiyasini qaytaradi.
export function init() {
  var sec = document.getElementById("problem");
  var video = sec && sec.querySelector(".pain__media video");
  if (!video) return function () {};

  // Vaqt jadvali — videoniki bilan bir xil (13 s, 30 fps, takrorlanadi; video foni sahifa foni bilan bir rang):
  //   0 – 8 s       "Robohubsiz", fon #06302E
  //   8 – 8.5 s     fon #06302E → #B8FFB0, ease-in-out
  //   8.5 – 12.5 s  "Robohub bilan", fon #B8FFB0
  //   12.5 – 13 s   fon #B8FFB0 → #06302E, ease-in-out; 13 s kadri = 0 s kadri
  // Sahifa foni CSS taymeri bilan EMAS, videoning ko'rsatilayotgan kadri vaqti bilan boshqariladi (--mix, 0…1):
  // har kadrda videodagi fon qancha o'tgan bo'lsa, sahifadagi ham aynan shuncha — chegara bilinmaydi.
  var SWITCH = 8;    // "Robohub bilan" boshlanishi (tugma ham shu joyga o'tkazadi)
  var BACK = 12.5;   // "Robohubsiz"ga qaytish boshlanishi
  var FADE = 0.5;    // har ikki o'tish davomiyligi, s
  var FPS = 30;     // video kadr chastotasi: vaqt ko'rsatilayotgan kadrga yaxlitlanadi (seek paytida ham aynan shu kadr)

  // CSS'dagi standart ease-in-out — cubic-bezier(.42, 0, .58, 1): x bo'yicha Nyuton usuli bilan yechiladi
  function easeInOut(x) {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    var t = x;
    for (var i = 0; i < 6; i++) {
      var bx = 3 * 0.42 * t * (1 - t) * (1 - t) + 3 * 0.58 * t * t * (1 - t) + t * t * t - x;
      var dx = 3 * 0.42 * (1 - t) * (1 - 4 * t + 3 * t * t) + 3 * 0.58 * t * (2 - 3 * t) + 3 * t * t;
      if (Math.abs(bx) < 1e-5 || !dx) break;
      t -= bx / dx;
    }
    return 3 * t * t * (1 - t) + t * t * t;   // y (P1.y = 0, P2.y = 1)
  }
  // t soniyadagi fon: 0 — to'q, 1 — mint
  function mixAt(t) {
    if (t < SWITCH) return 0;
    if (t < SWITCH + FADE) return easeInOut((t - SWITCH) / FADE);
    if (t < BACK) return 1;
    return 1 - easeInOut((t - BACK) / FADE);
  }

  var buttons = sec.querySelectorAll(".pain__switch [data-to]");

  // aria-hidden: ekran o'quvchisi faqat ko'rinib turgan variantni o'qiydi.
  // "Robohub bilan" — bo'lim mint mavzuga o'tadi (data-theme), header ham ostidagi mavzuni oladi (themechange).
  // Matn ranglari CSS'da 500ms ease-in-out bilan o'tadi — o'tish boshlanishi bilan bir vaqtda almashtiriladi.
  function setState(s) {
    if (sec.dataset.state === s) return;
    sec.dataset.state = s;
    sec.dataset.theme = s === "after" ? "mint" : "dark";
    document.dispatchEvent(new Event("themechange"));
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.to === s));
    });
    sec.querySelectorAll(".pain__v--before, .pain__v--after").forEach(function (el) {
      if (el.classList.contains("pain__v--" + s)) el.removeAttribute("aria-hidden");
      else el.setAttribute("aria-hidden", "true");
    });
  }

  var lastMix = -1;
  function apply(t) {
    t = Math.floor(t * FPS + 1e-3) / FPS;
    var m = Math.round(mixAt(t) * 1000) / 1000;
    if (m !== lastMix) { sec.style.setProperty("--mix", m); lastMix = m; }
    setState(t >= SWITCH && t < BACK ? "after" : "before");
  }

  // Telefon: video o'rniga HTML sahna (problem.tsx → .pain__stage), o'sha 13 s jadval bo'yicha. Soat — video emas,
  // performance.now(): video umuman yuklanmaydi. Fon, sarlavha va tugmalar yuqoridagi apply() bilan xuddi videodagidek.
  var stageEl = sec.querySelector(".pain__stage");
  if (stageEl && window.matchMedia("(max-width: 600px)").matches) return initStage(stageEl);

  function initStage(stage) {
    video.pause();
    video.removeAttribute("src");
    video.load();
    var LOOP = 13;
    var q = function (sel) { return [].slice.call(stage.querySelectorAll(sel)); };
    var cells = q(".ps__cell"), mgrs = q(".ps__mgr"), boxesB = q(".ps__box--b"), tilesB = q(".ps--b .ps__mp");
    var chips = q(".ps__chip"), boxesA = q(".ps__box--a"), tilesA = q(".ps--a .ps__mp");
    var hubBox = stage.querySelector(".ps__box--hub"), stem = stage.querySelector(".ps__stem"), hub = stage.querySelector(".ps__hub");
    var clamp01 = function (x) { return x < 0 ? 0 : x > 1 ? 1 : x; };
    // faqat o'zgarganda yoziladi (har kadrda DOM'ga keraksiz yozuv bo'lmasin)
    function set(el, v) { if (el.dataset.s !== v) el.dataset.s = v; }
    function setP(el, p) {
      var v = String(Math.round(p * 1000) / 1000);
      if (el.style.getPropertyValue("--p") !== v) el.style.setProperty("--p", v);
      set(el, p > 0 && p < 1 ? "on" : "");
    }
    // t soniyadagi sahna: "" — kutmoqda, "on" — hozir bajarilmoqda, "done" — bajarildi
    function render(t) {
      var b = t < SWITCH;
      // Robohubsiz: tovar qutisi tadbirkordan har menejerga tushadi, keyin vazifalar to'lqin bo'lib bajariladi
      boxesB.forEach(function (el) { var r = +el.dataset.r; setP(el, b ? clamp01((t - 0.5 - r * 0.25) / 0.6) : 0); });
      mgrs.forEach(function (el) { var r = +el.dataset.r; set(el, b && t >= 1.1 + r * 0.25 ? "done" : ""); });
      cells.forEach(function (el) {
        var s0 = 1.6 + +el.dataset.c * 0.62 + +el.dataset.r * 0.14;
        set(el, !b || t < s0 ? "" : t < s0 + 0.5 ? "on" : "done");
      });
      tilesB.forEach(function (el) { set(el, b && t >= 5 + +el.dataset.i * 0.2 ? "done" : ""); });
      // Robohub bilan: tadbirkor → kabinet (vazifalar bir marta belgilanadi) → 4 marketpleysga birdan
      var a = t >= SWITCH;
      set(stem, a && t >= 8.5 ? "on" : "");
      setP(hubBox, a ? clamp01((t - 8.7) / 0.5) : 0);
      set(hub, a && t >= 9.2 ? "on" : "");
      chips.forEach(function (el) { set(el, a && t >= 9.4 + +el.dataset.i * 0.15 ? "done" : ""); });
      boxesA.forEach(function (el) { setP(el, a ? clamp01((t - 10.45) / 0.55) : 0); });
      tilesA.forEach(function (el) { set(el, a && t >= 11 + +el.dataset.i * 0.1 ? "done" : ""); });
    }

    var base = performance.now(), raf = 0, visible = false, held = 0;
    function frame(now) {
      var t = (((now - base) / 1000) % LOOP + LOOP) % LOOP;
      apply(t);
      render(t);
      raf = requestAnimationFrame(frame);
    }
    function run(on) {
      if (on === visible) return;
      visible = on;
      var now = performance.now();
      if (on) { base = now - held * 1000; raf = requestAnimationFrame(frame); }
      else { held = (((now - base) / 1000) % LOOP + LOOP) % LOOP; cancelAnimationFrame(raf); }
    }
    // tugma: sahna shu qismning boshidan ("Robohubsiz" — 0 s, to'q fonga o'tishsiz; "Robohub bilan" — 8 s)
    function onStageSwitch(e) {
      var btn = e.target.closest("[data-to]");
      if (!btn) return;
      var toAfter = btn.dataset.to === "after";
      if (toAfter && sec.dataset.state === "after") return;
      if (!toAfter) {
        sec.classList.add("is-jump");
        requestAnimationFrame(function () { requestAnimationFrame(function () { sec.classList.remove("is-jump"); }); });
      }
      var at = toAfter ? SWITCH : 0;
      base = performance.now() - at * 1000;
      held = at;
      if (!visible) { apply(at); render(toAfter ? 12 : 7.9); }   // to'xtagan sahnada — qismning yakuniy holati
    }
    var swEl = sec.querySelector(".pain__switch");
    if (swEl) swEl.addEventListener("click", onStageSwitch);
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var sio = null;
    if (reduce) { apply(0); render(7.9); }   // harakatsiz: "Robohubsiz" sxemasi to'liq holatda
    else if ("IntersectionObserver" in window) {
      sio = new IntersectionObserver(function (es) { run(es[es.length - 1].isIntersecting); });
      sio.observe(sec);
    } else run(true);
    return function cleanup() {
      if (swEl) swEl.removeEventListener("click", onStageSwitch);
      if (sio) sio.disconnect();
      cancelAnimationFrame(raf);
      sec.style.removeProperty("--mix");
    };
  }

  // Telefonda video suriladigan oynada (robohub.css, .pain__media): kadr sxema bo'ylab o'zi yuradi —
  // "Robohubsiz" qismida chapdan (tadbirkor) o'ngga (marketpleyslar), "Robohub bilan" qismida markazdagi panelda turadi.
  // Foydalanuvchi barmog'i bilan sursa — 4 soniya avtomatik surish to'xtaydi.
  var box = video.parentElement, userUntil = 0;
  function panAt(t) {
    if (t < 1) return 0;
    if (t < 7) return (t - 1) / 6;
    if (t < SWITCH) return 1 - ((t - 7) / (SWITCH - 7)) * 0.5;
    if (t < BACK) return 0.5;
    return 0.5 - ((t - BACK) / FADE) * 0.5;
  }
  function pan(t) {
    var max = box.scrollWidth - box.clientWidth;
    if (max < 8 || performance.now() < userUntil) return;
    box.scrollLeft = Math.round(max * easeInOut(panAt(t)));
  }
  function onTouch() { userUntil = performance.now() + 4000; }
  box.addEventListener("touchstart", onTouch, { passive: true });
  box.addEventListener("wheel", onTouch, { passive: true });

  // Kadr bilan sinxron: requestVideoFrameCallback — ekranga chiqayotgan kadrning aniq vaqti (mediaTime).
  // Bo'lmasa (eski brauzerlar) — har animatsiya kadrida currentTime.
  var rvfc = "requestVideoFrameCallback" in HTMLVideoElement.prototype;
  var handle = 0, running = false;
  var seeking = false;   // tugma bosilib, video hali yangi kadrni ko'rsatmagan — fon eski kadrga mos holicha turadi
  function onFrame(now, meta) {
    var t = meta ? meta.mediaTime : video.currentTime;
    // tugmadan keyin: yangi joydagi birinchi kadr ekranga chiqayotganda — aynan shu kadr bilan birga almashadi
    if (seeking) { if (Math.abs(t - seekTo) < 0.25) finishSeek(t); }
    else apply(t);
    pan(t);
    schedule();
  }
  function schedule() {
    if (!running) return;
    handle = rvfc ? video.requestVideoFrameCallback(onFrame) : requestAnimationFrame(function () { onFrame(); });
  }
  function start() { if (!running) { running = true; schedule(); } }
  function stop() {
    running = false;
    if (rvfc) video.cancelVideoFrameCallback(handle); else cancelAnimationFrame(handle);
  }
  function sync() { if (!seeking) apply(video.currentTime); }

  // Tugma: video shu qismning boshiga o'tadi va o'ynaydi.
  // Video yangi kadrni darhol emas, dekodlab bo'lgach ko'rsatadi — shu orada fon va matnni almashtirsak, chok
  // bilinib qoladi. Shuning uchun sahifa yangi kadr ekranga chiqqan paytda (seeked + keyingi video kadri) almashadi.
  // "Robohubsiz" (0 s) — videoda fon bir zumda to'q, matn ranglari ham o'tishsiz almashadi (is-jump).
  // "Robohub bilan" (8 s) — videodagi o'tish shu kadrdan boshlanadi, matn ham odatdagidek 500ms o'tadi.
  var jump = false, seekGuard = 0, seekTo = 0;
  function finishSeek(t) {
    if (!seeking) return;
    clearTimeout(seekGuard);
    seeking = false;
    if (jump) {
      sec.classList.add("is-jump");
      requestAnimationFrame(function () { requestAnimationFrame(function () { sec.classList.remove("is-jump"); }); });
    }
    apply(t);
  }
  function onSeeked() {
    if (!seeking) { sync(); return; }
    if (rvfc) video.requestVideoFrameCallback(function (now, meta) { finishSeek(meta.mediaTime); });
    else requestAnimationFrame(function () { finishSeek(video.currentTime); });
  }
  function onSwitch(e) {
    var b = e.target.closest("[data-to]");
    if (!b) return;
    var toAfter = b.dataset.to === "after";
    // allaqachon "Robohub bilan" ko'rinib turibdi — qaytadan 8 s ga (to'q kadrga) sakratmaymiz
    if (toAfter && sec.dataset.state === "after") { video.play().catch(function () {}); return; }
    jump = !toAfter;
    seeking = true;
    clearTimeout(seekGuard);
    seekGuard = setTimeout(function () { finishSeek(video.currentTime); }, 600);   // zaxira: kadr xabari kelmasa
    seekTo = toAfter ? SWITCH : 0;
    video.currentTime = seekTo;
    video.play().catch(function () {});
  }
  var sw = sec.querySelector(".pain__switch");
  if (sw) sw.addEventListener("click", onSwitch);

  video.addEventListener("play", start);
  video.addEventListener("pause", stop);
  video.addEventListener("seeked", onSeeked);
  sync();
  if (!video.paused) start();

  var io =
    "IntersectionObserver" in window
      ? new IntersectionObserver(function (es) {
          if (es[es.length - 1].isIntersecting) video.play().catch(function () {});
          else video.pause();
        })
      : null;
  if (io) io.observe(sec);

  return function cleanup() {
    if (sw) sw.removeEventListener("click", onSwitch);
    video.removeEventListener("play", start);
    video.removeEventListener("pause", stop);
    video.removeEventListener("seeked", onSeeked);
    clearTimeout(seekGuard);
    stop();
    box.removeEventListener("touchstart", onTouch);
    box.removeEventListener("wheel", onTouch);
    if (io) io.disconnect();
    sec.style.removeProperty("--mix");
  };
}
