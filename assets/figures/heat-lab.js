// The parabolic page's own experiment: a kink smoothing, and the same scheme growing
// once r crosses one half.
//
// The initial data is a triangular hat, not a sine mode, because a reader can see a
// kink. The first click smooths it; the second, with r above 0.5, makes it grow. The
// control is the dimensionless number from the page, not a time step, so the reader
// is moving the quantity the stability condition names.
import heat from "../data/solvers/heat-explicit/kernel.js";
import { kernelLab, sci } from "./kernel-lab.js";

/** @param {HTMLElement} el */
export function mount(el) {
  kernelLab(el, heat, {
    title: "Explicit diffusion, stable and unstable",
    description:
      "A triangular initial temperature profile on a grid, advanced by the explicit " +
      "scheme. Below r = 0.5 the kink smooths and the largest value falls; above it " +
      "the field grows without bound.",
    prompt: "Predict: at r = 0.40 the kink smooths. What will r = 0.60 do?",
    controls: ["r", "cells"],
    layout: "field",
    steps: 20,
    field: (kernel) => {
      const cells = Math.round(kernel.get("cells"));
      return {
        values: kernel.output("u").slice(0, cells),
        cells,
        domain: [-1.2, 1.2],
        xLabel: "x",
        yLabel: "u",
      };
    },
    initial: (kernel) => {
      const cells = Math.round(kernel.get("cells"));
      kernel.state.fill(0);
      for (let index = 0; index < cells; index += 1) {
        const x = index / (cells - 1);
        kernel.state[index] = Math.max(0, 1 - Math.abs(x - 0.5) / 0.22);
      }
    },
    trace: (kernel) => kernel.scalar("norm"),
    traceLog: true,
    traceLabel: "largest |u|",
    readout: (kernel, history, steps) => {
      const r = kernel.get("r");
      const verdict =
        r > 0.5
          ? "past r = 1/2, so the field grows"
          : "below r = 1/2, so the field decays";
      return (
        `r = ${r.toFixed(2)}, ${steps} steps: the largest value is ` +
        `${sci(kernel.scalar("norm"))}; ${verdict}.`
      );
    },
    caption:
      "The vertical axis is fixed at ±1.2, so a field that grows past it is held at " +
      "the frame edge; the trace below keeps the growth in view. The zigzag is the " +
      "alternating mode the instability amplifies, which is the oscillation the page " +
      "names.",
  });
}
