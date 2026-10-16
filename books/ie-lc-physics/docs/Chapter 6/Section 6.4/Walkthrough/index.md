---
title: 6.4 Orbits and satellites — Learn
chapter: 6
chapter_title: Gravity and gravitational fields
section: '6.4'
section_title: Orbits and satellites
tier: O
refs:
- '1.5'
- '1.6'
kind: walkthrough
---

# 6.4 Orbits and satellites — Learn

**Prerequisites:** the law of gravitation and $g = \dfrac{GM}{d^2}$ from Section 6.2;
work, energy and power from Chapter 4.

**Objectives:** explain why gravity provides the force on a satellite; use
$v = \sqrt{\dfrac{GM}{r}}$ and $T = \dfrac{2\pi r}{v}$; state Kepler's third law;
describe a geostationary orbit and its uses.

By the end of this section, you can find the speed and the period of a satellite, and
explain why one particular orbit keeps a satellite above Ireland.

## Why a satellite stays up

Throw a ball horizontally and it curves to the ground. Throw it harder and it travels
further before landing. Throw it fast enough and the ground curves away beneath it at
the same rate as the ball falls. The ball never lands. It is in **orbit**.

A satellite in a circular orbit is falling all the time. Gravity is the only force on
it, and that force points towards the centre of the Earth. A force that points towards
the centre of a circle keeps an object moving in that circle, and it is called a
**centripetal force**. Chapter 7 studies that force on its own; here gravity is the
force doing the job.

So gravity does not hold the satellite up. Gravity holds it **in**. The satellite is in
free fall, and its sideways speed carries it around the Earth instead of into it.

## The orbital speed

The gravitational force provides the centripetal force. Set the two equal for a
satellite of mass $m$ in a circle of radius $r$ around a body of mass $M$:

$$\frac{GMm}{r^2} = \frac{mv^2}{r}$$

The mass of the satellite, $m$, appears on both sides, so it cancels:

$$\frac{GM}{r} = v^2$$

$$v = \sqrt{\frac{GM}{r}}$$

This is a strong result. The orbital speed depends on the radius of the orbit and on
the mass of the body being orbited. It does **not** depend on the mass of the
satellite. A heavy satellite and a light one at the same radius travel at the same
speed.

**Example 1.** Calculate the orbital speed of the satellite at
$r = 4.22 \times 10^{7}\,\text{m}$.

$$
v = \sqrt{\frac{GM}{r}}
$$

$$
v = \sqrt{\frac{6.67 \times 10^{-11} \times 5.97 \times 10^{24}}{4.22 \times 10^{7}}}
$$

$$
v = \sqrt{9.44 \times 10^{6}}
$$

$$
v = 3.1 \times 10^{3}\,\text{m/s}
$$

That is about 3.1 km/s. The satellite covers 3.1 km every second, and it keeps falling
towards the Earth by the same amount, so its distance from the centre stays the same.

## The period

The **period** $T$ is the time for one complete orbit. The satellite travels the
circumference of the circle, $2\pi r$, at speed $v$, so

$$T = \frac{2\pi r}{v}$$

**Example 2.** Calculate the period of the satellite at
$r = 4.22 \times 10^{7}\,\text{m}$, using $v = 3.1 \times 10^{3}\,\text{m/s}$.

$$
T = \frac{2\pi r}{v}
$$

$$
T = \frac{2\pi \times 4.22 \times 10^{7}}{3.1 \times 10^{3}}
$$

$$
T = 8.6 \times 10^{4}\,\text{s}
$$

That is 86 000 s, which is 24 hours to two significant figures. The satellite returns
to the same place in the sky once a day.

## Kepler's third law

Put the two formulas together. Square the speed, $v^2 = \dfrac{GM}{r}$, and substitute
$v = \dfrac{2\pi r}{T}$:

$$\left(\frac{2\pi r}{T}\right)^2 = \frac{GM}{r}$$

Rearrange for the period:

$$T^2 = \frac{4\pi^2r^3}{GM}$$

The right-hand side is a fixed number for every satellite of the same planet, because
$G$ and $M$ do not change. So

