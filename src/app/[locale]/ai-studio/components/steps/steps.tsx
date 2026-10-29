"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Icon from "../icon/svg-icon";
import { plural, TOKEN_PRICE, money } from "../../ai-studio.content";
import { useC } from "../../content-context";

const STEP_MS = 1800;   // qadamlar orasidagi vaqt (tez almashadi)
const FORMATS = ["JPG", "PNG", "WEBP", "HEIC"];

// 1 — yuklash oynasi: fayllar tushadi, progress to'ladi, Ctrl+V tugmasi bosiladi
function UploadMock() {
  const { VARIANTS, STEPS_SECTION } = useC();
  return (
    <div className="as-mk as-mk--upload">
      <div className="as-drop">
        <Icon name="image" />
        <b>{STEPS_SECTION.drop}</b>
        <span className="as-drop__fmt">
          {FORMATS.map((f, i) => (
            <i key={f} style={{ "--k": i } as CSSProperties}>{f}</i>
          ))}
        </span>
      </div>
      <div className="as-files">
        {[VARIANTS[0].img, "/ai/base_cosmetics.webp"].map((src, i) => (
          <span className="as-file" key={src} style={{ "--k": i } as CSSProperties}>
            <img src={src} alt="" />
            <i className="as-file__bar" />
          </span>
        ))}
        <span className="as-keys">
          <kbd>Ctrl</kbd>+<kbd>V</kbd>
        </span>
      </div>
    </div>
  );
}

// 2 — rejim tanlash: belgi Foto → Infografika ga o'tadi
function ModeMock() {
  const { MODES, T } = useC();
  return (
    <div className="as-mk as-mk--mode">
      {MODES.items.map((m, i) => (
        <span className={"as-opt" + (i === 1 ? " is-pick" : "")} key={m.id}>
          <span className="as-opt__radio" />
          <b>{m.name}</b>
          <small>
            {m.tokens} {plural(m.tokens, T.forms.token)} · {money(m.tokens * TOKEN_PRICE)} {T.currency}
          </small>
        </span>
      ))}
      <span className="as-opt__cursor">
        <Icon name="cursor" />
      </span>
    </div>
  );
}

// 3 — istak: matn harfma-harf yoziladi, "AI g'oya" tugmasi yaltiraydi
function PromptMock({ active }: { active: boolean }) {
  const { STEPS_SECTION } = useC();
  const [n, setN] = useState(0);
  const text = STEPS_SECTION.prompt;
  useEffect(() => {
    if (!active) return;
    let i = 0;
    const t = window.setInterval(() => {
      i += 1;
      setN(i);
      if (i >= text.length) window.clearInterval(t);
    }, 22); // 3-qadam matni STEP_MS ichida to'liq yozilib ulgurishi uchun
    return () => {
      window.clearInterval(t);
      setN(0);
    };
  }, [active, text.length]);
  return (
    <div className="as-mk as-mk--prompt">
      <div className="as-area">
        <span>{active ? text.slice(0, n) : text}</span>
        <i className="as-caret" />
      </div>
      <span className="as-idea">
        <Icon name="ai" />
        {STEPS_SECTION.idea}
      </span>
    </div>
  );
}

// 4 — generatsiya: tugma → halqa to'ladi → natijalar paydo bo'ladi
function GenerateMock() {
  const { VARIANTS, STEPS_SECTION } = useC();
  return (
    <div className="as-mk as-mk--gen">
      <span className="as-gen__btn">
        <Icon name="ai" />
        {STEPS_SECTION.generate}
        <i className="as-gen__load" />
      </span>
      <div className="as-gen__grid">
        {VARIANTS.map((v, i) => (
          <img key={v.id} src={v.img} alt="" style={{ "--k": i } as CSSProperties} />
        ))}
        <span className="as-gen__dl" style={{ "--k": 3 } as CSSProperties}>
          <Icon name="arrow" />
        </span>
      </div>
    </div>
  );
}

