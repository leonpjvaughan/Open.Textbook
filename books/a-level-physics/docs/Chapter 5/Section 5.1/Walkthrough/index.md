---
title: 5.1 Current, charge and emf — Learn
chapter: 5
chapter_title: Electric circuits
section: '5.1'
section_title: Current, charge and emf
refs:
- AP5
kind: walkthrough
---

# 5.1 Current, charge and emf — Learn

**Prerequisites:** SI units and prefixes from Section 1.1; standard form;
rearranging a formula; the idea of energy transferred, and the unit of energy,
the joule; charge and current from earlier science.

**By the end of this section you can:** define electric current and use
$I = \dfrac{\Delta Q}{\Delta t}$; find the charge that flows and the number of
charge carriers; explain the difference between emf and potential difference;
and use the emf, the internal resistance and the terminal potential difference
of a source.

## 1. Current is the flow of charge

A current is a flow of electric charge. In a metal wire, the charge carriers are
**electrons**. Each electron carries a negative charge. In a solution or a gas
the carriers may be ions.

The **electric current** is the rate of flow of charge.

$$ I = \frac{\Delta Q}{\Delta t} $$

Here $\Delta$ means the change in a quantity: $\Delta Q$ is the charge that flows
in the time $\Delta t$. The unit of current is the **ampere**, $\text{A}$. One ampere is one coulomb per
second. Charge is measured in **coulombs**, $\text{C}$. Rearranged, this gives
the charge that flows in a time.

$$ \Delta Q = I\,\Delta t $$

By convention, the direction of current is from the positive terminal of a cell
around the circuit to the negative terminal. This is called the **conventional
current**. The electrons drift the other way, because they are negative. The two
directions are opposite, and a circuit diagram always shows the conventional
current.

**Worked example 1.** A current of $0.50\,\text{A}$ flows through a lamp for
$30\,\text{s}$. Find the charge that passes through the lamp.

$$ \Delta Q = I\,\Delta t = 0.50 \times 30 = 15\,\text{C} $$

The charge is $15\,\text{C}$.

## 2. The elementary charge

Charge is not continuous. It comes in packets. The smallest packet is the
**elementary charge**, $e$, carried by one electron or one proton.

$$ e = 1.60 \times 10^{-19}\,\text{C} $$

Every charge you meet in a circuit is a whole multiple of $e$. For $n$ electrons,
the total charge is

$$ Q = n e $$

**Worked example 2.** A charge of $15\,\text{C}$ flows through a wire. Find the
number of electrons that pass a point in the wire.

$$
\begin{aligned}
Q &= ne \\
n &= \frac{Q}{e} = \frac{15}{1.60 \times 10^{-19}} \\
  &= 9.4 \times 10^{19}
\end{aligned}
$$

About $9.4 \times 10^{19}$ electrons pass the point. That is a very large number,
which is why the charge on one electron is measured in tiny fractions of a
coulomb.

## 3. Try it: charge, current and time

The figure draws a rectangle. Its height is the current and its width is the
time, so its area is the charge that flows. The readout also gives the number of
electrons in that charge.

**Predict first.** Do not move the sliders yet. Write down your answers.

1. If you double the current and keep the time the same, what happens to the
   charge?
2. If you double the time instead, what happens to the charge?
3. A charge of $1\,\text{C}$ is carried by many electrons. Is that number larger
   or smaller than a million?

**Test.** Set the time to $30\,\text{s}$ and move the current slider from
$0.5\,\text{A}$ to $5.0\,\text{A}$. Then keep the current at $2.0\,\text{A}$
and move the time slider. Watch the rectangle and the number of electrons.

**Explain.** Explain why the area of the rectangle is measured in coulombs when
the axes are in amperes and seconds. Write two or three sentences.

:::figure charge-flow

## 4. emf and potential difference

A cell or battery is a source of energy. It does work on the charge that passes
through it. The **electromotive force** (emf) of a source is the energy
transferred to each unit of charge by the source.

$$ \varepsilon = \frac{W}{Q} $$

The emf is measured in volts. A source of emf $1\,\text{V}$ transfers
$1\,\text{J}$ of energy to each coulomb of charge that passes through it.

A component also transfers energy. The **potential difference** (pd) across a
component is the energy transferred from each unit of charge by that component.

