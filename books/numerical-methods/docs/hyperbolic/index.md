---
title: Hyperbolic
---

# Hyperbolic

**You have one of these when** information travels at a finite speed along paths,
and what arrives keeps the shape of what was sent.

## What you are modelling

Something carried. A pressure wave, a shock, a crowd, a flood, a gravitational wave.
The model has a direction of travel in it, and that direction is the reason the
class behaves differently from a diffusing one.

## The model you write down

A conservation law,

$$
\frac{\partial u}{\partial t} + \nabla \cdot F(u) = 0 ,
$$

or the wave equation, which is the same statement written twice. The flux $F$ says
how much of $u$ crosses a boundary per unit time. For the simplest case $F = a u$,
and the whole solution is $u$ shifted along the line $x = a t$.

## What it becomes on a computer

Two routes, and the first one is often forgotten:

- **Follow the characteristics.** If information travels along known curves, solve
  along those curves. This is exact for the linear case and is why the method of
  characteristics is worth knowing.
- **Discretise and flux.** Divide the region into cells, compute the flux across
  each face, and update. This is a finite-volume method, and the flux is where all
  the difficulty lives: it has to decide what happens where two states meet, which
  is a Riemann problem.

The step is limited by the **CFL condition**: in one step, information must not
cross more than one cell. That limit comes from the physics and the mesh, not from
the diffusion of the scheme.

## The signature

Disturbances travel at a finite speed. That single fact explains almost everything
about the class:

- **Discontinuities are allowed.** Smooth data can steepen into a shock, and the
  shock is a real feature that a scheme must capture rather than smear.
- **The answer is not smoother than its data.** A square wave stays roughly square,
  and a scheme that smooths it is adding something the physics did not.
- **Boundary conditions are one-sided.** Information enters at an inflow boundary
  and leaves at an outflow one. Applying a value at an outflow boundary is a
  common and quiet error.

The same classification argument decides whether a problem can be evolved at all.
Elliptic coordinate conditions in numerical relativity make a change inside the
region felt everywhere at once, and the calculation cannot run. Hyperbolic
conditions give a finite speed, and it can.

## A wave that must keep its energy

Remembering has a price in the method: the answer has no decay to hide the error in,
so an integrator that quietly adds or removes a little energy every step shows it.

This is the **Hamiltonian** case, and it is a flag rather than a box: the class has
not changed, and what changes is that the method must respect the structure or a long
run is worthless. A single oscillator shows it. Run the same one with a general
method and with a structure-preserving one, and only one of them stays bounded.

:::figure energy-drift

## Flags that matter here

- **Non-linear.** Genuine shocks and rarefactions. A linear method applied to a
  non-linear flux gives the wrong wave speed.
- **Stiff source terms.** Chemistry or relaxation inside the flow changes the step
  limit; the source is solved implicitly while the flux stays explicit.
- **A conservative form.** If the quantity is conserved, the scheme must be written
  in flux form, or it will conserve the wrong total.
- **Long-time structure.** Wave problems that must stay bounded over many periods
  need a method that respects their structure, or the energy drifts.

## Techniques

Every method named here is in [Methods, A to Z](../techniques/#moving-problems), with its price and what it will not do.

| technique | what it does | when it wins | when it is the wrong tool |
|---|---|---|---|
| Method of characteristics | Solves along the paths information takes | Linear or simple non-linear problems | Shocks form, or the region is complex |
| Upwind | Uses the direction of travel to choose the stencil | Convection-dominated problems | The wave speed changes sign |
| Lax–Wendroff | Second-order centred, with a correction | Smooth solutions | Shocks: it oscillates |
| Godunov, finite volume | Solves a Riemann problem at each face | Shocks, conservation laws | Smooth, low-amplitude waves where it is overkill |
| Riemann solvers (Roe, HLLC, exact) | Decides the flux between two states | Systems of conservation laws | You have not checked the solver's entropy fix |
| WENO, limiters | High order away from a shock, low across it | Shocks and smooth parts in one problem | A smooth answer, where high order alone is cheaper |
| Discontinuous Galerkin | High order inside each cell, with a flux between | Complex geometry, high order, parallel machines | Strictly bounded problems without a limiter |
| Spectral element | High order on large elements | Smooth waves over long times | Shocks |
| Symplectic integration | Preserves the structure of a Hamiltonian problem | Long-time wave and orbit problems | Dissipative problems |

## Systems that live here

- The Euler equations: gas dynamics, jet engines, blast waves.
- Shallow water: floods, tides, dam breaks.
- Acoustics, and the noise a structure radiates.
- Elastodynamics: stress waves travelling through a component.
- Maxwell's equations, and light.
- Gravitational waves, in the formulations that can be evolved.
- Traffic flow, where the "shock" is a jam.
- Chromatography, where a concentration front travels.

## What goes wrong

| symptom | cause | fix |
|---|---|---|
| The shock is smeared over many cells | First-order upwind, or too much numerical diffusion | Higher order with a limiter |
| Wiggles appear near a shock | A centred scheme, or an unlimited high-order one | Upwind, or a limiter |
| The answer behind the shock is wrong | A non-conservative form, or the wrong Riemann solver | Write the flux form; check the wave speeds |
| It blows up at a step that worked before | CFL crossed, usually by a finer mesh | Reduce the step, and compute it from the fastest wave |
| A rarefaction has a jump in it | The Riemann solver has no entropy fix | Add one |
| Energy grows without a source | A method that does not respect the structure | Symplectic or energy-preserving integration |
| The boundary at the outlet reflects | A value was applied where information leaves | A one-sided, non-reflecting condition |

## Used in this collection

:::used

## Read next

- [Parabolic](../parabolic/index.md) — the other moving class, and the one that
  diffuses instead of carrying.
- [Eigenvalues](../eigenvalue/index.md) — the stability of a wave problem is decided by
  eigenvalues.
- [When it goes wrong](../symptoms/index.md) — the symptom table for every class.
