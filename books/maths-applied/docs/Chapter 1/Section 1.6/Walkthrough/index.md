---
title: 1.6 Mass and dampers — Learn
chapter: 1
chapter_title: Suspension kinematics
section: '1.6'
section_title: Mass and dampers
refs: []
kind: walkthrough
---

# 1.6 Mass and dampers


## The question the first five sections could not ask

Every model so far has answered a question about a **position**. Where is the wheel,
at what angle, when the car is settled? Nothing in §1.2 to §1.5 had a mass in it,
and nothing had a rate of change in it, so nothing in them could say anything about
*speed*.

But a wheel travelling over a bump is not settled. It arrives, it is pushed, it
overshoots, it settles. During that, the camber is not the camber of the steady
table in §1.2 — it is somewhere else, and it is somewhere else *because of* the
mass of the wheel and the force in the damper.

That is a different question, and it needs a different model.

## What changes

Two things, and they change the kind of problem rather than its size.

**Mass.** Give each body a mass and a moment of inertia, and the forces no longer
have to balance: they have to *accelerate* things. The equations become

$$ M\ddot{q} + C\dot{q} + \Phi_q^{\mathsf{T}}\lambda = Q, \qquad \Phi(q) = 0, $$

where $q$ collects the positions, $\Phi(q) = 0$ is the constraint set from §1.2,
and $\lambda$ holds the forces that keep the constraints true — the force in the
ball joint, the force the wishbone carries. That is a **differential-algebraic**
system: differential equations for the motion, algebraic equations for the
constraints, solved together.

That structure has a name, and it changes the method: the constraint is enforced by
an unknown force, so the state and the forces are solved as one system.

:::class saddle-point

**Dampers.** A damper's force depends on how fast it is moving, not how far it has
moved. So it enters the equations as a rate, which is exactly what the algebraic
models could not represent.

## What it buys

- **A transient.** Camber during a bump, not only after it. A stiffer damper and a
  softer one can settle to the same steady camber and behave differently on the way
  there.
- **Load transfer.** The force at the contact patch is no longer something you
  choose; it is something the motion produces.
- **The natural frequencies.** How the wheel hops, and how the body heaves, are
  numbers a model with mass can predict and a model without one cannot.

## What it costs

- **A time step, and therefore an error budget.** The answer now depends on a step
  size you choose and on an integrator you trust.
- **Initial conditions.** Where the car starts matters, and there is no longer one
  answer per position — there is a history.
- **Stability.** Constrained dynamics are harder to integrate than either
  differential or algebraic equations alone. The cost is not arithmetic; it is the
  care needed to know the answer is real.

With the mass and the rate terms in, the class has changed again: the answer now
moves forward in time and forgets where it started, and the step is decided by the
fastest thing in the model.

:::class parabolic

## What the model says

The package's quarter car is this model, built: a chassis that can heave, a coil-over
between the chassis and the lower arm, and a tyre held on the road. Released from the
design position, with no driver and no bump, it swings under its own weight and the
coil pulls it back.

:::figure quarter-car

That is the whole difference. §1.2's table answers "where is the wheel when it is
settled"; this answers "what is it doing on the way there". And in this model it never
arrives: there is a spring and no damper, so the motion repeats. The wheel travels from
the design position to **212.8 mm** into bump and back, once every **0.625 s** — a
frequency of **1.6 Hz** — with the same peak every time, which is a number no static
model can produce.

The numbers, from the package's own solver and quoted with its sign convention (camber
positive with the top of the wheel outboard, the opposite of §1.2):

| | |
|---|---|
| travel, repeated | 0 to 212.8 mm |
| period, and frequency | 0.625 s, 1.6 Hz |
| camber through the cycle | 0° to −9.53° |
| energy drift over 601 steps | 6.3 × 10⁻⁸ of the starting value |
| largest constraint violation | 1.3 × 10⁻¹⁵ |

