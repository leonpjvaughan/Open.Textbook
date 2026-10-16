---
title: "6.3 Composite and inverse functions — Practise with help"
chapter: 6
chapter_title: Functions
section: "6.3"
section_title: Composite and inverse functions
tier: O
refs:
- '5.1'
kind: guided-problems
---

# 6.3 Composite and inverse functions — Practise with help

## Warm-up: remember

1. For $f(x) = 2x + 3$, work out $f(5)$.
2. Solve $2y + 3 = 11$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $f(5) = 2(5) + 3 = 13$.
2. $2y = 8$, so $y = 4$. This rearrangement is the middle of the three inverse steps: swap,
   then solve.

</details>

## Practise with help

**1.** For $f(x) = x + 4$ and $g(x) = 3x$, work out $f(g(2))$.

<details markdown="1">
<summary>Hint</summary>

Apply $g$ first, then $f$.

<details markdown="1">
<summary>Next step</summary>

$g(2) = 3(2) = 6$.

<details markdown="1">
<summary>Full working</summary>

$g(2) = 6$, then $f(6) = 6 + 4 = 10$. So $f(g(2)) = 10$.

</details>
</details>
</details>

**2.** For the same functions, work out $g(f(2))$.

<details markdown="1">
<summary>Hint</summary>

Now apply $f$ first.

<details markdown="1">
<summary>Next step</summary>

$f(2) = 2 + 4 = 6$.

<details markdown="1">
<summary>Full working</summary>

$f(2) = 6$, then $g(6) = 3(6) = 18$. So $g(f(2)) = 18$.

The two composites gave $10$ and $18$, so the order matters.

</details>
</details>
</details>

**3.** For $f(x) = x + 4$ and $g(x) = 3x$, write the general composite $f(g(x))$.

<details markdown="1">
<summary>Hint</summary>

Replace the $x$ in $f(x)$ by the whole of $g(x)$.

<details markdown="1">
<summary>Next step</summary>

$f(g(x)) = f(3x)$.

<details markdown="1">
<summary>Full working</summary>

$$f(g(x)) = f(3x) = 3x + 4$$

The input to $f$ is $3x$, so the $x$ in $x + 4$ becomes $3x$.

</details>
</details>
</details>

**4.** Find the inverse of $f(x) = x + 4$.

<details markdown="1">
<summary>Hint</summary>

Write $y = x + 4$, swap $x$ and $y$, then solve for $y$.

<details markdown="1">
<summary>Next step</summary>

After swapping, $x = y + 4$.

<details markdown="1">
<summary>Full working</summary>

$x = y + 4$, so $y = x - 4$. The inverse is $f^{-1}(x) = x - 4$.

Check: $f(f^{-1}(x)) = (x - 4) + 4 = x$.

</details>
</details>
</details>

**5.** Find the inverse of $f(x) = 3x$.

<details markdown="1">
<summary>Hint</summary>

After swapping, solve $x = 3y$.

<details markdown="1">
<summary>Next step</summary>

Divide both sides by $3$.

<details markdown="1">
<summary>Full working</summary>

$y = \dfrac{x}{3}$, so $f^{-1}(x) = \dfrac{x}{3}$.

Check: $f\left(\dfrac{x}{3}\right) = 3 \times \dfrac{x}{3} = x$.

</details>
</details>
</details>

**6.** Find the inverse of $f(x) = 5 - x$.

<details markdown="1">
<summary>Hint</summary>

Write $y = 5 - x$ and swap.

<details markdown="1">
<summary>Next step</summary>

$x = 5 - y$.

<details markdown="1">
<summary>Full working</summary>

$x = 5 - y$, so $y = 5 - x$. The inverse is $f^{-1}(x) = 5 - x$.

This function is its own inverse. Applying it twice returns the input.

</details>
</details>
</details>

**7.** For $f(x) = 2x + 3$, show that $f(f^{-1}(x)) = x$.

<details markdown="1">
<summary>Hint</summary>

Use $f^{-1}(x) = \dfrac{x - 3}{2}$ and substitute it into $f$.

<details markdown="1">
<summary>Next step</summary>

$f\left(\dfrac{x - 3}{2}\right) = 2\left(\dfrac{x - 3}{2}\right) + 3$.

<details markdown="1">
<summary>Full working</summary>

$$2\left(\frac{x - 3}{2}\right) + 3 = (x - 3) + 3 = x$$

The composite returns the input, so the two functions undo each other.

</details>
</details>
</details>

**8.** The coffee temperature is $T(t) = 20 + 70(0.5)^{t/5}$. Put $T = 50$ into the
inverse rule $t = 5\log_{0.5}\!\left(\dfrac{T - 20}{70}\right)$ and check that the result
returns $50$ when it is put back into $T$.

<details markdown="1">
<summary>Hint</summary>

For $T = 50$, the fraction is $\dfrac{50 - 20}{70} = \dfrac{30}{70} = \dfrac{3}{7}$.

<details markdown="1">
<summary>Next step</summary>

The inverse gives $t = 5\log_{0.5}\!\left(\dfrac{3}{7}\right)$.

<details markdown="1">
<summary>Full working</summary>

Put that $t$ back into the original rule:

$$T(t) = 20 + 70(0.5)^{\log_{0.5}(3/7)} = 20 + 70 \times \frac{3}{7} = 20 + 30 = 50$$

The round trip returns $50$, so the inverse rule is correct. Section 6.6 works out the
value of $t$ in minutes.

</details>
</details>
</details>

## A question from Chapter 4

**9.** Solve $5x - 2 = 13$.

<details markdown="1">
<summary>Hint</summary>

Add $2$, then divide by $5$.

<details markdown="1">
<summary>Next step</summary>

$5x = 15$.

<details markdown="1">
<summary>Full working</summary>

$x = 3$.

This is $f^{-1}(13)$ for the function $f(x) = 5x - 2$. Finding an inverse is the same
rearrangement with letters instead of numbers.

</details>
</details>
</details>
