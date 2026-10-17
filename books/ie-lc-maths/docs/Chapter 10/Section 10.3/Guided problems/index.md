---
title: "10.3 Combinations — Practise with help"
chapter: 10
chapter_title: Counting and probability
section: "10.3"
section_title: Combinations
tier: O
refs:
- '1.1'
kind: guided-problems
---

# 10.3 Combinations — Practise with help

## Warm-up: remember

1. In a race with $5$ runners, how many ways can first, second and third place be filled?
2. Work out $3!$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $5 \times 4 \times 3 = 60$ ways.
2. $3! = 3 \times 2 \times 1 = 6$.

The $6$ is the key to this section: each set of $3$ objects has $3! = 6$ orders, so a
combination divides the permutation count by $6$.

</details>

:::figure warm-up-gate


## Practise with help

**1.** Find the value of $\dbinom{6}{2}$.

<details markdown="1">
<summary>Hint</summary>

Use $\dbinom{n}{r} = \dfrac{n!}{r!(n-r)!}$.

<details markdown="1">
<summary>Next step</summary>

$\dbinom{6}{2} = \dfrac{6 \times 5}{2 \times 1}$.

<details markdown="1">
<summary>Full working</summary>

$$\binom{6}{2} = \frac{6 \times 5}{2 \times 1} = 15$$

The numerator has two factors, matching $r = 2$, and the denominator is $2!$.

</details>
</details>
</details>

**2.** A committee of $3$ is chosen from $10$ people. How many committees are possible?

<details markdown="1">
<summary>Hint</summary>

Does the order of choosing the people matter?

<details markdown="1">
<summary>Next step</summary>

No, so use $\dbinom{10}{3}$.

<details markdown="1">
<summary>Full working</summary>

$$\binom{10}{3} = \frac{10 \times 9 \times 8}{3 \times 2 \times 1} = 120 \text{ committees}$$

A committee is a set, so each group of three people is counted once.

</details>
</details>
</details>

**3.** Find the value of $\dbinom{8}{5}$.

<details markdown="1">
<summary>Hint</summary>

Use $\dbinom{n}{r} = \dbinom{n}{n-r}$ to make the numbers smaller.

<details markdown="1">
<summary>Next step</summary>

$\dbinom{8}{5} = \dbinom{8}{3}$.

<details markdown="1">
<summary>Full working</summary>

$$\binom{8}{3} = \frac{8 \times 7 \times 6}{3 \times 2 \times 1} = 56$$

Choosing the $5$ to keep is the same as choosing the $3$ to leave out.

</details>
</details>
</details>

**4.** A team of $5$ players is chosen from $9$. How many teams are possible?

<details markdown="1">
<summary>Hint</summary>

A team is a set of players, so the order does not matter.

<details markdown="1">
<summary>Next step</summary>

Use $\dbinom{9}{5}$.

<details markdown="1">
<summary>Full working</summary>

$$\binom{9}{5} = \binom{9}{4} = \frac{9 \times 8 \times 7 \times 6}{4 \times 3 \times 2 \times 1} = 126 \text{ teams}$$

Each team of five players is counted once, whatever the order of choosing.

</details>
</details>
</details>

**5.** A group is chosen from $5$ boys and $6$ girls. How many ways can $2$ boys and $2$
girls be chosen?

<details markdown="1">
<summary>Hint</summary>

Choose the boys and the girls as two separate combinations.

<details markdown="1">
<summary>Next step</summary>

$\dbinom{5}{2} \times \dbinom{6}{2}$.

<details markdown="1">
<summary>Full working</summary>

$$\binom{5}{2} \times \binom{6}{2} = 10 \times 15 = 150 \text{ ways}$$

The choices of boys and girls are independent, so the counts multiply.

</details>
</details>
</details>

**6.** Back to the chapter problem. The lucky dip bag has $5$ red and $3$ blue counters, so
$8$ counters. Two are drawn together. How many pairs are there in total, and how many pairs
are both red?

<details markdown="1">
<summary>Hint</summary>

Drawn together means the order does not matter.

<details markdown="1">
<summary>Next step</summary>

Total: $\dbinom{8}{2}$. Red pairs: $\dbinom{5}{2}$.

<details markdown="1">
<summary>Full working</summary>

$$\binom{8}{2} = \frac{8 \times 7}{2} = 28 \text{ pairs}$$

$$\binom{5}{2} = \frac{5 \times 4}{2} = 10 \text{ red pairs}$$

So $10$ of the $28$ pairs give the small prize.

</details>
</details>
</details>

## A question from Chapter 10.2

**7.** How many ways can $4$ runners fill first, second, third and fourth place?

<details markdown="1">
<summary>Hint</summary>

The order matters, so this is a permutation, not a combination.

<details markdown="1">
<summary>Next step</summary>

$4$ choices, then $3$, then $2$, then $1$.

<details markdown="1">
<summary>Full working</summary>

$$4! = 4 \times 3 \times 2 \times 1 = 24 \text{ ways}$$

Every different order of the four runners is a different result, so this is a permutation.
If the four were an unordered group, it would be $\dbinom{4}{4} = 1$.

</details>
</details>
</details>
