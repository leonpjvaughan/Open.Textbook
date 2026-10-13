---
title: 9.2 Electric fields — Learn
chapter: 9
chapter_title: Fields
section: '9.2'
section_title: Electric fields
dfe:
- AP9
kind: walkthrough
---

# 9.2 Electric fields — Learn

**Prerequisites:** charge, current and potential difference from Section 5.1;
work, energy and power from Section 3.3; forces and Newton's laws from
Section 3.2; potential difference and energy in a capacitor from Section 5.4;
vectors and resolving from Section 2.2; the gravitational field from
Section 9.1.

**By the end of this section you can:** describe an electric field and its field
lines; use Coulomb's law; define and use electric field strength for a point
charge and for a uniform field; define electric potential and find the work done
moving a charge; explain the link between field strength and the potential
gradient; compare gravitational and electric fields; and describe the motion of
a charged particle in a uniform field.

## 1. Charge and the electric field

An **electric charge** is a property of matter. There are two kinds, positive
and negative, and like charges repel while unlike charges attract. Charge is
measured in **coulombs**, $\text{C}$. The charge on one electron is
$-e = -1.60 \times 10^{-19}\,\text{C}$, and the charge on a proton is
$+1.60 \times 10^{-19}\,\text{C}$.

Every charge creates an **electric field** around it. A second charge placed in
that field feels a force. The **field lines** show the direction of the force on
a small **positive** test charge:

- for a positive point charge, the lines point away from the charge;
- for a negative point charge, the lines point towards the charge;
- between two oppositely charged parallel plates, the lines are parallel and
  equally spaced, so the field is **uniform**.

Field lines are closer together where the field is stronger. They never cross,
because the force has only one direction at each point.

## 2. Coulomb's law

The electric force between two point charges in a vacuum follows an
inverse-square law, just like gravity:

$$ F = \frac{kQq}{r^{2}} $$

Here $Q$ and $q$ are the two charges in coulombs, $r$ is the distance between
their centres, and $k$ is the **Coulomb constant**:

$$ k = \frac{1}{4\pi\varepsilon_0} = 8.99 \times 10^{9}\,\text{N}\,\text{m}^{2}\,\text{C}^{-2} $$

The symbol $\varepsilon_0$ is the **permittivity of free space**,
$\varepsilon_0 = 8.85 \times 10^{-12}\,\text{F}\,\text{m}^{-1}$.

Unlike gravity, the electric force can attract or repel. When $Q$ and $q$ have
the same sign the product $Qq$ is positive, and the force is repulsive. When the
signs are opposite the product is negative, and the force is attractive.

**Worked example 1.** Two point charges, each $+2.0\,\mu\text{C}$, are 0.30 m
apart in air. Find the force between them.

Change microcoulombs to coulombs first: $2.0\,\mu\text{C} = 2.0 \times 10^{-6}\,
\text{C}$.

$$
\begin{aligned}
F &= \frac{kQq}{r^{2}} \\
  &= \frac{8.99 \times 10^{9} \times 2.0 \times 10^{-6} \times 2.0 \times 10^{-6}}{0.30^{2}} \\
  &= \frac{3.60 \times 10^{-2}}{0.090} \\
  &= 0.40\,\text{N}
\end{aligned}
$$

The force is $0.40\,\text{N}$. Both charges are positive, so the force is
repulsive and pushes them apart.

## 3. Electric field strength

The **electric field strength** $E$ at a point is the force per unit positive
charge at that point:

$$ E = \frac{F}{Q} $$

Its unit is the newton per coulomb, $\text{N}\,\text{C}^{-1}$, which is the same
as the volt per metre, $\text{V}\,\text{m}^{-1}$. Substituting Coulomb's law
gives the field strength of a point charge:

$$ E = \frac{kQ}{r^{2}} $$

The field strength is a vector: it points away from a positive charge and
towards a negative charge. It follows the same inverse-square law as the force.

**Worked example 2.** Find the electric field strength and the electric
potential at a distance of 0.30 m from a point charge of $+2.0\,\mu\text{C}$.

Use the point-charge equation.

$$
\begin{aligned}
E &= \frac{kQ}{r^{2}}
   = \frac{8.99 \times 10^{9} \times 2.0 \times 10^{-6}}{0.30^{2}} \\
  &= \frac{1.80 \times 10^{4}}{0.090}
   = 2.0 \times 10^{5}\,\text{N}\,\text{C}^{-1}
\end{aligned}
$$

The field strength is $2.0 \times 10^{5}\,\text{N}\,\text{C}^{-1}$, directed
away from the charge. Now use the point-charge potential.

