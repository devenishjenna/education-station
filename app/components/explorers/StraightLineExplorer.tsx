"use client"

import { MathsText, MathsTextFO } from "../MathsText"
import { useState } from "react"

// ---------- GRAPH GEOMETRY ----------
const RANGE = 10                    // units shown either side of the origin
const SIZE = 300                    // viewBox width and height
const SCALE = SIZE / (RANGE * 2)    // pixels per unit
const ORIGIN = SIZE / 2             // centre of the viewBox

const TICK_STEP = 2                 // label every 2 units — every 1 is too dense at this size
const TICK_LEN = 3                  // how far a tick pokes out either side of the axis
const PAD = 16                      // gap between the end of an axis and the border

// so EDGE is how far the padded border sits in maths units.
const EDGE = RANGE + PAD / SCALE

// Maths coords -> SVG coords. SVG's y axis grows downwards, hence the subtraction.
const toSvgX = (x: number) => ORIGIN + x * SCALE
const toSvgY = (y: number) => ORIGIN - y * SCALE

// Tick positions across the whole range, skipping 0 so the origin stays uncluttered.
const TICKS = Array.from(
  { length: (RANGE * 2) / TICK_STEP + 1 },
  (_, i) => -RANGE + i * TICK_STEP
).filter((t) => t !== 0)

// Typographic minus (−) rather than a hyphen, to match the lesson figures.
const minus = (n: number) => String(n).replace("-", "−")

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b)
}

// num/den as a reduced LaTeX fraction — "2", "-2" or "\frac{3}{2}".
// The x-intercept is -c/m, which is rational but rarely a whole number.
function fractionTex(num: number, den: number): string {
  if (den < 0) { num = -num; den = -den }
  const g = gcd(num, den)
  const n = num / g
  const d = den / g
  if (d === 1) return String(n)
  return n < 0 ? `-\\frac{${Math.abs(n)}}{${d}}` : `\\frac{${n}}{${d}}`
}

function formula(m: number, c: number): string {
  // generate correct straight line formula depending on values of m and c
  if (m === 0 && c === 0) return "y = 0";

  const xTerm = m === 0 ? "" : m === 1 ? "x" : m === -1 ? "-x" : `${m}x`;

  if (m === 0) return `y = ${c}`;
  if (c === 0) return `y = ${xTerm}`;

  const sign = c > 0 ? "+" : "-";
  return `y = ${xTerm} ${sign} ${Math.abs(c)}`;
}

