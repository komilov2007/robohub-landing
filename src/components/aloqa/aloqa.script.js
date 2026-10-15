// aloqa bo'limining brauzer mantig'i.
// aloqa-script.tsx uni sahifa ochilganda bir marta ishga tushiradi.
export function init() {
(function () {
  "use strict";
  var form = document.getElementById("contact-form");
  if (!form) return;
  /* Backend yo'q: kiritilgan ma'lumotdan hello@robohub.uz manziliga tayyor xat tuziladi */
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var d = new FormData(form);
    var body = "Telefon: " + d.get("phone");
    location.href = "mailto:hello@robohub.uz?subject=" + encodeURIComponent("Robohub: sayt orqali murojaat") + "&body=" + encodeURIComponent(body);
  });
})();
}
