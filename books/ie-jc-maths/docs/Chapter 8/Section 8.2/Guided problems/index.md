---
title: "8.2 Subsets, the universal set and the null set — Practise with help"
chapter: 8
chapter_title: Sets
section: "8.2"
section_title: Subsets, the universal set and the null set
tier: O
refs: [N.5]
kind: guided-problems
---

# 8.2 Subsets, the universal set and the null set — Practise with help

## Warm-up: remember

1. Write down all the factors of 20.
2. Work out $2^3$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $1, 2, 4, 5, 10$ and $20$. Work in pairs: $1\times20$, $2\times10$, $4\times5$.
2. $2^3 = 8$, because $2\times2\times2 = 8$. The index counts the factors.

The powers appear again in this section, where $2^n$ counts the subsets of a set.

</details>

:::figure warm-up-gate


## Practise with help

**1.** Let $U = \{1, 2, 3, 4, 5, 6, 7, 8\}$ and $A = \{2, 4, 6, 8\}$. Find $A'$.

<details markdown="1">
<summary>Hint</summary>

The complement holds the elements of $U$ that are not in $A$. Start with all of
$U$ and cross out the elements of $A$.

<details markdown="1">
<summary>Next step</summary>

The elements of $U$ that are left are $1, 3, 5$ and $7$.

<details markdown="1">
<summary>Full working</summary>

$$A' = \{1, 3, 5, 7\}$$

Check that $A$ and $A'$ share no elements, and that together they make all of $U$.
Here $4 + 4 = 8$, which is $n(U)$.

</details>
</details>
</details>

**2.** Is $\{1, 2\}$ a subset of $\{1, 2, 3\}$? Give a reason.

<details markdown="1">
<summary>Hint</summary>

Check each element of the smaller set. Is it in the larger set?

<details markdown="1">
<summary>Next step</summary>

The elements 1 and 2 are both in $\{1, 2, 3\}$.

<details markdown="1">
<summary>Full working</summary>

Yes, $\{1, 2\} \subseteq \{1, 2, 3\}$.

Every element of $\{1, 2\}$ is an element of $\{1, 2, 3\}$. The test passes for
both elements, so the smaller set is a subset.

</details>
</details>
</details>

**3.** Is $\{1, 4\}$ a subset of $\{1, 2, 3\}$? Give a reason.

<details markdown="1">
<summary>Hint</summary>

Check each element of the smaller set in turn.

<details markdown="1">
<summary>Next step</summary>

The element 1 is in $\{1, 2, 3\}$, but 4 is not.

<details markdown="1">
<summary>Full working</summary>

No, $\{1, 4\} \nsubseteq \{1, 2, 3\}$.

One element of the smaller set, the number 4, is missing from the larger set. One
missing element is enough to fail the subset test.

</details>
</details>
</details>

**4.** How many subsets does $\{p, q\}$ have? List them.

<details markdown="1">
<summary>Hint</summary>

Use the rule $2^n$. Here the set has 2 elements. Then list them, starting with the
null set.

<details markdown="1">
<summary>Next step</summary>

$2^2 = 4$, and the four subsets are $\varnothing$, $\{p\}$, $\{q\}$ and
$\{p, q\}$.

<details markdown="1">
<summary>Full working</summary>

There are 4 subsets: $\varnothing$, $\{p\}$, $\{q\}$ and $\{p, q\}$.

The null set and the whole set are both counted. For each of $p$ and $q$ you
choose to include it or leave it out, which gives $2 \times 2 = 4$ choices.

</details>
</details>
</details>

**5.** Let $U = \{a, b, c, d, e\}$ and $B = \{a, c, e\}$. Find $n(B')$.

<details markdown="1">
<summary>Hint</summary>

You can list the complement, or use $n(B') = n(U) - n(B)$.

<details markdown="1">
<summary>Next step</summary>

$n(U) = 5$ and $n(B) = 3$.

<details markdown="1">
<summary>Full working</summary>

$$n(B') = 5 - 3 = 2$$

The complement is $\{b, d\}$, which has two elements, so the count agrees.

</details>
</details>
</details>

**6.** What is $n(\varnothing)$?

<details markdown="1">
<summary>Hint</summary>

The null set is the set with no elements.

<details markdown="1">
<summary>Next step</summary>

Count the elements of $\{\ \}$.

<details markdown="1">
<summary>Full working</summary>

$$n(\varnothing) = 0$$

The null set has no elements, so its cardinality is 0. It is still a set, and it is
a subset of every set.

</details>
</details>
</details>

**7.** Let $A = \{2, 4, 6\}$. Is $A$ a proper subset of $A$? Explain.

<details markdown="1">
<summary>Hint</summary>

A proper subset must be smaller than the set it sits in.

<details markdown="1">
<summary>Next step</summary>

Every set is a subset of itself, but a proper subset is not the whole set.

<details markdown="1">
<summary>Full working</summary>

No. The set $A$ is a subset of itself, because every element of $A$ is in $A$. It is
not a *proper* subset, because it is not smaller than itself. A proper subset must
leave at least one element out.

</details>
</details>
</details>

**8.** Let $U = \{1, 2, 3, 4, 5, 6, 7, 8, 9, 10\}$ and let $E$ be the set of even
numbers in $U$. Find $E'$.

<details markdown="1">
<summary>Hint</summary>

Write $E$ first, then take the elements of $U$ that are not in it.

<details markdown="1">
<summary>Next step</summary>

$E = \{2, 4, 6, 8, 10\}$.

<details markdown="1">
<summary>Full working</summary>

$$E' = \{1, 3, 5, 7, 9\}$$

The complement of the even numbers is the odd numbers. This works because every
whole number in $U$ is either even or odd, and none is both.

</details>
</details>
</details>

## A question from an earlier section

**9.** Write 36 as a product of its prime factors.

<details markdown="1">
<summary>Hint</summary>

Divide by the smallest prime that works, and keep going. Section 3.2 has the
method.

<details markdown="1">
<summary>Next step</summary>

$36 = 2 \times 18 = 2 \times 2 \times 9 = 2 \times 2 \times 3 \times 3$.

<details markdown="1">
<summary>Full working</summary>

$$36 = 2^2 \times 3^2$$

The prime factors are 2, 2, 3 and 3. Written as a set they are $\{2, 3\}$, which
shows the distinct primes but not how often each one is used.

</details>
</details>
</details>
