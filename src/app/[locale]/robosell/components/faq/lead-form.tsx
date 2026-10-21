"use client";

import { useRef, useState, type FormEvent } from "react";

// "Savolingiz qoldimi?" — Robohub landingidagi kabi bitta inputli forma: savollar ketma-ket almashadi
// (ism → kompaniya → telefon). Oxirida /api/lead orqali Telegram guruhiga yuboriladi (token serverda).
// Holatlar: kiritish → yuborilmoqda → tasdiq (forma doiraga yopilib, belgi bilan ochiladi) / xato.
const STEPS = [
  { name: "name", type: "text", autoComplete: "name", inputMode: "text", placeholder: "Ismingiz" },
  { name: "company", type: "text", autoComplete: "organization", inputMode: "text", placeholder: "Kompaniya nomi" },
  { name: "phone", type: "tel", autoComplete: "tel", inputMode: "tel", placeholder: "+998 90 123 45 67" },
] as const;

type Status = "idle" | "sending" | "done" | "error";

export default function LeadForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(["", "", "+998 "]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const trapRef = useRef<HTMLInputElement>(null);
  const s = STEPS[step];

  const setValue = (v: string) => setAnswers((a) => a.map((x, i) => (i === step ? v : x)));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending" || status === "done") return;
    const v = answers[step].trim();
    setError("");
    if (s.name === "phone") {
      const d = v.replace(/\D/g, "");
      if (d.length < 12) {
        setError("Telefon raqamini to‘liq kiriting");
        inputRef.current?.focus();
        return;
      }
    } else if (v.length < 2) {
      setError(step === 0 ? "Ismingizni kiriting" : "Kompaniya nomini kiriting");
      inputRef.current?.focus();
      return;
    }
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      requestAnimationFrame(() => inputRef.current?.focus());
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: answers[0].trim(),
          company: answers[1].trim(),
          phone: answers[2].trim(),
          source: "Robosell landing",
          website: trapRef.current?.value ?? "",
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      inputRef.current?.blur();
      setStatus("done");
    } catch {
      setStatus("error");
      setError("Yuborilmadi. Qayta urinib ko‘ring yoki qo‘ng‘iroq qiling.");
    }
  };

  const done = status === "done";
  return (
    <div className="rs-lead">
      <form className={"rs-lead__form" + (done ? " is-done" : "")} onSubmit={onSubmit} noValidate>
        <span className="rs-lead__step" aria-hidden="true">
          {step + 1}/{STEPS.length}
        </span>
        <input
          ref={inputRef}
          key={s.name}
          type={s.type}
          name={s.name}
          autoComplete={s.autoComplete}
          inputMode={s.inputMode}
          placeholder={s.placeholder}
          aria-label={s.placeholder}
          aria-invalid={!!error || undefined}
          aria-describedby="rs-lead-msg"
          value={answers[step]}
          onChange={(e) => setValue(e.target.value)}
          disabled={done || status === "sending"}
          maxLength={s.name === "phone" ? 20 : 100}
          required
        />
        {/* botlar uchun tuzoq — odamga ko'rinmaydi */}
        <input ref={trapRef} className="rs-lead__trap" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button type="submit" aria-label={step < STEPS.length - 1 ? "Keyingisi" : "Yuborish"} disabled={done || status === "sending"}>
          {status === "sending" ? (
            <i className="rs-lead__spin" aria-hidden="true" />
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 12h15M13 6l6 6-6 6" />
            </svg>
          )}
        </button>
        <div className="rs-lead__done" role="status" aria-hidden={!done}>
          <span className="rs-lead__ok">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </span>
          <span>
            <b>Ariza qabul qilindi!</b>
            <small>Menejerimiz 15 daqiqada bog‘lanadi</small>
          </span>
        </div>
      </form>
      <span className="rs-lead__dots" aria-hidden="true">
        {STEPS.map((x, i) => (
          <i key={x.name} className={i < step || done ? "is-done" : i === step ? "is-on" : undefined} />
        ))}
      </span>
      <p className="rs-lead__msg" id="rs-lead-msg" aria-live="polite">
        {error}
      </p>
    </div>
  );
}
