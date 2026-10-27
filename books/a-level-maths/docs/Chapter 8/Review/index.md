---
title: 'Chapter 8: Review'
chapter: 8
kind: review
---

# Chapter 8: Review

## The chapter problem, solved

### The curved window

The window is the region enclosed between the curve $y = x^2$ and the line
$y = x + 2$.

**Step 1. Find the crossing points.** Set the two expressions equal:

$$
x^2 = x + 2,
\qquad
x^2 - x - 2 = 0,
\qquad
(x - 2)(x + 1) = 0.
$$

The edges cross at $x = -1$ and $x = 2$.

**Step 2. Decide which edge is upper.** Test $x = 0$: the line gives $2$ and the
curve gives $0$. The line is the upper edge between the crossings.

**Step 3. Integrate the height.** The height of the glass at each $x$ is
$(x + 2) - x^2$, so the area $A$ is

$$
A = \int_{-1}^{2} \left((x + 2) - x^2\right)dx
= \left[\frac{x^2}{2} + 2x - \frac{x^3}{3}\right]_{-1}^{2}.
$$

At the upper limit:

$$
\frac{4}{2} + 4 - \frac{8}{3} = 2 + 4 - \frac{8}{3} = \frac{10}{3}.
$$

At the lower limit:

$$
\frac{1}{2} - 2 + \frac{1}{3} = \frac{5}{6} - 2 = -\frac{7}{6}.
$$

Subtract:

$$
A = \frac{10}{3} - \left(-\frac{7}{6}\right)
= \frac{20}{6} + \frac{7}{6} = \frac{27}{6} = \frac{9}{2}.
$$

The glass has area $\dfrac{9}{2}$ square units, or $4.5$ square units.

### The cooling drink

The coffee starts at $90$°C in a room at $20$°C, and after $20$ minutes it is
$55$°C. The temperature $T$ satisfies

$$
\frac{dT}{dt} = -k(T - 20).
$$

where $k$ is a positive constant.

**Step 1. Separate and integrate.**

$$
\int \frac{1}{T - 20}dT = \int -kdt,
\qquad
\ln|T - 20| = -kt + C.
$$

Exponentiate and write $A = e^C$:

$$
T = 20 + Ae^{-kt}.
$$

**Step 2. Use the initial temperature.** At $t = 0$, $T = 90$, so
$90 = 20 + A$ and $A = 70$:

$$
T = 20 + 70e^{-kt}.
$$

**Step 3. Use the second temperature to find $k$.** At $t = 20$, $T = 55$:

$$
55 = 20 + 70e^{-20k},
\qquad
e^{-20k} = \frac{35}{70} = \frac{1}{2},
\qquad
k = \frac{\ln 2}{20}.
$$

So

$$
T = 20 + 70e^{-(\ln 2)t/20}.
$$

**Step 4. Find the temperature after 40 minutes.** The exponent is
$-40 \times \dfrac{\ln 2}{20} = -2\ln 2$, so

$$
T = 20 + 70e^{-2\ln 2} = 20 + 70 \times \frac{1}{4} = 20 + 17.5 = 37.5 \text{°C}.
$$

**Step 5. Describe the long run.** As $t \to \infty$ the exponential term tends
to $0$, so the temperature approaches $20$°C, the room temperature. The model
predicts that the coffee never quite reaches room temperature in finite time.

**Limitations.** The model assumes that $k$ stays constant, that the room stays
at $20$°C, and that the coffee is well mixed at every moment. It also assumes a
single smooth temperature, but a real cup has warmer and cooler regions. Once the
coffee is close to room temperature the model adds little, because the change is
smaller than the natural variation in the measurement.

## Mixed practice — choose the method first

For each question, say which method you will use before you calculate: a
standard integral, a substitution, integration by parts or partial fractions.
The items mix this chapter with earlier chapters.

:::problems chapter-08-review

:::answers chapter-08-review

## What you can now do

- use the Fundamental Theorem of Calculus to evaluate a definite integral;
- find an antiderivative and use the constant of integration;
- integrate powers, exponentials, trigonometric functions and $\dfrac{1}{x}$;
- find the area under a curve, including where the curve crosses the axis;
- find the area between two curves, splitting where they cross;
- explain a definite integral as the limit of a sum;
- integrate by substitution and by parts;
- integrate a rational function using partial fractions;
- solve a separable first-order differential equation;
- interpret a differential-equation solution and name its limitations.

## Your relevance reflection

Return to the prompt in the chapter opener: *a quantity that grows or shrinks*.
Write the quantity again. Now add three things you could not have said before
this chapter: how the total is built from many small pieces, how to find the
total from the rate, and how to describe what happens in the long run. Finish
with one sentence about a rate you would now measure, and the total you would
calculate from it.
