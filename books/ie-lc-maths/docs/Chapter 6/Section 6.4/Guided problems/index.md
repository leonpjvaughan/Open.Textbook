---
title: "6.4 Injective, surjective and bijective functions — Practise with help"
chapter: 6
chapter_title: Functions
section: "6.4"
section_title: Injective, surjective and bijective functions
tier: H
refs:
- '5.1'
kind: guided-problems
---

# 6.4 Injective, surjective and bijective functions — Practise with help

## Warm-up: remember

1. For $f(x) = x^2$, work out $f(3)$ and $f(-3)$.
2. Find the inverse of $f(x) = 3x$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. Both are $9$. Two different inputs giving the same output is exactly what stops a
   function from being injective.
2. Swapping gives $x = 3y$, so $f^{-1}(x) = \dfrac{x}{3}$. An inverse exists here because
   the function is injective.

</details>

:::figure warm-up-gate


## Practise with help

**1.** Show that $f(x) = 3x - 1$ is injective by solving $3a - 1 = 3b - 1$ for $a$.

<details markdown="1">
<summary>Hint</summary>

If two outputs are equal, write the equation and simplify.

<details markdown="1">
<summary>Next step</summary>

$3a - 1 = 3b - 1$, so $3a = 3b$.

<details markdown="1">
<summary>Full working</summary>

$3a = 3b$, so $a = b$. Equal outputs force equal inputs, so $f$ is injective.

</details>
</details>
</details>

**2.** Show that $f(x) = x^2$ is not injective on the real numbers by finding two inputs
with the same output.

<details markdown="1">
<summary>Hint</summary>

Try a positive input and its negative.

<details markdown="1">
<summary>Next step</summary>

$f(3) = 9$ and $f(-3) = 9$.

<details markdown="1">
<summary>Full working</summary>

$f(3) = 9$ and $f(-3) = 9$. Two different inputs give the same output, so $f(x) = x^2$ is
not injective on the real numbers.

</details>
</details>
</details>

**3.** Is $f(x) = x^2$ injective on the domain $x \ge 0$? Use the horizontal line test.

<details markdown="1">
<summary>Hint</summary>

Draw the right-hand half of the parabola only.

<details markdown="1">
<summary>Next step</summary>

On the right of the $y$-axis, the curve rises and never turns back.

<details markdown="1">
<summary>Full working</summary>

Yes. On $x \ge 0$ the parabola rises without repeating, so every horizontal line crosses it
at most once. The function is injective on this smaller domain.

</details>
</details>
</details>

**4.** Show that $f(x) = 2x + 5$ is surjective onto the real numbers by finding the input
that gives the output $y$.

<details markdown="1">
<summary>Hint</summary>

Set $2x + 5 = y$ and solve for $x$.

<details markdown="1">
<summary>Next step</summary>

$2x = y - 5$.

<details markdown="1">
<summary>Full working</summary>

$x = \dfrac{y - 5}{2}$. Every real $y$ gives a real input, so every value in the codomain is
reached. The function is surjective onto the real numbers.

</details>
</details>
</details>

**5.** Is $f(x) = 2x + 5$ bijective from the real numbers to the real numbers? Give a
reason.

<details markdown="1">
<summary>Hint</summary>

Check both properties.

<details markdown="1">
<summary>Next step</summary>

It is injective (the same argument as question 1), and it is surjective (question 4).

<details markdown="1">
<summary>Full working</summary>

Yes. The function is injective and surjective, so it is bijective. A bijection has an
inverse, and here $f^{-1}(x) = \dfrac{x - 5}{2}$.

</details>
</details>
</details>

**6.** Explain why a function without injectivity cannot have an inverse.

<details markdown="1">
<summary>Hint</summary>

What would the inverse do if two inputs shared one output?

<details markdown="1">
<summary>Next step</summary>

The inverse would have to return two different answers for one input.

<details markdown="1">
<summary>Full working</summary>

If two inputs share an output, the inverse would need to send that output back to both
inputs at once. That is not a function, because a function gives each input one output. So
injectivity is needed before an inverse can exist.

</details>
</details>
</details>

**7.** The coffee function is $T(t) = 20 + 70(0.5)^{t/5}$ on $t \ge 0$. Explain why it is
injective.

<details markdown="1">
<summary>Hint</summary>

What happens to the temperature as time passes?

<details markdown="1">
<summary>Next step</summary>

The temperature falls at every moment.

<details markdown="1">
<summary>Full working</summary>

As $t$ increases, $(0.5)^{t/5}$ decreases, so $T$ decreases. A strictly decreasing function
never repeats an output, so two different times give two different temperatures. The
function is injective.

</details>
</details>
</details>

## A question from Chapter 4

**8.** Solve $3x - 1 = 8$.

<details markdown="1">
<summary>Hint</summary>

Add $1$, then divide by $3$.

<details markdown="1">
<summary>Next step</summary>

$3x = 9$.

<details markdown="1">
<summary>Full working</summary>

$x = 3$.

This is $f^{-1}(8)$ for $f(x) = 3x - 1$ from question 1. The inverse exists because the
function is injective.

</details>
</details>
</details>
