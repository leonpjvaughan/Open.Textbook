---
title: 23.4 Combined events and tree diagrams — Learn
chapter: 23
chapter_title: Probability
section: '23.4'
section_title: Combined events and tree diagrams
tier: F
refs:
- P8
kind: walkthrough
---

# 23.4 Combined events and tree diagrams — Learn

**Prerequisites:** fractions, multiplication and possibility spaces.

**Objectives:** use a tree diagram for two events; multiply probabilities along a path; add probabilities for separate successful paths.

A tree diagram shows each possible result in sequence. For independent events, the first result does not change the probabilities on the next set of branches. Multiply along a path to find the probability of that outcome. Add the probabilities of paths that meet the event.

**Example 1.** A fair coin is tossed twice. Find the probability of at least one head.

The tree has four equally likely paths: HH, HT, TH and TT.

Three paths contain at least one head: HH, HT and TH.

$$P(\text{at least one head})=\frac14+\frac14+\frac14=\frac34$$

The complement gives the same result: $1-P(\text{no heads})=1-\frac14=\frac34$.

**Example 2.** A bag contains 3 red and 2 blue counters. One counter is drawn
and not replaced. Find the probability of red then blue.

The probability of red first is $\frac35$. After a red is removed, 2 blue
counters remain among 4, so the probability of blue next is $\frac24$.

$$P(\text{red then blue})=\frac35\times\frac24=\frac{6}{20}=\frac3{10}$$

The second probability changes because the first counter is not replaced.
These are dependent events: the first draw changes the probability of the second.

> **Watch out.** For “at least one”, do not count only HH. Include every path with one or more heads.
> **Re-check:** list every outcome with at least one head and count the list again.

## Progress check

The spinner is spun twice. Draw a tree diagram and work out the probability of red both times. Then work out the probability of at least one blue. Explain how the complement gives the second answer.

## You should now be able to

- draw branches for sequential events;
- identify whether events are independent or dependent;
- multiply along a path and add successful paths to find combined probabilities.
