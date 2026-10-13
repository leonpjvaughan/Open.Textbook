---
title: 1.5 Proof by contradiction — Practise with help
chapter: 1
chapter_title: Proof and mathematical argument
section: '1.5'
section_title: Proof by contradiction
refs:
- A1
kind: guided-problems
---

# 1.5 Proof by contradiction — Practise with help

Work each proof closed book. Begin with the sentence "Assume, for contradiction,
that …", and finish by naming the assumption that the contradiction destroys.

## Warm-up: remember

1. Write an even whole number in the form $2k$ and an odd whole number in the
   form $2k + 1$.
2. Expand $(2k + 1)^2$.
3. Work out $2 \times 3 \times 5 + 1$.

<details markdown="1">
<summary>Answers</summary>

1. Even: $2k$. Odd: $2k + 1$.
2. $(2k + 1)^2 = 4k^2 + 4k + 1$.
3. $2 \times 3 \times 5 = 30$, so the value is $31$.
</details>

## Practise with help

**1.** Prove that there is no smallest positive rational number.

<details markdown="1">
<summary>Hint</summary>

Take any candidate for the smallest positive rational number, call it $q$, and
look for a positive rational number smaller than it.
</details>

<details markdown="1">
<summary>Next step</summary>

Halve $q$. Both $q$ and $2$ are positive, so $q/2$ is positive, and it is
smaller than $q$.
</details>

<details markdown="1">
<summary>Full working</summary>

Assume, for contradiction, that $q$ is the smallest positive rational number.

The number $q/2$ is positive, because $q$ is positive and $2$ is positive. It is
also rational, because it is half of a rational number. And

$$
\frac{q}{2} < q.
$$

So $q/2$ is a positive rational number smaller than $q$. This contradicts the
claim that $q$ is the smallest. The assumption is false, so there is no smallest
positive rational number.
</details>

**2.** Prove the lemma: if $a^2$ is even, then $a$ is even.

<details markdown="1">
<summary>Hint</summary>

Prove it by contradiction. Suppose $a$ is not even, so $a$ is odd, and square
$a = 2k + 1$.
</details>

<details markdown="1">
<summary>Next step</summary>

Expand $(2k + 1)^2$ and factor a $2$ out of the first two terms, leaving a
remainder $1$.
</details>

<details markdown="1">
<summary>Full working</summary>

Assume, for contradiction, that $a$ is odd. Then $a = 2k + 1$ for some whole
number $k$. Squaring,

$$
a^2 = (2k + 1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1.
$$

This is one more than a multiple of $2$, so $a^2$ is odd. But we are told that
$a^2$ is even. A number cannot be both odd and even, so the assumption is false.
Therefore $a$ is even.
</details>

**3.** Prove that the sum of a rational number and an irrational number is
irrational.

<details markdown="1">
<summary>Hint</summary>

Assume the sum is rational, and write it as $q$. Then make the irrational number
the subject of the equation.
</details>

<details markdown="1">
<summary>Next step</summary>

From $r + i = q$, with $r$ and $q$ rational, write $i = q - r$ and ask what kind
of number $q - r$ is.
</details>

<details markdown="1">
<summary>Full working</summary>

Let $r$ be rational and $i$ be irrational. Assume, for contradiction, that
$r + i$ is rational, and call it $q$.

Then

$$
i = q - r.
$$

The difference of two rational numbers is rational, so $q - r$ is rational. That
makes $i$ rational. But $i$ is irrational. A number cannot be both rational and
irrational, so the assumption is false. Therefore $r + i$ is irrational.
</details>

**4.** Let $N = 2 \times 3 \times 5 \times 7 + 1$. Show that none of $2$, $3$,
$5$ or $7$ divides $N$.

<details markdown="1">
<summary>Hint</summary>

Each of the four primes divides the product $2 \times 3 \times 5 \times 7$. What
remainder does that leave for $N = $ product $+ 1$?
</details>

<details markdown="1">
<summary>Next step</summary>

Work out the product, then $N$, then write each division with its remainder.
</details>

<details markdown="1">
<summary>Full working</summary>

The product is

$$
2 \times 3 \times 5 \times 7 = 210,
$$

so

$$
N = 210 + 1 = 211.
$$

Each of $2$, $3$, $5$ and $7$ divides $210$ exactly, so each leaves remainder $1$
on division by $211$:

$$
211 = 2 \times 105 + 1, \qquad 211 = 3 \times 70 + 1,
$$

$$
211 = 5 \times 42 + 1, \qquad 211 = 7 \times 30 + 1.
$$

So none of the four primes divides $N$.
</details>

**5.** Prove that $\sqrt{3}$ is irrational.

<details markdown="1">
<summary>Hint</summary>

The proof follows the same shape as the proof for $\sqrt{2}$, but with $3$ in
place of $2$. First show that if $3$ divides $a^2$, then $3$ divides $a$.
</details>

<details markdown="1">
<summary>Next step</summary>

Assume $\sqrt{3} = a/b$ in lowest terms, square it to get $a^2 = 3b^2$, then show
that $a$ and $b$ are both multiples of $3$.
</details>

<details markdown="1">
<summary>Full working</summary>

First, a fact: if $3$ divides $a^2$, then $3$ divides $a$. Every whole number $a$
has remainder $0$, $1$ or $2$ on division by $3$. Squaring:

$$
(3k)^2 = 3(3k^2), \qquad (3k + 1)^2 = 3(3k^2 + 2k) + 1, \qquad (3k + 2)^2 = 3(3k^2 + 4k + 1) + 1.
$$

Only the case $a = 3k$ gives a multiple of $3$, so if $3$ divides $a^2$, then $a$
is a multiple of $3$.

Now assume, for contradiction, that $\sqrt{3}$ is rational, so
$\sqrt{3} = a/b$ in lowest terms. Squaring and multiplying by $b^2$:

$$
a^2 = 3b^2.
$$

The right-hand side has a factor $3$, so $a^2$ is a multiple of $3$, and by the
fact above $a$ is a multiple of $3$: write $a = 3k$. Then

$$
(3k)^2 = 3b^2, \qquad \text{so} \qquad 9k^2 = 3b^2, \qquad \text{so} \qquad 3k^2 = b^2.
$$

Now $b^2$ is a multiple of $3$, so by the fact above $b$ is a multiple of $3$.
Both $a$ and $b$ are multiples of $3$, so the fraction $\frac{a}{b}$ was not in
its lowest terms. This contradicts the assumption, so $\sqrt{3}$ is irrational.
</details>

**6.** Prove that there is no greatest multiple of $3$.

<details markdown="1">
<summary>Hint</summary>

Assume there is one, call it $M$, and add another multiple of $3$ to it.
</details>

<details markdown="1">
<summary>Next step</summary>

Because $M$ is a multiple of $3$, write $M = 3k$. Now look at $M + 3 = 3k + 3$.
</details>

<details markdown="1">
<summary>Full working</summary>

Assume, for contradiction, that $M$ is the greatest multiple of $3$. Then

$$
M = 3k
$$

for some whole number $k$.

The number $M + 3$ is

$$
M + 3 = 3k + 3 = 3(k + 1),
$$

which is a multiple of $3$. It is also greater than $M$, since $3 > 0$. So
$M + 3$ is a multiple of $3$ greater than $M$, contradicting the claim that $M$
is the greatest. Therefore there is no greatest multiple of $3$.
</details>
