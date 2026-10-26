"use client";

import { useEffect, useRef, useState, type ChangeEvent, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { useParams, useRouter } from "next/navigation";
import LangSelect from "@/components/lang-select/lang-select";
import { localeHref, type Locale } from "@/i18n/config";
import { PHONE, PHONE_HREF, PHONE_MOBILE, PHONE_MOBILE_HREF } from "@/lib/contacts";
import type { FormMessages } from "./application.i18n";
import {
  APPLICATION_PATH,
  FORM_STEPS,
  isStepDone,
  PHONE_DIGITS,
  SEND_SLUG,
  stepIndex,
  stepSlug,
  toFormData,
  type StepConfig,
} from "./steps";
import { markSent, resetApplication, setAnswer, setOther, useApplicationState, useHydrated } from "./store";
import "./application.css";

// Ariza formasi — Robohub (6 qadam) va Robosell (9 qadam) domenlarida /application/step-N, yuborilgandan keyin — /application/send.
// Savollar — steps.ts (FORM_STEPS[site]), matnlar — layout'dan (application.i18n.ts / robosell.i18n.ts).
// Har qadam — alohida URL (reklama/analitika qaysi qadamda to'xtashini ko'radi). Forma application/layout.tsx da turadi,
// shuning uchun qadamlar orasida o'tganda holat saqlanadi; javoblar sessionStorage'da — sahifa yangilansa ham yo'qolmaydi.
// Oldingi qadamlar to'ldirilmagan bo'lsa (masalan /application/step-5 to'g'ridan-to'g'ri ochilsa) — birinchi bo'sh qadamga.
// Bitta javobli qadamda (radio) "Davom etish" tugmasi yo'q — tanlangach o'zi keyingisiga o'tadi
// ("Boshqa" tanlansa — matn maydoni va tugma chiqadi).
// Oxirida /api/submit-form → robo.uz/api/submit-form → amoCRM.

type Status = "idle" | "sending" | "error";

// "90 123 45 67" — 9 ta mahalliy raqam, +998 alohida ko'rsatiladi
const formatPhone = (d: string) => [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean).join(" ");
// Qo'yilgan "+998 90 123 45 67" ham, "901234567" ham — 9 ta raqamga
const phoneDigits = (v: string) => {
  const all = v.replace(/\D/g, "");
  return (all.length > PHONE_DIGITS && all.startsWith("998") ? all.slice(3) : all).slice(0, PHONE_DIGITS);
};

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
  </svg>
);
const MobileIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 3v13h8V5zm4 14.2a1 1 0 1 0 0 .01z" fillRule="evenodd" />
  </svg>
);

// /send dagi 4 band belgilari (tartib — success.points bilan bir xil): tahlil, jarayon, bir joyda boshqaruv, o'sish
const DONE_ICONS = [
  ["M4 20V10M10 20V4M16 20v-7M22 20H2"],
  ["M5 6h10a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h10", "M17 15l3 3-3 3"],
  ["M3 8l9-5 9 5-9 5z", "M3 13l9 5 9-5", "M3 17.5l9 5 9-5"],
  ["M3 17l6-6 4 4 8-8", "M15 7h6v6"],
];

