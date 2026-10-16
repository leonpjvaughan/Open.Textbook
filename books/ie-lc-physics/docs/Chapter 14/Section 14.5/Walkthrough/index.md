---
title: 14.5 Internal resistance and emf — Learn
chapter: 14
chapter_title: Electric circuits
section: '14.5'
section_title: Internal resistance and emf
tier: H
refs:
- '3.3'
kind: walkthrough
---

# 14.5 Internal resistance and emf — Learn

**Prerequisites:** current, potential difference and resistance from Section 14.1;
Ohm's law from Section 14.2; series circuits from Section 14.3; power from Section 14.4.

**Objectives:** define electromotive force and internal resistance; use $V = E - Ir$;
calculate the lost volts; describe how to measure the electromotive force and the
internal resistance of a cell.

By the end of this section, you can explain why the terminal potential difference of a
real battery falls when the current rises.

## Electromotive force

A cell does not create charge. It transfers energy to the charge that passes through it,
and that energy is what drives the current around the circuit.

The **electromotive force** (emf) of a source is the energy transferred to each unit of
charge by the source. It is measured in volts, and its symbol is $E$.

Despite its name, the electromotive force is not a force. It is an energy per unit
charge, exactly like a potential difference. The difference is where it comes from: an
emf is supplied by the source, while a potential difference is measured between two
points in the circuit.

## Internal resistance

A real cell is made of materials that resist the flow of charge, just as a wire does. The
cell has its own **internal resistance**, $r$.

So the circuit has two parts in series: the external circuit, of resistance $R$, and the
internal resistance of the cell, $r$. The emf drives the charge through both.

$$E = I(R + r)$$

Rearranged, the current is

$$I = \frac{E}{R + r}$$

The internal resistance is why the current from a real cell is always a little smaller
than the ideal calculation predicts.

## Terminal potential difference

The potential difference actually available between the terminals of the cell is the
**terminal potential difference**, $V$. It is the potential difference across the
external circuit:

$$V = IR$$

The emf is shared between the external circuit and the internal resistance. The part
that is transferred inside the cell is the **lost volts**:

$$\text{lost volts} = Ir$$

So the terminal potential difference is

$$V = E - Ir$$

When no current flows, the lost volts are zero and the terminal potential difference
equals the emf. When a large current flows, the lost volts are large and the terminal
potential difference falls. This is the equation behind the dimming lamps in the chapter
problem.

**Example 1.** A cell has an emf of 1.5 V and an internal resistance of 0.30 Ω. It
delivers a current of 0.50 A. Calculate the lost volts and the terminal potential
difference.

$$
\text{lost volts} = Ir = 0.50 \times 0.30 = 0.15\,\text{V}
$$

$$
V = E - Ir = 1.5 - 0.15 = 1.35\,\text{V}
$$

**Example 2.** A battery has an emf of 12 V and an internal resistance of 0.50 Ω. It is
connected to a 5.5 Ω resistor. Calculate the current and the terminal potential
difference.

$$
I = \frac{E}{R + r} = \frac{12}{5.5 + 0.50} = \frac{12}{6.0} = 2.0\,\text{A}
$$

$$
V = E - Ir = 12 - 2.0 \times 0.50 = 12 - 1.0 = 11\,\text{V}
$$

The same answer comes from $V = IR = 2.0 \times 5.5 = 11$ V, because the terminal
potential difference is the potential difference across the external resistor.

**Example 3.** A cell has an emf of 9.0 V and an internal resistance of 1.5 Ω. When it
is in use, the terminal potential difference is 7.5 V. Calculate the current.

The lost volts are $E - V = 9.0 - 7.5 = 1.5$ V, so

$$
I = \frac{\text{lost volts}}{r} = \frac{1.5}{1.5} = 1.0\,\text{A}
$$

## Measuring the emf and the internal resistance

Connect a voltmeter across a cell with nothing else in the circuit. No current flows, so
there are no lost volts, and the voltmeter reads the emf directly. This is the
**open-circuit** potential difference.

To find the internal resistance, connect a variable resistor in series with an ammeter,
and a voltmeter across the cell. Take several pairs of readings of current and terminal
potential difference, and plot a graph of $V$ against $I$.

$$V = E - Ir$$

This is the equation of a straight line, $y = c + mx$, with $V$ on the vertical axis and
$I$ on the horizontal axis.

- The **intercept** on the vertical axis is the emf $E$.
- The **gradient** is $-r$, so the internal resistance is the size of the gradient.

:::figure internal-resistance

**Predict, then test.** Before you move either slider, predict what happens to the
terminal potential difference when the current doubles. Then move the current slider and
check. Now increase the internal resistance and describe what happens to the gradient of
the line. Write a sentence explaining why a battery with a larger internal resistance
loses more of its emf when a large current flows.

## Power in a real circuit

The emf supplies energy at a rate $EI$. Some of that energy is transferred to the
external circuit and the rest is transferred inside the cell.

$$P_{\text{total}} = EI \qquad P_{\text{internal}} = I^2r \qquad P_{\text{external}} = VI$$

The three are linked by $P_{\text{total}} = P_{\text{external}} + P_{\text{internal}}$,
which is $V = E - Ir$ multiplied by $I$.

**Example 4.** A battery of emf 12 V and internal resistance 0.50 Ω delivers a current
of 2.0 A. Calculate the total power, the power wasted inside the battery and the power
delivered to the external circuit.

$$
P_{\text{total}} = EI = 12 \times 2.0 = 24\,\text{W}
$$

$$
P_{\text{internal}} = I^2r = 2.0^2 \times 0.50 = 2.0\,\text{W}
$$

$$
P_{\text{external}} = 24 - 2.0 = 22\,\text{W}
$$

That matches $VI = 11 \times 2.0 = 22$ W, using the terminal potential difference.

> **Watch out.** The emf and the terminal potential difference are not the same number
> unless no current is flowing. A voltmeter across a working cell reads the terminal
> potential difference, not the emf. Also, the lost volts are not lost from the circuit:
> they are energy transferred inside the cell, which is why a working battery gets warm.

## Progress check

Back to the chapter problem. The caravan battery has an emf of 12 V and an internal
resistance of 0.50 Ω. When the lamps and the heater are all switched on, the current
through the battery is 4.8 A.

Calculate the lost volts and the terminal potential difference. Then say, in one
sentence, what this means for the potential difference across each lamp and for how
bright the lamps are. That is the chapter problem resolved: the battery is labelled
12 V, but under load it delivers less.

## You should now be able to

- define the electromotive force of a source, and say that it is an energy per unit
  charge, not a force;
- define internal resistance and explain why the current from a real cell is smaller
  than the ideal value;
- use $E = I(R + r)$, $V = E - Ir$ and the lost volts $Ir$;
- find the emf and the internal resistance of a cell from a graph of terminal potential
  difference against current;
- explain why the terminal potential difference falls as the current rises, and why a
  battery gets warm when it supplies a large current.
