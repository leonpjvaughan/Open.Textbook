---
title: 20.2 Half-life and activity — Practise with help
chapter: 20
chapter_title: Radioactivity
section: '20.2'
section_title: Half-life and activity
tier: O
refs:
- '4.4'
kind: guided-problems
---

# 20.2 Half-life and activity — Practise with help

## Warm-up: remember

1. What fraction of a radioactive sample remains after two half-lives?
2. The activity of a source falls from 800 Bq to 400 Bq in 12 minutes. State the
   half-life of the source.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $\left(\dfrac{1}{2}\right)^2 = \dfrac{1}{4}$. After two half-lives one quarter of
   the nuclei are left. The trap is to answer one half: the halving happens twice,
   not once.
2. 12 minutes. The activity has halved, so one half-life has passed. No further
   calculation is needed.

</details>

:::figure warm-up-gate


## Practise with help

**1.** A source has an activity of $8.0 \times 10^3$ Bq. Calculate its activity
after three half-lives.

<details markdown="1">
<summary>Hint</summary>

Each half-life halves the activity. Three half-lives divide it by $2^3$.

<details markdown="1">
<summary>Next step</summary>

$8.0 \times 10^3 \div 2^3 = 8.0 \times 10^3 \div 8$.

<details markdown="1">
<summary>Full working</summary>

$$A = \frac{8.0 \times 10^3}{2^3} = \frac{8.0 \times 10^3}{8} = 1.0 \times 10^3\ \text{Bq}$$

It is worth halving three times to check: 8000, 4000, 2000, 1000. The answer is
$1.0 \times 10^3$ Bq to two significant figures.

</details>
</details>
</details>

**2.** A source has an activity of 3200 Bq and a half-life of 4.0 minutes. Calculate
its activity 16 minutes later.

<details markdown="1">
<summary>Hint</summary>

Two steps. First find how many half-lives fit into 16 minutes, then divide by that
power of two.

<details markdown="1">
<summary>Next step</summary>

$16 \div 4.0 = 4$, so four half-lives have passed. Divide by $2^4 = 16$.

<details markdown="1">
<summary>Full working</summary>

$$\text{number of half-lives} = \frac{16}{4.0} = 4$$

$$A = \frac{3200}{2^4} = \frac{3200}{16} = 200\ \text{Bq}$$

Check by halving four times: 3200, 1600, 800, 400, 200. The answer is 200 Bq.

</details>
</details>
</details>

**3.** What fraction of the nuclei in a sample remains after four half-lives?

<details markdown="1">
<summary>Hint</summary>

One half-life leaves one half. Write down the fraction after each of the four steps.

<details markdown="1">
<summary>Next step</summary>

$\dfrac{1}{2} \times \dfrac{1}{2} \times \dfrac{1}{2} \times \dfrac{1}{2}$.

<details markdown="1">
<summary>Full working</summary>

$$\left(\frac{1}{2}\right)^4 = \frac{1}{16}$$

One sixteenth of the nuclei remain. That is 6.25 per cent.

</details>
</details>
</details>

**4.** A source has an activity of 480 Bq. Show that its activity falls to 60 Bq
after three half-lives.

<details markdown="1">
<summary>Hint</summary>

Halve the activity and count the steps until you reach 60 Bq.

<details markdown="1">
<summary>Next step</summary>

$480 \to 240 \to 120 \to 60$.

<details markdown="1">
<summary>Full working</summary>

$$480 \div 2 = 240 \qquad 240 \div 2 = 120 \qquad 120 \div 2 = 60\ \text{Bq}$$

Three halvings take 480 Bq to 60 Bq, so three half-lives have passed. In one step:
$480 \div 2^3 = 480 \div 8 = 60$.

</details>
</details>
</details>

**5.** A radioactive isotope has a half-life of 25 s. Calculate its decay constant,
in s$^{-1}$.

<details markdown="1">
<summary>Hint</summary>

Use $\lambda = \dfrac{\ln 2}{T_{1/2}}$, with $\ln 2 = 0.693$.

<details markdown="1">
<summary>Next step</summary>

$\lambda = \dfrac{0.693}{25}$.

<details markdown="1">
<summary>Full working</summary>

$$\lambda = \frac{\ln 2}{T_{1/2}} = \frac{0.693}{25} = 2.8 \times 10^{-2}\ \text{s}^{-1}$$

The unit is s$^{-1}$, because $\lambda$ is a probability per second. A decay
constant of $2.8 \times 10^{-2}$ s$^{-1}$ means each nucleus has about a 2.8 in 100
chance of decaying in any one second.

</details>
</details>
</details>

**6.** A source has a decay constant of $5.0 \times 10^{-3}$ s$^{-1}$ and contains
$6.0 \times 10^{20}$ undecayed nuclei. Calculate its activity.

<details markdown="1">
<summary>Hint</summary>

The activity is $A = \lambda N$.

<details markdown="1">
<summary>Next step</summary>

$A = 5.0 \times 10^{-3} \times 6.0 \times 10^{20}$.

<details markdown="1">
<summary>Full working</summary>

$$A = \lambda N = 5.0 \times 10^{-3} \times 6.0 \times 10^{20} = 3.0 \times 10^{18}\ \text{Bq}$$

The activity is enormous because the sample holds a very large number of nuclei.
The half-life here is $T_{1/2} = \dfrac{0.693}{5.0 \times 10^{-3}} = 139$ s, which
is about two minutes.

</details>
</details>
</details>

**7.** The decay of one nucleus is random, yet the decay curve of a large sample is
smooth. Explain why.

<details markdown="1">
<summary>Hint</summary>

Think about how many nuclei there are in a sample you can see, and about the
fraction that decays in each short time.

<details markdown="1">
<summary>Next step</summary>

The random events average out, and the same fraction of the remaining nuclei decays
in each short time.

<details markdown="1">
<summary>Full working</summary>

You cannot predict when one particular nucleus will decay, and you cannot predict
which nucleus decays next. A visible sample holds a very large number of nuclei, so
the unpredictable events average out and the measured count rate follows a smooth
curve.

In each short stretch of time, the same small fraction of the remaining nuclei
decays. The activity is therefore proportional to the number still there, which is
why the curve falls by the same fraction in equal times.

</details>
</details>
</details>

## A question from Chapter 1

**8.** The activity of a sample is plotted against time. The activity falls from
640 Bq to 80 Bq in 30 minutes. Calculate the half-life of the sample.

<details markdown="1">
<summary>Hint</summary>

How many halvings take 640 Bq to 80 Bq? Then share the 30 minutes between them.

<details markdown="1">
<summary>Next step</summary>

$640 \to 320 \to 160 \to 80$, which is three halvings.

<details markdown="1">
<summary>Full working</summary>

$$640 \div 2 = 320 \qquad 320 \div 2 = 160 \qquad 160 \div 2 = 80$$

Three half-lives fit into 30 minutes, so

$$T_{1/2} = \frac{30}{3} = 10\ \text{minutes}$$

Reading a half-life from a graph is a measurement, so give the value with its unit
and to the precision the axes support.

</details>
</details>
</details>
