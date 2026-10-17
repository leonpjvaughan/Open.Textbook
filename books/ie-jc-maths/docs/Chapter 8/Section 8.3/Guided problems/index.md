---
title: "8.3 Intersection, union and set difference — Practise with help"
chapter: 8
chapter_title: Sets
section: "8.3"
section_title: Intersection, union and set difference
tier: O
refs: [N.5]
kind: guided-problems
---

# 8.3 Intersection, union and set difference — Practise with help

## Warm-up: remember

1. Work out $7 \times 8$.
2. Write down all the factors of 16.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $56$.
2. $1, 2, 4, 8$ and $16$. Work in pairs: $1\times16$, $2\times8$, $4\times4$.

Comparing two factor lists is the same skill as finding the intersection of two
sets. You look for the numbers that appear in both.

</details>

:::figure warm-up-gate


## Practise with help

**1.** Let $A = \{1, 2, 3, 4, 5\}$ and $B = \{4, 5, 6, 7\}$. Find $A \cap B$.

<details markdown="1">
<summary>Hint</summary>

The intersection holds the elements that are in both sets.

<details markdown="1">
<summary>Next step</summary>

Which numbers appear in both lists? Look for 4 and 5.

<details markdown="1">
<summary>Full working</summary>

$$A \cap B = \{4, 5\}$$

The numbers 1, 2 and 3 are only in $A$, and 6 and 7 are only in $B$. Only 4 and 5
are shared, so they are the intersection.

</details>
</details>
</details>

**2.** For the same sets, find $A \cup B$.

<details markdown="1">
<summary>Hint</summary>

The union holds every element from both sets. Write each shared element once.

<details markdown="1">
<summary>Next step</summary>

Combine the lists $1, 2, 3, 4, 5$ and $4, 5, 6, 7$.

<details markdown="1">
<summary>Full working</summary>

$$A \cup B = \{1, 2, 3, 4, 5, 6, 7\}$$

The numbers 4 and 5 are in both sets, but each is written once in the union.

</details>
</details>
</details>

**3.** For the same sets, find $A \setminus B$.

<details markdown="1">
<summary>Hint</summary>

Start with $A$ and remove any element that is also in $B$.

<details markdown="1">
<summary>Next step</summary>

Remove 4 and 5 from $A = \{1, 2, 3, 4, 5\}$.

<details markdown="1">
<summary>Full working</summary>

$$A \setminus B = \{1, 2, 3\}$$

These are the elements of $A$ that are not in $B$. The numbers 6 and 7 are in $B$
only, so they never enter this calculation.

</details>
</details>
</details>

**4.** For the same sets, find $B \setminus A$.

<details markdown="1">
<summary>Hint</summary>

This time start with $B$ and remove the elements that are in $A$.

<details markdown="1">
<summary>Next step</summary>

Remove 4 and 5 from $B = \{4, 5, 6, 7\}$.

<details markdown="1">
<summary>Full working</summary>

$$B \setminus A = \{6, 7\}$$

Compare this with question 3. The two differences are different sets, because the
order of the two sets matters in a difference.

</details>
</details>
</details>

**5.** In a group of 25 students, 14 like tea, 11 like coffee, and 5 like both.
How many like at least one of the two drinks?

<details markdown="1">
<summary>Hint</summary>

The students who like both are counted twice when you add 14 and 11. Subtract them
once.

<details markdown="1">
<summary>Next step</summary>

$$14 + 11 - 5$$

<details markdown="1">
<summary>Full working</summary>

$$n(T \cup K) = 14 + 11 - 5 = 20$$

So 20 students like at least one of the drinks. The remaining $25 - 20 = 5$
students like neither.

</details>
</details>
</details>

**6.** For the same group, how many like tea but not coffee?

<details markdown="1">
<summary>Hint</summary>

This asks for a difference. Take the tea drinkers and remove the five who like
both.

<details markdown="1">
<summary>Next step</summary>

$$14 - 5$$

<details markdown="1">
<summary>Full working</summary>

$$n(T \setminus K) = 14 - 5 = 9$$

So 9 students like tea but not coffee. The five who like both are removed, because
they are in the coffee set as well.

</details>
</details>
</details>

**7.** Let $U = \{1, 2, 3, 4, 5, 6\}$, $A = \{2, 4\}$ and $B = \{4, 6\}$. Find
$n(A \cup B)$.

<details markdown="1">
<summary>Hint</summary>

The two sets share the number 4, so use the counting rule.

<details markdown="1">
<summary>Next step</summary>

$n(A) = 2$, $n(B) = 2$ and $n(A \cap B) = 1$.

<details markdown="1">
<summary>Full working</summary>

$$n(A \cup B) = 2 + 2 - 1 = 3$$

The union is $\{2, 4, 6\}$, which has three elements, so the rule agrees with the
list.

</details>
</details>
</details>

**8.** Let $A = \{a, b, c, d\}$ and $B = \{c, d, e\}$. Find $A \cap B$ and
$A \cup B$.

<details markdown="1">
<summary>Hint</summary>

Do the intersection first, then the union. The shared elements are $c$ and $d$.

<details markdown="1">
<summary>Next step</summary>

$A \cap B = \{c, d\}$.

<details markdown="1">
<summary>Full working</summary>

$$A \cap B = \{c, d\} \qquad A \cup B = \{a, b, c, d, e\}$$

The union collects all five letters. Notice that $n(A \cup B) = 4 + 3 - 2 = 5$,
which matches the five letters in the list.

</details>
</details>
</details>

## A question from an earlier section

**9.** Find the lowest common multiple of 6 and 8.

<details markdown="1">
<summary>Hint</summary>

List the multiples of each number and look for the first one in both lists.
Section 3.3 has the method.

<details markdown="1">
<summary>Next step</summary>

Multiples of 6: $6, 12, 18, 24, 30, \ldots$ Multiples of 8: $8, 16, 24, 32,
\ldots$

<details markdown="1">
<summary>Full working</summary>

The lowest common multiple is 24.

The common multiples form the set $\{24, 48, 72, \ldots\}$, and its smallest
element is 24. The lowest common multiple is the smallest number in the
intersection of the two sets of multiples.

</details>
</details>
</details>
