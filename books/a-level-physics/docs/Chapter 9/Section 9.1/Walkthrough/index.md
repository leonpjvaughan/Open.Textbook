---
title: 9.1 Gravitational fields — Learn
chapter: 9
chapter_title: Fields
section: '9.1'
section_title: Gravitational fields
refs:
- AP9
kind: walkthrough
---

# 9.1 Gravitational fields — Learn

**Prerequisites:** weight and Newton's laws from Section 3.2; circular motion
from Section 3.5; work, energy and the conservation of energy from Section 3.3;
vectors and resolving from Section 2.2; standard form, graphs and SI prefixes
from Chapter 1.

**By the end of this section you can:** describe a gravitational field and its
field lines; use Newton's law of gravitation; define and use gravitational field
strength; define and use gravitational potential; find the energy needed to move
a mass between two points; explain the link between field strength and the
potential gradient; and find the speed, the period and the escape speed of an
orbit.

## 1. Force fields and field lines

A **force field** is a region where a body feels a force without anything
touching it. Gravity is a force field: the Earth pulls on the Moon across empty
space. The electric force between two charges is a force field too, and so is
the magnetic force between two magnets.

A field is drawn with **field lines**. For gravity, each line points in the
direction of the force on a small mass placed at that point. The lines point
towards the body that creates the field, and they are closer together where the
field is stronger.

Two shapes of field matter in this chapter.

- A **radial field** surrounds a point mass or a sphere. The lines point inwards
  and spread apart as you move away. The field is strongest at the surface.
- A **uniform field** has parallel, equally spaced lines. The field strength is
  the same at every point. The region near the Earth's surface is nearly
  uniform.

The Earth is a sphere. Outside its surface, its field is the same as the field
of a point mass at its centre. That result lets us treat the whole Earth as a
single mass at the centre, at a distance $r$ from the point we are studying.

## 2. Newton's law of gravitation

Two point masses attract each other. The force is proportional to each mass and
inversely proportional to the square of the distance between them:

$$ F = \frac{GMm}{r^{2}} $$

Here $G$ is the **gravitational constant**,
$G = 6.67 \times 10^{-11}\,\text{N}\,\text{m}^{2}\,\text{kg}^{-2}$. The force
acts along the line joining the two masses. The two masses pull each other with
equal and opposite forces, which is Newton's third law.

The inverse-square law means that doubling the distance makes the force four
times smaller. The force never reaches zero, however far apart the masses are.

**Worked example 1.** The Earth has a mass of $5.97 \times 10^{24}\,\text{kg}$,
and the Moon has a mass of $7.35 \times 10^{22}\,\text{kg}$. Their centres are
$3.84 \times 10^{8}\,\text{m}$ apart. Find the gravitational force between them.

Substitute the three values into the inverse-square law.

$$
\begin{aligned}
F &= \frac{GMm}{r^{2}} \\
  &= \frac{6.67 \times 10^{-11} \times 5.97 \times 10^{24} \times 7.35 \times 10^{22}}{(3.84 \times 10^{8})^{2}} \\
  &= \frac{2.927 \times 10^{37}}{1.475 \times 10^{17}} \\
  &= 1.98 \times 10^{20}\,\text{N}
\end{aligned}
$$

The force between the Earth and the Moon is
$1.98 \times 10^{20}\,\text{N}$, and it pulls each body towards the other.

## 3. Gravitational field strength

The **gravitational field strength** $g$ at a point is the gravitational force
per unit mass at that point:

$$ g = \frac{F}{m} $$

Its unit is the newton per kilogram, $\text{N}\,\text{kg}^{-1}$. At the Earth's
surface, $g = 9.81\,\text{N}\,\text{kg}^{-1}$, which is why a 1 kg mass has a
weight of $9.81\,\text{N}$.

Substituting $F = \dfrac{GMm}{r^{2}}$ into the definition gives the field
strength of a point mass or a sphere:

$$ g = \frac{GM}{r^{2}} $$

The field strength depends only on the mass $M$ that creates the field and the
distance $r$ from its centre. It does not depend on the mass placed in the
field. Notice that $g$ follows the same inverse-square law as the force.

**Worked example 2.** The spacecraft orbits at a height of 400 km above the
Earth's surface. Find the gravitational field strength at the orbit.

Measure $r$ from the centre of the Earth, so add the height to the radius.

$$
r = 6.37 \times 10^{6} + 4.00 \times 10^{5} = 6.77 \times 10^{6}\,\text{m}
$$

Then use the field strength of a sphere.

