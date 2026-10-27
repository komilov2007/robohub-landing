// Muammo bo'limining brauzer mantig'i. problem-script.tsx uni sahifa ochilganda ishga tushiradi.
// Sxema videosi 0–8 s "Robohubsiz", 8 s dan keyin "Robohub bilan" — videoning vaqtiga qarab data-state almashadi,
// head va foot matnlari unga ergashadi. Bo'lim ekrandan chiqqanda video to'xtaydi.
// Tozalash funksiyasini qaytaradi.
export function init() {
  var sec = document.getElementById("problem");
  var video = sec && sec.querySelector(".pain__media video");
  if (!video) return function () {};

  var SWITCH = 8;   // soniya: shundan keyin "Robohub bilan"
  var raf = 0;

  // aria-hidden: ekran o'quvchisi faqat ko'rinib turgan variantni o'qiydi
  function setState(s) {
    if (sec.dataset.state === s) return;
    sec.dataset.state = s;
    sec.querySelectorAll(".pain__v--before, .pain__v--after").forEach(function (el) {
      if (el.classList.contains("pain__v--" + s)) el.removeAttribute("aria-hidden");
      else el.setAttribute("aria-hidden", "true");
    });
  }
  // timeupdate siyrak (~4 marta/s) — o'ynayotganda har kadrda tekshiriladi
  function tick() {
    setState(video.currentTime >= SWITCH ? "after" : "before");
    raf = video.paused ? 0 : requestAnimationFrame(tick);
  }
  function onPlay() { if (!raf) raf = requestAnimationFrame(tick); }

  video.addEventListener("play", onPlay);
  video.addEventListener("seeked", tick);
  setState("before");
  if (!video.paused) onPlay();

  var io = "IntersectionObserver" in window
    ? new IntersectionObserver(function (es) {
        if (es[es.length - 1].isIntersecting) video.play().catch(function () {});
        else video.pause();
      })
    : null;
  if (io) io.observe(sec);

  return function cleanup() {
    video.removeEventListener("play", onPlay);
    video.removeEventListener("seeked", tick);
    cancelAnimationFrame(raf);
    if (io) io.disconnect();
  };
}
