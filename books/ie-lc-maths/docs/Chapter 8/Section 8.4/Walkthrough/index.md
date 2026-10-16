---
title: 8.4 Area between a curve and the x-axis — Learn
chapter: 8
chapter_title: Integration
section: '8.4'
section_title: Area between a curve and the x-axis
tier: O
refs:
- '5.2'
kind: walkthrough
---

# 8.4 Area between a curve and the x-axis — Learn

**Prerequisites:** Section 8.2 — the definite integral and signed area.

**Objectives:** find the area between a curve and the $x$-axis; find where a curve crosses
the axis; split a region at a crossing and add the sizes of the pieces.

By the end of this section you can find the area of any region bounded by a polynomial curve
and the $x$-axis.

## A curve above the axis

When the curve lies above the $x$-axis across the whole interval, the definite integral is
the area.

**Example 1.** Find the area of the region bounded by $y = x^2$, the $x$-axis and the lines
$x = 0$ and $x = 2$.

$$\text{Area} = \int_0^2 x^2\,dx = \left[\frac{x^3}{3}\right]_0^2 = \frac{8}{3}.$$

The area is $\dfrac{8}{3}$ square units.

## A curve below the axis

When the curve lies below the axis, the definite integral is negative. The area is the size
of that number, without the minus sign.

**Example 2.** Find the area of the region bounded by $y = x^2 - 4$ and the $x$-axis
between $x = 0$ and $x = 2$.

$$\int_0^2 (x^2 - 4)\,dx = \left[\frac{x^3}{3} - 4x\right]_0^2 = \frac{8}{3} - 8 = -\frac{16}{3}.$$

The curve is below the axis on this interval, so the area is $\dfrac{16}{3}$ square units.

## A curve that crosses the axis

When the curve crosses the axis inside the interval, split the region at the crossing. Find
the size of each piece, then add them.

To find where the curve crosses, solve $f(x) = 0$.

**Example 3.** Find the total area of the region bounded by $y = x^2 - 4$ and the $x$-axis
between $x = 0$ and $x = 3$.

The curve crosses where $x^2 - 4 = 0$, that is at $x = 2$. Split there.

From $x = 0$ to $x = 2$ the curve is below the axis:

$$\int_0^2 (x^2 - 4)\,dx = -\frac{16}{3},$$

so the area of that piece is $\dfrac{16}{3}$.

From $x = 2$ to $x = 3$ the curve is above the axis:

$$\int_2^3 (x^2 - 4)\,dx = \left[\frac{x^3}{3} - 4x\right]_2^3
= (9 - 12) - \left(\frac{8}{3} - 8\right) = -3 + \frac{16}{3} = \frac{7}{3}.$$

Add the two sizes:

$$\frac{16}{3} + \frac{7}{3} = \frac{23}{3}.$$

The total area is $\dfrac{23}{3}$ square units.

**Example 4.** For $y = x^2 - 2x$, work out the signed integral from $x = 0$ to $x = 3$ and
the total area on the same interval.

The curve crosses the axis at $x = 0$ and $x = 2$. The signed integral over the whole
interval is

$$\int_0^3 (x^2 - 2x)\,dx = \left[\frac{x^3}{3} - x^2\right]_0^3 = (9 - 9) - 0 = 0.$$

The signed integral is zero, because the two pieces cancel. As areas they do not cancel.
Each piece has size $\dfrac{4}{3}$:

$$\int_0^2 (x^2 - 2x)\,dx = -\frac{4}{3}, \qquad
\int_2^3 (x^2 - 2x)\,dx = \frac{4}{3}.$$

The total area is $\dfrac{4}{3} + \dfrac{4}{3} = \dfrac{8}{3}$ square units. A signed
integral of zero does not mean the region has no area.

## The chapter problem

The tank's rate is $r(t) = 12t - 3t^2$ litres per minute. Suppose the same model runs on to
$t = 6$ minutes. Between $t = 4$ and $t = 6$ the rate is negative, so the graph lies below
the axis:

$$\int_4^6 (12t - 3t^2)\,dt = \Big[6t^2 - t^3\Big]_4^6 = (216 - 216) - (96 - 64) = -32.$$

The tank loses $32$ litres over those two minutes. The area of the region below the axis is
$32$ square units, the size of the integral.

> **Watch out.** Three mistakes are common.
>
> **Adding the signed integrals instead of the sizes.** If a region crosses the axis, the
> negative piece cancels part of the positive one. Take the size of each piece first, then
> add.
>
> **Forgetting to find the crossing.** Without solving $f(x) = 0$ you do not know where to
> split. A curve can cross more than once, and each crossing is a split.
>
> **Reporting a negative area.** An area is a size, so it is never negative. If your answer
> has a minus sign, you have reported a signed integral instead.
>
> **Re-check:** sketch the curve, mark the crossings, and check that each piece lies wholly
> above or wholly below the axis.

## Progress check

Back to the chapter problem. The tank's rate is $r(t) = 12t - 3t^2$ litres per minute.

Work out $\displaystyle\int_4^6 r(t)\,dt$. Say what the value means for the tank, and work
out the area of the region between the graph of $r$ and the $t$-axis from $t = 4$ to
$t = 6$.

Keep both numbers. The Review adds the two regions together.

## You should now be able to

- find the area between a curve and the $x$-axis when the curve does not cross it;
- find where a curve crosses the $x$-axis by solving $f(x) = 0$;
- split a region at each crossing and find the size of each piece;
- add the sizes to get the total area;
- explain the difference between a signed integral and a total area.
