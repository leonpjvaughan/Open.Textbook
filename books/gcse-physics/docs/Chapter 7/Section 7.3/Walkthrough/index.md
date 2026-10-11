---
title: 7.3 Induced potential, transformers and the national grid — Learn
chapter: 7
chapter_title: Magnetism and electromagnetism
section: '7.3'
section_title: Induced potential, transformers and the national grid
tier: H
dfe:
- MG3
kind: walkthrough
---

# 7.3 Induced potential, transformers and the national grid — Learn

**Prerequisites:** Section 7.2, especially magnetic fields and the motor effect;
Section 6.1, especially potential difference and current; Section 6.4,
especially electrical power and the national grid.

**By the end of this section you can:** describe the generator effect and the
factors that affect the induced potential difference; explain how an alternator
generates a.c. and a dynamo generates d.c.; use the transformer equations for
potential difference and power; and explain why power is transmitted at high
voltage.

## 1. The generator effect

A magnetic field can make an electric current, just as a current can make a
magnetic field. The effect runs in both directions.

If an electrical conductor moves relative to a magnetic field, a potential
difference is induced across its ends. A potential difference is also induced if
the magnetic field around the conductor changes. If the conductor is part of a
complete circuit, the induced potential difference drives a current.

This is called the **generator effect**. An induced potential difference, and an
induced current, are made by a change in the magnetic field around a conductor.

The induced current makes its own magnetic field. That field opposes the change
that made it. So a magnet pushed towards a coil is pushed back a little, and a
magnet pulled away is pulled back a little. This is why the induced effect always
works against the movement.

**Worked example 1.** Describe the generator effect.

A model answer is:

- When a conductor moves relative to a magnetic field, or the field around it
  changes, a potential difference is induced across its ends.
- If the conductor is part of a complete circuit, the potential difference
  drives an induced current.
- The induced current makes a magnetic field that opposes the original change.

## 2. Increasing the induced potential difference

The size of the induced potential difference depends on:

- the speed of the movement. A faster movement induces a larger potential
  difference;
- the strength of the magnetic field. A stronger field induces a larger
  potential difference;
- the number of turns on the coil. More turns give a larger induced potential
  difference.

The direction of the induced potential difference depends on the direction of
the movement, and on the direction of the magnetic field. Reverse either one, and
the induced potential difference reverses.

## 3. Alternators and dynamos

The generator effect is used in two kinds of generator.

- An **alternator** generates alternating current (a.c.). The coil rotates in a
  magnetic field, and the current changes direction every half turn. The
  potential difference against time is a wave that rises and falls, and crosses
  zero each half turn.
- A **dynamo** generates direct current (d.c.). A commutator reverses the
  connections every half turn, so the current in the outside circuit always
  flows the same way. The potential difference against time stays on one side of
  zero.

**Worked example 2.** Explain how the generator effect is used in an alternator
to generate a.c.

A model answer is:

- The coil rotates in a magnetic field, so the field through the coil keeps
  changing.
- A potential difference is induced in the coil, and a current flows in the
  circuit.
- The induced current changes direction every half turn, so the output is
  alternating current.

## 4. Transformers

A **transformer** changes the size of an alternating potential difference. It has
two coils wound on an iron core.

- The **primary coil** is connected to the input potential difference.
- The **secondary coil** is connected to the output.

An alternating current in the primary coil makes a changing magnetic field in
the iron core. The core carries the changing field to the secondary coil. The
changing field induces a potential difference across the secondary coil, so a
current flows in the secondary circuit.

The transformer only works with an alternating current, because the field must
keep changing.

## 5. The transformer equations

The ratio of the potential differences across the two coils depends on the ratio
of the numbers of turns:

$$ \frac{V_p}{V_s} = \frac{n_p}{n_s} $$

where $V_p$ is the potential difference across the primary coil, $V_s$ is the
potential difference across the secondary coil, and $n_p$ and $n_s$ are the
numbers of turns on the two coils.

