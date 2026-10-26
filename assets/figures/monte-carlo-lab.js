// The averaging page's experiment: an estimate and its error bar, with the error
// falling as 1/√n. The dashed line is π; the band is ±2 standard errors.
//
// The generator is seeded in the kernel, so two readers comparing what they saw are
// comparing the same sequence, and a reload is not a new experiment.
import monte from "../data/solvers/monte-carlo-pi/kernel.js";
import { kernelLab, sci } from "./kernel-lab.js";

/** @param {HTMLElement} el */
export function mount(el) {
  kernelLab(el, monte, {
    title: "Monte Carlo estimation of π, with its error bar",
    description:
      "The estimate of π after each batch of samples, with a band of two standard " +
      "errors around it and the true value as a dashed line.",
    prompt: "Predict: to halve the error, how many times more samples do you need?",
    controls: ["seed", "batch"],
    layout: "estimate",
    steps: 10,
    runLabel: "Draw 10 batches",
    skipInitialTrace: true,
    resetSteps: 1,
    traceX: "batch",
    trace: (kernel) => Math.max(Math.abs(kernel.scalar("estimate") - Math.PI), 1e-12),
    traceLog: true,
    traceLabel: "|estimate − π|",
    readout: (kernel) => {
      const samples = Math.round(kernel.scalar("samples"));
      return (
        `${samples} samples: the estimate is ${kernel.scalar("estimate").toFixed(4)}, ` +
        `the standard error is ${sci(kernel.scalar("stderr"))}. The error falls as ` +
        `1/√n, so four times the samples halves it.`
      );
    },
    caption:
      "The band is the method's own claim about its error, not a confidence interval " +
      "in disguise: it is two standard errors from the binomial variance. The dashed " +
      "line is the answer the method does not know.",
  });
}
