---
title: "1.5 Graphs, gradients and the language of data — Practise with help"
chapter: 1
chapter_title: Measuring, modelling and investigating
section: "1.5"
section_title: Graphs, gradients and the language of data
tier: O
refs:
- '1.1'
- '1.4'
kind: guided-problems
---

# 1.5 Graphs, gradients and the language of data — Practise with help

## Warm-up: remember

1. Which axis carries the independent variable?
2. What does the gradient of a distance-time graph represent?

<details markdown="1">
<summary>Answers and feedback</summary>

1. The horizontal axis, sometimes called the $x$-axis.
2. The speed.

Both return here: a graph plots the independent variable against the dependent one,
and its gradient usually carries a physical quantity with a unit.

</details>

:::figure warm-up-gate


## Practise with help

**1.** A distance-time graph is a straight line through the origin, passing through
(5.0 s, 15 m). Find the gradient and state its unit.

<details markdown="1">
<summary>Hint</summary>

Gradient is rise over run.

<details markdown="1">
<summary>Next step</summary>

$\dfrac{15\,\text{m}}{5.0\,\text{s}}$.

<details markdown="1">
<summary>Full working</summary>

$$\text{gradient} = \frac{15\,\text{m}}{5.0\,\text{s}} = 3.0\,\text{m/s}$$

The unit is the vertical unit divided by the horizontal unit: metres divided by
seconds. The gradient of a distance-time graph is the speed, so the object moves at
$3.0\,\text{m/s}$.

</details>
</details>
</details>

**2.** A force-extension graph passes through (0.20 m, 4.0 N) and (0.50 m, 10 N). Find
the gradient and state its unit.

<details markdown="1">
<summary>Hint</summary>

Use the two points as far apart as you have them.

<details markdown="1">
<summary>Next step</summary>

$\dfrac{10 - 4.0}{0.50 - 0.20}$.

<details markdown="1">
<summary>Full working</summary>

$$\text{gradient} = \frac{10 - 4.0}{0.50 - 0.20} = \frac{6.0}{0.30} = 20\,\text{N/m}$$

The unit is newtons divided by metres. This gradient is the spring constant, which you
meet again in Chapter 5.

</details>
</details>
</details>

**3.** A distance-time graph passes through (2.0 s, 6.0 m) and (5.0 s, 12 m). Find
the intercept on the distance axis.

<details markdown="1">
<summary>Hint</summary>

Find the gradient first, then use one point to find the intercept.

<details markdown="1">
<summary>Next step</summary>

Gradient $= \dfrac{12 - 6.0}{5.0 - 2.0} = 2.0\,\text{m/s}$. Then $6.0 = 2.0 \times 2.0 + c$.

<details markdown="1">
<summary>Full working</summary>

$$\text{gradient} = \frac{12 - 6.0}{5.0 - 2.0} = \frac{6.0}{3.0} = 2.0\,\text{m/s}$$

Using $d = 2.0t + c$ at $t = 2.0\,\text{s}$:

$$6.0 = 2.0 \times 2.0 + c = 4.0 + c$$

so $c = 2.0\,\text{m}$. The intercept is the distance at $t = 0$, which is
$2.0\,\text{m}$. A non-zero intercept means the object did not start at the origin.

</details>
</details>
</details>

**4.** A force-extension graph is a straight line through the origin and the point
(0.30 m, 12 N). Find the area under the graph up to 0.30 m, and state what it
represents.

<details markdown="1">
<summary>Hint</summary>

The area is a triangle.

<details markdown="1">
<summary>Next step</summary>

$\frac{1}{2} \times 0.30 \times 12$.

<details markdown="1">
<summary>Full working</summary>

$$\text{area} = \frac{1}{2} \times 0.30 \times 12 = 1.8\,\text{J}$$

The area under a force-extension graph is the energy stored in the spring, so the
spring stores $1.8\,\text{J}$. The unit is the product of the axis units:
$\text{m} \times \text{N} = \text{J}$.

</details>
</details>
</details>

**5.** A student plots $s$ against $t^2$ for a falling ball and gets a straight line
through the origin with gradient 4.9 m/s$^2$. Explain why the graph is a straight
line, and use the gradient to find $g$.

<details markdown="1">
<summary>Hint</summary>

Start from $s = \frac{1}{2}gt^2$ and treat $t^2$ as the horizontal quantity.

<details markdown="1">
<summary>Next step</summary>

The gradient is $\frac{1}{2}g$, so $g = 2 \times 4.9$.

<details markdown="1">
<summary>Full working</summary>

The model gives $s = \frac{1}{2}gt^2$. If the horizontal axis is $t^2$, then this is
$s = \left(\frac{1}{2}g\right)t^2$, a straight line through the origin with gradient
$\frac{1}{2}g$.

$$g = 2 \times 4.9 = 9.8\,\text{m/s}^2$$

The value agrees with the accepted value. That is what a straight-line graph of the
right quantities gives you: a constant read off as a gradient.

</details>
</details>
</details>

**6.** A graph of $s$ against $t^2$ for a falling ball is a straight line, but it does
not pass through the origin. Suggest what this could mean, and say what you would
check.

<details markdown="1">
<summary>Hint</summary>

What should $s$ be when $t = 0$?

<details markdown="1">
<summary>Next step</summary>

At $t = 0$ the ball has fallen no distance, so $s$ should be zero.

<details markdown="1">
<summary>Full working</summary>

At $t = 0$ the ball has not fallen, so the line should pass through the origin. A
non-zero intercept means something is offset.

The likely causes are a zero error on the ruler, or the drop height being measured
from a point that is not the release point. Check how the height was measured and
whether the ruler zero is correct.

A non-zero intercept is a useful clue. It points at a systematic error rather than at
random scatter.

</details>
</details>
</details>

## The chapter problem, graphed

**7.** A student drops a ball from 1.25 m. The mean fall time is 0.55 s. The model
predicts 0.51 s. The graph of $s$ against $t^2$ gives $g = 9.6\,\text{m/s}^2$. Use
these numbers to say which part of the difference is the model's fault and which is
the measurement's.

<details markdown="1">
<summary>Hint</summary>

The gradient gave $g$. Compare your $g$ with $9.8\,\text{m/s}^2$, and compare the
times.

<details markdown="1">
<summary>Next step</summary>

$g = 9.6$ is 2% below the accepted value. The time is about 8% above the prediction.

<details markdown="1">
<summary>Full working</summary>

The gradient gives $g = 9.6\,\text{m/s}^2$, which is about 2% below
$9.8\,\text{m/s}^2$. A 2% difference is small, so the model is doing well.

The measured time, 0.55 s, is about 8% above the predicted 0.51 s. The extra time is
larger than the model's own error, and it points at the measurement: a hand-timed
stopwatch adds a reaction time, and the timer may be stopped late.

The model's fault is small and comes from ignoring air resistance. The measurement's
fault is larger and comes from the reaction time. That is the answer to the chapter
problem: most of the difference is the timing, not the physics.

</details>
</details>
</details>
