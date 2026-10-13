---
title: 2.9 Graphs, the modulus function, asymptotes and intersections — Learn
chapter: 2
chapter_title: Algebra and functions
section: '2.9'
section_title: Graphs, the modulus function, asymptotes and intersections
refs:
- B7
kind: walkthrough
---

# 2.9 Graphs, the modulus function, asymptotes and intersections — Learn

**Prerequisites:** factorising from 2.3 and 2.7; solving quadratics from 2.4;
simultaneous equations from 2.5; inequalities from 2.6.

**By the end of this section you can:** sketch a polynomial from its factors;
draw and use the modulus function; solve equations and inequalities that contain
a modulus; find the asymptotes of $y = \frac{a}{x}$ and $y = \frac{a}{x^2}$; and
find where two graphs meet.

## 1. Sketching a polynomial

A sketch is not a plot. It carries the features that matter, in the right places.

1. Find the roots by solving $y = 0$ and factorising.
2. Find the $y$-intercept by putting $x = 0$.
3. Decide the shape: a positive leading coefficient means the curve goes up at
   both ends for an even degree, and up on the right for an odd degree.
4. Mark any repeated root. At a repeated root the curve touches the $x$-axis
   instead of crossing it.

**Example 1.** Sketch $y = x^2 - x - 6$.

Factorise to find the roots:

$$
x^2 - x - 6 = (x - 3)(x + 2),
$$

so the roots are $x = 3$ and $x = -2$. Putting $x = 0$ gives the $y$-intercept
$-6$. The coefficient of $x^2$ is positive, so the parabola opens upwards. The
sketch is a $U$ shape crossing the $x$-axis at $-2$ and $3$ and the $y$-axis at
$-6$.

## 2. The modulus function

The **modulus** of a number is its distance from zero, so it is never negative.

$$
|x| = \begin{cases} x & \text{if } x \geq 0, \\ -x & \text{if } x < 0. \end{cases}
$$

The graph of $y = |x|$ is a $V$ shape, with its point at the origin. The graph of
$y = |x - a|$ is the same $V$ moved right by $a$, with its point at $(a, 0)$.

An equation with a modulus has two cases, because the expression inside the
modulus can be positive or negative.

**Example 2.** Solve $|x - 3| = 2$.

Case 1, $x - 3 \geq 0$:

$$
x - 3 = 2, \qquad x = 5.
$$

Case 2, $x - 3 < 0$:

$$
-(x - 3) = 2, \qquad x - 3 = -2, \qquad x = 1.
$$

Both values are solutions. On the graph, they are the two points where the
$V$ shape $y = |x - 3|$ meets the line $y = 2$.

**Example 3.** Solve $|x + 1| < 3$.

The inequality says the distance from $x$ to $-1$ is less than $3$. This is the
interval between $-1 - 3$ and $-1 + 3$:

$$
-4 < x < 2.
$$

In set notation, $x \in (-4, 2)$. Change $<$ to $>$ and the answer changes to the
two intervals outside: $x < -4$ or $x > 2$.

## 3. Try it: the modulus fold

**Predict first.** The figure draws $y = |x - a|$ together with a horizontal
line $y = b$. Before you touch the sliders, predict how many solutions the
equation $|x - a| = b$ has when $b > 0$, when $b = 0$, and when $b < 0$. Write
all three answers down.

:::figure ch2-modulus-fold

**Test.** Move the slider for $a$ and watch the point of the $V$ slide along the
$x$-axis. Then move the slider for $b$ and watch the horizontal line and the
points where it meets the $V$. Take $b$ above zero first, then set it to zero,
then push it below zero.

**Explain.** The dashed line is $y = x - a$, drawn only where that line is
negative. Write two sentences saying how it becomes the left arm of the $V$, and
why a value of $b$ below zero leaves the equation with no solutions.

## 4. Asymptotes

An **asymptote** is a line that a curve approaches but never reaches. The
reciprocal graphs are the standard examples.

$$
y = \frac{a}{x} \qquad \text{and} \qquad y = \frac{a}{x^2}, \qquad a \neq 0.
$$

Both have a **vertical asymptote** at $x = 0$, where the denominator is zero and
the curve is undefined. As $x$ grows large, the fraction $\frac{a}{x}$ gets closer
to $0$, so both graphs have a **horizontal asymptote** at $y = 0$.

$$
\lim_{x \to \infty} \frac{a}{x} = 0.
$$

The notation $\lim_{x \to \infty}$ means "the value the expression approaches as
$x$ grows without bound". The curve does not have to reach the value; it only has
to get closer.

**Example 4.** Find the asymptotes of $y = \dfrac{3}{x - 2} + 1$.

The denominator is zero at $x = 2$, so there is a vertical asymptote at $x = 2$.
As $x \to \infty$ the fraction approaches $0$, so

$$
y \to 0 + 1 = 1.
$$

The horizontal asymptote is $y = 1$.

## 5. Intersections

The points where two graphs meet are the solutions of the two equations taken
together.

**Example 5.** Find where $y = x^2$ meets $y = x + 6$.

Set the expressions equal:

$$
x^2 = x + 6, \qquad x^2 - x - 6 = 0, \qquad (x - 3)(x + 2) = 0.
$$

So $x = 3$ or $x = -2$. Substitute into $y = x^2$:

$$
x = 3 \Rightarrow y = 9, \qquad x = -2 \Rightarrow y = 4.
$$

The graphs meet at $(3, 9)$ and $(-2, 4)$. Reading an equation graphically is
exactly this: the roots of an equation are the crossings of the two graphs.

> **Watch out.** A case that fails is still a case you must check.
>
> For $|x| = 2x - 1$, the case $x < 0$ gives $x = \frac{1}{3}$, which is not less
> than zero, so it is rejected. The equation has the single solution $x = 1$.
> Always test each value against the case that produced it.
>
> **An asymptote is not a value.** The curve never touches its asymptote, so
> $y = 1$ is not in the range of $y = \frac{3}{x - 2} + 1$. **Re-check:** put each
> solution back into the original equation, and mark on your sketch whether the
> curve is allowed to cross the asymptote.

## Progress check

Return to the chapter problem. The arch is $y = 4 - \frac{x^2}{4}$ and the lorry
roof is $3.2$ m above the road.

1. Write the condition "the arch is at least as high as the lorry roof" as a
   modulus inequality, using symmetry about $x = 0$.
2. Solve the inequality and give the set of positions where the roof clears the
   arch.
3. Find the greatest height of the arch and the two points where the arch meets
   the road, and sketch the arch using those three features.
4. Explain, using the graph, why a wider lorry has less room under a higher part
   of the arch.

## You should now be able to

- sketch a polynomial from its roots, its intercept and its shape;
- use the modulus function and its $V$ shape;
- solve a modulus equation by splitting into cases and testing each one;
- solve a modulus inequality and write the answer as a set;
- find the asymptotes of $y = \frac{a}{x}$ and $y = \frac{a}{x^2}$ and of simple
  shifts of them;
- find the points where two graphs meet.
