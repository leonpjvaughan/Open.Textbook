---
title: 20.2 Half-life and activity — Learn
chapter: 20
chapter_title: Radioactivity
section: '20.2'
section_title: Half-life and activity
tier: O
refs:
- '4.4'
kind: walkthrough
---

# 20.2 Half-life and activity — Learn

**Prerequisites:** spontaneous and random decay from Section 20.1; reading a graph
from Chapter 1; logarithms, if you use the decay constant.

**Objectives:** define activity and the becquerel; define half-life and read it from
a decay curve; find the activity after a whole number of half-lives; explain why the
decay curve is smooth although each decay is random; use $A = \lambda N$ and
$T_{1/2} = \dfrac{\ln 2}{\lambda}$.

By the end of this section you can take an activity, a half-life and a time, and say
what the activity will be — or work backwards from two activities to the age of a
sample.

## Activity

A source gives out particles at a steady average rate. The **activity** of a source
is the number of nuclei that decay in one second. Its unit is the **becquerel**, Bq,
where one becquerel is one decay per second.

Activity is not the same as count rate. A detector surrounds only part of the source
and catches only a fraction of the decays, so the count rate is usually smaller than
the activity. The two are proportional, so a count rate is a perfectly good way to
follow the activity of a sample.

The activity depends on how many unstable nuclei are still there. Twice as many
undecayed nuclei give twice as many decays each second, so

$$A = \lambda N$$

- $A$ is the activity, in becquerels (Bq);
- $N$ is the number of undecayed nuclei in the sample;
- $\lambda$ is the **decay constant**, in s$^{-1}$: the probability that one nucleus
  decays in one second.

Because $N$ falls as nuclei decay, the activity falls with it. That single fact
produces the whole decay curve.

## Half-life

The fall is measured with one number.

> **Half-life.** The half-life of a radioactive isotope is the time taken for half
> the nuclei in a sample to decay.

Because the activity is proportional to the number of undecayed nuclei, the activity
also halves in one half-life. That is what makes the half-life so useful: you can
measure it with a detector, without knowing how many nuclei are in the sample.

Half-lives range enormously. Technetium-99m, used in hospital scans, has a half-life
of 6.0 hours. Radon-222, the gas that gives Ireland most of its background
radiation, has a half-life of 3.8 days. Carbon-14 has a half-life of 5730 years, and
uranium-238 has one of 4.5 billion years.

## The decay curve

Plot the activity of a sample against time and you get the shape shown here. It
falls steeply at first, then flattens, and approaches zero without ever reaching it.

The curve is smooth, although the decay of a single nucleus is random. A visible
sample holds a very large number of nuclei, so the unpredictable events average out.
In every short stretch of time the same small fraction of the remaining nuclei
decays, so the activity falls by the same fraction in equal times.

:::figure half-life-decay

**Predict, then test.** Before you move the slider, write down the fraction of the
nuclei you expect to remain after three half-lives. Move the slider there and check
your prediction. Then set the slider to one half-life and read the fraction, and
again to two half-lives. **Explain** why the fraction left after each further
half-life is half of what it was, and why the curve never reaches zero.

## Finding the half-life from a graph

You do not need the decay constant to find a half-life. The graph gives it directly.

1. Choose a starting activity and read the time for it.
2. Halve the activity, and read the time at which the curve reaches the new value.
3. The gap between the two times is the half-life.
4. Start again from another point to check. The gap is the same every time, which is
   what makes one number enough to describe the whole curve.

**Example 1.** A source has an activity of $6.4 \times 10^3$ Bq. Calculate its
activity after three half-lives.

Each half-life halves the activity, so three half-lives divide it by $2^3 = 8$:

$$A = \frac{6.4 \times 10^3}{8} = 8.0 \times 10^2\ \text{Bq}$$

**Example 2.** A source has an activity of 2400 Bq and a half-life of 5.0 minutes.
Calculate its activity 20 minutes later.

First find how many half-lives fit into 20 minutes:

$$\text{number of half-lives} = \frac{20}{5.0} = 4$$

Then divide by $2^4 = 16$:

$$A = \frac{2400}{16} = 150\ \text{Bq}$$

**Example 3.** A source has an activity of 480 Bq. Show that its activity falls to
60 Bq after three half-lives.

$$480 \div 2 = 240 \qquad 240 \div 2 = 120 \qquad 120 \div 2 = 60\ \text{Bq}$$

Three halvings take 480 Bq to 60 Bq, so three half-lives have passed. Equivalently,
$480 \div 2^3 = 480 \div 8 = 60$.

## The decay constant

The decay constant and the half-life measure the same thing, so one can be found
from the other.

$$T_{1/2} = \frac{\ln 2}{\lambda} \qquad \text{and} \qquad \lambda = \frac{\ln 2}{T_{1/2}}$$

Here $\ln 2 = 0.693$ to three significant figures.

**Example 4.** A radioactive isotope has a half-life of 60 s. Calculate its decay
constant, in s$^{-1}$.

$$\lambda = \frac{\ln 2}{T_{1/2}} = \frac{0.693}{60} = 1.16 \times 10^{-2}\ \text{s}^{-1}$$

A decay constant of $1.16 \times 10^{-2}$ s$^{-1}$ means that each nucleus has a
probability of about 1.2 in 100 of decaying in any one second.

> **Watch out.** The half-life is not the time for the whole sample to decay. After
> one half-life, half is left; after two, a quarter; after three, an eighth. The
> fraction left is $\left(\dfrac{1}{2}\right)^n$ after $n$ half-lives, and it never
> reaches zero. A source is never completely gone, only too weak to measure.

**Example 5.** A sample contains $4.0 \times 10^{20}$ undecayed nuclei. Its decay
constant is $2.0 \times 10^{-4}$ s$^{-1}$. Calculate its activity.

$$A = \lambda N = 2.0 \times 10^{-4} \times 4.0 \times 10^{20} = 8.0 \times 10^{16}\ \text{Bq}$$

The half-life of this isotope is $T_{1/2} = \dfrac{0.693}{2.0 \times 10^{-4}} = 3.5 \times 10^{3}$ s,
which is about an hour.

## Progress check

Back to the chapter problem. The oak from the trackway gives 4 counts per minute. A
sample of living wood of the same mass gives 16 counts per minute.

Work out what fraction of the carbon-14 is left in the oak, then how many half-lives
have passed, and then the age of the trackway. Keep your working: Section 20.4
explains why this method stops working once the sample is very old, and the Review
brings the whole calculation together.

## You should now be able to

- define activity and the becquerel, and explain why count rate and activity are not
  the same thing;
- state what the half-life of an isotope means, and read it from a decay curve;
- find the activity of a source after a whole number of half-lives;
- find the number of half-lives from two activities, and so the age of a sample;
- explain why the decay curve is smooth although each decay is random;
- use $A = \lambda N$ and $T_{1/2} = \dfrac{\ln 2}{\lambda}$ to find an activity or a
  decay constant.