$$
\begin{aligned}
g &= \frac{GM}{r^{2}} \\
  &= \frac{6.67 \times 10^{-11} \times 5.97 \times 10^{24}}{(6.77 \times 10^{6})^{2}} \\
  &= \frac{3.98 \times 10^{14}}{4.58 \times 10^{13}} \\
  &= 8.69\,\text{N}\,\text{kg}^{-1}
\end{aligned}
$$

The field strength at the orbit is $8.69\,\text{N}\,\text{kg}^{-1}$. It is lower
than the surface value, but an astronaut there still has a large weight. The
apparent weightlessness of an astronaut in orbit comes from free fall, not from
the absence of gravity.

## 4. Gravitational potential and potential energy

Field strength describes the force on a mass. **Gravitational potential**
describes the energy of a mass. The gravitational potential $V$ at a point is
the energy per unit mass needed to move a small mass from infinity to that
point.

$$ V = -\frac{GM}{r} $$

The unit is the joule per kilogram, $\text{J}\,\text{kg}^{-1}$. The potential is
defined as zero at infinity, so every real potential is negative. A mass falls
towards the body, which releases energy, so the potential energy is lower than
at infinity. The minus sign carries that meaning.

The **gravitational potential energy** of a mass $m$ at a point is

$$ E_{p} = mV = -\frac{GMm}{r} $$

The potential difference between two points is the energy needed to move unit
mass between them. To move a mass from the surface to infinity requires the
energy $\dfrac{GMm}{R}$, which is why it is positive.

**Worked example 3.** Find the gravitational potential at the Earth's surface
and at the orbit, and the energy needed to lift an 800 kg spacecraft from the
surface to the orbit.

Use $r = R$ for the surface and $r = 6.77 \times 10^{6}\,\text{m}$ for the
orbit.

$$
\begin{aligned}
V_{\text{surface}} &= -\frac{GM}{R}
   = -\frac{3.98 \times 10^{14}}{6.37 \times 10^{6}}
   = -6.25 \times 10^{7}\,\text{J}\,\text{kg}^{-1} \\
V_{\text{orbit}} &= -\frac{GM}{r}
   = -\frac{3.98 \times 10^{14}}{6.77 \times 10^{6}}
   = -5.88 \times 10^{7}\,\text{J}\,\text{kg}^{-1}
\end{aligned}
$$

The potential difference is
$\Delta V = (-5.88 \times 10^{7}) - (-6.25 \times 10^{7}) = 3.7 \times 10^{6}\,\text{J}\,\text{kg}^{-1}$.
Multiply by the mass.

$$
E = m\,\Delta V = 800 \times 3.7 \times 10^{6} = 3.0 \times 10^{9}\,\text{J}
$$

The potential is negative at both points, and less negative at the orbit. The
energy needed to lift the spacecraft is $3.0 \times 10^{9}\,\text{J}$.

## 5. Field strength and the potential gradient

The field strength and the potential are two views of the same field, and they
are linked. The field strength is the negative gradient of the potential:

$$ g = -\frac{\Delta V}{\Delta r} $$

The minus sign means that the field points in the direction in which the
potential falls. A graph of $V$ against $r$ is a curve that rises towards zero
as $r$ increases. The gradient of that curve is negative, so $g$ is positive.

For a uniform field the gradient is constant, so $g$ is constant. For a radial
field the curve is steepest near the surface, so $g$ is largest there. This is
the same link that you will meet again in Section 9.2 for electric fields.

**Equipotential** surfaces join points of equal potential. No work is done
moving a mass along an equipotential surface, because the potential does not
change. The field lines are always at right angles to the equipotentials.

## 6. Orbits

For a satellite in a circular orbit, gravity provides the centripetal force. Set
the gravitational force equal to the centripetal force:

$$ \frac{GMm}{r^{2}} = \frac{mv^{2}}{r} $$

The mass of the satellite $m$ cancels, which is why the orbital speed does not
depend on the mass of the satellite.

$$ v = \sqrt{\frac{GM}{r}} $$

The orbital period follows from the circumference and the speed:

$$ T = \frac{2\pi r}{v} $$

Squaring the speed equation gives $r v^{2} = GM$. Substituting
$v = \dfrac{2\pi r}{T}$ gives

$$ \frac{r^{3}}{T^{2}} = \frac{GM}{4\pi^{2}} $$

The right-hand side is constant for every satellite of the same planet, so
$T^{2}$ is proportional to $r^{3}$. This is Kepler's third law.

**Worked example 4.** Find the orbital speed and period of the spacecraft.

Substitute $r = 6.77 \times 10^{6}\,\text{m}$ into the speed equation.

$$
\begin{aligned}
v &= \sqrt{\frac{GM}{r}}
   = \sqrt{\frac{3.98 \times 10^{14}}{6.77 \times 10^{6}}} \\
  &= \sqrt{5.88 \times 10^{7}} = 7.67 \times 10^{3}\,\text{m}\,\text{s}^{-1}
