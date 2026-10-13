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
export function mount(el) {
  el.innerHTML = `
    <div class="fig-momentum-collision" style="font:14px system-ui;max-width:660px">
      <svg viewBox="0 0 660 260" width="100%" role="img"
           aria-label="Bars that stack the momentum of two trolleys before and after a collision, with the two totals drawn underneath for comparison"></svg>
      <label style="display:block;margin:.5rem 0">Mass of trolley A in kilograms
        <input class="mass-a" type="range" min="1" max="4" step="1" value="2">
        <output class="mass-a-out">2</output>
      </label>
      <label style="display:block;margin:.3rem 0">Mass of trolley B in kilograms
        <input class="mass-b" type="range" min="1" max="4" step="1" value="4">
        <output class="mass-b-out">4</output>
      </label>
      <label style="display:block;margin:.3rem 0">Velocity of A in metres per second
        <input class="velocity-a" type="range" min="-3" max="3" step="1" value="3">
        <output class="velocity-a-out">3</output>
      </label>
      <label style="display:block;margin:.3rem 0">Velocity of B in metres per second
        <input class="velocity-b" type="range" min="-3" max="3" step="1" value="0">
        <output class="velocity-b-out">0</output>
      </label>
      <label style="display:block;margin:.3rem 0">The collision
        <select class="mode">
          <option value="stick">The trolleys stick together</option>
          <option value="bounce">The trolleys bounce apart</option>
        </select>
      </label>
      <p class="readout text-ink" aria-live="polite" style="margin:.5rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const massA = el.querySelector(".mass-a");
  const massAOut = el.querySelector(".mass-a-out");
  const massB = el.querySelector(".mass-b");
  const massBOut = el.querySelector(".mass-b-out");
  const velocityA = el.querySelector(".velocity-a");
  const velocityAOut = el.querySelector(".velocity-a-out");
  const velocityB = el.querySelector(".velocity-b");
  const velocityBOut = el.querySelector(".velocity-b-out");
  const mode = el.querySelector(".mode");
  const readout = el.querySelector(".readout");

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
      `<text x="${mid.toFixed(1)}" y="${(centreY - BAR_H / 2 - 7).toFixed(1)}" ` +
      `font-size="19" text-anchor="middle" class="text-ink">${letter}</text>`
    );
  }

  function update() {
    const mA = Number(massA.value);
    const mB = Number(massB.value);
    const uA = Number(velocityA.value);
    const uB = Number(velocityB.value);
    const sticky = mode.value === "stick";
    massAOut.textContent = String(mA);
    massBOut.textContent = String(mB);
    velocityAOut.textContent = String(uA);
    velocityBOut.textContent = String(uB);

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
      `<text x="${GUTTER + 28}" y="19" font-size="19" class="text-ink">A</text>` +
      `<rect x="${GUTTER + 52}" y="8" width="12" height="12" class="fig-warn"></rect>` +
      `<text x="${GUTTER + 70}" y="19" font-size="19" class="text-ink">B</text>` +
      `<rect x="${GUTTER + 118}" y="8" width="12" height="12" class="fig-good"></rect>` +
      `<text x="${GUTTER + 136}" y="19" font-size="19" class="text-ink">total</text>`;

    const axis =
      `<line x1="${ZERO_X}" y1="32" x2="${ZERO_X}" y2="214" class="fig-grid"></line>` +
      `<text x="${ZERO_X}" y="236" font-size="19" text-anchor="middle" ` +
      `class="text-ink">momentum / ${UNIT}</text>`;

    const gutter =
      `<text x="${GUTTER - 14}" y="${ROW.objectsBefore + 4}" font-size="19" ` +
      `text-anchor="end" class="text-ink">before</text>` +
      `<text x="${GUTTER - 14}" y="${ROW.totalBefore + 4}" font-size="19" ` +
      `text-anchor="end" class="text-ink">total ${one(total)}</text>` +
      `<text x="${GUTTER - 14}" y="${ROW.objectsAfter + 4}" font-size="19" ` +
      `text-anchor="end" class="text-ink">after</text>` +
      `<text x="${GUTTER - 14}" y="${ROW.totalAfter + 4}" font-size="19" ` +
      `text-anchor="end" class="text-ink">total ${one(totalAfter)}</text>`;

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
      `After: (${mA} kg &times; ${signed(vA)} m s\u207b\u00b9) + ` +
      `(${mB} kg &times; ${signed(vB)} m s\u207b\u00b9) = ` +
      `${one(pAAfter)} + ${one(pBAfter)} = <strong>${one(totalAfter)} ${UNIT}</strong>.`;

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

  [massA, massB, velocityA, velocityB].forEach((input) =>
    input.addEventListener("input", update),
  );
  mode.addEventListener("change", update);
  update();
}
