---
title: 14.2 Ohm's law and resistors — Learn
chapter: 14
chapter_title: Electric circuits
section: '14.2'
section_title: Ohm's law and resistors
tier: O
refs:
- '3.3'
kind: walkthrough
---

# 14.2 Ohm's law and resistors — Learn

**Prerequisites:** current, potential difference and resistance from Section 14.1;
reading a graph.

**Objectives:** state Ohm's law and use $V = IR$; describe the current-potential
difference graphs of an ohmic conductor, a filament lamp and a diode; explain why a
conductor is non-ohmic; name the factors that affect resistance.

By the end of this section, you can use Ohm's law in either direction and say which
components obey it and which do not.

## Ohm's law

In Section 14.1 the resistance of a component was defined as $R = \dfrac{V}{I}$. For
some components that number stays the same whatever you do to them. For others it
changes.

A **metallic conductor at constant temperature** has a constant resistance. Double the
potential difference across it and the current doubles. This is **Ohm's law**.

> **Ohm's law.** The current through a metallic conductor is directly proportional to
> the potential difference across it, provided its temperature stays constant.

Because the current is proportional to the potential difference, Ohm's law is usually
written in the rearranged form

$$V = IR$$

A component that obeys Ohm's law is called **ohmic**. A resistor is made to be ohmic,
and so is a length of wire, as long as it does not get hot.

**Example 1.** A resistor of resistance 15 Ω has a potential difference of 6.0 V across
it. Calculate the current through it.

$$
I = \frac{V}{R}
$$

$$
I = \frac{6.0}{15}
$$

$$
I = 0.40\,\text{A}
$$

**Example 2.** A current of 0.50 A flows through a 24 Ω resistor. Calculate the
potential difference across it.

$$
V = IR
$$

$$
V = 0.50 \times 24
$$

$$
V = 12\,\text{V}
$$

## The current-potential difference graph

The clearest test of Ohm's law is a graph. Put the potential difference on the
horizontal axis and the current on the vertical axis.

- For an **ohmic conductor**, the points lie on a straight line through the origin. The
  current is proportional to the potential difference.
- The gradient of that line is $\dfrac{I}{V}$, which is $\dfrac{1}{R}$. So the gradient
  of a current-potential difference graph is the **reciprocal** of the resistance.
- If you plot potential difference on the vertical axis instead, the gradient is the
  resistance itself.

**Example 3.** A student plots potential difference on the vertical axis against
current on the horizontal axis for a resistor. The line passes through
$(0.20\,\text{A}, 3.0\,\text{V})$, $(0.40\,\text{A}, 6.0\,\text{V})$ and
$(0.60\,\text{A}, 9.0\,\text{V})$. Calculate the resistance.

$$
R = \frac{\Delta V}{\Delta I} = \frac{9.0 - 3.0}{0.60 - 0.20}
$$

$$
R = \frac{6.0}{0.40} = 15\,\Omega
$$

## Non-ohmic conductors

Two components are deliberately non-ohmic, and their graphs are worth knowing.

- **A filament lamp.** As the current rises, the filament gets hotter, and the
  resistance of a metal rises with temperature. The graph still starts at the origin,
  but it curves over: each extra volt produces a smaller extra current than the one
  before. The lamp does not obey Ohm's law, because its temperature is not constant.
- **A diode.** A diode conducts in one direction only. In forward bias it carries almost
  no current until the potential difference reaches about 0.6 V, and then the current
  rises steeply. In reverse bias it carries almost no current at all. Its graph is not a
  straight line in either direction.

Other components are made to change their resistance on purpose. A **thermistor** has a
resistance that falls as its temperature rises, and a **light-dependent resistor**, or
LDR, has a resistance that falls as the light falling on it gets brighter. A **variable
resistor** lets you change the resistance by hand.

:::figure ohms-law-graph

**Predict, then test.** Choose the resistor first. Before you move the slider, predict
what happens to the current when you double the potential difference. Move the slider
and check. Now switch to the lamp and repeat, and then to the diode. Write a sentence
for each component explaining the shape of its graph, and say which one obeys Ohm's
law.

## What resistance depends on

The resistance of a piece of metal depends on four things.

- Its **length**: a longer wire has more resistance, because the charge has further to
  travel.
- Its **cross-sectional area**: a thicker wire has less resistance, because there is
  more room for the charge to flow.
- Its **material**: copper has a lower resistance than nichrome for the same size.
- Its **temperature**: for a metal, resistance rises as the temperature rises.

Only the first three are true for every conductor. The temperature effect is the one
that makes the filament lamp non-ohmic.

> **Watch out.** The gradient of a graph of current against potential difference is
> $\dfrac{1}{R}$, not $R$. Read the axes before you read the gradient. Also, Ohm's law
> is a statement about a conductor at **constant temperature**. A question about a
> filament lamp wants you to say that the temperature changes, so the resistance
> changes, so the current is not proportional to the potential difference.

## Progress check

Back to the chapter problem. When the caravan heater is connected to a 12 V supply, a
current of 3.0 A flows through it.

Use Ohm's law to find the resistance of the heater, and write the answer down. Then
write one sentence saying why the resistance of a filament lamp would not stay constant
if the potential difference across it were changed. Section 14.3 puts the heater in
parallel with the two lamps, and Section 14.4 shows that this same current and potential
difference give the 36 W rating on the heater.

## You should now be able to

- state Ohm's law and say that it holds for a metallic conductor at constant
  temperature;
- use $V = IR$ to find a current, a potential difference or a resistance;
- describe the current-potential difference graph of an ohmic conductor, and say that
  its gradient is $\dfrac{1}{R}$;
- explain why a filament lamp and a diode are non-ohmic, and describe their graphs;
- name the four factors that affect the resistance of a piece of metal.
