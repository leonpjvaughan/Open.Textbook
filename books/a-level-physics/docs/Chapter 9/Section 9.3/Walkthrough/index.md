---
title: 9.3 Magnetic fields — Learn
chapter: 9
chapter_title: Fields
section: '9.3'
section_title: Magnetic fields
dfe:
- AP9
kind: walkthrough
---

# 9.3 Magnetic fields — Learn

**Prerequisites:** current, charge and potential difference from Section 5.1;
force, acceleration and Newton's second law from Section 3.2; circular motion
from Section 3.5; vectors and resolving from Section 2.2; the electric field
from Section 9.2.

**By the end of this section you can:** describe a magnetic field and define the
tesla; use $F = BIL$ and $F = BQv$; apply Fleming's left-hand rule; explain and
use the circular path of a charged particle in a field; and define magnetic flux
and flux linkage.

## 1. Magnetic fields and flux density

A **magnetic field** is a region where a magnetic pole, a current or a moving
charge feels a force. The field is drawn with field lines, and the direction of
a field line is the direction in which the north pole of a small compass points.

Magnetic field lines behave differently from electric and gravitational field
lines. They are always **closed loops**: outside a bar magnet they run from the
north pole to the south pole, and inside the magnet they run from south to
north. They never start or end on a charge.

The strength of the field is the **magnetic flux density** $B$. Its unit is the
**tesla**, $\text{T}$. We can define the tesla from the force on a wire:

> One tesla is the flux density that gives a force of one newton on a straight
> wire of length one metre carrying a current of one ampere, when the wire is at
> right angles to the field.

A field of one tesla is very strong. The Earth's magnetic field at the surface
is about $5 \times 10^{-5}\,\text{T}$. A school laboratory magnet gives about
$0.2\,\text{T}$, and an MRI scanner uses several tesla.

## 2. The force on a current-carrying wire

A wire carrying a current in a magnetic field feels a force. The current is a
flow of charge, and every moving charge in a magnetic field feels a force, so
the forces on all the charges add up.

The **current** $I$ must have a component at right angles to the field. If the
wire is at right angles to the field, the force is

$$ F = BIL $$

Here $L$ is the length of the wire in the field and $B$ is the flux density. If
the wire makes an angle $\theta$ with the field, only the component at right
angles matters, so

$$ F = BIL\sin\theta $$

The force is largest when the wire is at right angles to the field
($\theta = 90^{\circ}$), and zero when the wire is **parallel** to the field
($\theta = 0^{\circ}$).

The force is always at right angles to both the current and the field. You find
its direction with **Fleming's left-hand rule**. Hold the thumb, the first
finger and the second finger of your left hand at right angles to each other:

- the **first finger** points along the field, from north to south;
- the **second finger** points along the current, from positive to negative;
- the **thumb** points in the direction of the force on the wire.

**Worked example 1.** A straight wire of length 0.20 m carries a current of
3.0 A at right angles to a magnetic field of flux density 0.15 T. Find the force
on the wire.

$$
F = BIL = 0.15 \times 3.0 \times 0.20 = 0.090\,\text{N}
$$

The force is $0.090\,\text{N}$, at right angles to the wire and to the field. If
the wire were turned so that it made an angle of $30^{\circ}$ with the field, the
force would be

$$ F = BIL\sin 30^{\circ} = 0.090 \times 0.50 = 0.045\,\text{N} $$

## 3. The force on a moving charge

A single charge $Q$ moving at speed $v$ at right angles to a field of flux
density $B$ feels a force

$$ F = BQv $$

The force is at right angles to both the velocity and the field. Fleming's
left-hand rule works here too, if you treat the motion of a positive charge as
the current. For a negative charge such as an electron, the force is in the
opposite direction to the rule.

If the charge moves at an angle $\theta$ to the field, only the component of the
velocity at right angles to the field matters, so $F = BQv\sin\theta$. A charge
moving **along** the field lines feels no magnetic force at all.

**Worked example 2.** An electron moves at $5.0 \times 10^{6}\,\text{m}\,
\text{s}^{-1}$ at right angles to a magnetic field of flux density 0.20 T. Find
the force on the electron.

$$
\begin{aligned}
F &= BQv = 0.20 \times 1.60 \times 10^{-19} \times 5.0 \times 10^{6} \\
  &= 1.6 \times 10^{-13}\,\text{N}
\end{aligned}
$$

The force is $1.6 \times 10^{-13}\,\text{N}$, at right angles to both the
velocity and the field.

## 4. Circular motion in a magnetic field

The magnetic force on a moving charge is always at right angles to its velocity.
A force at right angles to the velocity does no work, so the speed of the charge
stays constant. The force only changes the direction of the velocity. A constant
force at right angles to the velocity produces **circular motion**.

Set the magnetic force equal to the centripetal force:

$$ BQv = \frac{mv^{2}}{r} $$

Rearranging gives the radius of the circle:

$$ r = \frac{mv}{BQ} $$

A faster particle or a heavier particle makes a larger circle. A stronger field
or a larger charge makes a smaller circle. The time for one full circle is the
circumference divided by the speed:

$$ T = \frac{2\pi r}{v} = \frac{2\pi m}{BQ} $$

The period does not depend on the speed. This is the principle of the
**cyclotron**, which sends particles round again and again before releasing
them.

**Worked example 3.** Find the radius of the path and the period of the electron
in Worked example 2. The mass of an electron is
$9.11 \times 10^{-31}\,\text{kg}$.

