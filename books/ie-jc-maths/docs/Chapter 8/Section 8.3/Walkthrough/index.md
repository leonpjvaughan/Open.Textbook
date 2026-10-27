---
title: 8.3 Intersection, union and set difference — Learn
chapter: 8
chapter_title: Sets
section: '8.3'
section_title: Intersection, union and set difference
tier: O
refs: [N.5]
kind: walkthrough
---

# 8.3 Intersection, union and set difference — Learn

**Prerequisites:** roster form, the symbols $\in$ and $\subseteq$, and the
complement from Section 8.2.

**Objectives:** find the intersection, the union and the difference of two sets;
use the counting rule for a union; read the three operations from a description in
words.

By the end of this section, you can combine two sets in three different ways, and
count the result.

## Intersection

The **intersection** of two sets is the set of elements that are in both of them.
You write it $A \cap B$, and it holds the elements the two sets share.

$$A \cap B = \{x : x \in A \text{ and } x \in B\}$$

Here $x$ stands for any element.

**Example 1.** Find $\{1, 2, 3, 4\} \cap \{3, 4, 5, 6\}$.

Look for the elements that appear in both lists: 3 and 4.

$$\{1, 2, 3, 4\} \cap \{3, 4, 5, 6\} = \{3, 4\}$$

The numbers 1 and 2 are only in the first set, and 5 and 6 are only in the second,
so none of them is in the intersection.

## Union

The **union** of two sets is the set of elements that are in either set, or in
both. You write it $A \cup B$.

$$A \cup B = \{x : x \in A \text{ or } x \in B\}$$

The word "or" includes the case where an element is in both. An element is written
once in the union, even when the two sets share it.

**Example 2.** Find $\{1, 2, 3, 4\} \cup \{3, 4, 5, 6\}$.

Take every element from both lists, and write each one once.

$$\{1, 2, 3, 4\} \cup \{3, 4, 5, 6\} = \{1, 2, 3, 4, 5, 6\}$$

The shared numbers 3 and 4 appear once in the answer, not twice.

## Set difference

The **difference** $A \setminus B$ is the set of elements that are in $A$ but not
in $B$.

$$A \setminus B = \{x : x \in A \text{ and } x \notin B\}$$

**Example 3.** Find $\{1, 2, 3, 4\} \setminus \{3, 4, 5, 6\}$.

Start with the first set and remove anything that is also in the second set.

$$\{1, 2, 3, 4\} \setminus \{3, 4, 5, 6\} = \{1, 2\}$$

The numbers 3 and 4 are removed, because they are in the second set. The numbers 5
and 6 were never in the first set, so they are not part of the answer.

The complement from Section 8.2 is a difference: $A' = U \setminus A$.

## Counting a union

When you add the two cardinalities, a shared element is counted twice. Subtract the
overlap once to put that right.

$$n(A \cup B) = n(A) + n(B) - n(A \cap B)$$

**Example 4.** In a class, 18 students play football and 12 play basketball. Six
students play both. How many play at least one of the two sports?

Add the two totals, then subtract the students counted twice.

$$n(F \cup B) = 18 + 12 - 6 = 24$$

Here $F$ is the set of students who play football and $B$ is the set who play
basketball.

So 24 students play at least one of the two sports.

**Example 5.** In the same class, how many play football but not basketball?

This asks for a difference. Take the football players and remove the six who also
play basketball.

$$n(F \setminus B) = 18 - 6 = 12$$

So 12 students play football but not basketball.

> **Watch out.** You can mix up the intersection and the union. The
> intersection $A \cap B$ is the **smaller** set, because it keeps only the shared
> elements. The union $A \cup B$ is the **larger** set, because it keeps
> everything. Also, $A \setminus B$ is not the same as $B \setminus A$: the first
> keeps the elements of $A$ alone, and the second keeps the elements of $B$ alone.
>
> **Re-check:** the intersection can never be larger than either set. If it is,
> you have found a union.

## Progress check

Return to the chapter problem. The sign-up sheet gives $n(C) = 15$, $n(D) = 13$,
$n(C \cap D) = 6$ and $n(C \cap S) = 5$.

1. Find $n(C \cap D)$, and say in words what this number counts.
2. Find $n(C \cup D)$ using $n(C) + n(D) - n(C \cap D)$.
3. Find $n(C \setminus D)$, the number of students who joined Chess but not Drama.

In Section 8.4 you will draw these sets in a Venn diagram.

## You should now be able to

- find $A \cap B$, the elements the two sets share;
- find $A \cup B$, the elements in either set, written once;
- find $A \setminus B$, the elements in $A$ but not in $B$;
- count a union with $n(A \cup B) = n(A) + n(B) - n(A \cap B)$;
- tell the intersection, the union and the difference apart.