$$
\begin{aligned}
V &= \frac{kQ}{r}
   = \frac{8.99 \times 10^{9} \times 2.0 \times 10^{-6}}{0.30} \\
  &= \frac{1.80 \times 10^{4}}{0.30}
   = 6.0 \times 10^{4}\,\text{V}
\end{aligned}
$$

The potential at that point is $6.0 \times 10^{4}\,\text{V}$, or
$6.0 \times 10^{4}\,\text{J}\,\text{C}^{-1}$.

## 4. Uniform fields and the field between two plates

Inside a uniform field the field strength has the same value at every point. Two
parallel plates with a potential difference $V$ between them make a uniform
field, if the separation $d$ is much smaller than the size of the plates. The
field strength is

$$ E = \frac{V}{d} $$

The field points from the positive plate to the negative plate. This is the
equation that drives an ion engine, a cathode-ray tube and any particle
accelerator.

**Worked example 3.** The spacecraft's ion drive accelerates xenon ions through
a potential difference of 1.20 kV between two grids 1.5 mm apart. Find the
electric field strength between the grids and the force on one xenon ion.

Change the distance to metres: $d = 1.5 \times 10^{-3}\,\text{m}$.

$$
\begin{aligned}
E &= \frac{V}{d} = \frac{1.20 \times 10^{3}}{1.5 \times 10^{-3}} \\
  &= 8.0 \times 10^{5}\,\text{V}\,\text{m}^{-1}
\end{aligned}
$$

Then multiply by the charge on the ion.

$$
F = QE = 1.60 \times 10^{-19} \times 8.0 \times 10^{5}
  = 1.28 \times 10^{-13}\,\text{N}
$$

The field strength is $8.0 \times 10^{5}\,\text{V}\,\text{m}^{-1}$ and the force
on each ion is $1.28 \times 10^{-13}\,\text{N}$, directed towards the negative
grid.

## 5. Electric potential and potential energy

The **electric potential** $V$ at a point is the energy per unit positive charge
at that point, taking the potential as zero at infinity:

$$ V = \frac{kQ}{r} $$

Its unit is the joule per coulomb, $\text{J}\,\text{C}^{-1}$, which is the volt.
For a positive charge the potential is positive, and for a negative charge it is
negative. Unlike gravitational potential, it can have either sign.

The **electric potential energy** of a charge $q$ at a point is

$$ E_{p} = qV = \frac{kQq}{r} $$

The work done moving a charge through a potential difference $\Delta V$ is

$$ W = q\,\Delta V $$

If the charge moves in the direction of the electric force, the field does the
work and the potential energy falls. To move a positive charge towards a
positive charge you must do work, and the potential energy rises.

**Worked example 4.** The xenon ion in Worked example 3 has a charge of
$+1.60 \times 10^{-19}\,\text{C}$ and a mass of $2.18 \times 10^{-25}\,\text{kg}$.
Find the kinetic energy it gains crossing the grids and its final speed.

The work done by the field is the charge multiplied by the potential difference.

$$
\begin{aligned}
W &= qV = 1.60 \times 10^{-19} \times 1.20 \times 10^{3} \\
  &= 1.92 \times 10^{-16}\,\text{J}
\end{aligned}
$$

This becomes kinetic energy. Rearrange $\tfrac{1}{2}mv^{2} = E_{k}$.

$$
\begin{aligned}
v &= \sqrt{\frac{2E_{k}}{m}}
   = \sqrt{\frac{2 \times 1.92 \times 10^{-16}}{2.18 \times 10^{-25}}} \\
  &= \sqrt{1.76 \times 10^{9}}
   = 4.20 \times 10^{4}\,\text{m}\,\text{s}^{-1}
\end{aligned}
$$

Each ion leaves the grids with $1.92 \times 10^{-16}\,\text{J}$ of kinetic
energy and a speed of $42\,\text{km}\,\text{s}^{-1}$.

## 6. Field strength and the potential gradient

The field strength and the potential are linked in the same way as for gravity.
For a uniform field,

$$ E = -\frac{\Delta V}{\Delta r} $$

For a point charge, a graph of $V$ against $r$ is a curve whose gradient gives
$-E$. In a uniform field the potential falls at a steady rate as you move from
the positive plate to the negative plate, so the gradient is constant. That is
why $E = \dfrac{V}{d}$ works between parallel plates.

A surface on which the potential is constant is an **equipotential** surface. No
work is done moving a charge along an equipotential. The field lines are at
right angles to the equipotentials.

## 7. Comparing gravitational and electric fields

The two fields have the same shape and many of the same equations, but they
differ in important ways.

