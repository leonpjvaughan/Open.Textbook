---
title: 1.4 Translating a situation into mathematics — Learn
chapter: 1
chapter_title: What mathematical modelling is
section: '1.4'
section_title: Translating a situation into mathematics
tier: O
refs:
- S1
kind: walkthrough
---

# 1.4 Translating a situation into mathematics — Learn

**Prerequisites:** Sections 1.1 to 1.3.

**Objectives:** choose letters and say what each one stands for; write the
relationship between them; check the units of a result; rearrange a
relationship to make another letter the subject.

By the end of this section you can turn the words of a question into symbols,
and check that the symbols make sense.

## Choosing letters

**Translating** means turning a situation into mathematics. The first step is to
choose a letter for each quantity, and to write down what it stands for and its
unit.

For the canteen:

| Letter | Meaning | Unit |
|---|---|---|
| $Q$ | the number of students in the queue at 12:30 | students |
| $a$ | the number of students who join each minute | students per minute |
| $s$ | the number of students the till serves each minute | students per minute |
| $W$ | the wait for a student who joins at 12:30 | minutes |
| $T$ | the time until the queue is gone | minutes |

Use the letters the question gives you, if it gives any. Otherwise choose
letters that remind you of the quantity.

## Writing the relationship

The wait is the number in front divided by the service rate.

$$W = \frac{Q}{s}$$

The clear time is the number in the queue divided by the net rate. The net rate
is the service rate minus the arrival rate.

$$T = \frac{Q}{s - a}$$

## Checking the units

A relationship is only worth using if its units balance. Treat the units like
algebra.

For the wait, the unit of the right-hand side is students divided by students
per minute. The students cancel, and dividing by "per minute" multiplies by
minutes.

$$\frac{\text{students}}{\text{students per minute}} = \text{minutes}$$

Minutes is the unit of $W$, so the relationship passes the check. The clear time
divides by the same kind of rate, so it also comes out in minutes.

## Rearranging

The same relationship can be rearranged to find a rate instead of a time.
Starting from

$$T = \frac{Q}{s - a}$$

multiply both sides by $s - a$:

$$T(s - a) = Q$$

divide both sides by $T$:

$$s - a = \frac{Q}{T}$$

and add $a$ to both sides:

$$s = a + \frac{Q}{T}$$

This form answers a different question: what service rate clears the queue in
time $T$?

**Example 1.** A queue of 45 students clears in 9 minutes. Find the net rate,
and find the service rate when 4 students join each minute.

The net rate is

$$s - a = \frac{Q}{T} = \frac{45}{9} = 5$$

students each minute. Then

$$s = a + 5 = 4 + 5 = 9$$

so the till serves 9 students each minute.

**Example 2.** A queue of 40 students must be gone in 5 minutes. Students join
at 4 each minute. Find the service rate the till needs.

$$s = a + \frac{Q}{T} = 4 + \frac{40}{5} = 4 + 8 = 12$$

The till must serve 12 students each minute.

**Example 3.** A cyclist travels at a steady 15 m/s for 8 seconds. Write the
relationship for the distance, and check its units.

The distance is the speed multiplied by the time:

$$d = vt$$

where $d$ is the distance in metres, $v$ is the speed in metres per second and
$t$ is the time in seconds.

The unit of the right-hand side is metres per second multiplied by seconds. The
seconds cancel, leaving metres.

$$\frac{\text{metres}}{\text{second}} \times \text{second} = \text{metres}$$

Metres is the unit of a distance, so the relationship passes the check. The
distance is $d = 15 \times 8 = 120$ m.

> **Watch out.** The common error here is to subtract the wrong way round and
> write $T = \dfrac{Q}{a - s}$. When $a < s$ this gives a negative time, which is
> impossible. A negative time is a signal that the rates are the wrong way
> round: the queue drains at the service rate minus the arrival rate, so
> $s - a$ is the positive one.
>
> A second error is to add quantities with different units. A rate in students
> per minute and a total in students cannot be added. Multiply or divide to
> combine them, and add only like with like.

## Progress check

Back to the chapter problem. Write the relationship for the wait and the
relationship for the clear time, with every letter defined.

1. Check the units of both relationships.
2. The canteen manager wants the queue gone in 4 minutes. With $Q = 40$ and
   $a = 5$, find the service rate the till needs.
3. Say whether one till can serve that fast, and give a reason.

## You should now be able to

- choose a letter for each quantity, and give its unit;
- write the relationship between a queue, a rate and a time;
- check a relationship by treating the units like algebra;
- rearrange the clear-time relationship to make $s$ or $a$ the subject.
