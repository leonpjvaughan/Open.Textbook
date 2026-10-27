---
title: "8.6 Commutative and associative set operations — Practise with help"
chapter: 8
chapter_title: Sets
section: "8.6"
section_title: Commutative and associative set operations
tier: H
refs: [N.5]
kind: guided-problems
---

# 8.6 Commutative and associative set operations — Practise with help

## Warm-up: remember

1. Work out $3 + 8$ and $8 + 3$.
2. Work out $4 \times 5$ and $5 \times 4$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $3 + 8 = 11$ and $8 + 3 = 11$. Swapping the two numbers does not change the
   total.
2. $4 \times 5 = 20$ and $5 \times 4 = 20$. Swapping the two numbers does not
   change the product.

Both pairs give the same answer. In this section the same idea appears for sets,
where swapping the two sets does not change the union or the intersection.

</details>

:::figure warm-up-gate


## Practise with help

**1.** Let $A = \{2, 4, 6, 8\}$ and $B = \{1, 2, 3, 4\}$. Find $A \cup B$ and
$B \cup A$. What do you notice?

<details markdown="1">
<summary>Hint</summary>

The union holds every element of both sets, written once. Work out each union on
its own, then compare the two answers.

<details markdown="1">
<summary>Next step</summary>

$A \cup B = \{1, 2, 3, 4, 6, 8\}$.

<details markdown="1">
<summary>Full working</summary>

$$A \cup B = \{1, 2, 3, 4, 6, 8\} \qquad B \cup A = \{1, 2, 3, 4, 6, 8\}$$

The two unions are the same set. Union is commutative, so the order of the two
sets does not matter.

</details>
</details>
</details>

**2.** For the same sets, find $A \cap B$ and $B \cap A$.

<details markdown="1">
<summary>Hint</summary>

The intersection holds the elements that appear in both lists. Look for the shared
numbers.

<details markdown="1">
<summary>Next step</summary>

The shared elements are 2 and 4.

<details markdown="1">
<summary>Full working</summary>

$$A \cap B = \{2, 4\} \qquad B \cap A = \{2, 4\}$$

The two intersections are the same set. Intersection is commutative, just like
union.

</details>
</details>
</details>

**3.** Let $A = \{1, 2\}$, $B = \{2, 3\}$ and $C = \{3, 4\}$. Find
$(A \cup B) \cup C$ and $A \cup (B \cup C)$.

<details markdown="1">
<summary>Hint</summary>

Work out the bracket in each expression first. The two expressions put the bracket
in different places.

<details markdown="1">
<summary>Next step</summary>

$A \cup B = \{1, 2, 3\}$ and $B \cup C = \{2, 3, 4\}$.

<details markdown="1">
<summary>Full working</summary>

$$(A \cup B) \cup C = \{1, 2, 3, 4\}$$

$$A \cup (B \cup C) = \{1, 2, 3, 4\}$$

The bracket moved and the answer stayed the same. Union is associative.

</details>
</details>
</details>

**4.** Let $A = \{1, 2, 3, 4\}$, $B = \{2, 4, 6\}$ and $C = \{4, 5, 6\}$. Find
$(A \cap B) \cap C$ and $A \cap (B \cap C)$.

<details markdown="1">
<summary>Hint</summary>

Work out the bracket first. Look for the elements that are in all three sets.

<details markdown="1">
<summary>Next step</summary>

$A \cap B = \{2, 4\}$ and $B \cap C = \{4, 6\}$.

<details markdown="1">
<summary>Full working</summary>

$$(A \cap B) \cap C = \{4\}$$

$$A \cap (B \cap C) = \{4\}$$

Both expressions give $\{4\}$. Intersection is associative.

</details>
</details>
</details>

**5.** Explain why $(B \cup A) \cup C$ is the same set as $A \cup (B \cup C)$. Name
the property you use at each step.

<details markdown="1">
<summary>Hint</summary>

First swap the two sets inside the bracket. Then move the bracket.

<details markdown="1">
<summary>Next step</summary>

The commutative property gives $(B \cup A) \cup C = (A \cup B) \cup C$.

<details markdown="1">
<summary>Full working</summary>

The associative property gives

$$(A \cup B) \cup C = A \cup (B \cup C)$$

So $(B \cup A) \cup C = A \cup (B \cup C)$. Both properties together let you
reorder the letters and move the bracket without changing the set.

</details>
</details>
</details>

**6.** Let $A = \{1, 2, 3, 4\}$ and $B = \{3, 4, 5, 6\}$. Find $A \setminus B$ and
$B \setminus A$. What do you notice?

<details markdown="1">
<summary>Hint</summary>

The first answer keeps the elements of $A$ alone. The second keeps the elements of
$B$ alone.

<details markdown="1">
<summary>Next step</summary>

$A \setminus B = \{1, 2\}$.

<details markdown="1">
<summary>Full working</summary>

$$A \setminus B = \{1, 2\} \qquad B \setminus A = \{5, 6\}$$

The two answers are different sets. Difference is not commutative, because the
order of the two sets matters.

</details>
</details>
</details>

**7.** Let $A = \{1, 2, 3\}$, $B = \{2\}$ and $C = \{3\}$. Find
$(A \setminus B) \setminus C$ and $A \setminus (B \setminus C)$.

<details markdown="1">
<summary>Hint</summary>

Work out the inner bracket first in each expression.

<details markdown="1">
<summary>Next step</summary>

$A \setminus B = \{1, 3\}$ and $B \setminus C = \{2\}$.

<details markdown="1">
<summary>Full working</summary>

$$(A \setminus B) \setminus C = \{1\}$$

$$A \setminus (B \setminus C) = \{1, 3\}$$

The bracket changed the answer, so difference is not associative.

</details>
</details>
</details>

**8.** In a class, 18 students study French and 14 study German. Six study
both. Find $n(F \cup G)$ and $n(G \cup F)$.

<details markdown="1">
<summary>Hint</summary>

Use $n(A \cup B) = n(A) + n(B) - n(A \cap B)$. The overlap is 6.

<details markdown="1">
<summary>Next step</summary>

$n(F \cup G) = 18 + 14 - 6$.

<details markdown="1">
<summary>Full working</summary>

$$n(F \cup G) = 18 + 14 - 6 = 26 \qquad n(G \cup F) = 14 + 18 - 6 = 26$$

Here $F$ is the set of students who study French and $G$ is the set who study
German.

Both orders give 26, because union is commutative.

</details>
</details>
</details>

## A question from an earlier section

**9.** Work out $5 + 3 \times 4$ and $(5 + 3) \times 4$.

<details markdown="1">
<summary>Hint</summary>

In the first expression, multiplication goes first. In the second, the bracket goes
first. Section 8.5 has the rule.

<details markdown="1">
<summary>Next step</summary>

$3 \times 4 = 12$.

<details markdown="1">
<summary>Full working</summary>

$$5 + 3 \times 4 = 5 + 12 = 17$$

$$(5 + 3) \times 4 = 8 \times 4 = 32$$

The brackets changed the answer. That is why the order of operations matters when
one operation is stronger than another.

</details>
</details>
</details>
