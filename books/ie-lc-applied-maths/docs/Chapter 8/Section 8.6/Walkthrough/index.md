---
title: 8.6 The logistic model — Learn
chapter: 8
chapter_title: Modelling a changing world
section: '8.6'
section_title: The logistic model
tier: H
refs:
- S4
kind: walkthrough
---

# 8.6 The logistic model — Learn

**Prerequisites:** Section 8.2, exponential growth; Section 8.5, feedback and
equilibrium.

**Objectives:** write the logistic equation; find the carrying capacity; use the
solution; describe the S-shaped curve and its point of inflexion.

By the end of this section you can model a population whose growth slows as it
runs out of room.

## Why unlimited growth cannot last

The model $\dfrac{dP}{dt} = kP$ says a population grows faster and faster for
ever. No real population does. Food, space, water and disease all put a limit on
how many can survive.

The **logistic model** puts that limit into the equation. It says the growth rate
is proportional to the population **and** to the room that is left:

$$\frac{dP}{dt} = kP\left(1 - \frac{P}{M}\right).$$

The number $M$ is the **carrying capacity**: the largest population the
environment can support. The factor $\left(1 - \dfrac{P}{M}\right)$ is close to
$1$ when $P$ is small and close to $0$ when $P$ is near $M$.

## The carrying capacity

The rate of change is zero when $P = 0$ or when $P = M$. The value $P = M$ is the
carrying capacity, and it is a stable equilibrium. If the population is below
$M$ the factor is positive, so the population grows. If it is above $M$ the
factor is negative, so the population falls back towards $M$.

**Example 1.** A population follows
$\dfrac{dP}{dt} = 0.1P\left(1 - \dfrac{P}{500}\right)$. Find the carrying
capacity and every value at which the rate is zero.

The rate is zero when $P = 0$ or $P = 500$, so the carrying capacity is $500$.
The value $P = 0$ is an unstable equilibrium: a small population grows away from
it. The value $P = 500$ is stable.

## The solution

The solution of the logistic equation is

$$P = \frac{M}{1 + Ae^{-kt}},$$

where $A$ is fixed by the starting value. You can check it by differentiating, in
the same way as Section 8.5. As $t$ grows the term $e^{-kt}$ fades, so
$P \to M$: the population approaches the carrying capacity from below.

**Example 2.** A population follows
$\dfrac{dP}{dt} = 0.1P\left(1 - \dfrac{P}{500}\right)$, with $P = 50$ when
$t = 0$. Find $P$ in terms of $t$.

The carrying capacity is $M = 500$, so write

$$P = \frac{500}{1 + Ae^{-0.1t}}.$$

At $t = 0$, $P = 50$:

$$50 = \frac{500}{1 + A}, \qquad 1 + A = 10, \qquad A = 9.$$

So

$$P = \frac{500}{1 + 9e^{-0.1t}}.$$

Check $t = 0$: $P = \dfrac{500}{10} = 50$. Check the limit: as $t \to \infty$,
$P \to 500$.

## The shape of the curve

The graph of a logistic solution is an **S-shaped curve**, also called a logistic
curve. It has three phases.

- For small $P$ the factor $\left(1 - \dfrac{P}{M}\right)$ is close to $1$, so the
  growth is almost exponential.
- The growth is fastest when $P = \dfrac{M}{2}$. At that point the curve is
  steepest, and the point is called the **point of inflexion**.
- Beyond $\dfrac{M}{2}$ the factor shrinks, so the growth slows and the curve
  flattens towards $M$.

**Example 3.** For the population in Example 2, find the time at which the
population reaches half the carrying capacity.

Half of $500$ is $250$. Set $P = 250$:

$$\frac{500}{1 + 9e^{-0.1t}} = 250, \qquad 1 + 9e^{-0.1t} = 2, \qquad e^{-0.1t} = \frac{1}{9}.$$

Then

$$-0.1t = -\ln 9, \qquad t = 10\ln 9 = 20\ln 3 \approx 22.0.$$

The population is growing fastest at about $t = 22$.

> **Watch out.** The carrying capacity $M$ and the rate constant $k$ are
> different numbers with different jobs, and swapping them ruins the model. In
> $\dfrac{dP}{dt} = 0.1P\left(1 - \dfrac{P}{500}\right)$ the carrying capacity is
> $500$, not $0.1$. A second trap is the point of inflexion: the curve is
> steepest at half the carrying capacity, not at the start and not at the top.
> **Re-check:** your solution at $t = 0$ must return the starting value, and its
> limit as $t \to \infty$ must be $M$.

## Progress check

Back to the chapter problem, and a second population in the same lake. Fish in
the lake are modelled by

$$\frac{dP}{dt} = 0.2P\left(1 - \frac{P}{50}\right),$$

with $P$ in hundreds and $t$ in years.

1. Write down the carrying capacity.
2. Given $P = 5$ when $t = 0$, find $P$ in terms of $t$.
3. Find the population at the point of inflexion, where the growth is fastest.

The pollutant model and the fish model are different in an important way. The
pollutant has a stable level set by the input, and falls to zero once the input
stops. The fish population rises to a carrying capacity set by the lake itself.

## You should now be able to

- explain why unlimited growth is unrealistic;
- write the logistic equation and identify the carrying capacity;
- find the values at which the rate is zero;
- use the solution $P = \dfrac{M}{1 + Ae^{-kt}}$;
- describe the S-shaped curve and name the point of inflexion;
- find the time at which the population reaches half the carrying capacity.
