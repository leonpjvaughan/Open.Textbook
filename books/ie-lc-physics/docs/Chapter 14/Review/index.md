---
title: 'Chapter 14: Review'
chapter: 14
kind: review
---

# Chapter 14: Review

## The chapter problem, solved

**The battery that is not 12 V.** A caravan battery is labelled 12 V. Three appliances
are connected across it in parallel: a lamp of resistance 12 Ω, a second lamp of
resistance 6.0 Ω, and a heater rated at 36 W when the potential difference across it
is 12 V.

**Step 1: the resistance of the heater.** The rating gives the power at 12 V, so

$$P = \frac{V^2}{R} \qquad R = \frac{V^2}{P} = \frac{12^2}{36} = 4.0\,\Omega$$

**Step 2: the combined resistance.** The three appliances are in parallel, so

$$\frac{1}{R} = \frac{1}{12} + \frac{1}{6.0} + \frac{1}{4.0} = \frac{1}{12} + \frac{2}{12}
+ \frac{3}{12} = \frac{6}{12} = \frac{1}{2.0}$$

$$R = 2.0\,\Omega$$

That is smaller than the smallest appliance resistance, 4.0 Ω, which is always true
for a parallel combination.

**Step 3: the current and the powers, treating the battery as ideal.** If the battery
held its potential difference at 12 V, the total current would be

$$I = \frac{V}{R} = \frac{12}{2.0} = 6.0\,\text{A}$$

The branch currents would be 1.0 A, 2.0 A and 3.0 A, and they would add to 6.0 A. The
powers would be

$$P_1 = \frac{12^2}{12} = 12\,\text{W} \qquad P_2 = \frac{12^2}{6.0} = 24\,\text{W}
\qquad P_3 = 36\,\text{W}$$

giving 72 W in total.

**Step 4: the energy used in an evening.** Over 3.0 hours,

$$E = Pt = 72 \times 3.0 = 216\,\text{Wh} = 0.216\,\text{kWh}$$

which is $7.8 \times 10^{5}\,\text{J}$. In kilowatt-hours, the unit on the bill, that
is about 0.22 kWh.

**Step 5: what the old battery really does.** The battery is not ideal. It has its
own internal resistance, so some of the energy is transferred inside the battery
instead of in the appliances. When the current is large, that wasted energy is large
too, and the terminal potential difference falls. That is why the lamps dim.

<!-- tier:h -->
The internal resistance is 0.50 Ω, so the total resistance in the circuit is
$2.0 + 0.50 = 2.5\,\Omega$ and the current is

$$I = \frac{E}{R + r} = \frac{12}{2.5} = 4.8\,\text{A}$$

The lost volts are $Ir = 4.8 \times 0.50 = 2.4\,\text{V}$, so the terminal potential
difference is

$$V = E - Ir = 12 - 2.4 = 9.6\,\text{V}$$

Each appliance now has 9.6 V across it instead of 12 V. The first lamp gets
$\dfrac{9.6^2}{12} = 7.7\,\text{W}$ instead of 12 W, and the second gets 15 W instead
of 24 W.
<!-- /tier:h -->

**The answer.** The heater has a resistance of 4.0 Ω and the three appliances have a
combined resistance of 2.0 Ω. On an ideal battery they would draw 6.0 A and use 72 W,
or 0.216 kWh in a three-hour evening. A real battery has internal resistance, so its
terminal potential difference falls when the current is large. That is why the lamps
are dimmer than their 12 V labels promise.

## Mixed practice — choose the method first

Work through these without notes. For each one, decide **which relationship applies**
and say why. Three of them come from earlier chapters, and one of them asks you to
choose between two arrangements that use the same two resistors.

1. A 10 Ω resistor and a 15 Ω resistor are connected first in series and then in
   parallel. Calculate both combined resistances and check each against the two
   resistors.
2. A 230 V lamp has a power of 46 W. Calculate the current through it and its
   resistance.
3. A 3.0 kW heater runs for 2.5 hours. Calculate the energy transferred in
   kilowatt-hours, and the cost at €0.30 per kilowatt-hour.
4. Two identical resistors are connected to a battery. Which arrangement, series or
   parallel, transfers more power, and why? Answer without calculating, then check with
   numbers.
5. A 5.0 kg box is lifted 2.0 m. Calculate the energy transferred. Take
   $g = 9.8\,\text{N/kg}$. Compare it with the energy a 60 W lamp uses in 3.0 s.
6. An electric kettle transfers 340 kJ to 1.0 kg of water. Calculate the temperature
   rise. Take the specific heat capacity of water as $4200\,\text{J kg}^{-1}\,\text{K}^{-1}$.
7. A current is measured as 0.480 A on an ammeter that reads to the nearest 0.010 A.
   Calculate the percentage uncertainty in the reading.
8. A spring of spring constant 200 N/m is stretched by 0.15 m. Calculate the energy
   stored in it.
<!-- tier:h -->
9. A battery of electromotive force 9.0 V and internal resistance 1.5 Ω is connected
   to a 3.0 Ω resistor. Calculate the current, the terminal potential difference and
   the power wasted inside the battery.
<!-- /tier:h -->
10. Explain why the resistance of a filament lamp is smaller when it is first switched
    on than when it has been lit for a minute, and what that means for the current at
    the moment it is switched on.

## What you can now do

- define current, potential difference and resistance, and use $I = \dfrac{Q}{t}$,
  $V = \dfrac{W}{Q}$ and $R = \dfrac{V}{I}$ with units;
- state Ohm's law and use $V = IR$ in any direction;
- describe the current-potential difference graphs of an ohmic conductor, a filament
  lamp and a diode, and explain why the lamp and the diode are non-ohmic;
- find a combined resistance in series and in parallel, and check a parallel answer
  against the smallest resistor;
- use the current and potential difference rules to solve a circuit with more than one
  component;
- use the three forms of the power equation, and choose the one that fits the
  quantities you know;
- calculate an energy in joules and in kilowatt-hours, and work out the cost;
- choose a fuse rating from the current an appliance draws;
<!-- tier:h -->
- define electromotive force and internal resistance, and use $V = E - Ir$ to explain
  why a real battery's terminal potential difference falls under load.
<!-- /tier:h -->

## Thinking back

Look at the appliance you chose at the start of the chapter — a car, a kitchen, a
caravan, a torch.

You can now say what happens inside the battery when the second appliance switches on.
The current rises, the lost volts rise with it, and the terminal potential difference
falls. The same idea explains why the lights dim in a car when the starter motor turns.

Write down one number from your own choice: a current, a resistance or a power. Then
work out what happens to the terminal potential difference if that number doubles. If
your estimate is rough, write that down too. Saying how rough an estimate is belongs in
the physics, and it is exactly what the Physics In Practice Investigation asks you to
do.
