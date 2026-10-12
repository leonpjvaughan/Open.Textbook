---
title: 2.6 Linear and quadratic inequalities, and set notation — Learn
chapter: 2
chapter_title: Algebra and functions
section: '2.6'
section_title: Linear and quadratic inequalities, and set notation
dfe:
- B5
kind: walkthrough
---

# 2.6 Linear and quadratic inequalities, and set notation — Learn

**Prerequisites:** solving linear equations; factorising and sketching a
parabola from 2.3; the number line.

**By the end of this section you can:** solve a linear inequality and remember to
reverse the sign when you multiply or divide by a negative number; solve a
quadratic inequality by comparing the parabola with the $x$-axis; and write the
solution as an interval, as a union, or in words.

## 1. An inequality has a range of answers

An equation has a list of answers. An **inequality** has a range of answers, and
the answer is a set of numbers. Solve an inequality the way you solve an
equation, with one extra rule.

> Adding or subtracting the same number keeps the direction of the inequality.
>
> Multiplying or dividing by a **negative** number reverses the direction.

For example, $-2x < 6$ gives $x > -3$, because dividing by $-2$ turns $<$ into
$>$. Check with $x = 0$: the original is $0 < 6$, which is true, and $0 > -3$ is
also true.

## 2. Set notation

A solution set can be written in several ways. The interval notation is the one
used most at A level.

| Inequality | Interval | Words |
|---|---|---|
| $a < x < b$ | $(a, b)$ | between $a$ and $b$, not including either |
| $a \leq x \leq b$ | $[a, b]$ | between $a$ and $b$, including both |
| $a < x \leq b$ | $(a, b]$ | open at $a$, closed at $b$ |
| $x > a$ | $(a, \infty)$ | greater than $a$ |
| $x \leq a$ | $(-\infty, a]$ | at most $a$ |

A round bracket excludes the end point; a square bracket includes it. The symbols
$\infty$ and $-\infty$ always take a round bracket, because infinity is not a
number you can reach.

**Example 1.** Solve $2x - 3 < 5x + 6$.

Subtract $2x$ from both sides:

$$
-3 < 3x + 6.
$$

Subtract $6$:

$$
-9 < 3x.
$$

Divide by $3$, a positive number, so the direction does not change:

$$
-3 < x.
$$

The solution set is $x \in (-3, \infty)$.

## 3. Quadratic inequalities

A quadratic inequality asks where a parabola is above or below the $x$-axis. The
method has three steps.

1. Solve the related equation to find the roots.
2. Sketch the parabola: it opens upwards when the coefficient of $x^2$ is
   positive.
3. Read the sign from the sketch.

**Example 2.** Solve $x^2 - x - 6 < 0$.

First solve $x^2 - x - 6 = 0$. Factorise:

$$
(x - 3)(x + 2) = 0,
$$

so the roots are $x = -2$ and $x = 3$.

The parabola $y = x^2 - x - 6$ opens upwards, so it is below the $x$-axis
*between* the roots and above it outside them. The inequality asks for $< 0$:

$$
-2 < x < 3.
$$

So the solution set is $x \in (-2, 3)$.

**Example 3.** Solve $x^2 + 2x - 8 > 0$.

Factorise the related equation:

$$
x^2 + 2x - 8 = (x + 4)(x - 2),
$$

so the roots are $x = -4$ and $x = 2$. The parabola opens upwards and the
inequality asks for $> 0$, which is *outside* the roots:

$$
x < -4 \quad \text{or} \quad x > 2.
$$

In set notation,

$$
x \in (-\infty, -4) \cup (2, \infty).
$$

The symbol $\cup$ means **union**: the answer is everything in the first
interval, together with everything in the second. When the answer has two pieces,
write it as a union.

**Example 4.** Solve $x^2 - 6x + 9 \leq 0$.

Factorise:

$$
x^2 - 6x + 9 = (x - 3)^2.
$$

A square is never negative, so $(x - 3)^2 \leq 0$ only when $(x - 3)^2 = 0$. The
only solution is $x = 3$.

## 4. Inequalities in two variables

An inequality such as $y > x + 1$ describes a **region** of the plane, not a
range of $x$.

- Draw the boundary line $y = x + 1$.
- Use a dashed line for a strict inequality ($<$, $>$) and a solid line for
  $\leq$ or $\geq$.
- Shade the region that satisfies the inequality. Test one point, such as
  $(0, 0)$, to decide which side.

For $y > x + 1$, the point $(0, 0)$ gives $0 > 1$, which is false, so the region
above the line is the solution and $(0, 0)$ is not in it.

## 5. Try it: reading the solution set

**Predict first.** For the roots $x = -2$ and $x = 3$, the inequality
$x^2 - x - 6 > 0$ is solved outside the roots and $x^2 - x - 6 < 0$ is solved
between them. Which one gives a single interval, and which gives a union of two
intervals? Write your prediction down before you touch the controls.

:::figure ch2-inequality-region

**Test.** Move the two roots and choose the inequality. The number line marks the
solution set, with an open circle at a value the set leaves out and a filled
circle at a value it includes.

**Explain.** Keep the roots fixed and switch between $f(x) > 0$ and $f(x) < 0$.
Why does one inequality give a single interval and the other give two separate
pieces? Write two sentences referring to where the parabola sits above and below
the $x$-axis.

> **Watch out.** Two errors are common.
>
> **Forgetting to reverse the sign.** Dividing $-2x > 8$ by $-2$ gives $x < -4$,
> not $x > -4$. Test one value to check the direction.
>
> **Choosing the wrong side for a quadratic.** $x^2 - x - 6 < 0$ is solved
> *between* the roots, but $x^2 - x - 6 > 0$ is solved *outside* them. Sketch the
> parabola every time.
>
> **Re-check:** pick a number from your solution set, substitute it into the
> original inequality, and confirm that it is true.

## Progress check

Return to the chapter problem. The arch is $y = 4 - \frac{x^2}{4}$ and the lorry
roof is $3.2$ m above the road.

1. Write an inequality for the positions $x$ where the arch is at least as high
   as the lorry roof.
2. Solve the inequality $4 - \frac{x^2}{4} \geq 3.2$ and give the solution as an
   interval.
3. The arch is wide enough at roof height for a lorry of what width? Give your
   answer in exact form and to two decimal places.
4. The lorry is $2.5$ m wide. Use your interval to decide whether the lorry fits,
   and write one sentence of conclusion.

## You should now be able to

- solve a linear inequality and reverse the sign when dividing by a negative;
- solve a quadratic inequality by using the roots and the shape of the parabola;
- write a solution set as an interval or a union of intervals;
- decide whether an endpoint is included from the inequality symbol;
- describe the region for an inequality in two variables.
