---
title: 6.5 Graphing functions and transformations — Learn
chapter: 6
chapter_title: Functions
section: '6.5'
section_title: Graphing functions and transformations
tier: O
refs:
- '5.1'
kind: walkthrough
---

# 6.5 Graphing functions and transformations — Learn

**Prerequisites:** plotting points and joining them; function notation; the shape of the
graph of $y = x^2$.

**Objectives:** move a graph up, down, left and right; stretch it vertically and
horizontally; describe the transformations in words.

By the end of this section you can take the graph of a function and say exactly how it has
been moved or stretched.

## Reading a transformation from the rule

Start with the graph of $y = f(x)$. A change to the rule changes the graph in a predictable
way. The table collects the transformations you need.

| New rule | What it does to the graph |
|---|---|
| $y = f(x) + a$ | shift up by $a$ |
| $y = f(x) - a$ | shift down by $a$ |
| $y = f(x - a)$ | shift right by $a$ |
| $y = f(x + a)$ | shift left by $a$ |
| $y = a f(x)$ | stretch vertically by a factor of $a$ |
| $y = f\left(\dfrac{x}{a}\right)$ | stretch horizontally by a factor of $a$ |
| $y = -f(x)$ | reflect in the $x$-axis |
| $y = f(-x)$ | reflect in the $y$-axis |

The change outside the bracket moves the graph the way you expect. The change inside the
bracket moves it the opposite way, because the input has to change to undo the change.

## Worked examples

**Example 1.** Start with $y = x^2$ and shift it up by $3$.

The new rule is $y = x^2 + 3$. Every output rises by $3$. The point $(0, 0)$ moves to
$(0, 3)$, and the whole shape keeps its form.

**Example 2.** Start with $y = x^2$ and shift it right by $3$.

The new rule is $y = (x - 3)^2$. The old graph reached $4$ at $x = 2$; the new graph
reaches $4$ at $x = 5$. Every point has moved $3$ to the right, even though the rule
subtracts $3$.

**Example 3.** Start with $y = x^2$ and stretch it vertically by a factor of $2$.

The new rule is $y = 2x^2$. Every output doubles. The point $(3, 9)$ moves to $(3, 18)$.

**Example 4.** Start with $y = x^2$ and reflect it in the $x$-axis.

The new rule is $y = -x^2$. Every output changes sign, so the parabola opens downwards.

> **Watch out.** A change inside the bracket moves the graph the wrong way. The rule
> $y = f(x + 3)$ shifts the graph **left** by $3$, not right. To see why, follow one point:
> the old graph had its value at $x = 0$, and the new rule reaches that value when $x = -3$.
> The point has moved left.

## The cooling coffee

The coffee graph is

$$T(t) = 20 + 70(0.5)^{t/5}.$$

Build it from the basic exponential curve $y = (0.5)^t$ in three steps.

1. Replace $t$ by $t/5$: a horizontal stretch by a factor of $5$. The curve decays more
   slowly.
2. Multiply the outputs by $70$: a vertical stretch by a factor of $70$. The starting height
   becomes $70$ above the axis.
3. Add $20$: a shift up by $20$. The horizontal asymptote moves from $T = 0$ to $T = 20$.

The result starts at $T = 90$ when $t = 0$ and falls towards the room temperature $T = 20$.
It never reaches $20$, because $(0.5)^{t/5}$ is never zero.

## Progress check

Back to the chapter problem. List the three transformations that turn $y = (0.5)^t$ into
$T(t) = 20 + 70(0.5)^{t/5}$, in the order you would apply them.

Then state the equation of the horizontal asymptote and explain what it means for the
coffee. Keep the asymptote value: the Review uses it to describe the range.

## You should now be able to

- shift a graph up, down, left and right from its rule;
- stretch a graph vertically and horizontally;
- reflect a graph in either axis;
- describe the transformations in words, and state the horizontal asymptote of an
  exponential graph.
