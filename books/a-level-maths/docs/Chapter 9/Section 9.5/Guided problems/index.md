---
title: 9.5 Numerical methods in context — Practise with help
chapter: 9
chapter_title: Numerical methods
section: '9.5'
section_title: Numerical methods in context
refs:
- I4
- OT2
kind: guided-problems
---

# 9.5 Numerical methods in context — Practise with help

Work each question closed book first. Decide which method you need before you
calculate, and write the units with the answer.

## Warm-up: remember

1. For $f(x) = x^3 - 2x - 5$, work out $f(2)$ and $f(3)$. What do the signs tell
   you?
2. Use $x_{n+1} = \dfrac{x_n + 5}{3}$ with $x_0 = 1$ to find $x_2$.

<details markdown="1">
<summary>Answers</summary>

1. $f(2) = -1$ and $f(3) = 16$. The sign changes, so a root lies in $(2, 3)$.
2. $x_1 = \dfrac{1 + 5}{3} = 2$ and $x_2 = \dfrac{2 + 5}{3} = \dfrac{7}{3} = 2.3333$.

If the first part was hard, revise change of sign in Section 9.1. If the second
was hard, revise recurrence relations in Section 9.2.
</details>

:::figure warm-up-gate


## Practise with help

**1.** A drone's height is $h(t) = 40e^{-t/4} - 2t$ metres. Show that the drone
lands between $5$ and $6$ seconds.

<details markdown="1">
<summary>Hint</summary>

Substitute both times into the height model. The drone lands when the height is
zero.
</details>

<details markdown="1">
<summary>Next step</summary>

Use $e^{-1.25} = 0.2865$ and $e^{-1.5} = 0.2231$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
h(5) = 40(0.2865) - 10 = 1.4602 > 0,
\qquad
h(6) = 40(0.2231) - 12 = -3.0748 < 0.
$$

The height changes sign, and the model is continuous, so the drone lands between
$5$ and $6$ seconds.
</details>

**2.** For the drone in question 1, find $h'(t)$ and use Newton–Raphson with
$t_0 = 5$ to find $t_1$.

<details markdown="1">
<summary>Hint</summary>

Differentiate $40e^{-t/4}$ and $-2t$ separately.
</details>

<details markdown="1">
<summary>Next step</summary>

$h'(t) = -10e^{-t/4} - 2$, so $h'(5) = -4.8650$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
h'(t) = -10e^{-t/4} - 2.
$$

$$
t_1 = 5 - \frac{1.4602}{-4.8650} = 5.3001.
$$

</details>

**3.** Continue question 2 to find $t_2$, and state the landing time to three
decimal places.

<details markdown="1">
<summary>Hint</summary>

Use $t_1$ in the same formula. Carry the full value, not the rounded one.
</details>

<details markdown="1">
<summary>Next step</summary>

$h(5.3001) = 0.0315$ and $h'(5.3001) = -4.6579$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
t_2 = 5.3001 - \frac{0.0315}{-4.6579} = 5.3069.
$$

One more step gives $5.3069$ again, so the landing time is $5.307$ seconds to
three decimal places.
</details>

**4.** A drug's concentration is $C(t) = 6te^{-0.4t}$ milligrams per litre,
$t$ hours after a dose. Form an equation for the time when the concentration is
$2$ milligrams per litre, and bracket the root.

<details markdown="1">
<summary>Hint</summary>

Set $C(t) = 2$ and divide both sides by $2$. Then multiply by $e^{0.4t}$.
</details>

<details markdown="1">
<summary>Next step</summary>

The equation becomes $3t = e^{0.4t}$, so use $f(t) = 3t - e^{0.4t}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
6te^{-0.4t} = 2
\quad\Longrightarrow\quad
3te^{-0.4t} = 1
\quad\Longrightarrow\quad
3t = e^{0.4t}.
$$

Let $f(t) = 3t - e^{0.4t}$. Then

$$
f(0.35) = 1.05 - e^{0.14} = -0.1003 < 0,
\qquad
f(0.4) = 1.2 - e^{0.16} = 0.0265 > 0.
$$

The sign changes, so the root lies in $(0.35, 0.4)$ hours.
</details>

**5.** Use Newton–Raphson from $t_0 = 0.4$ to find the time in question 4 to two
decimal places.

<details markdown="1">
<summary>Hint</summary>

Differentiate $f(t) = 3t - e^{0.4t}$. The derivative of $e^{0.4t}$ is
$0.4e^{0.4t}$.
</details>

<details markdown="1">
<summary>Next step</summary>

$f'(0.4) = 3 - 0.4e^{0.16} = 2.5306$, so one step gives
$0.4 - \dfrac{0.0265}{2.5306}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
f'(t) = 3 - 0.4e^{0.4t},
\qquad
t_1 = 0.4 - \frac{0.0265}{2.5306} = 0.3895.
$$

The next step gives $0.3895$ again, so the time is $0.39$ hours to two decimal
places. That is about $23.4$ minutes.
</details>

**6.** A car's speed is recorded every two seconds for ten seconds.

| Time (s) | $0$ | $2$ | $4$ | $6$ | $8$ | $10$ |
|---|---|---|---|---|---|---|
| Speed (m/s) | $0$ | $5$ | $9$ | $12$ | $14$ | $15$ |

Estimate the distance travelled, and give lower and upper limits.

<details markdown="1">
<summary>Hint</summary>

Distance is the area under the speed–time graph. The readings are equally spaced
with $h = 2$.
</details>

<details markdown="1">
<summary>Next step</summary>

The interior heights are $5, 9, 12, 14$, so they add to $40$ and twice that is
$80$.
</details>

<details markdown="1">
<summary>Full working</summary>

The distance $s$ is

$$
s \approx \frac{2}{2}\Bigl[0 + 15 + 2(5 + 9 + 12 + 14)\Bigr] = 15 + 80 = 95.
$$

The car travels about $95$ metres.

The speed increases throughout, so the lower sum uses the left-hand heights and
the upper sum uses the right-hand heights:

$$
s_{\text{lower}} = 2(0 + 5 + 9 + 12 + 14) = 80,
\qquad
s_{\text{upper}} = 2(5 + 9 + 12 + 14 + 15) = 110.
$$

The distance lies between $80$ and $110$ metres.
</details>

**7.** A tank empties through a valve. The depth $d$ centimetres after $t$
minutes is recorded in a table, and the depth does not follow a formula you can
integrate. You need the area under the depth–time graph for the first ten
minutes. Which method will you use, and why?

<details markdown="1">
<summary>Hint</summary>

Ask whether the unknown is a root of an equation or an area under a graph.
</details>

<details markdown="1">
<summary>Next step</summary>

The depth readings are heights, and the unknown is the area beneath them. There
is no formula, so an exact integral is not available.
</details>

<details markdown="1">
<summary>Full working</summary>

Use the trapezium rule. The readings are equally spaced, so $h = \dfrac{b - a}{n}$
is the gap between readings. Substitute the depths into

$$
A \approx \frac{h}{2}\Bigl[y_0 + y_n + 2\left(y_1 + \cdots + y_{n-1}\right)\Bigr].
$$

Here $A$ is the area, $y_0$ to $y_n$ are the readings and $n$ is the number of
strips.

Give the answer in centimetre-minutes, then convert if the question needs square
metres. State that the answer is an estimate, and give limits from the smaller
and larger readings on each strip.
</details>
