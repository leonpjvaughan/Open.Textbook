---
title: 7.8 Stationary points, maxima and minima — Learn
chapter: 7
chapter_title: Differentiation
section: '7.8'
section_title: Stationary points, maxima and minima
tier: O
refs:
- '5.2'
kind: walkthrough
---

# 7.8 Stationary points, maxima and minima — Learn

**Prerequisites:** Sections 7.2, 7.6 and 7.7 — the power rule, the second derivative and
rates of change.

**Objectives:** find stationary points by solving $f'(x) = 0$; classify them with the second
derivative; find a maximum or minimum in a real context.

By the end of this section you can find where a curve turns, say whether each turn is a
maximum or a minimum, and answer the chapter problem.

## Stationary points

At the top of a hill or the bottom of a valley, the tangent is horizontal, so the gradient is
zero.

> **Stationary point.** A point where $f'(x) = 0$ is a stationary point.

There are three kinds: a local **maximum**, a local **minimum**, and a point of inflection
where the curve is momentarily flat.

**Example 1.** Find the stationary point of $y = x^2 - 6x + 5$.

$$\frac{dy}{dx} = 2x - 6 = 0 \quad\Rightarrow\quad x = 3.$$

Then $y = 9 - 18 + 5 = -4$. The stationary point is $(3, -4)$.

## Classifying with the second derivative

Once a stationary point is found, the second derivative says what kind it is.

> **The second derivative test.** At a stationary point, if $f''(x) < 0$ it is a local
> maximum, and if $f''(x) > 0$ it is a local minimum.

The reasoning is direct. A negative second derivative means the gradient is falling, so it
was positive before the point and negative after: the curve rises, flattens, then falls. A
positive second derivative means the gradient is rising: the curve falls, flattens, then
rises.

**Example 2.** Find and classify the stationary points of $y = x^3 - 6x^2 + 9x$.

$$\frac{dy}{dx} = 3x^2 - 12x + 9 = 3(x - 1)(x - 3),$$

so $x = 1$ and $x = 3$. The second derivative is $\dfrac{d^2y}{dx^2} = 6x - 12$.

- At $x = 1$: $f''(1) = -6 < 0$, so $(1, 4)$ is a local maximum.
- At $x = 3$: $f''(3) = 6 > 0$, so $(3, 0)$ is a local minimum.

The $y$-values come from the original function: $y(1) = 4$ and $y(3) = 0$.

**Example 3.** For $y = x^3$, $\dfrac{dy}{dx} = 3x^2$, which is zero at $x = 0$. The second
derivative is $6x$, which is also zero at $x = 0$. The second derivative test gives no
information here. Looking at the sign of $\dfrac{dy}{dx}$ shows it is positive on both
sides of $0$, so the curve rises through the origin and the point is a point of inflection,
not a maximum or a minimum.

## The chapter problem

The tank volume is $V(t) = 12t^2 - t^3$ for $0 \le t \le 8$, with rate
$V'(t) = 24t - 3t^2$.

**When is the volume greatest?** Set $V'(t) = 0$:

$$24t - 3t^2 = 3t(8 - t) = 0 \quad\Rightarrow\quad t = 0 \text{ or } t = 8.$$

At $t = 0$ the tank is empty. At $t = 8$, $V(8) = 12(64) - 512 = 256$ litres, and
$V''(8) = 24 - 48 = -24 < 0$, so this is a maximum.

**When is the tank filling fastest?** The rate is itself a function, $V'(t) = 24t - 3t^2$.
Find where **its** derivative is zero:

$$V''(t) = 24 - 6t = 0 \quad\Rightarrow\quad t = 4.$$

The rate there is $V'(4) = 96 - 48 = 48$ litres per minute. Since $V''(t)$ changes from
positive to negative at $t = 4$, the rate is greatest there. The tank fills fastest at
$t = 4$ minutes.

> **Watch out.** A zero derivative does not always mean a maximum or a minimum. The curve
> $y = x^3$ has $y' = 0$ at the origin, and the origin is neither. Always classify the
> point: use the second derivative, and if that is zero, check the sign of $f'$ on each
> side. A flat point is not automatically a turning point.

## Progress check

Back to the chapter problem. The tank volume is $V(t) = 12t^2 - t^3$ litres for
$0 \le t \le 8$.

Find the time at which the tank fills fastest, and the rate at that time. Then state the
greatest volume the tank holds and when it holds it.

Keep both answers. The Review brings the whole chapter together and confirms them.

## You should now be able to

- find a stationary point by solving $f'(x) = 0$;
- classify it with the second derivative test;
- handle the case $f''(x) = 0$ by checking the sign of $f'$ on each side;
- find and interpret a maximum or minimum in a real context.
