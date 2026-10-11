---
title: 4.2 Binomial expansion for rational n and approximation — Practise with help
chapter: 4
chapter_title: Sequences and series
section: '4.2'
section_title: Binomial expansion for rational n and approximation
dfe:
- D1
kind: guided-problems
---

# 4.2 Binomial expansion for rational n and approximation — Practise with help

Work each one first, closed book. Before you expand, write down the value of $n$
and the range of $x$ for which the answer is valid.

## Warm-up: remember

1. Expand $(1 + x)^3$.
2. Work out $9^{\frac{1}{2}}$ and $27^{\frac{1}{3}}$.
3. Simplify $\left(\dfrac{x}{2}\right)^3$.

<details markdown="1">
<summary>Answers</summary>

1. $(1 + x)^3 = 1 + 3x + 3x^2 + x^3$.
2. $9^{\frac{1}{2}} = 3$ and $27^{\frac{1}{3}} = 3$, because $3^2 = 9$ and
   $3^3 = 27$.
3. $\left(\dfrac{x}{2}\right)^3 = \dfrac{x^3}{8}$.

If question 2 was hard, revisit fractional indices in Section 2.1 before you
continue. A fractional power is a root.
</details>

## Practise with help

**1.** Expand $(1 + x)^{-1}$ up to and including the term in $x^3$, and state
the range of $x$ for which the expansion is valid.

<details markdown="1">
<summary>Hint</summary>

Use $n = -1$ in the general series. Each coefficient $\binom{-1}{r}$ is
$(-1)^r$, so the coefficients follow a simple pattern.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out the first three coefficients: $\binom{-1}{1} = -1$,
$\binom{-1}{2} = \dfrac{(-1)(-2)}{2} = 1$, and
$\binom{-1}{3} = \dfrac{(-1)(-2)(-3)}{6} = -1$.
</details>

<details markdown="1">
<summary>Full working</summary>

With $n = -1$,

$$
(1 + x)^{-1} = 1 - x + x^2 - x^3 + \dots, \qquad |x| < 1.
$$

The signs alternate. This is a geometric series with first term $1$ and ratio
$-x$.
</details>

**2.** Expand $(1 + 3x)^{-1}$ up to and including the term in $x^3$, and state
the range of validity.

<details markdown="1">
<summary>Hint</summary>

Start from the answer to question 1 and replace each $x$ with $3x$. The range
changes too.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out the powers of $3x$: $(3x)^2 = 9x^2$ and $(3x)^3 = 27x^3$. Then apply
the coefficients $1, -1, 1, -1$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
(1 + 3x)^{-1} = 1 - 3x + 9x^2 - 27x^3 + \dots
$$

The expansion is valid when $|3x| < 1$, which is $|x| < \dfrac{1}{3}$. The
coefficients grow because each term brings another factor of $3$.
</details>

**3.** Expand $(1 - x)^{\frac{1}{2}}$ up to and including the term in $x^3$.

<details markdown="1">
<summary>Hint</summary>

Use $n = \frac{1}{2}$ with $-x$ in place of $x$. You did the coefficients for
$n = \frac{1}{2}$ in the Learn page.
</details>

<details markdown="1">
<summary>Next step</summary>

Take $\binom{\frac{1}{2}}{2} = -\dfrac{1}{8}$ and
$\binom{\frac{1}{2}}{3} = \dfrac{1}{16}$, then attach $(-x)^2 = x^2$ and
$(-x)^3 = -x^3$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
(1 - x)^{\frac{1}{2}} = 1 + \frac{1}{2}(-x) - \frac{1}{8}(-x)^2
+ \frac{1}{16}(-x)^3 + \dots
$$

$$
= 1 - \frac{x}{2} - \frac{x^2}{8} - \frac{x^3}{16} - \dots, \qquad |x| < 1.
$$

The odd powers are still negative, because the second factor is $-\frac{1}{2}$.
The even power $(-x)^2 = x^2$ is positive but carries the coefficient $-\frac{1}{8}$.
</details>

**4.** Expand $\sqrt{9 + x}$ up to and including the term in $x^3$, and state
the range of validity.

<details markdown="1">
<summary>Hint</summary>

Take out the factor $9^{\frac{1}{2}} = 3$ first, so the bracket is
$\left(1 + \dfrac{x}{9}\right)^{\frac{1}{2}}$.
</details>

<details markdown="1">
<summary>Next step</summary>

Use the coefficients $1, \frac{1}{2}, -\frac{1}{8}, \frac{1}{16}$ with
$\dfrac{x}{9}$ in place of $x$, then multiply every term by $3$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\sqrt{9 + x} = 3\left(1 + \frac{x}{9}\right)^{\frac{1}{2}}
= 3\left[1 + \frac{x}{18} - \frac{x^2}{648} + \frac{x^3}{11664} + \dots\right]
$$

$$
= 3 + \frac{x}{6} - \frac{x^2}{216} + \frac{x^3}{3888} + \dots
$$

The expansion is valid when $\left|\dfrac{x}{9}\right| < 1$, which is
$|x| < 9$.
</details>

**5.** Use the first three terms of $(1 + x)^{\frac{1}{2}}$ to estimate
$\sqrt{1.02}$.

<details markdown="1">
<summary>Hint</summary>

Write $1.02 = 1 + 0.02$, so $x = 0.02$. Take the terms up to $x^2$.
</details>

<details markdown="1">
<summary>Next step</summary>

The first three terms are $1 + \dfrac{1}{2}x - \dfrac{1}{8}x^2$. Substitute
$x = 0.02$, so the middle term is $0.01$ and the last term is
$-\dfrac{1}{8}(0.0004)$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\sqrt{1.02} = (1 + 0.02)^{\frac{1}{2}}
\approx 1 + \frac{1}{2}(0.02) - \frac{1}{8}(0.02)^2
= 1 + 0.01 - 0.00005 = 1.00995.
$$

A calculator gives $1.0099505$ to $7$ decimal places, so the three-term estimate
is correct to $6$ decimal places. The term in $x^3$ is about $-0.0000005$, which
is smaller than the rounding.
</details>

**6.** Find the first three terms in the expansion of
$\dfrac{1}{\sqrt{1 + 4x}}$, and state the range of validity.

<details markdown="1">
<summary>Hint</summary>

Write the expression as $(1 + 4x)^{-\frac{1}{2}}$, so $n = -\frac{1}{2}$ and
the replacement for $x$ is $4x$.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out the coefficients $\binom{-\frac{1}{2}}{1} = -\dfrac{1}{2}$ and
$\binom{-\frac{1}{2}}{2} =
\dfrac{\left(-\frac{1}{2}\right)\left(-\frac{3}{2}\right)}{2} = \dfrac{3}{8}$.
Then attach $4x$ and $(4x)^2 = 16x^2$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
(1 + 4x)^{-\frac{1}{2}} = 1 + \left(-\frac{1}{2}\right)(4x)
+ \frac{3}{8}(16x^2) + \dots
$$

$$
= 1 - 2x + 6x^2 + \dots, \qquad |4x| < 1.
$$

The range of validity is $|x| < \dfrac{1}{4}$. The second term is
$-\frac{1}{2} \times 4x = -2x$, and the third is
$\frac{3}{8} \times 16x^2 = 6x^2$.
</details>
