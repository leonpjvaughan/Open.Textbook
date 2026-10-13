// Guided investigation for the constant-acceleration formulae in vertical
// motion.
//
// Guided, not a sandbox: the page asks the reader to predict the greatest
// height and the velocity there before a control is touched. Two sliders set
// the launch speed u and the time t, and the ball is drawn at its height above
// the launch point. The readout names the formula it used for v and for s, so
// the reader meets the choice of formula as a choice and not as a list.
//
// The time slider stops at the moment the ball returns to the launch height, so
// the whole flight is on the track and the ball is never drawn below the
// ground. Plain HTML, SVG and two range inputs, so it is keyboard-operable with
// no framework. Colours come from the fig-* and text-* classes, so the figure
// adapts to every bundle and to both schemes. No colour literal appears here,
// and the runtime text is plain HTML, never TeX.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout, the redraw — comes from `kit.js`. What is left here is the drawing and
// the sentence, which are the parts that differ from every other figure.
import { panel, slider, react } from "./kit.js";

const G = 9.8; // metres per second squared, downwards
const SCALE = 12; // pixels per metre
const GROUND_Y = 320;
const BALL_X = 200;
const AXIS_X = 60;
const WIDTH = 460;
const HEIGHT = 360;
const MINUS = "\u2212";
const SQUARED = "\u00b2";

function toPy(metres) {
  return GROUND_Y - metres * SCALE;
}

// A number to one decimal place, with a true minus sign.
function one(value) {
  return (value < 0 ? MINUS : "") + Math.abs(value).toFixed(1);
}

