---
title: 6.2 Series and parallel circuits — Learn
chapter: 6
chapter_title: Electricity
section: '6.2'
section_title: Series and parallel circuits
tier: F
refs:
- EL2
kind: walkthrough
---

# 6.2 Series and parallel circuits — Learn

**Prerequisites:** Section 6.1, especially current as a flow of charge, the
equations $Q = It$ and $V = IR$, and reading a circuit diagram.

**By the end of this section you can:** describe the difference between series
and parallel circuits; calculate currents, potential differences and
resistances in series circuits; and explain why adding a resistor in series
raises the total resistance while adding one in parallel lowers it.

## 1. Two ways to join components

Components can be joined in two ways.

- In **series**, the components are joined one after another, so the same
  current flows through each one.
- In **parallel**, the components are joined across the same two points, so the
  potential difference across each one is the same.

Some circuits include both series and parallel parts. A parallel pair can sit in
series with another component, for example.

## 2. Series circuits

For components connected in series:

- the current is the same through each component;
- the total potential difference of the supply is shared between the
  components;
- the total resistance of two components is the sum of their resistances.

The total resistance is called the **equivalent resistance**. It is the single
resistance that would give the same current as the whole series combination.

$$ R_{total} = R_1 + R_2 $$

where $R_{total}$ is the total resistance, and $R_1$ and $R_2$ are the
resistances in ohms.

Adding a resistor in series raises the total resistance. A larger resistance
gives a smaller current for the same supply, so the current through every
component falls.

## 3. Parallel circuits

For components connected in parallel:

- the potential difference across each component is the same;
- the total current through the whole circuit is the sum of the currents through
  the separate branches;
- the total resistance of two resistors is less than the resistance of the
  smallest individual resistor.

Adding a resistor in parallel lowers the total resistance. The new branch gives
the current another path to follow, so the total current from the supply rises.
A larger total current for the same supply means a smaller total resistance.

## 4. Worked examples

**Worked example 1.** A 4.0 $\Omega$ resistor and a 6.0 $\Omega$ resistor are
connected in series with a 5.0 V supply. Calculate the total resistance, the
current, and the potential difference across each resistor.

Here $V$ is the supply potential difference and $I$ is the current through the
circuit.

$$
\begin{aligned}
R_{total} &= R_1 + R_2 \\
          &= 4.0 + 6.0 \\
          &= 10\,\Omega
\end{aligned}
$$

$$
\begin{aligned}
I &= \frac{V}{R_{total}} \\
  &= \frac{5.0}{10} \\
  &= 0.50\,\text{A}
\end{aligned}
$$

The current is the same through both resistors, so each one carries 0.50 A.

$$
\begin{aligned}
V_1 &= IR_1 \\
    &= 0.50 \times 4.0 \\
    &= 2.0\,\text{V}
\end{aligned}
$$

$$
\begin{aligned}
V_2 &= IR_2 \\
    &= 0.50 \times 6.0 \\
    &= 3.0\,\text{V}
\end{aligned}
$$

Check: $2.0\,\text{V} + 3.0\,\text{V} = 5.0\,\text{V}$, which is the supply
potential difference. The supply is shared between the two resistors.

**Worked example 2.** A 10 $\Omega$ resistor and a 20 $\Omega$ resistor are
connected in parallel across the same 5.0 V supply. Find the current through
each resistor, and the total current from the supply.

The potential difference across each resistor is 5.0 V, because they are in
parallel.

$$
\begin{aligned}
I_1 &= \frac{V}{R_1} \\
    &= \frac{5.0}{10} \\
    &= 0.50\,\text{A}
\end{aligned}
$$

$$
\begin{aligned}
I_2 &= \frac{V}{R_2} \\
    &= \frac{5.0}{20} \\
    &= 0.25\,\text{A}
\end{aligned}
$$

$$
\begin{aligned}
I_{total} &= I_1 + I_2 \\
          &= 0.50 + 0.25 \\
          &= 0.75\,\text{A}
\end{aligned}
$$

The total resistance of the parallel pair is less than 10 $\Omega$, the smaller
of the two resistors, because the total current from the supply is larger than
either branch current.

## 5. Comparing series and parallel

The figure shows two lamps connected to the same battery. You can join them in
series or in parallel, and you can remove one lamp from its holder.

**Predict first.** Do not press the buttons yet. Write down your answers.

1. In series, what happens to the other lamp when one lamp is removed?
2. In parallel, what happens to the other lamp when one lamp is removed?
3. In which arrangement are the two lamps brighter?

**Test.** Press each button and watch the lamps and the readouts. Then remove
one lamp in each arrangement and check your predictions.

:::figure series-parallel

**Explain.** In the parallel arrangement, each lamp still gets the full battery
potential difference. Why does removing one lamp in series switch the other lamp
off, while removing one lamp in parallel leaves the other lamp lit? Write your
answer in two or three sentences.

> **Watch out.** Two common errors are worth checking now. First, in parallel the
> branch currents need not be equal; it is the potential differences that are
> equal. Second, the total resistance of a parallel pair is **less** than the
> smallest resistor, not more. If you find the resistor sum rules confusing,
> remember what each connection does to the current: series adds resistance,
> parallel opens another path. Re-check your answer by asking whether the total
> current should be bigger or smaller.

## 6. Progress check

Return to the chapter problem. The pump circuit has a 12 V battery and two
resistors of 6.0 $\Omega$ and 2.0 $\Omega$ in series.

1. Calculate the total resistance of the circuit.
2. Calculate the current through the pump circuit.
3. Calculate the potential difference across each resistor.

## You should now be able to

- describe the difference between a series circuit and a parallel circuit;
- state that the current is the same through components in series;
- state that the potential difference is the same across components in parallel;
- use $R_{total} = R_1 + R_2$ for resistors in series;
- calculate the current and the potential differences in a series circuit;
- calculate the branch currents and the total current in a parallel circuit;
- explain why a series connection raises the total resistance and a parallel
  connection lowers it.
