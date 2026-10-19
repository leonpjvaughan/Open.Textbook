---
title: The same corner, five ways
---

# The same corner, five ways

One mechanism, five questions. Each question turns the same suspension corner into a
different kind of problem, and the kind decides what a solve costs.

The numbers below come from the model in `Maths Applied`, which prints them on the
pages named beside each one. They are quoted rather than recomputed: a second
implementation in this book would be a second answer, and this page is about the
kinds, not about the corner.

## The five questions

| question | the model | the class | what a solve costs |
|---|---|---|---|
| Where is the wheel? | two circles and a rigid upright | [root finding](../root/index.md) | one closed-form step, no iteration |
| Which row is the spare one? | three rules, two unknowns | [linear system](../linear-system/index.md) | one factorisation of a three-by-two matrix |
| How stiff should the bush be? | the same corner, swept over stiffness | [optimisation](../optimisation/index.md) | one sweep, and a target to hit |
| How does the wheel bounce? | mass, a spring and a damper | [parabolic](../parabolic/index.md), plus [eigenvalues](../eigenvalue/index.md) | a time step, and a choice of integrator |
| How hot does the damper get? | the same, plus heat | [parabolic](../parabolic/index.md), and stiff | a time step chosen for the wrong scale |

## Where is the wheel: root finding

Set the lower arm's angle, and the upper ball joint is wherever two circles meet.
Two circles meet twice, and both are real assemblies of the same parts.

From 40 mm below the design position to 40 mm above it, the rigid model's camber
runs from −1.869° to +0.082°, a change of **1.950°**, with −1.000° at rest.
`Maths Applied` §1.2 prints those numbers.

The interesting part is not the arithmetic; it is that a rule holding at a point can
hold at two points. A solver started near one assembly returns it, and a reader who
does not know there are two will not notice.

## Which row is the spare one: a linear system

Give the wishbone a second leg and the model has three rules and two unknowns. In
the least-squares sense the matrix is a three-by-two, and **a three-by-two always has
a zero singular value** — so a zero is not evidence of a fault. The evidence is the
null vector: which rows it is supported on says which rule is the spare one.

Dropping that row returns the two-circle problem, and the class changes from a
[linear system](../linear-system/index.md) with a rank deficiency to a
[root problem](../root/index.md) with a unique answer. `Maths Applied` §1.4 is where
this is worked.

## How stiff should the bush be: optimisation

Replace the joint with a spring and the corner is a root problem at each wheel
position. That makes one question worth asking: how stiff does the spring have to be
before the bushed model agrees with the rigid one?

The answer is a sweep, and the sweep is a number:

| bush stiffness | camber at rest | difference from the rigid model | change over the travel |
|---|---|---|---|
| 0.2 MN/m | −2.053° | 1.053° | 1.916° |
| 2 MN/m | −1.106° | 0.106° | 1.948° |
| 20 MN/m | −1.011° | 0.011° | 1.950° |

Ten times the stiffness buys one more digit, which is what a stiff limit looks like
when you sweep it. A stiffness chosen for a tenth of a degree is 2 MN/m, and that is
an [optimisation](../optimisation/index.md) with a stated tolerance — `Maths Applied`
§1.5 prints the table.

## How does the wheel bounce: parabolic, and eigenvalues

Give the corner mass and the problem stops being algebra. The equations become
differential-algebraic, the constraint needs a force to hold it, and the class
becomes a [saddle point](../saddle-point/index.md) inside a
[parabolic](../parabolic/index.md) time integration.

The questions that open up are the ones this book cannot yet answer with a number.
How the wheel hops and how the body heaves are [eigenvalues](../eigenvalue/index.md)
of the linearised system. How long a bump takes to settle is a
[parabolic](../parabolic/index.md) decay, and its step is decided by the fastest scale
in the model.

`Maths Applied` §1.6 is drafted and not finished. It says what changes and what it
costs, and it prints no numbers, because the model that would produce them is not
written. This page says so rather than quoting a figure from somewhere else.

## How hot does the damper get: the same class, and stiff

A damper converts motion to heat, the oil warms, and the damping changes. That is a
second [parabolic](../parabolic/index.md) problem, coupled to the first.

It is also the clearest case of the **stiff** flag: the heat equation's fast scale is
not the wheel's motion, and a step chosen for the motion will either take forever or
diverge. Nothing is in this book's model for it yet.

## What the five have in common

Every one of them is the same corner. Nothing was added to the car between the first
question and the fifth; what changed is what was asked, and therefore how the model
was written down.

That is the map's claim, and this page is the evidence for it: one mechanism, five
kinds of problem, five different methods, and one of them is closed-form.

## Read next

- [The class is a choice](../choosing-the-class/index.md) — why the same physics can
  be two kinds, and what has to stay true when you switch.
- [Root finding](../root/index.md) — the first of the five.
- [When it goes wrong](../symptoms/index.md) — when a solve of one of these returns a
  plausible wrong answer.