$$ V = \frac{W}{Q} $$

The unit of both emf and potential difference is the **volt**, $\text{V}$, which
is one joule per coulomb. emf and pd are both measured in volts, but they are not
the same idea. The emf is the energy given to the charge by the source. A
potential difference is the energy taken from the charge by a component. Energy is
conserved, so around a whole circuit the energy given is equal to the energy
taken.

**Worked example 3.** A charge of $15\,\text{C}$ passes through a battery of emf
$12\,\text{V}$. Find the energy transferred to the charge.

$$ W = \varepsilon Q = 12 \times 15 = 180\,\text{J} $$

The battery transfers $180\,\text{J}$ of energy to the charge.

## 5. Internal resistance and terminal pd

A real source has some resistance inside it. This is its **internal
resistance**, $r$. When a current flows, some energy is wasted inside the source.
The potential difference across the terminals is less than the emf.

The emf is the total pd around the circuit, shared between the internal
resistance and the external components.

$$ \varepsilon = I(R + r) $$

The terminal potential difference $V$ is the pd across the external resistance
$R$.

$$ V = \varepsilon - Ir $$

The term $Ir$ is the **lost volts**, the pd across the internal resistance. The
internal resistance heats the source, which is why a battery warms up when a
large current is drawn from it.

**Worked example 4.** A battery has an emf of $12\,\text{V}$ and an internal
resistance of $0.15\,\Omega$. It drives a current of $2.0\,\text{A}$ through an
external circuit. Find the terminal potential difference and the external
resistance.

$$
\begin{aligned}
V &= \varepsilon - Ir \\
  &= 12 - (2.0 \times 0.15) \\
  &= 12 - 0.30 = 11.7\,\text{V}
\end{aligned}
$$

The external resistance is $R = \dfrac{V}{I} = \dfrac{11.7}{2.0} = 5.85\,\Omega$.

> **Watch out.** The terminal pd of a source is not always equal to its emf.
> When no current flows, $I = 0$ and the terminal pd equals the emf. When a large
> current flows, the lost volts $Ir$ are large, and the terminal pd is much
> smaller. Check the order: the emf is fixed by the source, and the terminal pd
> depends on the current.

## 6. Energy, work and power

The energy transferred by a component is the charge that passes through it
multiplied by the potential difference across it.

$$ W = QV $$

Because $Q = I\Delta t$, the same energy can be written with current and time.

$$ W = V I \Delta t $$

Power is the rate of energy transfer, so

$$ P = VI $$

**Worked example 5.** A component carries a current of $2.0\,\text{A}$ with a
potential difference of $11.7\,\text{V}$ across it for $5.0\,\text{s}$. Find the
energy transferred and the power.

$$
\begin{aligned}
W &= VIt = 11.7 \times 2.0 \times 5.0 = 117\,\text{J} \\
P &= VI = 11.7 \times 2.0 = 23.4\,\text{W}
\end{aligned}
$$

The component transfers $117\,\text{J}$ of energy in $5.0\,\text{s}$, at a power
of about $23\,\text{W}$.

## Progress check

Return to the chapter problem. The battery has an emf of $12\,\text{V}$ and an
internal resistance of $0.15\,\Omega$. While the capacitor charges, the unit
draws a current of $2.0\,\text{A}$ from the battery.

1. Find the terminal potential difference of the battery.
2. Find the energy transferred to the external circuit by a charge of $10\,\text{C}$.
3. Find the charge that flows from the battery in $5.0\,\text{s}$.

If question 1 goes wrong, subtract the lost volts $Ir$ from the emf. If question
2 goes wrong, use $W = QV$ with the terminal pd, not the emf. If question 3 goes
wrong, rearrange $I = \dfrac{\Delta Q}{\Delta t}$.

## You should now be able to

- define electric current and use $I = \dfrac{\Delta Q}{\Delta t}$;
- find the charge that flows in a given time;
- find the number of charge carriers from a total charge;
- explain the difference between emf and potential difference;
- use $\varepsilon = I(R + r)$ and $V = \varepsilon - Ir$;
- calculate the energy transferred by a component with $W = QV$ or $W = VIt$;
- calculate the power in a component with $P = VI$.
