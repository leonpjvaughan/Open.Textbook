// The hyperbolic page's experiment: a pulse that splits and travels, and the Courant
// number that decides whether it stays a pulse.
//
// Energy is the trace rather than the largest value, because the scheme conserves it
// to round-off below c = 1 and loses that guarantee above it. The page's claim is
// about what the method keeps, so the figure measures what it keeps.
import wave from "../data/solvers/wave-explicit/kernel.js";
import { kernelLab, sci } from "./kernel-lab.js";

/** @param {HTMLElement} el */
export function mount(el) {
  kernelLab(el, wave, {
    title: "A pulse under the explicit wave scheme",
    description:
      "A Gaussian pulse on a grid, advanced by the leapfrog scheme. Below the Courant " +
      "limit of one it splits into two halves that travel; above it the high modes grow.",
    prompt: "Predict: c = 0.7 lets the pulse travel. What does c = 1.1 do?",
    controls: ["courant", "cells"],
    layout: "field",
    steps: 40,
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
        const x = index / (cells - 1) - 0.5;
        kernel.state[index] = Math.exp(-((x / 0.08) ** 2));
      }
    },
    trace: (kernel) => Math.max(kernel.scalar("energy"), 1e-18),
    traceLog: true,
    traceLabel: "energy",
    readout: (kernel, history, steps) => {
      const c = kernel.get("courant");
      const verdict =
        c > 1
          ? "past the Courant limit, so the short modes grow"
          : "below the Courant limit, so the energy is conserved";
      return (
        `c = ${c.toFixed(2)}, ${steps} steps: the largest displacement is ` +
        `${sci(kernel.scalar("norm"))}, the energy is ${sci(kernel.scalar("energy"))}; ` +
        `${verdict}.`
      );
    },
    caption:
      "Below c = 1 the trace is flat: the scheme conserves the discrete energy, so " +
      "the pulse keeps its shape. Above it the trace climbs, and the reason is the " +
      "highest mode the grid can carry, not the pulse.",
  });
}
