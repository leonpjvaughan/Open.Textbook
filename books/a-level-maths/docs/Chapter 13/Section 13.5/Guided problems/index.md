---
title: 13.5 Selecting an appropriate distribution — Practise with help
chapter: 13
chapter_title: Statistical distributions
section: '13.5'
section_title: Selecting an appropriate distribution
refs:
- N3
- OT2
kind: guided-problems
---

# 13.5 Selecting an appropriate distribution — Practise with help

Work each question closed book first. Decide whether the quantity is a count or
a measurement, and write one sentence giving the reason for your model.

## Warm-up: remember

1. The random variable $Z \sim N(0, 1)$. Find $P(Z < 0.5)$.
2. The random variable $X \sim B(6, 0.5)$. Find $P(X = 2)$.
3. A data set has mean 30 and standard deviation 4. A value is 38. How many
   standard deviations above the mean is it?

<details markdown="1">
<summary>Answers</summary>

1. From the table, $\Phi(0.5) = 0.6915$.
2. $P(X = 2) = \dbinom{6}{2}\left(\tfrac12\right)^6 = \tfrac{15}{64} \approx
   0.2344$.
3. $\dfrac{38 - 30}{4} = 2$ standard deviations.

If question 3 was hard, revise the standard deviation from Section 11.5.
</details>

:::figure warm-up-gate


## Practise with help

**1.** A fair coin is tossed 20 times. The random variable $X$ is the number of
heads. State which model fits the count, and find $P(X = 10)$.

<details markdown="1">
<summary>Hint</summary>

Check the four binomial conditions. Is the quantity a count or a measurement?
</details>

<details markdown="1">
<summary>Next step</summary>

There are 20 independent trials, two outcomes, and $p = 0.5$ is constant. So
$X \sim B(20, 0.5)$. Use the binomial formula with $r = 10$.
</details>

<details markdown="1">
<summary>Full working</summary>

The quantity is a count of heads in a fixed 20 tosses, so the binomial model
fits:

$$
X \sim B(20, 0.5).
$$

$$
P(X = 10) = \binom{20}{10}(0.5)^{10}(0.5)^{10}
= \binom{20}{10}(0.5)^{20} = \frac{46189}{262144} \approx 0.1762.
$$

</details>

**2.** The mass of an apple from an orchard is modelled as $X \sim N(120, 15^2)$
grams. Find $P(X > 140)$.

<details markdown="1">
<summary>Hint</summary>

The mass is a measurement, so the Normal model fits. Standardise $x = 140$.
</details>

<details markdown="1">
<summary>Next step</summary>

$z = \dfrac{140 - 120}{15} \approx 1.333$. Use the table or a calculator, then
subtract from 1.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
z = \frac{140 - 120}{15} = 1.333 \ (3 \text{ d.p.}).
$$

$$
P(X > 140) = 1 - \Phi(1.333) \approx 1 - 0.9088 = 0.0912.
$$

So about 9.1% of the apples have mass greater than 140 grams.
</details>

**3.** A machine produces faulty items with probability 0.04. A sample of 25
items is checked. The random variable $X$ is the number of faulty items. State
which model fits, and find $P(X = 0)$.

<details markdown="1">
<summary>Hint</summary>

The number of trials is fixed at 25, and there are two outcomes per item. Use
the binomial model with $p = 0.04$.
</details>

<details markdown="1">
<summary>Next step</summary>

$X \sim B(25, 0.04)$, so $P(X = 0) = (0.96)^{25}$. Work out the power and round
to four decimal places.
</details>

<details markdown="1">
<summary>Full working</summary>

The quantity is a count in a fixed sample of 25, so

$$
X \sim B(25, 0.04).
$$

$$
P(X = 0) = (0.96)^{25} \approx 0.3604.
$$

So about 36% of samples of 25 contain no faulty item.
</details>

**4.** The time taken by a runner to finish a race is modelled as
$X \sim N(60, 10^2)$ minutes. Find $P(X < 70)$.

<details markdown="1">
<summary>Hint</summary>

The time is a measurement, so the Normal model fits. Standardise $x = 70$.
</details>

<details markdown="1">
<summary>Next step</summary>

$z = \dfrac{70 - 60}{10} = 1$, so read $\Phi(1)$ from the table.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
z = \frac{70 - 60}{10} = 1.
$$

$$
P(X < 70) = \Phi(1) = 0.8413.
$$

So about 84% of runners finish in under 70 minutes.
</details>

**5.** A bag holds 6 red counters and 4 blue counters. Three counters are taken
without replacement. The random variable $X$ is the number of red counters.
Explain why neither the binomial nor the Normal model fits, and find
$P(X = 0)$.

<details markdown="1">
<summary>Hint</summary>

For the binomial model, look at how the probability of red changes between
draws. For the Normal model, remember that $X$ is a count from 0 to 3.
</details>

<details markdown="1">
<summary>Next step</summary>

The probability of red changes after each draw, so the trials are not
independent and the binomial model fails. $X$ is a small whole-number count, so
the Normal model fails. Count the selections with no red counter.
</details>

<details markdown="1">
<summary>Full working</summary>

The probability of a red counter changes after each draw, so $p$ is not
constant. The binomial model needs a constant $p$, so it does not fit. $X$ takes
the whole-number values 0, 1, 2 and 3, so a Normal curve does not fit either.

To find $P(X = 0)$, every counter must be blue. There are $\binom{4}{3} = 4$ ways
to choose three blue counters from the four, and $\binom{10}{3} = 120$ ways to
choose any three counters. So

$$
P(X = 0) = \frac{4}{120} = \frac{1}{30} \approx 0.0333.
$$

</details>

**6.** A quiz has 10 questions, each answered true or false. A student guesses
every answer. State which model fits, and find $P(X \le 2)$, where $X$ is the
number correct.

<details markdown="1">
<summary>Hint</summary>

Each guess is a trial with two outcomes and constant probability 0.5. The
quantity is a count.
</details>

<details markdown="1">
<summary>Next step</summary>

$X \sim B(10, 0.5)$, so add the terms for 0, 1 and 2. Every term has denominator
$2^{10} = 1024$.
</details>

<details markdown="1">
<summary>Full working</summary>

The quantity is a count in a fixed 10 trials, so $X \sim B(10, 0.5)$. Then

$$
P(X \le 2) = \frac{\binom{10}{0} + \binom{10}{1} + \binom{10}{2}}{1024}
= \frac{1 + 10 + 45}{1024} = \frac{56}{1024} = \frac{7}{128} \approx 0.0547.
$$

</details>
