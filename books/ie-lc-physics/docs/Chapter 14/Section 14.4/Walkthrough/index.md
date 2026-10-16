---
title: 14.4 Electrical power and energy — Learn
chapter: 14
chapter_title: Electric circuits
section: '14.4'
section_title: Electrical power and energy
tier: O
refs:
- '3.3'
kind: walkthrough
---

# 14.4 Electrical power and energy — Learn

**Prerequisites:** current, potential difference and resistance from Sections 14.1 and
14.2; series and parallel circuits from Section 14.3; work and energy from Chapter 4.

**Objectives:** use $P = VI$, $P = I^2R$ and $P = \dfrac{V^2}{R}$; use $E = Pt$;
calculate the cost of electrical energy in kilowatt-hours; choose a fuse rating.

By the end of this section, you can work out the power of any component and the energy
it transfers in a given time.

## Power

**Power** is the rate at which energy is transferred. If a component transfers an energy
$E$ in a time $t$, its power is

$$P = \frac{E}{t}$$

- $P$ is the power, in watts (W);
- $E$ is the energy transferred, in joules (J);
- $t$ is the time, in seconds (s).

One watt is one joule per second. A 60 W lamp transfers 60 J every second.

For an electrical component, the energy transferred to a charge $Q$ is $W = VQ$, and the
current is $I = \dfrac{Q}{t}$. Dividing one by the other gives the power:

$$P = VI$$

## The other two forms

Ohm's law, $V = IR$, lets you write the power in two more ways. Substitute $V = IR$ into
$P = VI$:

$$P = I^2R$$

Or substitute $I = \dfrac{V}{R}$ into $P = VI$:

$$P = \frac{V^2}{R}$$

All three are the same equation rearranged. Choose the one that fits the quantities you
know.

- Use $P = VI$ when you know both the potential difference and the current.
- Use $P = I^2R$ when you know the current, or when two components are in series and
  carry the same current.
- Use $P = \dfrac{V^2}{R}$ when you know the potential difference, or when two
  components are in parallel and have the same potential difference.

**Example 1.** A potential difference of 12 V drives a current of 0.50 A through a lamp.
Calculate its power.

$$
P = VI = 12 \times 0.50 = 6.0\,\text{W}
$$

**Example 2.** A current of 2.0 A flows through a 4.0 Ω resistor. Calculate the power
transferred to it.

$$
P = I^2R = 2.0^2 \times 4.0 = 4.0 \times 4.0 = 16\,\text{W}
$$

**Example 3.** A potential difference of 6.0 V is across a 12 Ω resistor. Calculate the
power transferred to it.

$$
P = \frac{V^2}{R} = \frac{6.0^2}{12} = \frac{36}{12} = 3.0\,\text{W}
$$

## Energy and the electricity bill

Energy is power multiplied by time:

$$E = Pt$$

In joules, the time must be in seconds. A 2.0 kW heater running for 3.0 hours transfers

$$
E = Pt = 2.0 \times 10^3 \times 1.08 \times 10^4 = 2.16 \times 10^7\,\text{J}
$$

That is a large number, and it is the reason electricity is sold in a larger unit. One
**kilowatt-hour** (kWh) is the energy transferred by a 1 kW appliance in 1 hour. It is
$3.6 \times 10^6$ J. The same heater in kilowatt-hours:

$$
E = Pt = 2.0 \times 3.0 = 6.0\,\text{kWh}
$$

The cost is the number of kilowatt-hours multiplied by the price of one.

**Example 4.** A 1.5 kW appliance runs for 4.0 hours. Electricity costs €0.30 per
kilowatt-hour. Calculate the cost.

$$
E = Pt = 1.5 \times 4.0 = 6.0\,\text{kWh}
$$

$$
\text{cost} = 6.0 \times €0.30 = €1.80
$$

## Fuses and circuit breakers

A **fuse** is a thin piece of wire that melts when the current through it is too large.
A **circuit breaker** does the same job with a switch that trips. Both break the circuit
before the current can heat the wiring enough to start a fire.

A fuse is rated by the largest current it can carry without melting. To choose one, find
the current the appliance draws and pick the next rating above it. Common ratings are
3 A, 5 A and 13 A.

**Example 5.** An appliance of power 2.3 kW is connected to a 230 V supply. Calculate
the current it draws, and choose a fuse.

$$
I = \frac{P}{V} = \frac{2300}{230} = 10\,\text{A}
$$

A 13 A fuse is the right choice, because a 10 A fuse would be too close to the working
current and might melt in normal use.

> **Watch out.** The kilowatt-hour is a unit of **energy**, not power. A 2 kW heater and
> a 1 kW heater both use kilowatt-hours, and the 2 kW one uses them twice as fast. Also,
> the three power equations are one equation, so a question that gives you a current and
> a resistance wants $P = I^2R$, not $P = VI$ with a potential difference you have not
> been given.

## Progress check

Back to the chapter problem. The caravan battery supplies a 12 Ω lamp, a 6.0 Ω lamp and
a 4.0 Ω heater, all in parallel across 12 V. Each has the full 12 V across it.

Find the power of each appliance and the total power. Then find the energy transferred in
a three-hour evening, in kilowatt-hours. Keep the total power, because Section 14.5 uses
the current from the battery to explain why the real power is lower than this ideal
value.

## You should now be able to

- define power as the rate of energy transfer, and use $P = \dfrac{E}{t}$;
- use $P = VI$, $P = I^2R$ and $P = \dfrac{V^2}{R}$, and choose the form that fits the
  quantities you know;
- use $E = Pt$ to find an energy in joules;
- calculate an energy in kilowatt-hours and work out the cost;
- find the current an appliance draws and choose a fuse rating above it.
