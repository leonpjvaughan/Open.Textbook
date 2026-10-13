---
title: 9.3 Newton–Raphson and other recurrence relations — Learn
chapter: 9
chapter_title: Numerical methods
section: '9.3'
section_title: Newton–Raphson and other recurrence relations
refs:
- I2
kind: walkthrough
---

# 9.3 Newton–Raphson and other recurrence relations — Learn

**Prerequisites:** differentiating powers, exponentials and logarithms from
Section 7.3; the tangent to a curve from Section 7.5; rearranging an equation
into the form $x = g(x)$ from Section 9.2; bracketing a root by change of sign
from Section 9.1.

**By the end of this section you can:** use the Newton–Raphson formula to find a
root to a required accuracy; explain where the formula comes from; recognise a
recurrence relation that is Newton–Raphson in disguise; and explain three ways
the method can fail.

## 1. From a tangent to a formula

Section 9.2 found a root by rearranging an equation and iterating. That works,
but it can be slow. The Newton–Raphson method uses the tangent instead.

Suppose $r$ is a root of $f(x) = 0$, so the graph crosses the axis at $r$. Pick
a first estimate $x_0$ near $r$. Draw the tangent to the curve at the point
$(x_0, f(x_0))$. Near that point the tangent follows the curve closely, so it
meets the axis near $r$. Call that meeting point $x_1$.

The tangent through $(x_0, f(x_0))$ has gradient $f'(x_0)$, so its equation is

$$
y - f(x_0) = f'(x_0)(x - x_0).
$$

At the point where the tangent meets the axis, $y = 0$ and $x = x_1$. Substitute
both values:

$$
-f(x_0) = f'(x_0)(x_1 - x_0).
$$

Divide both sides by $f'(x_0)$ and add $x_0$:

$$
x_1 = x_0 - \frac{f(x_0)}{f'(x_0)}.
$$

Repeat the same step with $x_1$ in place of $x_0$. The **Newton–Raphson
formula** is

$$
x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}.
$$

Each step needs the value of the function and the value of its derivative at the
current estimate. The method is also called the **Newton–Raphson iteration**.

## 2. Using the formula

**Example 1.** Use Newton–Raphson with $x_0 = 0.7$ to find a root of
$x^3 + x - 1 = 0$ to four decimal places.

Write $f(x) = x^3 + x - 1$ and differentiate:

$$
f'(x) = 3x^2 + 1.
$$

Now apply the formula. Keep the full value in the calculator at every step.

| $n$ | $x_n$ | $f(x_n)$ | $f'(x_n)$ | $x_{n+1}$ |
|---|---|---|---|---|
| $0$ | $0.7$ | $0.043$ | $2.47$ | $0.6825911$ |
| $1$ | $0.6825911$ | $0.0006312$ | $2.3977918$ | $0.6823279$ |
| $2$ | $0.6823279$ | $0.0000002$ | $2.3967141$ | $0.6823278$ |

The values settle after three steps. The root is $0.6823$ to four decimal
places. Compare this with Section 9.1, where the same root needed four halving
steps to reach two decimal places.

## 3. A recurrence relation in disguise

