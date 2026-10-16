---
title: "9.3 Geometric sequences and series — Practise with help"
chapter: 9
chapter_title: Sequences and series
section: "9.3"
section_title: Geometric sequences and series
tier: O
refs:
- '4.1'
kind: guided-problems
---

# 9.3 Geometric sequences and series — Practise with help

## Warm-up: remember

1. Simplify $2 \times 3^4$.
2. Find $d$ for the arithmetic sequence $4, 11, 18, \dots$

<details markdown="1">
<summary>Answers and feedback</summary>

1. $2 \times 81 = 162$.
2. $d = 7$. Arithmetic adds; geometric multiplies — keep the two apart.

</details>

## Practise with help

**1.** Find the common ratio of $3, 12, 48, \dots$ and the next term.

<details markdown="1">
<summary>Hint</summary>

Divide each term by the one before.

<details markdown="1">
<summary>Next step</summary>

$12 \div 3 = 4$.

<details markdown="1">
<summary>Full working</summary>

$r = 4$, so the next term is $48 \times 4 = 192$.

</details>
</details>
</details>

**2.** Find the sixth term of $2, 10, 50, \dots$

<details markdown="1">
<summary>Hint</summary>

$T_n = ar^{n-1}$ with $a = 2$, $r = 5$, $n = 6$.

<details markdown="1">
<summary>Next step</summary>

$2 \times 5^5$.

<details markdown="1">
<summary>Full working</summary>

$$T_6 = 2 \times 5^5 = 2 \times 3125 = 6250$$

The power is $5$, one less than the term number.

</details>
</details>
</details>

**3.** Find the sum of the first five terms of $4, 12, 36, \dots$

<details markdown="1">
<summary>Hint</summary>

$S_n = \dfrac{a(r^n - 1)}{r - 1}$.

<details markdown="1">
<summary>Next step</summary>

$\dfrac{4(3^5 - 1)}{2}$.

<details markdown="1">
<summary>Full working</summary>

$$S_5 = \frac{4(243 - 1)}{2} = \frac{4 \times 242}{2} = 484$$

Check the first few: $4 + 12 = 16$, $+ 36 = 52$, $+ 108 = 160$, $+ 324 = 484$. Correct.

</details>
</details>
</details>

**4.** A geometric sequence has first term $3$ and fourth term $24$. Find $r$.

<details markdown="1">
<summary>Hint</summary>

$ar^3 = 24$.

<details markdown="1">
<summary>Next step</summary>

$3r^3 = 24$, so $r^3 = 8$. This time it is a cube root, so there is only one answer.

<details markdown="1">
<summary>Full working</summary>

$$r^3 = 8 \quad\Rightarrow\quad r = 2$$

A cube root has only one real answer, unlike a square root. So $r = 2$ and the sequence is
$3, 6, 12, 24, \dots$

</details>
</details>
</details>

**5.** Find the sum of the first five terms of $100, 50, 25, \dots$

<details markdown="1">
<summary>Hint</summary>

$r = \dfrac{1}{2}$, so use the $1 - r^n$ form.

<details markdown="1">
<summary>Next step</summary>

$\dfrac{100\left(1 - \left(\frac{1}{2}\right)^5\right)}{1 - \frac{1}{2}}$.

<details markdown="1">
<summary>Full working</summary>

$$S_5 = \frac{100\left(1 - \frac{1}{32}\right)}{\frac{1}{2}} = \frac{100 \times \frac{31}{32}}{\frac{1}{2}} = \frac{3100}{32} \times 2 = 193.75$$

Check: $100 + 50 + 25 + 12.5 + 6.25 = 193.75$. Correct.

</details>
</details>
</details>

**6.** Explain why a geometric sequence with $r = 1$ is also an arithmetic sequence with
$d = 0$.

<details markdown="1">
<summary>Hint</summary>

What does $r = 1$ do to each term?

<details markdown="1">
<summary>Next step</summary>

Multiplying by 1 leaves the term unchanged.

<details markdown="1">
<summary>Full working</summary>

With $r = 1$ every term equals the first, so the sequence is $a, a, a, \dots$ The
differences are all $0$, so it is arithmetic with $d = 0$.

This is the one overlap between the two kinds, along with the trivial case $a = 0$. Apart
from it, a sequence cannot be both, because adding a constant and multiplying by a
constant are different operations.

</details>
</details>
</details>

## A question from Section 9.2

**7.** An arithmetic sequence and a geometric sequence both start at $1$. The arithmetic
has $d = 2$ and the geometric has $r = 3$. Write down the fourth term of each.

<details markdown="1">
<summary>Hint</summary>

Arithmetic: $1 + 3(2)$. Geometric: $1 \times 3^3$.

<details markdown="1">
<summary>Next step</summary>

$7$ and $27$.

<details markdown="1">
<summary>Full working</summary>

Arithmetic: $T_4 = 1 + 3(2) = 7$.
Geometric: $T_4 = 1 \times 3^3 = 27$.

The geometric term is already much larger at the fourth term. This is the pattern behind
the chapter problem: multiplying grows faster than adding, but the geometric plan starts
from a small base and takes time to overtake.

</details>
</details>
</details>
