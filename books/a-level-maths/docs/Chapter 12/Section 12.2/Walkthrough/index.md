---
title: 12.2 Conditional probability and the conditional probability formula — Learn
chapter: 12
chapter_title: Probability
section: '12.2'
section_title: Conditional probability and the conditional probability formula
refs:
- M2
kind: walkthrough
---

# 12.2 Conditional probability and the conditional probability formula — Learn

**Prerequisites:** the addition and multiplication rules from Section 12.1,
reading a two-way table, and the tree diagrams of GCSE probability.

**By the end of this section you can:** write and interpret a conditional
probability $P(A \mid B)$; use the formula
$P(A \mid B) = \dfrac{P(A \text{ and } B)}{P(B)}$ in both directions; use a tree
diagram to multiply along a path and add across paths; test independence with a
conditional probability; and work backwards from a result to the probability of
its cause.

## 1. What a conditional probability means

A **conditional probability** is the probability of one event when you already
know that another event has happened. It is written

$$
P(A \mid B),
$$

which is read as "the probability of $A$ given $B$".

The condition changes the sample space. Once you know that $B$ has happened,
the only outcomes that matter are the ones inside $B$. You are looking at the
part of $A$ that lies inside $B$.

## 2. The conditional probability formula

For two events $A$ and $B$, with $P(B) > 0$,

$$
P(A \mid B) = \frac{P(A \text{ and } B)}{P(B)}.
$$

The numerator is the probability of both events. The denominator is the
probability of the condition. Dividing restricts the calculation to the part of
the sample space where $B$ is true.

Rearranging the formula gives the **multiplication rule** for conditional
probability:

$$
P(A \text{ and } B) = P(A \mid B) \times P(B).
$$

The rule is symmetric. From $P(B \mid A)$ you also get

$$
P(A \text{ and } B) = P(B \mid A) \times P(A).
$$

**Example 1.** A college has 200 students. Of these, 120 study Mathematics, 80
study Physics, and 50 study both. A student is chosen at random. Find
$P(\text{Physics} \mid \text{Mathematics})$.

The condition is "studies Mathematics", so the sample space becomes those 120
students. Inside that group, 50 study Physics:

$$
P(\text{Physics} \mid \text{Mathematics}) = \frac{50}{120} = \frac{5}{12}.
$$

The formula gives the same value, because both probabilities are read over the
same total of 200:

$$
P(\text{Physics} \mid \text{Mathematics})
= \frac{P(\text{Physics and Mathematics})}{P(\text{Mathematics})}
= \frac{50/200}{120/200} = \frac{50}{120} = \frac{5}{12}.
$$

**Example 2.** Use the same college. Find
$P(\text{Mathematics} \mid \text{Physics})$.

Now the sample space is the 80 students who study Physics, and 50 of them study
Mathematics:

$$
P(\text{Mathematics} \mid \text{Physics}) = \frac{50}{80} = \frac{5}{8}.
$$

The two answers $\dfrac{5}{12}$ and $\dfrac{5}{8}$ are different. The order of
the condition matters.

## 3. Conditional probability and independence

If two events are independent, knowing that one has happened does not change
the probability of the other. For independent events with $P(B) > 0$,

$$
P(A \mid B) = P(A).
$$

Substituting this into the formula recovers the multiplication rule for
independent events:

$$
P(A \mid B) = P(A) \quad \Longrightarrow \quad
\frac{P(A \text{ and } B)}{P(B)} = P(A) \quad
\Longrightarrow \quad
P(A \text{ and } B) = P(A) \times P(B).
$$

So the three statements below say the same thing:

- $A$ and $B$ are independent;
- $P(A \text{ and } B) = P(A) \times P(B)$;
- $P(A \mid B) = P(A)$, when $P(B) > 0$.

**Example 3.** For two events $A$ and $B$, $P(A \text{ and } B) = 0.2$,
$P(B) = 0.5$ and $P(A) = 0.4$. Find $P(A \mid B)$ and test independence.

$$
P(A \mid B) = \frac{P(A \text{ and } B)}{P(B)} = \frac{0.2}{0.5} = 0.4.
$$

This equals $P(A)$, so the events are independent.

## 4. Tree diagrams

A **tree diagram** shows a sequence of events. Each branch is labelled with a
probability. The two rules are:

- **multiply along** a path, to find the probability of the events on that path;
- **add across** the paths, when several paths lead to the same event.

The probability on a second-stage branch is conditional on the first stage.
When items are drawn without replacement, the denominator decreases.

**Example 4.** A bag contains 5 red counters and 3 blue counters. Two counters
are taken at random, one after the other, without replacement. Find the
probability that the first counter is red and the second is blue.

The first counter is red with probability $\dfrac{5}{8}$. After a red counter is
taken, 7 counters remain and 4 of them are red, so the second is blue with
probability $\dfrac{3}{7}$. Multiply along the branch:

