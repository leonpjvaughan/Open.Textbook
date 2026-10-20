// The mechanism: one place for every number the chapter's figures draw, and the
// two models that use them.
//
// **Why this is a module in `data/`, not in `figures/`.** Every file in a book's
// figures directory must export `mount()`, because the loader mounts one module per
// `:::figure` slug and a file that cannot be mounted is a file that will be mistaken
// for a figure that draws nothing. The geometry and the two solvers are neither: they
// are the numbers and the arithmetic the figures share. Keeping them in one file is
// what stops the hero's camber curve and the agreement figure's camber curve from
// drifting apart — and the whole of §1.5 rests on those two curves being the same
// model see the same numbers.
//
// Nothing here touches the DOM, so it can be run under `node` while the prose is
// being written: every number the chapter states was printed by this file.
//
// Coordinates: x lateral, positive outboard; z up; metres. Ground plane z = 0.
// The corner is a right-front one, and the geometry is **illustrative** — chosen to
// be plausible and well conditioned, not measured from a car.

export const GEOMETRY = {
  // The chassis pivots of the two wishbones, in three dimensions. The front-view
  // model below uses the projection of each axis, which is what an arm rotating
  // about a fore-aft axis actually looks like from in front of the car.
  lcaf: [0.3, 0.12, 0.15],
  lcar: [0.3, -0.12, 0.16],
  // **These four numbers are the package's**, from its
  // `examples/double-wishbone/geometry.yaml` (vendored under
  // `docs/assets/data/otkd/`), so the page's front view and the generated
  // three-dimensional kernel are looking at the same corner.
  ucaf: [0.38, 0.1, 0.48],
  ucar: [0.38, -0.1, 0.47],
  // The upright, which is one rigid body carrying the two ball joints, the wheel
  // centre and the outer end of the steering arm.
  lbj: [0.72, 0.01, 0.15],
  ubj: [0.68, 0.0, 0.52],
  wc: [0.76, 0.0, 0.32],
  wco: [0.86, 0.0, 0.32],
  tri: [0.33, 0.14, 0.3],
  tro: [0.7, 0.12, 0.31],
  // The tyre's radius, so the contact patch is on the ground rather than guessed at.
  // **This is the package's number**, not a plausible one: `tyre-radius: 0.200` in
  // `examples/double-wishbone/geometry.yaml`. With the wheel centre at z = 0.32 that
  // puts the ground at **0.12 m**, not at z = 0, and every height the chapter quotes
  // above the ground is measured from there — which is what makes the page's roll
  // centre agree with the exported one instead of sitting 39 mm above it.
  tyreRadius: 0.2,
};

/** The height of the ground: the tyre's lowest point, given the radius above. */
export const GROUND = GEOMETRY.wc[2] - GEOMETRY.tyreRadius;

// --- the front view -----------------------------------------------------------
//
// Two circles and a rigid upright. `A` and `B` are the projections of the two arm
// axes; `C0` and `D0` are the ball joints at the design position; the upright's
// length `L` and the wheel centre's place in it are fixed numbers of the body.

// **Derived, not typed twice.** These five were hardcoded, which made them a second
// copy of `GEOMETRY` and the reason a geometry change could move the drawing without
// moving the solver. `frontView` intersects a 3-D line with the plane y = 0, which is
// the section the front view is.
function frontView(a, b) {
  if (Math.abs(b[1] - a[1]) < 1e-12) throw new Error("frontView: the axis is parallel to the view");
  const t = -a[1] / (b[1] - a[1]);
  return [a[0] + t * (b[0] - a[0]), a[2] + t * (b[2] - a[2])];
}

const A = frontView(GEOMETRY.lcaf, GEOMETRY.lcar);
const B = frontView(GEOMETRY.ucaf, GEOMETRY.ucar);
const C0 = [GEOMETRY.lbj[0], GEOMETRY.lbj[2]];
const D0 = [GEOMETRY.ubj[0], GEOMETRY.ubj[2]];
const W0 = [GEOMETRY.wc[0], GEOMETRY.wc[2]];
export const CAMBER0 = -1.0; // degrees at the design position: the top of the wheel leans in

