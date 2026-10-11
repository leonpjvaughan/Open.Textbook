---
title: 12.1 Mutually exclusive and independent events — Learn
chapter: 12
chapter_title: Probability
section: '12.1'
section_title: Mutually exclusive and independent events
dfe:
- M1
kind: walkthrough
---

# 12.1 Mutually exclusive and independent events — Learn

**Prerequisites:** finding the probability of a single event, using the
complement rule $P(\text{not } A) = 1 - P(A)$, and listing equally likely
outcomes from GCSE.

**By the end of this section you can:** use the addition rule for mutually
exclusive events; use the general addition rule for any two events; use the
multiplication rule for independent events; test whether two events are
independent from a two-way table; and explain the difference between mutually
exclusive and independent events.

## 1. Events and the sample space

The **sample space** is the set of all possible outcomes of an experiment. For a
single roll of a fair six-sided die, the sample space is

$$
\{1, 2, 3, 4, 5, 6\}.
$$

An **event** is a set of outcomes. The event "the number is even" is the set
$\{2, 4, 6\}$. In this chapter, an event usually has a capital letter as its
name.

For equally likely outcomes, the probability of an event is

$$
P(A) = \frac{\text{number of outcomes in } A}{\text{total number of outcomes}}.
$$

So the probability of an even number is $\dfrac{3}{6} = \dfrac{1}{2}$.

## 2. Mutually exclusive events

Two events are **mutually exclusive** when they cannot both happen at the same
time. Rolling a 5 and rolling an even number are mutually exclusive, because 5
is not even.

When two events are mutually exclusive, the overlap is empty and
$P(A \text{ and } B) = 0$. The probability that one or the other happens is the
sum of the two probabilities:

$$
P(A \text{ or } B) = P(A) + P(B).
$$

This is the **addition rule** for mutually exclusive events. In probability,
"or" includes the case where both happen, unless the question says otherwise.

**Example 1.** A fair six-sided die is rolled once. Find the probability of an
even number or a 5.

The event "even" is $\{2, 4, 6\}$, so $P(\text{even}) = \dfrac{3}{6}$.
The event "a 5" is $\{5\}$, so $P(5) = \dfrac{1}{6}$. The two events cannot
happen together, so add:

$$
P(\text{even or } 5) = \frac{3}{6} + \frac{1}{6} = \frac{4}{6} = \frac{2}{3}.
$$

## 3. The general addition rule

Most pairs of events can happen together. If you add their probabilities, you
count the outcomes in both events twice. Subtract the overlap once:

$$
P(A \text{ or } B) = P(A) + P(B) - P(A \text{ and } B).
$$

This is the **general addition rule**. It works for every pair of events, and it
reduces to the mutually exclusive rule when the overlap is empty.

**Example 2.** A fair six-sided die is rolled once. Find the probability of an
even number or a prime number.

The evens are $\{2, 4, 6\}$, so $P(\text{even}) = \dfrac{3}{6}$.
The primes are $\{2, 3, 5\}$, so $P(\text{prime}) = \dfrac{3}{6}$.
The number 2 is in both events, so $P(\text{even and prime}) = \dfrac{1}{6}$.

Substitute into the general addition rule:

$$
P(\text{even or prime}) = \frac{3}{6} + \frac{3}{6} - \frac{1}{6}
= \frac{5}{6}.
$$

The union is $\{2, 3, 4, 5, 6\}$, which has five outcomes, so the answer agrees
with the definition.

## 4. Independent events

Two events are **independent** when the chance of one does not change when you
know the other has happened. A coin toss and a die roll are independent,
because the coin does not affect the die.

For independent events, multiply the probabilities to find the chance that both
happen:

$$
P(A \text{ and } B) = P(A) \times P(B).
$$

This is the **multiplication rule**.

**Example 3.** A fair coin is tossed and a fair six-sided die is rolled. Find the
probability of a head and a 6.

The coin and the die are independent, so multiply:

$$
P(\text{head and } 6) = P(\text{head}) \times P(6)
= \frac{1}{2} \times \frac{1}{6} = \frac{1}{12}.
$$

When items are drawn **with replacement**, the draws are independent, because
the first item goes back before the second is taken. When items are drawn
**without replacement**, the draws are not independent. Section 12.2 handles
that case with conditional probability.

## 5. Testing independence

You can test independence without knowing why the events happen. Find
$P(A \text{ and } B)$ and compare it with $P(A) \times P(B)$:

- if the two values are equal, the events are independent;
- if the two values differ, the events are not independent.

A **two-way table** is often the quickest way to read the values.

**Example 4.** A survey of 300 adults records whether each owns a car and
whether each owns a bicycle. The results are in the table.

| | Owns a bicycle | Does not own a bicycle | Total |
|---|---|---|---|
| Owns a car | 72 | 108 | 180 |
| Does not own a car | 48 | 72 | 120 |
| Total | 120 | 180 | 300 |

Show that owning a car and owning a bicycle are independent.

Read the three probabilities from the table:

