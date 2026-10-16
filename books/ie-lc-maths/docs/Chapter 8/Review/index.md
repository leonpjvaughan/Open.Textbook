---
title: 'Chapter 8: Review'
chapter: 8
kind: review
---

# Chapter 8: Review

## The chapter problem, solved

**How much water does the tank collect?** Rain runs off a roof into a tank. The water enters
at a rate

$$r(t) = 12t - 3t^2 \text{ litres per minute}, \qquad 0 \le t \le 4.$$

The tank is empty at $t = 0$.

**The volume function.** The volume is an antiderivative of the rate, because the rate is
the derivative of the volume:

$$V(t) = \int (12t - 3t^2)\,dt = 6t^2 - t^3 + C.$$

The tank is empty at $t = 0$, so $V(0) = 0$ and $C = 0$. The volume after $t$ minutes is

$$V(t) = 6t^2 - t^3 \text{ litres}.$$

**The water collected.** The definite integral gives the total volume that entered:

$$\int_0^4 (12t - 3t^2)\,dt = \Big[6t^2 - t^3\Big]_0^4 = (96 - 64) - 0 = 32 \text{ litres}.$$

The tank holds $32$ litres after four minutes. The same number is the area under the graph
of $r$ between $t = 0$ and $t = 4$.

**When the water enters fastest.** The rate is itself a function, and it is greatest where
its derivative is zero. Since

$$r'(t) = 12 - 6t,$$

$r'(t) = 0$ gives $t = 2$. The second derivative is $r''(t) = -6$, which is negative, so
this point is a maximum. The greatest rate is

$$r(2) = 12(2) - 3(4) = 24 - 12 = 12 \text{ litres per minute}.$$

The water enters fastest at $t = 2$ minutes, at $12$ litres per minute.

**The average rate.** The average rate is the total volume divided by the time:

$$\frac{1}{4}\int_0^4 (12t - 3t^2)\,dt = \frac{32}{4} = 8 \text{ litres per minute}.$$

The average is $8$, below the greatest rate of $12$. The rate is not constant, so the
average and the greatest value are different numbers.

**What happens if the rain continues.** Suppose the same rate model runs on to $t = 6$
minutes. Between $t = 4$ and $t = 6$ the rate is negative, so the volume falls:

$$\int_4^6 (12t - 3t^2)\,dt = \Big[6t^2 - t^3\Big]_4^6 = 0 - 32 = -32 \text{ litres}.$$

The tank loses $32$ litres over those two minutes and returns to empty. The signed integral
from $0$ to $6$ is $32 - 32 = 0$. The area below the axis between $t = 4$ and $t = 6$ is
$32$, the same size as the area above it, and the total area of the two regions is $64$.

**The answer.** The tank collects $32$ litres in the first four minutes. The water enters
fastest at $t = 2$ minutes, at $12$ litres per minute, and the average rate over the four
minutes is $8$ litres per minute.

## Mixed practice — choose the method first

Work through these without notes. For each one, decide **what is being asked** and say why,
before you calculate. Several come from earlier chapters, and some need a choice between
differentiation and integration.

1. Find $\displaystyle\int (4x^3 - 6x + 1)\,dx$.
2. Find $\displaystyle\int \frac{1}{x^2}\,dx$.
3. Evaluate $\displaystyle\int_1^4 2x\,dx$.
4. Evaluate $\displaystyle\int_0^2 (3x^2 - 4x)\,dx$ and explain the sign of your answer.
5. Find the area of the region bounded by $y = x^2 - 4$, the $x$-axis and the lines
   $x = 0$ and $x = 3$.
6. Differentiate $y = (3x + 1)^4$. Then find $\displaystyle\int (3x + 1)^4\,dx$ by
   substitution. Say what each answer tells you.
7. Differentiate $y = x^3 - 6x^2 + 9x$ and find its stationary points.
8. The speed of a cyclist after $t$ minutes is $v(t) = 10 - 2t$ kilometres per hour. Find
   the distance travelled in the first three minutes.
9. A tap delivers water at $r(t) = 3t^2$ litres per minute. Find the volume delivered
   between $t = 0$ and $t = 3$ minutes, and the average rate over that time.
10. Find the sum of the first $20$ terms of the arithmetic sequence $4, 9, 14, \dots$.

## What you can now do

- recognise integration as the reverse of differentiation;
- find an antiderivative of a power, a sum and a constant multiple, and add the constant
  of integration;
- evaluate a definite integral and read it as a signed area;
- state the Fundamental Theorem of Calculus and use it on the standard functions;
- find the area between a curve and the $x$-axis, splitting where the curve crosses the
  axis;
- use a substitution to integrate a function of a function, changing the limits for a
  definite integral;
- find the average value of a function over an interval;
- read a definite integral as accumulated change in a real context.

## Thinking back

Look at the quantity you chose at the start of the chapter — the bath, the phone, the
queue, the rain on the garden.

Write down the rate and the total. Say which one you started with and which one you worked
out. If the rate is not constant, describe its shape: does it rise and fall, grow without
bound, or settle?

Then answer this: for your quantity, would the average rate over a long time be a useful
number, or would the greatest rate matter more? Say why. Choosing which number answers the
question is part of the mathematics, and a total is not always the number a decision needs.
