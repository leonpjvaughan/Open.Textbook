---
title: "10.2 Permutations — Practise with help"
chapter: 10
chapter_title: Counting and probability
section: "10.2"
section_title: Permutations
tier: O
refs:
- '1.1'
kind: guided-problems
---

# 10.2 Permutations — Practise with help

## Warm-up: remember

1. A cafe offers $3$ starters and $4$ mains. How many two-course meals are possible?
2. Work out $5 \times 4 \times 3$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $3 \times 4 = 12$ meals, because the choices multiply.
2. $5 \times 4 \times 3 = 60$.

Both answers are products of counting down. That is exactly the shape of a permutation.

</details>

## Practise with help

**1.** How many ways can $4$ different books be arranged in a row?

<details markdown="1">
<summary>Hint</summary>

After each book is placed, one fewer book is left.

<details markdown="1">
<summary>Next step</summary>

The choices are $4$, then $3$, then $2$, then $1$.

<details markdown="1">
<summary>Full working</summary>

$$4! = 4 \times 3 \times 2 \times 1 = 24 \text{ arrangements}$$

Every different order counts, because the books are arranged in a row.

</details>
</details>
</details>

**2.** In a race with $7$ runners, how many ways can first and second place be filled?

<details markdown="1">
<summary>Hint</summary>

First place uses one runner, and second place cannot use the same runner.

<details markdown="1">
<summary>Next step</summary>

There are $7$ choices for first, then $6$ for second.

<details markdown="1">
<summary>Full working</summary>

$$7 \times 6 = 42 \text{ ways}$$

This is ${}^{7}P_{2}$, and it has two factors because two places are filled.

</details>
</details>
</details>

**3.** A code uses $3$ different letters chosen from $5$, written in order. How many codes
are possible?

<details markdown="1">
<summary>Hint</summary>

The letters must be different, so each stage has one fewer choice.

<details markdown="1">
<summary>Next step</summary>

$5$ choices, then $4$, then $3$.

<details markdown="1">
<summary>Full working</summary>

$${}^{5}P_{3} = 5 \times 4 \times 3 = 60 \text{ codes}$$

Three factors, because there are three positions.

</details>
</details>
</details>

**4.** How many different arrangements are there of the letters of MATHS?

<details markdown="1">
<summary>Hint</summary>

All five letters are different, so this is $5!$.

<details markdown="1">
<summary>Next step</summary>

Multiply $5 \times 4 \times 3 \times 2 \times 1$.

<details markdown="1">
<summary>Full working</summary>

$$5! = 120 \text{ arrangements}$$

If a letter were repeated, some arrangements would look the same, and the count would
need adjusting. Here every letter is different.

</details>
</details>
</details>

**5.** Find the value of ${}^{10}P_{3}$.

<details markdown="1">
<summary>Hint</summary>

How many factors does ${}^{10}P_{3}$ have?

<details markdown="1">
<summary>Next step</summary>

Three factors, counting down from $10$.

<details markdown="1">
<summary>Full working</summary>

$${}^{10}P_{3} = 10 \times 9 \times 8 = 720$$

Writing $10!$ would be wrong: that has ten factors and counts arrangements of all ten
objects.

</details>
</details>
</details>

**6.** Back to the chapter problem. The lucky dip bag has $5$ red and $3$ blue counters.
Two counters are drawn in order, without replacement. How many ordered pairs are there in
total, and how many are both red?

<details markdown="1">
<summary>Hint</summary>

The total uses all $8$ counters. The red pairs use only the $5$ red counters.

<details markdown="1">
<summary>Next step</summary>

Total: ${}^{8}P_{2}$. Red pairs: ${}^{5}P_{2}$.

<details markdown="1">
<summary>Full working</summary>

$${}^{8}P_{2} = 8 \times 7 = 56 \text{ ordered pairs}$$

$${}^{5}P_{2} = 5 \times 4 = 20 \text{ ordered red pairs}$$

Each is a product of two factors, because two counters are drawn.

</details>
</details>
</details>

## A question from Chapter 10.1

**7.** A sandwich shop offers $4$ breads and $5$ fillings. How many sandwiches can be made
with one bread and one filling?

<details markdown="1">
<summary>Hint</summary>

This is the fundamental principle, not a permutation.

<details markdown="1">
<summary>Next step</summary>

Multiply $4 \times 5$.

<details markdown="1">
<summary>Full working</summary>

$$4 \times 5 = 20 \text{ sandwiches}$$

The order does not matter here: a sandwich is one bread with one filling. Use a
permutation only when a different order gives a different result.

</details>
</details>
</details>
