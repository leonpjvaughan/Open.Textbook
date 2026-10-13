---
title: 9.4 The trapezium rule and limits on the estimate — Learn
chapter: 9
chapter_title: Numerical methods
section: '9.4'
section_title: The trapezium rule and limits on the estimate
refs:
- I3
kind: walkthrough
---

# 9.4 The trapezium rule and limits on the estimate — Learn

**Prerequisites:** substituting values into a function from Section 2.9; definite
integration and the area under a curve from Section 8.2; second derivatives and
convexity from Section 7.4.

**By the end of this section you can:** use the trapezium rule to estimate a
definite integral; decide from the curve whether the estimate is too large or too
small; and use rectangles to give limits that the true area must lie between.

## 1. Where the rule comes from

Chapter 8 measured an area by splitting it into rectangles. The rectangles leave
gaps or overshoot, because their tops are flat. The trapezium rule joins
consecutive points with straight lines instead, so the top of each strip follows
the curve more closely.

Divide the interval from $a$ to $b$ into $n$ equal strips. Each strip has width

$$
h = \frac{b - a}{n}.
$$

Let the heights of the curve at the strip edges be $y_0, y_1, y_2, \ldots, y_n$,
where $y_i = f(x_i)$. Each strip is a trapezium with parallel sides $y_{i-1}$
and $y_i$, and width $h$. Its area is

$$
\frac{h}{2}\left(y_{i-1} + y_i\right).
$$

Add all the strip areas. Every interior height appears in two strips, so it is
counted twice. The two end heights appear once each. The **trapezium rule** is

$$
\int_a^b f(x)\, dx \approx \frac{h}{2}\Bigl[y_0 + y_n + 2\left(y_1 + y_2 + \cdots + y_{n-1}\right)\Bigr].
$$

The extra factor of $2$ in front of the interior heights is the only trap in the
formula. Check it by counting: with $n$ strips there are $n+1$ heights, and the
interior ones are $y_1$ to $y_{n-1}$.

## 2. A first estimate

**Example 1.** Use the trapezium rule with four strips to estimate
$\displaystyle\int_0^2 x^2\, dx$, and compare it with the exact value.

Here $a = 0$, $b = 2$ and $n = 4$, so the width of each strip is

$$
h = \frac{2 - 0}{4} = 0.5.
$$

The strip edges are $0, 0.5, 1, 1.5, 2$. The heights are the squares of those
values:

| $x$ | $0$ | $0.5$ | $1$ | $1.5$ | $2$ |
|---|---|---|---|---|---|
| $y = x^2$ | $0$ | $0.25$ | $1$ | $2.25$ | $4$ |

Substitute into the rule:

$$
\int_0^2 x^2\, dx \approx \frac{0.5}{2}\Bigl[0 + 4 + 2\left(0.25 + 1 + 2.25\right)\Bigr]
= 0.25\left[4 + 7\right] = 2.75.
$$

The exact value from Chapter 8 is

$$
\int_0^2 x^2\, dx = \left[\frac{x^3}{3}\right]_0^2 = \frac{8}{3} = 2.6667.
$$

The estimate $2.75$ is larger than the exact value by about $0.08$. The
estimate is an **overestimate**.

## 3. Deciding whether the estimate is too large or too small

The shape of the curve decides the direction of the error. Each straight top of a
trapezium is a chord, and the chord sits on one side of the curve.

- If the curve bends upwards, a chord lies **above** the curve, so the trapezium
  rule gives an **overestimate**.
- If the curve bends downwards, a chord lies **below** the curve, so the rule
  gives an **underestimate**.

The second derivative tells you which way the curve bends. If
$f''(x) > 0$ on the whole interval, the curve bends upwards. If
$f''(x) < 0$, it bends downwards.

For Example 1, $f(x) = x^2$, so $f''(x) = 2 > 0$. The curve bends upwards on
$[0, 2]$, so every trapezium sits above the curve. This confirms the overestimate
without drawing the graph.

