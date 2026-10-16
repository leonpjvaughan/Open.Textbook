---
title: 10.1 Counting outcomes and the fundamental principle — Learn
chapter: 10
chapter_title: Counting and probability
section: '10.1'
section_title: Counting outcomes and the fundamental principle
tier: F
refs:
- '1.1'
kind: walkthrough
---

# 10.1 Counting outcomes and the fundamental principle — Learn

**Prerequisites:** multiplying whole numbers; writing powers.

**Objectives:** use the fundamental principle of counting; count the outcomes of a process
with several stages.

By the end of this section you can count how many outcomes a process has, without listing
every one.

## Counting by multiplying

Suppose a cafe offers $3$ starters and $4$ main courses. You choose one starter and one
main. How many different two-course meals can you make?

You could list them, but there is a quicker way. Fix a starter. It can go with any of the
$4$ mains, which gives $4$ meals. There are $3$ starters, so this happens $3$ times. The
total is

$$3 \times 4 = 12 \text{ meals}$$

> **The fundamental principle of counting.** If one stage of a process has $m$ outcomes
> and a second stage has $n$ outcomes, then the two stages together have $m \times n$
> outcomes. For more stages, keep multiplying.

The rule works because each choice at one stage can be paired with every choice at the
next. A tree diagram shows the same thing: each branch splits into the choices of the next
stage.

## Counting several stages

**Example 1.** A lock has $3$ dials. Each dial shows a digit from $0$ to $9$. How many
codes are possible?

Each dial has $10$ positions. The dials do not affect each other, so the choices multiply:

$$10 \times 10 \times 10 = 10^3 = 1000$$

**Example 2.** A restaurant offers $3$ starters, $4$ main courses and $2$ desserts. How many
three-course meals can you choose?

Multiply the choices at each stage:

$$3 \times 4 \times 2 = 24 \text{ meals}$$

**Example 3.** A coin is tossed and a fair die is rolled. How many outcomes are possible?

The coin has $2$ outcomes and the die has $6$:

$$2 \times 6 = 12 \text{ outcomes}$$

An outcome here is a pair, such as a head with a $3$. There are $12$ such pairs.

> **Watch out.** The choices **multiply**; they do not add. With $3$ starters and $4$
> mains, the number of meals is $3 \times 4 = 12$, not $3 + 4 = 7$. Adding counts the
> starters and the mains separately, which is not what a meal is. Multiply whenever you
> pair one choice from each stage.

## Progress check

Back to the chapter problem. The lucky dip bag holds $5$ red and $3$ blue counters, so
$8$ counters in total. You draw two counters, one after the other, without replacement.

How many **ordered** pairs of counters are possible? There are $8$ choices for the first
counter, then $7$ left for the second. Keep the number — Section 10.2 counts the same
draws as permutations, and Section 10.3 counts them as combinations.

## You should now be able to

- state the fundamental principle of counting;
- multiply the choices at each stage of a process;
- count outcomes of a process with two or more stages;
- explain why the choices multiply rather than add.
