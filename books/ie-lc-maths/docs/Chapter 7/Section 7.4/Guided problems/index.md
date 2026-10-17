---
title: 7.4 The quotient rule — Practise with help
chapter: 7
chapter_title: Differentiation
section: '7.4'
section_title: The quotient rule
tier: O
refs:
- '5.2'
kind: guided-problems
---

# 7.4 The quotient rule — Practise with help

## Warm-up: remember

1. Simplify $\dfrac{6x^2 - 4x}{2x}$.
2. Expand and simplify $2(x + 3) - (2x + 1)$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $\dfrac{6x^2}{2x} - \dfrac{4x}{2x} = 3x - 2$.
2. $2x + 6 - 2x - 1 = 5$. Notice how the bracket after the minus sign changes every sign
   inside it. The quotient rule subtracts a bracket in the same way.

</details>

:::figure warm-up-gate


## Practise with help

**1.** Differentiate $y = \dfrac{x + 1}{x - 2}$.

<details markdown="1">
<summary>Hint</summary>

$u = x + 1$ and $v = x - 2$.

<details markdown="1">
<summary>Next step</summary>

$y' = \dfrac{1(x - 2) - (x + 1)(1)}{(x - 2)^2}$.

<details markdown="1">
<summary>Full working</summary>

$$y' = \frac{x - 2 - x - 1}{(x - 2)^2} = \frac{-3}{(x - 2)^2}$$

The numerator is constant and negative, so the curve falls on each branch.

</details>
</details>
</details>

**2.** Differentiate $y = \dfrac{2x + 5}{x + 1}$.

<details markdown="1">
<summary>Hint</summary>

$u' = 2$ and $v' = 1$.

<details markdown="1">
<summary>Next step</summary>

$y' = \dfrac{2(x + 1) - (2x + 5)(1)}{(x + 1)^2}$.

<details markdown="1">
<summary>Full working</summary>

$$y' = \frac{2x + 2 - 2x - 5}{(x + 1)^2} = \frac{-3}{(x + 1)^2}$$

</details>
</details>
</details>

**3.** Differentiate $y = \dfrac{x^2 + 1}{x}$.

<details markdown="1">
<summary>Hint</summary>

$u = x^2 + 1$, so $u' = 2x$, and $v = x$, so $v' = 1$.

<details markdown="1">
<summary>Next step</summary>

$y' = \dfrac{2x(x) - (x^2 + 1)(1)}{x^2}$.

<details markdown="1">
<summary>Full working</summary>

$$y' = \frac{2x^2 - x^2 - 1}{x^2} = \frac{x^2 - 1}{x^2}$$

Dividing first gives $y = x + \dfrac{1}{x}$, whose derivative is $1 - \dfrac{1}{x^2}$, the
same expression.

</details>
</details>
</details>

**4.** Differentiate $y = \dfrac{3x - 1}{x + 2}$.

<details markdown="1">
<summary>Hint</summary>

$u' = 3$ and $v' = 1$.

<details markdown="1">
<summary>Next step</summary>

$y' = \dfrac{3(x + 2) - (3x - 1)(1)}{(x + 2)^2}$.

<details markdown="1">
<summary>Full working</summary>

$$y' = \frac{3x + 6 - 3x + 1}{(x + 2)^2} = \frac{7}{(x + 2)^2}$$

The numerator is positive, so the curve rises on each branch.

</details>
</details>
</details>

**5.** Differentiate $y = \dfrac{x^2}{x - 1}$.

<details markdown="1">
<summary>Hint</summary>

$u = x^2$, so $u' = 2x$, and $v = x - 1$, so $v' = 1$.

<details markdown="1">
<summary>Next step</summary>

$y' = \dfrac{2x(x - 1) - x^2(1)}{(x - 1)^2}$.

<details markdown="1">
<summary>Full working</summary>

$$y' = \frac{2x^2 - 2x - x^2}{(x - 1)^2} = \frac{x^2 - 2x}{(x - 1)^2} = \frac{x(x - 2)}{(x - 1)^2}$$

The derivative is zero at $x = 0$ and at $x = 2$.

</details>
</details>
</details>

**6.** Differentiate $y = \dfrac{x + 4}{2x - 1}$.

<details markdown="1">
<summary>Hint</summary>

The bottom is $2x - 1$, so $v' = 2$.

<details markdown="1">
<summary>Next step</summary>

$y' = \dfrac{1(2x - 1) - (x + 4)(2)}{(2x - 1)^2}$.

<details markdown="1">
<summary>Full working</summary>

$$y' = \frac{2x - 1 - 2x - 8}{(2x - 1)^2} = \frac{-9}{(2x - 1)^2}$$

</details>
</details>
</details>

**7.** The tank volume is $V(t) = \dfrac{12t^3 - t^4}{t}$ litres. Find $V'(t)$ and work out
$V'(4)$.

<details markdown="1">
<summary>Hint</summary>

Take $u = 12t^3 - t^4$ and $v = t$.

<details markdown="1">
<summary>Next step</summary>

$u' = 36t^2 - 4t^3$ and $v' = 1$, so
$V'(t) = \dfrac{(36t^2 - 4t^3)t - (12t^3 - t^4)}{t^2}$.

<details markdown="1">
<summary>Full working</summary>

$$V'(t) = \frac{36t^3 - 4t^4 - 12t^3 + t^4}{t^2}
= \frac{24t^3 - 3t^4}{t^2} = 24t - 3t^2$$

Then $V'(4) = 96 - 48 = 48$ litres per minute, matching Sections 7.2 and 7.3.

</details>
</details>
</details>

## A question from Chapter 4

**8.** Solve $\dfrac{x + 1}{x - 2} = 3$ for $x$.

<details markdown="1">
<summary>Hint</summary>

Multiply both sides by $x - 2$, then solve the linear equation.

<details markdown="1">
<summary>Next step</summary>

$x + 1 = 3(x - 2) = 3x - 6$.

<details markdown="1">
<summary>Full working</summary>

$x + 1 = 3x - 6$, so $7 = 2x$ and $x = 3.5$. The fraction is undefined at $x = 2$, so
$x = 3.5$ is the only solution.

This fraction is the one differentiated in question 1. Solving an equation with a fraction
and differentiating one use the same rearrangement skills.

</details>
</details>
</details>
