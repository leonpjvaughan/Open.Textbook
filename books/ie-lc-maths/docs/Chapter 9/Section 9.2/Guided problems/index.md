---
title: "9.2 Arithmetic series — Practise with help"
chapter: 9
chapter_title: Sequences and series
section: "9.2"
section_title: Arithmetic series
tier: O
refs:
- '4.1'
kind: guided-problems
---

# 9.2 Arithmetic series — Practise with help

## Warm-up: remember

1. Find the tenth term of $3, 7, 11, \dots$
2. Which is the last term of $2 + 5 + 8 + \dots + 29$?

<details markdown="1">
<summary>Answers and feedback</summary>

1. $3 + 9(4) = 39$.
2. $29$. It is the last term written down.

</details>

:::figure warm-up-gate


## Practise with help

**1.** Find $2 + 5 + 8 + \dots + 29$.

<details markdown="1">
<summary>Hint</summary>

Find $n$ first: $2 + (n-1)3 = 29$.

<details markdown="1">
<summary>Next step</summary>

$(n-1)3 = 27$, so $n = 10$.

<details markdown="1">
<summary>Full working</summary>

$$S_{10} = \frac{10}{2}(2 + 29) = 5 \times 31 = 155$$

Finding $n$ is always the first step when the last term is given but the number of terms
is not.

</details>
</details>
</details>

**2.** Find the sum of the first $15$ terms of $10, 14, 18, \dots$

<details markdown="1">
<summary>Hint</summary>

The last term is not given, so use the $2a + (n-1)d$ form.

<details markdown="1">
<summary>Next step</summary>

$S_{15} = \dfrac{15}{2}\left(20 + 14(4)\right)$.

<details markdown="1">
<summary>Full working</summary>

$$S_{15} = \frac{15}{2}(20 + 56) = \frac{15 \times 76}{2} = 15 \times 38 = 570$$

</details>
</details>
</details>

**3.** How many terms of $6, 10, 14, \dots$ are needed for the sum to be $510$?

<details markdown="1">
<summary>Hint</summary>

Form a quadratic in $n$.

<details markdown="1">
<summary>Next step</summary>

$\dfrac{n}{2}\left(12 + 4(n-1)\right) = 510$, so $n(4n + 8) = 1020$.

<details markdown="1">
<summary>Full working</summary>

$4n^2 + 8n - 1020 = 0$, so $n^2 + 2n - 255 = 0$, giving $(n + 17)(n - 15) = 0$.

$n = 15$ (the root $-17$ is rejected).

Check: $S_{15} = \dfrac{15}{2}(12 + 56) = \dfrac{15 \times 68}{2} = 15 \times 34 = 510$.
Correct.

</details>
</details>
</details>

**4.** A student adds the first $n$ terms of $1, 3, 5, \dots$ and gets $S_n = n^2$. Find
the sum of the first $20$ odd numbers.

<details markdown="1">
<summary>Hint</summary>

$S_{20} = 20^2$.

<details markdown="1">
<summary>Next step</summary>

Check against the formula: $\dfrac{20}{2}(1 + 39)$.

<details markdown="1">
<summary>Full working</summary>

$$S_{20} = 20^2 = 400$$

Check with the sum formula: $\dfrac{20}{2}(1 + 39) = 10 \times 40 = 400$. Both agree.

The fact that the sum of the first $n$ odd numbers is $n^2$ is worth recognising — Section
9.6 proves it by induction.

</details>
</details>
</details>

**5.** Find $5 + 9 + 13 + \dots + 101$.

<details markdown="1">
<summary>Hint</summary>

First find $n$: $5 + (n-1)4 = 101$.

<details markdown="1">
<summary>Next step</summary>

$(n-1)4 = 96$, so $n = 25$.

<details markdown="1">
<summary>Full working</summary>

$$S_{25} = \frac{25}{2}(5 + 101) = \frac{25 \times 106}{2} = 25 \times 53 = 1325$$

</details>
</details>
</details>

**6.** Explain why the same number of terms in an arithmetic series gives the same sum
whichever end you start from.

<details markdown="1">
<summary>Hint</summary>

Pair the first with the last, the second with the second last.

<details markdown="1">
<summary>Next step</summary>

What does each pair add to?

<details markdown="1">
<summary>Full working</summary>

Pair the terms from the two ends. The first pair adds to $a + l$. The next pair is
$(a + d) + (l - d)$, which is the same. Every pair adds to $a + l$, because whatever is
added at the front is taken away at the back.

So the total is "$n$ times the average of the first and last", and the order the terms are
written in does not change the sum. That is what the formula $S_n = \dfrac{n}{2}(a + l)$
records.

</details>
</details>
</details>

## A question from Section 9.1

**7.** An arithmetic sequence has $a = 4$ and $d = 3$. Find $T_{12}$ and $S_{12}$.

<details markdown="1">
<summary>Hint</summary>

$T_{12}$ first, then either sum formula.

<details markdown="1">
<summary>Next step</summary>

$T_{12} = 4 + 11(3) = 37$.

<details markdown="1">
<summary>Full working</summary>

$$T_{12} = 4 + 11(3) = 37$$

$$S_{12} = \frac{12}{2}(4 + 37) = 6 \times 41 = 246$$

Check with the other form: $\dfrac{12}{2}(8 + 11(3)) = 6 \times 41 = 246$. Both agree.

</details>
</details>
</details>
