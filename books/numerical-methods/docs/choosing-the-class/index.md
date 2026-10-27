---
title: The class is a choice you make
---

# The class is a choice you make

The map is often read as a classification of problems, as if a system came with its
kind attached. It does not. **The kind is a property of how you wrote the model
down**, and the same physics can be written as two different kinds. One of them will
run and one will not, and the choice is yours to make before anything is solved.

Three cases. The first is the hardest there is, and the arithmetic that settles it
comes after the other two.

## The same equations, one of which cannot be evolved

Take the Einstein equations. Written with
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

## The same corner, in Maths Applied

The [suspension corner](/maths-applied/chapter-1/section-1.5/learn/) has a joint that
is a bush, and there are two ways to write it down.

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

<a id="the-same-equations-classified"></a>

## The same equations, classified

This is the arithmetic behind the first case. The two coordinate conditions are
one equation each in one unknown, and that is few enough to put through the test.
The unknown is the **lapse**: the number that says how fast the clock runs at each
point of space, so that the model knows which moment counts as *now*. Write it
$\alpha$, and let $x$ be one direction in space and $t$ the time the model keeps.

**The elliptic choice.** One way to fix the lapse asks for a balance at every
point, with no rate of change left in it. That is what makes the slicing
*elliptic*: the lapse is settled by the geometry around it, all at once. In one
direction of space the condition is

$$ \alpha_{xx} = \alpha . $$

Read $A$, $B$ and $C$ off the second derivatives of $\alpha_{xx} - \alpha = 0$, in
the order $xx$, $xt$, $tt$. There is no $tt$ term, so $C = 0$, and no mixed term,
so $B = 0$. Then $B^2 - 4AC = 0$ and the test names it **parabolic** — the boundary
case, not the elliptic box.

That is the test being honest about its limits, and the limits are worth knowing.
It counts characteristic directions in the two variables you handed it, $u_{xx}$,
$u_{xy}$ and $u_{yy}$. Here $x$ and $t$ are not interchangeable, because the
equation is second order in $x$ and first order in nothing at all. A solver asks a
different question — *can I step this forward in $t$?* — and the answer is no,
because there is no $\alpha_t$ anywhere to step. This page's box is for an
equation that fixes the answer in space and leaves time out of it. The number
$B^2 - 4AC$, read against $x$ and $t$, cannot tell that apart from an equation
that is second order in both.

**The hyperbolic choice.** The other way gives the lapse a rate of change of its
own, and lets the change travel:

$$ \alpha_{tt} = \alpha_{xx} . $$

Now $A = -1$, $B = 0$ and $C = 1$, so $B^2 - 4AC = 4$, and the test names it
**hyperbolic** without hesitation. The two signs that decide the class are the two
signs of a wave equation: one from $\alpha_{tt}$, one from $\alpha_{xx}$, and the
difference of them.

| slicing | equation | $A$ | $B$ | $C$ | $B^2-4AC$ | class |
|---|---|---|---|---|---|---|
| elliptic | $\alpha_{xx} - \alpha = 0$ | $1$ | $0$ | $0$ | $0$ | parabolic |
| hyperbolic | $\alpha_{tt} - \alpha_{xx} = 0$ | $-1$ | $0$ | $1$ | $4$ | hyperbolic |

The first row is the one to look at. The slicing is called elliptic and the test
calls the equation parabolic, and both names are right about different things.
The slicing is settled rather than propagated. The equation, written against $x$
and $t$, has one characteristic direction rather than none.

**Compare the two rows with the sign that matters.** The first has a $1$ where the
second has $-1$ and a $0$, and that one entry is the whole difference between a
program that cannot start and one that runs. Neither equation is harder than the
other to write. Both are one line. Only one of them can be marched forward in
time.

**A caution, because this is the hardest case there is.** The real Einstein
system is four equations for the ten independent components of the metric, and
the lapse is one unknown among several. Classifying it one equation at a time is a
reduction, not a proof: two equations that are each hyperbolic can couple into a
system that is not. So the claim here is narrow — **same physics, one equation
written two ways, two classes, and only one of them can be solved.** The full
system is where the field's real formulations do their work, and the reference
this page rests on is where to read it.

## The rule this gives you

If the method you need does not exist for the class your model is in, **change how
you wrote the model**. That is not a trick, and it is not cheating, as long as two
things stay true:

- the two models must agree in the limit where the difference disappears — a stiff
  spring must reproduce the rigid joint, a fast pressure wave must reproduce the
  incompressible flow, and the two slicings must describe the same geometry;
- you must say which one you solved, because a reader who thinks they have a force
  and has a product of two numbers has been misled by the write-up rather than by
  the mathematics.

On the first count the relativity case is the easiest of the three to check, and
the hardest to make work. Neither slicing changes the geometry, so agreement is
exact by construction, and what the field argues about is stability rather than
accuracy. In the other two cases the limit is an idealisation you approach and
never reach.

The [worked case](../worked-case/index.md) checks the first of those against
numbers: the bushed model is swept until it returns the rigid one.

## Read next

- [The worked case](../worked-case/index.md) — one corner, five questions, and the
  numbers where the models agree.
- [Elliptic](../elliptic/index.md) and [Hyperbolic](../hyperbolic/index.md) — the two
  classes the relativity case turns between.
- [Saddle point](../saddle-point/index.md) — the price of keeping a constraint.