const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const mul = (a, s) => [a[0] * s, a[1] * s];
const mag = (a) => Math.hypot(a[0], a[1]);
const unit = (a) => mul(a, 1 / mag(a));
const perp = (a) => [-a[1], a[0]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const rotate = (p, angle) => [
  p[0] * Math.cos(angle) - p[1] * Math.sin(angle),
  p[0] * Math.sin(angle) + p[1] * Math.cos(angle),
];

const RA = mag(sub(C0, A));
const RB = mag(sub(D0, B));
const L = mag(sub(D0, C0));
const PHI_A = Math.atan2(C0[1] - A[1], C0[0] - A[0]);
const PHI_B = Math.atan2(D0[1] - B[1], D0[0] - B[0]);
const U0 = unit(sub(D0, C0));
const V0 = perp(U0);
const LOCAL_W = [dot(sub(W0, C0), U0), dot(sub(W0, C0), V0)];
// Which side of the line BC the upper ball joint sits on at the design position.
// Keeping the answer on that side is what makes the sweep follow one assembly
// branch instead of jumping to the other one: a branch flip would show as a jump in
// the camber curve that looks like a physics bug and is not.
const SIDE = Math.sign(
  (D0[0] - B[0]) * (C0[1] - B[1]) - (D0[1] - B[1]) * (C0[0] - B[0])
);

export const FRONT = { A, B, C0, D0, W0, CAMBER0, RA, RB, L, SIDE };

/** The lower ball joint for a lower-arm rotation `theta`, in radians. */
export function lowerJoint(theta) {
  return add(A, mul([Math.cos(PHI_A + theta), Math.sin(PHI_A + theta)], RA));
}

/**
 * Both places the upper ball joint can be: where the upper arm's circle meets the
 * upright's. `null` when the mechanism cannot reach the requested angle.
 *
 * The first is the one on the same side as the design position, which is the
 * assembly the car is built on.
 */
export function upperJoint(C, side = SIDE) {
  const arm = sub(C, B);
  const d = mag(arm);
  if (d > RB + L || d < Math.abs(RB - L)) return null;
  const along = (RB * RB - L * L + d * d) / (2 * d);
  const across = Math.sqrt(Math.max(RB * RB - along * along, 0));
  const mid = add(B, mul(unit(arm), along));
  const n = perp(unit(arm));
  const p = add(mid, mul(n, across));
  const q = sub(mid, mul(n, across));
  const sideOfP = Math.sign(
    (p[0] - B[0]) * (C[1] - B[1]) - (p[1] - B[1]) * (C[0] - B[0])
  );
  const first = sideOfP === side ? p : q;
  return [first, first === p ? q : p];
}

/** Where two lines meet, or `null` when they are parallel. */
export function meet(a1, a2, b1, b2) {
  const d1 = sub(a2, a1);
  const d2 = sub(b2, b1);
  const den = d1[0] * d2[1] - d1[1] * d2[0];
  if (Math.abs(den) < 1e-12) return null;
  const t = ((b1[0] - a1[0]) * d2[1] - (b1[1] - a1[1]) * d2[0]) / den;
  return add(a1, mul(d1, t));
}

/**
 * The whole front view at one lower-arm rotation.
 *
 * Everything the chapter calls an *output* is computed here and nowhere else:
 * camber from the upright's rotation (the wheel plane is fixed in the upright),
 * the instant centre from where the two arm axes meet, the roll centre from the
 * line through the contact patch and the instant centre at the centreline, and the
 * track change from where the contact patch ends up.
 */
export function pose(theta, side = SIDE) {
  const C = lowerJoint(theta);
  const pair = upperJoint(C, side);
  if (!pair) return null;
  const D = pair[0];
  const u = unit(sub(D, C));
  const v = perp(u);
  const W = add(C, add(mul(u, LOCAL_W[0]), mul(v, LOCAL_W[1])));
  const spin = Math.atan2(u[1], u[0]) - Math.atan2(U0[1], U0[0]);
  const camber = CAMBER0 + (spin * 180) / Math.PI;
  const P = [W[0], W[1] - GEOMETRY.tyreRadius];
  const ic = meet(A, C, B, D);
  let rc = null;
  if (ic && Math.abs(ic[0] - P[0]) > 1e-9) {
    rc = [0, P[1] + ((ic[1] - P[1]) * (0 - P[0])) / (ic[0] - P[0])];
  }
  return { theta, C, D, W, P, camber, ic, rc, travel: (W[1] - W0[1]) * 1000 };
}

const DESIGN_W = pose(0).W;

/** The lower-arm rotation that puts the wheel at a given travel, in mm. */
export function thetaFor(travel, side = SIDE) {
  let lo = -0.5;
  let hi = 0.5;
  for (let i = 0; i < 60; i += 1) {
    const mid = (lo + hi) / 2;
    const state = pose(mid, side);
    if (!state) return mid;
    if (state.travel < travel) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

// --- the two-leg model --------------------------------------------------------
//
// The same wishbone, written as its two legs instead of as one rigid triangle. In
// the front view the two legs project onto one another, so their two circles have
// the same centre `B` and the same radius `RB`: the second leg is the first leg
// written twice. Three rows, two unknowns — and that is the whole of §1.3.

/** The three residuals, as functions of where the upper ball joint is. */
export function legsResiduals(D, C) {
  return [
    mag(sub(D, B)) - RB,
    mag(sub(D, B)) - RB,
    mag(sub(D, C)) - L,
  ];
}

/**
 * The Jacobian of those rows, exactly.
 *
 * Every row here is a distance, and the derivative of a distance with respect to the
 * point is the unit vector along it — so there is nothing to approximate and no
 * finite difference to tune. The general solver differentiates symbolically (see
 * `suspension-kinematics`); this is the same fact written down for the two rows that
 * matter here.
 */
export function legsJacobian(D, C) {
  const toB = unit(sub(D, B));
  const toC = unit(sub(D, C));
  return [toB, toB, toC];
}

/** The singular values of a 3×2 matrix, biggest first, by its 2×2 Gram matrix. */
export function singularValues(J) {
  const a = J.reduce((s, r) => s + r[0] * r[0], 0);
  const b = J.reduce((s, r) => s + r[0] * r[1], 0);
  const c = J.reduce((s, r) => s + r[1] * r[1], 0);
  const mean = (a + c) / 2;
  const spread = Math.sqrt(Math.max(((a - c) / 2) ** 2 + b * b, 0));
  return [Math.sqrt(Math.max(mean + spread, 0)), Math.sqrt(Math.max(mean - spread, 0)), 0];
}

/**
 * Gauss–Newton least squares on the three rows, recorded step by step.
 *
 * The step is solved from the normal equations `(JᵀJ) dx = −Jᵀr`, which for two
 * unknowns is a 2×2 system — no general linear algebra, and no library. A start is
 * a value of the upper ball joint, in metres.
 */
export function leastSquares(start, theta, steps = 6) {
  const C = lowerJoint(theta);
  let D = [...start];
  const history = [];
  for (let k = 0; k <= steps; k += 1) {
    const r = legsResiduals(D, C);
    const J = legsJacobian(D, C);
    const sigma = singularValues(J);
    history.push({ k, D: [...D], residual: [...r], sigma, norm: Math.hypot(...r) });
    const JtJ = [
      [J[0][0] ** 2 + J[1][0] ** 2 + J[2][0] ** 2, J[0][0] * J[0][1] + J[1][0] * J[1][1] + J[2][0] * J[2][1]],
      [0, J[0][1] ** 2 + J[1][1] ** 2 + J[2][1] ** 2],
    ];
    JtJ[1][0] = JtJ[0][1];
    const Jtr = [
      J[0][0] * r[0] + J[1][0] * r[1] + J[2][0] * r[2],
      J[0][1] * r[0] + J[1][1] * r[1] + J[2][1] * r[2],
    ];
    const det = JtJ[0][0] * JtJ[1][1] - JtJ[0][1] * JtJ[1][0];
    if (Math.abs(det) < 1e-18) break;
    const dx = [
      -(Jtr[0] * JtJ[1][1] - Jtr[1] * JtJ[0][1]) / det,
      -(Jtr[1] * JtJ[0][0] - Jtr[0] * JtJ[1][0]) / det,
    ];
    D = [D[0] + dx[0], D[1] + dx[1]];
  }
  return history;
}

// --- the compliant model ------------------------------------------------------
//
// The upper ball joint is a bush, not a joint: the upright's upper point and the
// upper arm's outer point are joined by a spring of stiffness `k`, and the wheel
// carries the corner's load: `F` sideways and `V` downwards, both at the wheel
// centre. **The engine's example carries the same pair at the same point**, so this
// model and the exported ladder are one experiment rather than two: a load applied
// at the contact patch instead of the wheel centre would tilt the upright as well as
// push it, and the two routes would disagree for a reason that is not the model.
//
// Still algebra, still swept one angle at a time. As `k` grows the two ends of the
// bush are forced together, and the answer becomes the rigid one.

/** The compliant pose at one lower-arm rotation, for a stiffness and a load. */
export function compliant(theta, k, F, V = 0, side = SIDE) {
  const base = pose(theta, side);
  if (!base) return null;
  const C = base.C;

  const energy = (alpha, beta) => {
    const D = add(C, rotate(sub(D0, C0), alpha));
    const U = add(B, mul([Math.cos(PHI_B + beta), Math.sin(PHI_B + beta)], RB));
    const u = unit(sub(D, C));
    const v = perp(u);
    const W = add(C, add(mul(u, LOCAL_W[0]), mul(v, LOCAL_W[1])));
    const gap = sub(D, U);
    // The potential of a constant force is minus its work: `-F x` for a sideways push,
    // and `+V z` for a downward one, because a wheel that rises stores energy against it.
    return (k / 2) * dot(gap, gap) - F * W[0] + V * W[1];
  };
  const gradient = (alpha, beta, h = 1e-7) => [
    (energy(alpha + h, beta) - energy(alpha - h, beta)) / (2 * h),
    (energy(alpha, beta + h) - energy(alpha, beta - h)) / (2 * h),
  ];

  let alpha = 0;
  let beta = 0;
  for (let i = 0; i < 40; i += 1) {
    const g = gradient(alpha, beta);
    const h = 1e-7;
    const ga = gradient(alpha + h, beta);
    const gb = gradient(alpha, beta + h);
    const J = [
      [(ga[0] - g[0]) / h, (gb[0] - g[0]) / h],
      [(ga[1] - g[1]) / h, (gb[1] - g[1]) / h],
    ];
    const det = J[0][0] * J[1][1] - J[0][1] * J[1][0];
    if (Math.abs(det) < 1e-18) break;
    const dx = [
      -(g[0] * J[1][1] - g[1] * J[0][1]) / det,
      -(g[1] * J[0][0] - g[0] * J[1][0]) / det,
    ];
    alpha += dx[0];
    beta += dx[1];
    if (Math.hypot(dx[0], dx[1]) < 1e-12) break;
  }

  const D = add(C, rotate(sub(D0, C0), alpha));
  const U = add(B, mul([Math.cos(PHI_B + beta), Math.sin(PHI_B + beta)], RB));
  const u = unit(sub(D, C));
  const spin = Math.atan2(u[1], u[0]) - Math.atan2(U0[1], U0[0]);
  return {
    camber: CAMBER0 + (spin * 180) / Math.PI,
    // How far the two ends of the bush have been pulled apart, in mm. This is the
    // number that goes to zero as the bush stiffens, and the reason the compliant
    // curve lands on the rigid one.
    bush: mag(sub(D, U)) * 1000,
  };
}

/**
 * The combination of rows that constrains nothing: the null direction of `Jᵀ`.
 *
 * For three rows and two unknowns this is the eigenvector of the smallest eigenvalue
 * of `J Jᵀ`, found by Jacobi rotations on the 3×3 matrix. It is worth the twenty
 * lines because it is the *only* honest answer to "which equations are the same
 * equation": a zero singular value comes for free when there are more rows than
 * columns, so the number alone proves nothing. This vector does: its entries say
 * which rows cancel each other.
 */
export function nullDirection(J) {
  const A = [0, 1, 2].map((i) => [0, 1, 2].map((j) => J[i][0] * J[j][0] + J[i][1] * J[j][1]));
  const V = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  for (let sweep = 0; sweep < 30; sweep += 1) {
    let off = 0;
    for (let p = 0; p < 3; p += 1) {
      for (let q = p + 1; q < 3; q += 1) off += A[p][q] ** 2;
    }
    if (off < 1e-30) break;
    for (let p = 0; p < 3; p += 1) {
      for (let q = p + 1; q < 3; q += 1) {
        if (Math.abs(A[p][q]) < 1e-18) continue;
        const theta = 0.5 * Math.atan2(2 * A[p][q], A[q][q] - A[p][p]);
        const c = Math.cos(theta);
        const s = Math.sin(theta);
        for (let k = 0; k < 3; k += 1) {
          const akp = A[k][p];
          const akq = A[k][q];
          A[k][p] = c * akp - s * akq;
          A[k][q] = s * akp + c * akq;
        }
        for (let k = 0; k < 3; k += 1) {
          const apk = A[p][k];
          const aqk = A[q][k];
          A[p][k] = c * apk - s * aqk;
          A[q][k] = s * apk + c * aqk;
        }
        for (let k = 0; k < 3; k += 1) {
          const vkp = V[k][p];
          const vkq = V[k][q];
          V[k][p] = c * vkp - s * vkq;
          V[k][q] = s * vkp + c * vkq;
        }
      }
    }
  }
  let smallest = 0;
  for (let i = 1; i < 3; i += 1) if (A[i][i] < A[smallest][smallest]) smallest = i;
  const w = [V[0][smallest], V[1][smallest], V[2][smallest]];
  // Fixed sign, so a panel printing it does not flicker between two equal answers.
  const lead = w.find((value) => Math.abs(value) > 1e-12) ?? 1;
  return w.map((value) => (lead < 0 ? -value : value));
}

/** A curve of camber against travel, from either model. */
export function curve({ travel = 40, count = 41, k = null, F = 3000, V = 0 } = {}) {
  const points = [];
  for (let i = 0; i < count; i += 1) {
    const t = -travel + (2 * travel * i) / (count - 1);
    const theta = thetaFor(t);
    const state = pose(theta);
    const camber = k === null ? state.camber : compliant(theta, k, F, V).camber;
    points.push({ travel: t, camber });
  }
  return points;
}
