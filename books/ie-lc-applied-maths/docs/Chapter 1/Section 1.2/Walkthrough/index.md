---
title: 1.2 Formulating a problem and decomposing it — Learn
chapter: 1
chapter_title: What mathematical modelling is
section: '1.2'
section_title: Formulating a problem and decomposing it
tier: O
refs:
- S1
kind: walkthrough
---

# 1.2 Formulating a problem and decomposing it — Learn

**Prerequisites:** Section 1.1, the five stages of the cycle.

**Objectives:** turn a vague question into a precise one; break a large question
into smaller questions; say when a question is not ready to model.

By the end of this section you can write a question that has one clear answer,
and split it into parts you can work on one at a time.

## A vague question has more than one answer

"How long is the queue?" has at least four meanings.

- How many students are in the queue at 12:30? That is a **number of people**.
- How far does the queue stretch along the corridor? That is a **length in
  metres**.
- How long does one student wait before being served? That is a **time**.
- How long until the queue is gone? That is a different **time**.

The word "long" covers both length and duration, and the question does not say
which one is wanted. A model cannot answer a question that has four answers.

## Formulating

**Formulating** means choosing one question and writing it so that the answer is
a number with a unit and a moment.

Compare these two questions.

- "How long is the queue?" — vague.
- "How many minutes does a student who joins at 12:30 wait before being
  served?" — precise.

The second question names the person, the moment and the unit. Any two people
who read it will work out the same thing, which is the test of a well-formed
question.

A precise question has three parts.

1. **What is measured** — a time, a number of people, a distance.
2. **The unit** — minutes, students, metres.
3. **The situation** — which person, which moment, which place.

## Decomposing

A large question is easier to answer when you break it into smaller ones.
**Decomposing** means splitting a question into parts that each have a clear
answer. The parts feed the main question.

The canteen question splits into four parts.

1. How many students are in the queue at 12:30?
2. How fast do students join the queue?
3. How fast does the till serve students?
4. How long does the queue in front of one student take to serve?

Parts 1 to 3 are **inputs**, because you can count them. Part 4 is the question
you are answering, and it uses the three inputs.

**Example 1.** Turn this into a precise question: "The bus is always late."

"Late" compares the bus with a timetable. A precise question is:

*How many minutes after the timetable does the 8:15 bus reach this stop, on an
average weekday morning?*

The parts are the timetable time, the stop, the days, the measurement in minutes
and the word "average". "Always" is replaced by "on an average weekday morning",
because one late bus is not a pattern.

**Example 2.** Decompose the canteen question into inputs and one output.

The output is the wait for a student who joins at 12:30, in minutes. The inputs
are the three quantities the wait depends on.

- $Q$: the number of students in the queue at 12:30, in students.
- $a$: the number of students who join each minute, in students per minute.
- $s$: the number of students the till serves each minute, in students per
  minute.

A student who joins at 12:30 waits for the students already in front of them.
The number in front is $Q$. The till serves $s$ of them each minute, so the wait
is

$$W = \frac{Q}{s}$$

where $W$ is the wait for that student, in minutes.

With $Q = 40$ and $s = 10$, the wait is $W = 40 \div 10 = 4$ minutes.

> **Watch out.** A question without a unit or a moment cannot be checked. "How
> long is the queue?" has no unit, so two people can answer it with two
> different numbers and both be right. Add the unit and the moment before you
> start. If you cannot add them, the question is not ready to model.
>
> A second trap is to answer a question nobody asked. The canteen manager may
> want the time until the queue is gone, while you work out the wait for one
> student. Both are times in minutes, and they are not the same number. Write
> the question down, and read it again before you report the answer.

## Progress check

Back to the chapter problem. Write the two questions the canteen model must
answer, in full.

1. The wait for a student who joins at 12:30, in minutes.
2. The time until the queue is gone, in minutes.

For each question, list the inputs it needs. Then say which of the two questions
the canteen manager cares about, and give a reason.

## You should now be able to

- explain why "how long is the queue" is vague, and give two different meanings;
- write a precise question with a measurement, a unit and a moment;
- decompose a question into inputs and an output;
- check that a question is ready to model before you start calculating.
