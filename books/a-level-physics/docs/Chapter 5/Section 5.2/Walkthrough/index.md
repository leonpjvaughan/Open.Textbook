---
title: 5.2 Resistance and resistivity — Learn
chapter: 5
chapter_title: Electric circuits
section: '5.2'
section_title: Resistance and resistivity
refs:
- AP5
kind: walkthrough
---

# 5.2 Resistance and resistivity — Learn

**Prerequisites:** current, charge and potential difference from Section 5.1;
the area of a circle; standard form; the gradient of a straight-line graph.

**By the end of this section you can:** define resistance and use Ohm's law;
describe and compare the $I$–$V$ characteristics of a resistor, a filament lamp
and a diode; use resistivity and $R = \dfrac{\rho L}{A}$; and explain how
temperature changes the resistance of a metal.

## 1. Resistance

A component resists the flow of charge through it. The **resistance** of a
component is the potential difference across it divided by the current through
it.

$$ R = \frac{V}{I} $$

The unit of resistance is the **ohm**, $\Omega$. One ohm is one volt per ampere.
A component of resistance $1\,\Omega$ has a pd of $1\,\text{V}$ when the current
through it is $1\,\text{A}$.

**Ohm's law** states that for a metallic conductor at constant temperature, the
current through it is proportional to the potential difference across it. So the
ratio $\dfrac{V}{I}$ is constant, and the resistance does not change.

**Worked example 1.** A resistor has a potential difference of $6.0\,\text{V}$
across it and a current of $0.40\,\text{A}$ through it. Find its resistance.

$$ R = \frac{V}{I} = \frac{6.0}{0.40} = 15\,\Omega $$

The resistance is $15\,\Omega$.

## 2. Current–potential difference characteristics

An $I$–$V$ graph shows how the current through a component changes as the
potential difference across it changes. The shape of the graph tells you how the
component behaves. The resistance at any point is $\dfrac{V}{I}$, so a steeper
line means a smaller resistance.

**A fixed resistor.** The graph is a straight line through the origin. The
current is proportional to the pd, so the resistance is constant. This is the
behaviour described by Ohm's law.

**A filament lamp.** The graph curves. As the pd increases, the current
increases, but not in proportion. The filament gets hotter, and a hotter metal
filament has a larger resistance. So the graph flattens at higher pds, and the
resistance rises as the lamp brightens. At a high pd the filament can glow
white, and its resistance is several times its resistance when cold.

**A diode.** In the forward direction the diode conducts only after the pd
reaches about $0.6\,\text{V}$. Above that the current rises quickly. In the
reverse direction the diode blocks the current almost completely, and the current
is very small. A diode conducts in one direction only.

**Worked example 2.** A filament lamp has a pd of $12\,\text{V}$ across it and a
current of $0.50\,\text{A}$ through it. Find its resistance. When the lamp is
cold, its resistance is about $3.0\,\Omega$. Explain the difference.

$$ R = \frac{V}{I} = \frac{12}{0.50} = 24\,\Omega $$

The hot resistance is $24\,\Omega$. The filament is much hotter when the lamp is
lit. A metal conducts better when it is cold, because the ions in the lattice
vibrate less and scatter the electrons less often. So the resistance rises as the
temperature rises, and the hot resistance is much larger than the cold
resistance.

## 3. Resistivity

The resistance of a wire depends on its shape as well as on the material it is
made from. A longer wire has more resistance. A thicker wire has less resistance,
because there is more room for the charge to flow.

$$ R = \frac{\rho L}{A} $$

The constant $\rho$ is the **resistivity** of the material. It is a property of
the material, not of the particular wire. Resistivity is measured in ohm metres,
$\Omega\,\text{m}$. The resistivity of a metal is very small, because metals
conduct well. The resistivity of an insulator is very large.

