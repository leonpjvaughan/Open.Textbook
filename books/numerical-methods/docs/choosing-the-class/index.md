---
title: The class is a choice you make
---

# The class is a choice you make

The map is often read as a classification of problems, as if a system came with its
kind attached. It does not. **The kind is a property of how you wrote the model
down**, and the same physics can be written as two different kinds. One of them will
run and one will not, and the choice is yours to make before anything is solved.

Three cases, from the least familiar to the most.

## The same equations, one of which cannot be evolved

Take the Einstein equations, which are the hardest case there is. Written with
**elliptic** coordinate conditions, a change anywhere inside the region has to be
felt everywhere at once. A solver cannot do that: to compute the next moment it
would need the answer at the same moment. Written with **hyperbolic** conditions,
information travels at a finite speed and the calculation runs.

The equations did not change. The physics did not change. What changed is the kind
of problem the same physics became, and the difference is the difference between a
program that works and a program that does not.

The field has names for the two ways out, and they are the same two ways a fluid
solver has:

- **Constrained evolution.** Solve the elliptic constraint at every step, so the
  answer is consistent by construction.
- **Free evolution.** Solve the constraint once, evolve the rest, and hope it stays
  satisfied.

## The same flow, paid for two ways

An incompressible flow has a rule that must hold everywhere: the velocity field
cannot compress. There are two honest ways to write that down.

**Keep the rule, and price it.** The pressure becomes a second unknown, the
multiplier on the constraint, and every step solves a [saddle point](../saddle-point/index.md).
The pressure is then a real quantity you can read, and the system is indefinite.

**Replace the rule with a stiff penalty.** Give the pressure a time derivative of its
own, so sound waves appear and travel at a speed you choose. The problem becomes a
[hyperbolic](../hyperbolic/index.md) system, and it approaches the incompressible one
as that speed goes to infinity. The rule is no longer exact; it is enforced to
within the speed you picked.

Neither is wrong. One is exact and expensive; the other is approximate and cheap. The
choice was made when the model was written.

## The same corner, in this book

The suspension corner has a joint that is a bush, and there are two ways to write it
down.

**Keep the joint rigid, and price it.** The joint is a constraint, its force is a
multiplier, and the state and the force are solved together. The class is a saddle
point, the system is indefinite, and the force falls out as part of the answer.

**Replace the joint with a spring.** The constraint is gone, so the multiplier is
gone. Equilibrium is now two equations in two unknowns, which is
[root finding](../root/index.md), and the force is that spring's stiffness times the
deflection it produced.

The second is simpler to solve. It is also the one this book can sweep, because a
root can be found at each wheel position without assembling a coupled system. What it
gives up is the force being a solved unknown; you multiply instead.

## The rule this gives you

If the method you need does not exist for the class your model is in, **change how
you wrote the model**. That is not a trick, and it is not cheating, as long as two
things stay true:

- the two models must agree in the limit where the difference disappears — a stiff
  spring must reproduce the rigid joint, and a fast pressure wave must reproduce the
  incompressible flow;
- you must say which one you solved, because a reader who thinks they have a force
  and has a product of two numbers has been misled by the write-up rather than by
  the mathematics.

The [worked case](../worked-case/index.md) checks the first of those against
numbers: the bushed model is swept until it returns the rigid one.

## Read next

- [The worked case](../worked-case/index.md) — one corner, five questions, and the
  numbers where the models agree.
- [Elliptic](../elliptic/index.md) and [Hyperbolic](../hyperbolic/index.md) — the two
  classes the relativity case turns between.
- [Saddle point](../saddle-point/index.md) — the price of keeping a constraint.
