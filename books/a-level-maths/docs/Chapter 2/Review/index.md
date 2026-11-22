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

:::problems chapter-02-review

:::answers chapter-02-review

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
