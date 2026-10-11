---
title: 7.4 The second derivative, convexity and points of inflection — Practise with help
chapter: 7
chapter_title: Differentiation
section: '7.4'
section_title: The second derivative, convexity and points of inflection
dfe:
- G1
kind: guided-problems
---

# 7.4 The second derivative, convexity and points of inflection — Practise with help

Work each question closed book first. For every suspected point of inflection,
check the sign of the second derivative on both sides.

## Warm-up: remember

1. Differentiate $y = 5x^3$.
2. Differentiate $y = \cos 3x$.
3. Differentiate $g(x) = 8x - 5$.

<details markdown="1">
<summary>Answers</summary>

1. $\dfrac{dy}{dx} = 15x^2$.
2. $\dfrac{dy}{dx} = -3\sin 3x$.
3. $g'(x) = 8$.

If question 2 was hard, revise the standard derivatives in Section 7.3 before
you continue.
</details>

## Practise with help

**1.** Find $f''(x)$ for $f(x) = x^5 - 2x^3 + 7$.

<details markdown="1">
<summary>Hint</summary>

Differentiate once, then differentiate the answer again. The constant $7$ has
already gone after the first differentiation.
</details>

<details markdown="1">
<summary>Next step</summary>

The first derivative is $f'(x) = 5x^4 - 6x^2$. Differentiate that expression
term by term.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
f'(x) = 5x^4 - 6x^2,
\qquad
f''(x) = 20x^3 - 12x.
$$

The second derivative is a cubic, because the original function was a quintic.
</details>

**2.** Find $\dfrac{d^2y}{dx^2}$ for $y = e^{3x}$.

<details markdown="1">
<summary>Hint</summary>

The derivative of $e^{3x}$ is $3e^{3x}$. Differentiate that result once more,
remembering the factor $3$ again.
</details>

<details markdown="1">
<summary>Next step</summary>

$\dfrac{dy}{dx} = 3e^{3x}$. Now differentiate $3e^{3x}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dy}{dx} = 3e^{3x},
\qquad
\frac{d^2y}{dx^2} = 9e^{3x}.
$$

Each differentiation multiplies by another $3$. After two differentiations the
factor is $3 \times 3 = 9$.
</details>

**3.** For $f(x) = x^3 - 6x^2 + 9x$, find $f''(x)$, find where $f''(x) = 0$, and
test whether that point is a point of inflection.

<details markdown="1">
<summary>Hint</summary>

Differentiate twice to find $f''$, then solve $f''(x) = 0$. Choose a value below
and a value above your answer and compare the signs of $f''$.
</details>

<details markdown="1">
<summary>Next step</summary>

$f'(x) = 3x^2 - 12x + 9$, so $f''(x) = 6x - 12$. This is zero at $x = 2$. Now
test $x = 1$ and $x = 3$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
f'(x) = 3x^2 - 12x + 9,
\qquad
f''(x) = 6x - 12.
$$

Set $f''(x) = 0$: $6x - 12 = 0$, so $x = 2$.

At $x = 1$, $f''(1) = -6 < 0$, so the curve is concave.
At $x = 3$, $f''(3) = 6 > 0$, so the curve is convex.

The second derivative changes from negative to positive, so $x = 2$ is a point
of inflection.
</details>

**4.** For $f(x) = x^3 + 3x^2$, state the intervals where the curve is convex
and where it is concave.

<details markdown="1">
<summary>Hint</summary>

Find $f''(x)$ and solve $f''(x) = 0$. The sign of $f''$ on each side of that
value gives the bending.
</details>

<details markdown="1">
<summary>Next step</summary>

$f'(x) = 3x^2 + 6x$, so $f''(x) = 6x + 6$. This is zero at $x = -1$. Test
$x = -2$ and $x = 0$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
f''(x) = 6x + 6.
$$

$f''(x) = 0$ at $x = -1$.

For $x < -1$, $f''(x) < 0$, so the curve is concave.
For $x > -1$, $f''(x) > 0$, so the curve is convex.

The curve is concave on $x < -1$ and convex on $x > -1$.
</details>

**5.** A student says that $f(x) = x^5$ does not have a point of inflection at
$x = 0$, because $f''(0) = 0$. Check the claim by finding $f''(x)$ and testing its
sign either side of $x = 0$.

<details markdown="1">
<summary>Hint</summary>

Find $f''(x)$ and look at its sign for a positive and a negative value of $x$.
</details>

<details markdown="1">
<summary>Next step</summary>

$f'(x) = 5x^4$ and $f''(x) = 20x^3$. At $x = 0$ this is $0$. Test $x = -1$ and
$x = 1$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
f''(x) = 20x^3.
$$

At $x = 0$, $f''(0) = 0$. At $x = -1$, $f''(-1) = -20 < 0$, so the curve is
concave. At $x = 1$, $f''(1) = 20 > 0$, so the curve is convex.

The second derivative does change sign here, so $x = 0$ **is** a point of
inflection. The statement in the question is wrong: $y = x^5$ does have a point
of inflection at the origin. Compare $y = x^4$, where $f''(x) = 12x^2$ never
changes sign.
</details>

**6.** Use the second derivative to classify the turning points of
$f(x) = x^3 - 3x$.

<details markdown="1">
<summary>Hint</summary>

Find the turning points from $f'(x) = 0$. Then substitute each value of $x$ into
$f''(x)$. A positive value means a minimum, and a negative value means a
maximum.
</details>

<details markdown="1">
<summary>Next step</summary>

$f'(x) = 3x^2 - 3$, which is zero at $x = 1$ and $x = -1$. Now work out
$f''(1)$ and $f''(-1)$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
f'(x) = 3x^2 - 3 = 3(x - 1)(x + 1),
\qquad
f''(x) = 6x.
$$

The turning points are at $x = 1$ and $x = -1$.

$f''(1) = 6 > 0$, so $x = 1$ is a minimum.
$f''(-1) = -6 < 0$, so $x = -1$ is a maximum.
</details>