// An arrow standing on the ball, pointing the way the ball moves.
function velocityArrow(ballY, v) {
  const length = Math.min(70, Math.abs(v) * 4);
  if (length < 6) {
    return (
      `<circle cx="${BALL_X}" cy="${ballY.toFixed(1)}" r="12" ` +
      `class="fig-ink" fill-opacity="0.25"></circle>`
    );
  }
  const cls = v > 0 ? "fig-good" : "fig-warn";
  // Near the top of the time slider the ball is close to the ground and the
  // speed is large, so the downward arrowhead would fall below the track.
  // Clamp the tip to the frame.
  let tipY = v > 0 ? ballY - 10 - length : ballY + 10 + length;
  tipY = v > 0 ? Math.max(tipY, 4) : Math.min(tipY, HEIGHT - 4);
  const baseY = v > 0 ? ballY - 10 : ballY + 10;
  const size = 10;
  const direction = v > 0 ? 1 : -1;
  return (
    `<line x1="${BALL_X}" y1="${baseY.toFixed(1)}" x2="${BALL_X}" ` +
    `y2="${(tipY + direction * size).toFixed(1)}" class="${cls}" ` +
    `fill="none" stroke-width="3"></line>` +
    `<polygon points="${BALL_X},${tipY.toFixed(1)} ` +
    `${BALL_X - size * 0.7},${(tipY + direction * size).toFixed(1)} ` +
    `${BALL_X + size * 0.7},${(tipY + direction * size).toFixed(1)}" ` +
    `class="${cls}"></polygon>`
  );
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A ball on a vertical height scale, drawn at the height it has reached after a chosen time, with the direction it is moving and the greatest height marked",
    width: WIDTH,
    height: HEIGHT,
    max: 600,
  });
  readout.classList.add("text-ink");

  const uInput = slider(el, { show: false,
    id: "u",
    label: "Launch speed u, in metres per second",
    min: 5,
    max: 20,
    value: 14,
  });
  const tInput = slider(el, { show: false,
    id: "t",
    label: "Time t, in seconds",
    min: 0,
    max: 2.8,
    step: 0.1,
    value: 1.4,
    format: (value) => value.toFixed(1),
  });

  function ruler() {
    let lines = "";
    for (let metres = 0; metres <= 25; metres += 5) {
      const y = toPy(metres);
      lines +=
        `<line x1="${AXIS_X - 6}" y1="${y.toFixed(1)}" ` +
        `x2="${AXIS_X + 6}" y2="${y.toFixed(1)}" ` +
        `class="fig-ink" stroke-width="1"></line>` +
        `<text x="${AXIS_X - 12}" y="${(y + 4).toFixed(1)}" font-size="13" ` +
        `text-anchor="end" class="text-ink">${metres}</text>`;
    }
    return (
      lines +
      `<line x1="${AXIS_X}" y1="${toPy(24).toFixed(1)}" x2="${AXIS_X}" ` +
      `y2="${GROUND_Y}" class="fig-ink" stroke-width="1"></line>` +
      `<text x="${AXIS_X + 14}" y="${toPy(24) + 4}" font-size="13" ` +
      `class="text-ink">up is positive</text>`
    );
  }

  function update() {
    const u = Number(uInput.value);
    // The ball returns to the launch height after 2u/g seconds. Ending the
    // slider there keeps the whole flight on the track.
    const tMax = Math.floor(((2 * u) / G) * 10) / 10;
    tInput.max = tMax.toFixed(1);
    if (Number(tInput.value) > tMax) {
      // Setting the range in script clamps the value, and a clamp does not fire
      // `input`, so the kit's own number display would keep the old value.
      tInput.dispatchEvent(new Event("input"));
    }
    const t = Number(tInput.value);

    const v = u - G * t;
    const s = u * t - 0.5 * G * t * t;
    const tTop = u / G;
    const sMax = (u * u) / (2 * G);

    const ballY = toPy(s);
    const topY = toPy(sMax);
    const ground =
      `<line x1="${AXIS_X}" y1="${GROUND_Y}" x2="${WIDTH - 20}" ` +
      `y2="${GROUND_Y}" class="fig-ink" stroke-width="2"></line>`;
    const track =
      `<line x1="${BALL_X}" y1="${GROUND_Y}" x2="${BALL_X}" ` +
      `y2="${topY.toFixed(1)}" class="fig-grid" stroke-width="1" ` +
      `stroke-dasharray="4 4"></line>`;
    const height =
      `<line x1="${AXIS_X}" y1="${ballY.toFixed(1)}" x2="${BALL_X}" ` +
      `y2="${ballY.toFixed(1)}" class="fig-grid" stroke-width="1" ` +
      `stroke-dasharray="4 4"></line>`;
    const apex =
      `<line x1="${BALL_X - 70}" y1="${topY.toFixed(1)}" ` +
      `x2="${WIDTH - 20}" y2="${topY.toFixed(1)}" class="fig-ink" ` +
      `stroke-width="1" stroke-dasharray="6 4"></line>` +
      `<text x="${WIDTH - 20}" y="${(topY - 8).toFixed(1)}" font-size="13" ` +
      `text-anchor="end" class="text-ink">greatest height ` +
      `${one(sMax)} m</text>`;
    const ball =
      `<circle cx="${BALL_X}" cy="${ballY.toFixed(1)}" r="8" ` +
      `class="fig-accent"></circle>` +
      `<text x="${BALL_X + 16}" y="${(ballY + 5).toFixed(1)}" font-size="13" ` +
      `class="text-ink">s = ${one(s)} m</text>`;

    const moving = velocityArrow(ballY, v);
    const movingLabel = Math.abs(v) < 0.05
      ? `<text x="${BALL_X + 16}" y="${(ballY - 22).toFixed(1)}" ` +
        `font-size="13" class="text-ink">v = 0 here</text>`
      : `<text x="${BALL_X + 16}" ` +
        `y="${(v > 0 ? ballY - 24 : ballY + 34).toFixed(1)}" font-size="13" ` +
        `class="${v > 0 ? "text-good" : "text-warn"}">` +
        `v = ${one(v)} m/s ${v > 0 ? "upwards" : "downwards"}</text>`;

    svg.innerHTML =
      ruler() +
      ground +
      track +
      apex +
      height +
      ball +
      moving +
      movingLabel;

    const atTop = Math.abs(v) < 0.05;
    const state = atTop
      ? `The ball is at its greatest height, where v = 0. The acceleration is ` +
        `still ${MINUS}9.8 m/s${SQUARED}, so the velocity keeps changing.`
      : v > 0
        ? `The ball is rising.`
        : `The ball is falling.`;

    // Past the top, the same height was reached earlier on the way up.
    const earlier = t > tTop + 0.05 ? 2 * tTop - t : -1;
    const twice =
      earlier > 0.05
        ? ` The ball was at this same height on the way up at t = ` +
          `${earlier.toFixed(1)} s, so one height gives two times.`
        : "";

    const prompt =
      earlier > 0.05
        ? `<em>Why does this height belong to two different times?</em>`
        : atTop
          ? `<em>Predict the velocity half a second later, and then check ` +
            `your prediction.</em>`
          : `<em>Move the time slider to the end of the flight and watch the ` +
            `sign of the velocity.</em>`;

    readout.innerHTML =
      `The ball leaves the ground at u = ${u} m/s, and upwards is positive, so ` +
      `a = ${MINUS}9.8 m/s${SQUARED}. At t = ${t.toFixed(1)} s: ` +
      `v = u + a t = ${u} ${MINUS} 9.8 &times; ${t.toFixed(1)} = ` +
      `<strong>${one(v)} m/s</strong>, and ` +
      `s = u t + 0.5 &times; a &times; t${SQUARED} = ${u} &times; ` +
      `${t.toFixed(1)} ${MINUS} 4.9 &times; ${t.toFixed(1)}${SQUARED} = ` +
      `<strong>${one(s)} m</strong>. ${state} ` +
      `The greatest height is <strong>${one(sMax)} m</strong>, reached at ` +
      `t = ${tTop.toFixed(2)} s, where v = 0 and the formula ` +
      `v${SQUARED} = u${SQUARED} + 2as gives the height.${twice} ` +
      prompt;

    svg.setAttribute(
      "aria-label",
      `A ball launched upwards at ${u} metres per second, at time ` +
        `${t.toFixed(1)} seconds. It is ${one(s)} metres above the launch ` +
        `point and moving at ${one(v)} metres per second ` +
        `${atTop ? "at the greatest height" : v > 0 ? "upwards" : "downwards"}. ` +
        `The greatest height is ${one(sMax)} metres.`,
    );
  }

  react([uInput, tInput], update);
}
