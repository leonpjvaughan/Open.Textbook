---
title: 23.6 Conditional probability — Learn
chapter: 23
chapter_title: Probability
section: '23.6'
section_title: Conditional probability
tier: H
refs:
- P9
kind: walkthrough
---

# 23.6 Conditional probability — Learn

**Prerequisites:** fractions, Venn diagrams and two-way tables.

**Objectives:** calculate probability given that an event has happened; identify the restricted total.

Conditional probability means the probability of an event when you know another event has happened. The known event restricts the group you consider. The notation $P(A\mid B)$ means probability of A given B.

**Example 1.** In a group of 30 students, 18 take the bus. Of those, 10 bring
lunch. Among the 12 who do not take the bus, 5 bring lunch. Find the probability
that a bus user brings lunch.

The counts can be organised in a two-way table:

|  | Bring lunch | No lunch | Total |
|---|---:|---:|---:|
| Bus | 10 | 8 | 18 |
| Not bus | 5 | 7 | 12 |
| Total | 15 | 15 | 30 |

The condition is that the student takes the bus, so the restricted total is 18.

$$P(\text{lunch}\mid\text{bus})=\frac{10}{18}=\frac59$$

**Example 2.** In a Venn diagram, 15 people are in set $A$ and 6 are in both
$A$ and $B$. Find $P(B\mid A)$.

The condition restricts the group to set $A$. The overlap has 6 people, so
$P(B\mid A)=\frac6{15}=\frac25$.

**Example 3.** A bag contains 3 red and 2 blue counters. A counter is drawn and
not replaced. Find the probability that the second counter is blue, given that
the first was red.

The branches after drawing red show the updated probabilities:

```text
First draw              Second draw
Red (3/5) ──────────────┬─ Red (2/4)
                       └─ Blue (2/4)
Blue (2/5) ─────────────┬─ Red (3/4)
                        └─ Blue (1/4)
```

Given red first, 2 blue counters remain among 4. Therefore,
$P(\text{second blue}\mid\text{first red})=\frac24=\frac12$.

> **Watch out.** Do not divide by the whole group after a condition is given. “Given bus” makes 18 the denominator in the example, not the full school roll.
> **Re-check:** ask which group the condition fixes before you choose the denominator.

## Progress check

Of 30 spins, 18 land on red. Of those 18 red spins, 10 land on an odd-numbered sector. Find the probability that a spin lands on an odd sector, given that it is red. State the restricted total.

## You should now be able to

- identify the group restricted by the condition;
- calculate conditional probability from a two-way table, a Venn diagram and a tree diagram.
