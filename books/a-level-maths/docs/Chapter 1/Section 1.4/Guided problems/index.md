---
title: 1.4 Disproof by counter example — Practise with help
chapter: 1
chapter_title: Proof and mathematical argument
section: '1.4'
section_title: Disproof by counter example
refs:
- A1
kind: guided-problems
---

# 1.4 Disproof by counter example — Practise with help

Work each one closed book. For every disproof, write the two lines: the
assumption holds, and the conclusion fails.

## Warm-up: remember

1. Test whether $15$ is prime.
2. Work out the value of $n^2 + n + 11$ when $n = 5$.
3. Write the converse of: "If a number ends in $0$, then it is even."

<details markdown="1">
<summary>Answers</summary>

1. $15 = 3 \times 5$, so $15$ is not prime.
2. $5^2 + 5 + 11 = 25 + 5 + 11 = 41$.
3. "If a number is even, then it ends in $0$." This converse is false: $4$ is
   even and does not end in $0$.
</details>

## Practise with help

**1.** Disprove the claim "Every prime number is odd."

<details markdown="1">
<summary>Hint</summary>

Look at the smallest prime. It has no factor other than $1$ and itself.
</details>

<details markdown="1">
<summary>Next step</summary>

Write down the first few primes and check each one against the word "odd".
</details>

<details markdown="1">
<summary>Full working</summary>

The number $2$ is prime, because its only factors are $1$ and $2$. The
assumption holds. But $2$ is even, so it is not odd, and the conclusion fails.
The claim is false.

The number $2$ is the only even prime. It is the counter example, and after it
every prime is odd.
</details>

**2.** Disprove the claim "For every whole number $n$, the value of $n^2 - n + 11$
is prime."

<details markdown="1">
<summary>Hint</summary>

The constant is $11$. Look for a value of $n$ that makes the constant combine
with the other terms into a square.
</details>

<details markdown="1">
<summary>Next step</summary>

Try $n = 11$, and work out $11^2 - 11 + 11$.
</details>

<details markdown="1">
<summary>Full working</summary>

Take $n = 11$. Then

$$
n^2 - n + 11 = 121 - 11 + 11 = 121.
$$

But

$$
121 = 11 \times 11,
$$

so the value is not prime. The assumption holds, since $11$ is a whole number,
and the conclusion fails. The claim is false.
</details>

**3.** Disprove the claim "For all real numbers $x$ and $y$, if $x^2 > y^2$ then
$x > y$."

<details markdown="1">
<summary>Hint</summary>

Squaring hides the sign. Try making $x$ negative and larger in size than $y$ but
less than $y$ as a number.
</details>

<details markdown="1">
<summary>Next step</summary>

Try $x = -3$ and $y = 2$. Work out $x^2$ and $y^2$, then compare $x$ and $y$.
</details>

<details markdown="1">
<summary>Full working</summary>

Take $x = -3$ and $y = 2$. Then

$$
x^2 = 9 \qquad \text{and} \qquad y^2 = 4,
$$

so $x^2 > y^2$, and the assumption holds. But $x = -3 < 2 = y$, so the conclusion
fails. The claim is false.
</details>

**4.** Disprove the claim "The sum of two prime numbers is even."

<details markdown="1">
<summary>Hint</summary>

Look again at the smallest prime, the one that is even.
</details>

<details markdown="1">
<summary>Next step</summary>

Add $2$ and $3$, then decide whether the total is even.
</details>

<details markdown="1">
<summary>Full working</summary>

Take the primes $2$ and $3$. Both are prime, so the assumption holds. Their sum
is

$$
2 + 3 = 5,
$$

which is odd, so the conclusion fails. The claim is false. It fails because one
of the two primes can be $2$, the only even prime.
</details>

**5.** Disprove the claim "For every real number $x$, $x^3 > x^2$."

<details markdown="1">
<summary>Hint</summary>

Test a number between $0$ and $1$. Multiplying by another factor smaller than
$1$ makes the result smaller.
</details>

<details markdown="1">
<summary>Next step</summary>

Try $x = \frac{1}{2}$. Work out $x^2$ and $x^3$, then compare them.
</details>

<details markdown="1">
<summary>Full working</summary>

Take $x = \frac{1}{2}$. Then

$$
x^2 = \frac{1}{4}, \qquad x^3 = \frac{1}{8}.
$$

Now

$$
\frac{1}{8} < \frac{1}{4},
$$

so $x^3 > x^2$ is false. The assumption holds, since $\frac{1}{2}$ is a real
number, and the conclusion fails. The claim is false.
</details>

**6.** Disprove the claim "Every triangle whose sides are whole numbers has a
right angle."

<details markdown="1">
<summary>Hint</summary>

A right angle needs Pythagoras: the square of the longest side must equal the
sum of the squares of the other two.
</details>

<details markdown="1">
<summary>Next step</summary>

Take the sides $2$, $3$ and $4$, and compare $4^2$ with $2^2 + 3^2$.
</details>

<details markdown="1">
<summary>Full working</summary>

Take the triangle with sides $2$, $3$ and $4$. The longest side is $4$, so a right
angle would need

$$
4^2 = 2^2 + 3^2.
$$

But

$$
4^2 = 16 \qquad \text{and} \qquad 2^2 + 3^2 = 4 + 9 = 13,
$$

and $16 \neq 13$. The sides are whole numbers, so the assumption holds, and there
is no right angle, so the conclusion fails. The claim is false.
</details>