$$
P(\text{red then blue}) = \frac{5}{8} \times \frac{3}{7} = \frac{15}{56}.
$$

**Example 5.** Use the same bag. Find the probability that the second counter is
red.

The second counter is red on two paths: red then red, and blue then red. Find
each path, then add:

$$
P(\text{red then red}) = \frac{5}{8} \times \frac{4}{7} = \frac{20}{56},
$$

$$
P(\text{blue then red}) = \frac{3}{8} \times \frac{5}{7} = \frac{15}{56}.
$$

$$
P(\text{second red}) = \frac{20}{56} + \frac{15}{56}
= \frac{35}{56} = \frac{5}{8}.
$$

The second draw has the same chance as the first. Adding the paths is also
called the **law of total probability**.

## 5. Working backwards: from a result to its cause

Some questions give a result and ask for the probability of its cause. A tree
diagram handles these cleanly.

1. Draw the tree with the cause on the first branch.
2. Multiply to find the probability of each path that gives the result.
3. Add those path probabilities to find the probability of the result.
4. Divide the path you want by that total.

**Example 6.** On any morning, the probability of a fire in a warehouse is
$0.001$. A detector sounds when there is a fire with probability $0.95$, and it
sounds when there is no fire with probability $0.02$. Find the probability that
there is a fire, given that the detector sounds.

Let $F$ be a fire and let $A$ be an alarm. The detector sounds on two paths.

$$
P(F \text{ and } A) = P(F) \times P(A \mid F) = 0.001 \times 0.95 = 0.00095.
$$

$$
P(\text{no } F \text{ and } A)
= P(\text{no } F) \times P(A \mid \text{no } F)
= 0.999 \times 0.02 = 0.01998.
$$

Add the two paths to find the probability of an alarm:

$$
P(A) = 0.00095 + 0.01998 = 0.02093.
$$

Now divide the fire path by the total:

$$
P(F \mid A) = \frac{P(F \text{ and } A)}{P(A)}
= \frac{0.00095}{0.02093} = \frac{95}{2093} \approx 0.0454.
$$

So fewer than 1 alarm in 20 is a real fire. The detector is reliable, and yet
most alarms are false. The reason is the base rate: fires are rare, so the small
false-alarm rate is applied to a huge number of quiet mornings.

## 6. Venn diagrams and two-way tables

Conditional probability can be read from any clear picture of the sample space.

A **Venn diagram** shows the whole sample space as a rectangle and the events as
circles. $P(A \mid B)$ is the part of $A$ inside $B$, divided by the whole of
$B$.

A **two-way table** gives the counts directly. Read the row or column named in
the condition as the new total, then read the cell you need.

All three methods, the formula, the tree and the table, agree. Choose the
method that shows the numbers best.

## 7. Try it: how a reliable alarm can still be wrong

**Predict first.** The figure shows the warehouse tree. Before you move a
control, predict what happens to $P(\text{fire} \mid \text{alarm})$ when the
false-alarm rate rises. Write down whether it rises, falls or stays the same,
and why.

:::figure ch12-conditional-reverse

**Test.** Move the false-alarm rate up and down, and watch
$P(\text{fire} \mid \text{alarm})$. Then change the base rate and watch the same
number.

**Explain.** Write two sentences. The first explains why a higher false-alarm
rate lowers $P(\text{fire} \mid \text{alarm})$. The second explains why the base
rate affects the answer even when the detector does not change.

> **Watch out.** The biggest error in this section is swapping the condition:
> $P(A \mid B)$ is not the same as $P(B \mid A)$.
>
> In the warehouse, $P(\text{alarm} \mid \text{fire}) = 0.95$, but
> $P(\text{fire} \mid \text{alarm}) \approx 0.045$. The first says the detector
> usually works. The second says most alarms are false. Both are true.
>
> **Re-check:** name the group that comes after the word "given". That group is
> the denominator of the fraction.

## Progress check

Return to the warehouse table from Section 12.1.

| | Alarm sounds | Alarm does not sound | Total |
|---|---|---|---|
| Fire | 95 | 5 | 100 |
| No fire | 1998 | 97902 | 99900 |
| Total | 2093 | 97907 | 100000 |

1. Find $P(\text{fire and alarm})$.
2. Find $P(\text{alarm})$.
3. Use the formula to find $P(\text{fire} \mid \text{alarm})$.
4. Find $P(\text{alarm} \mid \text{fire})$ from the fire row.
5. Explain why the answers to questions 3 and 4 are so different, and which one
   the site manager needs.

## You should now be able to

- write and interpret a conditional probability $P(A \mid B)$;
- use $P(A \mid B) = \dfrac{P(A \text{ and } B)}{P(B)}$;
- use $P(A \text{ and } B) = P(A \mid B) \times P(B)$;
- test independence with $P(A \mid B) = P(A)$;
- multiply along a tree-diagram path and add across paths;
- find a conditional probability from a two-way table or a Venn diagram;
- work backwards from a result to the probability of its cause.
