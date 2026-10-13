---
title: 8.3 Radioactive decay and half-life — Learn
chapter: 8
chapter_title: Quantum and nuclear physics
section: '8.3'
section_title: Radioactive decay and half-life
dfe:
- AP8
kind: walkthrough
---

# 8.3 Radioactive decay and half-life — Learn

**Prerequisites:** exponential decay from Section 5.4; the graph of an
exponential from Chapter 3; reading a gradient; natural logarithms; SI prefixes.

**By the end of this section you can:** define activity and half-life; use
$A = \lambda N$; find a decay constant from a half-life; use
$N = N_0 e^{-\lambda t}$ and $A = A_0 e^{-\lambda t}$; read a decay curve; and
write a balanced nuclear equation for alpha, beta and gamma decay.

## 1. The nucleus and its notation

An atom has a small, dense **nucleus**. The nucleus contains **protons** and
**neutrons**, which are together called **nucleons**. The number of protons is
the **proton number** $Z$, and it decides which element the atom is. The number
of nucleons is the **nucleon number** $A$. Atoms of the same element with
different numbers of neutrons are **isotopes**.

A nuclide is written with these numbers:

$$ ^{A}_{Z}\text{X} $$

For example, $^{18}_{9}\text{F}$ has 9 protons and 18 nucleons, so it has
$18 - 9 = 9$ neutrons.

Some nuclei are unstable. They change into a more stable nucleus and release
radiation. This is **radioactive decay**. The decay is **random**: you cannot
predict which nucleus will decay next, or when. It is also **spontaneous**:
nothing outside the nucleus has to set it off.

## 2. Activity

The **activity** of a source is the number of nuclei that decay each second.

$$ A = \frac{\Delta N}{\Delta t} $$

The unit of activity is the **becquerel**, $\text{Bq}$. One becquerel is one
decay per second.

A detector measures a **count rate**, not the activity. Not every decay sends a
particle into the detector, so the count rate is smaller than the activity. The
detector also records a **background count rate** from nearby rocks, building
materials and cosmic rays. Subtract the background before you use the count
rate:

$$ \text{corrected count rate} = \text{measured count rate} - \text{background count rate} $$

## 3. Half-life

The **half-life** $T_{1/2}$ of a source is the average time for half of the
unstable nuclei in a sample to decay. It is also the time for the activity to
fall to half of its starting value.

After $n$ half-lives, the fraction that remains is $\left(\tfrac{1}{2}\right)^n$:

$$ A = \frac{A_0}{2^n} $$

**Worked example 1.** The hospital tracer starts the morning with an activity of
$8.0 \times 10^{8}\,\text{Bq}$. Its half-life is 110 minutes. Find the activity
after 330 minutes.

The time is three half-lives, because $\dfrac{330}{110} = 3$.

$$
A = \frac{A_0}{2^3} = \frac{8.0 \times 10^{8}}{8}
  = 1.0 \times 10^{8}\,\text{Bq}
$$

After 330 minutes the activity is $1.0 \times 10^{8}\,\text{Bq}$.

## 4. The decay constant and the exponential law

Half-lives describe whole steps. For any time, the decay follows an exponential
curve. The **decay constant** $\lambda$ is the probability that a given nucleus
decays in one second. It has the unit $\text{s}^{-1}$.

$$ N = N_0 e^{-\lambda t} \qquad A = A_0 e^{-\lambda t} $$

The activity is proportional to the number of undecayed nuclei, which gives

$$ A = \lambda N $$

The decay constant and the half-life are linked:

$$ T_{1/2} = \frac{\ln 2}{\lambda} \qquad \lambda = \frac{\ln 2}{T_{1/2}} $$

Here $\ln 2 = 0.693$. Because the decay rate depends only on the nucleus, the
half-life does not change with temperature or pressure. It is a property of the
nuclide.

**Worked example 2.** Find the decay constant of fluorine-18, whose half-life is
110 minutes.

First change the half-life to seconds.

$$ T_{1/2} = 110 \times 60 = 6600\,\text{s} $$

$$
\begin{aligned}
\lambda &= \frac{\ln 2}{T_{1/2}} = \frac{0.693}{6600} \\
        &= 1.05 \times 10^{-4}\,\text{s}^{-1}
\end{aligned}
$$

**Worked example 3.** The tracer has an activity of
$8.0 \times 10^{8}\,\text{Bq}$ at the start. Find the number of fluorine-18
nuclei that are still undecayed at that moment.

Rearrange $A = \lambda N$.

$$
\begin{aligned}
N &= \frac{A}{\lambda} = \frac{8.0 \times 10^{8}}{1.05 \times 10^{-4}} \\
  &= 7.6 \times 10^{12}
\end{aligned}
$$

About $7.6 \times 10^{12}$ nuclei are undecayed.

