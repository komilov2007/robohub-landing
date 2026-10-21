"use client";

import { useState, type CSSProperties } from "react";
import Icon from "../icon/icon";
import CountUp from "../count-up/count-up";
import { SIGNUP_HREF, TOKENS_PER_IMAGE, plural, type Content } from "../../ai-studio.content";
import { useC } from "../../content-context";

const fmt = (n: number) => n.toLocaleString("ru-RU").replace(/ /g, " ");

// Kerakli tokenni qoplaydigan eng kichik tarif (yetmasa — eng kattasi)
const pickPlan = (plans: Content["PRICING"]["plans"], tokens: number) => plans.find((p) => p.tokens >= tokens) ?? plans[plans.length - 1];

// 07 — Narxlar.
//  • Kartalar kirishda chap/o'ng/pastdan "yig'iladi"; Biznes — brend yashilida, atrofida aylanuvchi mint chegara.
//  • Kalkulyator: rasm sonini tanlang → token va taxminiy narx jonli hisoblanadi,
//    mos keladigan tarif kartasi yoritiladi ("Sizga mos" belgisi).
export default function Pricing() {
  const { PRICING, T } = useC();
  const F = T.forms;
  const cur = T.currency;
  const [images, setImages] = useState(PRICING.calc.initial);
  const tokens = images * TOKENS_PER_IMAGE;
  const fit = pickPlan(PRICING.plans, tokens);
  const packs = Math.ceil(tokens / fit.tokens);
  const sum = packs * fit.price;
  const fill = ((images - PRICING.calc.min) / (PRICING.calc.max - PRICING.calc.min)) * 100;

  return (
    <section className="as-price" id="pricing" aria-labelledby="as-price-title" data-pause>
      <div className="as-wrap">
        <header className="as-sec-head">
          <p className="as-eyebrow" data-rv>
            <span>07</span>
            {PRICING.eyebrow}
          </p>
          <h2 className="as-h2" id="as-price-title" data-rv style={{ "--d": "80ms" } as CSSProperties}>
            {PRICING.title} <span className="as-h2__accent">{PRICING.accent}</span>
          </h2>
          <p className="as-sec-lead" data-rv style={{ "--d": "160ms" } as CSSProperties}>
            {PRICING.lead}
          </p>
        </header>

        <ul className="as-plans">
          {PRICING.plans.map((p, i) => (
            <li
              key={p.id}
              className={"as-plan" + (p.featured ? " is-featured" : "") + (fit.id === p.id ? " is-fit" : "")}
              data-rv
              style={{ "--d": `${i * 120}ms`, "--from": i - 1 } as CSSProperties}
            >
              {p.featured && <span className="as-plan__ring" aria-hidden="true" />}
              <div className="as-plan__top">
                <h3 className="as-plan__name">{p.name}</h3>
                {p.featured && <span className="as-plan__tag">{PRICING.tag}</span>}
                <span className="as-plan__fit" aria-hidden={fit.id !== p.id}>
                  <Icon name="check" />
                  {PRICING.fit}
                </span>
              </div>
              <p className="as-plan__tokens">
                <CountUp value={p.tokens} />
                <span>{plural(p.tokens, F.token)}</span>
              </p>
              <p className="as-plan__imgs">
                {p.tokens / TOKENS_PER_IMAGE} {plural(p.tokens / TOKENS_PER_IMAGE, F.image)} <i>·</i> {fmt(p.price)} {cur}
              </p>
              <p className="as-plan__per">≈ {fmt(Math.round(p.price / (p.tokens / TOKENS_PER_IMAGE)))} {PRICING.perImage}</p>
              <ul className="as-plan__feats">
                {PRICING.features.map((f) => (
                  <li key={f}>
                    <Icon name="check" />
                    {f}
                  </li>
                ))}
              </ul>
              <a className={"as-btn as-btn--lg " + (p.featured ? "as-btn--mint" : "as-btn--ghost")} href={SIGNUP_HREF}>
                {PRICING.buy}
              </a>
            </li>
          ))}
        </ul>

        <div className="as-calc" data-rv>
          <label className="as-calc__q" htmlFor="as-calc-range">
            <span className="as-calc__ico">
              <Icon name="ai" />
            </span>
            {PRICING.calc.label}
          </label>
          <div className="as-calc__range">
            <input
              id="as-calc-range"
              type="range"
              min={PRICING.calc.min}
              max={PRICING.calc.max}
              value={images}
              onChange={(e) => setImages(Number(e.target.value))}
              style={{ "--fill": `${fill}%` } as CSSProperties}
              aria-valuetext={`${images} ${plural(images, F.image)}`}
            />
            <span className="as-calc__scale" aria-hidden="true">
              <span>{PRICING.calc.min}</span>
              <span>{PRICING.calc.max}</span>
            </span>
          </div>
          <output className="as-calc__out" htmlFor="as-calc-range" aria-live="polite">
            <span className="as-calc__cell">
              <b key={`i${images}`}>{images}</b> {plural(images, F.imageShort)}
            </span>
            <i>=</i>
            <span className="as-calc__cell">
              <b key={`t${tokens}`}>{tokens}</b> {plural(tokens, F.token)}
            </span>
            <i>≈</i>
            <span className="as-calc__cell as-calc__cell--sum">
              <b key={`s${sum}`}>{fmt(sum)}</b> {cur}
            </span>
          </output>
        </div>
      </div>
    </section>
  );
}
