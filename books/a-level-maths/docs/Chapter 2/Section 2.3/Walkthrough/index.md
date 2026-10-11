---
title: 2.3 Quadratic functions, the discriminant and completing the square — Learn
chapter: 2
chapter_title: Algebra and functions
section: '2.3'
section_title: Quadratic functions, the discriminant and completing the square
dfe:
- B3
kind: walkthrough
---

# 2.3 Quadratic functions, the discriminant and completing the square — Learn

**Prerequisites:** expanding brackets; factorising; the index laws from 2.1;
substituting a value into an expression.

**By the end of this section you can:** write a quadratic in completed-square
form; read off its vertex and its line of symmetry; use the discriminant to say
how many real roots the equation has; and connect the completed-square sign to
the shape of the curve.

## 1. Three forms of the same function

A **quadratic function** has the form $y = ax^2 + bx + c$, with $a \neq 0$. Its
graph is a parabola. The same function can be written in three ways, and each
way shows a different feature.

| Form | Example | What it shows |
|---|---|---|
| Expanded | $y = x^2 - 6x + 5$ | the $y$-intercept, $c = 5$ |
| Factorised | $y = (x - 1)(x - 5)$ | the roots, $x = 1$ and $x = 5$ |
| Completed square | $y = (x - 3)^2 - 4$ | the vertex, $(3, -4)$ |

The three forms are equal for every value of $x$. Choosing a form is choosing
which feature you want to read.

## 2. Completing the square

To complete the square for a **monic** quadratic (one with $a = 1$), take half
of the coefficient of $x$ and write the square of $x$ plus that number.

**Example 1.** Write $x^2 + 8x + 5$ in completed-square form.

Half of $8$ is $4$, and

$$
(x + 4)^2 = x^2 + 8x + 16.
$$

The expanded square has $16$ where the expression has $5$. Subtract the
difference, $16 - 5 = 11$:

$$
x^2 + 8x + 5 = (x + 4)^2 - 11.
$$

Watch the sign of the bracket: the square is $(x + 4)^2$ because the coefficient
$+8$ is positive.

**Example 2.** Write $2x^2 - 12x + 7$ in the form $a(x + p)^2 + q$.

Take the factor $2$ out of the first two terms:

$$
2x^2 - 12x + 7 = 2\left(x^2 - 6x\right) + 7.
$$

Complete the square inside the bracket. Half of $-6$ is $-3$, and
$(x - 3)^2 = x^2 - 6x + 9$:

$$
x^2 - 6x = (x - 3)^2 - 9.
$$

Substitute back and multiply the $-9$ by the outside factor $2$:

$$
2\left((x - 3)^2 - 9\right) + 7 = 2(x - 3)^2 - 18 + 7 = 2(x - 3)^2 - 11.
$$

## 3. The vertex and the minimum

A square is never negative, so $(x + p)^2 \geq 0$ for every $x$. This is the key
to the completed-square form.

For $y = a(x + p)^2 + q$ with $a > 0$:

- the smallest value of the bracket is $0$, at $x = -p$;
- the smallest value of $y$ is therefore $q$;
- the **vertex** (turning point) is $(-p, q)$;
- the line of symmetry is $x = -p$.

If $a < 0$ the parabola opens downwards, and the vertex gives the **maximum**
instead. The $y$-intercept is always the value of $y$ when $x = 0$.

## 4. The discriminant

The roots of $ax^2 + bx + c = 0$ come from the quadratic formula

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}.
$$

Everything about the roots is decided by the expression under the square root.
It is called the **discriminant**, written $\Delta$:

$$
\Delta = b^2 - 4ac.
$$

| Value of the discriminant | Number of real roots | The graph |
|---|---|---|
| $\Delta > 0$ | two distinct real roots | crosses the $x$-axis twice |
| $\Delta = 0$ | one repeated real root | touches the $x$-axis once |
| $\Delta < 0$ | no real roots | never meets the $x$-axis |

The third row is the reason a negative discriminant is useful: it proves that a
quadratic equation cannot be solved with real numbers, and it shows why.

## 5. Try it: the parabola explorer

**Predict first.** For $y = x^2 + bx + c$, the vertex moves as $b$ changes and
the number of roots changes as $c$ changes. If you keep $c = 0$ and change $b$,
will the vertex stay on the $y$-axis, or move? Write your prediction down before
you touch the sliders.

:::figure ch2-quadratic-explorer

**Test.** Move the sliders for $b$ and $c$. The panel reports the
completed-square form, the vertex, and the discriminant.

**Explain.** For which values of $c$ does the parabola cross the $x$-axis twice?
Find the value of $c$ at which the two crossings become one. Write two sentences
linking the discriminant to what you see.

> **Watch out.** Completing the square is an identity, and the sign of the
> bracket follows the sign of $b$.
>
> For $x^2 - 6x$, half of $-6$ is $-3$, so the bracket is $(x - 3)^2$, not
> $(x + 3)^2$. Expand to check:
> $(x - 3)^2 = x^2 - 6x + 9$, which matches. The common error is to copy the sign
> of $b$ into the bracket unchanged.
>
> **Re-check:** expand your completed-square form and confirm it gives back the
> original expression, term by term.

## Progress check

Return to the chapter problem. The arch is modelled by
$y = 4 - \frac{x^2}{4}$.

1. Write the model in completed-square form, $a(x + p)^2 + q$.
2. State the greatest height of the arch and where it occurs.
3. Solve $4 - \frac{x^2}{4} = 0$ to find where the arch meets the road.
4. The equation $4 - \frac{x^2}{4} = 5$ asks for a point higher than the arch.
   Work out the discriminant of $-\frac{x^2}{4} - 1 = 0$ and explain what its
   sign says about the request.

## You should now be able to

- write a quadratic in completed-square form, for $a = 1$ and for $a \neq 1$;
- read the vertex, the line of symmetry and the minimum or maximum value;
- work out the discriminant and use its sign to count the real roots;
- connect the number of crossings of the $x$-axis with the discriminant;
- expand a completed square to check it against the original expression.
