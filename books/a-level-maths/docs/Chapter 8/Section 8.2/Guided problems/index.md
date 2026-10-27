---
title: 8.2 Definite integrals and the area under a curve — Practise with help
chapter: 8
chapter_title: Integration
section: '8.2'
section_title: Definite integrals and the area under a curve
refs:
- H3
kind: guided-problems
---

# 8.2 Definite integrals and the area under a curve — Practise with help

Work each question closed book first. Sketch the curve over the interval before
you decide whether the integral is the area.

## Warm-up: remember

1. Find $\displaystyle\int x^3dx$.
2. Find $\displaystyle\int e^{2x}dx$.
3. Evaluate $\displaystyle\int_0^1 2xdx$.

<details markdown="1">
<summary>Answers</summary>

1. $\dfrac{x^4}{4} + C$.
2. $\dfrac{1}{2}e^{2x} + C$.
3. $\Big[x^2\Big]_0^1 = 1 - 0 = 1$.

If question 1 was hard, revisit the power rule in Section 8.1.
</details>

:::figure warm-up-gate


## Practise with help

**1.** Evaluate $\displaystyle\int_0^3 x^2dx$.

<details markdown="1">
<summary>Hint</summary>

Find an antiderivative of $x^2$ first, then substitute the two limits.
</details>

<details markdown="1">
<summary>Next step</summary>

The antiderivative is $\dfrac{x^3}{3}$. Evaluate it at $x = 3$ and at $x = 0$,
then subtract.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\int_0^3 x^2dx = \left[\frac{x^3}{3}\right]_0^3 = \frac{27}{3} - 0 = 9.
$$

The curve $y = x^2$ lies above the axis on this interval, so the value $9$ is
the area under the curve.
</details>

**2.** Evaluate $\displaystyle\int_1^2 (4x - 1)dx$.

<details markdown="1">
<summary>Hint</summary>

Integrate term by term. The antiderivative has two terms, and each is evaluated
at both limits.
</details>

<details markdown="1">
<summary>Next step</summary>

An antiderivative is $2x^2 - x$. Evaluate at $x = 2$ and at $x = 1$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\int_1^2 (4x - 1)dx = \Big[2x^2 - x\Big]_1^2
= (8 - 2) - (2 - 1) = 6 - 1 = 5.
$$

Take care with the subtraction: the second bracket is $1$, so the answer is $5$.
</details>

**3.** Evaluate $\displaystyle\int_0^1 \left(e^x + 1\right)dx$.

<details markdown="1">
<summary>Hint</summary>

The antiderivative of $e^x$ is $e^x$. Keep $e$ as an exact value.
</details>

<details markdown="1">
<summary>Next step</summary>

An antiderivative is $e^x + x$. Evaluate at $1$ and at $0$, remembering that
$e^0 = 1$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\int_0^1 \left(e^x + 1\right)dx = \Big[e^x + x\Big]_0^1
= (e + 1) - (1 + 0) = e.
$$

The two $1$s cancel, so the exact answer is $e \approx 2.718$.
</details>

**4.** Find the area under the curve $y = 9 - x^2$ between $x = 0$ and $x = 3$.

<details markdown="1">
<summary>Hint</summary>

Check that the curve is above the axis on the interval. At the lower end
$y = 9$ and at the upper end $y = 0$, and the curve falls steadily.
</details>

<details markdown="1">
<summary>Next step</summary>

The area is $\displaystyle\int_0^3 (9 - x^2)dx$. An antiderivative is
$9x - \dfrac{x^3}{3}$.
</details>

<details markdown="1">
<summary>Full working</summary>

The area $A$ is

$$
A = \int_0^3 (9 - x^2)dx = \left[9x - \frac{x^3}{3}\right]_0^3
= (27 - 9) - 0 = 18.
$$

The area is $18$ square units. The curve touches the axis at $x = 3$ but stays
above it, so the whole integral is the area.
</details>

**5.** Evaluate $\displaystyle\int_{-1}^1 x^3dx$ and explain your answer.

<details markdown="1">
<summary>Hint</summary>

Find the antiderivative, then substitute both limits. Look at the symmetry of
the curve $y = x^3$.
</details>

<details markdown="1">
<summary>Next step</summary>

The antiderivative is $\dfrac{x^4}{4}$. Evaluate at $1$ and at $-1$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\int_{-1}^1 x^3dx = \left[\frac{x^4}{4}\right]_{-1}^1
= \frac{1}{4} - \frac{1}{4} = 0.
$$

The curve is odd: the region below the axis between $-1$ and $0$ has the same
size as the region above the axis between $0$ and $1$. The signed areas cancel,
so the integral is $0$. The total area is $2 \times \dfrac{1}{4} = \dfrac{1}{2}$
square units.
</details>

**6.** Find the total area between the curve $y = x^2 - 1$ and the horizontal
axis, from $x = 0$ to $x = 2$.

<details markdown="1">
<summary>Hint</summary>

Find where the curve crosses the axis. Solve $x^2 - 1 = 0$ for $x > 0$.
</details>

<details markdown="1">
<summary>Next step</summary>

The curve crosses at $x = 1$, so split the range into $0$ to $1$ and $1$ to $2$.
Take the size of the first integral and add the second.
</details>

<details markdown="1">
<summary>Full working</summary>

An antiderivative is $\dfrac{x^3}{3} - x$.

$$
\int_0^1 (x^2 - 1)dx = \left(\frac{1}{3} - 1\right) - 0 = -\frac{2}{3},
\qquad
\int_1^2 (x^2 - 1)dx = \left(\frac{8}{3} - 2\right) - \left(\frac{1}{3} - 1\right) = \frac{4}{3}.
$$

The first part lies below the axis, so take its size. The total area is

$$
\frac{2}{3} + \frac{4}{3} = 2
$$

square units.
</details>
