---
title: 8.3 Recurrence relations as discrete models — Learn
chapter: 8
chapter_title: Modelling a changing world
section: '8.3'
section_title: Recurrence relations as discrete models
tier: O
refs:
- S4
kind: walkthrough
---

# 8.3 Recurrence relations as discrete models — Learn

**Prerequisites:** Section 8.2, exponential growth and decay; percentages.

**Objectives:** build a recurrence relation from a statement; iterate a
recurrence; write the first few terms of a sequence; find the fixed point.

By the end of this section you can model change that happens in steps, and work
out what the model gives after any number of steps.

## Change in steps

A bank adds interest once a year. A patient takes a tablet once a day. A
population is counted once a year. In each case the quantity does not change
smoothly; it jumps at fixed moments, and stays put in between.

A model of change in steps uses a **sequence**. The values are written

$$u_0, u_1, u_2, u_3, \dots$$

where $u_0$ is the starting value, $u_1$ is the value after one step, and so on.
The rule that produces each value from the one before it is a **recurrence
relation**, or a **recurrence** for short.

$$u_{n+1} = \text{a rule involving } u_n$$

The number $n$ counts the steps. It is a whole number, so a recurrence is a
**discrete** model: it describes change at separate moments, not all the time.

## Building a recurrence from words

A percentage increase or decrease becomes a multiplier.

- An increase of $5\%$ multiplies by $1.05$.
- A decrease of $12\%$ multiplies by $1 - 0.12 = 0.88$.
- Half of the value remaining multiplies by $0.5$.

**Example 1.** A population starts at $200$ and grows by $5\%$ each year. Write
a recurrence for the population $u_n$ after $n$ years.

Each year multiplies the value by $1.05$, so

$$u_{n+1} = 1.05u_n, \qquad u_0 = 200.$$

**Example 2.** A car worth €18\,000 loses $12\%$ of its value each year. Write a
recurrence for its value after $n$ years.

Each year multiplies the value by $0.88$, so

$$u_{n+1} = 0.88u_n, \qquad u_0 = 18\,000.$$

**Example 3.** A patient takes $40$ mg of a medicine each day, and half of the
medicine in the body is cleared each day. Write a recurrence for the amount $u_n$
just after a dose.

Each day, half of the amount remains and then $40$ mg is added:

$$u_{n+1} = 0.5u_n + 40.$$

The constant $40$ is an addition that happens at every step.

## Iterating a recurrence

To find a later term, apply the rule again and again. This is called
**iterating**.

**Example 4.** For $u_{n+1} = 1.05u_n$ with $u_0 = 200$, find $u_3$.

$$u_1 = 1.05 \times 200 = 210$$

$$u_2 = 1.05 \times 210 = 220.5$$

$$u_3 = 1.05 \times 220.5 = 231.525$$

The population after three years is about $232$.

**Example 5.** For $u_{n+1} = 0.5u_n + 40$ with $u_0 = 0$, find $u_3$.

$$u_1 = 0.5 \times 0 + 40 = 40$$

$$u_2 = 0.5 \times 40 + 40 = 60$$

$$u_3 = 0.5 \times 60 + 40 = 70$$

The amount is rising towards $80$ mg, the level at which the dose replaces exactly
what is cleared.

## The fixed point

A **fixed point** is a value that the recurrence leaves unchanged. If the
sequence ever reaches it, it stays there. To find it, replace both $u_{n+1}$ and
$u_n$ by the same letter $L$ and solve.

**Example 6.** Find the fixed point of $u_{n+1} = 0.5u_n + 40$.

Set $u_{n+1} = u_n = L$:

$$L = 0.5L + 40, \qquad 0.5L = 40, \qquad L = 80.$$

The fixed point is $80$ mg. Example 5 shows the sequence climbing towards it.

> **Watch out.** The multiplier and the amount added are different things, and
> they belong in different places. A $5\%$ increase is a **multiplier** of $1.05$,
> not an addition of $0.05$; writing $u_{n+1} = u_n + 0.05$ is a common error. A
> second trap is the starting value: the recurrence alone does not fix the
> sequence, so $u_0$ must be given or worked out. **Re-check:** the first term you
> calculate from the recurrence should match the value you get by applying the
> percentage once to $u_0$.

## Progress check

Back to the chapter problem. The lake loses $5\%$ of its pollutant each day, so a
daily model is

$$u_{n+1} = 0.95u_n,$$

with $u_0 = 400$ kg on the day the factory closes.

1. Work out $u_1$ and $u_2$.
2. Find the fixed point of this recurrence. What does it mean for the lake?
3. The continuous model in Section 8.2 was $P = 400e^{-0.05t}$. Which model do
   you expect to remove more pollutant in the first ten days, the daily model or
   the continuous one? Write down your prediction and a reason.

Keep your prediction. Section 8.8 compares the two models and checks it.

## You should now be able to

- say what a recurrence relation is and what discrete change means;
- turn a percentage increase or decrease into a multiplier;
- build a recurrence from a statement, including one with a constant added;
- iterate a recurrence to find a later term;
- find the fixed point of a recurrence and say what it means.