\end{aligned}
$$

Then use the circumference divided by the speed.

$$
T = \frac{2\pi r}{v}
  = \frac{2\pi \times 6.77 \times 10^{6}}{7.67 \times 10^{3}}
  = 5.55 \times 10^{3}\,\text{s}
$$

The speed is $7.67\,\text{km}\,\text{s}^{-1}$, and the period is 5550 s, or about
92 minutes. This is the period of the International Space Station.

## 7. Escape speed

The **escape speed** is the smallest speed a body needs to leave a planet and
never return. At the surface, the kinetic energy must equal the energy needed to
move the mass to infinity:

$$ \frac{1}{2}mv^{2} = \frac{GMm}{R} $$

Rearranging gives

$$ v_{\text{esc}} = \sqrt{\frac{2GM}{R}} $$

For the Earth this is $1.12 \times 10^{4}\,\text{m}\,\text{s}^{-1}$, or
$11.2\,\text{km}\,\text{s}^{-1}$. The escape speed does not depend on the mass of
the escaping body, and it is $\sqrt{2}$ times the speed of a satellite in orbit
at the surface.

> **Watch out.** Two mistakes are common in this section. The first is to use
> $g = 9.81\,\text{N}\,\text{kg}^{-1}$ at a height of hundreds of kilometres. The
> field strength follows an inverse-square law, so it has fallen to
> $8.69\,\text{N}\,\text{kg}^{-1}$ at the orbit. Put the height into $r$ and
> recalculate. The second is to measure $r$ from the surface instead of from the
> centre. The law is about the distance between the centres, so a height of
> 400 km means $r = 6.37 \times 10^{6} + 4.00 \times 10^{5}\,\text{m}$, not
> $4.00 \times 10^{5}\,\text{m}$. Check the size: $r$ must be larger than the
> Earth's radius for a point outside the Earth.

## 8. Try it: the inverse-square law

The figure plots gravitational field strength against distance from the centre
of the Earth. One slider moves a marker outwards. The readout gives the field
strength, its ratio to the surface value, and the gravitational potential.

**Predict first.** Do not move the slider yet. Write down your answers.

1. At twice the Earth's radius from the centre, what fraction of the surface
   field strength is left?
2. Does the field strength ever reach zero?
3. Is the gravitational potential positive or negative at the orbit?

**Test.** Set the distance to $6.8\,\text{Mm}$ and read the field strength. Move
the marker to twice the Earth's radius and check prediction 1. Move it far out
and watch the curve.

**Explain.** Why does the curve fall steeply at first and then flatten? Write
two or three sentences. Use the idea that the same number of field lines spreads
over a larger and larger sphere.

:::figure gravitational-field

## Progress check

Return to the spacecraft. It orbits at a height of 400 km, where
$r = 6.77 \times 10^{6}\,\text{m}$.

1. Find the gravitational field strength at the orbit.
2. Find the orbital speed and the period.
3. Find the gravitational potential at the orbit, and the energy needed to lift
   the 800 kg spacecraft from the surface to the orbit.
4. Find the escape speed from the Earth's surface.
5. Explain why the orbital speed does not depend on the mass of the spacecraft.

If question 1 goes wrong, use $g = \dfrac{GM}{r^{2}}$ with $r$ measured from the
centre. If question 2 goes wrong, set the gravitational force equal to the
centripetal force and cancel the mass. If question 3 goes wrong, remember that
the potential is negative and you need the difference between the two values. If
question 4 goes wrong, set the kinetic energy equal to $\dfrac{GMm}{R}$. If
question 5 goes wrong, look at what cancels when you set the two forces equal.

## You should now be able to

- describe a force field and draw radial and uniform field lines;
- use Newton's law of gravitation $F = \dfrac{GMm}{r^{2}}$;
- define gravitational field strength and use $g = \dfrac{GM}{r^{2}}$;
- explain the inverse-square variation of the field strength;
- define gravitational potential and use $V = -\dfrac{GM}{r}$;
- explain why the potential is negative and defined as zero at infinity;
- find the energy needed to move a mass between two points;
- relate field strength to the potential gradient, $g = -\dfrac{\Delta V}{\Delta r}$;
- describe an equipotential surface;
- find the orbital speed and period from $v = \sqrt{\dfrac{GM}{r}}$ and
  $T = \dfrac{2\pi r}{v}$;
- use $\dfrac{r^{3}}{T^{2}} = \dfrac{GM}{4\pi^{2}}$;
- find the escape speed from $\sqrt{\dfrac{2GM}{R}}$.
