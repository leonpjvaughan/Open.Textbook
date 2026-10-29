---
title: 1.6 Mass and dampers
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
at what angle, when the car is settled? Nothing in [§1.2](../../section-1.2/learn/) to [§1.5](../../section-1.5/learn/) had a mass in it,
and nothing had a rate of change in it, so nothing in them could say anything about
*speed*.

But a wheel travelling over a bump is not settled. It arrives, it is pushed, it
overshoots, and it settles. During that, the camber is not the camber of the steady
table in [§1.2](../../section-1.2/learn/) — it is somewhere else, and it is somewhere else *because of* the
mass of the wheel and the spring that holds it. A damper would change how it
settles, and this section will say what that would take.

That is a different question, and it needs a different model.

## What changes

Two things change the kind of problem rather than its size, and only one of them is
in the run on this page.

**Mass.** Give each body a mass and a moment of inertia, and the forces no longer
have to balance: they have to *accelerate* things. The equations become

$$ M\ddot{q} + C\dot{q} + \Phi_q^{\mathsf{T}}\lambda = Q, \qquad \Phi(q) = 0, $$

where $q$ collects the positions, $M$ is the mass matrix, $C$ is the damping,
$\Phi_q$ is the Jacobian of the constraints, $Q$ holds the applied forces,
$\Phi(q) = 0$ is the constraint set from [§1.2](../../section-1.2/learn/),
and $\lambda$ holds the forces that keep the constraints true — the force in the
ball joint, the force the wishbone carries. That is a **differential-algebraic**
system: differential equations for the motion, algebraic equations for the
constraints, solved together.

That structure has a name, and it changes the method: the constraint is enforced by
an unknown force, so the state and the forces are solved as one system.

:::class saddle-point

**A damper would add a rate term.** A damper's force depends on how fast it is
moving, not how far it has moved. The $C\dot q$ term in the equation above is where
that would live. In the quarter car on this page $C=0$: there is a spring and no
damper, so the motion repeats. A damped model would settle instead; that is the next
model, not this one.

## What it buys

- **A transient.** Camber during a bump, not only after it. This run has no damper,
  so the transient repeats; adding one would make it settle, and the difference
  between settling and repeating is the next model.
- **Load transfer.** The force at the contact patch is no longer something you
  choose; it is something the motion produces.
- **The natural frequencies.** How the wheel hops, and how the body heaves, are
  numbers a model with mass can predict and a model without one cannot.

How fast it hops is not a separate calculation. The frequencies at which the motion
repeats are carried by the same equations, as their eigenvalues, and the step has to
be short compared with the fastest of them. Asking which change makes one of those
frequencies unstable is a different kind of problem from solving for the motion.

:::class eigenvalue

## What it costs

- **A time step, and therefore an error budget.** The answer now depends on a step
  size you choose and on an integrator you trust.
- **Initial conditions.** Where the car starts matters, and there is no longer one
  answer per position — there is a history.
- **Stability.** Constrained dynamics are harder to integrate than either
  differential or algebraic equations alone. The cost is not arithmetic; it is the
  care needed to know the answer is real.

With mass in and no damper, the model is **conservative**: it moves forward in time
and keeps its energy rather than forgetting where it started. The map files that
structure as the **Hamiltonian flag**, not as a kind of its own. The flag is described
on the [hyperbolic page](/numerical-methods/hyperbolic/), which this section does not
name as a class: the quarter car is an oscillator, not a wave.

## What the model says

The package's quarter car is this model, built: a chassis that can heave, a coil
spring between the chassis and the lower arm, and a tyre held on the road. Released
from the design position, with no driver and no bump, it swings under its own weight
and the spring pulls it back.

:::figure quarter-car

That is the whole difference. [§1.2](../../section-1.2/learn/)'s table answers "where is the wheel when it is
settled"; this answers "what is it doing on the way there". And in this model it never
arrives: there is a spring and no damper, so the motion repeats. The wheel travels from
the design position to **212.8 mm** into bump and back, once every **0.625 s** — a
frequency of **1.6 Hz** — with the same peak every time, which is a number no static
model can produce.

The numbers, from the package's own solver and quoted with its sign convention (camber
positive with the top of the wheel outboard, the opposite of [§1.2](../../section-1.2/learn/)):

| | |
|---|---|
| travel, repeated | 0 to 212.8 mm |
| period, and frequency | 0.625 s, 1.6 Hz |
| camber through the cycle | 0° to −9.53° |
| energy drift over 601 steps | 6.3 × 10⁻⁸ of the starting value |
| largest constraint violation | 1.1 × 10⁻¹⁵ |

