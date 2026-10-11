---
title: 'Chapter 2: Review'
chapter: 2
kind: review
---

# Chapter 2: Review

## The chapter problem, solved

The arch is modelled by

$$
y = 4 - \frac{x^2}{4}, \qquad -4 \le x \le 4,
$$

where $x$ is metres from the centre of the road and $y$ is metres above the road.
A lorry is $2.5$ m wide and $3.2$ m tall, and it drives along the centre. The
drivers need at least $0.2$ m of clearance above the roof.

**Step 1. Meet the road.** Set $y = 0$:

$$
4 - \frac{x^2}{4} = 0, \qquad x^2 = 16, \qquad x = \pm 4.
$$

So the arch spans the road from $x = -4$ to $x = 4$, a width of $8$ m. This
matches the stated domain.

**Step 2. Find the greatest height.** Complete the square:

$$
y = -\frac{1}{4}x^2 + 4 = -\frac{1}{4}(x - 0)^2 + 4.
$$

The vertex is at $(0, 4)$, so the arch rises $4$ m at the centre.

**Step 3. Find the height at the edge of the lorry.** The lorry is centred and
$2.5$ m wide, so its edges are at $x = 1.25$ and $x = -1.25$. The arch is lowest
at those edges, so substitute $x = 1.25$:

$$
y = 4 - \frac{(1.25)^2}{4} = 4 - \frac{1.5625}{4} = 4 - 0.390625 = 3.609375.
$$

**Step 4. Compare with the lorry.** The clearance is

$$
3.609375 - 3.2 = 0.409375 \text{ m}.
$$

This is greater than $0.2$ m, so **the lorry fits**, with about $0.41$ m of room
above its roof.

**Step 5. How wide can a lorry be?** The roof height is $3.2$ m, so the arch is
high enough where

$$
4 - \frac{x^2}{4} \geq 3.2, \qquad \frac{x^2}{4} \leq 0.8, \qquad x^2 \leq 3.2.
$$

So $|x| \leq \sqrt{3.2} = \frac{4\sqrt{5}}{5} \approx 1.7889$. The greatest width
is twice this:

$$
2\sqrt{3.2} \approx 3.58 \text{ m}.
$$

**Step 6. The survey disagrees.** A survey measures the centre of the arch at
$4.2$ m, not $4$ m, and the arch still meets the road at $x = \pm 4$. The refined
model

$$
y = 4.2 - \frac{4.2x^2}{16} = 4.2\left(1 - \frac{x^2}{16}\right)
$$

is zero at $x = \pm 4$, so it keeps the road width, and it gives $4.2$ m at the
centre. At the lorry's edge, $x = 1.25$:

$$
y = 4.2 - \frac{4.2 \times 1.5625}{16} = 4.2 - 0.41015625 = 3.78984375.
$$

The clearance is now about $0.59$ m, larger than before. The refined model is a
vertical stretch of the original: every height is multiplied by
$\frac{4.2}{4} = 1.05$.

The chapter's answer is therefore: the lorry fits under both models. The original
model gives about $0.41$ m of clearance, and the refined model about $0.59$ m.
Both are comfortably above the required $0.2$ m, so the decision does not change
when the measurement is taken into account. The refinement does change the
*number*, which is why the width calculation and the clearance calculation must
be redone whenever the model changes.

## Mixed practice — choose the method first

For each question, say which method you will use and why before you calculate.
The items mix this chapter with Chapter 1, so the choice is not always obvious.

1. Solve $x^4 - 13x^2 + 36 = 0$.

2. Write $\dfrac{4}{2 - \sqrt{3}}$ with a rational denominator.

3. Solve the simultaneous equations $2x + y = 8$ and $xy = 6$.

4. Solve $x^2 - 3x - 10 \leq 0$.

5. Factorise $2x^3 - x^2 - 13x - 6$ completely.

6. Simplify $\dfrac{x + 3}{x^2 - 9}$ and state the excluded values.

7. Solve $|2x + 1| = 7$.

8. Find the inverse of $f(x) = \dfrac{3x - 1}{x + 2}$.

9. Prove that the sum of three consecutive whole numbers is a multiple of $3$.

10. Disprove the claim "for all real numbers $x$ and $y$, if $x > y$ then
    $x^2 > y^2$".

11. The curve $y = x^3$ is translated $2$ units to the right and $1$ unit up.
    Write the new equation.

12. A ball's height is modelled by $h = 3 + 8t - 5t^2$. Find the greatest height
    and when it occurs.

