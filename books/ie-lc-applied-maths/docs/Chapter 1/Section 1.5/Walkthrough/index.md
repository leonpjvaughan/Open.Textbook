---
title: 1.5 Computing and interpreting a solution — Learn
chapter: 1
chapter_title: What mathematical modelling is
section: '1.5'
section_title: Computing and interpreting a solution
tier: O
refs:
- S1
kind: walkthrough
---

# 1.5 Computing and interpreting a solution — Learn

**Prerequisites:** Sections 1.1 to 1.4, including rearranging a relationship.

**Objectives:** substitute numbers into a relationship; keep the units; round an
answer to a sensible precision; say what the answer means in the real situation;
check an answer against the situation.

By the end of this section you can work out a solution and explain what it
means, not only what number it is.

## Substituting

**Computing** means putting the numbers into the relationship and working out
the answer. Write the relationship first, then substitute, then calculate. Keep
the unit beside every number.

For the canteen, with $Q = 40$, $a = 5$ and $s = 10$:

$$W = \frac{Q}{s} = \frac{40}{10} = 4$$

The wait is 4 minutes.

$$T = \frac{Q}{s - a} = \frac{40}{10 - 5} = \frac{40}{5} = 8$$

The queue is gone after 8 minutes.

## Interpreting

An answer is a number with a unit and a meaning. "Four" is not the answer. "A
student who joins at 12:30 waits about 4 minutes" is the answer.

- The wait is 4 minutes, so a student who joins at 12:30 is served at about
  12:34.
- The clear time is 8 minutes, so the queue is gone at about 12:38.

The two numbers are different because the questions are different. The student
at 12:30 waits only for the 40 students in front, and those are served in
4 minutes. The queue itself lasts longer, because new students keep joining
until 12:38.

## The wait at a later time

The queue drains at the net rate, so its length falls as time passes. The wait
falls with it.

**Example 1.** Find the wait for a student who joins at 12:35, with $Q = 40$,
$a = 5$ and $s = 10$.

The queue drains at $s - a = 5$ students each minute. After 5 minutes it holds

$$40 - 5 \times 5 = 15$$

students. The wait for a student joining then is

$$W = \frac{15}{10} = 1.5$$

minutes. The wait has fallen from 4 minutes to 1.5 minutes, because the queue
has had five minutes to drain.

## Rounding

Round the final answer, and round it to a precision the situation can support.
The canteen model is rough, so a wait of 4 minutes is honest and a wait of
3.97 minutes is not.

- Round to the nearest whole minute when the model is rough.
- Round to one decimal place when the answer needs more care.
- Keep the exact value in the middle of a calculation. Round once, at the end.

**Example 2.** A queue of 40 students clears at a net rate of 6 students each
minute. Find the clear time to one decimal place.

$$T = \frac{40}{6} = 6.666\ldots$$

The clear time is about 6.7 minutes.

**Example 3.** In Example 2, a student rounds 6.666 to 7 and then works out that
$7 \times 6 = 42$ students are served in that time. Explain the error.

The queue holds 40 students, and 42 is more than 40. The rounding added two
students who were never there. Rounding early moves the error into the next
step, and every later step builds on it. Keep $40 \div 6$ exact and round the
final answer once.

## Checking

A solution is not finished until you have checked it against the situation.

- **Is the sign right?** A time cannot be negative, and a queue length cannot be
  negative.
- **Is the size right?** A wait of 400 minutes in a canteen is wrong, and so is
  a wait of 0.004 minutes.
- **Does the arithmetic reverse?** Multiply the answer back by the rate. If the
  till serves 10 students each minute for 4 minutes, it serves 40 students,
  which is the queue. The check passes.

> **Watch out.** Rounding too early is the most common computing error. If you
> round a rate before you divide, the error is carried into every later step.
> Keep the exact fraction, and round the final answer once.
>
> A second trap is to report a number with no unit. "The answer is 4" does not
> say whether the wait is 4 minutes, 4 seconds or 4 students. Write the unit
> every time.

## Progress check

Back to the chapter problem, with $Q = 40$, $a = 5$ and $s = 10$.

1. Find the wait for a student who joins at 12:35.
2. Find the wait for a student who joins at 12:37.
3. Say what happens to a student who joins at 12:39, and give a reason.

## You should now be able to

- substitute numbers into a relationship, keeping the units;
- say what a solution means in the real situation, not only what number it is;
- round an answer once, at the end, to a precision the situation supports;
- check a solution by reversing the arithmetic and by asking whether it is
  sensible.
