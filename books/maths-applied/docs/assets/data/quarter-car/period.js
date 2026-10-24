// The quarter car's period, from the kernel's own trajectory.
//
// §1.6's figure re-integrates the vendored kernel in the page. A 0.5 s run is not long
// enough for two peaks at the example's own 0.1 MN/m, so the run is taken in chunks and
// the chunk boundaries are de-duplicated: each `integrate` call starts at the state the
// last one reached, and its first sample is a repeat. The period is the interval between
// the first two peaks of the heave, which is the same arithmetic the section's table
// quotes from the 3 s trajectory.
import * as kernel from "../otkd/models/quarter-car/kernel/kernel.js";

/** How many 0.5 s chunks the run needs to contain two peaks: 0.1 MN/m needs three. */
const CHUNKS = (stiffness) => (stiffness < 0.2 ? 3 : 2);

/** The index of the coil's compliance among the kernel's run-time numbers. */
function complianceSlot() {
  return kernel.manifest.numbers.findIndex(
    (number) => number.kind === "compliance" && number.joint === "coil",
  );
}

/** One integration at a stiffness and a sideways load, and the numbers the table prints. */
export function run(stiffness, lateral = 0) {
  const numbers = [...kernel.manifest.default_geometry.numbers];
  numbers[complianceSlot()] = 1 / (stiffness * 1e6);
  kernel.setGeometry({ ...kernel.manifest.default_geometry, numbers });
  // The model's own loads are zero; the first carries the sideways force, the second the vertical.
  kernel.setLoads([lateral, 0, 0, 0, 0, 0]);
  kernel.design();
  kernel.setDrive(0);
  kernel.setVelocity(new Array(kernel.manifest.layout.sizes.q).fill(0));

  const start = kernel.manifest.points.indexOf("chassis-origin") * 3;
  let heave = [];
  let constraint = 0;
  for (let chunk = 0; chunk < CHUNKS(stiffness); chunk += 1) {
    constraint = Math.max(constraint, kernel.integrate(kernel.manifest.integration.steps));
    const samples = kernel.trajectory();
    // Each call starts at the state the last one reached, so its first sample is a repeat.
    const kept = chunk === 0 ? samples : samples.slice(1);
    heave = heave.concat(kept.map((q) => q[start + 2]));
  }

  const peak = Math.min(...heave);
  const span = Math.max(...heave) - peak;

  // The period, from the first two peaks of the heave.
  const dt = kernel.manifest.integration.dt;
  const peaks = [];
  for (let i = 1; i < heave.length - 1; i += 1) {
    if (heave[i] > heave[i - 1] && heave[i] >= heave[i + 1]) peaks.push(i * dt);
  }
  const first = peaks[0];
  const second = peaks[1];
  return {
    peak: peak * 1000,
    rest: heave[heave.length - 1] * 1000,
    span: span * 1000,
    period: second === undefined ? NaN : second - first,
    first,
    second,
    constraint,
  };
}