export default function StraightLineExplorer() {

  const [m, setM] = useState(0)
  const [c, setC] = useState(0)

  // The line is drawn out to the padded border rather than stopping at ±RANGE.
  const yAtLeft = m * -EDGE + c
  const yAtRight = m * EDGE + c

  // y-intercept always exists, at (0, c).
  // x-intercept is where y = 0, so mx + c = 0 -> x = -c/m. A horizontal line
  // (m = 0) never crosses the x axis, unless it *is* the x axis.
  const xIntercept = m === 0 ? null : -c / m

  return <div className="h-full flex">

    <svg
      className="border-2 flex-2"
      viewBox={`${-PAD} ${-PAD} ${SIZE + PAD * 2} ${SIZE + PAD * 2}`}
    >
      {/* ===== AXES — stop at ±RANGE, short of the border ===== */}
      <line x1={toSvgX(-RANGE)} y1={ORIGIN} x2={toSvgX(RANGE)} y2={ORIGIN} stroke="#1e293b" strokeWidth={1.5} />
      <line x1={ORIGIN} y1={toSvgY(RANGE)} x2={ORIGIN} y2={toSvgY(-RANGE)} stroke="#1e293b" strokeWidth={1.5} />

      {/* ===== TICKS AND NUMBER LABELS ===== */}
      {TICKS.map((t) => (
        <g key={t}>
          {/* x axis: tick through the line, number underneath */}
          <line
            x1={toSvgX(t)} y1={ORIGIN - TICK_LEN}
            x2={toSvgX(t)} y2={ORIGIN + TICK_LEN}
            stroke="#1e293b" strokeWidth={1.5}
          />
          <text
            x={toSvgX(t)} y={ORIGIN + TICK_LEN + 9}
            textAnchor="middle" fontSize={8} fill="#1e293b"
          >{minus(t)}</text>

          {/* y axis: tick through the line, number to the left */}
          <line
            x1={ORIGIN - TICK_LEN} y1={toSvgY(t)}
            x2={ORIGIN + TICK_LEN} y2={toSvgY(t)}
            stroke="#1e293b" strokeWidth={1.5}
          />
          <text
            x={ORIGIN - TICK_LEN - 3} y={toSvgY(t)}
            textAnchor="end" dominantBaseline="middle" fontSize={8} fill="#1e293b"
          >{minus(t)}</text>
        </g>
      ))}

      {/* ===== THE LINE — runs to the border ===== */}
      <line
        x1={toSvgX(-EDGE)} y1={toSvgY(yAtLeft)}
        x2={toSvgX(EDGE)} y2={toSvgY(yAtRight)}
        stroke="#378ADD" strokeWidth={2.5} strokeLinecap="round"
      />

      {/* ===== INTERCEPTS — green for y (c), orange for x ===== */}
      {/* Labels are clamped so they stay inside the viewBox at extreme values. */}
      <circle cx={toSvgX(0)} cy={toSvgY(c)} r={4} fill="#22c55e" />
      <MathsTextFO
        x={toSvgX(0) + 7} y={Math.max(-PAD, toSvgY(c) - 20)}
        width={80} height={20} styling="text-[10px] text-green-600"
      >{`$(0, ${c})$`}</MathsTextFO>

      {xIntercept !== null && (
        <>
          <circle cx={toSvgX(xIntercept)} cy={toSvgY(0)} r={4} fill="#f97316" />
          {/* Sit the label on the far side of the dot from the y axis, so it
              never lands on top of the y axis tick numbers. */}
          <MathsTextFO
            x={xIntercept < 0
              ? Math.max(-PAD, toSvgX(xIntercept) - 87)
              : Math.min(SIZE - 50, toSvgX(xIntercept) + 7)}
            y={toSvgY(0) + 16}
            width={80} height={28}
            styling={`text-[10px] text-orange-500 ${xIntercept < 0 ? "text-right" : ""}`}
          >{`$(${fractionTex(-c, m)}, 0)$`}</MathsTextFO>
        </>
      )}
    </svg>

    {/* Fixed-width rows so the formula and labels don't shift as values change */}
    <div className="flex-1">
      <div className="flex flex-col h-full justify-center gap-4 px-4">

        {/* nowrap + fixed height: the formula never reflows onto a second line,
            so nothing below it shifts as m and c change */}
        <div className="w-full h-12 flex items-center">
          <MathsText text={`$${formula(m, c)}$`} styling="text-4xl whitespace-nowrap" />
        </div>

        <div className="flex flex-row items-center gap-4 text-3xl w-full">
          <label htmlFor="mSlider" className="w-32 shrink-0 whitespace-nowrap"><MathsText text={`$m: ${m}$`} /></label>
          <input type="range" id='mSlider' value={m} min={-10} max={10} step={1} className="border-2 min-w-0 flex-1" onChange={(e) => setM(Number(e.currentTarget.value))}/>
        </div>

        <div className="flex flex-row items-center gap-4 text-3xl w-full">
          <label htmlFor="cSlider" className="w-32 shrink-0 whitespace-nowrap"><MathsText text={`$c: ${c}$`} /></label>
          <input type="range" id="cSlider" value={c} min={-10} max={10} step={1} className="border-2 min-w-0 flex-1" onChange={(e) => setC(Number(e.currentTarget.value))}/>
        </div>

        {/* A horizontal line has no single x-intercept, which a dot can't show. */}
        <div className="w-full h-8">
          {xIntercept === null && (
            <MathsText
              text={c === 0 ? "x-intercept: every point on the line" : "x-intercept: none"}
              styling="text-orange-500 text-xl"
            />
          )}
        </div>
      </div>
    </div>

  </div>
}
