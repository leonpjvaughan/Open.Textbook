---
title: 9.1 Locating roots by change of sign — Learn
chapter: 9
chapter_title: Numerical methods
section: '9.1'
section_title: Locating roots by change of sign
dfe:
- I1
kind: walkthrough
---

# 9.1 Locating roots by change of sign — Learn

**Prerequisites:** substituting a value into a function and reading function
notation from Chapter 2; the graphs of $e^x$ and $\ln x$ from Chapter 6; the
idea of a continuous curve from Chapter 1.

**By the end of this section you can:** explain what a root of $f(x) = 0$ is;
use the change of sign on an interval to show that a root lies inside it;
narrow an interval to locate a root to a given accuracy; and explain three ways
a change-of-sign search can fail.

## 1. What a root is

A **root** of an equation is a value of the variable that makes the two sides
equal. When the equation is written as $f(x) = 0$, a root is a value where the
graph of $y = f(x)$ meets the $x$-axis.

Some equations solve exactly. The equation $x^2 - 4 = 0$ has the roots $x = 2$
and $x = -2$, and the graph crosses the axis at both. Other equations have no
exact solution at all. The equation

$$
x + \ln x = 3
$$

cannot be rearranged to give $x$ by itself. A numerical method finds the root
by arithmetic instead of algebra.

## 2. The change of sign

Here is the key idea. Suppose $f$ is continuous on the interval from $a$ to $b$.
That means the graph has no break and no jump between those two values. If
$f(a)$ and $f(b)$ have **opposite signs**, then the graph must cross the axis
somewhere between them. There is at least one root in the interval.

Written with the values, the test is

$$
f(a) \times f(b) < 0.
$$

A negative product means one value is positive and the other is negative. The
interval $[a, b]$ is called a **bracket** for the root.

**Example 1.** Show that the equation $x^3 + x - 1 = 0$ has a root between
$0$ and $1$.

Write $f(x) = x^3 + x - 1$ and work out the value at each end.

$$
f(0) = 0^3 + 0 - 1 = -1,
\qquad
f(1) = 1^3 + 1 - 1 = 1.
$$

One value is negative and the other is positive. The function is continuous, so
the graph crosses the axis between $0$ and $1$. The root lies in the interval
$(0, 1)$.

## 3. Narrowing the interval

Once a root is bracketed, test a value in the middle. Keep the half of the
interval where the sign changes. Each step halves the interval, so the root is
trapped more and more tightly.

**Example 2.** Locate the root of $x^3 + x - 1 = 0$ to one decimal place.

Start from the bracket $(0, 1)$ and test $x = 0.5$:

$$
f(0.5) = 0.125 + 0.5 - 1 = -0.375.
$$

This is negative, and $f(1)$ is positive, so the root lies in $(0.5, 1)$. Now
test $x = 0.7$:

$$
f(0.7) = 0.343 + 0.7 - 1 = 0.043.
$$

This is positive, and $f(0.5)$ is negative, so the root lies in $(0.5, 0.7)$.
Test $x = 0.6$:

$$
f(0.6) = 0.216 + 0.6 - 1 = -0.184.
$$

Now $f(0.6) < 0$ and $f(0.7) > 0$, so the root lies in $(0.6, 0.7)$. Every
number in that interval rounds to $0.7$ or to $0.6$, so the answer to one
decimal place is uncertain. One more step settles it. Test $x = 0.68$:

$$
f(0.68) = 0.314432 + 0.68 - 1 = -0.005568.
$$

This is just below zero, while $f(0.69) = 0.018509$ is above zero. The root lies
in $(0.68, 0.69)$, so to two decimal places it is $0.68$. Section 9.3 finds it
to four decimal places with a faster method.

## 4. Roots of equations with exponentials and logarithms

The same test works for any continuous function, including the exponential and
logarithmic functions from Chapter 6. Bring everything to one side first.

**Example 3.** Show that the equation $e^x = 3x$ has a root between $1$ and $2$.

Rearrange to $e^x - 3x = 0$ and write $f(x) = e^x - 3x$. Then

$$
f(1) = e - 3 = -0.2817\ldots,
\qquad
f(2) = e^2 - 6 = 1.3891\ldots
$$

The values have opposite signs, so a root lies in $(1, 2)$.

**Example 4.** A function has the values in the table. Show that it has a root
between $2$ and $3$.

| $x$ | $1$ | $2$ | $3$ | $4$ |
|---|---|---|---|---|
| $f(x)$ | $-4$ | $-1.5$ | $0.7$ | $5$ |

The value at $x = 2$ is negative and the value at $x = 3$ is positive. The sign
changes, so there is a root in $(2, 3)$.

## 5. When change of sign fails

The test proves a root only when its conditions hold. There are three ways it
lets you down.

**The graph is not continuous.** The function $f(x) = \dfrac{1}{x}$ has
$f(-1) = -1$ and $f(1) = 1$, so the signs differ. But $1/x$ is never zero, and
the graph jumps from very negative to very positive across the break at $x = 0$.
There is no root in $(-1, 1)$.

**The root is a touch, not a crossing.** The function $f(x) = (x - 1)^2$ has a
root at $x = 1$, but it meets the axis and turns back. It is positive on both
sides, so no interval has a change of sign. A root like this is a **repeated
root**.

**An even number of roots hides the sign change.** For this function the values
at $-1$ and $2$ are both positive, yet the graph crosses the axis twice in
between. Two crossings return the sign to where it started, so the test finds
nothing.

$$
f(-1) = 3 > 0,
\qquad
f(2) = 3 > 0.
$$

There is a fourth case to watch. If $f(a) = 0$ at an end of the interval, then
$a$ itself is a root and no sign change is needed.

> **Watch out.** Three mistakes are common.
>
> **Reading a sign change as a promise of exactly one root.** A sign change
> proves *at least* one root. A cubic can cross the axis three times inside one
> interval. **Re-check:** after finding a bracket, sketch or plot the curve to
> see how many crossings it holds.
>
> **Testing only the two ends of a wide interval.** If the sign is the same at
> both ends, do not conclude that there is no root. There may be two, four or
> any even number of crossings. Narrow the interval and test again.
>
> **Using a function with a break.** The test needs continuity. Check that the
> function is defined and unbroken across the whole interval before you rely on
> the sign.

## 6. Try it: bracketing a root

**Predict first.** The figure shows the curve $y = x^3 - 3x + 1$. Before you move
the sliders, predict whether the sign at $x = -1$ and the sign at $x = 2$ are
the same or different. Write your prediction down.

:::figure ch9-change-of-sign

**Test.** Move the sliders for the two ends of the interval. Watch the values
$f(a)$ and $f(b)$ in the readout, and watch the message about the signs.

**Explain.** Write two sentences. The first explains why two opposite signs
guarantee a root between them. The second names an interval where the signs are
the same but the graph still crosses the axis twice.

## Progress check

Return to the chapter problem. The drone's height is
$h(t) = 40e^{-t/4} - 2t$.

1. Work out $h(5)$ and $h(6)$. Give each value to two decimal places.
2. Use the change of sign to show that the drone lands between $5$ and
   $6$ seconds.
3. Work out $h(5.3)$ and $h(5.31)$. What does the sign tell you about the
   landing time?

## You should now be able to

- explain what a root of $f(x) = 0$ is and where it appears on a graph;
- substitute two values into a function and compare their signs;
- use a change of sign to bracket a root;
- narrow a bracket by testing the midpoint;
- explain why a repeated root, a discontinuity or an even number of roots can
  defeat the test;
- state that a change of sign proves at least one root, not exactly one.
