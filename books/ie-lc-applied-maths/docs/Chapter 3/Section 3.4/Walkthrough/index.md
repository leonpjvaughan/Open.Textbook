---
title: 3.4 Differentiation and the chain rule — Learn
chapter: 3
chapter_title: Describing motion
section: '3.4'
section_title: Differentiation and the chain rule
tier: O
refs:
- S3
kind: walkthrough
---

# 3.4 Differentiation and the chain rule — Learn

**Prerequisites:** Section 3.1, velocity as a rate of change; multiplying out a
bracket and using index laws.

**Objectives:** differentiate a power of $t$; differentiate a sum and a constant
multiple; use the chain rule; interpret a derivative as a rate of change; find
the time at which a velocity is zero.

Section 3.3 read a velocity from the gradient of a graph. Differentiation finds
the same gradient from a formula, at any moment.

## The derivative as a rate of change

The **derivative** $\dfrac{dy}{dt}$ is the rate at which $y$ changes as $t$
changes. It is the gradient of the graph of $y$ against $t$.

For motion, two derivatives carry the meaning.

$$v = \frac{ds}{dt} \qquad a = \frac{dv}{dt}$$

The velocity is the derivative of the displacement, and the acceleration is the
derivative of the velocity. Differentiation once takes you from displacement to
velocity. Differentiation twice takes you from displacement to acceleration.

## Differentiating a power

The rule for a power of $t$ is

$$\text{if } y = t^n \text{ then } \frac{dy}{dt} = n t^{n-1}.$$

Multiply by the power, then reduce the power by one.

**Example 1.** Differentiate $y = 5t^3$.

$$\frac{dy}{dt} = 5 \times 3t^2 = 15t^2$$

**Example 2.** Differentiate $y = 4t^2 + 3t$.

Differentiate each term on its own:

$$\frac{dy}{dt} = 4 \times 2t + 3 = 8t + 3$$

The derivative of $3t$ is $3$, because $3t = 3t^1$. The derivative of a constant
is zero, because a constant does not change.

## The chain rule

A **composite** function is one function inside another, such as $(2t + 1)^3$.
The **chain rule** differentiates it.

$$\text{if } y \text{ depends on } u, \text{ and } u \text{ depends on } t,
\text{ then } \frac{dy}{dt} = \frac{dy}{du} \times \frac{du}{dt}.$$

In words: differentiate the outside, then multiply by the derivative of the
inside.

**Example 3.** Differentiate $y = (2t + 1)^3$.

Take the inside as $u = 2t + 1$, so $y = u^3$.

$$\frac{dy}{du} = 3u^2 \qquad \frac{du}{dt} = 2$$

$$\frac{dy}{dt} = 3u^2 \times 2 = 6u^2 = 6(2t + 1)^2$$

**Example 4.** Differentiate $y = (t^2 + 1)^3$.

Take the inside as $u = t^2 + 1$, so $y = u^3$.

$$\frac{dy}{du} = 3u^2 \qquad \frac{du}{dt} = 2t$$

$$\frac{dy}{dt} = 3u^2 \times 2t = 6t(t^2 + 1)^2$$

**Example 5.** Differentiate $y = \sqrt{4t + 1}$.

Write the root as a power: $y = (4t + 1)^{1/2}$. Take $u = 4t + 1$.

$$\frac{dy}{du} = \frac{1}{2}u^{-1/2} \qquad \frac{du}{dt} = 4$$

$$\frac{dy}{dt} = \frac{1}{2}u^{-1/2} \times 4 = \frac{2}{\sqrt{4t + 1}}$$

> **Watch out.** The common error with the chain rule is to differentiate the
> outside and forget the inside. For $y = (2t + 1)^3$ that gives
> $3(2t + 1)^2$, which is too small by the factor $2$ from the inside. Write the
> inside function down as $u$, differentiate both parts, and multiply. Check the
> answer by asking whether the inside affects the steepness: here the inside
> $2t + 1$ climbs twice as fast as $t$, so it doubles the gradient.

## Finding when a velocity is zero

At the highest point of a throw, the vertical velocity is zero. Setting the
derivative to zero finds that moment.

**Example 6.** A ball has height $y = 10t - 4.9t^2$ metres after $t$ seconds.
Find the time at which its vertical velocity is zero.

Differentiate to get the velocity:

$$v = \frac{dy}{dt} = 10 - 9.8t$$

Set the velocity to zero:

$$0 = 10 - 9.8t$$

$$t = \frac{10}{9.8} = 1.02\,\text{s}$$

The vertical velocity is zero at about 1.02 s. That is the highest point of the
ball's path.

## Progress check

Back to the chapter problem. The ball's height is $y = 10t - 4.9t^2$ metres
after $t$ seconds.

Differentiate to find the vertical velocity, then find the time at which that
velocity is zero.

$$v = \frac{dy}{dt} = \underline{\hspace{2cm}}$$

$$0 = 10 - 9.8t, \qquad t = \underline{\hspace{2cm}}\,\text{s}$$

The velocity is zero at about $1.02$ s, which is the highest point of the ball's
path. Section 3.6 shows where the height equation comes from.

## You should now be able to

- say what a derivative measures, and write the velocity and the acceleration
  as derivatives of the displacement;
- differentiate a power of $t$, a sum and a constant multiple;
- use the chain rule to differentiate a composite function;
- differentiate a root by writing it as a power;
- set a derivative to zero to find a maximum or a minimum.
