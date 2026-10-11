---
title: 2.4 Solving quadratic equations, including in a function of the unknown — Learn
chapter: 2
chapter_title: Algebra and functions
section: '2.4'
section_title: Solving quadratic equations, including in a function of the unknown
dfe:
- B3
kind: walkthrough
---

# 2.4 Solving quadratic equations, including in a function of the unknown — Learn

**Prerequisites:** factorising from 2.3; the discriminant; completing the square;
the index laws from 2.1 and surds from 2.2.

**By the end of this section you can:** solve a quadratic equation by
factorising, by completing the square, and by the formula; choose the method that
fits; and recognise and solve an equation that is quadratic in a function of the
unknown, such as $x^4$, $2^x$ or $\sqrt{x}$.

## 1. Choose a method

A quadratic equation has the form $ax^2 + bx + c = 0$. Four methods solve it, and
the numbers tell you which to use.

| Method | Use it when | What it gives |
|---|---|---|
| Factorising | the roots are whole numbers or simple fractions | exact roots, quickly |
| Completing the square | the coefficient $a$ is $1$ and the roots contain a surd | exact roots, and the vertex |
| The formula | factorising fails and $a \neq 1$ | exact roots, always |
| A graph | the question asks where the curve meets a line | an estimate |

The formula solves every quadratic equation:

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}.
$$

The expression $b^2 - 4ac$ is the discriminant from 2.3. When it is negative,
there is no real solution and the method stops there.

## 2. Factorising and the formula

**Example 1.** Solve $2x^2 + 5x - 3 = 0$.

Look for two numbers that multiply to $2 \times (-3) = -6$ and add to $5$. The
numbers are $6$ and $-1$. Split the middle term and factorise in pairs:

$$
2x^2 + 6x - x - 3 = 2x(x + 3) - 1(x + 3) = (2x - 1)(x + 3).
$$

A product is zero when one of its factors is zero:

$$
2x - 1 = 0 \quad \text{or} \quad x + 3 = 0,
$$

so $x = \frac{1}{2}$ or $x = -3$.

**Example 2.** Solve $x^2 - 3x - 2 = 0$, giving the answer in surd form.

No whole-number pair multiplies to $-2$ and adds to $-3$, so use the formula with
$a = 1$, $b = -3$ and $c = -2$:

$$
x = \frac{3 \pm \sqrt{(-3)^2 - 4 \times 1 \times (-2)}}{2}.
$$

Work out the discriminant:

$$
x = \frac{3 \pm \sqrt{9 + 8}}{2} = \frac{3 \pm \sqrt{17}}{2}.
$$

The two roots are $\frac{3 - \sqrt{17}}{2}$ and $\frac{3 + \sqrt{17}}{2}$.

## 3. Completing the square to solve

When $a = 1$ and the roots contain a surd, completing the square is often
quicker than the formula.

**Example 3.** Solve $x^2 + 4x - 1 = 0$ by completing the square.

Move the constant to the right:

$$
x^2 + 4x = 1.
$$

Complete the square on the left. Half of $4$ is $2$, and $(x + 2)^2 = x^2 + 4x + 4$,
so

$$
(x + 2)^2 - 4 = 1.
$$

Add $4$ to both sides, then take the square root:

$$
(x + 2)^2 = 5, \qquad x + 2 = \pm \sqrt{5}.
$$

So

$$
x = -2 \pm \sqrt{5}.
$$

## 4. Quadratic in a function of the unknown

An equation can be a quadratic even when it is not written with an $x^2$. Look
for a repeated expression, such as $x^2$ inside an $x^4$, or $2^x$ inside a
$2^{2x}$. Replace the repeated expression with a single letter, solve the
quadratic, then put the expression back.

**Example 4.** Solve $x^4 - 5x^2 + 4 = 0$.

The term $x^4$ is $\left(x^2\right)^2$, so let $t = x^2$. Then

$$
t^2 - 5t + 4 = 0.
$$

Factorise:

$$
(t - 1)(t - 4) = 0,
$$

so $t = 1$ or $t = 4$. Now replace $t$ with $x^2$:

$$
x^2 = 1 \quad \text{or} \quad x^2 = 4.
$$

Taking both signs of each square root gives $x = \pm 1$ and $x = \pm 2$.

**Example 5.** Solve $2^{2x} - 5 \times 2^x + 4 = 0$.

The term $2^{2x}$ is $\left(2^x\right)^2$, so let $t = 2^x$. Then

$$
t^2 - 5t + 4 = 0,
$$

which factorises as $(t - 1)(t - 4) = 0$. So $t = 1$ or $t = 4$. Replace $t$ with
$2^x$:

$$
2^x = 1 \quad \text{or} \quad 2^x = 4.
$$

Since $2^0 = 1$ and $2^2 = 4$, the solutions are $x = 0$ and $x = 2$.

**Example 6.** Solve $1 - \frac{3}{x} + \frac{2}{x^2} = 0$, where $x \neq 0$.

The expression $\frac{1}{x}$ appears twice, once squared, so let $t = \frac{1}{x}$:

$$
2t^2 - 3t + 1 = 0.
$$

Factorise as $(2t - 1)(t - 1) = 0$, so $t = \frac{1}{2}$ or $t = 1$. Replace $t$
with $\frac{1}{x}$:

$$
\frac{1}{x} = \frac{1}{2} \quad \text{or} \quad \frac{1}{x} = 1,
$$

so $x = 2$ or $x = 1$. Both values are allowed, because neither is zero.

> **Watch out.** The substitution is not finished until you replace $t$ and check
> every value.
>
> **Stopping at $t$.** The answer to Example 4 is a value of $x$, not a value of
> $t$. Writing $t = 1$ or $t = 4$ leaves the question unanswered.
>
> **Throwing away a root.** $x^2 = 4$ has two solutions, $x = 2$ and $x = -2$.
> Do not drop the negative one.
>
> **Adding a root by squaring.** Squaring both sides of $\sqrt{x + 5} = x - 1$
> gives $x^2 - 3x - 4 = 0$, so $x = 4$ or $x = -1$. The value $x = -1$ is
> **extraneous**: it makes the right side $-2$, while a square root is never
> negative. **Re-check:** substitute every answer into the original equation, and
> reject any value that fails.

## Progress check

Return to the chapter problem. The arch is $y = 4 - \frac{x^2}{4}$, and the
lorry roof is $3.2$ m above the road.

1. The lorry fits under the arch at a distance $x$ from the centre if
   $4 - \frac{x^2}{4} \geq 3.2$. Solve the equation
   $4 - \frac{x^2}{4} = 3.2$.
2. The two solutions are the points where the roof grazes the arch. How
   wide is the arch at the height of the lorry roof?
3. The lorry is $2.5$ m wide. Explain why this calculation answers a different
   question from the one about the lorry's width.
4. Solve $2^{2x} - 6 \times 2^x + 8 = 0$.

## You should now be able to

- choose between factorising, completing the square and the formula;
- solve a quadratic equation with surd roots by completing the square;
- recognise a repeated expression and substitute $t$ for it;
- solve a quadratic in $t$ and then recover the values of $x$;
- reject an extraneous root created by squaring both sides.
