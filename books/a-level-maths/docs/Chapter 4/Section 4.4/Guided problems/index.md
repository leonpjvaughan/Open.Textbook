---
title: 4.4 Sigma notation for sums — Practise with help
chapter: 4
chapter_title: Sequences and series
section: '4.4'
section_title: Sigma notation for sums
dfe:
- D3
kind: guided-problems
---

# 4.4 Sigma notation for sums — Practise with help

Work each one first, closed book. Read the two limits before you do anything
else, and decide whether the sum starts at $1$.

## Warm-up: remember

1. Work out $1 + 2 + 3 + 4 + 5$.
2. Expand $2(3x + 4)$.
3. Work out $\dfrac{5 \times 6}{2}$.

<details markdown="1">
<summary>Answers</summary>

1. $1 + 2 + 3 + 4 + 5 = 15$.
2. $2(3x + 4) = 6x + 8$.
3. $\dfrac{30}{2} = 15$.

If question 1 was hard, add the numbers in pairs before you continue. The
standard results in this section are built from sums like this one.
</details>

## Practise with help

**1.** Evaluate $\sum_{r=1}^{4}(2r + 1)$.

<details markdown="1">
<summary>Hint</summary>

Substitute $r = 1, 2, 3, 4$ one at a time, and add the four terms you get.
</details>

<details markdown="1">
<summary>Next step</summary>

The first term is $2(1) + 1 = 3$ and the second is $2(2) + 1 = 5$. Write down
all four terms before you add them.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\sum_{r=1}^{4}(2r + 1) = 3 + 5 + 7 + 9 = 24.
$$

The sum has four terms, because the index runs from $1$ to $4$. Each term is
larger than the one before by $2$.
</details>

**2.** Write $3 + 6 + 9 + \dots + 30$ in sigma notation.

<details markdown="1">
<summary>Hint</summary>

Find the rule that produces the terms, then find the value of the index that
gives the last term.
</details>

<details markdown="1">
<summary>Next step</summary>

The $r$th multiple of $3$ is $3r$. Set $3r = 30$ to find the last value of $r$.
</details>

<details markdown="1">
<summary>Full working</summary>

The terms are multiples of $3$, so the rule is $3r$. The last term is $30$, and
$3r = 30$ gives $r = 10$. So

$$
3 + 6 + 9 + \dots + 30 = \sum_{r=1}^{10} 3r.
$$

Checking the last term is the way to confirm the upper limit.
</details>

**3.** Evaluate $\sum_{r=1}^{5}(r^2 - 1)$.

<details markdown="1">
<summary>Hint</summary>

Substitute each value of $r$ and work out the square first, then subtract $1$.
</details>

<details markdown="1">
<summary>Next step</summary>

The first two terms are $1^2 - 1 = 0$ and $2^2 - 1 = 3$. Continue to $r = 5$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\sum_{r=1}^{5}(r^2 - 1) = 0 + 3 + 8 + 15 + 24 = 50.
$$

There are five terms. The first term is $0$, so the sum is not the sum of
the squares $1 + 4 + 9 + 16 + 25 = 55$; it is five less.
</details>

**4.** Use the standard results to work out $\sum_{r=1}^{10}(3r + 2)$.

<details markdown="1">
<summary>Hint</summary>

Split the sum into $3\sum r$ plus the sum of the constant $2$. The constant $2$
is added once for each value of $r$.
</details>

<details markdown="1">
<summary>Next step</summary>

$\sum_{r=1}^{10} r = \frac{10 \times 11}{2} = 55$, and the constant gives
$10 \times 2 = 20$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\sum_{r=1}^{10}(3r + 2) = 3\sum_{r=1}^{10} r + \sum_{r=1}^{10} 2
= 3(55) + 20 = 165 + 20 = 185.
$$

The sum of the constant is $10 \times 2$, not $2$, because there are ten terms.
</details>

**5.** Use a standard result to work out $\sum_{r=1}^{6} r^2$.

<details markdown="1">
<summary>Hint</summary>

Use $\sum_{r=1}^{n} r^2 = \dfrac{n(n+1)(2n+1)}{6}$ with $n = 6$.
</details>

<details markdown="1">
<summary>Next step</summary>

Substitute $n = 6$: the numerator is $6 \times 7 \times 13$. Work that out
before you divide by $6$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\sum_{r=1}^{6} r^2 = \frac{6 \times 7 \times 13}{6} = 7 \times 13 = 91.
$$

Check with the terms: $1 + 4 + 9 + 16 + 25 + 36 = 91$. The formula and the list
agree.
</details>

**6.** Use the standard results to work out $\sum_{r=3}^{8} r$.

<details markdown="1">
<summary>Hint</summary>

The sum does not start at $1$. Add the terms from $1$ to $8$, then take away the
terms from $1$ to $2$.
</details>

<details markdown="1">
<summary>Next step</summary>

$\sum_{r=1}^{8} r = \frac{8 \times 9}{2} = 36$ and $\sum_{r=1}^{2} r = 3$. The
answer is the difference.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\sum_{r=3}^{8} r = \sum_{r=1}^{8} r - \sum_{r=1}^{2} r = 36 - 3 = 33.
$$

Check by adding: $3 + 4 + 5 + 6 + 7 + 8 = 33$. The adjustment works because the
two sums share the same start, so their difference leaves the middle part.
</details>

**7.** The online appeal raises $600(0.8)^{n-1}$ pounds in month $n$. Write the
total raised in the first 5 months in sigma notation, and work it out.

<details markdown="1">
<summary>Hint</summary>

The index runs over the month numbers, from $1$ to $5$. The summand is the
income in month $n$.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $\sum_{n=1}^{5}600(0.8)^{n-1}$, then write out the five terms. Each one is
$0.8$ times the one before.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\sum_{n=1}^{5}600(0.8)^{n-1} = 600 + 480 + 384 + 307.20 + 245.76.
$$

Adding the brackets: $1 + 0.8 + 0.64 + 0.512 + 0.4096 = 3.3616$, so the total
is $600 \times 3.3616 = 2016.96$. The appeal raises £2016.96 in the first five
months. A geometric sum like this one has its own short formula, which Section
4.6 gives.
</details>
