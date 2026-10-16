---
title: 21.7 Probability from a table or a diagram — Learn
chapter: 21
chapter_title: Probability
section: '21.7'
section_title: Probability from a table or a diagram
tier: O
refs:
- SP.2
kind: walkthrough
---

# 21.7 Probability from a table or a diagram — Learn

**Prerequisites:** equally likely outcomes in Section 21.3, the addition rule in
Section 21.5, and the multiplication rule in Section 21.6.

**Objectives:** read a probability from a two-way table; use the sample-space
table; read a probability from a tree diagram.

By the end of this section you can find a probability without writing out a list
of outcomes.

## Reading a two-way table

A **two-way table** puts counts in rows and columns. One variable runs down the
side, and another runs across the top. The cells hold the counts.

A probability from the table is a cell divided by the grand total, which is the
number in the bottom right corner.

**Example 1.** The table shows how 100 students travel to school.

| | Walks | Bus | Total |
|---|---|---|---|
| Boys | 12 | 28 | 40 |
| Girls | 18 | 42 | 60 |
| Total | 30 | 70 | 100 |

A student is chosen at random. Find the probability that the student is a boy who
walks to school.

Read the cell where the boy row meets the walks column: 12. The grand total is
100.

$$P(\text{boy who walks})=\frac{12}{100}=\frac{3}{25}$$

You can also read the row and column totals. For example,
$P(\text{bus})=\frac{70}{100}=\frac{7}{10}$ and $P(\text{girl})=\frac{60}{100}=\frac35$.

## The sample-space table

The sample space of the open-day game is a table too. The 6 rows are the die
results and the 4 columns are the spinner sectors, so the grand total is 24.

The whole table is the denominator. A row is the event "the die shows that
number", and a column is the event "the spinner shows that letter".

**Example 2.** Read the probability that the die shows a 6 from the sample-space
table.

The 6 row holds 4 outcomes, one for each spinner sector.

$$P(\text{die shows }6)=\frac{4}{24}=\frac16$$

This is the same as the probability from the die alone, which is a useful check.

## Reading a tree diagram

A **tree diagram** shows two successive events. Multiply along a branch to get the
probability of that path. Add the paths that match an event.

**Example 3.** A bag holds 2 red and 3 blue counters. A counter is taken, put
back, and a second counter is taken. Find the probability of exactly one red.

The first branch has $P(\text{red})=\frac25$ and $P(\text{blue})=\frac35$. Because
the counter is put back, the second branch is the same.

The paths with exactly one red are red then blue, and blue then red.

$$P(\text{red then blue})=\frac25\times\frac35=\frac{6}{25}$$

$$P(\text{blue then red})=\frac35\times\frac25=\frac{6}{25}$$

$$P(\text{exactly one red})=\frac{6}{25}+\frac{6}{25}=\frac{12}{25}$$

Multiply along a branch, and add the branches that match.

## Watch out

> **Watch out.** Use the grand total as the denominator, not a row total or a
> column total.
>
> In Example 1, the probability that a student is a boy who walks is
> $\frac{12}{100}$, not $\frac{12}{40}$. The value $\frac{12}{40}$ would be the
> probability among boys only, which is a different question.
>
> **Re-check:** the denominator must be the count of everything in the table, the
> number in the bottom right corner.

A second trap is a tree diagram. Multiply along a branch to get one path. Add
across the branches only when two paths both match the event.

## Progress check

Return to the chapter problem, the open-day game. The sample-space table has 24
outcomes.

1. How many outcomes are in the 6 row?
2. How many outcomes are in the A column?
3. One outcome is in both. Use the addition rule to count the outcomes with a 6 or
   an A, then write the probability of a prize.

In Section 21.8 you will use that probability to predict how many prizes the
organiser needs.

## You should now be able to

- read a cell, a row total, a column total and the grand total from a two-way
  table;
- find a probability as a cell divided by the grand total;
- use the sample-space table of an experiment;
- multiply along a branch of a tree diagram;
- add the branches that match an event;
- say why the denominator is the whole table and not a row.
