---
title: 9.4 The trapezium rule and limits on the estimate — Practise with help
chapter: 9
chapter_title: Numerical methods
section: '9.4'
section_title: The trapezium rule and limits on the estimate
refs:
- I3
kind: guided-problems
---

# 9.4 The trapezium rule and limits on the estimate — Practise with help

Work each question closed book first. Write down the strip width, then list the
heights in order before you substitute into the rule.

## Warm-up: remember

1. Work out $\displaystyle\int_0^2 3x^2\, dx$.
2. For $f(x) = x^2$, work out $f(1)$, $f(2)$ and the average
   $\dfrac{f(1) + f(2)}{2}$.

<details markdown="1">
<summary>Answers</summary>

1. $\left[x^3\right]_0^2 = 8 - 0 = 8$.
2. $f(1) = 1$ and $f(2) = 4$, so the average is $\dfrac{1 + 4}{2} = 2.5$.

If the first part was hard, revise definite integration in Section 8.2. If the
second was hard, revise substituting into a function in Section 2.9.
</details>

:::figure warm-up-gate


## Practise with help

**1.** Use the trapezium rule with four strips to estimate
$\displaystyle\int_0^2 x^2\, dx$. Write down $h$ and the heights.

<details markdown="1">
<summary>Hint</summary>

The strip width is $h = \dfrac{b - a}{n}$. There are five heights for four
strips.
</details>

<details markdown="1">
<summary>Next step</summary>

$h = 0.5$, and the heights are $0, 0.25, 1, 2.25, 4$ at
$x = 0, 0.5, 1, 1.5, 2$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\int_0^2 x^2\, dx \approx \frac{0.5}{2}\Bigl[0 + 4 + 2(0.25 + 1 + 2.25)\Bigr]
= 0.25(4 + 7) = 2.75.
$$
</details>

**2.** Find the exact value of $\displaystyle\int_0^2 x^2\, dx$, and state whether
the estimate in question 1 is too large or too small.

<details markdown="1">
<summary>Hint</summary>

Integrate $x^2$ from Chapter 8, then compare it with $2.75$.
</details>

<details markdown="1">
<summary>Next step</summary>

The exact value is $\left[\dfrac{x^3}{3}\right]_0^2 = \dfrac{8}{3} = 2.6667$.
</details>

<details markdown="1">
<summary>Full working</summary>

The exact value is $\dfrac{8}{3} = 2.6667$, and the estimate is $2.75$. The
estimate is too large. Also $f''(x) = 2 > 0$, so the curve bends upwards and
every chord lies above the curve.
</details>

**3.** Use four strips and rectangles to find a lower limit and an upper limit
for $\displaystyle\int_0^2 x^2\, dx$.

<details markdown="1">
<summary>Hint</summary>

The curve increases across the interval, so the smaller height on each strip is
on the left.
</details>

<details markdown="1">
<summary>Next step</summary>

The left-hand heights are $0, 0.25, 1, 2.25$, so their rectangle sum is
$0.5(3.5)$.
</details>

<details markdown="1">
<summary>Full working</summary>

Lower sum, using the left-hand heights:

$$
0.5(0 + 0.25 + 1 + 2.25) = 1.75.
$$

Upper sum, using the right-hand heights:

$$
0.5(0.25 + 1 + 2.25 + 4) = 3.75.
$$

So $1.75 < \dfrac{8}{3} < 3.75$. The exact value $2.6667$ lies between the two
limits, as it must.
</details>

**4.** Use four strips to estimate $\displaystyle\int_0^1 \frac{1}{1 + x}\, dx$.
Decide whether the estimate is too large or too small.

<details markdown="1">
<summary>Hint</summary>

With $a = 0$, $b = 1$ and four strips, the edges are $0, 0.25, 0.5, 0.75$ and
$1$.
</details>

<details markdown="1">
<summary>Next step</summary>

The heights are $1, 0.8, 0.6667, 0.5714, 0.5$, and the interior heights add to
$2.0381$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\frac{0.25}{2}\Bigl[1 + 0.5 + 2(0.8 + 0.6667 + 0.5714)\Bigr]
= 0.125(1.5 + 4.0762) = 0.6970.
$$

The exact value is $\ln 2 = 0.6931$, so the estimate is too large. Also
$f''(x) = \dfrac{2}{(1 + x)^3} > 0$ on the interval, so the curve bends upwards.
</details>

**5.** A car's speed is recorded every second. Estimate the distance travelled.

| Time (s) | $0$ | $1$ | $2$ | $3$ | $4$ |
|---|---|---|---|---|---|
| Speed (m/s) | $0$ | $3$ | $5$ | $6$ | $6$ |

<details markdown="1">
<summary>Hint</summary>

The distance is the area under the speed–time graph. Here $h = 1$.
</details>

<details markdown="1">
<summary>Next step</summary>

The interior heights are $3, 5, 6$, so they add to $14$ and twice that is $28$.
</details>

<details markdown="1">
<summary>Full working</summary>

The distance $s$ is

$$
s \approx \frac{1}{2}\Bigl[0 + 6 + 2(3 + 5 + 6)\Bigr] = \frac{1}{2}(6 + 28) = 17.
$$

The car travels about $17$ metres.
</details>

**6.** Find lower and upper limits for the distance in question 5.

<details markdown="1">
<summary>Hint</summary>

The speed increases throughout, so the smaller height on each strip is on the
left.
</details>

<details markdown="1">
<summary>Next step</summary>

The left-hand heights are $0, 3, 5, 6$, so their rectangle sum is $1(14)$.
</details>

<details markdown="1">
<summary>Full working</summary>

Lower sum: $1(0 + 3 + 5 + 6) = 14$ metres.

Upper sum: $1(3 + 5 + 6 + 6) = 20$ metres.

So the distance lies between $14$ and $20$ metres. The trapezium estimate $17$
is the midpoint of the two limits.
</details>

**7.** One of these needs the trapezium rule, and one does not. Say which is
which, and give a reason for each choice.
(a) Find the root of $x^3 - 2x - 5 = 0$.
(b) Find the area under a speed–time graph built from a table of readings.

<details markdown="1">
<summary>Hint</summary>

Ask what the unknown is in each part: a value of $x$, or a number built from
heights.
</details>

<details markdown="1">
<summary>Next step</summary>

Part (a) asks for a value where the function is zero. Part (b) asks for an area
under a set of readings.
</details>

<details markdown="1">
<summary>Full working</summary>

Part (a) is a root-finding problem. Use change of sign to bracket the root, then
Newton–Raphson or a simple iteration to narrow it.

Part (b) is an area problem and there is no formula to integrate. Use the
trapezium rule, and state limits from the smaller and larger readings on each
strip.
</details>
