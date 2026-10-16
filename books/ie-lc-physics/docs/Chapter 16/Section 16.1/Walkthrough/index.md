---
title: 16.1 Magnetic flux and flux density — Learn
chapter: 16
chapter_title: Electromagnetic induction
section: '16.1'
section_title: Magnetic flux and flux density
tier: O
refs:
- '3.6'
kind: walkthrough
---

# 16.1 Magnetic flux and flux density — Learn

**Prerequisites:** magnetic fields and magnetic flux density from Section 15.1;
the area of a rectangle; the tesla as the unit of flux density.

**Objectives:** define magnetic flux and magnetic flux density; use $\Phi = BA$;
find the flux linkage of a coil.

By the end of this section, you can find how much magnetic field passes through a
coil, and how that amount changes when the coil turns.

## Two ways to measure a magnetic field

A magnetic field can be described in two ways, and they answer two different
questions.

**Magnetic flux density**, $B$, tells you how strong the field is at a point. Its
unit is the **tesla** (T). Chapter 15 used $B$ to find the force on a
current-carrying wire.

**Magnetic flux**, $\Phi$ (the Greek letter phi), tells you how much field passes
through a surface. Its unit is the **weber** (Wb).

Think of a field as rain falling on a window. The flux density is how heavy the
rain is. The flux is how much water passes through the window in total, which
depends on the rain and on the size of the window.

## Magnetic flux

For a flat surface of area $A$ placed at right angles to a uniform field of flux
density $B$, the magnetic flux is

$$\Phi = BA$$

- $\Phi$ is the magnetic flux, in webers (Wb);
- $B$ is the magnetic flux density, in teslas (T);
- $A$ is the area of the surface, in square metres (m²).

Because the unit of flux is the weber and the unit of area is the square metre,
the tesla is the same as a weber per square metre:

$$1\,\text{T} = 1\,\text{Wb/m}^2$$

**Example 1.** A coil of area 0.040 m² lies at right angles to a field of flux
density 0.25 T. Calculate the flux through the coil.

$$
\Phi = BA
$$

$$
\Phi = 0.25 \times 0.040
$$

$$
\Phi = 0.010\,\text{Wb}
$$

**Example 2.** A field of flux density 0.15 T passes at right angles through a
coil of area 0.020 m². Calculate the flux through the coil.

$$
\Phi = BA = 0.15 \times 0.020 = 3.0 \times 10^{-3}\,\text{Wb}
$$

**Example 3.** The flux through a surface of area 0.050 m² is 0.020 Wb. Calculate
the flux density of the field.

Rearranging $\Phi = BA$ for $B$:

$$
B = \frac{\Phi}{A} = \frac{0.020}{0.050} = 0.40\,\text{T}
$$

## Orientation

The flux through a coil depends on how the coil is turned.

- When the **plane of the coil is at right angles to the field**, the field passes
  straight through the coil. The flux is at its largest value, $\Phi = BA$.
- As the coil turns away from that position, less field passes through it, so the
  flux falls.
- When the **plane of the coil is parallel to the field**, the field runs along
  the coil and no field passes through it. The flux is zero.

This is the whole reason a generator works. A coil turning in a steady field has a
flux through it that rises and falls, and Section 16.2 shows that a changing flux
is what drives a current.

> **Watch out.** Flux density $B$ and flux $\Phi$ are different quantities with
> different units. A field of 0.20 T is not a flux of 0.20 Wb. Also, $A$ is the
> area of **one turn**, not the total area of all the turns laid flat. A coil of
> 500 turns, each of area 0.010 m², has an area of 0.010 m² in $\Phi = BA$.

## Flux linkage

A coil has many turns, and the same flux passes through every one of them. The
voltage induced in the coil depends on the total, so it is useful to record the
flux through all the turns together. This is the **flux linkage**:

$$N\Phi = NBA$$

- $N$ is the number of turns in the coil;
- $N\Phi$ is the flux linkage, in weber-turns (Wb).

The weber-turn has the same dimensions as the weber, because $N$ is a pure number.
We write it as Wb and remember that it counts every turn.

**Example 4.** A coil of 300 turns, each of area 0.020 m², lies at right angles to
a field of flux density 0.15 T. Calculate the flux through one turn and the flux
linkage of the coil.

The flux through one turn is

$$
\Phi = BA = 0.15 \times 0.020 = 3.0 \times 10^{-3}\,\text{Wb}
$$

The flux linkage is

$$
N\Phi = 300 \times 3.0 \times 10^{-3} = 0.90\,\text{Wb}
$$

## Progress check

Back to the chapter problem. The generator coil has 180 turns, and each turn
encloses an area of 0.020 m². The coil turns in a field of flux density 0.30 T.

Find the flux through one turn when the plane of the coil is at right angles to
the field. Then find the flux linkage of the whole coil in that position. Keep
both numbers: Section 16.2 uses the flux linkage to find the induced voltage, and
the answer depends on how fast that flux linkage changes.

## You should now be able to

- define magnetic flux and magnetic flux density, and give the unit of each;
- use $\Phi = BA$ to find a flux, a flux density or an area;
- explain why the flux through a turning coil rises and falls, and when it is
  zero;
- find the flux linkage $N\Phi$ of a coil of $N$ turns.
