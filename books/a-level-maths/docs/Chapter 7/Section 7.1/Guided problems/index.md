---
title: 7.1 The derivative as a gradient and a rate of change — Practise with help
chapter: 7
chapter_title: Differentiation
section: '7.1'
section_title: The derivative as a gradient and a rate of change
refs:
- G1
kind: guided-problems
---

# 7.1 The derivative as a gradient and a rate of change — Practise with help

Work each question closed book first. Sketch the chord or the tangent before you
calculate, and write down what the gradient means in the context.

## Warm-up: remember

1. Find the gradient of the straight line through $(1, 3)$ and $(4, 15)$.
2. For $f(x) = x^2 - 3x$, work out $f(4)$.
3. Make $h$ the subject of $4 = 8h$.

<details markdown="1">
<summary>Answers</summary>

1. Gradient $= \dfrac{15 - 3}{4 - 1} = \dfrac{12}{3} = 4$.
2. $f(4) = 4^2 - 3 \times 4 = 16 - 12 = 4$.
3. Divide both sides by $8$: $h = \dfrac{4}{8} = 0.5$.

If question 1 was hard, revise the gradient of a straight line in Chapter 3.
</details>

## Practise with help

**1.** The curve $y = x^2 + 1$ passes through $P(1, 2)$. Use chords from $P$ to
$(1 + h, (1 + h)^2 + 1)$ to estimate the gradient at $P$. Take $h = 1$, $h = 0.5$
and $h = 0.1$.

<details markdown="1">
<summary>Hint</summary>

The gradient of each chord is $\dfrac{f(1 + h) - f(1)}{h}$. Work out $f(1 + h)$
for each value of $h$, then subtract $2$ and divide by $h$.
</details>

<details markdown="1">
<summary>Next step</summary>

For $h = 1$ the chord runs to $x = 2$, where $y = 5$. Its gradient is
$\dfrac{5 - 2}{1}$. Repeat for $h = 0.5$ and $h = 0.1$.
</details>

<details markdown="1">
<summary>Full working</summary>

| $h$ | $x = 1 + h$ | $y = x^2 + 1$ | gradient of the chord |
|---|---|---|---|
| $1$ | $2$ | $5$ | $\dfrac{5 - 2}{1} = 3$ |
| $0.5$ | $1.5$ | $3.25$ | $\dfrac{3.25 - 2}{0.5} = 2.5$ |
| $0.1$ | $1.1$ | $2.21$ | $\dfrac{2.21 - 2}{0.1} = 2.1$ |

The values close in on $2$, so the gradient at $P$ is about $2$.
</details>

**2.** A curve has gradient function $f'(x) = 2x - 4$. Find the value of $x$
where the gradient is zero. Then say whether the curve is rising or falling at
$x = 0$ and at $x = 3$.

<details markdown="1">
<summary>Hint</summary>

The gradient is zero when the expression for $f'(x)$ equals zero. To say whether
the curve rises or falls, work out the sign of $f'(x)$ at each value of $x$.
</details>

<details markdown="1">
<summary>Next step</summary>

Solve $2x - 4 = 0$ for the zero gradient. Then substitute $x = 0$ and $x = 3$
into $2x - 4$ and record the sign of each answer.
</details>

<details markdown="1">
<summary>Full working</summary>

Set $2x - 4 = 0$, so $2x = 4$ and $x = 2$. The gradient is zero at $x = 2$.

At $x = 0$, $f'(0) = -4$, which is negative, so the curve is falling.
At $x = 3$, $f'(3) = 2$, which is positive, so the curve is rising.
</details>

**3.** A stone falls. Its distance from the top of a cliff after $t$ seconds is
$s = 3t^2 + 2t$ metres. Find the average speed between $t = 1$ and $t = 3$
seconds.

<details markdown="1">
<summary>Hint</summary>

Average speed is the change in distance divided by the change in time. Work out
$s$ at the two times first.
</details>

<details markdown="1">
<summary>Next step</summary>

$s(1) = 3 + 2 = 5$ m and $s(3) = 27 + 6 = 33$ m. Divide the change in distance
by the $2$ seconds between the two times.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\text{average speed} = \frac{s(3) - s(1)}{3 - 1} = \frac{33 - 5}{2} = 14 \text{ m/s}.
$$

This is the average rate over two seconds, not the speed at one instant.
</details>

**4.** Use chords to estimate the gradient of $y = x^3$ at $x = 2$. Take $h = 1$,
$h = 0.5$ and $h = 0.1$, and give each chord gradient to two decimal places.

<details markdown="1">
<summary>Hint</summary>

The point is $(2, 8)$. The chord runs to $(2 + h, (2 + h)^3)$. Work out the cube
of each new $x$, then apply $\dfrac{f(2 + h) - 8}{h}$.
</details>

<details markdown="1">
<summary>Next step</summary>

For $h = 0.5$ the chord runs to $x = 2.5$, where $y = 15.625$. The chord
gradient is $\dfrac{15.625 - 8}{0.5}$. Repeat for the other two values of $h$.
</details>

<details markdown="1">
<summary>Full working</summary>

| $h$ | $x = 2 + h$ | $y = x^3$ | gradient of the chord |
|---|---|---|---|
| $1$ | $3$ | $27$ | $\dfrac{27 - 8}{1} = 19.00$ |
| $0.5$ | $2.5$ | $15.625$ | $\dfrac{15.625 - 8}{0.5} = 15.25$ |
| $0.1$ | $2.1$ | $9.261$ | $\dfrac{9.261 - 8}{0.1} = 12.61$ |

As $h$ shrinks the gradient approaches $12$, so the gradient at $x = 2$ is about
$12$.
</details>

**5.** A curve rises from $(-2, -1)$ to a peak at $(0, 3)$. It then falls to
$(2, -1)$ and rises after that. State the sign of $f'(x)$ on the rising part, at
the peak, and on the falling part. Then describe the shape of the graph of
$f'(x)$.

<details markdown="1">
<summary>Hint</summary>

A rising curve has a positive gradient, a falling curve has a negative gradient,
and the gradient is zero at a peak.
</details>

<details markdown="1">
<summary>Next step</summary>

Mark the rising part from $x = -2$ to $x = 0$, the peak at $x = 0$, and the
falling part from $x = 0$ to $x = 2$. Write the sign of the gradient on each
part, then transfer those signs to a graph.
</details>

<details markdown="1">
<summary>Full working</summary>

On the rising part, $f'(x) > 0$. At the peak, $f'(0) = 0$. On the falling part,
$f'(x) < 0$. After $x = 2$ the curve rises again, so $f'(x) > 0$ once more.

The graph of $f'(x)$ starts above the $x$-axis, meets it at $x = 0$ and again at
$x = 2$, and sits below the axis between those two points. Outside the interval
it sits above the axis.
</details>

**6.** A cup of tea cools. Its temperature after $t$ minutes is $\theta$ degrees
Celsius. The temperature is $90^\circ$C at $t = 0$ and $65^\circ$C at $t = 5$.
Find the average rate of change of the temperature. Give the units, and explain
the sign.

<details markdown="1">
<summary>Hint</summary>

The average rate is the change in temperature divided by the time taken. The
temperature falls, so expect a negative answer.
</details>

<details markdown="1">
<summary>Next step</summary>

The change is $65 - 90 = -25$ degrees over $5$ minutes. Divide the change by the
time.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{\theta(5) - \theta(0)}{5 - 0} = \frac{65 - 90}{5} = -5.
$$

The average rate of change is $-5$ degrees Celsius per minute. The sign is
negative because the drink is cooling, so its temperature is falling.
</details>
