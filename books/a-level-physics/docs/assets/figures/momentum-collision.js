// Tier-1 guided investigation: conservation of momentum in a collision.
//
// Guided, not a sandbox: the page asks the reader to predict the total momentum
// before and after, and to explain afterwards why the total is unchanged when
// each velocity changes. The figure stacks the momentum of each trolley end to
// end and draws the total underneath, so the two totals can be compared
// directly. Four sliders set the two masses and the two velocities, and a menu
// chooses whether the trolleys stick together or bounce apart.
//
// The outcome is worked out from conservation of momentum: the two totals agree
// because the figure computes the second one from the first. Colours come from
// CSS classes, so the figure adapts to every bundle and to both schemes. No
// colour literal appears here, and no runtime LaTeX: the readout is plain HTML.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { SIZE, chooser, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout, claim } = panel(el, {
    label:
      "Bars that stack the momentum of two trolleys before and after a collision, with the two totals drawn underneath for comparison",
    width: 660,
    height: 260,
    max: 660,
  });
  readout.classList.add("text-ink");

  const massA = slider(el, { show: true,
    id: "mass-a",
    label: "Mass of trolley A in kilograms",
    min: 1,
    max: 4,
    step: 1,
    value: 2,
  });
  const massB = slider(el, { show: true,
    id: "mass-b",
    label: "Mass of trolley B in kilograms",
    min: 1,
    max: 4,
    step: 1,
    value: 4,
  });
  const velocityA = slider(el, { show: true,
    id: "velocity-a",
    label: "Velocity of A in metres per second",
    min: -3,
    max: 3,
    step: 1,
    value: 3,
  });
  const velocityB = slider(el, { show: true,
    id: "velocity-b",
    label: "Velocity of B in metres per second",
    min: -3,
    max: 3,
    step: 1,
    value: 0,
  });
  const mode = chooser(el, {
    id: "mode",
    label: "The collision",
    choices: [
      { value: "stick", label: "The trolleys stick together" },
      { value: "bounce", label: "The trolleys bounce apart" },
    ],
    value: "stick",
  });

  const VIEW_W = 660;
  const VIEW_H = 260;
  const GUTTER = 110;
  const RIGHT_PAD = 20;
  const ZERO_X = GUTTER + (VIEW_W - GUTTER - RIGHT_PAD) / 2;
  // The largest total the controls can make: 4 kg at 3 m/s each, both to the
  // right. A fixed scale keeps the bars comparable from one setting to the next.
  const MAX_MOMENTUM = 24;
  const SCALE = (VIEW_W - GUTTER - RIGHT_PAD) / 2 / MAX_MOMENTUM;
  const BAR_H = 20;
  const ROW = {
    objectsBefore: 55,
    totalBefore: 95,
    objectsAfter: 152,
    totalAfter: 192,
  };
  const UNIT = "kg m s\u207b\u00b9";

  // A true minus sign, so a negative momentum does not read as a hyphen.
  const one = (value) => {
    const text = Math.abs(value).toFixed(1);
    return value < 0 ? "\u2212" + text : text;
  };
  // The same rounding as one(), as a number, so two printed momenta can be made
  // to add to the exact total.
  const toOnePlace = (value) => Math.round(value * 10) / 10;
  const signed = (value) =>
    value < 0 ? "\u2212" + Math.abs(value) : String(value);

  function barSegment(start, end, centreY, cls) {
    const x0 = ZERO_X + start * SCALE;
    const x1 = ZERO_X + end * SCALE;
    const left = Math.min(x0, x1);
    // A momentum of zero still gets a short stub, so the reader can see it.
    const width = Math.max(Math.abs(x1 - x0), 2);
    return (
      `<rect x="${left.toFixed(1)}" y="${(centreY - BAR_H / 2).toFixed(1)}" ` +
      `width="${width.toFixed(1)}" height="${BAR_H}" class="${cls}"></rect>`
    );
  }

  // A letter over the middle of one stacked segment, left out when the segment
  // is too narrow to carry it.
  function segmentLabel(start, end, centreY, letter) {
    if (Math.abs(end - start) * SCALE < 30) return "";
    const mid = ZERO_X + ((start + end) / 2) * SCALE;
    return (
      `${label({ x: mid.toFixed(1), y: (centreY - BAR_H / 2 - 7).toFixed(1), text: `${letter}`, anchor: "middle", size: SIZE.heading, class: "text-ink" })}`
    );
  }

  function update() {
    const mA = Number(massA.value);
    const mB = Number(massB.value);
    const uA = Number(velocityA.value);
    const uB = Number(velocityB.value);
    const sticky = mode.value === "stick";

    const pA = mA * uA;
    const pB = mB * uB;
    const total = pA + pB;

    // The trolleys meet only when A is gaining on B.
    const collides = uA > uB;
    let vA;
    let vB;
    if (!collides) {
      vA = uA;
      vB = uB;
    } else if (sticky) {
      vA = total / (mA + mB);
      vB = vA;
    } else {
      // The one-dimensional elastic result: both momentum and kinetic energy
      // are conserved.
      vA = ((mA - mB) * uA + 2 * mB * uB) / (mA + mB);
      vB = ((mB - mA) * uB + 2 * mA * uA) / (mA + mB);
    }
    const pAAfter = mA * vA;
    const pBAfter = mB * vB;
    const totalAfter = pAAfter + pBAfter;

    const energyBefore = 0.5 * mA * uA * uA + 0.5 * mB * uB * uB;
    const energyAfter = 0.5 * mA * vA * vA + 0.5 * mB * vB * vB;

    const legend =
      `<rect x="${GUTTER + 10}" y="8" width="12" height="12" class="fig-accent"></rect>` +
      `${label({ x: GUTTER + 28, y: 19, text: `A`, anchor: "start", size: SIZE.heading, class: "text-ink" })}` +
      `<rect x="${GUTTER + 52}" y="8" width="12" height="12" class="fig-warn"></rect>` +
      `${label({ x: GUTTER + 70, y: 19, text: `B`, anchor: "start", size: SIZE.heading, class: "text-ink" })}` +
      `<rect x="${GUTTER + 118}" y="8" width="12" height="12" class="fig-good"></rect>` +
      `${label({ x: GUTTER + 136, y: 19, text: `total`, anchor: "start", size: SIZE.heading, class: "text-ink" })}`;

    const axis =
      `<line x1="${ZERO_X}" y1="32" x2="${ZERO_X}" y2="214" class="fig-grid"></line>` +
      `${label({ x: ZERO_X, y: 236, text: `momentum / ${UNIT}`, anchor: "middle", size: SIZE.heading, class: "text-ink" })}`;

    const gutter =
      `${label({ x: GUTTER - 14, y: ROW.objectsBefore + 4, text: `before`, anchor: "end", size: SIZE.heading, class: "text-ink" })}` +
      `${label({ x: GUTTER - 14, y: ROW.totalBefore + 4, text: `total ${one(total)}`, anchor: "end", size: SIZE.heading, class: "text-ink" })}` +
      `${label({ x: GUTTER - 14, y: ROW.objectsAfter + 4, text: `after`, anchor: "end", size: SIZE.heading, class: "text-ink" })}` +
      `${label({ x: GUTTER - 14, y: ROW.totalAfter + 4, text: `total ${one(totalAfter)}`, anchor: "end", size: SIZE.heading, class: "text-ink" })}`;

    svg.innerHTML =
      legend +
      axis +
      gutter +
      barSegment(0, pA, ROW.objectsBefore, "fig-accent") +
      barSegment(pA, total, ROW.objectsBefore, "fig-warn") +
      barSegment(0, total, ROW.totalBefore, "fig-good") +
      barSegment(0, pAAfter, ROW.objectsAfter, "fig-accent") +
      barSegment(pAAfter, totalAfter, ROW.objectsAfter, "fig-warn") +
      barSegment(0, totalAfter, ROW.totalAfter, "fig-good") +
      segmentLabel(0, pA, ROW.objectsBefore, "A") +
      segmentLabel(pA, total, ROW.objectsBefore, "B") +
      segmentLabel(0, pAAfter, ROW.objectsAfter, "A") +
      segmentLabel(pAAfter, totalAfter, ROW.objectsAfter, "B");

    // The final velocities are rounded for the outcome sentence, so this line
    // gives the two momenta directly instead of multiplying a rounded velocity
    // by a mass: 4 kg x 2.7 m s-1 is 10.8, while the momentum rounds to 10.9.
    // The two printed momenta are rounded so that they add to the exact total,
    // which is an integer here, so the line checks out at the printed precision.
    const pAShown = toOnePlace(pAAfter);
    const pBShown = toOnePlace(totalAfter) - pAShown;
    // Every number in the sentence is declared. The one case that cannot be claimed as
    // a product is the pair of final momenta: they are rounded so that they still add to
    // the exact total, so the claim is the sum they make, not `mass times velocity` for
    // each one separately.
    const claims = [
      { label: "momentum of trolley A before", expression: "mA * uA", values: { mA, uA }, answer: pA, shown: one(pA) },
      { label: "momentum of trolley B before", expression: "mB * uB", values: { mB, uB }, answer: pB, shown: one(pB) },
      { label: "total momentum before", expression: "pA + pB", values: { pA, pB }, answer: total, shown: one(total) },
    ];
    if (collides) {
      const speedExpr = sticky
        ? { vA: "total / (mA + mB)", vB: "total / (mA + mB)" }
        : {
            vA: "((mA - mB) * uA + 2 * mB * uB) / (mA + mB)",
            vB: "((mB - mA) * uB + 2 * mA * uA) / (mA + mB)",
          };
      claims.push({
        label: "velocity of A after the collision",
        expression: speedExpr.vA,
        values: { total, mA, mB, uA, uB },
        answer: vA,
        shown: one(vA),
      });
      if (!sticky) {
        claims.push({
          label: "velocity of B after the collision",
          expression: speedExpr.vB,
          values: { total, mA, mB, uA, uB },
          answer: vB,
          shown: one(vB),
        });
      }
      claims.push(
        {
          label: "total momentum after",
          expression: "mA * vA + mB * vB",
          values: { mA, vA, mB, vB },
          answer: totalAfter,
          shown: one(totalAfter),
        },
        {
          label: "the two printed momenta added up",
          expression: "pA_after + pB_after",
          values: { pA_after: pAShown, pB_after: pBShown },
          answer: totalAfter,
          shown: one(totalAfter),
        },
        {
          label: "kinetic energy before",
          expression: "0.5 * mA * uA ** 2 + 0.5 * mB * uB ** 2",
          values: { mA, uA, mB, uB },
          answer: energyBefore,
          shown: one(energyBefore),
        },
        {
          label: "kinetic energy after",
          expression: "0.5 * mA * vA ** 2 + 0.5 * mB * vB ** 2",
          values: { mA, vA, mB, vB },
          answer: energyAfter,
          shown: one(energyAfter),
        },
      );
    }
    // Declared before the branch, because a render that returns early would otherwise
    // leave the previous render's claims in place — a stale claim is worse than none.
    claim(claims);

    const beforeLine =
      `Before: (${mA} kg &times; ${signed(uA)} m s\u207b\u00b9) + ` +
      `(${mB} kg &times; ${signed(uB)} m s\u207b\u00b9) = ` +
      `${one(pA)} + ${one(pB)} = <strong>${one(total)} ${UNIT}</strong>.`;

    if (!collides) {
      readout.innerHTML =
        `${beforeLine} Trolley A is not gaining on trolley B, so the trolleys ` +
        `never meet. A collision needs A to move faster than B. ` +
        `<em>Set A faster than B and read the two totals.</em>`;
      return;
    }

    const afterLine =
      `After: trolley A has momentum <strong>${one(pAShown)} ${UNIT}</strong> and ` +
      `trolley B has <strong>${one(pBShown)} ${UNIT}</strong>, a total of ` +
      `<strong>${one(totalAfter)} ${UNIT}</strong>.`;

    const outcome = sticky
      ? `The trolleys move together at <strong>${one(vA)} m s\u207b\u00b9</strong>.`
      : `Trolley A moves off at <strong>${one(vA)} m s\u207b\u00b9</strong> and ` +
        `trolley B at <strong>${one(vB)} m s\u207b\u00b9</strong>.`;

    const energy =
      Math.abs(energyBefore - energyAfter) < 1e-9
        ? `Kinetic energy is <strong>${one(energyBefore)} J</strong> before and ` +
          `<strong>${one(energyAfter)} J</strong> after, so none is lost and the ` +
          `collision is <strong>elastic</strong>.`
        : `Kinetic energy falls from ${one(energyBefore)} J to ` +
          `${one(energyAfter)} J, so the collision is <strong>inelastic</strong>.`;

    readout.innerHTML =
      `${beforeLine} ${outcome} ${afterLine} ` +
      `The total momentum is <strong>the same before and after</strong>. ` +
      `${energy} <em>Which quantity stayed the same, and which one changed?</em>`;
  }

  react([massA, massB, velocityA, velocityB, mode], update);
}