**Example 2.** Use the trapezium rule with four strips to estimate
$\displaystyle\int_0^1 \frac{1}{1 + x}\, dx$, and decide whether it is an
overestimate or an underestimate.

Here $h = 0.25$, and the strip edges are $0, 0.25, 0.5, 0.75, 1$. Work out the
heights:

$$
y_0 = 1,
\qquad
y_1 = \frac{1}{1.25} = 0.8,
\qquad
y_2 = \frac{1}{1.5} = 0.6667,
\qquad
y_3 = \frac{1}{1.75} = 0.5714,
\qquad
y_4 = 0.5.
$$

Substitute into the rule:

$$
\frac{0.25}{2}\Bigl[1 + 0.5 + 2\left(0.8 + 0.6667 + 0.5714\right)\Bigr]
= 0.125\left[1.5 + 2(2.0381)\right] = 0.125(5.5762) = 0.6970.
$$

The exact value is $\ln 2 = 0.6931$. The estimate $0.6970$ is too large.

To see why, differentiate twice. Write $f(x) = (1 + x)^{-1}$, so
$f'(x) = -(1 + x)^{-2}$ and $f''(x) = 2(1 + x)^{-3}$. On $[0, 1]$ the value
$f''(x)$ is positive, so the curve bends upwards. The chords lie above the
curve, and the rule overestimates.

## 4. Limits the true area must lie between

An estimate on its own does not say how far wrong it is. Rectangle sums give
limits. On each strip, build two rectangles: one using the smaller height, and
one using the larger height.

- The **lower sum** adds the smaller rectangle on every strip. It is too small,
  so it is a lower limit for the area.
- The **upper sum** adds the larger rectangle on every strip. It is too large, so
  it is an upper limit.

The true area lies between the two sums. For a curve that increases across the
interval, the lower sum uses the left-hand height and the upper sum uses the
right-hand height.

**Example 3.** Find limits for $\displaystyle\int_0^2 x^2\, dx$ using four
strips, and check that the exact value lies between them.

The curve $y = x^2$ increases on $[0, 2]$, so the smaller height on each strip is
the left-hand one. The lower sum is

$$
0.5\left(0 + 0.25 + 1 + 2.25\right) = 0.5(3.5) = 1.75.
$$

The larger height on each strip is the right-hand one, so the upper sum is

$$
0.5\left(0.25 + 1 + 2.25 + 4\right) = 0.5(7.5) = 3.75.
$$

The exact area satisfies

$$
1.75 < \frac{8}{3} < 3.75,
\qquad
\text{that is}
\qquad
1.75 < 2.6667 < 3.75.
$$

The limits hold. Notice that the trapezium estimate is the average of the two
rectangle sums:

$$
\frac{1.75 + 3.75}{2} = 2.75.
$$

That is not a coincidence. Each trapezium is the average of the two rectangles
built on its strip.

## 5. Estimating from a table

Sometimes the readings arrive as a table, with no formula at all. The trapezium
rule still works, because it only needs the heights.

**Example 4.** A river survey records the water depth at points across a
$12$ metre channel. Estimate the cross-sectional area of the water.

| Distance across (m) | $0$ | $2$ | $4$ | $6$ | $8$ | $10$ | $12$ |
|---|---|---|---|---|---|---|---|
| Depth (m) | $0$ | $1.2$ | $2.5$ | $3.1$ | $2.4$ | $0.9$ | $0$ |

The readings are equally spaced, with width $h = 2$. The two end heights are $0$
and $0$. Sum the interior heights:

$$
1.2 + 2.5 + 3.1 + 2.4 + 0.9 = 10.1.
$$

Substitute into the rule:

$$
A \approx \frac{2}{2}\Bigl[0 + 0 + 2(10.1)\Bigr] = 20.2.
$$

