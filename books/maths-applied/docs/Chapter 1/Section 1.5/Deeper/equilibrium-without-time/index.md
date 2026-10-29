---
title: Why equilibrium is not a simulation
chapter: 1
chapter_title: Suspension kinematics
section: '1.5'
section_title: Bushes are not rigid
kind: deeper
---

# Why equilibrium is not a simulation

The main thread replaces a joint with a spring and then asks where the mechanism
sits. This page is about why that question has an algebraic answer, and why running
a simulation to find it would be a worse idea than solving two equations.

## No acceleration, no time

A body that is not accelerating has zero total force and zero total moment on it.
That is a statement about numbers at one instant. It contains no rate, no duration
and no history, so solving it needs no clock.

$$ \sum \mathbf{F} = 0, \qquad \sum \mathbf{M} = 0. $$

Here $\mathbf{F}$ is a force and $\mathbf{M}$ a moment, and each sum runs over
everything acting on the body. The honest caveat is that this describes a state the mechanism may never reach on
its own. A real suspension is never exactly at rest: it is being driven, and it
overshoots. The static answer is the answer to "where would it settle", which is
useful and is not the same as "where is it now".

## The energy version, and why it is the same thing

For forces that come from stored energy — a spring, gravity, a load applied slowly —
the equilibrium condition is that the total energy stops changing:

$$ \frac{\partial E}{\partial q} = 0 \quad\text{for every unknown } q. $$

The two forms are the same statement with a derivative between them. The energy
form is the one to write down when the constraints are awkward, because it needs no
free-body diagram.

In this chapter:

$$ E(\alpha,\beta) = \underbrace{\tfrac12 k\left|D-U\right|^2}_{\text{the bush}} \;-\; \underbrace{F\,x_P}_{\text{the tyre's work}}. $$

$E$ is the total energy and $k$ is the bush's stiffness. $D$ and $U$ are the two
ends of the bush, $F$ is the sideways force at the contact patch, and $x_P$ is how
far the patch has moved along $x$. The minus sign is not decoration. A force pushing in the $+x$ direction does work
when the point it pushes moves in $+x$, so the energy *falls*: an equilibrium is a
minimum of $E$ and not a maximum. Get the sign wrong and the mechanism settles the
wrong way — which it will do cheerfully, since the arithmetic will not complain.

## What "small deformation" is doing

The bush is modelled as a linear spring: force proportional to deflection, one
stiffness, no limit. A rubber bush is only linear for a fraction of a millimetre,
and it stiffens as it is pushed further.

So the compliant model is a **linearisation**, and its accuracy is the accuracy of
that line over the deflections it predicts. [§1.5](../../learn/)'s own numbers are the check: at
1 MN/m the bush deflects 1.2 mm, which is inside a rubber bush's linear range; at
0.2 MN/m it deflects 6.1 mm, which is not, and the answer there is a direction
rather than a value.

That is worth saying plainly, because it is the sort of limit a reader can use. A
model is not discredited by having a range. It is discredited by not saying where
the range ends.

## Why the limit needs a ladder, not a point

The rigid model is the compliant model at infinite stiffness. Infinite stiffness is
not a number a program can hold, so the limit is approached and never reached.

Two things follow:

- **One stiff value proves nothing.** A single run at a very high stiffness that
  lands close to the rigid answer could be a coincidence, a bug, or a stiffness so
  high that the solver's own arithmetic is struggling.
- **A trend is evidence.** Run a ladder of stiffnesses, and require the distance from
  the rigid answer to fall, monotonically, all the way up. That is what the solver's
  test suite does, and it is why the numbers in [§1.5](../../learn/)'s table are all in one column:
  they are meant to be read downwards.

This is the general shape of a limit test, and it is worth recognising: *take the
parameter to the edge and check the model becomes the simpler one it should
become.* When that test passes, the more detailed model has been connected to the
one it generalises, and the connection is evidence rather than a claim.

## The trap: simulating your way to a steady state

The expensive way to find a static answer is to add mass, run the dynamics, wait for
the motion to die away, and read the answer off the end.

It usually gives the right number and it is usually a bad trade. It costs a time
step, an integrator, a set of initial conditions and a stopping rule. The answer
depends on how long you waited, and every one of those choices is a new place for a
mistake to hide. A model with no mass has none of those failure modes, because it
has none of those parts.

Mass is not a cost to be paid for accuracy. It is the right model for a different
question — what happens *during* the movement — and [§1.6](../../../section-1.6/learn/) is where that question
lives.
