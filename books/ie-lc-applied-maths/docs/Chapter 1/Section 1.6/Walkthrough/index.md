---
title: 1.6 Evaluating, refining and reporting — Learn
chapter: 1
chapter_title: What mathematical modelling is
section: '1.6'
section_title: Evaluating, refining and reporting
tier: O
refs:
- S1
kind: walkthrough
---

# 1.6 Evaluating, refining and reporting — Learn

**Prerequisites:** Sections 1.1 to 1.5.

**Objectives:** compare a model with data; decide which assumption to change;
refine one assumption at a time; report what the model can and cannot do.

By the end of this section you can test a model against the real situation and
improve it without losing track of what changed.

## Evaluating

**Evaluating** means comparing the model's answer with what actually happens.
The comparison needs data, and data means counting or measuring.

For the canteen, count the real queue for a few minutes.

- Count how many students join each minute.
- Time how long the till takes per student.
- Count the queue at 12:30.
- Time how long one student actually waits.

Suppose the model predicts a wait of 4 minutes and the real wait is 6 minutes.
The model is too low. That is a finding, not a failure: it tells you which
assumption to look at.

## Refining

**Refining** means changing an assumption and going round the cycle again.
Change one assumption at a time, so that you can see which change caused which
effect.

The model's wait is $W = \dfrac{Q}{s}$, where $Q$ is the number of students in
the queue and $s$ is the service rate in students each minute. To make the
wait longer, either $Q$ is larger or $s$ is smaller. Count again: if 60
students are already queuing at 12:30, the wait becomes

$$W = \frac{60}{10} = 6$$

minutes, which matches the measurement. The assumption about the starting queue
was the one that was wrong.

**Example 1.** The till serves 10 students each minute on average, but one
student in five takes twice as long as the others. Explain why the real queue is
longer than the model predicts.

The average service rate is still 10 each minute, so the model's arithmetic is
unchanged. But the slow students block the till, and the students behind them
wait while it is busy. The queue is longer than a steady rate predicts, even
though the average rate is the same. The model leaves out **variability**, which
is how much the times differ from one another.

**Example 2.** The measured arrival rate is 5 each minute, but it might be 6.
Find the clear time for both rates, with $Q = 40$ and $s = 10$.

At $a = 5$:

$$T = \frac{40}{10 - 5} = 8$$

Here $T$ is the clear time in minutes and $a$ is the arrival rate in students
each minute.

At $a = 6$:

$$T = \frac{40}{10 - 6} = 10$$

One extra student each minute changes the answer by 2 minutes, which is a
quarter of the original. Report the clear time as "between 8 and 10 minutes",
not as a single number.

**Example 3.** A second till opens, so the service rate becomes 20 students each
minute. What happens to the clear time?

With $Q = 40$ and $a = 5$:

$$T = \frac{40}{20 - 5} = \frac{40}{15} = 2.7$$

minutes, to one decimal place. The clear time falls from 8 minutes to about
2.7 minutes. Opening a second till changes one assumption, the service rate, and
its effect is large.

> **Watch out.** Refining a model is not the same as making it better. Adding
> detail that you cannot measure makes the model harder to use and no more
> accurate. Change one assumption at a time, and check the new answer against
> the data before you keep the change.
>
> A second trap is to hide an assumption that did not work. If the data
> disagrees with the model, say so. The disagreement is the most useful part of
> the report, because it shows where the next refinement should go.

## Reporting

A model is finished when someone else can read what you did and check it. A
short report has five parts.

1. **The question**, written precisely, with its unit.
2. **The assumptions**, listed before the mathematics.
3. **The model**, with every letter defined and its unit given.
4. **The solution**, with the working and the units.
5. **The evaluation**, comparing the answer with data and saying what would
   change it.

Section 1.7 takes each part in turn.

## Progress check

Back to the chapter problem. The model predicts a clear time of 8 minutes, but
the canteen is still busy after 11 minutes.

1. Which assumption would you check first? Give a reason.
2. The measured arrival rate is 7 students each minute. Find the clear time with
   $s = 10$ and $Q = 40$.
3. Write one sentence that reports the refined answer honestly.

## You should now be able to

- compare a model's answer with measured data, and say whether the model is too
  high or too low;
- say what variability is, and why a steady average can understate a queue;
- refine one assumption at a time, and report the answer as a range when the
  data is uncertain;
- say what a short report must contain.
