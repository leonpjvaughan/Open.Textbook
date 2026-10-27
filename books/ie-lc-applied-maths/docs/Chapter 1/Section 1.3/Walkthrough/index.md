---
title: 1.3 Assumptions and what they cost you — Learn
chapter: 1
chapter_title: What mathematical modelling is
section: '1.3'
section_title: Assumptions and what they cost you
tier: O
refs:
- S1
kind: walkthrough
---

# 1.3 Assumptions and what they cost you — Learn

**Prerequisites:** Section 1.1, the cycle; Section 1.2, formulating a question.

**Objectives:** state the assumptions a model rests on; explain what each one
leaves out; test how much the answer changes when an assumption changes.

By the end of this section you can list the assumptions behind a model, and say
which one the answer depends on most.

## What an assumption is

An **assumption** is something you decide to treat as true so that the model can
be built. An assumption is not a fact. It is a choice, and every choice leaves
something out.

The canteen model rests on five assumptions.

- Students arrive at a steady rate of 5 each minute.
- The till serves at a steady rate of 10 each minute.
- There is one queue and one till.
- Nobody leaves the queue before being served.
- At 12:30 the queue holds 40 students.

Each one is a simplification. Students arrive in twos and threes, not evenly.
One student pays with coins and takes a minute, while the next is served in ten
seconds. Someone gives up and leaves.

## What an assumption costs

An assumption costs you accuracy. The question is how much.

**Sensitivity** is how much the answer changes when an assumption changes. A
model is **sensitive** to an assumption when a small change makes a large
difference to the answer.

Take the clear time $T = \dfrac{Q}{s - a}$, with $Q = 40$ students in the queue
and $a = 5$ joining each minute. Change the service rate $s$ and watch $T$.

| Service rate $s$ (per minute) | Net rate $s - a$ (per minute) | Clear time $T$ (minutes) |
|---|---|---|
| 12 | 7 | 5.7 |
| 10 | 5 | 8 |
| 8 | 3 | 13.3 |
| 6 | 1 | 40 |
| 5 | 0 | never |

The service rate falls from 12 to 6, which is a change of one half. The clear
time rises from 5.7 minutes to 40 minutes, which is about seven times as long.
The model is very sensitive to the service rate.

The reason is the subtraction. The clear time depends on the difference
$s - a$, and near $s = a$ that difference is small. Dividing by a small number
gives a large answer. At $s = 5$ the difference is zero, and the queue never
clears at all.

**Example 1.** The queue holds 80 students instead of 40, with $a = 5$ and
$s = 10$. Find the clear time, and compare it with the original 8 minutes.

$$T = \frac{Q}{s - a} = \frac{80}{10 - 5} = \frac{80}{5} = 16$$

Doubling the queue doubles the clear time. The model is **proportional** to
$Q$: twice as many students take twice as long. A proportional change is
gentle, and you can allow for it.

**Example 2.** The arrival rate rises from 5 to 9 each minute, with $Q = 40$ and
$s = 10$. Find the clear time.

$$T = \frac{40}{10 - 9} = \frac{40}{1} = 40$$

The arrival rate rose by 4 students each minute, which is less than doubling it.
The clear time rose from 8 minutes to 40 minutes, which is five times as long.
The model is far more sensitive to the arrival rate than to the queue length.

**Example 3.** Which assumption does the clear time depend on most?

The clear time depends on the gap $s - a$. A change in either rate changes the
gap directly, and a small gap makes the time large. The assumption that matters
most is therefore the one about the two rates: that students arrive at 5 each
minute and the till serves 10 each minute. If the till is slower than expected,
or the lunch rush is heavier than expected, the answer changes a great deal.

> **Watch out.** An assumption is not a mistake. A model with stated assumptions
> is useful, and a model with hidden assumptions is not. The mistake is to give
> the answer without saying what it rests on. Write the assumptions down before
> the numbers, so that a reader can see what the answer depends on.
>
> A second trap is to believe that a model with more detail is always better.
> Adding an assumption you cannot measure makes the model harder to use and no
> more accurate. Change one assumption at a time, so that you can see what
> caused the change.

## Progress check

Back to the chapter problem, with $Q = 40$, $a = 5$ and $s = 10$.

1. The clear time is 8 minutes. Find the clear time if the till serves only
   8 students each minute.
2. Find the clear time if the arrival rate rises to 6 students each minute.
3. Which of the two changes makes more difference? State which assumption the
   answer depends on most.

## You should now be able to

- say what an assumption is, and why it is a choice rather than a fact;
- state the assumptions behind the canteen model, and say what each one leaves
  out;
- explain what sensitivity means, and test it by changing one assumption;
- say which assumption an answer depends on most, and give a reason.
