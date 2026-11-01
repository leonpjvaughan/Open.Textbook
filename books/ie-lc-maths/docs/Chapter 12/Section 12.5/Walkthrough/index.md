---
title: 12.5 Graphs of the trigonometric functions — Learn
chapter: 12
chapter_title: Trigonometry
section: '12.5'
section_title: Graphs of the trigonometric functions
tier: O
refs:
- '2.3'
kind: walkthrough
---

# 12.5 Graphs of the trigonometric functions — Learn

**Prerequisites:** Section 12.4 — the unit circle and the signs in each quadrant.

**Objectives:** sketch the sine, cosine and tangent graphs; read the period and the
amplitude from a formula; graph $f(\theta) = a + b\sin c\theta$.

By the end of this section you can draw the wave a formula describes, and read its
period, its amplitude and its range from the formula alone.

## The sine graph

Take the unit circle from Section 12.4 and unwind it. Let the angle run along the
horizontal axis, and plot the height of the point above the axis on the vertical axis.
The height is $\sin\theta$, so the curve is the graph of $y = \sin\theta$.

The curve rises from $0$ at $0^\circ$ to a maximum of $1$ at $90^\circ$, falls through
$0$ at $180^\circ$, reaches a minimum of $-1$ at $270^\circ$, and returns to $0$ at
$360^\circ$. Then it repeats.

- The **period** is $360^\circ$. The shape repeats every full turn.
- The **amplitude** is $1$. The curve rises $1$ above the middle and falls $1$ below it.
- The **range** is $-1 \le y \le 1$.

## The cosine graph

The cosine is the horizontal coordinate on the unit circle. Its graph has the same shape
as the sine graph, moved $90^\circ$ to the left.

$$y = \cos\theta \text{ is the same as } y = \sin(\theta + 90^\circ)$$

The cosine starts at its maximum, $1$ at $0^\circ$, falls to $0$ at $90^\circ$, reaches
$-1$ at $180^\circ$, and returns to $0$ at $270^\circ$.

Both curves have period $360^\circ$ and amplitude $1$. Only the starting point is
different.

## The tangent graph

The tangent is $\dfrac{\sin\theta}{\cos\theta}$, so it is undefined wherever
$\cos\theta = 0$ — at $90^\circ$ and $270^\circ$, and then every $180^\circ$ after that.

Between two of those points the tangent rises from very negative to very positive. Its
period is $180^\circ$, not $360^\circ$, because the curve repeats twice per full turn.

The graph has a **vertical asymptote** at each place where the tangent is undefined: the
curve approaches a vertical line and never touches it.

## Shifting, stretching and moving up

A formula such as $f(\theta) = a + b\sin c\theta$ changes three things, and each has a
name.

> **For $f(\theta) = a + b\sin c\theta$:**
>
> - **amplitude** $= |b|$ — how far the curve rises above and falls below its middle;
> - **period** $= \dfrac{360^\circ}{c}$ — how long one full wave takes;
> - **vertical shift** $= a$ — the middle line, $y = a$;
> - **range** $= a - |b|$ to $a + |b|$.

**Example 1.** Describe $y = 3\sin 2\theta$ and sketch one period.

The amplitude is $3$, so the curve reaches $3$ and $-3$. The period is
$\dfrac{360^\circ}{2} = 180^\circ$. The range is $-3 \le y \le 3$. There is no vertical
shift, so the middle line is the $x$-axis.

**Example 2.** Describe $y = 2 + 4\cos\theta$.

The amplitude is $4$, the period is $360^\circ$, and the vertical shift is $2$. The
middle line is $y = 2$, and the range is $2 - 4 = -2$ up to $2 + 4 = 6$.

The highest value is $6$, not $4$. The amplitude is measured from the middle line, not
from the $x$-axis.

**Example 3.** The depth of water at a harbour, $t$ hours after low water, is
$d = 3 + 2\sin(30^\circ t)$ metres. Find the maximum depth, the minimum depth and the
period.

The amplitude is $2$ and the vertical shift is $3$, so the range is $3 - 2 = 1$ to
$3 + 2 = 5$ metres. The period is $\dfrac{360^\circ}{30^\circ} = 12$ hours.

> **Watch out.** The amplitude is the number multiplying the sine, not the largest value
> of the function. For $d = 3 + 2\sin(30^\circ t)$ the amplitude is $2$ and the maximum
> is $5$. Reading the maximum as the amplitude makes the tide look twice as high as it
> is.
>
> **Re-check:** find the middle line first. The amplitude is the distance from the middle
> line to the top, and the maximum is the middle line plus the amplitude.

## Progress check

Back to the chapter problem. The depth $d$ over the sandbank is

$$d = 1.4 + 1.2\sin(30^\circ t)$$

metres, where $t$ is the number of hours after low water.

From the formula, write down the amplitude, the vertical shift, the period and the
range. Then sketch the graph for $0 \le t \le 12$ hours, and mark on it the maximum
depth and the time it occurs.

You should find that the deepest water is $2.6$ m at $t = 3$ hours, and the shallowest is
$0.2$ m at $t = 9$ hours. The yacht needs $2.0$ m, and the graph shows that the depth is
above $2.0$ m for part of the cycle. Section 12.9 finds exactly when.

## You should now be able to

- sketch the sine, cosine and tangent graphs and name their periods;
- read the amplitude, the period and the vertical shift from a formula;
- state the range of $a + b\sin c\theta$;
- read a maximum or a minimum off a graph, and say when it occurs.
