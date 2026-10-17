---
title: 1.3 Assumptions and what they cost you — Practise with help
chapter: 1
chapter_title: What mathematical modelling is
section: '1.3'
section_title: Assumptions and what they cost you
tier: O
refs:
- S1
kind: guided-problems
---

# 1.3 Assumptions and what they cost you — Practise with help

## Warm-up: remember

1. A queue holds 36 students and drains at 6 students each minute. Find the time
   until it is gone, in minutes.
2. Write down one thing the canteen model leaves out.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $36 \div 6 = 6$ minutes.
2. For example, it leaves out the slow customer who holds up the till. Any
   assumption that the situation does not quite match is a good answer.

</details>

:::figure warm-up-gate


## Practise with help

**1.** A queue holds 40 students and the till serves 8 students each minute.
Students join at 5 each minute. Find the clear time, in minutes, as an exact
fraction.

<details markdown="1">
<summary>Hint</summary>

Find the net rate first, then divide the queue by it.

<details markdown="1">
<summary>Next step</summary>

The net rate is $8 - 5 = 3$ students each minute.

<details markdown="1">
<summary>Full working</summary>

$$T = \frac{Q}{s - a} = \frac{40}{8 - 5} = \frac{40}{3}$$

The clear time is $\dfrac{40}{3}$ minutes, which is about 13.3 minutes. The till
is slower than in the chapter problem, and the clear time is much longer.

</details>
</details>
</details>

**2.** A queue holds 40 students and students join at 5 each minute. Find the
clear time, in minutes, when the till serves 6 students each minute.

<details markdown="1">
<summary>Hint</summary>

The gap between the service rate and the arrival rate is now small.

<details markdown="1">
<summary>Next step</summary>

$6 - 5 = 1$ student each minute.

<details markdown="1">
<summary>Full working</summary>

$$T = \frac{40}{6 - 5} = \frac{40}{1} = 40$$

The clear time is 40 minutes. The service rate fell by only 2 students each
minute, and the clear time rose from 8 minutes to 40 minutes.

</details>
</details>
</details>

**3.** A queue holds 80 students, students join at 5 each minute and the till
serves 10 each minute. Find the clear time, in minutes.

<details markdown="1">
<summary>Hint</summary>

The queue is twice the size of the one in the chapter problem.

<details markdown="1">
<summary>Next step</summary>

$80 \div (10 - 5)$.

<details markdown="1">
<summary>Full working</summary>

$$T = \frac{80}{10 - 5} = \frac{80}{5} = 16$$

The clear time is 16 minutes, which is twice the 8 minutes for a queue of 40.
Doubling the queue doubles the clear time.

</details>
</details>
</details>

**4.** A queue holds 40 students and the till serves 10 each minute. Find the
clear time, in minutes, when students join at 9 each minute.

<details markdown="1">
<summary>Hint</summary>

The net rate is the difference between the two rates.

<details markdown="1">
<summary>Next step</summary>

$10 - 9 = 1$ student each minute.

<details markdown="1">
<summary>Full working</summary>

$$T = \frac{40}{10 - 9} = \frac{40}{1} = 40$$

The clear time is 40 minutes. The arrival rate rose by 4 students each minute,
and the clear time rose from 8 minutes to 40 minutes.

</details>
</details>
</details>

**5.** A queue holds 40 students and the till serves 5 students each minute.
Students join at 5 each minute. Explain what happens to the queue.

<details markdown="1">
<summary>Hint</summary>

Compare the two rates. What is the net rate?

<details markdown="1">
<summary>Next step</summary>

$5 - 5 = 0$ students each minute.

<details markdown="1">
<summary>Full working</summary>

The net rate is $5 - 5 = 0$, so the queue neither grows nor shrinks. The till
serves exactly as many students as arrive. The queue stays at 40 students and
never clears. This is the boundary case: when the service rate equals the
arrival rate, the model gives no clear time at all.

</details>
</details>
</details>

**6.** State two assumptions of the canteen model, and say what each one leaves
out.

<details markdown="1">
<summary>Hint</summary>

Think about how students arrive and how the till works.

<details markdown="1">
<summary>Next step</summary>

One assumption is about the arrival rate, and another is about the service rate.

<details markdown="1">
<summary>Full working</summary>

- Students arrive at a steady rate of 5 each minute. This leaves out the lunch
  rush, when many arrive at once.
- The till serves at a steady rate of 10 each minute. This leaves out the slow
  customer, who holds up the line for everyone behind.

Other answers are possible, such as "nobody leaves the queue" or "there is one
till". For each one, say what the real situation does that the assumption does
not.

</details>
</details>
</details>

**7.** A model gives a clear time of 8 minutes. The real queue took 40 minutes
to clear. Say which assumption you would examine first, and give a reason.

<details markdown="1">
<summary>Hint</summary>

Which assumptions can change the clear time by a factor of five?

<details markdown="1">
<summary>Next step</summary>

The clear time is the queue divided by the gap between the two rates. A small
gap makes a large time.

<details markdown="1">
<summary>Full working</summary>

Examine the two rates first, because the clear time depends on their gap. If the
till served only 6 students each minute instead of 10, the gap would be
$6 - 5 = 1$, and the clear time would be $40 \div 1 = 40$ minutes, which matches
the measurement. A change to the queue length would have to be much larger to
have the same effect: a queue of 400 students would be needed.

</details>
</details>
</details>
