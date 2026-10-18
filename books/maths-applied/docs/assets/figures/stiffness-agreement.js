// The chapter's thesis, made draggable: stiffen the bush and the compliant camber
// curve lands on the rigid one.
//
// The model here is the one §1.5 describes. The upper ball joint is no longer a
// joint but a bush: the upright's upper point and the upper arm's outer point are
// joined by a spring, the wheel carries a sideways force at the contact patch, and
// the answer is the pair of angles at which the spring's force balances the tyre's.
// Stiffen the spring and the two ends are forced together, which is the rigid
// mechanism again.
//
// The numbers are computed here, by `data/mechanism.js`, and every curve is drawn
// from the same geometry as the hero.
import { SIZE, axes, curve, fmt, label, line, panel, react, slider } from "./kit.js";
import { curve as camberCurve, compliant, pose, thetaFor } from "../data/mechanism.js";

const WIDTH = 560;
const HEIGHT = 330;
const LOAD = 3000; // newtons at the contact patch: a cornering load, shared across the axle

export function mount(el) {
  const { svg, readout, claim } = panel(el, {
    label:
      "Two camber curves: a rigid linkage and a compliant one, with the bush's stiffness set by a control",
    description:
      "Camber is plotted against wheel travel. The solid curve is the rigid model: the wheel's " +
      "angle follows the linkage alone. The dashed curve is the compliant model, where a bush " +
      "stands in for the upper ball joint and a sideways load at the contact patch pushes the " +
      "wheel. As the bush is made stiffer, the dashed curve moves towards the solid one and lands " +
      "on it.",
    prompt:
      "Drag the stiffness up. Which curve moves, and what does it move towards?",
    width: WIDTH,
    height: HEIGHT,
    max: 560,
  });

  const stiffness = slider(el, {
    id: "stiffness",
    label: "Bush stiffness, in powers of ten (6 means one million newtons per metre)",
    min: 5,
    max: 8,
    step: 0.1,
    value: 6,
    show: false,
  });

  const rigid = camberCurve({ travel: 40, count: 41 });

  function draw() {
    const k = 10 ** Number(stiffness.value);
    const soft = camberCurve({ travel: 40, count: 41, k, F: LOAD });
    const { draw: frame, x, y, box } = axes({
      width: WIDTH,
      height: HEIGHT,
      x: { domain: [-40, 40], label: "wheel travel / mm", ticks: 8, tickFormat: (v) => fmt(v, 0) },
      y: { domain: [-3.2, 1.0], label: "camber / degrees", ticks: 7 },
      pad: { left: 60, bottom: 46, top: 26 },
    });

    let drawing = frame;
    drawing += curve(
      rigid.map((point) => [point.travel, point.camber]),
      { x, y, class: "fig-ink", width: 3 }
    );
    drawing += curve(
      soft.map((point) => [point.travel, point.camber]),
      { x, y, class: "fig-accent", width: 2.6, dash: "7 5" }
    );

    // The gap at rest, drawn where a reader can compare it with the scale.
    const atRest = compliant(thetaFor(0), k, LOAD);
    const rigidRest = pose(0).camber;
    const gap = atRest.camber - rigidRest;
    const top = y(Math.max(atRest.camber, rigidRest));
    const bottom = y(Math.min(atRest.camber, rigidRest));
    drawing += line({
      x1: x(0),
      y1: top,
      x2: x(0),
      y2: bottom,
      class: "fig-warn",
      width: 2,
      dash: "4 3",
    });
    drawing += label({
      x: x(0) + 8,
      y: (top + bottom) / 2,
      text: `${Math.abs(gap).toFixed(2)}° apart`,
      anchor: "start",
      size: SIZE.tick,
      class: "text-warn",
    });

    // A legend, because two curves on one pair of axes need naming.
    const legend = (dy, text, cls, dash) =>
      line({ x1: box.x1 - 150, y1: box.y1 + dy, x2: box.x1 - 118, y2: box.y1 + dy, class: cls, width: 2.6, dash }) +
      label({ x: box.x1 - 112, y: box.y1 + dy + 5, text, anchor: "start", size: SIZE.tick, class: "text-ink" });
    drawing += legend(6, "rigid", "fig-ink");
    drawing += legend(26, "with a bush", "fig-accent", "7 5");

    svg.innerHTML = drawing;

    const atBump = compliant(thetaFor(40), k, LOAD);
    const atBumpRigid = pose(thetaFor(40)).camber;
    readout.textContent =
      `With a bush of ${fmt(k / 1e6, 2)} meganewtons per metre, the upright's upper point is pulled ` +
      `${fmt(atRest.bush, 2)} mm away from the upper arm's. Camber at rest is ` +
      `${fmt(atRest.camber, 2)} degrees, which is ${Math.abs(gap).toFixed(2)} degrees from the ` +
      `rigid model's ${fmt(rigidRest, 2)}. ` +
      `At 40 mm of bump the two differ by ${fmt(Math.abs(atBump.camber - atBumpRigid), 2)} degrees. ` +
      `Stiffen the bush and both differences fall towards nothing.`;

    // The difference the readout states, declared so it cannot drift from the
    // model. It is the **size** of the difference: the readout says "from", and a
    // signed number the text never prints is a claim the checker cannot check.
    claim([
      {
        label: "camber with a bush, against the rigid model",
        expression: "abs(soft - rigid)",
        values: { soft: atRest.camber, rigid: rigidRest },
        answer: Math.abs(gap),
        shown: Math.abs(gap).toFixed(2),
      },
    ]);
  }

  react(stiffness, draw);
}
