---
title: 5.3 Direct-current circuits — Practise with help
chapter: 5
chapter_title: Electric circuits
section: '5.3'
section_title: Direct-current circuits
refs:
- AP5
kind: guided-problems
---

# 5.3 Direct-current circuits — Practise with help

Work each problem first. Open a hint only if you are stuck, and the full working
only to check. Write the unit at every step.

## Warm-up: remember

1. A wire of resistivity $1.7 \times 10^{-8}\,\Omega\,\text{m}$ has a length of
   $1.0\,\text{m}$ and an area of $2.0 \times 10^{-7}\,\text{m}^2$. Find its
   resistance.
2. Write $3.0\,\text{k}\Omega$ in ohms.
3. A battery of emf $6.0\,\text{V}$ and internal resistance $0.50\,\Omega$ drives
   a current of $1.0\,\text{A}$. Find the terminal potential difference.

<details markdown="1">
<summary>Answers</summary>

1. $R = \dfrac{\rho L}{A} = \dfrac{1.7 \times 10^{-8} \times 1.0}{2.0 \times 10^{-7}}
   = 0.085\,\Omega$.
2. $3.0 \times 10^{3}\,\Omega$.
3. $V = \varepsilon - Ir = 6.0 - (1.0 \times 0.50) = 5.5\,\text{V}$.

If question 1 goes wrong, look again at Section 5.2. If question 2 goes wrong,
remember that kilo means $10^{3}$. If question 3 goes wrong, subtract the lost
volts from the emf.
</details>

## Practise with help

**1.** Two resistors of $3.0\,\Omega$ and $5.0\,\Omega$ are connected in series.
Find the equivalent resistance.

<details markdown="1">
<summary>Hint</summary>

For resistors in series, the resistances add.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $R_{\text{total}} = R_1 + R_2$ with $3.0$ and $5.0$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$ R_{\text{total}} = 3.0 + 5.0 = 8.0\,\Omega $$

The equivalent resistance is $8.0\,\Omega$.
</details>

**2.** Two resistors of $6.0\,\Omega$ and $3.0\,\Omega$ are connected in
parallel. Find the equivalent resistance.

<details markdown="1">
<summary>Hint</summary>

For resistors in parallel, the reciprocals add. Find $\dfrac{1}{R}$ first, then
take the reciprocal.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $\dfrac{1}{R} = \dfrac{1}{6.0} + \dfrac{1}{3.0} = \dfrac{1}{6} +
\dfrac{2}{6}$, then finish the sum.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\begin{aligned}
\frac{1}{R_{\text{total}}} &= \frac{1}{6.0} + \frac{1}{3.0}
   = \frac{1}{6} + \frac{2}{6} = \frac{3}{6} \\
R_{\text{total}} &= \frac{6}{3} = 2.0\,\Omega
\end{aligned}
$$

The equivalent resistance is $2.0\,\Omega$, which is smaller than either resistor.
</details>

**3.** A $12\,\text{V}$ supply is connected across a $2.0\,\text{k}\Omega$ and a
$4.0\,\text{k}\Omega$ resistor in series. Find the potential difference across the
$2.0\,\text{k}\Omega$ resistor.

<details markdown="1">
<summary>Hint</summary>

Use the potential divider equation. The resistor across which you want the pd
goes on the top of the fraction.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $V_{\text{out}} = 12 \times \dfrac{2.0}{2.0 + 4.0}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$ V_{\text{out}} = 12 \times \frac{2.0}{2.0 + 4.0} = 12 \times \frac{2.0}{6.0}
   = 4.0\,\text{V} $$

The output pd is $4.0\,\text{V}$, which is one third of the supply.
</details>

**4.** A battery has an emf of $9.0\,\text{V}$ and an internal resistance of
$0.25\,\Omega$. It is connected to a $4.25\,\Omega$ resistor. Find the current
and the terminal pd.

<details markdown="1">
<summary>Hint</summary>

The total resistance in the circuit is the external resistor plus the internal
resistance.
</details>

<details markdown="1">
<summary>Next step</summary>

Add $4.25 + 0.25$ to get the total, then divide the emf by it.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\begin{aligned}
I &= \frac{\varepsilon}{R + r} = \frac{9.0}{4.25 + 0.25} = \frac{9.0}{4.50}
   = 2.0\,\text{A} \\
V &= \varepsilon - Ir = 9.0 - (2.0 \times 0.25) = 8.5\,\text{V}
\end{aligned}
$$

The current is $2.0\,\text{A}$ and the terminal pd is $8.5\,\text{V}$.
</details>

**5.** At a junction, a current of $2.0\,\text{A}$ enters. Two branches leave
with currents of $0.50\,\text{A}$ and $0.80\,\text{A}$. Find the current in the
third branch that leaves the junction.

<details markdown="1">
<summary>Hint</summary>

Charge is conserved at a junction, so the current in equals the current out.
</details>

<details markdown="1">
<summary>Next step</summary>

Subtract the two known branch currents from the current entering.
</details>

<details markdown="1">
<summary>Full working</summary>

$$ I_3 = 2.0 - 0.50 - 0.80 = 0.70\,\text{A} $$

The third branch carries $0.70\,\text{A}$.
</details>

**6.** A $10\,\text{k}\Omega$ resistor and a thermistor are connected in series
across a $6.0\,\text{V}$ supply. The resistance of the thermistor is
$10\,\text{k}\Omega$ at $20\,^\circ\text{C}$ and $5.0\,\text{k}\Omega$ at
$40\,^\circ\text{C}$. The output pd is measured across the thermistor. Find the
output pd at each temperature, and explain how the circuit can act as a
temperature sensor.

<details markdown="1">
<summary>Hint</summary>

Use the potential divider equation twice, with the thermistor on the top each
time because the output is measured across it.
</details>

<details markdown="1">
<summary>Next step</summary>

At $20\,^\circ\text{C}$ the two resistances are equal, so the output is half the
supply. Then work out the second case.
</details>

<details markdown="1">
<summary>Full working</summary>

At $20\,^\circ\text{C}$:

$$ V_{\text{out}} = 6.0 \times \frac{10}{10 + 10} = 3.0\,\text{V} $$

At $40\,^\circ\text{C}$:

$$ V_{\text{out}} = 6.0 \times \frac{5.0}{10 + 5.0} = 2.0\,\text{V} $$

The output pd falls from $3.0\,\text{V}$ to $2.0\,\text{V}$ as the temperature
rises, because the resistance of the thermistor falls. A voltmeter reading the
output pd can therefore be marked with a temperature scale.
</details>