| | Gravitational field | Electric field |
|---|---|---|
| Force law | $F = \dfrac{GMm}{r^{2}}$ | $F = \dfrac{kQq}{r^{2}}$ |
| Constant | $G = 6.67 \times 10^{-11}$ | $k = 8.99 \times 10^{9}$ |
| Field strength | $g = \dfrac{F}{m}$ | $E = \dfrac{F}{Q}$ |
| Potential | $V = -\dfrac{GM}{r}$ | $V = \dfrac{kQ}{r}$ |
| Force | always attractive | attractive or repulsive |
| Potential sign | always negative | positive or negative |
| Strength | very weak | very strong |

Both forces follow an inverse-square law. Both have a field strength, a
potential and equipotential surfaces, and both do work that depends only on the
positions of the start and the end point. The electric force between two
electrons is about $10^{39}$ times stronger than the gravitational force between
them, which is why gravity only matters for large masses such as planets.

## 8. Motion of a charged particle in a uniform field

A charged particle in a uniform electric field feels a constant force
$F = QE$. By Newton's second law its acceleration is constant, so the motion is
the same shape as projectile motion.

- If the particle moves **along** the field lines, it speeds up or slows down in
  a straight line.
- If the particle enters **perpendicular** to the field lines, the force is at
  right angles to its velocity. It follows a curved path, and its component of
  velocity along the field lines changes while the perpendicular component stays
  constant.

This is how an inkjet printer steers a drop of ink, and how an oscilloscope
steers an electron beam.

> **Watch out.** Field strength and potential are different quantities, and
> mixing them up is the most common error in this section. Field strength $E$ is
> force per unit charge, measured in $\text{N}\,\text{C}^{-1}$; potential $V$ is
> energy per unit charge, measured in $\text{J}\,\text{C}^{-1}$ or volts. Near a
> point charge, $E \propto \dfrac{1}{r^{2}}$ but $V \propto \dfrac{1}{r}$, so
> doubling the distance quarters the field strength but only halves the
> potential. A second trap is to use $E = \dfrac{V}{d}$ for a point charge. That
> equation only holds in a uniform field, where the plates are parallel and the
> separation is small. Check which field you have before you choose the
> equation.

## 9. Try it: the uniform field

The figure draws two parallel plates with a uniform field between them. Two
sliders set the potential difference and the separation. The readout gives the
field strength, the force on one xenon ion, and the kinetic energy the ion gains
crossing the gap.

**Predict first.** Do not move the sliders yet. Write down your answers.

1. If you double the separation but keep the potential difference the same, what
   happens to the field strength?
2. With the same change, what happens to the energy the ion gains crossing the
   gap?
3. Where is the field strongest between the plates?

**Test.** Set 1200 V and 1.5 mm and read the three values. Double the separation
to 3.0 mm and check each prediction. Change one slider at a time.

**Explain.** The field strength halves when the separation doubles, but the ion
gains the same energy. Explain why, using the idea that the work done is the
charge multiplied by the potential difference, and that the ion also travels
twice as far through a weaker field. Write two or three sentences.

:::figure plates-electric-field

## Progress check

Return to the spacecraft. The ion drive uses a potential difference of 1.20 kV
between two grids 1.5 mm apart. Each xenon ion has a charge of
$1.60 \times 10^{-19}\,\text{C}$ and a mass of $2.18 \times 10^{-25}\,\text{kg}$.

1. Find the electric field strength between the grids.
2. Find the force on one xenon ion.
3. Find the kinetic energy the ion gains and its final speed.
4. Explain why the energy gained does not depend on the separation of the grids,
   even though the field strength does.
5. Two xenon ions, each $+1.60 \times 10^{-19}\,\text{C}$, are 2.0 nm apart.
   Find the electric force between them.

If question 1 goes wrong, change the separation to metres and use
$E = \dfrac{V}{d}$. If question 2 goes wrong, use $F = QE$. If question 3 goes
wrong, the work done is $qV$, and then $\tfrac{1}{2}mv^{2} = E_{k}$. If
question 4 goes wrong, remember that the work done is the charge multiplied by
the potential difference; the separation changes the force and the distance in
opposite ways. If question 5 goes wrong, use $F = \dfrac{kQq}{r^{2}}$ with
$r = 2.0 \times 10^{-9}\,\text{m}$.

## You should now be able to

- describe an electric field and draw its field lines for point charges and for
  parallel plates;
- use Coulomb's law $F = \dfrac{kQq}{r^{2}}$;
- define electric field strength and use $E = \dfrac{F}{Q}$ and
  $E = \dfrac{kQ}{r^{2}}$;
- use $E = \dfrac{V}{d}$ for a uniform field;
- define electric potential and use $V = \dfrac{kQ}{r}$;
- find the potential energy of a charge and the work done moving it;
- relate field strength to the potential gradient;
- compare gravitational and electric fields;
- describe the motion of a charged particle in a uniform electric field.
