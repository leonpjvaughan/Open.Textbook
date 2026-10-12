---
title: 5.3 Direct-current circuits — Learn
chapter: 5
chapter_title: Electric circuits
section: '5.3'
section_title: Direct-current circuits
dfe:
- AP5
kind: walkthrough
---

# 5.3 Direct-current circuits — Learn

**Prerequisites:** current, charge and emf from Section 5.1; resistance,
Ohm's law and resistivity from Section 5.2; rearranging a formula; fractions.

**By the end of this section you can:** find the equivalent resistance of
resistors in series and in parallel; use Kirchhoff's laws; analyse a circuit that
has an internal resistance; and use a potential divider.

## 1. Resistors in series

In a **series** circuit the components form a single path. The same current flows
through each component. The potential difference of the source is shared between
them.

The equivalent resistance of resistors in series is the sum of the individual
resistances.

$$ R_{\text{total}} = R_1 + R_2 + R_3 + \ldots $$

**Worked example 1.** A $4.0\,\Omega$ resistor and a $6.0\,\Omega$ resistor are
joined in series. Find the equivalent resistance and the current when the series
pair is connected to a $10\,\text{V}$ supply.

$$ R_{\text{total}} = 4.0 + 6.0 = 10\,\Omega $$

$$ I = \frac{V}{R_{\text{total}}} = \frac{10}{10} = 1.0\,\text{A} $$

The equivalent resistance is $10\,\Omega$ and the current is $1.0\,\text{A}$.
Each resistor carries $1.0\,\text{A}$. The pds are $4.0\,\text{V}$ and
$6.0\,\text{V}$, and they add to the supply pd of $10\,\text{V}$.

## 2. Resistors in parallel

In a **parallel** circuit the components are connected across the same two
points. The potential difference across each component is the same. The current
from the source splits between the branches and rejoins.

For resistors in parallel, the reciprocals add.

$$ \frac{1}{R_{\text{total}}} = \frac{1}{R_1} + \frac{1}{R_2} + \frac{1}{R_3} + \ldots $$

The equivalent resistance is always smaller than the smallest individual
resistance. Adding a branch gives the current another route, so the total current
rises for the same pd.

**Worked example 2.** Two $100\,\Omega$ resistors are connected in parallel. Find
the equivalent resistance.

$$
\begin{aligned}
\frac{1}{R_{\text{total}}} &= \frac{1}{100} + \frac{1}{100} = \frac{2}{100} \\
R_{\text{total}} &= \frac{100}{2} = 50\,\Omega
\end{aligned}
$$

For two equal resistors in parallel, the equivalent resistance is half of one of
them. The value is $50\,\Omega$.

## 3. Try it: current in parallel branches

The figure shows two resistors in parallel across an ideal $12\,\text{V}$
supply. Each wire is drawn thicker where the current is larger, and every current
is also written out.

**Predict first.** Do not move the controls yet. Write down your answers.

1. The two branches start at $10\,\Omega$ and $20\,\Omega$. Which branch
   carries the larger current, and is it twice as large?
2. When you change the resistance in one branch, does the current in the other
   branch change?
3. Is the current from the supply larger than the current in either branch?

**Test.** Read the three currents and the equivalent resistance. Move one
slider from $20\,\Omega$ to $2\,\Omega$ and watch all four values. Then set both
branches to $2\,\Omega$.

**Explain.** Explain why the current in branch 1 depends on the supply potential
difference and $R_1$ only, and not on $R_2$. Then explain why the current from
the supply is the sum of the two branch currents. Write two or three sentences.

:::figure parallel-branch-current

## 4. Kirchhoff's laws

Two rules follow from the conservation of charge and of energy.

**The junction rule.** The total current entering a junction equals the total
current leaving it. Charge is not lost or stored at a junction.

$$ \sum I_{\text{in}} = \sum I_{\text{out}} $$

**The loop rule.** Around any closed loop in a circuit, the sum of the emfs
equals the sum of the potential differences. Energy is conserved.

$$ \sum \varepsilon = \sum V $$

