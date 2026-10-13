---
title: 5.4 Capacitance — Learn
chapter: 5
chapter_title: Electric circuits
section: '5.4'
section_title: Capacitance
refs:
- AP5
kind: walkthrough
---

# 5.4 Capacitance — Learn

**Prerequisites:** current, charge and emf from Section 5.1; resistance from
Section 5.2; series and parallel circuits from Section 5.3; exponential decay
from the oscillation work in Chapter 3 is helpful but not required.

**By the end of this section you can:** define capacitance and use
$C = \dfrac{Q}{V}$; find the capacitance of a parallel plate capacitor; find the
energy stored in a charged capacitor; describe the exponential discharge of a
capacitor; use the time constant $\tau = RC$; and read the shape of a
charge–time or potential difference–time graph.

## 1. Capacitance

A **capacitor** stores charge. When you connect it to a source, charge builds up
on the two plates. One plate gains positive charge and the other gains an equal
negative charge. The potential difference across the capacitor rises as the
charge builds up.

The **capacitance** of a capacitor is the charge stored on one plate divided by
the potential difference across the capacitor.

$$ C = \frac{Q}{V} $$

The unit of capacitance is the **farad**, $\text{F}$. One farad is one coulomb
per volt. A capacitor of $1\,\text{F}$ stores $1\,\text{C}$ when the pd across it
is $1\,\text{V}$. The farad is a large unit, so most capacitors are measured in
microfarads ($1\,\mu\text{F} = 10^{-6}\,\text{F}$) or nanofarads
($1\,\text{nF} = 10^{-9}\,\text{F}$).

**Worked example 1.** A capacitor stores a charge of $0.200\,\text{C}$ when the
pd across it is $2000\,\text{V}$. Find its capacitance.

$$ C = \frac{Q}{V} = \frac{0.200}{2000} = 1.00 \times 10^{-4}\,\text{F} $$

The capacitance is $1.00 \times 10^{-4}\,\text{F}$, which is $100\,\mu\text{F}$.

## 2. The parallel plate capacitor

A simple capacitor is made of two parallel metal plates separated by a gap. The
capacitance depends on the area of the plates, the distance between them and the
material in the gap. That material is called the **dielectric**.

$$ C = \frac{\varepsilon_0 \varepsilon_r A}{d} $$

Here $A$ is the area of overlap of the plates, $d$ is their separation,
$\varepsilon_0$ is the permittivity of free space
($8.85 \times 10^{-12}\,\text{F}\,\text{m}^{-1}$) and $\varepsilon_r$ is the
relative permittivity of the dielectric. A larger area gives a larger
capacitance. A smaller separation gives a larger capacitance. A dielectric with a
larger relative permittivity also gives a larger capacitance.

**Worked example 2.** A parallel plate capacitor has plates of area
$0.030\,\text{m}^2$ separated by $1.0 \times 10^{-4}\,\text{m}$. The dielectric
between them has a relative permittivity of $2.0$. Find the capacitance.

$$
\begin{aligned}
C &= \frac{\varepsilon_0 \varepsilon_r A}{d} \\
  &= \frac{8.85 \times 10^{-12} \times 2.0 \times 0.030}{1.0 \times 10^{-4}} \\
  &= 5.3 \times 10^{-9}\,\text{F}
\end{aligned}
$$

The capacitance is $5.3 \times 10^{-9}\,\text{F}$, which is $5.3\,\text{nF}$.

## 3. Energy stored in a capacitor

Charging a capacitor transfers energy to it. The **energy stored** is the work
done in pushing charge onto the plates. The potential difference rises from zero
to its final value as the charge builds up, so the average pd is half the final
pd. The energy stored is

$$ E = \frac{1}{2}QV = \frac{1}{2}CV^2 = \frac{1}{2}\frac{Q^2}{C} $$

This energy is the area under the charge–potential difference graph, which is a
triangle for a capacitor. Because charge is squared, the form $\dfrac{1}{2}CV^2$
is often the quickest to use.

**Worked example 3.** A capacitor of capacitance $100\,\mu\text{F}$ is charged to
a potential difference of $2000\,\text{V}$. Find the energy stored.

$$
\begin{aligned}
E &= \frac{1}{2}CV^2 \\
  &= \frac{1}{2} \times 100 \times 10^{-6} \times (2000)^2 \\
  &= \frac{1}{2} \times 100 \times 10^{-6} \times 4.0 \times 10^{6} \\
  &= 200\,\text{J}
\end{aligned}
$$

The capacitor stores $200\,\text{J}$.

