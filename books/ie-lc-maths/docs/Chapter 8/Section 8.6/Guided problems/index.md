---
title: 8.6 Average value and accumulated change — Practise with help
chapter: 8
chapter_title: Integration
section: '8.6'
section_title: Average value and accumulated change
tier: O
refs:
- '5.2'
kind: guided-problems
---

# 8.6 Average value and accumulated change — Practise with help

## Warm-up: remember

1. Evaluate $\displaystyle\int_0^3 x^2\,dx$.
2. Work out the average of $4$, $6$, $11$ and $3$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $\left[\dfrac{x^3}{3}\right]_0^3 = 9$.
2. $\dfrac{4 + 6 + 11 + 3}{4} = \dfrac{24}{4} = 6$. Add the values and divide by how many
   there are.

An average value of a function does the same job, but adds up a continuous curve instead of
a list.

</details>

## Practise with help

**1.** Find the average value of $f(x) = x^2$ over $0 \le x \le 3$.

<details markdown="1">
<summary>Hint</summary>

Divide the integral by the width of the interval, which is $3$.

<details markdown="1">
<summary>Next step</summary>

$\displaystyle\int_0^3 x^2\,dx = 9$.

<details markdown="1">
<summary>Full working</summary>

$$\text{average} = \frac{1}{3}\int_0^3 x^2\,dx = \frac{1}{3} \times 9 = 3$$

The average value is $3$.

</details>
</details>
</details>

**2.** Find the average value of $f(x) = x^3$ over $0 \le x \le 2$.

<details markdown="1">
<summary>Hint</summary>

The width of the interval is $2$.

<details markdown="1">
<summary>Next step</summary>

$\displaystyle\int_0^2 x^3\,dx = \left[\dfrac{x^4}{4}\right]_0^2 = 4$.

<details markdown="1">
<summary>Full working</summary>

$$\text{average} = \frac{1}{2}\int_0^2 x^3\,dx = \frac{1}{2} \times 4 = 2$$

The average value is $2$.

</details>
</details>
</details>

**3.** A car's speed is $v(t) = 6t$ metres per second. Find its average speed over the first
four seconds.

<details markdown="1">
<summary>Hint</summary>

Average speed is the distance divided by the time. Find the distance first.

<details markdown="1">
<summary>Next step</summary>

$\displaystyle\int_0^4 6t\,dt = \Big[3t^2\Big]_0^4 = 48$ metres.

<details markdown="1">
<summary>Full working</summary>

$$\text{average speed} = \frac{1}{4}\int_0^4 6t\,dt = \frac{48}{4} = 12$$

The average speed is $12$ metres per second.

</details>
</details>
</details>

**4.** For the same car, find the distance travelled in the first four seconds.

<details markdown="1">
<summary>Hint</summary>

Distance is the accumulated change of position, so integrate the speed.

<details markdown="1">
<summary>Next step</summary>

$\displaystyle\int_0^4 6t\,dt = \Big[3t^2\Big]_0^4$.

<details markdown="1">
<summary>Full working</summary>

$$\int_0^4 6t\,dt = 3(16) - 0 = 48 \text{ metres}$$

The car travels $48$ metres. Dividing by the four seconds gives the average speed of $12$
metres per second.

</details>
</details>
</details>

**5.** The chapter problem's tank fills at $r(t) = 12t - 3t^2$ litres per minute. Find the
average rate of flow over the first four minutes.

<details markdown="1">
<summary>Hint</summary>

The total volume is $32$ litres, and the time is $4$ minutes.

<details markdown="1">
<summary>Next step</summary>

Divide the integral by $4$.

<details markdown="1">
<summary>Full working</summary>

$$\text{average rate} = \frac{1}{4}\int_0^4 (12t - 3t^2)\,dt = \frac{32}{4} = 8$$

The average rate is $8$ litres per minute. The greatest rate is $12$, at $t = 2$ minutes, so
the average is below the greatest value.

</details>
</details>
</details>

**6.** Find the average value of $f(x) = x^2 - 2x$ over $0 \le x \le 3$.

<details markdown="1">
<summary>Hint</summary>

Integrate first, then divide by $3$.

<details markdown="1">
<summary>Next step</summary>

$\displaystyle\int_0^3 (x^2 - 2x)\,dx = \left[\dfrac{x^3}{3} - x^2\right]_0^3 = 0$.

<details markdown="1">
<summary>Full working</summary>

$$\text{average} = \frac{1}{3} \times 0 = 0$$

The average value is $0$. The function is negative on part of the interval and positive on
the rest, and the two parts cancel. An average can be zero even when the function is not
zero everywhere.

</details>
</details>
</details>

**7.** A tank drains at a steady $4$ litres per minute. Find the change in volume over
$5$ minutes.

<details markdown="1">
<summary>Hint</summary>

A steady drain is a rate of $-4$ litres per minute.

<details markdown="1">
<summary>Next step</summary>

$\displaystyle\int_0^5 (-4)\,dt = \Big[-4t\Big]_0^5$.

<details markdown="1">
<summary>Full working</summary>

$$\int_0^5 (-4)\,dt = -20$$

The change is $-20$ litres. The negative sign means the volume fell by $20$ litres.

</details>
</details>
</details>

**8.** Explain why the average value of a function is the area under its graph divided by
the width of the interval.

<details markdown="1">
<summary>Hint</summary>

Think of a rectangle with the same area as the region.

<details markdown="1">
<summary>Next step</summary>

The height of that rectangle is the average value.

<details markdown="1">
<summary>Full working</summary>

The definite integral is the area of the region between the graph and the axis. Picture a
rectangle on the same interval with the same area. Its height is the average value, because
the rectangle smooths the region to one level.

The area of a rectangle is height times width, so the height is the area divided by the
width. That gives $\text{average} = \dfrac{1}{b - a}\displaystyle\int_a^b f(x)\,dx$.

</details>
</details>
</details>

## A question from Chapter 7

**9.** A stone falls so that its distance from the start after $t$ seconds is
$s(t) = t^3 - 6t^2 + 9t$ metres. Find its velocity at $t = 2$ seconds.

<details markdown="1">
<summary>Hint</summary>

Velocity is the derivative of distance.

<details markdown="1">
<summary>Next step</summary>

$s'(t) = 3t^2 - 12t + 9$.

<details markdown="1">
<summary>Full working</summary>

$$s'(2) = 3(4) - 12(2) + 9 = 12 - 24 + 9 = -3 \text{ metres per second}$$

The negative sign means the stone is moving back towards its start. Chapter 7 gives the
rate; this chapter gives the total. Both are needed to describe motion.

</details>
</details>
</details>