export default function Application({
  site,
  locale,
  t,
  logo,
}: {
  site: "robohub" | "robosell";
  locale: Locale;
  t: FormMessages;
  logo: ReactNode;
}) {
  const router = useRouter();
  const params = useParams<{ step?: string }>();
  const hydrated = useHydrated();
  const { answers, other, sent } = useApplicationState();
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState<Partial<Record<string, boolean>>>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const trapRef = useRef<HTMLInputElement>(null);
  const advanceRef = useRef<number>(0);
  // push bilan ochilgan qadamlar (tarixdagi tartibda) — "Orqaga" tugmasi uchun
  const pushedRef = useRef<number[]>([]);

  const slug = params.step;
  const isSend = slug === SEND_SLUG;
  const STEPS = FORM_STEPS[site];
  const found = stepIndex(slug, STEPS.length);
  const index = found === -1 ? 0 : found;
  const step = STEPS[index];
  const copy = t.steps[step.id];
  const firstOpen = STEPS.findIndex((s) => !isStepDone(s, answers, other));
  const canNext = isStepDone(step, answers, other);
  const isLast = index === STEPS.length - 1;
  const home = localeHref(locale, "/");
  const href = (s: string) => localeHref(locale, `${APPLICATION_PATH}/${s}`);

  const go = (i: number, replace = false) => {
    if (replace) router.replace(href(stepSlug(i)));
    else {
      pushedRef.current.push(i);
      router.push(href(stepSlug(i)));
    }
  };

  // "Orqaga": joriy qadamga oldingisidan "Davom etish" bilan kelingan bo'lsa — brauzer tarixida bir qadam orqaga
  // (shunda brauzerning o'z "orqaga"/"oldinga" tugmalari ham to'g'ri ishlaydi); aks holda (sahifa yangilangan,
  // to'g'ridan-to'g'ri ochilgan) — oldingi qadam joriy yozuv o'rniga ochiladi.
  const back = () => {
    const stack = pushedRef.current;
    if (stack[stack.length - 1] === index) {
      stack.pop();
      router.back();
    } else go(index - 1, true);
  };

  // Manzilni holatga moslash (sessionStorage gidratsiyadan keyin o'qiladi):
  //   /send — faqat yuborilgan bo'lsa, aks holda birinchi bo'sh qadam;
  //   yuborilgandan keyin brauzerda orqaga bosilsa (step-6 …) — yana /send; step-1 dan yangi ariza boshlanadi;
  //   noto'g'ri manzil yoki oldingi qadamlar bo'sh — birinchi bo'sh qadam.
  useEffect(() => {
    if (!hydrated) return;
    if (isSend) {
      if (!sent) go(Math.max(firstOpen, 0), true);
    } else if (sent && index > 0) router.replace(href(SEND_SLUG));
    else if (found === -1) go(0, true);
    else if (firstOpen !== -1 && index > firstOpen) go(firstOpen, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, isSend, sent, found, index, firstOpen]);

  // Yangi qadam: sahifa boshiga, fokus — matn maydoniga yoki savolga (ekran o'quvchilar yangi savolni eshitadi)
  useEffect(() => {
    window.clearTimeout(advanceRef.current);
    window.scrollTo({ top: 0 });
    if (isSend) return;
    if (step.type === "text" || step.type === "phone") inputRef.current?.focus({ preventScroll: true });
    else if (index > 0) headingRef.current?.focus({ preventScroll: true });
  }, [index, step.type, isSend]);

  // Brauzer tugmasi bilan orqaga qaytilganda ham ro'yxat joriy qadamgacha qisqaradi
  useEffect(() => {
    const stack = pushedRef.current;
    while (stack.length && stack[stack.length - 1] > index) stack.pop();
  }, [index]);

  useEffect(() => () => window.clearTimeout(advanceRef.current), []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!canNext) {
      setTouched((x) => ({ ...x, [step.id]: true }));
      inputRef.current?.focus();
      return;
    }
    if (!isLast) return go(index + 1);
    setStatus("sending");
    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form_data: [toFormData(STEPS, answers, other)], website: trapRef.current?.value ?? "" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      markSent();
      setStatus("idle");
      router.replace(href(SEND_SLUG));
    } catch {
      setStatus("error");
    }
  };

  const toggle = (s: StepConfig, value: string) => {
    const current = Array.isArray(answers[s.id]) ? (answers[s.id] as string[]) : [];
    const opt = s.options?.find((o) => o.value === value);
    let list: string[];
    if (current.includes(value)) list = current.filter((v) => v !== value);
    else if (opt?.exclusive) list = [value];
    else list = [...current.filter((v) => !s.options?.find((o) => o.value === v)?.exclusive), value];
    setAnswer(s.id, list);
  };
  const pick = (s: StepConfig, value: string) => {
    setAnswer(s.id, value);
    window.clearTimeout(advanceRef.current);
    // "Boshqa" — avval matn yoziladi, keyin "Davom etish"
    if (s.options?.find((o) => o.value === value)?.other) return;
    // Bitta javobli savol — tanlangach o'zi keyingisiga o'tadi (tanlov ko'rinib qolishi uchun qisqa kechikish)
    advanceRef.current = window.setTimeout(() => go(index + 1), 280);
  };

  const onPhone = (e: ChangeEvent<HTMLInputElement>) => {
    const prev = typeof answers.phone === "string" ? answers.phone : "";
    let d = phoneDigits(e.target.value);
    // Bo'sh joy ustida Backspace — raqamlar o'zgarmaydi; shunda oxirgi raqam o'chiriladi
    if ((e.nativeEvent as InputEvent).inputType === "deleteContentBackward" && d === prev) d = d.slice(0, -1);
    setAnswer("phone", d);
  };

  const langPath = `${APPLICATION_PATH}/${isSend ? SEND_SLUG : stepSlug(index)}`;
  const header = (
    <header className="apf__top">
      <a className="apf__logo" href={home} aria-label={`${site === "robohub" ? "Robohub" : "Robosell"} — ${t.home}`}>
        {logo}
      </a>
      <div className="apf__right">
        <div className="apf__phones">
          <a href={PHONE_HREF}>
            <PhoneIcon />
            {PHONE}
          </a>
          <a href={PHONE_MOBILE_HREF}>
            <MobileIcon />
            {PHONE_MOBILE}
          </a>
        </div>
        <a className="apf__call" href={PHONE_HREF} aria-label={`${t.call}: ${PHONE}`}>
          <PhoneIcon />
        </a>
        <LangSelect locale={locale} label={t.lang} path={langPath} />
      </div>
    </header>
  );

  if (isSend) {
    return (
      <div className="apf" data-site={site}>
        <div className="apf__head">{header}</div>
        <main className="apf__main apf__main--done">
          {hydrated && sent && (
            <section className="apf__done" role="status" aria-live="polite">
              {/* 1. tasdiq — brend rangidagi blok */}
              <div className="apf__done-hero">
                <span className="apf__done-ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </span>
                <h1 className="apf__done-title">{t.success.title}</h1>
                <p className="apf__done-text">{t.success.text}</p>
              </div>

              {/* 2. mutaxassis nima qiladi — belgili kartalar */}
              <h2 className="apf__done-sub">{t.success.listTitle}</h2>
              <ul className="apf__done-list">
                {t.success.points.map((p, i) => (
                  <li key={p} style={{ "--i": i } as CSSProperties}>
                    <span className="apf__done-pico" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        {DONE_ICONS[i]?.map((d) => (
                          <path key={d} d={d} />
                        ))}
                      </svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              {/* 3. vaqt va qo'ng'iroq */}
              <div className="apf__done-cta">
                <p className="apf__done-time">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  {t.success.time}
                </p>
                <p className="apf__done-hint">{t.success.callHint}</p>
                <a className="apf__btn apf__done-call" href={PHONE_HREF}>
                  <PhoneIcon />
                  {t.success.call}
                </a>
              </div>

              {/* yangi ariza: holat tozalanadi, birinchi qadamdan boshlanadi */}
              <button
                type="button"
                className="apf__done-restart"
                onClick={() => {
                  resetApplication();
                  router.push(href(stepSlug(0)));
                }}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4" />
                </svg>
                {t.success.restart}
              </button>
            </section>
          )}
        </main>
      </div>
    );
  }

  const value = answers[step.id];
  const selected = Array.isArray(value) ? value : typeof value === "string" ? [value] : [];
  const otherOn = step.options?.some((o) => o.other && selected.includes(o.value));
  const text = typeof value === "string" ? value : "";
  const showError = touched[step.id] && !canNext;
  const fieldError =
    step.type === "text" ? t.errors.name : step.type === "phone" ? t.errors.phone : otherOn ? t.errors.other : "";
  const Heading = index === 0 ? "h2" : "h1";
  const hint = step.type === "checkbox" ? t.multiHint : step.type === "radio" ? t.radioHint : "";

  return (
    <div className="apf" data-site={site}>
      <div className="apf__head">
        {header}
        <div className="apf__nav">
          {/* oldingi qadamga (step-3 → step-2 …); brauzerning "orqaga" tugmasi ham shunday ishlaydi */}
          <button type="button" className="apf__back" onClick={back} hidden={index === 0}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 19l-7-7 7-7" />
            </svg>
            <span>{t.back}</span>
          </button>
          <span className="apf__count" aria-label={`${t.progress} ${index + 1} / ${STEPS.length}`}>
            {index + 1}/{STEPS.length}
          </span>
        </div>
        <ol className="apf__progress" aria-hidden="true">
          {STEPS.map((s, i) => (
            <li key={s.id} className={i <= index ? "is-on" : undefined} />
          ))}
        </ol>
      </div>

      <main className="apf__main">
        <form className="apf__form" onSubmit={onSubmit} noValidate>
          {index === 0 && (
            <div className="apf__hero">
              <h1 className="apf__title">{t.hero.title}</h1>
              {t.hero.text && <p className="apf__lead">{t.hero.text}</p>}
            </div>
          )}

          <fieldset className="apf__step" key={step.id} aria-describedby={hint ? "apf-hint" : undefined}>
            <legend className="apf__legend">
              <Heading className="apf__q" id="apf-q" ref={headingRef} tabIndex={-1}>
                {copy.title}
              </Heading>
              {hint && (
                <span className="apf__hint" id="apf-hint">
                  {hint}
                </span>
              )}
            </legend>

            {step.options && (
              <div className={`apf__options${step.columns === 2 ? " apf__options--2" : ""}`}>
                {step.options.map((o, i) => {
                  const on = selected.includes(o.value);
                  return (
                    <label key={o.value} className="apf__opt" style={{ "--i": i } as CSSProperties}>
                      <input
                        type={step.type === "radio" ? "radio" : "checkbox"}
                        name={step.id}
                        value={o.value}
                        checked={on}
                        onChange={() => (step.type === "radio" ? pick(step, o.value) : toggle(step, o.value))}
                        // radio: allaqachon tanlangan variant bosilsa ham keyingisiga o'tadi
                        onClick={step.type === "radio" && on ? () => pick(step, o.value) : undefined}
                      />
                      {o.icon && <img className="apf__opt-ico" src={`/marketplaces/${o.icon}.svg`} alt="" width={28} height={28} />}
                      {o.emoji && (
                        <span className="apf__opt-emoji" aria-hidden="true">
                          {o.emoji}
                        </span>
                      )}
                      <span className="apf__opt-text">{copy.options?.[i] ?? o.value}</span>
                      <span className={`apf__mark apf__mark--${step.type}`} aria-hidden="true">
                        {step.type === "checkbox" && (
                          <svg viewBox="0 0 16 16">
                            <path d="M3.5 8.4 6.6 11.4 12.5 4.8" />
                          </svg>
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}

            {otherOn && (
              <div className="apf__field apf__field--other">
                <input
                  className="apf__input"
                  type="text"
                  autoFocus
                  maxLength={100}
                  enterKeyHint="next"
                  placeholder={copy.otherPlaceholder}
                  aria-label={copy.otherPlaceholder}
                  aria-invalid={showError || undefined}
                  aria-describedby="apf-err"
                  value={other[step.id] ?? ""}
                  onChange={(e) => setOther(step.id, e.target.value)}
                  onBlur={() => setTouched((x) => ({ ...x, [step.id]: true }))}
                />
              </div>
            )}

            {step.type === "text" && (
              <div className="apf__field">
                <input
                  ref={inputRef}
                  className="apf__input"
                  type="text"
                  name={step.id}
                  autoComplete={step.autoComplete ?? "off"}
                  autoCapitalize="words"
                  enterKeyHint="next"
                  maxLength={80}
                  placeholder={copy.placeholder}
                  aria-labelledby="apf-q"
                  aria-invalid={showError || undefined}
                  aria-describedby="apf-err"
                  value={text}
                  onChange={(e) => setAnswer(step.id, e.target.value.replace(/^\s+/, ""))}
                  onBlur={() => text && setTouched((x) => ({ ...x, [step.id]: true }))}
                />
              </div>
            )}

            {step.type === "phone" && (
              <div className="apf__field">
                <label className="apf__phone" data-invalid={showError || undefined}>
                  <span className="apf__phone-code">
                    <img src="/flags/uz.svg" alt="" width={22} height={22} />
                    +998
                  </span>
                  <input
                    ref={inputRef}
                    type="tel"
                    name="phone"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    enterKeyHint="send"
                    placeholder={copy.placeholder}
                    aria-labelledby="apf-q"
                    aria-invalid={showError || undefined}
                    aria-describedby="apf-err"
                    value={formatPhone(text)}
                    onChange={onPhone}
                    onBlur={() => text && setTouched((x) => ({ ...x, [step.id]: true }))}
                  />
                </label>
              </div>
            )}

            <p className="apf__field-err" id="apf-err" aria-live="polite">
              {showError ? fieldError : ""}
            </p>
          </fieldset>

          {/* botlar uchun tuzoq — odamga ko'rinmaydi */}
          <input ref={trapRef} className="apf__trap" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          {(step.type !== "radio" || otherOn) && (
            <div className="apf__actions">
              {status === "error" && isLast && (
                <p className="apf__error" role="alert">
                  {t.sendError}
                </p>
              )}
              <button
                type="submit"
                className="apf__btn apf__btn--wide"
                disabled={!hydrated || !canNext || status === "sending"}
                aria-busy={status === "sending" || undefined}
              >
                {status === "sending" ? <i className="apf__spin" aria-hidden="true" /> : isLast ? t.submit : t.next}
              </button>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
