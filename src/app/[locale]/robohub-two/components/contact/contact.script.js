// aloqa bo'limining brauzer mantig'i.
// contact-script.tsx uni sahifa ochilganda bir marta ishga tushiradi.
// t — xat matni joriy tilda: { subject, phone }
export function init(t) {
(function () {
  "use strict";
  var form = document.getElementById("contact-form");
  if (!form) return;
  /* Backend yo'q: kiritilgan ma'lumotdan hello@robohub.uz manziliga tayyor xat tuziladi */
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var body = t.phone + d.get("phone");
    location.href = "mailto:hello@robohub.uz?subject=" + encodeURIComponent(t.subject) + "&body=" + encodeURIComponent(body);
  });
})();
}
