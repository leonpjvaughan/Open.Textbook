---
title: 1.4 Disproof by counter example — Learn
chapter: 1
chapter_title: Proof and mathematical argument
section: '1.4'
section_title: Disproof by counter example
dfe:
- A1
kind: walkthrough
---

# 1.4 Disproof by counter example — Learn

**Prerequisites:** substituting a value into an expression; factors and prime
numbers; the meaning of "for all" from 1.1; the limit of a finite check from 1.3.

**By the end of this section you can:** disprove a "for all" statement with one
counter example; choose values to test with a reason; write a disproof in clear
sentences; and explain why a counter example settles a "for all" claim
completely.

## 1. One value is enough

A "for all" statement claims that every case works. To disprove it, you need one
case that fails. That case is a **counter example**.

A disproof has three parts:

1. name a value that satisfies the assumption;
2. show that the conclusion fails for that value;
3. state that the statement is false.

Notice what a counter example does not do. It does not show that the opposite
statement is true. "Every prime is odd" is false, because $2$ is an even prime,
but that does not make "every prime is even" true.

## 2. A first counter example

**Example 1.** Disprove the claim "For every whole number $n$, the value of
$n^2 + n + 41$ is prime".

Look for a value of $n$ that makes the expression factorise. The constant is
$41$, so try $n = 40$. Then

$$
n^2 + n + 41 = 40^2 + 40 + 41.
$$

Notice that $40 + 41 = 81 = 2 \times 40 + 1$, so the last two terms can be
written as $2n + 1$ with $n = 40$:

$$
40^2 + 40 + 41 = 40^2 + 2 \times 40 + 1 = (40 + 1)^2.
$$

Therefore

$$
n^2 + n + 41 = 41^2 = 41 \times 41.
$$

The value at $n = 40$ is $1681$, which has the factor $41$ and is not prime. The
claim is false.

## 3. Where counter examples hide

| Place to look | Why |
|---|---|
| Boundary values: $0$, $1$, negative numbers | Rules often fail at the edges |
| Fractions and small decimals | Squaring and dividing behave differently |
| The value built into the formula | A constant such as $41$ can create a factor |
| The converse of a rule you know works one way | The reverse direction is a separate claim |
| A special case | One even prime, one right-angled triangle, one square |

**Example 2.** Disprove the claim "If $n$ is prime, then $2^n - 1$ is prime".

The claim fails at $n = 11$. First,

$$
2^{11} - 1 = 2048 - 1 = 2047.
$$

Now factorise $2047$:

$$
2047 = 23 \times 89.
$$

Since $2047$ is a product of two numbers greater than $1$, it is not prime. The
value $n = 11$ is prime, so the assumption holds and the conclusion fails. The
claim is false.

**Example 3.** Disprove the claim "For every real number $x$, $x^2 > x$".

Test a number between $0$ and $1$. Take $x = \frac{1}{2}$. Then

$$
x^2 = \frac{1}{4}.
$$

Now

$$
\frac{1}{4} < \frac{1}{2},
$$

so $x^2 > x$ is false. The value $x = \frac{1}{2}$ satisfies the assumption
(it is a real number), and the conclusion fails. The claim is false.

**Example 4.** Disprove the converse of a true statement.

The statement "If $n$ is a multiple of $6$, then $n$ is a multiple of $12$" is
false. Take $n = 6$:

$$
6 = 6 \times 1, \qquad 6 = 12 \times 0 + 6.
$$

The number $6$ is a multiple of $6$, so the assumption holds, but it leaves
remainder $6$ on division by $12$, so the conclusion fails. The claim is false.

> **Watch out.** A value is a counter example only if it satisfies the assumption.
>
> Suppose you want to disprove "If $n$ is even, then $n^2$ is even". Testing
> $n = 3$ tells you nothing, because $3$ is not even. The assumption is part of
> the claim, and a counter example must fit inside it.
>
> **Re-check:** for each candidate value, write down two lines — "the assumption
> holds, because …" and "the conclusion fails, because …". If either line is
> missing, the value is not yet a counter example.

## Progress check

Return to the chapter problem. Claim B says that $n^2 + n + 41$ is prime for
every whole number $n$.

1. State the counter example in the form "the assumption holds, but the
   conclusion fails".
2. Why does a single value settle Claim B for every whole number?
3. Claim A says that $n^2 + n$ is even for every whole number $n$. Can a counter
   example disprove Claim A? What would you need to prove it instead?

## You should now be able to

- disprove a "for all" statement with one counter example;
- check that a counter example satisfies the assumption;
- look for counter examples at boundaries, in fractions, and at the value built
  into a formula;
- explain why a counter example disproves a claim but does not prove its
  opposite.
