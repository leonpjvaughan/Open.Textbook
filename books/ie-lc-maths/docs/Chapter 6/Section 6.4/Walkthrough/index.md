---
title: 6.4 Injective, surjective and bijective functions — Learn
chapter: 6
chapter_title: Functions
section: '6.4'
section_title: Injective, surjective and bijective functions
tier: H
refs:
- '5.1'
kind: walkthrough
---

# 6.4 Injective, surjective and bijective functions — Learn

**Prerequisites:** functions, domain and range; composite and inverse functions from
Section 6.3.

**Objectives:** define injective, surjective and bijective; use the horizontal line test;
explain why an inverse exists exactly when a function is bijective.

By the end of this section you can name the three properties of a function and say which of
them make an inverse possible.

## Injective functions

A function is **injective** when no two different inputs share an output. Another name for
injective is **one-to-one**.

> **Injective.** $f$ is injective when $f(a) = f(b)$ forces $a = b$.

The horizontal line test finds injectivity on a graph.

> **The horizontal line test.** A function is injective when every horizontal line crosses
> its graph at most once.

A horizontal line stands for one output, and the crossing points are the inputs that
produce it. A line that crosses twice has found two inputs with the same output, so the
function is not injective.

**Example 1.** The function $f(x) = 2x + 1$ is injective. If $f(a) = f(b)$, then
$2a + 1 = 2b + 1$. Subtracting $1$ and dividing by $2$ gives $a = b$. A horizontal line
crosses the line $y = 2x + 1$ once.

**Example 2.** The function $f(x) = x^2$ is not injective on the real numbers. The
horizontal line $y = 4$ crosses the parabola at $x = 2$ and $x = -2$, so two different
inputs give the output $4$.

The same rule can become injective on a smaller domain. On the domain $x \ge 0$, the
parabola $y = x^2$ rises without repeating, so it is injective there.

## Surjective functions

A function is **surjective** onto a codomain when every value in that codomain is reached.
Another name for surjective is **onto**.

> **Surjective.** $f$ is surjective onto a codomain when every value in the codomain is
> $f(x)$ for at least one input $x$.

**Example 3.** The function $f(x) = x^2$ is not surjective onto the real numbers, because
$-1$ is never a square. It is surjective onto the interval $[0, \infty)$, because every
value that is not negative has a square root.

**Example 4.** The function $f(x) = 2x + 1$ is surjective onto the real numbers. For any
chosen output $y$, the input $x = \dfrac{y - 1}{2}$ produces it.

## Bijective functions

A function is **bijective** when it is both injective and surjective. A bijection pairs the
two sets perfectly: each input has its own output, and every value in the codomain is used.

**Example 5.** The function $f(x) = 2x + 1$ is bijective from the real numbers to the real
numbers. It is injective, and it is surjective onto the whole codomain.

**Example 6.** The function $f(x) = x^2$ is not bijective from the real numbers to the real
numbers. It fails injectivity, and it also fails surjectivity.

## Why bijective is the condition for an inverse

The inverse of $f$ sends each output back to the input that produced it.

- For the inverse to be a function, each output must come from one input. That is
  injectivity. If two inputs shared an output, the inverse would not know which one to
  return.
- For the inverse to be defined on the whole codomain, every codomain value must be reached.
  That is surjectivity.

Both together make the function bijective, and a bijection always has an inverse.

> **Watch out.** "One-to-one" means injective, and it is not the same as the definition of a
> function. Every function gives each input one output. An injective function goes further:
> it also gives each output one input. Do not use "one-to-one" for the first property.

## The cooling coffee

The coffee function $T(t) = 20 + 70(0.5)^{t/5}$ is injective on its domain $t \ge 0$. As
time increases, the temperature falls, and it never repeats a value. Two different times
give two different temperatures.

It is surjective onto its range $(20, 90]$. Every temperature between the room temperature
and the starting temperature is reached at some time. So $T$ is bijective from $[0, \infty)$
onto $(20, 90]$, which is why the inverse rule in Section 6.3 exists.

## Progress check

Back to the chapter problem. Explain why $T(t) = 20 + 70(0.5)^{t/5}$ is injective on
$t \ge 0$, using the fact that the temperature always falls.

Then state the codomain that makes $T$ surjective, and say why $T$ is bijective from
$[0, \infty)$ onto that set. This is the reason the coffee's inverse is a function.

## You should now be able to

- say what injective, surjective and bijective mean;
- use the horizontal line test to test injectivity;
- give two inputs with the same output to show a function is not injective;
- explain why a function has an inverse exactly when it is bijective.
