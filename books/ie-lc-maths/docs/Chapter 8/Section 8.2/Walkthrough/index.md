---
title: 8.2 The definite integral and area — Learn
chapter: 8
chapter_title: Integration
section: '8.2'
section_title: The definite integral and area
tier: O
refs:
- '5.2'
kind: walkthrough
---

# 8.2 The definite integral and area — Learn

**Prerequisites:** Section 8.1 — antiderivatives and the constant of integration.

**Objectives:** read the notation for a definite integral; evaluate a definite integral
using an antiderivative; interpret a negative value as signed area; find the area under a
curve.

By the end of this section you can add a rate up over an interval, and read the answer as
an area.

## Adding up a rate

A definite integral has a lower limit and an upper limit. It adds a quantity up between two
values of the variable, and it is written

$$\int_a^b f(x)\,dx.$$

The number $a$ is the **lower limit** and $b$ is the **upper limit**. Unlike an indefinite
integral, the answer is a single number.

To see why this is an area, picture the region between the graph of $f$ and the $x$-axis,
from $x = a$ to $x = b$. Cut the region into thin vertical strips. Each strip is almost a
rectangle, with height $f(x)$ and a very small width.

Add the areas of the strips and you get the area of the region. Use more, thinner strips
and the estimate gets closer. The definite integral is the value the total settles on as
the strips become infinitely thin.

**Predict, then test.** Predict what happens to the total area of the strips when you double
the number of strips. Write your prediction down. Then test it: for the region under
$y = x^2$ from $x = 0$ to $x = 1$, estimate the area with $4$ strips and then with $8$. Each
answer should get closer to $\dfrac{1}{3}$. Finish by explaining in one sentence why more
strips give a better estimate.

## Evaluating a definite integral

An antiderivative does all the work. If $F$ is an antiderivative of $f$, then

$$\int_a^b f(x)\,dx = \Big[F(x)\Big]_a^b = F(b) - F(a).$$

The square brackets mark the antiderivative, with the lower limit below and the upper limit
above. Evaluate at the top, evaluate at the bottom, and subtract.

**Example 1.** Evaluate $\displaystyle\int_1^3 2x\,dx$.

An antiderivative of $2x$ is $x^2$, so

$$\int_1^3 2x\,dx = \Big[x^2\Big]_1^3 = 3^2 - 1^2 = 9 - 1 = 8.$$

**Example 2.** Evaluate $\displaystyle\int_0^2 x^3\,dx$.

$$\int_0^2 x^3\,dx = \left[\frac{x^4}{4}\right]_0^2 = \frac{16}{4} - 0 = 4.$$

No constant of integration appears. It would add $C$ at the top and subtract $C$ at the
bottom, so it always cancels.

**Example 3.** Evaluate $\displaystyle\int_0^1 (3x^2 - 2x + 1)\,dx$.

$$\int_0^1 (3x^2 - 2x + 1)\,dx = \Big[x^3 - x^2 + x\Big]_0^1 = (1 - 1 + 1) - 0 = 1.$$

## Signed area

A definite integral measures **signed** area. A part of the region above the axis counts as
positive. A part below the axis counts as negative.

**Example 4.** Evaluate $\displaystyle\int_0^3 (x^2 - 4)\,dx$.

$$\int_0^3 (x^2 - 4)\,dx = \left[\frac{x^3}{3} - 4x\right]_0^3 = (9 - 12) - 0 = -3.$$

The value is negative. The curve crosses the axis at $x = 2$. Between $x = 0$ and $x = 2$
the curve lies below the axis, and that part of the region counts as negative. Section 8.4
finds the actual area of such a region.

## The chapter problem

The tank fills at $r(t) = 12t - 3t^2$ litres per minute. The volume that entered between
$t = 0$ and $t = 4$ is the definite integral of the rate:

$$\int_0^4 (12t - 3t^2)\,dt = \Big[6t^2 - t^3\Big]_0^4 = (96 - 64) - 0 = 32 \text{ litres}.$$

The tank holds $32$ litres after four minutes. The same number is the area under the graph
of $r$ between the two limits.

> **Watch out.** Three mistakes are common.
>
> **Subtracting the wrong way round.** The rule is $F(b) - F(a)$, top minus bottom. Writing
> $F(a) - F(b)$ gives the answer with the wrong sign.
>
> **Treating a negative integral as an error.** A negative value means the region lies
> below the axis. It is a correct answer to the integral, and Section 8.4 shows how to turn
> it into an area.
>
> **Adding a constant of integration.** In a definite integral the constant cancels, so
> leave it out.
>
> **Re-check:** after integrating, differentiate your antiderivative and compare it with the
> function you started with.

## Progress check

Back to the chapter problem. The tank's rate is $r(t) = 12t - 3t^2$ litres per minute.

Work out $\displaystyle\int_0^4 r(t)\,dt$ and say what the value means. Then state what the
value would mean if it came out negative.

Keep your answer. Section 8.4 follows the model past $t = 4$, where the rate turns negative.

## You should now be able to

- read the lower and upper limits of a definite integral;
- explain why the definite integral is the area under a curve;
- evaluate a definite integral using an antiderivative;
- explain why no constant of integration appears;
- interpret a negative value as a region below the axis.