<details markdown="1">
<summary>Answers</summary>

1. **Substitute, because the equation is quadratic in $x^2$.** Let $t = x^2$:
   $t^2 - 13t + 36 = 0$, so $(t - 4)(t - 9) = 0$. Then $x^2 = 4$ or $x^2 = 9$,
   giving $x = \pm 2$ and $x = \pm 3$.

2. **Rationalise with a conjugate.** Multiply top and bottom by $2 + \sqrt{3}$:
   $\dfrac{4(2 + \sqrt{3})}{4 - 3} = 8 + 4\sqrt{3}$.

3. **Substitute, because one equation is linear.** From $y = 8 - 2x$,
   $x(8 - 2x) = 6$, so $2x^2 - 8x + 6 = 0$ and $x^2 - 4x + 3 = 0$. Then
   $(x - 1)(x - 3) = 0$, so the pairs are $(1, 6)$ and $(3, 2)$.

4. **Factorise and sketch the parabola.** $x^2 - 3x - 10 = (x - 5)(x + 2)$. The
   parabola opens upwards and the inequality is "at most zero", so the solution
   is between the roots: $-2 \leq x \leq 5$.

5. **Use the factor theorem, then divide.** Try factors of $6$. $p(3) = 54 - 9 - 39 - 6 = 0$, so $x - 3$ is a factor. Dividing gives
   $(x - 3)(2x^2 + 5x + 2)$, and $2x^2 + 5x + 2 = (2x + 1)(x + 2)$. So
   $2x^3 - x^2 - 13x - 6 = (x - 3)(2x + 1)(x + 2)$.

6. **Factorise and cancel.** $x^2 - 9 = (x - 3)(x + 3)$, so the expression is
   $\dfrac{1}{x - 3}$. The original is not defined at $x = 3$ or $x = -3$, so
   both values are excluded.

7. **Split the modulus into two cases.** Case 1: $2x + 1 = 7$, so $x = 3$.
   Case 2: $2x + 1 = -7$, so $x = -4$. Both values work.

8. **Rearrange and swap.** Write $y = \dfrac{3x - 1}{x + 2}$ and cross-multiply:
   $y(x + 2) = 3x - 1$, so $x(y - 3) = -2y - 1$ and
   $x = \dfrac{2y + 1}{3 - y}$. Swapping gives
   $f^{-1}(x) = \dfrac{2x + 1}{3 - x}$, with $x \neq 3$.

9. **Deduce, using a general letter.** The numbers are $n$, $n + 1$ and $n + 2$
   for a whole number $n$. Their sum is $3n + 3 = 3(n + 1)$, which has a factor
   $3$. So the sum is a multiple of $3$.

10. **Find one counter example.** Take $x = 1$ and $y = -2$. Then $x > y$, but
    $x^2 = 1$ and $y^2 = 4$, so $x^2 < y^2$. The claim is false.

11. **Transform the input, then the output.** Replacing $x$ with $x - 2$ gives
    $(x - 2)^3$. Adding $1$ to the output gives $y = (x - 2)^3 + 1$.

12. **Complete the square.** $h = -5\left(t^2 - \frac{8}{5}t\right) + 3 = -5\left(t - \frac{4}{5}\right)^2 + \frac{16}{5} + 3 = -5\left(t - \frac{4}{5}\right)^2 + \frac{31}{5}$.
    The greatest height is $\frac{31}{5} = 6.2$ m, at $t = 0.8$ s.
</details>

## What you can now do

- use the laws of indices with fractional and negative exponents;
- simplify surds and rationalise a denominator;
- complete the square, read the vertex and use the discriminant;
- solve quadratics, including equations quadratic in a function of the unknown;
- solve simultaneous equations, including one linear and one quadratic;
- solve linear and quadratic inequalities and write the solution as a set;
- divide polynomials, use the factor theorem and factorise a cubic;
- simplify rational expressions and split them into partial fractions;
- sketch polynomials, the modulus function and reciprocal graphs;
- combine functions and find inverses, with domain restrictions;
- apply the graph transformations and know which act on the input;
- build a model, state its assumptions, check it against data and refine it.

## Your relevance reflection

Return to the prompt in the chapter opener: *a quantity in your own life that
changes when another one changes*. Write down the two quantities again. Now add
three things you could not have said before this chapter: what happens at the
start, what happens at the end, and whether the relationship has a greatest or
smallest value. Finish with one sentence about a time when a model you trusted
turned out to need a correction.
