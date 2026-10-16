---
title: 13.4 Electric field strength and potential — Learn
chapter: 13
chapter_title: Charge and electric fields
section: '13.4'
section_title: Electric field strength and potential
tier: H
refs:
- '3.2'
kind: walkthrough
---

# 13.4 Electric field strength and potential — Learn

**Prerequisites:** Coulomb's law from Section 13.2; electric field strength from
Section 13.3; work and energy from Chapter 4; gravitational potential from
Section 6.3.

**Objectives:** find the field strength of a point charge with
$E = \dfrac{kQ}{d^2}$; find the uniform field between plates with
$E = \dfrac{V}{d}$; define and use electric potential with $V = \dfrac{W}{q}$; find
the potential of a point charge.

By the end of this section, you can find the field and the potential at a point, and
the work done when a charge moves.

## The field of a point charge

In Section 13.2 you used Coulomb's law to find the force between two point charges.
You can also ask a different question: what field does one point charge create at a
point a distance $d$ away?

Set $q_1 = Q$ as the charge that makes the field, and put a test charge $q_2 = q$ at
the point. Coulomb's law gives the force, and $E = F/q$ gives the field:

$$E = \frac{kQ}{d^2}$$

- $E$ is the field strength, in newtons per coulomb (N/C);
- $Q$ is the charge that makes the field, in coulombs (C);
- $d$ is the distance from the charge, in metres (m);
- $k = 9.0 \times 10^{9}$ N m$^{2}$ C$^{-2}$.

The field of a point charge is radial, and it follows an inverse-square law. Double
the distance and the field strength falls to one quarter. The field points away from
a positive charge and towards a negative one.

**Example 1.** A point charge of $+2.0\ \mu\text{C}$ is isolated in air. Calculate
the field strength $0.30$ m from it.

$$
E = \frac{kQ}{d^2}
$$

$$
E = \frac{9.0 \times 10^{9} \times 2.0 \times 10^{-6}}{(0.30)^2}
$$

$$
E = \frac{1.8 \times 10^{4}}{9.0 \times 10^{-2}}
$$

$$
E = 2.0 \times 10^{5}\,\text{N/C}
$$

The field points away from the positive charge.

## The uniform field between parallel plates

Two parallel plates with a potential difference $V$ across them make a uniform field.
The field strength is the potential difference divided by the separation:

$$E = \frac{V}{d}$$

- $E$ is the field strength, in volts per metre (V/m);
- $V$ is the potential difference between the plates, in volts (V);
- $d$ is the separation of the plates, in metres (m).

Volts per metre and newtons per coulomb are the same unit:

$$\frac{\text{V}}{\text{m}} = \frac{\text{J/C}}{\text{m}} = \frac{\text{N m}}{\text{C m}} = \frac{\text{N}}{\text{C}}$$

So $E = V/d$ is a second way to find the field strength, useful when you know the
voltage on the plates.

**Example 2.** Two parallel plates are $2.0$ mm apart, and the potential difference
between them is $1200$ V. Calculate the field strength.

$$
E = \frac{V}{d}
$$

$$
E = \frac{1200}{2.0 \times 10^{-3}}
$$

$$
E = 6.0 \times 10^{5}\,\text{V/m}
$$

## Electric potential

The field strength tells you the force on a charge. The **electric potential** tells
you the energy at a point.

> **Electric potential.** The electric potential at a point is the work done per unit
> positive charge in bringing a positive charge from infinity to that point.

$$V = \frac{W}{q}$$

- $V$ is the electric potential, in volts (V);
- $W$ is the work done, in joules (J);
- $q$ is the charge moved, in coulombs (C).

A volt is a joule per coulomb: $1\,\text{V} = 1\,\text{J/C}$. The zero of potential
is taken at infinity, where the field has faded to nothing.

Potential is a **scalar**. It has a size and a sign, but no direction. To find the
potential at a point due to several charges, you add the potentials with their signs.

For a point charge $Q$, the potential at a distance $d$ is

$$V = \frac{kQ}{d}$$

The potential is positive near a positive charge and negative near a negative charge.
It is never zero except at infinity.

**Example 3.** A point charge of $+2.0\ \mu\text{C}$ is isolated in air. Calculate the
potential $0.30$ m from it.

$$
V = \frac{kQ}{d}
$$

$$
V = \frac{9.0 \times 10^{9} \times 2.0 \times 10^{-6}}{0.30}
$$

$$
V = 6.0 \times 10^{4}\,\text{V}
$$

## Work done moving a charge

Rearranging $V = W/q$ gives the work done when a charge moves through a potential
difference:

$$W = qV$$

**Example 4.** A charge of $3.0\ \mu\text{C}$ moves through a potential difference of
$150$ V. Calculate the work done.

$$
W = qV
$$

$$
W = 3.0 \times 10^{-6} \times 150
$$

$$
W = 4.5 \times 10^{-4}\,\text{J}
$$

## Field strength and potential together

Field strength and potential are two views of the same field, and they are linked.

The electric field strength is the **negative of the potential gradient**. It measures
how quickly the potential changes with distance:

$$E = -\frac{dV}{dx}$$

Between parallel plates the field is uniform, so the potential falls steadily. The
gradient is constant, and $E = V/d$ gives it. Around a point charge the field is not
uniform, so the potential does not fall steadily, and $E = V/d$ cannot be used there.

**Equipotential surfaces** are surfaces on which the potential is the same. They are
always at right angles to the field lines. No work is done moving a charge along an
equipotential surface.

> **Watch out.** Two mistakes are common. First, $E = \dfrac{V}{d}$ works **only** for
> the uniform field between parallel plates; use $E = \dfrac{kQ}{d^2}$ for a point
> charge. Second, potential is a scalar and field strength is a vector. Add potentials
> directly, keeping the sign of each charge, but add field strengths as vectors, which
> means taking their directions into account.

## Progress check

Back to the chapter problem. The steering plates are $2.0$ mm apart with a potential
difference of $1200$ V. A drop carries a charge of $-2.0 \times 10^{-12}$ C.

1. Calculate the field strength between the plates.
2. Calculate the force on the drop.
3. State which plate the drop moves towards, and explain your answer.
4. Calculate the work done on the drop as it crosses from one plate to the other.

Keep your answers. The Review collects every step of the chapter problem together and
compares the force from the plates with the force between two drops.

## You should now be able to

- find the field strength of a point charge with $E = \dfrac{kQ}{d^2}$;
- find the uniform field between parallel plates with $E = \dfrac{V}{d}$;
- explain why volts per metre and newtons per coulomb are the same unit;
- define electric potential and use $V = \dfrac{W}{q}$;
- find the potential of a point charge with $V = \dfrac{kQ}{d}$;
- calculate the work done when a charge moves through a potential difference, using
  $W = qV$;
- explain the link between field strength and potential gradient, and say when
  $E = \dfrac{V}{d}$ can be used.
