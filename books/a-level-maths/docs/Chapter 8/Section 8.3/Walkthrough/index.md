---
title: 8.3 The area between two curves — Learn
chapter: 8
chapter_title: Integration
section: '8.3'
section_title: The area between two curves
dfe:
- H3
kind: walkthrough
---

# 8.3 The area between two curves — Learn

**Prerequisites:** evaluating definite integrals and the area under a curve
from Section 8.2; solving quadratic equations and sketching graphs from
Chapters 2 and 3.

**By the end of this section you can:** find the points where two curves meet;
use those points as the limits of an integral; find the area between two curves
by integrating the upper curve minus the lower curve; and split the region when
the curves cross.

## 1. Upper curve minus lower curve

The definite integral of a height gives an area. Between two curves, the height
of the region at each value of $x$ is the difference between the two $y$-values:

$$
\text{area} = \int_a^b \big(\text{upper} - \text{lower}\big)dx.
$$

The limits $a$ and $b$ are the $x$-values where the curves meet. At those values
the two curves have the same $y$, so the height is zero and the region closes.

The upper curve is the one with the larger $y$ throughout the interval. Sketch
both curves before you decide which is which.

**Example 1.** Find the area enclosed between the curve $y = x^2$ and the line
$y = 2x$.

First find the intersections. Set $x^2 = 2x$:

$$
x^2 - 2x = 0,
\qquad
x(x - 2) = 0,
\qquad
x = 0 \text{ or } x = 2.
$$

Between $x = 0$ and $x = 2$ the line lies above the curve. Check with $x = 1$:
the line gives $2$ and the curve gives $1$. So the area is

$$
A = \int_0^2 (2x - x^2)dx = \left[x^2 - \frac{x^3}{3}\right]_0^2
= \left(4 - \frac{8}{3}\right) - 0 = \frac{4}{3}.
$$

The area is $\dfrac{4}{3}$ square units.

## 2. A horizontal lower edge

When one of the curves is a horizontal line, the difference is still upper minus
lower. The horizontal line is the lower curve.

**Example 2.** Find the area enclosed between the curve $y = 6 - x^2$ and the
line $y = 2$.

Set $6 - x^2 = 2$:

$$
x^2 = 4,
\qquad
x = -2 \text{ or } x = 2.
$$

The curve is above the line between these points, because $6 - x^2 \ge 2$ there.
So

$$
A = \int_{-2}^{2} \big((6 - x^2) - 2\big)dx = \int_{-2}^{2} (4 - x^2)dx
= \left[4x - \frac{x^3}{3}\right]_{-2}^{2} = \frac{32}{3}.
$$

The area is $\dfrac{32}{3}$ square units.

## 3. When the curves cross inside the region

Sometimes the two curves cross between the outer limits, so the upper curve
changes. The integral of upper minus lower would then subtract area that should
count twice. Split the integral at each crossing and add the pieces.

**Example 3.** Find the total area enclosed between the curve $y = x^3$ and the
line $y = x$.

Set $x^3 = x$:

$$
x^3 - x = 0,
\qquad
x(x - 1)(x + 1) = 0,
\qquad
x = -1, 0 \text{ or } 1.
$$

The two curves cross at $x = 0$, which lies inside the region. Split into two
intervals.

- Between $-1$ and $0$, the curve $y = x^3$ is above the line $y = x$ (test
  $x = -0.5$: the curve gives $-0.125$ and the line gives $-0.5$).
- Between $0$ and $1$, the line is above the curve (test $x = 0.5$).

The two regions have the same size, because the curves are odd and the picture
has rotational symmetry. So

$$
A = 2\int_0^1 (x - x^3)dx = 2\left[\frac{x^2}{2} - \frac{x^4}{4}\right]_0^1
= 2\left(\frac{1}{2} - \frac{1}{4}\right) = \frac{1}{2}.
$$

The total area is $\dfrac{1}{2}$ square units. Without the split, the integral
of $x - x^3$ from $-1$ to $1$ is $0$, which hides the region.

> **Watch out.** Three mistakes are common.
>
> **Subtracting in the wrong order.** Integrate upper minus lower. Reversing the
> order gives the negative of the correct area. Test one point between the
> limits to see which curve is higher.
>
> **Using the axes as limits instead of the intersections.** The limits are the
> points where the curves meet, unless the question states otherwise. If you use
> the wrong limits the answer describes a different region.
>
> **Not splitting where the curves cross.** A single integral from the left
> intersection to the right one can cancel a region against another. Sketch the
> region first. **Re-check:** after finding the area, ask whether it should be
> larger or smaller than the area under the higher curve alone.

## 4. Try it: how the area grows

**Predict first.** The figure shows the curve $y = x^2$ and the line $y = kx$,
with the region between them shaded. Before you move the slider, predict what
happens to the area when $k$ doubles from $1$ to $2$. Write down whether the
area doubles, more than doubles, or less than doubles.

:::figure ch8-between-curves

**Test.** Move the slider from $k = 1$ to $k = 2$ and then to $k = 3$. Read the
area each time.

**Explain.** Write two sentences. The first explains why the left intersection
stays at $x = 0$ while the right intersection moves. The second describes how the
area grows as $k$ grows.

## Progress check

Return to the window in the chapter problem. Its edges are the curve
$y = x^2$ and the line $y = x + 2$.

1. Solve $x^2 = x + 2$ to find the two crossing points.
2. Decide which edge is the upper edge between the crossings. Test one value of
   $x$ between them.
3. Write down the integral for the area of the glass.
4. Evaluate the integral to find the exact area.

## You should now be able to

- find the intersection points of two curves by solving an equation;
- identify the upper and lower curve on an interval;
- integrate upper minus lower to find the area between two curves;
- split the region where the curves cross;
- use symmetry to halve the work when a region is repeated.