$$T^2 \propto r^3$$

This is **Kepler's third law**: the square of the period is proportional to the cube of
the orbital radius.

**Example 3.** Two satellites orbit the Earth. The second has an orbital radius four
times the first. Calculate the ratio of their periods.

$$
\frac{T_2}{T_1} = \left(\frac{r_2}{r_1}\right)^{3/2} = 4^{3/2} = 8
$$

The period of the second satellite is eight times the period of the first. Notice that
a radius four times larger gives a period eight times longer, not four times. The orbit
is bigger, and the satellite also moves more slowly in it.

## Investigate: is the pattern real?

Here are four real orbits around the Earth.

| Orbit | Radius $r$ (m) | Period $T$ (s) |
|---|---|---|
| Space station | $6.78 \times 10^{6}$ | $5.56 \times 10^{3}$ |
| Navigation satellite | $2.66 \times 10^{7}$ | $4.32 \times 10^{4}$ |
| Communications satellite | $4.22 \times 10^{7}$ | $8.64 \times 10^{4}$ |
| Moon | $3.84 \times 10^{8}$ | $2.36 \times 10^{6}$ |

**Predict.** Before you calculate anything, write down whether you expect the quantity
$\dfrac{T^2}{r^3}$ to be the same for all four rows, and say why.

**Test.** Work out $\dfrac{T^2}{r^3}$ for each row. Use a calculator and keep three
figures.

**Explain.** All four values come out close to
$9.9 \times 10^{-14}\,\text{s}^{2}\,\text{m}^{-3}$. Write two or three sentences saying
why the same number appears for the space station and for the Moon, which are at very
different distances. Use the idea that $T^2 = \dfrac{4\pi^2r^3}{GM}$ contains only $r$
and the mass of the Earth.

## Geostationary orbits

A satellite in a **geostationary orbit** stays above the same point on the Earth's
surface. Three things have to be true.

- Its period must be exactly 24 hours, so it turns once while the Earth turns once.
- It must orbit above the **equator**. A satellite above any other latitude would
  drift north and south over the day.
- It must move in the same direction as the Earth spins, from west to east.

A period of 24 hours fixes the radius. Putting $T = 8.64 \times 10^{4}\,\text{s}$ into
Kepler's third law gives

$$r = \left(\frac{GMT^2}{4\pi^2}\right)^{1/3} = 4.22 \times 10^{7}\,\text{m}$$

That is 42 200 km from the centre, or about 36 000 km above the surface. Every
geostationary satellite is at that height, so they are spaced along a single ring above
the equator.

**Why this orbit is useful.** A dish on a house can point at a fixed spot and never
move. Weather satellites watch the same part of the ocean all day, and broadcast and
telephone satellites relay signals between continents.

> **Watch out.** A satellite in orbit is not "outside gravity". The field strength at a
> geostationary orbit is $0.22\,\text{N/kg}$, so a 1200 kg satellite still has a weight
> of about 270 N there. Astronauts float because they and their spacecraft are falling
> together, not because gravity has gone. This apparent weightlessness is called free
> fall, and it is the same feeling you get in a lift when the cable breaks.

## Progress check

Back to the chapter problem, and this is where it is answered.

1. Calculate the orbital speed of the satellite at
   $r = 4.22 \times 10^{7}\,\text{m}$.
2. Use $T = \dfrac{2\pi r}{v}$ to find the period in seconds, then in hours.
3. Write one sentence explaining why a geostationary satellite must be above the
   equator.

Keep this. The Review brings it together with the weight, the force and the energy from
the earlier sections.

## You should now be able to

- explain why a satellite in orbit is falling, and why gravity acts as the centripetal
  force;
- use $v = \sqrt{\dfrac{GM}{r}}$ and say why the satellite's mass cancels;
- use $T = \dfrac{2\pi r}{v}$ to find the period of an orbit;
- state Kepler's third law and use $T^2 \propto r^3$ to compare two orbits;
- describe the three conditions for a geostationary orbit and give two of its uses;
- explain why an astronaut in orbit feels weightless even though gravity still acts.