Some recurrences look unlike Newton–Raphson but turn out to be the same method.
Check a recurrence by writing it as $x - \dfrac{f(x)}{f'(x)}$ and looking for
$f$.

**Example 2.** Show that the recurrence
$x_{n+1} = \dfrac{1}{2}\left(x_n + \dfrac{5}{x_n}\right)$ is Newton–Raphson
applied to $x^2 - 5 = 0$. Use it with $x_0 = 2$ to find $x_3$.

Take $f(x) = x^2 - 5$, so $f'(x) = 2x$. Then

$$
x - \frac{f(x)}{f'(x)}
= x - \frac{x^2 - 5}{2x}
= \frac{2x^2 - x^2 + 5}{2x}
= \frac{x^2 + 5}{2x}
= \frac{1}{2}\left(x + \frac{5}{x}\right).
$$

This is the given recurrence, so the recurrence is Newton–Raphson for
$x^2 - 5 = 0$. The root it finds is $\sqrt{5}$.

Now iterate from $x_0 = 2$:

$$
x_1 = \frac{1}{2}\left(2 + \frac{5}{2}\right) = 2.25,
$$

$$
x_2 = \frac{1}{2}\left(2.25 + \frac{5}{2.25}\right) = 2.236111,
\qquad
x_3 = \frac{1}{2}\left(2.236111 + \frac{5}{2.236111}\right) = 2.236068.
$$

The value $x_3 = 2.236068$ agrees with $\sqrt{5} = 2.2360680\ldots$ to six
decimal places. Newton–Raphson reaches the value in three steps because it uses
the gradient, not only the height.

## 4. Exponential and logarithmic equations

The same formula works for any differentiable function. Bring every term to one
side before you start, so the equation reads $f(x) = 0$.

**Example 3.** Use Newton–Raphson with $x_0 = 1.5$ to find a root of
$e^x = 3x$ to four decimal places.

Rearrange to $e^x - 3x = 0$ and write $f(x) = e^x - 3x$. Then
$f'(x) = e^x - 3$. Substitute $x_0 = 1.5$:

$$
f(1.5) = e^{1.5} - 4.5 = -0.0183109,
\qquad
f'(1.5) = e^{1.5} - 3 = 1.4816891.
$$

Apply the formula:

$$
x_1 = 1.5 - \frac{-0.0183109}{1.4816891} = 1.5 + 0.0123581 = 1.5123581.
$$

Repeat with $x_1$:

$$
x_2 = 1.5123581 - \frac{0.0003436}{1.5374181} = 1.5121346,
\qquad
x_3 = 1.5121346 - \frac{0.0000001}{1.5364040} = 1.5121346.
$$

The root is $1.5121$ to four decimal places.

The equation $e^x = 3x$ has a second root near $x = 0.6191$, because
$f(0.6) > 0$ and $f(0.7) < 0$. Starting from $x_0 = 0.5$ finds that root
instead. The starting value decides which root the method reaches.

## 5. When Newton–Raphson fails

Three things can go wrong. Each one has a clear cause.

**A stationary point at the starting value.** If $f'(x_n) = 0$, the formula
divides by zero. The tangent is horizontal, so it never meets the axis. For
$f(x) = x^2 - 4$, the starting value $x_0 = 0$ gives
$f'(0) = 0$. The method breaks down at the first step.

**The iterates settle into a cycle.** The formula can jump back and forth
without reaching the root. For $f(x) = x^3 - 2x + 2$ from $x_0 = 0$:

$$
x_1 = 1.0,
\qquad
x_2 = 0.0,
\qquad
x_3 = 1.0.
$$

The values repeat $1, 0, 1, 0, \ldots$ for ever. The method never settles, even
though the formula was applied correctly.

**The gradient leads the estimate far away.** A step can overshoot. For
$f(x) = e^x - 3x$ with a starting value far from a root, the first tangent can
cross the axis a long way from the root. The next step then starts from a poor
value. A sketch of the curve shows the danger before you iterate.

> **Watch out.** Three mistakes are common.
>
> **Dividing by a zero derivative.** If $f'(x_n) = 0$, the step is undefined.
> **Re-check:** work out $f'(x_0)$ before you begin. Choose a starting value
> where the derivative is not zero.
>
> **Assuming the method always works.** Newton–Raphson can cycle, overshoot or
> find a different root from the one you expected. **Re-check:** bracket the
> root by change of sign first, so you know which root you are aiming for.
>
> **Rounding every iterate.** Rounding each value to three decimal places can
> change the value the method settles on. **Re-check:** keep the full value in
> the calculator and round only the value you write down.

## 6. Try it: the tangent and the next estimate

**Predict first.** The figure shows a curve, a movable starting value $x_0$ and
the tangent at that point. Before you move the slider, predict whether the first
estimate $x_1$ lies to the left or to the right of a root. Write down your
prediction.

:::figure ch9-newton-raphson

**Test.** Choose each equation and move the starting-value slider. Watch the
first estimate, the list of iterates and the message about what the method is
doing.

**Explain.** Write two sentences. The first explains why the tangent gives a
better estimate than the starting value. The second describes what happens when
the starting value sits at a stationary point.

## Progress check

Return to the chapter problem. The drone's height is
$h(t) = 40e^{-t/4} - 2t$.

1. Differentiate to find $h'(t)$.
2. Use Newton–Raphson with $t_0 = 5$ to find $t_1$ to four decimal places.
3. Continue to find $t_2$ and $t_3$. Give the landing time to three decimal
   places.

## You should now be able to

- explain how the tangent to a curve produces the Newton–Raphson formula;
- use $x_{n+1} = x_n - \dfrac{f(x_n)}{f'(x_n)}$ to find a root;
- keep full precision in the calculator and round only the answer;
- show that a recurrence relation is Newton–Raphson for a chosen function;
- explain why a zero derivative, a cycle or a distant starting value makes the
  method fail;
- compare Newton–Raphson with the simple iteration of Section 9.2.
