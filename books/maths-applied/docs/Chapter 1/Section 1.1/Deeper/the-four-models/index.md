---
title: The four models, side by side
chapter: 1
chapter_title: Suspension kinematics
section: '1.1'
section_title: The question
kind: deeper
---

# The four models, side by side

This page is a map, not a step. The main thread reaches the same conclusions
without it, and nothing later depends on having read it.

## One mechanism, four questions

The mechanism never changes. What changes is what the model is willing to say, and
each model exists because the one before it could not answer a particular question.

| Model | Assumes | Answers | Costs | Meets the last one at |
|---|---|---|---|---|
| Rigid triangle | one rigid body per wishbone, one degree of freedom | where the wheel is, and at what angle | nothing measurable | — |
| Two legs | each leg a fixed length, plus the upright's | what an extra equation does | one redundancy to explain | the same pose |
| Diagnosed | the same, read with a decomposition | which equation was spare | a null vector to interpret | the reduced system's answer |
| With a bush | the upper joint is a spring | how far the angles move | a stiffness to measure | the rigid curve, as stiffness rises |

## Why the order matters

It is tempting to start at the bottom of that table, because the last row is the
most detailed. Starting there would lose three things:

- **the tolerance argument.** You cannot say whether the bush matters until you
  know the size of the effect and the size of the question's tolerance. The rigid
  model is what produces the first number.
- **the diagnosis.** An over-determined model is confusing until you have seen a
  determined one. The two-leg model is only interesting as a change from the
  triangle.
- **the check.** Every model is verified against the previous one. The first one has
  nothing behind it, so it is checked against a closed form instead — which is
  available precisely because the model is simple.

## Reading this chapter in two tracks

The main thread is [§1.1](../../learn/) to [§1.5](../../../section-1.5/learn/), in order, and it is complete on its own. Each of
those sections offers one optional page, marked *Going deeper*:

- **[§1.2](../../../section-1.2/learn/)** — why two circles meet twice, and what the second answer is.
- **[§1.3](../../../section-1.3/learn/)** — what least squares is minimising, and why squared error.
- **[§1.4](../../../section-1.4/learn/)** — what a singular value is telling you, geometrically.
- **[§1.5](../../../section-1.5/learn/)** — why equilibrium is algebra rather than a simulation.

None of them is needed for the next section. That is a deliberate promise rather
than a hope: if a depth page turned out to be required, it would be part of the main
thread and not a detour.

## What is deliberately absent

- **No tyre model.** A tyre turns an angle into a force, and camber's importance
  comes through it. That is a separate subject, and [§1.7](../../../section-1.7/learn/) says where it belongs.
- **No mass.** Everything here is statics. [§1.6](../../../section-1.6/learn/) says what changes.
- **No three-dimensional solve in the main thread.** The front view is what [§1.2](../../../section-1.2/learn/) to
  [§1.5](../../../section-1.5/learn/) derive. The 3D solver is used to check it in [§1.2](../../../section-1.2/learn/), to produce the export's
  ladder in [§1.5](../../../section-1.5/learn/), and as the model with mass in [§1.6](../../../section-1.6/learn/). [§1.4](../../../section-1.4/learn/) explains what the
  projection costs and why the model can afford it.
