// aloqa bo'limining brauzer mantig'i: bitta inputli quiz.
// contact-script.tsx uni sahifa ochilganda bir marta ishga tushiradi.
// t — joriy tildagi matn: { subject, steps: [{ name, type, autoComplete, placeholder, label }] }
export function init(t) {
(function () {
  "use strict";
  var form = document.getElementById("contact-form");
  if (!form) return;
  var input = form.querySelector("input");
  var button = form.querySelector("button");
  var done = form.querySelector(".contact__done");
  var step = 0;
  var answers = [];

  /* Dizayn o'zgarmaydi: o'sha input yangi savolga moslashtiriladi */
  function show(i) {
    var s = t.steps[i];
    input.type = s.type;
    input.name = s.name;
    input.autocomplete = s.autoComplete;
    input.inputMode = s.type === "tel" ? "tel" : "text";
    input.placeholder = s.placeholder;
    input.setAttribute("aria-label", s.placeholder);
    input.value = answers[i] || "";
  }

  /* Backend yo'q: oxirgi javobdan keyin hello@robohub.uz manziliga tayyor xat tuziladi */
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = input.value.trim();
    if (!v) { input.value = ""; input.reportValidity(); return; }
    answers[step] = v;
    if (step < t.steps.length - 1) {
      show(++step);
      input.focus();
      return;
    }
    var body = t.steps.map(function (s, i) { return s.label + answers[i]; }).join("\n");
    location.href = "mailto:hello@robohub.uz?subject=" + encodeURIComponent(t.subject) + "&body=" + encodeURIComponent(body);
    // forma tasdiq holatiga o'tadi (animatsiya robohub.css da: .contact__form.is-done)
    input.blur();
    input.disabled = true;
    button.disabled = true;
    form.classList.add("is-done");
    done.setAttribute("aria-hidden", "false");
  });
})();
}
