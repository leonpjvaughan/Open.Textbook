---
title: 6.3 Gravitational potential energy in a field — Learn
chapter: 6
chapter_title: Gravity and gravitational fields
section: '6.3'
section_title: Gravitational potential energy in a field
tier: H
refs:
- '1.5'
kind: walkthrough
---

# 6.3 Gravitational potential energy in a field — Learn

**Prerequisites:** the work-energy model and $E_p = mgh$ from Chapter 4; the inverse
square law and $g = \dfrac{GM}{d^2}$ from Section 6.2.

**Objectives:** calculate gravitational potential energy near a surface and far from
it; explain why the field form of the energy is negative; find the escape velocity
from a planet.

By the end of this section, you can find the energy needed to lift a mass to a great
height, and the speed needed to leave a planet for good.

## Energy near the surface

Lift a book and you do work on it. That work is stored as **gravitational potential
energy**, and it comes back if the book falls. You met the formula in Chapter 4:

$$E_p = mgh$$

It works because $g$ is nearly constant over the heights you meet in a laboratory. A
climb of 5 m changes $g$ by less than one part in a million.

**Example 1.** A 2.0 kg mass is raised 5.0 m near the Earth's surface. Calculate the
gain in gravitational potential energy.

$$
E_p = mgh
$$

$$
E_p = 2.0 \times 9.8 \times 5.0
$$

$$
E_p = 98\,\text{J}
$$

## Why the formula fails at a great height

Now lift the same mass to the height of a geostationary satellite, 36 000 km up. Two
things have changed.

- The field strength is no longer 9.8 N/kg. It has fallen to about 0.22 N/kg, because
  the distance from the centre is more than six times larger.
- The weight of the mass falls as it rises, so there is no single force to multiply by
  the height.

So $E_p = mgh$ cannot give the energy for a long climb. The field has its own form of
the energy, which uses the inverse-square law.

## Potential energy in the field

Define the gravitational potential energy as **zero at infinity**, where the pull has
faded to nothing. At a distance $r$ from the centre of a body of mass $M$, the
gravitational potential energy of a mass $m$ is

$$E_p = -\frac{GMm}{r}$$

In Section 6.2 the distance was written $d$. Here it is written $r$, because it is
measured from the centre. They are the same quantity.

The energy is **negative**. A negative value means the mass is bound: it has less
energy than it would have at infinity. To escape, you must add energy to bring it up
to zero.

The energy needed to move the mass from a distance $r_1$ to a distance $r_2$ is the
difference between the two values:

$$\Delta E_p = GMm\left(\frac{1}{r_1} - \frac{1}{r_2}\right)$$

For a climb away from the body, $r_2$ is larger, so $\Delta E_p$ is positive. That
energy has to come from somewhere, such as a rocket engine.

**Example 2.** Calculate the energy needed to lift the 1200 kg satellite from the
Earth's surface to its orbit at $r = 4.22 \times 10^{7}\,\text{m}$.

$$
\Delta E_p = GMm\left(\frac{1}{R} - \frac{1}{r}\right)
$$

$$
\Delta E_p = 6.67 \times 10^{-11} \times 5.97 \times 10^{24} \times 1200 \times \left(\frac{1}{6.37 \times 10^{6}} - \frac{1}{4.22 \times 10^{7}}\right)
$$

$$
\Delta E_p = 4.78 \times 10^{17} \times (1.57 \times 10^{-7} - 2.37 \times 10^{-8})
$$

$$
\Delta E_p = 4.78 \times 10^{17} \times 1.33 \times 10^{-7}
$$

$$
\Delta E_p = 6.4 \times 10^{10}\,\text{J}
$$

That is about 64 000 MJ, the energy in roughly 1500 litres of petrol. Lifting a
satellite is expensive, and this calculation only counts the energy, not the fuel
needed to carry the fuel.

## Gravitational potential

It is useful to separate the mass placed in the field from the field itself. The
**gravitational potential** at a point is the energy per unit mass at that point.

$$V = -\frac{GM}{r}$$

The unit is the joule per kilogram (J/kg). The potential at the Earth's surface is

$$V = -\frac{GM}{R} = -\frac{3.98 \times 10^{14}}{6.37 \times 10^{6}} = -6.25 \times 10^{7}\,\text{J/kg}$$

The potential energy of a mass $m$ at a point is then $E_p = mV$. The potential is
negative everywhere, and it becomes less negative as you move away.

> **Watch out.** The minus sign is the part that is lost most often. A gravitational
> potential energy is negative because the zero is at infinity and the mass is bound.
> If you write $E_p = +\dfrac{GMm}{r}$, you get an answer of the right size and the
> wrong sign, and a question about escaping the planet will go wrong. When you need
> the **energy to lift**, use the difference and take the larger distance from the
> smaller: the answer comes out positive.

## Escape velocity

To leave a planet and never return, a mass must reach infinity, where the potential
energy is zero. The smallest speed that does it is the **escape velocity**.

At the surface, the kinetic energy must equal the energy needed to reach infinity:

$$\tfrac{1}{2}mv^2 = \frac{GMm}{R}$$

The mass $m$ cancels, which means the escape velocity does not depend on the mass of
the escaping body:

$$v_{\text{esc}} = \sqrt{\frac{2GM}{R}}$$

**Example 3.** Calculate the escape velocity from the Earth's surface.

$$
v_{\text{esc}} = \sqrt{\frac{2GM}{R}}
$$

$$
v_{\text{esc}} = \sqrt{\frac{2 \times 6.67 \times 10^{-11} \times 5.97 \times 10^{24}}{6.37 \times 10^{6}}}
$$

$$
v_{\text{esc}} = \sqrt{1.25 \times 10^{8}}
$$

$$
v_{\text{esc}} = 1.1 \times 10^{4}\,\text{m/s}
$$

That is 11 km/s, about 40 000 km/h. The same calculation for the Moon gives
$2.4 \times 10^{3}\,\text{m/s}$, which is one reason the Moon has no atmosphere: the
gas molecules there can reach escape speed.

## Progress check

Back to the chapter problem. The satellite has a mass of 1200 kg and its orbit is
$4.22 \times 10^{7}\,\text{m}$ from the centre.

1. Calculate the gravitational potential energy of the satellite at the Earth's
   surface, and at its orbit.
2. Hence find the energy needed to lift it from the surface to the orbit.
3. Calculate the escape velocity from the Earth's surface, and say why the satellite
   does not need that speed.

Write your answers down. Section 6.4 uses the same distance to find the speed the
satellite does need.

## You should now be able to

- use $E_p = mgh$ near a surface, and say when it stops being valid;
- calculate gravitational potential energy with $E_p = -\dfrac{GMm}{r}$;
- explain why the potential energy is negative when the zero is at infinity;
- find the energy needed to move a mass between two distances in a field;
- calculate the gravitational potential at a point with $V = -\dfrac{GM}{r}$;
- calculate the escape velocity from a planet with
  $v_{\text{esc}} = \sqrt{\dfrac{2GM}{R}}$.
