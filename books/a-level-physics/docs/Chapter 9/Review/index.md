---
title: 'Chapter 9: Review'
chapter: 9
kind: review
---

# Chapter 9: Review

## The chapter problem, solved

The spacecraft orbits at a height of 400 km, so the distance from the centre of
the Earth is $r = 6.77 \times 10^{6}\,\text{m}$. The ion drive accelerates xenon
ions, charge $1.60 \times 10^{-19}\,\text{C}$ and mass
$2.18 \times 10^{-25}\,\text{kg}$, through 1.20 kV between grids 1.5 mm apart.
The 20 m tether moves at the orbital speed through the Earth's field of flux
density $3.0 \times 10^{-5}\,\text{T}$ and drives a current of 0.80 A.

**1. The orbit.** The gravitational field strength is

$$
g = \frac{GM}{r^{2}}
  = \frac{6.67 \times 10^{-11} \times 5.97 \times 10^{24}}{(6.77 \times 10^{6})^{2}}
  = 8.69\,\text{N}\,\text{kg}^{-1}
$$

Gravity provides the centripetal force, so

$$
v = \sqrt{\frac{GM}{r}}
  = \sqrt{\frac{3.98 \times 10^{14}}{6.77 \times 10^{6}}}
  = 7.67 \times 10^{3}\,\text{m}\,\text{s}^{-1}
$$

The period is $T = \dfrac{2\pi r}{v} = 5.55 \times 10^{3}\,\text{s}$, about
92 minutes. The gravitational potential at the orbit is

$$ V = -\frac{GM}{r} = -5.88 \times 10^{7}\,\text{J}\,\text{kg}^{-1} $$

**2. The ion drive.** Between the grids the field is uniform:

$$
E = \frac{V}{d} = \frac{1.20 \times 10^{3}}{1.5 \times 10^{-3}}
  = 8.0 \times 10^{5}\,\text{V}\,\text{m}^{-1}
$$

The force on one ion is $F = QE = 1.28 \times 10^{-13}\,\text{N}$. The ion gains
kinetic energy

$$ E_{k} = QV = 1.60 \times 10^{-19} \times 1.20 \times 10^{3}
         = 1.92 \times 10^{-16}\,\text{J} $$

so its speed is

$$ v_{\text{ion}} = \sqrt{\frac{2E_{k}}{m}}
   = \sqrt{\frac{2 \times 1.92 \times 10^{-16}}{2.18 \times 10^{-25}}}
   = 4.20 \times 10^{4}\,\text{m}\,\text{s}^{-1} $$

**3. The magnetic force on an ion.** In the Earth's field, an ion moving at
right angles feels

$$ F = BQv = 3.0 \times 10^{-5} \times 1.60 \times 10^{-19} \times 4.20 \times 10^{4}
       = 2.0 \times 10^{-19}\,\text{N} $$

This is tiny compared with the force from the thruster, so the Earth's field
barely bends the beam. The radius of the path would be
$r = \dfrac{mv}{BQ} = 1.9 \times 10^{3}\,\text{m}$, far larger than the
spacecraft.

**4. The tether.** The induced emf is

$$
\begin{aligned}
\varepsilon &= BLv \\
            &= 3.0 \times 10^{-5} \times 20 \times 7.67 \times 10^{3} \\
            &= 4.6\,\text{V}
\end{aligned}
$$

The current is 0.80 A, so the electrical power is

$$ P = \varepsilon I = 4.6 \times 0.80 = 3.7\,\text{W} $$

The current feels a magnetic force

$$ F = BIL = 3.0 \times 10^{-5} \times 0.80 \times 20
       = 4.8 \times 10^{-4}\,\text{N} $$

that opposes the motion. The mechanical power removed is
$Fv = 4.8 \times 10^{-4} \times 7.67 \times 10^{3} = 3.7\,\text{W}$, which is
exactly the electrical power. The two powers agree because energy is conserved.

**5. The judgement on the tether.** The tether supplies about 3.7 W. That is
useful for a small instrument or for trickle-charging a battery, but it is not
free energy. The 3.7 W comes from the kinetic energy of the spacecraft, so the
orbit slowly loses energy and the spacecraft drifts lower. A mission planner
must decide whether the power is worth the loss of orbit. The first prediction
was right: the emf is a few volts, not a few millivolts or a few kilovolts.

## Mixed practice — choose the method first

For each question, say which rule or equation you will use *before* you
calculate. Some questions bring back ideas from earlier chapters.

:::problems chapter-09-review

:::answers chapter-09-review

## What you can now do

- describe gravitational, electric and magnetic fields and their field lines;
- use Newton's law of gravitation and Coulomb's law;
- define field strength and potential for both gravitational and electric
  fields, and use the equations for each;
- relate field strength to the potential gradient;
- find the orbit speed, the period and the escape speed;
- compare gravitational and electric fields;
- describe the motion of a charged particle in a uniform electric field;
- define the tesla, and use $F = BIL$ and $F = BQv$;
- use $r = \dfrac{mv}{BQ}$ and $T = \dfrac{2\pi m}{BQ}$ for a particle in a
  magnetic field;
- define magnetic flux and flux linkage;
- use Faraday's law and Lenz's law, including the conservation of energy;
- find the emf induced in a moving conductor and in a rotating coil;
- explain how a search coil and a transformer use induction.

## Your relevance reflection

Return to the prompt from the chapter opener: *think of a time when a magnet
moved near a wire, or a wire moved near a magnet, such as a bicycle dynamo, a
wireless phone charger, a security tag, a tram, or a wind turbine.* Write one
more example now that you have finished the chapter. Has the chapter changed how
you think about what a moving magnet does to a wire?
