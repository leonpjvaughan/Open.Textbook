---
title: 'Chapter 9: Review'
chapter: 9
kind: review
---

# Chapter 9: Review

## The chapter problem, solved

### The landing drone

The drone starts $40$ metres above the pad, and its height is

$$
h(t) = 40e^{-t/4} - 2t
$$

metres, $t$ seconds after the descent begins. It lands when $h(t) = 0$.

**Step 1. Bracket the landing time.** Substitute $t = 5$ and $t = 6$:

$$
h(5) = 40e^{-1.25} - 10 = 1.4602 > 0,
\qquad
h(6) = 40e^{-1.5} - 12 = -3.0748 < 0.
$$

The sign changes and $h$ is continuous, so the landing time lies between $5$ and
$6$ seconds. The first-contact prediction is settled: the drone lands before
$6$ seconds.

**Step 2. Differentiate.** The derivative is

$$
h'(t) = -10e^{-t/4} - 2.
$$

**Step 3. Iterate with Newton–Raphson.** Use
$t_{n+1} = t_n - \dfrac{h(t_n)}{h'(t_n)}$:

$$
t_0 = 5,
$$

$$
t_1 = 5 - \frac{1.4602}{-4.8650} = 5.3001,
$$

$$
t_2 = 5.3001 - \frac{0.0315}{-4.6579} = 5.3069,
\qquad
t_3 = 5.3069 - \frac{0.00002}{-4.6535} = 5.3069.
$$

The landing time is $5.307$ seconds to three decimal places.

**Step 4. Interpret the answer.** The rotors stop after about $5.3$ seconds. The
third decimal place comes from the model, not from the real landing. Air
movement, the shape of the drone and the exact start of the timing all change the
landing by more than $0.001$ seconds, so the extra digits do not describe the
real event.

### The river survey

The engineer records the depth every two metres across a twelve metre channel.

| Distance across (m) | $0$ | $2$ | $4$ | $6$ | $8$ | $10$ | $12$ |
|---|---|---|---|---|---|---|---|
| Depth (m) | $0$ | $1.2$ | $2.5$ | $3.1$ | $2.4$ | $0.9$ | $0$ |

**Step 1. Estimate the area.** The readings are equally spaced with strip width
$h = 2$ and the interior depths add to $10.1$. The trapezium rule gives the area
$A$:

$$
A \approx \frac{2}{2}\Bigl[0 + 0 + 2(10.1)\Bigr] = 20.2
$$

square metres. This is smaller than the rectangle $12 \times 2 = 24$, so the
first-contact prediction is settled the other way.

**Step 2. Give the limits.** On each strip, take the smaller and the larger of
its two readings:

$$
A_{\text{lower}} = 2(0 + 1.2 + 2.5 + 2.4 + 0.9 + 0) = 14.0,
$$

$$
A_{\text{upper}} = 2(1.2 + 2.5 + 3.1 + 3.1 + 2.4 + 0.9) = 26.4.
$$

The true area lies between $14.0$ and $26.4$ square metres. The estimate $20.2$
sits inside the limits.

**Step 3. Find the flow rate.** The water flows at about $0.8$ metres per
second. The flow rate $Q$ is the area multiplied by the speed:

$$
Q \approx 20.2 \times 0.8 = 16.16.
$$

The flow rate is about $16$ cubic metres per second, or $16$ m³/s.

**Step 4. Say what the answer means.** The area and the flow rate are estimates.
The survey measured the depth at six points, and the depth between them is
unknown. A second survey with more readings would change the number. The model
also assumes that the speed is the same everywhere across the channel, which a
real river does not guarantee.

## Mixed practice — choose the method first

For each question, say which method you will use before you calculate. The items
mix this chapter with earlier chapters.

:::problems chapter-09-review

:::answers chapter-09-review

## What you can now do

- bracket a root by change of sign, and narrow the bracket toward an answer;
- explain how the change-of-sign test can fail;
- use a recurrence relation $x_{n+1} = g(x_n)$ to find a root approximately;
- draw and interpret cobweb and staircase diagrams;
- use Newton–Raphson, and explain where the formula comes from;
- show that a recurrence is Newton–Raphson for a chosen function;
- explain how a zero derivative, a cycle or a distant start makes a method fail;
- estimate an area with the trapezium rule, from a formula or from a table;
- use the second derivative to decide the direction of the error;
- give lower and upper limits for an area using rectangles;
- choose a numerical method for a problem in context, and give the answer with
  its units and its accuracy.

## Your relevance reflection

Return to the prompt in the chapter opener: *a quantity that had no simple
formula*. Write the quantity again. Now add three things you could not have said
before this chapter: how to turn the quantity into an equation, how to find a
value by repeating a calculation, and how to estimate an area from readings.
Finish with one sentence about a measurement you would now handle differently.