- A **step-up transformer** has more turns on the secondary coil, so
  $V_s > V_p$.
- A **step-down transformer** has fewer turns on the secondary coil, so
  $V_s < V_p$.

If a transformer were 100% efficient, the power output would equal the power
input:

$$ V_s I_s = V_p I_p $$

where $I_p$ is the current in the primary coil and $I_s$ is the current in the
secondary coil.

**Worked example 3.** A transformer has 200 turns on the primary coil and 50
turns on the secondary coil. The primary potential difference is 12 V. Calculate
the secondary potential difference.

$$
\begin{aligned}
\frac{V_p}{V_s} &= \frac{n_p}{n_s} \\
V_s &= V_p \times \frac{n_s}{n_p} \\
    &= 12 \times \frac{50}{200} \\
    &= 3.0\,\text{V}
\end{aligned}
$$

This is a step-down transformer.

**Worked example 4.** The transformer in the chapter problem steps 12 000 V down
to 240 V. The primary coil has 4000 turns. Calculate the number of turns on the
secondary coil.

$$
\begin{aligned}
V_s &= V_p \times \frac{n_s}{n_p} \\
n_s &= n_p \times \frac{V_s}{V_p} \\
    &= 4000 \times \frac{240}{12\,000} \\
    &= 80
\end{aligned}
$$

**Worked example 5.** The yard in the chapter problem uses 24 kW of power. The
transmission line delivers it at 12 000 V. Calculate the current in the
transmission line.

$$
\begin{aligned}
P &= V I \\
I &= \frac{P}{V} \\
  &= \frac{24\,000}{12\,000} \\
  &= 2.0\,\text{A}
\end{aligned}
$$

The figure shows a transformer. You can change the number of turns on each coil
and the primary potential difference.

**Predict first.** Do not move the sliders yet. Write down your answers.

1. If you increase the number of turns on the secondary coil, does the secondary
   potential difference go up or down?
2. If you increase the number of turns on the primary coil, does the secondary
   potential difference go up or down?

**Test.** Set the primary potential difference to 240 V. Set the primary turns to
400 and the secondary turns to 100. Read the secondary potential difference. Now
swap the two numbers of turns and read it again.

:::figure transformer-turns

**Explain.** The two coils are wound on the same iron core, so the same changing
field passes through each turn of both coils. Why does this make the potential
difference per turn the same in both coils? Write your answer in two or three
sentences.

## 6. Power and the national grid

The **national grid** carries electrical energy around the country. It uses
transformers to step the potential difference up for transmission, and then
step it down again for homes and factories.

For the same power, a higher potential difference means a smaller current,
because $P = VI$. A smaller current transfers less energy to the thermal store of
the transmission cables as they heat up. So transmitting at high voltage wastes
less energy. That is why the grid uses very high voltages for the long distance
part of the journey.

> **Watch out.** A transformer does not work with direct current. With d.c. the
> field in the core does not change, so no potential difference is induced in the
> secondary coil. Also take care with the two ratios: the ratio of the potential
> differences equals the ratio of the turns, but the ratio of the currents is the
> other way round. Re-check whether your answer is a step-up or a step-down.

## Progress check

Return to the chapter problem. The yard is supplied at 12 000 V and steps this
down to 240 V. Work out the number of turns on the secondary coil of the
transformer, and the current in the 12 000 V transmission line when the yard uses
24 kW. Say whether the transmission current is larger or smaller than the current
at 240 V.

## You should now be able to

- describe the generator effect, and the factors that affect the size and
  direction of the induced potential difference;
- explain how an alternator generates a.c. and a dynamo generates d.c.;
- describe how a transformer works, and explain why it needs a.c.;
- use $\dfrac{V_p}{V_s} = \dfrac{n_p}{n_s}$ to find a potential difference or a
  number of turns;
- use $V_s I_s = V_p I_p$ to find a current in a transformer;
- explain why the national grid transmits power at high voltage.
