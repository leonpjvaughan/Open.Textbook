---
title: 7.8 Stationary points, maxima and minima — Practise with help
chapter: 7
chapter_title: Differentiation
section: '7.8'
section_title: Stationary points, maxima and minima
tier: O
refs:
- '5.2'
kind: guided-problems
---

# 7.8 Stationary points, maxima and minima — Practise with help

## Warm-up: remember

1. Solve $2x - 4 = 0$.
2. Solve $3x^2 - 12 = 0$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $x = 2$.
2. $3x^2 = 12$, so $x^2 = 4$ and $x = 2$ or $x = -2$.

Solving $f'(x) = 0$ always ends in one of these two kinds of equation.

</details>

## Practise with help

**1.** Find the stationary point of $y = x^2 - 4x + 1$.

<details markdown="1">
<summary>Hint</summary>

Differentiate and set the derivative to zero.

<details markdown="1">
<summary>Next step</summary>

$2x - 4 = 0$, so $x = 2$.

<details markdown="1">
<summary>Full working</summary>

$x = 2$, and $y = 4 - 8 + 1 = -3$. The stationary point is $(2, -3)$. Since
$\dfrac{d^2y}{dx^2} = 2 > 0$, it is a minimum.

</details>
</details>
</details>

**2.** Find the x-values of the stationary points of $y = x^3 - 3x$.

<details markdown="1">
<summary>Hint</summary>

Set $3x^2 - 3$ to zero.

<details markdown="1">
<summary>Next step</summary>

$3x^2 = 3$, so $x^2 = 1$.

<details markdown="1">
<summary>Full working</summary>

$x = 1$ or $x = -1$. There are two stationary points.

</details>
</details>
</details>

**3.** Classify the stationary points of $y = x^3 - 3x$.

<details markdown="1">
<summary>Hint</summary>

The second derivative is $6x$. Work it out at each stationary point.

<details markdown="1">
<summary>Next step</summary>

At $x = -1$, $6x = -6$. At $x = 1$, $6x = 6$.

<details markdown="1">
<summary>Full working</summary>

At $x = -1$ the second derivative is $-6$, so $(-1, 2)$ is a local maximum. At $x = 1$ it is
$6$, so $(1, -2)$ is a local minimum.

</details>
</details>
</details>

**4.** Find and classify the stationary points of $y = x^3 - 6x^2 + 9x$.

<details markdown="1">
<summary>Hint</summary>

Factorise the derivative: $3(x - 1)(x - 3)$.

<details markdown="1">
<summary>Next step</summary>

The stationary points are at $x = 1$ and $x = 3$, and the second derivative is $6x - 12$.

<details markdown="1">
<summary>Full working</summary>

At $x = 1$: $y = 4$ and $y'' = -6$, so $(1, 4)$ is a local maximum. At $x = 3$: $y = 0$ and
$y'' = 6$, so $(3, 0)$ is a local minimum.

</details>
</details>
</details>

**5.** Find the greatest volume of the tank, $V(t) = 12t^2 - t^3$ for $0 \le t \le 8$.

<details markdown="1">
<summary>Hint</summary>

Set $V'(t) = 24t - 3t^2$ to zero and test the endpoints.

<details markdown="1">
<summary>Next step</summary>

$3t(8 - t) = 0$, so $t = 0$ or $t = 8$.

<details markdown="1">
<summary>Full working</summary>

$V(0) = 0$ and $V(8) = 256$. Since $V''(8) = -24 < 0$, $t = 8$ gives the maximum. The
greatest volume is $256$ litres, at $t = 8$ minutes.

</details>
</details>
</details>

**6.** Find the time at which the tank fills fastest, and the rate at that time.

<details markdown="1">
<summary>Hint</summary>

The rate is $V'(t) = 24t - 3t^2$. Maximise the rate by setting $V''(t)$ to zero.

<details markdown="1">
<summary>Next step</summary>

$V''(t) = 24 - 6t = 0$, so $t = 4$.

<details markdown="1">
<summary>Full working</summary>

$t = 4$ minutes, and $V'(4) = 96 - 48 = 48$ litres per minute. The rate is greatest there,
because $V''$ changes from positive to negative at $t = 4$.

</details>
</details>
</details>

**7.** For $y = x^3$, explain why $x = 0$ is a stationary point but not a maximum or a
minimum.

<details markdown="1">
<summary>Hint</summary>

Look at the sign of $y' = 3x^2$ on each side of zero.

<details markdown="1">
<summary>Next step</summary>

$3x^2$ is positive for every $x$ except $0$.

<details markdown="1">
<summary>Full working</summary>

At $x = 0$, $y' = 0$, so the point is stationary. But $y' = 3x^2$ is positive on both sides
of zero, so the curve is rising before the point and rising after it. It does not turn. The
origin is a point of inflection, and the second derivative test gives no information there
because $y'' = 6x = 0$ at $x = 0$.

</details>
</details>
</details>

## A question from Chapter 4

**8.** Solve $x^2 - 5x + 6 = 0$, and say how this connects to the curve
$y = x^2 - 5x + 6$.

<details markdown="1">
<summary>Hint</summary>

Factorise the quadratic.

<details markdown="1">
<summary>Next step</summary>

$(x - 2)(x - 3) = 0$.

<details markdown="1">
<summary>Full working</summary>

$x = 2$ or $x = 3$. These are the $x$-intercepts of the curve, where $y = 0$.

The stationary point is different: $\dfrac{dy}{dx} = 2x - 5 = 0$ gives $x = 2.5$, halfway
between the two roots. For a quadratic, the turning point always lies halfway between the
roots, because the curve is symmetric about it.

</details>
</details>
</details>
