---
title: 14.5 Internal resistance and emf — Practise with help
chapter: 14
chapter_title: Electric circuits
section: '14.5'
section_title: Internal resistance and emf
tier: H
refs:
- '3.3'
kind: guided-problems
---

# 14.5 Internal resistance and emf — Practise with help

## Warm-up: remember

1. State Ohm's law and write down the equation that goes with it.
2. A 12 V battery is connected to a 6.0 Ω resistor. Ignoring the internal resistance,
   calculate the current.

<details markdown="1">
<summary>Answers and feedback</summary>

1. The current through a metallic conductor is directly proportional to the potential
   difference across it, provided its temperature stays constant. The equation is
   $V = IR$.
2. $I = \dfrac{V}{R} = \dfrac{12}{6.0} = 2.0\,\text{A}$. This section adds the internal
   resistance to the circuit, so the real current is a little smaller than 2.0 A.

</details>

:::figure warm-up-gate


## Practise with help

**1.** A cell has an emf of 1.5 V and an internal resistance of 0.40 Ω. It delivers a
current of 0.30 A. Calculate the lost volts and the terminal potential difference.

<details markdown="1">
<summary>Hint</summary>

The lost volts are $Ir$, and the terminal potential difference is $E - Ir$.

<details markdown="1">
<summary>Next step</summary>

Lost volts $= 0.30 \times 0.40 = 0.12$ V, then subtract from 1.5 V.

<details markdown="1">
<summary>Full working</summary>

$$\text{lost volts} = Ir = 0.30 \times 0.40 = 0.12\,\text{V}$$

$$V = E - Ir = 1.5 - 0.12 = 1.38\,\text{V}$$

Only 1.38 V is available to the external circuit. The rest is transferred inside the
cell.

</details>
</details>
</details>

**2.** A battery has an emf of 9.0 V and an internal resistance of 0.50 Ω. It is
connected to a 4.0 Ω resistor. Calculate the current and the terminal potential
difference.

<details markdown="1">
<summary>Hint</summary>

The total resistance is the external resistor plus the internal resistance.

<details markdown="1">
<summary>Next step</summary>

$R + r = 4.0 + 0.50 = 4.5\,\Omega$, so $I = \dfrac{9.0}{4.5}$.

<details markdown="1">
<summary>Full working</summary>

$$I = \frac{E}{R + r} = \frac{9.0}{4.0 + 0.50} = \frac{9.0}{4.5} = 2.0\,\text{A}$$

$$V = E - Ir = 9.0 - 2.0 \times 0.50 = 9.0 - 1.0 = 8.0\,\text{V}$$

Check it with the external resistor: $V = IR = 2.0 \times 4.0 = 8.0$ V. The same value,
as it must be.

</details>
</details>
</details>

**3.** A cell has an emf of 6.0 V and an internal resistance of 0.20 Ω. When it is in
use, the terminal potential difference is 5.6 V. Calculate the current.

<details markdown="1">
<summary>Hint</summary>

The lost volts are the difference between the emf and the terminal potential difference.

<details markdown="1">
<summary>Next step</summary>

Lost volts $= 6.0 - 5.6 = 0.40$ V, so $I = \dfrac{0.40}{0.20}$.

<details markdown="1">
<summary>Full working</summary>

$$\text{lost volts} = E - V = 6.0 - 5.6 = 0.40\,\text{V}$$

$$I = \frac{\text{lost volts}}{r} = \frac{0.40}{0.20} = 2.0\,\text{A}$$

The current is found from the lost volts alone, without knowing the external resistance.

</details>
</details>
</details>

**4.** A student plots the terminal potential difference of a cell on the vertical axis
against the current on the horizontal axis. The points are $(0\,\text{A}, 6.0\,\text{V})$,
$(1.0\,\text{A}, 5.5\,\text{V})$, $(2.0\,\text{A}, 5.0\,\text{V})$ and
$(3.0\,\text{A}, 4.5\,\text{V})$. Find the intercept and the gradient, and state the emf
and the internal resistance.

<details markdown="1">
<summary>Hint</summary>

The line has equation $V = E - Ir$, so the intercept is the emf and the gradient is
$-r$.

<details markdown="1">
<summary>Next step</summary>

Intercept $= 6.0$ V. Gradient $= \dfrac{4.5 - 6.0}{3.0 - 0} = -0.50$.

<details markdown="1">
<summary>Full working</summary>

The intercept on the vertical axis is the emf, because that is the terminal potential
difference when the current is zero:

$$E = 6.0\,\text{V}$$

The gradient is the change in $V$ divided by the change in $I$:

$$\text{gradient} = \frac{4.5 - 6.0}{3.0 - 0} = -0.50\,\text{V/A}$$

The gradient is $-r$, so the internal resistance is $r = 0.50\,\Omega$. The gradient is
negative because the terminal potential difference falls as the current rises.

</details>
</details>
</details>

**5.** A battery of emf 9.0 V and internal resistance 0.50 Ω delivers a current of
2.0 A. Calculate the total power supplied, the power wasted inside the battery and the
power delivered to the external circuit.

<details markdown="1">
<summary>Hint</summary>

Total power is $EI$, the power inside is $I^2r$, and the power outside is the difference.

<details markdown="1">
<summary>Next step</summary>

$EI = 9.0 \times 2.0$, and $I^2r = 2.0^2 \times 0.50$.

<details markdown="1">
<summary>Full working</summary>

$$P_{\text{total}} = EI = 9.0 \times 2.0 = 18\,\text{W}$$

$$P_{\text{internal}} = I^2r = 2.0^2 \times 0.50 = 2.0\,\text{W}$$

$$P_{\text{external}} = 18 - 2.0 = 16\,\text{W}$$

Check the last one with $VI$: the terminal potential difference is
$9.0 - 2.0 \times 0.50 = 8.0$ V, and $8.0 \times 2.0 = 16$ W.

</details>
</details>
</details>

**6.** Explain why the terminal potential difference of a battery falls when the current
it supplies rises.

<details markdown="1">
<summary>Hint</summary>

Start from $V = E - Ir$ and think about which terms change.

<details markdown="1">
<summary>Next step</summary>

The emf $E$ and the internal resistance $r$ are fixed, so the lost volts $Ir$ grow with
the current.

<details markdown="1">
<summary>Full working</summary>

The emf $E$ and the internal resistance $r$ of a battery are fixed properties of the
battery. The lost volts are $Ir$, so they grow as the current grows. Since
$V = E - Ir$, a larger current means larger lost volts and a smaller terminal potential
difference.

The energy that the lost volts represent is transferred inside the battery, which is why
a battery gets warm when it supplies a large current. It is also why the lamps in a car
dim when the starter motor draws a large current.

</details>
</details>
</details>

## A question from Section 14.4

**7.** A 12 V supply drives a current of 1.5 A through a heater. Calculate the power
transferred to the heater.

<details markdown="1">
<summary>Hint</summary>

Use $P = VI$.

<details markdown="1">
<summary>Next step</summary>

$P = 12 \times 1.5$.

<details markdown="1">
<summary>Full working</summary>

$$P = VI = 12 \times 1.5 = 18\,\text{W}$$

In this section the terminal potential difference is not always 12 V. If the battery had
an internal resistance and the current were 1.5 A, the power delivered would be
$V \times 1.5$, using the terminal potential difference rather than the emf.

</details>
</details>
</details>
