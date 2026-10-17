---
title: 9.1 Locating roots by change of sign — Practise with help
chapter: 9
chapter_title: Numerical methods
section: '9.1'
section_title: Locating roots by change of sign
refs:
- I1
kind: guided-problems
---

# 9.1 Locating roots by change of sign — Practise with help

Work each question closed book first. For every bracket, write down both values
and say which sign each one has.

## Warm-up: remember

1. For $f(x) = x^3 - 2x - 3$, work out $f(0)$ and $f(2)$.
2. The graph of $y = x^2 - 5$ crosses the $x$-axis at two points. Write down
   the $x$-coordinate of each point, using a square root.

<details markdown="1">
<summary>Answers</summary>

1. $f(0) = -3$ and $f(2) = 8 - 4 - 3 = 1$.
2. Set $x^2 - 5 = 0$, so $x^2 = 5$ and $x = \pm\sqrt{5}$. The points are
   $(\sqrt{5}, 0)$ and $(-\sqrt{5}, 0)$.

If the first part was hard, revise substitution into a function in Section 2.9.
If the second was hard, revise solving $x^2 = k$ in Section 2.4.
</details>

:::figure warm-up-gate


## Practise with help

**1.** Show that $x^3 - 2x - 3 = 0$ has a root between $1$ and $2$.

<details markdown="1">
<summary>Hint</summary>

Write the left side as $f(x)$ and work out $f(1)$ and $f(2)$. One of them is
negative and one is positive.
</details>

<details markdown="1">
<summary>Next step</summary>

Compute $f(1) = 1 - 2 - 3 = -4$ and $f(2) = 8 - 4 - 3 = 1$.
</details>

<details markdown="1">
<summary>Full working</summary>

Let $f(x) = x^3 - 2x - 3$. Then

$$
f(1) = -4 < 0,
\qquad
f(2) = 1 > 0.
$$

The function is continuous and the signs differ, so the graph crosses the axis
between $1$ and $2$. The root lies in $(1, 2)$.
</details>

**2.** Show that $x^3 + 2x - 5 = 0$ has a root between $1$ and $2$.

<details markdown="1">
<summary>Hint</summary>

The whole expression is already equal to zero, so use the left side as $f(x)$.
Substitute $x = 1$ and $x = 2$.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out $f(1) = 1 + 2 - 5$ and $f(2) = 8 + 4 - 5$. One value is below zero and
the other is above.
</details>

<details markdown="1">
<summary>Full working</summary>

Let $f(x) = x^3 + 2x - 5$. Then

$$
f(1) = 1 + 2 - 5 = -2 < 0,
\qquad
f(2) = 8 + 4 - 5 = 7 > 0.
$$

The signs are opposite, so a root lies in $(1, 2)$.
</details>

**3.** Show that the equation $e^x = 4x$ has a root between $0$ and $1$.

<details markdown="1">
<summary>Hint</summary>

Bring every term to one side. The equation becomes $e^x - 4x = 0$, so the
function is $f(x) = e^x - 4x$.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out $f(0) = 1 - 0 = 1$ and $f(1) = e - 4$. Use $e = 2.718\ldots$
</details>

<details markdown="1">
<summary>Full working</summary>

Let $f(x) = e^x - 4x$. Then

$$
f(0) = 1 > 0,
\qquad
f(1) = e - 4 = -1.2817\ldots < 0.
$$

The signs are opposite, so a root lies in $(0, 1)$.
</details>

**4.** Locate the root of $x^3 + 2x - 5 = 0$ to one decimal place.

<details markdown="1">
<summary>Hint</summary>

Begin from the bracket $(1, 2)$ found in question 2. Test a value in the
middle and keep the half that still contains the sign change.
</details>

<details markdown="1">
<summary>Next step</summary>

Test $x = 1.5$: the value is $3.375 + 3 - 5 = 1.375$, which is positive. The
root lies in $(1, 1.5)$. Then test $1.3$ and $1.4$.
</details>

<details markdown="1">
<summary>Full working</summary>

The bracket is $(1, 2)$. Test $x = 1.5$:

$$
f(1.5) = 1.375 > 0,
$$

so the root lies in $(1, 1.5)$. Test $x = 1.3$ and $x = 1.4$:

$$
f(1.3) = 2.197 + 2.6 - 5 = -0.203 < 0,
\qquad
f(1.4) = 2.744 + 2.8 - 5 = 0.544 > 0.
$$

The root lies in $(1.3, 1.4)$. Test the midpoint, $x = 1.35$:

$$
f(1.35) = 2.460375 + 2.7 - 5 = 0.160375 > 0.
$$

Now the sign changes between $1.3$ and $1.35$, so the root is below $1.35$ and
rounds to $1.3$ to one decimal place.
</details>

**5.** A function is defined by $f(x) = \dfrac{1}{x - 2}$. It has
$f(1) = -1$ and $f(3) = 1$. Explain why the change of sign does **not** prove
that there is a root between $1$ and $3$.

<details markdown="1">
<summary>Hint</summary>

Look at the value $x = 2$ and ask what happens to the function there.
</details>

<details markdown="1">
<summary>Next step</summary>

The function is not defined at $x = 2$. Check whether $1/(x - 2)$ can ever
equal zero.
</details>

<details markdown="1">
<summary>Full working</summary>

The function has a break at $x = 2$, where it is undefined. Its graph jumps
from large negative values to large positive values across the break, so the
sign change comes from the break and not from a crossing. Also, a fraction
$\dfrac{1}{x - 2}$ is never zero for any finite $x$, so the equation
$\dfrac{1}{x - 2} = 0$ has no solution. The function is not continuous on
$[1, 3]$, so the change-of-sign test does not apply.
</details>

**6.** A function has these values:

| $x$ | $0$ | $1$ | $2$ | $3$ |
|---|---|---|---|---|
| $f(x)$ | $-1$ | $-0.5$ | $0.8$ | $4$ |

Between which pair of consecutive values does a root lie?

<details markdown="1">
<summary>Hint</summary>

A root needs a sign change between two consecutive readings in the table.
</details>

<details markdown="1">
<summary>Next step</summary>

Compare the signs of $-1$, $-0.5$, $0.8$ and $4$ in order and find the first
place where the sign changes.
</details>

<details markdown="1">
<summary>Full working</summary>

The values at $x = 0$ and $x = 1$ are negative. The value at $x = 2$ is
positive. The sign changes between $x = 1$ and $x = 2$, so a root lies in
$(1, 2)$.
</details>

**7.** For $f(x) = (x - 2)^2$, work out $f(1)$ and $f(3)$. Explain why the
change of sign fails to find the root at $x = 2$.

<details markdown="1">
<summary>Hint</summary>

Work out the two values first. Both are positive.
</details>

<details markdown="1">
<summary>Next step</summary>

A square is never negative, so the graph touches the axis at $x = 2$ and turns
back. It does not cross.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
f(1) = (1 - 2)^2 = 1,
\qquad
f(3) = (3 - 2)^2 = 1.
$$

Both values are positive, so there is no sign change on $(1, 3)$. The root at
$x = 2$ is repeated: the graph meets the axis and turns back without crossing.
A change-of-sign search misses a repeated root.
</details>
