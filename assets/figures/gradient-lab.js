// The optimisation page's experiment: the step size decides whether the iterates
// settle, oscillate or run away. The condition is 0 < step < 2/a, and the trace of
// the gradient is where the failure is visible before the numbers become huge.
import gradient from "../data/solvers/gradient-descent/kernel.js";
import { kernelLab, sci } from "./kernel-lab.js";

/** @param {HTMLElement} el */
export function mount(el) {
  kernelLab(el, gradient, {
    title: "Gradient descent on a quadratic, and the step that breaks it",
    description:
      "The iterates of gradient descent on a one-dimensional quadratic, as points on a " +
      "number line, with the absolute gradient below them.",
    prompt: "Predict: with a = 1, which step is too large — 0.3 or 2.5?",
    controls: ["a", "b", "step"],
    layout: "line",
    steps: 10,
    line: (kernel) => ({
      curve: kernel.output("curve"),
      iterates: kernel.output("x_history").slice(0, Math.round(kernel.scalar("iterations")) + 1),
    }),
    lineLabel: "x",
    traceX: "iteration",
    trace: (kernel) => Math.max(Math.abs(kernel.scalar("gradient")), 1e-18),
    traceLog: true,
    traceLabel: "|gradient|",
    readout: (kernel) => {
      const iterations = Math.round(kernel.scalar("iterations"));
      const x = kernel.output("x_history")[iterations];
      const target = kernel.get("b") / kernel.get("a");
      const converged = kernel.scalar("converged") > 0 ? "converged" : "still moving";
      return (
        `After ${iterations} steps: x = ${sci(x)}, the objective is ` +
        `${sci(kernel.scalar("objective"))}, and the minimum is at b/a = ` +
        `${target.toFixed(3)}; ${converged}.`
      );
    },
    caption:
      "The condition is 0 < step < 2/a. Above it the iterates change sign and grow, " +
      "and the gradient trace climbs instead of falling; the objective is still " +
      "defined, which is why a run can look plausible until the numbers are large.",
  });
}
