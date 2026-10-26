// The root-finding page's experiment: one tangent step at a time, with the residual
// falling. The iterates are points on a number line rather than a graph of f, because
// the page already carries the cubic; what the figure adds is the *sequence* and its
// residual.
import newton from "../data/solvers/newton-root/kernel.js";
import { kernelLab, sci } from "./kernel-lab.js";

/** @param {HTMLElement} el */
export function mount(el) {
  kernelLab(el, newton, {
    title: "Newton's method on a cubic, one tangent step at a time",
    description:
      "The iterates of Newton's method for f(x) = x cubed minus 2x minus 5, as points " +
      "on a number line, with the absolute residual below them.",
    prompt: "Predict: from x = 3, how many steps before the residual is below 10⁻⁶?",
    controls: ["x0", "damping"],
    layout: "line",
    steps: 1,
    runLabel: "One step",
    line: (kernel) => ({
      curve: kernel.output("curve"),
      iterates: kernel.output("x_history").slice(0, Math.round(kernel.scalar("iterations")) + 1),
    }),
    lineLabel: "x",
    traceX: "iteration",
    trace: (kernel) => Math.max(Math.abs(kernel.scalar("residual")), 1e-18),
    traceLog: true,
    traceLabel: "|f(x)|",
    readout: (kernel) => {
      const iterations = Math.round(kernel.scalar("iterations"));
      const x = kernel.output("x_history")[iterations];
      const converged = kernel.scalar("converged") > 0 ? "converged" : "still moving";
      return (
        `After ${iterations} steps: x = ${x.toFixed(6)}, ` +
        `f(x) = ${sci(kernel.scalar("residual"))}; ${converged}.`
      );
    },
    caption:
      "The step is x − f(x)/f′(x), so a damping below one takes a shorter step and a " +
      "damping above one overshoots. The sequence, not the formula, is what tells you " +
      "whether a particular start converges.",
  });
}
