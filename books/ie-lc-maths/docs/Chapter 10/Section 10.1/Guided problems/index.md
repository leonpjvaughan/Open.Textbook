---
title: "10.1 Counting outcomes and the fundamental principle — Practise with help"
chapter: 10
chapter_title: Counting and probability
section: "10.1"
section_title: Counting outcomes and the fundamental principle
tier: F
refs:
- '1.1'
kind: guided-problems
---

# 10.1 Counting outcomes and the fundamental principle — Practise with help

## Warm-up: remember

1. Write $3 \times 3 \times 3 \times 3$ as a power of $3$.
2. Work out $2^5$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $3^4$, because there are four factors of $3$.
2. $2^5 = 2 \times 2 \times 2 \times 2 \times 2 = 32$.

Both answers use repeated multiplication, which is what the fundamental principle does
when every stage has the same number of choices.

</details>

## Practise with help

**1.** A cafe offers $3$ starters and $5$ mains. How many two-course meals are possible?

<details markdown="1">
<summary>Hint</summary>

How many meals does one starter give?

<details markdown="1">
<summary>Next step</summary>

One starter can go with any of the $5$ mains.

<details markdown="1">
<summary>Full working</summary>

Each of the $3$ starters gives $5$ meals, so the total is

$$3 \times 5 = 15 \text{ meals}$$

The choices multiply because each starter is paired with every main.

</details>
</details>
</details>

**2.** A lock has $4$ dials, and each dial shows a digit from $0$ to $9$. How many codes are
possible?

<details markdown="1">
<summary>Hint</summary>

Each dial has $10$ positions. The dials do not affect each other.

<details markdown="1">
<summary>Next step</summary>

Multiply $10$ by itself once for each dial.

<details markdown="1">
<summary>Full working</summary>

$$10 \times 10 \times 10 \times 10 = 10^4 = 10000$$

There are $10000$ codes. Digits may repeat, so each dial keeps all $10$ positions.

</details>
</details>
</details>

**3.** A coin is tossed $3$ times. How many sequences of heads and tails are possible?

<details markdown="1">
<summary>Hint</summary>

Each toss has $2$ outcomes, and there are $3$ tosses.

<details markdown="1">
<summary>Next step</summary>

Multiply $2 \times 2 \times 2$.

<details markdown="1">
<summary>Full working</summary>

$$2 \times 2 \times 2 = 2^3 = 8 \text{ sequences}$$

They are HHH, HHT, HTH, HTT, THH, THT, TTH and TTT.

</details>
</details>
</details>

**4.** A code has $2$ letters followed by $2$ digits. Each letter is one of $26$ letters and
each digit is one of $10$ digits. How many codes are possible?

<details markdown="1">
<summary>Hint</summary>

There are four stages: letter, letter, digit, digit.

<details markdown="1">
<summary>Next step</summary>

Multiply $26 \times 26 \times 10 \times 10$.

<details markdown="1">
<summary>Full working</summary>

$$26 \times 26 \times 10 \times 10 = 67600 \text{ codes}$$

Letters and digits may repeat, so every stage keeps its full count of choices.

</details>
</details>
</details>

**5.** A restaurant offers $4$ starters, $3$ mains and $2$ desserts. How many three-course
meals are possible?

<details markdown="1">
<summary>Hint</summary>

Multiply the choices at all three stages.

<details markdown="1">
<summary>Next step</summary>

$4 \times 3$ gives the starter-and-main combinations.

<details markdown="1">
<summary>Full working</summary>

$$4 \times 3 \times 2 = 24 \text{ meals}$$

Each starter can go with any main and any dessert.

</details>
</details>
</details>

**6.** Back to the chapter problem. The lucky dip bag has $8$ counters. You draw two
counters, one after the other, without replacement. How many ordered pairs are possible?

<details markdown="1">
<summary>Hint</summary>

The first draw removes one counter from the bag.

<details markdown="1">
<summary>Next step</summary>

There are $8$ choices for the first counter, then $7$ for the second.

<details markdown="1">
<summary>Full working</summary>

$$8 \times 7 = 56 \text{ ordered pairs}$$

Without replacement the second draw has one fewer counter to choose from. That is why the
two factors are $8$ and $7$, and not $8$ and $8$.

</details>
</details>
</details>

## A question from Chapter 9

**7.** An arithmetic sequence begins $5, 9, 13, \dots$ Find the common difference and the
twentieth term.

<details markdown="1">
<summary>Hint</summary>

Subtract each term from the one after it.

<details markdown="1">
<summary>Next step</summary>

$d = 9 - 5 = 4$, and $T_n = a + (n-1)d$.

<details markdown="1">
<summary>Full working</summary>

$$d = 4, \qquad T_{20} = 5 + 19(4) = 81$$

The number of steps is $19$, not $20$.

</details>
</details>
</details>
