// Aloqa bo'limining brauzer mantig'i: bitta inputli quiz (3 qadam).
// contact-script.tsx uni sahifa ochilganda bir marta ishga tushiradi.
// t — joriy tildagi matn (contact.i18n.ts → quiz).
//  1) marketpleys: tayyor variantlar (bir nechtasini tanlash mumkin) yoki "Boshqa" — nomini inputga yozadi
//  2) ism: erkin matn
//  3) aloqa: Telefon (+998 (XX) XXX-XX-XX formatida, 9 raqam) yoki Email — tanlov tugmalari bilan
// Har qadam almashganda tepadagi "1/3" ko'rsatkich va input silliq almashadi (robohub.css → .is-swap).
// Backend yo'q: oxirgi qadamdan keyin hello@robohub.uz manziliga tayyor xat (mailto) ochiladi.
// id — elementlar id'larining prefiksi (contact-quiz.tsx): "contact" — bo'lim, "cmodal" — header'dagi modal oyna.
export function init(t, id) {
  id = id || "contact";
  var form = document.getElementById(id + "-form");
  if (!form) return;
  var input = form.querySelector("input");
  var button = form.querySelector("button[type=submit]");
  var done = form.querySelector(".contact__done");
  var steps = document.getElementById(id + "-steps");
  var stepNum = steps && steps.querySelector("b");
  var opts = document.getElementById(id + "-opts");
  var via = document.getElementById(id + "-via");
  var chips = document.getElementById(id + "-chips");
  var last = t.steps.length - 1;
  var step = 0;
  var answers = [];
  var picked = [];          // 1-qadam: tanlangan variantlar
  var method = "phone";     // 3-qadam: phone | email

  /* ---------- telefon formati: +998 (XX) XXX-XX-XX ---------- */
  function phoneDigits(v) {
    var d = v.replace(/\D/g, "");
    if (d.indexOf("998") === 0) d = d.slice(3);
    return d.slice(0, 9);
  }
  function formatPhone(d) {
    var s = "+998";
    if (d.length) s += " (" + d.slice(0, 2);
    if (d.length >= 2) s += ")";
    if (d.length > 2) s += " " + d.slice(2, 5);
    if (d.length > 5) s += "-" + d.slice(5, 7);
    if (d.length > 7) s += "-" + d.slice(7, 9);
    return s;
  }
  function onInput() {
    input.setCustomValidity("");
    if (step === last && method === "phone") {
      var d = phoneDigits(input.value);
      input.value = d.length ? formatPhone(d) : "";
    }
  }
  input.addEventListener("input", onInput);
  input.addEventListener("focus", function () {
    if (step === last && method === "phone" && !input.value) input.value = "+998 ";
  });
  input.addEventListener("blur", function () {
    if (step === last && method === "phone" && !phoneDigits(input.value).length) input.value = "";
  });

  /* ---------- qadamni ko'rsatish ---------- */
  function setMethod(m) {
    method = m;
    if (via) [].forEach.call(via.querySelectorAll("button"), function (b) { b.setAttribute("aria-pressed", String(b.dataset.via === m)); });
    var phone = m === "phone";
    input.type = phone ? "tel" : "email";
    input.name = phone ? "phone" : "email";
    input.autocomplete = phone ? "tel" : "email";
    input.inputMode = phone ? "tel" : "email";
    input.placeholder = phone ? t.steps[last].placeholder : t.emailPlaceholder;
    input.setAttribute("aria-label", input.placeholder);
    input.value = "";
    input.setCustomValidity("");
  }
  function show(i) {
    var s = t.steps[i];
    form.dataset.step = String(i);
    if (steps) {
      steps.dataset.step = String(i);
      if (stepNum) stepNum.textContent = String(i + 1);
    }
    if (opts) opts.hidden = i !== 0;
    input.required = true;
    renderChips();
    if (via) via.hidden = i !== last;
    if (i === last) setMethod(method);
    else {
      input.type = s.type;
      input.name = s.name;
      input.autocomplete = s.autoComplete;
      input.inputMode = "text";
      input.placeholder = i === 0 && picked.indexOf("other") >= 0 ? t.otherPlaceholder : s.placeholder;
      input.setAttribute("aria-label", input.placeholder);
      input.value = i === 0 ? (answers[0] && answers[0].typed) || "" : answers[i] || "";
    }
    // almashish sezilsin: input qayta "kirib keladi"
    form.classList.remove("is-swap");
    void form.offsetWidth;
    form.classList.add("is-swap");
  }

  /* ---------- 1-qadam: tanlanganlar input ichida chip bo'lib (× bilan olib tashlanadi) ---------- */
  var X = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17"/></svg>';
  function renderChips() {
    if (!chips) return;
    chips.textContent = "";
    if (step !== 0) return;
    picked.forEach(function (v) {
      if (v === "other") return;
      var chip = document.createElement("span");
      chip.className = "contact__chip";
      chip.textContent = v;
      var x = document.createElement("button");
      x.type = "button";
      x.dataset.remove = v;
      x.setAttribute("aria-label", t.remove + ": " + v);
      x.innerHTML = X;
      chip.appendChild(x);
      chips.appendChild(chip);
    });
    // chiplar bo'lsa placeholder qisqaradi — input joyi kichrayadi
    var others = picked.some(function (v) { return v !== "other"; });
    input.required = !others;   // variant tanlangan bo'lsa — inputga yozish shart emas
    input.placeholder = picked.indexOf("other") >= 0 ? t.otherPlaceholder : others ? "" : t.steps[0].placeholder;
    chips.scrollLeft = chips.scrollWidth;
  }
  function setPicked(v, on) {
    var at = picked.indexOf(v);
    if (on && at < 0) picked.push(v);
    if (!on && at >= 0) picked.splice(at, 1);
    if (opts) {
      var b = opts.querySelector('button[data-opt="' + (window.CSS && CSS.escape ? CSS.escape(v) : v) + '"]');
      if (b) b.setAttribute("aria-pressed", String(on));
    }
    input.setCustomValidity("");
    renderChips();
  }
  if (chips) chips.addEventListener("click", function (e) {
    var x = e.target.closest("button[data-remove]");
    if (!x) return;
    setPicked(x.dataset.remove, false);
    input.focus();
  });

  /* ---------- 1-qadam: variantlar ---------- */
  function onPick(e) {
    var b = e.target.closest("button[data-opt]");
    if (!b) return;
    var v = b.dataset.opt, on = picked.indexOf(v) < 0;
    setPicked(v, on);
    if (v === "other" && on) input.focus();
  }
  if (opts) opts.addEventListener("click", onPick);
  function onVia(e) {
    var b = e.target.closest("button[data-via]");
    if (!b || b.dataset.via === method) return;
    setMethod(b.dataset.via);
    input.focus();
  }
  if (via) via.addEventListener("click", onVia);

  // 1-qadam javobi: tanlangan nomlar ("Boshqa"siz) + inputga yozilgani
  function firstAnswer() {
    var names = picked.filter(function (v) { return v !== "other"; });
    var typed = input.value.trim();
    if (typed) names.push(typed);
    return { text: names.join(", "), typed: typed };
  }

  /* ---------- yuborish ---------- */
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (step === 0) {
      var a = firstAnswer();
      if (!a.text) { input.setCustomValidity(t.pickError); input.reportValidity(); return; }
      answers[0] = a;
    } else if (step === last) {
      if (method === "phone") {
        if (phoneDigits(input.value).length !== 9) { input.setCustomValidity(t.phoneError); input.reportValidity(); return; }
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim())) {
        input.setCustomValidity(t.emailError);
        input.reportValidity();
        return;
      }
      answers[step] = input.value.trim();
    } else {
      var v = input.value.trim();
      if (!v) { input.value = ""; input.reportValidity(); return; }
      answers[step] = v;
    }
    if (step < last) {
      show(++step);
      input.focus();
      return;
    }
    var body = t.steps.map(function (s, i) {
      if (i === 0) return s.label + answers[0].text;
      if (i === last) return (method === "phone" ? s.label : t.emailLabel) + answers[i];
      return s.label + answers[i];
    }).join("\n");
    location.href = "mailto:hello@robohub.uz?subject=" + encodeURIComponent(t.subject) + "&body=" + encodeURIComponent(body);
    // forma tasdiq holatiga o'tadi (animatsiya robohub.css da: .contact__form.is-done)
    input.blur();
    input.disabled = true;
    button.disabled = true;
    if (via) via.hidden = true;
    if (steps) steps.dataset.step = "done";
    form.classList.add("is-done");
    done.setAttribute("aria-hidden", "false");
  });

  show(0);
  form.classList.remove("is-swap");   // birinchi ko'rinishda animatsiya kerak emas
}
