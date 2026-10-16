---
title: 8.6 Average value and accumulated change — Learn
chapter: 8
chapter_title: Integration
section: '8.6'
section_title: Average value and accumulated change
tier: O
refs:
- '5.2'
kind: walkthrough
---

# 8.6 Average value and accumulated change — Learn

**Prerequisites:** Sections 8.2 and 8.4 — the definite integral and area.

**Objectives:** find the average value of a function over an interval; read a definite
integral as accumulated change; use both in a real context.

By the end of this section you can answer a question about a total or an average rate, and
say what the answer means.

## The average value of a function

A function that changes has many values over an interval. Its **average value** is the
single height that would give the same area.

Picture the region between the graph and the $x$-axis, from $a$ to $b$. Now picture a
rectangle on the same interval with the same area. The height of that rectangle is the
average value, because the rectangle smooths the region out to one level.

The area of a rectangle is height times width, so

$$\text{average value} = \frac{1}{b - a}\int_a^b f(x)\,dx.$$

Divide the area by the width of the interval. That is the whole formula.

**Example 1.** Find the average value of $f(x) = x^2$ over $0 \le x \le 3$.

$$\text{average} = \frac{1}{3}\int_0^3 x^2\,dx
= \frac{1}{3}\left[\frac{x^3}{3}\right]_0^3 = \frac{1}{3} \times 9 = 3.$$

The average value is $3$. Notice that $f(1) = 1$ and $f(3) = 9$, so the average sits between
the values at the ends.

**Example 2.** The chapter problem's tank fills at $r(t) = 12t - 3t^2$ litres per minute.
Find the average rate over the first four minutes.

$$\text{average rate} = \frac{1}{4}\int_0^4 (12t - 3t^2)\,dt
= \frac{1}{4}\Big[6t^2 - t^3\Big]_0^4 = \frac{32}{4} = 8.$$

The average rate is $8$ litres per minute.

## Accumulated change

If a quantity $Q$ changes at a rate $Q'(t)$, then the definite integral of the rate is the
change in the quantity:

$$\int_a^b Q'(t)\,dt = Q(b) - Q(a).$$

This is the fundamental theorem of calculus read as a sentence about a real quantity. The
integral adds up all the little changes, and the total is the difference between the end
value and the start value.

**Example 3.** A car's speed after $t$ seconds is $v(t) = 6t$ metres per second. Find the
distance travelled in the first four seconds.

Distance is the accumulated change of position, so integrate the speed:

$$\int_0^4 6t\,dt = \Big[3t^2\Big]_0^4 = 48 \text{ metres}.$$

The car travels $48$ metres. Its average speed is $\dfrac{48}{4} = 12$ metres per second.

**Example 4.** A tank drains at a steady $4$ litres per minute. Find the change in volume
over $5$ minutes.

The rate is negative because the volume is falling, so the rate is $-4$ litres per minute:

$$\int_0^5 (-4)\,dt = \Big[-4t\Big]_0^5 = -20.$$

The change is $-20$ litres. The minus sign records that the volume fell.

**Predict, then test.** For the chapter problem's tank, predict whether the average rate
over the four minutes is closer to the greatest rate or to the rate at the start. Write your
prediction down. Then work out the average rate and compare it with the two values. Finish
by explaining in one sentence why the average is below the greatest rate.

> **Watch out.** Three mistakes are common.
>
> **Dividing by the wrong width.** The formula divides by $b - a$, the width of the
> interval. Dividing by $b$ alone gives a different number.
>
> **Forgetting to divide at all.** The integral is the area, not the average. The average is
> the area divided by the width.
>
> **Losing the sign of a rate.** A rate that is negative means the quantity is falling, and
> the accumulated change is negative. The sign carries the meaning.
>
> **Re-check:** for an average, check that the answer lies between the smallest and largest
> values of the function on the interval.

## Progress check

Back to the chapter problem. The tank's rate is $r(t) = 12t - 3t^2$ litres per minute, and
the tank is empty at $t = 0$.

Work out the average rate of flow over the first four minutes, and say how the total volume
of $32$ litres is recovered from that average. Then say why the average rate is not equal to
the rate at $t = 2$ minutes.

Keep your answer. The Review brings the total, the greatest rate and the average rate
together.

## You should now be able to

- state and use the formula for the average value of a function over an interval;
- explain why the average value is the area divided by the width;
- read a definite integral as an accumulated change;
- find a distance from a speed, or a volume from a rate;
- interpret the sign of an accumulated change in context.
