---
title: 8.1 Rates of change and differential equations — Learn
chapter: 8
chapter_title: Modelling a changing world
section: '8.1'
section_title: Rates of change and differential equations
tier: O
refs:
- S4
kind: walkthrough
---

# 8.1 Rates of change and differential equations — Learn

**Prerequisites:** Section 3.4, differentiating a power of $t$; Section 3.5,
integration reverses differentiation.

**Objectives:** read a rate of change; write a differential equation from a
sentence; check a claimed solution by substitution; find the value at which a
quantity stops changing.

By the end of this section you can turn a description of change into an equation,
and test whether a proposed answer fits it.

## A rate of change is a derivative

When a quantity changes, its **rate of change** is how fast it changes at one
moment. If $P$ is the amount and $t$ is the time, the rate of change is written

$$\frac{dP}{dt}.$$

The value of $\dfrac{dP}{dt}$ at a moment tells you what the amount is doing
right then. A positive value means $P$ is rising, a negative value means $P$ is
falling, and zero means $P$ is momentarily steady.

**Example 1.** A quantity is $Q = 3t^2 + 2t$. Find its rate of change when
$t = 2$.

Differentiate:

$$\frac{dQ}{dt} = 6t + 2.$$

At $t = 2$,

$$\frac{dQ}{dt} = 6(2) + 2 = 14.$$

The quantity is rising at $14$ units per unit of time at that moment.

## A differential equation is a rule about the rate

A **differential equation** is an equation that contains a derivative. It does
not give the amount directly; it gives the rule that the rate of change follows.
Solving it means finding a function whose derivative obeys the rule.

The simplest ones relate the rate to the amount itself. For example,

$$\frac{dP}{dt} = 2P$$

says that the amount grows at a rate equal to twice the amount present. When
there is more, it grows faster. That single sentence is the whole equation.

The **order** of a differential equation is the highest derivative in it. The
equations above are first order, because the highest derivative is the first
derivative. This chapter works only with first-order equations.

## Forming an equation from words

The phrase **at a rate proportional to** means "multiplied by a constant". If a
quantity $P$ grows at a rate proportional to $P$, then

$$\frac{dP}{dt} = kP$$

for some constant $k$. The constant $k$ is positive for growth and negative for
decay. Its size sets how fast the change happens.

**Example 2.** A radioactive mass decays at a rate proportional to the mass
present. Write a differential equation for the mass $m$ at time $t$.

The rate is $\dfrac{dm}{dt}$. The word "proportional" gives a constant, and
"decays" makes it negative, so

$$\frac{dm}{dt} = -km, \qquad k > 0.$$

**Example 3.** A cup of tea at temperature $T$ cools in a room at $20$°C. It
cools at a rate proportional to the difference between $T$ and $20$. Write a
differential equation for $T$.

The difference is $T - 20$. The tea cools towards the room, so the rate is
negative when $T$ is above $20$:

$$\frac{dT}{dt} = -k(T - 20), \qquad k > 0.$$

## Checking a solution

You can test a claimed solution without solving anything. Differentiate the
claim, and check that the two sides of the equation match.

**Example 4.** Show that $y = 5e^{2x}$ is a solution of
$\dfrac{dy}{dx} = 2y$.

Differentiate the claim:

$$\frac{dy}{dx} = 10e^{2x}.$$

The right-hand side of the equation is

$$2y = 2 \times 5e^{2x} = 10e^{2x}.$$

The two sides are equal, so the claim is a solution.

**Example 5.** Show that $P = 20 + 30e^{-0.5t}$ is a solution of
$\dfrac{dP}{dt} = -0.5(P - 20)$.

Differentiate:

$$\frac{dP}{dt} = -15e^{-0.5t}.$$

Now work out the right-hand side:

$$-0.5(P - 20) = -0.5 \times 30e^{-0.5t} = -15e^{-0.5t}.$$

The two sides agree, so the claim is a solution.

A solution with a constant in it, such as $y = Ae^{-3t}$, is a **general
solution**: every value of $A$ gives a different curve, and all of them obey the
equation. One value of $A$ is fixed by an **initial condition**, such as the
amount at time zero.

## The equilibrium value

A quantity stops changing when its rate of change is zero. Setting the
right-hand side to zero and solving gives the **equilibrium value**.

**Example 6.** A quantity obeys $\dfrac{dP}{dt} = 0.5P - 10$. Find the value at
which it stops changing.

Set the rate to zero:

$$0.5P - 10 = 0, \qquad P = 20.$$

At $P = 20$ the rate is zero. Below it the rate is negative, and above it the
rate is positive, so the quantity moves away from $20$ rather than towards it.

> **Watch out.** The derivative is a rate, not an amount, so it carries units of
> "amount per unit of time" and the two are not interchangeable. A second trap is
> the sign of the constant. In $\dfrac{dP}{dt} = kP$, a **negative** $k$ gives
> decay and a **positive** $k$ gives growth; writing $k$ without saying which
> sign it has leaves the model half-stated. **Re-check:** substitute your claimed
> solution back into the equation and confirm both sides match. If they do not,
> the mistake is in the differentiation or in the algebra, not in the idea.

## Progress check

Back to the chapter problem. The factory releases pollutant at $20$ kg per day,
and the lake flushes it out at a rate proportional to the amount present, with
flush constant $0.05$ per day. While the factory is open,

$$\frac{dP}{dt} = 20 - 0.05P.$$

Answer two questions about this model.

1. What does the term $20$ describe, and what does the term $-0.05P$ describe?
2. Find the value of $P$ at which the rate of change is zero. That is the level
   the lake settles at while the factory is open.

Write your answer to question 2 as a number of kilograms. Keep it: Section 8.5
solves this same equation and finds how the lake approaches that level.

## You should now be able to

- read $\dfrac{dP}{dt}$ as the rate of change of $P$;
- say what a differential equation is and what its order means;
- turn "at a rate proportional to" into a constant multiplied by the amount;
- write a differential equation for growth, decay and cooling;
- check a claimed solution by differentiating and substituting;
- find the equilibrium value by setting the rate to zero.
