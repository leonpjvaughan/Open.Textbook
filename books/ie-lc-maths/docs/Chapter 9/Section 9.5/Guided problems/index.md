---
title: "9.5 Recurrence relations — Practise with help"
chapter: 9
chapter_title: Sequences and series
section: "9.5"
section_title: Recurrence relations
tier: O
refs:
- '4.1'
kind: guided-problems
---

# 9.5 Recurrence relations — Practise with help

## Warm-up: remember

1. Find the fifth term of $3, 8, 13, \dots$
2. Find the fourth term of $2, 6, 18, \dots$

<details markdown="1">
<summary>Answers and feedback</summary>

1. $3 + 4(5) = 23$.
2. $2 \times 3^3 = 54$.

</details>

## Practise with help

**1.** $T_1 = 4$ and $T_{n+1} = 2T_n + 1$. Find the first four terms.

<details markdown="1">
<summary>Hint</summary>

Work through one term at a time.

<details markdown="1">
<summary>Next step</summary>

$T_2 = 2(4) + 1 = 9$.

<details markdown="1">
<summary>Full working</summary>

$$T_1 = 4,\quad T_2 = 9,\quad T_3 = 19,\quad T_4 = 39$$

The sequence is $4, 9, 19, 39, \dots$ Each term depends on the last, so the work is
one step at a time.

</details>
</details>
</details>

**2.** Find the fixed point of $T_{n+1} = 3T_n + 8$.

<details markdown="1">
<summary>Hint</summary>

Solve $L = 3L + 8$.

<details markdown="1">
<summary>Next step</summary>

$-2L = 8$.

<details markdown="1">
<summary>Full working</summary>

$$L = 3L + 8 \quad\Rightarrow\quad -2L = 8 \quad\Rightarrow\quad L = -4$$

The fixed point is $-4$. Starting near it, the sequence moves away, because the
multiplier $3$ is greater than $1$.

</details>
</details>
</details>

**3.** $T_1 = 8$ and $T_{n+1} = \dfrac{1}{2}T_n + 3$. Find $T_2$, $T_3$ and $T_4$, and say
what the terms are approaching.

<details markdown="1">
<summary>Hint</summary>

The fixed point solves $L = \frac{1}{2}L + 3$.

<details markdown="1">
<summary>Next step</summary>

$T_2 = 4 + 3 = 7$.

<details markdown="1">
<summary>Full working</summary>

$T_2 = 7$, $T_3 = 6.5$, $T_4 = 6.25$.

The fixed point is $L = 6$. The terms are moving down towards $6$ and closing half the
remaining gap each time, so they never quite reach it.

</details>
</details>
</details>

**4.** Write the arithmetic sequence $5, 9, 13, \dots$ as a recurrence relation.

<details markdown="1">
<summary>Hint</summary>

Each term is the last plus $d$.

<details markdown="1">
<summary>Next step</summary>

$d = 4$.

<details markdown="1">
<summary>Full working</summary>

$$T_1 = 5, \qquad T_{n+1} = T_n + 4$$

The starting value is essential. Without it, the recurrence would describe every
arithmetic sequence with common difference $4$, not this particular one.

</details>
</details>
</details>

**5.** Write the geometric sequence $7, 21, 63, \dots$ as a recurrence relation.

<details markdown="1">
<summary>Hint</summary>

Each term is the last times $r$.

<details markdown="1">
<summary>Next step</summary>

$r = 3$.

<details markdown="1">
<summary>Full working</summary>

$$T_1 = 7, \qquad T_{n+1} = 3T_n$$

</details>
</details>
</details>

**6.** Explain the difference between a fixed point and a limit.

<details markdown="1">
<summary>Hint</summary>

Is a fixed point always where the sequence ends up?

<details markdown="1">
<summary>Next step</summary>

$T_{n+1} = 4T_n - 9$ has fixed point $3$ but moves away from it.

<details markdown="1">
<summary>Full working</summary>

A **fixed point** is a value that the recurrence leaves unchanged: if $T_n$ equals it,
then $T_{n+1}$ equals it too. It is found by solving $L = f(L)$.

A **limit** is the value the terms actually approach as $n$ grows.

A fixed point is not automatically a limit. The recurrence $T_{n+1} = 4T_n - 9$ has the
fixed point $3$, but starting anywhere else the terms move away from $3$, so $3$ is not
the limit. Whether a fixed point is a limit depends on the recurrence — for
$T_{n+1} = \frac{1}{2}T_n + 10$ it is, and for $T_{n+1} = 4T_n - 9$ it is not.

</details>
</details>
</details>

## A question from Section 9.4

**7.** Plan B from the chapter problem satisfies $T_{n+1} = 1.1T_n$ with $T_1 = 50$. Find
$T_4$ and say what the fixed point is.

<details markdown="1">
<summary>Hint</summary>

$T_4 = 50 \times 1.1^3$, and the fixed point solves $L = 1.1L$.

<details markdown="1">
<summary>Next step</summary>

$1.1^3 = 1.331$.

<details markdown="1">
<summary>Full working</summary>

$$T_4 = 50 \times 1.331 = 66.55$$

Fixed point: $L = 1.1L$ gives $0.1L = 0$, so $L = 0$.

The only fixed point is zero, and the sequence moves away from it, growing without bound.
That is the recurrence's way of saying a 10% increase cannot continue forever — which is
exactly why the chapter problem stops at 24 months.

</details>
</details>
</details>
