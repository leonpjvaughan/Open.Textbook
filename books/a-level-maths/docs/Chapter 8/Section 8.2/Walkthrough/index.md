---
title: 8.2 Definite integrals and the area under a curve — Learn
chapter: 8
chapter_title: Integration
section: '8.2'
section_title: Definite integrals and the area under a curve
dfe:
- H3
kind: walkthrough
---

# 8.2 Definite integrals and the area under a curve — Learn

**Prerequisites:** the standard integrals and the Fundamental Theorem of
Calculus from Section 8.1.

**By the end of this section you can:** evaluate a definite integral; use a
definite integral to find the area under a curve; and explain the sign of a
definite integral when the curve lies below the horizontal axis.

## 1. Evaluating a definite integral

A definite integral has a lower limit and an upper limit. To evaluate it, find an
antiderivative, put it in square brackets, and subtract the value at the lower
limit from the value at the upper limit:

$$
\int_a^b f(x)dx = \Big[F(x)\Big]_a^b = F(b) - F(a).
$$

The constant of integration never appears, because it cancels in the subtraction.

**Example 1.** Evaluate $\displaystyle\int_1^4 (2x + 1)dx$.

An antiderivative of $2x + 1$ is $x^2 + x$. Then

$$
\int_1^4 (2x + 1)dx = \Big[x^2 + x\Big]_1^4
= (16 + 4) - (1 + 1) = 20 - 2 = 18.
$$

**Example 2.** Evaluate $\displaystyle\int_0^2 x^3dx$.

$$
\int_0^2 x^3dx = \left[\frac{x^4}{4}\right]_0^2
= \frac{16}{4} - 0 = 4.
$$

## 2. Area under a curve

When a curve lies above the horizontal axis, the definite integral is the area
between the curve and the axis. The area is measured from the lower limit to the
upper limit.

**Example 3.** Find the area under the curve $y = 4 - x^2$ between $x = 0$ and
$x = 2$.

The curve is above the axis throughout this interval. The area is

$$
A = \int_0^2 (4 - x^2)dx = \left[4x - \frac{x^3}{3}\right]_0^2
= \left(8 - \frac{8}{3}\right) - 0 = \frac{16}{3}.
$$

So the area is $\dfrac{16}{3}$ square units.

The area has units of square units because it is a product of a height and a
width. If the axes are labelled in metres, the area is in square metres.

## 3. When the curve dips below the axis

A definite integral measures **signed** area: area above the axis counts as
positive, and area below the axis counts as negative.

**Example 4.** Evaluate $\displaystyle\int_0^3 (x^2 - 4)dx$ and explain the
sign of the answer.

$$
\int_0^3 (x^2 - 4)dx = \left[\frac{x^3}{3} - 4x\right]_0^3
= (9 - 12) - 0 = -3.
$$

The answer is negative because the curve $y = x^2 - 4$ lies below the axis
between $x = 0$ and $x = 2$. More area lies below the axis than above it.

To find the total area, split the integral where the curve crosses the axis and
take the size of each part. For the same curve,

$$
\text{total area} = \left|\int_0^2 (x^2 - 4)dx\right| + \int_2^3 (x^2 - 4)dx.
$$

The first integral is $-\dfrac{16}{3}$ and the second is $\dfrac{7}{3}$, so the
total area is $\dfrac{16}{3} + \dfrac{7}{3} = \dfrac{23}{3}$ square units.

> **Watch out.** Three mistakes are common.
>
> **Forgetting to subtract the lower limit.** The value at the lower limit is
> subtracted, not ignored. Writing $\int_1^4 (2x+1)dx = 20$ drops the $-2$ and
> gives the wrong area.
>
> **Reversing the limits in the subtraction.** Evaluate as
> $F(\text{upper}) - F(\text{lower})$. Swapping them changes the sign of the
> whole answer.
>
> **Treating a negative integral as a negative area.** Signed area and everyday
> area are different. A negative integral means the region lies below the axis.
> For the everyday area, split at each crossing and add the sizes.
> **Re-check:** sketch the curve over the interval and see where it is above or
> below the axis before you decide whether the integral is the area.

## 4. Try it: the area under a curve

**Predict first.** The figure shows $y = 4 - x^2$ with a shaded region. Before
you move a control, predict whether the shaded area grows faster when the right
edge moves near $x = 0$ or near $x = 2$. Write your prediction down.

:::figure ch8-definite-area

**Test.** Set the lower limit to $0$ and move the upper limit slowly from $0$ to
$2$. Watch the readout as the shaded region grows.

**Explain.** Write two sentences. The first explains why the area grows quickly
at the start and slowly at the end. The second connects the height of the curve
to the rate at which the area grows.

## Progress check

Return to the window in the chapter problem. Its lower edge is the line
$y = x + 2$, and the two edges cross at $x = -1$ and $x = 2$.

1. Sketch the line $y = x + 2$ between $x = -1$ and $x = 2$.
2. Find the area under the line between these two values, using
   $\displaystyle\int_{-1}^2 (x + 2)dx$.
3. Write down the area under the curve $y = x^2$ between the same two values.
4. Explain how the two areas give the area of the glass.

## You should now be able to

- evaluate a definite integral using square brackets;
- explain why the constant of integration cancels;
- find the area under a curve that lies above the axis;
- explain the sign of a definite integral where the curve crosses the axis;
- split an interval to find a total area.