$$
\begin{aligned}
r &= \frac{mv}{BQ}
   = \frac{9.11 \times 10^{-31} \times 5.0 \times 10^{6}}{0.20 \times 1.60 \times 10^{-19}} \\
  &= \frac{4.56 \times 10^{-24}}{3.20 \times 10^{-20}}
   = 1.4 \times 10^{-4}\,\text{m}
\end{aligned}
$$

$$
\begin{aligned}
T &= \frac{2\pi m}{BQ}
   = \frac{2\pi \times 9.11 \times 10^{-31}}{0.20 \times 1.60 \times 10^{-19}} \\
  &= 1.8 \times 10^{-10}\,\text{s}
\end{aligned}
$$

The electron travels in a circle of radius 0.14 mm, once every 0.18 ns.

A **mass spectrometer** uses these ideas. Ions are accelerated by an electric
field, then enter a magnetic field at right angles. Each ion travels in a circle
whose radius is $\dfrac{mv}{BQ}$. For ions with the same charge and speed, the
radius depends on the mass. Ions of different isotopes land at different places
on the detector, so the isotopes are separated.

## 5. Magnetic flux and flux linkage

The **magnetic flux** $\Phi$ through an area is the flux density multiplied by
the area at right angles to the field:

$$ \Phi = BA $$

The unit of magnetic flux is the **weber**, $\text{Wb}$. One weber is one tesla
metre squared, $\text{T}\,\text{m}^{2}$.

If the field is not at right angles to the coil, only the component of $B$ at
right angles to the area counts. If a coil has $N$ turns, each turn has the same
flux, and the total is the **flux linkage**:

$$ N\Phi = NBA $$

Flux linkage is measured in weber turns, $\text{Wb}$. These two quantities
prepare the ground for electromagnetic induction in Section 9.4.

**Worked example 4.** A coil of 200 turns has an area of
$4.0 \times 10^{-3}\,\text{m}^{2}$. It is placed at right angles to a field of
flux density 0.25 T. Find the magnetic flux through one turn and the flux
linkage.

$$
\Phi = BA = 0.25 \times 4.0 \times 10^{-3} = 1.0 \times 10^{-3}\,\text{Wb}
$$

$$
N\Phi = 200 \times 1.0 \times 10^{-3} = 0.20\,\text{Wb}
$$

The flux through one turn is $1.0 \times 10^{-3}\,\text{Wb}$, and the flux
linkage is $0.20\,\text{Wb}$.

> **Watch out.** Three mistakes are common with magnetic forces. The first is to
> forget the angle. A wire parallel to the field feels no force at all, so
> $F = BIL$ only applies at right angles; use $F = BIL\sin\theta$ otherwise. The
> second is to think the force is along the wire or along the field. It is at
> right angles to both, so it is perpendicular to the plane containing them. The
> third is a sign error with a negative charge. For an electron, work out the
> direction for a positive charge and then reverse it. Check every direction
> with Fleming's left-hand rule and a sketch of the field.

## 6. Try it: the circular path

The figure shows a proton entering a magnetic field that points out of the page.
Two sliders set the flux density and the speed. The drawing shows the circular
path, and the readout gives the radius and the time for one full circle.

**Predict first.** Do not move the sliders yet. Write down your answers.

1. If you double the speed, what happens to the radius of the circle?
2. With the same change, what happens to the time for one full circle?
3. Does the speed of the proton change as it moves round the circle?

**Test.** Set a flux density, then double the speed and read the radius and the
period. Change the flux density and check what happens when it doubles.

**Explain.** The magnetic force is always at right angles to the velocity.
Explain why the speed stays constant but the direction of motion changes. Then
explain why a stronger field makes a smaller circle. Write three or four
sentences.

:::figure charged-particle-path

## Progress check

Return to the spacecraft. Its tether is 20 m long and carries a current of
0.80 A. It moves at right angles to the Earth's magnetic field, whose flux
density at the orbit is $3.0 \times 10^{-5}\,\text{T}$.

1. Find the magnetic force on the tether.
2. The xenon ions leave the ion drive at
   $4.20 \times 10^{4}\,\text{m}\,\text{s}^{-1}$. Each carries a charge of
   $1.60 \times 10^{-19}\,\text{C}$. Find the magnetic force on one ion moving at
   right angles to the Earth's field.
3. Explain why the direction of the force on the tether is opposite to the
   direction of motion of the spacecraft.
4. A coil of 400 turns and area $2.5 \times 10^{-3}\,\text{m}^{2}$ is placed at
   right angles to a field of 0.30 T. Find the flux linkage.

If question 1 goes wrong, use $F = BIL$ with the current in amperes and the
length in metres. If question 2 goes wrong, use $F = BQv$. If question 3 goes
wrong, apply Fleming's left-hand rule to the current in the tether and remember
which way the spacecraft is moving. If question 4 goes wrong, find the flux
through one turn first, then multiply by the number of turns.

## You should now be able to

- describe a magnetic field and draw its field lines;
- define the tesla and use the flux density $B$;
- use $F = BIL$ and $F = BIL\sin\theta$;
- apply Fleming's left-hand rule to find the direction of the force;
- use $F = BQv$ for a moving charge;
- explain why a charged particle moves in a circle in a magnetic field;
- use $r = \dfrac{mv}{BQ}$ and $T = \dfrac{2\pi m}{BQ}$;
- describe how a mass spectrometer separates isotopes;
- define magnetic flux and flux linkage, and use $\Phi = BA$ and
  $N\Phi = NBA$.
