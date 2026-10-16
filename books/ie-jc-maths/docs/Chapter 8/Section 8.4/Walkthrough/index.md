---
title: 8.4 Venn diagrams with two and three sets — Learn
chapter: 8
chapter_title: Sets
section: '8.4'
section_title: Venn diagrams with two and three sets
tier: O
refs: [N.5]
kind: walkthrough
---

# 8.4 Venn diagrams with two and three sets — Learn

**Prerequisites:** intersection, union and difference from Section 8.3, and the
complement from Section 8.2.

**Objectives:** name the regions of a two-set and a three-set Venn diagram; fill a
diagram from a description; read a number off a diagram and answer a question about
the sets.

By the end of this section, you can turn a set problem into a picture, and turn the
picture back into answers.

## The two-set diagram

A **Venn diagram** draws a rectangle for the universal set $U$, and a circle for
each set inside it. A two-set diagram has two circles, and the rectangle is
divided into four regions.

| Region | What it holds |
|---|---|
| the left part of $A$ | in $A$ but not in $B$ |
| the overlap | in both $A$ and $B$ |
| the right part of $B$ | in $B$ but not in $A$ |
| outside both circles | in neither set |

The overlap is the intersection $A \cap B$. Everything inside the two circles
together is the union $A \cup B$. Everything outside both circles is the complement
$(A \cup B)'$.

:::figure venn-regions

**Predict, then test.** Before you touch the controls, write down which parts of the
diagram $A \cap B$ picks out. Then choose $A \cap B$ and check. Now choose
$(A \cup B)'$ and see which part lights up. Finally switch to three sets and try
$A \cap B \cap C$.

**Explain.** Write two sentences. Say how many parts of a two-set diagram $A$ picks
out, and how many $(A \cup B)'$ picks out. Then say why $A \cap B$ is one part while
$A \cup B$ is three.

**Example 1.** In a class of 30 students, 18 play football, 12 play basketball and
6 play both. Fill in the two-set diagram.

Start with the overlap, because it is the one region you know directly. The 6 who
play both go in the middle.

Now take the pair of numbers away from the middle.

$$18 - 6 = 12 \text{ play football only}$$

$$12 - 6 = 6 \text{ play basketball only}$$

The students outside both circles are the rest of the class.

$$30 - (12 + 6 + 6) = 30 - 24 = 6$$

The four regions hold 12, 6, 6 and 6, and $12 + 6 + 6 + 6 = 30$.

## The three-set diagram

A three-set diagram has three circles, and the rectangle is divided into eight
regions. There is now a middle region where all three circles overlap.

The safe order is always the same.

1. Put the number in the **middle**, the region $A \cap B \cap C$.
2. Work out each **pair** region by subtracting the middle number.
3. Work out each **single** region by subtracting the pair regions.
4. Find the **outside** region from the universal set.

**Example 2.** The club fair. A year group of 32 students signs up for Chess
($C$), Drama ($D$) and Science ($S$). The totals are $n(C) = 15$, $n(D) = 13$,
$n(S) = 12$, $n(C \cap D) = 6$, $n(C \cap S) = 5$, $n(D \cap S) = 4$ and
$n(C \cap D \cap S) = 2$.

**Step 1. The middle.** The 2 students in all three clubs go in the centre.

**Step 2. The pairs.** Subtract the middle 2 from each pair total.

$$C \cap D \text{ only}: 6 - 2 = 4$$

$$C \cap S \text{ only}: 5 - 2 = 3$$

$$D \cap S \text{ only}: 4 - 2 = 2$$

**Step 3. The singles.** Subtract the pair regions from each club total.

$$C \text{ only}: 15 - (4 + 3 + 2) = 15 - 9 = 6$$

$$D \text{ only}: 13 - (4 + 2 + 2) = 13 - 8 = 5$$

$$S \text{ only}: 12 - (3 + 2 + 2) = 12 - 7 = 5$$

**Step 4. The outside.** Add the seven regions and subtract from the year group.

$$2 + 4 + 3 + 2 + 6 + 5 + 5 = 27$$

$$32 - 27 = 5$$

So 5 students joined no club.

The eight regions of the finished diagram are 2, 4, 3, 2, 6, 5, 5 and 5. Add them
all as a check: the total is 32, which is the whole year group.

## Reading a diagram

Once the diagram is filled, a question becomes a matter of adding the right
regions.

- $n(C \cup D)$ is every region inside the $C$ or $D$ circles: $2+4+3+2+6+5 = 22$.
- $n(C \setminus D)$ is the regions in $C$ but outside $D$: $3+6 = 9$.
- $n(C \cap D \cap S)$ is the middle region alone: 2.

> **Watch out.** The number written on a pair total is not the number for the
> overlap region. The sheet says $n(C \cap D) = 6$, but the overlap of $C$ and $D$
> in the diagram holds 4, because the other 2 are also in $S$. Writing 6 in the
> pair region counts those 2 students twice and makes the diagram add up to more
> than the year group.
>
> **Re-check:** add all eight regions and compare the total with the universal
> set. If the total is too big, a pair total was written into a pair region without
> subtracting the middle.

## Progress check

Return to the chapter problem. Use the eight regions you have found.

1. Add the seven regions inside the circles to find $n(C \cup D \cup S)$.
2. Find the number of students outside all three circles.
3. A student says 15 students joined Chess, so 15 must be written inside the $C$
   circle. Explain why the three parts of the $C$ circle are 6, 4 and 3, and what
   they add to.

In Section 8.5 you will work out expressions that combine three sets in brackets.

## You should now be able to

- name the four regions of a two-set Venn diagram;
- name the eight regions of a three-set Venn diagram;
- fill a diagram in the order middle, pairs, singles, outside;
- read an intersection, a union or a difference off a finished diagram;
- check a diagram by adding its regions and comparing with the universal set.
