---
title: 1.6 Evaluating, refining and reporting — Practise with help
chapter: 1
chapter_title: What mathematical modelling is
section: '1.6'
section_title: Evaluating, refining and reporting
tier: O
refs:
- S1
kind: guided-problems
---

# 1.6 Evaluating, refining and reporting — Practise with help

## Warm-up: remember

1. A queue holds 40 students and the till serves 10 each minute. Find the wait
   for a student at the back, in minutes.
2. A model predicts 5 minutes and the measurement is 7 minutes. Say whether the
   model is too high or too low.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $40 \div 10 = 4$ minutes.
2. The model is too low, because 5 is less than the measured 7.

</details>

:::figure warm-up-gate


## Practise with help

**1.** A model predicts a wait of 4 minutes, but the measured wait is 6 minutes.
The service rate is 10 students each minute. Find the queue length that gives a
wait of 6 minutes.

<details markdown="1">
<summary>Hint</summary>

Rearrange $W = \dfrac{Q}{s}$ to make $Q$ the subject.

<details markdown="1">
<summary>Next step</summary>

$Q = W \times s = 6 \times 10$.

<details markdown="1">
<summary>Full working</summary>

$$Q = Ws = 6 \times 10 = 60$$

Here $Q$ is the number of students in the queue, $W$ is the wait in minutes
and $s$ is the service rate in students each minute.

The queue held 60 students, not 40. The starting queue was the assumption that
was wrong, and the corrected model now matches the measurement.

</details>
</details>
</details>

**2.** A queue holds 40 students and the till serves 10 each minute. The measured
arrival rate is 6 each minute. Find the clear time, in minutes.

<details markdown="1">
<summary>Hint</summary>

The clear time is the queue divided by the net rate.

<details markdown="1">
<summary>Next step</summary>

$10 - 6 = 4$ students each minute.

<details markdown="1">
<summary>Full working</summary>

$$T = \frac{Q}{s - a} = \frac{40}{10 - 6} = \frac{40}{4} = 10$$

Here $T$ is the clear time in minutes and $a$ is the arrival rate in students
each minute.

The clear time is 10 minutes. The model in the chapter problem used an arrival
rate of 5, which gave 8 minutes.

</details>
</details>
</details>

**3.** A queue holds 40 students and the till serves 10 each minute. The measured
arrival rate is 7 each minute. Find the clear time, in minutes, as an exact
fraction.

<details markdown="1">
<summary>Hint</summary>

The net rate is now small.

<details markdown="1">
<summary>Next step</summary>

$10 - 7 = 3$ students each minute.

<details markdown="1">
<summary>Full working</summary>

$$T = \frac{40}{10 - 7} = \frac{40}{3}$$

The clear time is $\dfrac{40}{3}$ minutes, which is about 13.3 minutes. One
extra student each minute stretched the clear time from 8 minutes to more than
13 minutes.

</details>
</details>
</details>

**4.** A queue holds 40 students and students join at 5 each minute. A second
till opens, so the service rate becomes 20 students each minute. Find the clear
time, in minutes, correct to 2 significant figures.

<details markdown="1">
<summary>Hint</summary>

Use the new service rate, and round once at the end.

<details markdown="1">
<summary>Next step</summary>

$40 \div (20 - 5) = 40 \div 15$.

<details markdown="1">
<summary>Full working</summary>

$$T = \frac{40}{20 - 5} = \frac{40}{15} = 2.666\ldots$$

The clear time is 2.7 minutes to 2 significant figures. It fell from 8 minutes
to about 2.7 minutes, which shows how much the service rate matters.

</details>
</details>
</details>

**5.** A measurement of the arrival rate could be 5 or 6 students each minute.
The queue holds 40 students and the till serves 10 each minute. Explain why the
clear time should be reported as a range.

<details markdown="1">
<summary>Hint</summary>

Find the clear time for each of the two rates.

<details markdown="1">
<summary>Next step</summary>

The rate 5 gives 8 minutes and the rate 6 gives 10 minutes.

<details markdown="1">
<summary>Full working</summary>

The rate 5 gives $40 \div 5 = 8$ minutes, and the rate 6 gives
$40 \div 4 = 10$ minutes. The clear time is only known to lie between those two
values. Reporting the range shows the reader how much the answer depends on the
measurement. A single number would claim more certainty than the data supports.

</details>
</details>
</details>

**6.** A till serves 10 students each minute on average, but one student in five
takes twice as long as the others. Explain why the real queue is longer than the
model predicts.

<details markdown="1">
<summary>Hint</summary>

The average rate has not changed. Think about what happens while one slow
student is being served.

<details markdown="1">
<summary>Next step</summary>

The till is blocked for longer than usual, and the queue behind grows.

<details markdown="1">
<summary>Full working</summary>

The average service rate is still 10 each minute, so the model's arithmetic is
unchanged. But a slow student blocks the till, and everyone behind waits while
it is busy. The queue is longer than a steady rate predicts, even though the
average rate is the same. The model leaves out variability.

</details>
</details>
</details>

**7.** A model disagrees with the data. Explain why you should change one
assumption at a time when you refine it.

<details markdown="1">
<summary>Hint</summary>

Suppose you changed two assumptions at once and the new answer matched.

<details markdown="1">
<summary>Next step</summary>

You would not know which change made the difference, so you could not say what
the model had learned.

<details markdown="1">
<summary>Full working</summary>

If you change two assumptions at once, you cannot tell which change caused the
new answer. Change one assumption, work the model again, and compare the new
answer with the data. The change is kept only if the data supports it. That way
each assumption in the model has earned its place.

</details>
</details>
</details>
