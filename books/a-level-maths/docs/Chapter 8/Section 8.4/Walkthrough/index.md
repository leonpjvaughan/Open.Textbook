---
title: 8.4 Integration as the limit of a sum — Learn
chapter: 8
chapter_title: Integration
section: '8.4'
section_title: Integration as the limit of a sum
dfe:
- H4
kind: walkthrough
---

# 8.4 Integration as the limit of a sum — Learn

**Prerequisites:** sigma notation from Section 4.4; the area under a curve and
the Fundamental Theorem of Calculus from Sections 8.1 and 8.2.

**By the end of this section you can:** write a definite integral as a sum of
strips; compute the sum for a simple function using the standard sum formulae;
and take the limit as the number of strips grows without bound.

## 1. Approximating an area with strips

Divide the interval from $a$ to $b$ into $n$ equal strips. Each strip has width

$$
\delta x = \frac{b - a}{n}.
$$

For the $i$th strip, take the height as the value of the function at the right
end, $f(x_i)$. The area of that strip is about $f(x_i)\delta x$, and the
**sum** of the strip areas approximates the area under the curve:

$$
S_n = \sum_{i=1}^{n} f(x_i)\delta x.
$$

Each term is a thin rectangle. The rectangles do not fit the curve exactly, so
$S_n$ is an estimate, not the exact area.

**Example 1.** Write a sum for $\displaystyle\int_0^3 (2x + 1)dx$ using $n$
equal strips.

Divide $[0, 3]$ into $n$ strips, so the width of each strip is

$$
\delta x = \frac{3 - 0}{n} = \frac{3}{n}.
$$

The right end of the $i$th strip is $x_i = i\delta x = \dfrac{3i}{n}$. Then

$$
S_n = \sum_{i=1}^{n} \left(2 \times \frac{3i}{n} + 1\right)\frac{3}{n}.
$$

## 2. The limit as the number of strips grows

As $n$ increases, the strips become thinner and the stair-step top follows the
curve more closely. In the limit $n \to \infty$ the approximation becomes exact:

$$
\int_a^b f(x)dx = \lim_{n \to \infty} \sum_{i=1}^{n} f(x_i)\delta x.
$$

This is what the integral sign means. The area is the limit of a sum of
infinitely many infinitely thin strips. The value does not depend on whether the
height is taken at the left end, the right end or the middle, because the strip
width shrinks to zero.

Two standard sums are needed to compute a limit by hand:

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2},
\qquad
\sum_{i=1}^{n} i^2 = \frac{n(n+1)(2n+1)}{6}.
$$

## 3. Computing an integral as a limit

**Example 2.** Use the limit of a sum to show that
$\displaystyle\int_0^1 x^2dx = \frac{1}{3}$.

Divide $[0, 1]$ into $n$ equal strips of width $\delta x = \dfrac{1}{n}$. The
right end of strip $i$ is $x_i = \dfrac{i}{n}$, so the height is
$x_i^2 = \dfrac{i^2}{n^2}$. Then

$$
S_n = \sum_{i=1}^{n} \frac{i^2}{n^2} \times \frac{1}{n}
= \frac{1}{n^3}\sum_{i=1}^{n} i^2
= \frac{1}{n^3} \times \frac{n(n+1)(2n+1)}{6}.
$$

Simplify the fraction:

$$
S_n = \frac{(n+1)(2n+1)}{6n^2}.
$$

Now take the limit. Divide every term by $n^2$:

$$
\lim_{n \to \infty} \frac{(n+1)(2n+1)}{6n^2}
= \lim_{n \to \infty} \frac{2n^2 + 3n + 1}{6n^2}
= \frac{2}{6} = \frac{1}{3}.
$$

The limit is $\dfrac{1}{3}$, so $\displaystyle\int_0^1 x^2dx = \frac{1}{3}$.
This matches the value found by the Fundamental Theorem of Calculus.

**Example 3.** Use the limit of a sum to show that
$\displaystyle\int_0^a xdx = \frac{a^2}{2}$ for $a > 0$.

Divide $[0, a]$ into $n$ strips of width $\delta x = \dfrac{a}{n}$, with
$x_i = \dfrac{ia}{n}$. Then

$$
S_n = \sum_{i=1}^{n} \frac{ia}{n} \times \frac{a}{n}
= \frac{a^2}{n^2}\sum_{i=1}^{n} i
= \frac{a^2}{n^2} \times \frac{n(n+1)}{2}
= \frac{a^2(n+1)}{2n}.
$$

As $n \to \infty$ the fraction $\dfrac{n+1}{n}$ tends to $1$, so

$$
\int_0^a xdx = \frac{a^2}{2}.
$$

> **Watch out.** Three mistakes are common.
>
> **Forgetting that $\delta x$ depends on $n$.** The width is
> $\dfrac{b-a}{n}$, so it changes with $n$. Treating it as a fixed number
> breaks the sum.
>
> **Taking the limit before simplifying.** Simplify the sum into a single
> fraction in $n$ first, then let $n \to \infty$. Taking the limit early turns
> $\delta x$ into $0$ and every strip area into $0$.
>
> **Using the wrong sum formula.** The sum of $i^2$ is
> $\dfrac{n(n+1)(2n+1)}{6}$, not $\left(\dfrac{n(n+1)}{2}\right)^2$.
> **Re-check:** after taking the limit, compare your answer with the value found
> by integration.

## 4. Try it: strips under a curve

**Predict first.** The figure shows rectangles under the curve $y = x^2$ from
$x = 0$ to $x = 2$. Before you move the slider, predict whether the sum of the
rectangle areas is larger or smaller than $\dfrac{8}{3}$, the exact area. Write
down your prediction and one reason for it.

:::figure ch8-riemann

**Test.** Move the slider to increase the number of rectangles. Watch the sum in
the readout as the rectangles get thinner.

**Explain.** Write two sentences. The first explains why the sum for this curve
is an overestimate at every value of $n$. The second explains why the sum
approaches the exact area as $n$ grows.

## You should now be able to

- write a definite integral as a sum of strip areas;
- write the width $\delta x$ and the height $f(x_i)$ for a given interval;
- use the standard sums for $i$ and $i^2$;
- simplify the sum and take the limit as $n \to \infty$;
- explain why the limit gives the exact area.
