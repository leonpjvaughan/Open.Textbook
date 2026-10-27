---
title: 1.1 SI units and prefixes — Learn
chapter: 1
chapter_title: Working scientifically and measurements
section: '1.1'
section_title: SI units and prefixes
refs:
- AP1
kind: walkthrough
---

# 1.1 SI units and prefixes — Learn

**Prerequisites:** decimal place value and standard form; substitution into a
formula; the idea that a quantity is a number with a unit.

**By the end of this section you can:** name the seven SI base units; build a
derived unit from the base units; change a prefix accurately, including for
areas and volumes; and check whether an equation is homogeneous.

## 1. Base quantities and base units

A **physical quantity** is a number together with a unit. The number alone means
nothing: "the wire is 2.5" is not a measurement, but "the wire is 2.5 mm across"
is.

Physics builds every quantity from seven **base quantities**. Each has one
**base unit**, fixed by international agreement.

| Base quantity | Base unit | Symbol |
|---|---|---|
| Length | metre | m |
| Mass | kilogram | kg |
| Time | second | s |
| Electric current | ampere | A |
| Thermodynamic temperature | kelvin | K |
| Amount of substance | mole | mol |
| Luminous intensity | candela | cd |

A **derived unit** is a combination of base units. Speed is distance divided by
time, so its unit is metres per second, written $\text{m}\,\text{s}^{-1}$. The
newton is a derived unit built from the base units by Newton's second law:

$$ \text{N} = \text{kg}\,\text{m}\,\text{s}^{-2} $$

The kelvin is the base unit of temperature, but a temperature *change* is also
often written in degrees Celsius. One degree Celsius is the same size as one
kelvin, so a change of $10\,^\circ\text{C}$ is a change of $10\,\text{K}$.

## 2. Prefixes change the size of a unit

A prefix multiplies a unit by a power of ten. This lets one unit cover very
large and very small quantities. The prefixes you will meet most often are
below.

| Prefix | Symbol | Factor |
|---|---|---|
| tera | T | $10^{12}$ |
| giga | G | $10^{9}$ |
| mega | M | $10^{6}$ |
| kilo | k | $10^{3}$ |
| centi | c | $10^{-2}$ |
| milli | m | $10^{-3}$ |
| micro | $\mu$ | $10^{-6}$ |
| nano | n | $10^{-9}$ |
| pico | p | $10^{-12}$ |
| femto | f | $10^{-15}$ |

To change into base units, replace the prefix by its factor. A capacitance of
$4.7\,\mu\text{F}$ is $4.7 \times 10^{-6}\,\text{F}$. A force of
$1.2\,\text{MN}$ is $1.2 \times 10^{6}\,\text{N}$.

**Worked example 1.** Write $3.6\,\text{kN}$ and $25\,\text{ms}$ in base units.

$$
\begin{aligned}
3.6\,\text{kN} &= 3.6 \times 10^{3}\,\text{N} = 3600\,\text{N} \\
25\,\text{ms} &= 25 \times 10^{-3}\,\text{s} = 0.025\,\text{s}
\end{aligned}
$$

**Worked example 2.** A volume is $250\,\text{cm}^3$. Write it in $\text{m}^3$.

$$
\begin{aligned}
1\,\text{cm} &= 1 \times 10^{-2}\,\text{m} \\
1\,\text{cm}^3 &= (1 \times 10^{-2})^3\,\text{m}^3 = 1 \times 10^{-6}\,\text{m}^3 \\
250\,\text{cm}^3 &= 250 \times 10^{-6}\,\text{m}^3 \\
                &= 2.5 \times 10^{-4}\,\text{m}^3
\end{aligned}
$$

> **Watch out.** A prefix applies to the whole unit, and a power applies to the
> prefix as well. So $1\,\text{cm}^2$ is $(10^{-2})^2\,\text{m}^2 =
> 10^{-4}\,\text{m}^2$, not $10^{-2}\,\text{m}^2$. A student who writes
> $250\,\text{cm}^3 = 2.5\,\text{m}^3$ has divided by $10^{2}$ instead of
> $10^{6}$: the centimetre was not cubed. Check by asking whether the answer
> should be much smaller or much larger than the original number.

