---
title: 1.3 Proof by exhaustion — Practise with help
chapter: 1
chapter_title: Proof and mathematical argument
section: '1.3'
section_title: Proof by exhaustion
refs:
- A1
kind: guided-problems
---

# 1.3 Proof by exhaustion — Practise with help

Work each one closed book. Before you check a single case, write down the list of
cases and convince yourself that nothing is missing.

## Warm-up: remember

1. Work out $20 \div 3$ as a whole-number division, and write the remainder.
2. Write down the prime numbers less than $10$.
3. Work out $6^2$.

<details markdown="1">
<summary>Answers</summary>

1. $20 = 3 \times 6 + 2$, so the remainder is $2$.
2. $2$, $3$, $5$, $7$.
3. $36$.
</details>

## Practise with help

**1.** Decide whether every whole number from $1$ to $5$ divides $30$. If it
does, prove it by exhaustion; if it does not, give the case that fails.

<details markdown="1">
<summary>Hint</summary>

Write one multiplication or division for each number in the list, and look for a
remainder that is not zero.
</details>

<details markdown="1">
<summary>Next step</summary>

Start with $30 = 1 \times 30$ and work upwards through $2$, $3$, $4$ and $5$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
30 = 1 \times 30, \quad 30 = 2 \times 15, \quad 30 = 3 \times 10,
$$

$$
30 = 4 \times 7 + 2, \quad 30 = 5 \times 6.
$$

Look at the case $4$: $30 \div 4 = 7$ remainder $2$, so $4$ does **not** divide
$30$. The statement is false, and the single case $4$ is a counter example.
</details>

**2.** Prove that $89$ is prime.

<details markdown="1">
<summary>Hint</summary>

First work out which prime numbers have squares at most $89$. Those are the only
ones you need to test.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out $9^2$ and $10^2$, then test $89$ by $2$, $3$, $5$ and $7$.
</details>

<details markdown="1">
<summary>Full working</summary>

Since $9^2 = 81 \leq 89$ and $10^2 = 100 > 89$, test the primes $2$, $3$, $5$ and
$7$.

$$
89 \div 2 = 44 \text{ remainder } 1, \qquad
89 \div 3 = 29 \text{ remainder } 2,
$$

$$
89 \div 5 = 17 \text{ remainder } 4, \qquad
89 \div 7 = 12 \text{ remainder } 5.
$$

None divides $89$, so $89$ has no prime factor. Therefore $89$ is prime.
</details>

**3.** Prove by exhaustion that $n^2 + n + 41$ is prime for $n = 0, 1, 2, 3$.

<details markdown="1">
<summary>Hint</summary>

Work out the four values first. Then test each one for prime factors, using the
primes up to its square root.
</details>

<details markdown="1">
<summary>Next step</summary>

The four values are $41$, $43$, $47$ and $53$. For each, test the primes $2$,
$3$, $5$ and $7$.
</details>

<details markdown="1">
<summary>Full working</summary>

The values are

$$
41, \quad 43, \quad 47, \quad 53.
$$

Each is odd, so none is divisible by $2$. The digit sums are $5$, $7$, $11$ and
$8$, none of which is a multiple of $3$, so none is divisible by $3$. None ends
in $0$ or $5$, so none is divisible by $5$. Checking the four values against $7$
gives remainders $6$, $1$, $5$ and $4$ for $41$, $43$, $47$ and $53$ in turn, and
none is zero.

The four cases cover $n = 0$ to $3$, so the statement is proved for those values.
It is not proved for every whole number $n$.
</details>

**4.** Prove by exhaustion that $n^3 - n$ is a multiple of $6$ for
$n = 1, 2, 3, 4$.

<details markdown="1">
<summary>Hint</summary>

Work out each value, then divide by $6$ and look at the remainder. You need the
remainder to be $0$ in all four cases.
</details>

<details markdown="1">
<summary>Next step</summary>

The values are $0$, $6$, $24$ and $60$. Divide each by $6$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
1^3 - 1 = 0 = 6 \times 0, \qquad 2^3 - 2 = 6 = 6 \times 1,
$$

$$
3^3 - 3 = 24 = 6 \times 4, \qquad 4^3 - 4 = 60 = 6 \times 10.
$$

Each value is a multiple of $6$. The four cases cover $n = 1$ to $4$, so the
statement is proved for that finite list.
</details>

**5.** Prove that none of the whole numbers $2$, $3$, $4$, $5$ or $6$ divides
$13$, and explain what that shows about $13$.

<details markdown="1">
<summary>Hint</summary>

Do not divide in your head. Write each division with its remainder, so the reader
can check it.
</details>

<details markdown="1">
<summary>Next step</summary>

Work down the list from $2$: $13 = 2 \times 6 + 1$, then continue.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
13 = 2 \times 6 + 1, \qquad 13 = 3 \times 4 + 1, \qquad 13 = 4 \times 3 + 1,
$$

$$
13 = 5 \times 2 + 3, \qquad 13 = 6 \times 2 + 1.
$$

Every remainder is non-zero, so none of the five numbers divides $13$. The only
smaller whole numbers left are $1$ and, trivially, $13$ itself. Since no whole
number between $2$ and $12$ divides $13$, the number $13$ is prime.
</details>

**6.** A student checks the claim "$n^2 + n + 41$ is prime" for every whole
number $n$ from $0$ to $39$ and finds no exception. Explain why the claim is
still not proved, and say what would change that.

<details markdown="1">
<summary>Hint</summary>

Compare the size of the list with the size of the domain. How many whole numbers
are there?
</details>

<details markdown="1">
<summary>Next step</summary>

Say what a complete exhaustion proof needs: a list that contains every case. Then
check whether this list does.
</details>

<details markdown="1">
<summary>Full working</summary>

The domain is every whole number, and there are infinitely many whole numbers.
The list $n = 0$ to $39$ has forty entries, so it leaves out infinitely many
cases. Exhaustion proves a statement only when the list covers the whole domain.
One value that is not on the list, $n = 40$, gives $1681 = 41 \times 41$, so the
claim fails. A finite check is evidence; only a complete list, or a general
argument, is a proof.
</details>
