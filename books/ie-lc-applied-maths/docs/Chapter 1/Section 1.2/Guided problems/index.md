---
title: 1.2 Formulating a problem and decomposing it — Practise with help
chapter: 1
chapter_title: What mathematical modelling is
section: '1.2'
section_title: Formulating a problem and decomposing it
tier: O
refs:
- S1
kind: guided-problems
---

# 1.2 Formulating a problem and decomposing it — Practise with help

## Warm-up: remember

1. A model has five stages. Name the stage at which you decide the question.
2. A tank holds 300 litres and fills at 10 litres each minute. Find the time to
   fill it, in minutes.

<details markdown="1">
<summary>Answers and feedback</summary>

1. Formulate. It comes first, because a model cannot start without a question.
2. $300 \div 10 = 30$ minutes.

</details>

:::figure warm-up-gate


## Practise with help

**1.** Rewrite this question so that it has one clear answer: "How long is the
queue at the bank?"

<details markdown="1">
<summary>Hint</summary>

Add a measurement, a unit and a moment.

<details markdown="1">
<summary>Next step</summary>

Decide whether you are measuring people, a distance or a time, and say which
moment.

<details markdown="1">
<summary>Full working</summary>

One precise version is: "How many minutes does a customer who joins the queue at
09:00 wait before being served?" It names what is measured (a time), the unit
(minutes) and the moment (a customer joining at 09:00).

Another version counts people instead: "How many customers are in the queue at
09:00?" Both are precise, and they answer different questions. The vague
original could mean either.

</details>
</details>
</details>

**2.** List the three inputs the wait for a student at the back of a canteen
queue depends on, with the unit of each.

<details markdown="1">
<summary>Hint</summary>

Think about what is already in the queue, and what changes it.

<details markdown="1">
<summary>Next step</summary>

The queue changes because students join and because the till serves them.

<details markdown="1">
<summary>Full working</summary>

- The number of students already in the queue, in students.
- The rate at which students join, in students per minute.
- The rate at which the till serves students, in students per minute.

The wait for a student at the back is the number already in the queue divided by
the service rate. The arrival rate does not change the wait for that student,
because the new arrivals join behind them.

</details>
</details>
</details>

**3.** A canteen queue holds 40 students at 12:30. The till serves 10 students
each minute. Find the wait, in minutes, for a student who joins at 12:30.

<details markdown="1">
<summary>Hint</summary>

The student waits for the 40 students in front.

<details markdown="1">
<summary>Next step</summary>

The till serves 10 of them each minute, so divide 40 by 10.

<details markdown="1">
<summary>Full working</summary>

$$W = \frac{Q}{s} = \frac{40}{10} = 4$$

Here $W$ is the wait in minutes, $Q$ is the number of students in the queue
and $s$ is the service rate in students each minute.

The student waits 4 minutes, so they are served at about 12:34. Check it:
$10 \times 4 = 40$ students are served in that time.

</details>
</details>
</details>

**4.** A canteen queue holds 40 students at 12:30. Students join at 5 each
minute, and the till serves 10 each minute. Find the number in the queue
3 minutes later.

<details markdown="1">
<summary>Hint</summary>

The queue changes by the net rate, which is the service rate minus the arrival
rate.

<details markdown="1">
<summary>Next step</summary>

The net rate is $10 - 5 = 5$ students each minute.

<details markdown="1">
<summary>Full working</summary>

In 3 minutes the queue falls by $5 \times 3 = 15$ students, so

$$40 - 15 = 25$$

students remain. The queue is draining, and it will be empty when
$40 - 5t = 0$, which is at $t = 8$ minutes.

</details>
</details>
</details>

**5.** A canteen queue holds 45 students at 12:30. It is gone 9 minutes later.
Find the net rate at which the queue shrank, in students per minute.

<details markdown="1">
<summary>Hint</summary>

The net rate is the number who left the queue divided by the time.

<details markdown="1">
<summary>Next step</summary>

$45 \div 9$.

<details markdown="1">
<summary>Full working</summary>

$$s - a = \frac{Q}{T} = \frac{45}{9} = 5$$

Here $T$ is the time until the queue is gone, in minutes, and $a$ is the
arrival rate in students each minute.

The queue shrank by 5 students each minute. If 4 students joined each minute,
then the till served $5 + 4 = 9$ each minute.

</details>
</details>
</details>

**6.** A tank holds 450 litres. A tap puts water in at 20 litres each minute and
a leak takes water out at 5 litres each minute. Find the time to fill the tank,
in minutes.

<details markdown="1">
<summary>Hint</summary>

This is one output with two inputs. Find the net rate first.

<details markdown="1">
<summary>Next step</summary>

The net rate is $20 - 5 = 15$ litres each minute.

<details markdown="1">
<summary>Full working</summary>

$$T = \frac{450}{20 - 5} = \frac{450}{15} = 30$$

The tank takes 30 minutes to fill. The leak adds 10 minutes compared with a tap
on its own, because the net rate is lower.

</details>
</details>
</details>

**7.** Explain the difference between these two questions, and give an answer to
each for a queue of 40 students served at 10 each minute: "How long is the
queue?" and "How long is the wait?"

<details markdown="1">
<summary>Hint</summary>

One answer counts people, and the other measures time.

<details markdown="1">
<summary>Next step</summary>

The first question asks for a number of students. The second asks for a time in
minutes.

<details markdown="1">
<summary>Full working</summary>

The first question asks for a length in people, so the answer is 40 students.
The second asks for a time, so the answer is

$$W = \frac{40}{10} = 4$$

minutes. Both answers are correct, because the two questions ask for different
things. Writing the unit beside each answer makes the difference clear.

</details>
</details>
</details>
