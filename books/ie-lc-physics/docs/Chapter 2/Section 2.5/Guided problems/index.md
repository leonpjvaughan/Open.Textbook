---
title: 2.5 Deriving the equations of motion from a graph — Practise with help
chapter: 2
chapter_title: Describing motion
section: '2.5'
section_title: Deriving the equations of motion from a graph
tier: H
refs:
- '1.1'
kind: guided-problems
---

# 2.5 Deriving the equations of motion from a graph — Practise with help

## Warm-up: remember

1. On a velocity-time graph, what does the gradient represent?
2. On a velocity-time graph, what does the area under the line represent?

<details markdown="1">
<summary>Answers and feedback</summary>

1. The gradient is the acceleration.
2. The area is the displacement.

Both answers are the whole of this section. Each equation of motion comes from one of
these two facts.

</details>

## Practise with help

**1.** A velocity-time graph is a straight line from $(0, u)$ to $(t, v)$. Derive
$v = u + at$ from the gradient.

<details markdown="1">
<summary>Hint</summary>

Gradient is the change in velocity divided by the time taken.

<details markdown="1">
<summary>Next step</summary>

The gradient is $\dfrac{v - u}{t}$, and it equals the acceleration $a$.

<details markdown="1">
<summary>Full working</summary>

$$a = \frac{v - u}{t}$$

Multiply both sides by $t$:

$$at = v - u$$

Add $u$ to both sides:

$$v = u + at$$

The equation comes from the gradient of the line, because the gradient is the
acceleration.

</details>
</details>
</details>

**2.** Derive $s = \dfrac{u + v}{2}\,t$ from the area under the same velocity-time graph.

<details markdown="1">
<summary>Hint</summary>

The shape under the line is a trapezium.

<details markdown="1">
<summary>Next step</summary>

Area $= \frac{1}{2}(\text{sum of parallel sides})(\text{distance between them})$.

<details markdown="1">
<summary>Full working</summary>

The area under a velocity-time graph is the displacement $s$. The shape is a trapezium,
with parallel sides $u$ and $v$ and distance between them $t$.

$$s = \frac{1}{2}(u + v)t = \frac{u + v}{2}\,t$$

</details>
</details>
</details>

**3.** Starting from $s = \dfrac{u + v}{2}\,t$ and $v = u + at$, derive
$s = ut + \frac{1}{2}at^2$.

<details markdown="1">
<summary>Hint</summary>

Replace $v$ in the first equation with $u + at$.

<details markdown="1">
<summary>Next step</summary>

$s = \dfrac{u + (u + at)}{2}\,t$.

<details markdown="1">
<summary>Full working</summary>

$$s = \frac{u + v}{2}\,t = \frac{u + (u + at)}{2}\,t = \frac{2u + at}{2}\,t$$

Multiply out the bracket and divide each term by 2:

$$s = ut + \frac{1}{2}at^2$$

</details>
</details>
</details>

**4.** Eliminate $t$ between $v = u + at$ and $s = \dfrac{u + v}{2}\,t$ to derive
$v^2 = u^2 + 2as$.

<details markdown="1">
<summary>Hint</summary>

First rearrange $v = u + at$ for $t$.

<details markdown="1">
<summary>Next step</summary>

$t = \dfrac{v - u}{a}$, then substitute into $s = \dfrac{u + v}{2}\,t$.

<details markdown="1">
<summary>Full working</summary>

$$t = \frac{v - u}{a}$$

Substitute into the second equation:

$$s = \frac{u + v}{2} \times \frac{v - u}{a} = \frac{(u + v)(v - u)}{2a}$$

The bracket $(u + v)(v - u)$ multiplies out to $v^2 - u^2$:

$$s = \frac{v^2 - u^2}{2a}$$

Multiply both sides by $2a$ and rearrange:

$$v^2 = u^2 + 2as$$

</details>
</details>
</details>

**5.** A velocity-time graph is a straight line from 2.0 m/s to 10 m/s over 4.0 s. Use
the graph to find the acceleration and the displacement.

<details markdown="1">
<summary>Hint</summary>

The gradient gives $a$, and the area gives $s$.

<details markdown="1">
<summary>Next step</summary>

$a = \dfrac{10 - 2.0}{4.0}$ and $s = \dfrac{2.0 + 10}{2} \times 4.0$.

<details markdown="1">
<summary>Full working</summary>

$$a = \frac{10 - 2.0}{4.0} = 2.0\,\text{m/s}^2$$

$$s = \frac{2.0 + 10}{2} \times 4.0 = 24\,\text{m}$$

The acceleration is $2.0\,\text{m/s}^2$ and the displacement is $24\,\text{m}$.

</details>
</details>
</details>

**6.** A car accelerates from 6.0 m/s to 14 m/s over a distance of 20 m. Use
$v^2 = u^2 + 2as$ to calculate its acceleration.

<details markdown="1">
<summary>Hint</summary>

Rearrange the equation for $a$.

<details markdown="1">
<summary>Next step</summary>

$a = \dfrac{v^2 - u^2}{2s} = \dfrac{14^2 - 6.0^2}{2 \times 20}$.

<details markdown="1">
<summary>Full working</summary>

$$v^2 = u^2 + 2as$$

$$a = \frac{v^2 - u^2}{2s} = \frac{14^2 - 6.0^2}{2 \times 20} = \frac{196 - 36}{40} = 4.0\,\text{m/s}^2$$

This is the equation that leaves out the time, which is why it suits a question that
gives a distance instead.

</details>
</details>
</details>

## The chapter problem continues

**7.** The drone's velocity-time graph rises from $(0, 0)$ to
$(4.0\,\text{s}, 8.0\,\text{m/s})$. Derive $s = ut + \frac{1}{2}at^2$, then use it with
$u = 0$, $a = 2.0\,\text{m/s}^2$ and $t = 4.0\,\text{s}$. Check the answer against the
area of the triangle under the line.

<details markdown="1">
<summary>Hint</summary>

The derivation is in question 3. The area of a triangle is
$\frac{1}{2} \times \text{base} \times \text{height}$.

<details markdown="1">
<summary>Next step</summary>

$s = \frac{1}{2} \times 2.0 \times 4.0^2$, then check
$\frac{1}{2} \times 4.0 \times 8.0$.

<details markdown="1">
<summary>Full working</summary>

From question 3, substituting $v = u + at$ into $s = \dfrac{u + v}{2}\,t$ gives
$s = ut + \frac{1}{2}at^2$.

$$s = 0 + \frac{1}{2} \times 2.0 \times 4.0^2 = 16\,\text{m}$$

The area of the triangle is

$$\frac{1}{2} \times 4.0 \times 8.0 = 16\,\text{m}$$

Both routes give $16\,\text{m}$, which is the height of the drone at the end of its
acceleration phase. The equation and the graph agree because the equation was derived
from the graph.

</details>
</details>
</details>
