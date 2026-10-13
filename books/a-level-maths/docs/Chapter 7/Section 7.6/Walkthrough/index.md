---
title: 7.6 Increasing and decreasing functions — Learn
chapter: 7
chapter_title: Differentiation
section: '7.6'
section_title: Increasing and decreasing functions
refs:
- G3
kind: walkthrough
---

# 7.6 Increasing and decreasing functions — Learn

**Prerequisites:** differentiating polynomials from Section 7.3; solving linear
and quadratic inequalities from Chapter 2; reading the sign of a factorised
expression.

**By the end of this section you can:** decide where a function is increasing and
where it is decreasing from the sign of its derivative; solve the inequalities
$f'(x) > 0$ and $f'(x) < 0$; and link the intervals to the graph of the function.

## 1. The sign of the derivative

The derivative tells you which way a function is going.

- On an interval where $f'(x) > 0$, the function is **increasing** as $x$
  increases.
- On an interval where $f'(x) < 0$, the function is **decreasing** as $x$
  increases.

The word describes the direction of the curve, not its height. A function can be
increasing while its values are negative, and decreasing while its values are
positive.

To find the intervals, differentiate, then solve the inequalities $f'(x) > 0$ and
$f'(x) < 0$.

**Example 1.** Find where $f(x) = x^2 - 4x$ is increasing and where it is
decreasing.

Differentiate:

$$
f'(x) = 2x - 4.
$$

Solve the inequality $f'(x) > 0$:

$$
2x - 4 > 0
\quad \Rightarrow \quad x > 2.
$$

So $f$ is increasing for $x > 2$. Solve $f'(x) < 0$:

$$
2x - 4 < 0
\quad \Rightarrow \quad x < 2.
$$

So $f$ is decreasing for $x < 2$. At $x = 2$ the derivative is zero, and the
curve has a minimum.

## 2. A cubic with two turning points

When the derivative is a quadratic, the sign changes at each of its roots. A
sign table keeps the intervals straight.

**Example 2.** Find where $f(x) = x^3 - 3x^2 + 1$ is increasing and where it is
decreasing.

Differentiate and factorise:

$$
f'(x) = 3x^2 - 6x = 3x(x - 2).
$$

The roots are $x = 0$ and $x = 2$. Test a value in each interval.

| Interval | Test value | Sign of $f'(x)$ | Behaviour of $f$ |
|---|---|---|---|
| $x < 0$ | $x = -1$ | $3(-1)(-3) = 9 > 0$ | increasing |
| $0 < x < 2$ | $x = 1$ | $3(1)(-1) = -3 < 0$ | decreasing |
| $x > 2$ | $x = 3$ | $3(3)(1) = 9 > 0$ | increasing |

So $f$ is increasing for $x < 0$ and for $x > 2$, and decreasing for
$0 < x < 2$. The curve rises, falls, then rises again.

**Example 3.** Find the intervals on which $f(x) = 2x^3 - 9x^2 + 12x$ is
decreasing.

Differentiate and factorise:

$$
f'(x) = 6x^2 - 18x + 12 = 6(x^2 - 3x + 2) = 6(x - 1)(x - 2).
$$

The roots are $x = 1$ and $x = 2$. Test $x = 0$, $x = 1.5$ and $x = 3$.

| Interval | Test value | Sign of $f'(x)$ | Behaviour of $f$ |
|---|---|---|---|
| $x < 1$ | $x = 0$ | $6(-1)(-2) = 12 > 0$ | increasing |
| $1 < x < 2$ | $x = 1.5$ | $6(0.5)(-0.5) = -1.5 < 0$ | decreasing |
| $x > 2$ | $x = 3$ | $6(2)(1) = 12 > 0$ | increasing |

So the function is decreasing only on the interval $1 < x < 2$.

> **Watch out.** Three mistakes are common with increasing and decreasing
> functions.
>
> **Saying "increasing" because the values are positive.** A function is
> increasing where its gradient is positive. The function $y = x^2 - 4$ is
> increasing for $x > 0$, even though its values are negative until $x = 2$.
>
> **Testing one point and assuming the rest.** The sign of $f'$ can change at
> each root. Use a sign table with one test value in every interval.
>
> **Writing $\le$ and $\ge$ as open or closed carelessly.** Strictly increasing
> and strictly decreasing describe intervals where the derivative is not zero.
> At a turning point itself, the gradient is zero. **Re-check:** after you list
> the intervals, confirm that the derivative changes sign at each boundary.

## You should now be able to

- decide where a function is increasing or decreasing from the sign of $f'$;
- solve $f'(x) > 0$ and $f'(x) < 0$ for a polynomial;
- use a sign table to handle more than one root of $f'$;
- sketch a curve whose intervals of increase and decrease you have found.
