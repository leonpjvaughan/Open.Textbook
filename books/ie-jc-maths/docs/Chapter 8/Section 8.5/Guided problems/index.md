---
title: "8.5 Order of operations on sets — Practise with help"
chapter: 8
chapter_title: Sets
section: "8.5"
section_title: Order of operations on sets
tier: O
refs: [N.5]
kind: guided-problems
---

# 8.5 Order of operations on sets — Practise with help

## Warm-up: remember

1. Work out $2 + 3 \times 4$.
2. Work out $(2 + 3) \times 4$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $14$. Multiplication goes first: $3\times4=12$, then $2+12=14$.
2. $20$. The bracket goes first: $2+3=5$, then $5\times4=20$.

The same idea runs through this section. Brackets decide what happens first, and
the answer can change when they move.

</details>

:::figure warm-up-gate


## Practise with help

**1.** Let $A = \{1, 2, 3, 4\}$, $B = \{3, 4, 5\}$ and $C = \{2, 4, 6\}$. Find
$(A \cap B) \cup C$.

<details markdown="1">
<summary>Hint</summary>

The bracket comes first. Find $A \cap B$, then take the union with $C$.

<details markdown="1">
<summary>Next step</summary>

$A \cap B = \{3, 4\}$.

<details markdown="1">
<summary>Full working</summary>

$$(A \cap B) \cup C = \{3, 4\} \cup \{2, 4, 6\} = \{2, 3, 4, 6\}$$

The union collects every element from both sets, and the shared 4 is written once.

</details>
</details>
</details>

**2.** For the same sets, find $A \cap (B \cup C)$.

<details markdown="1">
<summary>Hint</summary>

This time the bracket is $B \cup C$. Find it first, then intersect with $A$.

<details markdown="1">
<summary>Next step</summary>

$B \cup C = \{2, 3, 4, 5, 6\}$.

<details markdown="1">
<summary>Full working</summary>

$$A \cap (B \cup C) = \{1, 2, 3, 4\} \cap \{2, 3, 4, 5, 6\} = \{2, 3, 4\}$$

Only the elements that are in $A$ and also in the union survive.

</details>
</details>
</details>

**3.** Compare your answers to questions 1 and 2. What do you notice?

<details markdown="1">
<summary>Hint</summary>

Write the two sets side by side.

<details markdown="1">
<summary>Next step</summary>

Question 1 gave $\{2, 3, 4, 6\}$ and question 2 gave $\{2, 3, 4\}$.

<details markdown="1">
<summary>Full working</summary>

The two sets are different. The first contains 6 and the second does not.

So $(A \cap B) \cup C$ and $A \cap (B \cup C)$ are not the same set in general.
The brackets change which operation happens first, and the answer changes with them.

</details>
</details>
</details>

**4.** Let $U = \{1, 2, 3, 4, 5, 6\}$ and $A = \{1, 2, 3\}$. Find $A'$.

<details markdown="1">
<summary>Hint</summary>

The complement holds the elements of $U$ that are not in $A$.

<details markdown="1">
<summary>Next step</summary>

Remove 1, 2 and 3 from $U$.

<details markdown="1">
<summary>Full working</summary>

$$A' = \{4, 5, 6\}$$

The complement is worked out before any other operation in an expression, unless a
bracket says otherwise.

</details>
</details>
</details>

**5.** Let $A = \{1, 2, 3, 4\}$, $B = \{3, 4, 5\}$ and $C = \{4, 6\}$. Find
$A \cup (B \cap C)$.

<details markdown="1">
<summary>Hint</summary>

Find the bracket $B \cap C$ first, then take the union with $A$.

<details markdown="1">
<summary>Next step</summary>

$B \cap C = \{4\}$.

<details markdown="1">
<summary>Full working</summary>

$$A \cup (B \cap C) = \{1, 2, 3, 4\} \cup \{4\} = \{1, 2, 3, 4\}$$

The union with a set that is already inside $A$ adds nothing new.

</details>
</details>
</details>

**6.** For the same sets, find $(A \cup B) \cap C$.

<details markdown="1">
<summary>Hint</summary>

Find $A \cup B$ first, then intersect with $C$.

<details markdown="1">
<summary>Next step</summary>

$A \cup B = \{1, 2, 3, 4, 5\}$.

<details markdown="1">
<summary>Full working</summary>

$$(A \cup B) \cap C = \{1, 2, 3, 4, 5\} \cap \{4, 6\} = \{4\}$$

Compare this with question 5. The bracket moved, and the answer changed from
$\{1, 2, 3, 4\}$ to $\{4\}$.

</details>
</details>
</details>

**7.** Let $U = \{1, 2, 3, 4, 5, 6, 7, 8\}$, $A = \{2, 4, 6\}$ and
$B = \{1, 2, 3, 4\}$. Find $(A \cup B)'$.

<details markdown="1">
<summary>Hint</summary>

Find the union first, then take its complement.

<details markdown="1">
<summary>Next step</summary>

$A \cup B = \{1, 2, 3, 4, 6\}$.

<details markdown="1">
<summary>Full working</summary>

$$(A \cup B)' = \{5, 7, 8\}$$

These are the elements of $U$ that are in neither $A$ nor $B$. The bracket makes
the union happen first, and the complement applies to the whole union.

</details>
</details>
</details>

**8.** For the same sets, find $A' \cap B'$.

<details markdown="1">
<summary>Hint</summary>

Find each complement, then intersect them. Both complements are worked out before
the intersection.

<details markdown="1">
<summary>Next step</summary>

$A' = \{1, 3, 5, 7, 8\}$ and $B' = \{5, 6, 7, 8\}$.

<details markdown="1">
<summary>Full working</summary>

$$A' \cap B' = \{5, 7, 8\}$$

Both this answer and the answer to question 7 are $\{5, 7, 8\}$, so in this
example the two ways agree. The elements outside both sets are the same as the
elements outside the union.

</details>
</details>
</details>

## A question from an earlier section

**9.** Solve $3x + 5 = 20$.

<details markdown="1">
<summary>Hint</summary>

Undo the $+5$ first, then undo the $\times3$. Section 12.1 has the method.

<details markdown="1">
<summary>Next step</summary>

$3x = 20 - 5 = 15$.

<details markdown="1">
<summary>Full working</summary>

$$3x = 15 \qquad x = 5$$

Check: $3\times5+5=15+5=20$. The order of undoing an equation is like the order in
a set expression: the operation applied last is undone first.

</details>
</details>
</details>
