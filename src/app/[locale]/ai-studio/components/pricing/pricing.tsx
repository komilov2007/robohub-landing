"use client";

import { useState, type CSSProperties } from "react";
import Icon from "../icon/icon";
import { TOKENS_PER_IMAGE, plural } from "../../ai-studio.content";
import { useC } from "../../content-context";

const fmt = (n: number) => n.toLocaleString("ru-RU").replace(/ /g, " ");

// 07 — Token hisoblagichi: tarif kartochkalarisiz, alohida bo'lim.
// Rasm sonini tanlang → token (1 rasm = 3 token) va narx (1 rasm = 1 500 so'm) jonli hisoblanadi.
export default function Pricing() {
  const { PRICING, T } = useC();
  const F = T.forms;
  const cur = T.currency;
  const [images, setImages] = useState(PRICING.calc.initial);
  const tokens = images * TOKENS_PER_IMAGE;
  const sum = images * PRICING.pricePerImage;
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

        <div className="as-calc" data-rv style={{ "--d": "220ms" } as CSSProperties}>
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
            <i>=</i>
            <span className="as-calc__cell as-calc__cell--sum">
              <b key={`s${sum}`}>{fmt(sum)}</b> {cur}
            </span>
          </output>
        </div>
      </div>
    </section>
  );
}
