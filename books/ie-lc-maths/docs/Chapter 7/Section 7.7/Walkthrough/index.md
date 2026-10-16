---
title: 7.7 Rates of change in context — Learn
chapter: 7
chapter_title: Differentiation
section: '7.7'
section_title: Rates of change in context
tier: O
refs:
- '5.2'
kind: walkthrough
---

# 7.7 Rates of change in context — Learn

**Prerequisites:** Sections 7.1 to 7.5 — the rules of differentiation.

**Objectives:** read a derivative as a rate of change with units; find an instantaneous rate
at a point; compare an average rate over an interval with an instantaneous rate.

By the end of this section you can use a derivative to answer a question about how fast
something changes, and say what the units of the answer are.

## The derivative is a rate of change

When $y$ depends on $x$, the derivative $\dfrac{dy}{dx}$ is the rate at which $y$ changes as
$x$ changes. The units of the derivative are the units of $y$ divided by the units of $x$.

- If $s$ is a distance in metres and $t$ is a time in seconds, then $\dfrac{ds}{dt}$ is a
  velocity in metres per second.
- If $V$ is a volume in litres and $t$ is a time in minutes, then $\dfrac{dV}{dt}$ is a rate
  in litres per minute.
- If $C$ is a cost in euro and $n$ is a number of items, then $\dfrac{dC}{dn}$ is a rate in
  euro per item.

**Example 1.** A stone falls so that its distance from the start after $t$ seconds is
$s(t) = t^3 - 6t^2 + 9t$ metres. Find the velocity and its value at $t = 2$.

Velocity is the rate of change of distance:

$$s'(t) = 3t^2 - 12t + 9 \text{ metres per second.}$$

At $t = 2$:

$$s'(2) = 3(4) - 12(2) + 9 = 12 - 24 + 9 = -3 \text{ metres per second.}$$

The negative sign means the stone is moving back towards its start at that instant.

## Average rate and instantaneous rate

An **average rate** is spread over an interval. It is the total change divided by the time
taken. An **instantaneous rate** is the derivative at a single moment.

**Example 2.** For the tank, $V(t) = 12t^2 - t^3$ litres. Compare the average rate over the
first four minutes with the instantaneous rate at $t = 4$.

The average rate is the total change divided by the time:

$$\frac{V(4) - V(0)}{4} = \frac{128 - 0}{4} = 32 \text{ litres per minute.}$$

The instantaneous rate is the derivative at $t = 4$. Since $V'(t) = 24t - 3t^2$,

$$V'(4) = 24(4) - 3(16) = 48 \text{ litres per minute.}$$

The instantaneous rate is larger. The tank fills more quickly at the end of the four minutes
than on average over them.

**Example 3.** A balloon is a sphere of radius $r$ cm, with volume
$V = \dfrac{4}{3}\pi r^3$. Find $\dfrac{dV}{dr}$ and its value at $r = 3$.

$$\frac{dV}{dr} = 4\pi r^2 \qquad \frac{dV}{dr}\bigg|_{r=3} = 4\pi(9) = 36\pi \approx 113.1$$

The units are cubic centimetres per centimetre. The value $4\pi r^2$ is the surface area of
the sphere, which is not a coincidence: a small increase in radius adds a thin shell whose
volume is the surface area times the thickness.

> **Watch out.** Do not confuse the value of the function with the value of its derivative.
> The tank holds $128$ litres at $t = 4$, and it is filling at $48$ litres per minute at
> that moment. Those are two different numbers with two different units. Write the units
> beside every rate, and the meaning of the answer becomes clear.

## Progress check

Back to the chapter problem. The tank volume is $V(t) = 12t^2 - t^3$ litres.

Work out the instantaneous rate $V'(4)$ and the average rate over the first four minutes.
State both with their units, and say which is larger and why.

Keep both numbers. The instantaneous rate at $t = 4$ is the greatest rate, and Section 7.8
explains why.

## You should now be able to

- state the units of a derivative from the units of the two quantities;
- find an instantaneous rate by differentiating and substituting;
- find an average rate by dividing the total change by the interval;
- explain the difference between an average rate and an instantaneous rate.
