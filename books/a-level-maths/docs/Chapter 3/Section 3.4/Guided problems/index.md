---
title: 3.4 Parametric equations and Cartesian conversion — Practise with help
chapter: 3
chapter_title: Coordinate geometry
section: '3.4'
section_title: Parametric equations and Cartesian conversion
refs:
- C3
kind: guided-problems
---

# 3.4 Parametric equations and Cartesian conversion — Practise with help

Work each one first, closed book. Before you eliminate the parameter, decide
which equation is easier to rearrange, and whether a trigonometric identity will
do the job instead.

## Warm-up: remember

1. Rearrange $x = 3t + 1$ to make $t$ the subject.
2. Expand $(2t - 1)^2$.
3. Write the equation of the circle with centre $(0, 0)$ and radius $7$.

<details markdown="1">
<summary>Answers</summary>

1. Subtract $1$, then divide by $3$: $t = \dfrac{x - 1}{3}$.
2. $(2t - 1)^2 = 4t^2 - 4t + 1$.
3. $x^2 + y^2 = 49$.

If question 1 was hard, revisit rearranging a formula before you continue.
</details>

## Practise with help

**1.** A curve has parametric equations $x = 3t$, $y = t^2 + 1$. Find the point
where $t = 2$.

<details markdown="1">
<summary>Hint</summary>

Substitute $t = 2$ into each equation separately.
</details>

<details markdown="1">
<summary>Next step</summary>

$x = 3 \times 2 = 6$ and $y = 2^2 + 1 = 5$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
x = 3 \times 2 = 6, \qquad y = 2^2 + 1 = 5.
$$

The point is $(6, 5)$.
</details>

**2.** Find the Cartesian equation of $x = 3t$, $y = t^2 + 1$.

<details markdown="1">
<summary>Hint</summary>

The first equation is the simpler one. Make $t$ its subject, then substitute
into the second.
</details>

<details markdown="1">
<summary>Next step</summary>

From $x = 3t$ we get $t = \dfrac{x}{3}$. Substitute that into $y = t^2 + 1$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
y = \left(\frac{x}{3}\right)^2 + 1 = \frac{x^2}{9} + 1.
$$

The curve is a parabola. Check with the point from question 1: when $x = 6$,
$y = \frac{36}{9} + 1 = 5$, which matches.
</details>

**3.** Find the Cartesian equation of $x = t - 4$, $y = 2t + 1$.

<details markdown="1">
<summary>Hint</summary>

Make $t$ the subject of the first equation. It needs one addition.
</details>

<details markdown="1">
<summary>Next step</summary>

From $x = t - 4$ we get $t = x + 4$. Substitute into $y = 2t + 1$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
y = 2(x + 4) + 1 = 2x + 8 + 1 = 2x + 9.
$$

The curve is a straight line with gradient $2$.
</details>

**4.** Find the Cartesian equation of $x = 4\cos t$, $y = 4\sin t$.

<details markdown="1">
<summary>Hint</summary>

Make $\cos t$ and $\sin t$ the subjects, square both equations, and add them.
</details>

<details markdown="1">
<summary>Next step</summary>

$\cos t = \dfrac{x}{4}$ and $\sin t = \dfrac{y}{4}$. Use
$\cos^2 t + \sin^2 t = 1$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\left(\frac{x}{4}\right)^2 + \left(\frac{y}{4}\right)^2 = 1.
$$

Multiply by $16$:

$$
x^2 + y^2 = 16.
$$

The curve is the circle of radius $4$ centred on the origin.
</details>

**5.** Find the Cartesian equation of $x = 1 + 3\cos t$, $y = -2 + 3\sin t$.

<details markdown="1">
<summary>Hint</summary>

Rearrange each equation so that the trigonometric function stands alone before
you square.
</details>

<details markdown="1">
<summary>Next step</summary>

$\cos t = \dfrac{x - 1}{3}$ and $\sin t = \dfrac{y + 2}{3}$. Square and add.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\left(\frac{x - 1}{3}\right)^2 + \left(\frac{y + 2}{3}\right)^2 = 1,
$$

$$
(x - 1)^2 + (y + 2)^2 = 9.
$$

The curve is the circle with centre $(1, -2)$ and radius $3$.
</details>

**6.** Write the curve $y = x^2 - 3$ using a parameter.

<details markdown="1">
<summary>Hint</summary>

Choose the simplest possible parameter. Let the parameter be $x$ itself.
</details>

<details markdown="1">
<summary>Next step</summary>

Set $x = t$. Then read $y$ from the equation of the curve.
</details>

<details markdown="1">
<summary>Full working</summary>

Let $x = t$. Then

$$
x = t, \qquad y = t^2 - 3.
$$

This parameterisation covers the whole curve, because $t$ runs over every real
number. A curve has many parameterisations, and this is the simplest one.
</details>

**7.** A curve is given by $x = t + 2$, $y = t^2$, for $0 \le t \le 2$. Find its
Cartesian equation and the range of $x$ it covers.

<details markdown="1">
<summary>Hint</summary>

Eliminate $t$ in the usual way. Then use the range of $t$ to find the range of
$x$.
</details>

<details markdown="1">
<summary>Next step</summary>

$t = x - 2$, so $y = (x - 2)^2$. Now substitute $t = 0$ and $t = 2$ into
$x = t + 2$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
y = (x - 2)^2.
$$

The parameter runs from $0$ to $2$, so $x = t + 2$ runs from $2$ to $4$. The
curve is the part of the parabola with

$$
2 \le x \le 4.
$$

The whole parabola $y = (x - 2)^2$ is longer than this, so the range of $t$ is
part of the answer.
</details>