## 3. Try it: the size of a prefix

A prefix is a step on a scale, and the steps are not all the same size.

**Predict first.** A human hair is about 70 µm across. Do not move the slider
yet. Write down your answers.

1. Which prefix marks a single micrometre?
2. Where on the ruler do you expect the mark for a micrometre to sit: near the
   water molecule, near the bacterium or near the person?
3. Giga is two steps of a thousand above kilo. How many times larger than kilo
   is giga?

**Test.** Move the slider through the prefixes. Watch the marker and the object
that labels it.

:::figure si-prefix-scale

**Explain.** Two neighbouring marks are usually a factor of 1000 apart, but
milli and centi are only ten apart. Explain why, in two or three sentences. Then
write the factor for micro and for nano as powers of ten.

## 4. Checking an equation with base units

An equation is **homogeneous** when both sides have the same base units. Every
valid physical equation is homogeneous, so this is a quick check on a formula
you have rearranged or remembered.

Write each quantity with its base units, then simplify. The constant numbers,
such as the $\tfrac{1}{2}$ in kinetic energy, carry no units and can be ignored.
The joule, $\text{J}$, is the unit of energy, and it is
$\text{kg}\,\text{m}^2\,\text{s}^{-2}$.

**Worked example 3.** Show that $E_k = \tfrac{1}{2}mv^2$ is homogeneous.

$$
\begin{aligned}
\text{left side} &= \text{J} = \text{kg}\,\text{m}^2\,\text{s}^{-2} \\
\text{right side} &= \text{kg} \times (\text{m}\,\text{s}^{-1})^2 \\
                  &= \text{kg}\,\text{m}^2\,\text{s}^{-2}
\end{aligned}
$$

Both sides are $\text{kg}\,\text{m}^2\,\text{s}^{-2}$, so the equation is
homogeneous.

**Worked example 4.** The drag force on a small sphere of radius $r$ moving
slowly at speed $v$ through a liquid is $F = 6\pi\eta rv$. Find the base units of
the viscosity $\eta$.

$$
\begin{aligned}
\eta &= \frac{F}{6\pi rv} \\
     &= \frac{\text{kg}\,\text{m}\,\text{s}^{-2}}{\text{m} \times \text{m}\,\text{s}^{-1}} \\
     &= \text{kg}\,\text{m}^{-1}\,\text{s}^{-1}
\end{aligned}
$$

The number $6\pi$ is a pure number, so it has no unit and does not appear in the
base units.

## 5. Using units to predict a unit

Homogeneity works in the other direction too. If you know an equation, you can
find the unit of any one quantity in it.

**Worked example 5.** The period of a pendulum is $T = 2\pi\sqrt{\dfrac{L}{g}}$,
where $L$ is the length. Find the base units of $g$.

$$
\begin{aligned}
T^2 &= \frac{4\pi^2 L}{g} \\
g &= \frac{4\pi^2 L}{T^2} \\
  &= \frac{\text{m}}{\text{s}^2} = \text{m}\,\text{s}^{-2}
\end{aligned}
$$

So $g$ has base units $\text{m}\,\text{s}^{-2}$, which is the unit of an
acceleration.

## Progress check

Return to the chapter problem. The pendulum length is 0.800 m, and the time for
20 oscillations is 35.90 s.

1. Write 0.800 m in millimetres and in micrometres.
2. Write the time 35.90 s in milliseconds.
3. The period is $T = 1.795\,\text{s}$. Use $g = \dfrac{4\pi^2 L}{T^2}$ to show
   that $g$ has base units $\text{m}\,\text{s}^{-2}$.

If question 1 or 2 goes wrong, revisit Section 2 and check each prefix factor.
If question 3 goes wrong, write the base units of the length and of $T^2$ before
you divide.

## You should now be able to

- name the seven SI base units and their quantities;
- write a derived unit in base units;
- replace a prefix by its factor, including for a squared or cubed unit;
- check whether an equation is homogeneous;
- use homogeneity to find the unit of a quantity.
