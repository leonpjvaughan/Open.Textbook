---
title: 8.2 Subsets, the universal set and the null set — Learn
chapter: 8
chapter_title: Sets
section: '8.2'
section_title: Subsets, the universal set and the null set
tier: O
refs: [N.5]
kind: walkthrough
---

# 8.2 Subsets, the universal set and the null set — Learn

**Prerequisites:** writing a set in roster form, and the symbols $\in$ and
$\notin$ from Section 8.1.

**Objectives:** say whether one set is a subset of another; use the universal set
and the complement of a set; use the null set; count the subsets of a small set.

By the end of this section, you can compare a set with the whole group it comes
from, and say what sits inside what.

## The universal set

The **universal set** is the set of everything under discussion. You write it $U$.
Every other set in a question is a part of $U$.

**Example 1.** A survey asks the students in a class of 30 which sport they play.
The universal set is the 30 students, because they are the whole group being
discussed.

$$n(U) = 30$$

If a set is described by a rule, the universal set says what kinds of thing the
rule is allowed to pick.

## Subsets

A set $A$ is a **subset** of a set $B$ when every element of $A$ is also an element
of $B$. You write $A \subseteq B$.

$$\{2, 4\} \subseteq \{2, 4, 6, 8\}$$

The set $\{2, 4\}$ is a subset of $\{2, 4, 6, 8\}$, because both 2 and 4 are in the
larger set. Every element of the smaller set is inside the larger one.

If at least one element of $A$ is missing from $B$, then $A$ is **not** a subset of
$B$, and you write $A \nsubseteq B$.

$$\{2, 5\} \nsubseteq \{2, 4, 6, 8\}$$

The element 5 is not in the larger set, so the subset test fails.

A **proper subset** is a subset that is not the whole set. You write $A \subset B$.
Every proper subset is smaller than the set it sits in.

**Example 2.** Is $\{1, 3\}$ a subset of $\{1, 2, 3, 4\}$?

Both 1 and 3 are in the larger set, so yes.

$$\{1, 3\} \subseteq \{1, 2, 3, 4\}$$

**Example 3.** Is $\{2, 6\}$ a subset of $\{2, 4, 6, 8\}$?

Both 2 and 6 are in the larger set, so yes. This one is also a proper subset,
because the larger set has elements that $\{2, 6\}$ does not have.

## The null set

The **null set** is the set with no elements. You write it $\varnothing$, and you
may also write it as $\{\ \}$.

$$\varnothing = \{\ \}$$

A set is empty when its description picks out nothing. For example, the set of
whole numbers that are both less than 1 and greater than 10 has no elements, so it
is the null set.

The null set is a subset of every set. The test asks whether every element of the
null set is in the other set. The null set has no elements, so there is no element
that can fail the test. The test passes without any work to do.

**Example 4.** A class has no students who play both chess and water polo. How many
students are in that overlap?

None, so the overlap is the null set.

$$n(\varnothing) = 0$$

## The complement of a set

The **complement** of a set $A$ is everything in the universal set $U$ that is not
in $A$. You write it $A'$.

$$A' = \{x \in U : x \notin A\}$$

Here $x$ stands for any element of $U$.

**Example 5.** Let $U = \{1, 2, 3, 4, 5, 6\}$ and $A = \{2, 4, 6\}$. Find $A'$.

Take the elements of $U$ and remove the ones in $A$. What is left is the
complement.

$$A' = \{1, 3, 5\}$$

The two sets $A$ and $A'$ together make up the whole of $U$, and they share no
elements.

**Example 6.** Let $U = \{1, 2, 3, 4, 5, 6\}$ and $B = \{1, 2, 3\}$. Find $n(B')$.

The complement is $\{4, 5, 6\}$, so $n(B') = 3$. You can also count it without
listing: $n(B') = n(U) - n(B) = 6 - 3 = 3$.

## Counting the subsets of a set

A set with $n$ elements has $2^n$ subsets. This includes the null set and the set
itself.

**Example 7.** How many subsets does $\{a, b, c\}$ have?

Here $n = 3$, so the number of subsets is $2^3 = 8$. They are $\varnothing$,
$\{a\}$, $\{b\}$, $\{c\}$, $\{a, b\}$, $\{a, c\}$, $\{b, c\}$ and $\{a, b, c\}$.

You can see why the rule works. For each element there are two choices: include it
in the subset or leave it out. With three elements that gives
$2 \times 2 \times 2 = 2^3$ different subsets.

> **Watch out.** The symbol $\in$ compares an element with a set, and
> $\subseteq$ compares a set with a set. The number 2 is an element of
> $\{1, 2, 3\}$, so $2 \in \{1, 2, 3\}$. The set $\{2\}$ is a subset of
> $\{1, 2, 3\}$, so $\{2\} \subseteq \{1, 2, 3\}$. Writing
> $\{2\} \in \{1, 2, 3\}$ mixes the two and is wrong.
>
> **Re-check:** look at what is on each side. If the left side has curly brackets,
> use $\subseteq$. If it is a single object, use $\in$.

## Progress check

Return to the chapter problem. The universal set $U$ is the 32 students in the
year group, and $C$ is the set of students who joined Chess, with $n(C) = 15$.

1. Write one sentence to explain why $C \subseteq U$.
2. Find $n(C')$, the number of students who did not join Chess.
3. A student who joined all three clubs is called a member of $C \cap D \cap S$.
   Explain why that set is a subset of $C$.

In Section 8.3 you will combine the sets with intersection and union.

## You should now be able to

- name the universal set for a question;
- test whether one set is a subset of another, and use $A \subseteq B$;
- use the null set $\varnothing$ and say why it is a subset of every set;
- find the complement $A'$ of a set and count it with $n(A') = n(U) - n(A)$;
- count the subsets of a set with $n$ elements as $2^n$;
- tell $\in$ from $\subseteq$.
