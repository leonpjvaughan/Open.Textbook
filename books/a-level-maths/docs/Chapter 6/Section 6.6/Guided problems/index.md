---
title: 6.6 Exponential growth and decay in modelling — Practise with help
chapter: 6
chapter_title: Exponentials and logarithms
section: '6.6'
section_title: Exponential growth and decay in modelling
refs:
- F7
- OT3
kind: guided-problems
---

# 6.6 Exponential growth and decay in modelling — Practise with help

Work each question closed book first. Write down the model, decide the sign of
$k$, then decide whether the question asks for a value or for a time.

## Warm-up: remember

1. Solve $e^x = 9$, giving $x$ exactly.
2. Write $\ln 2 + \ln 5$ as a single logarithm.
3. Work out $e^0$.

<details markdown="1">
<summary>Answers</summary>

1. $x = \ln 9$.
2. $\ln 2 + \ln 5 = \ln 10$.
3. $e^0 = 1$.

If question 1 was hard, revise solving exponential equations in Section 6.4
before you continue.
</details>

## Practise with help

**1.** £$1500$ is invested with continuous compounding at $4\%$ per year, so
$A = 1500e^{0.04t}$. Find the amount after $6$ years, to the nearest penny.

<details markdown="1">
<summary>Hint</summary>

Substitute $t = 6$ into the model. The rate is $0.04$ as a decimal.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out $A = 1500e^{0.24}$, then round to two decimal places.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
A = 1500e^{0.24} = 1906.87\ldots,
$$

so the amount is £$1906.87$ to the nearest penny.
</details>

**2.** A radioactive isotope has a half-life of $10$ years. Find the decay
constant $k$ in $m = m_0e^{-kt}$, to three significant figures.

<details markdown="1">
<summary>Hint</summary>

Half-life means the mass is $\dfrac{m_0}{2}$ after $10$ years. Divide by $m_0$
first.
</details>

<details markdown="1">
<summary>Next step</summary>

Set $e^{-10k} = \dfrac{1}{2}$, take logarithms, and make $k$ the subject.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
e^{-10k} = \frac{1}{2}, \qquad -10k = -\ln 2, \qquad k = \frac{\ln 2}{10} \approx 0.0693.
$$

The decay constant is about $0.0693$ per year.
</details>

**3.** A mass is modelled by $m = 200e^{-0.05t}$. Find the time for the mass to
fall to $50$, giving the answer exactly.

<details markdown="1">
<summary>Hint</summary>

Divide by $200$ first: $\dfrac{50}{200} = 0.25$. Then take logarithms.
</details>

<details markdown="1">
<summary>Next step</summary>

Solve $e^{-0.05t} = 0.25$, so $-0.05t = \ln 0.25$. Make $t$ the subject and
simplify the logarithm.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
e^{-0.05t} = 0.25, \qquad -0.05t = -\ln 4, \qquad t = \frac{\ln 4}{0.05} = 20\ln 4.
$$

The mass takes $20\ln 4 \approx 27.7$ time units to fall to a quarter of its
value.
</details>

**4.** A population is modelled by $P = 300e^{0.02t}$, where $t$ is in years.
Find the doubling time.

<details markdown="1">
<summary>Hint</summary>

Doubling means $P = 2 \times 300$. Divide by $300$ and take logarithms.
</details>

<details markdown="1">
<summary>Next step</summary>

Solve $e^{0.02t} = 2$, so $0.02t = \ln 2$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
t = \frac{\ln 2}{0.02} = 50\ln 2 \approx 34.7.
$$

The population doubles about every $34.7$ years. The starting value $300$ does
not affect the doubling time.
</details>

**5.** A savings account pays $2\%$ per year. Explain the difference between
compounding once a year and compounding continuously.

<details markdown="1">
<summary>Hint</summary>

With yearly compounding the amount after $t$ years is $A = A_0\left(1.02\right)^t$.
Continuous compounding uses $A = A_0e^{0.02t}$.
</details>

<details markdown="1">
<summary>Next step</summary>

Compare the two formulas after $1$ year and after a long time. Continuous
compounding adds interest on interest at every instant.
</details>

<details markdown="1">
<summary>Full working</summary>

Yearly compounding multiplies the amount by $1.02$ once each year. Continuous
compounding multiplies by $e^{0.02}$ once each year, which is about $1.0202$.
The continuous model is slightly larger, because interest is added all the time
rather than once at the end of the year. The difference grows as the years pass,
but it stays small for a rate of $2\%$.
</details>

**6.** A drug is modelled by $A = 60e^{-0.5t}$ mg after $t$ hours. Find the
amount after $6$ hours, and the time for the amount to fall to $6$ mg.

<details markdown="1">
<summary>Hint</summary>

For the amount, substitute $t = 6$. For the time, divide by $60$ and solve
$e^{-0.5t} = 0.1$.
</details>

<details markdown="1">
<summary>Next step</summary>

After $6$ hours, $A = 60e^{-3}$. For the time, take logarithms of
$e^{-0.5t} = 0.1$ to get $-0.5t = \ln 0.1$.
</details>

<details markdown="1">
<summary>Full working</summary>

After $6$ hours,

$$
A = 60e^{-3} = 2.988\ldots \approx 2.99\text{ mg}.
$$

For a fall to $6$ mg,

$$
e^{-0.5t} = 0.1, \qquad t = \frac{\ln 0.1}{-0.5} = 2\ln 10 \approx 4.61\text{ hours}.
$$

The amount has fallen by a factor of ten.
</details>

**7.** A model predicts a population of $500e^{0.15t}$ after $t$ years. At
$t = 200$ the model gives an enormous number. Explain why the prediction is not
believable, and suggest a refinement.

<details markdown="1">
<summary>Hint</summary>

Think about what a population needs to keep growing at the same percentage rate
for two hundred years.
</details>

<details markdown="1">
<summary>Next step</summary>

List the resources a population needs, and decide whether they can grow without
limit.
</details>

<details markdown="1">
<summary>Full working</summary>

The exponential model assumes that the growth rate stays constant. After a long
time the population would need unlimited food, water and space, which a real
environment cannot supply. The model is only reliable near the data used to fit
it. A refinement is to include a maximum population, so the growth slows as the
population approaches the limit, or to quote the prediction only for a short
time ahead.
</details>
