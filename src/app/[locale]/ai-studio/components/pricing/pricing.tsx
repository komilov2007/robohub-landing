"use client";

import { useState, type CSSProperties } from "react";
import Icon from "../icon/svg-icon";
import {
  PRICE_PER_IMAGE,
  PRICE_PER_IMAGE_SUB,
  SUB_SAVING,
  TOKENS_PER_IMAGE,
  TOKEN_PRICE,
  TOKEN_PRICE_SUB,
  money,
  plural,
} from "../../ai-studio.content";
import { useC } from "../../content-context";

// 07 — Token hisoblagichi + token paketlari.
// Rasm sonini tanlang → token (1 rasm = 3 token) va narx jonli hisoblanadi: obunasiz va Robohub obunasi bilan.
// Paketlar: rasm soni — sovg'a tokenlar bilan birga (150 + 10 = 160 token = 53 rasm).
export default function Pricing() {
  const { PRICING, T } = useC();
  const F = T.forms;
  const cur = T.currency;
  const [images, setImages] = useState(PRICING.calc.initial);
  const tokens = images * TOKENS_PER_IMAGE;
  const sum = images * PRICE_PER_IMAGE;
  const sumSub = images * PRICE_PER_IMAGE_SUB;
  const fill = ((images - PRICING.calc.min) / (PRICING.calc.max - PRICING.calc.min)) * 100;

  return (
    <section className="as-price" id="pricing" aria-labelledby="as-price-title" data-pause>
      <div className="as-wrap">
        <header className="as-sec-head">
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
              <b key={`s${sum}`}>{money(sum)}</b> {cur}
            </span>
          </output>
          <p className="as-calc__sub" aria-live="polite">
            {PRICING.sub}: <b key={`ss${sumSub}`}>{money(sumSub)}</b> {cur}
            <span className="as-save">−{SUB_SAVING}%</span>
          </p>
        </div>

        <h3 className="as-packs__title" data-rv style={{ "--d": "260ms" } as CSSProperties}>
          {PRICING.packs}
        </h3>
        <ul className="as-packs">
          {PRICING.packList.map((p, i) => {
            const total = p.tokens + p.bonus;
            const imgs = Math.floor(total / TOKENS_PER_IMAGE);
            return (
              <li
                key={p.tokens}
                className={`as-pack${p.bonus ? " has-bonus" : ""}`}
                data-rv
                style={{ "--d": `${300 + i * 60}ms` } as CSSProperties}
              >
                <span className="as-pack__tok">
                  <b>{p.tokens}</b> {plural(p.tokens, F.token)}
                </span>
                {p.bonus > 0 && (
                  <span className="as-pack__gift">
                    <Icon name="ai" />+{p.bonus} {plural(p.bonus, F.token)} {PRICING.gift}
                  </span>
                )}
                <span className="as-pack__img">
                  {imgs} {plural(imgs, F.image)}
                </span>
                <span className="as-pack__price">
                  <b>{money(p.tokens * TOKEN_PRICE)}</b> {cur}
                </span>
                <span className="as-pack__sub">
                  {PRICING.sub}: {money(p.tokens * TOKEN_PRICE_SUB)} {cur}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
