---
title: 8.3 Radioactive decay and half-life — Practise with help
chapter: 8
chapter_title: Quantum and nuclear physics
section: '8.3'
section_title: Radioactive decay and half-life
dfe:
- AP8
kind: guided-problems
---

# 8.3 Radioactive decay and half-life — Practise with help

Work each problem first. Open a hint only if you are stuck, and the full working
only to check. Keep the time and the half-life in the same unit.

## Warm-up: remember

1. A quantity halves every 4.0 minutes. What fraction of it remains after
   12 minutes?
2. Write 3.0 hours in seconds.
3. A sample contains $5.0 \times 10^{20}$ undecayed nuclei and has a decay
   constant of $2.0 \times 10^{-6}\,\text{s}^{-1}$. Find its activity.

<details markdown="1">
<summary>Answers</summary>

1. 12 minutes is three half-lives, so the fraction is
   $\left(\tfrac{1}{2}\right)^3 = \dfrac{1}{8}$.
2. $3.0 \times 3600 = 1.08 \times 10^{4}\,\text{s}$.
3. $A = \lambda N = 2.0 \times 10^{-6} \times 5.0 \times 10^{20} = 1.0 \times 10^{15}\,\text{Bq}$.

If question 1 goes wrong, count the halvings. If question 2 goes wrong, one hour
is 3600 s. If question 3 goes wrong, the activity is the decay constant
multiplied by the number of nuclei.
</details>

## Practise with help

**1.** A source has an activity of 640 Bq. Its half-life is 5.0 days. Find its
activity after 15 days.

<details markdown="1">
<summary>Hint</summary>

Find how many half-lives fit into 15 days.
</details>

<details markdown="1">
<summary>Next step</summary>

15 days is three half-lives. Divide 640 by $2^3$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$ A = \frac{A_0}{2^3} = \frac{640}{8} = 80\,\text{Bq} $$

The activity after 15 days is 80 Bq.
</details>

**2.** A radioisotope has a half-life of 6.0 hours. Find its decay constant in
$\text{s}^{-1}$.

<details markdown="1">
<summary>Hint</summary>

Change the half-life to seconds first, then use the link with $\ln 2$.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $T_{1/2} = 6.0 \times 3600 = 2.16 \times 10^{4}\,\text{s}$, then
$\lambda = \dfrac{\ln 2}{T_{1/2}}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$ \lambda = \frac{\ln 2}{T_{1/2}} = \frac{0.693}{2.16 \times 10^{4}}
   = 3.2 \times 10^{-5}\,\text{s}^{-1} $$

The decay constant is $3.2 \times 10^{-5}\,\text{s}^{-1}$.
</details>

**3.** A sample contains $4.0 \times 10^{15}$ nuclei of a radioisotope whose
decay constant is $1.2 \times 10^{-5}\,\text{s}^{-1}$. Find its activity.

<details markdown="1">
<summary>Hint</summary>

The activity is the decay constant multiplied by the number of undecayed
nuclei.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $A = \lambda N$ with the two values given.
</details>

<details markdown="1">
<summary>Full working</summary>

$$ A = \lambda N = 1.2 \times 10^{-5} \times 4.0 \times 10^{15}
   = 4.8 \times 10^{10}\,\text{Bq} $$

The activity is $4.8 \times 10^{10}\,\text{Bq}$.
</details>

**4.** A source has an activity of $2.0 \times 10^{6}\,\text{Bq}$ and a decay
constant of $5.0 \times 10^{-7}\,\text{s}^{-1}$. Find the number of radioactive
nuclei in the source.

<details markdown="1">
<summary>Hint</summary>

Rearrange the activity equation to make the number of nuclei the subject.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $N = \dfrac{A}{\lambda}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$ N = \frac{A}{\lambda} = \frac{2.0 \times 10^{6}}{5.0 \times 10^{-7}}
   = 4.0 \times 10^{12} $$

The source contains $4.0 \times 10^{12}$ radioactive nuclei.
</details>

**5.** A source has an initial activity of $8.0 \times 10^{8}\,\text{Bq}$ and a
decay constant of $1.05 \times 10^{-4}\,\text{s}^{-1}$. Find its activity after
3300 s.

<details markdown="1">
<summary>Hint</summary>

Use the exponential form $A = A_0 e^{-\lambda t}$.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out the exponent $-\lambda t$ first, then find $e^{-\lambda t}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\begin{aligned}
\lambda t &= 1.05 \times 10^{-4} \times 3300 = 0.3465 \\
A &= A_0 e^{-\lambda t} = 8.0 \times 10^{8} \times e^{-0.3465} \\
  &= 8.0 \times 10^{8} \times 0.707 \\
  &= 5.7 \times 10^{8}\,\text{Bq}
\end{aligned}
$$

The activity after 3300 s is about $5.7 \times 10^{8}\,\text{Bq}$.
</details>

**6.** Americium-241, $^{241}_{95}\text{Am}$, decays by emitting an alpha
particle. Write the balanced nuclear equation.

<details markdown="1">
<summary>Hint</summary>

An alpha particle is a helium nucleus. Subtract its nucleon number and its
proton number from those of americium.
</details>

<details markdown="1">
<summary>Next step</summary>

Find the new nucleon number, $241 - 4$, and the new proton number, $95 - 2$.
Then name the element with that proton number.
</details>

<details markdown="1">
<summary>Full working</summary>

$$ ^{241}_{95}\text{Am} \rightarrow {}^{237}_{93}\text{Np} + {}^{4}_{2}\text{He} $$

The nucleon numbers balance: $241 = 237 + 4$. The proton numbers balance:
$95 = 93 + 2$.
</details>

**7.** Carbon-14, $^{14}_{6}\text{C}$, decays by beta-minus emission. Write the
balanced nuclear equation.

<details markdown="1">
<summary>Hint</summary>

Beta-minus emission is an electron leaving the nucleus. The nucleon number does
not change, and the proton number rises by one.
</details>

<details markdown="1">
<summary>Next step</summary>

The new proton number is $6 + 1 = 7$, which is nitrogen.
</details>

<details markdown="1">
<summary>Full working</summary>

$$ ^{14}_{6}\text{C} \rightarrow {}^{14}_{7}\text{N} + {}^{0}_{-1}\text{e} + \bar{\nu} $$

The antineutrino $\bar{\nu}$ carries away energy and momentum. The nucleon
number stays at 14, as it must.
</details>

**8.** Explain why the activity of a sample is predictable even though the decay
of a single nucleus is random.

<details markdown="1">
<summary>Hint</summary>

Think about the number of nuclei in a sample and what a probability means over a
large number of trials.
</details>

<details markdown="1">
<summary>Next step</summary>

Contrast the fate of one nucleus with the average behaviour of many millions of
nuclei.
</details>

<details markdown="1">
<summary>Full working</summary>

The decay of one nucleus is random: there is a fixed probability each second
that it decays, but no way to say when it will. A real sample contains many
millions of nuclei. The number that decay in the next second is an average over
all of them, and averages of large numbers are steady. This is why the activity
follows a smooth exponential curve even though each individual decay is
unpredictable.
</details>
