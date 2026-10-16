---
title: 8.3 Recurrence relations as discrete models — Practise with help
chapter: 8
chapter_title: Modelling a changing world
section: '8.3'
section_title: Recurrence relations as discrete models
tier: O
refs:
- S4
kind: guided-problems
---

# 8.3 Recurrence relations as discrete models — Practise with help

## Warm-up: remember

1. Increase $80$ by $15\%$.
2. Decrease $250$ by $20\%$.
3. Write $1.07$ as a percentage increase.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $80 \times 1.15 = 92$. A $15\%$ increase uses the multiplier $1.15$.
2. $250 \times 0.8 = 200$. A $20\%$ decrease uses the multiplier $0.8$.
3. $1.07$ is an increase of $7\%$, because $1.07 = 1 + 0.07$.

</details>

## Practise with help

**1.** €500 is placed in an account that grows by $4\%$ each year. Write a
recurrence for the balance $u_n$ after $n$ years, with its starting value.

<details markdown="1">
<summary>Hint</summary>

A $4\%$ increase is a multiplier of $1.04$.

<details markdown="1">
<summary>Next step</summary>

Each year multiplies the balance by $1.04$, and the starting balance is $500$.

<details markdown="1">
<summary>Full working</summary>

$$u_{n+1} = 1.04u_n, \qquad u_0 = 500.$$

The value $1.04$ keeps the whole balance and adds $4\%$ of it.

</details>
</details>
</details>

**2.** For the account in question 1, find the balance after three years.

<details markdown="1">
<summary>Hint</summary>

Iterate the recurrence three times, or use $u_3 = 500 \times 1.04^3$.

<details markdown="1">
<summary>Next step</summary>

$u_1 = 520$, $u_2 = 540.8$.

<details markdown="1">
<summary>Full working</summary>

$$u_1 = 500 \times 1.04 = 520$$

$$u_2 = 520 \times 1.04 = 540.8$$

$$u_3 = 540.8 \times 1.04 = 562.432$$

The balance after three years is about €562.43.

</details>
</details>
</details>

**3.** A patient takes $30$ mg of a medicine each day, and half of the medicine
in the body is cleared each day. Write a recurrence for the amount $u_n$,
measured just after a dose.

<details markdown="1">
<summary>Hint</summary>

Half remains, then the dose is added.

<details markdown="1">
<summary>Next step</summary>

$u_{n+1} = 0.5u_n + 30$.

<details markdown="1">
<summary>Full working</summary>

$$u_{n+1} = 0.5u_n + 30.$$

The term $0.5u_n$ is what remains from the day before, and the constant $30$ is
the new dose. The starting value depends on whether the first dose is counted;
take $u_0 = 0$ just before the first dose.

</details>
</details>
</details>

**4.** For the medicine in question 3, find $u_3$ starting from $u_0 = 0$.

<details markdown="1">
<summary>Hint</summary>

Apply the rule three times.

<details markdown="1">
<summary>Next step</summary>

$u_1 = 30$, $u_2 = 45$.

<details markdown="1">
<summary>Full working</summary>

$$u_1 = 0.5 \times 0 + 30 = 30$$

$$u_2 = 0.5 \times 30 + 30 = 45$$

$$u_3 = 0.5 \times 45 + 30 = 52.5$$

The amount after three doses is $52.5$ mg, and it is rising towards the fixed
point.

</details>
</details>
</details>

**5.** Find the fixed point of the recurrence $u_{n+1} = 0.6u_n + 12$.

<details markdown="1">
<summary>Hint</summary>

Replace both $u_{n+1}$ and $u_n$ by $L$.

<details markdown="1">
<summary>Next step</summary>

$L = 0.6L + 12$.

<details markdown="1">
<summary>Full working</summary>

$$L = 0.6L + 12, \qquad 0.4L = 12, \qquad L = 30.$$

If the sequence reaches $30$, it stays at $30$. Starting anywhere else, it moves
towards $30$ because the multiplier $0.6$ is between $-1$ and $1$.

</details>
</details>
</details>

**6.** A recurrence is $u_{n+1} = 1.1u_n - 5$ with $u_0 = 20$. Find $u_3$.

<details markdown="1">
<summary>Hint</summary>

Multiply by $1.1$, then subtract $5$, at each step.

<details markdown="1">
<summary>Next step</summary>

$u_1 = 1.1 \times 20 - 5 = 17$.

<details markdown="1">
<summary>Full working</summary>

$$u_1 = 1.1 \times 20 - 5 = 22 - 5 = 17$$

$$u_2 = 1.1 \times 17 - 5 = 18.7 - 5 = 13.7$$

$$u_3 = 1.1 \times 13.7 - 5 = 15.07 - 5 = 10.07$$

The values are falling. The multiplier $1.1$ is above $1$, so the fixed point is
not stable and the sequence will eventually turn and grow.

</details>
</details>
</details>

**7.** A student writes: "A $5\%$ increase each year means I add $5$ each year."
Explain the mistake.

<details markdown="1">
<summary>Hint</summary>

A percentage of what?

<details markdown="1">
<summary>Next step</summary>

The $5\%$ is taken from the current value, which changes each year.

<details markdown="1">
<summary>Full working</summary>

A $5\%$ increase adds $5\%$ **of the current value**, not $5$ units. The correct
step is to multiply by $1.05$. The amount added is $0.05u_n$, so it grows as the
balance grows. Writing $u_{n+1} = u_n + 5$ describes a different model, an
arithmetic sequence that adds the same amount every year.

</details>
</details>
</details>

## A question from Section 8.2

**8.** The continuous model of the lake is $P = 400e^{-0.05t}$ and the daily
model is $u_{n+1} = 0.95u_n$ with $u_0 = 400$. Both start at $400$ kg. For the
daily model, what fraction of the pollutant is left after one day, and what
fraction does the continuous model leave after one day? Use $e^{-0.05} \approx
0.9512$.

<details markdown="1">
<summary>Hint</summary>

The daily model multiplies by $0.95$. The continuous model multiplies by
$e^{-0.05}$.

<details markdown="1">
<summary>Next step</summary>

$0.95 = 95\%$, and $e^{-0.05} \approx 0.9512 = 95.12\%$.

<details markdown="1">
<summary>Full working</summary>

The daily model leaves $95\%$ of the pollutant after one day. The continuous
model leaves about $95.12\%$. The continuous model removes slightly less in the
first day, because the removal is spread through the day and acts on a falling
amount. Over many days the two models stay close, and Section 8.8 compares them
properly.

</details>
</details>
</details>
