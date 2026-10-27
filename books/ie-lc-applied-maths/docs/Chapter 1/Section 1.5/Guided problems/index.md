---
title: 1.5 Computing and interpreting a solution — Practise with help
chapter: 1
chapter_title: What mathematical modelling is
section: '1.5'
section_title: Computing and interpreting a solution
tier: O
refs:
- S1
kind: guided-problems
---

# 1.5 Computing and interpreting a solution — Practise with help

## Warm-up: remember

1. Write $40 \div 3$ as a decimal, correct to one decimal place.
2. A queue holds 36 students and the till serves 9 each minute. Find the wait
   for a student at the back, in minutes.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $40 \div 3 = 13.333\ldots$, which is 13.3 to one decimal place.
2. $36 \div 9 = 4$ minutes.

</details>

:::figure warm-up-gate


## Practise with help

**1.** A canteen queue holds 40 students at 12:30. The till serves 10 students
each minute. Find the wait for a student who joins at 12:30, in minutes.

<details markdown="1">
<summary>Hint</summary>

The wait is the queue divided by the service rate.

<details markdown="1">
<summary>Next step</summary>

$40 \div 10$.

<details markdown="1">
<summary>Full working</summary>

$$W = \frac{Q}{s} = \frac{40}{10} = 4$$

Here $W$ is the wait in minutes, $Q$ is the number of students in the queue
and $s$ is the service rate in students each minute.

The wait is 4 minutes, so the student is served at about 12:34. Check it:
$10 \times 4 = 40$ students are served in that time.

</details>
</details>
</details>

**2.** A canteen queue holds 40 students at 12:30. Students join at 5 each
minute and the till serves 10 each minute. Find the time until the queue is
gone, in minutes.

<details markdown="1">
<summary>Hint</summary>

The queue drains at the service rate minus the arrival rate.

<details markdown="1">
<summary>Next step</summary>

$10 - 5 = 5$ students each minute.

<details markdown="1">
<summary>Full working</summary>

$$T = \frac{Q}{s - a} = \frac{40}{10 - 5} = \frac{40}{5} = 8$$

Here $T$ is the clear time in minutes and $a$ is the arrival rate in students
each minute.

The queue is gone after 8 minutes, at about 12:38. Notice that this is longer
than the 4-minute wait in question 1, because the questions are different.

</details>
</details>
</details>

**3.** A canteen queue holds 40 students at 12:30. Students join at 5 each
minute and the till serves 10 each minute. Find the wait for a student who joins
at 12:35, in minutes.

<details markdown="1">
<summary>Hint</summary>

First find the number in the queue at 12:35, then divide by the service rate.

<details markdown="1">
<summary>Next step</summary>

The queue falls by 5 each minute, so after 5 minutes it holds
$40 - 25 = 15$ students.

<details markdown="1">
<summary>Full working</summary>

$$W = \frac{40 - 5 \times 5}{10} = \frac{15}{10} = 1.5$$

The wait is 1.5 minutes. It has fallen from 4 minutes, because the queue has had
five minutes to drain.

</details>
</details>
</details>

**4.** A queue of 40 students clears at a net rate of 3 students each minute.
Find the clear time, in minutes, correct to 3 significant figures.

<details markdown="1">
<summary>Hint</summary>

Divide first, then round once.

<details markdown="1">
<summary>Next step</summary>

$40 \div 3 = 13.333\ldots$.

<details markdown="1">
<summary>Full working</summary>

$$T = \frac{40}{3} = 13.333\ldots$$

The clear time is 13.3 minutes to 3 significant figures. The value is rounded
once, at the end, so no error is carried into the answer.

</details>
</details>
</details>

**5.** A queue of 40 students clears at a net rate of 6 students each minute.
Find the clear time, in minutes, correct to 2 significant figures.

<details markdown="1">
<summary>Hint</summary>

$40 \div 6$ does not come out exactly.

<details markdown="1">
<summary>Next step</summary>

$40 \div 6 = 6.666\ldots$.

<details markdown="1">
<summary>Full working</summary>

$$T = \frac{40}{6} = 6.666\ldots$$

The clear time is 6.7 minutes to 2 significant figures. Rounding the rate to
7 first would give $40 \div 7 = 5.7$ minutes, which is a different answer.

</details>
</details>
</details>

**6.** A model gives a wait of 4 minutes, with a service rate of 10 students
each minute. Explain how to check the answer by reversing the arithmetic.

<details markdown="1">
<summary>Hint</summary>

Start from the answer and the rate, and see whether the queue comes back.

<details markdown="1">
<summary>Next step</summary>

Multiply the wait by the service rate.

<details markdown="1">
<summary>Full working</summary>

Multiply the wait by the service rate: $4 \times 10 = 40$ students. If the queue
held 40 students, the two numbers agree and the answer passes the check. If they
disagree, either the arithmetic is wrong or the relationship is wrong, and both
are worth checking.

</details>
</details>
</details>

**7.** Explain why "the answer is 4" is not a complete answer to a question
about a queue.

<details markdown="1">
<summary>Hint</summary>

Think about what the number 4 could measure.

<details markdown="1">
<summary>Next step</summary>

The number could be a time, a number of students or a distance.

<details markdown="1">
<summary>Full working</summary>

The number 4 on its own could mean 4 minutes, 4 seconds or 4 students, and those
are different answers. Writing the unit says which quantity the number measures.
It also lets a reader check the answer against the situation: 4 minutes is
sensible for a canteen, while 4 seconds is not.

</details>
</details>
</details>