The package integrates with classical Runge–Kutta and then **projects the state back onto
the constraints after every step**, rather than adding a Baumgarte term that pulls the state
towards them. That is why the two diagnostics can both be small at once: the constraints are
enforced rather than encouraged.

The two diagnostics at the bottom are the ones that make the oscillation trustworthy.
An integrator that leaked energy would show a motion that grew or died. The
constraint drift is the measure of whether the linkage is still a linkage. At
10⁻¹⁵ m it is round-off, not a stretched arm.

## The agreement this section owes

The chapter's rule is that a model earns its place by failing, and that agreement is a
number. [§1.6](.)'s agreement is the one this model can state: **at any moment, the dynamic
model's camber is the static model's camber at the same travel.**

It is, to **0.001°**. At the instant the wheel is 72.35 mm into bump, the dynamic model
gives −2.079° and the package's static model at that travel gives −2.079°. The same
holds anywhere in the swing, because the geometry and the constraints are the same model
— what the masses and the forces add is *time*, not a different linkage.

There is a second comparison here, and it is the one worth keeping. **[§1.2](../../section-1.2/learn/)'s front view
is 0.94° from the static model at that travel**, not 0.001° — because it is a projection,
accurate near the design position and not far from it. Within the chapter's 80 mm the two
agree to 0.033°; at 72 mm the front view is already a degree out. The small model is not
wrong; it is *bounded*, and the bound is the number.

A third test is the sharper one, and this model cannot run it. As the masses go to zero,
the dynamic model must become the algebraic one, exactly, at any stiffness. Once the masses
are gone, a free quarter car has nothing to swing against. The test therefore needs a
driven model, one that prescribes the wheel's travel. The comparison above is the same
claim in the form this model can answer.

## One trajectory, or a family of them

The run above is one stiffness. The section's point is that the stiffness decides
the motion. A reader can watch that happen instead of taking it on trust: the
control below sets the coil's stiffness and the engine re-runs, in this page.

:::figure dynamics-table

The two controls change two numbers the model takes at run time, and they do different things.
**Stiffness changes the period**: across its range the swing shortens from about 0.48 s to about
0.16 s, and the chassis stops falling so far. **A sideways load changes where the corner sits**: it
moves the resting height without touching the period, because a constant force shifts the answer
rather than the dynamics.

Each column is an integration, not a recording, and the first column is the example's own answer —
its own stiffness and no load. The constraint column stays near `1e-15` throughout, which is the
projection doing its job after every step.

The range stops at 2 MN/m, where the period is about 0.16 s. Beyond that the period keeps
falling, and the five-millisecond step would have to be shortened with it. The step is part of the
model, in the same way the stiffness is.

## The code behind these numbers

None of the numbers above was typed. The package derives the equations with sympy:
the mass matrix, the velocity-product term that `M q̈ = f` leaves out, and the forces
are in
[`otkd/problem/dynamics.py`](https://github.com/leonpjvaughan/Open.Textbook/blob/main/solvers/otkd/src/open_textbook/otkd/problem/dynamics.py).
Then
[`otkd/emitters/wasm.py`](https://github.com/leonpjvaughan/Open.Textbook/blob/main/solvers/otkd/src/open_textbook/otkd/emitters/wasm.py)
factorises the same expressions into a straight-line program, prints it as Rust and
compiles it to WebAssembly. The kernel that would run in a page is generated from
this model by that pipeline.
[`scripts/run_kernel.py`](https://github.com/leonpjvaughan/Open.Textbook/blob/main/solvers/otkd/scripts/run_kernel.py)
runs it and prints the table: the trajectory, the energy drift, and the difference
from the package's own Python integration.

That is worth a look for two reasons. It is the same derivation in two languages,
so nothing can drift between the figure and the engine. And the pipeline is short
enough to read: sympy residual, common subexpressions, Rust, `wasm32-unknown-unknown`,
one buffer of `f64`.

## You should now be able to

- say what a differential-algebraic model is, and why the constraint forces appear
  in it
- say what mass adds to the question, and what a damper would change
- say what the dynamic model adds to the static one, and how closely the two agree

## Watch out

This section adds mass, and the temptation is to treat it as the more accurate
model. The evidence is a comparison. At any moment, the dynamic camber must equal
the static camber at the same travel, and the two agree to **0.001°**. If they did
not, a longer run would hide the model error behind round-off.

The static model's own argument, including why simulating to a steady state is a
worse trade, is on the
[equilibrium without time](../../Section%201.5/Deeper/equilibrium-without-time/index.md)
page rather than repeated here.

The sharper test is the one this section named, and it cannot be run here. Take the
masses to zero, and the model must become the algebraic one, exactly. A free quarter
car has nothing to swing against once the mass is gone. This page does not claim to
have passed that test.
