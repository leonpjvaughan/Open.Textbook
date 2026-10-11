---
title: 11.2 Sampling techniques and their critique — Learn
chapter: 11
chapter_title: Statistical sampling and data presentation
section: '11.2'
section_title: Sampling techniques and their critique
dfe:
- K1
kind: walkthrough
---

# 11.2 Sampling techniques and their critique — Learn

**Prerequisites:** the terms population, sample and sampling frame from
Section 11.1; using a fraction of an amount.

**By the end of this section you can:** describe simple random, systematic,
stratified and opportunity sampling; work out the sample size for each stratum
and the interval for a systematic sample; and choose or criticise a sampling
method in the context of a problem.

## 1. Why the method matters

A sample should represent the population. If some members are more likely to be
chosen than others, the sample is **biased**. A biased sample can be large and
still give the wrong answer.

Bias is a property of the method, not of the result. A method is biased when it
systematically favours one part of the population. Once the sample is chosen,
you cannot repair the bias by taking a different average.

## 2. Simple random sampling

In a **simple random sample**, every member of the population has an equal
chance of being chosen, and every sample of that size is equally likely.

To take one:

1. number every member of the sampling frame from 1 to $N$;
2. choose $n$ different numbers at random, using random number tables or a
   random-number generator;
3. measure the members with those numbers.

Simple random sampling needs a complete frame. It can be slow when the
population is spread out over a large area.

**Example 1.** A shop has 80 employees, numbered 1 to 80. The manager needs a
simple random sample of 8. Explain how to choose it, and state the chance that
employee 37 is chosen.

Use a random-number generator to produce 8 different numbers from 1 to 80, and
ignore repeats. The chance that employee 37 is chosen is

$$
\frac{8}{80} = \frac{1}{10}.
$$

Every employee has the same chance, because every number from 1 to 80 is equally
likely.

## 3. Systematic sampling

In a **systematic sample**, you put the frame in order, choose a starting point
at random, then take every $k$th member. The interval is

$$
k = \frac{N}{n},
$$

where $N$ is the population size and $n$ is the sample size.

**Example 2.** A population of 500 is sampled systematically, and the sample
size is 25. Find the interval, and list the first three members chosen if the
start is 7.

$$
k = \frac{500}{25} = 20.
$$

Starting at 7, the first three members are 7, 27 and 47.

Systematic sampling is quick and spreads the sample through the whole list. It
is biased when the list has a repeating pattern that matches $k$. If every 20th
item on a conveyor belt is faulty, a systematic sample with $k = 20$ could miss
the fault or see it every time.

## 4. Stratified sampling

A **stratum** is a group inside the population that shares a feature, such as
year group, sex or region. In **stratified sampling**, the population is split
into strata, and a random sample is taken from each stratum. The sample size
from a stratum is proportional to its size:

$$
n_i = \frac{N_i}{N} \times n,
$$

where $N_i$ is the size of the stratum, $N$ is the population size and $n$ is
the total sample size.

Stratified sampling makes sure that every stratum appears in the sample in the
right proportion. It can give a more precise estimate than a simple random
sample of the same size, especially when the strata differ a lot.

**Example 3.** A college has 480 Year 12 students and 320 Year 13 students. A
stratified sample of 40 is needed. Find the number from each year group.

The population is $N = 480 + 320 = 800$.

$$
n_{12} = \frac{480}{800} \times 40 = 24,
\qquad
n_{13} = \frac{320}{800} \times 40 = 16.
$$

The sample has 24 Year 12 students and 16 Year 13 students.

## 5. Opportunity sampling

In **opportunity sampling**, you choose the members who are easiest to reach:
the people in the canteen, the first 50 shoppers, or your friends.

Opportunity sampling is fast and cheap. It is also usually biased, because the
the people who are convenient to reach are often different from the population. A survey
of shoppers at 11 am misses people who work during the day.

**Quota sampling** is different. The interviewer is told how many people of each
type to include, but chooses them by convenience. It controls the proportions,
but it is still not random, so the interviewer's choice can bias the result.

## 6. Choosing and criticising a method

When you choose or criticise a sampling method, ask:

- Is there a complete sampling frame?
- Is every member equally likely to be chosen?
- Does the method reach every part of the population?
- How large is the sample, and how does the size affect the estimate?
- Could some people refuse, or be unable to take part?

**Example 4.** A researcher wants to know the mean journey time of commuters
into a city. She stands at one station between 8 am and 9 am and asks the first
100 people. Criticise her method.

The sample is an opportunity sample. It misses people who travel by car, bus or
bicycle, and people who arrive at a different station. It also misses commuters
who travel outside that hour. The sample is large enough to be precise, but it
is still biased, so the estimate may not describe all commuters.

> **Watch out.** Three mistakes are common.
>
> **Calling a convenience sample random.** "I asked whoever was there" is an
> opportunity sample, not a random sample. Random means every member had a known
> chance of being chosen.
>
> **Using the stratum size instead of the proportion.** The stratum sample is
> $\dfrac{N_i}{N} \times n$, not $N_i \times n$. Always divide by the population
> size as well.
>
> **Forgetting non-response.** People who do not reply are often different from
> those who do. A high non-response rate can bias even a random sample.
>
> **Re-check:** after choosing a method, name the part of the population that
> the method is most likely to miss.

## You should now be able to

- describe a simple random sample and take one from a numbered frame;
- find the interval for a systematic sample and list its members;
- find each stratum sample size using proportional allocation;
- describe and criticise an opportunity sample;
- explain why a large sample can still be biased;
- choose a sampling method that fits a given problem.
