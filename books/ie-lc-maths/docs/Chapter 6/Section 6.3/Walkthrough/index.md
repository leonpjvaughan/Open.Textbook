---
title: 6.3 Composite and inverse functions — Learn
chapter: 6
chapter_title: Functions
section: '6.3'
section_title: Composite and inverse functions
tier: O
refs:
- '5.1'
kind: walkthrough
---

# 6.3 Composite and inverse functions — Learn

**Prerequisites:** function notation; substituting into an expression; solving a linear
equation.

**Objectives:** form a composite function in either order; find the inverse of a function;
check an inverse by composing it with the function.

By the end of this section you can join two functions into one, and undo a function to get
back to the input.

## Composite functions

A **composite function** is what you get when the output of one function becomes the input
of another. If $f$ and $g$ are functions, then $f(g(x))$ means "apply $g$ first, then
apply $f$ to the result".

**Example 1.** For $f(x) = 2x + 3$ and $g(x) = x^2$, work out $f(g(2))$ and $g(f(2))$.

Work from the inside out.

$$g(2) = 2^2 = 4 \qquad f(g(2)) = f(4) = 2(4) + 3 = 11$$

$$f(2) = 2(2) + 3 = 7 \qquad g(f(2)) = g(7) = 7^2 = 49$$

The two answers are different. The order matters, so $f(g(x))$ and $g(f(x))$ are usually
not the same function.

**Example 2.** For the same functions, find the general composite $f(g(x))$.

Replace $x$ in $f(x)$ by the whole expression $g(x)$:

$$f(g(x)) = f(x^2) = 2x^2 + 3$$

The input to $f$ is $x^2$, so every $x$ in the rule of $f$ becomes $x^2$.

## Inverse functions

An **inverse function** undoes the original function. It takes an output and returns the
input that produced it. The inverse of $f$ is written $f^{-1}$.

If $f(4) = 11$, then $f^{-1}(11) = 4$. The inverse swaps the two numbers in every ordered
pair.

To find the inverse of $f(x)$, follow three steps:

1. Write $y = f(x)$.
2. Swap $x$ and $y$.
3. Solve the new equation for $y$.

**Example 3.** Find the inverse of $f(x) = 2x + 3$.

$$y = 2x + 3 \qquad x = 2y + 3 \qquad x - 3 = 2y \qquad y = \frac{x - 3}{2}$$

So $f^{-1}(x) = \dfrac{x - 3}{2}$.

**Example 4.** Check that the inverse undoes the function.

$$f(f^{-1}(x)) = 2\left(\frac{x - 3}{2}\right) + 3 = (x - 3) + 3 = x$$

The composite returns the input, which is exactly what an inverse should do. The same works
the other way round: $f^{-1}(f(x)) = x$.

> **Watch out.** The notation $f^{-1}(x)$ does not mean $\dfrac{1}{f(x)}$. For
> $f(x) = 2x + 3$, the reciprocal is $\dfrac{1}{2x + 3}$, while the inverse is
> $\dfrac{x - 3}{2}$. They are different functions. The $-1$ is a label for the inverse,
> not an index.

> **Watch out.** $f(g(x))$ is not the same as $g(f(x))$ in general. You saw $11$ and $49$
> for the same input $2$. Always read a composite from the inside out, and say which
> function is applied first.

## The cooling coffee

The chapter problem is a function $T(t) = 20 + 70(0.5)^{t/5}$, and its inverse gives the
time for a chosen temperature. Put $T = 20 + 70(0.5)^{t/5}$ and solve for $t$:

$$(0.5)^{t/5} = \frac{T - 20}{70} \qquad \frac{t}{5} = \log_{0.5}\!\left(\frac{T - 20}{70}\right)
\qquad t = 5\log_{0.5}\!\left(\frac{T - 20}{70}\right)$$

The last step uses logarithms, which Section 6.6 develops. The formula is the inverse
function, and it swaps the roles of time and temperature.

## Progress check

Back to the chapter problem. Write down the inverse rule
$t = 5\log_{0.5}\!\left(\dfrac{T - 20}{70}\right)$.

Check it by composing: put $T = 50$ into the inverse, then put the result back into the
original rule. You should get $50$. Keep the exact time, because Section 6.6 evaluates it.

## You should now be able to

- form a composite function such as $f(g(x))$ and evaluate it;
- explain why the order in a composite matters;
- find the inverse of a function by swapping and solving;
- check an inverse by showing that $f(f^{-1}(x)) = x$.
