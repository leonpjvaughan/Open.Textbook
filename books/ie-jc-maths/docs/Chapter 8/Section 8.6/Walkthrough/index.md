---
title: 8.6 Commutative and associative set operations — Learn
chapter: 8
chapter_title: Sets
section: '8.6'
section_title: Commutative and associative set operations
tier: H
refs:
- N.5
kind: walkthrough
---

# 8.6 Commutative and associative set operations — Learn

**Prerequisites:** intersection and union from Section 8.3, the universal set and
complements from Section 8.2, and the order of operations from Section 8.5.

**Objectives:** use the commutative property to swap the two sets in a union or an
intersection; use the associative property to move the brackets in a union or an
intersection; explain why set difference has neither property.

By the end of this section, you can reorder and regroup a set expression without
changing its answer, and say which rule allows it.

## The commutative property

The word **commutative** describes an operation whose answer does not change when
you swap the two things it acts on. Addition and multiplication are commutative.

$$3 + 8 = 11 \qquad 8 + 3 = 11 \qquad 4 \times 5 = 20 \qquad 5 \times 4 = 20$$

Union and intersection are commutative too.

$$A \cup B = B \cup A \qquad A \cap B = B \cap A$$

**Example 1.** Let $A = \{2, 4, 6\}$ and $B = \{1, 2, 3, 4\}$. Find $A \cup B$ and
$B \cup A$.

The union collects every element of both sets, written once.

$$A \cup B = \{1, 2, 3, 4, 6\}$$

$$B \cup A = \{1, 2, 3, 4, 6\}$$

The two answers are the same set.

**Why it works.** An element is in $A \cup B$ when it is in $A$ or in $B$. The
word "or" reads the same both ways round. So the same elements pass the test, and
the two sets are equal. The same reasoning holds for $A \cap B$, where the word is
"and".

**Example 2.** For the same sets, find $A \cap B$ and $B \cap A$.

$$A \cap B = \{2, 4\} \qquad B \cap A = \{2, 4\}$$

Both answers are $\{2, 4\}$. Swapping the two sets changed nothing.

## The associative property

The word **associative** describes an operation whose answer does not change when
you move the brackets. Addition and multiplication are associative.

$$(3 + 8) + 5 = 16 \qquad 3 + (8 + 5) = 16$$

$$(4 \times 5) \times 2 = 40 \qquad 4 \times (5 \times 2) = 40$$

Union and intersection are associative too.

$$(A \cup B) \cup C = A \cup (B \cup C) \qquad (A \cap B) \cap C = A \cap (B \cap C)$$

**Example 3.** Let $A = \{1, 2\}$, $B = \{2, 3\}$ and $C = \{3, 4\}$. Find
$(A \cup B) \cup C$ and $A \cup (B \cup C)$.

Work out the bracket in each expression.

$$A \cup B = \{1, 2, 3\} \qquad (A \cup B) \cup C = \{1, 2, 3, 4\}$$

$$B \cup C = \{2, 3, 4\} \qquad A \cup (B \cup C) = \{1, 2, 3, 4\}$$

Both expressions give $\{1, 2, 3, 4\}$.

**Why it works.** An element is in $(A \cup B) \cup C$ when it is in at least one
of the three sets. The brackets decide which two sets you combine first. They do
not change which three sets the element is tested against. So the two expressions
hold the same elements.

**Example 4.** Let $A = \{1, 2, 3, 4\}$, $B = \{2, 4, 6\}$ and $C = \{4, 5, 6\}$.
Find $(A \cap B) \cap C$ and $A \cap (B \cap C)$.

$$A \cap B = \{2, 4\} \qquad (A \cap B) \cap C = \{4\}$$

$$B \cap C = \{4, 6\} \qquad A \cap (B \cap C) = \{4\}$$

Both expressions give $\{4\}$.

## Writing three sets without brackets

Union and intersection are associative, so the brackets in a chain of one operation
can be dropped. Both $A \cup B \cup C$ and $A \cap B \cap C$ have one meaning,
whichever pair you combine first.

The commutative property also lets you reorder the letters. All of these name the
same set.

$$A \cup B \cup C = C \cup A \cup B = B \cup C \cup A$$

So you can rearrange a set expression into the order that suits you best. The
answer does not change.

**Example 5.** Rewrite $(B \cup A) \cup C$ in the order $A \cup B \cup C$.

Swap $B$ and $A$ inside the bracket with the commutative property.

$$(B \cup A) \cup C = (A \cup B) \cup C$$

Now drop the brackets with the associative property.

$$(A \cup B) \cup C = A \cup B \cup C$$

> **Watch out.** The commutative and associative properties hold for union and
> intersection, but not for difference. Set difference is not commutative:
> $\{1, 2, 3\} \setminus \{3\} = \{1, 2\}$, while $\{3\} \setminus \{1, 2, 3\} =
> \varnothing$. The first answer keeps the elements of the first set alone, and the
> second keeps the elements of the second set alone.
>
> Difference is not associative either. With $A = \{1, 2, 3\}$, $B = \{2\}$ and
> $C = \{3\}$, $(A \setminus B) \setminus C = \{1\}$, but
> $A \setminus (B \setminus C) = \{1, 3\}$. The brackets changed the answer.
>
> **Re-check:** work out a small example with three numbers. If swapping the sets
> or moving the brackets changes the answer, the operation does not have the
> property.

## Progress check

Return to the chapter problem. The club fair uses the sets $C$, $D$ and $S$, and
the eight regions from Section 8.4.

1. Use the commutative property to write $D \cap C$ another way. Find
   $n(D \cap C)$.
2. Use the associative property to write $(C \cup D) \cup S$ with the brackets
   moved. Find $n((C \cup D) \cup S)$.
3. A student writes $(C \setminus D) \cup S$. Explain why $C \setminus D$ is not
   the same set as $D \setminus C$, and find $n(C \setminus D)$.

In the Review you will return to the whole sign-up sheet and answer the chapter
problem.

## You should now be able to

- state the commutative property of union and intersection;
- state the associative property of union and intersection;
- reorder or regroup a set expression without changing its answer;
- explain why set difference is neither commutative nor associative.
