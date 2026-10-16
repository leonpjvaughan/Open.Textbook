---
title: 10.4 Sample spaces and set theory — Learn
chapter: 10
chapter_title: Counting and probability
section: '10.4'
section_title: Sample spaces and set theory
tier: O
refs:
- '1.2'
kind: walkthrough
---

# 10.4 Sample spaces and set theory — Learn

**Prerequisites:** Sections 10.1 to 10.3 — counting outcomes, arrangements and selections.

**Objectives:** write down a sample space; describe events with set notation; use the
addition rule.

By the end of this section you can describe every possible outcome of an experiment, and
write an event as a set inside it.

## The sample space

An experiment has a set of possible outcomes. That set is the **sample space**, written
$\xi$ (the Greek letter xi) or $S$.

For one roll of a fair die,

$$\xi = \{1, 2, 3, 4, 5, 6\}$$

An **event** is a subset of the sample space. It collects the outcomes that share a
property. The event "an even score" is

$$A = \{2, 4, 6\}$$

The number of outcomes in $A$ is written $n(A)$, so here $n(A) = 3$.

## Set notation for events

| Symbol | Meaning |
|---|---|
| $A \cup B$ | $A$ **or** $B$, the outcomes in either event |
| $A \cap B$ | $A$ **and** $B$, the outcomes in both events |
| $A'$ | the complement of $A$, the outcomes not in $A$ |
| $n(A)$ | the number of outcomes in $A$ |

Two events are **mutually exclusive** when they have no outcome in common, so
$A \cap B$ is empty.

**Example 1.** A die is rolled. Let $A = \{2, 4, 6\}$ and $B = \{5, 6\}$. Find $A \cup B$
and $A \cap B$.

$$A \cup B = \{2, 4, 5, 6\} \qquad A \cap B = \{6\}$$

So $n(A \cup B) = 4$ and $n(A \cap B) = 1$.

## Which regions an expression selects

:::figure venn-regions

**Predict, then test.** Write down which parts of the diagram $A \cap B$ selects, and
which $A'$ selects. Then choose each one and check. Switch to three sets and try
$A \cap B \cap C$ and $(A \cup B \cup C)'$.

**Explain.** The readout tells you how many parts of the diagram an expression
selects. Use it to explain why $P(A \cup B) = P(A) + P(B) - P(A \cap B)$ has a
subtraction in it: say which parts would be counted twice by $P(A) + P(B)$ alone.

## The addition rule

If you add $n(A)$ and $n(B)$, the outcomes in both events are counted twice. The addition
rule corrects for this:

> **The addition rule.**
> $$n(A \cup B) = n(A) + n(B) - n(A \cap B)$$

For the example above, $n(A) = 3$, $n(B) = 2$ and $n(A \cap B) = 1$, so

$$n(A \cup B) = 3 + 2 - 1 = 4$$

which matches the list $\{2, 4, 5, 6\}$.

**Example 2.** Two coins are tossed. Write down the sample space.

$$\xi = \{\text{HH}, \text{HT}, \text{TH}, \text{TT}\}$$

It has $2 \times 2 = 4$ outcomes. The event "exactly one head" is
$\{\text{HT}, \text{TH}\}$, with $n = 2$.

> **Watch out.** Union is **or** and intersection is **and**. The symbol $\cup$ looks like
> a cup that holds everything, so $A \cup B$ takes all the outcomes from both events. The
> symbol $\cap$ is the overlap, so $A \cap B$ takes only the shared outcomes. Reading them
> the wrong way round is the commonest error here. Check by listing the outcomes.

## Progress check

Back to the chapter problem. The lucky dip draws two counters from the bag at once, so the
order does not matter. The sample space is the set of all $28$ pairs of counters.

The event $S$ is the star prize: one red counter and one blue counter. There are
$5 \times 3 = 15$ such pairs, so $n(S) = 15$. Write down the sample space size and $n(S)$,
and keep them for Section 10.5, where they become probabilities.

## You should now be able to

- write down the sample space of an experiment;
- describe an event as a subset of the sample space;
- use the symbols $\cup$, $\cap$ and $A'$ correctly;
- use the addition rule to count a union.
