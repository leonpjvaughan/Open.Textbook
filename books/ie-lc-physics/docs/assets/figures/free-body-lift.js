// Tier-1 guided investigation: the free-body diagram of the chapter's lift.
//
// The page asks the reader to predict which stage of the journey has a zero
// resultant force, then to step through the four stages and check. So the figure
// draws the three forces on the lift as arrows whose lengths follow their sizes, and
// reports the resultant force and the acceleration.
//
// Nothing here carries a colour. The tension and the two downward forces use
// different classes, and the readout names each force, so the distinction survives a
// monochrome bundle.
import { SIZE, chooser, fmt, label, panel, react, scale } from "./kit.js";

const MASS = 800; // kg
const G = 9.8; // N/kg
const FRICTION = 160; // N, opposing the motion

// The four stages of the journey. `a` is the acceleration in m/s^2, upwards
// positive; `moving` decides whether the guide friction acts.
const STAGES = [
  { id: "rest", name: "At rest on the ground floor", a: 0, moving: false },
  { id: "start", name: "Speeding up, moving upwards", a: 1.2, moving: true },
  { id: "steady", name: "Moving upwards at a constant speed", a: 0, moving: true },
  { id: "stop", name: "Slowing down, still moving upwards", a: -1.2, moving: true },
];

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "The three forces on a lift, drawn as arrows, at four stages of its journey",
    width: 480,
    height: 300,
  });

  const stageInput = chooser(el, {
    id: "stage",
    label: "Stage of the journey",
    choices: STAGES.map((stage) => ({ value: stage.id, label: stage.name })),
  });

  // The arrow lengths follow the force sizes. Friction is far smaller than the other
  // two forces, so its arrow is drawn at a minimum visible length and the readout
  // gives the number.
  const length = scale({ domain: [0, 10000], range: [0, 130] });

  const CENTRE = { x: 250, y: 150 };

  function arrow(x1, y1, x2, y2, cls, width) {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const head = 10;
    const spread = 0.45;
    const tip = [x2, y2];
    const left = [x2 - head * Math.cos(angle - spread), y2 - head * Math.sin(angle - spread)];
    const right = [x2 - head * Math.cos(angle + spread), y2 - head * Math.sin(angle + spread)];
    return (
      `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}" stroke-width="${width}"></line>` +
      `<polygon points="${tip} ${left} ${right}" class="${cls}"></polygon>`
    );
  }

  function draw() {
    const stage = STAGES.find((item) => item.id === stageInput.value) || STAGES[0];
    const weight = MASS * G;
    const friction = stage.moving ? FRICTION : 0;
    const tension = MASS * (G + stage.a) + friction;
    const resultant = tension - weight - friction;

    const lenT = length(tension);
    const lenW = length(weight);
    const lenF = Math.max(14, length(friction));

    const tensionArrow = arrow(CENTRE.x, CENTRE.y, CENTRE.x, CENTRE.y - lenT, "fig-accent", 4);
    const weightArrow = arrow(CENTRE.x - 18, CENTRE.y, CENTRE.x - 18, CENTRE.y + lenW, "fig-warn", 4);
    const frictionArrow = arrow(CENTRE.x + 18, CENTRE.y, CENTRE.x + 18, CENTRE.y + lenF, "fig-ink", 4);

    const dot = `<circle cx="${CENTRE.x}" cy="${CENTRE.y}" r="6" class="fig-ink"></circle>`;

    const marks =
      label({ x: 16, y: 24, text: "forces on the lift", anchor: "start", size: SIZE.heading }) +
      label({ x: CENTRE.x, y: CENTRE.y - lenT - 10, text: `tension ${fmt(tension)} N`, size: SIZE.label }) +
      label({ x: CENTRE.x - 24, y: CENTRE.y + lenW + 20, text: `weight ${fmt(weight)} N`, anchor: "end", size: SIZE.label }) +
      label({ x: CENTRE.x + 24, y: CENTRE.y + lenF + 20, text: `friction ${fmt(friction)} N`, anchor: "start", size: SIZE.label });

    svg.innerHTML = `${tensionArrow}${weightArrow}${frictionArrow}${dot}${marks}`;

    if (resultant === 0) {
      readout.textContent =
        "Resultant force 0 N, so the acceleration is 0 m/s². The lift keeps the speed it already has.";
    } else {
      const way = resultant > 0 ? "upwards" : "downwards";
      readout.textContent =
        `Resultant force ${fmt(Math.abs(resultant))} N ${way}, so the acceleration is ` +
        `${fmt(Math.abs(stage.a))} m/s² ${way}. The tension and the weight do not balance.`;
    }
  }

  react([stageInput], draw);
}
