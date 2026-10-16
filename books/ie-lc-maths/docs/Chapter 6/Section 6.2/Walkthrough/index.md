---
title: 6.2 Domain, range and notation — Learn
chapter: 6
chapter_title: Functions
section: '6.2'
section_title: Domain, range and notation
tier: F
refs:
- '5.1'
kind: walkthrough
---

# 6.2 Domain, range and notation — Learn

**Prerequisites:** substituting into an expression; solving a linear equation; knowing that
a square root of a negative number is not real.

**Objectives:** use function notation; evaluate a function; state its domain and range;
find the values that a rule does not allow.

By the end of this section you can write a function in the standard notation, say which
inputs are allowed, and describe the outputs.

## Function notation

A function is usually written with a name and a rule. The notation

$$f(x) = 2x + 3$$

means that the function $f$ takes an input $x$ and returns $2x + 3$. The letter $f$ is the
name of the function, and $x$ stands for the input. You may also meet the arrow
form $f: x \mapsto 2x + 3$, which reads "$f$ sends $x$ to $2x + 3$".

To evaluate the function, replace every $x$ by the input.

**Example 1.** For $f(x) = 2x + 3$, work out $f(4)$ and $f(-1)$.

$$f(4) = 2(4) + 3 = 11 \qquad f(-1) = 2(-1) + 3 = 1$$

The bracket after the name holds the input, so $f(4)$ means "the output when the input is
$4$".

## The domain

The **domain** of a function is the set of inputs the rule allows. Some rules allow every
real number, and some do not.

- A fraction is undefined when its bottom is zero, so those inputs are excluded.
- A square root is defined only when the value under it is not negative.

**Example 2.** State the domain of $f(x) = \dfrac{1}{x - 2}$.

The bottom is zero when $x = 2$, so $x = 2$ is not allowed. The domain is every real number
except $2$.

**Example 3.** State the domain of $f(x) = \sqrt{x - 3}$.

The value under the root must not be negative, so $x - 3 \ge 0$. The domain is
$x \ge 3$, written $[3, \infty)$.

## The range

The **range** of a function is the set of outputs it produces. You find it by asking which
outputs are possible, given the domain.

**Example 4.** For $f(x) = x^2$ with domain the whole real line, the range is $y \ge 0$. A
square is never negative.

**Example 5.** For $f(x) = 2x + 3$ with domain the whole real line, the range is also the
whole real line. As $x$ runs through every real number, so does $2x + 3$.

> **Watch out.** $f(2x)$ and $2f(x)$ are different. For $f(x) = x^2$, $f(2x) = (2x)^2 =
> 4x^2$, but $2f(x) = 2x^2$. In $f(2x)$ the whole input is $2x$, so the whole input is
> squared. The bracket decides what is substituted, not only the number in front.

## The cooling coffee

The chapter problem has domain $t \ge 0$, because time starts when the coffee is poured and
cannot run backwards. The range is $20 < T \le 90$: the coffee starts at $90^\circ C$, and
it settles towards the room temperature of $20^\circ C$ without ever reaching it.

## Progress check

Back to the chapter problem. The rule is $T(t) = 20 + 70(0.5)^{t/5}$.

Write down the domain of $T$ and explain why. Then write down its range and say what the
two endpoints mean for the coffee. Keep both answers for the Review, where they explain why
the rule can be turned around.

## You should now be able to

- read and use function notation such as $f(x) = 2x + 3$;
- evaluate a function at a number, including a negative number;
- state the domain of a function, and find an excluded value;
- state the range of a function from its rule and domain.
