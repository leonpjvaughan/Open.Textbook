---
title: 4.6 Geometric sequences and series, and the sum to infinity — Practise with help
chapter: 4
chapter_title: Sequences and series
section: '4.6'
section_title: Geometric sequences and series, and the sum to infinity
refs:
- D5
kind: guided-problems
---

# 4.6 Geometric sequences and series, and the sum to infinity — Practise with help

Work each one first, closed book. Find $a$ and $r$ before you choose a formula.
Before you use the sum to infinity, write $|r| < 1$ and check it.

## Warm-up: remember

1. Work out $3 \times 2^3$.
2. A sequence is given by $u_{n+1} = 0.5u_n$ and $u_1 = 8$. Work out $u_3$.
3. Work out the sum of the first 5 terms of $2, 6, 10, \dots$.

<details markdown="1">
<summary>Answers</summary>

1. $3 \times 2^3 = 3 \times 8 = 24$.
2. $u_2 = 0.5(8) = 4$, so $u_3 = 0.5(4) = 2$.
3. The sequence is arithmetic with $a = 2$ and $d = 4$, so
   $S_5 = \frac{5}{2}(2(2) + 4(4)) = \frac{5}{2}(20) = 50$.

If question 2 was hard, revisit recurrences in Section 4.3 before you continue.
A geometric sequence is exactly a recurrence that multiplies by a fixed number.
</details>

## Practise with help

**1.** A geometric sequence begins $5, 15, 45, \dots$. Work out the 6th term.

<details markdown="1">
<summary>Hint</summary>

Find the common ratio by dividing a term by the one before it. Then use
$u_n = a r^{n-1}$.
</details>

<details markdown="1">
<summary>Next step</summary>

Here $a = 5$ and $r = 15 \div 5 = 3$. Substitute $n = 6$, so the power of $3$ is
$5$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
u_6 = 5(3)^{6-1} = 5(243) = 1215.
$$

The 6th term is $1215$. The power is $5$, one less than the position.
</details>

**2.** Work out the sum of the first 8 terms of $2, 6, 18, \dots$.

<details markdown="1">
<summary>Hint</summary>

Use $S_n = \dfrac{a(1 - r^n)}{1 - r}$ with $a = 2$ and $r = 3$.
</details>

<details markdown="1">
<summary>Next step</summary>

Substitute $n = 8$: the numerator is $2(1 - 3^8)$ and the denominator is
$1 - 3 = -2$. Work out $3^8 = 6561$ first.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
S_8 = \frac{2(1 - 3^8)}{1 - 3} = \frac{2(1 - 6561)}{-2} = \frac{2(-6560)}{-2} = 6560.
$$

The sum of the first 8 terms is $6560$. Dividing by a negative denominator and
multiplying by a negative numerator is what turns the answer positive.
</details>

**3.** Work out the sum to infinity of $24 + 6 + 1.5 + \dots$.

<details markdown="1">
<summary>Hint</summary>

Find $r$ first, and check that $|r| < 1$ before you use the formula.
</details>

<details markdown="1">
<summary>Next step</summary>

$r = \frac{6}{24} = \frac{1}{4}$, which is less than $1$ in size. Then use
$S_\infty = \frac{a}{1 - r}$ with $a = 24$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
S_\infty = \frac{24}{1 - \frac{1}{4}} = \frac{24}{\frac{3}{4}} = 24 \times \frac{4}{3} = 32.
$$

The series settles on $32$. Check the reason: dividing by $\frac{3}{4}$ is the
same as multiplying by $\frac{4}{3}$, and the terms shrink quickly.
</details>

**4.** A geometric sequence has first term $5$ and third term $20$. The common
ratio is positive. Find $r$.

<details markdown="1">
<summary>Hint</summary>

The third term is $a r^2$. Set it equal to $20$ and solve for $r$.
</details>

<details markdown="1">
<summary>Next step</summary>

$5r^2 = 20$, so $r^2 = 4$. Take the positive square root, because the question
says the ratio is positive.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
5r^2 = 20 \implies r^2 = 4 \implies r = 2.
$$

The sequence is $5, 10, 20, \dots$, and the third term is indeed $20$. Without
the positive condition, $r = -2$ would also fit.
</details>

**5.** Work out the sum to infinity of a geometric series with first term $100$
and common ratio $0.9$.

<details markdown="1">
<summary>Hint</summary>

Check the condition first: $|0.9| < 1$, so the series converges.
</details>

<details markdown="1">
<summary>Next step</summary>

$S_\infty = \dfrac{100}{1 - 0.9} = \dfrac{100}{0.1}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
S_\infty = \frac{100}{1 - 0.9} = \frac{100}{0.1} = 1000.
$$

The total can never reach $1000$ exactly, but it gets as close as you like. The
large ratio is why the total is ten times the first term.
</details>

**6.** Write $0.444\dots$ as a fraction.

<details markdown="1">
<summary>Hint</summary>

Split the decimal into $0.4 + 0.04 + 0.004 + \dots$ and read off the first term
and the common ratio.
</details>

<details markdown="1">
<summary>Next step</summary>

Here $a = 0.4$ and $r = 0.1$, so use $S_\infty = \frac{a}{1 - r}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
0.444\dots = \frac{0.4}{1 - 0.1} = \frac{0.4}{0.9} = \frac{4}{9}.
$$

Check: $4 \div 9 = 0.444\dots$, so the fraction is correct.
</details>

**7.** The online appeal raises £600 in month 1 and 80% of that each month
after. Work out the total raised in the first 12 months, to the nearest penny.

<details markdown="1">
<summary>Hint</summary>

This is a finite geometric series, so use $S_n$ with $a = 600$, $r = 0.8$ and
$n = 12$. Do not use the sum to infinity.
</details>

<details markdown="1">
<summary>Next step</summary>

$S_{12} = \frac{600(1 - 0.8^{12})}{0.2} = 3000(1 - 0.8^{12})$. Work out
$0.8^{12}$ first, then the bracket.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
0.8^{12} = 0.068719476736,
$$

so

$$
S_{12} = 3000(1 - 0.068719476736) = 3000(0.931280523264) = 2793.84.
$$

The appeal raises £2793.84 in the first year. The sum to infinity is £3000, so
the year has collected almost everything the appeal can ever raise.
</details>
