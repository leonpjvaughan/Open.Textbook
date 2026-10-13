---
title: 1.5 Proof by contradiction — Learn
chapter: 1
chapter_title: Proof and mathematical argument
section: '1.5'
section_title: Proof by contradiction
refs:
- A1
kind: walkthrough
---

# 1.5 Proof by contradiction — Learn

**Prerequisites:** proof by deduction from 1.2; the general forms $2n$ for even
and $2n + 1$ for odd; prime factorisation; cancelling a fraction to its simplest
form.

**By the end of this section you can:** set up a proof by contradiction; derive
an impossibility from the assumption; and use the method to prove that $\sqrt{2}$
is irrational and that there are infinitely many prime numbers.

## 1. The method

Sometimes the quickest route to a result is to suppose it is false and see what
breaks. A **proof by contradiction** has three steps:

1. assume the opposite of the statement you want to prove;
2. use that assumption to derive something impossible;
3. conclude that the assumption was false, so the original statement is true.

Step 2 usually ends in one of a few familiar impossibilities: a number that is
both even and odd; a fraction that is not in its lowest terms although we said it
was; a prime that divides a number and leaves a remainder; a "smallest" object
with something smaller than it.

## 2. A warm-up contradiction

**Example 1.** Prove that there is no greatest even number.

Assume, for contradiction, that there is a greatest even number. Call it $M$.

Because $M$ is even,

$$
M = 2k
$$

for some whole number $k$.

Add $2$ to $M$. Then

$$
M + 2 = 2k + 2 = 2(k + 1).
$$

This is a multiple of $2$, so $M + 2$ is even. Also

$$
M + 2 > M.
$$

So $M + 2$ is an even number greater than $M$. This contradicts the claim that
$M$ is the greatest even number. The assumption is false, so there is no greatest
even number.

## 3. $\sqrt{2}$ is irrational

A **rational** number can be written as a fraction $\frac{a}{b}$ with whole
numbers $a$ and $b$ and $b \neq 0$. We can cancel common factors until $a$ and
$b$ have no factor in common. Then the fraction is in its **lowest terms**.

First we need a small fact.

**Lemma.** If $a^2$ is even, then $a$ is even.

Suppose $a$ is odd, so

$$
a = 2k + 1.
$$

Then

$$
a^2 = (2k + 1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1,
$$

which is odd, not even. This contradicts the fact that $a^2$ is even. So $a$
cannot be odd, and therefore $a$ is even.

Now the main proof.

**Example 2.** Prove that $\sqrt{2}$ is irrational.

Assume, for contradiction, that $\sqrt{2}$ is rational. Then

$$
\sqrt{2} = \frac{a}{b},
$$

where $a$ and $b$ are whole numbers, $b \neq 0$, and the fraction is in its
lowest terms.

Square both sides:

$$
2 = \frac{a^2}{b^2}.
$$

Multiply both sides by $b^2$:

$$
a^2 = 2b^2.
$$

The right-hand side has a factor $2$, so $a^2$ is even. By the lemma, $a$ is
even, so

$$
a = 2k
$$

for some whole number $k$.

Substitute $a = 2k$ into $a^2 = 2b^2$:

$$
(2k)^2 = 2b^2, \qquad \text{so} \qquad 4k^2 = 2b^2.
$$

Divide both sides by $2$:

$$
2k^2 = b^2.
$$

Now $b^2$ has a factor $2$, so $b^2$ is even, and by the lemma $b$ is even.

So $a$ and $b$ are both even. That means the fraction $\frac{a}{b}$ had a common
factor $2$, which contradicts the fact that it was in its lowest terms. The
assumption is false, so $\sqrt{2}$ is irrational.

## 4. Infinitely many primes

**Example 3.** Prove that there are infinitely many prime numbers.

Assume, for contradiction, that there are only finitely many primes. List them
all:

$$
p_1, p_2, p_3, \ldots, p_n.
$$

Form the number

$$
N = p_1 p_2 p_3 \cdots p_n + 1.
$$

Each prime $p_i$ divides the product $p_1 p_2 \cdots p_n$, so $p_i$ leaves
remainder $0$ for the product and remainder $1$ for $N$. Therefore no $p_i$
divides $N$.

Now $N$ is greater than $1$, and every whole number greater than $1$ has a prime
factor. Let $p$ be a prime factor of $N$. The list $p_1, \ldots, p_n$ was
supposed to contain every prime, so $p$ is one of them. But no prime in the list
divides $N$. This is a contradiction.

The assumption is false, so the list of primes cannot be finite. There are
infinitely many prime numbers.

> **Watch out.** The contradiction must be a genuine impossibility, not a
> surprise.
>
> Suppose you want to prove a statement $P$. You assume not-$P$ and find that
> not-$P$ leads to a strange result, such as a number being both positive and
> negative. That is a contradiction, because no number is both. But "I cannot see
> where the argument goes next" is not a contradiction: it only means the proof is
> unfinished.
>
> **Re-check:** write the exact sentence you are assuming, and the exact sentence
> that it conflicts with. Two sentences that both have to be true, and cannot be,
> are the whole method.

## Progress check

Return to the chapter problem. Claim C says that there is a largest prime number.

1. To prove Claim C false by contradiction, what do you assume at the start?
2. The proof in Example 3 builds the number $N$. Why does no prime in the list
   divide $N$?
3. Write one sentence that states the contradiction, and one that states the
   conclusion.

## You should now be able to

- assume the opposite of a statement and derive a contradiction;
- spot the common impossibilities: even and odd, lowest terms with a common
  factor, a factor and a remainder;
- prove that $\sqrt{2}$ is irrational;
- prove that there are infinitely many prime numbers;
- state which assumption the contradiction destroys.