// 05 — Qanday ishlaydi — "pleyer" ko'rinishi: chapda sarlavha va qadamlar ro'yxati (vertikal chiziq faol qadamgacha to'ladi),
// o'ngda bitta katta "brauzer oynasi" — unda faol qadamning mini-interfeysi boshidan o'ynaydi.
// Qadamlar o'zi navbat bilan almashadi; bosilsa — o'sha qadam ochiladi.
export default function Steps() {
  const { STEPS_SECTION } = useC();
  const [cur, setCur] = useState(0);
  const [seen, setSeen] = useState(false);
  const [cycle, setCycle] = useState(0);
  const rootRef = useRef<HTMLElement>(null);
  const visible = useRef(false);
  const steps = STEPS_SECTION.steps;

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting;
        if (e.isIntersecting) setSeen(true);
      },
      { threshold: 0.3 },
    );
    if (rootRef.current) io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => {
      if (visible.current) setCur((c) => (c + 1) % steps.length);
      else setCycle((c) => c + 1);
    }, STEP_MS);
    return () => window.clearTimeout(t);
  }, [cur, seen, cycle, steps.length]);

  const step = steps[cur];
  return (
    <section
      className={"as-how" + (seen ? " is-seen" : "")}
      id="how"
      ref={rootRef}
      aria-labelledby="as-how-title"
      style={{ "--cur": cur, "--n": steps.length, "--step": `${STEP_MS}ms` } as CSSProperties}
    >
      <span className="as-how__bg" aria-hidden="true" />
      {/* telefon (≤767px) — alohida "stories" ko'rinishi: tepada sarlavha, oyna (ustida qadamlar progressi),
          ostida faol qadam izohi va 2×2 qadam tugmalari */}
      <div className="as-wrap as-hm as-only-m">
        <h2 className="as-h2" data-rv style={{ "--d": "80ms" } as CSSProperties}>
          {STEPS_SECTION.title} <span className="as-h2__accent">{STEPS_SECTION.accent}</span>
        </h2>
        <p className="as-hm__lead" data-rv style={{ "--d": "160ms" } as CSSProperties}>
          {STEPS_SECTION.lead}
        </p>

        <div className="as-hm__win" data-rv style={{ "--d": "220ms" } as CSSProperties}>
          <div className="as-hm__segs" aria-hidden="true">
            {steps.map((s, i) => (
              <i key={s.id} className={(i === cur ? "is-active" : "") + (i < cur ? "is-done" : "")} />
            ))}
          </div>
          <div className="as-hm__body">
            <div className="as-play" key={cur} aria-label={step.title}>
              {step.id === "upload" && <UploadMock />}
              {step.id === "mode" && <ModeMock />}
              {step.id === "prompt" && <PromptMock active />}
              {step.id === "generate" && <GenerateMock />}
            </div>
          </div>
          <div className="as-hm__cap" key={`m${cur}`}>
            <span className="as-hm__num">0{cur + 1}</span>
            <div>
              <b>{step.title}</b>
              <p>{step.text}</p>
            </div>
          </div>
        </div>

        <ol className="as-hm__tabs">
          {steps.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                className={"as-hm__tab" + (i === cur ? " is-active" : "") + (i < cur ? " is-done" : "")}
                aria-current={i === cur ? "step" : undefined}
                onClick={() => setCur(i)}
              >
                <span className="as-hm__tnum">
                  <span>0{i + 1}</span>
                  <Icon name="check" />
                </span>
                {s.title}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="as-wrap as-how__grid as-only-d">
        <div className="as-how__side">
          <h2 className="as-h2" id="as-how-title" data-rv style={{ "--d": "80ms" } as CSSProperties}>
            {STEPS_SECTION.title} <span className="as-h2__accent">{STEPS_SECTION.accent}</span>
          </h2>
          <p className="as-sec-lead" data-rv style={{ "--d": "160ms" } as CSSProperties}>
            {STEPS_SECTION.lead}
          </p>

          <ol className="as-steps">
            <span className="as-steps__track" aria-hidden="true">
              <i />
            </span>
            {steps.map((s, i) => (
              <li
                key={s.id}
                className={"as-step" + (i === cur ? " is-active" : "") + (i < cur ? " is-done" : "")}
                style={{ "--k": i } as CSSProperties}
              >
                <button type="button" className="as-step__btn" aria-current={i === cur ? "step" : undefined} onClick={() => setCur(i)}>
                  <span className="as-step__num">
                    <span>0{i + 1}</span>
                    <Icon name="check" />
                  </span>
                  <span className="as-step__body">
                    <span className="as-step__title">{s.title}</span>
                    <span className="as-step__text">{s.text}</span>
                    <span className="as-step__bar" aria-hidden="true" />
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="as-win" data-rv style={{ "--d": "200ms" } as CSSProperties}>
          <div className="as-win__bar" aria-hidden="true">
            <span className="as-win__dots">
              <i />
              <i />
              <i />
            </span>
            <span className="as-win__url">
              <Icon name="ai" />
              studio.robohub.uz
            </span>
            <span className="as-win__step">
              0{cur + 1} / 0{steps.length}
            </span>
          </div>
          <div className="as-win__body">
            <div className="as-play" key={cur} aria-label={step.title}>
              {step.id === "upload" && <UploadMock />}
              {step.id === "mode" && <ModeMock />}
              {step.id === "prompt" && <PromptMock active />}
              {step.id === "generate" && <GenerateMock />}
            </div>
          </div>
          <p className="as-win__caption" key={`c${cur}`}>
            <b>{step.title}</b> — {step.text}
          </p>
        </div>
      </div>
    </section>
  );
}
