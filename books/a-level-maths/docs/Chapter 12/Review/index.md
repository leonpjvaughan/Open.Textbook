---
title: 'Chapter 12: Review'
chapter: 12
kind: review
---

# Chapter 12: Review

## The chapter problem, solved

The warehouse fire system has these figures:

- the probability of a fire on a morning is $P(F) = 0.001$;
- the alarm sounds in a fire with probability $P(A \mid F) = 0.95$;
- the alarm sounds with no fire with probability $P(A \mid \text{no } F) = 0.02$.

The manager needs $P(\text{fire} \mid \text{alarm})$.

### Step 1. Write the two paths to an alarm

An alarm can happen in two ways. Multiply along each path.

$$
P(F \text{ and } A) = P(F) \times P(A \mid F) = 0.001 \times 0.95 = 0.00095.
$$

$$
P(\text{no } F \text{ and } A)
= P(\text{no } F) \times P(A \mid \text{no } F)
= 0.999 \times 0.02 = 0.01998.
$$

The two paths are mutually exclusive, so add them to find the probability of an
alarm.

$$
P(A) = 0.00095 + 0.01998 = 0.02093.
$$

### Step 2. Divide the fire path by the alarm total

$$
P(F \mid A) = \frac{P(F \text{ and } A)}{P(A)}
= \frac{0.00095}{0.02093} = \frac{95}{2093} \approx 0.0454.
$$

So about $4.5\%$ of alarms are real fires. Fewer than one alarm in twenty.

### Step 3. Check with a table

The same answer comes from 100000 mornings.

| | Alarm sounds | Alarm does not sound | Total |
|---|---|---|---|
| Fire | 95 | 5 | 100 |
| No fire | 1998 | 97902 | 99900 |
| Total | 2093 | 97907 | 100000 |

Of the 2093 mornings with an alarm, 95 had a fire:

$$
\frac{95}{2093} \approx 0.0454.
$$

There are about $21$ false alarms for each real fire, because
$\dfrac{1998}{95} \approx 21$.

### Step 4. Explain the surprise

The detector is reliable. It finds 95% of fires and raises a false alarm on only
2% of quiet mornings. The surprise comes from the base rate. Fires are rare, so
the 2% false-alarm rate acts on a very large number of quiet mornings. Those
false alarms outnumber the fires.

This is not a fault in the detector. It is a fact about rare events, and it is
why a screening test for a rare condition needs a very low false-positive rate.

### Step 5. Critique the assumptions

The answer rests on three assumptions.

- **The mornings are independent.** A faulty detector may stay triggered, and
  fires may cluster. Either would change the answer.
- **The rates are constant.** The detection and false-alarm rates come from
  tests. Real rates change as the equipment ages.
- **The base rate is $0.001$.** This figure comes from records and may be
  uncertain. Section 12.3 showed how much the answer moves when the base rate
  changes.

### Step 6. Answer the manager

Most alarms are false, but $P(F \mid A) \approx 0.045$ is far larger than the
$0.001$ chance of a fire with no alarm. The alarm raises the risk by a factor of
about 45. A real fire is serious, and a missed one is dangerous, so the manager
should treat each alarm as a possible fire until it is checked.

## Mixed practice — choose the method first

For each question, say which method you will use before you calculate: an
addition rule, a multiplication rule, a tree diagram, the conditional
probability formula, an expected count, or a method from Chapter 11. The items
mix this chapter with the sampling, diagrams and summary statistics of
Chapter 11.

:::problems chapter-12-review

:::answers chapter-12-review

## What you can now do

- use the addition rule for mutually exclusive events, and the general addition
  rule for any two events;
- test whether two events are independent, and explain why mutually exclusive
  events are not independent;
- find a conditional probability from a two-way table, a Venn diagram or a tree
  diagram;
- use $P(A \mid B) = \dfrac{P(A \text{ and } B)}{P(B)}$ and its rearrangement;
- work backwards from a result to the probability of its cause;
- build a probability model, state its assumptions, and criticise them;
- refine a model and report how the answer changes;
- work out an expected count and compare it with observed data;
- draw on the sampling methods and summary statistics of Chapter 11 when a
  probability question needs data.

## Your relevance reflection

Return to the prompt in the chapter opener: *a test, an alarm or a check you
have met that can be wrong*. Write the example again. Now add three things you
could not have said before this chapter: the base rate, the false-positive rate,
and what a positive result actually means. Finish with one sentence about how
you would judge the result the next time you meet it.
