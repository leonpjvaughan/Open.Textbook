---
title: 2.11 Transformations of graphs — Learn
chapter: 2
chapter_title: Algebra and functions
section: '2.11'
section_title: Transformations of graphs
dfe:
- B9
kind: walkthrough
---

# 2.11 Transformations of graphs — Learn

**Prerequisites:** function notation from 2.10; the graph of $y = x^2$ and
$y = x^3$; completing the square from 2.3.

**By the end of this section you can:** apply the transformations $y = af(x)$,
$y = f(x) + a$, $y = f(x + a)$ and $y = f(ax)$; say whether a transformation
acts on the input or on the output; and combine transformations in the right
order.

## 1. Four transformations, one idea

A transformation changes the graph of $y = f(x)$ in a predictable way. The key
question is whether it acts on the **output** $y$ or on the **input** $x$.

| Equation | What changes | Effect |
|---|---|---|
| $y = af(x)$ | the output | stretch vertically by $a$ |
| $y = f(x) + a$ | the output | translate up by $a$ |
| $y = f(x + a)$ | the input | translate **left** by $a$ |
| $y = f(ax)$ | the input | stretch horizontally by $\frac{1}{a}$ |

Two of the four act inside the function, on $x$. Those act in the opposite
direction to what the number suggests. Adding $a$ inside moves the graph left.
Multiplying $x$ by $a$ inside squeezes the graph towards the $y$-axis.

## 2. Transformations of the output

Transforming the output does what it says. To find the new equation, apply the
change to the whole expression.

**Example 1.** The curve $y = x^2$ is stretched vertically by a factor of $3$.

Multiply the output by $3$:

$$
y = 3x^2.
$$

**Example 2.** The curve $y = x^2$ is translated $4$ units upwards.

Add $4$ to the output:

$$
y = x^2 + 4.
$$

## 3. Transformations of the input

Transforming the input changes which value of $f$ is used. Replace every $x$ with
the new input.

**Example 3.** The curve $y = x^2$ is translated $2$ units to the right.

A shift to the right by $2$ means the curve reaches each height later, so replace
$x$ with $x - 2$:

$$
y = (x - 2)^2.
$$

Check: the vertex of $y = x^2$ is at $x = 0$; the new vertex is where $x - 2 = 0$,
which is $x = 2$. The graph moved right.

**Example 4.** The curve $y = x^2$ is stretched horizontally by a factor of
$\frac{1}{2}$.

A horizontal stretch by $\frac{1}{2}$ replaces $x$ with $2x$:

$$
y = (2x)^2 = 4x^2.
$$

The curve is squeezed, so it rises twice as fast as before.

## 4. Combining transformations

When two transformations are applied, the order matters when one acts on the
input and one on the output.

**Example 5.** Given $f(x) = x^2$, describe $y = 2f(x - 1) + 3$.

Replace $x$ with $x - 1$ first, giving $(x - 1)^2$. Multiply the result by $2$,
giving $2(x - 1)^2$. Add $3$:

$$
y = 2(x - 1)^2 + 3.
$$

Compare $f(2x) + 1$ and $2f(x) + 1$ for $f(x) = x^2 + 1$:

$$
f(2x) + 1 = 4x^2 + 2, \qquad 2f(x) + 1 = 2x^2 + 3.
$$

The first doubles the input, the second doubles the output, and the two answers
are different.

## 5. Try it: the transformation explorer

**Predict first.** For $y = a[k(x - h)]^2 + v$, the vertex should sit at
$(h, v)$. If you change the horizontal scale $k$ while $h$ and $v$ stay the same,
will the vertex move? Write your prediction down before you touch the sliders.

:::figure ch2-transform-explorer

**Test.** Move each slider and watch the curve and the vertex. The panel reports
the equation and the vertex.

**Explain.** Which slider squeezes the curve without moving the vertex? Which
slider moves the vertex left when you increase it? Write two sentences
distinguishing a transformation of the input from a transformation of the output.

> **Watch out.** The sign inside a bracket is the usual trap.
>
> $y = f(x + 3)$ moves the graph **left** by $3$, not right. The curve shows the
> value of $f$ at $x$ three units earlier. To check, find the new position of a
> known point: the vertex of $y = (x + 3)^2$ is at $x = -3$.
>
> A horizontal stretch also looks backwards: $y = f(2x)$ is a stretch by a factor
> of $\frac{1}{2}$, because each feature happens after half as much $x$.
>
> **Re-check:** track one point, usually the vertex or an intercept, through the
> transformation. If the point moves the way you expect, the equation is right.

## Progress check

Return to the chapter problem. The original arch is $y = 4 - \frac{x^2}{4}$ on
$-4 \le x \le 4$.

1. A second tunnel uses the same shape but is twice as wide. A horizontal
   stretch by a factor of $2$ replaces $x$ with $\frac{x}{2}$. Write the new
   equation.
2. Where does the new arch meet the road? Solve your equation from part 1.
3. The new arch is the same height at the centre. Explain why widening the arch
   does not change its greatest height.
4. What happens to the lorry clearance when the arch is widened? Use your answer
   from 2.6 to justify one sentence.

## You should now be able to

- apply a vertical stretch, a vertical translation, a horizontal translation and
  a horizontal stretch to a graph;
- say whether a transformation acts on the input or on the output;
- write the equation of a transformed graph;
- combine transformations and explain why order matters;
- track a point through a transformation to check the result.
