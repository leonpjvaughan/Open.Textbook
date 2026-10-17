---
title: 7.6 Increasing and decreasing functions — Practise with help
chapter: 7
chapter_title: Differentiation
section: '7.6'
section_title: Increasing and decreasing functions
refs:
- G3
kind: guided-problems
---

# 7.6 Increasing and decreasing functions — Practise with help

Work each question closed book first. Differentiate, factorise, then test the
sign of the derivative in each interval between the roots.

## Warm-up: remember

1. Solve $3x - 9 > 0$.
2. Factorise $x^2 - x - 6$.
3. Solve $(x - 1)(x + 4) < 0$.

<details markdown="1">
<summary>Answers</summary>

1. $3x > 9$, so $x > 3$.
2. $x^2 - x - 6 = (x - 3)(x + 2)$.
3. A product is negative when the two factors have opposite signs. That happens
   between the roots, so $-4 < x < 1$.

If question 3 was hard, revise quadratic inequalities in Chapter 2.
</details>

:::figure warm-up-gate


## Practise with help

**1.** Find the interval on which $y = x^2 - 6x$ is increasing.

<details markdown="1">
<summary>Hint</summary>

Differentiate, then solve $\dfrac{dy}{dx} > 0$.
</details>

<details markdown="1">
<summary>Next step</summary>

$\dfrac{dy}{dx} = 2x - 6$. Solve $2x - 6 > 0$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dy}{dx} = 2x - 6 > 0
\quad \Rightarrow \quad x > 3.
$$

The curve is increasing for $x > 3$ and decreasing for $x < 3$. The turning
point at $x = 3$ is a minimum.
</details>

**2.** Find the intervals on which $y = x^3 - 12x$ is increasing and those on
which it is decreasing.

<details markdown="1">
<summary>Hint</summary>

The derivative is a quadratic with two roots. Use a sign table with a test value
in each of the three intervals.
</details>

<details markdown="1">
<summary>Next step</summary>

$\dfrac{dy}{dx} = 3x^2 - 12 = 3(x - 2)(x + 2)$. The roots are $x = 2$ and
$x = -2$. Test $x = -3$, $x = 0$ and $x = 3$.
</details>

<details markdown="1">
<summary>Full working</summary>

| Interval | Test value | Sign of $\dfrac{dy}{dx}$ | Behaviour |
|---|---|---|---|
| $x < -2$ | $x = -3$ | $3(-5)(-1) = 15 > 0$ | increasing |
| $-2 < x < 2$ | $x = 0$ | $3(-2)(2) = -12 < 0$ | decreasing |
| $x > 2$ | $x = 3$ | $3(1)(5) = 15 > 0$ | increasing |

The curve is increasing for $x < -2$ and for $x > 2$, and decreasing for
$-2 < x < 2$.
</details>

**3.** Find the intervals on which $y = 2x^3 + 3x^2 - 12x$ is increasing and
those on which it is decreasing.

<details markdown="1">
<summary>Hint</summary>

Differentiate and take out the common factor $6$. Factorise the remaining
quadratic.
</details>

<details markdown="1">
<summary>Next step</summary>

$\dfrac{dy}{dx} = 6x^2 + 6x - 12 = 6(x^2 + x - 2) = 6(x + 2)(x - 1)$. The roots
are $x = -2$ and $x = 1$.
</details>

<details markdown="1">
<summary>Full working</summary>

| Interval | Test value | Sign of $\dfrac{dy}{dx}$ | Behaviour |
|---|---|---|---|
| $x < -2$ | $x = -3$ | $6(-1)(-4) = 24 > 0$ | increasing |
| $-2 < x < 1$ | $x = 0$ | $6(2)(-1) = -12 < 0$ | decreasing |
| $x > 1$ | $x = 2$ | $6(4)(1) = 24 > 0$ | increasing |

The curve is increasing for $x < -2$ and for $x > 1$, and decreasing for
$-2 < x < 1$. It has a maximum at $x = -2$ and a minimum at $x = 1$.
</details>

**4.** The derivative of a function is $f'(x) = (x - 3)(x + 1)$. State the
intervals on which $f$ is increasing and those on which it is decreasing.

<details markdown="1">
<summary>Hint</summary>

The roots are $x = 3$ and $x = -1$. Test one value in each of the three
intervals and look at the sign of the product.
</details>

<details markdown="1">
<summary>Next step</summary>

Test $x = -2$, $x = 0$ and $x = 4$. At $x = -2$ both factors are negative, so
the product is positive. At $x = 0$ the factors have opposite signs.
</details>

<details markdown="1">
<summary>Full working</summary>

| Interval | Test value | Sign of $f'(x)$ | Behaviour |
|---|---|---|---|
| $x < -1$ | $x = -2$ | $(-5)(-1) = 5 > 0$ | increasing |
| $-1 < x < 3$ | $x = 0$ | $(-3)(1) = -3 < 0$ | decreasing |
| $x > 3$ | $x = 4$ | $(1)(5) = 5 > 0$ | increasing |

The function is increasing for $x < -1$ and for $x > 3$, and decreasing for
$-1 < x < 3$.
</details>

**5.** Show that $y = x^3$ is increasing for every value of $x$, even though it
has a stationary point at $x = 0$.

<details markdown="1">
<summary>Hint</summary>

Differentiate and look at the sign of $3x^2$ for positive and negative values of
$x$.
</details>

<details markdown="1">
<summary>Next step</summary>

$\dfrac{dy}{dx} = 3x^2$. A square is never negative, so the derivative is
positive for every $x \neq 0$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{dy}{dx} = 3x^2.
$$

For every $x \neq 0$, $3x^2 > 0$, so the curve is increasing. At $x = 0$ the
derivative is zero, so the curve is momentarily flat. It is still increasing
through the origin: the gradient falls to zero and rises again without becoming
negative.

This is a stationary point of inflection, not a maximum or a minimum.
</details>

**6.** A curve has $f'(x) < 0$ for $0 < x < 4$ and $f'(x) > 0$ for $x < 0$ and
for $x > 4$. Describe the curve between $x = -1$ and $x = 5$.

<details markdown="1">
<summary>Hint</summary>

Mark the sign of the derivative on the intervals $x < 0$, $0 < x < 4$ and
$x > 4$, then translate the signs into rising and falling.
</details>

<details markdown="1">
<summary>Next step</summary>

The curve rises until $x = 0$, falls between $x = 0$ and $x = 4$, then rises
after $x = 4$.
</details>

<details markdown="1">
<summary>Full working</summary>

Between $x = -1$ and $x = 5$ the curve rises to a maximum at $x = 0$, falls to a
minimum at $x = 4$, and then rises again. The two turning points are at $x = 0$
and $x = 4$, because the derivative is zero there.
</details>
