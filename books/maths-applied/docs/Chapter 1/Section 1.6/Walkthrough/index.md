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

> **Draft.** This section is written to state what comes next and what it costs. It
> has no worked numbers yet, and it says so rather than pretending. §1.5 answered
> the chapter's question; this is the road out of the chapter.

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

## The agreement this section owes

The chapter's rule is that a model earns its place by failing, and that agreement
is a number. So §1.6's promise is specific, and it is the same shape as §1.5's:

> With the masses and dampings taken to zero, the dynamic model must settle to the
> quasi-static sweep of §1.2 — in the limit, not merely close to it.

If that test cannot be made to pass, the dynamic model is wrong about something, and
the place to look is the constraint forces. It is the first test to write.

```text
TODO(phase-a): a quarter-car model — one corner, with mass, spring and damper — has
not been built. When it is, this section's numbers come from its `sweep` and its
`agreement` exports, and the limit test above becomes the fifth load-bearing test
in the solver's suite.
```

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
