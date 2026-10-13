---
title: 1.3 Proof by exhaustion — Learn
chapter: 1
chapter_title: Proof and mathematical argument
section: '1.3'
section_title: Proof by exhaustion
refs:
- A1
kind: walkthrough
---

# 1.3 Proof by exhaustion — Learn

**Prerequisites:** divisibility and remainders; prime numbers; factorising small
whole numbers; the meaning of "for all" from 1.1.

**By the end of this section you can:** prove a statement about a finite set by
checking every case; decide whether a list of cases is exhaustive; explain why
checking finitely many cases cannot prove a claim about every whole number; and
use remainders to turn an infinite problem into a finite one.

## 1. What exhaustion is

**Proof by exhaustion** splits a statement into cases and checks every one of
them. When the list of cases is complete, and every case is correct, the
statement is proved. Nothing is left to test.

The two jobs are:

1. list the cases so that nothing is missed;
2. check each case, usually with arithmetic.

**Example 1.** Prove that every whole number from $1$ to $6$ divides $60$.

Write the six multiplications:

$$
\begin{aligned}
60 &= 1 \times 60, & 60 &= 2 \times 30, & 60 &= 3 \times 20, \\
60 &= 4 \times 15, & 60 &= 5 \times 12, & 60 &= 6 \times 10.
\end{aligned}
$$

Each of $1$, $2$, $3$, $4$, $5$ and $6$ divides $60$ with no remainder. The list
covers every whole number from $1$ to $6$, so the cases are exhaustive and the
statement is proved.

## 2. A real use: testing for primes

To decide whether a whole number $N$ is prime, you only need to test the prime
numbers whose squares are at most $N$. Any other factor would pair with a smaller
one, so it can give no new information.

**Example 2.** Prove that $97$ is prime.

The primes with $p^2 \leq 97$ are $2$, $3$, $5$ and $7$, because
$7^2 = 49 \leq 97$ and $11^2 = 121 > 97$.

$$
97 \div 2 = 48 \text{ remainder } 1, \qquad
97 \div 3 = 32 \text{ remainder } 1,
$$

$$
97 \div 5 = 19 \text{ remainder } 2, \qquad
97 \div 7 = 13 \text{ remainder } 6.
$$

None divides $97$, and the four cases cover every possible prime factor, so
$97$ is prime. The set of cases is finite even though $97$ is large: the square
root keeps the work small.

## 3. Turning an infinite problem into a finite one

Every whole number leaves remainder $0$, $1$ or $2$ on division by $3$. Those
three cases cover infinitely many numbers, so checking them once proves the
statement for every whole number.

**Example 3.** Prove that $n^2 + 1$ is never a multiple of $3$, for every whole
number $n$.

Write $n$ by its remainder on division by $3$, and square it.

$$
\begin{aligned}
n = 3k     &\quad\text{gives}\quad n^2 + 1 = 9k^2 + 1, \\
n = 3k + 1 &\quad\text{gives}\quad n^2 + 1 = 9k^2 + 6k + 2, \\
n = 3k + 2 &\quad\text{gives}\quad n^2 + 1 = 9k^2 + 12k + 5.
\end{aligned}
$$

The remainders on division by $3$ are $1$, $2$ and $2$. None is $0$, so $n^2 + 1$
is never a multiple of $3$. The three cases cover every whole number, so this is
a complete proof.

## 4. Try it: test the claim

Return to Claim B from the chapter problem: **for every whole number $n$, the
value of $n^2 + n + 41$ is prime**.

**Predict first.** The claim is correct for $n = 0, 1, 2$ and $3$. Up to which
value of $n$ do you expect it to keep working? Write your prediction down before
you touch the slider.

:::figure proof-prime-search

**Test.** Move the slider through the values of $n$. The panel reports the value
of $n^2 + n + 41$ and whether it is prime.

**Explain.** At which value of $n$ does the claim first fail? What does that
value have to do with $41$? Write two sentences. The check for $n = 39$ is
correct, so what exactly is missing from a proof that stops at $n = 39$?

> **Watch out.** There are two ways an exhaustion proof can go wrong.
>
> **A missing case.** If the list of cases does not cover the whole domain, the
> proof has a hole. "Every prime is odd" fails at the one prime that is left out:
> $2$.
>
> **Checking forever.** For a claim about every whole number, no finite list of
> checked values is a proof. The table of values for $n = 0$ to $39$ is strong
> evidence, and the first value after the table, $n = 40$, breaks the claim.
>
> **Re-check:** count the cases in your list, then ask whether any number is
> left out. If the domain is infinite, a finite list can never be exhaustive.

## Progress check

Claim B has now been checked for a long run of values.

1. Why is a check of $n = 0$ to $39$ not a proof of Claim B?
2. Example 3 checked only three cases but proved a statement about every whole
   number. Explain the difference.
3. What kind of statement could exhaustion prove in full: "for all whole
   numbers $n$", or "for every whole number $n$ from $1$ to $50$"? Give a reason.

## You should now be able to

- prove a statement about a finite set by checking every case;
- test for a prime factor using only primes up to the square root;
- use remainder cases to cover infinitely many numbers with finitely many cases;
- explain why a finite check cannot prove a claim about every whole number.
