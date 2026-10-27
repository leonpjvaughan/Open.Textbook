---
title: 'Chapter 7: Review'
chapter: 7
kind: review
---

# Chapter 7: Review

## The chapter problem, solved

### The open box

A sheet of card measures $16$ cm by $10$ cm. Four equal squares of side $x$ cm
are cut from the corners, and the sides are folded up to make an open box.

**Step 1. Write the volume.** The base measures $(16 - 2x)$ cm by
$(10 - 2x)$ cm, and the height is $x$ cm, so

$$
V = x(16 - 2x)(10 - 2x) = 4x^3 - 52x^2 + 160x.
$$

**Step 2. Differentiate and solve.** Differentiate with the power rule to find
the derivative $\dfrac{dV}{dx}$:

$$
\frac{dV}{dx} = 12x^2 - 104x + 160 = 4(3x^2 - 26x + 40).
$$

Set $\dfrac{dV}{dx} = 0$ and solve the quadratic:

$$
3x^2 - 26x + 40 = 0,
\qquad
x = \frac{26 \pm \sqrt{676 - 480}}{6} = \frac{26 \pm 14}{6}.
$$

So $x = \dfrac{40}{6} = \dfrac{20}{3}$ or $x = \dfrac{12}{6} = 2$.

**Step 3. Reject the impossible root.** The card is $10$ cm wide, so $2x$ cannot
be larger than $10$. The root $x = \dfrac{20}{3}$ gives $2x = \dfrac{40}{3} > 10$,
so it is impossible. Only $x = 2$ remains.

**Step 4. Confirm the maximum.** The second derivative is

$$
\frac{d^2V}{dx^2} = 24x - 104.
$$

At $x = 2$ this is $48 - 104 = -56 < 0$, so the point is a maximum.

**Step 5. Find the greatest volume.**

$$
V(2) = 4(8) - 52(4) + 160(2) = 32 - 208 + 320 = 144 \text{ cm}^3.
$$

The box is largest when the squares have side $2$ cm, and the greatest volume is
$144$ cm$^3$.

### The rising balloon

A spherical balloon is inflated so that its volume grows at $100$ cm$^3$ per
second. Its volume $V = \dfrac{4}{3}\pi r^3$, where $r$ is its radius, so

$$
\frac{dV}{dr} = 4\pi r^2.
$$

The chain rule gives $\dfrac{dV}{dt} = \dfrac{dV}{dr} \times \dfrac{dr}{dt}$.
Substitute $\dfrac{dV}{dt} = 100$ and rearrange:

$$
\frac{dr}{dt} = \frac{100}{4\pi r^2} = \frac{25}{\pi r^2}.
$$

When $r = 5$ cm:

$$
\frac{dr}{dt} = \frac{25}{25\pi} = \frac{1}{\pi} \approx 0.318 \text{ cm/s}.
$$

When $r = 10$ cm:

$$
\frac{dr}{dt} = \frac{25}{100\pi} = \frac{1}{4\pi} \approx 0.0796 \text{ cm/s}.
$$

The radius grows more slowly as the balloon swells, because the same volume of
air spreads over a larger surface. The rate is proportional to
$\dfrac{1}{r^2}$.

## Mixed practice — choose the method first

For each question, say which rule or method you will use before you calculate.
The items mix this chapter with Chapters 1 to 6.

:::problems chapter-07-review

:::answers chapter-07-review

## What you can now do

- estimate a gradient from a shrinking chord, and explain the tangent as a
  limit;
- differentiate a whole-number power of $x$ from first principles;
- differentiate powers, exponentials, trigonometric functions and logarithms;
- find and interpret a second derivative, and test a point of inflection;
- find stationary points, classify them, and solve an optimisation problem;
- find the equation of a tangent and of a normal;
- decide where a function is increasing and where it is decreasing;
- use the product, quotient and chain rules;
- connect two rates of change, and differentiate an inverse function;
- differentiate an implicit relation and a parametric curve;
- build a differential equation from a written description.

## Your relevance reflection

Return to the prompt in the chapter opener: *a quantity that grows or shrinks*.
Write down the quantity again. Now add three things you could not have said
before this chapter: how to measure its rate of change at an instant, how to find
when that rate is zero, and how to connect its rate to the rate of something it
depends on. Finish with one sentence about a rate you would measure from now on.
