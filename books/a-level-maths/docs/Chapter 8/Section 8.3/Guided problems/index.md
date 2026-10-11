---
title: 8.3 The area between two curves — Practise with help
chapter: 8
chapter_title: Integration
section: '8.3'
section_title: The area between two curves
dfe:
- H3
kind: guided-problems
---

# 8.3 The area between two curves — Practise with help

Work each question closed book first. Find the intersections, decide which curve
is upper, then integrate upper minus lower.

## Warm-up: remember

1. Solve $x^2 = 4$ for $x$.
2. Solve $x^2 = 3x$ for $x$.
3. Evaluate $\displaystyle\int_0^1 \left(x - x^2\right)dx$.

<details markdown="1">
<summary>Answers</summary>

1. $x = 2$ or $x = -2$.
2. $x = 0$ or $x = 3$.
3. $\left[\dfrac{x^2}{2} - \dfrac{x^3}{3}\right]_0^1 = \dfrac{1}{2} - \dfrac{1}{3} = \dfrac{1}{6}$.

If question 2 was hard, revise solving quadratics by factorising in Section 2.4.
</details>

## Practise with help

**1.** Find the area enclosed between the curve $y = x^2$ and the line $y = 4$.

<details markdown="1">
<summary>Hint</summary>

Find the intersections by solving $x^2 = 4$. Sketch both graphs to see which is
the upper curve.
</details>

<details markdown="1">
<summary>Next step</summary>

The intersections are at $x = -2$ and $x = 2$. The line is above the curve, so
integrate $(4 - x^2)$ between the limits.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
A = \int_{-2}^{2} (4 - x^2)dx = \left[4x - \frac{x^3}{3}\right]_{-2}^{2}
= \frac{16}{3} + \frac{16}{3} = \frac{32}{3}.
$$

The area is $\dfrac{32}{3}$ square units.
</details>

**2.** Find the area enclosed between the curve $y = x^2$ and the line $y = 3x$.

<details markdown="1">
<summary>Hint</summary>

Set $x^2 = 3x$ and factorise. One intersection is at the origin.
</details>

<details markdown="1">
<summary>Next step</summary>

$x(x - 3) = 0$ gives $x = 0$ and $x = 3$. The line is above the curve between
them, so integrate $(3x - x^2)$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
A = \int_0^3 (3x - x^2)dx = \left[\frac{3x^2}{2} - \frac{x^3}{3}\right]_0^3
= \frac{27}{2} - 9 = \frac{9}{2}.
$$

The area is $\dfrac{9}{2}$ square units.
</details>

**3.** Find the area enclosed between the curve $y = x^2 - 2$ and the line
$y = 2$.

<details markdown="1">
<summary>Hint</summary>

Solve $x^2 - 2 = 2$. The line is the upper curve, because the parabola opens
upwards and its turning point is below the line.
</details>

<details markdown="1">
<summary>Next step</summary>

The intersections are at $x = -2$ and $x = 2$. The height is
$2 - (x^2 - 2) = 4 - x^2$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
A = \int_{-2}^{2} (4 - x^2)dx = \left[4x - \frac{x^3}{3}\right]_{-2}^{2} = \frac{32}{3}.
$$

The translation of the curve does not change the shape of the enclosed region,
so the area matches question 1.
</details>

**4.** Find the area between the curve $y = x^3$ and the line $y = x$, from
$x = 0$ to $x = 1$.

<details markdown="1">
<summary>Hint</summary>

Over this interval the two graphs meet only at the ends. Test a point in the
middle, such as $x = 0.5$, to decide which is upper.
</details>

<details markdown="1">
<summary>Next step</summary>

At $x = 0.5$ the line gives $0.5$ and the curve gives $0.125$, so the line is
upper. Integrate $(x - x^3)$ from $0$ to $1$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
A = \int_0^1 (x - x^3)dx = \left[\frac{x^2}{2} - \frac{x^4}{4}\right]_0^1
= \frac{1}{2} - \frac{1}{4} = \frac{1}{4}.
$$

The area is $\dfrac{1}{4}$ square units.
</details>

**5.** Find the area enclosed between the curve $y = \sqrt{x}$ and the line
$y = x$.

<details markdown="1">
<summary>Hint</summary>

Solve $\sqrt{x} = x$. Square both sides, then check that the solutions you find
are genuine.
</details>

<details markdown="1">
<summary>Next step</summary>

Squaring gives $x = x^2$, so $x = 0$ or $x = 1$. Both satisfy the original
equation. The square root curve is above the line between them.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
A = \int_0^1 \left(x^{1/2} - x\right)dx
= \left[\frac{2}{3}x^{3/2} - \frac{x^2}{2}\right]_0^1
= \frac{2}{3} - \frac{1}{2} = \frac{1}{6}.
$$

The area is $\dfrac{1}{6}$ square units.
</details>

**6.** Find the total area enclosed between the curve $y = x^3 - 4x$ and the
horizontal axis.

<details markdown="1">
<summary>Hint</summary>

Factorise $x^3 - 4x = x(x - 2)(x + 2)$ to find the three crossings. The region
has symmetry.
</details>

<details markdown="1">
<summary>Next step</summary>

The crossings are at $x = -2$, $0$ and $2$. The area from $0$ to $2$ equals the
area from $-2$ to $0$, so find one and double it.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\int_0^2 (x^3 - 4x)dx = \left[\frac{x^4}{4} - 2x^2\right]_0^2 = 4 - 8 = -4.
$$

The curve lies below the axis between $0$ and $2$, so the area of that part is
$4$. By symmetry, the total area is

$$
4 + 4 = 8
$$

square units.
</details>
