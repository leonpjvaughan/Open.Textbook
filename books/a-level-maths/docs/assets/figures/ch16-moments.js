// Guided investigation for moments. A uniform beam rests on two supports and a
// load slides along it; the reader watches each reaction change. Plain HTML and
// SVG, no framework and no colour of its own: the fig-* classes carry the
// theme. Runtime text is plain text, never TeX.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout, the redraw — comes from `kit.js`. What is left here is the drawing and
// the sentence, which are the parts that differ from every other figure.
import { panel, slider, react } from "./kit.js";

const G = 9.8;
const BEAM_MASS = 20;
const LENGTH = 4;
const PX_PER_M = 88;
const A_X = 70;
const BEAM_Y = 170;

function arrow(x1, y1, x2, y2, cls) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const spread = 0.42;
  const bx = x2 - size * Math.cos(angle);
  const by = y2 - size * Math.sin(angle);
  const leftX = bx - size * Math.sin(angle) * spread * 2;
  const leftY = by + size * Math.cos(angle) * spread * 2;
  const rightX = bx + size * Math.sin(angle) * spread * 2;
  const rightY = by - size * Math.cos(angle) * spread * 2;
  return (
    `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" ` +
    `x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="${cls}" ` +
    `fill="none" stroke-width="2"></line>` +
    `<polygon points="${x2.toFixed(1)},${y2.toFixed(1)} ` +
    `${leftX.toFixed(1)},${leftY.toFixed(1)} ${rightX.toFixed(1)},${rightY.toFixed(1)}" ` +
    `class="${cls}"></polygon>`
  );
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A uniform beam on two supports with a load at a chosen distance from the left support",
    width: 480,
    height: 300,
    max: 600,
  });

  const inputs = {
    load: slider(el, {
      id: "load",
      label: "Load mass, in kilograms",
      min: 0,
      max: 60,
      step: 5,
      value: 45,
    }),
    place: slider(el, {
      id: "place",
      label: "Distance of the load from support A, in metres",
      min: 0.4,
      max: 3.6,
      step: 0.1,
      value: 1.5,
    }),
  };

  const beamWeight = BEAM_MASS * G;

  function update() {
    const loadMass = Number(inputs.load.value);
    const d = Number(inputs.place.value);
    const loadWeight = loadMass * G;
    const total = beamWeight + loadWeight;
    const reactionA = (beamWeight * (LENGTH / 2) + loadWeight * d) / LENGTH;
    const reactionB = total - reactionA;

    const bX = A_X + LENGTH * PX_PER_M;
    const loadX = A_X + d * PX_PER_M;
    const loadY = BEAM_Y - 42;
    const loadLen = Math.min(70, 8 + loadWeight * 0.06);
    const midX = A_X + (LENGTH / 2) * PX_PER_M;

    const beam = `<line x1="${A_X}" y1="${BEAM_Y}" x2="${bX}" y2="${BEAM_Y}" class="fig-ink" stroke-width="3"></line>`;
    const supportA =
      `<polygon points="${A_X},${BEAM_Y} ${A_X - 12},${BEAM_Y + 20} ${A_X + 12},${BEAM_Y + 20}" class="fig-accent"></polygon>`;
    const supportB =
      `<polygon points="${bX},${BEAM_Y} ${bX - 12},${BEAM_Y + 20} ${bX + 12},${BEAM_Y + 20}" class="fig-accent"></polygon>`;

    const weightArrow = arrow(midX, BEAM_Y + 28, midX, BEAM_Y + 28 + 44, "fig-grid");
    const loadArrow =
      loadMass > 0
        ? arrow(loadX, loadY, loadX, loadY + loadLen, "fig-warn") +
          `<rect x="${(loadX - 13).toFixed(1)}" y="${(loadY - 14).toFixed(1)}" width="26" height="14" class="fig-warn"></rect>`
        : "";

    svg.innerHTML = beam + supportA + supportB + weightArrow + loadArrow;

    readout.textContent =
      `Beam weight ${beamWeight.toFixed(0)} newtons at ${(LENGTH / 2).toFixed(1)} metres. ` +
      `Load weight ${loadWeight.toFixed(0)} newtons at ${d.toFixed(1)} metres from A. ` +
      `Taking moments about A: the reaction at B is ` +
      `(${beamWeight.toFixed(0)} times ${(LENGTH / 2).toFixed(1)} plus ${loadWeight.toFixed(0)} ` +
      `times ${d.toFixed(1)}) divided by ${LENGTH.toFixed(1)}, which is ${reactionB.toFixed(1)} newtons. ` +
      `The reaction at A is the rest of the total, ${reactionA.toFixed(1)} newtons.`;

    svg.setAttribute(
      "aria-label",
      `A uniform beam of weight ${beamWeight.toFixed(0)} newtons on supports A and B, ` +
        `${LENGTH.toFixed(1)} metres apart. A load of weight ${loadWeight.toFixed(0)} newtons ` +
        `acts ${d.toFixed(1)} metres from A. The reaction at A is ${reactionA.toFixed(1)} newtons ` +
        `and the reaction at B is ${reactionB.toFixed(1)} newtons.`
    );
  }

  react(Object.values(inputs), update);
}