**Worked example 3.** A copper wire has a length of $2.0\,\text{m}$ and a
cross-sectional area of $1.0 \times 10^{-6}\,\text{m}^2$. The resistivity of
copper is $1.7 \times 10^{-8}\,\Omega\,\text{m}$. Find its resistance.

$$
\begin{aligned}
R &= \frac{\rho L}{A} \\
  &= \frac{1.7 \times 10^{-8} \times 2.0}{1.0 \times 10^{-6}} \\
  &= 3.4 \times 10^{-2}\,\Omega
\end{aligned}
$$

The resistance is $3.4 \times 10^{-2}\,\Omega$, or $34\,\text{m}\Omega$.

**Worked example 4.** A wire has a resistance of $4.0\,\Omega$, a length of
$1.0\,\text{m}$ and a cross-sectional area of $2.0 \times 10^{-7}\,\text{m}^2$.
Find the resistivity of the material.

$$
\begin{aligned}
\rho &= \frac{RA}{L} \\
     &= \frac{4.0 \times 2.0 \times 10^{-7}}{1.0} \\
     &= 8.0 \times 10^{-7}\,\Omega\,\text{m}
\end{aligned}
$$

The resistivity is $8.0 \times 10^{-7}\,\Omega\,\text{m}$.

> **Watch out.** The resistivity of a material is constant at a fixed
> temperature, but the resistance of a wire depends on its length and area as
> well. A short thick copper wire and a long thin copper wire have the same
> resistivity but very different resistances. Check the question: does it ask for
> the resistance of a wire, or for the resistivity of the material?

## 4. Temperature and resistance

The resistance of a metal increases as its temperature rises. The ions in the
metal lattice vibrate more, so they scatter the drifting electrons more often.
The current is smaller for the same pd, so the resistance is larger.

Some materials behave in the opposite way. A **thermistor** has a resistance that
falls as its temperature rises, so it is useful in a temperature sensor. When a
material is cooled below a critical temperature, some materials become
**superconductors**. Their resistance falls to zero, and a current can flow
without any energy being wasted as heat.

## 5. Try it: current–potential difference graphs

The figure draws an $I$–$V$ graph for one component at a time. Change the
component and move the pd slider to see how the current responds.

**Predict first.** Do not move the controls yet. Write down your answers.

1. For a fixed resistor, what shape will the graph be?
2. For a filament lamp, will the graph bend towards the current axis or away
   from it as the pd rises?
3. For a diode, what is the current when the pd is reversed?

**Test.** Choose each component in turn. Move the pd slider from a small value to
a large one and watch the current. For the diode, move the slider through zero
into the reverse direction.

**Explain.** For the lamp, explain why the resistance changes as the pd rises.
For the diode, explain why the graph is not symmetric. Write two or three
sentences and use the idea of charge carriers.

:::figure i-v-characteristics

## Progress check

Return to the chapter problem. The connecting leads are copper. Their total
length is $1.2\,\text{m}$ and their diameter is $2.0\,\text{mm}$. The
resistivity of copper is $1.7 \times 10^{-8}\,\Omega\,\text{m}$.

1. Find the cross-sectional area of one lead in $\text{m}^2$.
2. Find the resistance of the leads.
3. The chest and paddles have a resistance of $50\,\Omega$. Compare the
   resistance of the leads with this value.

If question 1 goes wrong, halve the diameter to get the radius and use
$A = \pi r^2$. If question 2 goes wrong, use $R = \dfrac{\rho L}{A}$. If question
3 goes wrong, divide the lead resistance by $50\,\Omega$ and write the result as a
percentage.

## You should now be able to

- define resistance and use $R = \dfrac{V}{I}$;
- state Ohm's law and say when it applies;
- describe and compare the $I$–$V$ characteristics of a fixed resistor, a
  filament lamp and a diode;
- explain why the resistance of a filament lamp changes as it heats up;
- use $R = \dfrac{\rho L}{A}$ to find a resistance, a length, an area or a
  resistivity;
- explain the effect of temperature on the resistance of a metal, a thermistor
  and a superconductor.
