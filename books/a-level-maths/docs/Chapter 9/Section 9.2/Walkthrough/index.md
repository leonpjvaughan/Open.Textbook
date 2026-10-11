---
title: 9.2 Simple iterative methods, cobweb and staircase diagrams — Learn
chapter: 9
chapter_title: Numerical methods
section: '9.2'
section_title: Simple iterative methods, cobweb and staircase diagrams
dfe:
- I2
kind: walkthrough
---

# 9.2 Simple iterative methods, cobweb and staircase diagrams — Learn

**Prerequisites:** rearranging an equation from Chapter 2; reading the graph of a
function from Section 2.9; differentiating a power from Section 7.3;
logarithms from Section 6.3.

**By the end of this section you can:** rearrange an equation into the form
$x = g(x)$; use the recurrence $x_{n+1} = g(x_n)$ to find a root approximately;
draw and read a cobweb or staircase diagram; and explain why a rearrangement
converges or diverges.

## 1. From an equation to a recurrence

Change of sign traps a root but does not find it to many decimal places. The
next method finds the value by repeating the same calculation.

Start with an equation written as $x = g(x)$. A value that satisfies it is a
**fixed point** of the function $g$, because $g$ sends the value back to itself.
From any starting value $x_0$, apply the rule again and again:

$$
x_{n+1} = g(x_n).
$$

This is a **recurrence relation**, also called an **iterative method**. Each
output becomes the next input.

**Example 1.** Rearrange $x^3 + x - 1 = 0$ into the form $x = g(x)$.

Take the $x$ term to the other side, so $x^3 + x = 1$ becomes $x(x^2 + 1) = 1$.
Divide both sides by $x^2 + 1$:

$$
x = \frac{1}{x^2 + 1}.
$$

Now $g(x) = \dfrac{1}{x^2 + 1}$, and the recurrence is
$x_{n+1} = \dfrac{1}{x_n^2 + 1}$.

## 2. Iterating to a root

**Example 2.** Use $x_{n+1} = \dfrac{x_n + 2}{3}$ with $x_0 = 0$. Find $x_1$,
$x_2$, $x_3$ and $x_4$, and describe what happens.

Substitute each value into the right-hand side in turn:

$$
x_1 = \frac{0 + 2}{3} = \frac{2}{3} = 0.6667,
\qquad
x_2 = \frac{\tfrac{2}{3} + 2}{3} = \frac{8}{9} = 0.8889,
$$

$$
x_3 = \frac{\tfrac{8}{9} + 2}{3} = \frac{26}{27} = 0.9630,
\qquad
x_4 = \frac{\tfrac{26}{27} + 2}{3} = \frac{80}{81} = 0.9877.
$$

The values climb towards $1$. In fact the fixed point is $x = 1$, because
$1 = \dfrac{1 + 2}{3}$. The iterations approach it from below.

**Example 3.** Use $x_{n+1} = \dfrac{1}{x_n + 1}$ with $x_0 = 1$. Find $x_1$,
$x_2$ and $x_3$.

$$
x_1 = \frac{1}{1 + 1} = \frac{1}{2},
\qquad
x_2 = \frac{1}{\tfrac{1}{2} + 1} = \frac{2}{3},
\qquad
x_3 = \frac{1}{\tfrac{2}{3} + 1} = \frac{3}{5}.
$$

The values are $0.5$, $0.6667$ and $0.6$. They close in on the fixed point
$x = \dfrac{\sqrt{5} - 1}{2} = 0.6180\ldots$ from both sides.

## 3. Cobweb and staircase diagrams

A **cobweb diagram** shows the iteration on one picture. Draw the line $y = x$
and the curve $y = g(x)$. From the starting value, move vertically to the curve,
then horizontally to the line $y = x$. Repeat.

Each vertical move applies $g$, and each horizontal move carries the new value
back to the line $y = x$ as the next input. The shape of the path depends on the
gradient of $g$ near the fixed point.

- a **staircase** steps towards the fixed point from one side, and happens when
  $0 \leq g'(x) < 1$;
- a **cobweb** spirals in from alternating sides, and happens when
  $-1 < g'(x) < 0$;
- a **spiral outwards** moves away from the fixed point, and happens when
  $|g'(x)| > 1$.

