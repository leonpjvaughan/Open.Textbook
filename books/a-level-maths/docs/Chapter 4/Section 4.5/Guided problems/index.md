---
title: 4.5 Arithmetic sequences and series — Practise with help
chapter: 4
chapter_title: Sequences and series
section: '4.5'
section_title: Arithmetic sequences and series
refs:
- D4
kind: guided-problems
---

# 4.5 Arithmetic sequences and series — Practise with help

Work each one first, closed book. Write down $a$ and $d$ before you choose a
formula, and decide whether the question wants one term or a total.

## Warm-up: remember

1. A sequence is given by $u_n = 3n + 2$. Work out $u_5$.
2. Use the standard result to work out $\sum_{r=1}^{4}r$.
3. Solve $2x + 3 = 15$.

<details markdown="1">
<summary>Answers</summary>

1. $u_5 = 3(5) + 2 = 17$.
2. $\sum_{r=1}^{4}r = \frac{4 \times 5}{2} = 10$.
3. Subtract $3$: $2x = 12$, so $x = 6$.

If question 2 was hard, revisit the standard results in Section 4.4 before you
continue. The series formula in this section comes from the same idea.
</details>

## Practise with help

**1.** The first three terms of an arithmetic sequence are $4, 7, 10$. Work out
the 12th term.

<details markdown="1">
<summary>Hint</summary>

Find the first term $a$ and the common difference $d$ first, then use
$u_n = a + (n - 1)d$.
</details>

<details markdown="1">
<summary>Next step</summary>

Here $a = 4$ and $d = 3$. Substitute $n = 12$ into the formula, so the number of
steps is $11$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
u_{12} = 4 + (12 - 1)(3) = 4 + 33 = 37.
$$

The 12th term is $37$. The number of steps is $11$, which is one less than the
position.
</details>

**2.** An arithmetic sequence begins $20, 17, 14, \dots$. Work out the 10th term.

<details markdown="1">
<summary>Hint</summary>

The sequence falls, so the common difference is negative. Work out $17 - 20$.
</details>

<details markdown="1">
<summary>Next step</summary>

Here $a = 20$ and $d = -3$. Substitute $n = 10$ into $u_n = a + (n - 1)d$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
u_{10} = 20 + (10 - 1)(-3) = 20 - 27 = -7.
$$

The 10th term is $-7$. The sequence crosses zero between the 7th and 8th terms,
so a negative term further along is expected.
</details>

**3.** Work out the sum of the first 15 terms of $6, 10, 14, \dots$.

<details markdown="1">
<summary>Hint</summary>

Use $S_n = \dfrac{n}{2}\bigl(2a + (n - 1)d\bigr)$ with $a = 6$ and $d = 4$.
</details>

<details markdown="1">
<summary>Next step</summary>

Substitute $n = 15$: the bracket is $2(6) + 14(4) = 12 + 56$. Then multiply by
$\frac{15}{2}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
S_{15} = \frac{15}{2}\bigl(2(6) + 14(4)\bigr) = \frac{15}{2}(12 + 56)
= \frac{15}{2}(68) = 15 \times 34 = 510.
$$

The sum of the first 15 terms is $510$. The bracket already includes the
$14$ steps, so no further adjustment is needed.
</details>

**4.** Work out the sum $5 + 9 + 13 + \dots + 81$.

<details markdown="1">
<summary>Hint</summary>

Find how many terms there are before you add them. Set the $n$th term equal to
$81$.
</details>

<details markdown="1">
<summary>Next step</summary>

Solve $5 + (n - 1)(4) = 81$. Then use $S_n = \dfrac{n}{2}(a + l)$ with the last
term $l = 81$.
</details>

<details markdown="1">
<summary>Full working</summary>

Set the term equal to the last term:

$$
5 + (n - 1)(4) = 81 \implies 4(n - 1) = 76 \implies n - 1 = 19 \implies n = 20.
$$

There are 20 terms. Then

$$
S_{20} = \frac{20}{2}(5 + 81) = 10 \times 86 = 860.
$$

The sum is $860$.
</details>

**5.** The quiz night raises £150 in month 1 and £50 more each month. Work out
the total raised in the first 8 months.

<details markdown="1">
<summary>Hint</summary>

The income is arithmetic with $a = 150$ and $d = 50$. The question asks for a
total, so use the series formula rather than the term formula.
</details>

<details markdown="1">
<summary>Next step</summary>

Substitute $n = 8$: the bracket is $2(150) + 7(50) = 300 + 350$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
S_8 = \frac{8}{2}\bigl(2(150) + 7(50)\bigr) = 4(300 + 350) = 4(650) = 2600.
$$

The quiz night raises £2600 in the first 8 months. The eighth month alone raises
$150 + 7(50) = 500$ pounds, which is less than a quarter of the total.
</details>

**6.** The 5th term of an arithmetic sequence is $17$ and the 10th term is $37$.
Find the first term and the common difference.

<details markdown="1">
<summary>Hint</summary>

Each term is built from $a$ and $d$. Write two equations, one for the 5th term
and one for the 10th.
</details>

<details markdown="1">
<summary>Next step</summary>

The two equations are $a + 4d = 17$ and $a + 9d = 37$. Subtract the first from
the second to remove $a$.
</details>

<details markdown="1">
<summary>Full working</summary>

Subtracting gives

$$
(a + 9d) - (a + 4d) = 37 - 17 \implies 5d = 20 \implies d = 4.
$$

Substitute $d = 4$ into the first equation: $a + 16 = 17$, so $a = 1$. The
sequence is $1, 5, 9, 13, \dots$, and the 5th term is $1 + 16 = 17$, which
checks.
</details>

**7.** Work out the sum of all the multiples of $7$ below $100$.

<details markdown="1">
<summary>Hint</summary>

List the first few: $7, 14, 21, \dots$ The last multiple below $100$ is $98$. The
series is arithmetic.
</details>

<details markdown="1">
<summary>Next step</summary>

Find $n$ from $7n = 98$, then use $S_n = \frac{n}{2}(7 + 98)$.
</details>

<details markdown="1">
<summary>Full working</summary>

The multiples are $7, 14, 21, \dots, 98$. There are $\frac{98}{7} = 14$ of them.
Then

$$
S_{14} = \frac{14}{2}(7 + 98) = 7 \times 105 = 735.
$$

The sum of all the multiples of $7$ below $100$ is $735$. Every term is
$7$ times a whole number, so the common difference is $7$.
</details>
