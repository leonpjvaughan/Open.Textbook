---
title: 16.4 A.C. and D.C. generators — Learn
chapter: 16
chapter_title: Electromagnetic induction
section: '16.4'
section_title: A.C. and D.C. generators
tier: O
refs:
- '3.6'
kind: walkthrough
---

# 16.4 A.C. and D.C. generators — Learn

**Prerequisites:** Faraday's law from Section 16.2; Lenz's law from Section 16.3;
the force on a current-carrying conductor from Section 15.3.

**Objectives:** describe the parts of an a.c. generator and a d.c. generator;
explain how the output is produced; sketch the output voltage against time for
each; relate the peak value to the average and to the r.m.s. value.

By the end of this section, you can explain what the graph of an alternating
voltage looks like, and why.

## The generator effect

A generator turns a coil in a magnetic field. The coil is connected to an external
circuit, so the induced emf drives a current.

As the coil turns, the flux through it rises and falls. Section 16.2 showed that a
changing flux induces an emf, so the output changes all the time. The coil passes
through two positions in each revolution:

- **flux at its largest**, when the plane of the coil is at right angles to the
  field;
- **flux at zero**, when the plane of the coil is parallel to the field.

The emf does not follow the flux. It follows the **rate of change** of the flux.

- When the flux is at its largest, it is changing most slowly, so the emf is
  **zero**.
- When the flux is zero, it is changing most quickly, so the emf is at its
  **peak**.

That is why the graph of emf against time is a sine curve. It starts at zero,
rises to a peak, falls back through zero, reaches a peak in the opposite direction,
and returns to zero once per revolution.

## A.C. and D.C. generators

The two kinds of generator differ in one component: how the coil is connected to
the outside circuit.

- An **a.c. generator** uses two **slip rings**. Each end of the coil is joined to
  its own ring, and a carbon brush presses on each ring. The connections never
  swap over, so the current reverses direction every half revolution. The output
  is an **alternating current** (a.c.).
- A **d.c. generator** uses a **split-ring commutator**. The ring is cut into two
  halves, and the connections swap over every half revolution. The current in the
  outside circuit therefore keeps the same direction. The output is a **direct
  current** (d.c.), although it still rises and falls.

Both generators have the same main parts: a coil, a magnetic field, slip rings or
a commutator, and brushes.

The **frequency** of the output is the number of revolutions the coil makes each
second. A coil turning 50 times each second gives a 50 Hz supply, and one complete
wave takes $\dfrac{1}{50} = 0.020$ s.

## The peak value and the average value

The output of an a.c. generator is not steady, so it has more than one useful
value.

- The **peak value** $V_0$ is the largest value the voltage reaches. An
  oscilloscope measures it.
- The **average value** over a half cycle is $\dfrac{2V_0}{\pi}$, which is about
  $0.64V_0$.
- The **r.m.s. value** is the value of steady voltage that transfers energy at the
  same rate. Section 16.6 defines it properly. For a sine wave,

$$V_{\text{rms}} = \frac{V_0}{\sqrt{2}}$$

The r.m.s. value is the one that matters for power, and it is the value printed on
a mains label. In Ireland the mains is quoted as 230 V, which is an r.m.s. value.

<!-- tier:h -->
The peak value of the induced emf is

$$E_0 = NAB\omega$$

where $N$ is the number of turns, $A$ is the area of one turn, $B$ is the flux
density, and $\omega = 2\pi f$ is the angular speed of the coil in radians per
second. Increasing any of these increases the peak output.
<!-- /tier:h -->

> **Watch out.** The emf is **not** largest when the flux is largest. The two are
> out of step: at the position where the flux has its largest value, the flux is
> changing most slowly, so the emf is zero. A reader who links the emf to the flux
> instead of to the rate of change will mark the peaks of the graph in the wrong
> places.

**Example 1.** A generator turns at 50 revolutions each second. Calculate the time
for one complete revolution, and the time for one quarter of a revolution.

$$
T = \frac{1}{f} = \frac{1}{50} = 0.020\,\text{s}
$$

$$
\frac{T}{4} = \frac{0.020}{4} = 5.0 \times 10^{-3}\,\text{s}
$$

**Example 2.** The peak output of a generator is 340 V. Calculate the r.m.s.
output.

$$
V_{\text{rms}} = \frac{V_0}{\sqrt{2}} = \frac{340}{\sqrt{2}} = 240\,\text{V}
$$

**Example 3.** An a.c. supply has an r.m.s. voltage of 12 V. Calculate its peak
voltage.

Rearranging $V_{\text{rms}} = \dfrac{V_0}{\sqrt{2}}$ gives

$$
V_0 = \sqrt{2}\,V_{\text{rms}} = \sqrt{2} \times 12 = 17\,\text{V}
$$

## Progress check

Back to the chapter problem. The generator turns at 50 revolutions each second,
and the peak value of its output is 340 V.

Write down the time for one complete revolution. Then find the r.m.s. value of the
output. Finally, explain in one sentence why the emf is zero at the moment when the
flux through the coil is at its largest. Keep the r.m.s. value: Section 16.5 uses
it to work out the current in the transmission cable.

## You should now be able to

- describe the parts of an a.c. generator and a d.c. generator, and say which
  component makes the output alternate;
- explain why the output of a generator is a sine curve, and where the peaks and
  zeros fall;
- find the frequency and the period of the output from the number of revolutions
  each second;
- find the r.m.s. value of a sine-wave voltage from its peak value, and the peak
  from the r.m.s.