$$
P(\text{car}) = \frac{180}{300} = \frac{3}{5}, \qquad
P(\text{bicycle}) = \frac{120}{300} = \frac{2}{5},
$$

$$
P(\text{car and bicycle}) = \frac{72}{300} = \frac{6}{25}.
$$

Now multiply the first two probabilities:

$$
P(\text{car}) \times P(\text{bicycle})
= \frac{3}{5} \times \frac{2}{5} = \frac{6}{25}.
$$

The product equals $P(\text{car and bicycle})$, so the two events are
independent. In this survey, owning a bicycle does not change the chance of
owning a car.

**Example 5.** A second survey of 250 people records whether each owns a cat and
whether each owns a dog. Here 150 own a cat, 100 own a dog, and 30 own both. Show
that the two events are not independent.

$$
P(\text{cat}) = \frac{150}{250} = \frac{3}{5}, \qquad
P(\text{dog}) = \frac{100}{250} = \frac{2}{5}.
$$

The product is $\dfrac{3}{5} \times \dfrac{2}{5} = \dfrac{6}{25} = 0.24$. The
joint probability from the data is

$$
P(\text{cat and dog}) = \frac{30}{250} = \frac{3}{25} = 0.12.
$$

The two values differ, so owning a cat and owning a dog are not independent.
Fewer people own both than independence would predict.

## 6. Mutually exclusive, or independent?

These two words describe different things, and mixing them up is the most common
error in this section.

- **Mutually exclusive** means the events cannot happen together. The overlap is
  empty, so $P(A \text{ and } B) = 0$.
- **Independent** means one event does not change the chance of the other. The
  overlap is $P(A) \times P(B)$.

If two events are mutually exclusive and both have a probability greater than
zero, they are **not** independent. Knowing that one happened makes the other
impossible, which changes its probability to zero.

**Example 6.** On a single roll of a fair die, let $A$ be "even" and let $B$ be
"a 5". The events are mutually exclusive. Check independence.

$$
P(A) = \frac{1}{2}, \qquad P(B) = \frac{1}{6}, \qquad
P(A) \times P(B) = \frac{1}{12}.
$$

But $P(A \text{ and } B) = 0$, because the events cannot happen together. The
values $0$ and $\dfrac{1}{12}$ differ, so the events are not independent.

## 7. Try it: when are two events independent?

**Predict first.** The figure shows a two-way table with 100 people in each row
and 100 people in each column, so $P(A) = 0.5$ and $P(B) = 0.5$. The control
sets the number of people in both $A$ and $B$. Before you move the control,
predict the value that makes $A$ and $B$ independent.

:::figure ch12-independence

**Test.** Move the control to your predicted value. Watch $P(A \text{ and } B)$
and $P(A) \times P(B)$, and watch $P(A \mid B)$ against $P(A)$. Then set the
overlap to 20 and to 80 and compare.

**Explain.** Write two sentences. The first explains why $P(A \text{ and } B)$
falls as the overlap falls. The second explains why $A$ and $B$ are independent
exactly at the value you found.

> **Watch out.** Three mistakes are common.
>
> **Adding probabilities without checking for an overlap.** The addition rule
> $P(A) + P(B)$ is only for mutually exclusive events. When the events can
> happen together, subtract the overlap. For two events from a single die roll,
> the overlap is often not zero.
>
> **Calling mutually exclusive events independent.** They are opposites in
> effect. If $A$ and $B$ cannot both happen, then knowing $A$ happened tells you
> that $B$ did not, so the events are as dependent as they can be.
>
> **Multiplying for events that are not independent.** The multiplication rule
> needs independence. Drawing two counters from a bag without replacement is the
> usual trap: the first draw changes the second.
>
> **Re-check:** after any addition, ask whether the events can overlap. After
> any multiplication, ask whether the events are independent.

## Progress check

Return to the chapter problem. Records for the warehouse cover 100000 mornings.
The table shows how many mornings had a fire and how many had an alarm.

| | Alarm sounds | Alarm does not sound | Total |
|---|---|---|---|
| Fire | 95 | 5 | 100 |
| No fire | 1998 | 97902 | 99900 |
| Total | 2093 | 97907 | 100000 |

1. Find $P(\text{fire})$.
2. Find $P(\text{alarm})$.
3. Work out $P(\text{fire}) \times P(\text{alarm})$.
4. Read $P(\text{fire and alarm})$ from the table.
5. Are the events "fire" and "alarm" independent? Explain your answer.

Compare your answers with a partner. The events are not independent, and the
direction of the difference is what makes an alarm useful.

## You should now be able to

- use the addition rule for mutually exclusive events;
- use the general addition rule $P(A \text{ or } B) = P(A) + P(B) - P(A \text{ and } B)$;
- use the multiplication rule for independent events;
- test independence by comparing $P(A \text{ and } B)$ with $P(A) \times P(B)$;
- explain why mutually exclusive events with non-zero probability are never
  independent;
- read the probabilities you need from a two-way table.