> **Watch out.** The energy stored depends on the square of the potential
> difference. Doubling the pd multiplies the energy by four, not by two. A second
> common slip is to leave the capacitance in microfarads. $100\,\mu\text{F}$ is
> $100 \times 10^{-6}\,\text{F}$, not $100\,\text{F}$. Change the prefix before
> you multiply, then check that the answer is in joules.

## 4. Discharging a capacitor

When a charged capacitor is connected across a resistor, the charge flows from one
plate to the other through the resistor. The current, the charge and the potential
difference all fall. The discharge is **exponential**: each equal time interval
multiplies the value by the same factor.

$$ Q = Q_0 e^{-t/RC} \qquad V = V_0 e^{-t/RC} \qquad I = I_0 e^{-t/RC} $$

The product $RC$ is the **time constant**, $\tau = RC$. It has the unit of time,
because resistance is volts per ampere and capacitance is coulombs per volt, so
$RC$ is coulombs per ampere, which is seconds. After one time constant the value
has fallen to $\dfrac{1}{e}$ of its starting value, which is about $37\%$. After
five time constants the value has fallen to about $1\%$ of the start, and the
discharge is treated as finished.

The **half-life** is the time for the value to halve. It is
$t_{1/2} = RC\ln 2 \approx 0.69\,RC$.

**Worked example 4.** A capacitor of capacitance $100\,\mu\text{F}$ is discharged
through a resistor of $50\,\Omega$. Find the time constant. Find the potential
difference after $10\,\text{ms}$ if the initial pd is $2000\,\text{V}$.

$$
\begin{aligned}
\tau &= RC = 50 \times 100 \times 10^{-6} = 5.0 \times 10^{-3}\,\text{s} \\
V &= V_0 e^{-t/RC} = 2000 \times e^{-10/5.0} \\
  &= 2000 \times e^{-2} = 2.7 \times 10^{2}\,\text{V}
\end{aligned}
$$

The time constant is $5.0\,\text{ms}$, and after $10\,\text{ms}$ the pd has
fallen to about $270\,\text{V}$.

## 5. The discharge graph

A graph of potential difference against time for a discharging capacitor is a
falling exponential curve. It is steep at the start, when the pd is large and the
current is large, and it flattens as the pd falls.

You can find the time constant from the graph. The value at $t = \tau$ is about
$37\%$ of the starting value. You can also take readings and plot
$\ln V$ against $t$. This gives a straight line of gradient $-\dfrac{1}{RC}$, so
the time constant is the negative reciprocal of the gradient.

## 6. Try it: discharging a capacitor

The figure draws the potential difference across a discharging capacitor. Change
the resistance and the capacitance and watch how the curve changes.

**Predict first.** Do not move the sliders yet. Write down your answers.

1. If you double the resistance, does the capacitor take longer or less time to
   discharge?
2. If you double the capacitance, what happens to the starting potential
   difference?
3. Which combination of $R$ and $C$ gives the largest time constant?

**Test.** Set a resistance and a capacitance, then read the time constant and the
pd after one time constant. Change one control at a time and check your
predictions.

**Explain.** Explain why the curve is steepest at the start. Explain why the time
constant depends on the product $RC$ and not on the starting potential
difference. Write two or three sentences.

:::figure capacitor-discharge

## Progress check

Return to the chapter problem. The capacitor has a capacitance of
$100\,\mu\text{F}$ and is charged to $2000\,\text{V}$. The discharge path has a
total resistance of $50\,\Omega$.

1. Find the charge stored on the capacitor.
2. Find the energy stored in the capacitor.
3. Find the time constant of the discharge.
4. Find the potential difference after $5.0\,\text{ms}$.

If question 1 goes wrong, use $Q = CV$. If question 2 goes wrong, use
$E = \tfrac{1}{2}CV^2$. If question 3 goes wrong, multiply the resistance by the
capacitance and change microfarads to farads first. If question 4 goes wrong,
remember that after one time constant the pd is $\dfrac{1}{e}$ of its starting
value.

## You should now be able to

- define capacitance and use $C = \dfrac{Q}{V}$;
- find the charge stored on a capacitor for a given pd;
- find the capacitance of a parallel plate capacitor;
- find the energy stored in a capacitor with $E = \tfrac{1}{2}QV =
  \tfrac{1}{2}CV^2$;
- describe the exponential discharge of a capacitor;
- use the time constant $\tau = RC$ and the equations
  $V = V_0 e^{-t/RC}$;
- find the time constant from a discharge graph.
