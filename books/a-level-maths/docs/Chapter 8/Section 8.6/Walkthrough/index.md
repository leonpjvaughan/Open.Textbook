---
title: 8.6 Integrating with partial fractions — Learn
chapter: 8
chapter_title: Integration
section: '8.6'
section_title: Integrating with partial fractions
dfe:
- H6
kind: walkthrough
---

# 8.6 Integrating with partial fractions — Learn

**Prerequisites:** splitting a rational expression into partial fractions from
Section 2.8; the standard integral of $\dfrac{1}{x}$ and the laws of logarithms
from Sections 8.1 and 6.3.

**By the end of this section you can:** split a rational expression with linear
factors into partial fractions; integrate each fraction to a logarithm; handle a
repeated linear factor; and divide first when the top has the same or a higher
degree than the bottom.

## 1. From a fraction to logarithms

A fraction of the form $\dfrac{A}{x - a}$ integrates to a logarithm:

$$
\int \frac{A}{x - a}dx = A\ln|x - a| + C.
$$

When the denominator is a product of linear factors, split the fraction into
partial fractions first. Each partial fraction then integrates to its own
logarithm.

**Example 1.** Find $\displaystyle\int \frac{1}{(x - 1)(x + 2)}dx$.

First split into partial fractions. Write

$$
\frac{1}{(x - 1)(x + 2)} = \frac{A}{x - 1} + \frac{B}{x + 2}.
$$

Multiply both sides by $(x - 1)(x + 2)$:

$$
1 = A(x + 2) + B(x - 1).
$$

Substitute $x = 1$: $1 = 3A$, so $A = \dfrac{1}{3}$. Substitute $x = -2$:
$1 = -3B$, so $B = -\dfrac{1}{3}$. Therefore

$$
\frac{1}{(x - 1)(x + 2)} = \frac{1}{3(x - 1)} - \frac{1}{3(x + 2)}.
$$

Now integrate each term:

$$
\int \frac{1}{(x - 1)(x + 2)}dx
= \frac{1}{3}\ln|x - 1| - \frac{1}{3}\ln|x + 2| + C.
$$

By the laws of logarithms this can also be written as
$\dfrac{1}{3}\ln\left|\dfrac{x - 1}{x + 2}\right| + C$.

**Example 2.** Find $\displaystyle\int \frac{5x + 1}{(x - 1)(x + 2)}dx$.

Write

$$
\frac{5x + 1}{(x - 1)(x + 2)} = \frac{A}{x - 1} + \frac{B}{x + 2}.
$$

Then $5x + 1 = A(x + 2) + B(x - 1)$. Substitute $x = 1$: $6 = 3A$, so $A = 2$.
Substitute $x = -2$: $-9 = -3B$, so $B = 3$. Then

$$
\int \frac{5x + 1}{(x - 1)(x + 2)}dx = 2\ln|x - 1| + 3\ln|x + 2| + C.
$$

## 2. A repeated linear factor

A repeated factor needs its own separate fraction for each power.

**Example 3.** Find $\displaystyle\int \frac{1}{x(x - 1)^2}dx$.

Write

$$
\frac{1}{x(x - 1)^2} = \frac{A}{x} + \frac{B}{x - 1} + \frac{C}{(x - 1)^2}.
$$

Multiply by $x(x - 1)^2$:

$$
1 = A(x - 1)^2 + Bx(x - 1) + Cx.
$$

Substitute $x = 0$: $1 = A$. Substitute $x = 1$: $1 = C$. Compare the
coefficients of $x^2$: $0 = A + B$, so $B = -1$. Therefore

$$
\int \frac{1}{x(x - 1)^2}dx = \ln|x| - \ln|x - 1| - \frac{1}{x - 1} + C.
$$

The fraction with $(x - 1)^2$ integrates with the power rule, not to a
logarithm.

## 3. Division first when the degree is too high

Partial fractions need the degree of the top to be lower than the degree of the
bottom. If it is not, divide first.

**Example 4.** Find $\displaystyle\int \frac{x^2 + 1}{x(x - 1)}dx$.

The top has degree $2$ and the bottom has degree $2$, so divide first:

$$
\frac{x^2 + 1}{x^2 - x} = 1 + \frac{x + 1}{x^2 - x}.
$$

Now split the remainder. Write

$$
\frac{x + 1}{x(x - 1)} = \frac{A}{x} + \frac{B}{x - 1},
$$

so $x + 1 = A(x - 1) + Bx$. Substitute $x = 0$: $1 = -A$, so $A = -1$.
Substitute $x = 1$: $2 = B$. Then

$$
\frac{x^2 + 1}{x(x - 1)} = 1 - \frac{1}{x} + \frac{2}{x - 1}.
$$

Integrate term by term:

$$
\int \frac{x^2 + 1}{x(x - 1)}dx = x - \ln|x| + 2\ln|x - 1| + C.
$$

> **Watch out.** Three mistakes are common.
>
> **Forgetting the constant in the numerator.** Each partial fraction has its
> own constant $A$, $B$ or $C$. The split of $\dfrac{1}{(x-1)(x+2)}$ is not
> $\dfrac{1}{x-1} - \dfrac{1}{x+2}$. Find the constants by substituting values
> of $x$ that make a factor zero.
>
> **Integrating a repeated factor as a logarithm.** The fraction
> $\dfrac{1}{(x-1)^2}$ integrates to $-\dfrac{1}{x-1}$, by the power rule. Only
> a power of one gives a logarithm.
>
> **Skipping the division for an improper fraction.** When the degree of the top
> is not lower than the degree of the bottom, divide first.
> **Re-check:** after splitting, add the partial fractions back together and
> confirm they give the original expression.

## You should now be able to

- split a rational expression with distinct linear factors into partial
  fractions;
- integrate each partial fraction to a logarithm;
- handle a repeated linear factor with a separate fraction for each power;
- divide first when the degree of the top is too high;
- combine logarithms with the laws of logarithms.
