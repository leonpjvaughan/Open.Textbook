---
title: 16.5 Transformers and the transmission of electricity — Learn
chapter: 16
chapter_title: Electromagnetic induction
section: '16.5'
section_title: Transformers and the transmission of electricity
tier: O
refs:
- '3.6'
kind: walkthrough
---

# 16.5 Transformers and the transmission of electricity — Learn

**Prerequisites:** Faraday's law from Section 16.2; Lenz's law from Section 16.3;
the a.c. generator from Section 16.4; power and resistance from Chapter 14.

**Objectives:** describe the structure of a transformer; use $\dfrac{V_s}{V_p} =
\dfrac{N_s}{N_p}$; use the efficiency of a transformer; explain why electricity is
transmitted at a high voltage and calculate the energy lost in a cable.

By the end of this section, you can choose the turns of a transformer for a job,
and show why the national grid uses a very high voltage.

## Mutual induction

A transformer changes the size of an alternating voltage. It has two coils wound
on a closed **iron core**.

- The **primary coil** is connected to the input supply.
- The **secondary coil** is connected to the output circuit.
- The **iron core** links the two coils, so nearly all the magnetic flux from the
  primary passes through the secondary.

An alternating current in the primary makes a changing magnetic flux in the core.
That changing flux passes through the secondary coil, and Faraday's law says a
changing flux induces an emf. So an emf appears in the secondary. This is **mutual
induction**: a changing field in one coil induces an emf in the other.

A transformer works only on an alternating supply. A steady direct current makes a
steady flux, and a steady flux induces nothing.

## The transformer equation

The emf induced in a coil is proportional to the number of turns, so the voltages
are in the same ratio as the turns:

$$\frac{V_s}{V_p} = \frac{N_s}{N_p}$$

- $V_p$ is the voltage across the primary coil, in volts (V);
- $V_s$ is the voltage across the secondary coil, in volts (V);
- $N_p$ is the number of turns on the primary;
- $N_s$ is the number of turns on the secondary.

A **step-up** transformer has more turns on the secondary, so $V_s$ is larger than
$V_p$. A **step-down** transformer has fewer turns on the secondary, so $V_s$ is
smaller than $V_p$.

## Power and efficiency

An ideal transformer transfers all the power from the primary to the secondary, so

$$V_p I_p = V_s I_s$$

If the voltage is stepped up, the current is stepped down by the same factor. The
turns ratio and the current ratio are opposite ways round:

$$\frac{I_p}{I_s} = \frac{N_s}{N_p}$$

A real transformer transfers a little less power than it receives, because energy
is transferred to the core and to the windings. Its **efficiency** is

$$\text{efficiency} = \frac{\text{power out}}{\text{power in}} \times 100\%$$

**Example 1.** A transformer has 100 turns on the primary and 10 000 turns on the
secondary. The primary voltage is 240 V. Calculate the secondary voltage.

$$
\frac{V_s}{V_p} = \frac{N_s}{N_p}
$$

$$
V_s = V_p \times \frac{N_s}{N_p} = 240 \times \frac{10\,000}{100} = 240 \times 100
$$

$$
V_s = 24\,000\,\text{V}
$$

That is 24 kV, so this is a step-up transformer.

**Example 2.** The transformer of Example 1 delivers a power of 24 kW. Calculate
the current in the secondary coil.

$$
I_s = \frac{P}{V_s} = \frac{24\,000}{24\,000} = 1.0\,\text{A}
$$

**Example 3.** A transformer has an input power of 500 W and an output power of
475 W. Calculate its efficiency.

$$
\text{efficiency} = \frac{475}{500} \times 100\% = 95\%
$$

:::figure transformer-turns

**Predict, then test.** Before you move any slider, write down what you expect the
secondary voltage to be if you double the number of secondary turns. Then double
it and check. Now change the primary voltage and describe how the secondary voltage
changes. Write a sentence explaining why the ratio of the voltages is fixed by the
turns.

## Why the grid uses a high voltage

A power station delivers energy to a city along a cable. The cable has resistance,
so some of the energy is transferred to the cable and wasted as internal energy.
The wasted power is

$$P_{\text{lost}} = I^2R$$

The resistance $R$ is fixed by the cable. So the way to reduce the waste is to
reduce the current $I$. For a given power $P$, the current is

$$I = \frac{P}{V}$$

so a **higher voltage** means a **smaller current**. Because the loss depends on
$I^2$, halving the current cuts the waste to one quarter.

That is why the grid steps the voltage up for the journey and steps it down again
at the far end. The transformers do not reduce the energy transferred. They change
the voltage and the current in opposite directions, so the power stays the same
and less energy is wasted.

> **Watch out.** A transformer cannot increase power. A step-up transformer
> increases the voltage, but the current falls by the same factor, so the power
> stays the same. Also, a transformer needs an **alternating** supply. Connecting
> one to a battery gives a steady flux and no output at all. The turns ratio must
> also be used the right way up: divide the secondary turns by the primary turns,
> not the other way round.

## Progress check

Back to the chapter problem. The generator delivers 24 kW at an r.m.s. voltage of
240 V. The transmission cable has a resistance of 4.0 Ω.

Find the current that would flow in the cable if the voltage were not raised, and
the power lost in the cable. Then find the current when the voltage is stepped up
to 24 kV, and the power lost then. Compare the two answers, and explain why the
grid uses a high voltage.

## You should now be able to

- describe the structure of a transformer and explain how mutual induction makes
  it work;
- use $\dfrac{V_s}{V_p} = \dfrac{N_s}{N_p}$ to find a voltage or a number of
  turns, and say whether a transformer steps up or steps down;
- use $V_pI_p = V_sI_s$ for an ideal transformer, and calculate an efficiency;
- explain why electrical energy is transmitted at a high voltage, using
  $P = I^2R$;
- calculate the power lost in a transmission cable.
