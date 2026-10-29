---
title: Parabolic
---

# Parabolic

**You have one of these when** the answer moves forward in time and smooths as
it goes, so it forgets where it started.

## What you are modelling

A transient that settles. Heat spreading through a casting, a tyre warming, a
damper heating, a pollutant dispersing. What is given at one moment is smoothed
at the next, and sharp features disappear.

## The model you write down

$$
\frac{\partial u}{\partial t} = \nabla \cdot \big(k \nabla u\big) + f .
$$

The right-hand side is a balance of what flows in and out. There is no term for
"what is carried along", which is what separates this class from the next one.

## What it becomes on a computer

**Worked number.** On a mesh with $\Delta x=0.1$, the explicit heat step is
stable only while $\Delta t\le \Delta x^2/2=0.005$.

Method of lines: discretise space, and what is left is a large system of
ordinary differential equations in time,

$$
\dot{u} = F(u) .
$$

Then there is a choice, and it is the whole of this page:

- **Explicit.** Simple, one function evaluation per step, and the step is
  limited by $\Delta t \propto \Delta x^{2}$. Refining the mesh by two costs
  twice the work per step and four times the number of steps, so eight times the
  work for the same interval.
- **Implicit.** A linear system at every step, and no such limit. More work per
  step, far fewer steps.

The first limit decides whether a mesh is affordable, and the figure below is
that arithmetic rather than a warning. Hold the time you want to reach fixed and
count the steps. Twice the cells means a quarter of the time step, so four times
as many steps. The plot counts those steps and nothing else; the work per step
also doubles, so the total goes up eight times. Eight times the resolution is
sixty-four times the steps.

:::figure step-limit

## The signature

Two properties, and both are testable:

- **The answer is smoother than its initial data.** A kink becomes a curve. This
  is not an artefact; it is the class.
- **The fast modes decay fastest.** That is what makes the problem **stiff**.
  The time step is set by a scale that vanishes almost immediately and that you
  do not care about, while the scale you do care about is slow.

So this class is the one where "it takes forever" usually means "the method is
explicit and the mesh is fine".

## Flags that matter here

- **Stiff.** Almost always, in practice. The flag does not change the class; it
  changes the method, and it is the reason the implicit methods exist.
- **A coefficient that depends on the answer.** Radiation, or conductivity that
  changes with temperature, makes each step non-linear and puts a root-finding
  loop around it.
- **Advection as well as diffusion.** Then the model has both a parabolic term
  and a hyperbolic one, and the advection decides the time step and the
  accuracy. See [Hyperbolic](../hyperbolic/index.md).
- **A long time interval.** Backward-looking methods with adaptive steps, or a
  steady solve if the transient is not the question.

## Techniques

Every method named here is in [Methods, A to Z](../techniques/#moving-problems),
with its price and what it will not do.

| technique | what it does | when it wins | when it is the wrong tool |
|---|---|---|---|
| Forward Euler, explicit Runge–Kutta | Steps forward using the current rate | Cheap steps, short intervals, coarse meshes | Stiff problems: the step limit is brutal |
| Backward Euler | Solves implicitly, unconditionally stable | Stiff problems, steady settling | Accuracy: it is only first order |
| Crank–Nicolson | Averages the explicit and implicit sides | Second order, stable, smooth answers | Sharp transients: it rings |
| BDF | Uses several past steps, implicitly | Stiff problems with a smooth solution | Starting up; the first steps need another method |
| Radau, implicit Runge–Kutta | High order, stiffly stable, adaptive | Stiff problems where accuracy matters | Very large systems: the linear algebra is heavy |
| ADI | Splits the operator by direction | Rectangular grids in two or three dimensions | Complicated geometry |
| Spectral methods | Expands in smooth basis functions | Smooth solutions, simple regions | Shocks, or complex boundaries |
| Exponential integrators | Treats the linear part exactly | A dominant linear term, a small non-linear one | The linear part is not the hard part |
| Adaptive step control | Estimates the error and changes the step | Any time-dependent problem | You have not checked the error estimate is honest |

## Systems that live here

- A casting cooling, and the residual stress that follows.
- A tyre or a brake disc heating over a lap.
- A damper whose oil warms and whose damping then changes.
- Pollutant dispersing in air or water.
- A drug diffusing into tissue.
- Option pricing, run backwards in time.
- Pressure diffusing through soil.
- Image smoothing, where the picture is the initial data.

## What goes wrong

| symptom | cause | fix |
|---|---|---|
| The answer oscillates once the step is large | The explicit stability limit was crossed | Go implicit, or reduce the step |
| The step size collapses to nothing | Stiff, with an explicit method | An implicit method |
| It takes far more steps than expected | The $\Delta x^{2}$ limit, with a fine mesh | Implicit method, or a coarser mesh with a check |
| The total quantity is not conserved | A non-conservative discretisation | Write the flux form, and check the balance |
| The early time is wrong and the late time is fine | The initial data does not match the boundary | Make them consistent before blaming the solver |
| Refining the time step changes the answer | It is not converged in time | Halve the step and compare; use an error estimate |
| The result depends on the mesh in a way the physics does not | Numerical diffusion from the scheme | Higher order, or a different discretisation |

The first row of the table is the one to see rather than read. It is the other
half of the limit: the count above says what a small time step costs, and this
says what it protects. The figure starts a triangular temperature profile on a
grid and runs the same scheme at two values of $r = \alpha\Delta t/\Delta x^2$.
At $r = 0.4$ the kink smooths. At $r = 0.6$ the same scheme grows, and that
growth is the numerics failing rather than the physics.

:::figure heat-lab

## Used in this collection

:::used

## Read next

- [Why the time step is tied to the square of the mesh](stability/index.md) —
  the working under this class: von Neumann, and the limit the grid-scale mode
  sets.
- [Hyperbolic](../hyperbolic/index.md) — the class where the answer remembers,
  and the pair to this one.
- [Elliptic](../elliptic/index.md) — what is left when the transient has
  finished.
- [Reading the class off the equation](../reading-the-class/index.md) — the one
  number that says an equation like this one is parabolic.
- [When it goes wrong](../symptoms/index.md) — the symptom table for every
  class.

Back to the map: [the nine kinds](../index.md) puts this class among the
other eight.
