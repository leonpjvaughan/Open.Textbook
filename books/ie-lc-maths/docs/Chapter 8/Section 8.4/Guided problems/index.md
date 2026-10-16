---
title: 8.4 Area between a curve and the x-axis — Practise with help
chapter: 8
chapter_title: Integration
section: '8.4'
section_title: Area between a curve and the x-axis
tier: O
refs:
- '5.2'
kind: guided-problems
---

# 8.4 Area between a curve and the x-axis — Practise with help

## Warm-up: remember

1. Solve $x^2 - 9 = 0$.
2. Evaluate $\displaystyle\int_0^2 x^2\,dx$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $x = 3$ or $x = -3$. Both signs are solutions, because a square hides the sign.
2. $\left[\dfrac{x^3}{3}\right]_0^2 = \dfrac{8}{3}$.

The first answer tells you where a curve crosses the axis. The second is an area under a
curve that stays above the axis.

</details>

## Practise with help

**1.** Find the area of the region bounded by $y = x^2$, the $x$-axis and the lines $x = 0$
and $x = 2$.

<details markdown="1">
<summary>Hint</summary>

The curve is above the axis, so the area is the definite integral.

<details markdown="1">
<summary>Next step</summary>

$\displaystyle\int_0^2 x^2\,dx = \left[\dfrac{x^3}{3}\right]_0^2$.

<details markdown="1">
<summary>Full working</summary>

$$\text{Area} = \int_0^2 x^2\,dx = \frac{8}{3} - 0 = \frac{8}{3}$$

The area is $\dfrac{8}{3}$ square units.

</details>
</details>
</details>

**2.** Find the area of the region bounded by $y = x^2 - 1$ and the $x$-axis between $x = 1$
and $x = 2$.

<details markdown="1">
<summary>Hint</summary>

The curve crosses the axis at $x = 1$. Check that it is above the axis on the interval.

<details markdown="1">
<summary>Next step</summary>

At $x = 1.5$, $y = 2.25 - 1 = 1.25$, which is positive. So the integral gives the area.

<details markdown="1">
<summary>Full working</summary>

$$\int_1^2 (x^2 - 1)\,dx = \left[\frac{x^3}{3} - x\right]_1^2
= \left(\frac{8}{3} - 2\right) - \left(\frac{1}{3} - 1\right)
= \frac{2}{3} + \frac{2}{3} = \frac{4}{3}$$

The area is $\dfrac{4}{3}$ square units.

</details>
</details>
</details>

**3.** Find the total area of the region bounded by $y = x^2 - 4$ and the $x$-axis between
$x = 0$ and $x = 3$.

<details markdown="1">
<summary>Hint</summary>

The curve crosses the axis at $x = 2$. Split the interval there.

<details markdown="1">
<summary>Next step</summary>

$\displaystyle\int_0^2 (x^2 - 4)\,dx = -\dfrac{16}{3}$ and
$\displaystyle\int_2^3 (x^2 - 4)\,dx = \dfrac{7}{3}$.

<details markdown="1">
<summary>Full working</summary>

The piece below the axis has size $\dfrac{16}{3}$. The piece above the axis has size
$\dfrac{7}{3}$. Add the sizes:

$$\frac{16}{3} + \frac{7}{3} = \frac{23}{3}$$

The total area is $\dfrac{23}{3}$ square units. Do not add $-3$ to anything: that is the
signed integral, not an area.

</details>
</details>
</details>

**4.** For $y = x^2 - 2x$, work out the signed integral from $x = 0$ to $x = 3$ and the total
area on the same interval.

<details markdown="1">
<summary>Hint</summary>

Solve $x^2 - 2x = 0$ to find the crossings.

<details markdown="1">
<summary>Next step</summary>

$x(x - 2) = 0$, so the curve crosses at $x = 0$ and $x = 2$. Work out each piece.

<details markdown="1">
<summary>Full working</summary>

The signed integral over the whole interval is

$$\int_0^3 (x^2 - 2x)\,dx = \left[\frac{x^3}{3} - x^2\right]_0^3 = 0.$$

The pieces are

$$\int_0^2 (x^2 - 2x)\,dx = -\frac{4}{3}, \qquad
\int_2^3 (x^2 - 2x)\,dx = \frac{4}{3}.$$

Each piece has size $\dfrac{4}{3}$, so the total area is $\dfrac{8}{3}$ square units. The
signed integral is zero, but the region has area.

</details>
</details>
</details>

**5.** Find the area of the region bounded by $y = x^2$ and the $x$-axis between $x = -2$
and $x = 2$.

<details markdown="1">
<summary>Hint</summary>

The curve is above the axis on the whole interval, including the negative side.

<details markdown="1">
<summary>Next step</summary>

Evaluate $\left[\dfrac{x^3}{3}\right]_{-2}^{2}$.

<details markdown="1">
<summary>Full working</summary>

$$\int_{-2}^{2} x^2\,dx = \left[\frac{x^3}{3}\right]_{-2}^{2}
= \frac{8}{3} - \left(-\frac{8}{3}\right) = \frac{16}{3}$$

The area is $\dfrac{16}{3}$ square units.

</details>
</details>
</details>

**6.** The chapter problem's tank has rate $r(t) = 12t - 3t^2$ litres per minute. Work out
$\displaystyle\int_4^6 r(t)\,dt$ and the area of the region below the axis.

<details markdown="1">
<summary>Hint</summary>

An antiderivative is $6t^2 - t^3$.

<details markdown="1">
<summary>Next step</summary>

$\Big[6t^2 - t^3\Big]_4^6 = (216 - 216) - (96 - 64) = -32$.

<details markdown="1">
<summary>Full working</summary>

$$\int_4^6 (12t - 3t^2)\,dt = 0 - 32 = -32$$

The value $-32$ means the tank loses $32$ litres between $t = 4$ and $t = 6$ minutes. The
graph lies below the axis there, and the area of that region is $32$ square units.

</details>
</details>
</details>

**7.** Explain why the total area of a region that crosses the $x$-axis is not the same as
the definite integral over the same interval.

<details markdown="1">
<summary>Hint</summary>

Think about the sign of each piece.

<details markdown="1">
<summary>Next step</summary>

A piece below the axis contributes a negative number to the integral.

<details markdown="1">
<summary>Full working</summary>

The definite integral adds the pieces with their signs. A piece below the axis contributes a
negative number, so it reduces the total.

The area is a size, so each piece contributes positively. To find the area, split at the
crossings, take the size of each piece, and add. Adding the signed integrals instead lets
the negative piece cancel part of the positive one.

</details>
</details>
</details>

## A question from Chapter 7

**8.** For $y = x^2 - 2x$, find the turning point and say whether it is a minimum.

<details markdown="1">
<summary>Hint</summary>

Differentiate and set the derivative equal to zero.

<details markdown="1">
<summary>Next step</summary>

$\dfrac{dy}{dx} = 2x - 2$, so the turning point is at $x = 1$. The second derivative is $2$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dx} = 2x - 2 = 0 \quad\Rightarrow\quad x = 1$$

At $x = 1$, $y = 1 - 2 = -1$. The second derivative is $2$, which is positive, so the
point $(1, -1)$ is a minimum.

That minimum is below the axis, which is why the region for this curve has a piece with a
negative integral.

</details>
</details>
</details>
