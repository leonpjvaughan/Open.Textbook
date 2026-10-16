---
title: 6.2 Newton's law of universal gravitation — Learn
chapter: 6
chapter_title: Gravity and gravitational fields
section: '6.2'
section_title: Newton's law of universal gravitation
tier: O
refs:
- '1.5'
kind: walkthrough
---

# 6.2 Newton's law of universal gravitation — Learn

**Prerequisites:** weight and field strength from Section 6.1; Newton's third law from
Chapter 3; standard form and squares from Chapter 1.

**Objectives:** state Newton's law of universal gravitation; use
$F = \dfrac{Gm_1m_2}{d^2}$; explain what an inverse-square law is; find the field
strength at the surface of a planet and at a height above it.

By the end of this section, you can find the force between any two masses and work out
the field strength a planet gives at any distance from its centre.

## The law

In 1687 Isaac Newton put forward one rule for all of gravity. Every mass attracts every
other mass. The Earth pulls the apple, and the apple pulls the Earth. The same rule
holds for the Earth and the Moon, and for the Sun and the planets.

> **Newton's law of universal gravitation.** Any two point masses attract each other
> with a force proportional to the product of their masses and inversely proportional
> to the square of the distance between them.

$$F = \frac{Gm_1m_2}{d^2}$$

- $F$ is the gravitational force between the masses, in newtons (N);
- $m_1$ and $m_2$ are the two masses, in kilograms (kg);
- $d$ is the distance between their **centres**, in metres (m);
- $G$ is the **gravitational constant**,
  $G = 6.67 \times 10^{-11}\,\text{N}\,\text{m}^{2}\,\text{kg}^{-2}$.

$G$ is a fixed number for the whole Universe. It is very small, which is why you do not
notice the pull between two people. It takes a mass the size of a planet to make the
force large.

The force acts along the line joining the two centres. Each mass pulls the other with
the same size of force, in opposite directions, because of Newton's third law.

## The inverse-square law

The force depends on $1/d^2$. That relationship has a name: an **inverse-square law**.

- Double the distance and the force falls to one quarter, because
  $1/2^2 = 1/4$.
- Triple the distance and the force falls to one ninth, because $1/3^2 = 1/9$.
- Move ten times further away and the force falls to one hundredth.

The force never reaches zero, however far apart the masses are. It becomes very small,
but it keeps a value.

**Example 1.** Two masses attract each other with a force of 36 N. Calculate the force
when the distance between their centres is tripled.

$$
F_{\text{new}} = \frac{F}{3^2} = \frac{36}{9}
$$

$$
F_{\text{new}} = 4.0\,\text{N}
$$

The distance tripled, so the force fell by a factor of nine.

## Distance is measured from the centre

The law uses the distance between the **centres** of the masses. For a planet, that
distance is measured from the centre of the planet, not from its surface.

For a satellite a height $h$ above the surface, the distance is

$$d = R + h$$

where $R$ is the radius of the planet. A satellite 400 km above the Earth is
$6.37 \times 10^{6} + 4.00 \times 10^{5} = 6.77 \times 10^{6}\,\text{m}$ from the
centre. Its height above the surface is only about 6% of that distance.

> **Watch out.** Putting the height into the law in place of the distance from the
> centre is the most common mistake in this section. A height of 400 km gives
> $d = 4.00 \times 10^{5}\,\text{m}$, which is far too small. The field strength you
> calculate from it comes out about 250 times too large. Always add the radius, and
> check that $d$ is larger than the planet's radius.

## Field strength from the law

Section 6.1 defined the field strength as $g = F/m$. Put the gravitational force in
place of $F$, for a small mass $m$ a distance $d$ from a planet of mass $M$:

$$g = \frac{F}{m} = \frac{GMm}{d^2m}$$

The small mass $m$ cancels:

$$g = \frac{GM}{d^2}$$

This is a useful result. The field strength at a point depends only on the mass of the
body that makes the field and on the distance from its centre. It does not depend on
the mass placed there. That is why every object falls with the same acceleration.

**Example 2.** The Earth has a mass of $5.97 \times 10^{24}\,\text{kg}$ and a radius
of $6.37 \times 10^{6}\,\text{m}$. Calculate the field strength at its surface.

$$
g = \frac{GM}{R^2}
$$

$$
g = \frac{6.67 \times 10^{-11} \times 5.97 \times 10^{24}}{(6.37 \times 10^{6})^2}
$$

$$
g = \frac{3.98 \times 10^{14}}{4.06 \times 10^{13}}
$$

$$
g = 9.8\,\text{N/kg}
$$

That is the value you have been using all along, now derived from the mass of the Earth.

**Example 3.** Calculate the field strength at the orbit of the satellite, a distance
of $4.22 \times 10^{7}\,\text{m}$ from the centre of the Earth.

$$
g = \frac{GM}{d^2}
$$

$$
g = \frac{3.98 \times 10^{14}}{(4.22 \times 10^{7})^2}
$$

$$
g = \frac{3.98 \times 10^{14}}{1.78 \times 10^{15}}
$$

$$
g = 0.22\,\text{N/kg}
$$

The field strength at the orbit is much smaller than at the surface. Gravity is weaker
there, but it has not gone away.

## The force between the Earth and the Moon

**Example 4.** The Moon has a mass of $7.35 \times 10^{22}\,\text{kg}$ and is
$3.84 \times 10^{8}\,\text{m}$ from the Earth's centre. Calculate the force between the
Earth and the Moon.

$$
F = \frac{Gm_1m_2}{d^2}
$$

$$
F = \frac{6.67 \times 10^{-11} \times 5.97 \times 10^{24} \times 7.35 \times 10^{22}}{(3.84 \times 10^{8})^2}
$$

$$
F = \frac{2.927 \times 10^{37}}{1.475 \times 10^{17}}
$$

$$
F = 1.98 \times 10^{20}\,\text{N}
$$

That force holds the Moon in its orbit. The Moon pulls the Earth back with the same
size of force, which is what raises the tides.

## Progress check

Back to the chapter problem. The satellite has a mass of 1200 kg and orbits
$4.22 \times 10^{7}\,\text{m}$ from the centre of the Earth.

1. Calculate the force between the Earth and the satellite.
2. Calculate the field strength at the orbit.
3. The satellite's weight on the launch pad was about
   $1.2 \times 10^{4}\,\text{N}$. Explain why the force at the orbit is smaller, using
   the word inverse-square in your answer.

Keep these values. Section 6.4 uses the force to find the satellite's speed, and
Section 6.3 uses the distance to find the energy needed to lift it there.

## You should now be able to

- state Newton's law of universal gravitation and say what each symbol means;
- use $F = \dfrac{Gm_1m_2}{d^2}$ to find a force;
- explain what an inverse-square law is, and work out the new force when the distance
  changes by a given factor;
- say why the distance is measured from the centre of a planet, and add the radius to a
  height;
- derive $g = \dfrac{GM}{d^2}$ from the law and the definition of field strength;
- find the field strength at a planet's surface and at a height above it.
