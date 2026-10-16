---
title: 8.8 Comparing a discrete and a continuous model — Learn
chapter: 8
chapter_title: Modelling a changing world
section: '8.8'
section_title: Comparing a discrete and a continuous model
tier: H
refs:
- S4
kind: walkthrough
---

# 8.8 Comparing a discrete and a continuous model — Learn

**Prerequisites:** Section 8.2, exponential growth; Section 8.4, difference
equations.

**Objectives:** compare a recurrence with a differential equation; use Euler's
method for one or two steps; explain how the step size affects the estimate.

By the end of this section you can choose between a discrete and a continuous
model, and say why their answers differ.

## Two ways to model the same change

Take a quantity that grows by a fixed percentage. There are two ways to write the
model.

**Continuous.** The quantity changes at every instant:

$$\frac{dP}{dt} = kP, \qquad P = P_0e^{kt}.$$

**Discrete.** The quantity changes once per step:

$$u_{n+1} = (1 + r)u_n, \qquad u_n = u_0(1 + r)^n.$$

The two models use different constants. In the continuous model the rate is $k$
per unit of time. In the discrete model the multiplier is $1 + r$, where $r$ is
the fraction added each step.

They agree only if

$$1 + r = e^k, \qquad r = e^k - 1.$$

For $k = 0.05$, $e^{0.05} \approx 1.05127$, so the exact discrete multiplier is
about $1.05127$, a little more than $1.05$. Using $1.05$ is a model in its own
right, and it is slightly different from the continuous one.

## Euler's method

When a differential equation cannot be solved by separation, a numerical method
gives an estimate. **Euler's method** steps forward in the same way as a
recurrence. From a known value $y_n$ at $x_n$, take a step of size $h$:

$$y_{n+1} = y_n + h\,f(x_n, y_n),$$

where $f$ is the right-hand side of $\dfrac{dy}{dx} = f(x, y)$. The method uses
the rate at the start of the step for the whole step.

**Example 1.** Use Euler's method with step $h = 1$ on
$\dfrac{dy}{dx} = 0.5y$, with $y = 100$ when $x = 0$. Find the estimate after
two steps.

At the first step the rate is $0.5 \times 100 = 50$:

$$y_1 = 100 + 1(50) = 150.$$

At the second step the rate is $0.5 \times 150 = 75$:

$$y_2 = 150 + 1(75) = 225.$$

**Example 2.** Repeat with the smaller step $h = 0.5$. Find the estimate at
$x = 1$, after two half-steps.

First half-step: rate $50$,

$$y_1 = 100 + 0.5(50) = 125.$$

Second half-step: rate $0.5 \times 125 = 62.5$,

$$y_2 = 125 + 0.5(62.5) = 156.25.$$

The exact value at $x = 1$ is $100e^{0.5} \approx 164.9$. The estimate $156.25$
is much closer than $225$, so halving the step improves the estimate.

## Why the two models differ

A discrete model changes the quantity in jumps. A continuous model changes it at
every instant. When the step is large, the difference is large, because the model
uses one rate for a long interval. As the step shrinks, the discrete model comes
closer to the continuous one.

This is why the two lake models of the chapter are close but not equal. The daily
model removes $5\%$ at the end of each day, so the removal acts on the amount at
the start of the day. The continuous model removes pollutant throughout the day,
acting on a falling amount. After ten days the two values are near each other,
and the difference is the price of using whole days.

> **Watch out.** The continuous rate $k$ and the discrete multiplier $1 + r$ are
> not the same number, and $e^k$ is not $1 + k$ except as an approximation for
> small $k$. For $k = 0.05$ the error in using $1.05$ is about $0.1\%$ over one
> step, and it grows over many steps. A second trap is the sign of the step in
> Euler's method: a step of size $h$ adds $h$ times the rate, so a negative rate
> lowers the estimate. **Re-check:** compare your Euler estimate with the exact
> solution at the same point, and see which side it falls on.

## Progress check

Back to the chapter problem. After the factory closes, the lake pollutant is
modelled in two ways, both starting at $400$ kg.

- Continuous: $P = 400e^{-0.05t}$.
- Daily: $u_{n+1} = 0.95u_n$.

1. Find the continuous value after ten days, $P = 400e^{-0.5}$.
2. Find the daily value after ten days, $u_{10} = 400(0.95)^{10}$.
3. Which model removes more pollutant in ten days? Explain the difference in one
   sentence.

Keep both numbers. The Review uses them to judge how much the choice of model
matters for the safe level.

## You should now be able to

- write a continuous model $\dfrac{dP}{dt} = kP$ and a discrete model
  $u_{n+1} = (1 + r)u_n$ for the same change;
- relate the rate $k$ to the multiplier $1 + r$ using $1 + r = e^k$;
- use Euler's method for one or two steps;
- explain how the step size changes the estimate;
- explain why a discrete and a continuous model need not agree.
