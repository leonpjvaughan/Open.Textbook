---
title: 8.4 First-order difference equations — Practise with help
chapter: 8
chapter_title: Modelling a changing world
section: '8.4'
section_title: First-order difference equations
tier: O
refs:
- S4
kind: guided-problems
---

# 8.4 First-order difference equations — Practise with help

## Warm-up: remember

1. Solve $0.4L = 12$.
2. Write $0.8^3$ as a decimal.
3. Simplify $3^2 \times 3^n$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $L = \dfrac{12}{0.4} = 30$. This is the step that finds a fixed point.
2. $0.8^3 = 0.512$. Multiply the multiplier by itself three times.
3. $3^2 \times 3^n = 3^{n+2}$. The closed form uses $a^n$ in the same way.

</details>

:::figure warm-up-gate


## Practise with help

**1.** Find the fixed point of $u_{n+1} = 0.7u_n + 15$.

<details markdown="1">
<summary>Hint</summary>

Use $L = \dfrac{b}{1 - a}$ with $a = 0.7$ and $b = 15$.

<details markdown="1">
<summary>Next step</summary>

$L = \dfrac{15}{1 - 0.7} = \dfrac{15}{0.3}$.

<details markdown="1">
<summary>Full working</summary>

$$L = \frac{15}{0.3} = 50.$$

A sequence with multiplier $0.7$ settles at $50$. Below $50$ it rises, and above
$50$ it falls.

</details>
</details>
</details>

**2.** Solve $u_{n+1} = 0.5u_n + 20$ with $u_0 = 0$, giving $u_n$ in terms of
$n$.

<details markdown="1">
<summary>Hint</summary>

Find the fixed point first, then use $u_n = a^n(u_0 - L) + L$.

<details markdown="1">
<summary>Next step</summary>

$L = \dfrac{20}{1 - 0.5} = 40$.

<details markdown="1">
<summary>Full working</summary>

$$u_n = 0.5^n(0 - 40) + 40 = 40 - 40(0.5)^n.$$

Check $n = 0$: $40 - 40 = 0$. Check $n = 1$: $40 - 20 = 20$, which matches the
recurrence.

</details>
</details>
</details>

**3.** Solve $u_{n+1} = 2u_n + 3$ with $u_0 = 1$, giving $u_n$ in terms of $n$.

<details markdown="1">
<summary>Hint</summary>

$L = \dfrac{3}{1 - 2} = -3$.

<details markdown="1">
<summary>Next step</summary>

$u_n = 2^n(1 - (-3)) + (-3)$.

<details markdown="1">
<summary>Full working</summary>

$$u_n = 2^n(4) - 3 = 4 \times 2^n - 3.$$

Check $n = 0$: $4 - 3 = 1$. Check $n = 1$: $8 - 3 = 5$, which matches
$2(1) + 3$.

</details>
</details>
</details>

**4.** Solve $u_{n+1} = u_n + 4$ with $u_0 = 3$, and find $u_{10}$.

<details markdown="1">
<summary>Hint</summary>

When $a = 1$ the sequence is arithmetic.

<details markdown="1">
<summary>Next step</summary>

$u_n = 3 + 4n$.

<details markdown="1">
<summary>Full working</summary>

$$u_n = 3 + 4n, \qquad u_{10} = 3 + 40 = 43.$$

Each step adds $4$, so after ten steps the total added is $40$.

</details>
</details>
</details>

**5.** A savings plan satisfies $u_{n+1} = 1.03u_n + 200$ with $u_0 = 0$. Find
$u_2$.

<details markdown="1">
<summary>Hint</summary>

Apply the rule twice.

<details markdown="1">
<summary>Next step</summary>

$u_1 = 1.03 \times 0 + 200 = 200$.

<details markdown="1">
<summary>Full working</summary>

$$u_1 = 200$$

$$u_2 = 1.03 \times 200 + 200 = 206 + 200 = 406.$$

The first €200 earns one year of interest before the second payment is added.

</details>
</details>
</details>

**6.** For $u_{n+1} = -0.5u_n + 10$, find the fixed point and say whether the
sequence settles.

<details markdown="1">
<summary>Hint</summary>

Find $L$, then look at the size of $a$.

<details markdown="1">
<summary>Next step</summary>

$L = \dfrac{10}{1 - (-0.5)} = \dfrac{10}{1.5}$.

<details markdown="1">
<summary>Full working</summary>

$$L = \frac{10}{1.5} = \frac{20}{3} \approx 6.67.$$

The multiplier is $a = -0.5$, and $|a| = 0.5 < 1$, so the sequence settles to
$\dfrac{20}{3}$. The terms alternate above and below the fixed point as they
close in on it.

</details>
</details>
</details>

**7.** A student says the fixed point of $u_{n+1} = 0.5u_n + 40$ is $40$, because
$40$ is the number added. Explain the mistake and give the correct fixed point.

<details markdown="1">
<summary>Hint</summary>

At the fixed point the value does not change, so $L = 0.5L + 40$.

<details markdown="1">
<summary>Next step</summary>

$0.5L = 40$.

<details markdown="1">
<summary>Full working</summary>

The number added is not the fixed point. Setting $L = 0.5L + 40$ gives
$0.5L = 40$, so $L = 80$. At $80$ mg, half of it is cleared and the dose
replaces exactly that half, so the amount is unchanged. At $40$ the dose would
add more than is cleared, so the amount would rise.

</details>
</details>
</details>

## A question from Section 8.3

**8.** A recurrence is $u_{n+1} = 1.05u_n$ with $u_0 = 200$. Write its closed
form and use it to find $u_{10}$.

<details markdown="1">
<summary>Hint</summary>

Here $b = 0$, so the fixed point is $0$ and the closed form is $u_n = 1.05^n u_0$.

<details markdown="1">
<summary>Next step</summary>

$u_n = 200 \times 1.05^n$.

<details markdown="1">
<summary>Full working</summary>

$$u_n = 200 \times 1.05^n$$

$$u_{10} = 200 \times 1.05^{10} \approx 325.8.$$

This is the discrete version of the exponential growth in Section 8.2, with the
multiplier $1.05$ playing the part of $e^{0.05}$.

</details>
</details>
</details>