## 5. Nuclear equations

The nucleon number and the proton number are conserved in every decay. That is
how a decay equation is balanced.

- **Alpha decay** emits a helium nucleus, $^{4}_{2}\text{He}$. The nucleon number
  falls by 4 and the proton number falls by 2.
- **Beta-minus decay** emits an electron, $^{0}_{-1}\text{e}$, and an
  antineutrino. A neutron turns into a proton, so the proton number rises by 1.
- **Beta-plus decay** emits a positron, $^{0}_{+1}\text{e}$, and a neutrino. A
  proton turns into a neutron, so the proton number falls by 1.
- **Gamma emission** releases a photon. The nucleon number and the proton number
  do not change.

**Worked example 4.** Write the balanced equation for the beta-plus decay of
fluorine-18, $^{18}_{9}\text{F}$.

Beta-plus decay emits a positron. To balance the nucleon numbers, the product
nucleus also has 18 nucleons. To balance the proton numbers, it has
$9 - 1 = 8$ protons, which is oxygen.

$$ ^{18}_{9}\text{F} \rightarrow {}^{18}_{8}\text{O} + {}^{0}_{+1}\text{e} + \nu $$

The neutrino $\nu$ carries away some energy and momentum. It is why the emitted
positron has a range of kinetic energies rather than one fixed value.

## 6. The decay curve

A graph of activity against time for a radioactive source is a falling
exponential curve. It is steep at the start, when many nuclei remain, and it
flattens as the sample runs out.

You can read the half-life from the curve. Find the starting activity, halve it,
and read the time at which the activity reaches that value. Repeat for the next
halving to check.

A straight-line graph is easier to use. Taking logarithms of $A = A_0 e^{-\lambda
t}$ gives

$$ \ln A = \ln A_0 - \lambda t $$

A graph of $\ln A$ against $t$ is a straight line with gradient $-\lambda$. The
half-life follows from $T_{1/2} = \dfrac{\ln 2}{\lambda}$.

> **Watch out.** Half-life does not mean "the time for all the atoms to decay".
> After one half-life, half remain. After two, a quarter remain. After ten,
> about one thousandth remain, and the sample is still slightly radioactive. A
> second trap is to use different units for the time and the half-life. If the
> half-life is in minutes, convert the time to minutes, or convert both to
> seconds. A third trap is to think that a temperature change alters the
> half-life. It does not: the decay is a property of the nucleus.
> **Re-check:** ask how much of the sample remains after each half-life, not how much has decayed.

## 7. Try it: the decay curve

The figure draws the activity of a source against time. Two sliders set the
half-life and the starting activity. The readout gives the activity after the
chosen time and the number of half-lives that have passed.

**Predict first.** Do not move the sliders yet. Write down your answers.

1. After three half-lives, what fraction of the starting activity remains?
2. If the half-life is halved, does the curve fall faster or more slowly?
3. Does doubling the starting activity change the half-life?

**Test.** Set a half-life and a starting activity, then read the activity at one,
two and three half-lives. Change one slider at a time and check each prediction.

**Explain.** Why is the curve steepest at the start? Write two or three
sentences. Use the idea that the activity is proportional to the number of
undecayed nuclei, and that many nuclei remain at the start.

:::figure decay-curve

## Progress check

Return to the hospital tracer. It starts the morning with an activity of
$8.0 \times 10^{8}\,\text{Bq}$ and a half-life of 110 minutes.

1. Find the activity after 330 minutes, and after 550 minutes.
2. Find the decay constant in $\text{s}^{-1}$.
3. Find the time at which the activity has fallen to
   $2.0 \times 10^{8}\,\text{Bq}$.
4. Explain why the team cannot predict which nucleus will decay next, even
   though they can predict the activity of the whole sample well.

If question 1 goes wrong, count the half-lives and divide by $2^n$. If
question 2 goes wrong, change 110 minutes to seconds and use
$\lambda = \dfrac{\ln 2}{T_{1/2}}$. If question 3 goes wrong, find how many
halvings take the activity from $8.0 \times 10^{8}$ to
$2.0 \times 10^{8}$. If question 4 goes wrong, think about the size of the
sample and the meaning of a probability.

## You should now be able to

- describe the nucleus, the proton number, the nucleon number and an isotope;
- define activity and use $A = \dfrac{\Delta N}{\Delta t}$;
- correct a count rate for the background;
- define half-life and use $A = \dfrac{A_0}{2^n}$;
- use $A = \lambda N$ and $N = N_0 e^{-\lambda t}$;
- find the decay constant from the half-life, and the half-life from the decay
  constant;
- write balanced equations for alpha, beta-minus, beta-plus and gamma decay;
- read a half-life from a decay curve, and use a $\ln A$ against $t$ graph;
- explain why radioactive decay is random and spontaneous.
