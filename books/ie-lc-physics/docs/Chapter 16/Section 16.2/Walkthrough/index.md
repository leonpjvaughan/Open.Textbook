---
title: 16.2 Faraday's law of induction — Learn
chapter: 16
chapter_title: Electromagnetic induction
section: '16.2'
section_title: Faraday's law of induction
tier: O
refs:
- '3.6'
kind: walkthrough
---

# 16.2 Faraday's law of induction — Learn

**Prerequisites:** magnetic flux and flux linkage from Section 16.1; the
electromotive force from Section 14.5; the idea of a rate of change.

**Objectives:** state Faraday's law of induction; use $E = -N\dfrac{\Delta\Phi}{\Delta t}$
to find an induced voltage; describe what makes an induced voltage larger.

By the end of this section, you can work out the voltage induced in a coil from
how fast the flux through it changes.

## A changing flux drives a current

Push a magnet into a coil and the ammeter moves. Hold the magnet still and the
ammeter returns to zero. The coil has not changed, and the magnet is still there.
What has stopped is the **change**.

This is the discovery that Michael Faraday made in 1831. A steady magnetic field
does nothing. A **changing** magnetic flux induces an electromotive force, and
that emf drives a current if the coil is part of a complete circuit.

## Faraday's law

**Faraday's law of induction.** The induced electromotive force is proportional
to the rate of change of the flux linkage.

$$E = -N\frac{\Delta\Phi}{\Delta t}$$

- $E$ is the induced electromotive force, in volts (V);
- $N$ is the number of turns in the coil;
- $\Delta\Phi$ is the change in the flux through one turn, in webers (Wb);
- $\Delta t$ is the time taken for that change, in seconds (s).

The minus sign records the **direction** of the induced emf. It says that the
induced emf opposes the change that produced it, which is Lenz's law. Section 16.3
explains why. When you want the size of the emf only, use

$$E = N\frac{\Delta\Phi}{\Delta t}$$

and leave the minus sign out.

The fraction $\dfrac{\Delta\Phi}{\Delta t}$ is a rate of change: how many webers
pass through the coil each second. Multiplying by $N$ counts every turn, because
the same flux changes through all of them.

## What makes the emf larger

From the equation, the induced emf is larger when

- the coil has **more turns**;
- the flux changes by **more webers**;
- the change happens in **less time**.

The last point is the one that surprises readers. The same change made twice as
quickly doubles the emf. Push the magnet in slowly and the ammeter barely moves.
Push it in quickly and the ammeter jumps.

You can also change the flux by changing the field, by changing the area of the
coil in the field, or by turning the coil. A generator turns the coil, which is
why its output changes all the time.

> **Watch out.** Faraday's law uses the **change** in flux, not the flux itself.
> A coil sitting in a strong steady field has a large flux but induces no emf at
> all. Also use the flux through **one turn** for $\Delta\Phi$, then multiply by
> $N$. Multiplying the area by $N$ and then by $N$ again counts the turns twice,
> and the answer comes out $N$ times too large.

**Example 1.** The flux through one turn of a coil of 50 turns changes from
0.010 Wb to 0.040 Wb in 0.20 s. Calculate the average induced emf.

$$
\Delta\Phi = 0.040 - 0.010 = 0.030\,\text{Wb}
$$

$$
E = N\frac{\Delta\Phi}{\Delta t} = 50 \times \frac{0.030}{0.20}
$$

$$
E = 50 \times 0.15 = 7.5\,\text{V}
$$

**Example 2.** A single loop of area 0.020 m² lies at right angles to a field
whose flux density rises from 0.10 T to 0.50 T in 0.040 s. Calculate the average
induced emf.

The change in flux is the change in flux density multiplied by the area:

$$
\Delta\Phi = A\,\Delta B = 0.020 \times (0.50 - 0.10) = 0.020 \times 0.40
$$

$$
\Delta\Phi = 8.0 \times 10^{-3}\,\text{Wb}
$$

There is one loop, so $N = 1$:

$$
E = N\frac{\Delta\Phi}{\Delta t} = 1 \times \frac{8.0 \times 10^{-3}}{0.040} = 0.20\,\text{V}
$$

**Example 3.** A coil of 200 turns is wound on a frame. The flux through each
turn changes by $4.0 \times 10^{-3}$ Wb, and the average induced emf is 12 V.
Calculate the time taken for the change.

Rearranging $E = N\dfrac{\Delta\Phi}{\Delta t}$ for $\Delta t$:

$$
\Delta t = \frac{N\,\Delta\Phi}{E} = \frac{200 \times 4.0 \times 10^{-3}}{12}
$$

$$
\Delta t = \frac{0.80}{12} = 0.067\,\text{s}
$$

:::figure faraday-law

**Predict, then test.** Before you move any slider, write down what you expect
the induced emf to be when the time is halved. Then halve the time slider and
check. Now double the number of turns and describe what happens to the emf. Write
a sentence explaining why the time matters, using the idea of a rate of change.

## Progress check

Back to the chapter problem. The generator coil has 180 turns, and the flux
through each turn is $6.0 \times 10^{-3}$ Wb when the plane of the coil is at
right angles to the field. The coil turns at 50 revolutions each second, so it
moves from that position to one where the flux is zero in one quarter of a turn.

A quarter of a turn takes $\dfrac{1}{4 \times 50} = 5.0 \times 10^{-3}$ s.
Calculate the average emf induced in the coil during that time. Keep the answer:
Section 16.4 shows how the peak value and this average value are related.

## You should now be able to

- state Faraday's law of induction, and say that the induced emf depends on the
  **rate** of change of flux linkage;
- use $E = N\dfrac{\Delta\Phi}{\Delta t}$ to find an emf, a change in flux or a
  time;
- find the change in flux when the flux density changes, using $\Delta\Phi =
  A\,\Delta B$;
- explain why a faster change gives a larger induced emf, and why a steady field
  gives none.
