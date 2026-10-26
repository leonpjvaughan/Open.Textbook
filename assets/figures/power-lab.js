// The eigenvalues page's experiment: a vector multiplied by A again and again turns
// toward the dominant eigenvector, and the ratio of the two eigenvalues sets the
// speed. The dashed line is the target the iteration is trying to find.
import power from "../data/solvers/power-iteration/kernel.js";
import { kernelLab, sci } from "./kernel-lab.js";

/** @param {HTMLElement} el */
export function mount(el) {
  kernelLab(el, power, {
    title: "Power iteration turning toward the dominant eigenvector",
    description:
      "A unit vector repeatedly multiplied by a symmetric two-by-two matrix. The solid " +
      "arrow is the vector now; the dashed line is the dominant eigenvector it is " +
      "turning toward.",
    prompt: "Predict: ratio 0.2 or 0.9 — which matrix turns the vector faster?",
    controls: ["ratio", "mix", "angle"],
    layout: "plane",
    steps: 5,
    trace: (kernel) => Math.max(kernel.scalar("angle_error"), 1e-18),
    traceLog: true,
    traceX: "iteration",
    traceLabel: "angle error",
    readout: (kernel) => {
      const reference = kernel.output("reference");
      return (
        `After ${Math.round(kernel.scalar("iterations"))} steps: λ = ` +
        `${sci(kernel.scalar("lambda"))}, θ = ${kernel.scalar("angle").toFixed(3)} rad; ` +
        `the dominant angle is ${reference[0].toFixed(3)} rad and the error is ` +
        `${sci(kernel.scalar("angle_error"))}.`
      );
    },
    caption:
      "The second eigenvalue is ratio × the first, so the component along the other " +
      "eigenvector shrinks by that factor each step. A ratio near one is a small " +
      "gap, and a small gap is a slow method — the same trade the page names.",
  });
}