The cross-sectional area is about $20.2$ square metres.

Now find limits. On each strip, take the smaller of its two readings and the
larger of its two readings.

| Strip | $0$–$2$ | $2$–$4$ | $4$–$6$ | $6$–$8$ | $8$–$10$ | $10$–$12$ |
|---|---|---|---|---|---|---|
| Smaller (m) | $0$ | $1.2$ | $2.5$ | $2.4$ | $0.9$ | $0$ |
| Larger (m) | $1.2$ | $2.5$ | $3.1$ | $3.1$ | $2.4$ | $0.9$ |

The lower sum is $2(0 + 1.2 + 2.5 + 2.4 + 0.9 + 0) = 2(7.0) = 14.0$.

The upper sum is $2(1.2 + 2.5 + 3.1 + 3.1 + 2.4 + 0.9) = 2(13.2) = 26.4$.

So the true area lies between $14.0$ and $26.4$ square metres. The estimate
$20.2$ sits inside those limits, as it must.

The limits are wide because the channel is deep in the middle and shallow at the
edges, and six readings cannot pin down the shape. The answer is an estimate,
not an exact value, because the survey only records the depth at six points.
Between the readings the depth is unknown.

## 6. More strips give a better estimate

A smaller strip width follows the curve more closely, so the estimate improves.
For $\displaystyle\int_0^2 x^2\, dx$:

| Number of strips | $h$ | Estimate | Error |
|---|---|---|---|
| $4$ | $0.5$ | $2.75$ | $0.0833$ |
| $8$ | $0.25$ | $2.6875$ | $0.0208$ |
| $16$ | $0.125$ | $2.671875$ | $0.0052$ |

Each time the strip width halves, the error falls to about a quarter of its
previous value. The estimates approach $\dfrac{8}{3} = 2.6667$ from above,
because the curve bends upwards everywhere on the interval.

> **Watch out.** Three mistakes are common.
>
> **Using the whole width instead of the strip width.** The formula needs
> $h = \dfrac{b - a}{n}$, not $b - a$. **Re-check:** count the strip edges. With
> $n$ strips there are $n + 1$ of them, and the gaps between them all equal $h$.
>
> **Forgetting to double the interior heights.** Only $y_0$ and $y_n$ are
> counted once. Every other height is counted once from the strip on its left
> and once from the strip on its right. **Re-check:** the bracket must contain
> $n + 1$ heights in total, counting the doubled ones twice.
>
> **Guessing the direction of the error.** An estimate is not always too large.
> **Re-check:** look at the second derivative, or at the bend of the curve,
> before you say which way the error goes.

## 7. Try it: more trapezia, smaller error

**Predict first.** The figure shows a curve with trapezia drawn under it. Before
you change anything, predict whether the estimate on the screen is larger or
smaller than the true area. Write your prediction and one reason.

:::figure ch9-trapezium

**Test.** Choose each curve and move the slider to change the number of strips.
Watch the estimate, the true area and the message about the direction of the
error.

**Explain.** Write two sentences. The first explains why increasing the number of
strips improves the estimate on any curve. The second explains why one curve
overestimates and another underestimates.

## Progress check

Return to the chapter problem. The river survey gives depths
$0, 1.2, 2.5, 3.1, 2.4, 0.9, 0$ metres at distances
$0, 2, 4, 6, 8, 10, 12$ metres.

1. Estimate the cross-sectional area with the trapezium rule.
2. Find a lower limit and an upper limit for the area.
3. The water flows at about $0.8$ metres per second. Estimate the flow rate in
   cubic metres per second.

## You should now be able to

- state the trapezium rule and explain where it comes from;
- estimate a definite integral from a formula or from a table;
- use the second derivative to decide whether the estimate is too large or too
  small;
- use rectangle sums to give lower and upper limits for an area;
- explain why more strips give a better estimate;
- explain why an estimate from a table is not an exact value.
