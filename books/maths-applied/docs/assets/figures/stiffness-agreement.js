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
const HEIGHT = 340;
const LOAD = 3000; // newtons at the contact patch: a cornering load, shared across the axle

/** A number as the prose writes it: a true minus sign, not a hyphen. */
const num = (value, places) => value.toFixed(places).replace("-", "\u2212");

export function mount(el) {
  const { svg, readout, caption, claim } = panel(el, {
    label:
      "Two camber curves: a rigid linkage and a compliant one, with the bush's stiffness set by a control",
    description:
      "Camber is plotted against wheel travel. The solid curve is the rigid model: the wheel's " +
      "angle follows the linkage alone. The dashed curve is the compliant model, where a bush " +
      "stands in for the upper ball joint and a sideways load at the contact patch pushes the " +
      "wheel. As the bush is made stiffer, the dashed curve moves towards the solid one and lands " +
      "on it.",
    prompt: "Drag the stiffness up. Which curve moves, and what does it move towards?",
    width: WIDTH,
    height: HEIGHT,
    max: 560,
  });

  const stiffness = slider(el, {
    id: "stiffness",
    label: "Bush stiffness",
    min: 0.1,
    max: 20,
    step: 0.1,
    value: 0.3,
    show: true,
    unit: "MN/m",
  });

  const rigid = camberCurve({ travel: 40, count: 41 });

  function draw() {
    const k = Number(stiffness.value) * 1e6;
    const soft = camberCurve({ travel: 40, count: 41, k, F: LOAD });
    const { draw: frame, x, y, box } = axes({
      width: WIDTH,
      height: HEIGHT,
      x: {
        domain: [-40, 40],
        label: "wheel travel / mm",
        ticks: 8,
        tickFormat: (v) => fmt(v, 0).replace("-", "\u2212"),
      },
      // The softest setting reaches −4.4°, so the axis holds every setting the
      // control can produce rather than clipping the curve at one end.
      y: { domain: [-4.6, 1.0], ticks: 12, tickFormat: (v) => fmt(v, 1).replace("-", "\u2212") },
      pad: { left: 66, bottom: 46, top: 30 },
    });

    let drawing = frame;
    // The quantity is named above the plot, where it cannot collide with a tick.
    drawing += label({
      x: 4,
      y: 20,
      text: "camber / degrees",
      anchor: "start",
      size: SIZE.value,
      class: "text-ink",
    });

    // **A curve is a stroke, and the kit's `path()` cannot yet say so.** It writes
    // `fill="none"` as an attribute, and a `fig-*` class sets `fill`, which wins —
    // so a kit-drawn curve is a filled shape whose fill is the lens between the curve
    // and its chord. Nearly invisible for a straight line, a purple wedge for a
    // curved one. An inline style wins where an attribute loses, so the attribute is
    // rewritten here until the kit is fixed: `.agents/todo.md` item 74.
    const stroke = (markup) => markup.replace(/fill="none"/g, 'style="fill:none"');
    drawing += stroke(
      curve(
        rigid.map((point) => [point.travel, point.camber]),
        { x, y, class: "fig-ink", width: 3 }
      )
    );
    drawing += stroke(
      curve(
        soft.map((point) => [point.travel, point.camber]),
        { x, y, class: "fig-accent", width: 2.6, dash: "7 5" }
      )
    );

    // The gap at rest, drawn where a reader can compare it with the scale, and
    // labelled on the inboard side so the words sit over empty plot.
    const atRest = compliant(thetaFor(0), k, LOAD);
    const rigidRest = pose(0).camber;
    const gap = atRest.camber - rigidRest;
    drawing += line({
      x1: x(0),
      y1: y(Math.max(atRest.camber, rigidRest)),
      x2: x(0),
      y2: y(Math.min(atRest.camber, rigidRest)),
      class: "fig-warn",
      width: 2,
      dash: "4 3",
    });
    // The gap is marked, not labelled: an annotation on a curve is a label over a
    // line, and this one was illegible at every stiffness. The number is in the
    // readout, where it is also claimed and checked.

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
      `With a bush of ${num(Number(stiffness.value), 1)} meganewtons per metre, the upright's ` +
      `upper point is pulled ${num(atRest.bush, 2)} mm away from the upper arm's. Camber at rest ` +
      `is ${num(atRest.camber, 2)} degrees, which is ${num(Math.abs(gap), 2)} degrees from ` +
      `the rigid model's ${num(rigidRest, 2)}. ` +
      `At 40 mm of bump the two differ by ${num(Math.abs(atBump.camber - atBumpRigid), 2)} degrees. ` +
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

  caption.textContent =
    "The dashed line marks the gap at rest. It closes as the bush stiffens, and it is " +
    "the number the readout gives.";

  react(stiffness, draw);
}
