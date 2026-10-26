// The elliptic and linear-system pages share this figure: the field settling onto
// the exact curve, and the residual falling as the iteration count rises.
//
// Conjugate gradients is exact in at most n steps on an n-cell grid, so the residual
// does not merely fall: it reaches the floor and stops. That is the picture the page
// needs, and it is a property of the method rather than of this problem.
import cg from "../data/solvers/cg-poisson/kernel.js";
import { kernelLab, sci } from "./kernel-lab.js";

/** @param {HTMLElement} el */
export function mount(el) {
  kernelLab(el, cg, {
    title: "Conjugate gradients on a one-dimensional Poisson problem",
    description:
      "The solution of -u'' = f on a grid, relaxing from zero toward the exact curve, " +
      "with the residual at each iteration below it.",
    prompt: "Predict: the residual falls. Does it fall faster or slower as the grid grows?",
    controls: ["cells", "load"],
    layout: "field",
    steps: 20,
    runLabel: "Run 20 iterations",
    field: (kernel) => {
      const cells = Math.round(kernel.get("cells"));
      const exact = kernel.output("exact").slice(0, cells);
      const top = Math.max(...exact, 0.001);
      return {
        values: kernel.output("u").slice(0, cells),
        exact,
        cells,
        domain: [0, top * 1.15],
        xLabel: "x",
        yLabel: "u",
      };
    },
    trace: (kernel) => {
      const iteration = Math.round(kernel.scalar("iterations"));
      return Math.max(kernel.output("history")[iteration], 1e-18);
    },
    traceLog: true,
    traceX: "iteration",
    traceLabel: "residual",
    readout: (kernel) => {
      const cells = Math.round(kernel.get("cells"));
      const u = kernel.output("u").slice(0, cells);
      const exact = kernel.output("exact").slice(0, cells);
      let worst = 0;
      for (let index = 0; index < cells; index += 1) {
        worst = Math.max(worst, Math.abs(u[index] - exact[index]));
      }
      const converged = kernel.scalar("converged") > 0 ? "converged" : "still falling";
      return (
        `${Math.round(kernel.scalar("iterations"))} iterations on ${cells} cells: the ` +
        `residual is ${sci(kernel.scalar("residual"))}, the worst error against the ` +
        `exact curve is ${sci(worst)}; ${converged}.`
      );
    },
    caption:
      "The dashed curve is the exact solution of the continuous problem. On n cells " +
      "the method is exact in at most n iterations in exact arithmetic; the residual " +
      "reaching a floor is the finite-precision part, not a failure of the method.",
  });
}
