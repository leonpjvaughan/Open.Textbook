---
title: 8.2 Exponential growth and decay — Practise with help
chapter: 8
chapter_title: Modelling a changing world
section: '8.2'
section_title: Exponential growth and decay
tier: O
refs:
- S4
kind: guided-problems
---

# 8.2 Exponential growth and decay — Practise with help

## Warm-up: remember

1. Simplify $2^3 \times 2^4$, writing the answer as a power of $2$.
2. Solve $2^x = 8$.
3. A quantity doubles every hour and starts at $5$. Find its value after three
   hours.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $2^3 \times 2^4 = 2^{3+4} = 2^7 = 128$. Multiply powers of the same base by
   adding the indices.
2. $2^x = 2^3$, so $x = 3$. Matching powers of the same base matches the
   indices.
3. $5 \times 2^3 = 40$. This is discrete doubling; Section 8.2 does the same
   thing continuously with $e$.

</details>

## Practise with help

**1.** A population grows so that $\dfrac{dP}{dt} = 0.03P$, with $P = 400$ when
$t = 0$. Find $P$ in terms of $t$.

<details markdown="1">
<summary>Hint</summary>

Match the model to $P = P_0e^{kt}$ and read off $k$ and $P_0$.

<details markdown="1">
<summary>Next step</summary>

$k = 0.03$ and $P_0 = 400$.

<details markdown="1">
<summary>Full working</summary>

$$P = 400e^{0.03t}.$$

At $t = 0$ this gives $400$, which is the stated starting value. The rate $0.03$
per year is positive, so the population grows.

</details>
</details>
</details>

**2.** A quantity decays so that $\dfrac{dP}{dt} = -0.25P$, with $P = 80$ when
$t = 0$. Find $P$ in terms of $t$.

<details markdown="1">
<summary>Hint</summary>

The rate is negative, so the exponent is negative.

<details markdown="1">
<summary>Next step</summary>

$P = 80e^{-0.25t}$.

<details markdown="1">
<summary>Full working</summary>

$$P = 80e^{-0.25t}.$$

At $t = 0$, $P = 80e^0 = 80$. The negative exponent makes $P$ fall as $t$
grows.

</details>
</details>
</details>

**3.** A mass is modelled by $m = 200e^{-0.1t}$ grams. Find the mass after
$10$ years.

<details markdown="1">
<summary>Hint</summary>

Substitute $t = 10$.

<details markdown="1">
<summary>Next step</summary>

$m = 200e^{-1}$.

<details markdown="1">
<summary>Full working</summary>

$$m = 200e^{-0.1 \times 10} = 200e^{-1} \approx 73.6\ \text{g}.$$

The mass has fallen to about $37\%$ of its starting value, since
$e^{-1} \approx 0.368$.

</details>
</details>
</details>

**4.** A population is $P = 500e^{0.02t}$. Find the value when $t = 50$.

<details markdown="1">
<summary>Hint</summary>

Substitute $t = 50$ and simplify the exponent.

<details markdown="1">
<summary>Next step</summary>

$P = 500e^{1}$.

<details markdown="1">
<summary>Full working</summary>

$$P = 500e^{0.02 \times 50} = 500e^{1} \approx 500 \times 2.718 \approx 1359.$$

The population has grown by a factor of about $2.72$, which is $e$.

</details>
</details>
</details>

**5.** A mass is modelled by $m = 600e^{-0.03t}$ grams. Find the half-life,
giving an exact answer in years.

<details markdown="1">
<summary>Hint</summary>

Half of $600$ is $300$. Set $m = 300$ and solve for $t$.

<details markdown="1">
<summary>Next step</summary>

$e^{-0.03t} = \dfrac{1}{2}$.

<details markdown="1">
<summary>Full working</summary>

$$600e^{-0.03t} = 300, \qquad e^{-0.03t} = \frac{1}{2}, \qquad -0.03t = -\ln 2,$$

$$t = \frac{\ln 2}{0.03} = \frac{100\ln 2}{3} \approx 23.1\ \text{years}.$$

The starting amount cancelled, so the half-life depends only on the rate.

</details>
</details>
</details>

**6.** A population is $P = 200e^{0.05t}$. Find the doubling time, giving an
exact answer.

<details markdown="1">
<summary>Hint</summary>

Double $200$ is $400$. Set $P = 400$ and solve.

<details markdown="1">
<summary>Next step</summary>

$e^{0.05t} = 2$.

<details markdown="1">
<summary>Full working</summary>

$$200e^{0.05t} = 400, \qquad e^{0.05t} = 2, \qquad 0.05t = \ln 2,$$

$$t = \frac{\ln 2}{0.05} = 20\ln 2 \approx 13.9.$$

The doubling time is $20\ln 2$ units of time.

</details>
</details>
</details>

**7.** A student writes: "The population $P = 100e^{0.05t}$ grows by $0.05$
people each year." Explain the mistake and give the correct rate of change at
$t = 0$.

<details markdown="1">
<summary>Hint</summary>

Differentiate the population to find the rate of change.

<details markdown="1">
<summary>Next step</summary>

$\dfrac{dP}{dt} = 100 \times 0.05e^{0.05t} = 5e^{0.05t}$.

<details markdown="1">
<summary>Full working</summary>

The number $0.05$ is the rate constant $k$, not the rate of change. The rate of
change is

$$\frac{dP}{dt} = 5e^{0.05t}.$$

At $t = 0$ the rate is $5e^0 = 5$ people per year. The rate itself grows with
the population, because there are more people to reproduce.

</details>
</details>
</details>

## A question from Section 8.1

**8.** Show that $P = 300e^{-0.4t}$ is a solution of $\dfrac{dP}{dt} = -0.4P$.

<details markdown="1">
<summary>Hint</summary>

Differentiate, then compare with the right-hand side.

<details markdown="1">
<summary>Next step</summary>

$\dfrac{dP}{dt} = -120e^{-0.4t}$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dP}{dt} = -0.4 \times 300e^{-0.4t} = -120e^{-0.4t}.$$

The right-hand side is

$$-0.4P = -0.4 \times 300e^{-0.4t} = -120e^{-0.4t}.$$

The two sides agree, so the claim is a solution.

</details>
</details>
</details>
