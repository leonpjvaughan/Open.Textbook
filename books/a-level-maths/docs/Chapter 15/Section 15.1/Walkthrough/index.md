---
title: 15.1 Fundamental and derived SI quantities and units — Learn
chapter: 15
chapter_title: Quantities, units and kinematics
section: '15.1'
section_title: Fundamental and derived SI quantities and units
dfe:
- P1
kind: walkthrough
---

# 15.1 Fundamental and derived SI quantities and units — Learn

**Prerequisites:** multiplying and dividing decimal numbers; writing powers of
ten; substituting numbers into a formula.

**By the end of this section you can:** name the fundamental quantities of
mechanics and their SI units; explain what a derived quantity is; write the
units of velocity, acceleration, force, weight and moment; convert between common
units, including km/h and m/s.

## 1. A quantity has a size and a unit

A measurement in mechanics has two parts: a number and a unit. The statement
"the mass is $3$" is not complete. The mass is $3$ kilograms, or $3$ kg. The
number alone tells you nothing about the size of the measurement.

The system of units used in science is the **Système International d'Unités**,
or the **SI system**. Every other unit in mechanics is built from the SI base
units. The three base quantities you need now are length, mass and time.

| Quantity | SI unit | Symbol |
|---|---|---|
| length | metre | m |
| mass | kilogram | kg |
| time | second | s |

These three are called **fundamental quantities**, because they are defined
directly and are not built from anything else. Some books call them base
quantities. The kilogram is the base unit of mass, even though its name carries
the prefix kilo.

**Example 1.** A runner completes a lap in $52$ s, and the lap is $400$ m long.
The runner has a mass of $58$ kg. Write down the quantity and the unit for each
number.

$52$ is a time, measured in seconds. $400$ is a length, measured in metres.
$58$ is a mass, measured in kilograms.

## 2. Derived quantities and derived units

Most quantities in mechanics are built from the fundamental three. A quantity of
this kind is a **derived quantity**, and its unit is a **derived unit**.

The unit of a derived quantity comes from the formula that defines it. Velocity
is distance divided by time, so its unit is metres divided by seconds, written
m/s or m s$^{-1}$. Acceleration is the change in velocity each second, so its
unit is m/s$^2$ or m s$^{-2}$.

Force is defined by Newton's second law, $F = ma$. A force of one newton (N)
gives a mass of one kilogram an acceleration of one metre per second squared.
In base units,

$$
1 \text{ N} = 1 \text{ kg} \times 1 \text{ m/s}^2 = 1 \text{ kg m s}^{-2}.
$$

**Weight** is the force of gravity on a mass. Its unit is the newton, because
weight is a force. A **moment** is the turning effect of a force. It is a force
multiplied by a distance, so its unit is the newton metre, N m.

| Derived quantity | Formula | Unit |
|---|---|---|
| velocity | distance $\div$ time | m/s |
| acceleration | velocity change $\div$ time | m/s$^2$ |
| force, weight | mass $\times$ acceleration | N |
| moment | force $\times$ distance | N m |

**Example 2.** Write the unit of force in terms of the base units of mass,
length and time.

Force is mass times acceleration. The unit of mass is kg. The unit of
acceleration is m/s$^2$. Multiply them:

$$
\text{N} = \text{kg} \times \text{m/s}^2 = \text{kg m s}^{-2}.
$$

## 3. Prefixes change the size of a unit

A prefix multiplies a unit by a power of ten. The common prefixes in mechanics
are shown below.

| Prefix | Symbol | Multiplier |
|---|---|---|
| kilo | k | $1000$ |
| centi | c | $0.01$ |
| milli | m | $0.001$ |

So $1$ km $= 1000$ m, $1$ cm $= 0.01$ m, and $1$ ms $= 0.001$ s. The same
prefix works with any unit: $1$ kN $= 1000$ N and $1$ kJ $= 1000$ J.

**Example 3.** Convert $2.4$ km to metres, and $350$ g to kilograms.

For the length, multiply by $1000$:

$$
2.4 \text{ km} = 2.4 \times 1000 \text{ m} = 2400 \text{ m}.
$$

For the mass, divide by $1000$:

$$
350 \text{ g} = 350 \div 1000 \text{ kg} = 0.35 \text{ kg}.
$$

## 4. Converting between units

The most common conversion in mechanics is between km/h and m/s. One kilometre
is $1000$ m, and one hour is $3600$ s. So

$$
1 \text{ km/h} = \frac{1000 \text{ m}}{3600 \text{ s}} =
\frac{5}{18} \text{ m/s}.
$$

To change km/h into m/s, multiply by $\dfrac{5}{18}$. To go the other way,
multiply by $\dfrac{18}{5}$, which is $3.6$.

**Example 4.** Convert $72$ km/h to m/s.

Multiply by $\dfrac{5}{18}$:

$$
72 \times \frac{5}{18} = \frac{360}{18} = 20 \text{ m/s}.
$$

**Example 5.** Convert $90$ cm to metres, and $450$ ms to seconds.

For the length, divide by $100$:

$$
90 \text{ cm} = 90 \div 100 \text{ m} = 0.9 \text{ m}.
$$

For the time, divide by $1000$:

$$
450 \text{ ms} = 450 \div 1000 \text{ s} = 0.45 \text{ s}.
$$

## 5. Weight and gravity

The acceleration caused by gravity is written $g$. Near the surface of the
Earth, $g$ is about $9.8$ m/s$^2$, so it is a value with a unit. Weight is a
force, so

$$
W = mg.
$$

A mass of $1$ kg has a weight of about $9.8$ N. Mass and weight are not the
same quantity: the mass is the same everywhere, while the weight depends on the
local value of $g$.

**Example 6.** Find the weight of a mass of $3.5$ kg. Take $g = 9.8$ m/s$^2$.

Substitute the mass and the value of $g$:

$$
W = mg = 3.5 \times 9.8 = 34.3 \text{ N}.
$$

**Example 7.** A force of $20$ N acts at a distance of $0.4$ m from a pivot.
Find the moment of the force about the pivot.

Multiply the force by the perpendicular distance:

$$
\text{moment} = 20 \times 0.4 = 8 \text{ N m}.
$$

> **Watch out.** Three slips are common on this page.
>
> **A number without a unit.** Writing "the acceleration is $9.8$" leaves the
> reader to guess. Write the unit with the number: $9.8$ m/s$^2$. The unit is
> part of the answer.
>
> **Mass used as a force.** Mass is measured in kg, and weight is measured in N.
> A mass of $5$ kg has a weight of about $49$ N. To use a mass in a force
> calculation, multiply it by $g$ first.
>
> **A conversion in the wrong direction.** A speed in km/h becomes a smaller
> number in m/s, because $1$ km/h is less than $1$ m/s. $72$ km/h is $20$ m/s,
> not $260$ m/s. **Re-check:** a brisk walking speed is about $1.4$ m/s, which
> is about $5$ km/h. If your answer is far from that scale, check the direction
> of the conversion.

## You should now be able to

- name the fundamental quantities of mechanics and their SI units;
- write the unit of a derived quantity from its formula;
- write force in base units;
- use the prefixes kilo, centi and milli;
- convert between km/h and m/s;
- find a weight from a mass, and a moment from a force and a distance.