**Worked example 3.** A current of $1.0\,\text{A}$ enters a junction. One branch
carries $0.30\,\text{A}$ and a second carries $0.20\,\text{A}$. Find the current
in the third branch, which leaves the junction.

The current leaving must equal the current entering.

$$ I_3 = 1.0 - 0.30 - 0.20 = 0.50\,\text{A} $$

The third branch carries $0.50\,\text{A}$.

## 5. Circuits with a source of internal resistance

A real source has an internal resistance $r$. The emf drives the current through
the internal resistance and through the external circuit. So the current is

$$ I = \frac{\varepsilon}{R + r} $$

where $R$ is the equivalent resistance of the external circuit. The terminal
potential difference is the pd across $R$.

$$ V = IR = \varepsilon - Ir $$

**Worked example 4.** A battery of emf $12\,\text{V}$ and internal resistance
$0.15\,\Omega$ is joined to an external resistance of $5.85\,\Omega$. Find the
current, the terminal pd and the power wasted inside the battery.

$$
\begin{aligned}
I &= \frac{\varepsilon}{R + r} = \frac{12}{5.85 + 0.15} = \frac{12}{6.00}
   = 2.0\,\text{A} \\
V &= \varepsilon - Ir = 12 - (2.0 \times 0.15) = 11.7\,\text{V} \\
P_{\text{internal}} &= I^2 r = 2.0^2 \times 0.15 = 0.60\,\text{W}
\end{aligned}
$$

The current is $2.0\,\text{A}$, the terminal pd is $11.7\,\text{V}$, and
$0.60\,\text{W}$ is wasted as heat inside the battery.

## 6. The potential divider

Two resistors in series divide the supply potential difference between them. The
potential difference across one resistor is called the **output** potential
difference.

$$ V_{\text{out}} = V_{\text{in}} \times \frac{R_2}{R_1 + R_2} $$

The output pd is the fraction $\dfrac{R_2}{R_1 + R_2}$ of the input pd. A
potential divider can give a smaller, fixed pd from a larger supply. If one
resistor is replaced by a thermistor or a light-dependent resistor, the output pd
changes with temperature or light, so it becomes a sensor.

**Worked example 5.** A $4.0\,\text{k}\Omega$ resistor and a $2.0\,\text{k}\Omega$
resistor are connected in series across a $12\,\text{V}$ supply. Find the
potential difference across the $2.0\,\text{k}\Omega$ resistor.

$$
\begin{aligned}
V_{\text{out}} &= 12 \times \frac{2.0}{4.0 + 2.0} \\
               &= 12 \times \frac{2.0}{6.0} = 4.0\,\text{V}
\end{aligned}
$$

The output pd is $4.0\,\text{V}$.

> **Watch out.** In the potential divider equation it is the resistor across which
> the output is measured that goes on the top, not always the larger one. A
> common error is to swap the two resistances. Check your answer: if the two
> resistances are equal, the output is half the input. If the output resistor is
> the smaller one, the output must be less than half the input.

## Progress check

Return to the chapter problem. The unit is tested on a load of two
$100\,\Omega$ resistors in parallel, which stands in for a patient. The paddles
and the chest in use have a resistance of $50\,\Omega$. The leads have a
resistance of $6.5 \times 10^{-3}\,\Omega$.

1. Find the equivalent resistance of the test load.
2. Find the total resistance of the discharge path when the leads are in series
   with the chest.
3. Explain whether the leads change the total resistance by a significant amount.

If question 1 goes wrong, use the parallel rule; for two equal resistors the
answer is half of one. If question 2 goes wrong, remember that resistances in
series add. If question 3 goes wrong, compare the lead resistance with the chest
resistance as a fraction.

## You should now be able to

- find the equivalent resistance of resistors in series and in parallel;
- use Kirchhoff's junction rule and loop rule;
- analyse a circuit that includes the internal resistance of the source;
- calculate the terminal potential difference of a source;
- use the potential divider equation to find an output potential difference;
- explain how a thermistor or a light-dependent resistor makes a potential
  divider into a sensor.
