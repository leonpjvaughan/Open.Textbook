---
title: 1.1 Physical quantities and SI units — Learn
chapter: 1
chapter_title: Measuring, modelling and investigating
section: '1.1'
section_title: Physical quantities and SI units
tier: O
refs:
- '1.1'
kind: walkthrough
---

# 1.1 Physical quantities and SI units — Learn

**Prerequisites:** arithmetic, and the idea that a measurement is more than a number.

**Objectives:** name the seven SI base quantities and their units; use prefixes and
powers of ten; convert between units, including squared and cubed units; write a value
to an appropriate number of significant figures; check that an equation is
dimensionally consistent.

By the end of this section, you can write any measurement in SI units and check that
an equation could be true.

## A number and a unit

A **physical quantity** is a number together with a unit. On its own, "2.5" is not a
measurement. "2.5 m" is a length. "2.5 s" is a time. The number and the unit carry the
meaning between them, and a number without a unit is not an answer in physics.

Every measurement you take in this course is a physical quantity. The unit is not
decoration: it is part of what you measured, and leaving it out changes the meaning.

## The seven SI base units

The **SI system** is the international set of units used in physics. It is built from
seven **base quantities**, each with a **base unit**. Every other unit is built from
these.

| Quantity | Unit | Symbol |
|---|---|---|
| length | metre | m |
| mass | kilogram | kg |
| time | second | s |
| electric current | ampere | A |
| temperature | kelvin | K |
| amount of substance | mole | mol |
| luminous intensity | candela | cd |

A **derived unit** is built from base units by multiplication or division. Speed is
metres per second, m/s. Force is the newton, and 1 N = 1 kg m/s$^2$. Energy is the
joule, and 1 J = 1 kg m$^2$/s$^2$.

## Prefixes: powers of ten

Measurements range from the size of an atom to the size of a galaxy. **Prefixes** let
you write each one as a number between 1 and 1000, multiplied by a power of ten.

| Prefix | Symbol | Factor |
|---|---|---|
| nano | n | $10^{-9}$ |
| micro | $\mu$ | $10^{-6}$ |
| milli | m | $10^{-3}$ |
| centi | c | $10^{-2}$ |
| kilo | k | $10^{3}$ |
| mega | M | $10^{6}$ |
| giga | G | $10^{9}$ |

The prefix replaces a power of ten. So 3.0 ms is $3.0 \times 10^{-3}$ s, and 2.5 km is
$2.5 \times 10^{3}$ m.

**Example 1.** Convert 250 g to kilograms.

The prefix kilo means $10^3$, and the gram is the smaller unit, so divide:

$$250\,\text{g} = 250 \div 1000 = 0.25\,\text{kg}$$

**Example 2.** Convert 3.0 ms to seconds.

Milli means $10^{-3}$, so multiply by $10^{-3}$:

$$3.0\,\text{ms} = 3.0 \times 10^{-3} = 0.003\,\text{s}$$

## Squared and cubed units

Area and volume carry the prefix twice or three times. That is where a conversion goes
wrong most often, so work the factor out rather than guessing it.

$$1\,\text{cm} = 10^{-2}\,\text{m}$$

$$1\,\text{cm}^2 = (10^{-2})^2 = 10^{-4}\,\text{m}^2$$

$$1\,\text{cm}^3 = (10^{-2})^3 = 10^{-6}\,\text{m}^3$$

**Example 3.** Convert 100 cm$^3$ to m$^3$.

$$100\,\text{cm}^3 = 100 \times 10^{-6} = 0.0001\,\text{m}^3$$

> **Watch out.** A length converts by $10^2$, an area by $10^4$ and a volume by
> $10^6$. Writing 100 cm$^3$ = 1 m$^3$, or 100 cm$^3$ = 0.01 m$^3$, is the usual
> mistake. Square or cube the whole factor, including the power of ten, before you
> multiply.

## Significant figures

A measurement is only as precise as the instrument that took it. **Significant
figures** are the digits that carry real information. Write your answer to the number
of figures the data justify, and no more.

- Leading zeros do not count. 0.003 s has one significant figure.
- Trailing zeros after a decimal point do count. 0.250 m has three.
- A whole number needs care. 2500 m is ambiguous, so write $2.5 \times 10^{3}$ m for
  two figures or $2.50 \times 10^{3}$ m for three.

**Example 4.** A block has a mass of 0.54 kg and a volume of 0.00020 m$^3$. Calculate
its density.

$$\rho = \frac{m}{V} = \frac{0.54}{0.00020} = 2700\,\text{kg/m}^3$$

where $\rho$ is the density, $m$ the mass and $V$ the volume. Both readings carry two significant figures, so the answer is
$2.7 \times 10^{3}\,\text{kg/m}^3$.

## Dimensional consistency

The dimensions of both sides of an equation must match. This is a free check on any
equation you meet, and it catches a wrong rearrangement before you calculate anything.

Speed is distance divided by time, so its unit is m/s. Force is $F = ma$, so its unit
is kg $\times$ m/s$^2$, which is the newton. If an equation claims that a distance
equals a force, the dimensions disagree and the equation is wrong.

## Progress check

Back to the chapter problem. You are going to drop a ball and time its fall.

Write down the two quantities you will measure: the drop height and the fall time.
Give the unit you will use for each, and convert any reading you plan to take in cm or
ms into the SI unit. For a drop height of about 1 m, write down a rough prediction of
the fall time. You do not need to be right yet — Section 1.3 gives you the model.

## You should now be able to

- name the seven SI base quantities and their units;
- tell a base unit from a derived unit and give an example of each;
- use the prefixes nano to giga, and convert between a prefixed unit and the base unit;
- convert an area or a volume by squaring or cubing the whole factor;
- write a measured value to the number of significant figures the data justify;
- check whether an equation is dimensionally consistent.
