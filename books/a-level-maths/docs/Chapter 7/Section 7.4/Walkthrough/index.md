---
title: 7.4 The second derivative, convexity and points of inflection — Learn
chapter: 7
chapter_title: Differentiation
section: '7.4'
section_title: The second derivative, convexity and points of inflection
refs:
- G1
kind: walkthrough
---

# 7.4 The second derivative, convexity and points of inflection — Learn

**Prerequisites:** differentiating powers, exponentials, trigonometric functions
and logarithms from Section 7.3; reading the sign of an expression.

**By the end of this section you can:** find and use the second derivative;
interpret it as the rate of change of the gradient; decide where a curve is
convex or concave; and find a point of inflection, checking that the second
derivative changes sign.

## 1. The second derivative

Differentiate a function once and you have its gradient. Differentiate the
gradient and you have the **second derivative**. It measures how fast the
gradient itself is changing.

The notation is

$$
f''(x) \quad \text{or} \quad \frac{d^2y}{dx^2}.
$$

The square sits on the $d$ in the numerator and on the $x$ in the denominator.
It is not a power to apply to the function.

**Example 1.** Find $f''(x)$ for $f(x) = x^4 - 6x^2$.

Differentiate once:

$$
f'(x) = 4x^3 - 12x.
$$

Differentiate again:

$$
f''(x) = 12x^2 - 12.
$$

**Example 2.** Find $\dfrac{d^2y}{dx^2}$ for $y = \sin 2x$.

$$
\frac{dy}{dx} = 2\cos 2x,
\qquad
\frac{d^2y}{dx^2} = -4\sin 2x.
$$

## 2. Convex and concave sections

The sign of the second derivative tells you how the curve bends.

- Where $f''(x) > 0$, the gradient is increasing. The curve turns upwards, like
  the inside of a cup. It is **convex** there.
- Where $f''(x) < 0$, the gradient is decreasing. The curve turns downwards,
  like a frown. It is **concave** there.

Read the sign of $f''(x)$, not the sign of $f(x)$. A curve can be above the
$x$-axis and still be concave.

**Example 3.** For $f(x) = x^3 - 3x^2 + 2x$, find where the curve is convex and
where it is concave.

Differentiate twice:

$$
f'(x) = 3x^2 - 6x + 2,
\qquad
f''(x) = 6x - 6.
$$

Set $f''(x) = 0$: $6x - 6 = 0$, so $x = 1$.

- For $x < 1$, $f''(x) < 0$, so the curve is concave.
- For $x > 1$, $f''(x) > 0$, so the curve is convex.

The curve changes from concave to convex at $x = 1$.

## 3. Points of inflection

A **point of inflection** is a point where the curve changes from convex to
concave, or from concave to convex. At such a point the second derivative is
zero. The reverse is not always true: $f''(x) = 0$ is necessary, but it is not
enough.

To prove that a point is a point of inflection, check that $f''(x)$ changes
sign as $x$ passes through it. Find $f''$ to the left and to the right.

**Example 4.** For $f(x) = x^4$, the second derivative is $f''(x) = 12x^2$. At
$x = 0$ this is zero. Is there a point of inflection?

Look at the sign of $f''$ on each side. For every $x \neq 0$, $12x^2 > 0$, so
the curve is convex on both sides. The second derivative does not change sign.
There is no point of inflection at $x = 0$; the curve flattens and turns up
again.

**Example 5.** For $f(x) = x^3 - 3x^2 + 2x$ from Example 3, find the point of
inflection and its coordinates.

We already found $f''(x) = 6x - 6$, which is zero at $x = 1$. Use the sign
table:

| $x$ | below $1$, say $x = 0$ | $x = 1$ | above $1$, say $x = 2$ |
|---|---|---|---|
| $f''(x) = 6x - 6$ | $-6$, concave | $0$ | $6$, convex |

The second derivative changes from negative to positive, so $x = 1$ is a point
of inflection. The $y$-coordinate is

$$
f(1) = 1 - 3 + 2 = 0.
$$

The point of inflection is $(1, 0)$.

## 4. Using the second derivative to classify a turning point

The second derivative also distinguishes a maximum from a minimum. At a turning
point, $f'(x) = 0$. Then:

- if $f''(x) > 0$, the curve is convex, so the point is a minimum;
- if $f''(x) < 0$, the curve is concave, so the point is a maximum;
- if $f''(x) = 0$, the test gives no answer, and you must use a sign table for
  $f'(x)$.

Section 7.5 uses this test to solve the box problem.

> **Watch out.** Three mistakes are common with the second derivative.
>
> **Writing $f''(x)$ as $f'(x^2)$.** The double prime marks a second
> differentiation, not a square. To find $f''(x)$, differentiate $f'(x)$ once
> more.
>
> **Assuming that $f''(x) = 0$ always means a point of inflection.** The curve
> $y = x^4$ has $f''(0) = 0$ but bends upwards on both sides. Always check the
> sign of $f''$ either side of the point.
>
> **Confusing convex with above the axis.** Convex and concave describe the
> bending, not the height. The curve $y = x^2 - 4$ is convex everywhere, even
> where it dips below the $x$-axis. **Re-check:** pick one point each side of a
> suspected inflection and compare the signs of the second derivative.

## You should now be able to

- find a second derivative and use the notation $f''(x)$ and
  $\dfrac{d^2y}{dx^2}$;
- explain the second derivative as the rate of change of the gradient;
- decide where a curve is convex or concave from the sign of $f''$;
- find a candidate point of inflection and test it with a sign table;
- use the second derivative to classify a turning point.