The package integrates with classical Runge–Kutta and then **projects the state back onto
the constraints after every step**, rather than adding a Baumgarte term that pulls the state
towards them. That is why the two diagnostics can both be small at once: the constraints are
enforced rather than encouraged.

The two diagnostics at the bottom are the ones that make the oscillation trustworthy.
An integrator that leaked energy would show a motion that grew or died, and the
constraint drift is the measure of whether the linkage is still a linkage: at 10⁻¹⁵ m
it is round-off, not a stretched arm.

## The agreement this section owes

The chapter's rule is that a model earns its place by failing, and that agreement is a
number. §1.6's agreement is the one this model can state: **at any moment, the dynamic
model's camber is the static model's camber at the same travel.**

It is, to **0.006°**. At the instant the wheel is 72.35 mm into bump, the dynamic model
gives −2.079° and the package's static model at that travel gives −2.073°. The same
holds anywhere in the swing, because the geometry and the constraints are the same model
— what the masses and the forces add is *time*, not a different linkage.

There is a second comparison here, and it is the one worth keeping. **§1.2's front view
gives 0.93° at that travel**, not 0.006° — because it is a projection, accurate near the
design position and not far from it. Within the chapter's 80 mm the two agree to 0.033°;
at 72 mm the front view is already a degree out. The small model is not wrong; it is
*bounded*, and the bound is the number.

A third test was written and taken out: "as the masses go to zero the model must become
the algebraic one". A free quarter car cannot run it — with no weight there is nothing to
swing against — and a driven model would be needed to state it properly. The comparison
above is the same claim in the form this model can answer.

## One trajectory, or a family of them

The run above is one stiffness. The section's point is that the stiffness decides the motion, and a
reader can watch that happen instead of taking it on trust: the control below sets the coil's
stiffness and the engine re-runs, in this page.

:::figure dynamics-table

Each column is an integration, not a recording. Across the control's range the chassis falls from a
third of a metre to about a centimetre, and the period shortens with it — the number the static
model cannot produce at all. The constraint column stays near `1e-15` whatever the stiffness, which
is the projection doing its job after every step.

The range stops at 2 MN/m, and that is worth knowing rather than hiding: the kernel steps at this
study's five milliseconds, and a stiffer coil swings faster than five milliseconds can resolve. The
step is part of the model, in the same way the stiffness is.

## The code behind these numbers

None of the numbers above was typed. The package derives the equations with sympy — the mass
matrix, the velocity-product term that `M q̈ = f` leaves out, and the forces are in
[`otkd/problem/dynamics.py`](https://github.com/leonpjvaughan/suspension-kinematics/blob/main/src/otkd/problem/dynamics.py)
— and
[`otkd/emitters/wasm.py`](https://github.com/leonpjvaughan/suspension-kinematics/blob/main/src/otkd/emitters/wasm.py)
factors the same expressions into a straight-line program, prints it as Rust and compiles it to
WebAssembly. The kernel that would run in a page is generated from this model by that pipeline, and
[`scripts/run_kernel.py`](https://github.com/leonpjvaughan/suspension-kinematics/blob/main/scripts/run_kernel.py)
runs it and prints the table: the trajectory, the energy drift, and the difference from the
package's own Python integration.

That is worth a look for two reasons. It is the same derivation in two languages, so nothing can
drift between the figure and the engine. And the pipeline is short enough to read: sympy residual,
common subexpressions, Rust, `wasm32-unknown-unknown`, one buffer of `f64`.

## You should now be able to

- say what a differential-algebraic model is, and why the constraint forces appear
  in it
- say what mass and damping each add to the question, and what each costs
- state the limit in which the dynamic model must reproduce §1.2's answers

## Watch out

The seductive shortcut is to run a dynamic simulation, wait for it to stop moving,
and call the result the steady answer. It usually is, and it usually takes long
enough that nobody checks.

The limit test exists because "usually" is not evidence. Take the mass to zero and
the model must *become* the algebraic one, exactly, at any stiffness — and if it
does not, the difference is a modelling error that a long simulation would have
hidden behind round-off.
