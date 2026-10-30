---
title: 7.1 The derivative from first principles — Learn
chapter: 7
chapter_title: Differentiation
section: '7.1'
section_title: The derivative from first principles
tier: O
refs:
- '5.2'
kind: walkthrough
---

# 7.1 The derivative from first principles — Learn

**Prerequisites:** substituting a number into a formula; the gradient of a straight line
from two points; expanding $(x + h)^2$ and $(x + h)^3$.

**Objectives:** find the average gradient of a curve over an interval; take the limit as the
interval shrinks; differentiate $x^2$, $x^3$ and simple polynomials from first principles.

By the end of this section you can build the derivative from the gradient of a chord, and
say what the limit means.

## The average gradient of a curve

A straight line has one gradient everywhere. A curve does not: its gradient changes as you
move along it. To measure the gradient at a single point, start with the gradient over a
short interval.

Take the curve $y = x^2$ and two points on it, at $x$ and at $x + h$. The gradient of the
line joining them is

$$\frac{\text{change in } y}{\text{change in } x}
= \frac{(x + h)^2 - x^2}{h}.$$

This line is called a **chord**. Its gradient is the **average gradient** of the curve over
that interval.

**Example 1.** Find the average gradient of $y = x^2$ between $x = 3$ and $x = 3.1$.

$$\frac{3.1^2 - 3^2}{3.1 - 3} = \frac{9.61 - 9}{0.1} = \frac{0.61}{0.1} = 6.1$$

The average gradient over that short interval is $6.1$.

## Shrinking the interval

If $h$ gets smaller, the two points move closer together and the chord turns towards the
tangent at the single point $x$. The gradient of the tangent is what we want.

Before you read on, predict what happens to the chord's gradient as $h$ shrinks. Then move
$h$ yourself and check.

:::figure chord-to-tangent

The chord and the tangent both start on screen, so you can watch the gap between their
gradients close. The tangent's gradient does not move: it is $2x$, and the chord is
catching up to it.

For $y = x^2$, simplify the average gradient before shrinking $h$:

$$\frac{(x + h)^2 - x^2}{h} = \frac{x^2 + 2xh + h^2 - x^2}{h}
= \frac{2xh + h^2}{h} = 2x + h.$$

The division by $h$ is allowed here, because $h$ is small but not zero. Now let $h$ shrink
towards zero. The term $h$ disappears, and $2x + h$ settles towards $2x$.

> **The derivative.** The derivative of $f$ at $x$ is the limit of the average gradient as
> $h$ goes to zero:
>
>
> $$f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}.$$

The derivative is the **instantaneous rate of change** of $f$. On a graph it is the gradient
of the tangent at the point.

**Example 2.** Differentiate $f(x) = 5x + 2$ from first principles.

$$\frac{(5(x + h) + 2) - (5x + 2)}{h} = \frac{5x + 5h + 2 - 5x - 2}{h}
= \frac{5h}{h} = 5$$

There is no $h$ left to shrink, so $f'(x) = 5$. The derivative of a straight line is its
gradient.

**Example 3.** Differentiate $f(x) = x^3$ from first principles.

Expand $(x + h)^3 = x^3 + 3x^2h + 3xh^2 + h^3$. Subtract $x^3$ and divide by $h$:

$$\frac{3x^2h + 3xh^2 + h^3}{h} = 3x^2 + 3xh + h^2.$$

Every remaining term after the first carries an $h$. Let $h$ go to zero and they all vanish,
leaving $f'(x) = 3x^2$.

## Notation

Two notations are used for the derivative, and both mean the same thing.

- $f'(x)$ is read "f prime of x".
- $\dfrac{dy}{dx}$ is read "dee y by dee x", and it names the variables.

The second notation is useful when the letters carry meaning. If $V$ is a volume and $t$ is
a time, then $\dfrac{dV}{dt}$ is a rate of change of volume with respect to time.

**Predict, then test.** For $y = x^2$ at $x = 3$, predict the gradient of the tangent before
you calculate. Write the prediction down. Then work out the average gradient over intervals
of width $0.1$, $0.01$ and $0.001$ starting at $x = 3$. Each answer should get closer to
your prediction. Finish by explaining in one sentence why the answers approach a value
instead of passing it.

> **Watch out.** Do not substitute $h = 0$ before you simplify. Doing that gives
> $\dfrac{0}{0}$, which has no meaning. Simplify first, cancel the $h$, and only then let
> $h$ go to zero. The order matters: cancel, then take the limit.

## Progress check

Back to the chapter problem. The volume in the tank after $t$ minutes is
$V(t) = 12t^2 - t^3$ litres.

Estimate the rate at $t = 4$ minutes by working out the average rate from $t = 4$ to
$t = 4.1$. Work out $V(4)$ and $V(4.1)$ first, then divide the change in volume by $0.1$.

Keep your estimate. Section 7.2 finds the exact derivative, and you can compare the two.

## You should now be able to

- write down the average gradient of a curve over an interval;
- simplify $\dfrac{f(x + h) - f(x)}{h}$ for a polynomial and cancel the $h$;
- take the limit as $h$ goes to zero to find the derivative;
- use both $f'(x)$ and $\dfrac{dy}{dx}$ for the derivative;
- explain why the derivative is an instantaneous rate of change.
