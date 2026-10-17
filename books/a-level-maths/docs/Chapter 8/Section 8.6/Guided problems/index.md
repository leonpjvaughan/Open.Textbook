---
title: 8.6 Integrating with partial fractions — Practise with help
chapter: 8
chapter_title: Integration
section: '8.6'
section_title: Integrating with partial fractions
refs:
- H6
kind: guided-problems
---

# 8.6 Integrating with partial fractions — Practise with help

Work each question closed book first. Split the fraction completely before you
integrate, and write the constant for each partial fraction in the numerator.

## Warm-up: remember

1. Write $\dfrac{3}{x - 1} + \dfrac{2}{x + 1}$ as a single fraction.
2. Simplify $\ln 8 - \ln 2$.
3. Find $\displaystyle\int \frac{1}{x}dx$.

<details markdown="1">
<summary>Answers</summary>

1. $\dfrac{3(x + 1) + 2(x - 1)}{(x - 1)(x + 1)} = \dfrac{5x + 1}{(x - 1)(x + 1)}$.
2. $\ln 8 - \ln 2 = \ln 4 = 2\ln 2$.
3. $\ln x + C$ for $x > 0$.

If question 1 was hard, revise partial fractions in Section 2.8.
</details>

:::figure warm-up-gate


## Practise with help

**1.** Find $\displaystyle\int \frac{1}{(x + 1)(x + 3)}dx$.

<details markdown="1">
<summary>Hint</summary>

Write the fraction as $\dfrac{A}{x + 1} + \dfrac{B}{x + 3}$, then substitute
$x = -1$ and $x = -3$.
</details>

<details markdown="1">
<summary>Next step</summary>

$1 = A(x + 3) + B(x + 1)$. At $x = -1$, $A = \dfrac{1}{2}$. At $x = -3$,
$B = -\dfrac{1}{2}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\int \frac{1}{(x + 1)(x + 3)}dx
= \frac{1}{2}\ln|x + 1| - \frac{1}{2}\ln|x + 3| + C.
$$

Both terms are logarithms, because each partial fraction has a power of one in
the denominator.
</details>

**2.** Find $\displaystyle\int \frac{2x + 3}{(x + 1)(x + 2)}dx$.

<details markdown="1">
<summary>Hint</summary>

The numerator is not a constant, so the two constants $A$ and $B$ need not be
equal. Use $2x + 3 = A(x + 2) + B(x + 1)$.
</details>

<details markdown="1">
<summary>Next step</summary>

At $x = -1$: $1 = A$. At $x = -2$: $-1 = -B$, so $B = 1$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{2x + 3}{(x + 1)(x + 2)} = \frac{1}{x + 1} + \frac{1}{x + 2}.
$$

So

$$
\int \frac{2x + 3}{(x + 1)(x + 2)}dx = \ln|x + 1| + \ln|x + 2| + C
= \ln|(x + 1)(x + 2)| + C.
$$

The two logarithms combine with the law $\ln a + \ln b = \ln ab$.
</details>

**3.** Find $\displaystyle\int \frac{x + 4}{(x - 2)(x + 1)}dx$.

<details markdown="1">
<summary>Hint</summary>

Use $x + 4 = A(x + 1) + B(x - 2)$. Substitute the values that make each factor
zero.
</details>

<details markdown="1">
<summary>Next step</summary>

At $x = 2$: $6 = 3A$, so $A = 2$. At $x = -1$: $3 = -3B$, so $B = -1$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\int \frac{x + 4}{(x - 2)(x + 1)}dx = 2\ln|x - 2| - \ln|x + 1| + C.
$$

The sign of each coefficient is the sign in the final answer.
</details>

**4.** Find $\displaystyle\int \frac{1}{x(x + 1)^2}dx$.

<details markdown="1">
<summary>Hint</summary>

The repeated factor needs two fractions, for $(x + 1)$ and for $(x + 1)^2$:
$\dfrac{A}{x} + \dfrac{B}{x + 1} + \dfrac{C}{(x + 1)^2}$.
</details>

<details markdown="1">
<summary>Next step</summary>

$1 = A(x + 1)^2 + Bx(x + 1) + Cx$. At $x = 0$, $A = 1$. At $x = -1$,
$C = -1$. Comparing the $x^2$ coefficients gives $0 = A + B$, so $B = -1$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\int \frac{1}{x(x + 1)^2}dx
= \ln|x| - \ln|x + 1| + \frac{1}{x + 1} + C.
$$

The fraction with the squared denominator integrates with the power rule. Its
negative coefficient $C = -1$ and the negative power combine to give a positive
term.
</details>

**5.** Find $\displaystyle\int \frac{x^2}{x^2 - 1}dx$.

<details markdown="1">
<summary>Hint</summary>

The top and bottom have the same degree, so divide first. Write
$\dfrac{x^2}{x^2 - 1} = 1 + \dfrac{1}{x^2 - 1}$.
</details>

<details markdown="1">
<summary>Next step</summary>

Split $\dfrac{1}{(x - 1)(x + 1)} = \dfrac{1/2}{x - 1} - \dfrac{1/2}{x + 1}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\int \frac{x^2}{x^2 - 1}dx
= \int 1dx + \frac{1}{2}\int \frac{1}{x - 1}dx - \frac{1}{2}\int \frac{1}{x + 1}dx
= x + \frac{1}{2}\ln\left|\frac{x - 1}{x + 1}\right| + C.
$$

Dividing first removed the improper part and left a fraction with linear
factors.
</details>

**6.** Evaluate $\displaystyle\int_0^1 \frac{1}{(x + 1)(x + 2)}dx$, giving an
exact answer.

<details markdown="1">
<summary>Hint</summary>

Split the fraction first. The two linear factors are $(x + 1)$ and $(x + 2)$.
</details>

<details markdown="1">
<summary>Next step</summary>

$\dfrac{1}{(x + 1)(x + 2)} = \dfrac{1}{x + 1} - \dfrac{1}{x + 2}$. Integrate to
$\ln|x + 1| - \ln|x + 2|$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\int_0^1 \frac{1}{(x + 1)(x + 2)}dx
= \Big[\ln(x + 1) - \ln(x + 2)\Big]_0^1.
$$

At the upper limit: $\ln 2 - \ln 3$. At the lower limit: $\ln 1 - \ln 2 = -\ln 2$.
Subtracting,

$$
(\ln 2 - \ln 3) - (-\ln 2) = 2\ln 2 - \ln 3 = \ln\frac{4}{3}.
$$

Both logarithms are positive on the interval, so no absolute values are needed.
</details>