So the iteration converges to the fixed point when $|g'(x)| < 1$ near it, and
diverges when $|g'(x)| > 1$. The condition is a local one: it is checked at the
fixed point, not across the whole curve.

**Example 4.** For $g(x) = \dfrac{x + 2}{3}$, find $g'(x)$ and use it to explain
why the iteration in Example 2 converges.

Differentiate term by term:

$$
g'(x) = \frac{1}{3}.
$$

The gradient has magnitude $\dfrac{1}{3} < 1$ everywhere, and in particular at
the fixed point $x = 1$. Each step closes $\dfrac{2}{3}$ of the remaining gap,
so the values converge quickly. The path is a staircase.

## 4. When an iteration fails

A rearrangement can converge or diverge, depending on which one you choose.

**Example 5.** The recurrence $x_{n+1} = 3x_n - 2$ has the fixed point $x = 1$,
because $3(1) - 2 = 1$. Take $x_0 = 0$ and find the first three values.

$$
x_1 = 3(0) - 2 = -2,
\qquad
x_2 = 3(-2) - 2 = -8,
\qquad
x_3 = 3(-8) - 2 = -26.
$$

The values run away from $1$. The gradient is $g'(x) = 3$, and $3 > 1$, so the
iteration diverges.

**Example 6.** Returning to $x^3 + x - 1 = 0$, the rearrangement
$x = 1 - x^3$ also comes from moving the terms across. Take $x_0 = 0.5$:

$$
x_1 = 1 - 0.5^3 = 0.875,
\qquad
x_2 = 1 - 0.875^3 = 0.3301,
\qquad
x_3 = 1 - 0.3301^3 = 0.9640.
$$

The values jump about and do not settle. Here $g'(x) = -3x^2$, and at the root
$x = 0.6823$ the magnitude is about $1.4 > 1$, so this rearrangement diverges.
The rearrangement $x = \dfrac{1}{x^2 + 1}$ from Example 1 converges for the same
root, because there $|g'|$ is about $0.64 < 1$. **The equation has not changed;
only the rearrangement has.**

> **Watch out.** Three mistakes are common.
>
> **Blindly substituting into a rearrangement that diverges.** A recurrence can
> be set up correctly and still run away from the root. **Re-check:** work out
> $g'$ at the root and confirm that $|g'| < 1$ before you iterate.
>
> **Stopping too early.** Two successive values that agree to three decimal
> places do not guarantee three correct decimal places in the root. Agreement is
> a practical signal to stop, not a proof. Improve the accuracy by iterating
> more, or check the bracket with a change of sign.
>
> **Rounding at every step.** Keep the full value in the calculator and round
> only the value you write down. Rounding each iterate to two decimal places can
> change the answer the method reaches.

## 5. Try it: cobweb and staircase

**Predict first.** The figure shows $y = g(x)$ and $y = x$ for three different
rearrangements, each with the same fixed point. Before you move anything, predict
which one steps neatly towards the fixed point and which one spirals away.

:::figure ch9-cobweb

**Test.** Choose each rearrangement from the list and move the starting-value
slider. Watch the first four iterates in the readout and the path drawn on the
diagram.

**Explain.** Write two sentences. The first explains why the gradient of $g$ at
the fixed point decides whether the iteration converges. The second explains why
a staircase and a cobweb look different even though both converge.

## Progress check

Return to the chapter problem. The drone's height is
$h(t) = 40e^{-t/4} - 2t$, and it lands when $h(t) = 0$. Divide both sides of
$40e^{-t/4} = 2t$ by $2$ to get $20e^{-t/4} = t$.

1. Show that this rearranges to $t = 4\ln\left(\dfrac{20}{t}\right)$.
2. Use the recurrence $t_{n+1} = 4\ln\left(\dfrac{20}{t_n}\right)$ with
   $t_0 = 5$. Work out $t_1$, $t_2$ and $t_3$ to four decimal places.
3. The values do not settle quickly. Section 9.3 uses a faster method.

## You should now be able to

- rearrange an equation into the form $x = g(x)$;
- explain what a fixed point of $g$ is;
- use a recurrence relation to produce successive approximations to a root;
- draw and read a cobweb or staircase diagram;
- find $g'$ at a fixed point and use $|g'| < 1$ to explain convergence;
- explain why one rearrangement can converge while another diverges;
- explain why a slow method or early rounding can give a poor answer.
